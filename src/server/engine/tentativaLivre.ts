import 'server-only';
import {
  AtributoVoz,
  FichaPersonagem,
  WorldState,
  ResultadoRolagem,
  rolar2d6,
  aplicarDeltaEstado,
  DeltaEstado,
} from './rpgEngine';
import { NodeJornada } from './storyLinter';
import { getSaveRepository, SaveSlot, TurnEvent } from '@/server/saves';
import { obterNodeQualquerJornada } from '@/server/data/journeys/index';

// Re-exporta tipos, esquemas e cálculo determinístico compartilhados com a UI
export * from '@/lib/engine-shared/tentativaLivreShared';
import {
  IntencaoLivre,
  sanitizarTextoAcaoLivre,
  calcularPreviaTentativaLivre,
} from '@/lib/engine-shared/tentativaLivreShared';

/* =========================================================================
 * TABELA FECHADA DE EFEITOS E ECO NARRATIVO
 * ========================================================================= */

interface DesfechoTentativa {
  delta: DeltaEstado;
  ecoPadrao: string;
  ganhoPista?: string;
}

function resolverEfeitosTabelaFechada(
  intencao: IntencaoLivre,
  rolagem: ResultadoRolagem,
  node: NodeJornada
): DesfechoTentativa {
  const chavePista = `pista_livre_${node.id}`;
  const { resultado, complicacaoNarrativa } = rolagem;

  if (resultado === 'CRITICO' || resultado === 'SUCESSO') {
    switch (intencao) {
      case 'observar':
        return {
          delta: { compostura: 1, flagsAdicionadas: [chavePista] },
          ecoPadrao: 'O vosso olhar atento capta detalhes que escapariam aos homens comuns. Uma pista valiosa foi gravada na vossa memória.',
          ganhoPista: chavePista,
        };
      case 'persuadir':
        return {
          delta: { compostura: 1, honra: 1 },
          ecoPadrao: 'Vossas palavras ressoam com sobriedade e convicção, firmando respeito mútuo.',
        };
      case 'intimidar':
        return {
          delta: { compostura: 1 },
          ecoPadrao: 'Vossa postura impassível impõe silêncio e cautela ao redor.',
        };
      case 'enganar':
        return {
          delta: { compostura: 1, flagsAdicionadas: [chavePista] },
          ecoPadrao: 'A vossa astúcia planta a dúvida no coração dos interlocutores, sem deixar rastros.',
          ganhoPista: chavePista,
        };
      case 'furtar':
        return {
          delta: { compostura: 1, flagsAdicionadas: [chavePista] },
          ecoPadrao: 'Com movimentos invisíveis, obtendes vantagem sem levantar qualquer alarme.',
          ganhoPista: chavePista,
        };
      case 'agir_fisico':
        return {
          delta: { compostura: 1 },
          ecoPadrao: 'Vossa força e agilidade superam o obstáculo com destreza militar.',
        };
      case 'recuar':
        return {
          delta: { compostura: 1 },
          ecoPadrao: 'Recuais com precisão para uma posição resguardada e segura.',
        };
      case 'ajudar':
        return {
          delta: { compostura: 1, honra: 1 },
          ecoPadrao: 'Vosso gesto prestativo traz alívio imediato e fortalece os laços ao redor.',
        };
      case 'rezar_ou_jurar':
        return {
          delta: { compostura: 1, honra: 1 },
          ecoPadrao: 'A solene reverência revigora o vosso espírito diante do dever.',
        };
      case 'esperar':
        return {
          delta: { compostura: 1 },
          ecoPadrao: 'A contenção e a paciência provam-se as melhores conselheiras.',
        };
    }
  }

  if (resultado === 'FALHA_PARCIAL' && !complicacaoNarrativa) {
    return {
      delta: {},
      ecoPadrao: 'A vossa iniciativa encontra resistência ou desfecho incerto, mas sem comprometer a vossa posição.',
    };
  }

  // FALHA grave ou complicação narrativa
  return {
    delta: { compostura: -1 },
    ecoPadrao: 'A tentativa resulta em frustração passageira, cobrando um breve tributo à vossa compostura.',
  };
}

/* =========================================================================
 * 5. EXECUÇÃO AUTORITATIVA DA TENTATIVA LIVRE NO SERVIDOR
 * ========================================================================= */

export interface ExecutarTentativaLivreParams {
  userId: string;
  slotId: string;
  versaoEsperada: number;
  textoAcao: string;
  journeyId?: string;
  dadosFixos?: [number, number];
  nodeAtualSobrescrito?: NodeJornada;
}

export interface RespostaTentativaLivre {
  novoSlot: SaveSlot;
  intencao: IntencaoLivre;
  rotuloIntencao: string;
  resultadoRolagem: ResultadoRolagem;
  ecoNarrativo: string;
  deltaAplicado: DeltaEstado;
  pistaDesbloqueada?: string;
  ganchoDesbloqueado?: string;
}

