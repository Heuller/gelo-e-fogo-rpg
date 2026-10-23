import { describe, it, expect } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';
import {
  REGISTRO_JORNADAS,
  obterJornada,
  obterGrafoPorJornada,
  getCatalogoPublico,
  registrarJornada,
  removerJornada,
  DefinicaoJornada,
} from '../registry';
import { validarGrafoJornada, GrafoJornada } from '@/server/engine/storyLinter';
import { analisarGrafoAvancado } from '@/server/engine/storyLinterPlus';
import { TEMAS_JORNADAS } from '@/lib/temas';

describe('Registro Central de Jornadas e Temas (registry.ts)', () => {
  it('todas as jornadas registradas devem passar na validação básica de integridade com 0 erros', () => {
    for (const [id, jornada] of Object.entries(REGISTRO_JORNADAS)) {
      const relatorio = validarGrafoJornada(jornada.grafo);
      expect(relatorio.valido).toBe(true);
      expect(
        relatorio.erros,
        `Jornada ${id} possui erros no grafo: ${relatorio.erros.join(', ')}`
      ).toHaveLength(0);
      expect(relatorio.estatisticas.totalNos).toBeGreaterThan(0);
    }
  });

  it('deve executar o linter avançado (storyLinterPlus) e mapear estatísticas sem falhas', () => {
    let md = '# Relatório de Análise Avançada de Grafos (Linter Plus) — F2\n\n';
    md += 'Este relatório consolida os avisos mapeados por `storyLinterPlus.ts` para cada jornada registrada. ';
    md += 'Estes avisos não quebram o jogo, mas servem como insumo direto para o refinamento de reatividade na Fase F10.\n\n';

    for (const [id, jornada] of Object.entries(REGISTRO_JORNADAS)) {
      const tema = TEMAS_JORNADAS[jornada.temaId];
      const analise = analisarGrafoAvancado(jornada.grafo, tema);

      expect(analise.totalNodes).toBeGreaterThan(0);
      expect(analise.totalEscolhas).toBeGreaterThan(0);
      expect(Array.isArray(analise.avisos)).toBe(true);

      md += `## Jornada: ${jornada.titulo} (\`${id}\`)\n\n`;
      md += `- **Total de Cenas (Nós)**: ${analise.totalNodes}\n`;
      md += `- **Total de Escolhas**: ${analise.totalEscolhas}\n`;
      md += `- **Nós sem regionId**: ${analise.estatisticas.nodesSemRegionId}\n`;
      md += `- **Flags lidas nunca escritas**: ${analise.estatisticas.flagsLidasNuncaEscritas}\n`;
      md += `- **Flags escritas nunca lidas**: ${analise.estatisticas.flagsEscritasNuncaLidas}\n\n`;

      if (analise.avisos.length === 0) {
        md += '✅ Nenhum aviso encontrado nesta jornada.\n\n';
      } else {
        md += '| Tipo de Aviso | Cena (NodeId) | Escolha | Mensagem |\n';
        md += '| :--- | :--- | :--- | :--- |\n';
        for (const a of analise.avisos.slice(0, 50)) {
          md += `| \`${a.tipo}\` | \`${a.nodeId || '-'}\` | \`${a.escolhaId || '-'}\` | ${a.mensagem} |\n`;
        }
        if (analise.avisos.length > 50) {
          md += `\n*(Exibindo os primeiros 50 avisos de um total de ${analise.avisos.length})*\n`;
        }
        md += '\n';
      }
    }

    try {
      const destDir = path.join(process.cwd(), 'docs/relatorios');
      if (!fs.existsSync(destDir)) fs.mkdirSync(destDir, { recursive: true });
      fs.writeFileSync(path.join(destDir, 'F2-avisos-linter.md'), md, 'utf8');
    } catch {}
  });

  it('getCatalogoPublico deve retornar metadados leves sem expor fallbackText de cenas', () => {
    const catalogo = getCatalogoPublico();
    expect(catalogo.length).toBeGreaterThanOrEqual(3);

    const json = JSON.stringify(catalogo);
    expect(json).not.toContain('fallbackText');
    expect(json).not.toContain('internalVoices');

    for (const item of catalogo) {
      expect(item.id).toBeDefined();
      expect(item.titulo).toBeDefined();
      expect(item.startNodeId).toBeDefined();
      expect(item.protagonista.nome).toBeDefined();
      expect(item.protagonista.atributos.comando).toBeGreaterThan(0);
    }
  });

  it('deve permitir registro dinâmico de nova jornada e remoção limpa', () => {
    const grafoDummy: GrafoJornada = {
      id: 'jornada_teste_dummy',
      titulo: 'Jornada Dummy de Teste',
      startNodeId: 'node_dummy_1',
      nodes: {
        node_dummy_1: {
          id: 'node_dummy_1',
          titulo: 'Cena Dummy 1',
          fallbackText: 'Texto dummy da primeira cena.',
          regionId: 'pedra_dragao',
          loreContext: {
            fonte: {
              arquivo_md: 'teste.md',
              livro: 'Livro de Teste',
              capitulo: 'Capítulo 1',
            },
          },
          escolhas: [
            {
              id: 'esc_dummy_1',
              texto: 'Avançar para cena 2',
              tipo: 'simples',
              nextNodeId: 'node_dummy_2',
            },
          ],
        },
        node_dummy_2: {
          id: 'node_dummy_2',
          titulo: 'Final Dummy 2',
          fallbackText: 'Texto dummy do final.',
          regionId: 'pedra_dragao',
          loreContext: {
            fonte: {
              arquivo_md: 'teste.md',
              livro: 'Livro de Teste',
              capitulo: 'Capítulo 2',
            },
          },
          isEnding: true,
          escolhas: [],
        },
      },
    };

    const dummyDef: DefinicaoJornada = {
      id: 'jornada_teste_dummy',
      numero: 99,
      titulo: 'Jornada Dummy de Teste',
      subtitulo: 'Subtítulo Dummy',
      sinopse: 'Sinopse Dummy para verificação de isolamento.',
      origem: 'original',
      epoca: 'Era Dummy',
      startNodeId: 'node_dummy_1',
      grafo: grafoDummy,
      fichasProntas: [
        {
          id: 'char_dummy',
          nome: 'Personagem Dummy',
          titulo: 'Lorde de Teste',
          origem: 'teste',
          ficha: {
            id: 'char_dummy',
            nome: 'Personagem Dummy',
            origem: 'teste',
            atributos: { comando: 4, furia: 4, astucia: 4, cortesia: 4, erudicao: 3, pressagio: 3 },
            estado: { sangue: 10, compostura: 10, honra: 5 },
            cicatrizes: [],
            segredos: [],
            inspiracao: 2,
            companheiros: {},
          },
        },
      ],
      companheirosIniciais: {},
      temaId: 'conquista_aegon',
      ativa: true,
    };

    // 1. Registra dinamicamente
    registrarJornada(dummyDef);
    expect(obterJornada('jornada_teste_dummy')).toBeDefined();
    expect(obterGrafoPorJornada('jornada_teste_dummy')).toBe(grafoDummy);

    // 2. Remove dinamicamente
    removerJornada('jornada_teste_dummy');
    expect(obterJornada('jornada_teste_dummy')).toBeUndefined();
  });
});
