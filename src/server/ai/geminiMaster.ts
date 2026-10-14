import 'server-only';
import { GoogleGenAI, Type } from '@google/genai';
import { z } from 'zod';
import { AtributoVoz, FichaPersonagem, ResultadoRolagem, WorldState } from '@/server/engine/rpgEngine';
import { NodeJornada } from '@/server/engine/storyLinter';

/* =========================================================================
 * 1. SCHEMAS ZOD DE ENTRADA E SAÍDA
 * ========================================================================= */

export const AtributoVozEnum = z.enum([
  'comando',
  'furia',
  'astucia',
  'cortesia',
  'erudicao',
  'pressagio',
]);

export const ClassificacaoAcaoLivreSchema = z.object({
  escolhaId: z.string(),
  atributo: AtributoVozEnum,
  justificativa: z.string(),
  usouFallback: z.boolean(),
});
export type ClassificacaoAcaoLivre = z.infer<typeof ClassificacaoAcaoLivreSchema>;

export const VozExtraSchema = z.object({
  voz: AtributoVozEnum,
  fala: z.string(),
});
export type VozExtra = z.infer<typeof VozExtraSchema>;

export const EnriquecimentoCenaSchema = z.object({
  textoEnriquecido: z.string(),
  vozesExtras: z.array(VozExtraSchema).max(2),
  usouFallback: z.boolean(),
});
export type EnriquecimentoCena = z.infer<typeof EnriquecimentoCenaSchema>;

/* =========================================================================
 * 2. HELPERS DE TIMEOUT E CLIENTE GEMINI
 * ========================================================================= */

function obterClienteGemini(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey.trim() === '' || apiKey === 'sua_gemini_api_key_aqui') {
    return null;
  }
  return new GoogleGenAI({ apiKey });
}

function comTimeout<T>(promessa: Promise<T>, ms = 6000, valorFallback: T): Promise<T> {
  let timeoutId: NodeJS.Timeout;
  const timeoutPromise = new Promise<T>((resolve) => {
    timeoutId = setTimeout(() => {
      resolve(valorFallback);
    }, ms);
  });

  return Promise.race([
    promessa.then((resultado) => {
      clearTimeout(timeoutId);
      return resultado;
    }),
    timeoutPromise,
  ]);
}

/* =========================================================================
 * 3. CLASSIFICADOR DETERMINÍSTICO LOCAL (FALLBACK 100% GARANTIDO)
 * ========================================================================= */

const PALAVRAS_CHAVE_ATRIBUTOS: Record<AtributoVoz, string[]> = {
  furia: [
    'fogo', 'dracarys', 'queimar', 'queime', 'cinzas', 'espada', 'lâmina', 'lamina',
    'matar', 'ataque', 'atacar', 'cortar', 'sangue', 'fúria', 'furia', 'destruir',
    'despedaçar', 'despedacar', 'chamas', 'batalha', 'golpear', 'aço', 'aco', 'guerra'
  ],
  comando: [
    'ordenar', 'ordem', 'ordens', 'exército', 'exercito', 'soldados', 'homens',
    'vanguarda', 'avançar', 'avancar', 'tropas', 'formar', 'formação', 'liderar',
    'vassalos', 'marcha', 'marchar', 'comandar', 'estandarte', 'bandeiras', 'rei'
  ],
  astucia: [
    'emboscada', 'emboscar', 'esconder', 'sombras', 'espião', 'espiao', 'segredo',
    'suborno', 'ouro', 'dissimular', 'veneno', 'ardil', 'armadilha', 'astúcia',
    'astucia', 'traição', 'traicao', 'silêncio', 'silencio', 'fuga', 'surpresa'
  ],
  cortesia: [
    'negociar', 'casamento', 'noivado', 'paz', 'carta', 'corvo', 'trégua', 'tregua',
    'honra', 'diplomacia', 'embaixador', 'arauto', 'banquete', 'saudar', 'termos',
    'palavras', 'gentil', 'aliança', 'alianca', 'submissão', 'submissao'
  ],
  erudicao: [
    'mapa', 'livro', 'pergaminho', 'história', 'historia', 'cidadela', 'meistre',
    'lei', 'linhagem', 'valíria', 'valiria', 'saber', 'conhecimento', 'estudar',
    'arquitetura', 'antigo', 'tradição', 'tradicao', 'origem'
  ],
  pressagio: [
    'sonho', 'profecia', 'visões', 'visoes', 'presságio', 'pressagio', 'deuses',
    'fogo sagrado', 'destino', 'daenys', 'sonhadora', 'oráculo', 'oraculo',
    'premonição', 'premonicao', 'sinal', 'estrelas', 'cometa'
  ],
};

