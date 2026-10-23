import React, { HTMLAttributes, forwardRef } from 'react';

export interface CartaoProps extends HTMLAttributes<HTMLDivElement> {
  interativo?: boolean;
  selecionado?: boolean;
}

export const Cartao = forwardRef<HTMLDivElement, CartaoProps>(
  ({ interativo = false, selecionado = false, className = '', children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`bg-[var(--pergaminho-3)] border ${
          selecionado ? 'border-[var(--ouro)] bg-[var(--pergaminho-4)]' : 'border-[var(--borda)]'
        } rounded-md p-4 transition-all shadow-sm ${
          interativo
            ? 'hover:bg-[var(--pergaminho-4)] hover:border-[var(--ouro-claro)]'
            : ''
        } ${className}`}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Cartao.displayName = 'Cartao';
