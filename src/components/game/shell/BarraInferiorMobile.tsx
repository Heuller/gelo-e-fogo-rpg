'use client';

import React, { useState } from 'react';
import { User, Map, Scroll, Settings } from 'lucide-react';
import { Gaveta } from '@/components/ui/Gaveta';
import { CharacterPanel } from '@/components/game/CharacterPanel';
import { WesterosMapSVG } from '@/components/game/WesterosMapSVG';
import { ChronicleTimeline } from '@/components/game/ChronicleTimeline';
import { FichaPersonagem } from '@/server/engine/rpgEngine';
import type { TurnEvent } from '@/server/saves';

export interface BarraInferiorMobileProps {
  ficha: FichaPersonagem;
  localizacao: string;
  historico: TurnEvent[];
  onDesfazer?: () => void;
  onExportarSave?: () => void;
  onAbrirConfiguracoes?: () => void;
}

export function BarraInferiorMobile({
  ficha,
  localizacao,
  historico,
  onDesfazer,
  onExportarSave,
  onAbrirConfiguracoes,
}: BarraInferiorMobileProps) {
  const [gavetaAtiva, setGavetaAtiva] = useState<'ficha' | 'mapa' | 'diario' | null>(null);

  function fechar() {
    setGavetaAtiva(null);
  }

  return (
    <>
      {/* Barra Inferior Fixa para Mobile (< 1024px) */}
      <nav
        aria-label="Navegação móvel"
        className="lg:hidden fixed bottom-0 left-0 right-0 z-sticky bg-[var(--pergaminho-1)]/95 border-t border-[var(--borda)] backdrop-blur-md px-3 py-1 shadow-2xl"
      >
        <div className="grid grid-cols-4 gap-2 max-w-md mx-auto">
          {/* Ficha */}
          <button
            type="button"
            onClick={() => setGavetaAtiva('ficha')}
            className={`min-h-[44px] flex flex-col items-center justify-center gap-1 rounded-lg text-xs font-cinzel transition-colors ${
              gavetaAtiva === 'ficha'
                ? 'text-[var(--ouro)] bg-[var(--pergaminho-3)] font-bold'
                : 'text-[var(--tinta-suave)] hover:text-[var(--tinta)]'
            }`}
          >
            <User className="w-4 h-4" />
            <span>Ficha</span>
          </button>

          {/* Mapa */}
          <button
            type="button"
            onClick={() => setGavetaAtiva('mapa')}
            className={`min-h-[44px] flex flex-col items-center justify-center gap-1 rounded-lg text-xs font-cinzel transition-colors ${
              gavetaAtiva === 'mapa'
                ? 'text-[var(--ouro)] bg-[var(--pergaminho-3)] font-bold'
                : 'text-[var(--tinta-suave)] hover:text-[var(--tinta)]'
            }`}
          >
            <Map className="w-4 h-4" />
            <span>Mapa</span>
          </button>

          {/* Diário */}
          <button
            type="button"
            onClick={() => setGavetaAtiva('diario')}
            className={`min-h-[44px] flex flex-col items-center justify-center gap-1 rounded-lg text-xs font-cinzel transition-colors ${
              gavetaAtiva === 'diario'
                ? 'text-[var(--ouro)] bg-[var(--pergaminho-3)] font-bold'
                : 'text-[var(--tinta-suave)] hover:text-[var(--tinta)]'
            }`}
          >
            <Scroll className="w-4 h-4" />
            <span>Diário</span>
          </button>

          {/* Configurações */}
          <button
            type="button"
            onClick={onAbrirConfiguracoes}
            className="min-h-[44px] flex flex-col items-center justify-center gap-1 rounded-lg text-xs font-cinzel text-[var(--tinta-suave)] hover:text-[var(--ouro)] transition-colors"
          >
            <Settings className="w-4 h-4" />
            <span>Ajustes</span>
          </button>
        </div>
      </nav>

      {/* Gaveta de Ficha */}
      <Gaveta aberta={gavetaAtiva === 'ficha'} onFechar={fechar} titulo="Ficha do Personagem">
        <CharacterPanel ficha={ficha} />
      </Gaveta>

      {/* Gaveta de Mapa */}
      <Gaveta aberta={gavetaAtiva === 'mapa'} onFechar={fechar} titulo="Mapa de Westeros">
        <WesterosMapSVG regiaoAtualId={localizacao} />
      </Gaveta>

      {/* Gaveta de Diário */}
      <Gaveta aberta={gavetaAtiva === 'diario'} onFechar={fechar} titulo="Diário da Crônica">
        <ChronicleTimeline
          historico={historico}
          onDesfazerTurno={onDesfazer}
          onExportarSave={onExportarSave}
        />
      </Gaveta>
    </>
  );
}
