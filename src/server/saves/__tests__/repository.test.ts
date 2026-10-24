import { describe, it, expect, beforeEach } from 'vitest';
import { MemoriaSaveRepository } from '../memoria';
import { FichaPersonagem, WorldState } from '@/server/engine/rpgEngine';

describe('SaveRepository (Memória e Blindagem de Persistência)', () => {
  let repo: MemoriaSaveRepository;

  const mockFicha: FichaPersonagem = {
    id: 'char_1',
    nome: 'Aegon Targaryen',
    origem: 'valiriana',
    atributos: {
      comando: 5,
      furia: 4,
      astucia: 3,
      cortesia: 3,
      erudicao: 4,
      pressagio: 3,
    },
    estado: {
      sangue: 10,
      compostura: 10,
      honra: 5,
    },
    cicatrizes: [],
    segredos: [],
    inspiracao: 2,
    companheiros: {},
  };

  const mockWorldState: WorldState = {
    flagsBorboleta: { inicio: true },
    reputacaoCasas: { stark: 2 },
    marcosConcluidos: ['inicio'],
  };

  beforeEach(() => {
    repo = new MemoriaSaveRepository();
  });

  it('deve criar e recuperar slots respeitando o slotNumber e jornadaId', async () => {
    const resCriar = await repo.criarSlot({
      userId: 'user_a',
      jornadaId: 'jornada_1',
      slotNumber: 1,
      currentNodeId: 'node_inicio',
      characterSheet: mockFicha,
      worldState: mockWorldState,
    });

    expect(resCriar.ok).toBe(true);
    if (!resCriar.ok) return;

    const slot = resCriar.valor;
    expect(slot.slotNumber).toBe(1);
    expect(slot.versao).toBe(0);

    const resObter = await repo.obterSlot('user_a', 'jornada_1', 1);
    expect(resObter.ok).toBe(true);
    if (resObter.ok) {
      expect(resObter.valor.id).toBe(slot.id);
      expect(resObter.valor.currentNodeId).toBe('node_inicio');
    }
  });

  it('deve isolar completamente os dados entre usuários distintos', async () => {
    const resA = await repo.criarSlot({
      userId: 'user_a',
      jornadaId: 'jornada_1',
      slotNumber: 1,
      currentNodeId: 'node_a',
      characterSheet: mockFicha,
      worldState: mockWorldState,
    });
    expect(resA.ok).toBe(true);
    if (!resA.ok) return;

    // Usuário B tenta ler o slot de A
    const resB = await repo.obterSlot('user_b', 'jornada_1', 1);
    expect(resB.ok).toBe(false);
    if (!resB.ok) {
      expect(resB.erro).toBe('NAO_ENCONTRADO');
    }

    // Listar slots de B retorna vazio
    const listaB = await repo.listarSlots('user_b', 'jornada_1');
    expect(listaB.ok).toBe(true);
    if (listaB.ok) {
      expect(listaB.valor).toHaveLength(0);
    }
  });

  it('deve aplicar controle de concorrência otimista e rejeitar conflitos de versão', async () => {
    const resCriar = await repo.criarSlot({
      userId: 'user_a',
      jornadaId: 'jornada_1',
      slotNumber: 1,
      currentNodeId: 'node_inicio',
      characterSheet: mockFicha,
      worldState: mockWorldState,
    });
    if (!resCriar.ok) return;

    const slotId = resCriar.valor.id;

    // Turno 1 com versão esperada 0 -> sucesso
    const resTurno1 = await repo.aplicarTurno({
      userId: 'user_a',
      slotId,
      versaoEsperada: 0,
      proximoNodeId: 'node_segundo',
      characterSheet: { ...mockFicha, estado: { ...mockFicha.estado, honra: 7 } },
      worldState: mockWorldState,
      choiceMade: 'Avançar com dragão',
      turnNumber: 1,
      stateDelta: { honra: 2 },
      snapshotAntes: {
        ficha: mockFicha,
        worldState: mockWorldState,
        nodeId: 'node_inicio',
      },
      resultado: { dado: 10 },
    });

    expect(resTurno1.ok).toBe(true);
    if (!resTurno1.ok) return;
    expect(resTurno1.valor.versao).toBe(1);
    expect(resTurno1.valor.currentNodeId).toBe('node_segundo');

    // Outra aba tenta aplicar turno usando versão esperada 0 antiga -> CONFLITO_VERSAO
    const resConflito = await repo.aplicarTurno({
      userId: 'user_a',
      slotId,
      versaoEsperada: 0,
      proximoNodeId: 'node_conflitante',
      characterSheet: mockFicha,
      worldState: mockWorldState,
      choiceMade: 'Escolha atrasada',
      turnNumber: 1,
      stateDelta: {},
      snapshotAntes: {
        ficha: mockFicha,
        worldState: mockWorldState,
        nodeId: 'node_inicio',
      },
      resultado: {},
    });

    expect(resConflito.ok).toBe(false);
    if (!resConflito.ok) {
      expect(resConflito.erro).toBe('CONFLITO_VERSAO');
    }
  });

  it('deve desfazer turno restaurando com precisão o snapshot anterior de ficha e mundo', async () => {
    const resCriar = await repo.criarSlot({
      userId: 'user_a',
      jornadaId: 'jornada_1',
      slotNumber: 1,
      currentNodeId: 'node_inicio',
      characterSheet: mockFicha,
      worldState: mockWorldState,
    });
    if (!resCriar.ok) return;
    const slotId = resCriar.valor.id;

    // Aplica turno com dano e perda de honra
    await repo.aplicarTurno({
      userId: 'user_a',
      slotId,
      versaoEsperada: 0,
      proximoNodeId: 'node_dano',
      characterSheet: { ...mockFicha, estado: { ...mockFicha.estado, sangue: 4, honra: 2 } },
      worldState: { ...mockWorldState, flagsBorboleta: { ferido: true } },
      choiceMade: 'Atacar sem cautela',
      turnNumber: 1,
      stateDelta: { sangue: -6, honra: -3 },
      snapshotAntes: {
        ficha: mockFicha,
        worldState: mockWorldState,
        nodeId: 'node_inicio',
      },
      resultado: { falha: true },
    });

    // Desfaz o turno
    const resDesfazer = await repo.desfazerUltimoTurno('user_a', slotId);
    expect(resDesfazer.ok).toBe(true);
    if (!resDesfazer.ok) return;

    const restaurado = resDesfazer.valor;
    expect(restaurado.currentNodeId).toBe('node_inicio');
    expect(restaurado.characterSheet.estado.sangue).toBe(10);
    expect(restaurado.characterSheet.estado.honra).toBe(5);
    expect(restaurado.worldState.flagsBorboleta.ferido).toBeUndefined();
    expect(restaurado.turnHistory).toHaveLength(2);
    expect(restaurado.turnHistory[1].tipo).toBe('desfazer');
    expect(restaurado.turnHistory[1].referenciaTurnNumber).toBe(1);
  });
});
