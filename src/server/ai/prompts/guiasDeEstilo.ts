import 'server-only';
import { FichaPersonagem, ResultadoRolagem } from '@/server/engine/rpgEngine';
import { NodeJornada } from '@/server/engine/storyLinter';

export interface GuiaEstiloEra {
  id: string;
  nome: string;
  periodo: string;
  tomNarrativo: string;
  diretrizesEstilo: string[];
  personagensPermitidos: string[];
  anacronismosProibidos: string[];
  sensoriaisChave: string[];
}

export const GUIAS_DE_ESTILO_POR_JORNADA: Record<string, GuiaEstiloEra> = {
  conquista_aegon: {
    id: 'conquista_aegon',
    nome: 'A Conquista de Aegon',
    periodo: '2 a.C. a 1 d.C.',
    tomNarrativo:
      'Épico, arcaico, solene e imponente. Ênfase no poder bruto e aterrorizante dos três dragões valirianos (Balerion, Vhagar e Meraxes) e no choque entre a velha ordem dos reis soberanos de Westeros e a nova suserania do Trono de Ferro.',
    diretrizesEstilo: [
      'Utilize vocabulário arcaico e solene, evocando as crônicas dos meistres mais antigos da Cidadela.',
      'Destaque a escala titânica dos dragões: o vento das asas que verga florestas, o calor das chamas negras de Balerion que funde a rocha de Harrenhal.',
      'Trate os reis de Westeros (Argilac, o Arrogante; Harren, o Negro; Mern IX; Loren Lannister; Torrhen Stark) com dignidade trágica.',
      'O estilo literário segue George R. R. Martin na tradução brasileira canônica de Jorge Candeias (LeYa).',
    ],
    personagensPermitidos: [
      'Aegon', 'Visenya', 'Rhaenys', 'Orys Baratheon', 'Torrhen Stark', 'Harren',
      'Argilac Durrandon', 'Argella Durrandon', 'Loren Lannister', 'Mern Gardener',
      'Ronnel Arryn', 'Sharra Arryn', 'Meria Martell', 'Deria Martell', 'Brandon Snow',
      'Edmyn Tully', 'Balerion', 'Vhagar', 'Meraxes',
    ],
    anacronismosProibidos: [
      // Personagens da Dança dos Dragões
      'Rhaenyra', 'Daemon', 'Aemond', 'Alicent', 'Cole', 'Corlys',
      // Personagens da Guerra dos Tronos
      'Eddard', 'Ned', 'Robert', 'Cersei', 'Jaime', 'Tyrion', 'Daenerys', 'Jon Snow',
      'Joffrey', 'Sansa', 'Arya', 'Stannis', 'Renly', 'Mindinho', 'Varys',
      // Elementos modernos
      'polvora', 'canhao', 'revolver', 'rifle', 'laser', 'eletricidade',
    ],
    sensoriaisChave: [
      'rocha fundida', 'vento sulfuroso', 'aço valiriano', 'estandarte de dragão trícipite',
      'brasa rubra', 'fumaça escura de Harrenhal', 'pergaminho encerado',
    ],
  },

  danca_dragoes: {
    id: 'danca_dragoes',
    nome: 'A Dança dos Dragões',
    periodo: '129 d.C. a 131 d.C.',
    tomNarrativo:
      'Trágico, tenso, visceral e paranoico. A guerra civil fratricida da dinastia Targaryen onde dragão devora dragão e irmãos derramam o próprio sangue sagrado de Valíria.',
    diretrizesEstilo: [
      'Enfatize a paranoia cortesã, os olhares de desconfiança nos conselhos e o veneno nas taças douradas.',
      'As batalhas aéreas devem transmitir vertigem, fúria e o horror de dentes e chamas rasgando couros alados sobre nuvens de tempestade.',
      'A dor da perda familiar: o luto por príncipes infantes e a crueldade implacável das represálias (olho por olho).',
      'Vocabulário afiado, seco e tenso, sem esperança ingênua.',
    ],
    personagensPermitidos: [
      'Rhaenyra', 'Daemon', 'Alicent', 'Aegon II', 'Aemond', 'Lucerys', 'Jacaerys', 'Joffrey Velaryon',
      'Corlys Velaryon', 'Rhaenys', 'Criston Cole', 'Larys Strong', 'Mysaria', 'Cregan Stark',
      'Hugh Martelo', 'Ulf', 'Urtigas', 'Addam de Hull', 'Alyn Velaryon', 'Borros Baratheon',
      'Caraxes', 'Sunfyre', 'Vhagar', 'Syrax', 'Meleys', 'Vermithor', 'Asaprata', 'Rouba-Ovelhas',
    ],
    anacronismosProibidos: [
      // Personagens de outras eras
      'Aegon I', 'Aegon, o Conquistador', 'Argilac',
      'Robert Baratheon', 'Eddard Stark', 'Ned Stark', 'Cersei', 'Jaime', 'Tyrion',
      'Daenerys', 'Jon Snow', 'Joffrey Baratheon', 'Stannis', 'Renly',
      // Conceitos modernos
      'polvora', 'arma de fogo', 'maquina', 'moderno',
    ],
    sensoriaisChave: [
      'escamas queimadas', 'sangue negro de dragão', 'mar turbulento da Goela',
      'veludo verde e preto', 'fumaça do Fosso', 'aço frio de Derivamarca',
    ],
  },

  guerra_tronos: {
    id: 'guerra_tronos',
    nome: 'A Guerra dos Cinco Reis',
    periodo: '298 d.C. a 300 d.C.',
    tomNarrativo:
      'Grimdark sóbrio, honra austera e inegociável do Norte em colisão mortal contra a perfídia, conspiração e luxúria da corte de Porto Real. A certeza fúnebre de que o Inverno está chegando.',
    diretrizesEstilo: [
      'Adote a voz reflexiva, pesada e melancólica de Eddard Stark e a determinação ferida do Norte.',
      'Descreva a baixeza da corte: sedas manchadas de vinho, o cheiro de suor sob as armaduras douradas, o sarcasmo corrosivo de meistres e espiões.',
      'Preserve o mistério e a frieza sobrenatural além da Muralha: o ranger do gelo, o silêncio dos represeiros sagrados.',
      'Tradução formal e majestosa fiel à publicação Jorge Candeias (LeYa).',
    ],
    personagensPermitidos: [
      'Eddard Stark', 'Ned', 'Robert Baratheon', 'Cersei Lannister', 'Jaime Lannister',
      'Tyrion Lannister', 'Tywin Lannister', 'Catelyn Stark', 'Robb Stark', 'Jon Snow',
      'Sansa Stark', 'Arya Stark', 'Bran Stark', 'Mindinho', 'Petyr Baelish', 'Varys',
      'Renly Baratheon', 'Stannis Baratheon', 'Joffrey Baratheon', 'Janos Slynt',
      'Pycelle', 'Barristan Selmy', 'Jorah Mormont', 'Jeor Mormont', 'Aemon', 'Fantasma',
      'Vento Cinzento', 'Lady', 'Nymeria', 'Gelo',
    ],
    anacronismosProibidos: [
      // Personagens de eras antigas
      'Aegon, o Conquistador', 'Visenya', 'Rhaenys Targaryen', 'Harren, o Negro',
      'Rhaenyra Targaryen', 'Aemond Targaryen', 'Daemon Targaryen', 'Criston Cole',
      // Dragões vivos em Westeros nesta era
      'Balerion', 'Vhagar', 'Caraxes',
      // Elementos modernos
      'polvora', 'explosivo', 'pistola', 'fuzil',
    ],
    sensoriaisChave: [
      'granito cinzento', 'neve espessa', 'seiva carmesim no represeiro',
      'ferro fundido', 'vinho temperado', 'estalo de ossos', 'uivo na noite',
    ],
  },

  patrulha_muralha: {
    id: 'patrulha_muralha',
    nome: 'Irmão Sem Nome',
    periodo: '299 d.C. a 300 d.C.',
    tomNarrativo:
      'Grimdark realista de caserna, humor seco de irmãos jurados, sentidos táteis agudos da Muralha. Narração envolvente em 2ª pessoa ("Você vê...", "Sentis o frio..."), presente, estritamente canônica.',
    diretrizesEstilo: [
      'Enfatize a textura física do ofício: couro engelhado pela geada, piche fervente nos caldeirões, fumaça rascante de turfa, caldo ralo de cebola e carneiro.',
      'A camaradagem dura dos homens negros: ladrões, bastardos e fidalgos decaídos que compartilham a mesma palha e o mesmo destino.',
      'A Muralha é um ser vivo de gelo de setecentos pés que estala, range e chora quando o sol bate em sua face sul.',
      'O terror primal da Floresta Assombrada além dos portões: o branco infinito, o silêncio fúnebre e os olhos azuis na escuridão.',
    ],
    personagensPermitidos: [
      'Jon Snow', 'Jeor Mormont', 'Meistre Aemon', 'Samwell Tarly', 'Donal Noye',
      'Cotter Pyke', 'Denys Mallister', 'Alliser Thorne', 'Janos Slynt', 'Bowen Marsh',
      'Mance Rayder', 'Tormund', 'Ygritte', 'Fantasma', 'Stannis Baratheon',
      'Davos Seaworth', 'Melisandre', 'Val', 'Clydas', 'Pyp', 'Grenn', 'Halder',
    ],
    anacronismosProibidos: [
      // Fora de contexto
      'Aegon, o Conquistador', 'Rhaenyra', 'Daemon Targaryen', 'Balerion',
      'Cersei Lannister na Muralha', 'Daenerys na Muralha',
      // Elementos modernos
      'polvora', 'lanterna eletrica', 'termometro',
    ],
    sensoriaisChave: [
      'vento polar', 'gelo que estala', 'piche quente', 'penas de corvo',
      'couro ensebado', 'vapor da respiração', 'caldo de nabo', 'olhos azuis frios',
    ],
  },

  rebeliao_robert: {
    id: 'rebeliao_robert',
    nome: 'A Rebelião de Robert',
    periodo: '282 d.C. a 283 d.C.',
    tomNarrativo:
      'Épico heroico e trágico, nobreza marcial em colapso com a loucura dinástica. Choque visceral de aço, honra de juramentos quebrados, camaradagem forjada na revolta contra a tirania. Narração em 2ª pessoa ("Você vê...", "Avança com o martelo..."), presente, fiel aos livros canônicos.',
    diretrizesEstilo: [
      'Robert Baratheon é um jovem titã de seis pés e meio, risonho na taverna e monstruoso com o martelo no campo de batalha.',
      'Eddard Stark é solene, melancólico e inflexível quanto à honra, marcado pela execução covarde do pai e do irmão por Aerys II.',
      'O Rei Aerys II Targaryen está em seu ápice de paranoia com unhas aduncas e fogueiras de fogovivo preparadas por piromantes.',
      'O Príncipe Rhaegar é uma figura trágica, melancólica, vestida em armadura negra de rubis, obcecada por profecias antigas.',
      'A atmosfera evoca chuva torrencial, águas barrentas do Tridente tingidas de carmesim e o choque monumental de exércitos de cavalaria.',
    ],
    personagensPermitidos: [
      'Robert Baratheon', 'Eddard Stark', 'Jon Arryn', 'Hoster Tully', 'Brynden Tully',
      'Rhaegar Targaryen', 'Aerys II Targaryen', 'Jaime Lannister', 'Tywin Lannister',
      'Arthur Dayne', 'Gerold Hightower', 'Oswell Whent', 'Barristan Selmy', 'Lewyn Martell',
      'Jon Connington', 'Mace Tyrell', 'Stannis Baratheon', 'Howland Reed', 'Lyanna Stark',
      'Elia Martell', 'Pycelle', 'Varys', 'Rossart', 'Gregor Clegane', 'Amory Lorch',
    ],
    anacronismosProibidos: [
      // Personagens de eras passadas
      'Aegon, o Conquistador', 'Visenya', 'Rhaenys (irmã de Aegon)', 'Balerion',
      'Rhaenyra Targaryen', 'Daemon Targaryen', 'Aemond Targaryen', 'Criston Cole',
      // Personagens do futuro que ainda não nasceram ou não têm papel
      'Joffrey Baratheon', 'Tommen', 'Myrcella', 'Robb Stark em combate',
      'Mance Rayder na Muralha', 'Daenerys adulta',
      // Modernidades
      'polvora', 'canhao', 'espingarda',
    ],
    sensoriaisChave: [
      'martelo de guerra fendendo armaduras', 'rubis voando na água barrenta',
      'fumaça de fogovivo', 'sinos dobrando ao longe', 'vento das montanhas vermelhas',
      'rosas de inverno azuis', 'sangue no vau', 'ferro retorcido',
    ],
  },
};

