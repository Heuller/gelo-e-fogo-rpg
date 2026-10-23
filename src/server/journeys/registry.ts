import 'server-only';
import { GrafoJornada } from '@/server/engine/storyLinter';
import { FichaPersonagem, Companheiro, obterCompanheirosIniciais } from '@/server/engine/rpgEngine';
import { grafoJornada1Completo } from '@/server/data/journeys/j1_conquista_full';
import { grafoJornada2Completo } from '@/server/data/journeys/j2_danca_full';
import { grafoJornada3Completo } from '@/server/data/journeys/j3_tronos_full';
import { grafoJornada4Completo } from '@/server/data/journeys/j4_muralha_full';
import { grafoJornada5Completo } from '@/server/data/journeys/j5_rebeliao_full';
import {
  FICHA_INICIAL_AEGON,
  FICHA_INICIAL_RHAENYRA,
  FICHA_INICIAL_EDDARD_STARK,
  FICHA_INICIAL_PATRULHA_DUNSTAN,
  FICHA_INICIAL_RONNEL_GLOVER,
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

// Fichas adicionais de 22 pontos da Jornada 4
export const FICHA_PATRULHA_JOSS: FichaPersonagem = {
  id: 'joss-dunmere',
  nome: 'Joss Dunmere',
  origem: 'construtor',
  atributos: {
    comando: 4,
    furia: 4,
    astucia: 3,
    cortesia: 2,
    erudicao: 4,
    pressagio: 5,
  },
  estado: {
    sangue: 10,
    compostura: 10,
    honra: 5,
  },
  cicatrizes: ['Cicatriz profunda no antebraço esquerdo por rompimento de cabo do guincho'],
  segredos: [
    'Conhece a fenda oculta no gelo do parapeito oriental onde o Muro ameaça vergar',
    'Condenado por dívidas não pagas aos mercadores de Vilavelha antes de tomar o negro',
  ],
  inspiracao: 2,
  companheiros: obterCompanheirosIniciais('patrulha_muralha'),
};

export const FICHA_PATRULHA_ARIC: FichaPersonagem = {
  id: 'aric-wren',
  nome: 'Aric Wren',
  origem: 'patrulheiro',
  atributos: {
    comando: 3,
    furia: 5,
    astucia: 4,
    cortesia: 2,
    erudicao: 3,
    pressagio: 5,
  },
  estado: {
    sangue: 10,
    compostura: 10,
    honra: 5,
  },
  cicatrizes: ['Ombro direito repuxado por queda no gelo do Passo dos Guinchos'],
  segredos: [
    'Ex-caçador furtivo nas matas dos Dustin; sabe rastrear sombras na neve alta sem produzir ruído',
    'Ouviu os murmúrios dos represeiros além do Muro avisando que o gelo não deterá os mortos',
  ],
  inspiracao: 2,
  companheiros: obterCompanheirosIniciais('patrulha_muralha'),
};

// Fichas adicionais de 22 pontos da Jornada 5 (A Rebelião de Robert)
export const FICHA_REBELIAO_DENYS_ARRYN: FichaPersonagem = {
  id: 'denys-arryn',
  nome: 'Lorde Denys Arryn',
  origem: 'senhor_nobre',
  atributos: {
    comando: 5,
    furia: 3,
    astucia: 3,
    cortesia: 4,
    erudicao: 4,
    pressagio: 3,
  },
  estado: {
    sangue: 10,
    compostura: 10,
    honra: 5,
  },
  cicatrizes: ['Marca de queimadura no flanco direito por flecha incendiária em Vila Gaivota'],
  segredos: [
    'Herdeiro presuntivo do Ninho da Águia com bênção pessoal de Lorde Jon Arryn',
    'Conhece a rota dos contrabandistas nos Dedos para abastecer as tropas rebeldes',
  ],
  inspiracao: 2,
  companheiros: obterCompanheirosIniciais('rebeliao_robert'),
};

export const FICHA_REBELIAO_JONOTHOR_MORRIGEN: FichaPersonagem = {
  id: 'jonothor-morrigen',
  nome: 'Sor Jonothor Morrigen',
  origem: 'cavaleiro_andante',
  atributos: {
    comando: 3,
    furia: 5,
    astucia: 4,
    cortesia: 3,
    erudicao: 3,
    pressagio: 4,
  },
  estado: {
    sangue: 10,
    compostura: 10,
    honra: 5,
  },
  cicatrizes: ['Cicatriz de corte de maça no joelho esquerdo recebida na Batalha de Solarestival'],
  segredos: [
    'Lutou nas três batalhas de Solarestival no mesmo dia sob o comando direto de Robert Baratheon',
    'Recusou a anistia do Rei Louco para proteger os feudos juramentados à Casa Baratheon',
  ],
  inspiracao: 2,
  companheiros: obterCompanheirosIniciais('rebeliao_robert'),
};

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

  patrulha_muralha: {
    id: 'patrulha_muralha',
    numero: 4,
    titulo: 'Irmão Sem Nome',
    subtitulo: 'A Sentinela sob o Frio & O Cerco de Castelo Negro',
    sinopse:
      'A vida dura de um irmão juramentado anônimo da Patrulha da Noite no maior cerco militar que a Muralha já presenciou.',
    origem: 'canonica',
    epoca: '299 a 300 d.C.',
    startNodeId: 'j4_a1_cinzas_do_punho',
    grafo: grafoJornada4Completo,
    fichasProntas: [
      {
        id: 'dunstan-holt',
        nome: 'Dunstan «Dunny» Holt',
        titulo: 'Intendente de Meistre Aemon & Ex-Padeiro de Porto Branco',
        origem: 'intendente',
        descricao: 'Pés queimados pelo gelo e dedos perdidos na última patrulha; guarda as despensas e os segredos do corvário.',
        ficha: FICHA_INICIAL_PATRULHA_DUNSTAN,
      },
      {
        id: 'joss-dunmere',
        nome: 'Joss Dunmere',
        titulo: 'Construtor da Muralha & Mestre das Polias',
        origem: 'construtor',
        descricao: 'Condenado por dívidas no sul; conhece cada viga, cada guincho e cada fenda perigosa na colossal parede de gelo.',
        ficha: FICHA_PATRULHA_JOSS,
      },
      {
        id: 'aric-wren',
        nome: 'Aric Wren',
        titulo: 'Patrulheiro Veterano & Ex-Caçador Furtivo',
        origem: 'patrulheiro',
        descricao: 'Preso por caça furtiva; escuta os passos dos selvagens no vento e maneja o arco recurvo com frieza letal.',
        ficha: FICHA_PATRULHA_ARIC,
      },
    ],
    companheirosIniciais: obterCompanheirosIniciais('patrulha_muralha'),
    temaId: 'patrulha_muralha',
    ativa: true,
  },

  rebeliao_robert: {
    id: 'rebeliao_robert',
    numero: 5,
    titulo: 'A Rebelião de Robert',
    subtitulo: 'A Queda dos Dragões & A Forja de Uma Nova Coroa',
    sinopse:
      'A revolta lendária que encerrou quase trezentos anos de dinastia Targaryen, desde o desafio no Vale até o duelo no Vade dos Rubis e a promessa na Torre da Alegria.',
    origem: 'canonica',
    epoca: '282 a 283 d.C.',
    startNodeId: 'j5_a1_o_chamado_do_ninho',
    grafo: grafoJornada5Completo,
    fichasProntas: [
      {
        id: 'ronnel-glover',
        nome: 'Sor Ronnel Glover',
        titulo: 'Cavaleiro de Bosque Profundo & Vanguarda do Norte',
        origem: 'honra_do_norte',
        descricao: 'Leal seguidor de Brandon e Ned Stark; empunha espada longa com destreza implacável e honra inabalável.',
        ficha: FICHA_INICIAL_RONNEL_GLOVER,
      },
      {
        id: 'denys-arryn',
        nome: 'Lorde Denys Arryn',
        titulo: 'O Querido do Vale & Cavaleiro do Falcão',
        origem: 'senhor_nobre',
        descricao: 'Herdeiro do Vale de Arryn; líder carismático e estrategista refinado nas cortes e nas montanhas.',
        ficha: FICHA_REBELIAO_DENYS_ARRYN,
      },
      {
        id: 'jonothor-morrigen',
        nome: 'Sor Jonothor Morrigen',
        titulo: 'Cavaleiro do Ninho de Corvos & Vanguarda das Terras da Tempestade',
        origem: 'cavaleiro_andante',
        descricao: 'Veterano das três batalhas de Solarestival; guerreiro tempestuoso cuja fúria em combate quebra linhas inimigas.',
        ficha: FICHA_REBELIAO_JONOTHOR_MORRIGEN,
      },
    ],
    companheirosIniciais: obterCompanheirosIniciais('rebeliao_robert'),
    temaId: 'rebeliao_robert',
    ativa: true,
  },
};

export const JOURNEY_REGISTRY = REGISTRO_JORNADAS;

export function obterJornada(id: string): DefinicaoJornada | undefined {
  const norm = id.toLowerCase();
  if (norm.includes('rebeliao') || norm.includes('robert') || norm.includes('jornada_5')) return REGISTRO_JORNADAS.rebeliao_robert;
  if (norm.includes('conquista') || norm.includes('jornada_1')) return REGISTRO_JORNADAS.conquista_aegon;
  if (norm.includes('danca') || norm.includes('jornada_2')) return REGISTRO_JORNADAS.danca_dragoes;
  if (norm.includes('tronos') || norm.includes('guerra') || norm.includes('jornada_3')) return REGISTRO_JORNADAS.guerra_tronos;
  if (norm.includes('patrulha') || norm.includes('muralha') || norm.includes('irmao') || norm.includes('jornada_4')) return REGISTRO_JORNADAS.patrulha_muralha;
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
