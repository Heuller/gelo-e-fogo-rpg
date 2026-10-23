import { EscolhaNode } from '@/server/engine/storyLinter';
import { FichaPersonagem, WorldState } from '@/server/engine/rpgEngine';

export interface ValidacaoEscolhaResult {
  desbloqueada: boolean;
  motivo?: string;
  flagsFaltantes?: string[];
}

/**
 * Validação pura compartilhada entre cliente e servidor para verificar
 * se uma escolha narrativa está disponível ou bloqueada.
 */
export function validarEscolhaDesbloqueada(
  escolha: EscolhaNode,
  worldState: WorldState,
  ficha: FichaPersonagem
): ValidacaoEscolhaResult {
  const flagsAtivas = new Set<string>();
  for (const [f, v] of Object.entries(worldState.flagsBorboleta || {})) {
    if (Boolean(v)) flagsAtivas.add(f);
  }

  // 1. requiredFlags
  if (escolha.requiredFlags && escolha.requiredFlags.length > 0) {
    const faltantes = escolha.requiredFlags.filter((f) => !flagsAtivas.has(f));
    if (faltantes.length > 0) {
      return {
        desbloqueada: false,
        motivo: escolha.motivoBloqueio || `Falta: ${faltantes.join(', ')}`,
        flagsFaltantes: faltantes,
      };
    }
  }

  // 2. forbiddenFlags
  if (escolha.forbiddenFlags && escolha.forbiddenFlags.length > 0) {
    const proibidasPresentes = escolha.forbiddenFlags.filter((f) => flagsAtivas.has(f));
    if (proibidasPresentes.length > 0) {
      return {
        desbloqueada: false,
        motivo: escolha.motivoBloqueio || `Bloqueada por: ${proibidasPresentes.join(', ')}`,
      };
    }
  }

  // 3. minCompanionApproval
  if (escolha.minCompanionApproval) {
    const { companionId, minApproval } = escolha.minCompanionApproval;
    const comp = ficha.companheiros?.[companionId];
    const atual = comp ? comp.aprovacao : 0;
    if (atual < minApproval) {
      return {
        desbloqueada: false,
        motivo:
          escolha.motivoBloqueio ||
          `Aprovação insuficiente com ${comp?.nome || companionId} (requer ${minApproval}, atual ${atual})`,
      };
    }
  }

  // 4. tagOrigem
  if (escolha.tagOrigem) {
    if (ficha.origem !== escolha.tagOrigem && !flagsAtivas.has(`origem_${escolha.tagOrigem}`)) {
      return {
        desbloqueada: false,
        motivo: escolha.motivoBloqueio || `Requer origem [${escolha.tagOrigem}]`,
      };
    }
  }

  return { desbloqueada: true };
}
