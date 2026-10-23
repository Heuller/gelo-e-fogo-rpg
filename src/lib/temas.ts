export interface RegiaoMapa {
  id: string;
  nome: string;
  x: number;
  y: number;
  descricao: string;
  statusPorFlag?: string;
}

export interface TemaVoz {
  nome: string;
  epiteto: string;
  icone?: string;
}

export type TipoAtributoVoz = 'comando' | 'furia' | 'astucia' | 'cortesia' | 'erudicao' | 'pressagio';

export interface TemaJornada {
  id: string;
  titulo: string;
  acento: string;
  brasaoSvg: string;
  vozes: Record<TipoAtributoVoz, TemaVoz>;
  casas: Record<string, string>;
  regioes: RegiaoMapa[];
  recursos: {
    caderno?: boolean;
    relogio?: boolean;
    livroDeNomes?: boolean;
  };
  guiaDeEstilo: string;
}

export const TEMAS_JORNADAS: Record<string, TemaJornada> = {
  conquista_aegon: {
    id: 'conquista_aegon',
    titulo: 'A Conquista de Aegon',
    acento: '--carmim-brilho',
    brasaoSvg: 'dragao_targaryen_tricipite',
    vozes: {
      comando: { nome: 'Soberania', epiteto: 'A voz que exige submissão dos reis menores' },
      furia: { nome: 'Fogo & Sangue', epiteto: 'A fúria de Balerion encarnada no aço' },
      astucia: { nome: 'Tática do Conquistador', epiteto: 'O cálculo das fraquezas e brechas territoriais' },
      cortesia: { nome: 'Majestade Valiriana', epiteto: 'A pompa solene e o protocolo imperial' },
      erudicao: { nome: 'Pergaminho de Gaemon', epiteto: 'O registro milenar das capitanias continentais' },
      pressagio: { nome: 'Sonho de Daenys', epiteto: 'O vislumbre profético da perdição e do fogo' },
    },
    casas: {
      Targaryen: 'Casa Targaryen',
      Stark: 'Casa Stark de Winterfell',
      Durrandon: 'Casa Durrandon de Ponta Tempestade',
      Gardener: 'Casa Gardener de Jardim de Cima',
      Lannister: 'Casa Lannister de Rochedo Casterly',
      Arryn: 'Casa Arryn do Vale',
      Hoare: 'Casa Hoare das Ilhas de Ferro',
    },
    regioes: [
      { id: 'pedra_dragao', nome: 'Pedra do Dragão', x: 74, y: 55, descricao: 'A fortaleza vulcânica ancestral da Casa Targaryen.' },
      { id: 'terras_da_coroa', nome: 'Terras da Coroa', x: 68, y: 56, descricao: 'A foz da Baía da Água Negra onde se erguerá a Fortaleza Vermelha.' },
      { id: 'tridente', nome: 'Terras Fluviais', x: 55, y: 48, descricao: 'O fértil vale dos três ramos do Tridente e as margens do Olho de Deus.' },
      { id: 'campina', nome: 'A Campina', x: 42, y: 70, descricao: 'Os campos dourados do Mander e o centro intelectual de Vilavelha.' },
      { id: 'tempestade', nome: 'Terras da Tempestade', x: 65, y: 68, descricao: 'As falésias açoitadas pelo mar de Ponta Tempestade.' },
      { id: 'terras_da_tempestade', nome: 'Terras da Tempestade', x: 65, y: 68, descricao: 'As falésias açoitadas pelo mar de Ponta Tempestade.' },
      { id: 'norte', nome: 'O Norte', x: 50, y: 28, descricao: 'A imensidão gelada das terras dos Primeiros Homens.' },
      { id: 'vale', nome: 'O Vale de Arryn', x: 68, y: 42, descricao: 'As montanhas inexpugnáveis do Ninho da Águia.' },
      { id: 'ocidente', nome: 'Terras Ocidentais', x: 38, y: 55, descricao: 'As ricas minas de ouro de Rochedo Casterly.' },
      { id: 'dorne', nome: 'Dorne', x: 55, y: 88, descricao: 'As areias ardentes e passos montanhosos dos Roinar.' },
      { id: 'muralha', nome: 'A Muralha', x: 50, y: 15, descricao: 'O colossal paredão de gelo no limiar do mundo conhecido.' },
    ],
    recursos: { caderno: true, relogio: false, livroDeNomes: false },
    guiaDeEstilo: 'Tom épico, arcaico e imponente. Ênfase no poder bruto dos três dragões e no contraste entre os velhos reinos de Westeros e a nova ordem valiriana.',
  },

  danca_dragoes: {
    id: 'danca_dragoes',
    titulo: 'A Dança dos Dragões',
    acento: '--ouro',
    brasaoSvg: 'dragao_dividido',
    vozes: {
      comando: { nome: 'Direito Régio', epiteto: 'A autoridade legítima conferida pelo rei pai' },
      furia: { nome: 'Caraxes Desperto', epiteto: 'A ferocidade das chamas em combate aéreo' },
      astucia: { nome: 'Verme Branco', epiteto: 'Os sussurros e punhais nos corredores do palácio' },
      cortesia: { nome: 'Corte Negra', epiteto: 'A diplomacia para manter grandes lordes ao seu lado' },
      erudicao: { nome: 'Códice de Viserys', epiteto: 'O conhecimento dos pactos e linhagens da Baía' },
      pressagio: { nome: 'Canção de Valíria', epiteto: 'A intuição do destino de fogo que consome irmãos' },
    },
    casas: {
      Negros: 'Facção dos Negros (Rhaenyra)',
      Verdes: 'Facção dos Verdes (Aegon II)',
      Velaryon: 'Casa Velaryon de Derivamarca',
      Hightower: 'Casa Hightower de Vilavelha',
      Stark: 'Casa Stark do Norte',
      Baratheon: 'Casa Baratheon de Ponta Tempestade',
    },
    regioes: [
      { id: 'pedra_dragao', nome: 'Pedra do Dragão', x: 74, y: 55, descricao: 'A corte de Rhaenyra e o covil dos dragões leais aos Negros.' },
      { id: 'terras_da_coroa', nome: 'Porto Real', x: 68, y: 56, descricao: 'A capital do Trono de Ferro tomada pelo conselho Verde.' },
      { id: 'tridente', nome: 'As Terras Fluviais', x: 55, y: 48, descricao: 'O teatro de guerra de Harrenhal e do Lago do Olho de Deus.' },
      { id: 'campina', nome: 'Vilavelha e a Campina', x: 42, y: 70, descricao: 'O reduto de apoio dos Hightower e da Fé dos Sete.' },
      { id: 'norte', nome: 'O Norte', x: 50, y: 28, descricao: 'Os lobos de Cregan Stark marchando ao sul.' },
      { id: 'tempestade', nome: 'Ponta Tempestade', x: 65, y: 68, descricao: 'O salão de Borros Baratheon sob tempestades sangrentas.' },
      { id: 'terras_da_tempestade', nome: 'Ponta Tempestade', x: 65, y: 68, descricao: 'O salão de Borros Baratheon sob tempestades sangrentas.' },
      { id: 'vale', nome: 'O Vale de Arryn', x: 68, y: 42, descricao: 'A lealdade de Jeyne Arryn, a Donzela de Ninho da Águia.' },
      { id: 'ocidente', nome: 'Terras Ocidentais', x: 38, y: 55, descricao: 'As forças de Jason Lannister prontas para a batalha.' },
      { id: 'dorne', nome: 'Dorne', x: 55, y: 88, descricao: 'A soberania do sul observando a carnificina dos dragões.' },
      { id: 'muralha', nome: 'A Muralha', x: 50, y: 15, descricao: 'A sentinela imperturbável do Norte.' },
    ],
    recursos: { caderno: true, relogio: false, livroDeNomes: false },
    guiaDeEstilo: 'Trágico, tenso e visceral. A dor da guerra civil fratricida onde o fogo queima os próprios sangue do dragão.',
  },

  guerra_tronos: {
    id: 'guerra_tronos',
    titulo: 'A Guerra dos Cinco Reis',
    acento: '--tinta-suave',
    brasaoSvg: 'lobo_stark',
    vozes: {
      comando: { nome: 'A Voz de Winterfell', epiteto: 'A retidão inegociável do senhor do Norte' },
      furia: { nome: 'Gelo Ancestral', epiteto: 'A lâmina que executa o próprio veredito' },
      astucia: { nome: 'Cripta Antiga', epiteto: 'O pragmatismo necessário para sobreviver a Porto Real' },
      cortesia: { nome: 'Palavra do Lorde', epiteto: 'A honra e os juramentos diante dos deuses antigos' },
      erudicao: { nome: 'Linhagens Nobres', epiteto: 'O grande livro das linhagens que esconde o segredo do trono' },
      pressagio: { nome: 'O Inverno Chega', epiteto: 'O pressentimento fúnebre do vento gelado que desce da Muralha' },
    },
    casas: {
      Stark: 'Casa Stark de Winterfell',
      Lannister: 'Casa Lannister de Porto Real',
      Baratheon: 'Casa Baratheon de Ponta Tempestade',
      Tully: 'Casa Tully de Correrrio',
      Arryn: 'Casa Arryn do Ninho da Águia',
      Greyjoy: 'Casa Greyjoy de Pyke',
      Patrulha: 'A Patrulha da Noite',
    },
    regioes: [
      { id: 'norte', nome: 'Winterfell & O Norte', x: 50, y: 28, descricao: 'O coração de pedra cinzenta e os bosques sagrados dos Stark.' },
      { id: 'terras_da_coroa', nome: 'Porto Real', x: 68, y: 56, descricao: 'O poço de cobras da corte real e a Fortaleza Vermelha.' },
      { id: 'tridente', nome: 'As Terras Fluviais', x: 55, y: 48, descricao: 'As pontes de Correrrio e o cerco das tropas ocidentais.' },
      { id: 'muralha', nome: 'Castelo Negro', x: 50, y: 15, descricao: 'A fortaleza de gelo onde os irmãos negros vigiam o desconhecido.' },
      { id: 'vale', nome: 'O Vale de Arryn', x: 68, y: 42, descricao: 'A corte paranoica de Lysa Arryn nas Portas da Lua.' },
      { id: 'ocidente', nome: 'Terras Ocidentais', x: 38, y: 55, descricao: 'Os exércitos disciplinados de Tywin Lannister.' },
      { id: 'tempestade', nome: 'Terras da Tempestade', x: 65, y: 68, descricao: 'Os castelos divididos entre Stannis e Renly.' },
      { id: 'terras_da_tempestade', nome: 'Terras da Tempestade', x: 65, y: 68, descricao: 'Os castelos divididos entre Stannis e Renly.' },
      { id: 'campina', nome: 'A Campina', x: 42, y: 70, descricao: 'Os cavaleiros de Jardim de Cima liderados pelos Tyrell.' },
      { id: 'pedra_dragao', nome: 'Pedra do Dragão', x: 74, y: 55, descricao: 'A base sombria de Stannis Baratheon.' },
      { id: 'dorne', nome: 'Dorne', x: 55, y: 88, descricao: 'O silêncio vingativo dos Martell.' },
    ],
    recursos: { caderno: true, relogio: false, livroDeNomes: false },
    guiaDeEstilo: 'Conspiração política, dever amargo e suspense sóbrio. A honra do Norte confrontando a mentira e a perfídia da capital.',
  },

  patrulha_muralha: {
    id: 'patrulha_muralha',
    titulo: 'Irmão Sem Nome',
    acento: '--ouro-escuro',
    brasaoSvg: 'corvo_vigia',
    vozes: {
      comando: { nome: 'Disciplina', epiteto: 'A que mantém a fila quando os gigantes avançam' },
      furia: { nome: 'Brasa', epiteto: 'A que se recusa a recuar na neve profunda' },
      astucia: { nome: 'Olho de Corvo', epiteto: 'A que vê o que falta nos barris e nos portões' },
      cortesia: { nome: 'Boa Palavra', epiteto: 'A que abre portas sem arrombar entre irmãos' },
      erudicao: { nome: 'Pergaminho', epiteto: 'A que sabe onde está escrito o registro do meistre' },
      pressagio: { nome: 'Arrepio', epiteto: 'A que sente o frio do inverno antes que o vento sopre' },
    },
    casas: {
      guarda_velha: 'A Guarda Velha (Thorne, Slynt, Marsh)',
      amigos_de_jon: 'Irmãos Próximos de Jon Snow',
      povo_livre: 'Povo Livre além da Muralha',
      hoste_de_stannis: 'A Hoste do Rei no Trono de Ferro',
      gente_da_vila: 'Refugiados da Vila Toupeira',
    },
    regioes: [
      { id: 'castelo_negro', nome: 'Castelo Negro', x: 50, y: 15, descricao: 'O pátio de pedra, a armaria de Noye e o refúgio dos corvos.' },
      { id: 'topo_da_muralha', nome: 'Topo da Muralha', x: 50, y: 12, descricao: 'O topo vertiginoso de setecentos pés de gelo eterno.' },
      { id: 'portao_e_tunel', nome: 'Portão e Túnel', x: 50, y: 16, descricao: 'Os três portões de ferro forjado que selam os Sete Reinos.' },
      { id: 'vila_toupeira', nome: 'Vila Toupeira', x: 50, y: 19, descricao: 'A aldeia subterrânea sob a lanterna vermelha na Dádiva.' },
      { id: 'a_dadiva', nome: 'A Dádiva', x: 50, y: 22, descricao: 'As terras desoladas concedidas aos irmãos para sustento.' },
      { id: 'floresta_assombrada', nome: 'Floresta Assombrada', x: 50, y: 8, descricao: 'A escuridão dos represeiros além do alcance da civilização.' },
    ],
    recursos: { caderno: true, relogio: true, livroDeNomes: true },
    guiaDeEstilo: 'Grimdark sóbrio, humor seco de caserna, sentidos de ofício da Muralha (gelo que estala, couro, piche, caldo de cebola, corvos). 2ª pessoa, presente, estritamente canônico conforme os livros.',
  },
};

export function obterTemaJornada(temaIdOuJornada: string): TemaJornada {
  const chave = temaIdOuJornada.toLowerCase();
  if (chave.includes('danca') || chave.includes('jornada_2')) return TEMAS_JORNADAS.danca_dragoes;
  if (chave.includes('tronos') || chave.includes('guerra') || chave.includes('jornada_3')) return TEMAS_JORNADAS.guerra_tronos;
  if (chave.includes('patrulha') || chave.includes('irmao') || chave.includes('jornada_4')) return TEMAS_JORNADAS.patrulha_muralha;
  return TEMAS_JORNADAS.conquista_aegon;
}
