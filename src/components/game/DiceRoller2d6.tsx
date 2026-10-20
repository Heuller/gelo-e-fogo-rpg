'use client';

import React, { useState } from 'react';
import { ResultadoRolagem, rolar2d6 } from '@/server/engine/rpgEngine';
import { Dices, Sparkles, Skull, CheckCircle2, AlertTriangle, RotateCcw } from 'lucide-react';

interface PropsDiceRoller {
  resultado?: ResultadoRolagem | null;
  inspiracao?: number;
  onRolarNovo?: (res: ResultadoRolagem) => void;
  onRolar?: (attr: any, dc: any) => void;
  onRerrolarComInspiracao?: () => void;
  className?: string;
}

// Representação visual dos pontos do dado de 6 faces (SVG)
function DadoVisual({ valor, animando }: { valor: number; animando?: boolean }) {
  const pontosMap: Record<number, [number, number][]> = {
    1: [[50, 50]],
    2: [[28, 28], [72, 72]],
    3: [[28, 28], [50, 50], [72, 72]],
    4: [[28, 28], [28, 72], [72, 28], [72, 72]],
    5: [[28, 28], [28, 72], [50, 50], [72, 28], [72, 72]],
    6: [[28, 25], [28, 50], [28, 75], [72, 25], [72, 50], [72, 75]],
  };

  const pontos = pontosMap[valor] || pontosMap[1];

  return (
    <div
      className={`w-16 h-16 sm:w-20 sm:h-20 rounded-xl bg-gradient-to-br from-[#2b2520] via-[#1c1815] to-[#110e0c] border-2 border-[#C5A059] p-2 flex items-center justify-center shadow-xl shadow-black/80 transition-transform ${
        animando ? 'animate-spin motion-reduce:animate-none' : ''
      }`}
    >
      <svg viewBox="0 0 100 100" className="w-full h-full text-[#E6DEC8] fill-current">
        {pontos.map(([cx, cy], idx) => (
          <circle key={idx} cx={cx} cy={cy} r="8" fill="#C5A059" stroke="#3d2f17" strokeWidth="2" />
        ))}
      </svg>
    </div>
  );
}

