import 'server-only';
import { createServerSideClient } from '@/lib/supabase/server';
import {
  SaveRepository,
  SaveSlot,
  TurnEvent,
  Result,
  AplicarTurnoParams,
} from './types';

export class SupabaseSaveRepository implements SaveRepository {
  private async getClient() {
    return createServerSideClient();
  }

  async obterSlot(userId: string, jornadaId: string, slotNumber: number): Promise<Result<SaveSlot>> {
    try {
      const supabase = await this.getClient();
      const { data, error } = await supabase
        .from('save_slots')
        .select('*')
        .eq('user_id', userId)
        .eq('jornada_id', jornadaId)
        .eq('slot_number', slotNumber)
        .single();

      if (error || !data) {
        return { ok: false, erro: 'NAO_ENCONTRADO', mensagem: error?.message || 'Slot não encontrado.' };
      }

      // Busca histórico de turnos
      const { data: turnos } = await supabase
        .from('turn_events')
        .select('*')
        .eq('slot_id', data.id)
        .order('turn_number', { ascending: true });

      const slot: SaveSlot = {
        id: data.id,
        userId: data.user_id,
        jornadaId: data.jornada_id,
        slotNumber: data.slot_number,
        contentVersion: data.content_version || '2.1.0',
        currentNodeId: data.current_node_id,
        characterSheet: data.character_sheet,
        worldState: data.world_state,
        chapterCheckpoint: data.chapter_checkpoint,
        versao: data.versao || 0,
        turnHistory: (turnos || []).map((t: any) => ({
          id: t.id,
          slotId: t.slot_id,
          userId: t.user_id,
          turnNumber: t.turn_number,
          nodeId: t.node_id,
          choiceMade: t.choice_made,
          stateDelta: t.state_delta,
          snapshotAntes: t.snapshot_antes || {},
          resultado: t.resultado || {},
          timestamp: t.timestamp,
        })),
        createdAt: data.created_at,
        updatedAt: data.updated_at,
      };

      return { ok: true, valor: slot };
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      return { ok: false, erro: 'BANCO', mensagem: msg };
    }
  }

  async obterSlotPorId(userId: string, slotId: string): Promise<Result<SaveSlot>> {
    try {
      const supabase = await this.getClient();
      const { data, error } = await supabase
        .from('save_slots')
        .select('*')
        .eq('id', slotId)
        .eq('user_id', userId)
        .single();

      if (error || !data) {
        return { ok: false, erro: 'NAO_ENCONTRADO', mensagem: error?.message || 'Slot não encontrado.' };
      }

      const { data: turnos } = await supabase
        .from('turn_events')
        .select('*')
        .eq('slot_id', slotId)
        .order('turn_number', { ascending: true });

      const slot: SaveSlot = {
        id: data.id,
        userId: data.user_id,
        jornadaId: data.jornada_id,
        slotNumber: data.slot_number,
        contentVersion: data.content_version || '2.1.0',
        currentNodeId: data.current_node_id,
        characterSheet: data.character_sheet,
        worldState: data.world_state,
        chapterCheckpoint: data.chapter_checkpoint,
        versao: data.versao || 0,
        turnHistory: (turnos || []).map((t: any) => ({
          id: t.id,
          slotId: t.slot_id,
          userId: t.user_id,
          turnNumber: t.turn_number,
          nodeId: t.node_id,
          choiceMade: t.choice_made,
          stateDelta: t.state_delta,
          snapshotAntes: t.snapshot_antes || {},
          resultado: t.resultado || {},
          timestamp: t.timestamp,
        })),
        createdAt: data.created_at,
        updatedAt: data.updated_at,
      };

      return { ok: true, valor: slot };
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      return { ok: false, erro: 'BANCO', mensagem: msg };
    }
  }

