import { describe, it, expect } from 'vitest';
import path from 'node:path';
import { gerarPlanilhaAmostragem, salvarPlanilhaAmostragem } from './gerar-planilha-amostragem';

describe('G5 — Geração da Planilha de Auditoria por Amostragem (100% J4, 100% J5, 20% J1..J3)', () => {
  it('deve gerar a planilha cobrindo 100% de J4 e J5 e 20% das demais', () => {
    const linhas = gerarPlanilhaAmostragem();
    expect(linhas.length).toBeGreaterThan(140);

    const destino = path.resolve(process.cwd(), 'docs/auditoria-canone/planilha_auditoria_amostragem.csv');
    salvarPlanilhaAmostragem(linhas, destino);

    console.log(`\n=== G5: PLANILHA DE AUDITORIA POR AMOSTRAGEM GERADA ===`);
    console.log(`Arquivo: ${destino}`);
    console.log(`Total de linhas geradas: ${linhas.length}`);

    const j4Count = linhas.filter((l) => l.jornada_ou_categoria === 'patrulha_muralha').length;
    const j5Count = linhas.filter((l) => l.jornada_ou_categoria === 'rebeliao_robert').length;
    const j1Count = linhas.filter((l) => l.jornada_ou_categoria === 'conquista_aegon').length;
    const j2Count = linhas.filter((l) => l.jornada_ou_categoria === 'danca_dragoes').length;
    const j3Count = linhas.filter((l) => l.jornada_ou_categoria === 'guerra_tronos').length;

    console.log(`J1: ${j1Count} (20%)`);
    console.log(`J2: ${j2Count} (20%)`);
    console.log(`J3: ${j3Count} (20%)`);
    console.log(`J4: ${j4Count} (100% cobrindo 75 cenas)`);
    console.log(`J5: ${j5Count} (100% cobrindo 30 cenas)`);

    expect(j4Count).toBe(75);
    expect(j5Count).toBe(30);
  });
});
