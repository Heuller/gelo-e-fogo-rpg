import { NextResponse } from 'next/server';
import { z } from 'zod';
import { requireOwner } from '@/server/auth/requireOwner';
import { checkRateLimit } from '@/server/auth/rateLimiter';
import { obterNodeQualquerJornada } from '@/server/data/journeys/index';
import {
  rolar2d6,
  aplicarDeltaEstado,
  DeltaEstado,
  ResultadoRolagem,
  FichaPersonagemSchema,
  WorldStateSchema,
} from '@/server/engine/rpgEngine';
import { TurnEvent } from '@/server/engine/saveManager';
import {
  classificarAcaoLivre,
  enriquecerCenaComIA,
} from '@/server/ai/geminiMaster';

const TurnBodySchema = z.object({
  nodeId: z.string(),
  escolhaId: z.string().optional(),
  textoAcaoLivre: z.string().max(500).optional(),
  ficha: FichaPersonagemSchema,
  worldState: WorldStateSchema,
  turnNumber: z.number().int().min(1).default(1),
  usarIA: z.boolean().default(true),
  dadosFixos: z.tuple([z.number(), z.number()]).optional(),
  journeyId: z.string().optional(),
});

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

    const {
      nodeId,
      ficha,
      worldState,
      turnNumber,
      usarIA,
      dadosFixos,
      journeyId,
    } = parsed.data;

    let escolhaId = parsed.data.escolhaId;
    let classificacao = null;

    const nodeAtual = obterNodeQualquerJornada(nodeId, journeyId);
    if (!nodeAtual) {
      return NextResponse.json(
        { error: `Cena '${nodeId}' não encontrada no grafo.` },
        { status: 404 }
      );
    }

    // 4. Classificação de ação livre se texto foi submetido
    if (!escolhaId && parsed.data.textoAcaoLivre) {
      classificacao = await classificarAcaoLivre(
        parsed.data.textoAcaoLivre,
        nodeAtual,
        ficha
      );
      escolhaId = classificacao.escolhaId;
    }

    const escolha = nodeAtual.escolhas.find((e) => e.id === escolhaId);
    if (!escolha) {
      return NextResponse.json(
        { error: `Escolha '${escolhaId}' não encontrada para o nó '${nodeId}'.` },
        { status: 400 }
      );
    }

    // 5. Resolução mecânica 100% determinística do turno
    let proximoNodeId: string;
    let resultadoRolagem: ResultadoRolagem | null = null;
    let deltaConsequencia: DeltaEstado = {};

    if (escolha.aprovacaoCompanheiros) {
      deltaConsequencia.aprovacaoCompanheiros = escolha.aprovacaoCompanheiros;
    }

    if (escolha.tipo === 'simples') {
      proximoNodeId = escolha.nextNodeId;
      if (escolha.delta) {
        deltaConsequencia = { ...deltaConsequencia, ...escolha.delta };
      }
    } else {
      const valorAtributo = ficha.atributos[escolha.atributo];
      resultadoRolagem = rolar2d6(valorAtributo, escolha.dc, {
        riscoMortal: escolha.riscoMortal,
        dadosFixos,
      });

      if (resultadoRolagem.resultado === 'CRITICO') {
        proximoNodeId = escolha.onCriticalSuccessNodeId || escolha.onSuccessNodeId;
        deltaConsequencia.honra = (deltaConsequencia.honra || 0) + 2;
        deltaConsequencia.inspiracao = 1;
      } else if (resultadoRolagem.resultado === 'SUCESSO') {
        proximoNodeId = escolha.onSuccessNodeId;
        deltaConsequencia.honra = (deltaConsequencia.honra || 0) + 1;
      } else if (resultadoRolagem.resultado === 'FALHA_PARCIAL') {
        proximoNodeId = escolha.onPartialFailureNodeId;
        deltaConsequencia.honra = (deltaConsequencia.honra || 0) - 1;
        deltaConsequencia.compostura = (deltaConsequencia.compostura || 0) - 1;
      } else {
        proximoNodeId = escolha.onCriticalFailureNodeId || escolha.onPartialFailureNodeId;
        deltaConsequencia.honra = (deltaConsequencia.honra || 0) - 2;
        deltaConsequencia.sangue = (deltaConsequencia.sangue || 0) - 3;
        if (escolha.riscoMortal) {
          deltaConsequencia.sangue = -10;
        }
      }
    }

    const {
      fichaAtualizada,
      worldStateAtualizado,
      notificacoesCompanheiros,
    } = aplicarDeltaEstado(ficha, worldState, deltaConsequencia);

    const proximoNode = obterNodeQualquerJornada(proximoNodeId, journeyId);
    if (!proximoNode) {
      return NextResponse.json(
        { error: `Nó destino '${proximoNodeId}' não encontrado.` },
        { status: 500 }
      );
    }

    const turnEvent: TurnEvent = {
      slotId: `temp_turn_${turnNumber}`,
      userId: owner.user?.id || 'd5f86911-0f14-497d-9a9c-7258a2eb18cd',
      turnNumber,
      nodeId: proximoNodeId,
      choiceMade: escolha.texto,
      stateDelta: deltaConsequencia,
      timestamp: new Date().toISOString(),
    };

    // 6. Enriquecimento literário com IA (apenas narração)
    let textoEnriquecido: string | undefined;
    let vozesExtras: any[] | undefined;
    let usouFallbackIA = false;

    if (usarIA) {
      const enriquecimento = await enriquecerCenaComIA({
        noDestino: proximoNode,
        resultadoDado: resultadoRolagem,
        escolhaTexto: parsed.data.textoAcaoLivre || escolha.texto,
        ficha: fichaAtualizada,
        worldState: worldStateAtualizado,
      });
      textoEnriquecido = enriquecimento.textoEnriquecido;
      vozesExtras = enriquecimento.vozesExtras;
      usouFallbackIA = enriquecimento.usouFallback;
    }

    return NextResponse.json({
      proximoNode,
      resultadoRolagem,
      fichaAtualizada,
      worldStateAtualizado,
      turnEvent,
      classificacao,
      textoEnriquecido,
      vozesExtras,
      usouFallbackIA,
      notificacoesCompanheiros,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: 'Falha interna ao processar turno.', mensagem: error.message },
      { status: 500 }
    );
  }
}
