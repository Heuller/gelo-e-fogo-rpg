'use client';

import React, { useState } from 'react';
import { VerbeteGlossario } from '@/server/data/lore';
import { segmentarTextoComGlossario } from './loreParser';
import { BookOpen, X, Scroll, Bookmark } from 'lucide-react';

interface PropsLoreText {
  texto: string;
  verbetes: VerbeteGlossario[];
  className?: string;
}

export function LoreText({ texto, verbetes, className = '' }: PropsLoreText) {
  const [verbeteAtivo, setVerbeteAtivo] = useState<VerbeteGlossario | null>(null);

  const tokens = segmentarTextoComGlossario(texto, verbetes);

  return (
    <>
      <span className={className}>
        {tokens.map((token, idx) => {
          if (token.tipo === 'verbete' && token.verbete) {
            return (
              <span
                key={idx}
                onClick={(e) => {
                  e.stopPropagation();
                  setVerbeteAtivo(token.verbete!);
                }}
                className="border-b border-dotted border-[var(--ouro)] text-[var(--tinta)] hover:text-[var(--ouro)] hover:border-solid transition-colors duration-200 font-medium"
                title={`Nota da Cidadela: ${token.verbete.termo}`}
              >
                {token.conteudo}
              </span>
            );
          }
          return <React.Fragment key={idx}>{token.conteudo}</React.Fragment>;
        })}
      </span>

      {/* Modal / Card Flutuante de Nota de Margem da Cidadela */}
      {verbeteAtivo && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setVerbeteAtivo(null)}
        >
          <div
            className="relative w-full max-w-lg bg-[#181411] border-2 border-[var(--ouro)]/60 rounded-xl p-6 shadow-2xl shadow-black text-[var(--tinta)] font-garamond"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Cabeçalho da Nota de Margem */}
            <div className="flex items-start justify-between border-b border-[var(--ouro)]/30 pb-3 mb-4">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded bg-amber-950/60 border border-amber-600/40 text-[var(--ouro)]">
                  <Bookmark className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-cinzel uppercase tracking-widest text-[var(--ouro)]">
                    Nota de Margem dos Meistres
                  </span>
                  <h3 className="text-xl font-bold font-cinzel text-amber-200 leading-tight">
                    {verbeteAtivo.termo}
                  </h3>
                </div>
              </div>

              <button
                onClick={() => setVerbeteAtivo(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-amber-300 hover:bg-slate-900/80 transition-colors"
                aria-label="Fechar Nota"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Categoria */}
            <div className="mb-3">
              <span className="text-xs font-cinzel uppercase font-semibold px-2.5 py-0.5 rounded bg-[var(--borda)] text-amber-300/90 border border-amber-900/50">
                {verbeteAtivo.categoria.replace('_', ' ')}
              </span>
            </div>

            {/* Resumo do Meistre */}
            <div className="text-base md:text-lg leading-relaxed text-slate-200/95 my-4 bg-[var(--pergaminho-1)]/70 p-4 rounded-lg border border-[var(--borda)]">
              <p>{verbeteAtivo.resumo_meistre}</p>
            </div>

            {/* Citação da Fonte Canônica */}
            <div className="flex items-center gap-2 pt-3 border-t border-[var(--ouro)]/20 text-xs text-[var(--tinta-suave)] font-sans">
              <BookOpen className="w-4 h-4 text-[var(--ouro)] flex-shrink-0" />
              <span>
                Fonte Cidadela: <strong className="text-slate-300">{verbeteAtivo.fonte.livro}</strong> &bull; {verbeteAtivo.fonte.capitulo}
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
