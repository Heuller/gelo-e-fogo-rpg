'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Crown,
  Volume2,
  VolumeX,
  Save,
  ArrowLeft,
  BookOpen,
  Settings,
  HelpCircle,
  Columns2,
  Cpu,
} from 'lucide-react';
import { audioManager } from '@/lib/audio/audioManager';
import { StatusSalvo, StatusMestre } from '@/lib/store/jogoStore';

export interface PropsTopBar {
  jornadaTitulo: string;
  atoTitulo: string;
  anoHistorico: string;
  localizacao: string;
  slotAtivo?: number;
  statusSalvamento?: StatusSalvo;
  statusMestre?: StatusMestre;
  modoIA?: boolean;
  onToggleModoIA?: () => void;
  onAbrirConfiguracoes?: () => void;
  onAbrirAjuda?: () => void;
  onToggleColunaFicha?: () => void;
  onToggleColunaMundo?: () => void;
  colunaFichaAberta?: boolean;
  colunaMundoAberta?: boolean;
}

export function TopBar({
  jornadaTitulo,
  atoTitulo,
  anoHistorico,
  localizacao,
  slotAtivo = 1,
  statusSalvamento = 'salvo',
  statusMestre = 'idle',
  modoIA = true,
  onToggleModoIA,
  onAbrirConfiguracoes,
  onAbrirAjuda,
  onToggleColunaFicha,
  onToggleColunaMundo,
  colunaFichaAberta = true,
  colunaMundoAberta = true,
}: PropsTopBar) {
  const [audioAtivo, setAudioAtivo] = useState(false);

  useEffect(() => {
    if (audioAtivo && localizacao) {
      audioManager.atualizarRegiao(localizacao);
    }
  }, [localizacao, audioAtivo]);

  function handleToggleAudio() {
    const novoEstado = audioManager.toggleAmbiente(localizacao);
    setAudioAtivo(novoEstado);
  }

  const rotuloSave: Record<StatusSalvo, { texto: string; cor: string }> = {
    salvo: { texto: 'Salvo', cor: 'text-emerald-400' },
    salvando: { texto: 'A guardar…', cor: 'text-[var(--ouro)]' },
    erro: { texto: 'Erro ao salvar', cor: 'text-red-400' },
  };

  const infoSave = rotuloSave[statusSalvamento] || rotuloSave.salvo;

  return (
    <header className="w-full bg-[var(--pergaminho-1)]/95 border-b border-[var(--borda)] px-3 sm:px-6 py-2.5 backdrop-blur-md sticky top-0 z-sticky text-[var(--tinta)] font-cinzel">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
        {/* Esquerda: Retorno e Título da Jornada */}
        <div className="flex items-center gap-3 min-w-0">
          <Link
            href="/painel"
            className="p-2 rounded-lg text-[var(--tinta-suave)] hover:text-[var(--ouro)] hover:bg-[var(--pergaminho-3)] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--ouro-claro)]"
            title="Retornar ao Painel"
            aria-label="Retornar ao Painel"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>

          <div className="flex items-center gap-2.5 min-w-0">
            <span className="p-1.5 rounded-lg bg-[var(--pergaminho-3)] border border-[var(--ouro-escuro)] text-[var(--ouro)] flex-shrink-0">
              <Crown className="w-4 h-4" />
            </span>
            <div className="min-w-0">
              <h1 className="text-xs uppercase tracking-widest text-[var(--ouro)] font-bold truncate">
                {jornadaTitulo}
              </h1>
              <p className="text-xs text-[var(--tinta-suave)] font-garamond italic truncate">
                {atoTitulo} &bull; {localizacao} ({anoHistorico})
              </p>
            </div>
          </div>
        </div>

        {/* Direita: Controles de Sessão */}
        <div className="flex items-center gap-1.5 sm:gap-2.5 text-xs font-sans">
          {/* Indicador e Alternador do Mestre IA */}
          <button
            type="button"
            onClick={onToggleModoIA}
            className={`px-2.5 py-1.5 rounded-lg border text-xs font-semibold flex items-center gap-1.5 transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--ouro-claro)] ${
              modoIA
                ? 'bg-[var(--pergaminho-3)] border-[var(--ouro)] text-[var(--ouro-claro)] shadow-sm'
                : 'bg-[var(--pergaminho-2)] border-[var(--borda)] text-[var(--tinta-suave)] hover:text-[var(--tinta)]'
            }`}
            title="Alternar entre Mestre IA e Crônica Pura"
            aria-label={`Mestre IA: ${modoIA ? (statusMestre === 'escrevendo' ? 'A escrever' : 'Ativo') : 'Crônica Pura'}`}
          >
            {modoIA ? (
              <>
                <Cpu className="w-3.5 h-3.5 text-[var(--ouro)] flex-shrink-0" />
                <span className="hidden md:inline">Mestre IA:</span>
                <span className="text-[var(--ouro)] font-bold">
                  {statusMestre === 'escrevendo' ? 'A escrever…' : 'Ativo'}
                </span>
              </>
            ) : (
              <>
                <BookOpen className="w-3.5 h-3.5 text-[var(--tinta-suave)] flex-shrink-0" />
                <span>Crônica Pura</span>
              </>
            )}
          </button>

          {/* Indicador de Salvamento Real */}
          <div
            className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[var(--pergaminho-2)] border border-[var(--borda)] text-[var(--tinta-suave)]"
            title={`Estado de salvamento do Slot ${slotAtivo}`}
          >
            <Save className="w-3.5 h-3.5 text-[var(--ouro)] flex-shrink-0" />
            <span className="text-xs">Slot {slotAtivo}:</span>
            <span className={`text-xs font-semibold ${infoSave.cor}`}>{infoSave.texto}</span>
          </div>

          {/* Alternadores de Colunas Laterais (Desktop >= 1024px) */}
          <div className="hidden lg:flex items-center gap-1 bg-[var(--pergaminho-2)] p-0.5 rounded-lg border border-[var(--borda)]">
            <button
              type="button"
              onClick={onToggleColunaFicha}
              className={`p-1.5 rounded text-xs transition-colors ${
                colunaFichaAberta
                  ? 'bg-[var(--pergaminho-3)] text-[var(--ouro)] font-bold'
                  : 'text-[var(--tinta-fraca)] hover:text-[var(--tinta)]'
              }`}
              title="Alternar Coluna da Ficha (tecla [)"
              aria-label="Alternar Coluna da Ficha"
            >
              <span className="font-mono text-xs px-1">[ Ficha</span>
            </button>
            <button
              type="button"
              onClick={onToggleColunaMundo}
              className={`p-1.5 rounded text-xs transition-colors ${
                colunaMundoAberta
                  ? 'bg-[var(--pergaminho-3)] text-[var(--ouro)] font-bold'
                  : 'text-[var(--tinta-fraca)] hover:text-[var(--tinta)]'
              }`}
              title="Alternar Coluna do Mundo (tecla ])"
              aria-label="Alternar Coluna do Mundo"
            >
              <span className="font-mono text-xs px-1">Mundo ]</span>
            </button>
          </div>

          {/* Botão de Áudio Sintético */}
          <button
            type="button"
            onClick={handleToggleAudio}
            className={`p-2 rounded-lg border transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--ouro-claro)] ${
              audioAtivo
                ? 'bg-[var(--ouro)]/15 border-[var(--ouro)] text-[var(--ouro-claro)]'
                : 'bg-[var(--pergaminho-2)] border-[var(--borda)] text-[var(--tinta-suave)] hover:text-[var(--tinta)]'
            }`}
            title={audioAtivo ? 'Silenciar ambiente' : 'Ouvir atmosfera sonora'}
            aria-label={audioAtivo ? 'Silenciar som ambiente' : 'Ativar som ambiente'}
          >
            {audioAtivo ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* Botão Configurações */}
          {onAbrirConfiguracoes && (
            <button
              type="button"
              onClick={onAbrirConfiguracoes}
              className="p-2 rounded-lg bg-[var(--pergaminho-2)] border border-[var(--borda)] text-[var(--tinta-suave)] hover:text-[var(--ouro)] hover:border-[var(--ouro)] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--ouro-claro)]"
              title="Configurações de Leitura e Jogo"
              aria-label="Configurações de Leitura e Jogo"
            >
              <Settings className="w-4 h-4" />
            </button>
          )}

          {/* Botão Atalhos */}
          {onAbrirAjuda && (
            <button
              type="button"
              onClick={onAbrirAjuda}
              className="p-2 rounded-lg bg-[var(--pergaminho-2)] border border-[var(--borda)] text-[var(--tinta-suave)] hover:text-[var(--ouro)] hover:border-[var(--ouro)] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--ouro-claro)]"
              title="Atalhos do Teclado (?)"
              aria-label="Atalhos do Teclado"
            >
              <HelpCircle className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
