import React from 'react';

export interface BrasaoProps {
  className?: string;
  tamanho?: number;
}

export const Brasao: React.FC<BrasaoProps> = ({ className = '', tamanho = 96 }) => {
  return (
    <div
      className={`inline-flex items-center justify-center relative select-none ${className}`}
      style={{ width: tamanho, height: tamanho }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 100 120"
        className="w-full h-full drop-shadow-[0_4px_12px_rgba(0,0,0,0.85)]"
      >
        <defs>
          <linearGradient id="gradEscudo" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2D1013" />
            <stop offset="50%" stopColor="#1B1214" />
            <stop offset="100%" stopColor="#0D0B0A" />
          </linearGradient>
          <linearGradient id="gradOuro" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#DFC27D" />
            <stop offset="50%" stopColor="#C5A059" />
            <stop offset="100%" stopColor="#9B7A35" />
          </linearGradient>
        </defs>

        {/* Escudo Heráldico Medieval */}
        <path
          d="M 50,4 C 76,4 92,10 92,30 C 92,72 68,102 50,116 C 32,102 8,72 8,30 C 8,10 24,4 50,4 Z"
          fill="url(#gradEscudo)"
          stroke="url(#gradOuro)"
          strokeWidth="3"
        />

        {/* Friso Interno do Escudo */}
        <path
          d="M 50,10 C 72,10 86,15 86,32 C 86,68 64,96 50,108 C 36,96 14,68 14,32 C 14,15 28,10 50,10 Z"
          fill="none"
          stroke="var(--ouro-escuro)"
          strokeWidth="1"
          strokeDasharray="3 2"
          opacity="0.7"
        />

        {/* Coroa Superior Tripla */}
        <path
          d="M 32,36 L 36,24 L 50,30 L 64,24 L 68,36 Z"
          fill="url(#gradOuro)"
          stroke="var(--ouro-escuro)"
          strokeWidth="1"
        />

        {/* Lâminas Cruzadas Simbólicas */}
        <line
          x1="30"
          y1="75"
          x2="70"
          y2="45"
          stroke="var(--ouro-claro)"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <line
          x1="70"
          y1="75"
          x2="30"
          y2="45"
          stroke="var(--ouro-claro)"
          strokeWidth="2.5"
          strokeLinecap="round"
        />

        {/* Diamante Central em Carmim e Ouro */}
        <polygon
          points="50,52 56,60 50,68 44,60"
          fill="var(--carmim)"
          stroke="url(#gradOuro)"
          strokeWidth="1.5"
        />
      </svg>
    </div>
  );
};
