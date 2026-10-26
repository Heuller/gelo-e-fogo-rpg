import { describe, it, expect } from 'vitest';
import { grafoJornada4CompletoV2 } from '../../data/journeys/j4_muralha_v2_full';
import { GrafoJornada, validarGrafoJornada } from '../../engine/storyLinter';
import { analisarGrafoAvancado } from '../../engine/storyLinterPlus';

const PADRAO_VOS = /\b(v[oó]s|vosso|vossa|vossos|vossas|entrastes|encontrais|possu[íi]s|fostes|vistes|ouvistes)\b/i;
const PADRAO_SOR = /\bSor\b/;

function simularMonteCarlo(grafo: GrafoJornada, iteracoes: number = 50, maxPassos: number = 100) {
  let atingiuFinal = 0;
  const bloqueios: { iteracao: number; passo: number; nodeId: string; motivo: string }[] = [];
  const coberturaNos = new Set<string>();
  const totalPassos: number[] = [];

  for (let i = 0; i < iteracoes; i++) {
    let currNodeId = grafo.startNodeId;
    let passos = 0;
    let finalizado = false;

    while (passos < maxPassos) {
      passos++;
      coberturaNos.add(currNodeId);
      const node = grafo.nodes[currNodeId];

      if (!node) {
        bloqueios.push({ iteracao: i, passo: passos, nodeId: currNodeId, motivo: 'Nó inexistente' });
        break;
      }

      if (node.isEnding) {
        atingiuFinal++;
        totalPassos.push(passos);
        finalizado = true;
        break;
      }

      const escolhas = node.escolhas || [];
      if (escolhas.length === 0) {
        bloqueios.push({ iteracao: i, passo: passos, nodeId: currNodeId, motivo: 'Nó não-final sem escolhas' });
        break;
      }

      // Escolhe aleatoriamente uma opção viável
      const escolhaSorteada = escolhas[Math.floor(Math.random() * escolhas.length)];
      let destino: string | undefined;

      if (escolhaSorteada.tipo === 'simples') {
        destino = escolhaSorteada.desfecho?.destino || escolhaSorteada.nextNodeId;
      } else {
        const possiveisDestinos = [
          escolhaSorteada.desfechos?.sucesso?.destino,
          escolhaSorteada.desfechos?.parcial?.destino,
          escolhaSorteada.desfechos?.falha?.destino,
          escolhaSorteada.onSuccessNodeId,
          escolhaSorteada.onPartialFailureNodeId,
        ].filter((d): d is string => Boolean(d));

        destino = possiveisDestinos[Math.floor(Math.random() * possiveisDestinos.length)];
      }

      if (!destino) {
        bloqueios.push({ iteracao: i, passo: passos, nodeId: currNodeId, motivo: 'Escolha sem destino' });
        break;
      }

      currNodeId = destino;
    }

    if (!finalizado && passos >= maxPassos) {
      bloqueios.push({ iteracao: i, passo: passos, nodeId: currNodeId, motivo: 'Loop infinito / estourou maxPassos' });
    }
  }

  const passosMedios = totalPassos.length > 0 ? totalPassos.reduce((a, b) => a + b, 0) / totalPassos.length : 0;

  return {
    atingiuFinal,
    bloqueios,
    coberturaNos,
    passosMedios,
  };
}