export function classificarAcaoLivreLocal(
  textoAcaoLivre: string,
  noAtual: NodeJornada
): ClassificacaoAcaoLivre {
  const textoMin = textoAcaoLivre.toLowerCase();
  const escolhas = noAtual.escolhas;

  if (escolhas.length === 0) {
    return {
      escolhaId: '',
      atributo: 'comando',
      justificativa: 'Nenhuma opção disponível nesta cena.',
      usouFallback: true,
    };
  }

  // 1. Pontua cada atributo pelas palavras-chave presentes no texto do jogador
  let melhorAtributo: AtributoVoz = 'comando';
  let maiorPontuacaoAtributo = -1;

  for (const [attr, palavras] of Object.entries(PALAVRAS_CHAVE_ATRIBUTOS) as [AtributoVoz, string[]][]) {
    let pontuacao = 0;
    for (const palavra of palavras) {
      if (textoMin.includes(palavra)) {
        pontuacao += 2;
      }
    }
    if (pontuacao > maiorPontuacaoAtributo) {
      maiorPontuacaoAtributo = pontuacao;
      melhorAtributo = attr;
    }
  }

  // 2. Procura a escolha do nó que melhor corresponde ao atributo ou palavras
  let melhorEscolha = escolhas[0];
  let encontrouCorrespondencia = false;

  for (const escolha of escolhas) {
    if (escolha.tipo === 'teste_atributo' && escolha.atributo === melhorAtributo) {
      melhorEscolha = escolha;
      encontrouCorrespondencia = true;
      break;
    }
  }

  // Se não encontrou por atributo idêntico, busca por palavras em comum no texto da escolha
  if (!encontrouCorrespondencia) {
    let maiorPontuacaoEscolha = -1;
    for (const escolha of escolhas) {
      const textoEscolhaMin = escolha.texto.toLowerCase();
      let pontuacao = 0;
      const palavrasTexto = textoMin.split(/\s+/);
      for (const palavra of palavrasTexto) {
        if (palavra.length > 3 && textoEscolhaMin.includes(palavra)) {
          pontuacao += 1;
        }
      }
      if (pontuacao > maiorPontuacaoEscolha) {
        maiorPontuacaoEscolha = pontuacao;
        melhorEscolha = escolha;
      }
    }
  }

  const atributoFinal = melhorEscolha.tipo === 'teste_atributo' && melhorEscolha.atributo
    ? melhorEscolha.atributo
    : melhorAtributo;

  return {
    escolhaId: melhorEscolha.id,
    atributo: atributoFinal,
    justificativa: `O Mestre interpretou vossa ação como '${melhorEscolha.texto}', invocando vosso atributo de ${atributoFinal.toUpperCase()}.`,
    usouFallback: true,
  };
}

/* =========================================================================
 * 4. CLASSIFICADOR DE AÇÃO LIVRE COM GEMINI FLASH + FALLBACK
 * ========================================================================= */

export async function classificarAcaoLivre(
  textoAcaoLivre: string,
  noAtual: NodeJornada,
  ficha: FichaPersonagem
): Promise<ClassificacaoAcaoLivre> {
  const fallback = classificarAcaoLivreLocal(textoAcaoLivre, noAtual);
  const cliente = obterClienteGemini();

  if (!cliente) {
    return fallback;
  }

  const modelo = process.env.GEMINI_MODEL || 'gemini-2.5-flash';

  const opcoesDisponiveis = noAtual.escolhas.map((e) => ({
    id: e.id,
    texto: e.texto,
    tipo: e.tipo,
    atributo: e.tipo === 'teste_atributo' ? e.atributo : null,
  }));

  const prompt = `Você é o Mestre de Jogo de um RPG épico baseado em 'As Crônicas de Gelo e Fogo' (Fogo & Sangue).
O protagonista é ${ficha.nome} (${ficha.origem}).
Cena Atual: "${noAtual.titulo}"
Descrição da Cena:
${noAtual.fallbackText.slice(0, 400)}

O jogador propôs a seguinte Ação Livre personalizada:
"${textoAcaoLivre}"

Suas opções de transição válidas para esta cena são estritamente estas:
${JSON.stringify(opcoesDisponiveis, null, 2)}

Sua tarefa:
1. Identifique qual das opções disponíveis (escolhaId) representa mais fielmente a intenção e a consequência da ação do jogador.
2. Defina qual dos 6 Atributos-Vozes ('comando', 'furia', 'astucia', 'cortesia', 'erudicao', 'pressagio') deve ser testado.
3. Escreva uma breve justificativa literária e imersiva (1 a 2 frases no tom de George R. R. Martin) explicando como a ação se encaixa no desfecho.

Responda estritamente no esquema JSON solicitado.`;

  const chamadaIA = async (): Promise<ClassificacaoAcaoLivre> => {
    try {
      const response = await cliente.models.generateContent({
        model: modelo,
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              escolhaId: { type: Type.STRING },
              atributo: {
                type: Type.STRING,
                enum: ['comando', 'furia', 'astucia', 'cortesia', 'erudicao', 'pressagio'],
              },
              justificativa: { type: Type.STRING },
            },
            required: ['escolhaId', 'atributo', 'justificativa'],
          },
        },
      });

      if (!response.text) return fallback;

      const parsed = JSON.parse(response.text);
      // Validação com Zod
      const validado = ClassificacaoAcaoLivreSchema.safeParse({
        escolhaId: parsed.escolhaId,
        atributo: parsed.atributo,
        justificativa: parsed.justificativa,
        usouFallback: false,
      });

      if (!validado.success) return fallback;

      // Garante que escolhaId realmente existe no nó
      const existe = noAtual.escolhas.some((e) => e.id === validado.data.escolhaId);
      if (!existe) {
        return {
          ...validado.data,
          escolhaId: fallback.escolhaId,
          usouFallback: true,
        };
      }

      return validado.data;
    } catch {
      return fallback;
    }
  };

  return comTimeout(chamadaIA(), 6000, fallback);
}

