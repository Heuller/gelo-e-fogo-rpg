import { create } from 'zustand';
import { SaveSlot, TurnEvent } from '@/server/saves';
import { NodeJornada, EscolhaNode } from '@/server/engine/storyLinter';
import { FichaPersonagem, WorldState, ResultadoRolagem } from '@/server/engine/rpgEngine';
import {
  carregarSessaoJogoAction,
  processarEscolhaAction,
  obterTextoMestreAction,
  desfazerTurnoAction,
  rerrolarTesteInspiracaoAction,
} from '@/app/actions/gameActions';

export type StatusSalvo = 'salvo' | 'salvando' | 'erro';
export type StatusMestre = 'idle' | 'escrevendo' | 'pronto' | 'falhou';

export interface JogoState {
  // Estado do Jogo
  slot: SaveSlot | null;
  node: NodeJornada | null;
  ficha: FichaPersonagem | null;
  worldState: WorldState | null;
  historico: TurnEvent[];
  versao: number;

  // Narrativa e Mestre IA
  textoCena: string;
  textoMestre: string | null;
  statusMestre: StatusMestre;
  modoIA: boolean;

  // Mecânicas
  resultadoRolagem: ResultadoRolagem | null;
  ultimoNodeId: string | null;
  ultimaEscolhaId: string | null;

  // Feedbacks e Status
  statusSave: StatusSalvo;
  avisos: string[];
  carregando: boolean;

  // Painéis da Interface
  abaLateral: 'mapa' | 'dados' | 'diario';
  colunaFichaAberta: boolean;
  colunaMundoAberta: boolean;

  // Ações
  carregarSessao: (journeyId?: string, slotNumber?: number) => Promise<void>;
  fazerEscolha: (escolhaId: string, journeyId?: string) => Promise<void>;
  desfazer: () => Promise<void>;
  rerrolar: (journeyId?: string) => Promise<void>;
  pedirTextoMestre: () => Promise<void>;
  descartarAviso: (index: number) => void;
  adicionarAviso: (mensagem: string) => void;
  setAbaLateral: (aba: 'mapa' | 'dados' | 'diario') => void;
  toggleModoIA: () => void;
  toggleColunaFicha: () => void;
  toggleColunaMundo: () => void;
}

