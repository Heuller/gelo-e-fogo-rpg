import { describe, it, expect } from 'vitest';
import { probabilidadeSucesso } from '../probabilidade';

describe('Cálculo Exato de Probabilidades 2d6 (probabilidade.ts)', () => {
  it('deve calcular corretamente a probabilidade para atributo 3 vs DC 9', () => {
    const res = probabilidadeSucesso(3, 9);
    // Soma >= 6: 26 de 36 combinações = 72.2%
    expect(res.sucessoOuMelhor).toBe(26);
    expect(res.porcentagemSucesso).toBe(72);
    expect(res.porcentagemTexto).toBe('≈ 72%');
  });

  it('deve calcular corretamente a probabilidade para atributo 2 vs DC 12', () => {
    const res = probabilidadeSucesso(2, 12);
    // Soma >= 10: 6 de 36 combinações = 16.6% -> 17%
    expect(res.sucessoOuMelhor).toBe(6);
    expect(res.porcentagemSucesso).toBe(17);
    expect(res.porcentagemTexto).toBe('≈ 17%');
  });

  it('deve considerar crítico mesmo em DC extremo por duplo 6 natural [6, 6]', () => {
    // Atributo 1 vs DC 15 (soma máxima 12 + 1 = 13 < 15)
    // Normalmente impossível pelo total, mas [6, 6] é crítico natural garantido!
    const res = probabilidadeSucesso(1, 15);
    expect(res.sucessoOuMelhor).toBe(1); // Exatamente [6, 6]
    expect(res.critico).toBe(1);
    expect(res.porcentagemSucesso).toBe(3); // 1/36 = 2.77% -> 3%
  });

  it('deve registrar falhas críticas apenas quando riscoMortal = true', () => {
    const semRisco = probabilidadeSucesso(1, 12, false);
    expect(semRisco.falhaCritica).toBe(0);

    const comRisco = probabilidadeSucesso(1, 12, true);
    expect(comRisco.falhaCritica).toBeGreaterThan(0);
  });
});
