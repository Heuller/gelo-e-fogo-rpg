import { NextResponse, type NextRequest } from 'next/server';
import { createServerClient } from '@supabase/ssr';

export async function middleware(request: NextRequest) {
  // 1. Geração de Nonce Criptográfico para CSP
  const nonce = Buffer.from(crypto.randomUUID()).toString('base64');
  const isDev = process.env.NODE_ENV === 'development';

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  // 2. Construção da Política de Segurança de Conteúdo (CSP)
  // Next.js App Router requer 'unsafe-inline' e 'unsafe-eval' para hidratação de chunks estáticos
  const scriptSrc = isDev
    ? `'self' 'unsafe-eval' 'unsafe-inline'`
    : `'self' 'unsafe-eval' 'unsafe-inline' https:`;

  const cspHeader = [
    `default-src 'self'`,
    `script-src ${scriptSrc}`,
    `style-src 'self' 'unsafe-inline'`,
    `img-src 'self' blob: data: https:`,
    `font-src 'self' data: https://fonts.gstatic.com`,
    `connect-src 'self' ${supabaseUrl || ''} https://*.supabase.co wss://*.supabase.co https://generativelanguage.googleapis.com`,
    `frame-ancestors 'none'`,
    `base-uri 'self'`,
    `form-action 'self'`,
  ]
    .filter(Boolean)
    .join('; ');

  // Clona os headers da requisição e injeta o nonce para consumo em Server Components
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-nonce', nonce);
  requestHeaders.set('content-security-policy', cspHeader);

  let response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });

  // 3. Aplicação dos Cabeçalhos de Segurança na Resposta
  response.headers.set('Content-Security-Policy', cspHeader);
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set(
    'Permissions-Policy',
    'camera=(), microphone=(), geolocation=(), interest-cohort=()'
  );

  // 4. Verificação de Autenticação Supabase em Rotas Protegidas
  if (!supabaseUrl || !supabaseKey || process.env.NODE_ENV === 'test' || process.env.VITEST) {
    return response;
  }

  const supabase = createServerClient(supabaseUrl, supabaseKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet: Array<{ name: string; value: string; options?: Record<string, unknown> }>) {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
        response = NextResponse.next({
          request: {
            headers: requestHeaders,
          },
        });
        cookiesToSet.forEach(({ name, value, options }) =>
          response.cookies.set(name, value, options as any)
        );
        // Re-aplica headers de segurança
        response.headers.set('Content-Security-Policy', cspHeader);
        response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
        response.headers.set('X-Content-Type-Options', 'nosniff');
        response.headers.set('X-Frame-Options', 'DENY');
        response.headers.set(
          'Permissions-Policy',
          'camera=(), microphone=(), geolocation=(), interest-cohort=()'
        );
      },
    },
  });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const pathname = request.nextUrl.pathname;
  const rotasProtegidas = ['/painel', '/jogar'];
  const precisaAutenticacao = rotasProtegidas.some((rota) => pathname.startsWith(rota));

  if (precisaAutenticacao && !user) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('next', pathname);
    return NextResponse.redirect(loginUrl);
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Aplica o middleware em todas as rotas de páginas e APIs,
     * exceto arquivos estáticos e metadados públicos do PWA.
     */
    '/((?!_next/static|_next/image|favicon.ico|manifest.webmanifest|icon-.*\\.svg).*)',
  ],
};
