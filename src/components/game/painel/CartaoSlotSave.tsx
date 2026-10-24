'use client';

import React from 'react';
import type { SaveSlot } from '@/server/saves';
import { Botao } from '@/components/ui/Botao';
import {
  Play,
  RotateCcw,
  Download,
  Trash2,
  Plus,
  Clock,
} from 'lucide-react';

export interface CartaoSlotSaveProps {
  slotNum: number;
  slot?: SaveSlot | null;
  onJogar: (slotNum: number) => void;
  onNovoJogo: (slotNum: number) => void;
  onDesfazer: (slotNum: number) => void;
  onExportar: (slotNum: number) => void;
  onSolicitarExcluir: (slotNum: number) => void;
}

export function CartaoSlotSave({
  slotNum,
  slot,
  onJogar,
  onNovoJogo,
  onDesfazer,
  onExportar,
  onSolicitarExcluir,
}: CartaoSlotSaveProps) {
  if (slot && slot.characterSheet) {
    const ficha = slot.characterSheet;
    const dataFormatada = slot.updatedAt
      ? new Date(slot.updatedAt).toLocaleDateString('pt-BR', {
          day: '2-digit',
          month: 'short',
          hour: '2-digit',
          minute: '2-digit',
        })
      : 'Recentemente';

    return (
      <div className="p-5 rounded-2xl bg-[var(--pergaminho-2)] border-2 border-[var(--borda)] hover:border-[var(--ouro-escuro)] transition-all flex flex-col justify-between gap-5 shadow-lg relative overflow-hidden">
        <div className="space-y-3">
          <div className="flex items-center justify-between border-b border-[var(--borda)] pb-2.5">
            <span className="text-xs font-cinzel font-bold text-[var(--ouro)] uppercase tracking-wider">
              Slot {slotNum}
            </span>
            <span className="text-xs text-[var(--tinta-fraca)] font-mono flex items-center gap-1">
              <Clock className="w-3 h-3" />
              <span>{dataFormatada}</span>
            </span>
          </div>

          <div>
            <h3 className="text-base font-cinzel font-bold text-[var(--tinta)]">
              {ficha.nome}
            </h3>
            <p className="text-xs text-[var(--tinta-suave)] font-sans">
              Origem: {ficha.origem} &bull; Turno {slot.turnHistory?.length || 1}
            </p>
            <p className="text-xs text-[var(--ouro-escuro)] font-garamond italic mt-1">
              Capítulo: {slot.chapterCheckpoint?.capituloTitulo || 'Em andamento'}
            </p>
          </div>

          {/* Mini Indicadores de Atributos */}
          <div className="grid grid-cols-3 gap-1 pt-1 text-xs">
            <div className="p-1 rounded bg-[var(--pergaminho-1)] border border-[var(--borda)] text-center">
              <span className="text-[var(--tinta-fraca)] block text-[13px]">Sangue</span>
              <span className="font-mono font-bold text-red-400">
                {ficha.estado.sangue}
              </span>
            </div>
            <div className="p-1 rounded bg-[var(--pergaminho-1)] border border-[var(--borda)] text-center">
              <span className="text-[var(--tinta-fraca)] block text-[13px]">Compostura</span>
              <span className="font-mono font-bold text-sky-400">
                {ficha.estado.compostura}
              </span>
            </div>
            <div className="p-1 rounded bg-[var(--pergaminho-1)] border border-[var(--borda)] text-center">
              <span className="text-[var(--tinta-fraca)] block text-[13px]">Honra</span>
              <span className="font-mono font-bold text-amber-400">
                {ficha.estado.honra > 0 ? `+${ficha.estado.honra}` : ficha.estado.honra}
              </span>
            </div>
          </div>
        </div>

        {/* Botões de Ação do Slot */}
        <div className="space-y-2 pt-2 border-t border-[var(--borda)]">
          <Botao
            variante="primario"
            tamanho="md"
            className="w-full justify-center"
            onClick={() => onJogar(slotNum)}
          >
            <Play className="w-4 h-4 fill-current mr-2" />
            <span>Continuar Crônica</span>
          </Botao>

          <div className="grid grid-cols-3 gap-1.5">
            <button
              onClick={() => onDesfazer(slotNum)}
              title="Desfazer Último Turno"
              className="p-2 rounded bg-[var(--pergaminho-1)] border border-[var(--borda)] hover:border-[var(--ouro)] text-xs text-[var(--tinta-suave)] hover:text-[var(--ouro)] flex items-center justify-center transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => onExportar(slotNum)}
              title="Exportar Save (.json)"
              className="p-2 rounded bg-[var(--pergaminho-1)] border border-[var(--borda)] hover:border-[var(--ouro)] text-xs text-[var(--tinta-suave)] hover:text-[var(--ouro)] flex items-center justify-center transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => onSolicitarExcluir(slotNum)}
              title="Apagar Registro"
              className="p-2 rounded bg-[var(--pergaminho-1)] border border-[var(--borda)] hover:border-red-600 text-xs text-[var(--tinta-fraca)] hover:text-red-400 flex items-center justify-center transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Slot Vazio
  return (
    <div className="p-8 rounded-2xl bg-[var(--pergaminho-1)]/50 border-2 border-dashed border-[var(--borda)] hover:border-[var(--ouro)] transition-all flex flex-col items-center justify-center gap-4 text-center group min-h-[260px]">
      <div className="w-12 h-12 rounded-full bg-[var(--pergaminho-2)] border border-[var(--borda)] group-hover:border-[var(--ouro)] flex items-center justify-center text-[var(--tinta-fraca)] group-hover:text-[var(--ouro)] transition-colors">
        <Plus className="w-6 h-6" />
      </div>
      <div>
        <h3 className="font-cinzel font-bold text-sm text-[var(--tinta-suave)] uppercase tracking-wider">
          Slot {slotNum} Vazio
        </h3>
        <p className="text-xs text-[var(--tinta-fraca)] font-garamond italic mt-0.5">
          Pronto para gravar um novo destino
        </p>
      </div>
      <Botao
        variante="secundario"
        tamanho="sm"
        onClick={() => onNovoJogo(slotNum)}
      >
        Novo Jogo
      </Botao>
    </div>
  );
}