  async listarSlots(userId: string, jornadaId: string): Promise<Result<SaveSlot[]>> {
    try {
      const supabase = await this.getClient();
      const { data, error } = await supabase
        .from('save_slots')
        .select('*')
        .eq('user_id', userId)
        .eq('jornada_id', jornadaId)
        .order('slot_number', { ascending: true });

      if (error) {
        return { ok: false, erro: 'BANCO', mensagem: error.message };
      }

      const slots: SaveSlot[] = (data || []).map((d: any) => ({
        id: d.id,
        userId: d.user_id,
        jornadaId: d.jornada_id,
        slotNumber: d.slot_number,
        contentVersion: d.content_version || '2.1.0',
        currentNodeId: d.current_node_id,
        characterSheet: d.character_sheet,
        worldState: d.world_state,
        chapterCheckpoint: d.chapter_checkpoint,
        versao: d.versao || 0,
        turnHistory: [],
        createdAt: d.created_at,
        updatedAt: d.updated_at,
      }));

      return { ok: true, valor: slots };
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      return { ok: false, erro: 'BANCO', mensagem: msg };
    }
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
    try {
      const supabase = await this.getClient();
      const now = new Date().toISOString();
      const checkpoint = dados.chapterCheckpoint || {
        atoId: 'ato_1',
        capituloTitulo: 'Início',
        timestamp: now,
      };

      const payload = {
        user_id: dados.userId,
        jornada_id: dados.jornadaId,
        slot_number: dados.slotNumber,
        content_version: '2.1.0',
        current_node_id: dados.currentNodeId,
        character_sheet: dados.characterSheet,
        world_state: dados.worldState,
        chapter_checkpoint: checkpoint,
        versao: 0,
        updated_at: now,
      };

      const { data, error } = await supabase
        .from('save_slots')
        .insert(payload)
        .select('*')
        .single();

      if (error || !data) {
        return { ok: false, erro: 'BANCO', mensagem: error?.message || 'Falha ao criar slot.' };
      }

      const slot: SaveSlot = {
        id: data.id,
        userId: data.user_id,
        jornadaId: data.jornada_id,
        slotNumber: data.slot_number,
        contentVersion: data.content_version,
        currentNodeId: data.current_node_id,
        characterSheet: data.character_sheet,
        worldState: data.world_state,
        chapterCheckpoint: data.chapter_checkpoint,
        versao: data.versao,
        turnHistory: [],
        createdAt: data.created_at,
        updatedAt: data.updated_at,
      };

      return { ok: true, valor: slot };
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      return { ok: false, erro: 'BANCO', mensagem: msg };
    }
  }

