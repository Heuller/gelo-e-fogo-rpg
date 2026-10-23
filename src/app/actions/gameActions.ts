'use server';

import {
  obterGrafoJornada,
  obterNodeQualquerJornada,
  obterCenaInicialJornada,
  normalizarIdJornada,
} from '@/server/data/journeys/index';
import { NodeJornada, EscolhaNode } from '@/server/engine/storyLinter';
import {
  FichaPersonagem,
  WorldState,
  ResultadoRolagem,
  rolar2d6,
  aplicarDeltaEstado,
  DeltaEstado,
} from '@/server/engine/rpgEngine';
import { TurnEvent, SaveSlot, getSaveRepository } from '@/server/saves';
import { executarTurno, mesclarDeltas } from '@/server/engine/turno';
import { requireOwner } from '@/server/auth/requireOwner';
import {
  classificarAcaoLivre,
  enriquecerCenaComIA,
  ClassificacaoAcaoLivre,
  VozExtra,
} from '@/server/ai/geminiMaster';

/**
 * Garante autenticação estrita do proprietário em todas as Server Actions.
 */
async function validarProprietario() {
  const auth = await requireOwner(true);
  if (!auth.authorized || !auth.user) {
    throw new Error('Acesso negado: apenas o proprietário da crônica possui autorização da Cidadela.');
  }
  return auth.user;
}

export async function obterCenaInicialAction(journeyId?: string): Promise<{
  node: NodeJornada;
  fichaInicial: FichaPersonagem;
  worldStateInicial: WorldState;
}> {
  await validarProprietario();
  return obterCenaInicialJornada(journeyId);
}

export async function obterCenaPorIdAction(
  nodeId: string,
  journeyId?: string
): Promise<NodeJornada | null> {
  await validarProprietario();
  const node = obterNodeQualquerJornada(nodeId, journeyId);
  return node || null;
}

export interface SessaoJogoCarregada {
  slot: SaveSlot;
  node: NodeJornada;
  isNovo: boolean;
}

/**
 * Carrega a sessão de jogo conectando o slot do usuário com o motor autoritativo.
 * Se o slot não existir, cria-o atomicamente com a ficha canônica da jornada.
 */
export async function carregarSessaoJogoAction(
  journeyId?: string,
  slotNumber = 1
): Promise<SessaoJogoCarregada> {
  const user = await validarProprietario();
  const jId = normalizarIdJornada(journeyId);
  const repo = getSaveRepository();

  const slotExistente = await repo.obterSlot(user.id, jId, slotNumber);
  if (slotExistente.ok) {
    const node = obterNodeQualquerJornada(slotExistente.valor.currentNodeId, jId);
    if (node) {
      return { slot: slotExistente.valor, node, isNovo: false };
    }
  }

  // Criação de novo slot com o início canônico
  const inicial = obterCenaInicialJornada(jId);
  const resCriar = await repo.criarSlot({
    userId: user.id,
    jornadaId: jId,
    slotNumber,
    currentNodeId: inicial.node.id,
    characterSheet: inicial.fichaInicial,
    worldState: inicial.worldStateInicial,
  });

  if (!resCriar.ok) {
    throw new Error(`Falha ao inicializar slot: ${resCriar.mensagem}`);
  }

  return { slot: resCriar.valor, node: inicial.node, isNovo: true };
}

export interface ProcessarEscolhaParams {
  nodeId: string;
  escolhaId: string;
  slotId?: string;
  versaoEsperada?: number;
  ficha: FichaPersonagem;
  worldState: WorldState;
  turnNumber: number;
  dadosFixos?: [number, number];
  usarIA?: boolean;
  journeyId?: string;
}

export interface RespostaTurnoAction {
  proximoNode: NodeJornada;
  resultadoRolagem: ResultadoRolagem | null;
  fichaAtualizada: FichaPersonagem;
  worldStateAtualizado: WorldState;
  turnEvent: TurnEvent;
  slotAtualizado?: SaveSlot;
  classificacao?: ClassificacaoAcaoLivre;
  textoEnriquecido?: string;
  vozesExtras?: VozExtra[];
  usouFallbackIA?: boolean;
  notificacoesCompanheiros?: string[];
  escolhaRealizada?: EscolhaNode;
}

/**
 * Processamento autoritativo de turno.
 */
