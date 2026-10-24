'use client';

import React from 'react';
import { Dialogo } from '@/components/ui/Dialogo';
import { Botao } from '@/components/ui/Botao';

export interface ModalAtalhosTecladoProps {
  aberto: boolean;
  onFechar: () => void;
}

export function ModalAtalhosTeclado({ aberto, onFechar }: ModalAtalhosTecladoProps) {
  return (
    <Dialogo aberto={aberto} onFechar={onFechar} titulo="Atalhos do Teclado">
      <div className="space-y-4 text-xs font-sans text-[var(--tinta)]">
        <p className="text-[var(--tinta-suave)] font-garamond text-sm">
          Navegue pelas Crônicas de Sangue e Gelo com agilidade usando o teclado:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="p-3 rounded-lg bg-[var(--pergaminho-1)] border border-[var(--borda)] flex items-center justify-between">
            <span className="text-[var(--tinta-suave)]">Escolhas Narrativas</span>
            <kbd className="px-2 py-1 rounded bg-[var(--pergaminho-3)] border border-[var(--borda)] font-mono text-[var(--ouro)] font-bold">
              1 · 2 · 3 · 4
            </kbd>
          </div>

          <div className="p-3 rounded-lg bg-[var(--pergaminho-1)] border border-[var(--borda)] flex items-center justify-between">
            <span className="text-[var(--tinta-suave)]">Mapa das Crônicas</span>
            <kbd className="px-2 py-1 rounded bg-[var(--pergaminho-3)] border border-[var(--borda)] font-mono text-[var(--ouro)] font-bold">
              M
            </kbd>
          </div>

          <div className="p-3 rounded-lg bg-[var(--pergaminho-1)] border border-[var(--borda)] flex items-center justify-between">
            <span className="text-[var(--tinta-suave)]">Reputação das Casas</span>
            <kbd className="px-2 py-1 rounded bg-[var(--pergaminho-3)] border border-[var(--borda)] font-mono text-[var(--ouro)] font-bold">
              C
            </kbd>
          </div>

          <div className="p-3 rounded-lg bg-[var(--pergaminho-1)] border border-[var(--borda)] flex items-center justify-between">
            <span className="text-[var(--tinta-suave)]">Diário da Crônica</span>
            <kbd className="px-2 py-1 rounded bg-[var(--pergaminho-3)] border border-[var(--borda)] font-mono text-[var(--ouro)] font-bold">
              J
            </kbd>
          </div>

          <div className="p-3 rounded-lg bg-[var(--pergaminho-1)] border border-[var(--borda)] flex items-center justify-between">
            <span className="text-[var(--tinta-suave)]">Alternar Ficha</span>
            <kbd className="px-2 py-1 rounded bg-[var(--pergaminho-3)] border border-[var(--borda)] font-mono text-[var(--ouro)] font-bold">
              [
            </kbd>
          </div>

          <div className="p-3 rounded-lg bg-[var(--pergaminho-1)] border border-[var(--borda)] flex items-center justify-between">
            <span className="text-[var(--tinta-suave)]">Alternar Mundo</span>
            <kbd className="px-2 py-1 rounded bg-[var(--pergaminho-3)] border border-[var(--borda)] font-mono text-[var(--ouro)] font-bold">
              ]
            </kbd>
          </div>

          <div className="p-3 rounded-lg bg-[var(--pergaminho-1)] border border-[var(--borda)] flex items-center justify-between">
            <span className="text-[var(--tinta-suave)]">Esta Ajuda</span>
            <kbd className="px-2 py-1 rounded bg-[var(--pergaminho-3)] border border-[var(--borda)] font-mono text-[var(--ouro)] font-bold">
              ?
            </kbd>
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <Botao variante="primario" onClick={onFechar}>
            Entendido
          </Botao>
        </div>
      </div>
    </Dialogo>
  );
}
