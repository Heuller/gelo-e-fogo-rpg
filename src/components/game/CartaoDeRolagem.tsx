'use client';

import React, { useEffect, useRef, useState } from 'react';
import { ResultadoRolagem, FaixaResultado } from '@/server/engine/rpgEngine';
import { Botao } from '@/components/ui/Botao';
import { Selo } from '@/components/ui/Selo';
import { Sparkles, Skull, CheckCircle2, AlertTriangle, RotateCcw, ArrowRight } from 'lucide-react';
import { audioManager } from '@/lib/audio/audioManager';

export interface CartaoDeRolagemProps {
  resultado: ResultadoRolagem;
  nomeAtributo?: string;
  inspiracaoRestante?: number;
  onContinuar: () => void;
  onRerrolar?: () => void;
  className?: string;
}

// Representação vetorial SVG fiel dos pontos de um d6
function DadoD6SVG({ valor, animando }: { valor: number; animando: boolean }) {
  const pontosMap: Record<number, [number, number][]> = {
    1: [[50, 50]],
    2: [[30, 30], [70, 70]],
    3: [[30, 30], [50, 50], [70, 70]],
    4: [[30, 30], [30, 70], [70, 30], [70, 70]],
    5: [[30, 30], [30, 70], [50, 50], [70, 30], [70, 70]],
    6: [[30, 25], [30, 50], [30, 75], [70, 25], [70, 50], [70, 75]],
  };

  const pontos = pontosMap[valor] || pontosMap[1];

  return (
    <div
      className={`w-16 h-16 sm:w-20 sm:h-20 rounded-xl bg-gradient-to-br from-[#2D2520] via-[var(--pergaminho-3)] to-[#14100E] border-2 border-[var(--ouro)] p-2.5 flex items-center justify-center shadow-2xl shadow-black/90 transition-transform ${
        animando ? 'animate-bounce motion-reduce:animate-none' : ''
      }`}
    >
      <svg viewBox="0 0 100 100" className="w-full h-full fill-current drop-shadow">
        {/* Fundo do dado */}
        <rect
          x="4"
          y="4"
          width="92"
          height="92"
          rx="14"
          fill="none"
          stroke="var(--ouro-escuro)"
          strokeWidth="3"
        />
        {/* Pontos / Pips */}
        {pontos.map(([cx, cy], idx) => (
          <circle
            key={idx}
            cx={cx}
            cy={cy}
            r="8.5"
            fill="var(--ouro-claro)"
            stroke="var(--ouro-escuro)"
            strokeWidth="1.5"
          />
        ))}
      </svg>
    </div>
  );
}

