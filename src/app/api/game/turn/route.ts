import { NextResponse } from 'next/server';
import { z } from 'zod';
import { requireOwner } from '@/server/auth/requireOwner';
import { checkRateLimit } from '@/server/auth/rateLimiter';
import { processarEscolhaAction } from '@/app/actions/gameActions';
import { FichaPersonagemSchema, WorldStateSchema } from '@/server/engine/rpgEngine';

const TurnBodySchema = z
  .object({
    nodeId: z.string(),
    escolhaId: z.string().optional(),
    slotId: z.string().optional(),
    versaoEsperada: z.number().int().min(0).optional(),
    textoAcaoLivre: z.string().max(500).optional(),
    ficha: FichaPersonagemSchema,
    worldState: WorldStateSchema,
    turnNumber: z.number().int().min(1).default(1),
    usarIA: z.boolean().default(true),
    dadosFixos: z.tuple([z.number(), z.number()]).optional(),
    journeyId: z.string().optional(),
  })
  .strict();

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

    // 3. Validação do corpo da requisição com Zod
    const body = await req.json();
    const parsed = TurnBodySchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Dados do turno inválidos.', detalhes: parsed.error.format() },
        { status: 400 }
      );
    }

    if (!parsed.data.escolhaId && !parsed.data.textoAcaoLivre) {
      return NextResponse.json(
        { error: 'É necessário informar uma escolhaId ou textoAcaoLivre.' },
        { status: 400 }
      );
    }

    const escolhaId = parsed.data.escolhaId || 'esc_padrao';

    // 4. Delegação para a action autoritativa
    const resultado = await processarEscolhaAction({
      nodeId: parsed.data.nodeId,
      escolhaId,
      slotId: parsed.data.slotId,
      versaoEsperada: parsed.data.versaoEsperada,
      ficha: parsed.data.ficha,
      worldState: parsed.data.worldState,
      turnNumber: parsed.data.turnNumber,
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
