'use client';

import React from 'react';
import { WesterosMapSVG } from '@/components/game/WesterosMapSVG';
import { ChronicleTimeline } from '@/components/game/ChronicleTimeline';
import type { TurnEvent } from '@/server/saves';
import { Map, Scroll } from 'lucide-react';

export interface ColunaMundoProps {
  aberta: boolean;
  abaAtiva: 'mapa' | 'diario';
  onAlternarAba: (aba: 'mapa' | 'diario') => void;
  localizacao: string;
  historico: TurnEvent[];
  onDesfazer?: () => void;
  onExportarSave?: () => void;
  className?: string;
}

export function ColunaMundo({
  aberta,
  abaAtiva,
  onAlternarAba,
  localizacao,
  historico,
  onDesfazer,
  onExportarSave,
  className = '',
}: ColunaMundoProps) {
  if (!aberta) {
    return null;
  }

  return (
    <div
      className={`w-[320px] flex-shrink-0 hidden lg:block entrada-fade ${className}`}
      aria-label="Painel do Mundo e Crônica"
    >
      <div className="sticky top-16 max-h-[calc(100vh-5rem)] overflow-y-auto space-y-4 pl-1">
        {/* Seletor de Abas [M, J] */}
        <div className="grid grid-cols-2 gap-1 bg-[var(--pergaminho-2)] p-1 rounded-xl border border-[var(--borda)]">
          <button
            type="button"
            onClick={() => onAlternarAba('mapa')}
            className={`py-2 text-xs font-cinzel font-bold rounded-lg transition-colors flex items-center justify-center gap-1.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--ouro-claro)] ${
              abaAtiva === 'mapa'
                ? 'bg-[var(--pergaminho-3)] text-[var(--ouro)] shadow-sm border border-[var(--ouro-escuro)]'
                : 'text-[var(--tinta-suave)] hover:text-[var(--tinta)]'
            }`}
            title="Mapa de Westeros (tecla M)"
          >
            <Map className="w-3.5 h-3.5" />
            <span>Mapa</span>
          </button>

          <button
            type="button"
            onClick={() => onAlternarAba('diario')}
            className={`py-2 text-xs font-cinzel font-bold rounded-lg transition-colors flex items-center justify-center gap-1.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--ouro-claro)] ${
              abaAtiva === 'diario'
                ? 'bg-[var(--pergaminho-3)] text-[var(--ouro)] shadow-sm border border-[var(--ouro-escuro)]'
                : 'text-[var(--tinta-suave)] hover:text-[var(--tinta)]'
            }`}
            title="Diário e Histórico (tecla J)"
          >
            <Scroll className="w-3.5 h-3.5" />
            <span>Diário</span>
          </button>
        </div>

        {/* Conteúdo da Aba Ativa */}
        {abaAtiva === 'mapa' && (
          <div className="entrada-fade">
            <WesterosMapSVG regiaoAtualId={localizacao} />
          </div>
        )}

        {abaAtiva === 'diario' && (
          <div className="entrada-fade">
            <ChronicleTimeline
              historico={historico}
              onDesfazerTurno={onDesfazer}
              onExportarSave={onExportarSave}
            />
          </div>
        )}
      </div>
    </div>
  );
}
