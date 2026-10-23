'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { TopBar } from '@/components/game/TopBar';
import { TelaDeFinal } from '@/components/game/TelaDeFinal';
import { CharacterPanel } from '@/components/game/CharacterPanel';
import { NarrativeScroll, EscolhaNarrativa } from '@/components/game/NarrativeScroll';
import { IntervencaoVoz } from '@/components/game/InternalVoices';
import { DiceRoller2d6 } from '@/components/game/DiceRoller2d6';
import { WesterosMapSVG } from '@/components/game/WesterosMapSVG';
import { ChronicleTimeline } from '@/components/game/ChronicleTimeline';
import { MobileDrawerNav } from '@/components/game/MobileDrawerNav';
import { FichaPersonagem, ResultadoRolagem, WorldState, obterCompanheirosIniciais } from '@/server/engine/rpgEngine';
import type { TurnEvent, SaveSlot } from '@/server/saves';
import { exportarSaveAction } from '@/app/actions/slotActions';
import { NodeJornada } from '@/server/engine/storyLinter';
import { VerbeteGlossario } from '@/server/data/lore';
import { getGlossaryEntriesAction } from '@/app/actions/loreActions';
import {
  carregarSessaoJogoAction,
  obterCenaInicialAction,
  obterCenaPorIdAction,
  processarEscolhaAction,
  processarAcaoLivreAction,
  rerrolarTesteInspiracaoAction,
} from '@/app/actions/gameActions';
import { Map, Dices, Scroll } from 'lucide-react';

function getTituloJornadaFormatado(id: string): string {
  const lower = id.toLowerCase();
  if (lower.includes('danca') || lower.includes('jornada_2')) {
    return 'Jornada 2: A Dança dos Dragões';
  }
  if (lower.includes('tronos') || lower.includes('guerra') || lower.includes('jornada_3')) {
    return 'Jornada 3: A Guerra dos Cinco Reis';
  }
  return 'Jornada 1: A Conquista de Aegon';
}

