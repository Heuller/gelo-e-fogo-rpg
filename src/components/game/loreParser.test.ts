import { describe, it, expect } from 'vitest';
import { segmentarTextoComGlossario } from './loreParser';
import { VerbeteGlossario } from '@/server/data/lore';

describe('Parser do Glossário Vivo da Cidadela (loreParser.ts)', () => {
  const verbetesMock: VerbeteGlossario[] = [
    {
      id: 'balerion',
      termo: 'Balerion, o Terror Negro',
      aliases: ['Balerion', 'O Terror Negro'],
      categoria: 'dragao',
      resumo_meistre: 'A maior das três feras valirianas trazidas por Aegon.',
      fonte: { arquivo_md: 'fogo-e-sangue_01.md', livro: 'Fogo & Sangue', capitulo: 'Conquista' },
    },
    {
      id: 'mesa_pintada',
      termo: 'A Mesa Pintada',
      aliases: ['Mesa Pintada'],
      categoria: 'artefato_espada',
      resumo_meistre: 'Uma grande mesa entalhada com o mapa exato de Westeros.',
      fonte: { arquivo_md: 'fogo-e-sangue_01.md', livro: 'Fogo & Sangue', capitulo: 'Conquista' },
    },
    {
      id: 'fogonegro',
      termo: 'Fogonegro',
      aliases: ['Blackfyre'],
      categoria: 'artefato_espada',
      resumo_meistre: 'A lendária espada bastarda de aço valiriano de Aegon.',
      fonte: { arquivo_md: 'fogo-e-sangue_01.md', livro: 'Fogo & Sangue', capitulo: 'Conquista' },
    },
    {
      id: 'aegon_conquistador',
      termo: 'Aegon I Targaryen',
      aliases: ['Aegon', 'O Conquistador'],
      categoria: 'personagem',
      resumo_meistre: 'O primeiro Senhor dos Sete Reinos.',
      fonte: { arquivo_md: 'fogo-e-sangue_01.md', livro: 'Fogo & Sangue', capitulo: 'Conquista' },
    },
  ];

  it('deve identificar corretamente os termos exatos e aliases no texto', () => {
    const texto = 'Aegon I Targaryen reuniu os senhores ao redor da Mesa Pintada enquanto Balerion rugia.';
    const tokens = segmentarTextoComGlossario(texto, verbetesMock);

    const verbetesEncontrados = tokens.filter((t) => t.tipo === 'verbete');
    expect(verbetesEncontrados.length).toBe(3);

    expect(verbetesEncontrados[0].conteudo).toBe('Aegon I Targaryen');
    expect(verbetesEncontrados[0].verbete?.id).toBe('aegon_conquistador');

    expect(verbetesEncontrados[1].conteudo).toBe('Mesa Pintada');
    expect(verbetesEncontrados[1].verbete?.id).toBe('mesa_pintada');

    expect(verbetesEncontrados[2].conteudo).toBe('Balerion');
    expect(verbetesEncontrados[2].verbete?.id).toBe('balerion');
  });

  it('deve manter a integridade total do texto quando nenhum termo for encontrado', () => {
    const textoSemTermos = 'Os corvos voaram sob o luar silencioso do mar.';
    const tokens = segmentarTextoComGlossario(textoSemTermos, verbetesMock);

    expect(tokens.length).toBe(1);
    expect(tokens[0].tipo).toBe('texto');
    expect(tokens[0].conteudo).toBe(textoSemTermos);
  });

  it('deve priorizar expressões mais longas para evitar cortes errôneos', () => {
    // "Aegon I Targaryen" deve ser capturado como um bloco único, e não apenas "Aegon"
    const texto = 'Fogonegro estava desembainhada nas mãos de Aegon I Targaryen.';
    const tokens = segmentarTextoComGlossario(texto, verbetesMock);

    const fogonegroToken = tokens.find((t) => t.conteudo === 'Fogonegro');
    expect(fogonegroToken?.tipo).toBe('verbete');

    const aegonToken = tokens.find((t) => t.conteudo === 'Aegon I Targaryen');
    expect(aegonToken?.tipo).toBe('verbete');
    expect(aegonToken?.verbete?.id).toBe('aegon_conquistador');
  });
});