export async function processarEscolhaAction(
  params: ProcessarEscolhaParams
): Promise<RespostaTurnoAction> {
  const user = await validarProprietario();
  const repo = getSaveRepository();

  // Se slotId e versaoEsperada forem fornecidos, executa o fluxo autoritativo estrito
  if (params.slotId && typeof params.versaoEsperada === 'number') {
    const resTurno = await executarTurno({
      userId: user.id,
      slotId: params.slotId,
      escolhaId: params.escolhaId,
      versaoEsperada: params.versaoEsperada,
      journeyId: params.journeyId,
      dadosFixos: params.dadosFixos,
    });

    const ultimoEvento = resTurno.novoSlot.turnHistory[resTurno.novoSlot.turnHistory.length - 1];

    let textoEnriquecido = resTurno.proximoNode.fallbackText;
    let vozesExtras: VozExtra[] = [];
    let usouFallbackIA = true;

    if (params.usarIA) {
      const resIA = await enriquecerCenaComIA({
        noDestino: resTurno.proximoNode,
        resultadoDado: resTurno.resultadoRolagem,
        escolhaTexto: resTurno.escolhaRealizada.texto,
        ficha: resTurno.novoSlot.characterSheet,
        worldState: resTurno.novoSlot.worldState,
      });
      textoEnriquecido = resIA.textoEnriquecido;
      vozesExtras = resIA.vozesExtras;
      usouFallbackIA = resIA.usouFallback;
    }

    return {
      proximoNode: resTurno.proximoNode,
      resultadoRolagem: resTurno.resultadoRolagem,
      fichaAtualizada: resTurno.novoSlot.characterSheet,
      worldStateAtualizado: resTurno.novoSlot.worldState,
      turnEvent: ultimoEvento,
      slotAtualizado: resTurno.novoSlot,
      textoEnriquecido,
      vozesExtras,
      usouFallbackIA,
      notificacoesCompanheiros: resTurno.notificacoesCompanheiros,
      escolhaRealizada: resTurno.escolhaRealizada,
    };
  }

  // Fallback adaptativo: busca o slot existente do usuário ou cria para manter autoritativo
  const jId = normalizarIdJornada(params.journeyId);
  let slotRes = await repo.obterSlot(user.id, jId, 1);
  if (!slotRes.ok) {
    slotRes = await repo.criarSlot({
      userId: user.id,
      jornadaId: jId,
      slotNumber: 1,
      currentNodeId: params.nodeId,
      characterSheet: params.ficha,
      worldState: params.worldState,
    });
  }

  if (!slotRes.ok) {
    throw new Error('Falha ao sincronizar slot do jogador.');
  }

  const resTurno = await executarTurno({
    userId: user.id,
    slotId: slotRes.valor.id,
    escolhaId: params.escolhaId,
    versaoEsperada: slotRes.valor.versao,
    journeyId: params.journeyId,
    dadosFixos: params.dadosFixos,
  });

  const ultimoEvento = resTurno.novoSlot.turnHistory[resTurno.novoSlot.turnHistory.length - 1];

  let textoEnriquecido = resTurno.proximoNode.fallbackText;
  let vozesExtras: VozExtra[] = [];
  let usouFallbackIA = true;

  if (params.usarIA) {
    const resIA = await enriquecerCenaComIA({
      noDestino: resTurno.proximoNode,
      resultadoDado: resTurno.resultadoRolagem,
      escolhaTexto: resTurno.escolhaRealizada.texto,
      ficha: resTurno.novoSlot.characterSheet,
      worldState: resTurno.novoSlot.worldState,
    });
    textoEnriquecido = resIA.textoEnriquecido;
    vozesExtras = resIA.vozesExtras;
    usouFallbackIA = resIA.usouFallback;
  }

  return {
    proximoNode: resTurno.proximoNode,
    resultadoRolagem: resTurno.resultadoRolagem,
    fichaAtualizada: resTurno.novoSlot.characterSheet,
    worldStateAtualizado: resTurno.novoSlot.worldState,
    turnEvent: ultimoEvento,
    slotAtualizado: resTurno.novoSlot,
    textoEnriquecido,
    vozesExtras,
    usouFallbackIA,
    notificacoesCompanheiros: resTurno.notificacoesCompanheiros,
    escolhaRealizada: resTurno.escolhaRealizada,
  };
}

/**
 * Consulta de enriquecimento de IA fora do caminho crítico de renderização da cena.
 */
export async function obterTextoMestreAction(params: {
  slotId: string;
  nodeId: string;
  journeyId?: string;
  escolhaTexto?: string;
  resultadoDado?: ResultadoRolagem | null;
}) {
  const user = await validarProprietario();
  const repo = getSaveRepository();
  const resSlot = await repo.obterSlotPorId(user.id, params.slotId);
  if (!resSlot.ok) {
    throw new Error('Slot não encontrado para gerar narrativa do Mestre.');
  }

  const node = obterNodeQualquerJornada(params.nodeId, params.journeyId);
  if (!node) {
    throw new Error('Cena não encontrada.');
  }

  return enriquecerCenaComIA({
    noDestino: node,
    resultadoDado: params.resultadoDado || null,
    escolhaTexto: params.escolhaTexto || '',
    ficha: resSlot.valor.characterSheet,
    worldState: resSlot.valor.worldState,
  });
}

