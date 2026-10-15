import 'server-only';

import { grafoJornada1Completo, obterNodeJornada1 } from './j1_conquista_full';
import { grafoJornada2Completo, obterNodeJornada2 } from './j2_danca_full';
import { grafoJornada3Completo, obterNodeJornada3 } from './j3_tronos_full';
import { GrafoJornada, NodeJornada } from '@/server/engine/storyLinter';
import { FichaPersonagem, WorldState, obterCompanheirosIniciais } from '@/server/engine/rpgEngine';

// Aliases para máxima compatibilidade
export {
  grafoJornada1Completo,
  obterNodeJornada1,
  grafoJornada2Completo,
  obterNodeJornada2,
  grafoJornada3Completo,
  obterNodeJornada3,
};
export const grafoJ2DancaCompleto = grafoJornada2Completo;
export const obterNodeJ2Danca = obterNodeJornada2;
export const grafoJ3TronosCompleto = grafoJornada3Completo;
export const obterNodeJ3Tronos = obterNodeJornada3;

export type JourneyIdentifier =
  | 'conquista_aegon'
  | 'jornada_1_conquista'
  | 'danca_dragoes'
  | 'jornada_2_danca'
  | 'guerra_tronos'
  | 'jornada_3_guerra_tronos';

/**
 * Normaliza o identificador da jornada para o formato canônico
 */
export function normalizarIdJornada(
  id?: string
): 'conquista_aegon' | 'danca_dragoes' | 'guerra_tronos' {
  if (!id) return 'conquista_aegon';
  const lower = id.toLowerCase();
  if (lower.includes('danca') || lower.includes('jornada_2')) {
    return 'danca_dragoes';
  }
  if (lower.includes('tronos') || lower.includes('guerra') || lower.includes('jornada_3')) {
    return 'guerra_tronos';
  }
  return 'conquista_aegon';
}

/**
 * Obtém o grafo completo da jornada solicitada
 */
export function obterGrafoJornada(journeyId?: string): GrafoJornada {
  const norm = normalizarIdJornada(journeyId);
  switch (norm) {
    case 'danca_dragoes':
      return grafoJornada2Completo;
    case 'guerra_tronos':
      return grafoJornada3Completo;
    case 'conquista_aegon':
    default:
      return grafoJornada1Completo;
  }
}

/**
 * Obtém qualquer nó de qualquer jornada, com fallback automático por detecção de ID
 */
export function obterNodeQualquerJornada(
  nodeId: string,
  journeyId?: string
): NodeJornada | undefined {
  // 1. Tentar primeiro com a jornada informada
  if (journeyId) {
    const grafo = obterGrafoJornada(journeyId);
    if (grafo.nodes[nodeId]) {
      return grafo.nodes[nodeId];
    }
  }

  // 2. Detecção automática pelo prefixo
  if (nodeId.startsWith('j1_') || nodeId.startsWith('node_inicio')) {
    return obterNodeJornada1(nodeId);
  }
  if (nodeId.startsWith('j2_')) {
    return obterNodeJornada2(nodeId);
  }
  if (nodeId.startsWith('j3_')) {
    return obterNodeJornada3(nodeId);
  }

  // 3. Busca exaustiva em todos os grafos
  return (
    obterNodeJornada1(nodeId) ||
    obterNodeJornada2(nodeId) ||
    obterNodeJornada3(nodeId)
  );
}

/**
 * Fichas de Personagem Iniciais Canônicas para cada Jornada
 */
export const FICHA_INICIAL_AEGON: FichaPersonagem = {
  id: 'aegon-conquistador',
  nome: 'Aegon I Targaryen',
  origem: 'sangue_valiriano',
  atributos: {
    comando: 5,
    furia: 4,
    astucia: 3,
    cortesia: 3,
    erudicao: 3,
    pressagio: 4,
  },
  estado: {
    sangue: 10,
    compostura: 10,
    honra: 5,
  },
  cicatrizes: [],
  segredos: [
    'A profecia do Sonho de Fogo de Daenys a Sonhadora',
    'A carta secreta do Banco de Bravos',
  ],
  inspiracao: 2,
  companheiros: obterCompanheirosIniciais('conquista_aegon'),
};

