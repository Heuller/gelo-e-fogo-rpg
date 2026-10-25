'use client';

import React from 'react';
import { EscolhaNode } from '@/server/engine/storyLinter';
import { AtributoVoz } from '@/server/engine/rpgEngine';
import { probabilidadeSucesso } from '@/lib/engine-shared/probabilidade';
import { Lock, Sparkles, AlertTriangle, ShieldAlert } from 'lucide-react';
import { Chip } from '@/components/ui/Chip';

const NOMES_ATRIBUTOS: Record<AtributoVoz, string> = {
  comando: 'Comando',
  furia: 'Fúria',
  astucia: 'Astúcia',
  cortesia: 'Cortesia',
  erudicao: 'Erudição',
  pressagio: 'Presságio',
};

export interface CartaoEscolhaProps {
  escolha: EscolhaNode;
  indice: number;
  valorAtributo?: number;
  desbloqueada: boolean;
  motivoBloqueio?: string;
  mostrarChance?: boolean;
  jaExplorada?: boolean;
  modoDeJogo?: 'cronica' | 'padrao' | 'juramento';
  onSelecionar: (escolhaId: string) => void;
  className?: string;
}

const ROTULOS_TOM: Record<string, string> = {
  diplomatico: '[Diplomático]',
  honesto: '[Honesto]',
  ameaca: '[Ameaça]',
  engano: '[Engano]',
  humor: '[Humor]',
  silencio: '[Silêncio]',
  devocao: '[Devoção]',
  violencia: '[Violência]',
};

