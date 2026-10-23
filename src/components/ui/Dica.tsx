'use client';

import React, { useState } from 'react';

export interface DicaProps {
  texto: string;
  children: React.ReactNode;
  posicao?: 'top' | 'bottom';
  className?: string;
}

export const Dica: React.FC<DicaProps> = ({
  texto,
  children,
  posicao = 'top',
  className = '',
}) => {
  const [visivel, setVisivel] = useState(false);

  return (
    <div
      className={`relative inline-flex items-center ${className}`}
      onMouseEnter={() => setVisivel(true)}
      onMouseLeave={() => setVisivel(false)}
      onFocus={() => setVisivel(true)}
      onBlur={() => setVisivel(false)}
    >
      {children}
      {visivel && (
        <div
          role="tooltip"
          className={`absolute z-toast px-2.5 py-1.5 text-xs font-sans text-[var(--tinta)] bg-[var(--pergaminho-1)] border border-[var(--ouro)] rounded-md shadow-xl whitespace-nowrap pointer-events-none animate-fade-in ${
            posicao === 'top'
              ? 'bottom-full mb-1.5 left-1/2 -translate-x-1/2'
              : 'top-full mt-1.5 left-1/2 -translate-x-1/2'
          }`}
        >
          {texto}
        </div>
      )}
    </div>
  );
};
