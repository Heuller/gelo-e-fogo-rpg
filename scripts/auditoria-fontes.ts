import fs from 'node:fs';
import path from 'node:path';
import { REGISTRO_JORNADAS } from '../src/server/journeys/registry';

export interface LinhaMatrizFonte {
  jornada: string;
  nodeId: string;
  titulo: string;
  livro: string;
  capitulo: string;
  arquivo_md: string;
  tipoDeFonte: 'livro' | 'resumo' | 'wiki' | 'desconhecido';
  origem: 'canonica' | 'original' | 'ausente';
  notaHistorica: string;
  nivelVerificacao: 'livro' | 'resumo' | 'sem_verificacao';
}

export function classificarTipoFonte(arquivoMd?: string, livro?: string): 'livro' | 'resumo' | 'wiki' | 'desconhecido' {
  if (!arquivoMd && !livro) return 'desconhecido';
  const arq = (arquivoMd || '').toLowerCase();
  const liv = (livro || '').toLowerCase();

  if (arq.includes('resumo') || liv.includes('resumo')) {
    return 'resumo';
  }
  if (arq.includes('wiki') || arq.includes('awoiaf') || liv.includes('wiki')) {
    return 'wiki';
  }
  if (
    arq.includes('fogo-e-sangue') ||
    arq.includes('conto_') ||
    arq.includes('livro_') ||
    liv.includes('fogo & sangue') ||
    liv.includes('crônicas') ||
    liv.includes('guerra dos tronos') ||
    liv.includes('fúria dos reis') ||
    liv.includes('tormenta de espadas') ||
    liv.includes('mundo de gelo e fogo')
  ) {
    return 'livro';
  }
  return 'desconhecido';
}

export function executarAuditoriaFontes(): {
  linhas: LinhaMatrizFonte[];
  resumoPorJornada: Record<
    string,
    {
      total: number;
      fontes: { livro: number; resumo: number; wiki: number; desconhecido: number };
      origens: { canonica: number; original: number; ausente: number };
      verificacao: { livro: number; resumo: number; sem_verificacao: number };
    }
  >;
} {
  const linhas: LinhaMatrizFonte[] = [];
  const resumoPorJornada: Record<
    string,
    {
      total: number;
      fontes: { livro: number; resumo: number; wiki: number; desconhecido: number };
      origens: { canonica: number; original: number; ausente: number };
      verificacao: { livro: number; resumo: number; sem_verificacao: number };
    }
  > = {};

  for (const [jornadaId, definicao] of Object.entries(REGISTRO_JORNADAS)) {
    const grafo = definicao.grafo;
    const nodes = Object.values(grafo.nodes);

    const resumo = {
      total: nodes.length,
      fontes: { livro: 0, resumo: 0, wiki: 0, desconhecido: 0 },
      origens: { canonica: 0, original: 0, ausente: 0 },
      verificacao: { livro: 0, resumo: 0, sem_verificacao: 0 },
    };

    for (const node of nodes) {
      const fonte = node.loreContext?.fonte;
      const livro = fonte?.livro || 'N/A';
      const capitulo = fonte?.capitulo || 'N/A';
      const arquivoMd = fonte?.arquivo_md || 'N/A';
      const tipoDeFonte = classificarTipoFonte(arquivoMd, livro);

      const origemBruta = (node as { origem?: string }).origem || (node.loreContext as { origem?: string })?.origem;
      let origem: 'canonica' | 'original' | 'ausente' = 'ausente';
      if (origemBruta === 'canonica' || origemBruta === 'canonico') {
        origem = 'canonica';
      } else if (origemBruta === 'original') {
        origem = 'original';
      }

      const notaHistorica = (node as { notaHistorica?: string }).notaHistorica || node.loreContext?.notaHistorica || '';

      let nivelVerificacao: 'livro' | 'resumo' | 'sem_verificacao' = 'sem_verificacao';
      if (tipoDeFonte === 'livro') {
        nivelVerificacao = 'livro';
      } else if (tipoDeFonte === 'resumo') {
        nivelVerificacao = 'resumo';
      }

      resumo.fontes[tipoDeFonte]++;
      resumo.origens[origem]++;
      resumo.verificacao[nivelVerificacao]++;

      linhas.push({
        jornada: jornadaId,
        nodeId: node.id,
        titulo: node.titulo || '',
        livro,
        capitulo,
        arquivo_md: arquivoMd,
        tipoDeFonte,
        origem,
        notaHistorica,
        nivelVerificacao,
      });
    }

    resumoPorJornada[jornadaId] = resumo;
  }

  return { linhas, resumoPorJornada };
}

function escapeCsv(val: string): string {
  if (val.includes(',') || val.includes('"') || val.includes('\n')) {
    return `"${val.replace(/"/g, '""')}"`;
  }
  return val;
}

export function salvarMatrizCsv(linhas: LinhaMatrizFonte[], destino: string): void {
  const header = [
    'jornada',
    'nodeId',
    'titulo',
    'livro',
    'capitulo',
    'arquivo_md',
    'tipoDeFonte',
    'origem',
    'notaHistorica',
    'nivelVerificacao',
  ].join(',');

  const rows = linhas.map((l) =>
    [
      escapeCsv(l.jornada),
      escapeCsv(l.nodeId),
      escapeCsv(l.titulo),
      escapeCsv(l.livro),
      escapeCsv(l.capitulo),
      escapeCsv(l.arquivo_md),
      l.tipoDeFonte,
      l.origem,
      escapeCsv(l.notaHistorica),
      l.nivelVerificacao,
    ].join(',')
  );

  const conteudo = [header, ...rows].join('\n');
  const dir = path.dirname(destino);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(destino, conteudo, 'utf-8');
}

// Execução direta via CLI
if (process.argv[1]?.includes('auditoria-fontes')) {
  console.log('Iniciando Auditoria de Fontes e Cânone (Fase G5)...');
  const resultado = executarAuditoriaFontes();
  const destinoCsv = path.resolve(process.cwd(), 'docs/auditoria-canone/matriz_fontes.csv');
  salvarMatrizCsv(resultado.linhas, destinoCsv);
  console.log(`Matriz salva com sucesso em: ${destinoCsv}`);
  console.log(`Total de cenas auditadas: ${resultado.linhas.length}\n`);

  console.log('=== RESUMO POR JORNADA ===');
  for (const [jid, res] of Object.entries(resultado.resumoPorJornada)) {
    console.log(`\nJornada: ${jid} (Total: ${res.total} cenas)`);
    console.log(`  Fontes: Livro=${res.fontes.livro}, Resumo=${res.fontes.resumo}, Wiki=${res.fontes.wiki}, Desconhecido=${res.fontes.desconhecido}`);
    console.log(`  Origem: Canônica=${res.origens.canonica}, Original=${res.origens.original}, Ausente=${res.origens.ausente}`);
    console.log(`  Nível de Verificação: Livro=${res.verificacao.livro}, Resumo=${res.verificacao.resumo}, Sem Verificação=${res.verificacao.sem_verificacao}`);
  }
}
