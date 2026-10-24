'use client';

import React from 'react';
import { Heart, Shield, Scale } from 'lucide-react';
import type { FichaPersonagem } from '@/server/engine/rpgEngine';

export interface SecaoBarrasVitaisProps {
  estado: FichaPersonagem['estado'];
}

export function SecaoBarrasVitais({ estado }: SecaoBarrasVitaisProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-xs font-cinzel uppercase tracking-widest text-[var(--ouro)] font-semibold border-b border-[var(--borda)] pb-1">
        Estado Vital & Moral
      </h3>

      {/* 1. Sangue (0 a 10) */}
      <div>
        <div className="flex items-center justify-between text-xs font-cinzel mb-1">
          <span className="flex items-center gap-1.5 text-red-400 font-bold">
            <Heart className="w-3.5 h-3.5 fill-current" />
            Sangue
          </span>
          <span className="font-sans font-semibold text-slate-300">
            {estado.sangue} / 10
          </span>
        </div>
        <div className="w-full h-2.5 bg-[#100b0c] border border-red-950 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-red-900 via-red-700 to-red-500 rounded-full transition-all duration-500"
            style={{ width: `${(estado.sangue / 10) * 100}%` }}
          />
        </div>
      </div>

      {/* 2. Compostura (0 a 10) */}
      <div>
        <div className="flex items-center justify-between text-xs font-cinzel mb-1">
          <span className="flex items-center gap-1.5 text-blue-400 font-bold">
            <Shield className="w-3.5 h-3.5" />
            Compostura
          </span>
          <span className="font-sans font-semibold text-slate-300">
            {estado.compostura} / 10
          </span>
        </div>
        <div className="w-full h-2.5 bg-[#0b0e12] border border-blue-950 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-blue-900 via-blue-700 to-sky-500 rounded-full transition-all duration-500"
            style={{ width: `${(estado.compostura / 10) * 100}%` }}
          />
        </div>
      </div>

      {/* 3. Honra (-10 a +10 Bipolar) */}
      <div>
        <div className="flex items-center justify-between text-xs font-cinzel mb-1">
          <span className="flex items-center gap-1.5 text-[var(--ouro)] font-bold">
            <Scale className="w-3.5 h-3.5" />
            Honra
          </span>
          <span className="font-sans font-semibold text-slate-300">
            {estado.honra > 0 ? `+${estado.honra}` : estado.honra}
          </span>
        </div>
        <div className="w-full h-2.5 bg-[var(--pergaminho-1)] border border-[var(--borda)] rounded-full relative overflow-hidden">
          <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-slate-600 z-10" />
          <div
            className={`h-full rounded-full transition-all duration-500 ${
              estado.honra >= 0
                ? 'bg-gradient-to-r from-amber-700 to-[var(--ouro)]'
                : 'bg-gradient-to-l from-red-950 to-stone-900'
            }`}
            style={{
              width: `${Math.abs(estado.honra) * 5}%`,
              marginLeft: estado.honra >= 0 ? '50%' : `${50 - Math.abs(estado.honra) * 5}%`,
            }}
          />
        </div>
        <div className="flex justify-between text-xs font-cinzel text-slate-500 mt-1">
          <span>Obsidiana (-10)</span>
          <span>Neutro (0)</span>
          <span>Ouro Real (+10)</span>
        </div>
      </div>
    </div>
  );
}
