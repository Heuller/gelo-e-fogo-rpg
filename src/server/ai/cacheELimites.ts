import 'server-only';
import crypto from 'crypto';
import { WorldState, ResultadoRolagem } from '@/server/engine/rpgEngine';
import { VozExtra } from './geminiMaster';
import { createServerSideClient } from '@/lib/supabase/server';

export interface CacheIAItem {
  textoEnriquecido: string;
  vozesExtras: VozExtra[];
  expiresAt: number;
}

const memoryCache = new Map<string, CacheIAItem>();
const memoryUsage = new Map<string, { count: number; date: string }>();

export function limparCacheParaTestes(): void {
  memoryCache.clear();
  memoryUsage.clear();
}

/**
 * Gera uma chave estável e determinística para o cache de IA.
 * Combina jornada, nó e um hash das flags do mundo, marcos concluídos e resultado de rolagem.
 */
export function gerarChaveCacheIA(
  jornadaId: string,
  nodeId: string,
  worldState: WorldState,
  resultadoDado: ResultadoRolagem | null
): string {
  const flagsOrdenadas = Object.entries(worldState.flagsBorboleta || {})
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([k, v]) => `${k}:${v}`)
    .join(',');
  const marcosOrdenados = [...(worldState.marcosConcluidos || [])].sort().join(',');
  const dadoStr = resultadoDado
    ? `${resultadoDado.resultado}_${resultadoDado.margem}_${resultadoDado.total}`
    : 'SEM_DADO';

  const payload = `${flagsOrdenadas}|${marcosOrdenados}|${dadoStr}`;
  const hash = crypto.createHash('sha256').update(payload).digest('hex').slice(0, 16);
  return `${jornadaId}:${nodeId}:${hash}`;
}

/**
 * Consulta o cache persistente (memória ou Supabase).
 */
export async function obterCacheIA(chave: string): Promise<{ textoEnriquecido: string; vozesExtras: VozExtra[] } | null> {
  const agora = Date.now();
  const emMemoria = memoryCache.get(chave);
  if (emMemoria && emMemoria.expiresAt > agora) {
    return {
      textoEnriquecido: emMemoria.textoEnriquecido,
      vozesExtras: emMemoria.vozesExtras,
    };
  }

  // Se estiver em modo de teste ou ambiente local sem Supabase, retorna memória
  if (process.env.NODE_ENV === 'test' || process.env.VITEST || !process.env.NEXT_PUBLIC_SUPABASE_URL) {
    return null;
  }

  try {
    const supabase = await createServerSideClient();
    const { data, error } = await supabase
      .from('ia_cache')
      .select('texto_enriquecido, vozes_extras, expires_at')
      .eq('chave', chave)
      .gt('expires_at', new Date().toISOString())
      .single();

    if (error || !data) return null;

    const vozes = Array.isArray(data.vozes_extras) ? (data.vozes_extras as VozExtra[]) : [];
    const item: CacheIAItem = {
      textoEnriquecido: data.texto_enriquecido,
      vozesExtras: vozes,
      expiresAt: new Date(data.expires_at).getTime(),
    };
    memoryCache.set(chave, item);

    return {
      textoEnriquecido: item.textoEnriquecido,
      vozesExtras: item.vozesExtras,
    };
  } catch {
    return null;
  }
}

/**
 * Grava o resultado no cache persistente.
 */
export async function salvarCacheIA(
  chave: string,
  jornadaId: string,
  nodeId: string,
  textoEnriquecido: string,
  vozesExtras: VozExtra[],
  ttlSegundos = 7 * 86400
): Promise<void> {
  const agora = Date.now();
  const expiresAtMs = agora + ttlSegundos * 1000;
  const item: CacheIAItem = {
    textoEnriquecido,
    vozesExtras,
    expiresAt: expiresAtMs,
  };
  memoryCache.set(chave, item);

  if (process.env.NODE_ENV === 'test' || process.env.VITEST || !process.env.NEXT_PUBLIC_SUPABASE_URL) {
    return;
  }

  try {
    const supabase = await createServerSideClient();
    const partes = chave.split(':');
    const hash = partes[partes.length - 1] || 'default';

    await supabase.from('ia_cache').upsert(
      {
        chave,
        jornada_id: jornadaId,
        node_id: nodeId,
        hash_contexto: hash,
        texto_enriquecido: textoEnriquecido,
        vozes_extras: vozesExtras,
        expires_at: new Date(expiresAtMs).toISOString(),
      },
      { onConflict: 'chave' }
    );
  } catch {
    // Falha silenciosa no cache não interrompe a narrativa
  }
}

/**
 * Validação e incremento de cota diária por usuário.
 */
export async function verificarEIncrementarCotaIA(
  userId: string,
  tokensEstimados = 100,
  limiteDiarioConfig?: number
): Promise<{ permitido: boolean; motivo?: string; totalHoje: number }> {
  const limiteDiario = limiteDiarioConfig ?? parseInt(process.env.MAX_AI_DAILY_CALLS || '100', 10);
  const hoje = new Date().toISOString().slice(0, 10);

  // Fallback em memória para testes ou sem banco
  if (process.env.NODE_ENV === 'test' || process.env.VITEST || !process.env.NEXT_PUBLIC_SUPABASE_URL) {
    const uso = memoryUsage.get(userId);
    if (!uso || uso.date !== hoje) {
      memoryUsage.set(userId, { count: 1, date: hoje });
      return { permitido: true, totalHoje: 1 };
    }

    if (uso.count >= limiteDiario) {
      return {
        permitido: false,
        motivo: `Cota diária de ${limiteDiario} chamadas de IA atingida para hoje. Modo Cânone Estrito mantido.`,
        totalHoje: uso.count,
      };
    }

    uso.count += 1;
    return { permitido: true, totalHoje: uso.count };
  }

  try {
    const supabase = await createServerSideClient();
    const { data, error } = await supabase.rpc('incrementar_uso_ia', {
      p_user_id: userId,
      p_data: hoje,
      p_tokens: tokensEstimados,
      p_limite_diario: limiteDiario,
    });

    if (error) {
      // Em erro de RPC, fallback para memória
      return verificarEIncrementarCotaIA(userId, tokensEstimados, limiteDiario);
    }

    if (data === false) {
      return {
        permitido: false,
        motivo: `Cota diária de ${limiteDiario} chamadas de IA atingida no servidor.`,
        totalHoje: limiteDiario,
      };
    }

    return { permitido: true, totalHoje: 1 };
  } catch {
    return { permitido: true, totalHoje: 1 };
  }
}
