'use client';

import { useState } from 'react';
import { NodeJornada } from '@/server/engine/storyLinter';
import { FichaPersonagem, WorldState, ResultadoRolagem } from '@/server/engine/rpgEngine';
import type { TurnEvent, SaveSlot } from '@/server/saves';
import {
  processarEscolhaAction,
  processarAcaoLivreAction,
  executarTentativaLivreAction,
  rerrolarTesteInspiracaoAction,
  desfazerTurnoAction,
  obterTextoMestreAction,
  obterCenaInicialAction,
  carregarSessaoJogoAction,
} from '@/app/actions/gameActions';
import { exportarSaveAction } from '@/app/actions/slotActions';
import type { RespostaTentativaLivre } from '@/server/engine/tentativaLivre';
import type { FalaItem } from '@/components/game/CenaTexto';

export interface UseTurnoProps {
  slotAtual: SaveSlot | null;
  setSlotAtual: (slot: SaveSlot | null) => void;
  nodeAtual: NodeJornada | null;
  setNodeAtual: (node: NodeJornada | null) => void;
  ficha: FichaPersonagem;
  setFicha: (ficha: FichaPersonagem) => void;
  worldState: WorldState;
  setWorldState: (ws: WorldState) => void;
  historico: TurnEvent[];
  setHistorico: (h: TurnEvent[]) => void;
  journeyParam: string;
  slotParam: number;
  modoIA: boolean;
  adicionarAviso: (mensagem: string, tipo?: 'sucesso' | 'erro' | 'info') => void;
  setStatusSalvamento: (s: 'salvo' | 'salvando' | 'erro') => void;
}

