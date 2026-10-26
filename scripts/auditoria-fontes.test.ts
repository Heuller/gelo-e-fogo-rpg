import { describe, it, expect } from 'vitest';
import path from 'path';
import { executarAuditoriaFontes, salvarMatrizCsv } from './auditoria-fontes';

describe('G5 — Auditoria de Fontes e Cânone (matriz_fontes.csv)', () => {
  it('deve auditar 100% das cenas das 5 jornadas e gerar docs/auditoria-canone/matriz_fontes.csv', () => {
    const resultado = executarAuditoriaFontes();
    expect(resultado.linhas.length).toBeGreaterThanOrEqual(250);

    const destinoCsv = path.resolve(process.cwd(), 'docs/auditoria-canone/matriz_fontes.csv');
    salvarMatrizCsv(resultado.linhas, destinoCsv);

    console.log(`\n=== G5: MATRIZ DE FONTES GERADA COM SUCESSO ===`);
    console.log(`Arquivo: ${destinoCsv}`);
    console.log(`Total de cenas auditadas: ${resultado.linhas.length}`);

    for (const [jid, res] of Object.entries(resultado.resumoPorJornada)) {
      console.log(`\nJornada: ${jid} (Total: ${res.total} cenas)`);
      console.log(`  Fontes: Livro=${res.fontes.livro}, Resumo=${res.fontes.resumo}, Wiki=${res.fontes.wiki}, Desconhecido=${res.fontes.desconhecido}`);
      console.log(`  Origem: Canônica=${res.origens.canonica}, Original=${res.origens.original}, Ausente=${res.origens.ausente}`);
      console.log(`  Nível de Verificação: Livro=${res.verificacao.livro}, Resumo=${res.verificacao.resumo}, Sem Verificação=${res.verificacao.sem_verificacao}`);
    }
  });
});
