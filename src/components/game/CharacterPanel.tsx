'use client';

import React from 'react';
import { FichaPersonagem, AtributoVoz } from '@/server/engine/rpgEngine';
import {
  Heart,
  Shield,
  Scale,
  Crown,
  Flame,
  Eye,
  Scroll,
  BookOpen,
  Compass,
  Key,
  Bandage,
} from 'lucide-react';

interface PropsCharacterPanel {
  ficha: FichaPersonagem;
  className?: string;
}

const VOZ_ICON_MAP: Record<AtributoVoz, { label: string; subtitulo: string; icon: React.ComponentType<{ className?: string }>; color: string }> = {
  comando: { label: 'Comando', subtitulo: 'O Marechal', icon: Crown, color: 'text-amber-400' },
  furia: { label: 'Fúria', subtitulo: 'O Guerreiro', icon: Flame, color: 'text-red-400' },
  astucia: { label: 'Astúcia', subtitulo: 'A Aranha', icon: Eye, color: 'text-purple-400' },
  cortesia: { label: 'Cortesia', subtitulo: 'O Cortesão', icon: Scroll, color: 'text-blue-400' },
  erudicao: { label: 'Erudição', subtitulo: 'O Meistre', icon: BookOpen, color: 'text-amber-300' },
  pressagio: { label: 'Presságio', subtitulo: 'O Corvo', icon: Compass, color: 'text-slate-300' },
};