export function DiceRoller2d6({
  resultado,
  inspiracao = 0,
  onRolarNovo,
  onRerrolarComInspiracao,
  className = '',
}: PropsDiceRoller) {
  const [animando, setAnimando] = useState(false);
  const [resultadoLocal, setResultadoLocal] = useState<ResultadoRolagem | null>(resultado || null);

  const res = resultado || resultadoLocal;
  const podeRerrolar =
    res &&
    (res.resultado === 'FALHA_PARCIAL' || res.resultado === 'FALHA_CRITICA') &&
    inspiracao > 0 &&
    Boolean(onRerrolarComInspiracao);

  function rolarTesteManual(atributoVal: number = 3, dc: number = 10, riscoMortal: boolean = false) {
    setAnimando(true);
    setTimeout(() => {
      const novo = rolar2d6(atributoVal, dc, { riscoMortal });
      setResultadoLocal(novo);
      setAnimando(false);
      if (onRolarNovo) onRolarNovo(novo);
    }, 600);
  }

  return (
    <div className={`bg-[#171412] border-2 border-[#2D2620] rounded-2xl p-5 shadow-2xl text-[#E6DEC8] font-cinzel space-y-5 ${className}`}>
      
      {/* Cabeçalho da Bandeja */}
      <div className="flex items-center justify-between border-b border-[#2D2620] pb-3">
        <div className="flex items-center gap-2">
          <span className="p-1.5 rounded bg-amber-950/70 border border-amber-700/50 text-[#C5A059]">
            <Dices className="w-5 h-5" />
          </span>
          <h3 className="text-sm font-bold uppercase tracking-wider text-amber-200">
            Bandeja de Rolagem 2d6
          </h3>
        </div>

        <button
          onClick={() => rolarTesteManual(3, 10, false)}
          disabled={animando}
          className="text-[11px] px-2.5 py-1 rounded bg-[#2D2620] hover:bg-[#3D342C] text-[#C5A059] border border-amber-900/40 transition-colors cursor-pointer disabled:opacity-50"
        >
          {animando ? 'Rolando...' : 'Rolar Dados'}
        </button>
      </div>

      {res ? (
        <div className="space-y-4">
          {/* Os 2 Dados Visuais */}
          <div className="flex items-center justify-center gap-6 py-2">
            <DadoVisual valor={res.dados[0]} animando={animando} />
            <span className="text-2xl text-[#C5A059] font-bold">+</span>
            <DadoVisual valor={res.dados[1]} animando={animando} />
          </div>

          {/* Cálculo Numérico */}
          <div className="text-center bg-[#100e0c] p-3 rounded-lg border border-[#2D2620] text-xs font-sans">
            <span className="text-[#A69E89]">
              Dados ({res.dados[0]} + {res.dados[1]} = {res.somaDados}) + Atributo ({res.valorAtributo}) =
            </span>
            <strong className="text-lg text-amber-300 ml-1.5 font-cinzel">
              Total {res.total}
            </strong>
            <span className="text-slate-400 ml-2">contra DC {res.dc}</span>
          </div>

          {/* Selo Colorido de Resultado */}
          <div className="text-center pt-1">
            {res.resultado === 'CRITICO' && (
              <div className="p-3 rounded-xl bg-gradient-to-r from-amber-950 via-amber-900 to-amber-950 border-2 border-[#C5A059] text-amber-200 shadow-lg shadow-amber-950/50">
                <div className="flex items-center justify-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[#DFC27D]">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span>Sucesso Crítico</span>
                </div>
                <p className="text-xs font-garamond italic mt-1 text-amber-100">
                  Os deuses contemplam vosso triunfo com assombro. (+1 Inspiração)
                </p>
              </div>
            )}

            {res.resultado === 'SUCESSO' && (
              <div className="p-3 rounded-xl bg-emerald-950/70 border border-emerald-600/60 text-emerald-200">
                <div className="flex items-center justify-center gap-1.5 text-xs font-bold uppercase tracking-widest text-emerald-300">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Sucesso Pleno</span>
                </div>
                <p className="text-xs font-garamond italic mt-1 text-emerald-100">
                  Vosso desígnio prevalece sem concessões.
                </p>
              </div>
            )}

            {res.resultado === 'FALHA_PARCIAL' && (
              <div className="p-3 rounded-xl bg-amber-950/60 border border-amber-600/60 text-amber-200">
                <div className="flex items-center justify-center gap-1.5 text-xs font-bold uppercase tracking-widest text-amber-300">
                  <AlertTriangle className="w-4 h-4 text-amber-400" />
                  <span>Falha Parcial &bull; Fail Forward</span>
                </div>
                <p className="text-xs font-garamond italic mt-1 text-amber-100">
                  Avançais com custo moral ou ferimento ligeiro.
                </p>
              </div>
            )}

            {res.resultado === 'FALHA_CRITICA' && (
              <div className="p-3 rounded-xl bg-red-950 border-2 border-red-600 text-red-200 animate-pulse">
                <div className="flex items-center justify-center gap-1.5 text-xs font-bold uppercase tracking-widest text-red-400">
                  <Skull className="w-4 h-4" />
                  <span>Falha Crítica {res.morteCanonica && '&bull; MORTE CANÔNICA'}</span>
                </div>
                <p className="text-xs font-garamond italic mt-1 text-red-100">
                  {res.morteCanonica
                    ? 'A linhagem é ceifada em meio ao ferro e à desgraça.'
                    : 'Uma calamidade diplomática e militar irrompe nos salões.'}
                </p>
              </div>
            )}

            {/* Botão de Rerrolagem com Inspiração Estilo Baldur's Gate 3 */}
            {podeRerrolar && (
              <button
                type="button"
                onClick={onRerrolarComInspiracao}
                className="w-full mt-3 py-2.5 px-4 rounded-xl bg-gradient-to-r from-amber-600 via-amber-500 to-yellow-600 hover:from-amber-500 hover:to-yellow-500 text-stone-950 font-cinzel font-bold text-xs uppercase tracking-wider shadow-lg shadow-amber-900/40 transition-all flex items-center justify-center gap-2 cursor-pointer border border-amber-300/50"
              >
                <RotateCcw className="w-4 h-4" />
                <span>✨ Usar 1 Inspiração para Rerrolar (Restam: {inspiracao})</span>
              </button>
            )}
          </div>
        </div>
      ) : (
        <div className="py-8 text-center text-slate-500 font-garamond italic text-xs">
          Aguardando decisão para rolar os dados...
        </div>
      )}

    </div>
  );
}
