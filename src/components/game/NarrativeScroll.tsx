'use client';

import React, { useState } from 'react';
import { AtributoVoz } from '@/server/engine/rpgEngine';
import { VerbeteGlossario } from '@/server/data/lore';
import { LoreText } from './LoreTooltip';
import { InternalVoices, IntervencaoVoz } from './InternalVoices';
import { SceneIllustration } from './SceneIllustration';
import { audioManager } from '@/lib/audio/audioManager';
import {
  Skull,
  Send,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Crown,
  Dices,
} from 'lucide-react';

export interface EscolhaNarrativa {
  id: string;
  texto: string;
  tipo: 'simples' | 'teste_atributo';
  atributo?: AtributoVoz;
  dc?: number;
  riscoMortal?: boolean;
}

export interface PropsNarrativeScroll {
  nodeId?: string;
  atoTitulo: string;
  anoHistorico: string;
  localizacao: string;
  paragrafos: string[];
  vozesInternas?: IntervencaoVoz[];
  escolhas: EscolhaNarrativa[];
  verbetes?: VerbeteGlossario[];
  onEscolha: (escolhaId: string) => void;
  onAcaoLivre?: (acaoTexto: string) => void;
}

export function NarrativeScroll({
  nodeId,
  atoTitulo,
  anoHistorico,
  localizacao,
  paragrafos,
  vozesInternas = [],
  escolhas,
  verbetes = [],
  onEscolha,
  onAcaoLivre,
}: PropsNarrativeScroll) {
  const [acaoLivreAberta, setAcaoLivreAberta] = useState(false);
  const [textoAcaoLivre, setTextoAcaoLivre] = useState('');

  function handleEnviarAcaoLivre(e: React.FormEvent) {
    e.preventDefault();
    if (!textoAcaoLivre.trim()) return;
    audioManager.tocarSomEscolha();
    if (onAcaoLivre) {
      onAcaoLivre(textoAcaoLivre.trim());
      setTextoAcaoLivre('');
      setAcaoLivreAberta(false);
    }
  }

  return (
    <article className="w-full max-w-3xl mx-auto bg-[#171412] border-2 border-[#2D2620] rounded-2xl shadow-2xl shadow-black/90 p-6 sm:p-10 text-[#E6DEC8] relative overflow-hidden font-garamond">
      
      {/* Moldura / Friso Decorativo Medieval Superior */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-transparent via-[#C5A059] to-transparent opacity-80" />

      {/* Cabeçalho da Cena */}
      <header className="text-center pb-6 mb-4 border-b border-[#C5A059]/25">
        <span className="text-[11px] font-cinzel uppercase tracking-[0.25em] text-[#C5A059] font-bold">
          {localizacao} &bull; {anoHistorico}
        </span>
        <h2 className="text-2xl sm:text-3xl font-bold font-cinzel text-amber-200 mt-2 tracking-wide uppercase drop-shadow-md">
          {atoTitulo}
        </h2>
        <div className="flex items-center justify-center gap-3 mt-3 text-slate-500">
          <span className="h-px w-12 bg-[#C5A059]/30" />
          <Crown className="w-4 h-4 text-[#C5A059]/70" />
          <span className="h-px w-12 bg-[#C5A059]/30" />
        </div>
      </header>

      {/* Ilustração Vetorial da Cena em Xilogravura Iluminada */}
      <SceneIllustration nodeId={nodeId} titulo={atoTitulo} localizacao={localizacao} />

      {/* Rolo de Parágrafos Narrativos com Letra Capitular no 1º parágrafo */}
      <div className="space-y-6 text-lg sm:text-[20px] leading-relaxed text-[#E6DEC8] mt-6">
        {paragrafos.map((paragrafo, idx) => {
          const ehPrimeiro = idx === 0;

          return (
            <p
              key={idx}
              className={`${ehPrimeiro ? 'drop-cap' : ''} text-justify selection:bg-[#8B1E1E] selection:text-white`}
            >
              <LoreText texto={paragrafo} verbetes={verbetes} />
            </p>
          );
        })}
      </div>

      {/* Intervenções das Vozes do Conselho Interno */}
      {vozesInternas.length > 0 && (
        <InternalVoices intervencoes={vozesInternas} />
      )}

      {/* Divisor de Decisão */}
      <div className="my-10 pt-6 border-t border-[#C5A059]/30 text-center relative">
        <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#171412] px-4 text-xs font-cinzel uppercase tracking-widest text-[#C5A059] font-semibold">
          Qual é o vosso desígnio?
        </span>
      </div>

      {/* Área de Escolhas */}
      <div className="space-y-3.5">
        {escolhas.map((escolha) => {
          const ehTeste = escolha.tipo === 'teste_atributo';
          const temRiscoMortal = escolha.riscoMortal;

          return (
            <button
              key={escolha.id}
              onClick={() => {
                if (ehTeste) {
                  audioManager.tocarSomDados();
                } else {
                  audioManager.tocarSomEscolha();
                }
                onEscolha(escolha.id);
              }}
              className={`w-full text-left p-4 sm:p-5 rounded-xl border transition-all duration-200 group flex flex-col sm:flex-row sm:items-center justify-between gap-3 cursor-pointer ${
                temRiscoMortal
                  ? 'bg-gradient-to-r from-[#200f11] to-[#170e10] border-red-700/70 hover:border-red-500 shadow-lg shadow-red-950/30'
                  : 'bg-[#1C1815] border-[#2D2620] hover:border-[#C5A059]/80 hover:bg-[#221d19]'
              }`}
            >
              {/* Texto da Escolha */}
              <div className="flex items-start gap-3 flex-1">
                <span className="font-cinzel text-xs text-[#C5A059] pt-1 select-none font-bold">
                  &bull;
                </span>
                <span className="font-garamond text-base sm:text-lg text-slate-100 group-hover:text-amber-200 transition-colors leading-snug">
                  {escolha.texto}
                </span>
              </div>

              {/* Indicadores Técnicos de Teste e Risco */}
              <div className="flex items-center gap-2 flex-shrink-0 self-end sm:self-center font-sans text-xs">
                {ehTeste && escolha.atributo && (
                  <span className="px-2.5 py-1 rounded bg-[#12100E] border border-amber-600/40 text-amber-300 font-semibold flex items-center gap-1.5 uppercase text-[11px]">
                    <Dices className="w-3.5 h-3.5 text-[#C5A059]" />
                    <span>{escolha.atributo} &bull; DC {escolha.dc}</span>
                  </span>
                )}

                {temRiscoMortal && (
                  <span className="px-2.5 py-1 rounded bg-red-950 border border-red-600 text-red-300 font-bold flex items-center gap-1 text-[11px] animate-pulse">
                    <Skull className="w-3.5 h-3.5 text-red-400" />
                    <span>[RISCO MORTAL]</span>
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* Caixa de Ação Livre Personalizada Expansível */}
      <div className="mt-6 pt-4 border-t border-slate-800/60">
        <button
          type="button"
          onClick={() => {
            audioManager.tocarSomPagina();
            setAcaoLivreAberta(!acaoLivreAberta);
          }}
          className="w-full py-2.5 px-4 text-xs font-cinzel uppercase tracking-wider text-slate-400 hover:text-amber-300 flex items-center justify-center gap-2 transition-colors cursor-pointer"
        >
          <Sparkles className="w-4 h-4 text-[#C5A059]" />
          <span>Propor Ação Livre Personalizada ao Mestre</span>
          {acaoLivreAberta ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>

        {acaoLivreAberta && (
          <form onSubmit={handleEnviarAcaoLivre} className="mt-3 space-y-3">
            <textarea
              value={textoAcaoLivre}
              onChange={(e) => setTextoAcaoLivre(e.target.value)}
              placeholder="Descreva minuciosamente vossas palavras ou ordens aos meistres e vassalos..."
              rows={3}
              className="w-full p-3.5 bg-[#0e0c0b] border border-[#2D2620] rounded-xl text-sm font-garamond text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-[#C5A059]"
            />
            <button
              type="submit"
              disabled={!textoAcaoLivre.trim()}
              className="w-full py-2.5 px-4 rounded-lg bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-black font-cinzel font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-40"
            >
              <Send className="w-4 h-4" />
              <span>Submeter Ação ao Mestre</span>
            </button>
          </form>
        )}
      </div>

    </article>
  );
}
