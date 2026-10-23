import 'server-only';
import { z } from 'zod';
import {
  FichaPersonagemSchema,
  WorldStateSchema,
  DeltaEstadoSchema,
} from '@/server/engine/rpgEngine';

export const ChapterCheckpointSchema = z
  .object({
    atoId: z.string(),
    capituloTitulo: z.string(),
    timestamp: z.string(),
    dataFiccao: z.string().optional(),
    snapshotFicha: FichaPersonagemSchema.optional(),
  })
  .strict();

export const TurnSnapshotSchema = z
  .object({
    ficha: FichaPersonagemSchema,
    worldState: WorldStateSchema,
    nodeId: z.string(),
  })
  .strict();

export const TurnEventSchema = z
  .object({
    id: z.string().optional(),
    slotId: z.string(),
    userId: z.string(),
    turnNumber: z.number().int().min(1),
    nodeId: z.string(),
    choiceMade: z.string(),
    stateDelta: DeltaEstadoSchema,
    snapshotAntes: TurnSnapshotSchema,
    resultado: z.record(z.unknown()),
    timestamp: z.string(),
  })
  .strict();

export const SaveSlotSchema = z
  .object({
    id: z.string(),
    userId: z.string(),
    jornadaId: z.string(),
    slotNumber: z.number().int().min(1).max(3),
    contentVersion: z.string().default('2.1.0'),
    currentNodeId: z.string(),
    characterSheet: FichaPersonagemSchema,
    worldState: WorldStateSchema,
    chapterCheckpoint: ChapterCheckpointSchema,
    versao: z.number().int().min(0).default(0),
    turnHistory: z.array(TurnEventSchema).default([]),
    createdAt: z.string(),
    updatedAt: z.string(),
  })
  .strict();

export const ExecutarTurnoInputSchema = z
  .object({
    userId: z.string().uuid(),
    slotId: z.string(),
    escolhaId: z.string(),
    versaoEsperada: z.number().int().min(0),
    acaoLivre: z.string().max(500).optional(),
    usarIA: z.boolean().default(false),
  })
  .strict();

export type ExecutarTurnoInput = z.infer<typeof ExecutarTurnoInputSchema>;
