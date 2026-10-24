'use client';

import React from 'react';
import { TurnEvent } from '@/server/saves';
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
    <div className={`bg-[var(--pergaminho-2)] border-2 border-[var(--borda)] rounded-2xl p-5 shadow-2xl text-[var(--tinta)] font-cinzel space-y-4 ${className}`}>
      
      {/* Cabeçalho */}
      <div className="flex items-center justify-between border-b border-[var(--borda)] pb-3">
        <div className="flex items-center gap-2">
          <span className="p-1.5 rounded bg-amber-950/70 border border-amber-700/50 text-[var(--ouro)]">
            <Scroll className="w-4 h-4" />
          </span>
          <h3 className="text-sm font-bold uppercase tracking-wider text-amber-200">
            Diário da Crônica
          </h3>
        </div>

        <span className="text-xs text-[var(--tinta-suave)] font-sans">
          {listaEventos.length} decisões
        </span>
      </div>

      {/* Linha do Tempo Turno a Turno */}
      <div className="space-y-3 max-h-[360px] overflow-y-auto pr-1">
        {listaEventos.length > 0 ? (
          listaEventos.map((turno, idx) => (
            <div
              key={idx}
              className="p-3 rounded-lg bg-[var(--pergaminho-1)] border border-[var(--borda)] space-y-1 relative pl-3.5 border-l-2 border-l-[var(--ouro)]"
            >
              <div className="flex items-center justify-between text-xs text-[var(--tinta-suave)]">
                <span className="font-bold text-[var(--ouro)]">Turno {turno.turnNumber}</span>
                <span>{new Date(turno.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
              </div>

              <p className="text-xs font-garamond text-slate-200 leading-snug">
                {turno.choiceMade}
              </p>

              {/* Ponte Narrativa de Consequência da Escolha (v2) */}
              {Boolean(turno.resultado && (turno.resultado as Record<string, unknown>).ponte) && (
                <p className="text-[11px] font-garamond italic text-[var(--ouro-claro)] pl-2 border-l border-[var(--ouro)]/40 mt-1 leading-relaxed">
                  «{String((turno.resultado as Record<string, unknown>).ponte)}»
                </p>
              )}

              {/* Marcas de Memória Gravadas no Turno (v2) */}
              {Array.isArray(turno.resultado && (turno.resultado as Record<string, unknown>).marcas) &&
                ((turno.resultado as Record<string, unknown>).marcas as string[]).length > 0 && (
                  <div className="flex flex-wrap gap-1 pt-1 text-[10px] font-sans">
                    {((turno.resultado as Record<string, unknown>).marcas as string[]).map((marca, mIdx) => (
                      <span
                        key={mIdx}
                        className="px-1.5 py-0.5 rounded bg-black/40 text-[var(--ouro-claro)] border border-[var(--ouro-escuro)]/40 italic flex items-center gap-1"
                      >
                        <Bookmark className="w-2.5 h-2.5 text-[var(--ouro)]" />
                        <span>
                          {marca
                            .replace(/^marca_/, '')
                            .split('_')
                            .map((w, i) => (i === 0 ? w.charAt(0).toUpperCase() + w.slice(1) : w))
                            .join(' ')}
                        </span>
                      </span>
                    ))}
                  </div>
                )}

              {/* Consequências de Estado se houver */}
              {turno.stateDelta && Object.keys(turno.stateDelta).length > 0 && (
                <div className="flex flex-wrap gap-1 pt-1 text-xs font-sans">
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
      <div className="pt-2 border-t border-[var(--borda)] space-y-2">
        <button
          onClick={fnDesfazer}
          className="w-full py-2 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 font-semibold text-xs rounded-lg transition flex items-center justify-center gap-1.5"
        >
          <RotateCcw className="w-3.5 h-3.5 text-[var(--ouro)]" />
          <span>Desfazer Último Turno</span>
        </button>

        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={fnVoltarCheckpoint}
            className="py-1.5 bg-[var(--pergaminho-1)] hover:bg-[#1a1714] border border-[var(--borda)] text-[var(--tinta-suave)] text-xs rounded transition flex items-center justify-center gap-1"
          >
            <Bookmark className="w-3 h-3 text-[var(--ouro)]" />
            <span>Checkpoint</span>
          </button>

          <button
            onClick={onExportarSave}
            className="py-1.5 bg-[var(--pergaminho-1)] hover:bg-[#1a1714] border border-[var(--borda)] text-[var(--tinta-suave)] text-xs rounded transition flex items-center justify-center gap-1"
          >
            <Download className="w-3 h-3 text-amber-500" />
            <span>Exportar .json</span>
          </button>
        </div>
      </div>

    </div>
  );
}
