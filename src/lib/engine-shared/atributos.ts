import { AtributoVoz } from '@/server/engine/rpgEngine';

/**
 * Total canônico de pontos distribuíveis na criação de personagem.
 * Confirmado nas decisões de arquitetura §9.0 do Plano Mestre: 22 pontos.
 */
export const PONTOS_DISTRIBUIVEIS = 22;

export const VALOR_MINIMO_ATRIBUTO = 1;
export const VALOR_MAXIMO_ATRIBUTO = 5;

export const NOMES_ATRIBUTOS: Record<AtributoVoz, string> = {
  comando: 'Comando',
  furia: 'Fúria',
  astucia: 'Astúcia',
  cortesia: 'Cortesia',
  erudicao: 'Erudição',
  pressagio: 'Presságio',
};

export const DESCRICOES_ATRIBUTOS: Record<AtributoVoz, string> = {
  comando: 'Autoridade régia, presença de liderança, moral das tropas e exigência de vassalagem.',
  furia: 'Aço afiado, instinto marcial direto, força física bruta e combate singular.',
  astucia: 'Manobras nas sombras, percepção tática de fraquezas e sutileza nas conspirações.',
  cortesia: 'Protocolo solene, diplomacia heráldica, persuasão e etiqueta entre nobres.',
  erudicao: 'História dos Sete Reinos, mapas da Cidadela, corvos mensageiros e direito ancestral.',
  pressagio: 'Sonhos proféticos, vislumbres do futuro, leitura de sinais e intuição misteriosa.',
};

export const ATRIBUTOS_LISTA: AtributoVoz[] = [
  'comando',
  'furia',
  'astucia',
  'cortesia',
  'erudicao',
  'pressagio',
];
