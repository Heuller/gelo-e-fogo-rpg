import 'server-only';
import { GrafoJornada } from '@/server/engine/storyLinter';
import { FichaPersonagem, Companheiro, obterCompanheirosIniciais } from '@/server/engine/rpgEngine';
import { grafoJornada1Completo } from '@/server/data/journeys/j1_conquista_full';
import { grafoJornada2Completo } from '@/server/data/journeys/j2_danca_full';
import { grafoJornada3Completo } from '@/server/data/journeys/j3_tronos_full';
import {
  FICHA_INICIAL_AEGON,
  FICHA_INICIAL_RHAENYRA,
  FICHA_INICIAL_EDDARD_STARK,
} from '@/server/data/journeys/index';

export interface FichaPronta {
  id: string;
  nome: string;
  titulo: string;
  origem: string;
  descricao?: string;
  ficha: FichaPersonagem;
}

export interface DefinicaoJornada {
  id: string;
  numero: number;
  titulo: string;
  subtitulo: string;
  sinopse: string;
  origem: 'canonica' | 'original';
  epoca: string;
  startNodeId: string;
  grafo: GrafoJornada;
  fichasProntas: FichaPronta[];
  companheirosIniciais: Record<string, Companheiro>;
  temaId: string;
  ativa: boolean;
  avisos?: string[];
}

export interface CatalogoJornadaPublico {
  id: string;
  numero: number;
  titulo: string;
  subtitulo: string;
  periodo: string;
  descricao: string;
  ativa: boolean;
  startNodeId: string;
  protagonista: {
    id: string;
    nome: string;
    titulo: string;
    origem: string;
    atributos: FichaPersonagem['atributos'];
  };
}

export const REGISTRO_JORNADAS: Record<string, DefinicaoJornada> = {
  conquista_aegon: {
    id: 'conquista_aegon',
    numero: 1,
    titulo: 'A Conquista de Aegon',
    subtitulo: 'O Nascimento dos Sete Reinos',
    sinopse:
      'A épica campanha militar que forjou o Trono de Ferro com fogo e sangue, submetendo os reis de Westeros.',
    origem: 'canonica',
    epoca: '2 a.C. a 1 d.C.',
    startNodeId: 'j1_a1_mesa_pintada',
    grafo: grafoJornada1Completo,
    fichasProntas: [
      {
        id: 'aegon-targaryen',
        nome: 'Aegon I Targaryen',
        titulo: 'O Dragão & Senhor de Pedra do Dragão',
        origem: 'sangue_valiriano',
        descricao: 'O Conquistador que unificou os reinos montado nas costas de Balerion, o Terror Negro.',
        ficha: FICHA_INICIAL_AEGON,
      },
    ],
    companheirosIniciais: obterCompanheirosIniciais('conquista_aegon'),
    temaId: 'conquista_aegon',
    ativa: true,
  },

  danca_dragoes: {
    id: 'danca_dragoes',
    numero: 2,
    titulo: 'A Dança dos Dragões',
    subtitulo: 'A Morte dos Dragões e a Queda de Príncipes',
    sinopse:
      'A guerra civil sangrenta entre Verdes e Negros pelo Trono de Ferro, que quase extinguiu a dinastia valiriana.',
    origem: 'canonica',
    epoca: '129 d.C. a 131 d.C.',
    startNodeId: 'j2_a1_conselho_negro',
    grafo: grafoJornada2Completo,
    fichasProntas: [
      {
        id: 'rhaenyra-targaryen',
        nome: 'Rhaenyra Targaryen',
        titulo: 'O Deleite do Reino & Rainha dos Negros',
        origem: 'sangue_valiriano',
        descricao: 'A herdeira nomeada por Viserys I enfrentando a usurpação do Trono de Ferro pelos Verdes.',
        ficha: FICHA_INICIAL_RHAENYRA,
      },
    ],
    companheirosIniciais: obterCompanheirosIniciais('danca_dragoes'),
    temaId: 'danca_dragoes',
    ativa: true,
  },

  guerra_tronos: {
    id: 'guerra_tronos',
    numero: 3,
    titulo: 'A Guerra dos Cinco Reis',
    subtitulo: 'O Inverno Chega a Porto Real',
    sinopse:
      'A conspiração das grandes Casas após a morte de Jon Arryn e o colapso sangrento do reinado de Robert Baratheon.',
    origem: 'canonica',
    epoca: '298 d.C. em diante',
    startNodeId: 'j3_a1_chegada_porto_real',
    grafo: grafoJornada3Completo,
    fichasProntas: [
      {
        id: 'eddard-stark',
        nome: 'Eddard Stark',
        titulo: 'Senhor de Winterfell & Protetor do Norte',
        origem: 'honra_do_norte',
        descricao: 'A retidão silenciosa do Norte desafiando a perfídia da corte em Porto Real.',
        ficha: FICHA_INICIAL_EDDARD_STARK,
      },
    ],
    companheirosIniciais: obterCompanheirosIniciais('guerra_tronos'),
    temaId: 'guerra_tronos',
    ativa: true,
  },
};

export const JOURNEY_REGISTRY = REGISTRO_JORNADAS;

export function obterJornada(id: string): DefinicaoJornada | undefined {
  const norm = id.toLowerCase();
  if (norm.includes('conquista') || norm.includes('jornada_1')) return REGISTRO_JORNADAS.conquista_aegon;
  if (norm.includes('danca') || norm.includes('jornada_2')) return REGISTRO_JORNADAS.danca_dragoes;
  if (norm.includes('tronos') || norm.includes('guerra') || norm.includes('jornada_3')) return REGISTRO_JORNADAS.guerra_tronos;
  if (norm.includes('patrulha') || norm.includes('irmao') || norm.includes('jornada_4')) return REGISTRO_JORNADAS.patrulha_muralha;
  return REGISTRO_JORNADAS[id];
}

export function obterGrafoPorJornada(id: string): GrafoJornada | undefined {
  return obterJornada(id)?.grafo;
}

/**
 * Retorna os metadados do catálogo público sem carregar os textos pesados de fallbackText.
 */
export function getCatalogoPublico(): CatalogoJornadaPublico[] {
  return Object.values(REGISTRO_JORNADAS).map((j) => {
    const principal = j.fichasProntas[0];
    return {
      id: j.id,
      numero: j.numero,
      titulo: j.titulo,
      subtitulo: j.subtitulo,
      periodo: j.epoca,
      descricao: j.sinopse,
      ativa: j.ativa,
      startNodeId: j.startNodeId,
      protagonista: {
        id: principal.id,
        nome: principal.nome,
        titulo: principal.titulo,
        origem: principal.origem,
        atributos: principal.ficha.atributos,
      },
    };
  });
}

export function registrarJornada(jornada: DefinicaoJornada): void {
  REGISTRO_JORNADAS[jornada.id] = jornada;
}

export function removerJornada(id: string): void {
  delete REGISTRO_JORNADAS[id];
}
