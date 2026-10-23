'use server';

import { requireOwner } from '@/server/auth/requireOwner';
import { getSaveRepository, SaveSlot } from '@/server/saves';
import { FichaPersonagem, WorldState } from '@/server/engine/rpgEngine';
import { normalizarIdJornada } from '@/server/data/journeys';
import { getCatalogoPublico, CatalogoJornadaPublico, obterJornada } from '@/server/journeys/registry';

async function autenticarDono() {
  const auth = await requireOwner(true);
  if (!auth.authorized || !auth.user) {
    throw new Error('Acesso negado: apenas o proprietário da crônica possui acesso aos slots.');
  }
  return auth.user;
}

export async function getCatalogoJornadasAction(): Promise<CatalogoJornadaPublico[]> {
  return getCatalogoPublico();
}

export async function listarSlotsAction(jornadaId: string): Promise<SaveSlot[]> {
  const user = await autenticarDono();
  const jId = normalizarIdJornada(jornadaId);
  const repo = getSaveRepository();
  const res = await repo.listarSlots(user.id, jId);
  if (!res.ok) {
    return [];
  }
  return res.valor;
}

export async function obterSlotAction(jornadaId: string, slotNumber: number): Promise<SaveSlot | null> {
  const user = await autenticarDono();
  const jId = normalizarIdJornada(jornadaId);
  const repo = getSaveRepository();
  const res = await repo.obterSlot(user.id, jId, slotNumber);
  if (!res.ok) {
    return null;
  }
  return res.valor;
}

export async function criarNovoJogoAction(params: {
  jornadaId: string;
  slotNumber: number;
  characterSheet: FichaPersonagem;
  currentNodeId?: string;
  capituloTitulo?: string;
  dataFiccao?: string;
}): Promise<SaveSlot> {
  const user = await autenticarDono();
  const jId = normalizarIdJornada(params.jornadaId);
  const def = obterJornada(jId);
  const repo = getSaveRepository();

  const nodeId = params.currentNodeId || def?.startNodeId || 'j1_a1_mesa_pintada';
  const capituloTitulo = params.capituloTitulo || `${def?.titulo || 'Ato I'} - Início`;

  const res = await repo.criarSlot({
    userId: user.id,
    jornadaId: jId,
    slotNumber: params.slotNumber,
    currentNodeId: nodeId,
    characterSheet: params.characterSheet,
    worldState: {
      reputacaoCasas: { [jId]: 10 },
      flagsBorboleta: { jogo_iniciado: true },
      marcosConcluidos: ['inicio_campanha'],
    },
    chapterCheckpoint: {
      atoId: 'ato_1',
      capituloTitulo,
      timestamp: new Date().toISOString(),
      dataFiccao: params.dataFiccao || def?.epoca,
      snapshotFicha: params.characterSheet,
    },
  });

  if (!res.ok) {
    throw new Error(`Falha ao criar crônica: ${res.mensagem}`);
  }

  return res.valor;
}

export async function desfazerTurnoSlotAction(jornadaId: string, slotNumber: number): Promise<SaveSlot> {
  const user = await autenticarDono();
  const jId = normalizarIdJornada(jornadaId);
  const repo = getSaveRepository();

  const slotRes = await repo.obterSlot(user.id, jId, slotNumber);
  if (!slotRes.ok) {
    throw new Error('Slot não encontrado para desfazer.');
  }

  const res = await repo.desfazerUltimoTurno(user.id, slotRes.valor.id);
  if (!res.ok) {
    throw new Error(res.mensagem);
  }

  return res.valor;
}

export async function exportarSaveAction(jornadaId: string, slotNumber: number): Promise<string> {
  const user = await autenticarDono();
  const jId = normalizarIdJornada(jornadaId);
  const repo = getSaveRepository();

  const res = await repo.obterSlot(user.id, jId, slotNumber);
  if (!res.ok) {
    throw new Error('Slot não encontrado para exportação.');
  }

  return JSON.stringify(
    {
      version: '2.1.0',
      exportedAt: new Date().toISOString(),
      game: 'Crônicas de Sangue e Gelo',
      slot: res.valor,
    },
    null,
    2
  );
}

export async function importarSaveAction(conteudoJson: string, slotNumber: number): Promise<SaveSlot> {
  const user = await autenticarDono();
  const parsed = JSON.parse(conteudoJson);
  const slotData = parsed.slot || parsed;

  const repo = getSaveRepository();
  const jId = normalizarIdJornada(slotData.jornadaId);

  // Exclui slot existente se houver
  const existente = await repo.obterSlot(user.id, jId, slotNumber);
  if (existente.ok) {
    await repo.excluirSlot(user.id, existente.valor.id);
  }

  const res = await repo.criarSlot({
    userId: user.id,
    jornadaId: jId,
    slotNumber,
    currentNodeId: slotData.currentNodeId,
    characterSheet: slotData.characterSheet,
    worldState: slotData.worldState,
    chapterCheckpoint: slotData.chapterCheckpoint,
  });

  if (!res.ok) {
    throw new Error(`Falha ao importar save: ${res.mensagem}`);
  }

  return res.valor;
}

export async function excluirSlotAction(jornadaId: string, slotNumber: number): Promise<boolean> {
  const user = await autenticarDono();
  const jId = normalizarIdJornada(jornadaId);
  const repo = getSaveRepository();

  const existente = await repo.obterSlot(user.id, jId, slotNumber);
  if (!existente.ok) {
    return true;
  }

  const res = await repo.excluirSlot(user.id, existente.valor.id);
  return res.ok;
}
