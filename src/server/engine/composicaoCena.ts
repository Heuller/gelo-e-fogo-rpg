import 'server-only';
import {
  NodeJornada,
  Condicao,
  BlocoTexto,
  FalaCena,
  Interlocutor,
  EscolhaJornada,
} from './storyLinter';
import { FichaPersonagem, WorldState } from './rpgEngine';
import { validarEscolhaDesbloqueada } from '@/lib/engine-shared/validacao';

export interface ContextoComposicao {
  ficha: FichaPersonagem;
  worldState: WorldState;
  ultimaEscolhaId?: string;
  ultimoResultado?: 'critico' | 'sucesso' | 'parcial' | 'falha';
  ponteAnterior?: string;
  marcasRecebidas?: string[];
  modo?: 'cronica' | 'padrao' | 'juramento';
}

export type EscolhaComposta = EscolhaJornada & {
  desbloqueada: boolean;
  motivoBloqueio?: string;
  jaExplorada?: boolean;
};

export interface FalaComposta {
  quem: string;
  nomeQuem: string;
  papel?: string;
  texto: string;
}

export interface CenaComposta {
  nodeId: string;
  titulo: string;
  ponte?: string;
  marcasRecebidas?: string[];
  textoPrincipal: string;
  paragrafos: string[];
  falas?: FalaComposta[];
  tipo: 'narracao' | 'dialogo' | 'hub' | 'peca_de_cenario' | 'acerto_de_contas';
  interlocutores?: Interlocutor[];
  escolhas: EscolhaComposta[];
}

/**
 * Avalia se uma condição lógica do Esquema v2 é atendida pelo estado atual do jogo.
 * Todos os critérios especificados devem ser verdadeiros simultaneamente (AND).
 */
export function avaliarCondicao(condicao: Condicao | undefined, contexto: ContextoComposicao): boolean {
  if (!condicao) return true;

  const { worldState, ficha, ultimaEscolhaId, ultimoResultado, modo } = contexto;
  const flagsAtivas = new Set<string>([
    ...Object.keys(worldState.flagsBorboleta || {}).filter((k) => Boolean(worldState.flagsBorboleta[k])),
  ]);

  // 1. flagsTodas: todas devem estar ativas
  if (condicao.flagsTodas && condicao.flagsTodas.length > 0) {
    for (const flag of condicao.flagsTodas) {
      if (!flagsAtivas.has(flag)) return false;
    }
  }

  // 2. flagsNenhuma: nenhuma pode estar ativa
  if (condicao.flagsNenhuma && condicao.flagsNenhuma.length > 0) {
    for (const flag of condicao.flagsNenhuma) {
      if (flagsAtivas.has(flag)) return false;
    }
  }

  // 3. Aprovacao de companheiro
  if (condicao.aprovacao) {
    const { companheiro, min, max } = condicao.aprovacao;
    const nivelAtual = ficha.companheiros?.[companheiro]?.aprovacao ?? 0;
    if (min !== undefined && nivelAtual < min) return false;
    if (max !== undefined && nivelAtual > max) return false;
  }

  // 4. Última escolha realizada
  if (condicao.ultimaEscolha && condicao.ultimaEscolha.length > 0) {
    if (!ultimaEscolhaId || !condicao.ultimaEscolha.includes(ultimaEscolhaId)) {
      return false;
    }
  }

  // 5. Último resultado de rolagem
  if (condicao.ultimoResultado && condicao.ultimoResultado.length > 0) {
    if (!ultimoResultado || !condicao.ultimoResultado.includes(ultimoResultado)) {
      return false;
    }
  }

  // 6. Relógio narrativo
  if (condicao.relogio) {
    const { id, min } = condicao.relogio;
    const tiques = Number(worldState.flagsBorboleta?.[`tick_${id}`] ?? worldState.flagsBorboleta?.[id] ?? 0);
    if (tiques < min) return false;
  }

  // 7. Modo de jogo
  if (condicao.modo && condicao.modo.length > 0) {
    const modoAtual = modo || 'padrao';
    if (!condicao.modo.includes(modoAtual)) return false;
  }

  return true;
}

/**
 * Resolve o nome de exibição de um interlocutor em cena.
 */
