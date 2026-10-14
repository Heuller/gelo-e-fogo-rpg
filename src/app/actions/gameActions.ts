'use server';

import {
  obterGrafoJornada,
  obterNodeQualquerJornada,
  obterCenaInicialJornada,
  normalizarIdJornada,
} from '@/server/data/journeys/index';
import { NodeJornada } from '@/server/engine/storyLinter';
import {
  FichaPersonagem,
  WorldState,
  ResultadoRolagem,
  rolar2d6,
  aplicarDeltaEstado,
  DeltaEstado,
} from '@/server/engine/rpgEngine';
import { TurnEvent } from '@/server/engine/saveManager';
import {
  classificarAcaoLivre,
  enriquecerCenaComIA,
  ClassificacaoAcaoLivre,
  VozExtra,
} from '@/server/ai/geminiMaster';

export async function obterCenaInicialAction(journeyId?: string): Promise<{
  node: NodeJornada;
  fichaInicial: FichaPersonagem;
  worldStateInicial: WorldState;
}> {
  return obterCenaInicialJornada(journeyId);
}

export async function obterCenaPorIdAction(
  nodeId: string,
  journeyId?: string
): Promise<NodeJornada | null> {
  const node = obterNodeQualquerJornada(nodeId, journeyId);
  return node || null;
}

export interface ProcessarEscolhaParams {
  nodeId: string;
  escolhaId: string;
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
  classificacao?: ClassificacaoAcaoLivre;
  textoEnriquecido?: string;
  vozesExtras?: VozExtra[];
  usouFallbackIA?: boolean;
}

export async function processarEscolhaAction(
  params: ProcessarEscolhaParams
): Promise<RespostaTurnoAction> {
  const nodeAtual = obterNodeQualquerJornada(params.nodeId, params.journeyId);
  if (!nodeAtual) {
    throw new Error(`Cena '${params.nodeId}' não encontrada.`);
  }

  const escolha = nodeAtual.escolhas.find((e) => e.id === params.escolhaId);
  if (!escolha) {
    throw new Error(`Escolha '${params.escolhaId}' não encontrada na cena '${params.nodeId}'.`);
  }

  let proximoNodeId: string;
  let resultadoRolagem: ResultadoRolagem | null = null;
  let deltaConsequencia: DeltaEstado = {};

  if (escolha.tipo === 'simples') {
    proximoNodeId = escolha.nextNodeId;
  } else {
    const valorAtributo = params.ficha.atributos[escolha.atributo];
    resultadoRolagem = rolar2d6(valorAtributo, escolha.dc, {
      riscoMortal: escolha.riscoMortal,
      dadosFixos: params.dadosFixos,
    });

    if (resultadoRolagem.resultado === 'CRITICO') {
      proximoNodeId = escolha.onCriticalSuccessNodeId || escolha.onSuccessNodeId;
      deltaConsequencia.honra = 2;
    } else if (resultadoRolagem.resultado === 'SUCESSO') {
      proximoNodeId = escolha.onSuccessNodeId;
      deltaConsequencia.honra = 1;
    } else if (resultadoRolagem.resultado === 'FALHA_PARCIAL') {
      proximoNodeId = escolha.onPartialFailureNodeId;
      deltaConsequencia.honra = -1;
      deltaConsequencia.compostura = -1;
    } else {
      proximoNodeId = escolha.onCriticalFailureNodeId || escolha.onPartialFailureNodeId;
      deltaConsequencia.honra = -2;
      deltaConsequencia.sangue = -3;
      if (escolha.riscoMortal) {
        deltaConsequencia.sangue = -10;
      }
    }
  }

  const proximoNode = obterNodeQualquerJornada(proximoNodeId, params.journeyId);
  if (!proximoNode) {
    throw new Error(`Nó de destino '${proximoNodeId}' não encontrado.`);
  }

  const deltaTotal: DeltaEstado = {
    ...deltaConsequencia,
    ...(proximoNode.deltaEstado || {}),
  };

  const { fichaAtualizada, worldStateAtualizado } = aplicarDeltaEstado(
    params.ficha,
    params.worldState,
    deltaTotal
  );

  const turnEvent: TurnEvent = {
    slotId: 'slot_1',
    userId: params.ficha.id,
    turnNumber: params.turnNumber,
    nodeId: params.nodeId,
    choiceMade: escolha.texto,
    stateDelta: deltaTotal,
    timestamp: new Date().toISOString(),
  };

  let textoEnriquecido = proximoNode.fallbackText;
  let vozesExtras: VozExtra[] = [];
  let usouFallbackIA = true;

  if (params.usarIA) {
    const resIA = await enriquecerCenaComIA({
      noDestino: proximoNode,
      resultadoDado: resultadoRolagem,
      escolhaTexto: escolha.texto,
      ficha: fichaAtualizada,
      worldState: worldStateAtualizado,
    });
    textoEnriquecido = resIA.textoEnriquecido;
    vozesExtras = resIA.vozesExtras;
    usouFallbackIA = resIA.usouFallback;
  }

  return {
    proximoNode,
    resultadoRolagem,
    fichaAtualizada,
    worldStateAtualizado,
    turnEvent,
    textoEnriquecido,
    vozesExtras,
    usouFallbackIA,
  };
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
}

export async function processarAcaoLivreAction(
  params: ProcessarAcaoLivreParams
): Promise<RespostaTurnoAction> {
  const nodeAtual = obterNodeQualquerJornada(params.nodeId, params.journeyId);
  if (!nodeAtual) {
    throw new Error(`Cena '${params.nodeId}' não encontrada.`);
  }

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
  });

  // Atualiza o evento de turno com a ação personalizada do jogador
  resEscolha.turnEvent.choiceMade = `[Ação Livre] ${params.textoAcaoLivre}`;
  resEscolha.classificacao = classificacao;

  return resEscolha;
}
