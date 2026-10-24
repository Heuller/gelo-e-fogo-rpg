'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import {
  getCatalogoJornadasAction,
  listarSlotsAction,
  criarNovoJogoAction,
  desfazerTurnoSlotAction,
  exportarSaveAction,
  importarSaveAction,
} from '@/app/actions/slotActions';
import type { SaveSlot } from '@/server/saves';
import { CatalogoJornadaPublico } from '@/server/journeys/registry';
import { createClient } from '@/lib/supabase/client';
import { FichaPersonagem } from '@/server/engine/rpgEngine';
import { ModalCriacaoPersonagem } from '@/components/game/ModalCriacaoPersonagem';
import { CartaoSlotSave } from '@/components/game/painel/CartaoSlotSave';
import { Dialogo } from '@/components/ui/Dialogo';
import { Botao } from '@/components/ui/Botao';
import { Brasao } from '@/components/ui/Brasao';
import {
  Play,
  RotateCcw,
  Download,
  Upload,
  BookOpen,
  Crown,
  LogOut,
  Trash2,
  Plus,
  ArrowRight,
  Shield,
  Clock,
  User,
} from 'lucide-react';

export default function PainelPage() {
  const router = useRouter();
  const [catalogo, setCatalogo] = useState<CatalogoJornadaPublico[]>([]);
  const [jornadaSelecionada, setJornadaSelecionada] = useState<string>('conquista_aegon');
  const [slots, setSlots] = useState<(SaveSlot | null)[]>([null, null, null]);
  const [carregando, setCarregando] = useState(true);
  const [feedback, setFeedback] = useState<string | null>(null);

  // Modais
  const [modalNovoJogoAberto, setModalNovoJogoAberto] = useState(false);
  const [slotNovoJogo, setSlotNovoJogo] = useState<number | null>(null);
  const [slotParaExcluir, setSlotParaExcluir] = useState<number | null>(null);

  // Carregar catálogo de jornadas
  useEffect(() => {
    getCatalogoJornadasAction().then((lista) => {
      setCatalogo(lista);
      if (lista.length > 0 && !lista.some((j) => j.id === jornadaSelecionada)) {
        setJornadaSelecionada(lista[0].id);
      }
    });
  }, [jornadaSelecionada]);

  // Carregar slots da jornada selecionada
  const carregarSlots = useCallback(async () => {
    setCarregando(true);
    try {
      const slotsCarregados = await listarSlotsAction(jornadaSelecionada);
      setSlots(slotsCarregados);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      setFeedback('Erro ao carregar slots: ' + msg);
    } finally {
      setCarregando(false);
    }
  }, [jornadaSelecionada]);

  useEffect(() => {
    carregarSlots();
  }, [carregarSlots]);

  const jornadaAtual = catalogo.find((j) => j.id === jornadaSelecionada) || catalogo[0];

  function abrirModalNovoJogo(slotNum: number) {
    setSlotNovoJogo(slotNum);
    setModalNovoJogoAberto(true);
  }

  async function handleConfirmarCriacao(fichaCriada: FichaPersonagem) {
    if (!slotNovoJogo || !jornadaAtual) return;

    try {
      setFeedback('Criando novo registro na Cidadela…');
      const startNode = jornadaAtual.startNodeId || 'inicio';
      await criarNovoJogoAction({
        jornadaId: jornadaSelecionada,
        slotNumber: slotNovoJogo,
        characterSheet: fichaCriada,
        currentNodeId: startNode,
        capituloTitulo: `${jornadaAtual.titulo} — Início`,
        dataFiccao: jornadaAtual.periodo,
      });

      setModalNovoJogoAberto(false);
      router.push(`/jogar?journey=${jornadaSelecionada}&slot=${slotNovoJogo}`);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      setFeedback('Falha ao criar crônica: ' + msg);
    }
  }

  async function handleExcluirSlotConfirmado() {
    if (!slotParaExcluir) return;
    try {
      setFeedback(`Slot ${slotParaExcluir} limpo com sucesso.`);
      setSlotParaExcluir(null);
      await carregarSlots();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      setFeedback('Erro ao limpar slot: ' + msg);
    }
  }

  async function handleDesfazer(slotNum: number) {
    try {
      setFeedback(`Desfazendo último turno do Slot ${slotNum}...`);
      await desfazerTurnoSlotAction(jornadaSelecionada, slotNum);
      await carregarSlots();
      setFeedback('Turno desfeito com sucesso.');
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      setFeedback('Erro ao desfazer turno: ' + msg);
    }
  }

  async function handleExportar(slotNum: number) {
    try {
      const json = await exportarSaveAction(jornadaSelecionada, slotNum);
      const blob = new Blob([json], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `save_${jornadaSelecionada}_slot_${slotNum}_${Date.now()}.json`;
      a.click();
      URL.revokeObjectURL(url);
      setFeedback('Save exportado com sucesso em .json!');
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      setFeedback('Erro ao exportar save: ' + msg);
    }
  }

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push('/login');
  }

  return (
    <main className="min-h-screen bg-[var(--pagina)] text-[var(--tinta)] font-garamond p-4 sm:p-8 relative">
      <div className="max-w-6xl mx-auto space-y-8 entrada-fade">
        {/* Cabeçalho da Fortaleza */}
        <header className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-6 border-b border-[var(--borda)]">
          <div className="flex items-center gap-3.5">
            <Brasao tamanho={52} />
            <div>
              <h1 className="text-xl sm:text-2xl font-cinzel font-bold text-[var(--ouro-claro)] uppercase tracking-wider">
                A Fortaleza das Crônicas
              </h1>
              <p className="text-xs text-[var(--tinta-suave)] font-sans italic">
                Câmara dos Registros Históricos e Pergaminhos de Westeros
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleLogout}
              className="px-4 py-2 rounded-xl bg-[var(--pergaminho-2)] hover:bg-[var(--pergaminho-3)] border border-[var(--borda)] hover:border-[var(--ouro-escuro)] text-[var(--tinta-suave)] hover:text-[var(--ouro)] text-xs font-cinzel font-bold uppercase tracking-wider transition-colors flex items-center gap-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--ouro-claro)]"
            >
              <LogOut className="w-4 h-4" />
              <span>Sair da Sessão</span>
            </button>
          </div>
        </header>

        {feedback && (
          <div className="p-3.5 rounded-xl bg-[var(--pergaminho-2)] border border-[var(--ouro)]/60 text-xs font-sans text-[var(--ouro-claro)] flex items-center justify-between">
            <span>{feedback}</span>
            <button
              onClick={() => setFeedback(null)}
              className="text-[var(--ouro)] underline text-xs ml-4"
            >
              Dispensar
            </button>
          </div>
        )}

        {/* 1. Seletor das Grandes Eras / Jornadas */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-cinzel font-bold uppercase tracking-widest text-[var(--ouro)]">
              Selecione a Grande Era
            </h2>
            <span className="text-xs text-[var(--tinta-fraca)] font-mono">
              {catalogo.length} eras disponíveis
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {catalogo.map((j) => {
              const selecionada = j.id === jornadaSelecionada;

              return (
                <button
                  key={j.id}
                  type="button"
                  onClick={() => setJornadaSelecionada(j.id)}
                  className={`p-5 rounded-2xl text-left border-2 transition-all cursor-pointer flex flex-col justify-between gap-4 ${
                    selecionada
                      ? 'bg-[var(--pergaminho-3)] border-[var(--ouro)] shadow-xl shadow-black/80'
                      : 'bg-[var(--pergaminho-1)] border-[var(--borda)] hover:border-[var(--ouro-escuro)] opacity-85 hover:opacity-100'
                  }`}
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-cinzel font-bold text-[var(--ouro)]">
                        Jornada {j.numero}
                      </span>
                      <span className="text-xs font-mono text-[var(--tinta-fraca)]">
                        {j.periodo}
                      </span>
                    </div>

                    <h3 className="text-lg font-cinzel font-bold text-[var(--tinta)]">
                      {j.titulo}
                    </h3>

                    <p className="text-xs text-[var(--tinta-suave)] font-garamond italic line-clamp-3">
                      {j.descricao}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[var(--borda)] flex items-center justify-between text-xs font-sans">
                    <span className="text-[var(--tinta-fraca)]">
                      Protagonista: {j.protagonista.nome}
                    </span>
                    {selecionada && (
                      <span className="text-[var(--ouro)] font-bold flex items-center gap-1">
                        <span>Ativa</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        {/* 2. Os Três Slots de Gravação da Jornada Selecionada */}
        <section className="space-y-4 pt-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm font-cinzel font-bold uppercase tracking-widest text-[var(--ouro)]">
                Pergaminhos de Destino &bull; {jornadaAtual?.titulo}
              </h2>
              <p className="text-xs text-[var(--tinta-suave)] font-sans italic">
                3 posições sagradas de salvamento persistente
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[1, 2, 3].map((slotNum) => {
              const slot = slots.find((s) => s && s.slotNumber === slotNum);
              return (
                <CartaoSlotSave
                  key={slotNum}
                  slotNum={slotNum}
                  slot={slot}
                  onJogar={(num) => router.push(`/jogar?journey=${jornadaSelecionada}&slot=${num}`)}
                  onNovoJogo={(num) => abrirModalNovoJogo(num)}
                  onDesfazer={(num) => handleDesfazer(num)}
                  onExportar={(num) => handleExportar(num)}
                  onSolicitarExcluir={(num) => setSlotParaExcluir(num)}
                />
              );
            })}
          </div>
        </section>

        {/* Modal de Criação e Escolha de Ficha (22 pontos) */}
        {jornadaAtual && (
          <ModalCriacaoPersonagem
            aberto={modalNovoJogoAberto}
            onFechar={() => setModalNovoJogoAberto(false)}
            onConfirmar={handleConfirmarCriacao}
            protagonistaPadrao={jornadaAtual.protagonista}
          />
        )}

        {/* Modal de Confirmação de Exclusão */}
        <Dialogo
          aberto={slotParaExcluir !== null}
          onFechar={() => setSlotParaExcluir(null)}
          titulo="Confirmar Limpeza de Registro"
        >
          <div className="space-y-4 text-xs font-sans text-[var(--tinta)]">
            <p className="text-sm font-garamond leading-relaxed">
              Deseja realmente romper e apagar os registros do <strong>Slot {slotParaExcluir}</strong>? Todo o progresso deste personagem será perdido irreversivelmente.
            </p>
            <div className="flex items-center justify-end gap-3 pt-3 border-t border-[var(--borda)]">
              <Botao variante="fantasma" onClick={() => setSlotParaExcluir(null)}>
                Preservar Registro
              </Botao>
              <Botao variante="perigo" onClick={handleExcluirSlotConfirmado}>
                Apagar Registro
              </Botao>
            </div>
          </div>
        </Dialogo>
      </div>
    </main>
  );
}
