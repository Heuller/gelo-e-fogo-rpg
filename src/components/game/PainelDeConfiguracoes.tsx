'use client';

import React, { useState, useEffect } from 'react';
import { Dialogo } from '@/components/ui/Dialogo';
import { Botao } from '@/components/ui/Botao';
import { Type, AlignLeft, AlignJustify, Palette, Eye, Activity } from 'lucide-react';

export type TemaLeitura = 'noite' | 'ambar' | 'alto_contraste';

export interface PreferenciasLeitura {
  tamanhoFonte: 'padrao' | 'medio' | 'grande' | 'extra';
  espacamento: 'normal' | 'amplo';
  alinhamento: 'esquerda' | 'justificado';
  temaVisual: TemaLeitura;
  mostrarChanceSucesso: boolean;
  dicasPercepcao: boolean;
  esperarMestre: boolean;
  reduzirMovimento: boolean;
}

export const PREFERENCIAS_PADRAO: PreferenciasLeitura = {
  tamanhoFonte: 'padrao',
  espacamento: 'normal',
  alinhamento: 'esquerda',
  temaVisual: 'noite',
  mostrarChanceSucesso: true,
  dicasPercepcao: true,
  esperarMestre: false,
  reduzirMovimento: false,
};

const CHAVE_STORAGE = 'gelo_e_fogo_preferencias_v1';

export function obterPreferenciasSalvas(): PreferenciasLeitura {
  if (typeof window === 'undefined') return PREFERENCIAS_PADRAO;
  try {
    const item = window.localStorage.getItem(CHAVE_STORAGE);
    if (!item) return PREFERENCIAS_PADRAO;
    return { ...PREFERENCIAS_PADRAO, ...JSON.parse(item) };
  } catch {
    return PREFERENCIAS_PADRAO;
  }
}

export function gravarPreferenciasSalvas(prefs: PreferenciasLeitura): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(CHAVE_STORAGE, JSON.stringify(prefs));
  } catch {
    // ignora falha em ambiente sem permissão
  }
}

export interface PainelDeConfiguracoesProps {
  aberto: boolean;
  onFechar: () => void;
  preferencias: PreferenciasLeitura;
  onSalvar: (novas: PreferenciasLeitura) => void;
}

