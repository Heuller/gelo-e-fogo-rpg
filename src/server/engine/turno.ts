import 'server-only';
import {
  FichaPersonagem,
  WorldState,
  DeltaEstado,
  ResultadoRolagem,
  rolar2d6,
  aplicarDeltaEstado,
} from './rpgEngine';
import { NodeJornada, EscolhaNode } from './storyLinter';
import { obterNodeQualquerJornada } from '@/server/data/journeys/index';
import { getSaveRepository, SaveSlot } from '@/server/saves';

export interface ValidacaoEscolhaResult {
  desbloqueada: boolean;
  motivo?: string;
  flagsFaltantes?: string[];
}

/**
 * Validação pura e determinística para determinar se uma escolha está desbloqueada
 * considerando requiredFlags, forbiddenFlags, minCompanionApproval e tagOrigem.
 */
export function validarEscolhaDesbloqueada(
  escolha: EscolhaNode,
  worldState: WorldState,
  ficha: FichaPersonagem
): ValidacaoEscolhaResult {
  const flagsAtivas = new Set<string>();
  for (const [f, v] of Object.entries(worldState.flagsBorboleta || {})) {
    if (Boolean(v)) flagsAtivas.add(f);
  }

  // 1. requiredFlags
  if (escolha.requiredFlags && escolha.requiredFlags.length > 0) {
    const faltantes = escolha.requiredFlags.filter((f) => !flagsAtivas.has(f));
    if (faltantes.length > 0) {
      return {
        desbloqueada: false,
        motivo: escolha.motivoBloqueio || `Falta: ${faltantes.join(', ')}`,
        flagsFaltantes: faltantes,
      };
    }
  }

  // 2. forbiddenFlags
  if (escolha.forbiddenFlags && escolha.forbiddenFlags.length > 0) {
    const proibidasPresentes = escolha.forbiddenFlags.filter((f) => flagsAtivas.has(f));
    if (proibidasPresentes.length > 0) {
      return {
        desbloqueada: false,
        motivo: escolha.motivoBloqueio || `Bloqueada por: ${proibidasPresentes.join(', ')}`,
      };
    }
  }

  // 3. minCompanionApproval
  if (escolha.minCompanionApproval) {
    const { companionId, minApproval } = escolha.minCompanionApproval;
    const comp = ficha.companheiros?.[companionId];
    const atual = comp ? comp.aprovacao : 0;
    if (atual < minApproval) {
      return {
        desbloqueada: false,
        motivo:
          escolha.motivoBloqueio ||
          `Aprovação insuficiente com ${comp?.nome || companionId} (requer ${minApproval}, atual ${atual})`,
      };
    }
  }

  // 4. tagOrigem
  if (escolha.tagOrigem) {
    if (ficha.origem !== escolha.tagOrigem && !flagsAtivas.has(`origem_${escolha.tagOrigem}`)) {
      return {
        desbloqueada: false,
        motivo: escolha.motivoBloqueio || `Requer origem [${escolha.tagOrigem}]`,
      };
    }
  }

  return { desbloqueada: true };
}

/**
 * Mesclagem profunda (Deep Merge) de dois deltas de estado.
 * Soma grandezas vitais, unifica conjuntos de flags sem duplicatas e soma aprovações e reputações.
 */
