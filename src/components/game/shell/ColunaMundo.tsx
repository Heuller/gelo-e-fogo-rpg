'use client';

import React from 'react';
import { MapaDoMundo } from '@/components/game/MapaDoMundo';
import { PainelDeCasas } from '@/components/game/PainelDeCasas';
import { ChronicleTimeline } from '@/components/game/ChronicleTimeline';
import { CadernoDeAchados } from '@/components/game/CadernoDeAchados';
import { LivroDosNomes } from '@/components/game/LivroDosNomes';
import { RelogioSegmentos } from '@/components/game/RelogioSegmentos';
import { RegiaoMapa } from '@/lib/temas';
import type { TurnEvent } from '@/server/saves';
import { BookOpen, Feather, Flame, Map, Scroll, Shield } from 'lucide-react';
import { PainelDeAcampamento } from '@/components/game/PainelDeAcampamento';
import { useJogoStore } from '@/lib/store/jogoStore';

export type AbaColunaMundo = 'mapa' | 'casas' | 'diario' | 'achados' | 'nomes' | 'fogueira';

export interface ColunaMundoProps {
  aberta: boolean;
  abaAtiva: AbaColunaMundo;
  onAlternarAba: (aba: AbaColunaMundo) => void;
  regioes: RegiaoMapa[];
  regiaoAtualId?: string;
  casasPrincipais?: Record<string, string>;
  reputacaoCasas?: Record<string, number>;
  historico: TurnEvent[];
  flags?: Record<string, boolean | string | number>;
  nomeJogador?: string;
  onDesfazer?: () => void;
  onExportarSave?: () => void;
  className?: string;
}

