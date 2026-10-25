import 'server-only';
import {
  FichaPersonagem,
  WorldState,
  DeltaEstado,
  ResultadoRolagem,
  rolar2d6,
  aplicarDeltaEstado,
} from './rpgEngine';
import { NodeJornada, EscolhaNode, Desfecho, GrafoJornada, Condicao } from './storyLinter';
import { obterNodeQualquerJornada } from '@/server/data/journeys/index';
import { getSaveRepository, SaveSlot } from '@/server/saves';
import { avaliarCondicao } from './composicaoCena';

import {
  validarEscolhaDesbloqueada,
  ValidacaoEscolhaResult,
} from '@/lib/engine-shared/validacao';

export { validarEscolhaDesbloqueada, type ValidacaoEscolhaResult };

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
  nodeCustomizado?: NodeJornada;
  proximoNodeCustomizado?: NodeJornada;
  grafoCustomizado?: GrafoJornada;
}

export interface RespostaExecutarTurno {
  novoSlot: SaveSlot;
  proximoNode: NodeJornada;
  resultadoRolagem: ResultadoRolagem | null;
  notificacoesCompanheiros: string[];
  escolhaRealizada: EscolhaNode;
  deltaAplicado: DeltaEstado;
  ponte?: string;
  marcasRecebidas?: string[];
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
  const nodeAtual =
    params.nodeCustomizado ||
    params.grafoCustomizado?.nodes[slotAtual.currentNodeId] ||
    obterNodeQualquerJornada(slotAtual.currentNodeId, params.journeyId || slotAtual.jornadaId);
  if (!nodeAtual) {
    throw new Error(`Cena '${slotAtual.currentNodeId}' não encontrada no grafo.`);
  }

  // 3. Valida a escolha
  const escolha = (nodeAtual.escolhas || []).find((e: EscolhaNode) => e.id === params.escolhaId);
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
    // Teste de Atributo 2d6 / 3d6 (Camada BG3 - B1 e B3)
    const atributoKey = escolha.atributo as keyof typeof slotAtual.characterSheet.atributos;
    const valorAtributo = slotAtual.characterSheet.atributos[atributoKey] ?? 3;

    // Resolução de circunstâncias (Vantagem / Desvantagem)
    const escolhaTeste = escolha as unknown as {
      circunstancias?: { tipo: 'vantagem' | 'desvantagem'; motivo: string; condicao?: Condicao }[];
    };
    let temVantagem = false;
    let temDesvantagem = false;
    let motivoCircunstancia: string | undefined = undefined;

    const listaCircunstancias = [
      ...(nodeAtual.circunstancias || []),
      ...(escolhaTeste.circunstancias || []),
    ];

    for (const circ of listaCircunstancias) {
      const ativa = avaliarCondicao(circ.condicao, {
        ficha: slotAtual.characterSheet,
        worldState: slotAtual.worldState,
        modo: slotAtual.modo || 'padrao',
      });
      if (ativa) {
        if (circ.tipo === 'vantagem' && !temVantagem) {
          temVantagem = true;
          motivoCircunstancia = circ.motivo;
        } else if (circ.tipo === 'desvantagem' && !temDesvantagem) {
          temDesvantagem = true;
          motivoCircunstancia = circ.motivo;
        }
      }
    }

    if (temVantagem && temDesvantagem) {
      temVantagem = false;
      temDesvantagem = false;
      motivoCircunstancia = 'Vantagem e desvantagem se anulam mutuamente';
    }

    const modoDeJogo = slotAtual.modo || 'padrao';

