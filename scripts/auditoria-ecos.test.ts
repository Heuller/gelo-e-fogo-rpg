import { describe, it, expect } from 'vitest';
import { auditarTodasAsJornadas } from './auditoria-ecos';

describe('G7B — Auditoria de Ecos de Longo Prazo nas 5 Jornadas (B6)', () => {
  it('deve auditar todas as 5 jornadas e exibir o status de ecos entre atos', () => {
    const relatorios = auditarTodasAsJornadas();
    expect(Object.keys(relatorios).length).toBe(5);

    console.log('\n=== AUDITORIA DE ECOS DE LONGO PRAZO (B6) ===');
    for (const [id, rel] of Object.entries(relatorios)) {
      console.log(`Jornada: ${id} (${rel.titulo})`);
      console.log(`  Total de Ecos entre Atos: ${rel.totalEcos}`);
      console.log(`  Atende critério B6 (≥ 6 ecos): ${rel.atendeCriterioB6 ? 'SIM' : 'NÃO (será expandido na reconstrução G6C)'}`);
      if (rel.ecos.length > 0) {
        for (const eco of rel.ecos.slice(0, 3)) {
          console.log(`    - Flag '${eco.flag}': gravada no Ato ${eco.atoGravacao} (${eco.nodeGravacao}) -> lida no Ato ${eco.atoLeitura} (${eco.nodeLeitura})`);
        }
      }
    }
  });
});
