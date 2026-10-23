'use client';

import { useEffect, useRef } from 'react';

export function useScrollNaCena(nodeId: string | null, tituloCena: string | null) {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const anunciadorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!nodeId || !headingRef.current) return;

    // Respeita prefers-reduced-motion
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    headingRef.current.scrollIntoView({
      behavior: reduceMotion ? 'auto' : 'smooth',
      block: 'start',
    });

    // Move o foco para leitura acessível imediata
    headingRef.current.focus({ preventScroll: true });

    // Anúncio em região viva
    if (anunciadorRef.current && tituloCena) {
      anunciadorRef.current.textContent = `Nova cena: ${tituloCena}`;
    }
  }, [nodeId, tituloCena]);

  return { headingRef, anunciadorRef };
}
