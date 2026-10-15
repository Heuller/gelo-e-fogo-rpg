'use client';

import React, { useState } from 'react';
import { LoreText } from './LoreTooltip';
import type { VerbeteGlossario } from '@/server/data/lore';
import { InternalVoices, IntervencaoVoz } from './InternalVoices';
import { SceneIllustration } from './SceneIllustration';
import { AtributoVoz } from '@/server/engine/rpgEngine';
import { audioManager } from '@/lib/audio/audioManager';
import {
  Crown,
  Dices,
  Skull,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Send,
  Lock,
  CheckCircle2,
  Users,
} from 'lucide-react';

export interface ConditionalParagraphItem {
  requiredFlag: string;
  text: string;
}

export interface EscolhaNarrativa {
  id: string;
  texto: string;
  tipo: 'simples' | 'teste_atributo';
  atributo?: AtributoVoz;
  dc?: number;
  riscoMortal?: boolean;
  requiredFlags?: string[];
  forbiddenFlags?: string[];
  tagOrigem?: string;
  motivoBloqueio?: string;
  aprovacaoCompanheiros?: Record<string, number>;
}

export interface PropsNarrativeScroll {
  nodeId?: string;
  atoTitulo: string;
  anoHistorico: string;
  localizacao: string;
  paragrafos: string[];
  conditionalParagraphs?: ConditionalParagraphItem[];
  worldFlags?: string[];
  notificacoesCompanheiros?: string[];
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
  conditionalParagraphs = [],
  worldFlags = [],
  notificacoesCompanheiros = [],
  vozesInternas = [],
  escolhas,
  verbetes = [],
  onEscolha,
  onAcaoLivre,
}: PropsNarrativeScroll) {
  const [acaoLivreAberta, setAcaoLivreAberta] = useState(false);
  const [textoAcaoLivre, setTextoAcaoLivre] = useState('');

  // Filtra parágrafos condicionais ativos com base nas flags do mundo
  const conditionalAtivos = conditionalParagraphs.filter((cp) =>
    worldFlags.includes(cp.requiredFlag)
  );

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

      {/* Banner / Toast de Aprovação de Companheiros Estilo BG3 */}
      {notificacoesCompanheiros.length > 0 && (
        <div className="mb-6 space-y-2">
          {notificacoesCompanheiros.map((notif, idx) => {
            const ehAprovacao = notif.includes('aprova');
            return (
              <div
                key={idx}
                className={`p-3 rounded-xl border flex items-center gap-2.5 text-xs font-cinzel font-bold shadow-lg animate-in fade-in slide-in-from-top-2 duration-300 ${
                  ehAprovacao
                    ? 'bg-gradient-to-r from-emerald-950/90 to-[#12100E] border-emerald-600/70 text-emerald-200'
                    : 'bg-gradient-to-r from-rose-950/90 to-[#12100E] border-rose-600/70 text-rose-200'
                }`}
              >
                <Users className={`w-4 h-4 ${ehAprovacao ? 'text-emerald-400' : 'text-rose-400'}`} />
                <span>{notif}</span>
              </div>
            );
          })}
        </div>
      )}

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

      {/* Parágrafos Condicionais Ativos (Eco das Suas Escolhas estilo BG3) */}
      {conditionalAtivos.length > 0 && (
        <div className="my-6 p-4 sm:p-5 rounded-xl bg-gradient-to-r from-amber-950/30 via-[#1a1512] to-amber-950/10 border-l-4 border-[#C5A059] shadow-inner space-y-3">
          <div className="flex items-center gap-2 text-xs font-cinzel font-bold text-amber-300 uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
            <span>[Eco das Suas Escolhas]</span>
          </div>
          {conditionalAtivos.map((item, idx) => (
            <p key={idx} className="text-base sm:text-lg text-amber-100/95 font-garamond italic leading-relaxed">
              <LoreText texto={item.text} verbetes={verbetes} />
            </p>
          ))}
        </div>
      )}

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

          // Verificação de bloqueio por requiredFlags
          const faltamFlags = escolha.requiredFlags
            ? escolha.requiredFlags.filter((f) => !worldFlags.includes(f))
            : [];
          const temForbiddenFlags = escolha.forbiddenFlags
            ? escolha.forbiddenFlags.some((f) => worldFlags.includes(f))
            : false;
          const estaBloqueada = faltamFlags.length > 0 || temForbiddenFlags;
          const foiDesbloqueada =
            escolha.requiredFlags &&
            escolha.requiredFlags.length > 0 &&
            faltamFlags.length === 0;

          return (
            <button
              key={escolha.id}
              disabled={estaBloqueada}
              onClick={() => {
                if (estaBloqueada) return;
                if (ehTeste) {
                  audioManager.tocarSomDados();
                } else {
                  audioManager.tocarSomEscolha();
                }
                onEscolha(escolha.id);
              }}
              className={`w-full text-left p-4 sm:p-5 rounded-xl border transition-all duration-200 group flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                estaBloqueada
                  ? 'bg-[#100e0d] border-stone-800 text-stone-500 opacity-60 cursor-not-allowed'
                  : temRiscoMortal
                  ? 'bg-gradient-to-r from-[#200f11] to-[#170e10] border-red-700/70 hover:border-red-500 shadow-lg shadow-red-950/30 cursor-pointer'
                  : 'bg-[#1C1815] border-[#2D2620] hover:border-[#C5A059]/80 hover:bg-[#221d19] cursor-pointer'
              }`}
            >
              {/* Texto da Escolha e Badges */}
              <div className="flex flex-col gap-1.5 flex-1">
                <div className="flex items-start gap-3">
                  <span className="font-cinzel text-xs text-[#C5A059] pt-1 select-none font-bold">
                    {estaBloqueada ? <Lock className="w-3.5 h-3.5 text-stone-500 inline" /> : '•'}
                  </span>
                  <span className={`font-garamond text-base sm:text-lg leading-snug ${
                    estaBloqueada
                      ? 'text-stone-400 line-through decoration-stone-600'
                      : 'text-slate-100 group-hover:text-amber-200 transition-colors'
                  }`}>
                    {escolha.texto}
                  </span>
                </div>

                {/* Motivo do Bloqueio ou Selos Estilo BG3 */}
                <div className="flex flex-wrap items-center gap-2 pl-6">
                  {escolha.tagOrigem && (
                    <span className="text-[10px] font-cinzel uppercase px-2 py-0.5 rounded bg-amber-950/80 border border-amber-700/60 text-amber-300 font-bold">
                      {escolha.tagOrigem}
                    </span>
                  )}

                  {foiDesbloqueada && (
                    <span className="text-[10px] font-cinzel uppercase px-2 py-0.5 rounded bg-emerald-950/80 border border-emerald-700/60 text-emerald-300 font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                      [DESBLOQUEADO PELA SUA JORNADA]
                    </span>
                  )}

                  {estaBloqueada && escolha.motivoBloqueio && (
                    <span className="text-[11px] font-garamond italic text-amber-500/90 flex items-center gap-1">
                      <Lock className="w-3 h-3 text-amber-600" />
                      {escolha.motivoBloqueio}
                    </span>
                  )}
                </div>
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
