'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { AlertCircle, CheckCircle2, Info, X } from 'lucide-react';

export type TipoAviso = 'info' | 'sucesso' | 'erro';

export interface ItemAviso {
  id: string;
  tipo: TipoAviso;
  mensagem: string;
}

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
  const [pausado, setPausado] = useState(false);

  useEffect(() => {
    if (!duracaoMs || !onFechar || pausado) return;
    const timer = setTimeout(() => {
      onFechar();
    }, duracaoMs);
    return () => clearTimeout(timer);
  }, [duracaoMs, onFechar, pausado]);

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
      onMouseEnter={() => setPausado(true)}
      onMouseLeave={() => setPausado(false)}
      onFocus={() => setPausado(true)}
      onBlur={() => setPausado(false)}
      tabIndex={0}
      className={`flex items-center justify-between gap-3 p-3.5 border-2 rounded-xl shadow-2xl backdrop-blur-md entrada-sobe text-xs font-sans ${config.bg} ${config.border} ${config.text} ${className}`}
    >
      <div className="flex items-center gap-2">
        {config.icon}
        <span>{mensagem}</span>
      </div>
      {onFechar && (
        <button
          onClick={onFechar}
          aria-label="Dispensar aviso"
          className="p-1 rounded hover:bg-black/20 text-current transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--ouro-claro)]"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};

interface ContextoAvisos {
  avisos: ItemAviso[];
  adicionarAviso: (mensagem: string, tipo?: TipoAviso) => void;
  removerAviso: (id: string) => void;
}

const ContextoAvisos = createContext<ContextoAvisos | null>(null);

export function useAvisos() {
  const ctx = useContext(ContextoAvisos);
  if (!ctx) {
    throw new Error('useAvisos deve ser utilizado dentro de um AvisoProvider');
  }
  return ctx;
}

export function AvisoProvider({ children }: { children: React.ReactNode }) {
  const [avisos, setAvisos] = useState<ItemAviso[]>([]);

  const removerAviso = useCallback((id: string) => {
    setAvisos((atuais) => atuais.filter((a) => a.id !== id));
  }, []);

  const adicionarAviso = useCallback((mensagem: string, tipo: TipoAviso = 'info') => {
    const id = `${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    setAvisos((atuais) => {
      // Máximo de 3 avisos na fila ao mesmo tempo
      const novos = [...atuais, { id, tipo, mensagem }];
      if (novos.length > 3) {
        return novos.slice(-3);
      }
      return novos;
    });
  }, []);

  return (
    <ContextoAvisos.Provider value={{ avisos, adicionarAviso, removerAviso }}>
      {children}
      {/* Contêiner Flutuante de Toasts */}
      {avisos.length > 0 && (
        <div
          aria-live="polite"
          className="fixed z-toast right-4 top-20 sm:top-20 max-w-sm w-full space-y-2 pointer-events-none"
        >
          {avisos.map((aviso) => (
            <div key={aviso.id} className="pointer-events-auto">
              <Aviso
                tipo={aviso.tipo}
                mensagem={aviso.mensagem}
                onFechar={() => removerAviso(aviso.id)}
                duracaoMs={5000}
              />
            </div>
          ))}
        </div>
      )}
    </ContextoAvisos.Provider>
  );
}
