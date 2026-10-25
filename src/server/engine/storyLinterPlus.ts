import 'server-only';
import { GrafoJornada, NodeJornada } from './storyLinter';
import { TemaJornada } from '@/lib/temas';

export interface AvisoGrafo {
  tipo:
    | 'SEM_REGION_ID'
    | 'REGIAO_NAO_ENCONTRADA_NO_TEMA'
    | 'FLAG_LIDA_NUNCA_ESCRITA'
    | 'FLAG_ESCRITA_NUNCA_LIDA'
    | 'FINAL_SEM_CONDICAO'
    | 'RISCO_MORTAL_DC_BAIXA'
    | 'TESTE_SEM_CONSEQUENCIA'
    | 'CENA_SEM_ORIGEM'
    | 'ORIGEM_ORIGINAL_SEM_NOTA'
    | 'ESCOLHA_SEM_DESFECHO_V2'
    | 'PONTES_IRMAS_SIMILARES_V2'
    | 'DIALOGO_SEM_INTERLOCUTORES_OU_FALAS_V2'
    | 'HUB_SEM_SAIDA_V2'
    | 'HUB_TOPICOS_INVALIDOS_V2'
    | 'MARCAS_ORFAS_EXCESSIVAS_V2'
    | 'TESTE_V2_INCOMPLETO'
    | 'REACAO_INVALIDA_BG3'
    | 'CIRCUNSTANCIA_INVALIDA_BG3'
    | 'VOZES_CONFLITO_INVALIDAS_BG3';
  nodeId?: string;
  escolhaId?: string;
  mensagem: string;
}

export interface RelatorioAnaliseAvancada {
  jornadaId: string;
  totalNodes: number;
  totalEscolhas: number;
  avisos: AvisoGrafo[];
  estatisticas: {
    nodesSemRegionId: number;
    flagsLidasNuncaEscritas: number;
    flagsEscritasNuncaLidas: number;
    finaisSemBloqueio: number;
    cenasSemOrigem: number;
    cenasOriginaisSemNota: number;
    avisosV2?: number;
  };
}

export function calcularSimilaridadeJaccard(strA: string, strB: string): number {
  const normA = strA.toLowerCase().replace(/[^\p{L}\p{N}\s]/gu, '');
  const normB = strB.toLowerCase().replace(/[^\p{L}\p{N}\s]/gu, '');
  const palavrasA = new Set(normA.split(/\s+/).filter((w) => w.length > 2));
  const palavrasB = new Set(normB.split(/\s+/).filter((w) => w.length > 2));
  if (palavrasA.size === 0 && palavrasB.size === 0) return 1;
  const intersecao = new Set([...palavrasA].filter((x) => palavrasB.has(x)));
  const uniao = new Set([...palavrasA, ...palavrasB]);
  return uniao.size === 0 ? 0 : intersecao.size / uniao.size;
}

