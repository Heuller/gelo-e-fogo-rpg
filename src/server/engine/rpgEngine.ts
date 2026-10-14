import { z } from 'zod';

// ==========================================
// 1. ESQUEMAS ZOD & TIPOS DO MOTOR DE RPG
// ==========================================

// 6 Atributos-Vozes (1 a 5)
export const AtributoVozEnum = z.enum([
  'comando',   // O Marechal
  'furia',     // O Guerreiro
  'astucia',   // A Aranha
  'cortesia',  // O Cortesão
  'erudicao',  // O Meistre
  'pressagio', // O Corvo
]);
export type AtributoVoz = z.infer<typeof AtributoVozEnum>;

export const AtributosSchema = z.object({
  comando: z.number().int().min(1).max(5),
  furia: z.number().int().min(1).max(5),
  astucia: z.number().int().min(1).max(5),
  cortesia: z.number().int().min(1).max(5),
  erudicao: z.number().int().min(1).max(5),
  pressagio: z.number().int().min(1).max(5),
});
export type Atributos = z.infer<typeof AtributosSchema>;

// Traço de Origem separado
export const OrigemTraitSchema = z.string().min(2);
export type OrigemTrait = z.infer<typeof OrigemTraitSchema>;

// 3 Barras de Estado: sangue (0 a 10), compostura (0 a 10), honra (-10 a +10)
export const EstadoBarrasSchema = z.object({
  sangue: z.number().int().min(0).max(10),
  compostura: z.number().int().min(0).max(10),
  honra: z.number().int().min(-10).max(10),
});
export type EstadoBarras = z.infer<typeof EstadoBarrasSchema>;

// Ficha do Personagem
export const FichaPersonagemSchema = z.object({
  id: z.string(),
  nome: z.string(),
  origem: OrigemTraitSchema,
  atributos: AtributosSchema,
  estado: EstadoBarrasSchema,
  cicatrizes: z.array(z.string()).default([]),
  segredos: z.array(z.string()).default([]),
});
export type FichaPersonagem = z.infer<typeof FichaPersonagemSchema>;

// WorldState (Estado do Mundo)
export const WorldStateSchema = z.object({
  reputacaoCasas: z.record(z.string(), z.number()).default({}),
  flagsBorboleta: z.record(z.string(), z.union([z.boolean(), z.string(), z.number()])).default({}),
  marcosConcluidos: z.array(z.string()).default([]),
});
export type WorldState = z.infer<typeof WorldStateSchema>;

// Delta de Modificação de Estado
export const DeltaEstadoSchema = z.object({
  sangue: z.number().int().optional(),
  compostura: z.number().int().optional(),
  honra: z.number().int().optional(),
  novaCicatriz: z.string().optional(),
  novoSegredo: z.string().optional(),
  reputacaoCasas: z.record(z.string(), z.number()).optional(),
  flagsBorboleta: z.record(z.string(), z.union([z.boolean(), z.string(), z.number()])).optional(),
  marcoConcluido: z.string().optional(),
});
export type DeltaEstado = z.infer<typeof DeltaEstadoSchema>;

export type FaixaResultado = 'CRITICO' | 'SUCESSO' | 'FALHA_PARCIAL' | 'FALHA_CRITICA';

export interface OpcoesRolagem {
  riscoMortal?: boolean;
  dadosFixos?: [number, number];
}

export interface ResultadoRolagem {
  resultado: FaixaResultado;
  dados: [number, number];
  somaDados: number;
  valorAtributo: number;
  total: number;
  dc: number;
  margem: number;
  morteCanonica: boolean;
  complicacaoNarrativa: boolean;
}

// ==========================================
// 2. FUNÇÃO PURA DE ROLAGEM 2d6
// ==========================================

/**
 * Rola 2d6 adicionando o atributo contra a Dificuldade (DC).
 * 
 * Limiares exatos:
 * - CRITICO: Total >= dc + 3 ou duplo 6 natural ([6, 6]).
 * - SUCESSO: Total >= dc (quando não for crítico).
 * - FALHA_PARCIAL (Fail Forward): Total === dc - 1 ou Total === dc - 2,
 *   OU quando Total <= dc - 3 mas riscoMortal for false (nunca dando Game Over em cenas
 *   sem risco mortal, mas sinalizando complicação narrativa).
 * - FALHA_CRITICA: Total <= dc - 3 (ou duplo 1 natural [1, 1]).
 *   Retorna morteCanonica: true APENAS se riscoMortal === true.
 */
