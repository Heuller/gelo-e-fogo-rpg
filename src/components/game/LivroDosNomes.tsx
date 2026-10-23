'use client';

import React from 'react';
import { Feather, Flame, ShieldAlert, Sparkles, UserCheck } from 'lucide-react';

export interface EntradaNome {
  id: string;
  flag: string;
  nome: string;
  titulo: string;
  condicao: 'Vivo & Juramentado' | 'Caído no Cumprimento do Dever' | 'Povo Livre' | 'Muralha Eterna';
  registro: string;
}

export const NOMES_CANONICOS_MURALHA: EntradaNome[] = [
  {
    id: 'jeor_mormont',
    flag: 'juramento_ao_velho_urso',
    nome: 'Jeor Mormont',
    titulo: 'O Velho Urso & 997º Senhor Comandante',
    condicao: 'Caído no Cumprimento do Dever',
    registro: 'Assassinado por amotinados na fortaleza de Craster após o rompimento do cerco do Punho dos Primeiros Homens. Seu último suspiro perdoou o filho exilado.',
  },
  {
    id: 'donal_noye',
    flag: 'nome_noye',
    nome: 'Donal Noye',
    titulo: 'Armeiro Maneta & Herói do Portão',
    condicao: 'Caído no Cumprimento do Dever',
    registro: 'Segurou a última grade de ferro contra Mag, o Poderoso. Morreu com a espinha esmagada, mas com sua espada enterrada até o cabo na garganta do gigante.',
  },
  {
    id: 'ygritte',
    flag: 'nome_selvagem_ygritte',
    nome: 'Ygritte',
    titulo: 'Beijada pelo Fogo',
    condicao: 'Povo Livre',
    registro: 'Guerreira lanceira do Povo Livre. Tombou flechada perto da Torre do Senhor Comandante e expirou nos braços de Jon Snow sob o sussurro de suas últimas palavras.',
  },
  {
    id: 'jon_snow',
    flag: 'aclamou_jon_snow',
    nome: 'Jon Snow',
    titulo: 'Lorde Snow & 998º Senhor Comandante',
    condicao: 'Vivo & Juramentado',
    registro: 'Alertou a guarnição sobre o ataque pelo sul, combateu na escadaria em chamas e foi eleito por aclamação sagrada com o voo do corvo negro.',
  },
  {
    id: 'samwell_tarly',
    flag: 'segredo_obsidiana_descoberto',
    nome: 'Samwell Tarly',
    titulo: 'Sam, o Matador & Intendente',
    condicao: 'Vivo & Juramentado',
    registro: 'Descobriu que a obsidiana extingue os Outros; protegeu Goiva e seu bebê pelas neves e orquestrou com sabedoria a eleição do Muro.',
  },
  {
    id: 'meistre_aemon',
    flag: 'ea_aemon_dragao',
    nome: 'Meistre Aemon Targaryen',
    titulo: 'Meistre Centenário & Filho de Maekar I',
    condicao: 'Vivo & Juramentado',
    registro: 'A sabedoria imortal da Patrulha. Impediu a execução arbitrária de Jon e abençoou a resistência com o fogo dos livros ancestrais.',
  },
  {
    id: 'val',
    flag: 'nome_selvagem_val',
    nome: 'Val',
    titulo: 'A Princesa dos Selvagens',
    condicao: 'Povo Livre',
    registro: 'Irmã de Dalla, protegeu o sobrinho recém-nascido durante a carga de Stannis com a altivez e bravura das mulheres livres do norte.',
  },
  {
    id: 'goiva',
    flag: 'nome_goiva',
    nome: 'Goiva',
    titulo: 'Filha de Craster',
    condicao: 'Povo Livre',
    registro: 'Fugiu das atrocidades do motim para salvar seu filho inocente dos deuses gélidos da floresta, encontrando refúgio sob o manto da Patrulha.',
  },
];

