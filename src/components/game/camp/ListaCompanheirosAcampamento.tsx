'use client';

import React from 'react';
import { Companheiro } from '@/server/engine/rpgEngine';
import { DIALOGOS_DE_ACAMPAMENTO } from '@/server/data/camp/dialogosAcampamento';
import { MessageSquare } from 'lucide-react';

export interface ListaCompanheirosAcampamentoProps {
  compsAtivos: Companheiro[];
  companheiroSelecionadoId: string | null;
  onSelecionarCompanheiro: (id: string) => void;
}

export function ListaCompanheirosAcampamento({
  compsAtivos,
  companheiroSelecionadoId,
  onSelecionarCompanheiro,
}: ListaCompanheirosAcampamentoProps) {
  return (
    <div className="border-r border-[var(--borda,#3d3222)] pr-4 space-y-3">
      <span className="text-xs font-cinzel tracking-wider text-[var(--ouro,#c5a059)] uppercase block mb-2">
        Companheiros Reunidos ({compsAtivos.length})
      </span>

      {compsAtivos.length === 0 ? (
        <p className="text-xs text-[var(--tinta-fraca,#a89f8a)] italic">
          Nenhum companheiro acompanha sua vigília no momento.
        </p>
      ) : (
        compsAtivos.map((comp) => {
          const selecionado = comp.id === companheiroSelecionadoId;
          const temDialogos = Boolean(DIALOGOS_DE_ACAMPAMENTO[comp.id]);

          return (
            <button
              key={comp.id}
              onClick={() => onSelecionarCompanheiro(comp.id)}
              className={`w-full text-left p-3 rounded border transition-all flex flex-col gap-1.5 ${
                selecionado
                  ? 'bg-amber-950/30 border-[var(--ouro,#c5a059)] shadow-[0_0_12px_rgba(197,160,89,0.2)]'
                  : 'bg-black/20 border-[var(--borda,#3d3222)] hover:border-amber-700/50 hover:bg-black/40'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-cinzel text-sm font-bold text-[var(--ouro-brilho,#dfbe76)]">
                  {comp.nome}
                </span>
                <span
                  className={`text-[10px] px-2 py-0.5 rounded font-cinzel uppercase font-semibold ${
                    comp.status === 'Devotado'
                      ? 'bg-emerald-950 text-emerald-300 border border-emerald-600/50'
                      : comp.status === 'Leal'
                      ? 'bg-amber-950 text-amber-300 border border-amber-600/50'
                      : comp.status === 'Neutro'
                      ? 'bg-zinc-800 text-zinc-300 border border-zinc-600/50'
                      : 'bg-rose-950 text-rose-300 border border-rose-600/50'
                  }`}
                >
                  {comp.status} ({comp.aprovacao})
                </span>
              </div>

              <span className="text-xs text-[var(--tinta-fraca,#a89f8a)] line-clamp-1 italic">
                {comp.titulo}
              </span>

              {temDialogos && (
                <span className="text-[10px] text-amber-400/80 flex items-center gap-1 mt-1">
                  <MessageSquare className="w-3 h-3" />
                  <span>Conversas disponíveis</span>
                </span>
              )}
            </button>
          );
        })
      )}
    </div>
  );
}
