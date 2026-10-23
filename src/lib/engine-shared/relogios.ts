import { WorldState } from '@/server/engine/rpgEngine';

export interface RelogioDef {
  id: string;
  nome: string;
  prefixo: string;
  segmentos: number;
  flagCheio: string;
}

export const RELOGIOS_JORNADA_4: Record<string, RelogioDef> = {
  cerco: {
    id: 'cerco',
    nome: 'O Cerco de Castelo Negro',
    prefixo: 'tick_cerco_',
    segmentos: 6,
    flagCheio: 'cerco_cheio',
  },
  fissura: {
    id: 'fissura',
    nome: 'A Fissura da Patrulha',
    prefixo: 'tick_fissura_',
    segmentos: 4,
    flagCheio: 'fissura_cheia',
  },
};

/**
 * Conta o número de flags ativas com um determinado prefixo no WorldState.
 */
export function contarFlags(worldState: WorldState, prefixo: string): number {
  if (!worldState.flagsBorboleta) return 0;
  let total = 0;
  for (const [k, v] of Object.entries(worldState.flagsBorboleta)) {
    if (k.startsWith(prefixo) && Boolean(v)) {
      total++;
    }
  }
  return total;
}

/**
 * Avalia o estado de um relógio de consequências derivando se atingiu o limite de segmentos.
 */
export function avaliarRelogio(
  worldState: WorldState,
  def: RelogioDef
): {
  id: string;
  valor: number;
  maximo: number;
  cheio: boolean;
  flagCheio: string;
} {
  const valor = contarFlags(worldState, def.prefixo);
  const cheio = valor >= def.segmentos;
  return {
    id: def.id,
    valor: Math.min(valor, def.segmentos),
    maximo: def.segmentos,
    cheio,
    flagCheio: def.flagCheio,
  };
}

/**
 * Sincroniza as flags derivadas de relógios no WorldState se o relógio estiver cheio.
 */
export function sincronizarFlagsDeRelogios(
  worldState: WorldState,
  relogios: RelogioDef[]
): WorldState {
  const flagsAtualizadas = { ...(worldState.flagsBorboleta || {}) };
  let alterou = false;

  for (const rel of relogios) {
    const avaliacao = avaliarRelogio(worldState, rel);
    if (avaliacao.cheio && !flagsAtualizadas[rel.flagCheio]) {
      flagsAtualizadas[rel.flagCheio] = true;
      alterou = true;
    }
  }

  if (!alterou) return worldState;

  return {
    ...worldState,
    flagsBorboleta: flagsAtualizadas,
  };
}
