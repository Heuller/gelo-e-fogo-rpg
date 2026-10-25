'use client';

import React, { useState } from 'react';
import { LoreText } from './LoreTooltip';
import type { VerbeteGlossario } from '@/server/data/lore';
import { SceneIllustration } from './SceneIllustration';
import { Crown, Sparkles, BookOpen, Cpu, Eye, Bookmark, MessageSquare } from 'lucide-react';
import { PreferenciasLeitura, PREFERENCIAS_PADRAO } from './PainelDeConfiguracoes';
import { StatusMestre } from '@/lib/store/jogoStore';

export interface FalaItem {
  quem: string;
  nomeQuem: string;
  papel?: string;
  texto: string;
}

export interface ReacaoItem {
  companheiro: string;
  nome: string;
  fala: string;
}

export interface VozConflitoItem {
  voz1: string;
  voz2: string;
  fala1: string;
  fala2: string;
}

export interface CenaTextoProps {
  nodeId?: string;
  atoTitulo: string;
  anoHistorico: string;
  localizacao: string;
  paragrafos: string[];
  ponte?: string;
  marcasRecebidas?: string[];
  falas?: FalaItem[];
  tipo?: 'narracao' | 'dialogo' | 'hub' | 'peca_de_cenario' | 'acerto_de_contas';
  reacaoCompanheiro?: ReacaoItem;
  vozConflitoAtiva?: VozConflitoItem;
  dicaPercepcao?: string;
  pov?: string;
  epigrafe?: { texto: string; autor: string };
  textoMestre?: string | null;
  statusMestre?: StatusMestre;
  modoIA?: boolean;
  verbetes?: VerbeteGlossario[];
  preferencias?: PreferenciasLeitura;
  headingRef?: React.RefObject<HTMLHeadingElement | null>;
}

function formatarMarcaTexto(marca: string): string {
  if (marca.includes(' ')) return marca;
  const limpa = marca.replace(/^marca_/, '');
  return limpa
    .split('_')
    .map((palavra, i) => (i === 0 ? palavra.charAt(0).toUpperCase() + palavra.slice(1) : palavra))
    .join(' ');
}

