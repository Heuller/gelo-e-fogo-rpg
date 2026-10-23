'use client';

import React from 'react';
import { AtributoVoz } from '@/server/engine/rpgEngine';
import { obterTemaJornada } from '@/lib/temas';
import {
  Crown,
  Flame,
  Eye,
  Scroll,
  BookOpen,
  Compass,
  ChevronDown,
} from 'lucide-react';

export interface IntervencaoVoz {
  atributo: AtributoVoz;
  dcPassiva?: number;
  fala: string;
}

const ICONES_VOZES: Record<AtributoVoz, React.ComponentType<{ className?: string }>> = {
  comando: Crown,
  furia: Flame,
  astucia: Eye,
  cortesia: Compass,
  erudicao: BookOpen,
  pressagio: Scroll,
};

export interface VozesInternasProps {
  intervencoes: IntervencaoVoz[];
  atributos: Record<AtributoVoz, number>;
  temaId?: string;
  dicasPercepcao?: boolean;
  className?: string;
}

export const VozesInternasV2: React.FC<VozesInternasProps> = ({
  intervencoes,
  atributos,
  temaId = 'conquista_aegon',
  dicasPercepcao = true,
  className = '',
}) => {
  if (!intervencoes || intervencoes.length === 0) return null;

  const tema = obterTemaJornada(temaId);

  // Avaliação determinística de testes passivos: valorAtributo + 7 >= dcPassiva
  const vozesAprovadas: Array<{ voz: IntervencaoVoz; valor: number }> = [];
  let vozesOcultadas = 0;

  for (const v of intervencoes) {
    const valorAtributo = atributos[v.atributo] ?? 3;
    const passou = v.dcPassiva ? valorAtributo + 7 >= v.dcPassiva : true;

    if (passou) {
      vozesAprovadas.push({ voz: v, valor: valorAtributo });
    } else {
      vozesOcultadas++;
    }
  }

  if (vozesAprovadas.length === 0) {
    if (dicasPercepcao && vozesOcultadas > 0) {
      return (
        <div className={`p-3 rounded-lg border border-[var(--borda)] bg-[var(--pergaminho-1)] text-xs text-[var(--tinta-fraca)] italic text-center font-sans ${className}`}>
          Vossos sentidos sentem que algo vos escapou neste instante.
        </div>
      );
    }
    return null;
  }

  // Ordena por maior atributo para exibir a mais relevante em destaque
  vozesAprovadas.sort((a, b) => b.valor - a.valor);

  const vozPrincipal = vozesAprovadas[0].voz;
  const vozesSecundarias = vozesAprovadas.slice(1).map((item) => item.voz);

  function renderCartaoVoz(v: IntervencaoVoz, isPrincipal = false) {
    const Icone = ICONES_VOZES[v.atributo] || Scroll;
    const infoTema = tema.vozes[v.atributo];
    const nomeVoz = infoTema?.nome || v.atributo;
    const epiteto = infoTema?.epiteto || '';

    return (
      <div
        key={`${v.atributo}_${v.fala.slice(0, 15)}`}
        className={`p-4 rounded-xl border border-[var(--borda)] bg-[var(--pergaminho-2)] shadow-sm space-y-2 font-garamond ${
          isPrincipal ? 'border-l-4 border-l-[var(--ouro)]' : ''
        }`}
      >
        <div className="flex items-center justify-between text-xs font-sans">
          <div className="flex items-center gap-2 text-[var(--ouro)]">
            <Icone className="w-4 h-4 flex-shrink-0" />
            <span className="font-cinzel font-bold text-sm tracking-wide">{nomeVoz}</span>
            {epiteto && (
              <span className="text-[var(--tinta-suave)] text-xs italic hidden sm:inline">
                &bull; {epiteto}
              </span>
            )}
          </div>
          {v.dcPassiva && (
            <span className="text-[11px] text-[var(--tinta-fraca)]">
              Percepção Passiva (DC {v.dcPassiva})
            </span>
          )}
        </div>
        <p className="text-sm leading-relaxed text-[var(--tinta)] italic">
          &ldquo;{v.fala}&rdquo;
        </p>
      </div>
    );
  }

  return (
    <div className={`space-y-3 ${className}`}>
      {/* Voz Principal em Destaque */}
      {renderCartaoVoz(vozPrincipal, true)}

      {/* Vozes Secundárias Agrupadas em <details> */}
      {vozesSecundarias.length > 0 && (
        <details className="group border border-[var(--borda)] rounded-xl bg-[var(--pergaminho-1)] p-3 text-xs text-[var(--tinta-suave)]">
          <summary className="flex items-center justify-between font-cinzel font-semibold cursor-pointer select-none text-[var(--ouro)] hover:text-[var(--ouro-claro)]">
            <span>+{vozesSecundarias.length} outras vozes da vossa mente</span>
            <ChevronDown className="w-4 h-4 transition-transform group-open:rotate-180" />
          </summary>
          <div className="space-y-3 pt-3">
            {vozesSecundarias.map((v) => renderCartaoVoz(v, false))}
          </div>
        </details>
      )}

      {dicasPercepcao && vozesOcultadas > 0 && (
        <p className="text-[11px] text-[var(--tinta-fraca)] italic text-right font-sans">
          {vozesOcultadas} sussurro(s) permaneceram inaudíveis para os vossos atributos.
        </p>
      )}
    </div>
  );
};
