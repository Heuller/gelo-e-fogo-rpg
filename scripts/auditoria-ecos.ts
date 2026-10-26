import { GrafoJornada, NodeJornada } from '../src/server/engine/storyLinter';
import { grafoJornada1Completo } from '../src/server/data/journeys/j1_conquista_full';
import { grafoJornada2Completo } from '../src/server/data/journeys/j2_danca_full';
import { grafoJornada3Completo } from '../src/server/data/journeys/j3_tronos_full';
import { grafoJornada4CompletoV2 as grafoJornada4Completo } from '../src/server/data/journeys/j4_muralha_v2_full';
import { grafoJornada5Completo } from '../src/server/data/journeys/j5_rebeliao_full';

export interface EcoLongoPrazo {
  flag: string;
  atoGravacao: number;
  nodeGravacao: string;
  atoLeitura: number;
  nodeLeitura: string;
}

export interface RelatorioEcosJornada {
  jornadaId: string;
  titulo: string;
  totalEcos: number;
  ecos: EcoLongoPrazo[];
  atendeCriterioB6: boolean; // ≥ 6 ecos entre atos
}

/**
 * Extrai o número do ato (1 a 4) a partir do ID do nó ou de seu contexto.
 */
export function extrairNumeroAto(nodeId: string): number {
  const match = nodeId.match(/_a(\d)_/i) || nodeId.match(/act(\d)/i) || nodeId.match(/ato_?(\d)/i);
  if (match) {
    return parseInt(match[1], 10);
  }
  return 1;
}

/**
 * Audita os ecos de escolhas de longo prazo (flags gravadas no Ato N e lidas em Ato >= N+1).
 */
export function auditarEcosJornada(grafo: GrafoJornada): RelatorioEcosJornada {
  const flagsPorAtoGravacao: Map<string, { ato: number; nodeId: string }[]> = new Map();
  const leiturasPorAto: { flag: string; ato: number; nodeId: string }[] = [];

  for (const node of Object.values(grafo.nodes)) {
    const ato = extrairNumeroAto(node.id);

    // Flags gravadas no deltaEstado do nó
    if (node.deltaEstado?.flagsAdicionadas) {
      for (const f of node.deltaEstado.flagsAdicionadas) {
        if (!flagsPorAtoGravacao.has(f)) flagsPorAtoGravacao.set(f, []);
        flagsPorAtoGravacao.get(f)!.push({ ato, nodeId: node.id });
      }
    }
    if (node.deltaEstado?.flagsBorboleta) {
      for (const f of Object.keys(node.deltaEstado.flagsBorboleta)) {
        if (!flagsPorAtoGravacao.has(f)) flagsPorAtoGravacao.set(f, []);
        flagsPorAtoGravacao.get(f)!.push({ ato, nodeId: node.id });
      }
    }

    // Flags gravadas nas escolhas
    for (const esc of node.escolhas || []) {
      if (esc.delta?.flagsAdicionadas) {
        for (const f of esc.delta.flagsAdicionadas) {
          if (!flagsPorAtoGravacao.has(f)) flagsPorAtoGravacao.set(f, []);
          flagsPorAtoGravacao.get(f)!.push({ ato, nodeId: node.id });
        }
      }
      if (esc.delta?.flagsBorboleta) {
        for (const f of Object.keys(esc.delta.flagsBorboleta)) {
          if (!flagsPorAtoGravacao.has(f)) flagsPorAtoGravacao.set(f, []);
          flagsPorAtoGravacao.get(f)!.push({ ato, nodeId: node.id });
        }
      }
      if (esc.desfecho?.marcas) {
        for (const m of esc.desfecho.marcas) {
          if (!flagsPorAtoGravacao.has(m)) flagsPorAtoGravacao.set(m, []);
          flagsPorAtoGravacao.get(m)!.push({ ato, nodeId: node.id });
        }
      }
      if (esc.tipo === 'teste_atributo' && esc.desfechos) {
        const todosDesfechos = [
          esc.desfechos.criticoSucesso,
          esc.desfechos.sucesso,
          esc.desfechos.parcial,
          esc.desfechos.falha,
          esc.desfechos.criticoFalha,
        ].filter(Boolean);
        for (const d of todosDesfechos) {
          if (d?.marcas) {
            for (const m of d.marcas) {
              if (!flagsPorAtoGravacao.has(m)) flagsPorAtoGravacao.set(m, []);
              flagsPorAtoGravacao.get(m)!.push({ ato, nodeId: node.id });
            }
          }
        }
      }

      // Flags lidas nas escolhas
      if (esc.requiredFlags) {
        for (const f of esc.requiredFlags) {
          leiturasPorAto.push({ flag: f, ato, nodeId: node.id });
        }
      }
      if (esc.forbiddenFlags) {
        for (const f of esc.forbiddenFlags) {
          leiturasPorAto.push({ flag: f, ato, nodeId: node.id });
        }
      }
    }

    // Flags lidas em conditionalParagraphs
    if (node.conditionalParagraphs) {
      for (const cp of node.conditionalParagraphs) {
        if (cp.requiredFlag) {
          leiturasPorAto.push({ flag: cp.requiredFlag, ato, nodeId: node.id });
        }
      }
    }

    // Flags lidas em blocos v2
    if (node.blocos) {
      for (const b of node.blocos) {
        if (b.quando?.flagsTodas) {
          for (const f of b.quando.flagsTodas) {
            leiturasPorAto.push({ flag: f, ato, nodeId: node.id });
          }
        }
        if (b.quando?.flagsNenhuma) {
          for (const f of b.quando.flagsNenhuma) {
            leiturasPorAto.push({ flag: f, ato, nodeId: node.id });
          }
        }
      }
    }
  }

  // Identifica cruzamentos entre Ato N e Ato >= N+1
  const ecos: EcoLongoPrazo[] = [];
  const ecosRegistrados = new Set<string>();

  for (const leitura of leiturasPorAto) {
    const gravacoes = flagsPorAtoGravacao.get(leitura.flag);
    if (!gravacoes) continue;

    for (const gravacao of gravacoes) {
      if (gravacao.ato < leitura.ato) {
        const chave = `${leitura.flag}_${gravacao.nodeId}_${leitura.nodeId}`;
        if (!ecosRegistrados.has(chave)) {
          ecosRegistrados.add(chave);
          ecos.push({
            flag: leitura.flag,
            atoGravacao: gravacao.ato,
            nodeGravacao: gravacao.nodeId,
            atoLeitura: leitura.ato,
            nodeLeitura: leitura.nodeId,
          });
        }
      }
    }
  }

  return {
    jornadaId: grafo.id,
    titulo: grafo.titulo,
    totalEcos: ecos.length,
    ecos,
    atendeCriterioB6: ecos.length >= 6,
  };
}

export function auditarTodasAsJornadas(): Record<string, RelatorioEcosJornada> {
  const grafos = [
    grafoJornada1Completo,
    grafoJornada2Completo,
    grafoJornada3Completo,
    grafoJornada4Completo,
    grafoJornada5Completo,
  ];

  const resultados: Record<string, RelatorioEcosJornada> = {};
  for (const g of grafos) {
    resultados[g.id] = auditarEcosJornada(g);
  }
  return resultados;
}
