'use client';

import { useEffect } from 'react';

export interface UseAtalhosOptions {
  onEscolher: (indice: number) => void;
  onAlternarAba?: (aba: 'mapa' | 'diario') => void;
  onAlternarColunaFicha?: () => void;
  onAlternarColunaMundo?: () => void;
  onAbrirAjuda?: () => void;
  desabilitado?: boolean;
}

export function useAtalhos({
  onEscolher,
  onAlternarAba,
  onAlternarColunaFicha,
  onAlternarColunaMundo,
  onAbrirAjuda,
  desabilitado = false,
}: UseAtalhosOptions) {
  useEffect(() => {
    if (desabilitado) return;

    function handleKeyDown(e: KeyboardEvent) {
      // Ignora atalhos se o foco estiver em campos de digitação
      const tag = (e.target as HTMLElement)?.tagName?.toLowerCase();
      if (tag === 'input' || tag === 'textarea' || (e.target as HTMLElement)?.isContentEditable) {
        return;
      }

      // 1..4: escolhas
      if (['1', '2', '3', '4'].includes(e.key)) {
        e.preventDefault();
        const indice = parseInt(e.key, 10) - 1;
        onEscolher(indice);
        return;
      }

      // Atalhos de navegação
      const keyUpper = e.key.toUpperCase();
      if (keyUpper === 'J' && onAlternarAba) {
        e.preventDefault();
        onAlternarAba('diario');
      } else if (keyUpper === 'M' && onAlternarAba) {
        e.preventDefault();
        onAlternarAba('mapa');
      } else if (e.key === '[' && onAlternarColunaFicha) {
        e.preventDefault();
        onAlternarColunaFicha();
      } else if (e.key === ']' && onAlternarColunaMundo) {
        e.preventDefault();
        onAlternarColunaMundo();
      } else if (e.key === '?' && onAbrirAjuda) {
        e.preventDefault();
        onAbrirAjuda();
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [
    onEscolher,
    onAlternarAba,
    onAlternarColunaFicha,
    onAlternarColunaMundo,
    onAbrirAjuda,
    desabilitado,
  ]);
}
