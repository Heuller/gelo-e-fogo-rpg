'use client';

import React, { useState } from 'react';
import { CenaTexto, type FalaItem } from './CenaTexto';
import { EcoDasEscolhas, ConditionalParagraphItem } from './EcoDasEscolhas';
import { VozesInternasV2, type IntervencaoVoz } from './VozesInternasV2';
import { CartaoEscolha } from './CartaoEscolha';
import { EscolhaNode } from '@/server/engine/storyLinter';
import { AtributoVoz, FichaPersonagem, WorldState } from '@/server/engine/rpgEngine';
import { VerbeteGlossario } from '@/server/data/lore';
import { audioManager } from '@/lib/audio/audioManager';
import { validarEscolhaDesbloqueada } from '@/lib/engine-shared/validacao';
import { PreferenciasLeitura, PREFERENCIAS_PADRAO } from './PainelDeConfiguracoes';
import { StatusMestre } from '@/lib/store/jogoStore';
import { Send, ChevronDown, ChevronUp, Feather, Sparkles } from 'lucide-react';
import { NodeJornada } from '@/server/engine/storyLinter';
import type { TurnEvent } from '@/server/saves';
import { PainelTentativaLivre } from './PainelTentativaLivre';
import type { RespostaTentativaLivre } from '@/server/engine/tentativaLivre';

export interface PropsNarrativeScroll {
  nodeId?: string;
  atoTitulo: string;
  anoHistorico: string;
  localizacao: string;
  paragrafos: string[];
  ponte?: string;
  marcasRecebidas?: string[];
  falas?: FalaItem[];
  tipo?: 'narracao' | 'dialogo' | 'hub' | 'peca_de_cenario' | 'acerto_de_contas';
  conditionalParagraphs?: ConditionalParagraphItem[];
  worldFlags?: string[];
  worldState?: WorldState;
  ficha?: FichaPersonagem;
  vozesInternas?: IntervencaoVoz[];
  escolhas: EscolhaNode[];
  verbetes?: VerbeteGlossario[];
  textoMestre?: string | null;
  statusMestre?: StatusMestre;
  modoIA?: boolean;
  temaId?: string;
  preferencias?: PreferenciasLeitura;
  headingRef?: React.RefObject<HTMLHeadingElement | null>;
  onEscolha: (escolhaId: string) => void;
  onAcaoLivre?: (acaoTexto: string) => void;
  nodeCompleto?: NodeJornada;
  historicoTurnos?: TurnEvent[];
  onTentativaLivre?: (textoAcao: string) => Promise<RespostaTentativaLivre | null>;
}

