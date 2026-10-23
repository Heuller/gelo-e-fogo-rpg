import React from 'react';

export interface MedidorProps {
  rotulo: string;
  valor: number;
  min?: number;
  max?: number;
  corBarra?: string;
  icone?: React.ReactNode;
  className?: string;
}

export const Medidor: React.FC<MedidorProps> = ({
  rotulo,
  valor,
  min = 0,
  max = 10,
  corBarra = 'bg-[var(--ouro)]',
  icone,
  className = '',
}) => {
  const porcentagem = Math.max(0, Math.min(100, ((valor - min) / (max - min)) * 100));

  return (
    <div className={`space-y-1 font-sans ${className}`}>
      <div className="flex items-center justify-between text-xs">
        <span className="flex items-center gap-1.5 font-semibold text-[var(--tinta-suave)]">
          {icone}
          <span>{rotulo}</span>
        </span>
        <span className="font-mono font-bold text-[var(--tinta)]">
          {valor > 0 && min < 0 ? `+${valor}` : valor} / {max}
        </span>
      </div>

      <div
        role="meter"
        aria-label={rotulo}
        aria-valuenow={valor}
        aria-valuemin={min}
        aria-valuemax={max}
        className="w-full h-2.5 bg-[var(--pergaminho-1)] border border-[var(--borda)] rounded-full overflow-hidden p-[1px]"
      >
        <div
          className={`h-full rounded-full transition-all duration-300 ${corBarra}`}
          style={{ width: `${porcentagem}%` }}
        />
      </div>
    </div>
  );
};
