import { createClient } from './client';

export const ALLOWED_USER_EMAIL = (process.env.ALLOWED_USER_EMAIL || process.env.NEXT_PUBLIC_ALLOWED_USER_EMAIL || 'meistre@cidadela.westeros').toLowerCase().trim();
export const TEST_USER_EMAIL = (process.env.NEXT_PUBLIC_TEST_USER_EMAIL || ALLOWED_USER_EMAIL).toLowerCase().trim();
export const TEST_USER_PASSWORD = process.env.NEXT_PUBLIC_TEST_USER_PASSWORD || '';

/**
 * Valida se o e-mail possui permissão de acesso ao jogo.
 */
export function verificarPermissaoAcesso(email: string | null | undefined): boolean {
  if (!email) return false;
  return email.toLowerCase().trim() === ALLOWED_USER_EMAIL;
}

/**
 * Executa o login automático do usuário de teste para agilizar desenvolvimento e modo piloto.
 */
export async function fazerLoginTeste() {
  const supabase = createClient();
  if (!supabase) {
    throw new Error('Cliente Supabase não inicializado.');
  }
  const { data, error } = await supabase.auth.signInWithPassword({
    email: TEST_USER_EMAIL,
    password: TEST_USER_PASSWORD,
  });

  if (error) {
    throw new Error(`Falha no login de teste: ${error.message}`);
  }

  if (!verificarPermissaoAcesso(data.user?.email)) {
    throw new Error(`Acesso negado: o email ${data.user?.email} não tem autorização da Cidadela.`);
  }

  return data;
}

/**
 * Retorna a sessão ativa atual.
 */
export async function obterSessaoAtual() {
  const supabase = createClient();
  if (!supabase) return null;
  const { data: { session }, error } = await supabase.auth.getSession();
  if (error || !session) return null;
  return session;
}

/**
 * Encerra a sessão ativa.
 */
export async function fazerLogout() {
  const supabase = createClient();
  if (!supabase) return;
  await supabase.auth.signOut();
}
