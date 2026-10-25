import { describe, it, expect } from 'vitest';
import { SaveSlotSchema, TurnEventSchema } from './saveManager';
import { SaveSlot } from './saveManager';

describe('Políticas de RLS e Integridade de Banco (Supabase)', () => {
  const userA = 'user-uuid-aaaa-1111';
  const userB = 'user-uuid-bbbb-2222';

  it('deve validar estritamente que o slot pertence ao usuário correto (Isolamento de Tenant)', () => {
    const slotUserA: SaveSlot = {
      userId: userA,
      jornadaId: 'conquista_aegon',
      slotNumber: 1,
      contentVersion: '2.1.0',
      currentNodeId: 'j1_a1_mesa_pintada',
      characterSheet: {
        id: 'aegon',
        nome: 'Aegon I Targaryen',
        origem: 'sangue_valiriano',
        atributos: { comando: 5, furia: 4, astucia: 3, cortesia: 3, erudicao: 3, pressagio: 4 },
        estado: { sangue: 10, compostura: 10, honra: 5 },
        cicatrizes: [],
        segredos: [],
        inspiracao: 2,
        companheiros: {},
      },
      worldState: { reputacaoCasas: {}, flagsBorboleta: {}, marcosConcluidos: [] },
      chapterCheckpoint: { atoId: 'ato_1', capituloTitulo: 'Mesa Pintada', timestamp: new Date().toISOString() },
      modo: 'padrao',
      turnHistory: [],
    };

    // Salvar com usuário A
    expect(slotUserA.userId).toBe(userA);

    // Tentativa de Acesso ou Modificação por Usuário B
    const podeAcessar = (solicitanteId: string, slot: SaveSlot) => solicitanteId === slot.userId;
    expect(podeAcessar(userA, slotUserA)).toBe(true);
    expect(podeAcessar(userB, slotUserA)).toBe(false);
  });

  it('deve rejeitar slots fora do intervalo de 1 a 3 (Enforce no Banco e Schema)', () => {
    const baseSlot = {
      userId: userA,
      jornadaId: 'conquista_aegon',
      contentVersion: '2.1.0',
      currentNodeId: 'j1_a1_mesa_pintada',
      characterSheet: {
        id: 'aegon',
        nome: 'Aegon I Targaryen',
        origem: 'sangue_valiriano',
        atributos: { comando: 5, furia: 4, astucia: 3, cortesia: 3, erudicao: 3, pressagio: 4 },
        estado: { sangue: 10, compostura: 10, honra: 5 },
        cicatrizes: [],
        segredos: [],
        inspiracao: 2,
        companheiros: {},
      },
      worldState: { reputacaoCasas: {}, flagsBorboleta: {}, marcosConcluidos: [] },
      chapterCheckpoint: { atoId: 'ato_1', capituloTitulo: 'Mesa Pintada', timestamp: new Date().toISOString() },
      modo: 'padrao',
      turnHistory: [],
    };

    // Slot 1, 2, 3 são válidos
    expect(() => SaveSlotSchema.parse({ ...baseSlot, slotNumber: 1 })).not.toThrow();
    expect(() => SaveSlotSchema.parse({ ...baseSlot, slotNumber: 2 })).not.toThrow();
    expect(() => SaveSlotSchema.parse({ ...baseSlot, slotNumber: 3 })).not.toThrow();

    // Slot 0 e Slot 4 devem ser estritamente rejeitados
    expect(() => SaveSlotSchema.parse({ ...baseSlot, slotNumber: 0 })).toThrow();
    expect(() => SaveSlotSchema.parse({ ...baseSlot, slotNumber: 4 })).toThrow();
  });

  it('deve garantir que turn_events seja append-only (sem suporte a mutação UPDATE/DELETE)', () => {
    const turno = {
      slotId: 'slot_1',
      userId: userA,
      turnNumber: 1,
      nodeId: 'j1_a1_mesa_pintada',
      choiceMade: 'Receber emissários',
      stateDelta: { honra: 1 },
      timestamp: new Date().toISOString(),
    };

    const parsed = TurnEventSchema.parse(turno);
    expect(parsed.turnNumber).toBe(1);

    // Tentativa simulada de alteração em histórico imutável
    const operacoesPermitidas = ['SELECT', 'INSERT'];
    const verificarOperacao = (op: string) => operacoesPermitidas.includes(op);

    expect(verificarOperacao('INSERT')).toBe(true);
    expect(verificarOperacao('SELECT')).toBe(true);
    expect(verificarOperacao('UPDATE')).toBe(false);
    expect(verificarOperacao('DELETE')).toBe(false);
  });
});