export const CenaTexto: React.FC<CenaTextoProps> = ({
  nodeId,
  atoTitulo,
  anoHistorico,
  localizacao,
  paragrafos,
  ponte,
  marcasRecebidas,
  falas,
  tipo = 'narracao',
  reacaoCompanheiro,
  vozConflitoAtiva,
  dicaPercepcao,
  pov,
  epigrafe,
  textoMestre,
  statusMestre = 'idle',
  modoIA = true,
  verbetes = [],
  preferencias = PREFERENCIAS_PADRAO,
  headingRef,
}) => {
  const [exibirVersaoMestre, setExibirVersaoMestre] = useState(false);

  // Mapeamento de tamanho de fonte fluida
  const classesTamanho: Record<PreferenciasLeitura['tamanhoFonte'], string> = {
    padrao: 'text-[clamp(1.125rem,1.05rem+0.4vw,1.3125rem)]',
    medio: 'text-[clamp(1.2rem,1.12rem+0.45vw,1.4rem)]',
    grande: 'text-[clamp(1.3rem,1.2rem+0.5vw,1.55rem)]',
    extra: 'text-[clamp(1.4rem,1.3rem+0.6vw,1.75rem)]',
  };

  const lineSpacingClass =
    preferencias.espacamento === 'amplo' ? 'leading-[1.95]' : 'leading-[1.75]';

  const textAlignClass =
    preferencias.alinhamento === 'justificado'
      ? 'text-justify hyphens-auto'
      : 'text-left';

  // Renderiza primeiro parágrafo com versalete nas 3 primeiras palavras em mobile (<640px)
  // e capitular em telas maiores (>=640px)
  function renderPrimeiroParagrafo(texto: string) {
    return (
      <p
        className={`drop-cap-responsivo ${lineSpacingClass} ${textAlignClass} selection:bg-[var(--carmim)] selection:text-white`}
      >
        <LoreText texto={texto} verbetes={verbetes} />
      </p>
    );
  }

  const temTextoMestre = !!textoMestre && textoMestre.trim().length > 0;

  return (
    <div className="space-y-6">
      {/* Cabeçalho da Cena (com POV nomeado estilo Martin quando disponível) */}
      <header className="text-center pb-6 border-b border-[var(--borda)]">
        <span className="text-xs font-cinzel uppercase tracking-[0.25em] text-[var(--ouro)] font-bold">
          {pov ? `${pov} — ${localizacao}, ${anoHistorico}` : `${localizacao} • ${anoHistorico}`}
        </span>
        <h2
          ref={headingRef}
          tabIndex={-1}
          className="text-2xl sm:text-3xl font-bold font-cinzel text-[var(--ouro-claro)] mt-2 tracking-wide uppercase drop-shadow-md outline-none focus-visible:ring-2 focus-visible:ring-[var(--ouro-claro)] focus-visible:rounded"
        >
          {atoTitulo}
        </h2>
        <div className="flex items-center justify-center gap-3 mt-3 text-[var(--tinta-fraca)]">
          <span className="h-px w-12 bg-[var(--ouro-escuro)]/40" />
          <Crown className="w-4 h-4 text-[var(--ouro-escuro)]" />
          <span className="h-px w-12 bg-[var(--ouro-escuro)]/40" />
        </div>
      </header>

      {/* Epígrafe Literária Original de Abertura de Ato */}
      {epigrafe && (
        <blockquote
          className="p-4 sm:p-5 my-2 rounded-xl border border-[var(--borda)] bg-[var(--pergaminho-1)]/80 italic font-garamond text-sm sm:text-base text-[var(--ouro-claro)] shadow-sm space-y-1.5"
          cite={epigrafe.autor}
        >
          <p className="leading-relaxed">&ldquo;{epigrafe.texto}&rdquo;</p>
          <footer className="text-right text-xs font-cinzel not-italic text-[var(--ouro)]">
            — {epigrafe.autor}
          </footer>
        </blockquote>
      )}

      {/* Ilustração Vetorial da Cena */}
      <SceneIllustration nodeId={nodeId} titulo={atoTitulo} localizacao={localizacao} />

      {/* Feedback de Status do Mestre IA */}
      {modoIA && statusMestre === 'escrevendo' && (
        <div
          role="status"
          className="p-3 rounded-xl border border-[var(--ouro-escuro)]/40 bg-[var(--pergaminho-2)] flex items-center justify-between text-xs text-[var(--ouro-claro)] entrada-fade"
        >
          <div className="flex items-center gap-2">
            <Cpu className="w-4 h-4 text-[var(--ouro)] animate-pulse" />
            <span className="font-cinzel tracking-wider">O Mestre compõe a cena…</span>
          </div>
          <span className="text-[var(--tinta-fraca)] italic text-xs">Aguardando reflexão</span>
        </div>
      )}

      {modoIA && statusMestre === 'falhou' && (
        <div className="px-3 py-1.5 rounded-lg border border-[var(--borda)] bg-[var(--pergaminho-1)] text-xs text-[var(--tinta-fraca)] italic flex items-center gap-2">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Crônica pura: texto canônico preservado na íntegra.</span>
        </div>
      )}

      {/* Alternador de versão enriquecida se disponível */}
      {temTextoMestre && (
        <div className="flex items-center justify-between p-3 rounded-xl border border-[var(--ouro)]/40 bg-[var(--pergaminho-3)] text-xs">
          <span className="text-[var(--ouro-claro)] font-cinzel font-semibold">
            Visão Poética do Mestre IA disponível
          </span>
          <button
            type="button"
            onClick={() => setExibirVersaoMestre((v) => !v)}
            className="px-3 py-1 rounded bg-[var(--pergaminho-1)] border border-[var(--ouro-escuro)] text-[var(--ouro)] hover:border-[var(--ouro)] transition-colors font-medium flex items-center gap-1.5"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>{exibirVersaoMestre ? 'Ver texto canônico' : 'Ver versão do Mestre'}</span>
          </button>
        </div>
      )}

      {/* Ponte da Consequência Anterior (v2) */}
      {ponte && (
        <div
          role="region"
          aria-label="Consequência da escolha anterior"
          className="p-4 sm:p-5 rounded-xl border-l-4 border-l-[var(--ouro)] bg-[var(--pergaminho-3)] text-sm sm:text-base font-garamond shadow-md space-y-1.5 entrada-fade"
        >
          <div className="flex items-center gap-2 text-xs font-cinzel font-bold uppercase tracking-widest text-[var(--ouro)]">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--ouro)]" />
            <span>O que a sua escolha causou</span>
          </div>
          <p className="leading-relaxed text-[var(--ouro-claro)] italic pl-3.5 border-l border-[var(--borda)]">
            {ponte}
          </p>
        </div>
      )}

      {/* Registro de Memória (Marcas Novas) */}
      {marcasRecebidas && marcasRecebidas.length > 0 && (
        <div
          role="status"
          className="px-3.5 py-2 rounded-lg border border-[var(--ouro)]/40 bg-[var(--pergaminho-1)] text-xs text-[var(--ouro-claro)] flex items-center gap-2 entrada-fade shadow-sm"
        >
          <Bookmark className="w-3.5 h-3.5 text-[var(--ouro)] flex-shrink-0" />
          <div className="flex flex-wrap items-center gap-1.5 font-garamond italic">
            <span className="font-cinzel not-italic font-bold text-[var(--ouro)] uppercase text-[10px] tracking-wider">
              Isto será lembrado:
            </span>
            {marcasRecebidas.map((m, i) => (
              <span key={i} className="text-[var(--tinta-suave)] font-medium">
                «{formatarMarcaTexto(m)}»{i < marcasRecebidas.length - 1 ? ' · ' : ''}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Diálogos Estruturados (v2) */}
      {falas && falas.length > 0 && (
        <div
          className="space-y-4 my-6 pl-3 sm:pl-4 border-l-2 border-[var(--ouro)]/40 entrada-fade"
          role="region"
          aria-label="Falas da cena"
        >
          {falas.map((fala, idx) => (
            <div key={idx} className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="font-cinzel text-xs font-bold tracking-widest text-[var(--ouro)] uppercase drop-shadow-sm">
                  {fala.nomeQuem}
                </span>
                {fala.papel && (
                  <span className="text-[10px] font-sans text-[var(--tinta-fraca)] italic">
                    ({fala.papel})
                  </span>
                )}
              </div>
              <p className="font-garamond italic text-[var(--tinta)] text-base sm:text-lg leading-relaxed pl-2 sm:pl-3">
                — {fala.texto}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Interjeição / Reação de Companheiro em Cena (Camada BG3 - B4) */}
      {reacaoCompanheiro && (
        <div
          role="status"
          aria-label="Reação de companheiro"
          className="p-3.5 my-3 rounded-xl border border-[var(--ouro)]/30 bg-[var(--pergaminho-2)]/60 text-xs sm:text-sm font-garamond italic flex items-start gap-2.5 entrada-fade shadow-sm"
        >
          <MessageSquare className="w-4 h-4 text-[var(--ouro)] flex-shrink-0 mt-0.5" />
          <div className="space-y-0.5">
            <span className="font-cinzel not-italic font-bold text-[var(--ouro)] uppercase tracking-wider text-[11px] block">
              {reacaoCompanheiro.nome}
            </span>
            <p className="text-[var(--ouro-claro)] leading-relaxed">
              &ldquo;{reacaoCompanheiro.fala}&rdquo;
            </p>
          </div>
        </div>
      )}

      {/* Vozes que Discordam / Conflito Interno (Disco Elysium - B7) */}
      {vozConflitoAtiva && (
        <div
          role="region"
          aria-label="Conflito de vozes internas"
          className="p-4 my-4 rounded-xl border border-[var(--borda)] bg-[var(--pergaminho-1)]/90 space-y-2.5 entrada-fade shadow-sm"
        >
          <div className="flex items-center gap-2 text-[10px] uppercase font-cinzel font-bold text-[var(--ouro)] tracking-widest">
            <span className="h-1 w-1 rounded-full bg-[var(--ouro)]" />
            <span>Vozes em Conflito</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm italic font-garamond">
            <div className="pl-3 border-l-2 border-[var(--ouro-escuro)]/60">
              <span className="font-cinzel not-italic font-bold text-[var(--ouro)] text-[11px] block uppercase tracking-wider">
                [{vozConflitoAtiva.voz1}]
              </span>
              <p className="text-[var(--ouro-claro)] leading-relaxed mt-0.5">
                &ldquo;{vozConflitoAtiva.fala1}&rdquo;
              </p>
            </div>
            <div className="pl-3 border-l-2 border-[var(--borda)]">
              <span className="font-cinzel not-italic font-bold text-[var(--tinta-suave)] text-[11px] block uppercase tracking-wider">
                [{vozConflitoAtiva.voz2}]
              </span>
              <p className="text-[var(--tinta-suave)] leading-relaxed mt-0.5">
                &ldquo;{vozConflitoAtiva.fala2}&rdquo;
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Dica de Percepção / Cena que ficou para trás (Disco Elysium - B8) */}
      {dicaPercepcao && (
        <div
          role="note"
          className="text-xs italic text-[var(--ouro-escuro)] font-garamond flex items-center gap-2 pl-3 py-1 border-l-2 border-[var(--ouro-escuro)]/50 my-2"
        >
          <Eye className="w-3.5 h-3.5 text-[var(--ouro-escuro)] flex-shrink-0" />
          <span>{dicaPercepcao}</span>
        </div>
      )}

      {/* Texto da Cena */}
      <div
        lang="pt-BR"
        className={`space-y-6 text-[var(--tinta)] ${classesTamanho[preferencias.tamanhoFonte]}`}
      >
        {exibirVersaoMestre && temTextoMestre ? (
          <div className="p-5 rounded-xl border-l-4 border-l-[var(--ouro)] bg-[var(--pergaminho-1)] space-y-4 entrada-fade italic text-[var(--ouro-claro)]">
            <div className="flex items-center gap-2 text-xs font-cinzel uppercase tracking-widest text-[var(--ouro)] font-bold not-italic">
              <Sparkles className="w-3.5 h-3.5" />
              <span>[Palavras do Mestre da Cidadela]</span>
            </div>
            <p className={`${lineSpacingClass} ${textAlignClass} font-garamond`}>
              {textoMestre}
            </p>
          </div>
        ) : (
          paragrafos.map((paragrafo, idx) => {
            if (idx === 0) {
              return <React.Fragment key={idx}>{renderPrimeiroParagrafo(paragrafo)}</React.Fragment>;
            }
            return (
              <p
                key={idx}
                className={`${lineSpacingClass} ${textAlignClass} selection:bg-[var(--carmim)] selection:text-white`}
              >
                <LoreText texto={paragrafo} verbetes={verbetes} />
              </p>
            );
          })
        )}
      </div>
    </div>
  );
};
