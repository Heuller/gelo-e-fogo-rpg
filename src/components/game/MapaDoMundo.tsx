'use client';

import React, { useState } from 'react';
import { RegiaoMapa } from '@/lib/temas';
import { MapPin, Shield, Crown, Info, Compass } from 'lucide-react';

export interface MapaDoMundoProps {
  regioes: RegiaoMapa[];
  regiaoAtualId?: string;
  casasPrincipais?: Record<string, string>;
  className?: string;
}

export function MapaDoMundo({
  regioes,
  regiaoAtualId,
  casasPrincipais = {},
  className = '',
}: MapaDoMundoProps) {
  const [regiaoFocadaId, setRegiaoFocadaId] = useState<string | null>(null);

  // Região ativa derivada diretamente das props (sem useState espelhando prop)
  const regiaoAtiva =
    regioes.find((r) => r.id === regiaoAtualId) ||
    regioes[0] || {
      id: 'desconhecido',
      nome: 'Terras Desconhecidas',
      x: 50,
      y: 50,
      descricao: 'Nenhuma informação geográfica disponível.',
    };

  const regiaoExibida =
    (regiaoFocadaId ? regioes.find((r) => r.id === regiaoFocadaId) : null) || regiaoAtiva;

  return (
    <div
      className={`bg-[var(--pergaminho-2)] border-2 border-[var(--borda)] rounded-2xl p-5 shadow-2xl text-[var(--tinta)] font-cinzel space-y-4 ${className}`}
    >
      {/* Cabeçalho do Mapa */}
      <div className="flex items-center justify-between border-b border-[var(--borda)] pb-3">
        <div className="flex items-center gap-2">
          <span className="p-1.5 rounded-lg bg-[var(--pergaminho-3)] border border-[var(--ouro-escuro)] text-[var(--ouro)]">
            <Compass className="w-4 h-4" />
          </span>
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-[var(--ouro-claro)]">
              Códice Cartográfico
            </h3>
            <span className="text-xs text-[var(--tinta-suave)] font-sans italic block">
              Mapa esquemático das crônicas
            </span>
          </div>
        </div>

        <span className="text-xs px-2 py-0.5 rounded bg-[var(--pergaminho-3)] border border-[var(--borda)] text-[var(--ouro)] font-mono">
          {regioes.length} marcos
        </span>
      </div>

      {/* Tela do Mapa Vetorial Esquemático (Aspect Ratio 4/5) */}
      <div className="relative w-full aspect-[4/5] bg-gradient-to-b from-[#13161C] via-[#101217] to-[#161210] rounded-xl border border-[var(--borda)] overflow-hidden p-2 flex items-center justify-center select-none shadow-inner">
        {/* Silhueta Continental Esquemática em SVG */}
        <svg
          viewBox="0 0 100 120"
          className="w-full h-full opacity-25 text-[var(--ouro)] fill-current pointer-events-none"
        >
          {/* Muralha (linha grossa no Norte) */}
          <line
            x1="30"
            y1="16"
            x2="70"
            y2="16"
            stroke="var(--ouro-claro)"
            strokeWidth="2.5"
            strokeDasharray="2 2"
          />
          {/* O Norte & Gargalo */}
          <path d="M 40,8 L 60,8 L 68,16 L 65,35 L 56,42 L 48,42 L 36,32 L 32,16 Z" />
          {/* Terras Fluviais e Vale */}
          <path d="M 48,42 L 56,42 L 72,44 L 66,54 L 54,58 L 44,52 Z" />
          {/* Terras Ocidentais e Terras da Coroa */}
          <path d="M 44,52 L 54,58 L 68,58 L 64,68 L 48,68 L 36,60 Z" />
          {/* A Campina e Terras da Tempestade */}
          <path d="M 36,60 L 48,68 L 64,68 L 66,80 L 42,82 L 34,70 Z" />
          {/* Dorne */}
          <path d="M 42,82 L 66,80 L 72,90 L 60,98 L 44,96 L 38,88 Z" />
        </svg>

        {/* Nós Interativos das Regiões do Tema */}
        {regioes.map((reg) => {
          const ehAtual = reg.id === regiaoAtiva.id;
          const ehFocada = reg.id === regiaoExibida.id;

          return (
            <button
              key={reg.id}
              type="button"
              onClick={() => setRegiaoFocadaId(reg.id)}
              aria-label={`${reg.nome}${ehAtual ? ' (Localização Atual)' : ''}`}
              style={{ left: `${reg.x}%`, top: `${reg.y}%` }}
              className={`absolute -translate-x-1/2 -translate-y-1/2 p-2 rounded-full transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--ouro-claro)] group cursor-pointer min-w-[28px] min-h-[28px] flex items-center justify-center ${
                ehAtual
                  ? 'bg-[var(--ouro)] text-black z-20 shadow-lg shadow-[var(--ouro)]/40 ring-4 ring-[var(--ouro)]/30'
                  : ehFocada
                  ? 'bg-[var(--pergaminho-4)] border border-[var(--ouro)] text-[var(--ouro-claro)] z-10'
                  : 'bg-[var(--pergaminho-1)] border border-[var(--borda)] text-[var(--tinta-suave)] hover:text-[var(--ouro)] hover:border-[var(--ouro-escuro)]'
              }`}
            >
              {/* Anel de Pulso nos primeiros ciclos para a posição atual */}
              {ehAtual && (
                <span className="absolute inset-0 rounded-full bg-[var(--ouro)] animate-ping opacity-40 motion-reduce:hidden" />
              )}
              <MapPin className={`w-3.5 h-3.5 ${ehAtual ? 'text-black' : 'text-current'}`} />

              {/* Rótulo Flutuante no Hover / Foco */}
              <span className="absolute bottom-full mb-1 hidden group-hover:block px-2 py-0.5 rounded bg-black/90 border border-[var(--ouro-escuro)] text-[13px] font-sans text-[var(--tinta)] whitespace-nowrap z-30 pointer-events-none">
                {reg.nome}
              </span>
            </button>
          );
        })}
      </div>

      {/* Painel de Detalhes da Região Selecionada */}
      <div className="bg-[var(--pergaminho-1)] p-3.5 rounded-xl border border-[var(--borda)] space-y-2 entrada-fade">
        <div className="flex items-center justify-between">
          <span className="text-xs uppercase tracking-wider text-[var(--ouro)] font-bold flex items-center gap-1.5">
            <Shield className="w-3.5 h-3.5" />
            <span>{regiaoExibida.nome}</span>
          </span>
          {regiaoExibida.id === regiaoAtiva.id && (
            <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-950/80 border border-emerald-700/60 text-emerald-300 font-sans font-semibold">
              Sua Localização
            </span>
          )}
        </div>

        <p className="text-xs text-[var(--tinta-suave)] font-garamond italic leading-relaxed">
          {regiaoExibida.descricao}
        </p>

        {casasPrincipais[regiaoExibida.id] && (
          <div className="text-xs text-[var(--ouro-escuro)] font-sans pt-1 border-t border-[var(--borda)]">
            <span>Senhorio: </span>
            <span className="text-[var(--tinta)] font-semibold">
              {casasPrincipais[regiaoExibida.id]}
            </span>
          </div>
        )}
      </div>

      {/* Lista Textual Alternativa Acessível para Leitores de Tela */}
      <ul className="sr-only" aria-label="Lista de todas as regiões cartográficas">
        {regioes.map((reg) => (
          <li
            key={reg.id}
            aria-current={reg.id === regiaoAtiva.id ? 'location' : undefined}
          >
            {reg.nome}: {reg.descricao}
          </li>
        ))}
      </ul>
    </div>
  );
}
