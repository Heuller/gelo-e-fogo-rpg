'use client';

import React from 'react';
import { LoreText } from './LoreTooltip';
import type { VerbeteGlossario } from '@/server/data/lore';
import { Sparkles } from 'lucide-react';

export interface ConditionalParagraphItem {
  requiredFlag: string;
  text: string;
}

export interface EcoDasEscolhasProps {
  conditionalParagraphs?: ConditionalParagraphItem[];
  worldFlags?: string[];
  verbetes?: VerbeteGlossario[];
  className?: string;
}

export const EcoDasEscolhas: React.FC<EcoDasEscolhasProps> = ({
  conditionalParagraphs = [],
  worldFlags = [],
  verbetes = [],
  className = '',
}) => {
  const conditionalAtivos = conditionalParagraphs.filter((cp) =>
    worldFlags.includes(cp.requiredFlag)
  );

  if (conditionalAtivos.length === 0) {
    return null;
  }

  return (
    <div
      className={`my-6 p-4 sm:p-5 rounded-xl bg-gradient-to-r from-[var(--pergaminho-1)] to-[var(--pergaminho-2)] border-l-4 border-l-[var(--ouro)] border border-[var(--borda)] shadow-inner space-y-3 entrada-fade ${className}`}
    >
      <div className="flex items-center gap-2 text-xs font-cinzel font-bold text-[var(--ouro)] uppercase tracking-widest">
        <Sparkles className="w-3.5 h-3.5 text-[var(--ouro)]" />
        <span>[Eco das Suas Escolhas]</span>
      </div>
      {conditionalAtivos.map((item, idx) => (
        <p
          key={idx}
          className="text-base sm:text-lg text-[var(--tinta)] font-garamond italic leading-relaxed"
        >
          <LoreText texto={item.text} verbetes={verbetes} />
        </p>
      ))}
    </div>
  );
};
