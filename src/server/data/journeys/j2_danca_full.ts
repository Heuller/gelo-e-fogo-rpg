import 'server-only';
import { GrafoJornada, NodeJornada } from '@/server/engine/storyLinter';
import { grafoJ2Ato1 } from './j2_act1';
import { grafoJ2Ato2 } from './j2_act2';
import { grafoJ2Ato3 } from './j2_act3';
import { grafoJ2Ato4 } from './j2_act4';

const todosNosJ2: Record<string, NodeJornada> = {
  ...grafoJ2Ato1.nodes,
  ...grafoJ2Ato2.nodes,
  ...grafoJ2Ato3.nodes,
  ...grafoJ2Ato4.nodes,
};

// =========================================================================
// CONEXÃO ATO 1 -> ATO 2
// =========================================================================

todosNosJ2['j2_a1_checkpoint_conclusao'] = {
  ...todosNosJ2['j2_a1_checkpoint_conclusao'],
  isEnding: false,
  escolhas: [
    {
      id: 'esc_transicao_j2_a1_a2_cargyll',
      texto: 'Desvendar as conspirações de espiões em Pedra do Dragão e enfrentar o duelo dos gêmeos Cargyll (Ato II).',
      tipo: 'simples',
      nextNodeId: 'j2_a2_duelo_gemeos_cargyll',
    },
    {
      id: 'esc_transicao_j2_a1_a2_gralhas_direto',
      texto: 'Marchar com urgência militar para as defesas da Baía e Pouso de Gralhas (Ato II).',
      tipo: 'simples',
      nextNodeId: 'j2_a2_marcha_cole_pouso_gralhas',
    },
  ],
};

// =========================================================================
// CONEXÃO ATO 2 -> ATO 3
// =========================================================================

todosNosJ2['j2_a2_checkpoint_conclusao'] = {
  ...todosNosJ2['j2_a2_checkpoint_conclusao'],
  isEnding: false,
  escolhas: [
    {
      id: 'esc_transicao_j2_a2_a3_tridente',
      texto: 'Marchar para o Tridente onde Aemond e Vhagar incendeiam as terras ribeirinhas (Ato III).',
      tipo: 'simples',
      nextNodeId: 'j2_a3_aemond_chamas_fluviais',
    },
    {
      id: 'esc_transicao_j2_a2_a3_tumbleton',
      texto: 'Despachar as sementes de dragão Vermithor e Asaprata para defender Tumbleton (Ato III).',
      tipo: 'simples',
      nextNodeId: 'j2_a3_conspiracao_tumbleton_primeira',
    },
  ],
};

// =========================================================================
// CONEXÃO ATO 3 -> ATO 4
// =========================================================================

todosNosJ2['j2_a3_checkpoint_conclusao'] = {
  ...todosNosJ2['j2_a3_checkpoint_conclusao'],
  isEnding: false,
  escolhas: [
    {
      id: 'esc_transicao_j2_a3_a4_tumbleton2',
      texto: 'Seguir com Ser Addam Velaryon e Fumaresia para o ataque noturno em Tumbleton (Ato IV).',
      tipo: 'simples',
      nextNodeId: 'j2_a4_segunda_tumbleton_ataque_noturno',
    },
    {
      id: 'esc_transicao_j2_a3_a4_pedra_dragao',
      texto: 'Navegar com urgência para Pedra do Dragão onde Aegon II aguarda em emboscada (Ato IV).',
      tipo: 'simples',
      nextNodeId: 'j2_a4_emboscada_pedra_dragao_aegon_ii',
    },
  ],
};

export const grafoJornada2Completo: GrafoJornada = {
  id: 'jornada_2_danca_completa',
  titulo: 'A Dança dos Dragões &bull; Os Quatro Atos Completos (129 a 131 d.C.)',
  startNodeId: 'j2_a1_morte_viserys_conselho_verde',
  nodes: todosNosJ2,
};

export function obterNodeJornada2(nodeId: string): NodeJornada | undefined {
  return grafoJornada2Completo.nodes[nodeId];
}