export function rolar2d6(
  valorAtributo: number,
  dc: number,
  opcoes?: OpcoesRolagem
): ResultadoRolagem {
  const dados: [number, number] = opcoes?.dadosFixos ?? [
    Math.floor(Math.random() * 6) + 1,
    Math.floor(Math.random() * 6) + 1,
  ];

  const [d1, d2] = dados;
  const somaDados = d1 + d2;
  const total = somaDados + valorAtributo;
  const margem = total - dc;
  const duplo6 = d1 === 6 && d2 === 6;
  const duplo1 = d1 === 1 && d2 === 1;
  const riscoMortal = opcoes?.riscoMortal ?? false;

  // 1. Sucesso Crítico
  if (total >= dc + 3 || duplo6) {
    return {
      resultado: 'CRITICO',
      dados,
      somaDados,
      valorAtributo,
      total,
      dc,
      margem,
      morteCanonica: false,
      complicacaoNarrativa: false,
    };
  }

  // 2. Sucesso Comum
  if (total >= dc) {
    return {
      resultado: 'SUCESSO',
      dados,
      somaDados,
      valorAtributo,
      total,
      dc,
      margem,
      morteCanonica: false,
      complicacaoNarrativa: false,
    };
  }

  // Se o teste falhou (total < dc):
  const ehFalhaGrave = total <= dc - 3 || duplo1;

  // 3. Falha Crítica com Risco Mortal
  if (ehFalhaGrave && riscoMortal) {
    return {
      resultado: 'FALHA_CRITICA',
      dados,
      somaDados,
      valorAtributo,
      total,
      dc,
      margem,
      morteCanonica: true,
      complicacaoNarrativa: true,
    };
  }

  // 4. Falha Parcial (Fail Forward)
  // Ocorre se:
  // - total === dc - 1 ou total === dc - 2
  // - OU se a falha for grave (total <= dc - 3 ou duplo 1) mas riscoMortal for falso (complicação narrativa)
  return {
    resultado: 'FALHA_PARCIAL',
    dados,
    somaDados,
    valorAtributo,
    total,
    dc,
    margem,
    morteCanonica: false,
    complicacaoNarrativa: ehFalhaGrave,
  };
}

// ==========================================
// 3. APLICAÇÃO DETERMINÍSTICA DE DELTA DE ESTADO
// ==========================================

/**
 * Atualiza barras respeitando os limites máximos/mínimos (0..10 e -10..10),
 * atualiza reputação de Casas, adiciona segredos/cicatrizes e grava flags de efeito borboleta.
 * Função pura e imutável.
 */
export function aplicarDeltaEstado(
  fichaAtual: FichaPersonagem,
  worldStateAtual: WorldState,
  delta: DeltaEstado
): { fichaAtualizada: FichaPersonagem; worldStateAtualizado: WorldState } {
  // Clamping rigoroso das 3 barras
  const novoSangue = Math.max(0, Math.min(10, fichaAtual.estado.sangue + (delta.sangue ?? 0)));
  const novaCompostura = Math.max(0, Math.min(10, fichaAtual.estado.compostura + (delta.compostura ?? 0)));
  const novaHonra = Math.max(-10, Math.min(10, fichaAtual.estado.honra + (delta.honra ?? 0)));

  // Adição de cicatrizes (sem duplicados)
  const novasCicatrizes = [...fichaAtual.cicatrizes];
  if (delta.novaCicatriz && !novasCicatrizes.includes(delta.novaCicatriz)) {
    novasCicatrizes.push(delta.novaCicatriz);
  }

  // Adição de segredos (sem duplicados)
  const novosSegredos = [...fichaAtual.segredos];
  if (delta.novoSegredo && !novosSegredos.includes(delta.novoSegredo)) {
    novosSegredos.push(delta.novoSegredo);
  }

  const fichaAtualizada: FichaPersonagem = {
    ...fichaAtual,
    estado: {
      sangue: novoSangue,
      compostura: novaCompostura,
      honra: novaHonra,
    },
    cicatrizes: novasCicatrizes,
    segredos: novosSegredos,
  };

  // Atualizar Reputação de Casas
  const novaReputacao = { ...worldStateAtual.reputacaoCasas };
  if (delta.reputacaoCasas) {
    for (const [casa, val] of Object.entries(delta.reputacaoCasas)) {
      novaReputacao[casa] = (novaReputacao[casa] ?? 0) + val;
    }
  }

  // Mesclar flags de efeito borboleta
  const novasFlags = {
    ...worldStateAtual.flagsBorboleta,
    ...(delta.flagsBorboleta ?? {}),
  };

  // Adicionar marcos concluídos
  const novosMarcos = [...worldStateAtual.marcosConcluidos];
  if (delta.marcoConcluido && !novosMarcos.includes(delta.marcoConcluido)) {
    novosMarcos.push(delta.marcoConcluido);
  }

  const worldStateAtualizado: WorldState = {
    reputacaoCasas: novaReputacao,
    flagsBorboleta: novasFlags,
    marcosConcluidos: novosMarcos,
  };

  return { fichaAtualizada, worldStateAtualizado };
}
