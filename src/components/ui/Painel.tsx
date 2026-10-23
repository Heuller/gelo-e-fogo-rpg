import React, { HTMLAttributes, forwardRef } from 'react';

export interface PainelProps extends HTMLAttributes<HTMLDivElement> {
  destaque?: boolean;
}

export const Painel = forwardRef<HTMLDivElement, PainelProps>(
  ({ destaque = false, className = '', children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`bg-[var(--pergaminho-2)] border-2 ${
          destaque ? 'border-[var(--ouro)]' : 'border-[var(--borda)]'
        } rounded-md p-5 shadow-2xl backdrop-blur-sm ${className}`}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Painel.displayName = 'Painel';
