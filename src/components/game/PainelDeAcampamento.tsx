'use client';

import React, { useState } from 'react';
import {
  DIALOGOS_DE_ACAMPAMENTO,
  obterTopicosAcampamento,
  TopicoDialogoAcampamento,
  RespostaAcampamento,
  calcularNovoStatusAprovacao,
} from '@/server/data/camp/dialogosAcampamento';
import { Companheiro, StatusAprovacao } from '@/server/engine/rpgEngine';
import { useJogoStore } from '@/lib/store/jogoStore';
import { Flame, Moon, Sparkles, MessageSquare, Shield, CheckCircle2, ChevronRight } from 'lucide-react';
import { ListaCompanheirosAcampamento } from './camp/ListaCompanheirosAcampamento';

export interface PainelDeAcampamentoProps {
  companheiros?: Record<string, Companheiro>;
  flags?: Record<string, boolean | string | number>;
  onFechar?: () => void;
  className?: string;
}

export function PainelDeAcampamento({
  companheiros = {},
  flags = {},
  onFechar,
  className = '',
}: PainelDeAcampamentoProps) {
  const { ficha, worldState, adicionarAviso } = useJogoStore();
  const [companheiroSelecionadoId, setCompanheiroSelecionadoId] = useState<string | null>(null);
  const [topicoAtivo, setTopicoAtivo] = useState<TopicoDialogoAcampamento | null>(null);
  const [respostaEscolhida, setRespostaEscolhida] = useState<RespostaAcampamento | null>(null);
  const [topicosConcluidos, setTopicosConcluidos] = useState<Record<string, boolean>>({});

  const compsAtivos = Object.values(companheiros);
  const compSelecionado = companheiroSelecionadoId ? companheiros[companheiroSelecionadoId] : null;
  const dadosDialogo = companheiroSelecionadoId ? DIALOGOS_DE_ACAMPAMENTO[companheiroSelecionadoId] : null;
  const topicosDisponiveis = companheiroSelecionadoId
    ? obterTopicosAcampamento(companheiroSelecionadoId, flags)
    : [];

  const handleSelecionarCompanheiro = (id: string) => {
    setCompanheiroSelecionadoId(id);
    setTopicoAtivo(null);
    setRespostaEscolhida(null);
  };

  const handleSelecionarTopico = (topico: TopicoDialogoAcampamento) => {
    setTopicoAtivo(topico);
    setRespostaEscolhida(null);
  };

  const handleEscolherResposta = (resp: RespostaAcampamento) => {
    if (!companheiroSelecionadoId || !ficha || !worldState) return;

    setRespostaEscolhida(resp);
    if (topicoAtivo) {
      setTopicosConcluidos((prev) => ({ ...prev, [topicoAtivo.id]: true }));
    }

    // 1. Atualizar Aprovação do Companheiro na Ficha
    const compAtual = ficha.companheiros?.[companheiroSelecionadoId];
    if (compAtual) {
      const novaAprovacao = Math.min(100, Math.max(-50, compAtual.aprovacao + resp.deltaAprovacao));
      const novoStatus: StatusAprovacao = calcularNovoStatusAprovacao(novaAprovacao);
      compAtual.aprovacao = novaAprovacao;
      compAtual.status = novoStatus;
    }

    // 2. Bônus de Compostura e Inspiração
    if (resp.bonusCompostura && ficha.estado) {
      ficha.estado.compostura = Math.min(10, ficha.estado.compostura + resp.bonusCompostura);
    }
    if (resp.bonusInspiracao) {
      ficha.inspiracao = (ficha.inspiracao || 0) + resp.bonusInspiracao;
      adicionarAviso(`✨ Seu vínculo com ${compAtual?.nome || 'o companheiro'} concedeu +1 Ponto de Inspiração!`);
    }

    // 3. Flags narrativas
    if (resp.flagConcedida) {
      worldState.flagsBorboleta[resp.flagConcedida] = true;
    }
  };

  const handleDescansoFogueira = () => {
    if (ficha?.estado) {
      ficha.estado.compostura = Math.min(10, ficha.estado.compostura + 2);
      adicionarAviso('🔥 O calor das brasas e o descanso da vigília restauraram +2 Pontos de Compostura.');
    }
    if (onFechar) {
      onFechar();
    }
  };

  return (
    <div
      className={`bg-[var(--superficie,#1c1914)] border border-[var(--borda,#3d3222)] rounded-lg p-4 sm:p-6 text-[var(--tinta,#ede4ce)] font-garamond shadow-2xl relative overflow-hidden ${className}`}
    >
      {/* Luz Radial de Brasa */}
      <div className="absolute -top-16 -right-16 w-64 h-64 bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Cabeçalho do Acampamento */}
      <div className="flex flex-wrap items-center justify-between border-b border-[var(--borda,#3d3222)] pb-4 mb-4 gap-2">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-amber-950/40 border border-amber-600/50 flex items-center justify-center text-amber-500 shadow-[0_0_15px_rgba(217,119,6,0.3)] animate-pulse">
            <Flame className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-cinzel text-xl font-bold tracking-wide text-[var(--ouro-brilho,#dfbe76)]">
              Fogueira da Vigília
            </h3>
            <p className="text-xs text-[var(--tinta-fraca,#a89f8a)]">
              Diálogos íntimos de companheiros &bull; Restaure compostura e aprofunde alianças
            </p>
          </div>
        </div>

        <button
          onClick={handleDescansoFogueira}
          className="flex items-center gap-2 px-3 py-1.5 bg-amber-900/30 hover:bg-amber-900/50 border border-amber-700/60 rounded text-xs font-cinzel font-semibold text-amber-200 transition-all hover:scale-105"
        >
          <Moon className="w-4 h-4 text-amber-400" />
          <span>Descansar e Concluir Vigília (+2 Compostura)</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Coluna 1: Lista de Companheiros ao Redor da Fogueira */}
        <ListaCompanheirosAcampamento
          compsAtivos={compsAtivos}
          companheiroSelecionadoId={companheiroSelecionadoId}
          onSelecionarCompanheiro={handleSelecionarCompanheiro}
        />

        {/* Coluna 2 e 3: Área de Conversa e Decisões */}
        <div className="md:col-span-2 space-y-4">
          {!compSelecionado ? (
            <div className="h-64 flex flex-col items-center justify-center text-center p-6 border border-dashed border-[var(--borda,#3d3222)] rounded bg-black/10">
              <Flame className="w-12 h-12 text-amber-500/40 mb-2" />
              <p className="font-cinzel text-sm text-[var(--ouro,#c5a059)]">
                Selecione um companheiro ao lado da fogueira
              </p>
              <p className="text-xs text-[var(--tinta-fraca,#a89f8a)] mt-1 max-w-sm">
                Converse sobre a guerra, as velhas canções ou os medos da noite para estreitar laços e ganhar bônus táticos.
              </p>
            </div>
          ) : !topicoAtivo ? (
            <div className="space-y-4">
              <div className="p-4 rounded bg-black/20 border border-[var(--borda,#3d3222)]">
                <h4 className="font-cinzel text-base font-bold text-[var(--ouro-brilho,#dfbe76)]">
                  {compSelecionado.nome}
                </h4>
                <p className="text-xs text-[var(--tinta-fraca,#a89f8a)] italic mt-1">
                  {dadosDialogo?.citacao || compSelecionado.titulo}
                </p>
              </div>

              <div className="space-y-2">
                <span className="text-xs font-cinzel text-[var(--ouro,#c5a059)] uppercase tracking-wider block">
                  Escolha um assunto para conversar:
                </span>

                {topicosDisponiveis.length === 0 ? (
                  <p className="text-xs text-[var(--tinta-fraca,#a89f8a)] italic p-3 bg-black/10 rounded">
                    {compSelecionado.nome} permanece em silêncio compenetrado observando as cinzas da fogueira.
                  </p>
                ) : (
                  topicosDisponiveis.map((topico) => {
                    const concluido = topicosConcluidos[topico.id];

                    return (
                      <button
                        key={topico.id}
                        onClick={() => handleSelecionarTopico(topico)}
                        className={`w-full text-left p-3 rounded border transition-all flex items-center justify-between group ${
                          concluido
                            ? 'bg-black/10 border-[var(--borda,#3d3222)] opacity-70'
                            : 'bg-black/25 border-amber-900/40 hover:border-[var(--ouro,#c5a059)] hover:bg-amber-950/20'
                        }`}
                      >
                        <div className="space-y-1">
                          <span className="font-cinzel text-sm font-semibold text-[var(--tinta,#ede4ce)] group-hover:text-[var(--ouro-brilho,#dfbe76)]">
                            {topico.titulo}
                          </span>
                          <p className="text-xs text-[var(--tinta-fraca,#a89f8a)] line-clamp-1">
                            {topico.resumo}
                          </p>
                        </div>
                        {concluido ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-500/70" />
                        ) : (
                          <ChevronRight className="w-4 h-4 text-[var(--ouro,#c5a059)] group-hover:translate-x-1 transition-transform" />
                        )}
                      </button>
                    );
                  })
                )}
              </div>
            </div>
          ) : (
            /* Diálogo Ativo */
            <div className="space-y-4 animate-in fade-in duration-300">
              <div className="flex items-center justify-between border-b border-[var(--borda,#3d3222)] pb-2">
                <span className="text-xs font-cinzel text-[var(--ouro,#c5a059)] uppercase tracking-wide">
                  {topicoAtivo.titulo}
                </span>
                <button
                  onClick={() => {
                    setTopicoAtivo(null);
                    setRespostaEscolhida(null);
                  }}
                  className="text-xs text-[var(--tinta-fraca,#a89f8a)] hover:text-white underline"
                >
                  Voltar aos tópicos
                </button>
              </div>

              {/* Fala do Companheiro */}
              <div className="p-4 rounded bg-black/40 border-l-2 border-[var(--ouro,#c5a059)] text-sm sm:text-base leading-relaxed text-[var(--tinta,#ede4ce)] whitespace-pre-line italic">
                {topicoAtivo.falaInicial}
              </div>

              {/* Respostas do Jogador */}
              {!respostaEscolhida ? (
                <div className="space-y-2 pt-2">
                  <span className="text-xs font-cinzel text-[var(--ouro-brilho,#dfbe76)] uppercase block mb-1">
                    Como você respondeis:
                  </span>
                  {topicoAtivo.respostas.map((resp) => (
                    <button
                      key={resp.id}
                      onClick={() => handleEscolherResposta(resp)}
                      className="w-full text-left p-3 rounded bg-amber-950/20 hover:bg-amber-950/40 border border-[var(--borda,#3d3222)] hover:border-[var(--ouro,#c5a059)] text-sm transition-all text-[var(--tinta,#ede4ce)] hover:text-white"
                    >
                      {resp.texto}
                    </button>
                  ))}
                </div>
              ) : (
                /* Réplica Final */
                <div className="p-4 rounded bg-amber-950/30 border border-amber-600/40 space-y-3 animate-in fade-in">
                  <div className="text-xs font-cinzel text-amber-300 uppercase flex items-center gap-1.5 font-bold">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Reação de {compSelecionado.nome}:</span>
                  </div>
                  <p className="text-sm italic text-[var(--tinta,#ede4ce)]">
                    {respostaEscolhida.reacaoCompanheiro}
                  </p>
                  <div className="flex flex-wrap gap-2 pt-2 border-t border-amber-800/40 text-xs">
                    <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 font-cinzel font-semibold">
                      Aprovação {respostaEscolhida.deltaAprovacao >= 0 ? `+${respostaEscolhida.deltaAprovacao}` : respostaEscolhida.deltaAprovacao}
                    </span>
                    {respostaEscolhida.bonusInspiracao && (
                      <span className="px-2 py-0.5 rounded bg-amber-900/60 text-amber-200 font-cinzel font-semibold">
                        +1 Inspiração
                      </span>
                    )}
                    {respostaEscolhida.bonusCompostura && (
                      <span className="px-2 py-0.5 rounded bg-blue-950 text-blue-300 font-cinzel font-semibold">
                        +{respostaEscolhida.bonusCompostura} Compostura
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