export function mesclarDeltas(a: DeltaEstado = {}, b: DeltaEstado = {}): DeltaEstado {
  const resultado: DeltaEstado = {};

  // Barras vitais e atributos numéricos (somados)
  const dSangue = (a.sangue ?? 0) + (b.sangue ?? 0);
  if (dSangue !== 0) resultado.sangue = dSangue;

  const dCompostura = (a.compostura ?? 0) + (b.compostura ?? 0);
  if (dCompostura !== 0) resultado.compostura = dCompostura;

  const dHonra = (a.honra ?? 0) + (b.honra ?? 0);
  if (dHonra !== 0) resultado.honra = dHonra;

  const dInspiracao = (a.inspiracao ?? 0) + (b.inspiracao ?? 0);
  if (dInspiracao !== 0) resultado.inspiracao = dInspiracao;

  // Unificação de flags adicionadas (sem duplicatas)
  const flagsUnificadas = Array.from(
    new Set([...(a.flagsAdicionadas || []), ...(b.flagsAdicionadas || [])])
  );
  if (flagsUnificadas.length > 0) {
    resultado.flagsAdicionadas = flagsUnificadas;
  }

  // Mesclagem de flags borboleta
  const flagsBorboleta = {
    ...(a.flagsBorboleta || {}),
    ...(b.flagsBorboleta || {}),
  };
  if (Object.keys(flagsBorboleta).length > 0) {
    resultado.flagsBorboleta = flagsBorboleta;
  }

  // Soma de reputação de Casas
  const reputacaoCasas: Record<string, number> = { ...(a.reputacaoCasas || {}) };
  for (const [casa, delta] of Object.entries(b.reputacaoCasas || {})) {
    reputacaoCasas[casa] = (reputacaoCasas[casa] ?? 0) + delta;
  }
  if (Object.keys(reputacaoCasas).length > 0) {
    resultado.reputacaoCasas = reputacaoCasas;
  }

  // Soma de aprovação de companheiros
  const aprovacaoCompanheiros: Record<string, number> = { ...(a.aprovacaoCompanheiros || {}) };
  for (const [comp, delta] of Object.entries(b.aprovacaoCompanheiros || {})) {
    aprovacaoCompanheiros[comp] = (aprovacaoCompanheiros[comp] ?? 0) + delta;
  }
  if (Object.keys(aprovacaoCompanheiros).length > 0) {
    resultado.aprovacaoCompanheiros = aprovacaoCompanheiros;
  }

  // Marcos concluídos
  if (b.marcoConcluido || a.marcoConcluido) {
    resultado.marcoConcluido = b.marcoConcluido || a.marcoConcluido;
  }

  // Cicatrizes e segredos
  if (b.novaCicatriz || a.novaCicatriz) {
    resultado.novaCicatriz = b.novaCicatriz || a.novaCicatriz;
  }
  if (b.novoSegredo || a.novoSegredo) {
    resultado.novoSegredo = b.novoSegredo || a.novoSegredo;
  }

  return resultado;
}

export interface ExecutarTurnoParams {
  userId: string;
  slotId: string;
  escolhaId: string;
  versaoEsperada: number;
  journeyId?: string;
  dadosFixos?: [number, number]; // Permitido estritamente em ambiente de teste
}

export interface RespostaExecutarTurno {
  novoSlot: SaveSlot;
  proximoNode: NodeJornada;
  resultadoRolagem: ResultadoRolagem | null;
  notificacoesCompanheiros: string[];
  escolhaRealizada: EscolhaNode;
  deltaAplicado: DeltaEstado;
}

/**
 * Motor central de Turno Autoritativo.
 * Único ponto de execução de regras determinísticas no servidor.
 */
