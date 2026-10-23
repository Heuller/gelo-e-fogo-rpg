'use client';

import React from 'react';
import { AlertTriangle, Clock } from 'lucide-react';

export interface RelogioSegmentosProps {
  id: string;
  rotulo: string;
  segmentosTotais: number;
  segmentosPreenchidos: number;
  descricao?: string;
  cheio?: boolean;
  className?: string;
}

export function RelogioSegmentos({
  id,
  rotulo,
  segmentosTotais = 6,
  segmentosPreenchidos = 0,
  descricao,
  cheio = false,
  className = '',
}: RelogioSegmentosProps) {
  const preenchidos = Math.min(segmentosTotais, Math.max(0, segmentosPreenchidos));
  const estaCheio = cheio || preenchidos >= segmentosTotais;

  // Parâmetros geométricos do anel circular SVG
  const raio = 38;
  const centro = 48;
  const anguloPorFatia = 360 / segmentosTotais;

  // Gera os caminhos SVG para cada segmento
  const segmentos = Array.from({ length: segmentosTotais }, (_, i) => {
    const startAngle = i * anguloPorFatia - 90;
    const endAngle = (i + 1) * anguloPorFatia - 90;

    const startRad = (startAngle * Math.PI) / 180;
    const endRad = (endAngle * Math.PI) / 180;

    const x1 = centro + raio * Math.cos(startRad);
    const y1 = centro + raio * Math.sin(startRad);
    const x2 = centro + raio * Math.cos(endRad);
    const y2 = centro + raio * Math.sin(endRad);

    const isPreenchido = i < preenchidos;

    return {
      index: i,
      d: `M ${centro} ${centro} L ${x1} ${y1} A ${raio} ${raio} 0 0 1 ${x2} ${y2} Z`,
      isPreenchido,
    };
  });

  return (
    <div
      className={`p-3 bg-[var(--pergaminho-2)] border border-[var(--borda)] rounded-2xl flex items-center gap-3.5 shadow-sm ${
        estaCheio ? 'border-[var(--carmim)] bg-red-950/20' : ''
      } ${className}`}
      role="meter"
      aria-label={`${rotulo}: ${preenchidos} de ${segmentosTotais} segmentos preenchidos`}
      aria-valuenow={preenchidos}
      aria-valuemin={0}
      aria-valuemax={segmentosTotais}
    >
      {/* Visual Circular dos Segmentos */}
      <div className="relative w-16 h-16 flex-shrink-0">
        <svg
          viewBox="0 0 96 96"
          className="w-full h-full transform transition-transform duration-300"
          aria-hidden="true"
        >
          {segmentos.map((s) => (
            <path
              key={s.index}
              d={s.d}
              className={`transition-colors duration-300 stroke-[var(--pergaminho-1)] stroke-2 ${
                s.isPreenchido
                  ? estaCheio
                    ? 'fill-[var(--carmim)]'
                    : 'fill-[var(--ouro)]'
                  : 'fill-[var(--pergaminho-3)]'
              }`}
            />
          ))}

          {/* Núcleo Central */}
          <circle
            cx={centro}
            cy={centro}
            r={18}
            className="fill-[var(--pergaminho-2)] stroke-[var(--borda)] stroke-1"
          />
        </svg>

        {/* Indicador Numérico Central */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <span
            className={`font-mono font-bold text-xs ${
              estaCheio ? 'text-red-400 font-black' : 'text-[var(--ouro-claro)]'
            }`}
          >
            {preenchidos}/{segmentosTotais}
          </span>
        </div>
      </div>

      {/* Rótulo e Descrição */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5">
          {estaCheio ? (
            <AlertTriangle className="w-3.5 h-3.5 text-[var(--carmim)] animate-pulse flex-shrink-0" />
          ) : (
            <Clock className="w-3.5 h-3.5 text-[var(--ouro)] flex-shrink-0" />
          )}
          <h4
            className={`font-cinzel text-xs font-bold truncate ${
              estaCheio ? 'text-[var(--carmim)]' : 'text-[var(--tinta)]'
            }`}
          >
            {rotulo}
          </h4>
        </div>

        {descricao && (
          <p className="text-[11px] font-garamond text-[var(--tinta-suave)] truncate mt-0.5">
            {descricao}
          </p>
        )}

        {estaCheio && (
          <span className="inline-block mt-1 text-[10px] uppercase tracking-wider font-mono px-1.5 py-0.5 rounded bg-[var(--carmim)] text-[var(--tinta)] font-bold">
            Limite Atingido
          </span>
        )}
      </div>
    </div>
  );
}
