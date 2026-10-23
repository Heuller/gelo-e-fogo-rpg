import { describe, it, expect } from 'vitest';
import {
  detectarTemaCena,
  MAPA_ILUSTRACOES_NOS,
  MAPA_ILUSTRACOES_REGIOES,
} from '../SceneIllustration';

describe('SceneIllustration - Resolução de Temas Visuais', () => {
  it('deve respeitar temaOverride prioritariamente', () => {
    const tema = detectarTemaCena('j1_a1_start', 'Título', 'Local');
    expect(tema).toBe('mesa_pintada');
  });

  it('deve mapear deterministicamente por ID de nó narrativo', () => {
    expect(detectarTemaCena('j1_a1_coroa')).toBe('fogo_dragao');
    expect(detectarTemaCena('j3_a1_start')).toBe('cripta_winterfell');
    expect(detectarTemaCena('j3_a3_trono_ferro_audiencia')).toBe('corte_trono');
    expect(detectarTemaCena('j4_a1_castelo_negro')).toBe('muralha_inverno');
    expect(detectarTemaCena('j4_a4_floresta_assombrada')).toBe('floresta_assombrada');
  });

  it('deve mapear deterministicamente por ID de região', () => {
    expect(detectarTemaCena(undefined, undefined, undefined, 'muralha')).toBe('muralha_inverno');
    expect(detectarTemaCena(undefined, undefined, undefined, 'porto_real')).toBe('corte_trono');
    expect(detectarTemaCena(undefined, undefined, undefined, 'pedra_dragao')).toBe('mesa_pintada');
    expect(detectarTemaCena(undefined, undefined, undefined, 'floresta_assombrada')).toBe('floresta_assombrada');
  });

  it('deve mapear por menção de região no texto de localização', () => {
    expect(detectarTemaCena(undefined, undefined, 'Porto Real - Fortaleza Vermelha')).toBe('corte_trono');
    expect(detectarTemaCena(undefined, undefined, 'Castelo Negro - Muralha')).toBe('muralha_inverno');
    expect(detectarTemaCena(undefined, undefined, 'Winterfell - Criptas')).toBe('cripta_winterfell');
  });

  it('deve aplicar heurística contextual refinada em nós não catalogados', () => {
    expect(detectarTemaCena('no_desconhecido', 'O Grande Salão do Trono', 'Salão Real')).toBe('corte_trono');
    expect(detectarTemaCena('no_desconhecido', 'A Queima do Bosque', 'Balerion')).toBe('fogo_dragao');
    expect(detectarTemaCena('no_desconhecido', 'Frio Além dos Represeiros', 'Bosque Sagrado')).toBe('floresta_assombrada');
  });

  it('todos os nós mapeados devem possuir temas válidos', () => {
    const temasValidos = [
      'mesa_pintada',
      'fogo_dragao',
      'corte_trono',
      'batalha_campal',
      'castelo_tempestade',
      'muralha_inverno',
      'as_gemeas',
      'cripta_winterfell',
      'floresta_assombrada',
    ];

    for (const [nodeId, tema] of Object.entries(MAPA_ILUSTRACOES_NOS)) {
      expect(temasValidos).toContain(tema);
    }

    for (const [regiaoId, tema] of Object.entries(MAPA_ILUSTRACOES_REGIOES)) {
      expect(temasValidos).toContain(tema);
    }
  });
});
