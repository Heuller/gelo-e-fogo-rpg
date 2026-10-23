import 'server-only';
import {
  SaveRepository,
  SaveSlot,
  TurnEvent,
  Result,
  AplicarTurnoParams,
} from './types';

export class MemoriaSaveRepository implements SaveRepository {
  private slots = new Map<string, SaveSlot>();
  private events = new Map<string, TurnEvent[]>();

  private getKey(userId: string, slotId: string): string {
    return `${userId}:${slotId}`;
  }

  private getSlotByNumber(userId: string, jornadaId: string, slotNumber: number): SaveSlot | undefined {
    for (const slot of this.slots.values()) {
      if (slot.userId === userId && slot.jornadaId === jornadaId && slot.slotNumber === slotNumber) {
        return slot;
      }
    }
    return undefined;
  }

  async obterSlot(userId: string, jornadaId: string, slotNumber: number): Promise<Result<SaveSlot>> {
    const slot = this.getSlotByNumber(userId, jornadaId, slotNumber);
    if (!slot) {
      return { ok: false, erro: 'NAO_ENCONTRADO', mensagem: 'Slot de save não encontrado.' };
    }
    return { ok: true, valor: JSON.parse(JSON.stringify(slot)) };
  }

  async obterSlotPorId(userId: string, slotId: string): Promise<Result<SaveSlot>> {
    const key = this.getKey(userId, slotId);
    const slot = this.slots.get(key);
    if (!slot) {
      return { ok: false, erro: 'NAO_ENCONTRADO', mensagem: 'Slot de save não encontrado.' };
    }
    return { ok: true, valor: JSON.parse(JSON.stringify(slot)) };
  }

  async listarSlots(userId: string, jornadaId: string): Promise<Result<SaveSlot[]>> {
    const resultado: SaveSlot[] = [];
    for (const slot of this.slots.values()) {
      if (slot.userId === userId && slot.jornadaId === jornadaId) {
        resultado.push(JSON.parse(JSON.stringify(slot)));
      }
    }
    resultado.sort((a, b) => a.slotNumber - b.slotNumber);
    return { ok: true, valor: resultado };
  }

  async criarSlot(dados: {
    userId: string;
    jornadaId: string;
    slotNumber: number;
    currentNodeId: string;
    characterSheet: SaveSlot['characterSheet'];
    worldState: SaveSlot['worldState'];
    chapterCheckpoint?: SaveSlot['chapterCheckpoint'];
  }): Promise<Result<SaveSlot>> {
    const id = `slot_${dados.jornadaId}_${dados.slotNumber}_${Date.now()}`;
    const now = new Date().toISOString();
    const novoSlot: SaveSlot = {
      id,
      userId: dados.userId,
      jornadaId: dados.jornadaId,
      slotNumber: dados.slotNumber,
      contentVersion: '2.1.0',
      currentNodeId: dados.currentNodeId,
      characterSheet: JSON.parse(JSON.stringify(dados.characterSheet)),
      worldState: JSON.parse(JSON.stringify(dados.worldState)),
      chapterCheckpoint: dados.chapterCheckpoint || {
        atoId: 'ato_1',
        capituloTitulo: 'Início',
        timestamp: now,
      },
      versao: 0,
      turnHistory: [],
      createdAt: now,
      updatedAt: now,
    };

    const key = this.getKey(dados.userId, id);
    this.slots.set(key, novoSlot);
    this.events.set(id, []);

    return { ok: true, valor: JSON.parse(JSON.stringify(novoSlot)) };
  }

  async aplicarTurno(params: AplicarTurnoParams): Promise<Result<SaveSlot>> {
    const key = this.getKey(params.userId, params.slotId);
    const slot = this.slots.get(key);
    if (!slot) {
      return { ok: false, erro: 'NAO_ENCONTRADO', mensagem: 'Slot de save não encontrado.' };
    }

    if (slot.versao !== params.versaoEsperada) {
      return {
        ok: false,
        erro: 'CONFLITO_VERSAO',
        mensagem: `Conflito de versão no save: esperado ${params.versaoEsperada}, atual ${slot.versao}.`,
      };
    }

    const now = new Date().toISOString();
    const novoEvento: TurnEvent = {
      id: `evt_${Date.now()}_${params.turnNumber}`,
      slotId: params.slotId,
      userId: params.userId,
      turnNumber: params.turnNumber,
      nodeId: params.proximoNodeId,
      choiceMade: params.choiceMade,
      stateDelta: JSON.parse(JSON.stringify(params.stateDelta)),
      snapshotAntes: JSON.parse(JSON.stringify(params.snapshotAntes)),
      resultado: JSON.parse(JSON.stringify(params.resultado)),
      timestamp: now,
    };

    const historico = this.events.get(params.slotId) || [];
    historico.push(novoEvento);
    this.events.set(params.slotId, historico);

    slot.currentNodeId = params.proximoNodeId;
    slot.characterSheet = JSON.parse(JSON.stringify(params.characterSheet));
    slot.worldState = JSON.parse(JSON.stringify(params.worldState));
    slot.versao += 1;
    slot.updatedAt = now;
    slot.turnHistory = [...historico];

    return { ok: true, valor: JSON.parse(JSON.stringify(slot)) };
  }

  async desfazerUltimoTurno(userId: string, slotId: string): Promise<Result<SaveSlot>> {
    const key = this.getKey(userId, slotId);
    const slot = this.slots.get(key);
    if (!slot) {
      return { ok: false, erro: 'NAO_ENCONTRADO', mensagem: 'Slot de save não encontrado.' };
    }

    const historico = this.events.get(slotId) || [];
    if (historico.length === 0) {
      return { ok: false, erro: 'VALIDACAO', mensagem: 'Não há turnos anteriores para desfazer.' };
    }

    const ultimoEvento = historico.pop()!;
    slot.characterSheet = JSON.parse(JSON.stringify(ultimoEvento.snapshotAntes.ficha));
    slot.worldState = JSON.parse(JSON.stringify(ultimoEvento.snapshotAntes.worldState));
    slot.currentNodeId = ultimoEvento.snapshotAntes.nodeId;
    slot.versao += 1;
    slot.updatedAt = new Date().toISOString();
    slot.turnHistory = [...historico];

    return { ok: true, valor: JSON.parse(JSON.stringify(slot)) };
  }

  async excluirSlot(userId: string, slotId: string): Promise<Result<boolean>> {
    const key = this.getKey(userId, slotId);
    if (!this.slots.has(key)) {
      return { ok: false, erro: 'NAO_ENCONTRADO', mensagem: 'Slot não encontrado.' };
    }
    this.slots.delete(key);
    this.events.delete(slotId);
    return { ok: true, valor: true };
  }
}
