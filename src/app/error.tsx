'use client';

import React, { useEffect } from 'react';
import { ShieldAlert, RefreshCw, Home } from 'lucide-react';
import Link from 'next/link';

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log seguro do erro sem expor detalhes sensíveis na UI
    console.error('[Gelo & Fogo RPG] Erro capturado pela fronteira:', error.message);
  }, [error]);

  return (
    <div className="min-h-screen bg-[[var(--pagina)]] fundo-radial text-amber-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-[#14141a] border border-red-900/40 rounded-xl p-8 shadow-2xl shadow-black text-center">
        <div className="w-16 h-16 rounded-full bg-red-950/60 border border-red-600/50 flex items-center justify-center mx-auto mb-4">
          <ShieldAlert className="w-8 h-8 text-red-400" />
        </div>

        <h2 className="text-xl font-cinzel font-bold text-amber-300 mb-2">
          As Sombras se Espalharam
        </h2>
        
        <p className="text-sm font-garamond text-slate-300 mb-6 leading-relaxed">
          Um presságio sombrio interrompeu o curso da crônica. Nossos meistres registraram a ocorrência e nenhuma decisão foi perdida.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={() => reset()}
            className="flex items-center justify-center gap-2 px-4 py-2.5 bg-red-900/60 hover:bg-red-800 text-amber-200 border border-red-600/50 rounded-lg text-xs font-cinzel uppercase tracking-wider transition-all shadow-md active:scale-95"
          >
            <RefreshCw className="w-4 h-4" />
            Tentar Novamente
          </button>

          <Link
            href="/jogar"
            className="flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-900/80 hover:bg-slate-800 text-slate-300 border border-slate-700/60 rounded-lg text-xs font-cinzel uppercase tracking-wider transition-all"
          >
            <Home className="w-4 h-4" />
            Retornar à Mesa
          </Link>
        </div>
      </div>
    </div>
  );
}
