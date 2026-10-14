'use server';

import { grafoJornada1Completo, obterNodeJornada1 } from '@/server/data/journeys/j1_conquista_full';
import { NodeJornada } from '@/server/engine/storyLinter';
import {
  FichaPersonagem,
  WorldState,
  ResultadoRolagem,
  rolar2d6,
  aplicarDeltaEstado,
  DeltaEstado,
  AtributoVoz,
} from '@/server/engine/rpgEngine';
import { TurnEvent } from '@/server/engine/saveManager';
import {
  classificarAcaoLivre,
  enriquecerCenaComIA,
  ClassificacaoAcaoLivre,
  VozExtra,
} from '@/server/ai/geminiMaster';

export async function obterCenaInicialAction(): Promise<{
  node: NodeJornada;
  fichaInicial: FichaPersonagem;
  worldStateInicial: WorldState;
}> {
  const node = grafoJornada1Completo.nodes[grafoJornada1Completo.startNodeId];

  const fichaInicial: FichaPersonagem = {
    id: 'aegon-conquistador',
    nome: 'Aegon I Targaryen',
    origem: 'sangue_valiriano',
    atributos: {
      comando: 5,
      furia: 4,
      astucia: 3,
      cortesia: 3,
      erudicao: 3,
      pressagio: 4,
    },
    estado: {
      sangue: 10,
      compostura: 10,
      honra: 5,
    },
    cicatrizes: [],
    segredos: ['A carta secreta do Banco de Bravos', 'A profecia de Daenys a Sonhadora'],
  };

  const worldStateInicial: WorldState = {
    reputacaoCasas: { Targaryen: 10 },
    flagsBorboleta: { jogo_iniciado: true },
    marcosConcluidos: ['2_ac_mesa_pintada'],
  };

  return { node, fichaInicial, worldStateInicial };
}

export async function obterCenaPorIdAction(nodeId: string): Promise<NodeJornada | null> {
  const node = obterNodeJornada1(nodeId);
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
  const nodeAtual = obterNodeJornada1(params.nodeId);
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

  const proximoNode = obterNodeJornada1(proximoNodeId);
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
}

export async function processarAcaoLivreAction(
  params: ProcessarAcaoLivreParams
): Promise<RespostaTurnoAction> {
  const nodeAtual = obterNodeJornada1(params.nodeId);
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
  });

  // Atualiza o evento de turno com a ação personalizada do jogador
  resEscolha.turnEvent.choiceMade = `[Ação Livre] ${params.textoAcaoLivre}`;
  resEscolha.classificacao = classificacao;

  return resEscolha;
}
