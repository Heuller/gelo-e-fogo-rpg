import { z } from 'zod';
import { AtributoVozEnum, DeltaEstadoSchema } from './rpgEngine';

// ==========================================
// 1. ESQUEMAS ZOD DO GRAFO DE JORNADA
// ==========================================

export const FonteLoreSchema = z.object({
  arquivo_md: z.string().min(1, 'arquivo_md não pode ser vazio'),
  livro: z.string().min(1, 'livro não pode ser vazio'),
  capitulo: z.string().min(1, 'capitulo não pode ser vazio'),
});
export type FonteLore = z.infer<typeof FonteLoreSchema>;

export const LoreContextSchema = z.object({
  idVerbete: z.string().optional(),
  fonte: FonteLoreSchema,
  notaHistorica: z.string().optional(),
});
export type LoreContext = z.infer<typeof LoreContextSchema>;

export const IntervencaoVozGrafoSchema = z.object({
  atributo: AtributoVozEnum,
  resultadoPassivo: z.enum(['SUCESSO', 'FALHA', 'CRITICO']).optional(),
  dcPassiva: z.number().int().optional(),
  fala: z.string().min(1),
});
export type IntervencaoVozGrafo = z.infer<typeof IntervencaoVozGrafoSchema>;

export const EscolhaSimplesSchema = z.object({
  id: z.string().min(1),
  texto: z.string().min(1),
  tipo: z.literal('simples'),
  nextNodeId: z.string().min(1),
});
export type EscolhaSimples = z.infer<typeof EscolhaSimplesSchema>;

export const EscolhaTesteAtributoSchema = z.object({
  id: z.string().min(1),
  texto: z.string().min(1),
  tipo: z.literal('teste_atributo'),
  atributo: AtributoVozEnum,
  dc: z.number().int().min(3).max(18),
  riscoMortal: z.boolean().optional(),
  onCriticalSuccessNodeId: z.string().optional(),
  onSuccessNodeId: z.string().min(1),
  onPartialFailureNodeId: z.string().min(1),
  onCriticalFailureNodeId: z.string().optional(),
});
export type EscolhaTesteAtributo = z.infer<typeof EscolhaTesteAtributoSchema>;

export const EscolhaJornadaSchema = z.discriminatedUnion('tipo', [
  EscolhaSimplesSchema,
  EscolhaTesteAtributoSchema,
]);
export type EscolhaJornada = z.infer<typeof EscolhaJornadaSchema>;

export const NodeJornadaSchema = z.object({
  id: z.string().min(1),
  titulo: z.string().min(1),
  fallbackText: z.string().min(1, 'fallbackText literário não pode ser vazio'),
  loreContext: LoreContextSchema,
  regionId: z.string().optional(),
  anoHistorico: z.string().optional(),
  localizacao: z.string().optional(),
  internalVoices: z.array(IntervencaoVozGrafoSchema).optional(),
  deltaEstado: DeltaEstadoSchema.optional(),
  escolhas: z.array(EscolhaJornadaSchema),
  isEnding: z.boolean().optional(),
});
export type NodeJornada = z.infer<typeof NodeJornadaSchema>;

export const GrafoJornadaSchema = z.object({
  id: z.string().min(1),
  titulo: z.string().min(1),
  startNodeId: z.string().min(1),
  nodes: z.record(z.string(), NodeJornadaSchema),
});
export type GrafoJornada = z.infer<typeof GrafoJornadaSchema>;

export interface ResultadoValidacaoGrafo {
  valido: boolean;
  erros: string[];
  avisos: string[];
  estatisticas: {
    totalNos: number;
    nosAlcancaveis: number;
    totalEscolhas: number;
    testesComRiscoMortal: number;
  };
}

// ==========================================
// 2. VALIDADOR DO GRAFO (LINTER NARRATIVO)
// ==========================================

