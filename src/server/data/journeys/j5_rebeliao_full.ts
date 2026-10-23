import 'server-only';
import { GrafoJornada, NodeJornada } from '@/server/engine/storyLinter';
import { grafoJ5Ato1 } from './j5_act1';
import { grafoJ5Ato2 } from './j5_act2';
import { grafoJ5Ato3 } from './j5_act3';
import { grafoJ5Ato4 } from './j5_act4';

const todosNosJ5: Record<string, NodeJornada> = {
  ...grafoJ5Ato1.nodes,
  ...grafoJ5Ato2.nodes,
  ...grafoJ5Ato3.nodes,
  ...grafoJ5Ato4.nodes,
};

export const grafoJornada5Completo: GrafoJornada = {
  id: 'jornada_5_rebeliao_completa',
  titulo: 'A Rebelião de Robert (282 a 283 d.C.)',
  startNodeId: 'j5_a1_o_chamado_do_ninho',
  nodes: todosNosJ5,
};

export function obterNodeJornada5(nodeId: string): NodeJornada | undefined {
  return grafoJornada5Completo.nodes[nodeId];
}
