import { describe, it, expect } from 'vitest';
import { ResultadoRolagem, rolar2d6, FaixaResultado } from '@/server/engine/rpgEngine';

describe('CartaoDeRolagem — Lógica e Regras de Negócio', () => {
  it('determina corretamente o selo e elegibilidade de rerrolagem para Sucesso', () => {
    const res: ResultadoRolagem = {
      resultado: 'SUCESSO',
      dados: [4, 5],
      somaDados: 9,
      valorAtributo: 3,
      total: 12,
      dc: 10,
      margem: 2,
      morteCanonica: false,
      complicacaoNarrativa: false,
    };

    const ehFalha = res.resultado === 'FALHA_PARCIAL' || res.resultado === 'FALHA_CRITICA';
    const inspiracaoRestante = 2;
    const podeRerrolar = ehFalha && inspiracaoRestante > 0;

    expect(ehFalha).toBe(false);
    expect(podeRerrolar).toBe(false);
    expect(res.total).toBe(12);
    expect(res.dc).toBe(10);
  });

  it('permite rerrolagem com Inspiração em caso de Falha Parcial', () => {
    const res: ResultadoRolagem = {
      resultado: 'FALHA_PARCIAL',
      dados: [2, 3],
      somaDados: 5,
      valorAtributo: 2,
      total: 7,
      dc: 10,
      margem: -3,
      morteCanonica: false,
      complicacaoNarrativa: true,
    };

    const ehFalha = res.resultado === 'FALHA_PARCIAL' || res.resultado === 'FALHA_CRITICA';
    const inspiracaoRestante = 2;
    const podeRerrolar = ehFalha && inspiracaoRestante > 0;

    expect(ehFalha).toBe(true);
    expect(podeRerrolar).toBe(true);
  });

  it('bloqueia rerrolagem se o jogador possuir 0 pontos de Inspiração', () => {
    const res: ResultadoRolagem = {
      resultado: 'FALHA_CRITICA',
      dados: [1, 1],
      somaDados: 2,
      valorAtributo: 3,
      total: 5,
      dc: 12,
      margem: -7,
      morteCanonica: true,
      complicacaoNarrativa: true,
    };

    const ehFalha = res.resultado === 'FALHA_PARCIAL' || res.resultado === 'FALHA_CRITICA';
    const inspiracaoRestante = 0;
    const podeRerrolar = ehFalha && inspiracaoRestante > 0;

    expect(ehFalha).toBe(true);
    expect(podeRerrolar).toBe(false);
  });

  it('mapeia todos os vereditos do motor para selos heráldicos válidos', () => {
    const mapaSelo: Record<FaixaResultado, string> = {
      CRITICO: 'TRIUNFO',
      SUCESSO: 'SUCESSO',
      FALHA_PARCIAL: 'FALHA_PARCIAL',
      FALHA_CRITICA: 'CALAMIDADE',
    };

    expect(mapaSelo.CRITICO).toBe('TRIUNFO');
    expect(mapaSelo.SUCESSO).toBe('SUCESSO');
    expect(mapaSelo.FALHA_PARCIAL).toBe('FALHA_PARCIAL');
    expect(mapaSelo.FALHA_CRITICA).toBe('CALAMIDADE');
  });
});
