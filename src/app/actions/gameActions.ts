'use server';

import { grafoAto1, obterNodeAto1 } from '@/server/data/journeys/j1_act1';
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

export async function obterCenaInicialAction(): Promise<{
  node: NodeJornada;
  fichaInicial: FichaPersonagem;
  worldStateInicial: WorldState;
}> {
  const node = grafoAto1.nodes[grafoAto1.startNodeId];

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
  const node = obterNodeAto1(nodeId);
  return node || null;
}

export interface ProcessarEscolhaParams {
  nodeId: string;
  escolhaId: string;
  ficha: FichaPersonagem;
  worldState: WorldState;
  turnNumber: number;
  dadosFixos?: [number, number];
}

export async function processarEscolhaAction(params: ProcessarEscolhaParams): Promise<{
  proximoNode: NodeJornada;
  resultadoRolagem: ResultadoRolagem | null;
  fichaAtualizada: FichaPersonagem;
  worldStateAtualizado: WorldState;
  turnEvent: TurnEvent;
}> {
  const nodeAtual = obterNodeAto1(params.nodeId);
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
    // Teste de Atributo
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
      // FALHA_CRITICA
      proximoNodeId = escolha.onCriticalFailureNodeId || escolha.onPartialFailureNodeId;
      deltaConsequencia.honra = -2;
      deltaConsequencia.sangue = -3;
      if (escolha.riscoMortal) {
        deltaConsequencia.sangue = -10;
      }
    }
  }

  const proximoNode = obterNodeAto1(proximoNodeId);
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

  return {
    proximoNode,
    resultadoRolagem,
    fichaAtualizada,
    worldStateAtualizado,
    turnEvent,
  };
}
