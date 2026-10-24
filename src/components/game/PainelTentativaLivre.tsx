'use client';

import React, { useState, useEffect, useId } from 'react';
import {
  Sparkles,
  Dices,
  Eye,
  MessageSquare,
  ShieldAlert,
  Flame,
  ArrowRight,
  RotateCcw,
  AlertCircle,
  CheckCircle,
} from 'lucide-react';
import {
  calcularPreviaTentativaLivre,
  PreviaTentativaLivre,
} from '@/lib/engine-shared/tentativaLivreShared';
import type { RespostaTentativaLivre } from '@/server/engine/tentativaLivre';
import { NodeJornada } from '@/server/engine/storyLinter';
import { FichaPersonagem } from '@/server/engine/rpgEngine';
import { TurnEvent } from '@/server/saves';
import { audioManager } from '@/lib/audio/audioManager';

export interface PropsPainelTentativaLivre {
  node: NodeJornada;
  ficha: FichaPersonagem;
  historicoTurnos: TurnEvent[];
  carregando?: boolean;
  onConfirmarTentativa: (textoAcao: string) => Promise<RespostaTentativaLivre | null>;
  onCancelar?: () => void;
}

export function PainelTentativaLivre({
  node,
  ficha,
  historicoTurnos,
  carregando = false,
  onConfirmarTentativa,
  onCancelar,
}: PropsPainelTentativaLivre) {
  const [textoAcao, setTextoAcao] = useState('');
  const [previa, setPrevia] = useState<PreviaTentativaLivre | null>(null);
  const [ultimoResultado, setUltimoResultado] = useState<RespostaTentativaLivre | null>(null);
  const [executando, setExecutando] = useState(false);
  const anunciadorId = useId();

  // Atualiza prévia local determinística conforme o jogador digita
  useEffect(() => {
    if (!textoAcao.trim()) {
      setPrevia(null);
      return;
    }

    const calculada = calcularPreviaTentativaLivre({
      texto: textoAcao,
      node,
      ficha,
      turnHistory: historicoTurnos,
    });
    setPrevia(calculada);
  }, [textoAcao, node, ficha, historicoTurnos]);

  async function handleRolar() {
    if (!textoAcao.trim() || executando || (previa && previa.bloqueada)) return;

    try {
      setExecutando(true);
      audioManager.tocarSomDados();
      const res = await onConfirmarTentativa(textoAcao.trim());
      if (res) {
        setUltimoResultado(res);
        setTextoAcao('');
      }
    } finally {
      setExecutando(false);
    }
  }

  // Contagem de tentativas na cena atual
  const tentativasFeitas = historicoTurnos.filter(
    (ev) => ev.tipo === 'tentativa_livre' && ev.nodeId === node.id
  ).length;
  const tentativasRestantes = Math.max(0, 2 - tentativasFeitas);

  return (
    <div
      role="region"
      aria-label="Painel de Tentativa Livre"
      className="bg-[var(--pergaminho-2)] border border-[var(--borda)] rounded-2xl p-5 shadow-lg space-y-4 font-garamond"
    >
      {/* Cabeçalho */}
      <div className="flex items-center justify-between border-b border-[var(--borda)] pb-3">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-[var(--ouro)]" aria-hidden="true" />
          <h3 className="font-cinzel text-sm font-bold text-[var(--ouro-claro)] uppercase tracking-wider">
            Tentativa Livre — Mestre das Crônicas
          </h3>
        </div>
        <div
          className={`text-xs font-cinzel font-semibold px-2.5 py-1 rounded-full border ${
            tentativasRestantes > 0
              ? 'bg-[var(--pergaminho-3)] border-[var(--ouro)] text-[var(--ouro)]'
              : 'bg-red-950/40 border-red-800/60 text-red-300'
          }`}
          aria-live="polite"
        >
          Tentativas na cena: {tentativasRestantes}/2
        </div>
      </div>

      {/* Instruções */}
      <p className="text-xs text-[var(--tinta-suave)] leading-relaxed">
        Descreva sua iniciativa em suas próprias palavras. O motor autoritativo da Cidadela
        identificará sua intenção e calculará a probabilidade segundo seus atributos e a dureza da cena.
      </p>

      {/* Caixa de Texto */}
      <div className="space-y-1.5">
        <label htmlFor="input-acao-livre" className="block text-xs font-cinzel text-[var(--tinta)]">
          O que você faz?
        </label>
        <textarea
          id="input-acao-livre"
          rows={3}
          value={textoAcao}
          disabled={tentativasRestantes <= 0 || executando || carregando}
          onChange={(e) => setTextoAcao(e.target.value)}
          placeholder={
            tentativasRestantes > 0
              ? 'Ex.: Observar atentamente o relevo ao redor, ou persuadir o sentinela a abaixar a lança…'
              : 'Limite de 2 tentativas livres alcançado nesta cena.'
          }
          className="w-full bg-[var(--pergaminho-1)] border border-[var(--borda)] focus:border-[var(--ouro)] rounded-xl p-3 text-sm text-[var(--tinta)] placeholder-[var(--tinta-fraca)] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--ouro)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed resize-none"
        />
      </div>

      {/* Prévia Baldur's Gate 3 (Probabilidade & Atributo) */}
      {previa && (
        <div
          className="bg-[var(--pergaminho-3)] border border-[var(--ouro)]/40 rounded-xl p-3 space-y-2.5 entrada-fade"
          aria-live="polite"
        >
          <div className="flex items-center justify-between text-xs font-cinzel font-semibold">
            <span className="flex items-center gap-1.5 text-[var(--ouro-claro)]">
              <Eye className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Intenção: {previa.rotuloIntencao}</span>
            </span>
            <span className="text-[var(--tinta-suave)]">
              Atributo: <strong className="text-[var(--tinta)]">{previa.atributo.toUpperCase()} ({previa.valorAtributo})</strong>
            </span>
          </div>

          {/* Barra de Probabilidade */}
          <div className="space-y-1">
            <div className="flex justify-between text-xs text-[var(--tinta-suave)]">
              <span>Dificuldade: CD {previa.dc}</span>
              <span className="font-bold text-[var(--ouro)]">
                Chance Estimada: {previa.probabilidadeEstimada}%
              </span>
            </div>
            <div className="w-full h-2 bg-[var(--pergaminho-1)] rounded-full overflow-hidden border border-[var(--borda)]">
              <div
                className="h-full bg-gradient-to-r from-[var(--ouro)] to-[var(--ouro-claro)] transition-all duration-300"
                style={{ width: `${previa.probabilidadeEstimada}%` }}
                role="progressbar"
                aria-valuenow={previa.probabilidadeEstimada}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label={`Chance estimada de sucesso: ${previa.probabilidadeEstimada}%`}
              />
            </div>
          </div>

          <div className="text-[11px] text-[var(--tinta-fraca)] italic">
            {previa.explicacao}
          </div>

          {previa.bloqueada && (
            <div className="flex items-center gap-2 text-xs text-red-400 bg-red-950/30 p-2 rounded-lg border border-red-900/50">
              <ShieldAlert className="w-4 h-4 shrink-0" />
              <span>{previa.motivoBloqueio}</span>
            </div>
          )}
        </div>
      )}

      {/* Região Anunciadora de Acessibilidade */}
      <div id={anunciadorId} className="sr-only" aria-live="polite">
        {ultimoResultado ? `Resultado da tentativa: ${ultimoResultado.resultadoRolagem.resultado}. ${ultimoResultado.ecoNarrativo}` : ''}
      </div>

      {/* Exibição do Último Eco / Desfecho */}
      {ultimoResultado && (
        <div className="bg-[var(--pergaminho-1)] border border-[var(--ouro)] rounded-xl p-3.5 space-y-2 entrada-fade">
          <div className="flex items-center justify-between text-xs font-cinzel font-bold">
            <span className="flex items-center gap-1.5 text-[var(--ouro-claro)]">
              {ultimoResultado.resultadoRolagem.resultado.includes('SUCESSO') ||
              ultimoResultado.resultadoRolagem.resultado === 'CRITICO' ? (
                <CheckCircle className="w-4 h-4 text-emerald-400" />
              ) : (
                <AlertCircle className="w-4 h-4 text-amber-400" />
              )}
              {ultimoResultado.rotuloIntencao}: {ultimoResultado.resultadoRolagem.resultado}
            </span>
            <span className="text-[var(--tinta-suave)]">
              Rolagem: {ultimoResultado.resultadoRolagem.total} vs CD {ultimoResultado.resultadoRolagem.dc}
            </span>
          </div>

          <p className="text-xs text-[var(--tinta)] leading-relaxed italic">
            &ldquo;{ultimoResultado.ecoNarrativo}&rdquo;
          </p>

          {ultimoResultado.pistaDesbloqueada && (
            <div className="text-xs text-amber-300 font-cinzel flex items-center gap-1.5 pt-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Pista descoberta gravada na memória da crônica!</span>
            </div>
          )}

          {ultimoResultado.ganchoDesbloqueado && (
            <div className="text-xs text-emerald-300 font-cinzel flex items-center gap-1.5 pt-1">
              <Flame className="w-3.5 h-3.5" />
              <span>Caminho secreto desbloqueado nas opções da cena!</span>
            </div>
          )}
        </div>
      )}

      {/* Botões de Ação */}
      <div className="flex items-center justify-between pt-2">
        {onCancelar && (
          <button
            type="button"
            onClick={onCancelar}
            disabled={executando}
            className="px-3 py-1.5 text-xs font-cinzel text-[var(--tinta-suave)] hover:text-[var(--tinta)] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--ouro-claro)] rounded-lg"
          >
            Cancelar
          </button>
        )}

        <button
          type="button"
          onClick={handleRolar}
          disabled={!textoAcao.trim() || executando || carregando || (previa ? previa.bloqueada : false) || tentativasRestantes <= 0}
          className="ml-auto px-4 py-2 bg-[var(--pergaminho-3)] hover:bg-[var(--pergaminho-4)] border border-[var(--ouro)] text-[var(--ouro-claro)] text-xs font-cinzel font-bold rounded-xl transition-all shadow hover:shadow-md flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--ouro-claro)]"
        >
          <Dices className={`w-4 h-4 ${executando ? 'animate-spin' : ''}`} aria-hidden="true" />
          <span>{executando ? 'Testando Perícia…' : 'Rolar Tentativa Livre'}</span>
        </button>
      </div>
    </div>
  );
}
