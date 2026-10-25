'use server';

import {
  obterGrafoJornada,
  obterNodeQualquerJornada,
  obterCenaInicialJornada,
  normalizarIdJornada,
} from '@/server/data/journeys/index';
import { NodeJornada, EscolhaNode } from '@/server/engine/storyLinter';
import {
  FichaPersonagem,
  WorldState,
  ResultadoRolagem,
  rolar2d6,
  aplicarDeltaEstado,
  DeltaEstado,
} from '@/server/engine/rpgEngine';
import { TurnEvent, SaveSlot, getSaveRepository } from '@/server/saves';
import {
  executarTurno,
  executarTurnoAutoritativo,
  rerrolarComInspiracao,
  mesclarDeltas,
} from '@/server/engine/turno';
import { comporCena, CenaComposta } from '@/server/engine/composicaoCena';
import {
  calcularPreviaTentativaLivre,
  executarTentativaLivre,
  PreviaTentativaLivre,
  RespostaTentativaLivre,
} from '@/server/engine/tentativaLivre';
import { requireOwner } from '@/server/auth/requireOwner';
import {
  classificarAcaoLivre,
  enriquecerCenaComIA,
  ClassificacaoAcaoLivre,
  VozExtra,
} from '@/server/ai/geminiMaster';

/**
 * Garante autenticação estrita do proprietário em todas as Server Actions.
 */
async function validarProprietario() {
  const auth = await requireOwner(true);
  if (!auth.authorized || !auth.user) {
    throw new Error('Acesso negado: apenas o proprietário da crônica possui autorização da Cidadela.');
  }
  return auth.user;
}

export async function obterCenaInicialAction(journeyId?: string): Promise<{
  node: NodeJornada;
  fichaInicial: FichaPersonagem;
  worldStateInicial: WorldState;
}> {
  await validarProprietario();
  return obterCenaInicialJornada(journeyId);
}

export async function obterCenaPorIdAction(
  nodeId: string,
  journeyId?: string
): Promise<NodeJornada | null> {
  await validarProprietario();
  const node = obterNodeQualquerJornada(nodeId, journeyId);
  return node || null;
}

export interface SessaoJogoCarregada {
  slot: SaveSlot;
  node: NodeJornada;
  isNovo: boolean;
  cenaComposta?: CenaComposta;
}

/**
 * Carrega a sessão de jogo conectando o slot do usuário com o motor autoritativo.
 * Se o slot não existir, cria-o atomicamente com a ficha canônica da jornada.
 */
export async function carregarSessaoJogoAction(
  journeyId?: string,
  slotNumber = 1,
  modoDesejado?: 'cronica' | 'padrao' | 'juramento'
): Promise<SessaoJogoCarregada> {
  const user = await validarProprietario();
  const jId = normalizarIdJornada(journeyId);
  const repo = getSaveRepository();

  const slotExistente = await repo.obterSlot(user.id, jId, slotNumber);
  if (slotExistente.ok) {
    const node = obterNodeQualquerJornada(slotExistente.valor.currentNodeId, jId);
    if (node) {
      const cenaComposta = comporCena(node, {
        ficha: slotExistente.valor.characterSheet,
        worldState: slotExistente.valor.worldState,
        modo: slotExistente.valor.modo || 'padrao',
      });
      return { slot: slotExistente.valor, node, cenaComposta, isNovo: false };
    }
  }

  // Criação de novo slot com o início canônico
  const inicial = obterCenaInicialJornada(jId);
  const modoFinal = modoDesejado || 'padrao';
  const fichaInicial = { ...inicial.fichaInicial };
  if (modoFinal === 'cronica') {
    fichaInicial.inspiracao = Math.min(4, (fichaInicial.inspiracao ?? 2) + 1);
  }

  const resCriar = await repo.criarSlot({
    userId: user.id,
    jornadaId: jId,
    slotNumber,
    currentNodeId: inicial.node.id,
    characterSheet: fichaInicial,
    worldState: inicial.worldStateInicial,
    modo: modoFinal,
  });

  if (!resCriar.ok) {
    throw new Error(`Falha ao inicializar slot: ${resCriar.mensagem}`);
  }

  const cenaComposta = comporCena(inicial.node, {
    ficha: resCriar.valor.characterSheet,
    worldState: resCriar.valor.worldState,
    modo: modoFinal,
  });

  return { slot: resCriar.valor, node: inicial.node, cenaComposta, isNovo: true };
}