export function obterGuiaEstilo(jornadaId: string): GuiaEstiloEra {
  const norm = jornadaId.toLowerCase();
  if (norm.includes('rebeliao') || norm.includes('robert') || norm.includes('jornada_5')) return GUIAS_DE_ESTILO_POR_JORNADA.rebeliao_robert;
  if (norm.includes('danca') || norm.includes('jornada_2')) return GUIAS_DE_ESTILO_POR_JORNADA.danca_dragoes;
  if (norm.includes('tronos') || norm.includes('guerra') || norm.includes('jornada_3')) return GUIAS_DE_ESTILO_POR_JORNADA.guerra_tronos;
  if (norm.includes('patrulha') || norm.includes('irmao') || norm.includes('jornada_4')) return GUIAS_DE_ESTILO_POR_JORNADA.patrulha_muralha;
  return GUIAS_DE_ESTILO_POR_JORNADA.conquista_aegon;
}

/**
 * Validador guardrail contra anacronismos temporais e nomes proibidos para a era
 */
export function validarAnacronismosEra(
  texto: string,
  jornadaId: string
): { valido: boolean; anacronismosEncontrados: string[] } {
  const guia = obterGuiaEstilo(jornadaId);
  const textoMinusculo = texto.toLowerCase();
  const anacronismosEncontrados: string[] = [];

  for (const termo of guia.anacronismosProibidos) {
    const padrao = new RegExp(`\\b${termo.toLowerCase()}\\b`, 'i');
    if (padrao.test(textoMinusculo)) {
      anacronismosEncontrados.push(termo);
    }
  }

  return {
    valido: anacronismosEncontrados.length === 0,
    anacronismosEncontrados,
  };
}