/* =========================================================================
 * 5. ENRIQUECIMENTO DE CENA COM GEMINI FLASH + FALLBACK
 * ========================================================================= */

export interface EnriquecerCenaParams {
  noDestino: NodeJornada;
  resultadoDado: ResultadoRolagem | null;
  escolhaTexto: string;
  ficha: FichaPersonagem;
  worldState: WorldState;
}

export async function enriquecerCenaComIA(
  params: EnriquecerCenaParams
): Promise<EnriquecimentoCena> {
  const { noDestino, resultadoDado, escolhaTexto, ficha } = params;

  const fallback: EnriquecimentoCena = {
    textoEnriquecido: noDestino.fallbackText,
    vozesExtras: [],
    usouFallback: true,
  };

  const cliente = obterClienteGemini();
  if (!cliente) {
    return fallback;
  }

  const modelo = process.env.GEMINI_MODEL || 'gemini-2.5-flash';

  const prompt = `Você é o narrador literário de 'Crônicas de Sangue e Gelo', inspirado na prosa sensorial, poética e crua de George R. R. Martin (tradução brasileira de Jorge Candeias).

Contexto da Cena de Destino: "${noDestino.titulo}"
Local: ${noDestino.localizacao || 'Westeros'} (${noDestino.anoHistorico || '2 a.C.'})
Fonte Histórica: ${noDestino.loreContext?.fonte?.livro || 'Fogo & Sangue'} - ${noDestino.loreContext?.notaHistorica || ''}

Ação escolhida pelo jogador: "${escolhaTexto}"
${
  resultadoDado
    ? `Resultado do Teste 2d6: [${resultadoDado.resultado}] (Dados: ${resultadoDado.dados[0]}+${resultadoDado.dados[1]} + Bônus: ${resultadoDado.valorAtributo} = Total ${resultadoDado.total} vs DC ${resultadoDado.dc})`
    : 'Ação resolvida sem teste de dados.'
}

Texto canônico da cena:
${noDestino.fallbackText}

Sua missão:
1. Escreva um parágrafo introdutório literário exclusivo (3 a 5 linhas) tecendo a transição imediata entre a decisão do jogador / o resultado dos dados e o início da cena acima, integrando sensorialmente sangue, ferro, sal ou fogo.
2. Adicione até 2 intervenções de Vozes Internas ('comando', 'furia', 'astucia', 'cortesia', 'erudicao', 'pressagio') comentando o que acaba de se desenrolar.
3. REGRA ABSOLUTA: NÃO altere eventos históricos, não mude personagens, não altere regras de jogo ou barras vitais.

Retorne estritamente o JSON com 'paragrafoTransicao' e 'vozesExtras'.`;

  const chamadaIA = async (): Promise<EnriquecimentoCena> => {
    try {
      const response = await cliente.models.generateContent({
        model: modelo,
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              paragrafoTransicao: { type: Type.STRING },
              vozesExtras: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    voz: {
                      type: Type.STRING,
                      enum: ['comando', 'furia', 'astucia', 'cortesia', 'erudicao', 'pressagio'],
                    },
                    fala: { type: Type.STRING },
                  },
                  required: ['voz', 'fala'],
                },
              },
            },
            required: ['paragrafoTransicao', 'vozesExtras'],
          },
        },
      });

      if (!response.text) return fallback;

      const parsed = JSON.parse(response.text);

      const transicao = typeof parsed.paragrafoTransicao === 'string' ? parsed.paragrafoTransicao.trim() : '';
      const textoFinal = transicao
        ? `${transicao}\n\n${noDestino.fallbackText}`
        : noDestino.fallbackText;

      const rawVozes = Array.isArray(parsed.vozesExtras) ? parsed.vozesExtras.slice(0, 2) : [];
      const vozesValidadas = rawVozes.filter((v: any) =>
        AtributoVozEnum.safeParse(v.voz).success && typeof v.fala === 'string'
      );

      const validado = EnriquecimentoCenaSchema.safeParse({
        textoEnriquecido: textoFinal,
        vozesExtras: vozesValidadas,
        usouFallback: false,
      });

      return validado.success ? validado.data : fallback;
    } catch {
      return fallback;
    }
  };

  return comTimeout(chamadaIA(), 6000, fallback);
}