export const CartaoDeRolagem: React.FC<CartaoDeRolagemProps> = ({
  resultado,
  nomeAtributo = 'Atributo',
  inspiracaoRestante = 0,
  onContinuar,
  onRerrolar,
  className = '',
}) => {
  const [animando, setAnimando] = useState(true);
  const botaoContinuarRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    // Tocar som de rolagem ao abrir o cartão
    audioManager.tocarSomDados();

    // Duração da animação dramática: 750ms
    const timer = setTimeout(() => {
      setAnimando(false);
      // Foco automático no botão de prosseguir após estabilizar a rolagem
      botaoContinuarRef.current?.focus();
    }, 750);

    return () => clearTimeout(timer);
  }, [resultado]);

  // Tecla Esc fecha/continua
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        e.preventDefault();
        onContinuar();
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onContinuar]);

  // Configuração por Veredito
  const configVeredito: Record<
    FaixaResultado,
    { titulo: string; subtitulo: string; seloVariante: 'triunfo' | 'sucesso' | 'parcial' | 'calamidade'; icone: React.ReactNode }
  > = {
    CRITICO: {
      titulo: 'Triunfo',
      subtitulo: 'Um golpe do destino a vosso favor. Os deuses sorriem para vossa ousadia.',
      seloVariante: 'triunfo',
      icone: <Sparkles className="w-5 h-5" />,
    },
    SUCESSO: {
      titulo: 'Sucesso',
      subtitulo: 'Vossa perícia prevalece sobre a adversidade.',
      seloVariante: 'sucesso',
      icone: <CheckCircle2 className="w-5 h-5" />,
    },
    FALHA_PARCIAL: {
      titulo: 'Falha Parcial',
      subtitulo: 'A história avança, mas com custo ou complicação imprevista.',
      seloVariante: 'parcial',
      icone: <AlertTriangle className="w-5 h-5" />,
    },
    FALHA_CRITICA: {
      titulo: 'Calamidade',
      subtitulo: 'As consequências desabam com severidade sobre vossa casa.',
      seloVariante: 'calamidade',
      icone: <Skull className="w-5 h-5" />,
    },
  };

  const veredito = configVeredito[resultado.resultado] || configVeredito.SUCESSO;
  const ehFalha = resultado.resultado === 'FALHA_PARCIAL' || resultado.resultado === 'FALHA_CRITICA';
  const podeRerrolar = ehFalha && inspiracaoRestante > 0 && Boolean(onRerrolar);

  const fraseAcessivel = `Resultado do teste: ${veredito.titulo}. Rolagem de dados ${resultado.dados[0]} e ${resultado.dados[1]}, somado a ${nomeAtributo} (${resultado.valorAtributo}), totalizando ${resultado.total} contra DC ${resultado.dc}.`;

  return (
    <div
      role="status"
      aria-live="polite"
      aria-label={fraseAcessivel}
      className={`w-full max-w-xl mx-auto my-6 p-6 sm:p-8 rounded-2xl bg-[var(--pergaminho-2)] border-2 border-[var(--ouro)] shadow-2xl shadow-black/90 text-[var(--tinta)] font-cinzel space-y-6 relative overflow-hidden entrada-sobe ${className}`}
    >
      {/* Moldura Heráldica Decorativa */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-transparent via-[var(--ouro)] to-transparent" />

      {/* Cabeçalho do Teste */}
      <div className="text-center space-y-1 pb-3 border-b border-[var(--borda)]">
        <span className="text-xs uppercase tracking-[0.2em] text-[var(--ouro)] font-bold">
          Teste de {nomeAtributo} &bull; DC {resultado.dc}
        </span>
        <h3 className="text-2xl font-bold tracking-wider text-[var(--ouro-claro)]">
          Mesa dos Destinos
        </h3>
      </div>

      {/* Exibição dos Dados SVG */}
      <div className="flex items-center justify-center gap-6 py-2">
        <DadoD6SVG valor={resultado.dados[0]} animando={animando} />
        <span className="text-2xl text-[var(--ouro)] font-bold select-none">+</span>
        <DadoD6SVG valor={resultado.dados[1]} animando={animando} />
      </div>

      {/* Linha da Soma dos Fatores */}
      <div className="text-center p-3 rounded-xl bg-[var(--pergaminho-1)] border border-[var(--borda)] text-xs font-sans">
        <span className="font-mono text-sm font-bold text-[var(--ouro)]">
          {resultado.dados[0]} + {resultado.dados[1]}
        </span>
        <span className="text-[var(--tinta-suave)] mx-1.5">+</span>
        <span className="text-[var(--ouro-claro)] font-semibold">
          {nomeAtributo} ({resultado.valorAtributo})
        </span>
        <span className="text-[var(--tinta-suave)] mx-1.5">=</span>
        <span className="font-mono text-base font-bold text-[var(--ouro)]">
          {resultado.total}
        </span>
        <span className="text-[var(--tinta-suave)] mx-2">contra</span>
        <span className="font-bold text-[var(--ouro-claro)]">
          DC {resultado.dc}
        </span>
      </div>

      {/* Selo de Cera e Veredito */}
      <div className="flex flex-col items-center justify-center gap-2 pt-2 text-center">
        <Selo
          veredito={
            resultado.resultado === 'CRITICO'
              ? 'TRIUNFO'
              : resultado.resultado === 'FALHA_CRITICA'
              ? 'CALAMIDADE'
              : resultado.resultado
          }
        />
        <p className="text-xs text-[var(--tinta-suave)] font-garamond italic max-w-md pt-1">
          {veredito.subtitulo}
        </p>
      </div>

      {/* Botões de Ação */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4 border-t border-[var(--borda)]">
        {podeRerrolar && onRerrolar && (
          <Botao
            variante="secundario"
            onClick={onRerrolar}
            className="w-full sm:w-auto"
          >
            <RotateCcw className="w-4 h-4 text-[var(--ouro)]" />
            <span>Gastar 1 Inspiração e rolar de novo (restam {inspiracaoRestante})</span>
          </Botao>
        )}

        <button
          ref={botaoContinuarRef}
          type="button"
          onClick={onContinuar}
          className="w-full sm:w-auto px-6 py-2.5 rounded-xl font-cinzel font-bold text-xs uppercase tracking-wider bg-[var(--pergaminho-3)] hover:bg-[var(--pergaminho-4)] border-2 border-[var(--ouro)] text-[var(--ouro-claro)] transition-all flex items-center justify-center gap-2 shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--ouro-claro)] focus-visible:outline-offset-2 cursor-pointer"
        >
          <span>Continuar Crônica</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
