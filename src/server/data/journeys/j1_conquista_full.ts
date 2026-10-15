import 'server-only';
import { GrafoJornada, NodeJornada } from '@/server/engine/storyLinter';
import { grafoAto1 } from './j1_act1';
import { grafoAto2 } from './j1_act2';
import { grafoAto3 } from './j1_act3';
import { grafoAto4 } from './j1_act4';

const todosNos: Record<string, NodeJornada> = {
  ...grafoAto1.nodes,
  ...grafoAto2.nodes,
  ...grafoAto3.nodes,
  ...grafoAto4.nodes,
};

// =========================================================================
// CONEXÃO ATO 1 -> ATO 2
// =========================================================================

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
      id: 'esc_transicao_a1_a2_harrenhal_direto',
      texto: 'Avançar com Balerion até os muros de Harrenhal e exigir a rendição do Rei Harren, o Negro (Ato II).',
      tipo: 'simples',
      nextNodeId: 'j1_a2_revolta_terras_fluviais',
    },
    {
      id: 'esc_transicao_a1_a2_garra_apoio',
      texto: 'Enviar emissários à Ponta da Garra Rachada antes do assalto final ao Olho de Deus (Ato II).',
      tipo: 'simples',
      nextNodeId: 'j1_a2_submissao_garra_rachada',
    },
  ],
};

todosNos['j1_a1_checkpoint_tempestade'] = {
  ...todosNos['j1_a1_checkpoint_tempestade'],
  isEnding: false,
  escolhas: [
    {
      id: 'esc_transicao_a1_a2_tempestade',
      texto: 'Marchar com Orys Baratheon e a Rainha Rhaenys para enfrentar Argilac, o Arrogante (Ato II).',
      tipo: 'simples',
      nextNodeId: 'j1_a2_marcha_ultima_tempestade',
    },
    {
      id: 'esc_transicao_a1_a2_batalha_direto',
      texto: 'Avançar pela Mata de Chuva em linha de batalha contra a vanguarda dos Durrandon (Ato II).',
      tipo: 'simples',
      nextNodeId: 'j1_a2_batalha_ultima_tempestade',
    },
  ],
};

// =========================================================================
// CONEXÃO ATO 2 -> ATO 3
// =========================================================================

todosNos['j1_a2_checkpoint_campo_de_fogo'] = {
  ...todosNos['j1_a2_checkpoint_campo_de_fogo'],
  isEnding: false,
  escolhas: [
    {
      id: 'esc_avancar_ato3_campo_fogo',
      texto: 'Montar em Balerion e marchar com os três dragões para as planícies da Campina (Ato III).',
      tipo: 'simples',
      nextNodeId: 'j1_a3_alianca_dois_reis',
    },
    {
      id: 'esc_avancar_ato3_posicionamento_estrategico',
      texto: 'Reunir os comandantes ribeirinhos e planejar o posicionamento no Campo de Fogo (Ato III).',
      tipo: 'simples',
      nextNodeId: 'j1_a3_posicionamento_campo_fogo',
    },
  ],
};

todosNos['j1_a2_checkpoint_norte_tridente'] = {
  ...todosNos['j1_a2_checkpoint_norte_tridente'],
  isEnding: false,
  escolhas: [
    {
      id: 'esc_avancar_ato3_norte_direto',
      texto: 'Voar imediatamente para o Tridente ao encontro do exército de Torrhen Stark (Ato III).',
      tipo: 'simples',
      nextNodeId: 'j1_a3_lobo_no_tridente',
    },
    {
      id: 'esc_avancar_ato3_conspiracao_snow',
      texto: 'Investigar os espias nortenhos ao redor das fogueiras do Tridente (Ato III).',
      tipo: 'simples',
      nextNodeId: 'j1_a3_conspiracao_brandon_snow',
    },
  ],
};

// =========================================================================
// CONEXÃO ATO 3 -> ATO 4
// =========================================================================

todosNos['j1_a3_vitoria_conquista'] = {
  ...todosNos['j1_a3_vitoria_conquista'],
  isEnding: false,
  escolhas: [
    {
      id: 'esc_avancar_ato4_ilhas_ferro',
      texto: 'Partir imediatamente com Balerion para sufocar a anarquia sangrenta nas Ilhas de Ferro (Ato IV).',
      tipo: 'simples',
      nextNodeId: 'j1_a4_expedicao_ilhas_ferro',
    },
    {
      id: 'esc_avancar_ato4_dorne_diplomacia',
      texto: 'Enviar uma primeira embaixada solene e altiva a Lançassolar exigindo a submissão de Dorne (Ato IV).',
      tipo: 'teste_atributo',
      atributo: 'cortesia',
      dc: 10,
      onSuccessNodeId: 'j1_a4_primeira_embaixada_dorne',
      onPartialFailureNodeId: 'j1_a4_expedicao_ilhas_ferro',
    },
  ],
};

export const grafoJornada1Completo: GrafoJornada = {
  id: 'jornada_1_conquista_completa',
  titulo: 'A Conquista de Aegon &bull; Os Quatro Atos Completos (2 a.C. a 13 d.C.)',
  startNodeId: 'j1_a1_mesa_pintada',
  nodes: todosNos,
};

export function obterNodeJornada1(nodeId: string): NodeJornada | undefined {
  return grafoJornada1Completo.nodes[nodeId];
}