export function useTurno({
  slotAtual,
  setSlotAtual,
  nodeAtual,
  setNodeAtual,
  ficha,
  setFicha,
  worldState,
  setWorldState,
  historico,
  setHistorico,
  journeyParam,
  slotParam,
  modoIA,
  adicionarAviso,
  setStatusSalvamento,
}: UseTurnoProps) {
  const [textoCenaExibido, setTextoCenaExibido] = useState<string>('');
  const [ponte, setPonte] = useState<string | null>(null);
  const [marcasRecebidas, setMarcasRecebidas] = useState<string[]>([]);
  const [falasCena, setFalasCena] = useState<FalaItem[]>([]);
  const [textoMestre, setTextoMestre] = useState<string | null>(null);
  const [statusMestre, setStatusMestre] = useState<'idle' | 'escrevendo' | 'pronto' | 'falhou'>('idle');
  const [resultadoRolagem, setResultadoRolagem] = useState<ResultadoRolagem | null>(null);
  const [ultimaEscolhaId, setUltimaEscolhaId] = useState<string | null>(null);
  const [ultimoNodeId, setUltimoNodeId] = useState<string | null>(null);

  // Execução de escolha pelo jogador
  async function handleEscolha(escolhaId: string) {
    if (!nodeAtual || !slotAtual) return;

    try {
      setUltimoNodeId(nodeAtual.id);
      setUltimaEscolhaId(escolhaId);
      setStatusSalvamento('salvando');

      const res = await processarEscolhaAction({
        slotId: slotAtual.id,
        escolhaId,
        versaoEsperada: slotAtual.versao,
        usarIA: modoIA,
        journeyId: journeyParam,
      });

      if (res.slotAtualizado) {
        setSlotAtual(res.slotAtualizado);
      }
      setStatusSalvamento('salvo');

      setNodeAtual(res.proximoNode);
      if (res.cenaComposta) {
        setTextoCenaExibido(res.cenaComposta.textoPrincipal);
        setFalasCena(res.cenaComposta.falas || []);
      } else {
        setTextoCenaExibido(res.proximoNode.fallbackText);
        setFalasCena([]);
      }
      setPonte(res.ponte || null);
      setMarcasRecebidas(res.marcasRecebidas || []);
      setTextoMestre(null);

      // Dispara o enriquecimento de IA fora do caminho crítico (TTFT imediato com fallbackText)
      if (modoIA) {
        setStatusMestre('escrevendo');
        const timeoutPromise = new Promise<{ usouFallback: true }>((resolve) =>
          setTimeout(() => resolve({ usouFallback: true }), 6000)
        );
        const iaPromise = obterTextoMestreAction({
          slotId: res.slotAtualizado?.id || slotAtual.id,
          nodeId: res.proximoNode.id,
          journeyId: journeyParam,
          escolhaTexto: res.escolhaRealizada?.texto || '',
          resultadoDado: res.resultadoRolagem,
        });

        Promise.race([iaPromise, timeoutPromise])
          .then((resIA) => {
            if (
              'usouFallback' in resIA &&
              !resIA.usouFallback &&
              'textoEnriquecido' in resIA &&
              resIA.textoEnriquecido &&
              resIA.textoEnriquecido !== res.proximoNode.fallbackText
            ) {
              setTextoMestre(resIA.textoEnriquecido);
              setStatusMestre('pronto');
            } else {
              setStatusMestre('idle');
            }
          })
          .catch(() => {
            setStatusMestre('idle');
          });
      } else {
        setStatusMestre('idle');
      }

      setFicha(res.fichaAtualizada);
      setWorldState(res.worldStateAtualizado);
      setHistorico([res.turnEvent, ...historico]);

      // Avisos de aprovação de companheiros (toasts elegantes)
      if (res.notificacoesCompanheiros && res.notificacoesCompanheiros.length > 0) {
        res.notificacoesCompanheiros.forEach((notif) => {
          const ehAprovacao = notif.includes('aprova');
          adicionarAviso(notif, ehAprovacao ? 'sucesso' : 'erro');
        });
      }

      if (res.resultadoRolagem) {
        setResultadoRolagem(res.resultadoRolagem);
        const veredito = res.resultadoRolagem.resultado.toUpperCase();
        adicionarAviso(
          `Rolagem 2d6: [${res.resultadoRolagem.dados[0]}+${res.resultadoRolagem.dados[1]} + ${res.resultadoRolagem.valorAtributo} = ${res.resultadoRolagem.total} vs DC ${res.resultadoRolagem.dc}] — ${veredito}`,
          veredito.includes('SUCESSO') ? 'sucesso' : 'erro'
        );
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      if (msg.includes('CONFLITO_VERSAO')) {
        adicionarAviso('Conflito de versão detectado. Sincronizando com o servidor...', 'info');
        carregarSessaoJogoAction(journeyParam, slotParam)
          .then((sessaoData) => {
            setSlotAtual(sessaoData.slot);
            setNodeAtual(sessaoData.node);
            setTextoCenaExibido(sessaoData.node.fallbackText);
            setFicha(sessaoData.slot.characterSheet);
            setWorldState(sessaoData.slot.worldState);
            setHistorico(sessaoData.slot.turnHistory || []);
          })
          .catch(() => {});
      } else {
        adicionarAviso('Erro ao processar escolha: ' + msg, 'erro');
      }
      setStatusSalvamento('erro');
      setStatusMestre('falhou');
    }
  }

  async function handleRerrolarComInspiracao() {
    if (!slotAtual) {
      adicionarAviso('Sessão de jogo não inicializada.', 'erro');
      return;
    }
    if ((ficha.inspiracao ?? 0) <= 0) {
      adicionarAviso('Não possui Pontos de Inspiração suficientes.', 'erro');
      return;
    }

    try {
      adicionarAviso('Gastando 1 Ponto de Inspiração para rerrolar o teste…', 'info');
      const res = await rerrolarTesteInspiracaoAction({
        slotId: slotAtual.id,
        versaoEsperada: slotAtual.versao,
        escolhaId: ultimaEscolhaId || undefined,
        journeyId: journeyParam,
        usarIA: modoIA,
      });

      if (res.slotAtualizado) {
        setSlotAtual(res.slotAtualizado);
      }
      setNodeAtual(res.proximoNode);
      if (res.cenaComposta) {
        setTextoCenaExibido(res.cenaComposta.textoPrincipal);
        setFalasCena(res.cenaComposta.falas || []);
      } else {
        setTextoCenaExibido(res.proximoNode.fallbackText);
        setFalasCena([]);
      }
      setPonte(res.ponte || null);
      setMarcasRecebidas(res.marcasRecebidas || []);
      setTextoMestre(null);
      if (modoIA) {
        setStatusMestre('escrevendo');
        obterTextoMestreAction({
          slotId: res.slotAtualizado?.id || slotAtual.id,
          nodeId: res.proximoNode.id,
          journeyId: journeyParam,
          escolhaTexto: res.escolhaRealizada?.texto || '',
          resultadoDado: res.resultadoRolagem,
        })
          .then((resIA) => {
            if (!resIA.usouFallback && resIA.textoEnriquecido && resIA.textoEnriquecido !== res.proximoNode.fallbackText) {
              setTextoMestre(resIA.textoEnriquecido);
              setStatusMestre('pronto');
            } else {
              setStatusMestre('idle');
            }
          })
          .catch(() => setStatusMestre('idle'));
      }
      setFicha(res.fichaAtualizada);
      setWorldState(res.worldStateAtualizado);
      setHistorico([res.turnEvent, ...historico]);

      if (res.resultadoRolagem) {
        setResultadoRolagem(res.resultadoRolagem);
        const veredito = res.resultadoRolagem.resultado.toUpperCase();
        adicionarAviso(
          `Nova Rolagem com Inspiração: [${res.resultadoRolagem.total} vs DC ${res.resultadoRolagem.dc}] — ${veredito}`,
          veredito.includes('SUCESSO') ? 'sucesso' : 'erro'
        );
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      adicionarAviso('Erro ao rerrolar com Inspiração: ' + msg, 'erro');
    }
  }

  async function handleAcaoLivre(textoAcao: string) {
    if (!nodeAtual || !slotAtual) return;

    try {
      adicionarAviso('O Mestre IA está interpretando sua ação livre…', 'info');
      const res = await processarAcaoLivreAction({
        slotId: slotAtual.id,
        versaoEsperada: slotAtual.versao,
        nodeId: nodeAtual.id,
        textoAcaoLivre: textoAcao,
        usarIA: modoIA,
        journeyId: journeyParam,
      });

      if (res.slotAtualizado) {
        setSlotAtual(res.slotAtualizado);
      }
      setNodeAtual(res.proximoNode);
      setTextoCenaExibido(res.proximoNode.fallbackText);
      if (res.textoEnriquecido) {
        setTextoMestre(res.textoEnriquecido);
        setStatusMestre('pronto');
      }
      setFicha(res.fichaAtualizada);
      setWorldState(res.worldStateAtualizado);
      setHistorico([res.turnEvent, ...historico]);

      if (res.resultadoRolagem) {
        setResultadoRolagem(res.resultadoRolagem);
      }

      const msg = res.classificacao
        ? `[Mestre]: ${res.classificacao.justificativa}`
        : `Ação proclamada: "${textoAcao}"`;
      adicionarAviso(msg, 'sucesso');
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      adicionarAviso('Erro ao processar ação livre: ' + msg, 'erro');
    }
  }

  async function handleTentativaLivre(textoAcao: string): Promise<RespostaTentativaLivre | null> {
    if (!nodeAtual || !slotAtual) return null;

    try {
      adicionarAviso('Executando tentativa livre na Cidadela…', 'info');
      const res = await executarTentativaLivreAction({
        slotId: slotAtual.id,
        versaoEsperada: slotAtual.versao,
        texto: textoAcao,
        journeyId: journeyParam,
      });

      setSlotAtual(res.novoSlot);
      setFicha(res.novoSlot.characterSheet);
      setWorldState(res.novoSlot.worldState);
      setHistorico(res.novoSlot.turnHistory || []);
      setResultadoRolagem(res.resultadoRolagem);

      const veredito = res.resultadoRolagem.resultado.toUpperCase();
      adicionarAviso(
        `Tentativa [${res.rotuloIntencao}]: ${veredito} (${res.resultadoRolagem.total} vs CD ${res.resultadoRolagem.dc})`,
        veredito.includes('SUCESSO') || veredito === 'CRITICO' ? 'sucesso' : 'erro'
      );

      return res;
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      adicionarAviso('Erro ao executar tentativa livre: ' + msg, 'erro');
      return null;
    }
  }

  async function handleDesfazerTurno() {
    if (!slotAtual) {
      adicionarAviso('Sessão de jogo não inicializada.', 'erro');
      return;
    }

    try {
      adicionarAviso('Desfazendo último turno no servidor...', 'info');
      const { slot: slotRestaurado, node: nodeRestaurado, cenaComposta } = await desfazerTurnoAction(
        slotAtual.id,
        slotAtual.versao
      );

      setSlotAtual(slotRestaurado);
      setNodeAtual(nodeRestaurado);
      if (cenaComposta) {
        setTextoCenaExibido(cenaComposta.textoPrincipal);
        setFalasCena(cenaComposta.falas || []);
      } else {
        setTextoCenaExibido(nodeRestaurado.fallbackText);
        setFalasCena([]);
      }
      setPonte(null);
      setMarcasRecebidas([]);
      setFicha(slotRestaurado.characterSheet);
      setWorldState(slotRestaurado.worldState);
      setHistorico(slotRestaurado.turnHistory || []);
      adicionarAviso(`Retornado à cena '${nodeRestaurado.titulo}'.`, 'info');
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      adicionarAviso('Erro ao desfazer turno: ' + msg, 'erro');
    }
  }

  async function handleVoltarCheckpoint() {
    try {
      const inicio = await obterCenaInicialAction(journeyParam);
      setNodeAtual(inicio.node);
      setTextoCenaExibido(inicio.node.fallbackText);
      setFicha(inicio.fichaInicial);
      setWorldState(inicio.worldStateInicial);
      setHistorico([
        {
          slotId: slotAtual?.id || `slot_${slotParam}`,
          userId: inicio.fichaInicial.id,
          turnNumber: 1,
          nodeId: inicio.node.id,
          choiceMade: 'Reinício no Checkpoint Inicial da Era',
          stateDelta: {},
          snapshotAntes: {
            ficha: inicio.fichaInicial,
            worldState: inicio.worldStateInicial,
            nodeId: inicio.node.id,
          },
          resultado: {},
          timestamp: new Date().toISOString(),
        },
      ]);
      adicionarAviso('Retornado com sucesso ao início do Ato I.', 'sucesso');
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      adicionarAviso('Erro ao voltar ao checkpoint: ' + msg, 'erro');
    }
  }

  async function handleExportarSave() {
    try {
      const json = await exportarSaveAction(journeyParam, slotParam);
      const blob = new Blob([json], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `save_${journeyParam}_slot_${slotParam}_${Date.now()}.json`;
      a.click();
      URL.revokeObjectURL(url);
      adicionarAviso('Save exportado com sucesso em .json!', 'sucesso');
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      adicionarAviso('Erro ao exportar save: ' + msg, 'erro');
    }
  }

  return {
    textoCenaExibido,
    setTextoCenaExibido,
    ponte,
    setPonte,
    marcasRecebidas,
    setMarcasRecebidas,
    falasCena,
    setFalasCena,
    textoMestre,
    statusMestre,
    resultadoRolagem,
    setResultadoRolagem,
    ultimaEscolhaId,
    ultimoNodeId,
    handleEscolha,
    handleRerrolarComInspiracao,
    handleAcaoLivre,
    handleTentativaLivre,
    handleDesfazerTurno,
    handleVoltarCheckpoint,
    handleExportarSave,
  };
}
