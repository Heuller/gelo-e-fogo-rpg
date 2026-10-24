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

export const ConditionalParagraphSchema = z.object({
  requiredFlag: z.string().min(1),
  text: z.string().min(1),
});
export type ConditionalParagraph = z.infer<typeof ConditionalParagraphSchema>;

export const EscolhaSimplesSchema = z.object({
  id: z.string().min(1),
  texto: z.string().min(1),
  tipo: z.literal('simples'),
  nextNodeId: z.string().min(1),
  requiredFlags: z.array(z.string()).optional(),
  forbiddenFlags: z.array(z.string()).optional(),
  tagOrigem: z.string().optional(),
  motivoBloqueio: z.string().optional(),
  delta: DeltaEstadoSchema.optional(),
  aprovacaoCompanheiros: z.record(z.string(), z.number()).optional(),
  minCompanionApproval: z
    .object({
      companionId: z.string(),
      minApproval: z.number(),
    })
    .optional(),
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
  requiredFlags: z.array(z.string()).optional(),
  forbiddenFlags: z.array(z.string()).optional(),
  tagOrigem: z.string().optional(),
  motivoBloqueio: z.string().optional(),
  delta: DeltaEstadoSchema.optional(),
  aprovacaoCompanheiros: z.record(z.string(), z.number()).optional(),
  minCompanionApproval: z
    .object({
      companionId: z.string(),
      minApproval: z.number(),
    })
    .optional(),
});
export type EscolhaTesteAtributo = z.infer<typeof EscolhaTesteAtributoSchema>;

export const EscolhaJornadaSchema = z.discriminatedUnion('tipo', [
  EscolhaSimplesSchema,
  EscolhaTesteAtributoSchema,
]);
export type EscolhaJornada = z.infer<typeof EscolhaJornadaSchema>;
export type EscolhaNode = EscolhaJornada;

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
  conditionalParagraphs: z.array(ConditionalParagraphSchema).optional(),
  durezaCena: z.number().int().min(1).max(3).optional(),
  permiteTentativaLivre: z.boolean().optional(),
  ganchosLivres: z
    .array(
      z.object({
        intencao: z.string(),
        exigeFaixa: z.enum(['sucesso', 'parcial']),
        desbloqueiaEscolhaId: z.string(),
      })
    )
    .optional(),
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
      erros.push(`[ID Divergente] Chave '${nodeId}' difere de node.id '${node.id}'.`);
    }

    if (!node.loreContext?.fonte?.arquivo_md) {
      erros.push(`[Lore Ausente] Nó '${nodeId}' não possui 'loreContext.fonte' definido.`);
    }

    // Regra Estrita: Nós narrativos normais (não finais) devem possuir pelo menos 2 escolhas
    if (!node.isEnding && (!node.escolhas || node.escolhas.length < 2)) {
      erros.push(
        `[Poucas Escolhas] O nó normal '${nodeId}' tem apenas ${
          node.escolhas ? node.escolhas.length : 0
        } escolha(s). O padrão de qualidade exige pelo menos 2 escolhas.`
      );
    }

    if (node.escolhas) {
      totalEscolhas += node.escolhas.length;

      for (const escolha of node.escolhas) {
        if (!escolha) continue;
        if (escolha.tipo === 'simples') {
          if (!nodes[escolha.nextNodeId]) {
            erros.push(
              `[Destino Quebrado] Escolha '${escolha.id}' no nó '${nodeId}' aponta para nextNodeId inexistente '${escolha.nextNodeId}'.`
            );
          }
        } else if (escolha.tipo === 'teste_atributo') {
          if (escolha.riscoMortal) {
            testesComRiscoMortal++;
            if (!escolha.onCriticalFailureNodeId) {
              erros.push(
                `[Morte Sem Destino] Teste '${escolha.id}' em '${nodeId}' tem riscoMortal: true mas não define onCriticalFailureNodeId.`
              );
            }
          }

          if (!nodes[escolha.onSuccessNodeId]) {
            erros.push(
              `[Destino Quebrado] Teste '${escolha.id}' em '${nodeId}' aponta para onSuccessNodeId inexistente '${escolha.onSuccessNodeId}'.`
            );
          }
          if (!nodes[escolha.onPartialFailureNodeId]) {
            erros.push(
              `[Destino Quebrado] Teste '${escolha.id}' em '${nodeId}' aponta para onPartialFailureNodeId inexistente '${escolha.onPartialFailureNodeId}'.`
            );
          }
          if (escolha.onCriticalSuccessNodeId && !nodes[escolha.onCriticalSuccessNodeId]) {
            erros.push(
              `[Destino Quebrado] Teste '${escolha.id}' em '${nodeId}' aponta para onCriticalSuccessNodeId inexistente '${escolha.onCriticalSuccessNodeId}'.`
            );
          }
          if (escolha.onCriticalFailureNodeId && !nodes[escolha.onCriticalFailureNodeId]) {
            erros.push(
              `[Destino Quebrado] Teste '${escolha.id}' em '${nodeId}' aponta para onCriticalFailureNodeId inexistente '${escolha.onCriticalFailureNodeId}'.`
            );
          }
        }
      }
    }
  }

  // Análise de Alcance (Busca em Largura a partir do startNodeId)
  const visitados = new Set<string>();
  if (grafo.startNodeId && nodes[grafo.startNodeId]) {
    const fila: string[] = [grafo.startNodeId];
    visitados.add(grafo.startNodeId);

    while (fila.length > 0) {
      const atualId = fila.shift()!;
      const atualNode = nodes[atualId];
      if (!atualNode || !atualNode.escolhas) continue;

      for (const esc of atualNode.escolhas) {
        const destinos: string[] = [];
        if (esc.tipo === 'simples') {
          destinos.push(esc.nextNodeId);
        } else {
          destinos.push(esc.onSuccessNodeId);
          destinos.push(esc.onPartialFailureNodeId);
          if (esc.onCriticalSuccessNodeId) destinos.push(esc.onCriticalSuccessNodeId);
          if (esc.onCriticalFailureNodeId) destinos.push(esc.onCriticalFailureNodeId);
        }

        for (const dest of destinos) {
          if (nodes[dest] && !visitados.has(dest)) {
            visitados.add(dest);
            fila.push(dest);
          }
        }
      }
    }
  }

  for (const nodeId of nodeKeys) {
    if (!visitados.has(nodeId)) {
      erros.push(`[Nó Órfão] O nó '${nodeId}' é inalcançável a partir do nó inicial '${grafo.startNodeId}'.`);
    }
  }

  return {
    valido: erros.length === 0,
    erros,
    avisos,
    estatisticas: {
      totalNos,
      nosAlcancaveis: visitados.size,
      totalEscolhas,
      testesComRiscoMortal,
    },
  };
}
