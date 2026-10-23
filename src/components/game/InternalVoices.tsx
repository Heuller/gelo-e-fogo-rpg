'use client';

import React from 'react';
import { AtributoVoz } from '@/server/engine/rpgEngine';
import {
  Crown,
  Flame,
  Eye,
  Scroll,
  BookOpen,
  Compass,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
} from 'lucide-react';

export interface IntervencaoVoz {
  atributo: AtributoVoz;
  resultadoPassivo?: 'SUCESSO' | 'FALHA' | 'CRITICO';
  dcPassiva?: number;
  fala: string;
}

interface ConfiguracaoVoz {
  titulo: string;
  subtitulo: string;
  corBorda: string;
  corBg: string;
  corTexto: string;
  corBadge: string;
  icone: React.ComponentType<{ className?: string }>;
}

const CONFIG_VOZES: Record<AtributoVoz, ConfiguracaoVoz> = {
  comando: {
    titulo: 'Comando',
    subtitulo: 'O Marechal',
    corBorda: 'border-[var(--ouro)]',
    corBg: 'bg-[#1e1913]/90',
    corTexto: 'text-[#E8CD8C]',
    corBadge: 'bg-amber-950/70 text-[var(--ouro)] border-amber-600/40',
    icone: Crown,
  },
  furia: {
    titulo: 'Fúria',
    subtitulo: 'O Guerreiro',
    corBorda: 'border-[var(--carmim)]',
    corBg: 'bg-[#1f1010]/90',
    corTexto: 'text-red-200',
    corBadge: 'bg-red-950/70 text-red-400 border-red-700/50',
    icone: Flame,
  },
  astucia: {
    titulo: 'Astúcia',
    subtitulo: 'A Aranha',
    corBorda: 'border-[#7E57C2]',
    corBg: 'bg-[#18131e]/90',
    corTexto: 'text-purple-200',
    corBadge: 'bg-purple-950/70 text-purple-300 border-purple-700/50',
    icone: Eye,
  },
  cortesia: {
    titulo: 'Cortesia',
    subtitulo: 'O Cortesão',
    corBorda: 'border-[#2B6CB0]',
    corBg: 'bg-[#101722]/90',
    corTexto: 'text-blue-200',
    corBadge: 'bg-blue-950/70 text-blue-300 border-blue-700/50',
    icone: Scroll,
  },
  erudicao: {
    titulo: 'Erudição',
    subtitulo: 'O Meistre',
    corBorda: 'border-[#D97706]',
    corBg: 'bg-[#1e1710]/90',
    corTexto: 'text-amber-100',
    corBadge: 'bg-yellow-950/70 text-amber-300 border-yellow-700/50',
    icone: BookOpen,
  },
  pressagio: {
    titulo: 'Presságio',
    subtitulo: 'O Corvo',
    corBorda: 'border-[#94A3B8]',
    corBg: 'bg-[#14161a]/90',
    corTexto: 'text-slate-200',
    corBadge: 'bg-slate-900/80 text-slate-300 border-slate-600/50',
    icone: Compass,
  },
};

interface PropsInternalVoices {
  intervencoes: IntervencaoVoz[];
  className?: string;
}

export function InternalVoices({ intervencoes, className = '' }: PropsInternalVoices) {
  if (!intervencoes || intervencoes.length === 0) return null;

  return (
    <div className={`space-y-3.5 my-6 ${className}`}>
      {intervencoes.map((item, index) => {
        const conf = CONFIG_VOZES[item.atributo] || CONFIG_VOZES.comando;
        const Icone = conf.icone;

        return (
          <div
            key={index}
            className={`border-l-4 ${conf.corBorda} ${conf.corBg} p-4 rounded-r-xl border border-y-slate-800/40 border-r-slate-800/40 shadow-lg backdrop-blur-sm transition-all duration-300 hover:translate-x-1`}
          >
            {/* Cabeçalho da Voz Interna */}
            <div className="flex items-center justify-between mb-2 font-cinzel">
              <div className="flex items-center gap-2">
                <span className={`p-1 rounded ${conf.corBadge} border`}>
                  <Icone className="w-4 h-4" />
                </span>
                <span className="text-xs uppercase font-bold tracking-wider text-slate-300">
                  {conf.titulo} &bull; <em className="text-amber-400 not-italic">{conf.subtitulo}</em>
                </span>
              </div>

              {item.resultadoPassivo && (
                <span
                  className={`text-xs uppercase font-bold px-2 py-0.5 rounded border flex items-center gap-1 ${
                    item.resultadoPassivo === 'CRITICO' || item.resultadoPassivo === 'SUCESSO'
                      ? 'bg-emerald-950/70 text-emerald-300 border-emerald-700/50'
                      : 'bg-amber-950/70 text-amber-300 border-amber-700/50'
                  }`}
                >
                  <CheckCircle2 className="w-3 h-3" />
                  <span>Teste Passivo: {item.resultadoPassivo}</span>
                </span>
              )}
            </div>

            {/* Prosa da Voz Interna estilo Disco Elysium */}
            <p className={`font-garamond italic text-lg leading-relaxed ${conf.corTexto}`}>
              &ldquo;{item.fala}&rdquo;
            </p>
          </div>
        );
      })}
    </div>
  );
}
