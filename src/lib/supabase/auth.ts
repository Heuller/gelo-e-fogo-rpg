import { createClient } from './client';

export const ALLOWED_USER_EMAIL = process.env.ALLOWED_USER_EMAIL || 'meistre@cidadela.westeros';
export const TEST_USER_EMAIL = process.env.NEXT_PUBLIC_TEST_USER_EMAIL || 'meistre@cidadela.westeros';
export const TEST_USER_PASSWORD = process.env.NEXT_PUBLIC_TEST_USER_PASSWORD || 'ValarMorghulis2026!';

/**
 * Valida se o e-mail possui permissão de acesso ao jogo.
 */
export function verificarPermissaoAcesso(email: string | null | undefined): boolean {
  if (!email) return false;
  return email.toLowerCase().trim() === ALLOWED_USER_EMAIL.toLowerCase().trim();
}

/**
 * Executa o login automático do usuário de teste para agilizar desenvolvimento e modo piloto.
 */
export async function fazerLoginTeste() {
  const supabase = createClient();
  const { data, error } = await supabase.auth.signInWithPassword({
    email: TEST_USER_EMAIL,
    password: TEST_USER_PASSWORD,
  });

  if (error) {
    throw new Error(`Falha no login de teste automático: ${error.message}`);
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
  const { data: { session }, error } = await supabase.auth.getSession();
  if (error || !session) return null;
  return session;
}

/**
 * Encerra a sessão ativa.
 */
export async function fazerLogout() {
  const supabase = createClient();
  await supabase.auth.signOut();
}
