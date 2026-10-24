import { describe, it, expect } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';
import { REGISTRO_JORNADAS } from '../src/server/journeys/registry';

describe('G5 — Teste de Integridade e Regras de Fidelidade Canônica', () => {
  it('100% das 299 cenas devem possuir origem explícita (canonica | original) e notas obrigatórias', () => {
    let totalCenas = 0;
    let totalCanonicas = 0;
    let totalOriginais = 0;
    const cenasComErro: string[] = [];

    for (const [jornadaId, def] of Object.entries(REGISTRO_JORNADAS)) {
      for (const node of Object.values(def.grafo.nodes)) {
        totalCenas++;
        const origem = (node as any).origem || (node.loreContext as any)?.origem;
        const nota = (node as any).notaHistorica || node.loreContext?.notaHistorica;

        if (!origem || (origem !== 'canonica' && origem !== 'original')) {
          cenasComErro.push(`[${jornadaId}] ${node.id}: falta origem válida ('canonica' | 'original'). Valor: ${origem}`);
        } else if (origem === 'original') {
          totalOriginais++;
          if (!nota || nota.trim().length === 0) {
            cenasComErro.push(`[${jornadaId}] ${node.id}: marcada como 'original' mas sem 'notaHistorica'.`);
          }
        } else {
          totalCanonicas++;
          if (!node.loreContext?.fonte?.livro || !node.loreContext?.fonte?.capitulo) {
            cenasComErro.push(`[${jornadaId}] ${node.id}: canônica sem livro/capítulo em loreContext.fonte.`);
          }
        }
      }
    }

    expect(cenasComErro).toEqual([]);
    expect(totalCenas).toBe(299);
    expect(totalCanonicas + totalOriginais).toBe(299);
    expect(totalOriginais).toBeGreaterThanOrEqual(25);
    expect(totalCanonicas).toBeGreaterThanOrEqual(250);
  });

  it('matriz_fontes.csv deve estar completa e com 0 cenas ausentes de origem', () => {
    const csvPath = path.resolve(process.cwd(), 'docs/auditoria-canone/matriz_fontes.csv');
    expect(fs.existsSync(csvPath)).toBe(true);

    const conteudo = fs.readFileSync(csvPath, 'utf-8');
    const linhas = conteudo.trim().split('\n');
    expect(linhas.length).toBe(300); // 1 header + 299 cenas

    // Nenhuma cena pode conter ",ausente,"
    const ausentes = linhas.filter((l) => l.includes(',ausente,'));
    expect(ausentes).toHaveLength(0);
  });

  it('planilha_auditoria_amostragem.csv deve conter 100% de J4 e J5 e 20% das demais', () => {
    const amostragemPath = path.resolve(process.cwd(), 'docs/auditoria-canone/planilha_auditoria_amostragem.csv');
    expect(fs.existsSync(amostragemPath)).toBe(true);

    const conteudo = fs.readFileSync(amostragemPath, 'utf-8');
    const linhas = conteudo.trim().split('\n').slice(1); // sem header
    expect(linhas.length).toBe(145);

    const j4Linhas = linhas.filter((l) => l.includes('"patrulha_muralha"'));
    const j5Linhas = linhas.filter((l) => l.includes('"rebeliao_robert"'));
    expect(j4Linhas).toHaveLength(75);
    expect(j5Linhas).toHaveLength(30);
  });

  it('marcacao_origem.csv deve registrar todas as decisões autônomas de classificação', () => {
    const propostaPath = path.resolve(process.cwd(), 'docs/propostas/marcacao_origem.csv');
    expect(fs.existsSync(propostaPath)).toBe(true);

    const conteudo = fs.readFileSync(propostaPath, 'utf-8');
    const linhas = conteudo.trim().split('\n');
    expect(linhas.length).toBe(300); // 1 header + 299 cenas
  });
});
