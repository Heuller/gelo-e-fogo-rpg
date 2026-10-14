'use client';

import React, { useState } from 'react';
import { MapPin, Shield, Crown, Info } from 'lucide-react';

interface RegiaoConquista {
  id: string;
  nome: string;
  casaPrincipal: string;
  senhorAtual: string;
  lealdade: number; // 0 a 100
  status: 'Aliado' | 'Hostil' | 'Neutro' | 'Submisso';
  pontoX: number; // %
  pontoY: number; // %
  descricao: string;
}

const REGIOES_CONQUISTA: RegiaoConquista[] = [
  {
    id: 'norte',
    nome: 'O Norte & Winterfell',
    casaPrincipal: 'Casa Stark',
    senhorAtual: 'Torrhen Stark, o Rei que Ajoelhou',
    lealdade: 40,
    status: 'Neutro',
    pontoX: 50,
    pontoY: 22,
    descricao: 'Terras vastas e gélidas sob o estandarte do Lobo Gigante.',
  },
  {
    id: 'vale',
    nome: 'O Vale & Ninho da Águia',
    casaPrincipal: 'Casa Arryn',
    senhorAtual: 'Sharra Arryn & Rei Ronnel',
    lealdade: 30,
    status: 'Hostil',
    pontoX: 68,
    pontoY: 42,
    descricao: 'Montanhas inexpugnáveis vigiadas pela Rainha Regente Sharra.',
  },
  {
    id: 'tridente',
    nome: 'Terras Fluviais & Harrenhal',
    casaPrincipal: 'Casa Tully / Harren',
    senhorAtual: 'Edmyn Tully & Harren o Negro',
    lealdade: 60,
    status: 'Neutro',
    pontoX: 46,
    pontoY: 48,
    descricao: 'Harrenhal queima com fogo de dragão. Os Tully juram lealdade a Aegon.',
  },
  {
    id: 'pedra_dragao',
    nome: 'Pedra do Dragão & Água Negra',
    casaPrincipal: 'Casa Targaryen',
    senhorAtual: 'Aegon I, Visenya e Rhaenys',
    lealdade: 100,
    status: 'Aliado',
    pontoX: 74,
    pontoY: 56,
    descricao: 'O berço dos dragões e o ponto de partida da grande unificação.',
  },
  {
    id: 'ocidente',
    nome: 'Terras Ocidentais & Rochedo',
    casaPrincipal: 'Casa Lannister',
    senhorAtual: 'Loren I Lannister',
    lealdade: 20,
    status: 'Hostil',
    pontoX: 28,
    pontoY: 55,
    descricao: 'Minas de ouro e o exército dourado que marchará até o Campo de Fogo.',
  },
  {
    id: 'tempestade',
    nome: 'Terras da Tempestade',
    casaPrincipal: 'Casa Durrandon / Baratheon',
    senhorAtual: 'Argilac o Arrogante & Orys',
    lealdade: 35,
    status: 'Hostil',
    pontoX: 66,
    pontoY: 68,
    descricao: 'Ponta Tempestade desafia os emissários. O Último Risco se avizinha.',
  },
  {
    id: 'campina',
    nome: 'A Campina & Jardim de Cima',
    casaPrincipal: 'Casa Gardener',
    senhorAtual: 'Mern IX Gardener',
    lealdade: 15,
    status: 'Hostil',
    pontoX: 38,
    pontoY: 72,
    descricao: 'O celeiro de Westeros prestes a enfrentar a fúria dos três dragões reunidos.',
  },
  {
    id: 'dorne',
    nome: 'Dorne & Lançassolar',
    casaPrincipal: 'Casa Martell',
    senhorAtual: 'Meria Martell, o Sapo Amarelo',
    lealdade: 10,
    status: 'Hostil',
    pontoX: 58,
    pontoY: 88,
    descricao: 'Areia, escorpiões e o lema inquebrável: Insubmissos, Não Curvados, Não Quebrados.',
  },
];

interface PropsWesterosMap {
  regiaoAtualId?: string;
  className?: string;
}

