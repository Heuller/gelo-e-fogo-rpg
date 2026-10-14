import { describe, it, expect } from 'vitest';
import { verificarPermissaoAcesso, ALLOWED_USER_EMAIL } from './auth';
import {
  salvarJogo,
  carregarJogo,
  listarSaves,
  excluirSave,
  SaveGameRecord,
} from './saves';

describe('Supabase Auth & Controle de Acesso', () => {
  it('deve permitir acesso exclusivamente para o email autorizado da Cidadela', () => {
    expect(verificarPermissaoAcesso(ALLOWED_USER_EMAIL)).toBe(true);
    expect(verificarPermissaoAcesso('meistre@cidadela.westeros')).toBe(true);
    expect(verificarPermissaoAcesso('invasor@porto-real.com')).toBe(false);
    expect(verificarPermissaoAcesso(null)).toBe(false);
  });
});

describe('Banco de Saves (saves.ts)', () => {
  const saveMock: SaveGameRecord = {
    id: 'save_teste_01',
    user_id: 'd5f86911-0f14-497d-9a9c-7258a2eb18cd',
    nome_save: 'Conquista - Ato I (A Mesa Pintada)',
    jornada_id: 'jornada_1_conquista',
    ato_id: 'ato_1',
    node_id: 'node_inicio',
    estado_personagem: {
      id: 'aegon-conquistador',
      nome: 'Aegon I Targaryen',
      origem: 'sangue_valiriano',
      atributos: {
        comando: 5,
        furia: 4,
        astucia: 3,
        cortesia: 3,
        erudicao: 3,
        pressagio: 4,
      },
      estado: {
        sangue: 10,
        compostura: 10,
        honra: 5,
      },
      cicatrizes: [],
      segredos: [],
    },
    estado_mundo: {
      reputacaoCasas: { Targaryen: 10, Stark: 0 },
      flagsBorboleta: { mesa_pintada_reunida: true },
      marcosConcluidos: ['2_ac_mesa_pintada'],
    },
    historico_escolhas: [
      {
        nodeId: 'node_inicio',
        escolhaId: 'esc_simples',
        timestamp: new Date().toISOString(),
      },
    ],
  };

  it('deve salvar e recuperar um save com sucesso (usando fallback seguro se tabela ainda não criada)', async () => {
    const resultadoSalvar = await salvarJogo(saveMock);
    expect(resultadoSalvar.sucesso).toBe(true);
    expect(resultadoSalvar.saveId).toBe('save_teste_01');

    const carregado = await carregarJogo('save_teste_01');
    expect(carregado).toBeDefined();
    expect(carregado?.nome_save).toBe('Conquista - Ato I (A Mesa Pintada)');
    expect(carregado?.estado_personagem.nome).toBe('Aegon I Targaryen');
  });

  it('deve listar saves filtrados por user_id', async () => {
    const lista = await listarSaves('d5f86911-0f14-497d-9a9c-7258a2eb18cd');
    expect(lista.length).toBeGreaterThanOrEqual(1);
    expect(lista.some((s) => s.id === 'save_teste_01')).toBe(true);
  });

  it('deve excluir save com sucesso', async () => {
    const excluiu = await excluirSave('save_teste_01');
    expect(excluiu).toBe(true);
    const aposExcluir = await carregarJogo('save_teste_01');
    expect(aposExcluir).toBeNull();
  });
});
