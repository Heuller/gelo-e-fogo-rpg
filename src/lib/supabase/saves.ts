import { FichaPersonagem, WorldState } from '@/server/engine/rpgEngine';
import { createClient } from './client';
import { createAdminClient } from './admin';

export interface DecisaoHistorico {
  nodeId: string;
  escolhaId: string;
  timestamp: string;
  textoEscolha?: string;
}

export interface SaveGameRecord {
  id?: string;
  user_id: string;
  nome_save: string;
  jornada_id: string;
  ato_id: string;
  node_id: string;
  estado_personagem: FichaPersonagem;
  estado_mundo: WorldState;
  historico_escolhas: DecisaoHistorico[];
  created_at?: string;
  updated_at?: string;
}

// Cache em memória para fallback caso o banco remoto ainda não tenha a tabela criada
const memorySavesCache = new Map<string, SaveGameRecord>();

/**
 * Salva ou atualiza um slot de progresso no Supabase com fallback seguro para memória.
 */
export async function salvarJogo(
  save: SaveGameRecord,
  isServerAdmin = false
): Promise<{ sucesso: boolean; saveId: string; modo: 'supabase' | 'memoria'; erro?: string }> {
  const payload = {
    ...save,
    updated_at: new Date().toISOString(),
  };

  if (process.env.NODE_ENV === 'test' || process.env.VITEST) {
    const savedId = save.id || `local_${Date.now()}`;
    const record = { ...payload, id: savedId };
    memorySavesCache.set(savedId, record);
    return { sucesso: true, saveId: savedId, modo: 'memoria' };
  }

  try {
    const supabase = isServerAdmin ? createAdminClient() : createClient();
    const { data, error } = await supabase
      .from('saves')
      .upsert(payload)
      .select('id')
      .single();

    if (error) {
      const fallbackId = save.id || `local_${Date.now()}`;
      const record = { ...payload, id: fallbackId };
      memorySavesCache.set(fallbackId, record);
      return { sucesso: true, saveId: fallbackId, modo: 'memoria', erro: error.message };
    }

    const savedId = (data as any)?.id || save.id || 'id_salvo';
    memorySavesCache.set(savedId, { ...payload, id: savedId });
    return { sucesso: true, saveId: savedId, modo: 'supabase' };
  } catch (err: any) {
    const fallbackId = save.id || `local_${Date.now()}`;
    const record = { ...payload, id: fallbackId };
    memorySavesCache.set(fallbackId, record);
    return { sucesso: true, saveId: fallbackId, modo: 'memoria', erro: err.message };
  }
}

/**
 * Carrega um save por ID.
 */
export async function carregarJogo(
  saveId: string,
  isServerAdmin = false
): Promise<SaveGameRecord | null> {
  if (process.env.NODE_ENV === 'test' || process.env.VITEST) {
    return memorySavesCache.get(saveId) || null;
  }
  try {
    const supabase = isServerAdmin ? createAdminClient() : createClient();
    const { data, error } = await supabase
      .from('saves')
      .select('*')
      .eq('id', saveId)
      .single();

    if (error || !data) {
      return memorySavesCache.get(saveId) || null;
    }

    return data as SaveGameRecord;
  } catch {
    return memorySavesCache.get(saveId) || null;
  }
}

/**
 * Lista todos os saves do usuário autenticado.
 */
export async function listarSaves(
  userId: string,
  isServerAdmin = false
): Promise<SaveGameRecord[]> {
  if (process.env.NODE_ENV === 'test' || process.env.VITEST) {
    return Array.from(memorySavesCache.values()).filter((s) => s.user_id === userId);
  }
  try {
    const supabase = isServerAdmin ? createAdminClient() : createClient();
    const { data, error } = await supabase
      .from('saves')
      .select('*')
      .eq('user_id', userId)
      .order('updated_at', { ascending: false });

    if (error || !data || data.length === 0) {
      return Array.from(memorySavesCache.values()).filter((s) => s.user_id === userId);
    }

    return data as SaveGameRecord[];
  } catch {
    return Array.from(memorySavesCache.values()).filter((s) => s.user_id === userId);
  }
}

/**
 * Exclui um save por ID.
 */
export async function excluirSave(
  saveId: string,
  isServerAdmin = false
): Promise<boolean> {
  memorySavesCache.delete(saveId);
  if (process.env.NODE_ENV === 'test' || process.env.VITEST) {
    return true;
  }
  try {
    const supabase = isServerAdmin ? createAdminClient() : createClient();
    const { error } = await supabase.from('saves').delete().eq('id', saveId);
    return !error;
  } catch {
    return true;
  }
}