    resultadoRolagem = rolar2d6(valorAtributo, escolha.dc, {
      riscoMortal: escolha.riscoMortal,
      dadosFixos: (process.env.NODE_ENV === 'test' || process.env.VITEST) ? params.dadosFixos : undefined,
      vantagem: temVantagem,
      desvantagem: temDesvantagem,
      motivoCircunstancia,
      modoDeJogo,
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

  // =========================================================================
  // MOTOR DE CONSEQUÊNCIA E DIÁLOGO V2 (FASE G6A)
  // =========================================================================
  let desfechoAtivo: Desfecho | undefined = undefined;
  if (escolha.tipo === 'simples') {
    desfechoAtivo = (escolha as unknown as { desfecho?: Desfecho }).desfecho;
  } else if (escolha.tipo === 'teste_atributo') {
    const desfechos = (escolha as unknown as {
      desfechos?: {
        criticoSucesso?: Desfecho;
        sucesso: Desfecho;
        parcial: Desfecho;
        falha?: Desfecho;
        criticoFalha?: Desfecho;
      };
      desfecho?: Desfecho;
    });

    if (desfechos.desfechos) {
      if (resultadoRolagem?.resultado === 'CRITICO') {
        desfechoAtivo = desfechos.desfechos.criticoSucesso || desfechos.desfechos.sucesso;
      } else if (resultadoRolagem?.resultado === 'SUCESSO') {
        desfechoAtivo = desfechos.desfechos.sucesso;
      } else if (resultadoRolagem?.resultado === 'FALHA_PARCIAL') {
        desfechoAtivo = desfechos.desfechos.parcial;
      } else {
        desfechoAtivo =
          desfechos.desfechos.criticoFalha ||
          desfechos.desfechos.falha ||
          desfechos.desfechos.parcial;
      }
    } else {
      desfechoAtivo = desfechos.desfecho;
    }
  }

  let marcasNovas: string[] = [];
  if (desfechoAtivo) {
    if (desfechoAtivo.destino) {
      proximoNodeId = desfechoAtivo.destino;
    }
    if (desfechoAtivo.delta) {
      deltaConsequencia = mesclarDeltas(deltaConsequencia, desfechoAtivo.delta);
    }
    if (desfechoAtivo.marcas && desfechoAtivo.marcas.length > 0) {
      marcasNovas = [...desfechoAtivo.marcas];
      const marcasMap: Record<string, boolean> = {};
      for (const m of desfechoAtivo.marcas) marcasMap[m] = true;
      deltaConsequencia = mesclarDeltas(deltaConsequencia, { flagsBorboleta: marcasMap });
    }
  }

  // Hubs de conversa e tópicos únicos
  const escolhaExt = escolha as unknown as { permanece?: boolean; unica?: boolean };
  if (escolhaExt.permanece) {
    proximoNodeId = nodeAtual.id;
  }
  if (escolhaExt.unica) {
    const marcaUnica: Record<string, boolean> = {};
    marcaUnica[`escolha_feita_${escolha.id}`] = true;
    deltaConsequencia = mesclarDeltas(deltaConsequencia, { flagsBorboleta: marcaUnica });
  }

  // Metadados de transição gravados no estado determinístico
  if (desfechoAtivo?.ponte) {
    deltaConsequencia = mesclarDeltas(deltaConsequencia, {
      flagsBorboleta: { _ultima_ponte: desfechoAtivo.ponte as unknown as boolean },
    });
  }
  deltaConsequencia = mesclarDeltas(deltaConsequencia, {
    flagsBorboleta: {
      [`_escolha_anterior_${escolha.id}`]: true,
    },
  });

  const proximoNode =
    params.proximoNodeCustomizado ||
    params.grafoCustomizado?.nodes[proximoNodeId] ||
    obterNodeQualquerJornada(proximoNodeId, params.journeyId || slotAtual.jornadaId);
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
    resultado: resultadoRolagem
      ? {
          ...resultadoRolagem,
          escolhaId: escolha.id,
          ponte: desfechoAtivo?.ponte,
          marcas: marcasNovas.length > 0 ? marcasNovas : undefined,
        }
      : {
          tipo: 'simples',
          escolhaId: escolha.id,
          ponte: desfechoAtivo?.ponte,
          marcas: marcasNovas.length > 0 ? marcasNovas : undefined,
        },
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
    ponte: desfechoAtivo?.ponte,
    marcasRecebidas: marcasNovas.length > 0 ? marcasNovas : undefined,
  };
}

export const executarTurnoAutoritativo = executarTurno;

export interface RerrolarComInspiracaoParams {
  userId: string;
  slotId: string;
  versaoEsperada: number;
  escolhaId?: string;
  journeyId?: string;
  dadosFixos?: [number, number];
  proximoNodeCustomizado?: NodeJornada;
  grafoCustomizado?: GrafoJornada;
}

/**
 * Operação atômica de rerrolagem com Inspiração no servidor.
 * Valida inspiração > 0, restaura o snapshot pré-teste, deduz 1 ponto de inspiração
 * e executa um novo teste com dados independentes, persistindo o resultado no banco.
 */
export async function rerrolarComInspiracao(
  params: RerrolarComInspiracaoParams
): Promise<RespostaExecutarTurno> {
  const repo = getSaveRepository();

  // 1. Carrega slot atual
  const resSlot = await repo.obterSlotPorId(params.userId, params.slotId);
  if (!resSlot.ok) {
    throw new Error(`Falha ao carregar slot '${params.slotId}': ${resSlot.mensagem}`);
  }
  const slotAtual = resSlot.valor;

  // 2. Validação estrita de concorrência
  if (slotAtual.versao !== params.versaoEsperada) {
    throw new Error(
      `CONFLITO_VERSAO: Versão esperada ${params.versaoEsperada}, mas o slot está na versão ${slotAtual.versao}.`
    );
  }

  // 3. Validação do Modo de Jogo (Modo Juramento veta rerrolagens)
  if (slotAtual.modo === 'juramento') {
    throw new Error('No Modo Juramento, as rolagens são finais e a Inspiração não pode ser gasta para rerrolar.');
  }

  // 4. Validação de Inspiração disponível
  if ((slotAtual.characterSheet.inspiracao ?? 0) <= 0) {
    throw new Error('Sem Pontos de Inspiração disponíveis para rerrolagem.');
  }

  // 4. Identifica último evento ativo para recuperar snapshot pré-teste
  const turnos = slotAtual.turnHistory || [];
  const turnosCompensados = new Set<number>();
  for (const t of turnos) {
    if (t.tipo === 'desfazer' && typeof t.referenciaTurnNumber === 'number') {
      turnosCompensados.add(t.referenciaTurnNumber);
    }
  }

  const eventosAtivos = turnos.filter(
    (t) => t.tipo !== 'desfazer' && !turnosCompensados.has(t.turnNumber)
  );

  if (eventosAtivos.length === 0) {
    throw new Error('Nenhum teste recente para rerrolar com Inspiração.');
  }

  const ultimoAtivo = eventosAtivos[eventosAtivos.length - 1];
  const snapshotAntes = ultimoAtivo.snapshotAntes;
  if (!snapshotAntes || !snapshotAntes.ficha || !snapshotAntes.worldState) {
    throw new Error('Snapshot anterior ausente ou corrompido para rerrolagem.');
  }

  const nodePreTeste = obterNodeQualquerJornada(
    snapshotAntes.nodeId,
    params.journeyId || slotAtual.jornadaId
  );
  if (!nodePreTeste) {
    throw new Error(`Cena anterior '${snapshotAntes.nodeId}' não encontrada no grafo.`);
  }

  const escolhaId = params.escolhaId || (ultimoAtivo.resultado as { escolhaId?: string })?.escolhaId;
  const escolha =
    nodePreTeste.escolhas.find((e) => e.id === escolhaId) ||
    nodePreTeste.escolhas.find((e) => e.tipo === 'teste_atributo');

  if (!escolha || escolha.tipo !== 'teste_atributo') {
    throw new Error(
      'A escolha anterior não é um teste de atributo elegível para rerrolagem com Inspiração.'
    );
  }

  // 5. Restaura estado pré-teste e desconta atomicamente 1 Ponto de Inspiração
  const fichaPreTeste: FichaPersonagem = JSON.parse(JSON.stringify(snapshotAntes.ficha));
  fichaPreTeste.inspiracao = Math.max(0, (fichaPreTeste.inspiracao ?? 1) - 1);
  const worldStatePreTeste: WorldState = JSON.parse(JSON.stringify(snapshotAntes.worldState));

  // 6. Rola novamente o 2d6 com os atributos pré-teste
  const valorAtributo = fichaPreTeste.atributos[escolha.atributo];
  const resultadoRolagem = rolar2d6(valorAtributo, escolha.dc, {
    riscoMortal: escolha.riscoMortal,
    dadosFixos: process.env.NODE_ENV === 'test' || process.env.VITEST ? params.dadosFixos : undefined,
    modoDeJogo: slotAtual.modo || 'padrao',
  });

  let proximoNodeId: string;
  let deltaConsequencia: DeltaEstado = {};

  if (escolha.aprovacaoCompanheiros) {
    deltaConsequencia.aprovacaoCompanheiros = { ...escolha.aprovacaoCompanheiros };
  }

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

  // Suporte a Desfechos v2 na Rerrolagem
  let desfechoAtivoRerrolado: Desfecho | undefined = undefined;
  const desfechos = escolha as unknown as {
    desfechos?: {
      criticoSucesso?: Desfecho;
      sucesso: Desfecho;
      parcial: Desfecho;
      falha?: Desfecho;
      criticoFalha?: Desfecho;
    };
    desfecho?: Desfecho;
  };

  if (desfechos.desfechos) {
    if (resultadoRolagem.resultado === 'CRITICO') {
      desfechoAtivoRerrolado = desfechos.desfechos.criticoSucesso || desfechos.desfechos.sucesso;
    } else if (resultadoRolagem.resultado === 'SUCESSO') {
      desfechoAtivoRerrolado = desfechos.desfechos.sucesso;
    } else if (resultadoRolagem.resultado === 'FALHA_PARCIAL') {
      desfechoAtivoRerrolado = desfechos.desfechos.parcial;
    } else {
      desfechoAtivoRerrolado =
        desfechos.desfechos.criticoFalha ||
        desfechos.desfechos.falha ||
        desfechos.desfechos.parcial;
    }
  } else {
    desfechoAtivoRerrolado = desfechos.desfecho;
  }

  let marcasRerroladas: string[] = [];
  if (desfechoAtivoRerrolado) {
    if (desfechoAtivoRerrolado.destino) proximoNodeId = desfechoAtivoRerrolado.destino;
    if (desfechoAtivoRerrolado.delta) deltaConsequencia = mesclarDeltas(deltaConsequencia, desfechoAtivoRerrolado.delta);
    if (desfechoAtivoRerrolado.marcas && desfechoAtivoRerrolado.marcas.length > 0) {
      marcasRerroladas = [...desfechoAtivoRerrolado.marcas];
      const mmap: Record<string, boolean> = {};
      for (const m of desfechoAtivoRerrolado.marcas) mmap[m] = true;
      deltaConsequencia = mesclarDeltas(deltaConsequencia, { flagsBorboleta: mmap });
    }
  }

  if (escolha.delta) {
    deltaConsequencia = mesclarDeltas(deltaConsequencia, escolha.delta);
  }

  const proximoNode =
    params.proximoNodeCustomizado ||
    params.grafoCustomizado?.nodes[proximoNodeId] ||
    obterNodeQualquerJornada(proximoNodeId, params.journeyId || slotAtual.jornadaId);
  if (!proximoNode) {
    throw new Error(`Cena de destino '${proximoNodeId}' não encontrada no grafo.`);
  }

  const deltaTotal = mesclarDeltas(deltaConsequencia, proximoNode.deltaEstado || {});

  const { fichaAtualizada, worldStateAtualizado, notificacoesCompanheiros } = aplicarDeltaEstado(
    fichaPreTeste,
    worldStatePreTeste,
    deltaTotal
  );

  // 7. Desfaz o turno anterior registrando compensação
  const desfazRes = await repo.desfazerUltimoTurno(params.userId, params.slotId, params.versaoEsperada);
  if (!desfazRes.ok) {
    throw new Error(`Falha ao compensar turno pré-rerrolagem: ${desfazRes.mensagem}`);
  }

  const slotAposDesfazer = desfazRes.valor;

  // 8. Aplica o novo turno rerrolado
  const resAplicar = await repo.aplicarTurno({
    userId: params.userId,
    slotId: params.slotId,
    versaoEsperada: slotAposDesfazer.versao,
    proximoNodeId,
    characterSheet: fichaAtualizada,
    worldState: worldStateAtualizado,
    choiceMade: `[Rerrolagem c/ Inspiração] ${escolha.texto}`,
    turnNumber: (slotAposDesfazer.turnHistory?.length || 0) + 1,
    stateDelta: deltaTotal,
    snapshotAntes: {
      ficha: fichaPreTeste,
      worldState: worldStatePreTeste,
      nodeId: nodePreTeste.id,
    },
    resultado: {
      ...resultadoRolagem,
      escolhaId: escolha.id,
      tipo: 'rerrolar',
      ponte: desfechoAtivoRerrolado?.ponte,
      marcas: marcasRerroladas.length > 0 ? marcasRerroladas : undefined,
    },
  });

  if (!resAplicar.ok) {
    throw new Error(`Erro ao persistir turno rerrolado: ${resAplicar.mensagem}`);
  }

  return {
    novoSlot: resAplicar.valor,
    proximoNode,
    resultadoRolagem,
    notificacoesCompanheiros: notificacoesCompanheiros.map((n) => n.textoNotificacao),
    escolhaRealizada: escolha,
    deltaAplicado: deltaTotal,
    ponte: desfechoAtivoRerrolado?.ponte,
    marcasRecebidas: marcasRerroladas.length > 0 ? marcasRerroladas : undefined,
  };
}
