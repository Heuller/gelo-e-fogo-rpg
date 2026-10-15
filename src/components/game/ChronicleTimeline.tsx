'use client';

import React from 'react';
import { TurnEvent } from '@/server/engine/saveManager';
import {
  Scroll,
  RotateCcw,
  Bookmark,
  Download,
  CheckCircle2,
  Calendar,
} from 'lucide-react';

interface PropsChronicleTimeline {
  historico?: TurnEvent[];
  events?: TurnEvent[];
  onDesfazerTurno?: () => void;
  onDesfazerUltimoTurno?: () => void;
  onVoltarCheckpoint?: () => void;
  onVoltarAoCheckpoint?: () => void;
  onExportarSave?: () => void;
  className?: string;
}

export function ChronicleTimeline({
  historico,
  events,
  onDesfazerTurno,
  onDesfazerUltimoTurno,
  onVoltarCheckpoint,
  onVoltarAoCheckpoint,
  onExportarSave,
  className = '',
}: PropsChronicleTimeline) {
  const listaEventos = historico || events || [];
  const fnDesfazer = onDesfazerTurno || onDesfazerUltimoTurno;
  const fnVoltarCheckpoint = onVoltarCheckpoint || onVoltarAoCheckpoint;
  return (
    <div className={`bg-[#171412] border-2 border-[#2D2620] rounded-2xl p-5 shadow-2xl text-[#E6DEC8] font-cinzel space-y-4 ${className}`}>
      
      {/* Cabeçalho */}
      <div className="flex items-center justify-between border-b border-[#2D2620] pb-3">
        <div className="flex items-center gap-2">
          <span className="p-1.5 rounded bg-amber-950/70 border border-amber-700/50 text-[#C5A059]">
            <Scroll className="w-4 h-4" />
          </span>
          <h3 className="text-sm font-bold uppercase tracking-wider text-amber-200">
            Diário da Crônica
          </h3>
        </div>

        <span className="text-[11px] text-[#A69E89] font-sans">
          {listaEventos.length} decisões
        </span>
      </div>

      {/* Linha do Tempo Turno a Turno */}
      <div className="space-y-3 max-h-[360px] overflow-y-auto pr-1">
        {listaEventos.length > 0 ? (
          listaEventos.map((turno, idx) => (
            <div
              key={idx}
              className="p-3 rounded-lg bg-[#12100E] border border-[#2D2620] space-y-1 relative pl-3.5 border-l-2 border-l-[#C5A059]"
            >
              <div className="flex items-center justify-between text-[10px] text-[#A69E89]">
                <span className="font-bold text-[#C5A059]">Turno {turno.turnNumber}</span>
                <span>{new Date(turno.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
              </div>

              <p className="text-xs font-garamond text-slate-200 leading-snug">
                {turno.choiceMade}
              </p>

              {/* Consequências de Estado se houver */}
              {turno.stateDelta && Object.keys(turno.stateDelta).length > 0 && (
                <div className="flex flex-wrap gap-1 pt-1 text-[9px] font-sans">
                  {turno.stateDelta.honra !== undefined && (
                    <span className="px-1.5 py-0.5 rounded bg-amber-950 text-amber-300">
                      Honra {turno.stateDelta.honra > 0 ? `+${turno.stateDelta.honra}` : turno.stateDelta.honra}
                    </span>
                  )}
                  {turno.stateDelta.sangue !== undefined && (
                    <span className="px-1.5 py-0.5 rounded bg-red-950 text-red-300">
                      Sangue {turno.stateDelta.sangue}
                    </span>
                  )}
                  {turno.stateDelta.novaCicatriz && (
                    <span className="px-1.5 py-0.5 rounded bg-stone-900 text-red-400">
                      Cicatriz adquirida
                    </span>
                  )}
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="py-8 text-center text-slate-500 font-garamond italic text-xs">
            Nenhuma decisão gravada ainda nesta crônica.
          </div>
        )}
      </div>

      {/* Botões de Ação Rápida */}
      <div className="pt-2 border-t border-[#2D2620] space-y-2">
        <button
          onClick={fnDesfazer}
          className="w-full py-2 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 font-semibold text-xs rounded-lg transition flex items-center justify-center gap-1.5 cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5 text-[#C5A059]" />
          <span>Desfazer Último Turno</span>
        </button>

        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={fnVoltarCheckpoint}
            className="py-1.5 bg-[#12100E] hover:bg-[#1a1714] border border-[#2D2620] text-[#A69E89] text-[11px] rounded transition flex items-center justify-center gap-1 cursor-pointer"
          >
            <Bookmark className="w-3 h-3 text-[#C5A059]" />
            <span>Checkpoint</span>
          </button>

          <button
            onClick={onExportarSave}
            className="py-1.5 bg-[#12100E] hover:bg-[#1a1714] border border-[#2D2620] text-[#A69E89] text-[11px] rounded transition flex items-center justify-center gap-1 cursor-pointer"
          >
            <Download className="w-3 h-3 text-amber-500" />
            <span>Exportar .json</span>
          </button>
        </div>
      </div>

    </div>
  );
}
