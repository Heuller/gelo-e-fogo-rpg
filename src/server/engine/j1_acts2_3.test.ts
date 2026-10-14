import { describe, it, expect } from 'vitest';
import { grafoAto2 } from '../data/journeys/j1_act2';
import { grafoAto3 } from '../data/journeys/j1_act3';
import { grafoAto4 } from '../data/journeys/j1_act4';
import { grafoJornada1Completo } from '../data/journeys/j1_conquista_full';
import { validarGrafoJornada } from './storyLinter';

describe('Validação dos Atos 2, 3 e 4 e da Jornada 1 Completa com 6 Finais', () => {
  it('Ato 2 deve possuir pelo menos 14 nós e ser estruturalmente válido', () => {
    const totalNosAto2 = Object.keys(grafoAto2.nodes).length;
    expect(totalNosAto2).toBeGreaterThanOrEqual(14);

    const relatorio = validarGrafoJornada(grafoAto2);
    if (!relatorio.valido) {
      console.error('Erros no Ato 2:', relatorio.erros);
    }
    expect(relatorio.valido).toBe(true);
    expect(relatorio.erros).toEqual([]);
  });

  it('Ato 3 deve possuir pelo menos 14 nós e ser estruturalmente válido', () => {
    const totalNosAto3 = Object.keys(grafoAto3.nodes).length;
    expect(totalNosAto3).toBeGreaterThanOrEqual(14);

    const relatorio = validarGrafoJornada(grafoAto3);
    if (!relatorio.valido) {
      console.error('Erros no Ato 3:', relatorio.erros);
    }
    expect(relatorio.valido).toBe(true);
    expect(relatorio.erros).toEqual([]);
  });

  it('Ato 4 deve possuir pelo menos 18 nós e conter os 6 Finais Distintos', () => {
    const totalNosAto4 = Object.keys(grafoAto4.nodes).length;
    expect(totalNosAto4).toBeGreaterThanOrEqual(18);

    const relatorio = validarGrafoJornada(grafoAto4);
    if (!relatorio.valido) {
      console.error('Erros no Ato 4:', relatorio.erros);
    }
    expect(relatorio.valido).toBe(true);
    expect(relatorio.erros).toEqual([]);

    const nosAto4 = Object.keys(grafoAto4.nodes);
    expect(nosAto4).toContain('j1_final_canonico_paz_sangrenta');
    expect(nosAto4).toContain('j1_final_tres_cabecas_triunfantes');
    expect(nosAto4).toContain('j1_final_furia_fogo_total');
    expect(nosAto4).toContain('j1_final_trono_estrelado_vilavelha');
    expect(nosAto4).toContain('j1_final_coroa_visenya_irma_sombria');
    expect(nosAto4).toContain('j1_final_pacto_secreto_dornes');
  });

  it('deve validar 100% o Grafo Unificado da Jornada 1 (Atos 1, 2, 3 e 4) sem nós órfãos ou links quebrados', () => {
    const relatorioCompleto = validarGrafoJornada(grafoJornada1Completo);

    if (!relatorioCompleto.valido) {
      console.error('Erros no Grafo Completo:', relatorioCompleto.erros);
    }

    expect(relatorioCompleto.valido).toBe(true);
    expect(relatorioCompleto.erros).toEqual([]);
    // Deve conter mais de 70 nós no total (21 + 15 + 16 + 22 = 74 nós)
    expect(relatorioCompleto.estatisticas.totalNos).toBeGreaterThanOrEqual(70);
    expect(relatorioCompleto.estatisticas.nosAlcancaveis).toBe(relatorioCompleto.estatisticas.totalNos);
    expect(relatorioCompleto.estatisticas.testesComRiscoMortal).toBeGreaterThanOrEqual(4);
  });

  it('deve conter as cenas fundamentais de Harrenhal, Campo de Fogo, Torrhen Stark, Ilhas de Ferro e Dorne', () => {
    const chaves = Object.keys(grafoJornada1Completo.nodes);

    // Ato 2
    expect(chaves).toContain('j1_a2_revolta_terras_fluviais');
    expect(chaves).toContain('j1_a2_queima_de_harrenhal');
    expect(chaves).toContain('j1_a2_batalha_ultima_tempestade');

    // Ato 3
    expect(chaves).toContain('j1_a3_tres_dragoes_campo_de_fogo');
    expect(chaves).toContain('j1_a3_o_rei_que_se_ajoelhou');
    expect(chaves).toContain('j1_a3_ninho_da_aguia_ronnel');

    // Ato 4
    expect(chaves).toContain('j1_a4_expedicao_ilhas_ferro');
    expect(chaves).toContain('j1_a4_confronto_lancassolar_meria');
    expect(chaves).toContain('j1_a4_ataque_hellholt_climax');
    expect(chaves).toContain('j1_a4_noite_dos_assassinos_guarda_real');
    expect(chaves).toContain('j1_a4_a_carta_de_nymor');
  });
});