  async aplicarTurno(params: AplicarTurnoParams): Promise<Result<SaveSlot>> {
    try {
      const supabase = await this.getClient();

      // Tenta RPC atômica caso a migração esteja aplicada
      const { data: rpcRes, error: rpcErr } = await supabase.rpc('aplicar_turno_atomico', {
        p_user_id: params.userId,
        p_slot_id: params.slotId,
        p_versao_esperada: params.versaoEsperada,
        p_proximo_node_id: params.proximoNodeId,
        p_character_sheet: params.characterSheet,
        p_world_state: params.worldState,
        p_choice_made: params.choiceMade,
        p_turn_number: params.turnNumber,
        p_state_delta: params.stateDelta,
        p_snapshot_antes: params.snapshotAntes,
        p_resultado: params.resultado,
      });

      if (!rpcErr && rpcRes) {
        if (!rpcRes.sucesso) {
          if (rpcRes.erro === 'CONFLITO_VERSAO') {
            return {
              ok: false,
              erro: 'CONFLITO_VERSAO',
              mensagem: `Conflito de versão: esperado ${params.versaoEsperada}, banco tem ${rpcRes.versao_atual}.`,
            };
          }
          return { ok: false, erro: rpcRes.erro || 'BANCO', mensagem: 'Falha na aplicação atômica do turno.' };
        }
        return this.obterSlotPorId(params.userId, params.slotId);
      }

      // Fallback transacional em 2 etapas se RPC não estiver provisionada
      const { data: slotAtual, error: fetchErr } = await supabase
        .from('save_slots')
        .select('versao')
        .eq('id', params.slotId)
        .eq('user_id', params.userId)
        .single();

      if (fetchErr || !slotAtual) {
        return { ok: false, erro: 'NAO_ENCONTRADO', mensagem: 'Slot não encontrado.' };
      }

      if (slotAtual.versao !== params.versaoEsperada) {
        return {
          ok: false,
          erro: 'CONFLITO_VERSAO',
          mensagem: `Conflito de versão: esperado ${params.versaoEsperada}, atual ${slotAtual.versao}.`,
        };
      }

      const { error: updateErr } = await supabase
        .from('save_slots')
        .update({
          current_node_id: params.proximoNodeId,
          character_sheet: params.characterSheet,
          world_state: params.worldState,
          versao: slotAtual.versao + 1,
          updated_at: new Date().toISOString(),
        })
        .eq('id', params.slotId)
        .eq('user_id', params.userId)
        .eq('versao', params.versaoEsperada);

      if (updateErr) {
        return { ok: false, erro: 'BANCO', mensagem: updateErr.message };
      }

      // Gravação append-only
      await supabase.from('turn_events').insert({
        slot_id: params.slotId,
        user_id: params.userId,
        turn_number: params.turnNumber,
        node_id: params.proximoNodeId,
        choice_made: params.choiceMade,
        state_delta: params.stateDelta,
        snapshot_antes: params.snapshotAntes,
        resultado: params.resultado,
        timestamp: new Date().toISOString(),
      });

      return this.obterSlotPorId(params.userId, params.slotId);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      return { ok: false, erro: 'BANCO', mensagem: msg };
    }
  }

  async desfazerUltimoTurno(userId: string, slotId: string): Promise<Result<SaveSlot>> {
    try {
      const supabase = await this.getClient();
      const { data: turnos, error: fetchErr } = await supabase
        .from('turn_events')
        .select('*')
        .eq('slot_id', slotId)
        .eq('user_id', userId)
        .order('turn_number', { ascending: false })
        .limit(1);

      if (fetchErr || !turnos || turnos.length === 0) {
        return { ok: false, erro: 'VALIDACAO', mensagem: 'Nenhum turno anterior para desfazer.' };
      }

      const ultimoTurno = turnos[0];
      const snapshot = ultimoTurno.snapshot_antes;
      if (!snapshot || !snapshot.ficha || !snapshot.worldState) {
        return { ok: false, erro: 'VALIDACAO', mensagem: 'Snapshot anterior inválido ou ausente.' };
      }

      const { data: slotAtual } = await supabase
        .from('save_slots')
        .select('versao')
        .eq('id', slotId)
        .single();

      const novaVersao = (slotAtual?.versao || 0) + 1;

      const { error: updateErr } = await supabase
        .from('save_slots')
        .update({
          current_node_id: snapshot.nodeId,
          character_sheet: snapshot.ficha,
          world_state: snapshot.worldState,
          versao: novaVersao,
          updated_at: new Date().toISOString(),
        })
        .eq('id', slotId)
        .eq('user_id', userId);

      if (updateErr) {
        return { ok: false, erro: 'BANCO', mensagem: updateErr.message };
      }

      return this.obterSlotPorId(userId, slotId);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      return { ok: false, erro: 'BANCO', mensagem: msg };
    }
  }

  async excluirSlot(userId: string, slotId: string): Promise<Result<boolean>> {
    try {
      const supabase = await this.getClient();
      const { error } = await supabase
        .from('save_slots')
        .delete()
        .eq('id', slotId)
        .eq('user_id', userId);

      if (error) {
        return { ok: false, erro: 'BANCO', mensagem: error.message };
      }
      return { ok: true, valor: true };
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      return { ok: false, erro: 'BANCO', mensagem: msg };
    }
  }
}