export interface ProcessarEscolhaParams {
  slotId: string;
  escolhaId: string;
  versaoEsperada: number;
  dadosFixos?: [number, number];
  usarIA?: boolean;
  journeyId?: string;
}

export interface RespostaTurnoAction {
  proximoNode: NodeJornada;
  resultadoRolagem: ResultadoRolagem | null;
  fichaAtualizada: FichaPersonagem;
  worldStateAtualizado: WorldState;
  turnEvent: TurnEvent;
  slotAtualizado?: SaveSlot;
  classificacao?: ClassificacaoAcaoLivre;
  textoEnriquecido?: string;
  vozesExtras?: VozExtra[];
  usouFallbackIA?: boolean;
  notificacoesCompanheiros?: string[];
  escolhaRealizada?: EscolhaNode;
  ponte?: string;
  marcasRecebidas?: string[];
  cenaComposta?: CenaComposta;
}

/**
 * Processamento autoritativo de turno.
 * Rejeita qualquer mutação de estado enviada pelo cliente.
 */
export async function processarEscolhaAction(
  params: ProcessarEscolhaParams
): Promise<RespostaTurnoAction> {
  const user = await validarProprietario();

  if (!params.slotId || typeof params.versaoEsperada !== 'number') {
    throw new Error('slotId e versaoEsperada são obrigatórios para a execução autoritativa do turno.');
  }

  const resTurno = await executarTurnoAutoritativo({
    userId: user.id,
    slotId: params.slotId,
    escolhaId: params.escolhaId,
    versaoEsperada: params.versaoEsperada,
    journeyId: params.journeyId,
    dadosFixos: params.dadosFixos,
  });

  const ultimoEvento = resTurno.novoSlot.turnHistory[resTurno.novoSlot.turnHistory.length - 1];

  const resultadoFaixa = resTurno.resultadoRolagem?.resultado
    ? (resTurno.resultadoRolagem.resultado.toLowerCase() as 'critico' | 'sucesso' | 'parcial' | 'falha')
    : undefined;

  const cenaComposta = comporCena(resTurno.proximoNode, {
    ficha: resTurno.novoSlot.characterSheet,
    worldState: resTurno.novoSlot.worldState,
    ultimaEscolhaId: params.escolhaId,
    ultimoResultado: resultadoFaixa,
    ponteAnterior: resTurno.ponte,
    marcasRecebidas: resTurno.marcasRecebidas,
    modo: resTurno.novoSlot.modo || 'padrao',
  });

  // O turno autoritativo responde de imediato (< 300ms) com o texto canônico da cena.
  // O enriquecimento por IA é assíncrono e executado fora do caminho crítico via obterTextoMestreAction.
  return {
    proximoNode: resTurno.proximoNode,
    resultadoRolagem: resTurno.resultadoRolagem,
    fichaAtualizada: resTurno.novoSlot.characterSheet,
    worldStateAtualizado: resTurno.novoSlot.worldState,
    turnEvent: ultimoEvento,
    slotAtualizado: resTurno.novoSlot,
    textoEnriquecido: cenaComposta.textoPrincipal || resTurno.proximoNode.fallbackText,
    vozesExtras: [],
    usouFallbackIA: true,
    notificacoesCompanheiros: resTurno.notificacoesCompanheiros,
    escolhaRealizada: resTurno.escolhaRealizada,
    ponte: resTurno.ponte,
    marcasRecebidas: resTurno.marcasRecebidas,
    cenaComposta,
  };
}

/**
 * Consulta de enriquecimento de IA fora do caminho crítico de renderização da cena.
 * Consulta o cache determinístico persistente e valida a cota diária antes de chamar o Gemini.
 */