export function validarGrafoJornada(grafo: GrafoJornada): ResultadoValidacaoGrafo {
  const erros: string[] = [];
  const avisos: string[] = [];

  const parseResult = GrafoJornadaSchema.safeParse(grafo);
  if (!parseResult.success) {
    for (const issue of parseResult.error.issues) {
      erros.push(`[Esquema Zod] ${issue.path.join('.')}: ${issue.message}`);
    }
  }

  const nodes = grafo.nodes ?? {};
  const nodeKeys = Object.keys(nodes);
  const totalNos = nodeKeys.length;

  if (!grafo.startNodeId || !nodes[grafo.startNodeId]) {
    erros.push(`[Nó Inicial] startNodeId '${grafo.startNodeId}' não existe no mapa de nós.`);
  }

  let totalEscolhas = 0;
  let testesComRiscoMortal = 0;

  for (const [nodeId, node] of Object.entries(nodes)) {
    if (node.id !== nodeId) {
      erros.push(`[Inconsistência] Nó '${nodeId}' possui campo interno id '${node.id}'.`);
    }

    if (!node.fallbackText || node.fallbackText.trim().length === 0) {
      erros.push(`[Texto Ausente] Nó '${nodeId}' não possui 'fallbackText' literário válido.`);
    }

    if (!node.loreContext || !node.loreContext.fonte) {
      erros.push(`[Lore Ausente] Nó '${nodeId}' não possui 'loreContext.fonte' definido.`);
    } else {
      const { arquivo_md, livro, capitulo } = node.loreContext.fonte;
      if (!arquivo_md || !livro || !capitulo) {
        erros.push(
          `[Fonte Incompleta] Nó '${nodeId}' possui campos de fonte vazios (arquivo_md: '${arquivo_md}', livro: '${livro}', capitulo: '${capitulo}').`
        );
      }
    }

    if ((!node.escolhas || node.escolhas.length === 0) && !node.isEnding) {
      avisos.push(`[Fim sem Flag] Nó '${nodeId}' não possui escolhas mas 'isEnding' não é true.`);
    }

    for (const escolha of node.escolhas ?? []) {
      totalEscolhas++;

      if (escolha.tipo === 'simples') {
        if (!nodes[escolha.nextNodeId]) {
          erros.push(
            `[Destino Quebrado] Escolha '${escolha.id}' no nó '${nodeId}' aponta para nextNodeId inexistente '${escolha.nextNodeId}'.`
          );
        }
      } else if (escolha.tipo === 'teste_atributo') {
        if (!nodes[escolha.onSuccessNodeId]) {
          erros.push(
            `[Destino Quebrado] Teste '${escolha.id}' no nó '${nodeId}' aponta para onSuccessNodeId inexistente '${escolha.onSuccessNodeId}'.`
          );
        }
        if (!nodes[escolha.onPartialFailureNodeId]) {
          erros.push(
            `[Destino Quebrado] Teste '${escolha.id}' no nó '${nodeId}' aponta para onPartialFailureNodeId inexistente '${escolha.onPartialFailureNodeId}'.`
          );
        }
        if (escolha.onCriticalSuccessNodeId && !nodes[escolha.onCriticalSuccessNodeId]) {
          erros.push(
            `[Destino Quebrado] Teste '${escolha.id}' no nó '${nodeId}' aponta para onCriticalSuccessNodeId inexistente '${escolha.onCriticalSuccessNodeId}'.`
          );
        }

        if (escolha.riscoMortal) {
          testesComRiscoMortal++;
          if (!escolha.onCriticalFailureNodeId) {
            erros.push(
              `[Morte Sem Destino] Teste com riscoMortal '${escolha.id}' no nó '${nodeId}' não possui 'onCriticalFailureNodeId'.`
            );
          } else if (!nodes[escolha.onCriticalFailureNodeId]) {
            erros.push(
              `[Destino Quebrado] Teste com riscoMortal '${escolha.id}' no nó '${nodeId}' aponta para onCriticalFailureNodeId inexistente '${escolha.onCriticalFailureNodeId}'.`
            );
          }
        } else if (escolha.onCriticalFailureNodeId && !nodes[escolha.onCriticalFailureNodeId]) {
          erros.push(
            `[Destino Quebrado] Teste '${escolha.id}' no nó '${nodeId}' aponta para onCriticalFailureNodeId inexistente '${escolha.onCriticalFailureNodeId}'.`
          );
        }
      }
    }
  }

  // Busca em Largura (BFS) para Nós Órfãos
  const visitados = new Set<string>();
  const fila: string[] = [];

  if (grafo.startNodeId && nodes[grafo.startNodeId]) {
    fila.push(grafo.startNodeId);
    visitados.add(grafo.startNodeId);
  }

  while (fila.length > 0) {
    const atualId = fila.shift()!;
    const atualNode = nodes[atualId];
    if (!atualNode) continue;

    for (const escolha of atualNode.escolhas ?? []) {
      const vizinhos: string[] = [];
      if (escolha.tipo === 'simples') {
        vizinhos.push(escolha.nextNodeId);
      } else if (escolha.tipo === 'teste_atributo') {
        vizinhos.push(escolha.onSuccessNodeId);
        vizinhos.push(escolha.onPartialFailureNodeId);
        if (escolha.onCriticalSuccessNodeId) vizinhos.push(escolha.onCriticalSuccessNodeId);
        if (escolha.onCriticalFailureNodeId) vizinhos.push(escolha.onCriticalFailureNodeId);
      }

      for (const vizinho of vizinhos) {
        if (vizinho && nodes[vizinho] && !visitados.has(vizinho)) {
          visitados.add(vizinho);
          fila.push(vizinho);
        }
      }
    }
  }

  for (const nodeId of nodeKeys) {
    if (!visitados.has(nodeId)) {
      erros.push(`[Nó Órfão] O nó '${nodeId}' é inalcançável a partir do nó inicial '${grafo.startNodeId}'.`);
    }
  }

  const nosAlcancaveis = visitados.size;

  return {
    valido: erros.length === 0,
    erros,
    avisos,
    estatisticas: {
      totalNos,
      nosAlcancaveis,
      totalEscolhas,
      testesComRiscoMortal,
    },
  };
}
