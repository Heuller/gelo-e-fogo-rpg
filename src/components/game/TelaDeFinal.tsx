'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { NodeJornada } from '@/server/engine/storyLinter';
import { FichaPersonagem, WorldState } from '@/server/engine/rpgEngine';
import { Crown, RotateCcw, Home, Download, Award, Shield, HeartHandshake } from 'lucide-react';
import { exportarSaveAction } from '@/app/actions/slotActions';

export interface TelaDeFinalProps {
  node: NodeJornada;
  ficha: FichaPersonagem;
  worldState: WorldState;
  jornadaId: string;
  slotNumber: number;
  onRecomecar: () => void;
}

export function TelaDeFinal({
  node,
  ficha,
  worldState,
  jornadaId,
  slotNumber,
  onRecomecar,
}: TelaDeFinalProps) {
  const router = useRouter();

  async function handleExportar() {
    try {
      const json = await exportarSaveAction(jornadaId, slotNumber);
      const blob = new Blob([json], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `cronica_final_${jornadaId}_slot_${slotNumber}.json`;
      a.click();
      URL.revokeObjectURL(url);
    } catch {}
  }

  const marcos = worldState.marcosConcluidos || [];
  const companheiros = Object.values(ficha.companheiros || {});

  return (
    <div className="w-full max-w-4xl mx-auto py-10 px-4 space-y-8 animate-fade-in font-garamond text-[[var(--tinta)]]">
      {/* Cabeçalho do Desfecho */}
      <div className="text-center space-y-3 border-b border-[[var(--borda)]] pb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[[var(--carmim)]]/30 border-2 border-[[var(--ouro)]] shadow-xl shadow-black/80 mb-2">
          <Crown className="w-8 h-8 text-[[var(--ouro)]]" />
        </div>
        <p className="text-xs uppercase tracking-widest text-[[var(--tinta-suave)]] font-sans">
          Fim da Crônica &bull; Desfecho Histórico
        </p>
        <h1 className="text-4xl md:text-5xl font-extrabold text-[[var(--ouro)]] font-cinzel tracking-wide">
          {node.titulo}
        </h1>
      </div>

      {/* Texto do Epílogo Canônico */}
      <div className="bg-[[var(--pergaminho-2)]] border-2 border-[[var(--borda)]] rounded-2xl p-6 md:p-8 shadow-2xl leading-relaxed text-lg text-justify space-y-4">
        {node.fallbackText.split('\n\n').map((paragrafo, idx) => (
          <p key={idx} className="first-letter:text-3xl first-letter:font-cinzel first-letter:text-[[var(--ouro)]]">
            {paragrafo}
          </p>
        ))}
      </div>

      {/* Resumo da Sua Crônica */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-sans">
        {/* Status Final da Casa / Personagem */}
        <div className="bg-[[var(--pergaminho-2)]] border border-[[var(--borda)]] rounded-xl p-5 space-y-4 shadow-lg">
          <div className="flex items-center gap-2 border-b border-[[var(--borda)]] pb-2 text-[[var(--ouro)]]">
            <Shield className="w-5 h-5" />
            <h2 className="font-cinzel font-bold text-base">Legado e Têmpera</h2>
          </div>
          <div className="grid grid-cols-3 gap-2 text-center text-xs">
            <div className="bg-[[var(--pergaminho-1)]] p-3 rounded-lg border border-[[var(--borda)]]">
              <span className="text-[[var(--tinta-suave)]] block">Sangue</span>
              <strong className="text-red-400 text-lg font-mono">{ficha.estado.sangue} / 10</strong>
            </div>
            <div className="bg-[[var(--pergaminho-1)]] p-3 rounded-lg border border-[[var(--borda)]]">
              <span className="text-[[var(--tinta-suave)]] block">Compostura</span>
              <strong className="text-blue-400 text-lg font-mono">{ficha.estado.compostura} / 10</strong>
            </div>
            <div className="bg-[[var(--pergaminho-1)]] p-3 rounded-lg border border-[[var(--borda)]]">
              <span className="text-[[var(--tinta-suave)]] block">Honra</span>
              <strong className="text-amber-400 text-lg font-mono">
                {ficha.estado.honra > 0 ? `+${ficha.estado.honra}` : ficha.estado.honra}
              </strong>
            </div>
          </div>
          {ficha.cicatrizes.length > 0 && (
            <div className="text-xs space-y-1">
              <span className="text-[[var(--tinta-suave)]]">Cicatrizes de Guerra:</span>
              <p className="text-[[var(--tinta-fraca)]] italic">{ficha.cicatrizes.join(', ')}</p>
            </div>
          )}
        </div>

        {/* Companheiros e Vínculos */}
        <div className="bg-[[var(--pergaminho-2)]] border border-[[var(--borda)]] rounded-xl p-5 space-y-4 shadow-lg">
          <div className="flex items-center gap-2 border-b border-[[var(--borda)]] pb-2 text-[[var(--ouro)]]">
            <HeartHandshake className="w-5 h-5" />
            <h2 className="font-cinzel font-bold text-base">Círculo Íntimo</h2>
          </div>
          {companheiros.length === 0 ? (
            <p className="text-xs text-[[var(--tinta-fraca)]] italic">Nenhum companheiro registrado.</p>
          ) : (
            <div className="space-y-2 text-xs">
              {companheiros.map((comp) => (
                <div key={comp.id} className="flex items-center justify-between bg-[[var(--pergaminho-1)]] p-2 rounded border border-[[var(--borda)]]">
                  <span>{comp.nome}</span>
                  <span
                    className={`font-semibold ${
                      comp.aprovacao >= 30
                        ? 'text-emerald-400'
                        : comp.aprovacao <= -10
                        ? 'text-red-400'
                        : 'text-amber-300'
                    }`}
                  >
                    {comp.status} ({comp.aprovacao > 0 ? `+${comp.aprovacao}` : comp.aprovacao})
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Marcos Concluídos */}
      {marcos.length > 0 && (
        <div className="bg-[[var(--pergaminho-2)]] border border-[[var(--borda)]] rounded-xl p-5 space-y-3 font-sans">
          <div className="flex items-center gap-2 text-[[var(--ouro)]]">
            <Award className="w-5 h-5" />
            <h2 className="font-cinzel font-bold text-sm">Marcos Históricos da Sua Jornada</h2>
          </div>
          <div className="flex flex-wrap gap-2 text-xs">
            {marcos.map((marco, i) => (
              <span key={i} className="px-3 py-1 bg-[[var(--pergaminho-1)]] border border-[[var(--ouro)]]/40 rounded-full text-[[var(--tinta-suave)]]">
                ✓ {marco.replace(/_/g, ' ')}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Ações Finais */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 font-sans">
        <button
          onClick={onRecomecar}
          className="w-full sm:w-auto px-6 py-3 bg-[[var(--pergaminho-1)]] border border-[[var(--ouro)]] hover:bg-[[var(--ouro)]]/20 text-[[var(--tinta)]] font-semibold text-sm rounded-xl transition flex items-center justify-center gap-2"
        >
          <RotateCcw className="w-4 h-4 text-[[var(--ouro)]]" />
          <span>Recomeçar Jornada</span>
        </button>

        <button
          onClick={() => router.push('/painel')}
          className="w-full sm:w-auto px-6 py-3 bg-[[var(--pergaminho-2)]] border border-[[var(--borda)]] hover:bg-[[var(--pergaminho-4)]] text-[[var(--tinta)]] font-semibold text-sm rounded-xl transition flex items-center justify-center gap-2"
        >
          <Home className="w-4 h-4 text-[[var(--tinta-suave)]]" />
          <span>Voltar à Fortaleza</span>
        </button>

        <button
          onClick={handleExportar}
          className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-amber-600 via-amber-500 to-amber-700 text-black font-bold text-sm rounded-xl transition flex items-center justify-center gap-2 shadow-lg shadow-amber-950/50"
        >
          <Download className="w-4 h-4" />
          <span>Exportar Crônica (.json)</span>
        </button>
      </div>
    </div>
  );
}
