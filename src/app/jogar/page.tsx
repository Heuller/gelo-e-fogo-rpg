'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { NarrativeScroll, EscolhaNarrativa } from '@/components/game/NarrativeScroll';
import { IntervencaoVoz } from '@/components/game/InternalVoices';
import { VerbeteGlossario } from '@/server/data/lore';
import { getGlossaryEntriesAction } from '@/app/actions/loreActions';
import { ArrowLeft, BookOpen, Crown } from 'lucide-react';

export default function JogarPage() {
  const [verbetes, setVerbetes] = useState<VerbeteGlossario[]>([]);
  const [feedback, setFeedback] = useState<string | null>(null);

  useEffect(() => {
    getGlossaryEntriesAction().then((data) => setVerbetes(data)).catch(() => {});
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
      fala: 'Os senhores de Westeros conhecem apenas o aço e o sangue. Uma proclamação régia com os termos da submissão deve preceder as asas dos dragões.',
    },
    {
      atributo: 'astucia',
      resultadoPassivo: 'SUCESSO',
      dcPassiva: 10,
      fala: 'Argilac está velho e desesperado com o avanço de Harren o Negro. Um pacto com os rebeldes do Tridente antes do ataque quebrará a espinha dorsal de Harrenhal.',
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
    const escolhida = escolhasCena.find((e) => e.id === escolhaId);
    setFeedback(`Vosso comando foi registrado: "${escolhida?.texto}"`);
  }

  function handleAcaoLivre(texto: string) {
    setFeedback(`Ação personalizada apresentada ao Mestre da Cidadela: "${texto}"`);
  }

  return (
    <main className="min-h-screen bg-[#0d0b0a] bg-radial from-[#191310] to-[#0d0b0a] text-[#E6DEC8] p-4 sm:p-8">
      {/* Barra de Navegação Superior */}
      <nav className="max-w-3xl mx-auto flex items-center justify-between mb-8 pb-4 border-b border-[#2D2620]">
        <Link
          href="/painel"
          className="text-xs font-cinzel uppercase tracking-wider text-[#A69E89] hover:text-[#C5A059] flex items-center gap-1.5 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Retornar ao Painel</span>
        </Link>

        <span className="text-xs font-cinzel text-amber-500 font-bold uppercase tracking-widest flex items-center gap-1.5">
          <Crown className="w-4 h-4" />
          <span>Jornada 1: A Conquista</span>
        </span>
      </nav>

      {feedback && (
        <div className="max-w-3xl mx-auto mb-6 p-4 bg-[#1f1610] border border-[#C5A059]/60 rounded-xl text-amber-200 text-sm flex items-center justify-between">
          <span>{feedback}</span>
          <button onClick={() => setFeedback(null)} className="text-xs text-[#C5A059] underline cursor-pointer">
            Prosseguir
          </button>
        </div>
      )}

      {/* Rolo Narrativo Central */}
      <NarrativeScroll
        atoTitulo="Ato I &bull; A Mesa Pintada"
        anoHistorico="2 a.C."
        localizacao="Pedra do Dragão"
        paragrafos={paragrafosCena}
        vozesInternas={vozesInternas}
        escolhas={escolhasCena}
        verbetes={verbetes}
        onEscolha={handleEscolha}
        onAcaoLivre={handleAcaoLivre}
      />
    </main>
  );
}