describe('G6C — Padrão-Ouro Unificado Jornada 4 Completa v2 («Irmão Sem Nome»)', () => {
  it('Portão 1: Validador do Grafo Completo (52 nós, integridade perfeita, 1 final canônico)', () => {
    const res = validarGrafoJornada(grafoJornada4CompletoV2);
    if (res.erros.length > 0) {
      console.error('Erros no grafo unificado J4:', res.erros);
    }
    expect(res.valido).toBe(true);
    expect(res.erros.length).toBe(0);
    expect(res.estatisticas.totalNos).toBe(52);
    expect(res.estatisticas.nosAlcancaveis).toBe(52);

    const nosFinais = Object.values(grafoJornada4CompletoV2.nodes).filter((n) => n.isEnding);
    expect(nosFinais.length).toBe(1);
    expect(nosFinais[0].id).toBe('j4_a4_fecho_o_juramento_eterno');
  });

  it('Portão 2: Linter v2 Avançado com schemaV2: true (100% escolhas com desfecho e pontes válidas)', () => {
    const analise = analisarGrafoAvancado(grafoJornada4CompletoV2, undefined, true);
    const errosV2 = analise.avisos.filter((a) => a.tipo.endsWith('_V2') || a.tipo.endsWith('_BG3'));

    if (errosV2.length > 0) {
      console.error('Avisos V2 no Grafo Completo J4:', errosV2);
    }

    // 100% das escolhas têm desfechos estruturados no padrão v2
    expect(analise.avisos.some((a) => a.tipo === 'ESCOLHA_SEM_DESFECHO_V2')).toBe(false);

    // Pontes irmãs distintas
    expect(analise.avisos.some((a) => a.tipo === 'PONTES_IRMAS_SIMILARES_V2')).toBe(false);

    // Origens explícitas
    expect(analise.estatisticas.cenasSemOrigem).toBe(0);
    expect(analise.estatisticas.cenasOriginaisSemNota).toBe(0);

    // Sem marcas órfãs excessivas (< 25%)
    expect(analise.avisos.some((a) => a.tipo === 'MARCAS_ORFAS_EXCESSIVAS_V2')).toBe(false);
  });

  it('Portão 3: Verificação Estrita de Português do Brasil em Toda a Jornada', () => {
    let totalPalavras = 0;
    let ocorrenciasVos = 0;
    let ocorrenciasSor = 0;

    for (const node of Object.values(grafoJornada4CompletoV2.nodes)) {
      const textos = [
        node.titulo,
        node.fallbackText,
        ...(node.blocos || []).map((b) => b.texto),
        ...(node.falas || []).map((f) => f.texto),
        ...(node.escolhas || []).map((e) => e.texto),
      ];

      for (const t of textos) {
        const palavras = t.split(/\s+/).filter(Boolean);
        totalPalavras += palavras.length;

        if (PADRAO_VOS.test(t)) ocorrenciasVos++;
        if (PADRAO_SOR.test(t)) ocorrenciasSor++;
      }
    }

    expect(ocorrenciasVos).toBe(0);
    expect(ocorrenciasSor).toBe(0);
    expect(totalPalavras).toBeGreaterThan(15000);
    console.log(`\n=== MÉTRICAS LITERÁRIAS DA JORNADA 4 COMPLETA V2 ===`);
    console.log(`Total de palavras da Jornada: ${totalPalavras}`);
    console.log(`Total de nós da Jornada: ${Object.keys(grafoJornada4CompletoV2.nodes).length}`);
    console.log(`Ocorrências de Vós/Vosso: ${ocorrenciasVos}`);
    console.log(`Conformidade com 'Ser' (pt-BR): 100%`);
  });

  it('Portão 4: Simulação de Monte Carlo Completa (50 travessias completas de 52 nós)', () => {
    const sim = simularMonteCarlo(grafoJornada4CompletoV2, 50, 100);
    if (sim.bloqueios.length > 0) {
      console.error('Bloqueios em Monte Carlo:', sim.bloqueios);
    }
    expect(sim.bloqueios.length).toBe(0);
    expect(sim.atingiuFinal).toBe(50);
    console.log(`\n=== RESULTADOS MONTE CARLO J4 V2 ===`);
    console.log(`Trajetos concluídos: ${sim.atingiuFinal}/50`);
    console.log(`Passos médios até o final: ${sim.passosMedios.toFixed(1)}`);
    console.log(`Nós visitados pelo menos uma vez: ${sim.coberturaNos.size}/52`);
  });
});