export const PainelDeConfiguracoes: React.FC<PainelDeConfiguracoesProps> = ({
  aberto,
  onFechar,
  preferencias,
  onSalvar,
}) => {
  const [prefs, setPrefs] = useState<PreferenciasLeitura>(preferencias);

  useEffect(() => {
    setPrefs(preferencias);
  }, [preferencias]);

  function handleSalvar() {
    gravarPreferenciasSalvas(prefs);
    onSalvar(prefs);
    onFechar();
  }

  return (
    <Dialogo aberto={aberto} onFechar={onFechar} titulo="Configurações de Leitura e Jogo">
      <div className="space-y-6 text-sm font-sans text-[var(--tinta)]">
        {/* Tipografia e Tamanho */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 font-cinzel font-bold text-[var(--ouro)] text-xs uppercase tracking-wider">
            <Type className="w-4 h-4" />
            <span>Tamanho da Letra</span>
          </label>
          <div className="grid grid-cols-4 gap-2 text-xs">
            {(['padrao', 'medio', 'grande', 'extra'] as const).map((tam) => (
              <button
                key={tam}
                type="button"
                onClick={() => setPrefs({ ...prefs, tamanhoFonte: tam })}
                className={`py-2 px-2 rounded-lg border text-center font-medium capitalize transition-all ${
                  prefs.tamanhoFonte === tam
                    ? 'border-[var(--ouro)] bg-[var(--ouro)]/20 text-[var(--ouro-claro)] font-bold'
                    : 'border-[var(--borda)] bg-[var(--pergaminho-1)] text-[var(--tinta-suave)] hover:border-[var(--borda)]'
                }`}
              >
                {tam}
              </button>
            ))}
          </div>
        </div>

        {/* Alinhamento */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 font-cinzel font-bold text-[var(--ouro)] text-xs uppercase tracking-wider">
            <AlignLeft className="w-4 h-4" />
            <span>Alinhamento da Prosa</span>
          </label>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <button
              type="button"
              onClick={() => setPrefs({ ...prefs, alinhamento: 'esquerda' })}
              className={`py-2 px-3 rounded-lg border flex items-center justify-center gap-2 transition-all ${
                prefs.alinhamento === 'esquerda'
                  ? 'border-[var(--ouro)] bg-[var(--ouro)]/20 text-[var(--ouro-claro)] font-bold'
                  : 'border-[var(--borda)] bg-[var(--pergaminho-1)] text-[var(--tinta-suave)]'
              }`}
            >
              <AlignLeft className="w-4 h-4" />
              <span>À Esquerda (Padrão)</span>
            </button>
            <button
              type="button"
              onClick={() => setPrefs({ ...prefs, alinhamento: 'justificado' })}
              className={`py-2 px-3 rounded-lg border flex items-center justify-center gap-2 transition-all ${
                prefs.alinhamento === 'justificado'
                  ? 'border-[var(--ouro)] bg-[var(--ouro)]/20 text-[var(--ouro-claro)] font-bold'
                  : 'border-[var(--borda)] bg-[var(--pergaminho-1)] text-[var(--tinta-suave)]'
              }`}
            >
              <AlignJustify className="w-4 h-4" />
              <span>Justificado</span>
            </button>
          </div>
        </div>

        {/* Espaçamento */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 font-cinzel font-bold text-[var(--ouro)] text-xs uppercase tracking-wider">
            <Activity className="w-4 h-4" />
            <span>Espaçamento Entre Linhas</span>
          </label>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <button
              type="button"
              onClick={() => setPrefs({ ...prefs, espacamento: 'normal' })}
              className={`py-2 px-3 rounded-lg border flex items-center justify-center gap-2 transition-all ${
                prefs.espacamento === 'normal'
                  ? 'border-[var(--ouro)] bg-[var(--ouro)]/20 text-[var(--ouro-claro)] font-bold'
                  : 'border-[var(--borda)] bg-[var(--pergaminho-1)] text-[var(--tinta-suave)]'
              }`}
            >
              <span>Normal</span>
            </button>
            <button
              type="button"
              onClick={() => setPrefs({ ...prefs, espacamento: 'amplo' })}
              className={`py-2 px-3 rounded-lg border flex items-center justify-center gap-2 transition-all ${
                prefs.espacamento === 'amplo'
                  ? 'border-[var(--ouro)] bg-[var(--ouro)]/20 text-[var(--ouro-claro)] font-bold'
                  : 'border-[var(--borda)] bg-[var(--pergaminho-1)] text-[var(--tinta-suave)]'
              }`}
            >
              <span>Amplo</span>
            </button>
          </div>
        </div>

        {/* Opções de Jogo */}
        <div className="space-y-3 pt-2 border-t border-[var(--borda)]">
          <label className="flex items-center justify-between cursor-pointer">
            <div className="space-y-0.5">
              <span className="font-semibold block text-xs">Mostrar Chance de Sucesso</span>
              <span className="text-xs text-[var(--tinta-suave)] block">
                Exibe a probabilidade matemática exata (ex.: ≈ 72%) nos cartões de escolha.
              </span>
            </div>
            <input
              type="checkbox"
              checked={prefs.mostrarChanceSucesso}
              onChange={(e) => setPrefs({ ...prefs, mostrarChanceSucesso: e.target.checked })}
              className="w-4 h-4 accent-amber-600 rounded"
            />
          </label>

          <label className="flex items-center justify-between cursor-pointer">
            <div className="space-y-0.5">
              <span className="font-semibold block text-xs">Dicas de Percepção Passiva</span>
              <span className="text-xs text-[var(--tinta-suave)] block">
                Avisa discretamente quando uma voz da mente não pôde ser ouvida.
              </span>
            </div>
            <input
              type="checkbox"
              checked={prefs.dicasPercepcao}
              onChange={(e) => setPrefs({ ...prefs, dicasPercepcao: e.target.checked })}
              className="w-4 h-4 accent-amber-600 rounded"
            />
          </label>

          <label className="flex items-center justify-between cursor-pointer">
            <div className="space-y-0.5">
              <span className="font-semibold block text-xs">Esperar o Mestre IA</span>
              <span className="text-xs text-[var(--tinta-suave)] block">
                Aguardar alguns segundos pelo texto enriquecido antes de apresentar a cena.
              </span>
            </div>
            <input
              type="checkbox"
              checked={prefs.esperarMestre}
              onChange={(e) => setPrefs({ ...prefs, esperarMestre: e.target.checked })}
              className="w-4 h-4 accent-amber-600 rounded"
            />
          </label>
        </div>

        {/* Rodapé com Ações */}
        <div className="flex justify-end gap-3 pt-4 border-t border-[var(--borda)]">
          <Botao variante="fantasma" onClick={onFechar}>
            Cancelar
          </Botao>
          <Botao variante="primario" onClick={handleSalvar}>
            Salvar Preferências
          </Botao>
        </div>
      </div>
    </Dialogo>
  );
};
