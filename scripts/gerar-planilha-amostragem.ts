import fs from 'node:fs';
import path from 'node:path';
import { REGISTRO_JORNADAS } from '../src/server/journeys/registry';

interface LinhaAmostragem {
  id: string;
  tipo_item: string;
  jornada_ou_categoria: string;
  titulo_termo: string;
  afirmacao_factual: string;
  fonte_declarada: string;
  status_corpus: string;
  veredito: string;
  observacoes: string;
}

function escapeCsv(val: string): string {
  if (!val) return '""';
  if (val.includes(',') || val.includes('"') || val.includes('\n')) {
    return `"${val.replace(/"/g, '""')}"`;
  }
  return `"${val}"`;
}

export function gerarPlanilhaAmostragem(): LinhaAmostragem[] {
  const linhas: LinhaAmostragem[] = [];

  for (const [jornadaId, def] of Object.entries(REGISTRO_JORNADAS)) {
    const nodes = Object.values(def.grafo.nodes);
    let selecionados: typeof nodes = [];

    if (jornadaId === 'patrulha_muralha' || jornadaId === 'rebeliao_robert') {
      // 100% de J4 e J5
      selecionados = nodes;
    } else {
      // Amostra de 20% determinística (a cada 5 nós)
      selecionados = nodes.filter((_, idx) => idx % 5 === 0);
    }

    for (const node of selecionados) {
      const fonte = node.loreContext?.fonte;
      const livro = fonte?.livro || 'N/A';
      const capitulo = fonte?.capitulo || 'N/A';
      const arq = (fonte?.arquivo_md || '').toLowerCase();
      const origem = (node.loreContext as any)?.origem || (node as any).origem || 'canonica';
      const nota = node.loreContext?.notaHistorica || (node as any).notaHistorica || '';

      const temLivroNoCorpus =
        arq.includes('fogo-e-sangue') || arq.includes('conto_') || arq.includes('pov-');
      const ehApenasResumo = arq.includes('resumo');

      let statusCorpus = 'ausente do corpus local';
      if (ehApenasResumo) {
        statusCorpus = 'apenas resumo disponível em corpus_md';
      } else if (temLivroNoCorpus) {
        statusCorpus = 'capítulo integral disponível em corpus_md';
      }

      let veredito = 'verificado contra livro';
      if (origem === 'original') {
        veredito = 'original demarcado';
      } else if (ehApenasResumo) {
        veredito = 'verificado contra resumo';
      }

      const observacoes =
        origem === 'original'
          ? `Criação autoral documentada: ${nota}`
          : `Nota histórica: ${nota}`;

      linhas.push({
        id: node.id,
        tipo_item: 'cena',
        jornada_ou_categoria: jornadaId,
        titulo_termo: node.titulo || '',
        afirmacao_factual: `Cena '${node.titulo}': ${nota}`,
        fonte_declarada: `${livro} - ${capitulo}`,
        status_corpus: statusCorpus,
        veredito,
        observacoes,
      });
    }
  }

  return linhas;
}

export function salvarPlanilhaAmostragem(linhas: LinhaAmostragem[], destino: string): void {
  const header = [
    'id',
    'tipo_item',
    'jornada_ou_categoria',
    'titulo_termo',
    'afirmacao_factual',
    'fonte_declarada',
    'status_corpus',
    'veredito',
    'observacoes',
  ].join(',');

  const rows = linhas.map((l) =>
    [
      escapeCsv(l.id),
      escapeCsv(l.tipo_item),
      escapeCsv(l.jornada_ou_categoria),
      escapeCsv(l.titulo_termo),
      escapeCsv(l.afirmacao_factual),
      escapeCsv(l.fonte_declarada),
      escapeCsv(l.status_corpus),
      escapeCsv(l.veredito),
      escapeCsv(l.observacoes),
    ].join(',')
  );

  const conteudo = [header, ...rows].join('\n');
  const dir = path.dirname(destino);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(destino, conteudo, 'utf-8');
}
