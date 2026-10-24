import { describe, it, expect } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';
import { REGISTRO_JORNADAS } from '../src/server/journeys/registry';

export interface PropostaOrigem {
  jornada: string;
  nodeId: string;
  titulo: string;
  origem: 'canonica' | 'original';
  razao: string;
  notaHistorica: string;
  fonteLivro: string;
  fonteCapitulo: string;
  fonteArquivo: string;
}

export function classificarCena(
  jornadaId: string,
  nodeId: string,
  titulo: string,
  notaExistente: string,
  fallbackText: string,
  fonte: { livro?: string; capitulo?: string; arquivo_md?: string }
): { origem: 'canonica' | 'original'; razao: string; notaHistorica: string } {
  const idLower = nodeId.toLowerCase();
  const tituloLower = titulo.toLowerCase();
  const notaLower = notaExistente.toLowerCase();
  const textLower = fallbackText.toLowerCase();

  // Critérios determinísticos para marcação ORIGINAL (Fase G5 - Regra Conservadora)
  const ehDivergencia =
    idLower.includes('whatif') ||
    idLower.includes('divergencia') ||
    tituloLower.includes('what if') ||
    tituloLower.includes('divergência') ||
    notaLower.includes('ponto de divergência') ||
    notaLower.includes('ramificação alternativa') ||
    notaLower.includes('divergência canônica');

  const ehMorteNaoCanonica =
    (idLower.includes('morte') || tituloLower.includes('morte') || tituloLower.includes('queda')) &&
    (idLower.includes('darklyn') ||
      idLower.includes('emboscada') ||
      idLower.includes('campo_de_fogo') ||
      idLower.includes('represeiro') ||
      idLower.includes('argilac') ||
      idLower.includes('linchamento') ||
      idLower.includes('assassinato') ||
      notaLower.includes('morte precoce') ||
      notaLower.includes('morte prematura') ||
      notaLower.includes('derrota fatal'));

  const ehPersonagemOriginalJ4 =
    jornadaId === 'patrulha_muralha' &&
    (textLower.includes('dunmere') ||
      textLower.includes('joss') ||
      textLower.includes('dunny') ||
      textLower.includes('aric wren') ||
      idLower.includes('joss') ||
      idLower.includes('dunny') ||
      idLower.includes('aric'));

  const ehRamalOesteJ4 =
    jornadaId === 'patrulha_muralha' &&
    (idLower.includes('a3b_') ||
      idLower.includes('ponte_das_caveiras') ||
      idLower.includes('garganta_congelada') ||
      idLower.includes('emboscada_chorao') ||
      tituloLower.includes('ramal do oeste') ||
      tituloLower.includes('ponte das caveiras') ||
      notaLower.includes('ramal do oeste'));

  const ehDramatizacaoJ5 =
    jornadaId === 'rebeliao_robert' &&
    (idLower.includes('dramatizacao') ||
      idLower.includes('abismo') ||
      idLower.includes('carta_rasgada') ||
      textLower.includes('rasga a carta') ||
      textLower.includes('jogando os pedaços') ||
      textLower.includes('abismo'));

  const ehWhatIfGuerraTronos =
    jornadaId === 'guerra_tronos' &&
    (idLower.includes('whatif') ||
      idLower.includes('fuga_ned') ||
      idLower.includes('resgate') ||
      notaLower.includes('alternativ') ||
      tituloLower.includes('alternativ') ||
      tituloLower.includes('e se'));

  if (ehDivergencia) {
    const nota =
      notaExistente ||
      `Criação autoral: ramificação alternativa especulativa ("E se...") afastando-se do desfecho histórico registrado nos livros.`;
    return {
      origem: 'original',
      razao: 'Ramificação alternativa / ponto de divergência especulativo',
      notaHistorica: nota,
    };
  }

  if (ehMorteNaoCanonica) {
    const nota =
      notaExistente ||
      `Criação autoral: desfecho de morte prematura ou derrota não canônica para encerramento de narrativa no RPG.`;
    return {
      origem: 'original',
      razao: 'Morte ou derrota prematura não canônica do protagonista/facção',
      notaHistorica: nota,
    };
  }

  if (ehPersonagemOriginalJ4) {
    const nota =
      notaExistente ||
      `Criação autoral: personagem original ou subtrama fictícia da Patrulha da Noite ambientada no cânone da Muralha.`;
    return {
      origem: 'original',
      razao: 'Personagem autoral original ou missão fictícia na Muralha',
      notaHistorica: nota,
    };
  }

  if (ehRamalOesteJ4) {
    const nota =
      notaExistente ||
      `Criação autoral: dramatização expandida da expedição de Bowen Marsh à Ponte das Caveiras contra o Chorão.`;
    return {
      origem: 'original',
      razao: 'Expansão narrativa autoral do Ramal do Oeste (Ponte das Caveiras)',
      notaHistorica: nota,
    };
  }

  if (ehDramatizacaoJ5) {
    const nota =
      notaExistente ||
      `Criação autoral: dramatização literária da convocação dos vassalos no Vale e reação de Jon Arryn à ordem de Aerys II.`;
    return {
      origem: 'original',
      razao: 'Dramatização literária com licença narrativa autoral',
      notaHistorica: nota,
    };
  }

  if (ehWhatIfGuerraTronos) {
    const nota =
      notaExistente ||
      `Criação autoral: ramificação alternativa de A Guerra dos Tronos baseada em escolhas do jogador.`;
    return {
      origem: 'original',
      razao: 'Ramificação alternativa hipotética em A Guerra dos Tronos',
      notaHistorica: nota,
    };
  }

  // Caso padrão: CANÔNICA
  let notaCanonica = notaExistente;
  if (!notaCanonica || notaCanonica.trim().length === 0) {
    const cap = fonte.capitulo || 'Registro Histórico';
    const liv = fonte.livro || 'As Crônicas de Gelo e Fogo';
    notaCanonica = `Fato canônico central adaptado diretamente de ${liv} (${cap}).`;
  }

  return {
    origem: 'canonica',
    razao: 'Evento histórico canônico correspondente às crônicas de George R. R. Martin',
    notaHistorica: notaCanonica,
  };
}