export function NarrativeScroll({
  nodeId,
  atoTitulo,
  anoHistorico,
  localizacao,
  paragrafos,
  ponte,
  marcasRecebidas,
  falas,
  tipo,
  conditionalParagraphs = [],
  worldFlags = [],
  worldState,
  ficha,
  vozesInternas = [],
  escolhas,
  verbetes = [],
  textoMestre,
  statusMestre = 'idle',
  modoIA = true,
  temaId = 'conquista_aegon',
  preferencias = PREFERENCIAS_PADRAO,
  headingRef,
  onEscolha,
  onAcaoLivre,
  nodeCompleto,
  historicoTurnos = [],
  onTentativaLivre,
}: PropsNarrativeScroll) {
  const [acaoLivreAberta, setAcaoLivreAberta] = useState(false);
  const [textoAcaoLivre, setTextoAcaoLivre] = useState('');

  // Fallback seguro para worldState e ficha caso não fornecidos
  const wsReal: WorldState = worldState || {
    reputacaoCasas: {},
    flagsBorboleta: Object.fromEntries(worldFlags.map((f) => [f, true])),
    marcosConcluidos: [],
  };

  const fichaReal: FichaPersonagem = ficha || {
    id: 'desconhecido',
    nome: 'Senhor Desconhecido',
    origem: 'nobreza_westerosi',
    inspiracao: 2,
    atributos: {
      comando: 3,
      furia: 3,
      astucia: 3,
      cortesia: 3,
      erudicao: 3,
      pressagio: 3,
    },
    estado: { sangue: 10, compostura: 10, honra: 5 },
    cicatrizes: [],
    segredos: [],
    companheiros: {},
  };

  function handleEnviarAcaoLivre(e: React.FormEvent) {
    e.preventDefault();
    if (!textoAcaoLivre.trim()) return;
    audioManager.tocarSomEscolha();
    if (onAcaoLivre) {
      onAcaoLivre(textoAcaoLivre.trim());
      setTextoAcaoLivre('');
      setAcaoLivreAberta(false);
    }
  }

  function handleSelecionarEscolha(escolha: EscolhaNode) {
    if (escolha.tipo === 'teste_atributo') {
      audioManager.tocarSomDados();
    } else {
      audioManager.tocarSomEscolha();
    }
    onEscolha(escolha.id);
  }

  return (
    <article className="w-full max-w-[66ch] mx-auto bg-[var(--pergaminho-2)] border-2 border-[var(--borda)] rounded-2xl shadow-2xl shadow-black/90 p-5 sm:p-9 text-[var(--tinta)] relative overflow-hidden font-garamond entrada-fade">
      {/* Moldura Decorativa Superior */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-transparent via-[var(--ouro)] to-transparent opacity-80" />

      {/* 1. Texto Principal da Cena (com Mestre IA, capitular fluida e foco acessível) */}
      <CenaTexto
        nodeId={nodeId}
        atoTitulo={atoTitulo}
        anoHistorico={anoHistorico}
        localizacao={localizacao}
        paragrafos={paragrafos}
        ponte={ponte}
        marcasRecebidas={marcasRecebidas}
        falas={falas}
        tipo={tipo}
        textoMestre={textoMestre}
        statusMestre={statusMestre}
        modoIA={modoIA}
        verbetes={verbetes}
        preferencias={preferencias}
        headingRef={headingRef}
      />

      {/* 2. Ecos das Escolhas Condicionais */}
      <EcoDasEscolhas
        conditionalParagraphs={conditionalParagraphs}
        worldFlags={worldFlags}
        verbetes={verbetes}
      />

      {/* 3. Intervenções das Vozes Internas (com teste passivo real e relevância) */}
      {vozesInternas.length > 0 && (
        <div className="my-6">
          <VozesInternasV2
            intervencoes={vozesInternas}
            atributos={fichaReal.atributos}
            temaId={temaId}
            dicasPercepcao={preferencias.dicasPercepcao}
          />
        </div>
      )}

      {/* 4. Divisor de Decisão */}
      {escolhas.length > 0 && (
        <div className="my-8 pt-6 border-t border-[var(--borda)] text-center relative">
          <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[var(--pergaminho-2)] px-4 text-xs font-cinzel uppercase tracking-widest text-[var(--ouro)] font-semibold border border-[var(--borda)] rounded-full">
            Qual é o seu desígnio?
          </span>
        </div>
      )}

      {/* 5. Área de Escolhas Disponíveis */}
      <div className="space-y-3">
        {(() => {
          // Garante que escolhas de saída fiquem sempre no fim do hub
          const ordenadas = [...escolhas].sort((a, b) => {
            const aPerm = Boolean((a as { permanece?: boolean }).permanece);
            const bPerm = Boolean((b as { permanece?: boolean }).permanece);
            if (aPerm && !bPerm) return -1;
            if (!aPerm && bPerm) return 1;
            return 0;
          });

          return ordenadas.map((escolha, idx) => {
            const validacao = validarEscolhaDesbloqueada(escolha, wsReal, fichaReal);
            const valorAtr =
              escolha.tipo === 'teste_atributo'
                ? fichaReal.atributos[escolha.atributo] ?? 3
                : 3;
            const flagJaExplorada = `escolha_feita_${escolha.id}`;
            const jaExplorada = Boolean(wsReal.flagsBorboleta?.[flagJaExplorada]);

            return (
              <CartaoEscolha
                key={escolha.id}
                escolha={escolha}
                indice={idx}
                valorAtributo={valorAtr}
                desbloqueada={validacao.desbloqueada}
                motivoBloqueio={validacao.motivo}
                jaExplorada={jaExplorada}
                mostrarChance={preferencias.mostrarChanceSucesso}
                onSelecionar={() => handleSelecionarEscolha(escolha)}
              />
            );
          });
        })()}
      </div>

      {/* 6. Ação Livre / Tentativa Livre BG3 */}
      {(onTentativaLivre || onAcaoLivre) && modoIA && (
        <div className="mt-8 pt-6 border-t border-[var(--borda)] space-y-3">
          <button
            type="button"
            onClick={() => setAcaoLivreAberta(!acaoLivreAberta)}
            className="w-full flex items-center justify-between text-xs font-cinzel font-semibold text-[var(--tinta-suave)] hover:text-[var(--ouro)] p-2 rounded-lg hover:bg-[var(--pergaminho-3)] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--ouro-claro)]"
          >
            <span className="flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-[var(--ouro)]" />
              <span>Deseja tentar uma ação inédita com prévia de perícia?</span>
            </span>
            {acaoLivreAberta ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>

          {acaoLivreAberta && (
            onTentativaLivre && nodeCompleto ? (
              <PainelTentativaLivre
                node={nodeCompleto}
                ficha={fichaReal}
                historicoTurnos={historicoTurnos}
                onConfirmarTentativa={onTentativaLivre}
                onCancelar={() => setAcaoLivreAberta(false)}
              />
            ) : (
              <form onSubmit={handleEnviarAcaoLivre} className="space-y-3 pt-2 entrada-fade">
                <textarea
                  value={textoAcaoLivre}
                  onChange={(e) => setTextoAcaoLivre(e.target.value)}
                  placeholder="Descrevei em palavras sua intenção, e o Mestre julgará seus atributos…"
                  rows={3}
                  className="w-full bg-[var(--pergaminho-1)] border border-[var(--borda)] focus:border-[var(--ouro)] rounded-xl p-3 text-sm font-garamond text-[var(--tinta)] placeholder-[var(--tinta-fraca)] focus-visible:outline-none transition-colors resize-none"
                />
                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={!textoAcaoLivre.trim()}
                    className="px-4 py-2 bg-[var(--pergaminho-3)] hover:bg-[var(--pergaminho-4)] border border-[var(--ouro)] text-[var(--ouro-claro)] text-xs font-cinzel font-bold rounded-lg transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--ouro-claro)]"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Submeter ao Mestre</span>
                  </button>
                </div>
              </form>
            )
          )}
        </div>
      )}
    </article>
  );
}
