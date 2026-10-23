'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Crown, Volume2, VolumeX, Save, ArrowLeft, Sparkles, BookOpen } from 'lucide-react';
import { audioManager } from '@/lib/audio/audioManager';

interface PropsTopBar {
  jornadaTitulo: string;
  atoTitulo: string;
  anoHistorico: string;
  localizacao: string;
  slotAtivo?: number;
  statusSalvamento?: string;
  modoIA?: boolean;
  onToggleModoIA?: () => void;
}

export function TopBar({
  jornadaTitulo,
  atoTitulo,
  anoHistorico,
  localizacao,
  slotAtivo = 1,
  statusSalvamento = 'Sincronizado',
  modoIA = true,
  onToggleModoIA,
}: PropsTopBar) {
  const [audioAtivo, setAudioAtivo] = useState(false);

  function handleToggleAudio() {
    const novoEstado = audioManager.toggleAmbiente();
    setAudioAtivo(novoEstado);
  }

  return (
    <header className="w-full bg-[#14110F]/95 border-b border-[var(--borda)] px-4 py-2.5 backdrop-blur-md sticky top-0 z-40 text-[var(--tinta)] font-cinzel">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
        
        {/* Esquerda: Retorno e Título da Jornada */}
        <div className="flex items-center gap-3">
          <Link
            href="/painel"
            className="p-1.5 rounded-lg text-slate-400 hover:text-[var(--ouro)] hover:bg-[#1E1916] transition-colors"
            title="Retornar ao Painel"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>

          <div className="flex items-center gap-2">
            <span className="p-1 rounded bg-amber-950/70 border border-amber-700/50 text-[var(--ouro)]">
              <Crown className="w-4 h-4" />
            </span>
            <div className="hidden sm:block">
              <h1 className="text-xs uppercase tracking-widest text-[var(--ouro)] font-bold">
                {jornadaTitulo}
              </h1>
              <p className="text-xs text-[var(--tinta-suave)] font-garamond italic">
                {atoTitulo} &bull; {localizacao} ({anoHistorico})
              </p>
            </div>
          </div>
        </div>

        {/* Direita: Seletor Mestre IA, Slot de Save e Áudio */}
        <div className="flex items-center gap-2 sm:gap-3 text-xs">
          
          {/* Seletor Elegante: Mestre IA / Crônica Pura */}
          <button
            onClick={onToggleModoIA}
            className={`px-2.5 py-1 rounded-lg border text-xs font-semibold flex items-center gap-1.5 transition-all ${
              modoIA
                ? 'bg-gradient-to-r from-amber-950/90 to-amber-900/60 border-amber-500/70 text-amber-200 shadow-md shadow-amber-950/40'
                : 'bg-[var(--pergaminho-3)] border-[var(--borda)] text-slate-400 hover:text-slate-200'
            }`}
            title="Alternar entre o enriquecimento poético por IA e a prosa canônica pura instantânea"
          >
            {modoIA ? (
              <>
                <Sparkles className="w-3.5 h-3.5 text-[var(--ouro)] animate-pulse" />
                <span className="hidden md:inline">Mestre IA:</span>
                <span className="text-amber-300 font-bold">Ativo</span>
              </>
            ) : (
              <>
                <BookOpen className="w-3.5 h-3.5 text-slate-400" />
                <span className="text-slate-300">Crônica Pura</span>
              </>
            )}
          </button>

          {/* Indicador de Salvamento */}
          <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded bg-[var(--pergaminho-3)] border border-[var(--borda)] text-[var(--tinta-suave)]">
            <Save className="w-3.5 h-3.5 text-[var(--ouro)]" />
            <span className="text-xs">Slot {slotAtivo}:</span>
            <span className="text-xs text-emerald-400 font-semibold">{statusSalvamento}</span>
          </div>

          {/* Botão de Áudio Sintético */}
          <button
            onClick={handleToggleAudio}
            className={`p-1.5 rounded border transition-colors ${
              audioAtivo
                ? 'bg-amber-950/80 border-amber-600/50 text-[var(--ouro)]'
                : 'bg-[var(--pergaminho-3)] border-[var(--borda)] text-slate-500 hover:text-slate-300'
            }`}
            title={audioAtivo ? 'Silenciar Áudio' : 'Ativar Trilha Medieval Acústica'}
          >
            {audioAtivo ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>
        </div>

      </div>
    </header>
  );
}
