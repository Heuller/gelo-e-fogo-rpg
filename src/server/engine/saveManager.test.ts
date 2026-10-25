import { describe, it, expect } from 'vitest';
import {
  salvarSlot,
  obterSlot,
  listarSlotsJornada,
  desfazerUltimoTurno,
  exportarSave,
  importarSave,
  SaveSlot,
} from './saveManager';

describe('Gerenciador de Saves (saveManager.ts)', () => {
  const mockSlot: SaveSlot = {
    userId: 'd5f86911-0f14-497d-9a9c-7258a2eb18cd',
    jornadaId: 'jornada_1_conquista',
    slotNumber: 1,
    contentVersion: '1.0.0',
    currentNodeId: 'node_desembarque',
    characterSheet: {
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
      inspiracao: 2,
      companheiros: {},
    },
    worldState: {
      reputacaoCasas: { Targaryen: 5 },
      flagsBorboleta: { desembarque_realizado: true },
      marcosConcluidos: ['2_ac_mesa_pintada'],
    },
    chapterCheckpoint: {
      atoId: 'ato_1',
      capituloTitulo: 'Ato I - A Mesa Pintada',
      timestamp: new Date().toISOString(),
    },
    modo: 'padrao',
    turnHistory: [
      {
        slotId: 'slot_1',
        userId: 'd5f86911-0f14-497d-9a9c-7258a2eb18cd',
        turnNumber: 1,
        nodeId: 'node_inicio',
        choiceMade: 'Convocar vassalos',
        stateDelta: {},
        timestamp: new Date().toISOString(),
      },
      {
        slotId: 'slot_1',
        userId: 'd5f86911-0f14-497d-9a9c-7258a2eb18cd',
        turnNumber: 2,
        nodeId: 'node_desembarque',
        choiceMade: 'Construir forte provisório',
        stateDelta: { honra: 1 },
        timestamp: new Date().toISOString(),
      },
    ],
  };

  it('deve salvar e carregar um slot de save com validação Zod', async () => {
    const res = await salvarSlot(mockSlot);
    expect(res.sucesso).toBe(true);

    const carregado = await obterSlot(mockSlot.userId, mockSlot.jornadaId, 1);
    expect(carregado).toBeDefined();
    expect(carregado?.characterSheet.nome).toBe('Aegon I Targaryen');
    expect(carregado?.currentNodeId).toBe('node_desembarque');
  });

  it('deve listar os 3 slots da jornada (com slot 1 preenchido e slots 2 e 3 nulos)', async () => {
    const slots = await listarSlotsJornada(mockSlot.userId, mockSlot.jornadaId);
    expect(slots.length).toBe(3);
    expect(slots[0]).not.toBeNull();
    expect(slots[0]?.slotNumber).toBe(1);
    expect(slots[1]).toBeNull();
    expect(slots[2]).toBeNull();
  });

  it('deve desfazer o último turno com sucesso', async () => {
    const resDesfazer = await desfazerUltimoTurno(mockSlot.userId, mockSlot.jornadaId, 1);
    expect(resDesfazer.sucesso).toBe(true);
    expect(resDesfazer.slotAtualizado?.turnHistory.length).toBe(1);
    expect(resDesfazer.slotAtualizado?.currentNodeId).toBe('node_inicio');
  });

  it('deve exportar para JSON e importar de volta com integridade total', async () => {
    const jsonExportado = await exportarSave(mockSlot.userId, mockSlot.jornadaId, 1);
    expect(jsonExportado).toContain('Crônicas de Sangue e Gelo');
    expect(jsonExportado).toContain('Aegon I Targaryen');

    // Importar no Slot 2
    const importado = await importarSave(jsonExportado, mockSlot.userId, 2);
    expect(importado.slotNumber).toBe(2);
    expect(importado.characterSheet.nome).toBe('Aegon I Targaryen');

    // Verificar se Slot 2 agora existe
    const slot2 = await obterSlot(mockSlot.userId, mockSlot.jornadaId, 2);
    expect(slot2).toBeDefined();
    expect(slot2?.slotNumber).toBe(2);
  });
});
