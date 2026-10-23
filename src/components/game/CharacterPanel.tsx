'use client';

import React from 'react';
import { FichaPersonagem, AtributoVoz } from '@/server/engine/rpgEngine';
import {
  Heart,
  Shield,
  Scale,
  Swords,
  Scroll,
  Eye,
  Crown,
  Sparkles,
  BookOpen,
  Bandage,
  Key,
  Users,
} from 'lucide-react';

interface PropsCharacterPanel {
  ficha: FichaPersonagem;
  className?: string;
}

// Configuração visual das 6 Vozes
const VOZ_ICON_MAP: Record<
  AtributoVoz,
  { label: string; icon: React.ComponentType<{ className?: string }>; color: string; subtitulo: string }
> = {
  furia: { label: 'Fúria', icon: Swords, color: 'text-red-500', subtitulo: 'Instinto & Aço' },
  cortesia: { label: 'Cortesia', icon: Scroll, color: 'text-amber-400', subtitulo: 'Honra & Diplomacia' },
  astucia: { label: 'Astúcia', icon: Eye, color: 'text-purple-400', subtitulo: 'Sombras & Manobras' },
  erudicao: { label: 'Erudição', icon: BookOpen, color: 'text-blue-400', subtitulo: 'História & Corvos' },
  comando: { label: 'Comando', icon: Crown, color: 'text-yellow-500', subtitulo: 'Autoridade & Legado' },
  pressagio: { label: 'Presságio', icon: Sparkles, color: 'text-emerald-400', subtitulo: 'Sonhos & Profecias' },
};

