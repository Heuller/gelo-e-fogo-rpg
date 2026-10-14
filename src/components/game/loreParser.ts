import { VerbeteGlossario } from '@/server/data/lore';

export interface TokenTexto {
  tipo: 'texto' | 'verbete';
  conteudo: string;
  verbete?: VerbeteGlossario;
}

interface TermoMapeado {
  expressao: string;
  verbete: VerbeteGlossario;
}

/**
 * Prepara uma lista ordenada de termos e aliases do glossário para busca inteligente.
 * As expressões mais longas vêm primeiro para evitar conflitos (ex: "Aegon I Targaryen" antes de "Aegon").
 */
export function prepararDicionarioBusca(verbetes: VerbeteGlossario[]): TermoMapeado[] {
  const mapa = new Map<string, TermoMapeado>();

  for (const v of verbetes) {
    // 1. Termo principal
    const termoLimpo = v.termo.trim();
    if (termoLimpo.length >= 3) {
      mapa.set(termoLimpo.toLowerCase(), { expressao: termoLimpo, verbete: v });
    }

    // Se o termo tiver vírgula (ex: "Balerion, o Terror Negro"), adiciona o nome principal "Balerion"
    if (termoLimpo.includes(',')) {
      const partePrincipal = termoLimpo.split(',')[0].trim();
      if (partePrincipal.length >= 3) {
        mapa.set(partePrincipal.toLowerCase(), { expressao: partePrincipal, verbete: v });
      }
    }

    // 2. Aliases
    for (const a of v.aliases ?? []) {
      const aliasLimpo = a.trim();
      if (aliasLimpo.length >= 3) {
        mapa.set(aliasLimpo.toLowerCase(), { expressao: aliasLimpo, verbete: v });
      }
    }
  }

  // Ordena por tamanho decrescente da expressão
  return Array.from(mapa.values()).sort(
    (a, b) => b.expressao.length - a.expressao.length
  );
}

function escapeRegExp(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * Divide um parágrafo em tokens de texto puro e tokens de verbetes do glossário,
 * preservando a pontuação, maiúsculas/minúsculas e integridade do texto original.
 */
export function segmentarTextoComGlossario(
  texto: string,
  verbetes: VerbeteGlossario[]
): TokenTexto[] {
  if (!texto || !verbetes || verbetes.length === 0) {
    return [{ tipo: 'texto', conteudo: texto }];
  }

  const dicionario = prepararDicionarioBusca(verbetes);
  if (dicionario.length === 0) {
    return [{ tipo: 'texto', conteudo: texto }];
  }

  // Cria padrão regex com limite de palavras (\b)
  // No português, para caracteres acentuados, usamos limites seguros
  const padroes = dicionario.map((item) => escapeRegExp(item.expressao));
  const regex = new RegExp(`(?<=^|[^a-zA-Z0-9À-ÿ])(${padroes.join('|')})(?=[^a-zA-Z0-9À-ÿ]|$)`, 'gi');

  const tokens: TokenTexto[] = [];
  let ultimoIndice = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(texto)) !== null) {
    const inicioMatch = match.index;
    const expressaoEncontrada = match[1];
    const fimMatch = inicioMatch + expressaoEncontrada.length;

    // Adiciona o texto intermediário antes do termo encontrado
    if (inicioMatch > ultimoIndice) {
      tokens.push({
        tipo: 'texto',
        conteudo: texto.substring(ultimoIndice, inicioMatch),
      });
    }

    // Encontra o verbete correspondente (comparação insensível a maiúsculas)
    const expressaoNorm = expressaoEncontrada.toLowerCase().trim();
    const mapeado = dicionario.find((d) => d.expressao.toLowerCase() === expressaoNorm);

    if (mapeado) {
      tokens.push({
        tipo: 'verbete',
        conteudo: expressaoEncontrada, // Mantém a grafia original do parágrafo
        verbete: mapeado.verbete,
      });
    } else {
      tokens.push({
        tipo: 'texto',
        conteudo: expressaoEncontrada,
      });
    }

    ultimoIndice = fimMatch;
  }

  // Adiciona o restante do texto se houver
  if (ultimoIndice < texto.length) {
    tokens.push({
      tipo: 'texto',
      conteudo: texto.substring(ultimoIndice),
    });
  }

  return tokens;
}