export function ColunaMundo({
  aberta,
  abaAtiva,
  onAlternarAba,
  regioes,
  regiaoAtualId,
  casasPrincipais = {},
  reputacaoCasas = {},
  historico,
  flags = {},
  nomeJogador,
  onDesfazer,
  onExportarSave,
  className = '',
}: ColunaMundoProps) {
  const { ficha } = useJogoStore();

  if (!aberta) {
    return null;
  }

  // Detecta relógio de cerco / fissura a partir das flags
  const ticksCerco = Object.keys(flags).filter(
    (k) => k.startsWith('tick_cerco_') && Boolean(flags[k])
  ).length;
  const ticksFissura = Object.keys(flags).filter(
    (k) => k.startsWith('tick_fissura_') && Boolean(flags[k])
  ).length;

  const temRelogioCerco = ticksCerco > 0 || Boolean(flags.cerco_em_andamento);

  return (
    <div
      className={`w-[320px] flex-shrink-0 hidden lg:block entrada-fade ${className}`}
      aria-label="Painel do Mundo e Crônica"
    >
      <div className="sticky top-16 max-h-[calc(100vh-5rem)] overflow-y-auto space-y-4 pl-1">
        {/* Relógio de Consequência da Jornada (Se Ativo) */}
        {temRelogioCerco && (
          <div className="space-y-2 entrada-fade">
            <RelogioSegmentos
              id="relogio_cerco"
              rotulo="O Cerco de Castelo Negro"
              segmentosTotais={6}
              segmentosPreenchidos={ticksCerco}
              descricao="Pressão dos Thenns e da hoste de Mance Rayder sobre o posto"
              cheio={Boolean(flags.cerco_cheio) || ticksCerco >= 6}
            />
            {ticksFissura > 0 && (
              <RelogioSegmentos
                id="relogio_fissura"
                rotulo="A Fissura da Patrulha"
                segmentosTotais={4}
                segmentosPreenchidos={ticksFissura}
                descricao="Intrigas entre a Guarda Velha e os partidários de Jon"
                cheio={Boolean(flags.fissura_cheia) || ticksFissura >= 4}
              />
            )}
          </div>
        )}

        {/* Seletor de Abas Expandido (6 Abas) */}
        <div className="grid grid-cols-6 gap-1 bg-[var(--pergaminho-2)] p-1 rounded-xl border border-[var(--borda)]">
          <button
            type="button"
            onClick={() => onAlternarAba('mapa')}
            className={`py-2 text-[10px] sm:text-[11px] font-cinzel font-bold rounded-lg transition-colors flex flex-col items-center justify-center gap-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--ouro-claro)] ${
              abaAtiva === 'mapa'
                ? 'bg-[var(--pergaminho-3)] text-[var(--ouro)] shadow-sm border border-[var(--ouro-escuro)]'
                : 'text-[var(--tinta-suave)] hover:text-[var(--tinta)]'
            }`}
            title="Mapa de Westeros"
          >
            <Map className="w-3.5 h-3.5" />
            <span>Mapa</span>
          </button>

          <button
            type="button"
            onClick={() => onAlternarAba('casas')}
            className={`py-2 text-[10px] sm:text-[11px] font-cinzel font-bold rounded-lg transition-colors flex flex-col items-center justify-center gap-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--ouro-claro)] ${
              abaAtiva === 'casas'
                ? 'bg-[var(--pergaminho-3)] text-[var(--ouro)] shadow-sm border border-[var(--ouro-escuro)]'
                : 'text-[var(--tinta-suave)] hover:text-[var(--tinta)]'
            }`}
            title="Reputação das Facções"
          >
            <Shield className="w-3.5 h-3.5" />
            <span>Casas</span>
          </button>

          <button
            type="button"
            onClick={() => onAlternarAba('fogueira')}
            className={`py-2 text-[10px] sm:text-[11px] font-cinzel font-bold rounded-lg transition-colors flex flex-col items-center justify-center gap-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--ouro-claro)] ${
              abaAtiva === 'fogueira'
                ? 'bg-[var(--pergaminho-3)] text-amber-500 shadow-sm border border-amber-600'
                : 'text-[var(--tinta-suave)] hover:text-amber-400'
            }`}
            title="Fogueira e Diálogos de Companheiros"
          >
            <Flame className="w-3.5 h-3.5 text-amber-500" />
            <span>Fogo</span>
          </button>

          <button
            type="button"
            onClick={() => onAlternarAba('diario')}
            className={`py-2 text-[10px] sm:text-[11px] font-cinzel font-bold rounded-lg transition-colors flex flex-col items-center justify-center gap-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--ouro-claro)] ${
              abaAtiva === 'diario'
                ? 'bg-[var(--pergaminho-3)] text-[var(--ouro)] shadow-sm border border-[var(--ouro-escuro)]'
                : 'text-[var(--tinta-suave)] hover:text-[var(--tinta)]'
            }`}
            title="Diário e Histórico"
          >
            <Scroll className="w-3.5 h-3.5" />
            <span>Diário</span>
          </button>

          <button
            type="button"
            onClick={() => onAlternarAba('achados')}
            className={`py-2 text-[10px] sm:text-[11px] font-cinzel font-bold rounded-lg transition-colors flex flex-col items-center justify-center gap-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--ouro-claro)] ${
              abaAtiva === 'achados'
                ? 'bg-[var(--pergaminho-3)] text-[var(--ouro)] shadow-sm border border-[var(--ouro-escuro)]'
                : 'text-[var(--tinta-suave)] hover:text-[var(--tinta)]'
            }`}
            title="Caderno de Achados da Cidadela"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Notas</span>
          </button>

          <button
            type="button"
            onClick={() => onAlternarAba('nomes')}
            className={`py-2 text-[10px] sm:text-[11px] font-cinzel font-bold rounded-lg transition-colors flex flex-col items-center justify-center gap-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--ouro-claro)] ${
              abaAtiva === 'nomes'
                ? 'bg-[var(--pergaminho-3)] text-[var(--ouro)] shadow-sm border border-[var(--ouro-escuro)]'
                : 'text-[var(--tinta-suave)] hover:text-[var(--tinta)]'
            }`}
            title="O Livro dos Nomes"
          >
            <Feather className="w-3.5 h-3.5" />
            <span>Nomes</span>
          </button>
        </div>

        {/* Conteúdo da Aba Ativa */}
        {abaAtiva === 'mapa' && (
          <div className="entrada-fade">
            <MapaDoMundo
              regioes={regioes}
              regiaoAtualId={regiaoAtualId}
              casasPrincipais={casasPrincipais}
            />
          </div>
        )}

        {abaAtiva === 'casas' && (
          <div className="entrada-fade">
            <PainelDeCasas
              reputacaoCasas={reputacaoCasas}
              nomesCasas={casasPrincipais}
            />
          </div>
        )}

        {abaAtiva === 'fogueira' && (
          <div className="entrada-fade">
            <PainelDeAcampamento
              companheiros={ficha?.companheiros || {}}
              flags={flags}
            />
          </div>
        )}

        {abaAtiva === 'diario' && (
          <div className="entrada-fade">
            <ChronicleTimeline
              historico={historico}
              onDesfazerTurno={onDesfazer}
              onExportarSave={onExportarSave}
            />
          </div>
        )}

        {abaAtiva === 'achados' && (
          <div className="entrada-fade">
            <CadernoDeAchados flags={flags} />
          </div>
        )}

        {abaAtiva === 'nomes' && (
          <div className="entrada-fade">
            <LivroDosNomes flags={flags} nomeJogador={nomeJogador} />
          </div>
        )}
      </div>
    </div>
  );
}
