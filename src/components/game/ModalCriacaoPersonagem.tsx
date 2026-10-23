'use client';

import React, { useState, useEffect } from 'react';
import { Dialogo } from '@/components/ui/Dialogo';
import { Botao } from '@/components/ui/Botao';
import {
  PONTOS_DISTRIBUIVEIS,
  VALOR_MINIMO_ATRIBUTO,
  VALOR_MAXIMO_ATRIBUTO,
  NOMES_ATRIBUTOS,
  DESCRICOES_ATRIBUTOS,
  ATRIBUTOS_LISTA,
} from '@/lib/engine-shared/atributos';
import { probabilidadeSucesso } from '@/lib/engine-shared/probabilidade';
import { FichaPersonagem, AtributoVoz } from '@/server/engine/rpgEngine';
import { User, Sparkles, Plus, Minus, ShieldCheck, Dice6 } from 'lucide-react';

export interface ModalCriacaoPersonagemProps {
  aberto: boolean;
  onFechar: () => void;
  onConfirmar: (ficha: FichaPersonagem) => void;
  protagonistaPadrao: {
    id: string;
    nome: string;
    titulo: string;
    origem: string;
    atributos: Record<AtributoVoz, number>;
  };
}

export const ModalCriacaoPersonagem: React.FC<ModalCriacaoPersonagemProps> = ({
  aberto,
  onFechar,
  onConfirmar,
  protagonistaPadrao,
}) => {
  const [modo, setModo] = useState<'canonico' | 'customizado'>('canonico');
  const [nome, setNome] = useState(protagonistaPadrao.nome);
  const [origem, setOrigem] = useState(protagonistaPadrao.origem);
  const [atributos, setAtributos] = useState<Record<AtributoVoz, number>>(
    protagonistaPadrao.atributos
  );

  useEffect(() => {
    setNome(protagonistaPadrao.nome);
    setOrigem(protagonistaPadrao.origem);
    setAtributos(protagonistaPadrao.atributos);
    setModo('canonico');
  }, [protagonistaPadrao, aberto]);

  const somaAtributos = Object.values(atributos).reduce((a, b) => a + b, 0);
  const pontosRestantes = PONTOS_DISTRIBUIVEIS - somaAtributos;

  function alterarAtributo(attr: AtributoVoz, delta: number) {
    const atual = atributos[attr];
    const novo = atual + delta;
    if (novo < VALOR_MINIMO_ATRIBUTO || novo > VALOR_MAXIMO_ATRIBUTO) return;
    if (delta > 0 && pontosRestantes <= 0) return;

    setAtributos({
      ...atributos,
      [attr]: novo,
    });
  }

  function handleSalvar() {
    const fichaPronta: FichaPersonagem = {
      id: modo === 'canonico' ? protagonistaPadrao.id : `pers_${Date.now()}`,
      nome: modo === 'canonico' ? protagonistaPadrao.nome : nome.trim() || 'Lorde Sem Nome',
      origem: modo === 'canonico' ? protagonistaPadrao.origem : origem,
      inspiracao: 2,
      atributos: modo === 'canonico' ? protagonistaPadrao.atributos : atributos,
      estado: { sangue: 10, compostura: 10, honra: 5 },
      cicatrizes: [],
      segredos: ['Segredo ancestral registrado no Códice'],
      companheiros: {},
    };

    onConfirmar(fichaPronta);
  }

  return (
    <Dialogo aberto={aberto} onFechar={onFechar} titulo="Criação e Escolha de Ficha">
      <div className="space-y-6 text-sm font-sans text-[var(--tinta)]">
        {/* Seletor de Modo: Canônico vs Personalizado */}
        <div className="grid grid-cols-2 gap-2 p-1 bg-[var(--pergaminho-1)] border border-[var(--borda)] rounded-xl font-cinzel text-xs font-bold">
          <button
            type="button"
            onClick={() => setModo('canonico')}
            className={`py-2 px-3 rounded-lg transition-colors flex items-center justify-center gap-2 ${
              modo === 'canonico'
                ? 'bg-[var(--pergaminho-3)] text-[var(--ouro)] shadow-sm border border-[var(--ouro-escuro)]'
                : 'text-[var(--tinta-suave)] hover:text-[var(--tinta)]'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Ficha Canônica</span>
          </button>

          <button
            type="button"
            onClick={() => setModo('customizado')}
            className={`py-2 px-3 rounded-lg transition-colors flex items-center justify-center gap-2 ${
              modo === 'customizado'
                ? 'bg-[var(--pergaminho-3)] text-[var(--ouro)] shadow-sm border border-[var(--ouro-escuro)]'
                : 'text-[var(--tinta-suave)] hover:text-[var(--tinta)]'
            }`}
          >
            <User className="w-4 h-4" />
            <span>Personalizar</span>
          </button>
        </div>

        {modo === 'canonico' ? (
          <div className="p-4 rounded-xl bg-[var(--pergaminho-1)] border border-[var(--borda)] space-y-4 entrada-fade">
            <div className="border-b border-[var(--borda)] pb-3">
              <span className="text-xs uppercase tracking-widest text-[var(--ouro)] font-cinzel font-bold">
                Protagonista Histórico
              </span>
              <h3 className="text-lg font-cinzel font-bold text-[var(--ouro-claro)]">
                {protagonistaPadrao.nome}
              </h3>
              <p className="text-xs text-[var(--tinta-suave)] font-garamond italic">
                {protagonistaPadrao.titulo} &bull; Origem: {protagonistaPadrao.origem}
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
              {ATRIBUTOS_LISTA.map((attr) => (
                <div
                  key={attr}
                  className="p-2 rounded-lg bg-[var(--pergaminho-2)] border border-[var(--borda)] flex items-center justify-between"
                >
                  <span className="text-[var(--tinta-suave)]">{NOMES_ATRIBUTOS[attr]}</span>
                  <span className="font-mono font-bold text-[var(--ouro)]">
                    {protagonistaPadrao.atributos[attr]}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-4 entrada-fade">
            {/* Nome e Origem */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="space-y-1">
                <label className="font-cinzel uppercase tracking-wider text-[var(--tinta-suave)] font-bold">
                  Nome do Senhor
                </label>
                <input
                  type="text"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  placeholder="Ex.: Lorde Brandon"
                  className="w-full px-3 py-2 bg-[var(--pergaminho-1)] border border-[var(--borda)] rounded-lg text-sm text-[var(--tinta)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--ouro-claro)]"
                />
              </div>

              <div className="space-y-1">
                <label className="font-cinzel uppercase tracking-wider text-[var(--tinta-suave)] font-bold">
                  Origem Heráldica
                </label>
                <select
                  value={origem}
                  onChange={(e) => setOrigem(e.target.value)}
                  className="w-full px-3 py-2 bg-[var(--pergaminho-1)] border border-[var(--borda)] rounded-lg text-sm text-[var(--tinta)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--ouro-claro)]"
                >
                  <option value="honra_do_norte">Honra do Norte (Stark / Primeiros Homens)</option>
                  <option value="sangue_valiriano">Sangue Valiriano (Targaryen / Velaryon)</option>
                  <option value="nobreza_westerosi">Nobreza de Westeros (Campina / Terras da Coroa)</option>
                  <option value="ouro_ocidental">Ouro Ocidental (Lannister / Rochedo)</option>
                </select>
              </div>
            </div>

            {/* Contador de Pontos */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-[var(--pergaminho-1)] border border-[var(--borda)]">
              <div>
                <span className="font-cinzel font-bold text-xs uppercase tracking-wider text-[var(--ouro)]">
                  Pontos Distribuíveis
                </span>
                <p className="text-xs text-[var(--tinta-suave)]">
                  Mínimo {VALOR_MINIMO_ATRIBUTO}, Máximo {VALOR_MAXIMO_ATRIBUTO} por atributo.
                </p>
              </div>
              <span
                className={`font-mono text-base font-bold px-2.5 py-0.5 rounded-lg border ${
                  pontosRestantes === 0
                    ? 'bg-emerald-950/80 border-emerald-600 text-emerald-300'
                    : 'bg-amber-950/80 border-[var(--ouro-escuro)] text-[var(--ouro)]'
                }`}
              >
                {pontosRestantes} / {PONTOS_DISTRIBUIVEIS}
              </span>
            </div>

            {/* Lista dos 6 Atributos */}
            <div className="space-y-2.5">
              {ATRIBUTOS_LISTA.map((attr) => {
                const val = atributos[attr];
                const chanceDc10 = probabilidadeSucesso(val, 10).porcentagemTexto;

                return (
                  <div
                    key={attr}
                    className="p-3 rounded-xl bg-[var(--pergaminho-1)] border border-[var(--borda)] flex items-center justify-between gap-3"
                  >
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-cinzel font-bold text-sm text-[var(--tinta)]">
                          {NOMES_ATRIBUTOS[attr]}
                        </span>
                        <span className="text-xs text-[var(--ouro-escuro)] font-mono">
                          (≈ {chanceDc10} em DC 10)
                        </span>
                      </div>
                      <p className="text-xs text-[var(--tinta-suave)] font-garamond italic truncate max-w-sm">
                        {DESCRICOES_ATRIBUTOS[attr]}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 flex-shrink-0">
                      <button
                        type="button"
                        onClick={() => alterarAtributo(attr, -1)}
                        disabled={val <= VALOR_MINIMO_ATRIBUTO}
                        className="w-11 h-11 rounded-lg bg-[var(--pergaminho-3)] hover:bg-[var(--pergaminho-4)] border border-[var(--borda)] text-[var(--tinta)] flex items-center justify-center font-bold text-lg disabled:opacity-40 disabled:cursor-not-allowed transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--ouro-claro)]"
                        aria-label={`Diminuir ${NOMES_ATRIBUTOS[attr]}`}
                      >
                        <Minus className="w-4 h-4" />
                      </button>

                      <span className="w-7 text-center font-mono font-bold text-base text-[var(--ouro)]">
                        {val}
                      </span>

                      <button
                        type="button"
                        onClick={() => alterarAtributo(attr, 1)}
                        disabled={val >= VALOR_MAXIMO_ATRIBUTO || pontosRestantes <= 0}
                        className="w-11 h-11 rounded-lg bg-[var(--pergaminho-3)] hover:bg-[var(--pergaminho-4)] border border-[var(--borda)] text-[var(--tinta)] flex items-center justify-center font-bold text-lg disabled:opacity-40 disabled:cursor-not-allowed transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--ouro-claro)]"
                        aria-label={`Aumentar ${NOMES_ATRIBUTOS[attr]}`}
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Rodapé do Modal */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-[var(--borda)]">
          <Botao variante="fantasma" onClick={onFechar}>
            Cancelar
          </Botao>
          <Botao
            variante="primario"
            onClick={handleSalvar}
            disabled={modo === 'customizado' && pontosRestantes !== 0}
          >
            Confirmar e Iniciar Crônica
          </Botao>
        </div>
      </div>
    </Dialogo>
  );
};
