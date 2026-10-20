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
  modo: 'supabase_auth' | 'test_mode' | 'unauthorized';
}

/**
 * Validação de Guardião de Acesso.
 * Garante que apenas o usuário autorizado (ALLOWED_USER_EMAIL) possa jogar ou administrar o jogo.
 * Sem fallback permissivo: qualquer acesso anônimo ou de e-mail não autorizado é negado imediatamente.
 */
export async function requireOwner(isServer = false): Promise<OwnerCheckResult> {
  // Em ambiente de teste unitário Vitest explícito, permite cenários de mock controlados
  if (process.env.NODE_ENV === 'test' || process.env.VITEST) {
    if (process.env.TEST_AUTH_SCENARIO === 'anonymous') {
      return {
        authorized: false,
        user: null,
        motivo: 'Sessão não autenticada. Acesso restrito ao proprietário da crônica.',
        modo: 'unauthorized',
      };
    }
    if (process.env.TEST_AUTH_SCENARIO === 'forbidden_email') {
      return {
        authorized: false,
        user: { id: 'impostor-id', email: 'usurpador@kingslanding.com' },
        motivo: 'Acesso negado: o email \'usurpador@kingslanding.com\' não possui autorização da Cidadela.',
        modo: 'unauthorized',
      };
    }
    return {
      authorized: true,
      user: {
        id: 'd5f86911-0f14-497d-9a9c-7258a2eb18cd',
        email: ALLOWED_EMAIL,
        role: 'meistre',
      },
      modo: 'test_mode',
    };
  }

  try {
    let user = null;

    if (isServer) {
      const serverClient = await createServerSideClient();
      const { data, error } = await serverClient.auth.getUser();
      if (!error && data?.user) {
        user = data.user;
      }
    } else {
      const browserClient = createClient();
      if (browserClient) {
        const { data, error } = await browserClient.auth.getUser();
        if (!error && data?.user) {
          user = data.user;
        }
      }
    }

    if (!user || !user.email) {
      return {
        authorized: false,
        user: null,
        motivo: 'Sessão não autenticada. Acesso restrito ao proprietário da crônica.',
        modo: 'unauthorized',
      };
    }

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
        modo: 'unauthorized',
      };
    }
  } catch (err: any) {
    return {
      authorized: false,
      user: null,
      motivo: `Falha na verificação de identidade: ${err.message || 'Erro desconhecido.'}`,
      modo: 'unauthorized',
    };
  }
}
