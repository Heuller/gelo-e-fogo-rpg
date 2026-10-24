import fs from 'fs';
import path from 'path';
import { describe, it, expect } from 'vitest';
import { REGISTRO_JORNADAS } from '../src/server/journeys/registry';
import type { NodeJornada, EscolhaNode } from '../src/server/engine/storyLinter';

interface MetricasJornada {
  id: string;
  numero: number;
  titulo: string;
  totalCenas: number;
  palavras: {
    total: number;
    media: number;
    mediana: number;
    min: number;
    max: number;
    menosDe80: number;
  };
  fontes: {
    totalComFonte: number;
    percentualComFonte: number;
    totalResumo: number;
    percentualResumo: number;
  };
  origem: {
    totalOriginal: number;
    totalCanonica: number;
  };
  vozesInternasTotal: number;
  narrativa: {
    totalNosNaoFinais: number;
    nosTodasEscolhasMesmoDestino: number;
    percentualMesmoDestino: number;
    destinosDistintosMedioPorNo: number;
    totalTestesAtributo: number;
    testesSemRamoFalhaProprio: number;
    percentualTestesSemRamoFalha: number;
    palavrasFalaDireta: number;
    percentualFalaDireta: number;
    cenasComDialogoRelevante: number; // >= 25 palavras de fala
    tempoEstimadoLeituraMinutos: number;
  };
  idioma: {
    ocorrenciasVosVosso: number;
    detalhesVosVosso: string[];
    ocorrenciasEnclise: number;
    contagemSor: number;
    contagemSer: number;
  };
  flags: {
    totalGravadas: number;
    totalLidas: number;
    flagsOrfas: string[];
    totalOrfas: number;
  };
}

function contarPalavras(texto: string): number {
  if (!texto) return 0;
  return texto.trim().split(/\s+/).filter(Boolean).length;
}