export const CartaoEscolha: React.FC<CartaoEscolhaProps> = ({
  escolha,
  indice,
  valorAtributo = 3,
  desbloqueada,
  motivoBloqueio,
  mostrarChance = true,
  jaExplorada,
  modoDeJogo = 'padrao',
  onSelecionar,
  className = '',
}) => {
  const isTeste = escolha.tipo === 'teste_atributo';
  const temRiscoMortal = isTeste && !!escolha.riscoMortal;

  // Resolução de circunstâncias na prévia (Camada BG3 - B1)
  const circunstancias = isTeste
    ? (escolha as unknown as { circunstancias?: { tipo: 'vantagem' | 'desvantagem'; motivo: string }[] }).circunstancias || []
    : [];
  const temVantagem = circunstancias.some((c) => c.tipo === 'vantagem');
  const temDesvantagem = circunstancias.some((c) => c.tipo === 'desvantagem');
  const tipoCirc: 'vantagem' | 'desvantagem' | 'neutro' =
    temVantagem && temDesvantagem ? 'neutro' : temVantagem ? 'vantagem' : temDesvantagem ? 'desvantagem' : 'neutro';

  const prob = isTeste
    ? probabilidadeSucesso(valorAtributo, escolha.dc, {
        riscoMortal: escolha.riscoMortal,
        circunstancia: tipoCirc,
        modo: modoDeJogo,
      })
    : null;

  const nomeAtributo = isTeste ? NOMES_ATRIBUTOS[escolha.atributo] : null;

  const tomEscolhido = (escolha as unknown as { tom?: string }).tom;
  const permaneceEscolhido = (escolha as unknown as { permanece?: boolean }).permanece;
  const explorada = jaExplorada || Boolean((escolha as unknown as { jaExplorada?: boolean }).jaExplorada);

  if (!desbloqueada) {
    return (
      <div
        className={`w-full text-left p-4 rounded-xl border border-[var(--borda)] bg-[var(--pergaminho-1)] text-[var(--tinta-fraca)] space-y-2 cursor-not-allowed select-none ${className}`}
        aria-disabled="true"
      >
        <div className="flex items-start gap-3">
          <div className="p-1 rounded bg-black/40 text-[var(--tinta-fraca)] flex-shrink-0 mt-0.5">
            <Lock className="w-4 h-4" />
          </div>
          <div className="space-y-1 flex-1">
            <p className="text-sm font-garamond">{escolha.texto}</p>
            <p className="text-xs text-[var(--ouro-escuro)] italic font-sans flex items-center gap-1.5">
              <span>Falta:</span>
              <span>{motivoBloqueio || 'Requisitos não cumpridos na crônica.'}</span>
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => onSelecionar(escolha.id)}
      className={`w-full text-left p-4 rounded-xl border ${
        explorada
          ? 'border-[var(--borda)]/60 bg-[var(--pergaminho-1)]/80 text-[var(--tinta-suave)]'
          : 'border-[var(--borda)] bg-[var(--pergaminho-3)] hover:bg-[var(--pergaminho-4)] hover:border-[var(--ouro)] text-[var(--tinta)]'
      } transition-all shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--ouro-claro)] focus-visible:outline-offset-2 min-h-[48px] flex flex-col gap-2 group cursor-pointer ${className}`}
    >
      <div className="flex items-start gap-3 w-full">
        {/* Número de Atalho [1..4] */}
        <span
          className={`inline-flex items-center justify-center w-6 h-6 rounded bg-[var(--pergaminho-1)] border ${
            explorada
              ? 'border-[var(--borda)]/50 text-[var(--tinta-fraca)]'
              : 'border-[var(--borda)] text-[var(--ouro)]'
          } font-cinzel font-bold text-xs flex-shrink-0 group-hover:border-[var(--ouro-claro)] mt-0.5`}
        >
          {indice + 1}
        </span>

        {/* Texto da Escolha */}
        <p
          className={`text-sm font-garamond font-medium leading-relaxed flex-1 ${
            explorada ? 'text-[var(--tinta-suave)]' : 'group-hover:text-[var(--ouro-claro)]'
          } transition-colors`}
        >
          {escolha.texto}
        </p>
      </div>

      {/* Badges e Chips Informativos */}
      <div className="flex flex-wrap items-center gap-2 pl-9">
        {/* Marca explícita de tópico já explorado (nunca só cor) */}
        {explorada && (
          <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-cinzel font-bold bg-black/40 text-[var(--tinta-fraca)] border border-[var(--borda)]/60">
            ✓ falado
          </span>
        )}

        {/* Tom de Voz Narrativo / RPG */}
        {tomEscolhido && ROTULOS_TOM[tomEscolhido] && (
          <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-cinzel font-bold text-[var(--ouro)] bg-[var(--pergaminho-2)] border border-[var(--ouro-escuro)]/50">
            {ROTULOS_TOM[tomEscolhido]}
          </span>
        )}

        {isTeste && nomeAtributo && (
          <Chip variante="atributo">
            <span>+{valorAtributo} {nomeAtributo}</span>
            <span>&bull;</span>
            <span>DC {escolha.dc}{modoDeJogo === 'cronica' ? ' (-2 Crônica)' : ''}</span>
            {mostrarChance && prob && (
              <>
                <span>&bull;</span>
                <span className="font-mono font-bold text-[var(--ouro)]">
                  {prob.rotuloRisco} ({prob.porcentagemTexto})
                </span>
              </>
            )}
          </Chip>
        )}

        {/* Circunstâncias de Vantagem / Desvantagem (Camada BG3 - B1 e B2) */}
        {circunstancias.map((c, i) => (
          <Chip
            key={i}
            variante={c.tipo === 'vantagem' ? 'sucesso' : 'perigo'}
            className="text-[11px]"
          >
            <span>
              [{c.tipo === 'vantagem' ? 'Vantagem' : 'Desvantagem'}: {c.motivo}]
            </span>
          </Chip>
        ))}

        {temRiscoMortal && (
          <Chip variante="perigo">
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>[RISCO MORTAL]</span>
          </Chip>
        )}

        {escolha.tagOrigem && (
          <Chip variante="origem">
            <span>[ORIGEM: {escolha.tagOrigem.replace(/[[\]]/g, '')}]</span>
          </Chip>
        )}

        {escolha.aprovacaoCompanheiros && (
          <div className="flex items-center gap-1.5 text-xs text-[var(--tinta-suave)]">
            {Object.entries(escolha.aprovacaoCompanheiros).map(([comp, val]) => (
              <span key={comp} className="italic text-xs">
                [{comp} {val > 0 ? `+${val}` : val}]
              </span>
            ))}
          </div>
        )}
      </div>
    </button>
  );
};