export interface ContextoPromptMestre {
  jornadaId: string;
  noDestino: NodeJornada;
  resultadoDado: ResultadoRolagem | null;
  escolhaTexto: string;
  ficha: FichaPersonagem;
}

/**
 * Constrói o prompt de sistema do Mestre IA ajustado à era canônica da jornada
 */
export function construirPromptMestre(params: ContextoPromptMestre): string {
  const { jornadaId, noDestino, resultadoDado, escolhaTexto, ficha } = params;
  const guia = obterGuiaEstilo(jornadaId);

  return `Você é o Mestre Literário de 'Gelo e Fogo RPG', narrando a campanha '${guia.nome}' (${guia.periodo}).
Sua prosa é inspirada diretamente na escrita de George R. R. Martin com o vocabulário nobre, visceral e poético da tradução brasileira canônica de Jorge Candeias (LeYa).

TOM DA ERA:
${guia.tomNarrativo}

DIRETRIZES DE ESTILO PARA ESTA ERA:
${guia.diretrizesEstilo.map((d) => `- ${d}`).join('\n')}

ELEMENTOS SENSORIAIS CARACTERÍSTICOS:
${guia.sensoriaisChave.join(', ')}

PERSONAGENS CANÔNICOS DA ERA:
${guia.personagensPermitidos.join(', ')}

RESTRIÇÕES INVIOLÁVEIS (NÃO ANACRONISMO):
- Jamais mencione personagens, eventos ou dragões de outras épocas históricas de Westeros (${guia.anacronismosProibidos.slice(0, 10).join(', ')}).
- É proibido qualquer elemento contemporâneo ou moderno.
- Não altere regras mecânicas nem desfechos predeterminados.

CONTEXTO DO TURNO:
- Protagonista: ${ficha.nome} (${ficha.origem})
- Cena Atual: "${noDestino.titulo}"
- Local: ${noDestino.localizacao} (${noDestino.anoHistorico})
- Ação Escolhida: "${escolhaTexto}"
- Veredito da Rolagem 2d6: ${
    resultadoDado
      ? `[${resultadoDado.resultado}] (Dados: ${resultadoDado.dados[0]}+${resultadoDado.dados[1]} + Bônus: ${resultadoDado.valorAtributo} = Total ${resultadoDado.total} vs ND ${resultadoDado.dc})`
      : 'Ação resolvida sem teste.'
  }

Texto da Cena Canônica:
${noDestino.fallbackText}

Sua tarefa:
1. Escreva um parágrafo introdutório de transição (3 a 5 linhas) no tom exato da era, conectando a escolha do jogador e a rolagem à cena acima.
2. Forneça até 2 intervenções de Vozes Internas ('comando', 'furia', 'astucia', 'cortesia', 'erudicao', 'pressagio') adequadas ao arquétipo do protagonista.

Responda estritamente no esquema JSON solicitado.`;
}
