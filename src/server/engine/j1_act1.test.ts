import { describe, it, expect } from 'vitest';
import { grafoAto1 } from '../data/journeys/j1_act1';
import { validarGrafoJornada } from './storyLinter';

describe('Validação do Grafo Narrativo: Ato 1 da Conquista (j1_act1.ts)', () => {
  it('deve passar 100% no linter narrativo sem nós órfãos ou links quebrados', () => {
    const relatorio = validarGrafoJornada(grafoAto1);

    if (!relatorio.valido) {
      console.error('Erros encontrados no grafo:', relatorio.erros);
    }

    expect(relatorio.valido).toBe(true);
    expect(relatorio.erros).toEqual([]);
    expect(relatorio.estatisticas.totalNos).toBeGreaterThanOrEqual(16);
    expect(relatorio.estatisticas.nosAlcancaveis).toBe(relatorio.estatisticas.totalNos);
    expect(relatorio.estatisticas.testesComRiscoMortal).toBeGreaterThanOrEqual(2);
  });

  it('deve conter as cenas fundamentais do Desembarque e da Coroação', () => {
    const nos = Object.keys(grafoAto1.nodes);
    expect(nos).toContain('j1_a1_mesa_pintada');
    expect(nos).toContain('j1_a1_oferta_argilac');
    expect(nos).toContain('j1_a1_maos_cortadas');
    expect(nos).toContain('j1_a1_desembarque_agua_negra');
    expect(nos).toContain('j1_a1_submissao_rosby_stokeworth');
    expect(nos).toContain('j1_a1_batalha_darklyn_mooton');
    expect(nos).toContain('j1_a1_coroacao_forte_aegon');
    expect(nos).toContain('j1_a1_frente_naval_valegaivota');
    expect(nos).toContain('j1_a1_frente_fluvial_harrenhal');
    expect(nos).toContain('j1_a1_frente_tempestade_orys');
    expect(nos).toContain('j1_a1_checkpoint_naval');
    expect(nos).toContain('j1_a1_checkpoint_fluvial');
    expect(nos).toContain('j1_a1_checkpoint_tempestade');
  });

  it('deve assegurar que os nós de morte canônica estejam devidamente configurados como finais', () => {
    const morteDarklyn = grafoAto1.nodes['j1_a1_morte_darklyn'];
    expect(morteDarklyn).toBeDefined();
    expect(morteDarklyn.isEnding).toBe(true);
    expect(morteDarklyn.escolhas.length).toBe(0);

    const morteTempestade = grafoAto1.nodes['j1_a1_morte_emboscada_tempestade'];
    expect(morteTempestade).toBeDefined();
    expect(morteTempestade.isEnding).toBe(true);
    expect(morteTempestade.escolhas.length).toBe(0);
  });
});
