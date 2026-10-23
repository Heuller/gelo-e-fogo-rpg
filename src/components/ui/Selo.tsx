import React from 'react';

export type VereditoSelo = 'TRIUNFO' | 'SUCESSO' | 'FALHA_PARCIAL' | 'CALAMIDADE';

export interface SeloProps {
  veredito: VereditoSelo;
  className?: string;
}

export const Selo: React.FC<SeloProps> = ({ veredito, className = '' }) => {
  const configs: Record<
    VereditoSelo,
    { rotulo: string; subtexto: string; bg: string; borda: string; texto: string }
  > = {
    TRIUNFO: {
      rotulo: 'Triunfo Decisivo',
      subtexto: 'Crítico Natural',
      bg: 'bg-emerald-950/80',
      borda: 'border-emerald-500',
      texto: 'text-emerald-300',
    },
    SUCESSO: {
      rotulo: 'Sucesso',
      subtexto: 'Objetivo Alcançado',
      bg: 'bg-amber-950/70',
      borda: 'border-[var(--ouro)]',
      texto: 'text-[var(--ouro-claro)]',
    },
    FALHA_PARCIAL: {
      rotulo: 'Falha Parcial',
      subtexto: 'Avanço com Custo',
      bg: 'bg-amber-950/50',
      borda: 'border-amber-700/60',
      texto: 'text-amber-400',
    },
    CALAMIDADE: {
      rotulo: 'Calamidade',
      subtexto: 'Falha Crítica',
      bg: 'bg-red-950/90',
      borda: 'border-red-600',
      texto: 'text-red-300',
    },
  };

  const config = configs[veredito] || configs.SUCESSO;

  return (
    <div
      className={`inline-flex flex-col items-center justify-center p-3 border-2 rounded-xl shadow-xl backdrop-blur-md ${config.bg} ${config.borda} ${className}`}
    >
      <span className={`font-cinzel font-bold text-sm uppercase tracking-wider ${config.texto}`}>
        {config.rotulo}
      </span>
      <span className="text-xs text-[var(--tinta-suave)] font-sans">
        {config.subtexto}
      </span>
    </div>
  );
};
