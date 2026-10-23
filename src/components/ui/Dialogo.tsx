'use client';

import React, { useEffect, useRef } from 'react';
import { X } from 'lucide-react';

export interface DialogoProps {
  aberto: boolean;
  onFechar: () => void;
  titulo?: string;
  children: React.ReactNode;
  className?: string;
}

export const Dialogo: React.FC<DialogoProps> = ({
  aberto,
  onFechar,
  titulo,
  children,
  className = '',
}) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (aberto) {
      if (!dialog.open) {
        dialog.showModal();
      }
    } else {
      if (dialog.open) {
        dialog.close();
      }
    }
  }, [aberto]);

  function handleCancel(e: React.SyntheticEvent) {
    e.preventDefault();
    onFechar();
  }

  return (
    <dialog
      ref={dialogRef}
      onCancel={handleCancel}
      className={`bg-[var(--pergaminho-2)] text-[var(--tinta)] border-2 border-[var(--borda)] rounded-xl p-6 shadow-2xl max-w-lg w-full backdrop:bg-black/80 backdrop:backdrop-blur-sm ${className}`}
    >
      <div className="flex items-center justify-between pb-3 mb-4 border-b border-[var(--borda)]">
        {titulo && (
          <h2 className="text-xl font-bold font-cinzel text-[var(--ouro)]">
            {titulo}
          </h2>
        )}
        <button
          onClick={onFechar}
          aria-label="Fechar janela"
          className="p-1 rounded-md text-[var(--tinta-suave)] hover:text-[var(--tinta)] hover:bg-[var(--pergaminho-3)] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--ouro-claro)]"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="space-y-4">{children}</div>
    </dialog>
  );
};
