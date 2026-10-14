'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Crown, Volume2, VolumeX, Save, ArrowLeft, Shield } from 'lucide-react';

interface PropsTopBar {
  jornadaTitulo: string;
  atoTitulo: string;
  anoHistorico: string;
  localizacao: string;
  slotAtivo?: number;
  statusSalvamento?: string;
}

export function TopBar({
  jornadaTitulo,
  atoTitulo,
  anoHistorico,
  localizacao,
  slotAtivo = 1,
  statusSalvamento = 'Sincronizado',
}: PropsTopBar) {
  const [audioAtivo, setAudioAtivo] = useState(false);

  return (
    <header className="w-full bg-[#14110F]/95 border-b border-[#2D2620] px-4 py-2.5 backdrop-blur-md sticky top-0 z-40 text-[#E6DEC8] font-cinzel">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Esquerda: Retorno e Título da Jornada */}
        <div className="flex items-center gap-3">
          <Link
            href="/painel"
            className="p-1.5 rounded-lg text-slate-400 hover:text-[#C5A059] hover:bg-[#1E1916] transition-colors"
            title="Retornar ao Painel"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>

          <div className="flex items-center gap-2">
            <span className="p-1 rounded bg-amber-950/70 border border-amber-700/50 text-[#C5A059]">
              <Crown className="w-4 h-4" />
            </span>
            <div className="hidden sm:block">
              <h1 className="text-xs uppercase tracking-widest text-[#C5A059] font-bold">
                {jornadaTitulo}
              </h1>
              <p className="text-[11px] text-[#A69E89] font-garamond italic">
                {atoTitulo} &bull; {localizacao} ({anoHistorico})
              </p>
            </div>
          </div>
        </div>

        {/* Direita: Slot de Save e Áudio */}
        <div className="flex items-center gap-3 text-xs">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#1C1815] border border-[#2D2620] text-[#A69E89]">
            <Save className="w-3.5 h-3.5 text-[#C5A059]" />
            <span className="text-[11px]">Slot {slotAtivo}:</span>
            <span className="text-[11px] text-emerald-400 font-semibold">{statusSalvamento}</span>
          </div>

          <button
            onClick={() => setAudioAtivo(!audioAtivo)}
            className={`p-1.5 rounded border transition-colors cursor-pointer ${
              audioAtivo
                ? 'bg-amber-950/80 border-amber-600/50 text-[#C5A059]'
                : 'bg-[#1C1815] border-[#2D2620] text-slate-500 hover:text-slate-300'
            }`}
            title={audioAtivo ? 'Mudo' : 'Ativar Trilha Medieval'}
          >
            {audioAtivo ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>
        </div>

      </div>
    </header>
  );
}
