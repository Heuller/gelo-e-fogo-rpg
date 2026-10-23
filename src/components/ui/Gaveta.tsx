'use client';

import React, { useEffect } from 'react';
import { X } from 'lucide-react';

export interface GavetaProps {
  aberta: boolean;
  onFechar: () => void;
  titulo?: string;
  children: React.ReactNode;
  posicao?: 'bottom' | 'right';
  className?: string;
}

export const Gaveta: React.FC<GavetaProps> = ({
  aberta,
  onFechar,
  titulo,
  children,
  posicao = 'bottom',
  className = '',
}) => {
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape' && aberta) {
        onFechar();
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [aberta, onFechar]);

  if (!aberta) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-gaveta flex justify-end bg-black/70 backdrop-blur-sm animate-fade-in"
    >
      <div
        className="fixed inset-0"
        onClick={onFechar}
        aria-hidden="true"
      />

      <div
        className={`relative z-10 bg-[var(--pergaminho-2)] border-[var(--borda)] text-[var(--tinta)] shadow-2xl p-6 overflow-y-auto ${
          posicao === 'bottom'
            ? 'w-full max-h-[85vh] rounded-t-2xl border-t-2 self-end animate-in'
            : 'w-full max-w-md h-full rounded-l-2xl border-l-2'
        } ${className}`}
      >
        <div className="flex items-center justify-between pb-3 mb-4 border-b border-[var(--borda)]">
          {titulo && (
            <h2 className="text-lg font-bold font-cinzel text-[var(--ouro)]">
              {titulo}
            </h2>
          )}
          <button
            onClick={onFechar}
            aria-label="Fechar gaveta"
            className="p-1 rounded-md text-[var(--tinta-suave)] hover:text-[var(--tinta)] hover:bg-[var(--pergaminho-3)] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--ouro-claro)]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div>{children}</div>
      </div>
    </div>
  );
};
