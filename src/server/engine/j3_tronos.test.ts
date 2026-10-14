import { describe, it, expect } from 'vitest';
import { grafoJ3Ato1 } from '../data/journeys/j3_act1';
import { grafoJ3Ato2 } from '../data/journeys/j3_act2';
import { grafoJ3Ato3 } from '../data/journeys/j3_act3';
import { grafoJ3Ato4 } from '../data/journeys/j3_act4';
import { grafoJornada3Completo } from '../data/journeys/j3_tronos_full';
import { validarGrafoJornada } from './storyLinter';

describe('Validação da Jornada 3: A Guerra dos Cinco Reis (4 Atos e 6 Finais)', () => {
  it('Ato 1 deve possuir pelo menos 16 nós e ser estruturalmente válido', () => {
    const total = Object.keys(grafoJ3Ato1.nodes).length;
    expect(total).toBeGreaterThanOrEqual(16);

    const rel = validarGrafoJornada(grafoJ3Ato1);
    if (!rel.valido) console.error('Erros no J3 Ato 1:', rel.erros);
    expect(rel.valido).toBe(true);
    expect(rel.erros).toEqual([]);
  });

  it('Ato 2 deve possuir pelo menos 14 nós e ser estruturalmente válido', () => {
    const total = Object.keys(grafoJ3Ato2.nodes).length;
    expect(total).toBeGreaterThanOrEqual(14);

    const rel = validarGrafoJornada(grafoJ3Ato2);
    if (!rel.valido) console.error('Erros no J3 Ato 2:', rel.erros);
    expect(rel.valido).toBe(true);
    expect(rel.erros).toEqual([]);
  });

  it('Ato 3 deve possuir pelo menos 10 nós e ser estruturalmente válido', () => {
    const total = Object.keys(grafoJ3Ato3.nodes).length;
    expect(total).toBeGreaterThanOrEqual(10);

    const rel = validarGrafoJornada(grafoJ3Ato3);
    if (!rel.valido) console.error('Erros no J3 Ato 3:', rel.erros);
    expect(rel.valido).toBe(true);
    expect(rel.erros).toEqual([]);
  });

  it('Ato 4 deve possuir pelo menos 13 nós e conter os 6 Finais Distintos', () => {
    const total = Object.keys(grafoJ3Ato4.nodes).length;
    expect(total).toBeGreaterThanOrEqual(13);

    const rel = validarGrafoJornada(grafoJ3Ato4);
    if (!rel.valido) console.error('Erros no J3 Ato 4:', rel.erros);
    expect(rel.valido).toBe(true);
    expect(rel.erros).toEqual([]);

    const nos = Object.keys(grafoJ3Ato4.nodes);
    expect(nos).toContain('j3_final_rei_no_norte_invicto');
    expect(nos).toContain('j3_final_regencia_honra_eddard');
    expect(nos).toContain('j3_final_lobos_na_muralha');
    expect(nos).toContain('j3_final_canonico_norte_se_lembra');
    expect(nos).toContain('j3_final_hegemonia_leao_dourado');
    expect(nos).toContain('j3_final_pacto_gelo_e_fogo');
  });

  it('deve validar 100% o Grafo Unificado da Jornada 3 (50+ nós) sem links quebrados ou nós órfãos', () => {
    const rel = validarGrafoJornada(grafoJornada3Completo);
    if (!rel.valido) console.error('Erros no Grafo J3 Completo:', rel.erros);

    expect(rel.valido).toBe(true);
    expect(rel.erros).toEqual([]);
    expect(rel.estatisticas.totalNos).toBeGreaterThanOrEqual(50);
    expect(rel.estatisticas.nosAlcancaveis).toBe(rel.estatisticas.totalNos);
    expect(rel.estatisticas.testesComRiscoMortal).toBeGreaterThanOrEqual(2);
  });

  it('deve conter as cenas icônicas de Winterfell, Septo de Baelor, Bosque dos Murmúrios e Casamento Vermelho', () => {
    const chaves = Object.keys(grafoJornada3Completo.nodes);
    expect(chaves).toContain('j3_a1_execucao_desertor_lobos');
    expect(chaves).toContain('j3_a1_queda_de_bran_torre');
    expect(chaves).toContain('j3_a2_septo_baelor_execucao_ned');
    expect(chaves).toContain('j3_a3_batalha_bosque_dos_murmurios');
    expect(chaves).toContain('j3_a3_batalha_da_agua_negra_climax');
    expect(chaves).toContain('j3_a4_banquete_das_gemeas_chuvas_castamere');
    expect(chaves).toContain('j3_a4_eleicao_jon_snow_senhor_comandante');
  });
});
