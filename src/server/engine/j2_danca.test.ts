import { describe, it, expect } from 'vitest';
import { grafoJ2Ato1 } from '../data/journeys/j2_act1';
import { grafoJ2Ato2 } from '../data/journeys/j2_act2';
import { grafoJ2Ato3 } from '../data/journeys/j2_act3';
import { grafoJ2Ato4 } from '../data/journeys/j2_act4';
import { grafoJornada2Completo } from '../data/journeys/j2_danca_full';
import { validarGrafoJornada } from './storyLinter';

describe('Validação da Jornada 2: A Dança dos Dragões (4 Atos e 6 Finais)', () => {
  it('Ato 1 deve possuir pelo menos 16 nós e ser estruturalmente válido', () => {
    const total = Object.keys(grafoJ2Ato1.nodes).length;
    expect(total).toBeGreaterThanOrEqual(16);

    const rel = validarGrafoJornada(grafoJ2Ato1);
    if (!rel.valido) console.error('Erros no J2 Ato 1:', rel.erros);
    expect(rel.valido).toBe(true);
    expect(rel.erros).toEqual([]);
  });

  it('Ato 2 deve possuir pelo menos 16 nós e ser estruturalmente válido', () => {
    const total = Object.keys(grafoJ2Ato2.nodes).length;
    expect(total).toBeGreaterThanOrEqual(16);

    const rel = validarGrafoJornada(grafoJ2Ato2);
    if (!rel.valido) console.error('Erros no J2 Ato 2:', rel.erros);
    expect(rel.valido).toBe(true);
    expect(rel.erros).toEqual([]);
  });

  it('Ato 3 deve possuir pelo menos 16 nós e ser estruturalmente válido', () => {
    const total = Object.keys(grafoJ2Ato3.nodes).length;
    expect(total).toBeGreaterThanOrEqual(16);

    const rel = validarGrafoJornada(grafoJ2Ato3);
    if (!rel.valido) console.error('Erros no J2 Ato 3:', rel.erros);
    expect(rel.valido).toBe(true);
    expect(rel.erros).toEqual([]);
  });

  it('Ato 4 deve possuir pelo menos 16 nós e conter os 6 Finais Distintos', () => {
    const total = Object.keys(grafoJ2Ato4.nodes).length;
    expect(total).toBeGreaterThanOrEqual(16);

    const rel = validarGrafoJornada(grafoJ2Ato4);
    if (!rel.valido) console.error('Erros no J2 Ato 4:', rel.erros);
    expect(rel.valido).toBe(true);
    expect(rel.erros).toEqual([]);

    const nos = Object.keys(grafoJ2Ato4.nodes);
    expect(nos).toContain('j2_final_canonico_hora_do_lobo');
    expect(nos).toContain('j2_final_triunfo_negro_rhaenyra');
    expect(nos).toContain('j2_final_hegemonia_verde_dourada');
    expect(nos).toContain('j2_final_imperio_sementes_vermithor');
    expect(nos).toContain('j2_final_grande_paz_harrenhal');
    expect(nos).toContain('j2_final_justica_gelo_cregan');
  });

  it('deve validar 100% o Grafo Unificado da Jornada 2 (64+ nós) sem links quebrados ou nós órfãos', () => {
    const rel = validarGrafoJornada(grafoJornada2Completo);
    if (!rel.valido) console.error('Erros no Grafo J2 Completo:', rel.erros);

    expect(rel.valido).toBe(true);
    expect(rel.erros).toEqual([]);
    expect(rel.estatisticas.totalNos).toBeGreaterThanOrEqual(64);
    expect(rel.estatisticas.nosAlcancaveis).toBe(rel.estatisticas.totalNos);
    expect(rel.estatisticas.testesComRiscoMortal).toBeGreaterThanOrEqual(4);
  });

  it('deve conter as cenas icônicas de Ponta Tempestade, Pouso de Gralhas, Semeadura e Olho de Deus', () => {
    const chaves = Object.keys(grafoJornada2Completo.nodes);
    expect(chaves).toContain('j2_a1_ponta_tempestade_chegada_aemond');
    expect(chaves).toContain('j2_a1_luto_e_vinganca_sangue_e_queijo');
    expect(chaves).toContain('j2_a2_batalha_pouso_de_gralhas_climax');
    expect(chaves).toContain('j2_a2_semeadura_vermelha_convocacao');
    expect(chaves).toContain('j2_a2_batalha_da_goela_frota');
    expect(chaves).toContain('j2_a3_duelo_lendario_olho_de_deus');
    expect(chaves).toContain('j2_a3_assalto_fosso_dos_dragoes_pastor');
    expect(chaves).toContain('j2_a4_hora_do_lobo_cregan_stark');
  });
});
