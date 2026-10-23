'use client';

import React from 'react';
import { MapaDoMundo } from '@/components/game/MapaDoMundo';
import { PainelDeCasas } from '@/components/game/PainelDeCasas';
import { ChronicleTimeline } from '@/components/game/ChronicleTimeline';
import { RegiaoMapa } from '@/lib/temas';
import type { TurnEvent } from '@/server/saves';
import { Map, Scroll, Shield } from 'lucide-react';

export type AbaColunaMundo = 'mapa' | 'casas' | 'diario';

export interface ColunaMundoProps {
  aberta: boolean;
  abaAtiva: AbaColunaMundo;
  onAlternarAba: (aba: AbaColunaMundo) => void;
  regioes: RegiaoMapa[];
  regiaoAtualId?: string;
  casasPrincipais?: Record<string, string>;
  reputacaoCasas?: Record<string, number>;
  historico: TurnEvent[];
  onDesfazer?: () => void;
  onExportarSave?: () => void;
  className?: string;
}

export function ColunaMundo({
  aberta,
  abaAtiva,
  onAlternarAba,
  regioes,
  regiaoAtualId,
  casasPrincipais = {},
  reputacaoCasas = {},
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
        {/* Seletor de Abas [M, C, J] */}
        <div className="grid grid-cols-3 gap-1 bg-[var(--pergaminho-2)] p-1 rounded-xl border border-[var(--borda)]">
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
            onClick={() => onAlternarAba('casas')}
            className={`py-2 text-xs font-cinzel font-bold rounded-lg transition-colors flex items-center justify-center gap-1.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--ouro-claro)] ${
              abaAtiva === 'casas'
                ? 'bg-[var(--pergaminho-3)] text-[var(--ouro)] shadow-sm border border-[var(--ouro-escuro)]'
                : 'text-[var(--tinta-suave)] hover:text-[var(--tinta)]'
            }`}
            title="Reputação das Grandes Casas (tecla C)"
          >
            <Shield className="w-3.5 h-3.5" />
            <span>Casas</span>
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
            <MapaDoMundo
              regioes={regioes}
              regiaoAtualId={regiaoAtualId}
              casasPrincipais={casasPrincipais}
            />
          </div>
        )}

        {abaAtiva === 'casas' && (
          <div className="entrada-fade">
            <PainelDeCasas
              reputacaoCasas={reputacaoCasas}
              nomesCasas={casasPrincipais}
            />
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
