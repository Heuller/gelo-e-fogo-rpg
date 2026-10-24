import 'server-only';
import { SaveRepository, AplicarTurnoParams, ChapterCheckpoint } from './types';
import { FichaPersonagem, WorldState } from '@/server/engine/rpgEngine';
import { MemoriaSaveRepository } from './memoria';
import { SupabaseSaveRepository } from './repository';

export * from './types';
export * from './schemas';
export { MemoriaSaveRepository } from './memoria';
export { SupabaseSaveRepository } from './repository';

let activeRepository: SaveRepository | null = null;

export function getSaveRepository(): SaveRepository {
  if (activeRepository) return activeRepository;

  if (process.env.NODE_ENV === 'test' || process.env.VITEST) {
    activeRepository = new MemoriaSaveRepository();
  } else {
    activeRepository = new SupabaseSaveRepository();
  }
  return activeRepository;
}

export function setSaveRepositoryForTesting(repo: SaveRepository | null) {
  activeRepository = repo;
}

export async function obterSlot(userId: string, jornadaId: string, slotNumber: number) {
  return getSaveRepository().obterSlot(userId, jornadaId, slotNumber);
}

export async function obterSlotPorId(userId: string, slotId: string) {
  return getSaveRepository().obterSlotPorId(userId, slotId);
}

export async function listarSlots(userId: string, jornadaId: string) {
  return getSaveRepository().listarSlots(userId, jornadaId);
}

export async function criarSlot(dados: {
  userId: string;
  jornadaId: string;
  slotNumber: number;
  currentNodeId: string;
  characterSheet: FichaPersonagem;
  worldState: WorldState;
  chapterCheckpoint?: ChapterCheckpoint;
}) {
  return getSaveRepository().criarSlot(dados);
}

export async function aplicarTurno(params: AplicarTurnoParams) {
  return getSaveRepository().aplicarTurno(params);
}

export async function desfazerUltimoTurno(userId: string, slotId: string) {
  return getSaveRepository().desfazerUltimoTurno(userId, slotId);
}

export async function excluirSlot(userId: string, slotId: string) {
  return getSaveRepository().excluirSlot(userId, slotId);
}
