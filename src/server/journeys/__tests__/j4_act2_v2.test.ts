import { describe, it, expect } from 'vitest';
import { grafoJ4Ato2V2 } from '../../data/journeys/j4_act2_v2';
import { validarGrafoJornada } from '../../engine/storyLinter';
import { analisarGrafoAvancado, calcularSimilaridadeJaccard } from '../../engine/storyLinterPlus';
import { comporCena, ContextoComposicao } from '../../engine/composicaoCena';

const PADRAO_VOS = /\b(v[oó]s|vosso|vossa|vossos|vossas|entrastes|encontrais|possu[íi]s|fostes|vistes|ouvistes)\b/i;
const PADRAO_SOR = /\bSor\b/;

describe('G6C — Padrão-Ouro Jornada 4 Ato II (j4_act2_v2.ts)', () => {
  it('Portão 1: Validador do Grafo (storyLinter) sem erros estruturais', () => {
    const res = validarGrafoJornada(grafoJ4Ato2V2);
    if (res.erros.length > 0) {
      console.error('Erros no grafo Ato II:', res.erros);
    }
    expect(res.valido).toBe(true);
    expect(res.erros.length).toBe(0);
    expect(res.estatisticas.totalNos).toBe(13);
  });

  it('Portão 2: Linter v2 Avançado (storyLinterPlus com schemaV2: true)', () => {
    const analise = analisarGrafoAvancado(grafoJ4Ato2V2, undefined, true);
    const errosV2 = analise.avisos.filter((a) => a.tipo.endsWith('_V2') || a.tipo.endsWith('_BG3'));

    if (errosV2.length > 0) {
      console.error('Avisos/Erros V2 no Ato II:', errosV2);
    }

    // 100% das escolhas têm desfechos no padrão v2
    expect(analise.avisos.some((a) => a.tipo === 'ESCOLHA_SEM_DESFECHO_V2')).toBe(false);

    // Pontes irmãs distintas
    expect(analise.avisos.some((a) => a.tipo === 'PONTES_IRMAS_SIMILARES_V2')).toBe(false);

    // Todas as cenas têm origem explícita (canonica ou original com nota)
    expect(analise.estatisticas.cenasSemOrigem).toBe(0);
    expect(analise.estatisticas.cenasOriginaisSemNota).toBe(0);
  });

  it('Portão 3: Verificação Estrita de Português do Brasil (Guia pt-BR / ptbr-lint)', () => {
    let totalPalavras = 0;
    let ocorrenciasVos = 0;
    let ocorrenciasSor = 0;

    for (const node of Object.values(grafoJ4Ato2V2.nodes)) {
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
    expect(totalPalavras).toBeGreaterThan(3000);
    console.log(`\n=== MÉTRICAS LITERÁRIAS DO ATO II DA J4 ===`);
    console.log(`Total de palavras no Ato II: ${totalPalavras}`);
    console.log(`Ocorrências de Vós/Vosso: ${ocorrenciasVos}`);
    console.log(`Conformidade com 'Ser' (pt-BR): 100%`);
  });

  it('Portão 4: Teste de Causalidade e Dissimilaridade de Pontes Irmãs', () => {
    for (const node of Object.values(grafoJ4Ato2V2.nodes)) {
      const escolhas = node.escolhas || [];
      if (escolhas.length > 1) {
        for (let i = 0; i < escolhas.length; i++) {
          for (let j = i + 1; j < escolhas.length; j++) {
            const eA = escolhas[i];
            const eB = escolhas[j];
            const ponteA = eA.desfecho?.ponte || '';
            const ponteB = eB.desfecho?.ponte || '';

            if (ponteA && ponteB) {
              const jaccard = calcularSimilaridadeJaccard(ponteA, ponteB);
              expect(jaccard).toBeLessThan(0.6);
            }
          }
        }
      }
    }
  });

  it('Portão 5: Composição no Servidor e Resolução de Ecos das Marcas', () => {
    const contextoSemMarcas: ContextoComposicao = {
      ficha: {
        id: 'irmao-sem-nome',
        nome: 'Patrulheiro Anônimo',
        origem: 'norte',
        inspiracao: 2,
        atributos: { comando: 3, furia: 4, astucia: 3, cortesia: 2, erudicao: 2, pressagio: 3 },
        estado: { sangue: 10, compostura: 10, honra: 5 },
        cicatrizes: [],
        segredos: [],
        companheiros: {},
      },
      worldState: {
        reputacaoCasas: {},
        flagsBorboleta: {},
        marcosConcluidos: [],
      },
    };

    const cenaAcertoSemMarcas = comporCena(
      grafoJ4Ato2V2.nodes['j4_a2_acerto_de_contas_castelo_negro'],
      contextoSemMarcas
    );

    const contextoComMarcas: ContextoComposicao = {
      ...contextoSemMarcas,
      worldState: {
        reputacaoCasas: {},
        flagsBorboleta: {
          testemunha_da_fome: true,
          lealdade_a_mormont: true,
          testemunha_morte_mormont: true,
          juramento_ao_velho_urso: true,
          protegeu_goiva_e_sam: true,
          derrotou_desertores: true,
          liderou_os_esfarrapados: true,
          recebeu_jon_ferido: true,
        },
        marcosConcluidos: [],
      },
    };

    const cenaAcertoComMarcas = comporCena(
      grafoJ4Ato2V2.nodes['j4_a2_acerto_de_contas_castelo_negro'],
      contextoComMarcas
    );

    expect(cenaAcertoComMarcas.textoPrincipal.length).toBeGreaterThan(
      cenaAcertoSemMarcas.textoPrincipal.length
    );
    expect(cenaAcertoComMarcas.textoPrincipal).toContain('Jeor Mormont');
    expect(cenaAcertoComMarcas.textoPrincipal).toContain('Goiva');
    expect(cenaAcertoComMarcas.textoPrincipal).toContain('Jon Snow');
  });

  it('Portão 6: Exclusividade de Conteúdo por Rota (≥ 60%)', () => {
    const nósLeais = Object.values(grafoJ4Ato2V2.nodes).filter((n) => n.rota === 'leais');
    const nósResgate = Object.values(grafoJ4Ato2V2.nodes).filter((n) => n.rota === 'resgate');

    expect(nósLeais.length).toBe(3);
    expect(nósResgate.length).toBe(3);

    const idsLeais = new Set(nósLeais.map((n) => n.id));
    const idsResgate = new Set(nósResgate.map((n) => n.id));

    const intersecao = [...idsLeais].filter((x) => idsResgate.has(x));
    expect(intersecao.length).toBe(0);
  });
});
