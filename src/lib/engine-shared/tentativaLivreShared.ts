import { z } from 'zod';
import { AtributoVoz, FichaPersonagem } from '@/server/engine/rpgEngine';
import { NodeJornada } from '@/server/engine/storyLinter';
import { TurnEvent } from '@/server/saves';

/* =========================================================================
 * 1. TIPOS E SCHEMAS FECHADOS DA TENTATIVA LIVRE
 * ========================================================================= */

export const IntencaoLivreEnum = z.enum([
  'observar',
  'persuadir',
  'intimidar',
  'enganar',
  'furtar',
  'agir_fisico',
  'recuar',
  'ajudar',
  'rezar_ou_jurar',
  'esperar',
]);
export type IntencaoLivre = z.infer<typeof IntencaoLivreEnum>;

export interface DadosIntencao {
  atributo: AtributoVoz;
  dcBase: number;
  rotulo: string;
}

export const TABELA_INTENCOES: Record<IntencaoLivre, DadosIntencao> = {
  observar: { atributo: 'pressagio', dcBase: 8, rotulo: 'Observar & Analisar' },
  persuadir: { atributo: 'cortesia', dcBase: 9, rotulo: 'Persuadir & Negociar' },
  intimidar: { atributo: 'comando', dcBase: 9, rotulo: 'Intimidar & Ordenar' },
  enganar: { atributo: 'astucia', dcBase: 10, rotulo: 'Enganar & Blefar' },
  furtar: { atributo: 'astucia', dcBase: 10, rotulo: 'Furtar & Agir Oculto' },
  agir_fisico: { atributo: 'furia', dcBase: 9, rotulo: 'Ação Física & Ímpeto' },
  recuar: { atributo: 'astucia', dcBase: 8, rotulo: 'Recuar & Abrigar-se' },
  ajudar: { atributo: 'cortesia', dcBase: 8, rotulo: 'Ajudar & Proteger' },
  rezar_ou_jurar: { atributo: 'pressagio', dcBase: 8, rotulo: 'Rezar & Jurar' },
  esperar: { atributo: 'pressagio', dcBase: 7, rotulo: 'Aguardar & Conter-se' },
};

/* =========================================================================
 * 2. LÉXICO EM PORTUGUÊS DO BRASIL PARA CLASSIFICAÇÃO DETERMINÍSTICA LOCAL
 * ========================================================================= */

const LEXICO_INTENCOES: Array<{ intencao: IntencaoLivre; padroes: RegExp[] }> = [
  {
    intencao: 'furtar',
    padroes: [
      /\b(furt|roub|surrupi|afan|bater carteira|pegar escondid|embols|subtrair|passar a m[aã]o|pegar sem que)\w*/i,
    ],
  },
  {
    intencao: 'enganar',
    padroes: [
      /\b(mentir|mentira|blef|fing|disfar[çc]|despist|falsear|ludibri|tapear|ilud|inventar desculpa|fingindo)\w*/i,
    ],
  },
  {
    intencao: 'intimidar',
    padroes: [
      /\b(amea[çc]|orden|exig|grit|encarar|desembainh|sacar|mandar calar|coag|amedront|impor|botar medo|assust|subjug)\w*/i,
    ],
  },
  {
    intencao: 'persuadir',
    padroes: [
      /\b(convers|negoci|convenc|apel|diplomaci|argument|propor|bajul|seduz|dialog|pedir com calma|pedir por favor|barganh|persuad|explicar|suplic)\w*/i,
    ],
  },
  {
    intencao: 'ajudar',
    padroes: [
      /\b(socorr|apoi|ampar|curar|vendar|estender a m[aã]o|proteger|auxili|interced|consol|cuidar|ajud)\w*/i,
    ],
  },
  {
    intencao: 'recuar',
    padroes: [
      /\b(fugir|fuga|correr dali|retirada|meia volta|afastar|recu|escond|abrig|retroced|desvencilh|dar no p[eé])\w*/i,
    ],
  },
  {
    intencao: 'agir_fisico',
    padroes: [
      /\b(atac|golp|pul|escal|empurr|derrub|arromb|quebr|lut|salt|nadar|for[çc]ar|quebrar|soc|chut|esmurr)\w*/i,
    ],
  },
  {
    intencao: 'rezar_ou_jurar',
    padroes: [
      /\b(rez|orar|prece|s[uú]plica|deuses antigos|sete deuses|jurar|juramento|prometer|invocar|benzer|f[eé])\w*/i,
    ],
  },
  {
    intencao: 'esperar',
    padroes: [
      /\b(aguard|esper|respirar fundo|paci[eê]ncia|conter|manter a calma|sil[eê]ncio|esperar refor[çc]o|quieto)\w*/i,
    ],
  },
  {
    intencao: 'observar',
    padroes: [
      /\b(olh|vigi|espi|inspecion|examin|procur|not|repar|investig|averigu|perscrut|prestar aten[çc]|busc|analis|espreit|ver|escut|ouvir|farej|notar)\w*/i,
    ],
  },
];