export async function executarTentativaLivre(
  params: ExecutarTentativaLivreParams
): Promise<RespostaTentativaLivre> {
  const repo = getSaveRepository();

  // 1. Carrega slot
  const resSlot = await repo.obterSlotPorId(params.userId, params.slotId);
  if (!resSlot.ok) {
    throw new Error(`Slot '${params.slotId}' não encontrado.`);
  }
  const slot = resSlot.valor;

  // 2. Valida concorrência otimista
  if (slot.versao !== params.versaoEsperada) {
    throw new Error(
      `CONFLITO_VERSAO: Esperado ${params.versaoEsperada}, mas o slot está na versão ${slot.versao}.`
    );
  }

  // 3. Carrega nó atual da cena
  const nodeAtual =
    params.nodeAtualSobrescrito ||
    obterNodeQualquerJornada(slot.currentNodeId, params.journeyId || slot.jornadaId);
  if (!nodeAtual) {
    throw new Error(`Cena '${slot.currentNodeId}' não encontrada.`);
  }

  // 4. Validação de limite de 2 tentativas por cena
  const previa = calcularPreviaTentativaLivre({
    texto: params.textoAcao,
    node: nodeAtual,
    ficha: slot.characterSheet,
    turnHistory: slot.turnHistory,
  });

  if (previa.bloqueada) {
    throw new Error(previa.motivoBloqueio || 'Tentativa livre indisponível nesta cena.');
  }

  // 5. Rolagem determinística no servidor
  const resultadoRolagem = rolar2d6(previa.valorAtributo, previa.dc, {
    dadosFixos: process.env.NODE_ENV === 'test' || process.env.VITEST ? params.dadosFixos : undefined,
  });

  // 6. Resolução por tabela fechada (NUNCA altera nó)
  const desfecho = resolverEfeitosTabelaFechada(
    previa.intencao,
    resultadoRolagem,
    nodeAtual
  );

  // 7. Ganchos de caminhos escondidos (Disco Elysium)
  let ganchoDesbloqueado: string | undefined;
  const ganchos = nodeAtual.ganchosLivres;

  if (ganchos && ganchos.length > 0) {
    for (const g of ganchos) {
      if (g.intencao === previa.intencao) {
        const atendeFaixa =
          g.exigeFaixa === 'parcial'
            ? resultadoRolagem.resultado !== 'FALHA_CRITICA'
            : resultadoRolagem.resultado === 'SUCESSO' || resultadoRolagem.resultado === 'CRITICO';

        if (atendeFaixa) {
          ganchoDesbloqueado = g.desbloqueiaEscolhaId;
          if (!desfecho.delta.flagsAdicionadas) {
            desfecho.delta.flagsAdicionadas = [];
          }
          desfecho.delta.flagsAdicionadas.push(`gancho_${g.desbloqueiaEscolhaId}`);
        }
      }
    }
  }

  // 8. Aplica deltas fechados
  const { fichaAtualizada, worldStateAtualizado } = aplicarDeltaEstado(
    slot.characterSheet,
    slot.worldState,
    desfecho.delta
  );

  const snapshotAntes = {
    ficha: JSON.parse(JSON.stringify(slot.characterSheet)),
    worldState: JSON.parse(JSON.stringify(slot.worldState)),
    nodeId: slot.currentNodeId,
  };

  const turnNumber = (slot.turnHistory?.length || 0) + 1;

  // 9. Persistência atômica com tipo 'tentativa_livre'
  const resAplicar = await repo.aplicarTurno({
    userId: params.userId,
    slotId: params.slotId,
    versaoEsperada: params.versaoEsperada,
    proximoNodeId: slot.currentNodeId, // Nó permanece estritamente o mesmo
    characterSheet: fichaAtualizada,
    worldState: worldStateAtualizado,
    choiceMade: `[Tentativa Livre: ${previa.rotuloIntencao}] ${sanitizarTextoAcaoLivre(params.textoAcao)}`,
    turnNumber,
    stateDelta: desfecho.delta,
    snapshotAntes,
    resultado: {
      tipo: 'tentativa_livre',
      intencao: previa.intencao,
      ecoNarrativo: desfecho.ecoPadrao,
      ...resultadoRolagem,
    },
  });

  if (!resAplicar.ok) {
    throw new Error(`Erro ao persistir tentativa livre: ${resAplicar.mensagem}`);
  }

  return {
    novoSlot: resAplicar.valor,
    intencao: previa.intencao,
    rotuloIntencao: previa.rotuloIntencao,
    resultadoRolagem,
    ecoNarrativo: desfecho.ecoPadrao,
    deltaAplicado: desfecho.delta,
    pistaDesbloqueada: desfecho.ganhoPista,
    ganchoDesbloqueado,
  };
}
