/**
 * Feature Flags para o Sistema de RPG
 * Permite ligar/desligar mecânicas avançadas mantendo compatibilidade e regressão zero.
 */

export interface FeatureFlags {
  cadernoAchados: boolean;
  livroDeNomes: boolean;
  relogios: boolean;
  percepcaoPassiva: boolean;
}

export function obterFeatureFlags(): FeatureFlags {
  return {
    cadernoAchados:
      process.env.FEATURE_CADERNO_ACHADOS !== 'false' &&
      process.env.NEXT_PUBLIC_FEATURE_CADERNO_ACHADOS !== 'false',
    livroDeNomes:
      process.env.FEATURE_LIVRO_NOMES !== 'false' &&
      process.env.NEXT_PUBLIC_FEATURE_LIVRO_NOMES !== 'false',
    relogios:
      process.env.FEATURE_RELOGIOS !== 'false' &&
      process.env.NEXT_PUBLIC_FEATURE_RELOGIOS !== 'false',
    percepcaoPassiva:
      process.env.FEATURE_PERCEPCAO_PASSIVA !== 'false' &&
      process.env.NEXT_PUBLIC_FEATURE_PERCEPCAO_PASSIVA !== 'false',
  };
}
