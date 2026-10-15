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
  rerrolarUltimoTesteComInspiracao,
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
  notificacoesCompanheiros?: string[];
  escolhaRealizada?: EscolhaNode;
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

  if (escolha.aprovacaoCompanheiros) {
    deltaConsequencia.aprovacaoCompanheiros = escolha.aprovacaoCompanheiros;
  }

  if (escolha.tipo === 'simples') {
    proximoNodeId = escolha.nextNodeId;
    if (escolha.delta) {
      deltaConsequencia = { ...deltaConsequencia, ...escolha.delta };
    }
  } else {
    const valorAtributo = params.ficha.atributos[escolha.atributo];
    resultadoRolagem = rolar2d6(valorAtributo, escolha.dc, {
      riscoMortal: escolha.riscoMortal,
      dadosFixos: params.dadosFixos,
    });

    if (resultadoRolagem.resultado === 'CRITICO') {
      proximoNodeId = escolha.onCriticalSuccessNodeId || escolha.onSuccessNodeId;
      deltaConsequencia.honra = (deltaConsequencia.honra || 0) + 2;
      deltaConsequencia.inspiracao = 1;
    } else if (resultadoRolagem.resultado === 'SUCESSO') {
      proximoNodeId = escolha.onSuccessNodeId;
      deltaConsequencia.honra = (deltaConsequencia.honra || 0) + 1;
    } else if (resultadoRolagem.resultado === 'FALHA_PARCIAL') {
      proximoNodeId = escolha.onPartialFailureNodeId;
      deltaConsequencia.honra = (deltaConsequencia.honra || 0) - 1;
      deltaConsequencia.compostura = (deltaConsequencia.compostura || 0) - 1;
    } else {
      proximoNodeId = escolha.onCriticalFailureNodeId || escolha.onPartialFailureNodeId;
      deltaConsequencia.honra = (deltaConsequencia.honra || 0) - 2;
      deltaConsequencia.sangue = (deltaConsequencia.sangue || 0) - 3;
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

  const { fichaAtualizada, worldStateAtualizado, notificacoesCompanheiros } = aplicarDeltaEstado(
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
    notificacoesCompanheiros: notificacoesCompanheiros.map((n) => n.textoNotificacao),
    escolhaRealizada: escolha,
  };
}

export interface RerrolarInspiracaoParams {
  nodeId: string;
  escolhaId: string;
  ficha: FichaPersonagem;
  worldState: WorldState;
  turnNumber: number;
  journeyId?: string;
}

export async function rerrolarTesteInspiracaoAction(
  params: RerrolarInspiracaoParams
): Promise<RespostaTurnoAction> {
  const nodeAtual = obterNodeQualquerJornada(params.nodeId, params.journeyId);
  if (!nodeAtual) {
    throw new Error(`Cena '${params.nodeId}' não encontrada.`);
  }

  const escolha = nodeAtual.escolhas.find((e) => e.id === params.escolhaId);
  if (!escolha) {
    throw new Error(`Escolha '${params.escolhaId}' não encontrada na cena '${params.nodeId}'.`);
  }

  if (escolha.tipo !== 'teste_atributo') {
    throw new Error(`A escolha '${params.escolhaId}' não é um teste de atributo para rerrolagem.`);
  }

  const valorAtributo = params.ficha.atributos[escolha.atributo];
  const resRerrolagem = rerrolarUltimoTesteComInspiracao(
    params.ficha,
    escolha.dc,
    valorAtributo,
    { riscoMortal: escolha.riscoMortal }
  );

  return processarEscolhaAction({
    nodeId: params.nodeId,
    escolhaId: params.escolhaId,
    ficha: resRerrolagem.fichaAtualizada,
    worldState: params.worldState,
    turnNumber: params.turnNumber,
    dadosFixos: resRerrolagem.resultadoRolagem.dados,
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

  resEscolha.turnEvent.choiceMade = `[Ação Livre] ${params.textoAcaoLivre}`;
  resEscolha.classificacao = classificacao;

  return resEscolha;
}