export const useJogoStore = create<JogoState>((set, get) => ({
  slot: null,
  node: null,
  ficha: null,
  worldState: null,
  historico: [],
  versao: 0,

  textoCena: '',
  textoMestre: null,
  statusMestre: 'idle',
  modoIA: true,

  resultadoRolagem: null,
  ultimoNodeId: null,
  ultimaEscolhaId: null,

  statusSave: 'salvo',
  avisos: [],
  carregando: false,

  abaLateral: 'mapa',
  colunaFichaAberta: true,
  colunaMundoAberta: true,

  carregarSessao: async (journeyId, slotNumber = 1) => {
    set({ carregando: true, statusSave: 'salvando' });
    try {
      const sessao = await carregarSessaoJogoAction(journeyId, slotNumber);
      set({
        slot: sessao.slot,
        node: sessao.node,
        ficha: sessao.slot.characterSheet,
        worldState: sessao.slot.worldState,
        historico: sessao.slot.turnHistory || [],
        versao: sessao.slot.versao,
        textoCena: sessao.node.fallbackText,
        textoMestre: null,
        statusMestre: 'idle',
        statusSave: 'salvo',
        carregando: false,
      });

      // Solicita o Mestre IA em segundo plano se o modo estiver ativo
      if (get().modoIA) {
        get().pedirTextoMestre();
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Falha ao carregar sessão.';
      set({
        statusSave: 'erro',
        carregando: false,
        avisos: [...get().avisos, msg],
      });
    }
  },

  fazerEscolha: async (escolhaId, journeyId) => {
    const { slot, node, ficha, worldState, historico, modoIA } = get();
    if (!node || !slot || !ficha || !worldState) return;

    set({
      statusSave: 'salvando',
      ultimoNodeId: node.id,
      ultimaEscolhaId: escolhaId,
    });

    try {
      const res = await processarEscolhaAction({
        nodeId: node.id,
        escolhaId,
        slotId: slot.id,
        versaoEsperada: slot.versao,
        ficha,
        worldState,
        turnNumber: historico.length + 1,
        usarIA: false, // Turno determinístico imediato
        journeyId,
      });

      const novoSlot = res.slotAtualizado || slot;

      set({
        slot: novoSlot,
        node: res.proximoNode,
        ficha: res.fichaAtualizada,
        worldState: res.worldStateAtualizado,
        historico: [res.turnEvent, ...historico],
        versao: novoSlot.versao,
        textoCena: res.proximoNode.fallbackText,
        textoMestre: null,
        statusMestre: 'idle',
        resultadoRolagem: res.resultadoRolagem,
        statusSave: 'salvo',
      });

      if (res.resultadoRolagem) {
        set({ abaLateral: 'dados' });
      }

      // Dispara o Mestre IA fora do caminho crítico
      if (modoIA) {
        get().pedirTextoMestre();
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Erro ao processar turno.';

      // Detecção de conflito de versão (duas abas simultâneas)
      if (msg.includes('CONFLITO_VERSAO')) {
        set({
          statusSave: 'erro',
          avisos: [...get().avisos, 'Sua crônica foi atualizada em outra aba. Recarregando estado atual...'],
        });
        await get().carregarSessao(journeyId, slot.slotNumber);
        return;
      }

      set({
        statusSave: 'erro',
        avisos: [...get().avisos, msg],
      });
    }
  },

  pedirTextoMestre: async () => {
    const { slot, node } = get();
    if (!slot || !node) return;

    set({ statusMestre: 'escrevendo' });
    try {
      const resMestre = await obterTextoMestreAction({
        slotId: slot.id,
        nodeId: node.id,
        journeyId: slot.jornadaId,
      });

      if (resMestre?.textoEnriquecido && !resMestre.usouFallback) {
        set({
          textoMestre: resMestre.textoEnriquecido,
          statusMestre: 'pronto',
        });
      } else {
        set({ statusMestre: 'falhou' });
      }
    } catch {
      set({ statusMestre: 'falhou' });
    }
  },

  desfazer: async () => {
    const { slot } = get();
    if (!slot) return;

    set({ statusSave: 'salvando' });
    try {
      const slotRestaurado = await desfazerTurnoAction(slot.id);
      set({
        slot: slotRestaurado,
        ficha: slotRestaurado.characterSheet,
        worldState: slotRestaurado.worldState,
        historico: slotRestaurado.turnHistory || [],
        versao: slotRestaurado.versao,
        statusSave: 'salvo',
        avisos: [...get().avisos, 'Última decisão desfeita com sucesso.'],
      });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Não foi possível desfazer.';
      set({
        statusSave: 'erro',
        avisos: [...get().avisos, msg],
      });
    }
  },

  rerrolar: async (journeyId) => {
    const { slot, ultimoNodeId, ultimaEscolhaId, ficha, worldState, historico } = get();
    if (!slot || !ultimoNodeId || !ultimaEscolhaId || !ficha || !worldState) return;

    set({ statusSave: 'salvando' });
    try {
      const res = await rerrolarTesteInspiracaoAction({
        nodeId: ultimoNodeId,
        escolhaId: ultimaEscolhaId,
        slotId: slot.id,
        ficha,
        worldState,
        turnNumber: historico.length + 1,
        journeyId,
      });

      const novoSlot = res.slotAtualizado || slot;
      set({
        slot: novoSlot,
        node: res.proximoNode,
        ficha: res.fichaAtualizada,
        worldState: res.worldStateAtualizado,
        historico: [res.turnEvent, ...historico],
        versao: novoSlot.versao,
        textoCena: res.proximoNode.fallbackText,
        resultadoRolagem: res.resultadoRolagem,
        statusSave: 'salvo',
      });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Falha ao rerrolar teste.';
      set({
        statusSave: 'erro',
        avisos: [...get().avisos, msg],
      });
    }
  },

  descartarAviso: (index) => {
    set({ avisos: get().avisos.filter((_, i) => i !== index) });
  },

  adicionarAviso: (mensagem) => {
    set({ avisos: [...get().avisos, mensagem] });
  },

  setAbaLateral: (aba) => set({ abaLateral: aba }),
  toggleModoIA: () => set({ modoIA: !get().modoIA }),
  toggleColunaFicha: () => set({ colunaFichaAberta: !get().colunaFichaAberta }),
  toggleColunaMundo: () => set({ colunaMundoAberta: !get().colunaMundoAberta }),
}));
