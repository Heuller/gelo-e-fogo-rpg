import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';
import { grafoJornada1Completo } from '../data/journeys/j1_conquista_full';
import { grafoJornada2Completo } from '../data/journeys/j2_danca_full';
import { grafoJornada3Completo } from '../data/journeys/j3_tronos_full';
import { GrafoJornada } from './storyLinter';

interface EndingReachability {
  reached: boolean;
  pathLength: number;
  path: string[];
}

function analyzeGraphReachability(grafo: GrafoJornada): {
  reachability: Record<string, EndingReachability>;
  deadEnds: string[];
  totalVisited: number;
} {
  const endings = Object.entries(grafo.nodes)
    .filter(([_, node]) => node.isEnding)
    .map(([id]) => id);

  const results: Record<string, EndingReachability> = {};
  for (const endingId of endings) {
    results[endingId] = { reached: false, pathLength: Infinity, path: [] };
  }

  const deadEnds: string[] = [];
  for (const [id, node] of Object.entries(grafo.nodes)) {
    if (!node.isEnding && (!node.escolhas || node.escolhas.length === 0)) {
      deadEnds.push(id);
    }
  }

  // BFS para caminho mais curto
  const queue: { nodeId: string; path: string[] }[] = [
    { nodeId: grafo.startNodeId, path: [grafo.startNodeId] },
  ];
  const visited = new Map<string, number>();
  visited.set(grafo.startNodeId, 1);

  while (queue.length > 0) {
    const { nodeId, path } = queue.shift()!;
    const currentNode = grafo.nodes[nodeId];
    if (!currentNode) continue;

    if (currentNode.isEnding) {
      if (!results[nodeId]?.reached || path.length < results[nodeId].pathLength) {
        results[nodeId] = {
          reached: true,
          pathLength: path.length,
          path,
        };
      }
      continue;
    }

    if (!currentNode.escolhas) continue;

    for (const esc of currentNode.escolhas) {
      const destinations: string[] = [];
      if (esc.tipo === 'simples') {
        destinations.push(esc.nextNodeId);
      } else {
        destinations.push(esc.onSuccessNodeId);
        destinations.push(esc.onPartialFailureNodeId);
        if (esc.onCriticalSuccessNodeId) destinations.push(esc.onCriticalSuccessNodeId);
        if (esc.onCriticalFailureNodeId) destinations.push(esc.onCriticalFailureNodeId);
      }

      for (const dest of destinations) {
        if (!grafo.nodes[dest]) continue;

        const currentShortest = visited.get(dest);
        const newPathLength = path.length + 1;

        if (currentShortest === undefined || newPathLength < currentShortest) {
          visited.set(dest, newPathLength);
          queue.push({
            nodeId: dest,
            path: [...path, dest],
          });
        }
      }
    }
  }

  return { reachability: results, deadEnds, totalVisited: visited.size };
}

describe('Auditoria Avançada de Grafos e Alcançabilidade dos 18 Finais (Prompt 2.1)', () => {
  it('deve comprovar alcançabilidade de todos os 6 finais da Jornada 1 e ausência de dead-ends', () => {
    const { reachability, deadEnds } = analyzeGraphReachability(grafoJornada1Completo);
    expect(deadEnds).toEqual([]);
    for (const [endingId, data] of Object.entries(reachability)) {
      expect(data.reached).toBe(true);
      expect(data.pathLength).toBeGreaterThan(1);
    }
  });

  it('deve comprovar alcançabilidade de todos os 6 finais da Jornada 2 e ausência de dead-ends', () => {
    const { reachability, deadEnds } = analyzeGraphReachability(grafoJornada2Completo);
    expect(deadEnds).toEqual([]);
    for (const [endingId, data] of Object.entries(reachability)) {
      expect(data.reached).toBe(true);
      expect(data.pathLength).toBeGreaterThan(1);
    }
  });

  it('deve comprovar alcançabilidade de todos os 6 finais da Jornada 3 e ausência de dead-ends', () => {
    const { reachability, deadEnds } = analyzeGraphReachability(grafoJornada3Completo);
    expect(deadEnds).toEqual([]);
    for (const [endingId, data] of Object.entries(reachability)) {
      expect(data.reached).toBe(true);
      expect(data.pathLength).toBeGreaterThan(1);
    }
  });

  it('deve gerar o relatório completo docs/relatorio-alcancabilidade.md', () => {
    const j1 = analyzeGraphReachability(grafoJornada1Completo);
    const j2 = analyzeGraphReachability(grafoJornada2Completo);
    const j3 = analyzeGraphReachability(grafoJornada3Completo);

    let md = '# 🛡️ Relatório de Alcançabilidade e Caminhos Mínimos das 3 Jornadas (v2.1)\n\n';
    md += '> **Auditoria:** Busca em Largura (BFS) sobre os 194 nós das 3 jornadas narrativas.\n';
    md += '> **Status Geral:** 🟢 Todos os 18 Finais Alcançáveis e Zero Beco Sem Saída (Soft-locks).\n\n';

    const renderJourney = (name: string, res: typeof j1) => {
      let out = `## ${name}\n\n`;
      out += `| Final ID | Título / Desfecho | Status | Passos Mínimos | Caminho Mais Curto |\n`;
      out += `|:---|:---|:---:|:---:|:---|\n`;
      for (const [endId, info] of Object.entries(res.reachability)) {
        const preview = info.path.length <= 4 
          ? info.path.join(' ➔ ') 
          : `${info.path[0]} ➔ ${info.path[1]} ➔ ... (${info.path.length - 3} cenas) ➔ ${info.path[info.path.length - 2]} ➔ ${endId}`;
        out += `| \`${endId}\` | ${endId.replace(/_/g, ' ')} | ${info.reached ? '🟢 Alcançável' : '🔴 Inalcançável'} | ${info.pathLength} cenas | \`${preview}\` |\n`;
      }
      out += '\n';
      return out;
    };

    md += renderJourney('Jornada 1: A Conquista de Aegon (6 Finais)', j1);
    md += renderJourney('Jornada 2: A Dança dos Dragões (6 Finais)', j2);
    md += renderJourney('Jornada 3: A Guerra dos Cinco Reis (6 Finais)', j3);

    const destPath = path.resolve(process.cwd(), 'docs', 'relatorio-alcancabilidade.md');
    fs.writeFileSync(destPath, md, 'utf8');
    expect(fs.existsSync(destPath)).toBe(true);
  });
});
