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
    | 'ORIGEM_ORIGINAL_SEM_NOTA';
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
  };
}

export function analisarGrafoAvancado(
  grafo: GrafoJornada,
  tema?: TemaJornada
): RelatorioAnaliseAvancada {
  const avisos: AvisoGrafo[] = [];
  const flagsEscritas = new Set<string>();
  const flagsLidas = new Set<string>();
  const regioesValidas = new Set<string>((tema?.regioes || []).map((r) => r.id));

  let totalEscolhas = 0;
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

    // 2. Verificação de Finais
    if (node.isEnding) {
      // Se for final e não tiver escolhas, verificamos como ele é alcançado
      // (a checagem de bloqueio de final aplica-se às escolhas que levam até ele ou flags requeridas)
    }

    // 3. Verificação de Escolhas
    for (const escolha of node.escolhas || []) {
      totalEscolhas++;

      // Flags lidas
      if (escolha.requiredFlags) {
        for (const f of escolha.requiredFlags) {
          flagsLidas.add(f);
        }
      }
      if (escolha.forbiddenFlags) {
        for (const f of escolha.forbiddenFlags) {
          flagsLidas.add(f);
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
        if (!escolha.delta && !escolha.aprovacaoCompanheiros) {
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
    },
  };
}