export function CharacterPanel({ ficha, className = '' }: PropsCharacterPanel) {
  // Cálculo da Honra (-10 a +10) para exibição em barra bipolar centrada
  const honraNormalizada = ((ficha.estado.honra + 10) / 20) * 100; // 0% a 100%

  return (
    <aside className={`bg-[#171412] border-2 border-[#2D2620] rounded-2xl p-5 shadow-2xl text-[#E6DEC8] font-garamond space-y-6 ${className}`}>
      
      {/* Moldura do Retrato e Identidade */}
      <div className="text-center border-b border-[#2D2620] pb-5">
        {/* Brasão Heráldico Targaryen (Dragão Tricéfalo em SVG estilizado) */}
        <div className="relative inline-block mx-auto mb-3">
          <div className="w-20 h-20 rounded-full bg-gradient-to-b from-[#2a0d10] to-[#12080a] border-2 border-[#C5A059] p-2 flex items-center justify-center shadow-lg shadow-black/80">
            <svg viewBox="0 0 100 100" className="w-14 h-14 text-red-600 fill-current drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
              <path d="M50 15 C45 25 35 30 25 35 C35 45 40 55 35 70 C45 65 55 65 65 70 C60 55 65 45 75 35 C65 30 55 25 50 15 Z" />
              <circle cx="50" cy="22" r="4" fill="#C5A059" />
              <circle cx="38" cy="30" r="3" fill="#C5A059" />
              <circle cx="62" cy="30" r="3" fill="#C5A059" />
            </svg>
          </div>
          <span className="absolute -bottom-1 -right-1 p-1 rounded-full bg-amber-950 border border-[#C5A059] text-[#C5A059]">
            <Crown className="w-3.5 h-3.5" />
          </span>
        </div>

        <h2 className="text-xl font-bold font-cinzel text-amber-200 tracking-wide">
          {ficha.nome}
        </h2>
        <p className="text-xs text-[#A69E89] font-cinzel mt-0.5">
          Senhor de Pedra do Dragão
        </p>

        {/* Traço de Origem */}
        <div className="mt-2.5">
          <span className="inline-block text-[11px] font-cinzel uppercase font-bold tracking-wider px-3 py-1 rounded-full bg-red-950/80 border border-red-700/60 text-red-300">
            {ficha.origem.replace(/_/g, ' ')}
          </span>
        </div>
      </div>

      {/* As 3 Barras Vitais */}
      <div className="space-y-4">
        <h3 className="text-xs font-cinzel uppercase tracking-widest text-[#C5A059] font-semibold border-b border-[#2D2620] pb-1">
          Estado Vital & Moral
        </h3>

        {/* 1. Sangue (0 a 10) */}
        <div>
          <div className="flex items-center justify-between text-xs font-cinzel mb-1">
            <span className="flex items-center gap-1.5 text-red-400 font-bold">
              <Heart className="w-3.5 h-3.5 fill-current" />
              Sangue
            </span>
            <span className="font-sans font-semibold text-slate-300">
              {ficha.estado.sangue} / 10
            </span>
          </div>
          <div className="w-full h-2.5 bg-[#100b0c] border border-red-950 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-red-900 via-red-700 to-red-500 rounded-full transition-all duration-500"
              style={{ width: `${(ficha.estado.sangue / 10) * 100}%` }}
            />
          </div>
        </div>

        {/* 2. Compostura (0 a 10) */}
        <div>
          <div className="flex items-center justify-between text-xs font-cinzel mb-1">
            <span className="flex items-center gap-1.5 text-blue-400 font-bold">
              <Shield className="w-3.5 h-3.5" />
              Compostura
            </span>
            <span className="font-sans font-semibold text-slate-300">
              {ficha.estado.compostura} / 10
            </span>
          </div>
          <div className="w-full h-2.5 bg-[#0b0e12] border border-blue-950 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-900 via-blue-700 to-sky-500 rounded-full transition-all duration-500"
              style={{ width: `${(ficha.estado.compostura / 10) * 100}%` }}
            />
          </div>
        </div>

        {/* 3. Honra (-10 a +10 Bipolar) */}
        <div>
          <div className="flex items-center justify-between text-xs font-cinzel mb-1">
            <span className="flex items-center gap-1.5 text-[#C5A059] font-bold">
              <Scale className="w-3.5 h-3.5" />
              Honra
            </span>
            <span className="font-sans font-semibold text-slate-300">
              {ficha.estado.honra > 0 ? `+${ficha.estado.honra}` : ficha.estado.honra}
            </span>
          </div>
          <div className="w-full h-2.5 bg-[#12100E] border border-[#2D2620] rounded-full relative overflow-hidden">
            {/* Marcador central zero */}
            <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-slate-600 z-10" />
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                ficha.estado.honra >= 0
                  ? 'bg-gradient-to-r from-amber-700 to-[#C5A059]'
                  : 'bg-gradient-to-l from-red-950 to-stone-900'
              }`}
              style={{
                width: `${Math.abs(ficha.estado.honra) * 5}%`,
                marginLeft: ficha.estado.honra >= 0 ? '50%' : `${50 - Math.abs(ficha.estado.honra) * 5}%`,
              }}
            />
          </div>
          <div className="flex justify-between text-[9px] font-cinzel text-slate-500 mt-1">
            <span>Obsidiana (-10)</span>
            <span>Neutro (0)</span>
            <span>Ouro Real (+10)</span>
          </div>
        </div>
      </div>

      {/* Grade dos 6 Atributos-Vozes */}
      <div className="space-y-3">
        <h3 className="text-xs font-cinzel uppercase tracking-widest text-[#C5A059] font-semibold border-b border-[#2D2620] pb-1">
          Atributos & Vozes
        </h3>

        <div className="grid grid-cols-2 gap-2 text-xs">
          {(Object.keys(VOZ_ICON_MAP) as AtributoVoz[]).map((attr) => {
            const conf = VOZ_ICON_MAP[attr];
            const Icone = conf.icon;
            const valor = ficha.atributos[attr];

            return (
              <div
                key={attr}
                className="p-2.5 rounded-lg bg-[#12100E] border border-[#2D2620] flex items-center justify-between"
              >
                <div className="flex items-center gap-1.5">
                  <Icone className={`w-3.5 h-3.5 ${conf.color}`} />
                  <div>
                    <span className="font-cinzel font-bold text-slate-200 block text-[11px] leading-tight">
                      {conf.label}
                    </span>
                    <span className="text-[9px] text-slate-400 font-garamond italic">
                      {conf.subtitulo}
                    </span>
                  </div>
                </div>

                {/* Pontos de rank (1 a 5) */}
                <div className="flex gap-0.5 text-[#C5A059] text-[10px]">
                  {[1, 2, 3, 4, 5].map((pip) => (
                    <span key={pip} className={pip <= valor ? 'text-[#C5A059]' : 'text-stone-800'}>
                      ◆
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Cicatrizes & Segredos */}
      <div className="space-y-3 pt-2">
        {/* Cicatrizes */}
        {ficha.cicatrizes.length > 0 && (
          <div>
            <span className="text-[11px] font-cinzel uppercase text-red-400 font-bold flex items-center gap-1 mb-1.5">
              <Bandage className="w-3.5 h-3.5" />
              Cicatrizes Ativas
            </span>
            <div className="space-y-1">
              {ficha.cicatrizes.map((c, i) => (
                <div key={i} className="text-xs p-2 rounded bg-red-950/40 border border-red-900/50 text-red-200">
                  {c}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Segredos Descobertos */}
        <div>
          <span className="text-[11px] font-cinzel uppercase text-amber-400 font-bold flex items-center gap-1 mb-1.5">
            <Key className="w-3.5 h-3.5" />
            Segredos da Cidadela
          </span>
          {ficha.segredos.length > 0 ? (
            <div className="space-y-1.5">
              {ficha.segredos.map((s, i) => (
                <div key={i} className="text-xs p-2 rounded bg-[#12100E] border border-amber-900/40 text-amber-200/90 font-garamond">
                  {s}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xs text-slate-500 font-garamond italic">
              Nenhum segredo político descoberto até o momento.
            </p>
          )}
        </div>
      </div>

    </aside>
  );
}
