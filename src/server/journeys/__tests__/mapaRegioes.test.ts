import { describe, it, expect } from 'vitest';
import { REGISTRO_JORNADAS } from '../registry';
import { TEMAS_JORNADAS, obterTemaJornada } from '@/lib/temas';
import { NodeJornada } from '@/server/engine/storyLinter';

describe('Auditoria e Integridade de Regiões do Mapa (Fase 7)', () => {
  it('garante que todo regionId de todo nó em cada jornada existe nas regioes do tema', () => {
    for (const [id, jornada] of Object.entries(REGISTRO_JORNADAS)) {
      const tema = obterTemaJornada(id);
      expect(tema).toBeDefined();

      const regioesTemaIds = new Set(tema.regioes.map((r) => r.id));

      for (const [nodeId, rawNode] of Object.entries(jornada.grafo)) {
        const node = rawNode as unknown as NodeJornada;
        if (node.regionId) {
          expect(
            regioesTemaIds.has(node.regionId),
            `O nó '${nodeId}' da jornada '${id}' usa regionId '${node.regionId}', mas esta região não está registrada em tema.regioes!`
          ).toBe(true);
        }
      }
    }
  });

  it('garante que toda região do tema possui coordenadas esquemáticas válidas (0 <= x <= 100, 0 <= y <= 100)', () => {
    for (const [id, tema] of Object.entries(TEMAS_JORNADAS)) {
      for (const regiao of tema.regioes) {
        expect(regiao.x).toBeGreaterThanOrEqual(0);
        expect(regiao.x).toBeLessThanOrEqual(100);
        expect(regiao.y).toBeGreaterThanOrEqual(0);
        expect(regiao.y).toBeLessThanOrEqual(100);
        expect(regiao.nome.length).toBeGreaterThan(0);
      }
    }
  });
});
