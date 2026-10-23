'use client';

import React from 'react';
import { CharacterPanel } from '@/components/game/CharacterPanel';
import { FichaPersonagem } from '@/server/engine/rpgEngine';

export interface ColunaFichaProps {
  ficha: FichaPersonagem;
  aberta: boolean;
  className?: string;
}

export function ColunaFicha({ ficha, aberta, className = '' }: ColunaFichaProps) {
  if (!aberta) {
    return null;
  }

  return (
    <div
      className={`w-[280px] flex-shrink-0 hidden lg:block entrada-fade ${className}`}
      aria-label="Painel de Ficha do Personagem"
    >
      <div className="sticky top-16 max-h-[calc(100vh-5rem)] overflow-y-auto pr-1">
        <CharacterPanel ficha={ficha} />
      </div>
    </div>
  );
}
