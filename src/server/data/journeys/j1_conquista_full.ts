import 'server-only';
import { GrafoJornada, NodeJornada } from '@/server/engine/storyLinter';
import { grafoAto1 } from './j1_act1';
import { grafoAto2 } from './j1_act2';
import { grafoAto3 } from './j1_act3';

// Unifica os nós dos 3 Atos e conecta os nós de transição/checkpoint
const todosNos: Record<string, NodeJornada> = {
  ...grafoAto1.nodes,
  ...grafoAto2.nodes,
  ...grafoAto3.nodes,
};

// 1. Conecta os Checkpoints do Fim do Ato 1 ao início do Ato 2
todosNos['j1_a1_checkpoint_naval'] = {
  ...todosNos['j1_a1_checkpoint_naval'],
  isEnding: false,
  escolhas: [
    {
      id: 'esc_transicao_a1_a2_garra',
      texto: 'Com o mar dominado, voar com a Rainha Visenya para pacificar a Ponta da Garra Rachada (Ato II).',
      tipo: 'simples',
      nextNodeId: 'j1_a2_submissao_garra_rachada',
    },
    {
      id: 'esc_transicao_a1_a2_fluvial',
      texto: 'Unir forças ao cerco dos Senhores dos Rios em Harrenhal ao lado de Lorde Edmyn Tully (Ato II).',
      tipo: 'simples',
      nextNodeId: 'j1_a2_revolta_terras_fluviais',
    },
  ],
};

todosNos['j1_a1_checkpoint_fluvial'] = {
  ...todosNos['j1_a1_checkpoint_fluvial'],
  isEnding: false,
  escolhas: [
    {
      id: 'esc_transicao_a1_a2_fluvial_direto',
      texto: 'Avançar com a Rebelião dos Rios e marchar diretamente para cercar Harrenhal (Ato II).',
      tipo: 'simples',
      nextNodeId: 'j1_a2_revolta_terras_fluviais',
    },
  ],
};

todosNos['j1_a1_checkpoint_tempestade'] = {
  ...todosNos['j1_a1_checkpoint_tempestade'],
  isEnding: false,
  escolhas: [
    {
      id: 'esc_transicao_a1_a2_tempestade_direto',
      texto: 'Marchar com Orys Baratheon e a Rainha Rhaenys para travar a Batalha da Última Tempestade (Ato II).',
      tipo: 'simples',
      nextNodeId: 'j1_a2_marcha_ultima_tempestade',
    },
  ],
};

// 2. Conecta os Checkpoints do Fim do Ato 2 ao início do Ato 3
todosNos['j1_a2_checkpoint_campo_de_fogo'] = {
  ...todosNos['j1_a2_checkpoint_campo_de_fogo'],
  isEnding: false,
  escolhas: [
    {
      id: 'esc_transicao_a2_a3_campo_fogo',
      texto: 'Reunir Balerion, Vhagar e Meraxes para enfrentar os cinquenta e cinco mil homens no Campo de Fogo (Ato III).',
      tipo: 'simples',
      nextNodeId: 'j1_a3_alianca_dois_reis',
    },
  ],
};

todosNos['j1_a2_checkpoint_norte_tridente'] = {
  ...todosNos['j1_a2_checkpoint_norte_tridente'],
  isEnding: false,
  escolhas: [
    {
      id: 'esc_transicao_a2_a3_norte',
      texto: 'Avançar com urgência para interceptar os trinta mil homens do Rei Torrhen Stark no Tridente (Ato III).',
      tipo: 'simples',
      nextNodeId: 'j1_a3_lobo_no_tridente',
    },
  ],
};

export const grafoJornada1Completo: GrafoJornada = {
  id: 'jornada_1_conquista_completa',
  titulo: 'Jornada 1: A Conquista de Aegon (Completa)',
  startNodeId: grafoAto1.startNodeId,
  nodes: todosNos,
};

export function obterNodeJornada1(nodeId: string): NodeJornada | undefined {
  return grafoJornada1Completo.nodes[nodeId];
}
