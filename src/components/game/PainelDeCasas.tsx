'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Shield, TrendingUp, TrendingDown, Minus } from 'lucide-react';

export type FaixaReputacao =
  | 'inimiga'
  | 'hostil'
  | 'fria'
  | 'neutra'
  | 'amistosa'
  | 'aliada';

export interface PainelDeCasasProps {
  reputacaoCasas: Record<string, number>;
  nomesCasas?: Record<string, string>;
  className?: string;
}

function obterFaixaReputacao(valor: number): {
  faixa: FaixaReputacao;
  rotulo: string;
  corTexto: string;
  corBorda: string;
  corFundo: string;
} {
  if (valor <= -6) {
    return {
      faixa: 'inimiga',
      rotulo: 'Inimiga Declarada',
      corTexto: 'text-red-400',
      corBorda: 'border-red-700/80',
      corFundo: 'bg-red-950/70',
    };
  }
  if (valor <= -3) {
    return {
      faixa: 'hostil',
      rotulo: 'Hostil',
      corTexto: 'text-rose-300',
      corBorda: 'border-rose-700/60',
      corFundo: 'bg-rose-950/50',
    };
  }
  if (valor < 0) {
    return {
      faixa: 'fria',
      rotulo: 'Relação Fria',
      corTexto: 'text-[var(--tinta-suave)]',
      corBorda: 'border-[var(--borda)]',
      corFundo: 'bg-[var(--pergaminho-1)]',
    };
  }
  if (valor === 0) {
    return {
      faixa: 'neutra',
      rotulo: 'Neutra',
      corTexto: 'text-[var(--tinta-suave)]',
      corBorda: 'border-[var(--borda)]',
      corFundo: 'bg-[var(--pergaminho-1)]',
    };
  }
  if (valor <= 3) {
    return {
      faixa: 'amistosa',
      rotulo: 'Amistosa',
      corTexto: 'text-[var(--ouro-claro)]',
      corBorda: 'border-[var(--ouro-escuro)]/60',
      corFundo: 'bg-amber-950/40',
    };
  }
  return {
    faixa: 'aliada',
    rotulo: 'Aliada Leal',
    corTexto: 'text-emerald-300',
    corBorda: 'border-emerald-600/70',
    corFundo: 'bg-emerald-950/70',
  };
}

export function PainelDeCasas({
  reputacaoCasas = {},
  nomesCasas = {},
  className = '',
}: PainelDeCasasProps) {
  const [deltas, setDeltas] = useState<Record<string, number>>({});
  const anteriorRef = useRef<Record<string, number>>(reputacaoCasas);

  // Monitorar mudanças para calcular deltas animados por 2s
  useEffect(() => {
    const novosDeltas: Record<string, number> = {};
    let houveMudanca = false;

    for (const [casa, val] of Object.entries(reputacaoCasas)) {
      const anterior = anteriorRef.current[casa] ?? 0;
      const dif = val - anterior;
      if (dif !== 0) {
        novosDeltas[casa] = dif;
        houveMudanca = true;
      }
    }

    if (houveMudanca) {
      setDeltas(novosDeltas);
      const timer = setTimeout(() => {
        setDeltas({});
      }, 2000);
      anteriorRef.current = reputacaoCasas;
      return () => clearTimeout(timer);
    }

    anteriorRef.current = reputacaoCasas;
  }, [reputacaoCasas]);

  // Lista ordenada por |valor| decrescente
  const entradas = Object.entries(reputacaoCasas).sort(
    (a, b) => Math.abs(b[1]) - Math.abs(a[1])
  );

  return (
    <div
      className={`bg-[var(--pergaminho-2)] border-2 border-[var(--borda)] rounded-2xl p-5 shadow-2xl text-[var(--tinta)] font-cinzel space-y-4 ${className}`}
    >
      {/* Cabeçalho */}
      <div className="flex items-center justify-between border-b border-[var(--borda)] pb-3">
        <div className="flex items-center gap-2">
          <span className="p-1.5 rounded-lg bg-[var(--pergaminho-3)] border border-[var(--ouro-escuro)] text-[var(--ouro)]">
            <Shield className="w-4 h-4" />
          </span>
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-[var(--ouro-claro)]">
              Reputação das Grandes Casas
            </h3>
            <span className="text-xs text-[var(--tinta-suave)] font-sans italic block">
              Influência diplomática e heráldica
            </span>
          </div>
        </div>

        <span className="text-xs px-2 py-0.5 rounded bg-[var(--pergaminho-3)] border border-[var(--borda)] text-[var(--ouro)] font-mono">
          {entradas.length} casas
        </span>
      </div>

      {/* Conteúdo das Casas */}
      {entradas.length === 0 ? (
        <div className="p-6 text-center text-xs text-[var(--tinta-fraca)] italic font-garamond border border-dashed border-[var(--borda)] rounded-xl">
          Nenhuma aliança ou rivalidade formal foi selada até o presente momento.
        </div>
      ) : (
        <div className="space-y-2.5">
          {entradas.map(([casaKey, valor]) => {
            const nomeAmigavel = nomesCasas[casaKey] || `Casa ${casaKey}`;
            const infoFaixa = obterFaixaReputacao(valor);
            const delta = deltas[casaKey];

            return (
              <div
                key={casaKey}
                className="p-3 rounded-xl bg-[var(--pergaminho-1)] border border-[var(--borda)] flex items-center justify-between gap-3 text-xs font-sans transition-all"
              >
                <div className="min-w-0 space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="font-cinzel font-bold text-sm text-[var(--tinta)] truncate">
                      {nomeAmigavel}
                    </span>
                    {delta !== undefined && (
                      <span
                        className={`text-xs font-mono font-bold px-1.5 py-0.2 rounded entrada-fade ${
                          delta > 0
                            ? 'bg-emerald-950 text-emerald-300 border border-emerald-600'
                            : 'bg-red-950 text-red-300 border border-red-600'
                        }`}
                      >
                        {delta > 0 ? `+${delta}` : delta}
                      </span>
                    )}
                  </div>
                  <span
                    className={`inline-block text-xs px-2 py-0.5 rounded-full border ${infoFaixa.corFundo} ${infoFaixa.corBorda} ${infoFaixa.corTexto} font-medium`}
                  >
                    {infoFaixa.rotulo}
                  </span>
                </div>

                <div className="text-right flex-shrink-0">
                  <span
                    className={`text-base font-cinzel font-bold ${
                      valor > 0
                        ? 'text-emerald-400'
                        : valor < 0
                        ? 'text-red-400'
                        : 'text-[var(--tinta-suave)]'
                    }`}
                  >
                    {valor > 0 ? `+${valor}` : valor}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
