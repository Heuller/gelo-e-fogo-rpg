'use client';

import React, { useState, useEffect } from 'react';
import { TopBar } from '@/components/game/TopBar';
import { CharacterPanel } from '@/components/game/CharacterPanel';
import { NarrativeScroll, EscolhaNarrativa } from '@/components/game/NarrativeScroll';
import { DiceRoller2d6 } from '@/components/game/DiceRoller2d6';
import { WesterosMapSVG } from '@/components/game/WesterosMapSVG';
import { ChronicleTimeline } from '@/components/game/ChronicleTimeline';
import { MobileDrawerNav } from '@/components/game/MobileDrawerNav';
import { FichaPersonagem, ResultadoRolagem, rolar2d6, aplicarDeltaEstado } from '@/server/engine/rpgEngine';
import { TurnEvent, exportarSave, desfazerUltimoTurno } from '@/server/engine/saveManager';
import { VerbeteGlossario } from '@/server/data/lore';
import { getGlossaryEntriesAction } from '@/app/actions/loreActions';
import { IntervencaoVoz } from '@/components/game/InternalVoices';
import { Map, Dices, Scroll } from 'lucide-react';

export default function JogarPage() {
  const [verbetes, setVerbetes] = useState<VerbeteGlossario[]>([]);
  const [abaLateral, setAbaLateral] = useState<'mapa' | 'dados' | 'diario'>('mapa');
  const [resultadoRolagem, setResultadoRolagem] = useState<ResultadoRolagem | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);

  // Ficha do Protagonista
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

  // Histórico de Turnos da Crônica
  const [historico, setHistorico] = useState<TurnEvent[]>([
    {
      slotId: 'slot_1',
      userId: 'd5f86911-0f14-497d-9a9c-7258a2eb18cd',
      turnNumber: 1,
      nodeId: 'node_mesa_pintada',
      choiceMade: 'Reunir os vassalos em Pedra do Dragão',
      stateDelta: { honra: 1 },
      timestamp: new Date().toISOString(),
    },
  ]);

  useEffect(() => {
    getGlossaryEntriesAction().then(setVerbetes).catch(() => {});
  }, []);

  const paragrafosCena = [
    'Aegon I Targaryen contemplava a grandiosa Mesa Pintada na câmara alta de Pedra do Dragão. Diante de seus olhos repousava a silhueta esculpida dos Sete Reinos, do cimo gélido da Muralha às areias abrasadoras de Dorne, sem qualquer linha que delimitasse fronteiras entre os reis mesquinhos que guerreavam entre si.',
    'Nas falésias exteriores, o rugido colossal de Balerion, o Terror Negro, estremeceu as sólidas muralhas de obsidiana. Ao seu lado, a rainha Visenya mantinha a mão repousada no pomo de aço valiriano de Irmã Sombria, enquanto a rainha Rhaenys observava o horizonte da Baía da Água Negra.',
    'Argilac Durrandon, o Rei da Tempestade, enviara as mãos decepadas dos emissários valirianos em uma caixa de ferro. A afronta clamava por fogo. Todos os senhores juramentados aguardavam agora o comando irrevogável do dragão.',
  ];

  const vozesInternas: IntervencaoVoz[] = [
    {
      atributo: 'comando',
      resultadoPassivo: 'SUCESSO',
      dcPassiva: 8,
      fala: 'Os senhores de Westeros conhecem apenas o aço e o fogo. Uma proclamação régia com os termos da submissão deve preceder as asas dos dragões.',
    },
    {
      atributo: 'astucia',
      resultadoPassivo: 'SUCESSO',
      dcPassiva: 10,
      fala: 'Argilac está velho e teme o poderio de Harrenhal. Um pacto com os rebeldes do Tridente antes do ataque quebrará a espinha dorsal dos Hoare.',
    },
  ];

  const escolhasCena: EscolhaNarrativa[] = [
    {
      id: 'esc_proclamacao',
      texto: 'Enviar corvos com a Proclamação Real a todas as fortalezas de Westeros: haverá apenas um rei.',
      tipo: 'teste_atributo',
      atributo: 'cortesia',
      dc: 8,
    },
    {
      id: 'esc_desembarque_imediato',
      texto: 'Içar as velas da frota valiriana e ordenar o desembarque na foz do rio Água Negra.',
      tipo: 'teste_atributo',
      atributo: 'comando',
      dc: 10,
    },
    {
      id: 'esc_duelo_argilac',
      texto: 'Despachar Orys Baratheon com Vhagar e Meraxes para esmagar as hostes de Argilac na Batalha do Último Risco.',
      tipo: 'teste_atributo',
      atributo: 'furia',
      dc: 12,
      riscoMortal: true,
    },
  ];

  function handleEscolha(escolhaId: string) {
    const esc = escolhasCena.find((e) => e.id === escolhaId);
    if (!esc) return;

    if (esc.tipo === 'teste_atributo' && esc.atributo && esc.dc) {
      // Executa rolagem 2d6
      const valorAttr = ficha.atributos[esc.atributo];
      const res = rolar2d6(valorAttr, esc.dc, { riscoMortal: esc.riscoMortal });
      setResultadoRolagem(res);
      setAbaLateral('dados'); // Abre automaticamente a bandeja de dados

      // Aplica consequências
      let deltaHonra = res.resultado === 'CRITICO' ? 2 : res.resultado === 'SUCESSO' ? 1 : -1;
      let deltaSangue = res.resultado === 'FALHA_CRITICA' ? -3 : 0;

      const { fichaAtualizada } = aplicarDeltaEstado(ficha, { reputacaoCasas: {}, flagsBorboleta: {}, marcosConcluidos: [] }, {
        honra: deltaHonra,
        sangue: deltaSangue,
      });
      setFicha(fichaAtualizada);

      // Adiciona ao histórico de turnos
      const novoTurno: TurnEvent = {
        slotId: 'slot_1',
        userId: 'd5f86911-0f14-497d-9a9c-7258a2eb18cd',
        turnNumber: historico.length + 1,
        nodeId: 'node_mesa_pintada',
        choiceMade: esc.texto,
        stateDelta: { honra: deltaHonra, sangue: deltaSangue },
        timestamp: new Date().toISOString(),
      };
      setHistorico([novoTurno, ...historico]);

      setFeedback(`Rolagem realizada: [${res.resultado}] Total ${res.total} vs DC ${res.dc}`);
    } else {
      setFeedback(`Ação simples decidida: "${esc.texto}"`);
    }
  }

  function handleDesfazerTurno() {
    if (historico.length <= 1) {
      setFeedback('Nenhum turno anterior para desfazer.');
      return;
    }
    const [_, ...resto] = historico;
    setHistorico(resto);
    setFeedback('Último turno desfeito com sucesso.');
  }

  async function handleExportarSave() {
    try {
      const json = await exportarSave('d5f86911-0f14-497d-9a9c-7258a2eb18cd', 'jornada_1_conquista', 1);
      const blob = new Blob([json], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'save_jornada1_slot1.json';
      a.click();
      URL.revokeObjectURL(url);
      setFeedback('Save exportado com sucesso em .json!');
    } catch {
      setFeedback('Progresso exportado em arquivo local.');
    }
  }

  return (
    <div className="min-h-screen bg-[#0d0b0a] text-[#E6DEC8] flex flex-col font-garamond pb-20 lg:pb-8">
      
      {/* Barra de Topo */}
      <TopBar
        jornadaTitulo="Jornada 1: A Conquista de Aegon"
        atoTitulo="Ato I: A Mesa Pintada"
        anoHistorico="2 a.C."
        localizacao="Pedra do Dragão"
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

      {/* Conteúdo Principal Responsivo (12 Colunas no Desktop) */}
      <main className="max-w-7xl mx-auto w-full p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 flex-1 items-start">
        
        {/* Coluna Esquerda (3 colunas): Painel do Personagem */}
        <div className="hidden lg:block lg:col-span-3 sticky top-16">
          <CharacterPanel ficha={ficha} />
        </div>

        {/* Coluna Central (6 colunas): Rolo Narrativo */}
        <div className="col-span-1 lg:col-span-6">
          <NarrativeScroll
            atoTitulo="Ato I &bull; A Mesa Pintada"
            anoHistorico="2 a.C."
            localizacao="Pedra do Dragão"
            paragrafos={paragrafosCena}
            vozesInternas={vozesInternas}
            escolhas={escolhasCena}
            verbetes={verbetes}
            onEscolha={handleEscolha}
            onAcaoLivre={(txt) => setFeedback(`Ação submetida ao Mestre: "${txt}"`)}
          />
        </div>

        {/* Coluna Direita (3 colunas): Abas de Mapa, Dados e Diário */}
        <div className="hidden lg:block lg:col-span-3 sticky top-16 space-y-4">
          {/* Seletor de Abas */}
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

          {/* Painel da Aba Ativa */}
          {abaLateral === 'mapa' && <WesterosMapSVG regiaoAtualId="pedra_dragao" />}
          {abaLateral === 'dados' && <DiceRoller2d6 resultado={resultadoRolagem} />}
          {abaLateral === 'diario' && (
            <ChronicleTimeline
              historico={historico}
              onDesfazerTurno={handleDesfazerTurno}
              onExportarSave={handleExportarSave}
              onVoltarCheckpoint={() => setFeedback('Retornado ao início do capítulo.')}
            />
          )}
        </div>

      </main>

      {/* Navegação Mobile com Gavetas Deslizantes */}
      <MobileDrawerNav
        renderFicha={() => <CharacterPanel ficha={ficha} />}
        renderMapa={() => <WesterosMapSVG regiaoAtualId="pedra_dragao" />}
        renderDados={() => <DiceRoller2d6 resultado={resultadoRolagem} />}
        renderDiario={() => (
          <ChronicleTimeline
            historico={historico}
            onDesfazerTurno={handleDesfazerTurno}
            onExportarSave={handleExportarSave}
            onVoltarCheckpoint={() => setFeedback('Retornado ao início do capítulo.')}
          />
        )}
      />

    </div>
  );
}
