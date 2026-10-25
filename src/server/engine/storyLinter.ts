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

export const OrigemCenaEnum = z.enum(['canonica', 'original']);
export type OrigemCena = z.infer<typeof OrigemCenaEnum>;

export const LoreContextSchema = z.object({
  idVerbete: z.string().optional(),
  origem: OrigemCenaEnum.optional(),
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

// ==========================================
// 1.1 ESQUEMA V2: MOTOR DE CONSEQUÊNCIA E DIÁLOGO (FASE G6A)
// ==========================================

export const CondicaoSchema = z.object({
  flagsTodas: z.array(z.string()).optional(),
  flagsNenhuma: z.array(z.string()).optional(),
  aprovacao: z
    .object({
      companheiro: z.string(),
      min: z.number().optional(),
      max: z.number().optional(),
    })
    .optional(),
  ultimaEscolha: z.array(z.string()).optional(),
  ultimoResultado: z.array(z.enum(['critico', 'sucesso', 'parcial', 'falha'])).optional(),
  relogio: z
    .object({
      id: z.string(),
      min: z.number(),
    })
    .optional(),
  modo: z.array(z.enum(['cronica', 'padrao', 'juramento'])).optional(),
});
export type Condicao = z.infer<typeof CondicaoSchema>;

export const BlocoTextoSchema = z.object({
  quando: CondicaoSchema.optional(),
  texto: z.string().min(1),
  funcao: z.enum(['abertura', 'corpo', 'fecho']).optional(),
});
export type BlocoTexto = z.infer<typeof BlocoTextoSchema>;

export const DesfechoSchema = z.object({
  ponte: z.string().min(1),
  destino: z.string().optional(),
  delta: DeltaEstadoSchema.optional(),
  marcas: z.array(z.string()).optional(),
});
export type Desfecho = z.infer<typeof DesfechoSchema>;

export const DesfechosTesteSchema = z.object({
  criticoSucesso: DesfechoSchema.optional(),
  sucesso: DesfechoSchema,
  parcial: DesfechoSchema,
  falha: DesfechoSchema.optional(),
  criticoFalha: DesfechoSchema.optional(),
});
export type DesfechosTeste = z.infer<typeof DesfechosTesteSchema>;

export const TomEscolhaEnum = z.enum([
  'diplomatico',
  'honesto',
  'ameaca',
  'engano',
  'humor',
  'silencio',
  'devocao',
  'violencia',
]);
export type TomEscolha = z.infer<typeof TomEscolhaEnum>;

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
  desfecho: DesfechoSchema.optional(),
  tom: TomEscolhaEnum.optional(),
  unica: z.boolean().optional(),
  permanece: z.boolean().optional(),
});
export type EscolhaSimples = z.infer<typeof EscolhaSimplesSchema>;

export const TipoCircunstanciaEnum = z.enum(['vantagem', 'desvantagem']);
export type TipoCircunstancia = z.infer<typeof TipoCircunstanciaEnum>;

export const CircunstanciaTesteSchema = z.object({
  tipo: TipoCircunstanciaEnum,
  motivo: z.string().min(1),
  condicao: CondicaoSchema.optional(),
});
export type CircunstanciaTeste = z.infer<typeof CircunstanciaTesteSchema>;

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
  desfechos: DesfechosTesteSchema.optional(),
  desfecho: DesfechoSchema.optional(),
  tom: TomEscolhaEnum.optional(),
  unica: z.boolean().optional(),
  permanece: z.boolean().optional(),
  circunstancias: z.array(CircunstanciaTesteSchema).optional(),
});
export type EscolhaTesteAtributo = z.infer<typeof EscolhaTesteAtributoSchema>;

export const EscolhaJornadaSchema = z.discriminatedUnion('tipo', [
  EscolhaSimplesSchema,
  EscolhaTesteAtributoSchema,
]);
export type EscolhaJornada = z.infer<typeof EscolhaJornadaSchema>;
export type EscolhaNode = EscolhaJornada;

export const InterlocutorSchema = z.object({
  id: z.string().min(1),
  nome: z.string().min(1),
  papel: z.string().optional(),
});
export type Interlocutor = z.infer<typeof InterlocutorSchema>;

export const FalaCenaSchema = z.object({
  quem: z.string().min(1),
  texto: z.string().min(1),
  quando: CondicaoSchema.optional(),
});
export type FalaCena = z.infer<typeof FalaCenaSchema>;

export const ReacaoCompanheiroSchema = z.object({
  companheiro: z.string().min(1),
  condicao: CondicaoSchema.optional(),
  fala: z.string().min(1).max(200),
});
export type ReacaoCompanheiro = z.infer<typeof ReacaoCompanheiroSchema>;

export const VozConflitoSchema = z.object({
  voz1: AtributoVozEnum,
  voz2: AtributoVozEnum,
  fala1: z.string().min(1),
  fala2: z.string().min(1),
  quando: CondicaoSchema.optional(),
});
export type VozConflito = z.infer<typeof VozConflitoSchema>;

export const EpigrafeSchema = z.object({
  texto: z.string().min(1).max(350),
  autor: z.string().min(1),
});
export type Epigrafe = z.infer<typeof EpigrafeSchema>;

export const NodeJornadaSchema = z.object({
  id: z.string().min(1),
  titulo: z.string().min(1),
  fallbackText: z.string().min(1, 'fallbackText literário não pode ser vazio'),
  loreContext: LoreContextSchema,
  origem: OrigemCenaEnum.optional(),
  notaHistorica: z.string().optional(),
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
  // Campos do Esquema v2
  tipo: z.enum(['narracao', 'dialogo', 'hub', 'peca_de_cenario', 'acerto_de_contas']).optional(),
  interlocutores: z.array(InterlocutorSchema).optional(),
  falas: z.array(FalaCenaSchema).optional(),
  blocos: z.array(BlocoTextoSchema).optional(),
  rota: z.string().optional(),
  // Camada BG3 e Literatura (Fase G7B)
  circunstancias: z.array(CircunstanciaTesteSchema).optional(),
  reacoes: z.array(ReacaoCompanheiroSchema).optional(),
  vozesConflito: z.array(VozConflitoSchema).optional(),
  dicaPercepcao: z.string().optional(),
  pov: z.string().optional(),
  epigrafe: EpigrafeSchema.optional(),
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
