import { NextResponse } from 'next/server';
import { z } from 'zod';
import { requireOwner } from '@/server/auth/requireOwner';
import { obterNodeJornada1 } from '@/server/data/journeys/j1_conquista_full';
import {
  rolar2d6,
  aplicarDeltaEstado,
  DeltaEstado,
  ResultadoRolagem,
} from '@/server/engine/rpgEngine';
import { TurnEvent } from '@/server/engine/saveManager';
import {
  classificarAcaoLivre,
  enriquecerCenaComIA,
} from '@/server/ai/geminiMaster';

const TurnBodySchema = z.object({
  nodeId: z.string(),
  escolhaId: z.string().optional(),
  textoAcaoLivre: z.string().optional(),
  ficha: z.any(),
  worldState: z.any(),
  turnNumber: z.number().default(1),
  usarIA: z.boolean().default(true),
  dadosFixos: z.tuple([z.number(), z.number()]).optional(),
});

export async function POST(req: Request) {
  try {
    const owner = await requireOwner(true);
    if (!owner.authorized) {
      return NextResponse.json(
        { error: owner.motivo || 'Acesso negado pela Cidadela.' },
        { status: 403 }
      );
    }

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
    } = parsed.data;

    let escolhaId = parsed.data.escolhaId;
    let classificacao = null;

    const nodeAtual = obterNodeJornada1(nodeId);
    if (!nodeAtual) {
      return NextResponse.json(
        { error: `Cena '${nodeId}' não encontrada.` },
        { status: 404 }
      );
    }

    // Se o jogador propôs uma ação livre personalizada
    if (parsed.data.textoAcaoLivre && parsed.data.textoAcaoLivre.trim().length > 0) {
      classificacao = await classificarAcaoLivre(
        parsed.data.textoAcaoLivre.trim(),
        nodeAtual,
        ficha
      );
      escolhaId = classificacao.escolhaId;
    }

    if (!escolhaId) {
      return NextResponse.json(
        { error: 'Nenhuma escolha ou ação válida foi informada.' },
        { status: 400 }
      );
    }

    const escolha = nodeAtual.escolhas.find((e) => e.id === escolhaId);
    if (!escolha) {
      return NextResponse.json(
        { error: `Escolha '${escolhaId}' não pertence à cena '${nodeId}'.` },
        { status: 400 }
      );
    }

    let proximoNodeId: string;
    let resultadoRolagem: ResultadoRolagem | null = null;
    let deltaConsequencia: DeltaEstado = {};

    if (escolha.tipo === 'simples') {
      proximoNodeId = escolha.nextNodeId;
    } else {
      const atributoNome = classificacao ? classificacao.atributo : escolha.atributo;
      const valorAtributo = ficha.atributos[atributoNome] || 3;

      resultadoRolagem = rolar2d6(valorAtributo, escolha.dc, {
        riscoMortal: escolha.riscoMortal,
        dadosFixos,
      });

      if (resultadoRolagem.resultado === 'CRITICO') {
        proximoNodeId = escolha.onCriticalSuccessNodeId || escolha.onSuccessNodeId;
        deltaConsequencia.honra = 2;
      } else if (resultadoRolagem.resultado === 'SUCESSO') {
        proximoNodeId = escolha.onSuccessNodeId;
        deltaConsequencia.honra = 1;
      } else if (resultadoRolagem.resultado === 'FALHA_PARCIAL') {
        proximoNodeId = escolha.onPartialFailureNodeId;
        deltaConsequencia.honra = -1;
        deltaConsequencia.compostura = -1;
      } else {
        proximoNodeId = escolha.onCriticalFailureNodeId || escolha.onPartialFailureNodeId;
        deltaConsequencia.honra = -2;
        deltaConsequencia.sangue = -3;
        if (escolha.riscoMortal) {
          deltaConsequencia.sangue = -10;
        }
      }
    }

    const proximoNode = obterNodeJornada1(proximoNodeId);
    if (!proximoNode) {
      return NextResponse.json(
        { error: `Cena de destino '${proximoNodeId}' não encontrada.` },
        { status: 404 }
      );
    }

    const deltaTotal: DeltaEstado = {
      ...deltaConsequencia,
      ...(proximoNode.deltaEstado || {}),
    };

    const { fichaAtualizada, worldStateAtualizado } = aplicarDeltaEstado(
      ficha,
      worldState,
      deltaTotal
    );

    const turnEvent: TurnEvent = {
      slotId: 'slot_1',
      userId: ficha.id,
      turnNumber,
      nodeId,
      choiceMade: parsed.data.textoAcaoLivre || escolha.texto,
      stateDelta: deltaTotal,
      timestamp: new Date().toISOString(),
    };

    let textoEnriquecido = proximoNode.fallbackText;
    let vozesExtras: any[] = [];
    let usouFallbackIA = true;

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
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: 'Falha interna ao processar turno.', mensagem: error.message },
      { status: 500 }
    );
  }
}
