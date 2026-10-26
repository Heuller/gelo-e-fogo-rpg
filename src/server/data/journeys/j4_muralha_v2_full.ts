import 'server-only';
import { GrafoJornada, NodeJornada } from '@/server/engine/storyLinter';
import { grafoJ4Ato1V2 } from './j4_act1_v2';
import { grafoJ4Ato2V2 } from './j4_act2_v2';
import { grafoJ4Ato3V2 } from './j4_act3_v2';
import { grafoJ4Ato4V2 } from './j4_act4_v2';

const todosNosJ4V2: Record<string, NodeJornada> = {
  ...grafoJ4Ato1V2.nodes,
  ...grafoJ4Ato2V2.nodes,
  ...grafoJ4Ato3V2.nodes,
  ...grafoJ4Ato4V2.nodes,
};

// =============================================================================
// TRANSIÇÃO ATO I -> ATO II (O Balanço em Craster -> As Tensões do Motim)
// =============================================================================
todosNosJ4V2['j4_a1_acerto_de_contas_craster'] = {
  ...todosNosJ4V2['j4_a1_acerto_de_contas_craster'],
  isEnding: false,
  escolhas: [
    {
      id: 'esc_transicao_j4_a1_a2_vigilia_mormont',
      texto: 'Manter vigília junto ao Velho Urso e observar as tensões crescentes entre os sobreviventes (Ato II).',
      tipo: 'simples',
      desfecho: {
        ponte: 'Você permanece alerta nas sombras ao lado do Velho Urso Mormont, sentindo a raiva silenciosa fervilhar entre os irmãos famintos antes do inevitável motim.',
        destino: 'j4_a2_fortaleza_craster_tensoes',
        delta: { marcoConcluido: 'j4_ato1_concluido', honra: 1 },
      },
      nextNodeId: 'j4_a2_fortaleza_craster_tensoes',
    },
    {
      id: 'esc_transicao_j4_a1_a2_inspecionar_feridos',
      texto: 'Ajudar Samwell Tarly a cuidar dos irmãos convalescentes no canto do estábulo (Ato II).',
      tipo: 'simples',
      desfecho: {
        ponte: 'Você caminha entre as baias escuras e fétidas, amparando os recrutas feridos enquanto os conspiradores afiam as adagas longe da vista do comandante.',
        destino: 'j4_a2_fortaleza_craster_tensoes',
        delta: { marcoConcluido: 'j4_ato1_concluido', compostura: 1 },
      },
      nextNodeId: 'j4_a2_fortaleza_craster_tensoes',
    },
  ],
};

// =============================================================================
// TRANSIÇÃO ATO II -> ATO III (Retorno a Castelo Negro -> Barricadas de Gelo)
// =============================================================================
todosNosJ4V2['j4_a2_acerto_de_contas_castelo_negro'] = {
  ...todosNosJ4V2['j4_a2_acerto_de_contas_castelo_negro'],
  isEnding: false,
  escolhas: [
    {
      id: 'esc_transicao_j4_a2_a3_arsenal_noye',
      texto: 'Apresentar-se a Donal Noye no arsenal para forjar pontas de flecha e fortificar as paliçadas (Ato III).',
      tipo: 'simples',
      desfecho: {
        ponte: 'O martelo de ferro de Donal Noye ruge contra a bigorna sob o brilho rubro da forja enquanto você prepara as defesas de Castelo Negro.',
        destino: 'j4_a3_preparativos_barricadas',
        delta: { marcoConcluido: 'j4_ato2_concluido', compostura: 1 },
      },
      nextNodeId: 'j4_a3_preparativos_barricadas',
    },
    {
      id: 'esc_transicao_j4_a2_a3_patrulha_amuradas',
      texto: 'Assumir posição de vigia nas paliçadas de madeira com Jon Snow para perscrutar o sul (Ato III).',
      tipo: 'simples',
      desfecho: {
        ponte: 'O vento uivante gela sua capa negra nas paliçadas enquanto você perscruta as sombras da floresta, onde os invasores Thenn espreitam na escuridão.',
        destino: 'j4_a3_preparativos_barricadas',
        delta: { marcoConcluido: 'j4_ato2_concluido', honra: 1 },
      },
      nextNodeId: 'j4_a3_preparativos_barricadas',
    },
  ],
};

// =============================================================================
// TRANSIÇÃO ATO III -> ATO IV (O Portão Norte -> Cem Mil Tochas de Mance)
// =============================================================================
todosNosJ4V2['j4_a3_acerto_de_contas_portao_norte'] = {
  ...todosNosJ4V2['j4_a3_acerto_de_contas_portao_norte'],
  isEnding: false,
  escolhas: [
    {
      id: 'esc_transicao_j4_a3_a4_subir_muralha_jon',
      texto: 'Subir às amuradas superiores da Muralha com Jon Snow para vigiar a hoste de cem mil selvagens (Ato IV).',
      tipo: 'simples',
      desfecho: {
        ponte: 'A gaiola de ferro sobe rangendo pelo paredão de setecentos pés até o topo gelado, onde a floresta inteira parece pulsar com as tochas de Mance Rayder.',
        destino: 'j4_a4_o_cerco_massivo_do_norte',
        delta: { marcoConcluido: 'j4_ato3_concluido', honra: 1 },
      },
      nextNodeId: 'j4_a4_o_cerco_massivo_do_norte',
    },
    {
      id: 'esc_transicao_j4_a3_a4_operar_guinchos',
      texto: 'Ajustar as roldanas dos arremessadores de gelo e cascalho no cume da Muralha (Ato IV).',
      tipo: 'simples',
      desfecho: {
        ponte: 'Você trava os pinos de segurança dos guinchos pesados sob a nevasca implacável, aprontando as pedras colossais para conter os mamutes.',
        destino: 'j4_a4_o_cerco_massivo_do_norte',
        delta: { marcoConcluido: 'j4_ato3_concluido', compostura: 1 },
      },
      nextNodeId: 'j4_a4_o_cerco_massivo_do_norte',
    },
  ],
};

export const grafoJornada4CompletoV2: GrafoJornada = {
  id: 'jornada_4_patrulha_muralha',
  titulo: 'Jornada 4: Irmão Sem Nome — A Sentinela do Gelo',
  startNodeId: 'j4_a1_cinzas_do_punho',
  nodes: todosNosJ4V2,
};

export function obterNodeJornada4V2(nodeId: string): NodeJornada | undefined {
  return todosNosJ4V2[nodeId];
}