export const FICHA_INICIAL_RHAENYRA: FichaPersonagem = {
  id: 'rhaenyra-targaryen',
  nome: 'Rhaenyra Targaryen',
  origem: 'sangue_valiriano',
  atributos: {
    comando: 4,
    furia: 4,
    astucia: 4,
    cortesia: 4,
    erudicao: 3,
    pressagio: 3,
  },
  estado: {
    sangue: 10,
    compostura: 10,
    honra: 5,
  },
  cicatrizes: [],
  segredos: [
    'O testamento solene e selado de Viserys I reconhecendo seus direitos',
    'A aliança matrimonial com a Casa Velaryon e as frotas de Derivamarca',
  ],
  inspiracao: 2,
  companheiros: obterCompanheirosIniciais('danca_dragoes'),
};

export const FICHA_INICIAL_EDDARD_STARK: FichaPersonagem = {
  id: 'eddard-stark',
  nome: 'Eddard Stark',
  origem: 'sangue_primeiros_homens',
  atributos: {
    comando: 5,
    furia: 3,
    astucia: 3,
    cortesia: 3,
    erudicao: 3,
    pressagio: 4,
  },
  estado: {
    sangue: 10,
    compostura: 10,
    honra: 5,
  },
  cicatrizes: [],
  segredos: [
    'A promessa solene feita a Lyanna Stark na Torre da Alegria',
    'A carta cifrada de Lysa Arryn acusando os Lannister da morte de Jon Arryn',
  ],
  inspiracao: 2,
  companheiros: obterCompanheirosIniciais('guerra_tronos'),
};

/**
 * Retorna a ficha inicial adequada para a Jornada selecionada
 */
export function obterFichaInicialJornada(journeyId?: string): FichaPersonagem {
  const norm = normalizarIdJornada(journeyId);
  switch (norm) {
    case 'danca_dragoes':
      return { ...FICHA_INICIAL_RHAENYRA };
    case 'guerra_tronos':
      return { ...FICHA_INICIAL_EDDARD_STARK };
    case 'conquista_aegon':
    default:
      return { ...FICHA_INICIAL_AEGON };
  }
}

/**
 * Retorna o WorldState inicial para a Jornada selecionada
 */
export function obterWorldStateInicialJornada(journeyId?: string): WorldState {
  const norm = normalizarIdJornada(journeyId);
  switch (norm) {
    case 'danca_dragoes':
      return {
        reputacaoCasas: {
          TargaryenPretos: 10,
          TargaryenVerdes: -5,
          Velaryon: 8,
          Hightower: -6,
          Stark: 5,
        },
        flagsBorboleta: {
          fase_danca_iniciada: true,
          faccao_pretos_ativa: true,
        },
        marcosConcluidos: ['129_dc_morte_viserys'],
      };
    case 'guerra_tronos':
      return {
        reputacaoCasas: {
          Stark: 10,
          Baratheon: 5,
          Tully: 7,
          Lannister: -5,
          Arryn: 2,
        },
        flagsBorboleta: {
          fase_tronos_iniciada: true,
          inverno_se_aproxima: true,
        },
        marcosConcluidos: ['298_dc_execucao_desertor'],
      };
    case 'conquista_aegon':
    default:
      return {
        reputacaoCasas: { Targaryen: 10 },
        flagsBorboleta: { jogo_iniciado: true },
        marcosConcluidos: ['2_ac_mesa_pintada'],
      };
  }
}

/**
 * Obtém a cena e estados iniciais completos da jornada
 */
export function obterCenaInicialJornada(journeyId?: string): {
  node: NodeJornada;
  fichaInicial: FichaPersonagem;
  worldStateInicial: WorldState;
} {
  const grafo = obterGrafoJornada(journeyId);
  const node = grafo.nodes[grafo.startNodeId];
  const fichaInicial = obterFichaInicialJornada(journeyId);
  const worldStateInicial = obterWorldStateInicialJornada(journeyId);

  return { node, fichaInicial, worldStateInicial };
}
