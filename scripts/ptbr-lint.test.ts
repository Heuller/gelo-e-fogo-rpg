import { describe, it, expect, beforeAll } from 'vitest';
import { executarAuditoriaLinguistica, type ResultadoAuditoria, type InfracaoLinguistica } from './ptbr-lint';

describe('G6B — Validador Linguístico de Português do Brasil (Regras Canônicas)', () => {
  let resultado: ResultadoAuditoria;

  beforeAll(() => {
    resultado = executarAuditoriaLinguistica();
  }, 30000);

  it('deve ter zero ocorrências de pronomes arcaicos (vós/vosso/vossa) em src/', () => {
    if (resultado.infracoesVos > 0) {
      const amostra = resultado.detalhes
        .filter((d: InfracaoLinguistica) => d.tipo === 'VOS_VOSSO')
        .slice(0, 5)
        .map((d: InfracaoLinguistica) => `${d.arquivo}:${d.linha} "${d.trecho}"`)
        .join('\n');
      console.warn('Infrações Vós/Vosso encontradas:\n' + amostra);
    }
    expect(resultado.infracoesVos).toBe(0);
  });

  it('deve ter zero ocorrências de Sor (unificado para Ser) em src/', () => {
    if (resultado.infracoesSor > 0) {
      const amostra = resultado.detalhes
        .filter((d: InfracaoLinguistica) => d.tipo === 'SOR')
        .slice(0, 5)
        .map((d: InfracaoLinguistica) => `${d.arquivo}:${d.linha} "${d.trecho}"`)
        .join('\n');
      console.warn('Infrações Sor encontradas:\n' + amostra);
    }
    expect(resultado.infracoesSor).toBe(0);
  });
});