export interface LivroDosNomesProps {
  flags: Record<string, boolean | string | number>;
  nomeJogador?: string;
  className?: string;
}

export function LivroDosNomes({
  flags,
  nomeJogador = 'Irmão Sem Nome',
  className = '',
}: LivroDosNomesProps) {
  // Localiza os nomes conhecidos/registrados
  const entradasGravadas = NOMES_CANONICOS_MURALHA.filter(
    (n) => Boolean(flags[n.flag] || flags[`tick_${n.flag}`]) || true // Sempre exibe conhecidos com status
  );

  return (
    <div
      className={`bg-[var(--pergaminho-2)] border border-[var(--borda)] rounded-2xl p-4 shadow-md space-y-4 ${className}`}
      aria-label="O Livro dos Nomes da Patrulha da Noite"
    >
      {/* Cabeçalho */}
      <div className="flex items-center justify-between border-b border-[var(--borda)] pb-3">
        <div className="flex items-center gap-2">
          <Feather className="w-5 h-5 text-[var(--ouro)]" />
          <h3 className="font-cinzel font-bold text-sm text-[var(--ouro)]">
            O Livro dos Nomes
          </h3>
        </div>
        <span className="text-[11px] font-garamond italic text-[var(--ouro-claro)]">
          Memorial dos Caídos & Honrados
        </span>
      </div>

      {/* Registro do Protagonista */}
      <div className="p-3 bg-[var(--pergaminho-3)] border border-[var(--ouro-escuro)] rounded-xl space-y-1">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-[var(--ouro)]" />
            <span className="font-cinzel font-bold text-xs text-[var(--ouro)]">
              {nomeJogador}
            </span>
          </div>
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-[var(--pergaminho-2)] text-[var(--ouro-claro)] border border-[var(--borda)]">
            A Sentinela Viva
          </span>
        </div>
        <p className="text-xs text-[var(--tinta-suave)] font-garamond italic">
          «Aquele que esteve na escadaria, no portão e no conselho, cujo aço e voto impediram que o reino dos homens caísse na escuridão».
        </p>
      </div>

      {/* Lista de Nomes do Memorial */}
      <div className="space-y-3 max-h-[360px] overflow-y-auto pr-1">
        {entradasGravadas.map((item) => {
          const gravado = Boolean(flags[item.flag]);
          return (
            <div
              key={item.id}
              className={`p-3 rounded-xl border transition-all ${
                gravado
                  ? 'bg-[var(--pergaminho-3)] border-[var(--borda)] shadow-sm'
                  : 'bg-[var(--pergaminho-1)] border-[var(--borda)] opacity-70'
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h4 className="font-cinzel text-xs font-bold text-[var(--tinta)]">
                    {item.nome}
                  </h4>
                  <p className="text-[11px] text-[var(--tinta-suave)] font-garamond">
                    {item.titulo}
                  </p>
                </div>

                <span
                  className={`text-[9px] font-mono px-1.5 py-0.5 rounded border flex items-center gap-1 ${
                    item.condicao === 'Caído no Cumprimento do Dever'
                      ? 'bg-[var(--carmim)] text-[var(--tinta)] border-red-900/50'
                      : item.condicao === 'Povo Livre'
                      ? 'bg-[var(--pergaminho-2)] text-[var(--ouro)] border-[var(--ouro-escuro)]'
                      : 'bg-emerald-950/60 text-emerald-300 border-emerald-800/50'
                  }`}
                >
                  {item.condicao === 'Caído no Cumprimento do Dever' ? (
                    <Flame className="w-2.5 h-2.5" />
                  ) : item.condicao === 'Povo Livre' ? (
                    <ShieldAlert className="w-2.5 h-2.5" />
                  ) : (
                    <UserCheck className="w-2.5 h-2.5" />
                  )}
                  {item.condicao}
                </span>
              </div>

              <p className="mt-2 text-xs font-garamond leading-relaxed text-[var(--tinta)]">
                {item.registro}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