export async function executarTurno(params: ExecutarTurnoParams): Promise<RespostaExecutarTurno> {
  const repo = getSaveRepository();

  // 1. Carrega o slot existente
  const resSlot = await repo.obterSlotPorId(params.userId, params.slotId);
  if (!resSlot.ok) {
    throw new Error(`Falha ao carregar slot '${params.slotId}': ${resSlot.mensagem}`);
  }
  const slotAtual = resSlot.valor;

  // 2. Carrega e valida o nó atual
  const nodeAtual = obterNodeQualquerJornada(slotAtual.currentNodeId, params.journeyId || slotAtual.jornadaId);
  if (!nodeAtual) {
    throw new Error(`Cena '${slotAtual.currentNodeId}' não encontrada no grafo.`);
  }

  // 3. Valida a escolha
  const escolha = nodeAtual.escolhas.find((e) => e.id === params.escolhaId);
  if (!escolha) {
    throw new Error(`Escolha '${params.escolhaId}' não encontrada na cena '${nodeAtual.id}'.`);
  }

  // 4. Valida se a escolha está desbloqueada no servidor
  const checkDesbloqueio = validarEscolhaDesbloqueada(
    escolha,
    slotAtual.worldState,
    slotAtual.characterSheet
  );
  if (!checkDesbloqueio.desbloqueada) {
    throw new Error(`Escolha bloqueada: ${checkDesbloqueio.motivo}`);
  }

  let proximoNodeId: string;
  let resultadoRolagem: ResultadoRolagem | null = null;
  let deltaConsequencia: DeltaEstado = {};

  if (escolha.aprovacaoCompanheiros) {
    deltaConsequencia.aprovacaoCompanheiros = { ...escolha.aprovacaoCompanheiros };
  }

  if (escolha.tipo === 'simples') {
    proximoNodeId = escolha.nextNodeId;
    if (escolha.delta) {
      deltaConsequencia = mesclarDeltas(deltaConsequencia, escolha.delta);
    }
  } else {
    // Teste de Atributo 2d6
    const valorAtributo = slotAtual.characterSheet.atributos[escolha.atributo];
    resultadoRolagem = rolar2d6(valorAtributo, escolha.dc, {
      riscoMortal: escolha.riscoMortal,
      dadosFixos: (process.env.NODE_ENV === 'test' || process.env.VITEST) ? params.dadosFixos : undefined,
    });

    if (resultadoRolagem.resultado === 'CRITICO') {
      proximoNodeId = escolha.onCriticalSuccessNodeId || escolha.onSuccessNodeId;
      deltaConsequencia.honra = (deltaConsequencia.honra || 0) + 2;
      deltaConsequencia.inspiracao = (deltaConsequencia.inspiracao || 0) + 1;
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

    // Aplica delta autoral da escolha em testes (corrigindo a falha do código legado)
    if (escolha.delta) {
      deltaConsequencia = mesclarDeltas(deltaConsequencia, escolha.delta);
    }
  }

  const proximoNode = obterNodeQualquerJornada(proximoNodeId, params.journeyId || slotAtual.jornadaId);
  if (!proximoNode) {
    throw new Error(`Cena de destino '${proximoNodeId}' não encontrada no grafo.`);
  }

  // Mesclagem profunda do delta da escolha com o delta do nó de destino
  const deltaTotal = mesclarDeltas(deltaConsequencia, proximoNode.deltaEstado || {});

  // Aplicação determinística
  const { fichaAtualizada, worldStateAtualizado, notificacoesCompanheiros } = aplicarDeltaEstado(
    slotAtual.characterSheet,
    slotAtual.worldState,
    deltaTotal
  );

  const snapshotAntes = {
    ficha: JSON.parse(JSON.stringify(slotAtual.characterSheet)),
    worldState: JSON.parse(JSON.stringify(slotAtual.worldState)),
    nodeId: slotAtual.currentNodeId,
  };

  const turnNumber = (slotAtual.turnHistory?.length || 0) + 1;

  // Gravação atômica com validação de concorrência otimista
  const resAplicar = await repo.aplicarTurno({
    userId: params.userId,
    slotId: params.slotId,
    versaoEsperada: params.versaoEsperada,
    proximoNodeId,
    characterSheet: fichaAtualizada,
    worldState: worldStateAtualizado,
    choiceMade: escolha.texto,
    turnNumber,
    stateDelta: deltaTotal,
    snapshotAntes,
    resultado: resultadoRolagem ? { ...resultadoRolagem } : { tipo: 'simples' },
  });

  if (!resAplicar.ok) {
    throw new Error(`Erro ao persistir turno: [${resAplicar.erro}] ${resAplicar.mensagem}`);
  }

  return {
    novoSlot: resAplicar.valor,
    proximoNode,
    resultadoRolagem,
    notificacoesCompanheiros: notificacoesCompanheiros.map((n) => n.textoNotificacao),
    escolhaRealizada: escolha,
    deltaAplicado: deltaTotal,
  };
}
