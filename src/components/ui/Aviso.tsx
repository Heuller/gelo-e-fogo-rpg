import React, { useEffect } from 'react';
import { AlertCircle, CheckCircle2, Info, X } from 'lucide-react';

export type TipoAviso = 'info' | 'sucesso' | 'erro';

export interface AvisoProps {
  tipo?: TipoAviso;
  mensagem: string;
  onFechar?: () => void;
  duracaoMs?: number;
  className?: string;
}

export const Aviso: React.FC<AvisoProps> = ({
  tipo = 'info',
  mensagem,
  onFechar,
  duracaoMs = 5000,
  className = '',
}) => {
  useEffect(() => {
    if (!duracaoMs || !onFechar) return;
    const timer = setTimeout(() => {
      onFechar();
    }, duracaoMs);
    return () => clearTimeout(timer);
  }, [duracaoMs, onFechar]);

  const configs: Record<TipoAviso, { icon: React.ReactNode; bg: string; border: string; text: string }> = {
    info: {
      icon: <Info className="w-5 h-5 text-[var(--ouro)] flex-shrink-0" />,
      bg: 'bg-[var(--pergaminho-2)]',
      border: 'border-[var(--ouro)]',
      text: 'text-[var(--tinta)]',
    },
    sucesso: {
      icon: <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />,
      bg: 'bg-emerald-950/90',
      border: 'border-emerald-700/80',
      text: 'text-emerald-200',
    },
    erro: {
      icon: <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />,
      bg: 'bg-red-950/90',
      border: 'border-red-700/80',
      text: 'text-red-200',
    },
  };

  const config = configs[tipo];

  return (
    <div
      role="status"
      className={`flex items-center justify-between gap-3 p-3.5 border-2 rounded-xl shadow-2xl backdrop-blur-md animate-fade-in text-xs font-sans ${config.bg} ${config.border} ${config.text} ${className}`}
    >
      <div className="flex items-center gap-2">
        {config.icon}
        <span>{mensagem}</span>
      </div>
      {onFechar && (
        <button
          onClick={onFechar}
          aria-label="Dispensar aviso"
          className="p-1 rounded hover:bg-black/20 text-current transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};
