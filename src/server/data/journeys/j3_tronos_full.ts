import 'server-only';
import { GrafoJornada, NodeJornada } from '@/server/engine/storyLinter';
import { grafoJ3Ato1 } from './j3_act1';
import { grafoJ3Ato2 } from './j3_act2';
import { grafoJ3Ato3 } from './j3_act3';
import { grafoJ3Ato4 } from './j3_act4';

const todosNosJ3: Record<string, NodeJornada> = {
  ...grafoJ3Ato1.nodes,
  ...grafoJ3Ato2.nodes,
  ...grafoJ3Ato3.nodes,
  ...grafoJ3Ato4.nodes,
};

// =========================================================================
// CONEXÃO ATO 1 -> ATO 2
// =========================================================================

todosNosJ3['j3_a1_checkpoint_conclusao'] = {
  ...todosNosJ3['j3_a1_checkpoint_conclusao'],
  isEnding: false,
  escolhas: [
    {
      id: 'esc_transicao_j3_a1_a2_investigacao',
      texto: 'Examinar o grande livro das linhagens de Pycelle e investigar os bastardos de Robert (Ato II).',
      tipo: 'simples',
      nextNodeId: 'j3_a2_investigacao_bastardos_livro',
    },
    {
      id: 'esc_transicao_j3_a1_a2_torneio',
      texto: 'Acompanhar a corte até as justas violentas do Torneio da Mão (Ato II).',
      tipo: 'simples',
      nextNodeId: 'j3_a2_torneio_da_mao_montanha',
    },
  ],
};

// =========================================================================
// CONEXÃO ATO 2 -> ATO 3
// =========================================================================

todosNosJ3['j3_a2_checkpoint_conclusao'] = {
  ...todosNosJ3['j3_a2_checkpoint_conclusao'],
  isEnding: false,
  escolhas: [
    {
      id: 'esc_transicao_j3_a2_a3_gargalo',
      texto: 'Marchar com Robb Stark convocando os estandartes do Norte em Fosso Cailin (Ato III).',
      tipo: 'simples',
      nextNodeId: 'j3_a3_robb_convoca_norte_gargalo',
    },
    {
      id: 'esc_transicao_j3_a2_a3_muralha',
      texto: 'Acompanhar Jon Snow em Castelo Negro enfrentando as criaturas do além (Ato III).',
      tipo: 'simples',
      nextNodeId: 'j3_a3_muralha_criatura_garra_longa',
    },
  ],
};

// =========================================================================
// CONEXÃO ATO 3 -> ATO 4
// =========================================================================

todosNosJ3['j3_a3_checkpoint_conclusao'] = {
  ...todosNosJ3['j3_a3_checkpoint_conclusao'],
  isEnding: false,
  escolhas: [
    {
      id: 'esc_transicao_j3_a3_a4_crise_karstark',
      texto: 'Retornar ao acampamento de Robb em Correrrio para enfrentar a crise com os Karstark (Ato IV).',
      tipo: 'simples',
      nextNodeId: 'j3_a4_crise_acampamento_karstark',
    },
    {
      id: 'esc_transicao_j3_a3_a4_gemeas_direto',
      texto: 'Avançar com a comitiva nupcial em direção às torres das Gêmeas (Ato IV).',
      tipo: 'simples',
      nextNodeId: 'j3_a4_banquete_das_gemeas_chuvas_castamere',
    },
  ],
};

export const grafoJornada3Completo: GrafoJornada = {
  id: 'jornada_3_tronos_completa',
  titulo: 'A Guerra dos Cinco Reis &bull; Os Quatro Atos Completos (298 a 300 d.C.)',
  startNodeId: 'j3_a1_execucao_desertor_lobos',
  nodes: todosNosJ3,
};

export function obterNodeJornada3(nodeId: string): NodeJornada | undefined {
  return grafoJornada3Completo.nodes[nodeId];
}
