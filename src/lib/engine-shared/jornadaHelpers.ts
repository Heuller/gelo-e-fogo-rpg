import type { NodeJornada } from '@/server/engine/storyLinter';

export const MAPA_ATRIBUTOS: Record<string, string> = {
  comando: 'Comando',
  furia: 'Fúria',
  astucia: 'Astúcia',
  cortesia: 'Cortesia',
  erudicao: 'Erudição',
  pressagio: 'Presságio',
};

export function extrairNomeAtributo(node: NodeJornada | null, escolhaId: string | null): string {
  if (!escolhaId || !node) return 'Atributo';
  const esc = node.escolhas.find((e) => e.id === escolhaId);
  return esc && esc.tipo === 'teste_atributo' ? MAPA_ATRIBUTOS[esc.atributo] || 'Atributo' : 'Atributo';
}

export function getTituloJornadaFormatado(id: string): string {
  const lower = id.toLowerCase();
  if (lower.includes('danca') || lower.includes('jornada_2')) return 'Jornada 2: A Dança dos Dragões';
  if (lower.includes('tronos') || lower.includes('guerra') || lower.includes('jornada_3')) return 'Jornada 3: A Guerra dos Cinco Reis';
  if (lower.includes('patrulha') || lower.includes('muralha') || lower.includes('jornada_4')) return 'Jornada 4: Irmão Sem Nome';
  return 'Jornada 1: A Conquista de Aegon';
}
