import { NextResponse } from 'next/server';
import { requireOwner } from '@/server/auth/requireOwner';
import { checkRateLimit } from '@/server/auth/rateLimiter';
import { processarEscolhaAction } from '@/app/actions/gameActions';
import { TurnBodySchema } from '@/server/saves/schemas';

export async function POST(req: Request) {
  try {
    // 1. Autorização estrita do proprietário
    const owner = await requireOwner(true);
    if (!owner.authorized) {
      const status = owner.user ? 403 : 401;
      return NextResponse.json(
        { error: owner.motivo || 'Acesso negado pela Cidadela.' },
        { status }
      );
    }

    // 2. Proteção de Rate Limiting por Usuário/IP (30 req/min)
    const clientIdentifier = owner.user?.id || req.headers.get('x-forwarded-for') || 'anon_client';
    const rateCheck = checkRateLimit(clientIdentifier, 30, 60 * 1000);
    if (!rateCheck.allowed) {
      return NextResponse.json(
        {
          error: 'Limite de requisições excedido. Aguarde antes de realizar novos turnos.',
          resetInMs: rateCheck.resetInMs,
        },
        { status: 429 }
      );
    }

    // 3. Validação do corpo da requisição com Zod estrito
    const body: unknown = await req.json();
    const parsed = TurnBodySchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Dados do turno inválidos.', detalhes: parsed.error.format() },
        { status: 400 }
      );
    }

    // 4. Delegação para a action autoritativa
    const resultado = await processarEscolhaAction({
      slotId: parsed.data.slotId,
      escolhaId: parsed.data.escolhaId,
      versaoEsperada: parsed.data.versaoEsperada,
      dadosFixos: parsed.data.dadosFixos,
      usarIA: parsed.data.usarIA,
      journeyId: parsed.data.journeyId,
    });

    return NextResponse.json(resultado);
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Erro interno ao processar turno.';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