/**
 * Sanitiza o texto livre de entrada do jogador para neutralizar injeções de prompt
 * e caracteres de controle indesejados.
 */
export function sanitizarTextoAcaoLivre(texto: string): string {
  if (!texto) return '';
  return texto
    .replace(/[<>{}\[\]\\]/g, ' ')
    .replace(/["'`]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 300);
}

/**
 * Classifica a ação livre determinística e localmente em português.
 * Se nenhuma intenção específica casar, retorna 'observar' por padrão.
 */
export function classificarIntencaoLocal(textoCru: string): IntencaoLivre {
  const limpo = sanitizarTextoAcaoLivre(textoCru).toLowerCase();
  if (!limpo) return 'observar';

  for (const item of LEXICO_INTENCOES) {
    for (const padrao of item.padroes) {
      if (padrao.test(limpo)) {
        return item.intencao;
      }
    }
  }

  return 'observar';
}

/* =========================================================================
 * 3. PRÉVIA ESTILO BALDUR'S GATE 3 (CÁLCULO ANTES DE ROLAR)
 * ========================================================================= */

export interface PreviaTentativaLivre {
  intencao: IntencaoLivre;
  rotuloIntencao: string;
  atributo: AtributoVoz;
  valorAtributo: number;
  dc: number;
  probabilidadeEstimada: number;
  explicacao: string;
  tentativasRestantes: number;
  bloqueada: boolean;
  motivoBloqueio?: string;
}

/**
 * Probabilidade percentual determinística de obter SUCESSO ou CRÍTICO em 2d6.
 */
function calcularChance2d6(modificador: number, dc: number): number {
  let sucessos = 0;
  for (let d1 = 1; d1 <= 6; d1++) {
    for (let d2 = 1; d2 <= 6; d2++) {
      const total = d1 + d2 + modificador;
      if (d1 === 6 && d2 === 6) {
        sucessos++;
      } else if (total >= dc && !(d1 === 1 && d2 === 1)) {
        sucessos++;
      }
    }
  }
  return Math.round((sucessos / 36) * 100);
}

export function calcularPreviaTentativaLivre(params: {
  texto: string;
  node: NodeJornada;
  ficha: FichaPersonagem;
  turnHistory?: TurnEvent[];
}): PreviaTentativaLivre {
  const intencao = classificarIntencaoLocal(params.texto);
  const config = TABELA_INTENCOES[intencao];

  // Cálculo da DC (6 a 14) com base na dureza da cena
  const dureza = params.node.durezaCena ?? 2;
  const dcAjustada = Math.min(14, Math.max(6, config.dcBase + (dureza - 2)));

  const valorAtributo = params.ficha.atributos[config.atributo] ?? 3;
  const prob = calcularChance2d6(valorAtributo, dcAjustada);

  // Contagem de tentativas já feitas na cena atual
  const tentativasFeitas = (params.turnHistory || []).filter(
    (ev) => ev.tipo === 'tentativa_livre' && ev.nodeId === params.node.id
  ).length;

  const tentativasRestantes = Math.max(0, 2 - tentativasFeitas);
  const bloqueada = Boolean(tentativasRestantes <= 0 || params.node.isEnding);

  let motivoBloqueio: string | undefined;
  if (params.node.isEnding) {
    motivoBloqueio = 'A crônica já alcançou o seu desfecho.';
  } else if (tentativasRestantes <= 0) {
    motivoBloqueio = 'Limite de 2 tentativas livres alcançado nesta cena.';
  }

  const nomeAtributo = config.atributo.charAt(0).toUpperCase() + config.atributo.slice(1);
  const explicacao = `${config.rotulo} — ${nomeAtributo} (${valorAtributo}) vs CD ${dcAjustada}`;

  return {
    intencao,
    rotuloIntencao: config.rotulo,
    atributo: config.atributo,
    valorAtributo,
    dc: dcAjustada,
    probabilidadeEstimada: prob,
    explicacao,
    tentativasRestantes,
    bloqueada,
    motivoBloqueio,
  };
}