export async function obterTextoMestreAction(params: {
  slotId: string;
  nodeId: string;
  journeyId?: string;
  escolhaTexto?: string;
  resultadoDado?: ResultadoRolagem | null;
}) {
  const user = await validarProprietario();
  const repo = getSaveRepository();
  const resSlot = await repo.obterSlotPorId(user.id, params.slotId);
  if (!resSlot.ok) {
    throw new Error('Slot não encontrado para gerar narrativa do Mestre.');
  }

  const node = obterNodeQualquerJornada(params.nodeId, params.journeyId);
  if (!node) {
    throw new Error('Cena não encontrada.');
  }

  return enriquecerCenaComIA({
    userId: user.id,
    jornadaId: resSlot.valor.jornadaId || params.journeyId,
    noDestino: node,
    resultadoDado: params.resultadoDado || null,
    escolhaTexto: params.escolhaTexto || '',
    ficha: resSlot.valor.characterSheet,
    worldState: resSlot.valor.worldState,
  });
}

/**
 * Desfaz o último turno restaurando com precisão o snapshot anterior via pilha append-only.
 */
export async function desfazerTurnoAction(
  slotId: string,
  versaoEsperada?: number
): Promise<{ slot: SaveSlot; node: NodeJornada; cenaComposta?: CenaComposta }> {
  const user = await validarProprietario();
  const repo = getSaveRepository();
  const res = await repo.desfazerUltimoTurno(user.id, slotId, versaoEsperada);
  if (!res.ok) {
    throw new Error(res.mensagem);
  }
  const node = obterNodeQualquerJornada(res.valor.currentNodeId, res.valor.jornadaId);
  if (!node) {
    throw new Error(`Cena restaurada '${res.valor.currentNodeId}' não encontrada no grafo.`);
  }
  const cenaComposta = comporCena(node, {
    ficha: res.valor.characterSheet,
    worldState: res.valor.worldState,
    modo: res.valor.modo || 'padrao',
  });
  return { slot: res.valor, node, cenaComposta };
}

export interface RerrolarInspiracaoParams {
  slotId: string;
  versaoEsperada: number;
  escolhaId?: string;
  journeyId?: string;
  dadosFixos?: [number, number];
  usarIA?: boolean;
}

/**
 * Rerrolagem atômica com Inspiração realizada no servidor.
 */
export async function rerrolarTesteInspiracaoAction(
  params: RerrolarInspiracaoParams
): Promise<RespostaTurnoAction> {
  const user = await validarProprietario();

  if (!params.slotId || typeof params.versaoEsperada !== 'number') {
    throw new Error('slotId e versaoEsperada são obrigatórios para rerrolar com Inspiração.');
  }

  const resTurno = await rerrolarComInspiracao({
    userId: user.id,
    slotId: params.slotId,
    versaoEsperada: params.versaoEsperada,
    escolhaId: params.escolhaId,
    journeyId: params.journeyId,
    dadosFixos: params.dadosFixos,
  });

  const ultimoEvento = resTurno.novoSlot.turnHistory[resTurno.novoSlot.turnHistory.length - 1];

  const resultadoFaixaRerrolada = resTurno.resultadoRolagem?.resultado
    ? (resTurno.resultadoRolagem.resultado.toLowerCase() as 'critico' | 'sucesso' | 'parcial' | 'falha')
    : undefined;

  const cenaComposta = comporCena(resTurno.proximoNode, {
    ficha: resTurno.novoSlot.characterSheet,
    worldState: resTurno.novoSlot.worldState,
    ultimaEscolhaId: params.escolhaId,
    ultimoResultado: resultadoFaixaRerrolada,
    ponteAnterior: resTurno.ponte,
    marcasRecebidas: resTurno.marcasRecebidas,
    modo: resTurno.novoSlot.modo || 'padrao',
  });

  let textoEnriquecido = cenaComposta.textoPrincipal || resTurno.proximoNode.fallbackText;
  let vozesExtras: VozExtra[] = [];
  let usouFallbackIA = true;

  if (params.usarIA) {
    const resIA = await enriquecerCenaComIA({
      jornadaId: resTurno.novoSlot.jornadaId || params.journeyId,
      noDestino: resTurno.proximoNode,
      resultadoDado: resTurno.resultadoRolagem,
      escolhaTexto: resTurno.escolhaRealizada.texto,
      ficha: resTurno.novoSlot.characterSheet,
      worldState: resTurno.novoSlot.worldState,
    });
    textoEnriquecido = resIA.textoEnriquecido;
    vozesExtras = resIA.vozesExtras;
    usouFallbackIA = resIA.usouFallback;
  }

  return {
    proximoNode: resTurno.proximoNode,
    resultadoRolagem: resTurno.resultadoRolagem,
    fichaAtualizada: resTurno.novoSlot.characterSheet,
    worldStateAtualizado: resTurno.novoSlot.worldState,
    turnEvent: ultimoEvento,
    slotAtualizado: resTurno.novoSlot,
    textoEnriquecido,
    vozesExtras,
    usouFallbackIA,
    notificacoesCompanheiros: resTurno.notificacoesCompanheiros,
    escolhaRealizada: resTurno.escolhaRealizada,
    ponte: resTurno.ponte,
    marcasRecebidas: resTurno.marcasRecebidas,
    cenaComposta,
  };
}