function extrairFalaDireta(texto: string): { palavrasFala: number; temDialogo: boolean } {
  if (!texto) return { palavrasFala: 0, temDialogo: false };
  let palavrasFala = 0;

  // Linhas iniciadas com travessão (— ou -- ou -) ou entre aspas « » " "
  const linhas = texto.split('\n');
  for (const l of linhas) {
    const trimmed = l.trim();
    if (trimmed.startsWith('—') || trimmed.startsWith('-') || trimmed.startsWith('–')) {
      palavrasFala += contarPalavras(trimmed);
    }
  }

  // Citações entre aspas
  const aspasRegex = /["«“][^"»”]+["»”]/g;
  let match;
  while ((match = aspasRegex.exec(texto)) !== null) {
    palavrasFala += contarPalavras(match[0]);
  }

  return {
    palavrasFala,
    temDialogo: palavrasFala >= 25,
  };
}

function analisarIdioma(texto: string): {
  vosVosso: string[];
  enclises: number;
  sor: number;
  ser: number;
} {
  const vosRegex = /\b(vós|vosso|vossa|vossos|vossas|vos|entrastes|encontrais|possuís|sairás|conheceis|fostes|vistes|ouvistes)\b/gi;
  const encliseRegex = /\b\w+-(se|lhe|lhes|o|a|os|as|me|te|nos|vos)\b/gi;
  const sorRegex = /\bSor\b/g;
  const serRegex = /\bSer\b/g;

  const vosMatches = texto.match(vosRegex) || [];
  const encliseMatches = texto.match(encliseRegex) || [];
  const sorMatches = texto.match(sorRegex) || [];
  const serMatches = texto.match(serRegex) || [];

  return {
    vosVosso: vosMatches,
    enclises: encliseMatches.length,
    sor: sorMatches.length,
    ser: serMatches.length,
  };
}

describe('G0 — Geração Oficial de Métricas do Acervo (docs/metricas.json)', () => {
  it('deve auditar todas as 5 jornadas e salvar docs/metricas.json', () => {
    const relatorioJornadas: MetricasJornada[] = [];
    const chavesJornadas = Object.keys(REGISTRO_JORNADAS);

    for (const chave of chavesJornadas) {
      const def = REGISTRO_JORNADAS[chave];
      const grafo = def.grafo;
      const nodes = Object.values(grafo.nodes);

      const contagensPalavras: number[] = [];
      let totalPalavras = 0;
      let cenasComFonte = 0;
      let cenasFonteResumo = 0;
      let cenasOrigemOriginal = 0;
      let cenasOrigemCanonica = 0;
      let totalVozesInternas = 0;

      let nosNaoFinais = 0;
      let nosMesmoDestino = 0;
      let totalDestinosDistintos = 0;

      let totalTestesAtributo = 0;
      let testesSemFalhaPropria = 0;

      let totalPalavrasFala = 0;
      let cenasComDialogo = 0;

      const todasOcorrenciasVos: string[] = [];
      let totalEnclises = 0;
      let totalSor = 0;
      let totalSer = 0;

      const flagsGravadas = new Set<string>();
      const flagsLidas = new Set<string>();

      for (const node of nodes) {
        const txt = node.fallbackText || '';
        const nPalavras = contarPalavras(txt);
        contagensPalavras.push(nPalavras);
        totalPalavras += nPalavras;

        // Fonte
        if (node.loreContext?.fonte) {
          cenasComFonte++;
          const arq = node.loreContext.fonte.arquivo_md || '';
          if (arq.toLowerCase().includes('resumo')) {
            cenasFonteResumo++;
          }
        }

        // Origem
        const origemEfetiva = (node as any).origem || (node.loreContext as any)?.origem;
        if (origemEfetiva === 'original') {
          cenasOrigemOriginal++;
        } else {
          cenasOrigemCanonica++;
        }

        // Vozes internas
        if (node.internalVoices && Array.isArray(node.internalVoices)) {
          totalVozesInternas += node.internalVoices.length;
        }

        // Fala direta
        const fala = extrairFalaDireta(txt);
        totalPalavrasFala += fala.palavrasFala;
        if (fala.temDialogo) {
          cenasComDialogo++;
        }

        // Idioma
        const idio = analisarIdioma(txt);
        todasOcorrenciasVos.push(...idio.vosVosso);
        totalEnclises += idio.enclises;
        totalSor += idio.sor;
        totalSer += idio.ser;

        // Flags condicionais da cena
        if (node.conditionalParagraphs) {
          for (const cp of node.conditionalParagraphs) {
            flagsLidas.add(cp.requiredFlag);
          }
        }

        // Escolhas e Destinos
        const escolhas = node.escolhas || [];
        if (!node.isEnding && escolhas.length > 0) {
          nosNaoFinais++;

          const destinos = new Set<string>();
          for (const esc of escolhas) {
            if (esc.tipo === 'simples') {
              destinos.add(esc.nextNodeId);
            } else if (esc.tipo === 'teste_atributo') {
              destinos.add(esc.onSuccessNodeId);
              if (esc.onPartialFailureNodeId) destinos.add(esc.onPartialFailureNodeId);
              if (esc.onCriticalSuccessNodeId) destinos.add(esc.onCriticalSuccessNodeId);
              if (esc.onCriticalFailureNodeId) destinos.add(esc.onCriticalFailureNodeId);
            }

            // Flags lidas e gravadas em escolhas
            if (esc.requiredFlags) {
              for (const rf of esc.requiredFlags) flagsLidas.add(rf);
            }
            if (esc.delta?.flagsAdicionadas) {
              for (const sf of esc.delta.flagsAdicionadas) flagsGravadas.add(sf);
            }

            // Testes de atributo
            if (esc.tipo === 'teste_atributo') {
              totalTestesAtributo++;
              const suc = esc.onSuccessNodeId;
              const par = esc.onPartialFailureNodeId || suc;
              const critFal = esc.onCriticalFailureNodeId || par;
              if (suc === par && suc === critFal) {
                testesSemFalhaPropria++;
              }
            }
          }

          totalDestinosDistintos += destinos.size;
          if (destinos.size <= 1) {
            nosMesmoDestino++;
          }
        }
      }

      // Estatísticas numéricas de palavras
      contagensPalavras.sort((a, b) => a - b);
      const minPalavras = contagensPalavras[0] || 0;
      const maxPalavras = contagensPalavras[contagensPalavras.length - 1] || 0;
      const mediaPalavras = Math.round(totalPalavras / (contagensPalavras.length || 1));
      const mid = Math.floor(contagensPalavras.length / 2);
      const medianaPalavras =
        contagensPalavras.length % 2 === 0
          ? Math.round((contagensPalavras[mid - 1] + contagensPalavras[mid]) / 2)
          : contagensPalavras[mid];
      const menosDe80 = contagensPalavras.filter((p) => p < 80).length;

      // Flags órfãs
      const flagsOrfas = Array.from(flagsGravadas).filter((f) => !flagsLidas.has(f));

      const metricasJornada: MetricasJornada = {
        id: def.id,
        numero: def.numero,
        titulo: def.titulo,
        totalCenas: nodes.length,
        palavras: {
          total: totalPalavras,
          media: mediaPalavras,
          mediana: medianaPalavras,
          min: minPalavras,
          max: maxPalavras,
          menosDe80,
        },
        fontes: {
          totalComFonte: cenasComFonte,
          percentualComFonte: Math.round((cenasComFonte / (nodes.length || 1)) * 100),
          totalResumo: cenasFonteResumo,
          percentualResumo: Math.round((cenasFonteResumo / (cenasComFonte || 1)) * 100),
        },
        origem: {
          totalOriginal: cenasOrigemOriginal,
          totalCanonica: cenasOrigemCanonica,
        },
        vozesInternasTotal: totalVozesInternas,
        narrativa: {
          totalNosNaoFinais: nosNaoFinais,
          nosTodasEscolhasMesmoDestino: nosMesmoDestino,
          percentualMesmoDestino: Math.round((nosMesmoDestino / (nosNaoFinais || 1)) * 100),
          destinosDistintosMedioPorNo:
            Math.round((totalDestinosDistintos / (nosNaoFinais || 1)) * 100) / 100,
          totalTestesAtributo,
          testesSemRamoFalhaProprio: testesSemFalhaPropria,
          percentualTestesSemRamoFalha: Math.round(
            (testesSemFalhaPropria / (totalTestesAtributo || 1)) * 100
          ),
          palavrasFalaDireta: totalPalavrasFala,
          percentualFalaDireta: Math.round((totalPalavrasFala / (totalPalavras || 1)) * 100),
          cenasComDialogoRelevante: cenasComDialogo,
          tempoEstimadoLeituraMinutos: Math.round(totalPalavras / 200),
        },
        idioma: {
          ocorrenciasVosVosso: todasOcorrenciasVos.length,
          detalhesVosVosso: Array.from(new Set(todasOcorrenciasVos)),
          ocorrenciasEnclise: totalEnclises,
          contagemSor: totalSor,
          contagemSer: totalSer,
        },
        flags: {
          totalGravadas: flagsGravadas.size,
          totalLidas: flagsLidas.size,
          flagsOrfas,
          totalOrfas: flagsOrfas.length,
        },
      };

      relatorioJornadas.push(metricasJornada);
    }

    const totaisGerais = {
      geradoEm: new Date().toISOString(),
      jornadasAuditadas: relatorioJornadas.length,
      totalCenasGlobal: relatorioJornadas.reduce((acc, j) => acc + j.totalCenas, 0),
      totalPalavrasGlobal: relatorioJornadas.reduce((acc, j) => acc + j.palavras.total, 0),
      tempoTotalLeituraMinutos: Math.round(
        relatorioJornadas.reduce((acc, j) => acc + j.palavras.total, 0) / 200
      ),
      totalOcorrenciasVosVosso: relatorioJornadas.reduce(
        (acc, j) => acc + j.idioma.ocorrenciasVosVosso,
        0
      ),
      totalSor: relatorioJornadas.reduce((acc, j) => acc + j.idioma.contagemSor, 0),
      totalSer: relatorioJornadas.reduce((acc, j) => acc + j.idioma.contagemSer, 0),
      totalFlagsOrfas: relatorioJornadas.reduce((acc, j) => acc + j.flags.totalOrfas, 0),
      detalhesPorJornada: relatorioJornadas,
    };

    const outPath = path.resolve(process.cwd(), 'docs/metricas.json');
    fs.mkdirSync(path.dirname(outPath), { recursive: true });
    fs.writeFileSync(outPath, JSON.stringify(totaisGerais, null, 2), 'utf8');

    console.log('=== RELATÓRIO OFICIAL DE MÉTRICAS G0 GERADO ===');
    console.log(`Arquivo salvo: ${outPath}`);
    console.log(`Total de Cenas: ${totaisGerais.totalCenasGlobal}`);
    console.log(`Total de Palavras: ${totaisGerais.totalPalavrasGlobal} (~${totaisGerais.tempoTotalLeituraMinutos} minutos de leitura)`);
    console.log(`Ocorrências de Vós/Vosso: ${totaisGerais.totalOcorrenciasVosVosso}`);
    console.log(`Sor vs Ser: Sor=${totaisGerais.totalSor} / Ser=${totaisGerais.totalSer}`);

    expect(totaisGerais.jornadasAuditadas).toBe(5);
  });
});
