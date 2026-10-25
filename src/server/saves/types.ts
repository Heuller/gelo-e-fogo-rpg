import 'server-only';
import { FichaPersonagem, WorldState, DeltaEstado } from '@/server/engine/rpgEngine';

export type ErroSave =
  | 'NAO_AUTENTICADO'
  | 'NAO_ENCONTRADO'
  | 'CONFLITO_VERSAO'
  | 'VALIDACAO'
  | 'BANCO';

export type Result<T, E = ErroSave> =
  | { ok: true; valor: T }
  | { ok: false; erro: E; mensagem: string };

export interface ChapterCheckpoint {
  atoId: string;
  capituloTitulo: string;
  timestamp: string;
  dataFiccao?: string;
  snapshotFicha?: FichaPersonagem;
}

export interface TurnSnapshot {
  ficha: FichaPersonagem;
  worldState: WorldState;
  nodeId: string;
}

export interface TurnEvent {
  id?: string;
  slotId: string;
  userId: string;
  turnNumber: number;
  nodeId: string;
  choiceMade: string;
  stateDelta: DeltaEstado;
  snapshotAntes: TurnSnapshot;
  resultado: Record<string, unknown>;
  timestamp: string;
  tipo?: 'escolha' | 'desfazer' | 'rerrolar' | 'tentativa_livre';
  referenciaTurnNumber?: number;
}

export interface SaveSlot {
  id: string;
  userId: string;
  jornadaId: string;
  slotNumber: number;
  contentVersion: string;
  currentNodeId: string;
  characterSheet: FichaPersonagem;
  worldState: WorldState;
  chapterCheckpoint: ChapterCheckpoint;
  versao: number;
  turnHistory: TurnEvent[];
  modo?: 'cronica' | 'padrao' | 'juramento';
  createdAt: string;
  updatedAt: string;
}

export interface AplicarTurnoParams {
  userId: string;
  slotId: string;
  versaoEsperada: number;
  proximoNodeId: string;
  characterSheet: FichaPersonagem;
  worldState: WorldState;
  choiceMade: string;
  turnNumber: number;
  stateDelta: DeltaEstado;
  snapshotAntes: TurnSnapshot;
  resultado: Record<string, unknown>;
}

export interface SaveRepository {
  obterSlot(userId: string, jornadaId: string, slotNumber: number): Promise<Result<SaveSlot>>;
  obterSlotPorId(userId: string, slotId: string): Promise<Result<SaveSlot>>;
  listarSlots(userId: string, jornadaId: string): Promise<Result<SaveSlot[]>>;
  criarSlot(slot: {
    userId: string;
    jornadaId: string;
    slotNumber: number;
    currentNodeId: string;
    characterSheet: FichaPersonagem;
    worldState: WorldState;
    chapterCheckpoint?: ChapterCheckpoint;
    modo?: 'cronica' | 'padrao' | 'juramento';
  }): Promise<Result<SaveSlot>>;
  aplicarTurno(params: AplicarTurnoParams): Promise<Result<SaveSlot>>;
  desfazerUltimoTurno(userId: string, slotId: string, versaoEsperada?: number): Promise<Result<SaveSlot>>;
  excluirSlot(userId: string, slotId: string): Promise<Result<boolean>>;
}