export function analisarGrafoAvancado(
  grafo: GrafoJornada,
  tema?: TemaJornada,
  schemaV2?: boolean
): RelatorioAnaliseAvancada {
  const avisos: AvisoGrafo[] = [];
  const flagsEscritas = new Set<string>();
  const flagsLidas = new Set<string>();
  const marcasGravadas = new Set<string>();
  const marcasLidas = new Set<string>();
  const regioesValidas = new Set<string>((tema?.regioes || []).map((r) => r.id));

  let totalEscolhas = 0;
  let escolhasComDesfecho = 0;
  const finaisSemBloqueio: string[] = [];

  const nodesArray = Object.values(grafo.nodes);

  for (const node of nodesArray) {
    // 1. Verificação de regionId
    if (!node.regionId) {
      avisos.push({
        tipo: 'SEM_REGION_ID',
        nodeId: node.id,
        mensagem: `Cena '${node.id}' não possui 'regionId' definido para o mapa.`,
      });
    } else if (tema && regioesValidas.size > 0 && !regioesValidas.has(node.regionId)) {
      avisos.push({
        tipo: 'REGIAO_NAO_ENCONTRADA_NO_TEMA',
        nodeId: node.id,
        mensagem: `Região '${node.regionId}' da cena '${node.id}' não existe no tema '${tema.id}'.`,
      });
    }

    // Coleta flags escritas no deltaEstado do nó
    if (node.deltaEstado?.flagsAdicionadas) {
      for (const flag of node.deltaEstado.flagsAdicionadas) {
        flagsEscritas.add(flag);
      }
    }
    if (node.deltaEstado?.flagsBorboleta) {
      for (const flag of Object.keys(node.deltaEstado.flagsBorboleta)) {
        flagsEscritas.add(flag);
      }
    }

    // Coleta flags lidas em conditionalParagraphs
    if (node.conditionalParagraphs) {
      for (const cp of node.conditionalParagraphs) {
        if (cp.requiredFlag) {
          flagsLidas.add(cp.requiredFlag);
        }
      }
    }

    // Coleta marcas lidas em blocos e falas v2
    if (node.blocos) {
      for (const bloco of node.blocos) {
        if (bloco.quando?.flagsTodas) {
          for (const f of bloco.quando.flagsTodas) {
            flagsLidas.add(f);
            marcasLidas.add(f);
          }
        }
        if (bloco.quando?.flagsNenhuma) {
          for (const f of bloco.quando.flagsNenhuma) {
            flagsLidas.add(f);
            marcasLidas.add(f);
          }
        }
      }
    }

    if (node.falas) {
      for (const fala of node.falas) {
        if (fala.quando?.flagsTodas) {
          for (const f of fala.quando.flagsTodas) {
            flagsLidas.add(f);
            marcasLidas.add(f);
          }
        }
        if (fala.quando?.flagsNenhuma) {
          for (const f of fala.quando.flagsNenhuma) {
            flagsLidas.add(f);
            marcasLidas.add(f);
          }
        }
      }
    }

    // Verificações V2 no Nó
    if (schemaV2) {
      if (node.tipo === 'dialogo') {
        const temInterlocutores = node.interlocutores && node.interlocutores.length > 0;
        const temFalas = node.falas && node.falas.length > 0;
        if (!temInterlocutores || !temFalas) {
          avisos.push({
            tipo: 'DIALOGO_SEM_INTERLOCUTORES_OU_FALAS_V2',
            nodeId: node.id,
            mensagem: `Cena de diálogo '${node.id}' exige interlocutores e falas estruturadas.`,
          });
        }
      }

      if (node.tipo === 'hub') {
        const escolhasHub = node.escolhas || [];
        const topicos = escolhasHub.filter((e) => (e as { permanece?: boolean }).permanece);
        const saidas = escolhasHub.filter((e) => !(e as { permanece?: boolean }).permanece);

        if (saidas.length === 0) {
          avisos.push({
            tipo: 'HUB_SEM_SAIDA_V2',
            nodeId: node.id,
            mensagem: `Hub de conversa '${node.id}' deve possuir pelo menos uma escolha de saída visível.`,
          });
        }

        if (topicos.length < 3 || topicos.length > 6) {
          avisos.push({
            tipo: 'HUB_TOPICOS_INVALIDOS_V2',
            nodeId: node.id,
            mensagem: `Hub '${node.id}' deve ter entre 3 e 6 tópicos de conversa (possui ${topicos.length}).`,
          });
        }
      }
    }

    // 2. Verificação de Finais
    if (node.isEnding) {
      // Nó final
    }

    // 3. Verificação de Escolhas
    for (const escolha of node.escolhas || []) {
      totalEscolhas++;

      // Flags lidas
      if (escolha.requiredFlags) {
        for (const f of escolha.requiredFlags) {
          flagsLidas.add(f);
          marcasLidas.add(f);
        }
      }
      if (escolha.forbiddenFlags) {
        for (const f of escolha.forbiddenFlags) {
          flagsLidas.add(f);
          marcasLidas.add(f);
        }
      }

      // Flags escritas
      if (escolha.delta?.flagsAdicionadas) {
        for (const f of escolha.delta.flagsAdicionadas) {
          flagsEscritas.add(f);
        }
      }
      if (escolha.delta?.flagsBorboleta) {
        for (const f of Object.keys(escolha.delta.flagsBorboleta)) {
          flagsEscritas.add(f);
        }
      }

      // V2: Verificação de desfecho e marcas
      const escolhaV2 = escolha as unknown as {
        desfecho?: { ponte?: string; marcas?: string[] };
        desfechos?: {
          sucesso: { ponte?: string; marcas?: string[] };
          parcial: { ponte?: string; marcas?: string[] };
          falha?: { ponte?: string; marcas?: string[] };
        };
      };

      if (escolhaV2.desfecho || escolhaV2.desfechos) {
        escolhasComDesfecho++;

        if (escolhaV2.desfecho?.marcas) {
          for (const m of escolhaV2.desfecho.marcas) {
            marcasGravadas.add(m);
            flagsEscritas.add(m);
          }
        }

        if (escolhaV2.desfechos) {
          if (escolhaV2.desfechos.sucesso?.marcas) {
            for (const m of escolhaV2.desfechos.sucesso.marcas) {
              marcasGravadas.add(m);
              flagsEscritas.add(m);
            }
          }
          if (escolhaV2.desfechos.parcial?.marcas) {
            for (const m of escolhaV2.desfechos.parcial.marcas) {
              marcasGravadas.add(m);
              flagsEscritas.add(m);
            }
          }
          if (escolhaV2.desfechos.falha?.marcas) {
            for (const m of escolhaV2.desfechos.falha.marcas) {
              marcasGravadas.add(m);
              flagsEscritas.add(m);
            }
          }

          // Verificação de pontes irmãs distintas
          if (schemaV2) {
            const ponteSuc = escolhaV2.desfechos.sucesso?.ponte || '';
            const pontePar = escolhaV2.desfechos.parcial?.ponte || '';
            const ponteFal = escolhaV2.desfechos.falha?.ponte || '';

            if (ponteSuc && pontePar && calcularSimilaridadeJaccard(ponteSuc, pontePar) >= 0.6) {
              avisos.push({
                tipo: 'PONTES_IRMAS_SIMILARES_V2',
                nodeId: node.id,
                escolhaId: escolha.id,
                mensagem: `Pontes de sucesso e parcial da escolha '${escolha.id}' são muito similares (Jaccard ≥ 0.6).`,
              });
            }

            if (ponteSuc && ponteFal && calcularSimilaridadeJaccard(ponteSuc, ponteFal) >= 0.6) {
              avisos.push({
                tipo: 'PONTES_IRMAS_SIMILARES_V2',
                nodeId: node.id,
                escolhaId: escolha.id,
                mensagem: `Pontes de sucesso e falha da escolha '${escolha.id}' são muito similares (Jaccard ≥ 0.6).`,
              });
            }
          }
        }
      }

      // Risco mortal com DC baixa (< 8)
      if (escolha.tipo === 'teste_atributo') {
        if (escolha.riscoMortal && escolha.dc < 8) {
          avisos.push({
            tipo: 'RISCO_MORTAL_DC_BAIXA',
            nodeId: node.id,
            escolhaId: escolha.id,
            mensagem: `Escolha '${escolha.id}' possui riscoMortal=true mas DC ${escolha.dc} é menor que 8.`,
          });
        }

        // Teste sem consequências autorais
        if (!escolha.delta && !escolha.aprovacaoCompanheiros && !escolhaV2.desfechos && !escolhaV2.desfecho) {
          avisos.push({
            tipo: 'TESTE_SEM_CONSEQUENCIA',
            nodeId: node.id,
            escolhaId: escolha.id,
            mensagem: `Escolha de teste '${escolha.id}' não possui delta nem aprovacaoCompanheiros próprios.`,
          });
        }
      }
    }

    // 4. Verificação de Origem e Fidelidade Canônica (Fase G5)
    const origem = (node as { origem?: string }).origem || (node.loreContext as { origem?: string })?.origem;
    if (!origem) {
      avisos.push({
        tipo: 'CENA_SEM_ORIGEM',
        nodeId: node.id,
        mensagem: `Cena '${node.id}' não possui marcação explícita de 'origem' ('canonica' | 'original').`,
      });
    } else if (origem === 'original') {
      const nota = (node as { notaHistorica?: string }).notaHistorica || node.loreContext?.notaHistorica;
      if (!nota || nota.trim().length === 0) {
        avisos.push({
          tipo: 'ORIGEM_ORIGINAL_SEM_NOTA',
          nodeId: node.id,
          mensagem: `Cena '${node.id}' possui origem='original' mas não possui 'notaHistorica' justificando a criação autoral.`,
        });
      }
    }

    // Validações da Camada BG3 e Disco Elysium (G7B)
    if (node.reacoes && node.reacoes.length > 0) {
      for (const r of node.reacoes) {
        if (!r.companheiro || r.companheiro.trim().length === 0) {
          avisos.push({
            tipo: 'REACAO_INVALIDA_BG3',
            nodeId: node.id,
            mensagem: `Reação de companheiro na cena '${node.id}' sem 'companheiro' especificado.`,
          });
        }
        if (!r.fala || r.fala.trim().length === 0 || r.fala.length > 200) {
          avisos.push({
            tipo: 'REACAO_INVALIDA_BG3',
            nodeId: node.id,
            mensagem: `Fala de reação de companheiro na cena '${node.id}' deve ter entre 1 e 200 caracteres (≤ 25 palavras).`,
          });
        }
      }
    }

    if (node.circunstancias && node.circunstancias.length > 0) {
      for (const c of node.circunstancias) {
        if (!c.motivo || c.motivo.trim().length === 0) {
          avisos.push({
            tipo: 'CIRCUNSTANCIA_INVALIDA_BG3',
            nodeId: node.id,
            mensagem: `Circunstância na cena '${node.id}' possui motivo vazio.`,
          });
        }
      }
    }

    if (node.vozesConflito && node.vozesConflito.length > 0) {
      for (const vc of node.vozesConflito) {
        if (vc.voz1 === vc.voz2) {
          avisos.push({
            tipo: 'VOZES_CONFLITO_INVALIDAS_BG3',
            nodeId: node.id,
            mensagem: `Conflito de vozes na cena '${node.id}' usa a mesma voz ('${vc.voz1}') em ambos os lados.`,
          });
        }
        if (!vc.fala1 || !vc.fala2) {
          avisos.push({
            tipo: 'VOZES_CONFLITO_INVALIDAS_BG3',
            nodeId: node.id,
            mensagem: `Conflito de vozes na cena '${node.id}' deve conter fala1 e fala2 preenchidas.`,
          });
        }
      }
    }
  }

  // Verificações globais do Grafo para V2
  if (schemaV2 && totalEscolhas > 0) {
    const taxaDesfechos = escolhasComDesfecho / totalEscolhas;
    if (taxaDesfechos < 0.9) {
      avisos.push({
        tipo: 'ESCOLHA_SEM_DESFECHO_V2',
        mensagem: `Jornada v2 exige ≥ 90% das escolhas com desfecho(s). Atual: ${(taxaDesfechos * 100).toFixed(1)}%.`,
      });
    }

    if (marcasGravadas.size > 0) {
      const orfas = [...marcasGravadas].filter((m) => !marcasLidas.has(m));
      const taxaOrfas = orfas.length / marcasGravadas.size;
      if (taxaOrfas > 0.25) {
        avisos.push({
          tipo: 'MARCAS_ORFAS_EXCESSIVAS_V2',
          mensagem: `Taxa de marcas de memória nunca lidas (${(taxaOrfas * 100).toFixed(1)}%) excede o limite de 25%.`,
        });
      }
    }
  }

  // 4. Flags lidas que nunca são escritas
  for (const flag of flagsLidas) {
    if (!flagsEscritas.has(flag)) {
      avisos.push({
        tipo: 'FLAG_LIDA_NUNCA_ESCRITA',
        mensagem: `Flag '${flag}' é verificada como requisito mas nunca é escrita por nenhum nó ou escolha.`,
      });
    }
  }

  // 5. Flags escritas que nunca são lidas
  for (const flag of flagsEscritas) {
    if (!flagsLidas.has(flag)) {
      avisos.push({
        tipo: 'FLAG_ESCRITA_NUNCA_LIDA',
        mensagem: `Flag '${flag}' é adicionada ao estado mas nunca é lida como requisito ou eco narrativo.`,
      });
    }
  }

  const avisosV2 = avisos.filter((a) => a.tipo.endsWith('_V2')).length;

  return {
    jornadaId: grafo.id,
    totalNodes: nodesArray.length,
    totalEscolhas,
    avisos,
    estatisticas: {
      nodesSemRegionId: avisos.filter((a) => a.tipo === 'SEM_REGION_ID').length,
      flagsLidasNuncaEscritas: avisos.filter((a) => a.tipo === 'FLAG_LIDA_NUNCA_ESCRITA').length,
      flagsEscritasNuncaLidas: avisos.filter((a) => a.tipo === 'FLAG_ESCRITA_NUNCA_LIDA').length,
      finaisSemBloqueio: finaisSemBloqueio.length,
      cenasSemOrigem: avisos.filter((a) => a.tipo === 'CENA_SEM_ORIGEM').length,
      cenasOriginaisSemNota: avisos.filter((a) => a.tipo === 'ORIGEM_ORIGINAL_SEM_NOTA').length,
      avisosV2,
    },
  };
}
