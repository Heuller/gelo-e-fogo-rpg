'use client';

import React, { useState } from 'react';
import { User, Map, Dices, Scroll, X } from 'lucide-react';

interface PropsMobileDrawerNav {
  renderFicha: () => React.ReactNode;
  renderMapa: () => React.ReactNode;
  renderDados: () => React.ReactNode;
  renderDiario: () => React.ReactNode;
}

type GavetaAtiva = 'ficha' | 'mapa' | 'dados' | 'diario' | null;

export function MobileDrawerNav({
  renderFicha,
  renderMapa,
  renderDados,
  renderDiario,
}: PropsMobileDrawerNav) {
  const [gavetaAtiva, setGavetaAtiva] = useState<GavetaAtiva>(null);

  function toggleGaveta(tipo: GavetaAtiva) {
    setGavetaAtiva(gavetaAtiva === tipo ? null : tipo);
  }

  return (
    <>
      {/* Barra Inferior Fixa para Celulares (oculta em telas grandes lg:) */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#12100E]/95 border-t border-[#2D2620] px-3 py-2 backdrop-blur-md font-cinzel">
        <div className="grid grid-cols-4 gap-1 text-center">
          
          <button
            onClick={() => toggleGaveta('ficha')}
            className={`p-2 rounded-lg flex flex-col items-center justify-center gap-1 transition-colors cursor-pointer ${
              gavetaAtiva === 'ficha' ? 'bg-amber-950/80 text-[#C5A059]' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <User className="w-4 h-4" />
            <span className="text-[10px] tracking-wider uppercase">Ficha</span>
          </button>

          <button
            onClick={() => toggleGaveta('mapa')}
            className={`p-2 rounded-lg flex flex-col items-center justify-center gap-1 transition-colors cursor-pointer ${
              gavetaAtiva === 'mapa' ? 'bg-amber-950/80 text-[#C5A059]' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Map className="w-4 h-4" />
            <span className="text-[10px] tracking-wider uppercase">Mapa</span>
          </button>

          <button
            onClick={() => toggleGaveta('dados')}
            className={`p-2 rounded-lg flex flex-col items-center justify-center gap-1 transition-colors cursor-pointer ${
              gavetaAtiva === 'dados' ? 'bg-amber-950/80 text-[#C5A059]' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Dices className="w-4 h-4" />
            <span className="text-[10px] tracking-wider uppercase">Dados 2d6</span>
          </button>

          <button
            onClick={() => toggleGaveta('diario')}
            className={`p-2 rounded-lg flex flex-col items-center justify-center gap-1 transition-colors cursor-pointer ${
              gavetaAtiva === 'diario' ? 'bg-amber-950/80 text-[#C5A059]' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Scroll className="w-4 h-4" />
            <span className="text-[10px] tracking-wider uppercase">Diário</span>
          </button>

        </div>
      </nav>

      {/* Gaveta Deslizante Inferior (Bottom Sheet) */}
      {gavetaAtiva && (
        <div
          className="lg:hidden fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex flex-col justify-end animate-in fade-in duration-200"
          onClick={() => setGavetaAtiva(null)}
        >
          <div
            className="w-full max-h-[85vh] overflow-y-auto bg-[#171412] border-t-2 border-[#C5A059] rounded-t-2xl p-5 shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Botão de Fechar */}
            <button
              onClick={() => setGavetaAtiva(null)}
              className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-amber-300 hover:bg-[#2D2620] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Conteúdo Dinâmico da Gaveta */}
            <div className="pt-2">
              {gavetaAtiva === 'ficha' && renderFicha()}
              {gavetaAtiva === 'mapa' && renderMapa()}
              {gavetaAtiva === 'dados' && renderDados()}
              {gavetaAtiva === 'diario' && renderDiario()}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