export function WesterosMapSVG({ regiaoAtualId = 'pedra_dragao', className = '' }: PropsWesterosMap) {
  const [regiaoSelecionada, setRegiaoSelecionada] = useState<RegiaoConquista>(
    REGIOES_CONQUISTA.find((r) => r.id === regiaoAtualId) || REGIOES_CONQUISTA[3]
  );

  return (
    <div className={`bg-[#171412] border-2 border-[#2D2620] rounded-2xl p-5 shadow-2xl text-[#E6DEC8] font-cinzel space-y-4 ${className}`}>
      
      {/* Cabeçalho */}
      <div className="flex items-center justify-between border-b border-[#2D2620] pb-3">
        <div className="flex items-center gap-2">
          <span className="p-1.5 rounded bg-amber-950/70 border border-amber-700/50 text-[#C5A059]">
            <Crown className="w-4 h-4" />
          </span>
          <h3 className="text-sm font-bold uppercase tracking-wider text-amber-200">
            Mesa Pintada & Domínios
          </h3>
        </div>

        <span className="text-[10px] uppercase font-bold text-slate-400 bg-[#100e0c] px-2 py-0.5 rounded border border-slate-800">
          Mapa da Conquista
        </span>
      </div>

      {/* Carta Cartográfica Vetorial */}
      <div className="relative w-full aspect-[4/5] bg-gradient-to-b from-[#14181f] via-[#101217] to-[#120f12] rounded-xl border border-[#2D2620] overflow-hidden p-2 flex items-center justify-center">
        
        {/* Silhueta Artística de Westeros em SVG */}
        <svg viewBox="0 0 100 120" className="w-full h-full opacity-30 text-[#C5A059] fill-current">
          {/* Costa e contorno do continente */}
          <path d="M 45 5 C 55 5, 60 15, 62 25 C 65 35, 75 40, 72 50 C 78 55, 75 65, 70 70 C 65 75, 70 85, 65 95 C 60 105, 50 110, 45 105 C 40 100, 30 95, 25 85 C 20 75, 25 65, 30 55 C 25 45, 35 30, 40 20 Z" />
          {/* Muralha */}
          <line x1="38" y1="18" x2="62" y2="18" stroke="#E6DEC8" strokeWidth="2" strokeDasharray="2,2" />
        </svg>

        {/* Pinos das Regiões de Conquista */}
        {REGIOES_CONQUISTA.map((regiao) => {
          const ehAtual = regiao.id === regiaoAtualId;
          const ehSelecionada = regiao.id === regiaoSelecionada.id;

          return (
            <button
              key={regiao.id}
              onClick={() => setRegiaoSelecionada(regiao)}
              style={{ left: `${regiao.pontoX}%`, top: `${regiao.pontoY}%` }}
              className={`absolute -translate-x-1/2 -translate-y-1/2 p-1.5 rounded-full transition-transform hover:scale-125 cursor-pointer ${
                ehAtual
                  ? 'bg-red-900 border-2 border-red-500 shadow-lg shadow-red-900/80 animate-pulse'
                  : ehSelecionada
                  ? 'bg-amber-900 border-2 border-[#C5A059]'
                  : 'bg-[#1C1815] border border-slate-600 text-slate-400'
              }`}
              title={`${regiao.nome} (${regiao.casaPrincipal})`}
            >
              <MapPin className={`w-3.5 h-3.5 ${ehAtual ? 'text-amber-300' : 'text-[#C5A059]'}`} />
            </button>
          );
        })}
      </div>

      {/* Cartão de Detalhes da Região Selecionada */}
      <div className="bg-[#12100E] p-3.5 rounded-xl border border-[#2D2620] space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-amber-200">
            {regiaoSelecionada.nome}
          </span>
          <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded border ${
            regiaoSelecionada.status === 'Aliado'
              ? 'bg-emerald-950 text-emerald-300 border-emerald-800'
              : regiaoSelecionada.status === 'Hostil'
              ? 'bg-red-950 text-red-300 border-red-800'
              : 'bg-amber-950 text-amber-300 border-amber-800'
          }`}>
            {regiaoSelecionada.status}
          </span>
        </div>

        <p className="text-[11px] text-[#A69E89] font-garamond italic">
          {regiaoSelecionada.senhorAtual}
        </p>

        {/* Barra de Lealdade / Domínio */}
        <div className="space-y-1 pt-1">
          <div className="flex justify-between text-[10px] text-slate-400 font-sans">
            <span>Lealdade ao Trono de Ferro:</span>
            <span className="font-bold text-amber-300">{regiaoSelecionada.lealdade}%</span>
          </div>
          <div className="w-full h-1.5 bg-stone-900 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-amber-700 to-[#C5A059] rounded-full"
              style={{ width: `${regiaoSelecionada.lealdade}%` }}
            />
          </div>
        </div>

        <p className="text-[11px] text-slate-400 font-garamond pt-1 leading-snug">
          {regiaoSelecionada.descricao}
        </p>
      </div>

    </div>
  );
}