function resolverNomeInterlocutor(
  quem: string,
  interlocutores?: Interlocutor[],
  ficha?: FichaPersonagem
): { nome: string; papel?: string } {
  if (interlocutores) {
    const encontrado = interlocutores.find((i) => i.id === quem);
    if (encontrado) {
      return { nome: encontrado.nome, papel: encontrado.papel };
    }
  }

  if (quem === 'protagonista' || quem === 'jogador') {
    return { nome: ficha?.nome || 'Você', papel: 'Protagonista' };
  }

  // Converte IDs em nomes legíveis (ex.: 'jon_snow' -> 'Jon Snow')
  const nomeFormatado = quem
    .split('_')
    .map((p) => p.charAt(0).toUpperCase() + p.slice(1))
    .join(' ');

  return { nome: nomeFormatado };
}

/**
 * Composição autoritativa de cena no servidor (Fase G6A).
 * 100% determinístico e testável, sem dependência de IA no caminho crítico.
 */
export function comporCena(node: NodeJornada, contexto: ContextoComposicao): CenaComposta {
  const tipo = node.tipo || 'narracao';

  // 1. Composição de Texto Principal (Blocos v2 ou Fallback canônico)
  let textoComposto = '';

  if (node.blocos && node.blocos.length > 0) {
    // Filtra blocos cuja condição é satisfeita
    const blocosValidos = node.blocos.filter((b) => avaliarCondicao(b.quando, contexto));

    // Ordena semanticamente se houver funções (abertura -> corpo -> fecho)
    const ordemFuncao: Record<string, number> = { abertura: 1, corpo: 2, fecho: 3 };
    blocosValidos.sort((a, b) => {
      const pA = a.funcao ? ordemFuncao[a.funcao] || 2 : 2;
      const pB = b.funcao ? ordemFuncao[b.funcao] || 2 : 2;
      return pA - pB;
    });

    textoComposto = blocosValidos.map((b) => b.texto).join('\n\n');
  }

  // Fallback para fallbackText caso não haja blocos ou nenhum bloco tenha sido ativado
  if (!textoComposto.trim()) {
    textoComposto = node.fallbackText || '';

    // Compatibilidade com conditionalParagraphs legados
    if (node.conditionalParagraphs && node.conditionalParagraphs.length > 0) {
      for (const cp of node.conditionalParagraphs) {
        const flagAtiva = Boolean(contexto.worldState.flagsBorboleta?.[cp.requiredFlag]);
        if (flagAtiva) {
          textoComposto += `\n\n${cp.text}`;
        }
      }
    }
  }

  const paragrafos = textoComposto
    .split('\n\n')
    .map((p) => p.trim())
    .filter((p) => p.length > 0);

  // 2. Composição de Falas de Diálogo
  let falasCompostas: FalaComposta[] | undefined = undefined;

  if (node.falas && node.falas.length > 0) {
    falasCompostas = node.falas
      .filter((f) => avaliarCondicao(f.quando, contexto))
      .map((f) => {
        const info = resolverNomeInterlocutor(f.quem, node.interlocutores, contexto.ficha);
        return {
          quem: f.quem,
          nomeQuem: info.nome,
          papel: info.papel,
          texto: f.texto,
        };
      });
  }

  // 3. Composição de Escolhas e Hubs de Conversa
  const escolhasCompostas: EscolhaComposta[] = (node.escolhas || []).map((escolha) => {
    const check = validarEscolhaDesbloqueada(escolha, contexto.worldState, contexto.ficha);
    const flagJaExplorada = `escolha_feita_${escolha.id}`;
    const jaExplorada = Boolean(contexto.worldState.flagsBorboleta?.[flagJaExplorada]);

    return {
      ...escolha,
      desbloqueada: check.desbloqueada,
      motivoBloqueio: check.motivo,
      jaExplorada,
    };
  });

  return {
    nodeId: node.id,
    titulo: node.titulo,
    ponte: contexto.ponteAnterior,
    marcasRecebidas: contexto.marcasRecebidas,
    textoPrincipal: textoComposto,
    paragrafos,
    falas: falasCompostas,
    tipo,
    interlocutores: node.interlocutores,
    escolhas: escolhasCompostas,
  };
}
