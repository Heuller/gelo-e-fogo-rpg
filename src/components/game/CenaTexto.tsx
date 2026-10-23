'use client';

import React, { useState } from 'react';
import { LoreText } from './LoreTooltip';
import type { VerbeteGlossario } from '@/server/data/lore';
import { SceneIllustration } from './SceneIllustration';
import { Crown, Sparkles, BookOpen, Cpu, Eye } from 'lucide-react';
import { PreferenciasLeitura, PREFERENCIAS_PADRAO } from './PainelDeConfiguracoes';
import { StatusMestre } from '@/lib/store/jogoStore';

export interface CenaTextoProps {
  nodeId?: string;
  atoTitulo: string;
  anoHistorico: string;
  localizacao: string;
  paragrafos: string[];
  textoMestre?: string | null;
  statusMestre?: StatusMestre;
  modoIA?: boolean;
  verbetes?: VerbeteGlossario[];
  preferencias?: PreferenciasLeitura;
  headingRef?: React.RefObject<HTMLHeadingElement | null>;
}

export const CenaTexto: React.FC<CenaTextoProps> = ({
  nodeId,
  atoTitulo,
  anoHistorico,
  localizacao,
  paragrafos,
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
      {/* Cabeçalho da Cena */}
      <header className="text-center pb-6 border-b border-[var(--borda)]">
        <span className="text-xs font-cinzel uppercase tracking-[0.25em] text-[var(--ouro)] font-bold">
          {localizacao} &bull; {anoHistorico}
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
