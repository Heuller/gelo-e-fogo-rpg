import { describe, it, expect } from 'vitest';
import { grafoAto2 } from '../data/journeys/j1_act2';
import { grafoAto3 } from '../data/journeys/j1_act3';
import { grafoJornada1Completo } from '../data/journeys/j1_conquista_full';
import { validarGrafoJornada } from './storyLinter';

describe('Validação dos Atos 2 e 3 e da Jornada 1 Completa', () => {
  it('Ato 2 deve possuir pelo menos 14 nós e ser estruturalmente válido', () => {
    const totalNosAto2 = Object.keys(grafoAto2.nodes).length;
    expect(totalNosAto2).toBeGreaterThanOrEqual(14);

    const relatorio = validarGrafoJornada(grafoAto2);
    if (!relatorio.valido) {
      console.error('Erros no Ato 2:', relatorio.erros);
    }
    expect(relatorio.valido).toBe(true);
    expect(relatorio.erros).toEqual([]);
    expect(relatorio.estatisticas.totalNos).toBe(totalNosAto2);
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
    expect(relatorio.estatisticas.totalNos).toBe(totalNosAto3);
  });

  it('deve validar 100% o Grafo Unificado da Jornada 1 (Atos 1, 2 e 3) sem nós órfãos ou links quebrados', () => {
    const relatorioCompleto = validarGrafoJornada(grafoJornada1Completo);

    if (!relatorioCompleto.valido) {
      console.error('Erros no Grafo Completo:', relatorioCompleto.erros);
    }

    expect(relatorioCompleto.valido).toBe(true);
    expect(relatorioCompleto.erros).toEqual([]);
    // Deve conter no mínimo 45 nós no total (21 do Ato 1 + 15 do Ato 2 + 16 do Ato 3 = 52 nós)
    expect(relatorioCompleto.estatisticas.totalNos).toBeGreaterThanOrEqual(45);
    expect(relatorioCompleto.estatisticas.nosAlcancaveis).toBe(relatorioCompleto.estatisticas.totalNos);
            expect(relatorioCompleto.estatisticas.testesComRiscoMortal).toBeGreaterThanOrEqual(4);
  });

  it('deve conter as cenas cruciais históricas de Harrenhal, Última Tempestade, Campo de Fogo e o Rei que se Ajoelhou', () => {
    const chaves = Object.keys(grafoJornada1Completo.nodes);

    // Ato 2
    expect(chaves).toContain('j1_a2_revolta_terras_fluviais');
    expect(chaves).toContain('j1_a2_parlamento_harrenhal');
    expect(chaves).toContain('j1_a2_queima_de_harrenhal');
    expect(chaves).toContain('j1_a2_senhor_supremo_tridente');
    expect(chaves).toContain('j1_a2_batalha_ultima_tempestade');
    expect(chaves).toContain('j1_a2_duelo_orys_argilac');
    expect(chaves).toContain('j1_a2_honra_argella_baratheon');
    expect(chaves).toContain('j1_a2_submissao_garra_rachada');

    // Ato 3
    expect(chaves).toContain('j1_a3_alianca_dois_reis');
    expect(chaves).toContain('j1_a3_tres_dragoes_campo_de_fogo');
    expect(chaves).toContain('j1_a3_fim_casa_gardener');
    expect(chaves).toContain('j1_a3_submissao_loren_lannister');
    expect(chaves).toContain('j1_a3_rendicao_jardim_de_cima');
    expect(chaves).toContain('j1_a3_lobo_no_tridente');
    expect(chaves).toContain('j1_a3_conspiracao_brandon_snow');
    expect(chaves).toContain('j1_a3_o_rei_que_se_ajoelhou');
    expect(chaves).toContain('j1_a3_ninho_da_aguia_ronnel');
    expect(chaves).toContain('j1_a3_epilogo_trono_ferro');
    expect(chaves).toContain('j1_a3_vitoria_conquista');
  });
});
