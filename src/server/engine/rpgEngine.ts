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

// Sistema de Companheiros estilo Baldur's Gate 3
export const StatusAprovacaoEnum = z.enum([
  'Hostil',   // <= -40
  'Frio',     // -39 a -10
  'Neutro',   // -9 a +29
  'Leal',     // +30 a +69
  'Devotado', // >= +70
]);
export type StatusAprovacao = z.infer<typeof StatusAprovacaoEnum>;

export const CompanheiroSchema = z.object({
  id: z.string(),
  nome: z.string(),
  titulo: z.string(),
  aprovacao: z.number().int().min(-100).max(100),
  status: StatusAprovacaoEnum,
});
export type Companheiro = z.infer<typeof CompanheiroSchema>;

export function calcularStatusAprovacao(aprovacao: number): StatusAprovacao {
  if (aprovacao <= -40) return 'Hostil';
  if (aprovacao <= -10) return 'Frio';
  if (aprovacao < 30) return 'Neutro';
  if (aprovacao < 70) return 'Leal';
  return 'Devotado';
}

// Ficha do Personagem com Inspiração e Companheiros
export const FichaPersonagemSchema = z.object({
  id: z.string(),
  nome: z.string(),
  titulo: z.string().optional(),
  origem: OrigemTraitSchema,
  atributos: AtributosSchema,
  estado: EstadoBarrasSchema,
  cicatrizes: z.array(z.string()).default([]),
  segredos: z.array(z.string()).default([]),
  inspiracao: z.number().int().min(0).max(4).default(2),
  companheiros: z.record(z.string(), CompanheiroSchema).default({}),
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
  flagsAdicionadas: z.array(z.string()).optional(),
  marcoConcluido: z.string().optional(),
  inspiracao: z.number().int().optional(),
  aprovacaoCompanheiros: z.record(z.string(), z.number()).optional(),
  ficha: z
    .object({
      sangue: z.number().int().optional(),
      compostura: z.number().int().optional(),
      honra: z.number().int().optional(),
      inspiracao: z.number().int().optional(),
    })
    .optional(),
  mundo: z.record(z.string(), z.union([z.boolean(), z.string(), z.number()])).optional(),
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

export interface NotificacaoAprovacaoCompanheiro {
  companionId: string;
  nome: string;
  delta: number;
  status: StatusAprovacao;
  textoNotificacao: string;
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
// 3. SISTEMA DE INSPIRAÇÃO BG3 (RERROLAGEM)
// ==========================================

export function rerrolarUltimoTesteComInspiracao(
  fichaAtual: FichaPersonagem,
  dc: number,
  valorAtributo: number,
  opcoes?: OpcoesRolagem
): {
  resultadoRolagem: ResultadoRolagem;
  fichaAtualizada: FichaPersonagem;
  sucessoGasto: boolean;
  motivo?: string;
} {
  const pontosAtuais = fichaAtual.inspiracao ?? 0;
  if (pontosAtuais <= 0) {
    return {
      resultadoRolagem: rolar2d6(valorAtributo, dc, opcoes),
      fichaAtualizada: fichaAtual,
      sucessoGasto: false,
      motivo: 'Sem Pontos de Inspiração disponíveis.',
    };
  }

  const novaInspiracao = Math.max(0, pontosAtuais - 1);
  const novaRolagem = rolar2d6(valorAtributo, dc, opcoes);

  const fichaAtualizada: FichaPersonagem = {
    ...fichaAtual,
    inspiracao: novaInspiracao,
  };

  return {
    resultadoRolagem: novaRolagem,
    fichaAtualizada,
    sucessoGasto: true,
  };
}

// ==========================================
// 4. COMPANHEIROS INICIAIS POR JORNADA
// ==========================================

export function obterCompanheirosIniciais(journeyId?: string): Record<string, Companheiro> {
  const lower = (journeyId || '').toLowerCase();

  if (lower.includes('rebeliao') || lower.includes('robert') || lower.includes('jornada_5')) {
    return {
      robert_baratheon: {
        id: 'robert_baratheon',
        nome: 'Robert Baratheon',
        titulo: 'Senhor de Ponta Tempestade & Líder da Rebelião',
        aprovacao: 35,
        status: 'Leal',
      },
      ned_stark: {
        id: 'ned_stark',
        nome: 'Eddard Stark',
        titulo: 'Senhor de Winterfell & Protetor do Norte',
        aprovacao: 35,
        status: 'Leal',
      },
      jon_arryn: {
        id: 'jon_arryn',
        nome: 'Lorde Jon Arryn',
        titulo: 'Senhor do Ninho da Águia & Defensor do Vale',
        aprovacao: 30,
        status: 'Leal',
      },
      peixe_negro: {
        id: 'peixe_negro',
        nome: 'Sor Brynden Tully (Peixe Negro)',
        titulo: 'Vanguarda do Tridente & Escudo de Correrrio',
        aprovacao: 25,
        status: 'Neutro',
      },
      howland_reed: {
        id: 'howland_reed',
        nome: 'Howland Reed',
        titulo: 'Senhor de Atalaia da Água Cinzenta & O Crannogman',
        aprovacao: 30,
        status: 'Leal',
      },
    };
  }

  if (lower.includes('danca') || lower.includes('jornada_2')) {
    return {
      daemon: {
        id: 'daemon',
        nome: 'Daemon Targaryen',
        titulo: 'Príncipe Rebelde & Cavaleiro de Caraxes',
        aprovacao: 35,
        status: 'Leal',
      },
      corlys: {
        id: 'corlys',
        nome: 'Corlys Velaryon',
        titulo: 'A Serpente Marinha & Senhor das Marés',
        aprovacao: 25,
        status: 'Neutro',
      },
      rhaenys_j2: {
        id: 'rhaenys_j2',
        nome: 'Princesa Rhaenys Targaryen',
        titulo: 'A Rainha Que Nunca Foi & Montadora de Meleys',
        aprovacao: 30,
        status: 'Leal',
      },
      mysaria: {
        id: 'mysaria',
        nome: 'Mysaria (O Verme Branco)',
        titulo: 'Mestra dos Sussurros de Pedra do Dragão',
        aprovacao: 15,
        status: 'Neutro',
      },
    };
  }

  if (lower.includes('tronos') || lower.includes('guerra') || lower.includes('jornada_3')) {
    return {
      catelyn: {
        id: 'catelyn',
        nome: 'Catelyn Stark',
        titulo: 'Senhora de Winterfell & Filha de Correrrio',
        aprovacao: 35,
        status: 'Leal',
      },
      grande_jon: {
        id: 'grande_jon',
        nome: 'Grande Jon Umber',
        titulo: 'Senhor de Última Lareira & Vanguarda do Norte',
        aprovacao: 25,
        status: 'Neutro',
      },
      peixe_negro: {
        id: 'peixe_negro',
        nome: 'Sor Brynden Tully (Peixe Negro)',
        titulo: 'Cavaleiro do Portão & Escudo do Tridente',
        aprovacao: 30,
        status: 'Leal',
      },
      jon_snow: {
        id: 'jon_snow',
        nome: 'Jon Snow',
        titulo: 'Irmão Juramentado da Patrulha da Noite',
        aprovacao: 40,
        status: 'Leal',
      },
    };
  }

  if (lower.includes('patrulha') || lower.includes('irmao') || lower.includes('jornada_4')) {
    return {
      jon_snow: {
        id: 'jon_snow',
        nome: 'Jon Snow',
        titulo: 'Irmão Juramentado & Administrador do Senhor Comandante',
        aprovacao: 35,
        status: 'Leal',
      },
      samwell: {
        id: 'samwell',
        nome: 'Samwell Tarly',
        titulo: 'Intendente de Meistre Aemon & O Matador de Outros',
        aprovacao: 30,
        status: 'Leal',
      },
      donal_noye: {
        id: 'donal_noye',
        nome: 'Donal Noye',
        titulo: 'Armeiro Maneta & Defensor do Portão',
        aprovacao: 25,
        status: 'Neutro',
      },
      alliser_thorne: {
        id: 'alliser_thorne',
        nome: 'Sor Alliser Thorne',
        titulo: 'Mestre de Armas da Guarda Velha',
        aprovacao: 5,
        status: 'Frio',
      },
      grenn: {
        id: 'grenn',
        nome: 'Grenn (O Bisão)',
        titulo: 'Patrulheiro Jurado da Muralha',
        aprovacao: 25,
        status: 'Neutro',
      },
      pyp: {
        id: 'pyp',
        nome: 'Pyp (Pypar)',
        titulo: 'Patrulheiro & Menestrel de Castelo Negro',
        aprovacao: 25,
        status: 'Neutro',
      },
      aemon: {
        id: 'aemon',
        nome: 'Meistre Aemon Targaryen',
        titulo: 'Meistre Centenário de Castelo Negro',
        aprovacao: 20,
        status: 'Neutro',
      },
    };
  }

  // Padrão: Jornada 1 (Conquista de Aegon)
  return {
    visenya: {
      id: 'visenya',
      nome: 'Visenya Targaryen',
      titulo: 'Rainha & Montadora de Vhagar',
      aprovacao: 25,
      status: 'Neutro',
    },
    rhaenys: {
      id: 'rhaenys',
      nome: 'Rhaenys Targaryen',
      titulo: 'Rainha & Montadora de Meraxes',
      aprovacao: 35,
      status: 'Leal',
    },
    orys: {
      id: 'orys',
      nome: 'Orys Baratheon',
      titulo: 'Mão do Rei & Escudo de Aegon',
      aprovacao: 40,
      status: 'Leal',
    },
    daemon_v: {
      id: 'daemon_v',
      nome: 'Daemon Velaryon',
      titulo: 'Mestre dos Navios & Lorde das Marés',
      aprovacao: 20,
      status: 'Neutro',
    },
  };
}

// ==========================================
// 5. APLICAÇÃO DETERMINÍSTICA DE DELTA DE ESTADO
// ==========================================

export function aplicarDeltaEstado(
  fichaAtual: FichaPersonagem,
  worldStateAtual: WorldState,
  delta: DeltaEstado
): {
  fichaAtualizada: FichaPersonagem;
  worldStateAtualizado: WorldState;
  notificacoesCompanheiros: NotificacaoAprovacaoCompanheiro[];
} {
  // Suporte a delta unificado (flat ou aninhado via delta.ficha)
  const dSangue = (delta.sangue ?? 0) + (delta.ficha?.sangue ?? 0);
  const dCompostura = (delta.compostura ?? 0) + (delta.ficha?.compostura ?? 0);
  const dHonra = (delta.honra ?? 0) + (delta.ficha?.honra ?? 0);
  const dInspiracao = (delta.inspiracao ?? 0) + (delta.ficha?.inspiracao ?? 0);

  // Clamping rigoroso das 3 barras
  const novoSangue = Math.max(0, Math.min(10, fichaAtual.estado.sangue + dSangue));
  const novaCompostura = Math.max(0, Math.min(10, fichaAtual.estado.compostura + dCompostura));
  const novaHonra = Math.max(-10, Math.min(10, fichaAtual.estado.honra + dHonra));

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

  // Pontos de Inspiração (0 a 4)
  const novaInspiracao = Math.max(
    0,
    Math.min(4, (fichaAtual.inspiracao ?? 2) + dInspiracao)
  );

  // Atualização de Aprovação de Companheiros (Estilo BG3)
  const novosCompanheiros = { ...(fichaAtual.companheiros ?? {}) };
  const notificacoesCompanheiros: NotificacaoAprovacaoCompanheiro[] = [];

  if (delta.aprovacaoCompanheiros) {
    for (const [rawCompId, deltaAprov] of Object.entries(delta.aprovacaoCompanheiros)) {
      const compId = rawCompId === 'noye' ? 'donal_noye' : rawCompId;
      if (novosCompanheiros[compId]) {
        const comp = novosCompanheiros[compId];
        const novaAprov = Math.max(-100, Math.min(100, comp.aprovacao + deltaAprov));
        const novoStatus = calcularStatusAprovacao(novaAprov);

        novosCompanheiros[compId] = {
          ...comp,
          aprovacao: novaAprov,
          status: novoStatus,
        };

        const sinal = deltaAprov > 0 ? `+${deltaAprov}` : `${deltaAprov}`;
        const verbo = deltaAprov > 0 ? 'aprova' : 'desaprova';
        notificacoesCompanheiros.push({
          companionId: compId,
          nome: comp.nome,
          delta: deltaAprov,
          status: novoStatus,
          textoNotificacao: `[${comp.nome} ${verbo} (${sinal})]`,
        });
      }
    }
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
    inspiracao: novaInspiracao,
    companheiros: novosCompanheiros,
  };

  // Atualizar Reputação de Casas
  const novaReputacao = { ...worldStateAtual.reputacaoCasas };
  if (delta.reputacaoCasas) {
    for (const [casa, val] of Object.entries(delta.reputacaoCasas)) {
      novaReputacao[casa] = (novaReputacao[casa] ?? 0) + val;
    }
  }

  // Mesclar flags de efeito borboleta (flat, mundo ou flagsAdicionadas)
  const novasFlags = {
    ...worldStateAtual.flagsBorboleta,
    ...(delta.flagsBorboleta ?? {}),
    ...(delta.mundo ?? {}),
  };
  if (delta.flagsAdicionadas) {
    for (const flag of delta.flagsAdicionadas) {
      novasFlags[flag] = true;
    }
  }

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

  return { fichaAtualizada, worldStateAtualizado, notificacoesCompanheiros };
}
