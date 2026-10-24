'use server';

import { cookies } from 'next/headers';
import { createServerSideClient } from '@/lib/supabase/server';

const COOKIE_SESSAO_TESTE = 'cidadela_sessao_teste';
const EMAIL_TESTE_MEISTRE = 'meistre@cidadela.westeros';

/**
 * Acesso Rápido de Teste (Cidadela).
 * Fornece bypass determinístico e autenticação imediata para o Meistre de testes,
 * garantindo que tanto o Supabase Auth (quando online) quanto a sessão local/offline
 * permitam acesso total ao jogo sem bloqueio de rede.
 */
export async function loginTesteRapidoAction(): Promise<{ ok: boolean; mensagem?: string }> {
  try {
    const cookieStore = await cookies();
    cookieStore.set(COOKIE_SESSAO_TESTE, EMAIL_TESTE_MEISTRE, {
      path: '/',
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 dias
    });

    // Tenta também autenticar no Supabase se houver conexão
    try {
      const supabase = await createServerSideClient();
      await supabase.auth.signInWithPassword({
        email: EMAIL_TESTE_MEISTRE,
        password: 'ValarMorghulis2026!',
      });
    } catch {
      // Ignora erro de rede Supabase; o cookie de teste é suficiente para a autorização
    }

    return { ok: true };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    return { ok: false, mensagem: msg };
  }
}

/**
 * Encerra a sessão da Cidadela.
 */
export async function logoutAction(): Promise<{ ok: boolean }> {
  try {
    const cookieStore = await cookies();
    cookieStore.delete(COOKIE_SESSAO_TESTE);

    try {
      const supabase = await createServerSideClient();
      await supabase.auth.signOut();
    } catch {
      // Silencioso
    }

    return { ok: true };
  } catch {
    return { ok: true };
  }
}
