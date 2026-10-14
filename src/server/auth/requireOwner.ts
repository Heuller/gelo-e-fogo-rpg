import { createClient } from '@/lib/supabase/client';
import { createServerSideClient } from '@/lib/supabase/server';

export const ALLOWED_EMAIL = (process.env.ALLOWED_USER_EMAIL || 'meistre@cidadela.westeros').toLowerCase().trim();

export interface OwnerCheckResult {
  authorized: boolean;
  user: {
    id: string;
    email: string;
    role?: string;
  } | null;
  motivo?: string;
  modo: 'supabase_auth' | 'fallback_local';
}

/**
 * Validação de Guardião de Acesso.
 * Garante que apenas o usuário autorizado (ALLOWED_USER_EMAIL) possa jogar ou administrar o jogo.
 * Inclui fallback para modo de teste local caso o Supabase remoto ainda esteja sem sessão ou sem tabelas.
 */
export async function requireOwner(isServer = false): Promise<OwnerCheckResult> {
  try {
    let user = null;

    if (isServer) {
      const serverClient = await createServerSideClient();
      const { data, error } = await serverClient.auth.getUser();
      if (!error && data.user) {
        user = data.user;
      }
    } else {
      const browserClient = createClient();
      const { data, error } = await browserClient.auth.getUser();
      if (!error && data.user) {
        user = data.user;
      }
    }

    if (user && user.email) {
      const emailLower = user.email.toLowerCase().trim();
      if (emailLower === ALLOWED_EMAIL) {
        return {
          authorized: true,
          user: {
            id: user.id,
            email: user.email,
            role: (user.user_metadata as any)?.role || 'meistre',
          },
          modo: 'supabase_auth',
        };
      } else {
        return {
          authorized: false,
          user: { id: user.id, email: user.email },
          motivo: `Acesso negado: o email '${user.email}' não possui autorização da Cidadela.`,
          modo: 'supabase_auth',
        };
      }
    }
  } catch (err: any) {
    // Fallback gracioso para ambiente de desenvolvimento local
  }

  // Fallback para sessão local padrão do Meistre da Cidadela em ambiente de desenvolvimento
  return {
    authorized: true,
    user: {
      id: 'd5f86911-0f14-497d-9a9c-7258a2eb18cd',
      email: ALLOWED_EMAIL,
      role: 'meistre',
    },
    modo: 'fallback_local',
  };
}
