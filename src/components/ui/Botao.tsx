import React, { forwardRef, ButtonHTMLAttributes } from 'react';

export type VarianteBotao = 'primario' | 'secundario' | 'perigo' | 'fantasma';
export type TamanhoBotao = 'sm' | 'md' | 'lg';

export interface BotaoProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variante?: VarianteBotao;
  tamanho?: TamanhoBotao;
  carregando?: boolean;
}

export const Botao = forwardRef<HTMLButtonElement, BotaoProps>(
  (
    {
      variante = 'secundario',
      tamanho = 'md',
      carregando = false,
      disabled,
      children,
      className = '',
      ...props
    },
    ref
  ) => {
    const baseClasses =
      'inline-flex items-center justify-center font-cinzel font-semibold tracking-wide transition-all rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--ouro-claro)] focus-visible:outline-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

    const tamanhoClasses: Record<TamanhoBotao, string> = {
      sm: 'min-h-[38px] px-3 py-1.5 text-xs',
      md: 'min-h-[44px] px-4 py-2.5 text-sm', // Alvo mínimo de 44px
      lg: 'min-h-[50px] px-6 py-3 text-base',
    };

    const varianteClasses: Record<VarianteBotao, string> = {
      primario:
        'bg-gradient-to-r from-amber-600 via-amber-500 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-black font-bold shadow-lg shadow-amber-950/40',
      secundario:
        'bg-[var(--pergaminho-2)] border border-[var(--borda)] hover:bg-[var(--pergaminho-3)] hover:border-[var(--ouro)] text-[var(--tinta)] shadow-sm',
      perigo:
        'bg-[var(--carmim)] hover:bg-[var(--carmim-brilho)] text-[var(--tinta)] border border-red-900/60 shadow-lg shadow-red-950/40',
      fantasma:
        'bg-transparent hover:bg-[var(--pergaminho-3)] text-[var(--tinta-suave)] hover:text-[var(--tinta)]',
    };

    return (
      <button
        ref={ref}
        disabled={disabled || carregando}
        className={`${baseClasses} ${tamanhoClasses[tamanho]} ${varianteClasses[variante]} ${className}`}
        {...props}
      >
        {carregando ? (
          <span className="inline-flex items-center gap-2">
            <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
            <span>Consultando...</span>
          </span>
        ) : (
          children
        )}
      </button>
    );
  }
);

Botao.displayName = 'Botao';
