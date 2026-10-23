import React, { HTMLAttributes } from 'react';

export type VarianteChip = 'atributo' | 'origem' | 'perigo' | 'sucesso' | 'padrao';

export interface ChipProps extends HTMLAttributes<HTMLSpanElement> {
  variante?: VarianteChip;
}

export const Chip: React.FC<ChipProps> = ({
  variante = 'padrao',
  className = '',
  children,
  ...props
}) => {
  const varianteClasses: Record<VarianteChip, string> = {
    padrao: 'bg-[var(--pergaminho-1)] border-[var(--borda)] text-[var(--tinta-suave)]',
    atributo: 'bg-[var(--pergaminho-2)] border-[var(--ouro)] text-[var(--ouro-claro)]',
    origem: 'bg-amber-950/40 border-amber-600/50 text-amber-300 font-cinzel',
    perigo: 'bg-red-950/60 border-red-700/60 text-red-300 font-bold',
    sucesso: 'bg-emerald-950/60 border-emerald-700/60 text-emerald-300',
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 border rounded-md text-xs font-medium tracking-wide ${varianteClasses[variante]} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
};
