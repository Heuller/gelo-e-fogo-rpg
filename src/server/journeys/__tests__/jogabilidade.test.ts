import { describe, it, expect } from 'vitest';
import { JOURNEY_REGISTRY } from '../registry';
import { NodeJornada } from '@/server/engine/storyLinter';

type EscolhaNode = NonNullable<NodeJornada['escolhas']>[number];

function extrairDestinosEscolha(esc: EscolhaNode): string[] {
  if (esc.tipo === 'simples') {
    return esc.nextNodeId ? [esc.nextNodeId] : [];
  } else if (esc.tipo === 'teste_atributo') {
    return [
      esc.onSuccessNodeId,
      esc.onPartialFailureNodeId,
      esc.onCriticalFailureNodeId,
    ].filter((d): d is string => typeof d === 'string');
  }
  return [];
}

describe('Simulação de Jogabilidade e Alcance de Finais (Fase 10)', () => {
  const jornadas = Object.entries(JOURNEY_REGISTRY);

  it('deve possuir ao menos as 3 jornadas principais registradas', () => {
    expect(jornadas.length).toBeGreaterThanOrEqual(3);
    expect(JOURNEY_REGISTRY.conquista_aegon).toBeDefined();
    expect(JOURNEY_REGISTRY.danca_dragoes).toBeDefined();
    expect(JOURNEY_REGISTRY.guerra_tronos).toBeDefined();
  });

  for (const [jornadaId, jornada] of jornadas) {
    describe(`Jornada: ${jornada.titulo} (${jornadaId})`, () => {
      const nodes = jornada.grafo.nodes;
      const startNodeId = jornada.grafo.startNodeId;

      it('nó inicial deve existir no catálogo de nós', () => {
        expect(nodes[startNodeId]).toBeDefined();
      });

      it('todos os nós que não são finais devem possuir ao menos uma escolha válida', () => {
        for (const [nodeId, node] of Object.entries(nodes)) {
          if (!node.isEnding) {
            expect(
              node.escolhas && node.escolhas.length > 0,
              `Nó '${nodeId}' não é final mas não possui escolhas cadastradas.`
            ).toBe(true);
          }
        }
      });

      it('todos os destinos de escolhas devem apontar para nós existentes no grafo', () => {
        for (const [nodeId, node] of Object.entries(nodes)) {
          if (!node.escolhas) continue;

          for (const esc of node.escolhas) {
            const destinos = extrairDestinosEscolha(esc);
            for (const d of destinos) {
              expect(
                nodes[d],
                `Nó '${nodeId}', escolha '${esc.id}' aponta para destino '${d}' inexistente.`
              ).toBeDefined();
            }
          }
        }
      });

      it('todos os parágrafos condicionais devem conter flags e textos válidos', () => {
        for (const [nodeId, node] of Object.entries(nodes)) {
          if (node.conditionalParagraphs) {
            for (const cp of node.conditionalParagraphs) {
              expect(cp.requiredFlag.trim().length).toBeGreaterThan(0);
              expect(cp.text.trim().length).toBeGreaterThan(5);
            }
          }
        }
      });

      it('todos os nós de final devem ser alcançáveis a partir do início', () => {
        const visitados = new Set<string>();
        const fila: string[] = [startNodeId];

        while (fila.length > 0) {
          const atualId = fila.shift()!;
          if (visitados.has(atualId)) continue;
          visitados.add(atualId);

          const atual = nodes[atualId];
          if (!atual || !atual.escolhas) continue;

          for (const esc of atual.escolhas) {
            const destinos = extrairDestinosEscolha(esc);
            for (const d of destinos) {
              if (!visitados.has(d)) {
                fila.push(d);
              }
            }
          }
        }

        const finais = Object.values(nodes).filter((n) => n.isEnding);
        expect(finais.length, `Jornada ${jornadaId} deve conter finais declarados.`).toBeGreaterThan(0);

        for (const finalNode of finais) {
          expect(
            visitados.has(finalNode.id),
            `Final '${finalNode.id}' não é alcançável a partir de '${startNodeId}'.`
          ).toBe(true);
        }
      });

      it('50 simulações aleatórias completas devem alcançar um nó final sem loops infinitos', () => {
        const SIMULACOES = 50;
        const LIMITE_PASSOS = 100;

        for (let s = 0; s < SIMULACOES; s++) {
          let atualId = startNodeId;
          let passos = 0;
          const historicoPassos: string[] = [atualId];

          while (passos < LIMITE_PASSOS) {
            const nodeAtual: NodeJornada | undefined = nodes[atualId];
            expect(nodeAtual, `Simulação atingiu nó indefinido '${atualId}'.`).toBeDefined();

            if (nodeAtual.isEnding) {
              break;
            }

            const escolhas = nodeAtual.escolhas;
            expect(escolhas && escolhas.length > 0, `Nó sem saída: '${atualId}'`).toBe(true);

            // Sorteia uma escolha
            const escSorteada = escolhas[Math.floor(Math.random() * escolhas.length)];

            // Resolve o próximo nó
            let proximoId: string | undefined;
            if (escSorteada.tipo === 'teste_atributo') {
              const d2d6 = Math.floor(Math.random() * 6 + 1) + Math.floor(Math.random() * 6 + 1);
              if (d2d6 >= 10 && escSorteada.onSuccessNodeId) {
                proximoId = escSorteada.onSuccessNodeId;
              } else if (d2d6 <= 4 && escSorteada.onCriticalFailureNodeId) {
                proximoId = escSorteada.onCriticalFailureNodeId;
              } else {
                proximoId = escSorteada.onPartialFailureNodeId || escSorteada.onSuccessNodeId;
              }
            } else {
              proximoId = escSorteada.nextNodeId;
            }

            expect(
              proximoId,
              `Escolha '${escSorteada.id}' no nó '${atualId}' não resultou em destino.`
            ).toBeDefined();

            atualId = proximoId!;
            historicoPassos.push(atualId);
            passos++;
          }

          const nodeFinal = nodes[atualId];
          expect(
            nodeFinal?.isEnding,
            `Simulação #${s + 1} da jornada '${jornadaId}' excedeu ${LIMITE_PASSOS} passos sem terminar. Caminho: ${historicoPassos.join(' -> ')}`
          ).toBe(true);
        }
      });
    });
  }
});
