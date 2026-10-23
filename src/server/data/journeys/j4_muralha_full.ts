import 'server-only';
import { GrafoJornada, NodeJornada } from '@/server/engine/storyLinter';
import { grafoJ4Ato1 } from './j4_act1';
import { grafoJ4Ato2 } from './j4_act2';
import { grafoJ4Ato3 } from './j4_act3';
import { grafoJ4Ato3BOeste } from './j4_act3b_oeste';
import { grafoJ4Ato4 } from './j4_act4';

const todosNosJ4: Record<string, NodeJornada> = {
  ...grafoJ4Ato1.nodes,
  ...grafoJ4Ato2.nodes,
  ...grafoJ4Ato3.nodes,
  ...grafoJ4Ato3BOeste.nodes,
  ...grafoJ4Ato4.nodes,
};

// =========================================================================
// CONEXÃO ATO 1 -> ATO 2 (Garante >= 2 escolhas no checkpoint)
// =========================================================================

todosNosJ4['j4_a1_checkpoint_conclusao'] = {
  ...todosNosJ4['j4_a1_checkpoint_conclusao'],
  isEnding: false,
  escolhas: [
    {
      id: 'esc_transicao_j4_a1_a2_jon_ferido',
      texto: 'Correr ao portão sul ao ouvir o relincho do cavalo exausto de Jon Snow (Ato II).',
      tipo: 'simples',
      nextNodeId: 'j4_a2_retorno_jon_snow_ferido',
    },
    {
      id: 'esc_transicao_j4_a1_a2_castelo_vazio',
      texto: 'Reunir os irmãos no pátio e avaliar os suprimentos deixados no castelo (Ato II).',
      tipo: 'simples',
      nextNodeId: 'j4_a2_castelo_vazio',
    },
  ],
};

// =========================================================================
// CONEXÃO ATO 2 -> ATO 3 (Garante >= 2 escolhas na vigília)
// =========================================================================

todosNosJ4['j4_a2_vigilia_da_meia_noite'] = {
  ...todosNosJ4['j4_a2_vigilia_da_meia_noite'],
  isEnding: false,
  escolhas: [
    {
      id: 'esc_transicao_j4_a2_a3_noite_cai',
      texto: 'Erguer o escudo e formar a parede de combate na escuridão (Ato III).',
      tipo: 'simples',
      delta: { marcoConcluido: 'ato2_concluido' },
      nextNodeId: 'j4_a3_a_noite_cai',
    },
    {
      id: 'esc_transicao_j4_a2_a3_combate_patio',
      texto: 'Avançar com a lâmina desembainhada direto ao pátio para conter a primeira onda (Ato III).',
      tipo: 'simples',
      delta: { marcoConcluido: 'ato2_concluido' },
      nextNodeId: 'j4_a3_combate_no_patio',
    },
    {
      id: 'esc_transicao_j4_a2_a3b_marcha_oeste',
      texto: 'Juntar-se à coluna de emergência de Bowen Marsh rumo à Ponte das Caveiras no Oeste (Ato III-B).',
      tipo: 'simples',
      delta: { flagsAdicionadas: ['expedicao_oeste_iniciada'], marcoConcluido: 'ato2_concluido' },
      nextNodeId: 'j4_a3b_marcha_para_o_oeste',
    },
  ],
};

// =========================================================================
// CONEXÃO ATO 3 -> ATO 4 (Garante >= 2 escolhas no comando de Jon)
// =========================================================================

todosNosJ4['j4_a3_comando_de_jon'] = {
  ...todosNosJ4['j4_a3_comando_de_jon'],
  isEnding: false,
  escolhas: [
    {
      id: 'esc_transicao_j4_a3_a4_reforcos',
      texto: 'Bater o punho no peito em continência a Jon e descer para receber a comitiva do leste (Ato IV).',
      tipo: 'simples',
      delta: { marcoConcluido: 'ato3_concluido' },
      nextNodeId: 'j4_a4_thorne_e_slynt_chegam',
    },
    {
      id: 'esc_transicao_j4_a3_a4_vigilia_topo',
      texto: 'Manter a vigília no topo da Muralha até a chegada dos oficiais de Vigilância do Mar (Ato IV).',
      tipo: 'simples',
      delta: { marcoConcluido: 'ato3_concluido' },
      nextNodeId: 'j4_a4_thorne_e_slynt_chegam',
    },
    {
      id: 'esc_transicao_j4_a3_a3b_ponte_caveiras',
      texto: 'Oferecer-se para cavalgar a oeste em socorro da coluna de Bowen Marsh na Ponte das Caveiras (Ato III-B).',
      tipo: 'simples',
      delta: { flagsAdicionadas: ['socorro_oeste_tardio'] },
      nextNodeId: 'j4_a3b_marcha_para_o_oeste',
    },
  ],
};

export const grafoJornada4Completo: GrafoJornada = {
  id: 'jornada_4_muralha_completa',
  titulo: 'Irmão Sem Nome &bull; A Batalha de Castelo Negro (299 a 300 d.C.)',
  startNodeId: 'j4_a1_cinzas_do_punho',
  nodes: todosNosJ4,
};

export function obterNodeJornada4(nodeId: string): NodeJornada | undefined {
  return grafoJornada4Completo.nodes[nodeId];
}
