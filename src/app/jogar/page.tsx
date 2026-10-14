'use client';

import React, { useState, useEffect } from 'react';
import { TopBar } from '@/components/game/TopBar';
import { CharacterPanel } from '@/components/game/CharacterPanel';
import { NarrativeScroll, EscolhaNarrativa } from '@/components/game/NarrativeScroll';
import { DiceRoller2d6 } from '@/components/game/DiceRoller2d6';
import { WesterosMapSVG } from '@/components/game/WesterosMapSVG';
import { ChronicleTimeline } from '@/components/game/ChronicleTimeline';
import { MobileDrawerNav } from '@/components/game/MobileDrawerNav';
import { FichaPersonagem, ResultadoRolagem, WorldState } from '@/server/engine/rpgEngine';
import { TurnEvent, exportarSave } from '@/server/engine/saveManager';
import { NodeJornada } from '@/server/engine/storyLinter';
import { VerbeteGlossario } from '@/server/data/lore';
import { getGlossaryEntriesAction } from '@/app/actions/loreActions';
import {
  obterCenaInicialAction,
  obterCenaPorIdAction,
  processarEscolhaAction,
} from '@/app/actions/gameActions';
import { Map, Dices, Scroll } from 'lucide-react';

export default function JogarPage() {
  const [verbetes, setVerbetes] = useState<VerbeteGlossario[]>([]);
  const [nodeAtual, setNodeAtual] = useState<NodeJornada | null>(null);
  const [abaLateral, setAbaLateral] = useState<'mapa' | 'dados' | 'diario'>('mapa');
  const [resultadoRolagem, setResultadoRolagem] = useState<ResultadoRolagem | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [carregando, setCarregando] = useState(true);

  const [ficha, setFicha] = useState<FichaPersonagem>({
    id: 'aegon-conquistador',
    nome: 'Aegon I Targaryen',
    origem: 'sangue_valiriano',
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
    segredos: ['A carta secreta do Banco de Bravos', 'A profecia de Daenys a Sonhadora'],
  });

  const [worldState, setWorldState] = useState<WorldState>({
    reputacaoCasas: { Targaryen: 10 },
    flagsBorboleta: { jogo_iniciado: true },
    marcosConcluidos: ['2_ac_mesa_pintada'],
  });

  const [historico, setHistorico] = useState<TurnEvent[]>([]);

  useEffect(() => {
    // Carrega o glossário da Cidadela e a cena inicial do Ato 1
    Promise.all([getGlossaryEntriesAction(), obterCenaInicialAction()])
      .then(([verbetesData, cenaData]) => {
        setVerbetes(verbetesData);
        setNodeAtual(cenaData.node);
        setFicha(cenaData.fichaInicial);
        setWorldState(cenaData.worldStateInicial);
        setHistorico([
          {
            slotId: 'slot_1',
            userId: cenaData.fichaInicial.id,
            turnNumber: 1,
            nodeId: cenaData.node.id,
            choiceMade: 'Início da Crônica na Mesa Pintada',
            stateDelta: {},
            timestamp: new Date().toISOString(),
          },
        ]);
        setCarregando(false);
      })
      .catch((err) => {
        setFeedback('Erro ao carregar cena inicial: ' + err.message);
        setCarregando(false);
      });
  }, []);

  async function handleEscolha(escolhaId: string) {
    if (!nodeAtual) return;

    try {
      const res = await processarEscolhaAction({
        nodeId: nodeAtual.id,
        escolhaId,
        ficha,
        worldState,
        turnNumber: historico.length + 1,
      });

      setNodeAtual(res.proximoNode);
      setFicha(res.fichaAtualizada);
      setWorldState(res.worldStateAtualizado);
      setHistorico([res.turnEvent, ...historico]);

      if (res.resultadoRolagem) {
        setResultadoRolagem(res.resultadoRolagem);
        setAbaLateral('dados');
        setFeedback(`Rolagem: [${res.resultadoRolagem.resultado}] Total ${res.resultadoRolagem.total} vs DC ${res.resultadoRolagem.dc}`);
      } else {
        setFeedback(`Decisão tomada: "${res.turnEvent.choiceMade}"`);
      }
    } catch (err: any) {
      setFeedback('Erro ao processar escolha: ' + err.message);
    }
  }

  async function handleDesfazerTurno() {
    if (historico.length <= 1) {
      setFeedback('Nenhum turno anterior para desfazer.');
      return;
    }

    const [_, turnoAnterior, ...resto] = historico;
    try {
      const nodeRestaurado = await obterCenaPorIdAction(turnoAnterior.nodeId);
      if (nodeRestaurado) {
        setNodeAtual(nodeRestaurado);
        setHistorico([turnoAnterior, ...resto]);
        setFeedback(`Turno desfeito. Retornado à cena '${nodeRestaurado.titulo}'.`);
      }
    } catch (err: any) {
      setFeedback('Erro ao desfazer turno: ' + err.message);
    }
  }

  async function handleVoltarCheckpoint() {
    try {
      const inicio = await obterCenaInicialAction();
      setNodeAtual(inicio.node);
      setFicha(inicio.fichaInicial);
      setWorldState(inicio.worldStateInicial);
      setHistorico([
        {
          slotId: 'slot_1',
          userId: inicio.fichaInicial.id,
          turnNumber: 1,
          nodeId: inicio.node.id,
          choiceMade: 'Reinício no Checkpoint Inicial',
          stateDelta: {},
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
      const json = await exportarSave(ficha.id, 'jornada_1_conquista', 1);
      const blob = new Blob([json], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `save_conquista_ato1_${Date.now()}.json`;
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

  // Divide o fallbackText em parágrafos separados
  const paragrafos = nodeAtual.fallbackText
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
  }));

  const regiaoAtiva = nodeAtual.regionId || 'pedra_dragao';

  return (
    <div className="min-h-screen bg-[#0d0b0a] text-[#E6DEC8] flex flex-col font-garamond pb-20 lg:pb-8">
      
      {/* Barra de Topo */}
      <TopBar
        jornadaTitulo="Jornada 1: A Conquista de Aegon"
        atoTitulo={nodeAtual.titulo}
        anoHistorico={nodeAtual.anoHistorico || '2 a.C.'}
        localizacao={nodeAtual.localizacao || 'Westeros'}
        slotAtivo={1}
        statusSalvamento="Sincronizado"
      />

      {feedback && (
        <div className="max-w-7xl mx-auto w-full px-4 pt-3">
          <div className="p-3 bg-[#1e1713] border border-[#C5A059]/60 rounded-xl text-amber-200 text-xs flex items-center justify-between">
            <span>{feedback}</span>
            <button onClick={() => setFeedback(null)} className="text-amber-400 underline cursor-pointer text-[11px]">
              Fechar
            </button>
          </div>
        </div>
      )}

      {/* Conteúdo Principal Responsivo (12 Colunas) */}
      <main className="max-w-7xl mx-auto w-full p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 flex-1 items-start">
        
        {/* Coluna Esquerda (3 cols): Ficha do Personagem */}
        <div className="hidden lg:block lg:col-span-3 sticky top-16">
          <CharacterPanel ficha={ficha} />
        </div>

        {/* Coluna Central (6 cols): Rolo Narrativo */}
        <div className="col-span-1 lg:col-span-6">
          <NarrativeScroll
            atoTitulo={nodeAtual.titulo}
            anoHistorico={nodeAtual.anoHistorico || '2 a.C.'}
            localizacao={nodeAtual.localizacao || 'Westeros'}
            paragrafos={paragrafos}
            vozesInternas={nodeAtual.internalVoices || []}
            escolhas={escolhasNarrativas}
            verbetes={verbetes}
            onEscolha={handleEscolha}
            onAcaoLivre={(txt) => setFeedback(`Ação personalizada apresentada ao Mestre: "${txt}"`)}
          />
        </div>

        {/* Coluna Direita (3 cols): Mapa, Dados e Diário */}
        <div className="hidden lg:block lg:col-span-3 sticky top-16 space-y-4">
          <div className="grid grid-cols-3 gap-1 bg-[#12100E] p-1 rounded-xl border border-[#2D2620] text-center font-cinzel">
            <button
              onClick={() => setAbaLateral('mapa')}
              className={`py-1.5 px-2 rounded-lg text-xs font-bold transition-colors flex items-center justify-center gap-1 cursor-pointer ${
                abaLateral === 'mapa' ? 'bg-[#C5A059] text-black shadow' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Map className="w-3.5 h-3.5" />
              <span>Mapa</span>
            </button>

            <button
              onClick={() => setAbaLateral('dados')}
              className={`py-1.5 px-2 rounded-lg text-xs font-bold transition-colors flex items-center justify-center gap-1 cursor-pointer ${
                abaLateral === 'dados' ? 'bg-[#C5A059] text-black shadow' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Dices className="w-3.5 h-3.5" />
              <span>Dados</span>
            </button>

            <button
              onClick={() => setAbaLateral('diario')}
              className={`py-1.5 px-2 rounded-lg text-xs font-bold transition-colors flex items-center justify-center gap-1 cursor-pointer ${
                abaLateral === 'diario' ? 'bg-[#C5A059] text-black shadow' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Scroll className="w-3.5 h-3.5" />
              <span>Diário</span>
            </button>
          </div>

          {abaLateral === 'mapa' && <WesterosMapSVG regiaoAtualId={regiaoAtiva} />}
          {abaLateral === 'dados' && <DiceRoller2d6 resultado={resultadoRolagem} />}
          {abaLateral === 'diario' && (
            <ChronicleTimeline
              historico={historico}
              onDesfazerTurno={handleDesfazerTurno}
              onExportarSave={handleExportarSave}
              onVoltarCheckpoint={handleVoltarCheckpoint}
            />
          )}
        </div>

      </main>

      {/* Navegação Mobile com Gavetas Deslizantes */}
      <MobileDrawerNav
        renderFicha={() => <CharacterPanel ficha={ficha} />}
        renderMapa={() => <WesterosMapSVG regiaoAtualId={regiaoAtiva} />}
        renderDados={() => <DiceRoller2d6 resultado={resultadoRolagem} />}
        renderDiario={() => (
          <ChronicleTimeline
            historico={historico}
            onDesfazerTurno={handleDesfazerTurno}
            onExportarSave={handleExportarSave}
            onVoltarCheckpoint={handleVoltarCheckpoint}
          />
        )}
      />

    </div>
  );
}