function JogarJogoInterno() {
  const searchParams = useSearchParams();
  const journeyParam = searchParams.get('journey') || 'conquista_aegon';
  const slotParam = searchParams.get('slot') ? parseInt(searchParams.get('slot')!) : 1;

  const [modoIA, setModoIA] = useState(true);
  const [nodeAtual, setNodeAtual] = useState<NodeJornada | null>(null);
  const [textoCenaExibido, setTextoCenaExibido] = useState<string>('');
  const [vozesExibidas, setVozesExibidas] = useState<IntervencaoVoz[]>([]);
  const [verbetes, setVerbetes] = useState<VerbeteGlossario[]>([]);
  const [abaLateral, setAbaLateral] = useState<'mapa' | 'dados' | 'diario'>('mapa');
  const [resultadoRolagem, setResultadoRolagem] = useState<ResultadoRolagem | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [carregando, setCarregando] = useState(true);
  const [notificacoesCompanheiros, setNotificacoesCompanheiros] = useState<string[]>([]);
  const [ultimaEscolhaId, setUltimaEscolhaId] = useState<string | null>(null);
  const [ultimoNodeId, setUltimoNodeId] = useState<string | null>(null);

  const [ficha, setFicha] = useState<FichaPersonagem>({
    id: 'aegon-conquistador',
    nome: 'Aegon I Targaryen',
    origem: 'sangue_valiriano',
    inspiracao: 2,
    atributos: {
      comando: 5,
      furia: 4,
      astucia: 3,
      cortesia: 3,
      erudicao: 3,
      pressagio: 4,
    },
    estado: {
      sangue: 10,
      compostura: 10,
      honra: 5,
    },
    cicatrizes: [],
    segredos: ['A profecia de Daenys a Sonhadora'],
    companheiros: obterCompanheirosIniciais('j1_conquista'),
  });

  const [worldState, setWorldState] = useState<WorldState>({
    reputacaoCasas: { Targaryen: 10 },
    flagsBorboleta: { jogo_iniciado: true },
    marcosConcluidos: ['inicio_campanha'],
  });

  const [historico, setHistorico] = useState<TurnEvent[]>([]);
  const [slotAtual, setSlotAtual] = useState<SaveSlot | null>(null);
  const [statusSalvamento, setStatusSalvamento] = useState<'salvo' | 'salvando' | 'erro'>('salvo');

  useEffect(() => {
    setCarregando(true);
    setStatusSalvamento('salvando');
    const slotNum = slotParam;

    Promise.all([
      getGlossaryEntriesAction(),
      carregarSessaoJogoAction(journeyParam, slotNum),
    ])
      .then(([verbetesData, sessaoData]) => {
        setVerbetes(verbetesData);
        setSlotAtual(sessaoData.slot);
        setNodeAtual(sessaoData.node);
        setTextoCenaExibido(sessaoData.node.fallbackText);
        setVozesExibidas(sessaoData.node.internalVoices || []);
        setFicha(sessaoData.slot.characterSheet);
        setWorldState(sessaoData.slot.worldState);
        setHistorico(sessaoData.slot.turnHistory || []);
        setStatusSalvamento('salvo');
        setCarregando(false);
      })
      .catch((err) => {
        setFeedback('Erro ao carregar crônica: ' + err.message);
        setStatusSalvamento('erro');
        setCarregando(false);
      });
  }, [journeyParam, slotParam]);

  async function handleEscolha(escolhaId: string) {
    if (!nodeAtual) return;

    try {
      setFeedback('Consultando os desígnios da crônica...');
      setUltimoNodeId(nodeAtual.id);
      setUltimaEscolhaId(escolhaId);

      setStatusSalvamento('salvando');
      const res = await processarEscolhaAction({
        nodeId: nodeAtual.id,
        escolhaId,
        slotId: slotAtual?.id,
        versaoEsperada: slotAtual?.versao,
        ficha,
        worldState,
        turnNumber: historico.length + 1,
        usarIA: modoIA,
        journeyId: journeyParam,
      });

      if (res.slotAtualizado) {
        setSlotAtual(res.slotAtualizado);
      }
      setStatusSalvamento('salvo');

      setNodeAtual(res.proximoNode);
      setTextoCenaExibido(res.textoEnriquecido || res.proximoNode.fallbackText);

      const vozesBase = res.proximoNode.internalVoices || [];
      const vozesAdicionadas: IntervencaoVoz[] = (res.vozesExtras || []).map((v) => ({
        atributo: v.voz,
        fala: v.fala,
      }));
      setVozesExibidas([...vozesBase, ...vozesAdicionadas]);

      setFicha(res.fichaAtualizada);
      setWorldState(res.worldStateAtualizado);
      setHistorico([res.turnEvent, ...historico]);

      if (res.notificacoesCompanheiros && res.notificacoesCompanheiros.length > 0) {
        setNotificacoesCompanheiros(res.notificacoesCompanheiros);
      } else {
        setNotificacoesCompanheiros([]);
      }

      if (res.resultadoRolagem) {
        setResultadoRolagem(res.resultadoRolagem);
        setAbaLateral('dados');
        setFeedback(`Rolagem 2d6: [${res.resultadoRolagem.resultado}] Total ${res.resultadoRolagem.total} vs DC ${res.resultadoRolagem.dc}`);
      } else {
        setFeedback(`Decisão tomada: "${res.turnEvent.choiceMade}"`);
      }
    } catch (err: any) {
      setFeedback('Erro ao processar escolha: ' + err.message);
    }
  }

  async function handleRerrolarComInspiracao() {
    if (!ultimoNodeId || !ultimaEscolhaId) {
      setFeedback('Nenhum teste recente para rerrolar com Inspiração.');
      return;
    }
    if ((ficha.inspiracao ?? 0) <= 0) {
      setFeedback('Não possuís Pontos de Inspiração suficientes.');
      return;
    }

    try {
      setFeedback('✨ Gastando 1 Ponto de Inspiração para rerrolar o teste...');
      const res = await rerrolarTesteInspiracaoAction({
        nodeId: ultimoNodeId,
        escolhaId: ultimaEscolhaId,
        ficha,
        worldState,
        turnNumber: historico.length,
        journeyId: journeyParam,
      });

      setNodeAtual(res.proximoNode);
      setTextoCenaExibido(res.textoEnriquecido || res.proximoNode.fallbackText);
      setFicha(res.fichaAtualizada);
      setWorldState(res.worldStateAtualizado);

      if (res.resultadoRolagem) {
        setResultadoRolagem(res.resultadoRolagem);
        setFeedback(`✨ Rerrolagem com Inspiração: [${res.resultadoRolagem.resultado}] Total ${res.resultadoRolagem.total} vs DC ${res.resultadoRolagem.dc}`);
      }
    } catch (err: any) {
      setFeedback('Erro ao rerrolar com Inspiração: ' + err.message);
    }
  }

  async function handleAcaoLivre(textoAcao: string) {
    if (!nodeAtual) return;

    try {
      setFeedback('O Mestre IA está interpretando vossa ação livre...');
      const res = await processarAcaoLivreAction({
        nodeId: nodeAtual.id,
        textoAcaoLivre: textoAcao,
        ficha,
        worldState,
        turnNumber: historico.length + 1,
        usarIA: modoIA,
        journeyId: journeyParam,
      });

      setNodeAtual(res.proximoNode);
      setTextoCenaExibido(res.textoEnriquecido || res.proximoNode.fallbackText);

      const vozesBase = res.proximoNode.internalVoices || [];
      const vozesAdicionadas: IntervencaoVoz[] = (res.vozesExtras || []).map((v) => ({
        atributo: v.voz,
        fala: v.fala,
      }));
      setVozesExibidas([...vozesBase, ...vozesAdicionadas]);

      setFicha(res.fichaAtualizada);
      setWorldState(res.worldStateAtualizado);
      setHistorico([res.turnEvent, ...historico]);

      if (res.notificacoesCompanheiros && res.notificacoesCompanheiros.length > 0) {
        setNotificacoesCompanheiros(res.notificacoesCompanheiros);
      } else {
        setNotificacoesCompanheiros([]);
      }

      if (res.resultadoRolagem) {
        setResultadoRolagem(res.resultadoRolagem);
        setAbaLateral('dados');
      }

      const msgClassificacao = res.classificacao
        ? `[Mestre]: ${res.classificacao.justificativa}`
        : `Ação livre executada: "${textoAcao}"`;
      setFeedback(msgClassificacao);
    } catch (err: any) {
      setFeedback('Erro ao processar ação livre: ' + err.message);
    }
  }

  async function handleDesfazerTurno() {
    if (historico.length <= 1) {
      setFeedback('Nenhum turno anterior para desfazer.');
      return;
    }

    const [_, turnoAnterior, ...resto] = historico;
    try {
      const nodeRestaurado = await obterCenaPorIdAction(turnoAnterior.nodeId, journeyParam);
      if (nodeRestaurado) {
        setNodeAtual(nodeRestaurado);
        setTextoCenaExibido(nodeRestaurado.fallbackText);
        setVozesExibidas(nodeRestaurado.internalVoices || []);
        setHistorico([turnoAnterior, ...resto]);
        setFeedback(`Turno desfeito. Retornado à cena '${nodeRestaurado.titulo}'.`);
      }
    } catch (err: any) {
      setFeedback('Erro ao desfazer turno: ' + err.message);
    }
  }

  async function handleVoltarCheckpoint() {
    try {
      const inicio = await obterCenaInicialAction(journeyParam);
      setNodeAtual(inicio.node);
      setTextoCenaExibido(inicio.node.fallbackText);
      setVozesExibidas(inicio.node.internalVoices || []);
      setFicha(inicio.fichaInicial);
      setWorldState(inicio.worldStateInicial);
      setHistorico([
        {
          slotId: `slot_${slotParam}`,
          userId: inicio.fichaInicial.id,
          turnNumber: 1,
          nodeId: inicio.node.id,
          choiceMade: 'Reinício no Checkpoint Inicial da Era',
          stateDelta: {},
          snapshotAntes: {
            ficha: inicio.fichaInicial,
            worldState: inicio.worldStateInicial,
            nodeId: inicio.node.id,
          },
          resultado: {},
          timestamp: new Date().toISOString(),
        },
      ]);
      setFeedback('Retornado com sucesso ao início do Ato I.');
    } catch (err: any) {
      setFeedback('Erro ao voltar ao checkpoint: ' + err.message);
    }
  }

  async function handleExportarSave() {
    try {
      const json = await exportarSaveAction(journeyParam, slotParam);
      const blob = new Blob([json], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `save_${journeyParam}_slot_${slotParam}_${Date.now()}.json`;
      a.click();
      URL.revokeObjectURL(url);
      setFeedback('Save exportado com sucesso em .json!');
    } catch (err: any) {
      setFeedback('Erro ao exportar: ' + err.message);
    }
  }

  if (carregando || !nodeAtual) {
    return (
      <div className="min-h-screen bg-[#0d0b0a] text-[#C5A059] flex items-center justify-center font-cinzel text-lg">
        Consultando os pergaminhos da Cidadela...
      </div>
    );
  }

  const paragrafos = textoCenaExibido
    .split('\n\n')
    .map((p) => p.trim())
    .filter((p) => p.length > 0);

  const escolhasNarrativas: EscolhaNarrativa[] = nodeAtual.escolhas.map((e) => ({
    id: e.id,
    texto: e.texto,
    tipo: e.tipo,
    atributo: e.tipo === 'teste_atributo' ? e.atributo : undefined,
    dc: e.tipo === 'teste_atributo' ? e.dc : undefined,
    riscoMortal: e.tipo === 'teste_atributo' ? e.riscoMortal : undefined,
    requiredFlags: e.requiredFlags,
    forbiddenFlags: e.forbiddenFlags,
    tagOrigem: e.tagOrigem,
    motivoBloqueio: e.motivoBloqueio,
    aprovacaoCompanheiros: e.aprovacaoCompanheiros,
  }));

  const regiaoAtiva = nodeAtual.regionId || 'pedra_dragao';
  const worldFlags = Object.keys(worldState.flagsBorboleta || {});

  return (
    <div className="min-h-screen bg-[#0d0b0a] text-[#E6DEC8] flex flex-col font-garamond pb-20 lg:pb-8">
      {/* Barra de Topo */}
      <TopBar
        jornadaTitulo={getTituloJornadaFormatado(journeyParam)}
        atoTitulo={nodeAtual.titulo}
        anoHistorico={nodeAtual.anoHistorico || '2 a.C.'}
        localizacao={nodeAtual.localizacao || 'Westeros'}
        slotAtivo={slotParam}
        statusSalvamento={statusSalvamento === 'salvando' ? 'Sincronizando...' : statusSalvamento === 'erro' ? 'Erro ao Gravar' : 'Sincronizado'}
        modoIA={modoIA}
        onToggleModoIA={() => setModoIA(!modoIA)}
      />

      {feedback && (
        <div className="max-w-7xl mx-auto w-full px-4 pt-3">
          <div className="p-3 bg-[#1e1713] border border-[#C5A059]/60 rounded-xl text-amber-200 text-xs flex items-center justify-between">
            <span>{feedback}</span>
            <button
              onClick={() => setFeedback(null)}
              className="text-amber-400 underline cursor-pointer text-[11px]"
            >
              Fechar
            </button>
          </div>
        </div>
      )}

      {/* Conteúdo Principal Responsivo (12 Colunas) */}
      {nodeAtual.isEnding ? (
        <main className="max-w-4xl mx-auto w-full p-4 flex-1">
          <TelaDeFinal
            node={nodeAtual}
            ficha={ficha}
            worldState={worldState}
            jornadaId={journeyParam}
            slotNumber={slotParam}
            onRecomecar={handleVoltarCheckpoint}
          />
        </main>
      ) : (
        <main className="max-w-7xl mx-auto w-full p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 flex-1 items-start">
        {/* Coluna Esquerda (3 cols): Ficha do Personagem */}
        <div className="hidden lg:block lg:col-span-3 sticky top-16">
          <CharacterPanel ficha={ficha} />
        </div>

        {/* Coluna Central (6 cols): Rolo Narrativo */}
        <div className="col-span-1 lg:col-span-6">
          <NarrativeScroll
            nodeId={nodeAtual.id}
            atoTitulo={nodeAtual.titulo}
            anoHistorico={nodeAtual.anoHistorico || '2 a.C.'}
            localizacao={nodeAtual.localizacao || 'Westeros'}
            paragrafos={paragrafos}
            conditionalParagraphs={nodeAtual.conditionalParagraphs || []}
            worldFlags={worldFlags}
            notificacoesCompanheiros={notificacoesCompanheiros}
            vozesInternas={vozesExibidas}
            escolhas={escolhasNarrativas}
            verbetes={verbetes}
            onEscolha={handleEscolha}
            onAcaoLivre={handleAcaoLivre}
          />
        </div>

        {/* Coluna Direita (3 cols): Mapa, Dados e Diário */}
        <div className="hidden lg:block lg:col-span-3 sticky top-16 space-y-4">
          <div className="grid grid-cols-3 gap-1 bg-[#12100E] p-1 rounded-xl border border-[#2D2620] text-center font-cinzel">
            <button
              onClick={() => setAbaLateral('mapa')}
              className={`py-1.5 px-2 rounded-lg text-xs font-bold transition-colors flex items-center justify-center gap-1 cursor-pointer ${
                abaLateral === 'mapa'
                  ? 'bg-[#C5A059] text-black shadow'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Map className="w-3.5 h-3.5" />
              <span>Mapa</span>
            </button>

            <button
              onClick={() => setAbaLateral('dados')}
              className={`py-1.5 px-2 rounded-lg text-xs font-bold transition-colors flex items-center justify-center gap-1 cursor-pointer ${
                abaLateral === 'dados'
                  ? 'bg-[#C5A059] text-black shadow'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Dices className="w-3.5 h-3.5" />
              <span>Dados</span>
            </button>

            <button
              onClick={() => setAbaLateral('diario')}
              className={`py-1.5 px-2 rounded-lg text-xs font-bold transition-colors flex items-center justify-center gap-1 cursor-pointer ${
                abaLateral === 'diario'
                  ? 'bg-[#C5A059] text-black shadow'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Scroll className="w-3.5 h-3.5" />
              <span>Diário</span>
            </button>
          </div>

          <div className="transition-all">
            {abaLateral === 'mapa' && <WesterosMapSVG regiaoAtualId={regiaoAtiva} />}
            {abaLateral === 'dados' && (
              <DiceRoller2d6
                resultado={resultadoRolagem}
                inspiracao={ficha.inspiracao ?? 2}
                onRerrolarComInspiracao={handleRerrolarComInspiracao}
              />
            )}
            {abaLateral === 'diario' && (
              <ChronicleTimeline
                historico={historico}
                onDesfazerTurno={handleDesfazerTurno}
                onVoltarCheckpoint={handleVoltarCheckpoint}
                onExportarSave={handleExportarSave}
              />
            )}
          </div>
        </div>
      </main>
      )}

      {/* Gavetas deslizantes Mobile para celular (Ficha, Mapa e Diário) */}
      <MobileDrawerNav
        renderFicha={() => <CharacterPanel ficha={ficha} />}
        renderMapa={() => <WesterosMapSVG regiaoAtualId={regiaoAtiva} />}
        renderDados={() => (
          <DiceRoller2d6
            resultado={resultadoRolagem}
            inspiracao={ficha.inspiracao ?? 2}
            onRerrolarComInspiracao={handleRerrolarComInspiracao}
          />
        )}
        renderDiario={() => (
          <ChronicleTimeline
            historico={historico}
            onDesfazerTurno={handleDesfazerTurno}
            onVoltarCheckpoint={handleVoltarCheckpoint}
            onExportarSave={handleExportarSave}
          />
        )}
      />
    </div>
  );
}

export default function JogarPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#0d0b0a] text-[#C5A059] flex items-center justify-center font-cinzel text-lg">
          Abrindo os pergaminhos de Westeros...
        </div>
      }
    >
      <JogarJogoInterno />
    </Suspense>
  );
}