/**
 * Desfaz o último turno restaurando com precisão o snapshot anterior.
 */
export async function desfazerTurnoAction(slotId: string): Promise<SaveSlot> {
  const user = await validarProprietario();
  const repo = getSaveRepository();
  const res = await repo.desfazerUltimoTurno(user.id, slotId);
  if (!res.ok) {
    throw new Error(res.mensagem);
  }
  return res.valor;
}

export interface RerrolarInspiracaoParams {
  nodeId: string;
  escolhaId: string;
  slotId?: string;
  ficha: FichaPersonagem;
  worldState: WorldState;
  turnNumber: number;
  journeyId?: string;
}

export async function rerrolarTesteInspiracaoAction(
  params: RerrolarInspiracaoParams
): Promise<RespostaTurnoAction> {
  const user = await validarProprietario();
  const repo = getSaveRepository();

  if (params.slotId) {
    const resSlot = await repo.obterSlotPorId(user.id, params.slotId);
    if (resSlot.ok) {
      const slot = resSlot.valor;
      if (slot.characterSheet.inspiracao <= 0) {
        throw new Error('Sem Pontos de Inspiração disponíveis para rerrolagem.');
      }

      // Desfaz o último turno para voltar ao estado antes do teste
      const resDesfazer = await repo.desfazerUltimoTurno(user.id, params.slotId);
      if (!resDesfazer.ok) {
        throw new Error('Não foi possível restaurar o estado pré-teste para rerrolagem.');
      }

      // Gasta 1 de inspiração no snapshot restaurado
      const slotRestaurado = resDesfazer.valor;
      slotRestaurado.characterSheet.inspiracao = Math.max(0, slotRestaurado.characterSheet.inspiracao - 1);

      // Reexecuta o turno com novo dado gerado no servidor
      return processarEscolhaAction({
        nodeId: params.nodeId,
        escolhaId: params.escolhaId,
        slotId: params.slotId,
        versaoEsperada: slotRestaurado.versao,
        ficha: slotRestaurado.characterSheet,
        worldState: slotRestaurado.worldState,
        turnNumber: slotRestaurado.turnHistory.length + 1,
        journeyId: params.journeyId,
      });
    }
  }

  // Fallback padrão com inspiração
  const nodeAtual = obterNodeQualquerJornada(params.nodeId, params.journeyId);
  if (!nodeAtual) throw new Error(`Cena '${params.nodeId}' não encontrada.`);
  const escolha = nodeAtual.escolhas.find((e) => e.id === params.escolhaId);
  if (!escolha || escolha.tipo !== 'teste_atributo') {
    throw new Error('Escolha não elegível para rerrolagem com Inspiração.');
  }

  return processarEscolhaAction({
    nodeId: params.nodeId,
    escolhaId: params.escolhaId,
    ficha: {
      ...params.ficha,
      inspiracao: Math.max(0, (params.ficha.inspiracao || 2) - 1),
    },
    worldState: params.worldState,
    turnNumber: params.turnNumber,
    journeyId: params.journeyId,
  });
}

export interface ProcessarAcaoLivreParams {
  nodeId: string;
  textoAcaoLivre: string;
  ficha: FichaPersonagem;
  worldState: WorldState;
  turnNumber: number;
  dadosFixos?: [number, number];
  usarIA?: boolean;
  journeyId?: string;
  slotId?: string;
  versaoEsperada?: number;
}

export async function processarAcaoLivreAction(
  params: ProcessarAcaoLivreParams
): Promise<RespostaTurnoAction> {
  await validarProprietario();
  const nodeAtual = obterNodeQualquerJornada(params.nodeId, params.journeyId);
  if (!nodeAtual) throw new Error(`Cena '${params.nodeId}' não encontrada.`);

  const classificacao = await classificarAcaoLivre(
    params.textoAcaoLivre,
    nodeAtual,
    params.ficha
  );

  const resEscolha = await processarEscolhaAction({
    nodeId: params.nodeId,
    escolhaId: classificacao.escolhaId,
    ficha: params.ficha,
    worldState: params.worldState,
    turnNumber: params.turnNumber,
    dadosFixos: params.dadosFixos,
    usarIA: params.usarIA,
    journeyId: params.journeyId,
    slotId: params.slotId,
    versaoEsperada: params.versaoEsperada,
  });

  resEscolha.turnEvent.choiceMade = `[Ação Livre] ${params.textoAcaoLivre}`;
  resEscolha.classificacao = classificacao;

  return resEscolha;
}
