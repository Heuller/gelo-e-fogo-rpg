'use client';

import React from 'react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="pt-BR">
      <body className="bg-[[var(--pagina)]] text-amber-100 min-h-screen flex items-center justify-center p-4 font-serif">
        <div className="max-w-md w-full bg-[#14141a] border border-red-900/60 rounded-xl p-8 text-center shadow-2xl">
          <h1 className="text-xl font-bold text-red-400 mb-3 tracking-widest uppercase">
            Falha Crítica no Reino
          </h1>
          <p className="text-sm text-slate-300 mb-6">
            Ocorreu um erro estrutural irrecuperável na interface. Nenhuma informação de progresso foi corrompida.
          </p>
          <button
            onClick={() => reset()}
            className="px-6 py-2.5 bg-red-900/80 hover:bg-red-800 text-amber-200 border border-red-600/50 rounded-lg text-xs tracking-wider uppercase transition-all"
          >
            Reiniciar Crônica
          </button>
        </div>
      </body>
    </html>
  );
}