export function CharacterPanel({ ficha, className = '' }: PropsCharacterPanel) {
  const inspiracaoVal = ficha.inspiracao ?? 2;
  const companheiros = ficha.companheiros || {};
  const temCompanheiros = Object.keys(companheiros).length > 0;

  return (
    <aside
      className={`w-full bg-[var(--pergaminho-2)] border-2 border-[var(--borda)] rounded-2xl p-5 shadow-2xl space-y-6 text-[var(--tinta)] ${className}`}
    >
      {/* Moldura de Retrato e Brasão Heráldico */}
      <div className="text-center relative pb-3 border-b border-[var(--borda)]">
        <div className="relative w-20 h-20 mx-auto mb-3 rounded-full border-2 border-[var(--ouro)] p-1 bg-gradient-to-b from-[var(--borda)] to-[var(--pergaminho-1)] shadow-lg shadow-black/80 flex items-center justify-center">
          <div className="w-full h-full rounded-full bg-[#1A1412] flex items-center justify-center overflow-hidden border border-[var(--ouro)]/40">
            {/* Brasão Heráldico do Dragão de Três Cabeças em SVG */}
            <svg viewBox="0 0 100 100" className="w-14 h-14 text-red-600 fill-current drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
              <path d="M50 15 C45 25 35 30 25 35 C35 45 40 55 35 70 C45 65 55 65 65 70 C60 55 65 45 75 35 C65 30 55 25 50 15 Z" />
              <circle cx="50" cy="22" r="4" fill="[var(--ouro)]" />
              <circle cx="38" cy="30" r="3" fill="[var(--ouro)]" />
              <circle cx="62" cy="30" r="3" fill="[var(--ouro)]" />
            </svg>
          </div>
          <span className="absolute -bottom-1 -right-1 p-1 rounded-full bg-amber-950 border border-[var(--ouro)] text-[var(--ouro)]">
            <Crown className="w-3.5 h-3.5" />
          </span>
        </div>

        <h2 className="text-xl font-bold font-cinzel text-amber-200 tracking-wide">
          {ficha.nome}
        </h2>
        <p className="text-xs text-[var(--tinta-suave)] font-cinzel mt-0.5">
          {ficha.titulo || 'Senhor dos Sete Reinos'}
        </p>

        {/* Traço de Origem */}
        <div className="mt-2.5">
          <span className="inline-block text-xs font-cinzel uppercase font-bold tracking-wider px-3 py-1 rounded-full bg-red-950/80 border border-red-700/60 text-red-300">
            {ficha.origem.replace(/_/g, ' ')}
          </span>
        </div>

        {/* Pontos de Inspiração Estilo BG3 */}
        <div className="mt-3 bg-[#100e0c] border border-amber-900/40 rounded-xl p-2.5 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-amber-400 fill-current animate-pulse" />
            <span className="text-xs font-cinzel font-bold text-amber-200 uppercase tracking-wider">
              Inspiração
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            {[1, 2, 3, 4].map((ponto) => (
              <span
                key={ponto}
                title={`Ponto de Inspiração ${ponto}`}
                className={`text-base transition-transform ${
                  ponto <= inspiracaoVal
                    ? 'text-amber-400 drop-shadow-[0_0_6px_rgba(245,158,11,0.8)] scale-110'
                    : 'text-stone-800'
                }`}
              >
                ★
              </span>
            ))}
            <span className="text-xs font-sans font-bold text-slate-400 ml-1">
              {inspiracaoVal}/4
            </span>
          </div>
        </div>
      </div>

      {/* As 3 Barras Vitais */}
      <div className="space-y-4">
        <h3 className="text-xs font-cinzel uppercase tracking-widest text-[var(--ouro)] font-semibold border-b border-[var(--borda)] pb-1">
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
            <span className="flex items-center gap-1.5 text-[var(--ouro)] font-bold">
              <Scale className="w-3.5 h-3.5" />
              Honra
            </span>
            <span className="font-sans font-semibold text-slate-300">
              {ficha.estado.honra > 0 ? `+${ficha.estado.honra}` : ficha.estado.honra}
            </span>
          </div>
          <div className="w-full h-2.5 bg-[var(--pergaminho-1)] border border-[var(--borda)] rounded-full relative overflow-hidden">
            <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-slate-600 z-10" />
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                ficha.estado.honra >= 0
                  ? 'bg-gradient-to-r from-amber-700 to-[var(--ouro)]'
                  : 'bg-gradient-to-l from-red-950 to-stone-900'
              }`}
              style={{
                width: `${Math.abs(ficha.estado.honra) * 5}%`,
                marginLeft: ficha.estado.honra >= 0 ? '50%' : `${50 - Math.abs(ficha.estado.honra) * 5}%`,
              }}
            />
          </div>
          <div className="flex justify-between text-xs font-cinzel text-slate-500 mt-1">
            <span>Obsidiana (-10)</span>
            <span>Neutro (0)</span>
            <span>Ouro Real (+10)</span>
          </div>
        </div>
      </div>

      {/* Círculo Íntimo: Aprovação dos Companheiros (Estilo BG3) */}
      {temCompanheiros && (
        <div className="space-y-3 pt-1">
          <h3 className="text-xs font-cinzel uppercase tracking-widest text-[var(--ouro)] font-semibold border-b border-[var(--borda)] pb-1 flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-amber-400" />
              Círculo Íntimo
            </span>
            <span className="text-xs text-slate-400 lowercase font-sans font-normal">
              aprovação
            </span>
          </h3>

          <div className="space-y-2.5">
            {Object.entries(companheiros).map(([id, comp]) => {
              const statusColor =
                comp.status === 'Devotado'
                  ? 'text-emerald-300 border-emerald-800 bg-emerald-950/70'
                  : comp.status === 'Leal'
                  ? 'text-blue-300 border-blue-800 bg-blue-950/70'
                  : comp.status === 'Neutro'
                  ? 'text-amber-300 border-amber-800 bg-amber-950/70'
                  : comp.status === 'Frio'
                  ? 'text-cyan-300 border-cyan-800 bg-cyan-950/70'
                  : 'text-red-300 border-red-800 bg-red-950/70';

              const percent = Math.min(100, Math.max(0, ((comp.aprovacao + 100) / 200) * 100));

              return (
                <div
                  key={id}
                  className="p-2.5 rounded-lg bg-[var(--pergaminho-1)] border border-[var(--borda)] hover:border-amber-900/50 transition-colors"
                >
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="font-cinzel font-bold text-slate-200">
                      {comp.nome}
                    </span>
                    <span className={`text-xs uppercase px-2 py-0.5 rounded border font-bold ${statusColor}`}>
                      {comp.status} ({comp.aprovacao > 0 ? `+${comp.aprovacao}` : comp.aprovacao})
                    </span>
                  </div>

                  <p className="text-xs text-slate-400 font-garamond italic mb-1.5 leading-tight">
                    {comp.titulo}
                  </p>

                  <div className="w-full h-1.5 bg-stone-900 rounded-full overflow-hidden border border-stone-800">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        comp.aprovacao >= 50
                          ? 'bg-gradient-to-r from-emerald-600 to-teal-400'
                          : comp.aprovacao >= 15
                          ? 'bg-gradient-to-r from-blue-600 to-cyan-400'
                          : comp.aprovacao >= -15
                          ? 'bg-gradient-to-r from-amber-700 to-yellow-500'
                          : comp.aprovacao >= -50
                          ? 'bg-gradient-to-r from-cyan-800 to-slate-500'
                          : 'bg-gradient-to-r from-red-900 to-rose-600'
                      }`}
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Grade dos 6 Atributos-Vozes */}
      <div className="space-y-3">
        <h3 className="text-xs font-cinzel uppercase tracking-widest text-[var(--ouro)] font-semibold border-b border-[var(--borda)] pb-1">
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
                className="p-2.5 rounded-lg bg-[var(--pergaminho-1)] border border-[var(--borda)] flex items-center justify-between"
              >
                <div className="flex items-center gap-1.5">
                  <Icone className={`w-3.5 h-3.5 ${conf.color}`} />
                  <div>
                    <span className="font-cinzel font-bold text-slate-200 block text-xs leading-tight">
                      {conf.label}
                    </span>
                    <span className="text-xs text-slate-400 font-garamond italic">
                      {conf.subtitulo}
                    </span>
                  </div>
                </div>

                {/* Pontos de rank (1 a 5) */}
                <div className="flex gap-0.5 text-[var(--ouro)] text-xs">
                  {[1, 2, 3, 4, 5].map((pip) => (
                    <span key={pip} className={pip <= valor ? 'text-[var(--ouro)]' : 'text-stone-800'}>
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
        {ficha.cicatrizes.length > 0 && (
          <div>
            <span className="text-xs font-cinzel uppercase text-red-400 font-bold flex items-center gap-1 mb-1.5">
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

        <div>
          <span className="text-xs font-cinzel uppercase text-amber-400 font-bold flex items-center gap-1 mb-1.5">
            <Key className="w-3.5 h-3.5" />
            Segredos da Cidadela
          </span>
          {ficha.segredos.length > 0 ? (
            <div className="space-y-1.5">
              {ficha.segredos.map((s, i) => (
                <div key={i} className="text-xs p-2 rounded bg-[var(--pergaminho-1)] border border-amber-900/40 text-amber-200/90 font-garamond">
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