export interface ProcessarAcaoLivreParams {
  slotId: string;
  versaoEsperada: number;
  nodeId: string;
  textoAcaoLivre: string;
  journeyId?: string;
  dadosFixos?: [number, number];
  usarIA?: boolean;
}

export async function processarAcaoLivreAction(
  params: ProcessarAcaoLivreParams
): Promise<RespostaTurnoAction> {
  const user = await validarProprietario();
  const repo = getSaveRepository();

  const resSlot = await repo.obterSlotPorId(user.id, params.slotId);
  if (!resSlot.ok) {
    throw new Error(`Slot '${params.slotId}' não encontrado para processar ação livre.`);
  }

  const slot = resSlot.valor;
  const nodeAtual = obterNodeQualquerJornada(params.nodeId, params.journeyId || slot.jornadaId);
  if (!nodeAtual) throw new Error(`Cena '${params.nodeId}' não encontrada.`);

  const classificacao = await classificarAcaoLivre(
    params.textoAcaoLivre,
    nodeAtual,
    slot.characterSheet
  );

  const resEscolha = await processarEscolhaAction({
    slotId: params.slotId,
    escolhaId: classificacao.escolhaId,
    versaoEsperada: params.versaoEsperada,
    dadosFixos: params.dadosFixos,
    usarIA: params.usarIA,
    journeyId: params.journeyId || slot.jornadaId,
  });

  resEscolha.turnEvent.choiceMade = `[Ação Livre] ${params.textoAcaoLivre}`;
  resEscolha.classificacao = classificacao;

  return resEscolha;
}

export interface ObterPreviaTentativaParams {
  slotId: string;
  nodeId: string;
  texto: string;
  journeyId?: string;
}

/**
 * Retorna a prévia determinística no estilo BG3 antes de o jogador confirmar a rolagem.
 */
export async function obterPreviaTentativaLivreAction(
  params: ObterPreviaTentativaParams
): Promise<PreviaTentativaLivre> {
  const user = await validarProprietario();
  const repo = getSaveRepository();

  const resSlot = await repo.obterSlotPorId(user.id, params.slotId);
  if (!resSlot.ok) {
    throw new Error(`Slot '${params.slotId}' não encontrado.`);
  }

  const slot = resSlot.valor;
  const node = obterNodeQualquerJornada(params.nodeId, params.journeyId || slot.jornadaId);
  if (!node) {
    throw new Error(`Cena '${params.nodeId}' não encontrada.`);
  }

  return calcularPreviaTentativaLivre({
    texto: params.texto,
    node,
    ficha: slot.characterSheet,
    turnHistory: slot.turnHistory,
  });
}

export interface ExecutarTentativaLivreActionParams {
  slotId: string;
  versaoEsperada: number;
  texto: string;
  journeyId?: string;
  dadosFixos?: [number, number];
}

/**
 * Executa a tentativa livre no servidor de forma autoritativa com tabela fechada de efeitos.
 * O nó da cena permanece estritamente o mesmo.
 */
export async function executarTentativaLivreAction(
  params: ExecutarTentativaLivreActionParams
): Promise<RespostaTentativaLivre> {
  const user = await validarProprietario();

  if (!params.slotId || typeof params.versaoEsperada !== 'number') {
    throw new Error('slotId e versaoEsperada são obrigatórios para executar a tentativa livre.');
  }

  return executarTentativaLivre({
    userId: user.id,
    slotId: params.slotId,
    versaoEsperada: params.versaoEsperada,
    textoAcao: params.texto,
    journeyId: params.journeyId,
    dadosFixos: params.dadosFixos,
  });
}