describe('G5 — Geração da Proposta de Marcação de Origem', () => {
  it('deve classificar todas as 299 cenas e salvar docs/propostas/marcacao_origem.csv', () => {
    const propostas: PropostaOrigem[] = [];

    for (const [jornadaId, def] of Object.entries(REGISTRO_JORNADAS)) {
      const nodes = Object.values(def.grafo.nodes);
      for (const node of nodes) {
        const fonte = node.loreContext?.fonte || {};
        const notaExistente = node.loreContext?.notaHistorica || (node as any).notaHistorica || '';
        const txt = node.fallbackText || '';

        const classif = classificarCena(jornadaId, node.id, node.titulo, notaExistente, txt, fonte);

        propostas.push({
          jornada: jornadaId,
          nodeId: node.id,
          titulo: node.titulo,
          origem: classif.origem,
          razao: classif.razao,
          notaHistorica: classif.notaHistorica,
          fonteLivro: fonte.livro || 'N/A',
          fonteCapitulo: fonte.capitulo || 'N/A',
          fonteArquivo: fonte.arquivo_md || 'N/A',
        });
      }
    }

    expect(propostas.length).toBe(299);

    const canonicas = propostas.filter((p) => p.origem === 'canonica').length;
    const originais = propostas.filter((p) => p.origem === 'original').length;

    console.log(`\n=== PROPOSTA DE MARCAÇÃO DE ORIGEM G5 ===`);
    console.log(`Total de cenas: ${propostas.length}`);
    console.log(`Canônicas: ${canonicas} (${((canonicas / propostas.length) * 100).toFixed(1)}%)`);
    console.log(`Originais: ${originais} (${((originais / propostas.length) * 100).toFixed(1)}%)`);

    const header = [
      'jornada',
      'nodeId',
      'titulo',
      'origemProposta',
      'razaoClassificacao',
      'notaHistorica',
      'fonteLivro',
      'fonteCapitulo',
      'fonteArquivo',
    ].join(',');

    function escapeCsv(val: string): string {
      if (!val) return '';
      if (val.includes(',') || val.includes('"') || val.includes('\n')) {
        return `"${val.replace(/"/g, '""')}"`;
      }
      return val;
    }

    const rows = propostas.map((p) =>
      [
        escapeCsv(p.jornada),
        escapeCsv(p.nodeId),
        escapeCsv(p.titulo),
        p.origem,
        escapeCsv(p.razao),
        escapeCsv(p.notaHistorica),
        escapeCsv(p.fonteLivro),
        escapeCsv(p.fonteCapitulo),
        escapeCsv(p.fonteArquivo),
      ].join(',')
    );

    const csvContent = [header, ...rows].join('\n');
    const destDir = path.resolve(process.cwd(), 'docs/propostas');
    if (!fs.existsSync(destDir)) fs.mkdirSync(destDir, { recursive: true });
    const destFile = path.resolve(destDir, 'marcacao_origem.csv');
    fs.writeFileSync(destFile, csvContent, 'utf-8');
    console.log(`Arquivo salvo com sucesso em: ${destFile}`);
  });
});
