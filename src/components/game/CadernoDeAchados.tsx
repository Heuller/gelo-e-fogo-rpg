'use client';

import React, { useState } from 'react';
import { BookOpen, CheckCircle2, Lock, Search } from 'lucide-react';

export interface AchadoMarginalia {
  flag: string;
  titulo: string;
  ancora: string;
  livro: string;
  capitulo: string;
  resumo: string;
  notaCidadela: string;
}

export const LISTA_ACHADOS_MURALHA: AchadoMarginalia[] = [
  {
    flag: 'ea_trompas',
    titulo: 'O Código das Trompas',
    ancora: 'C26',
    livro: 'A Tormenta de Espadas',
    capitulo: 'Prólogo / Samwell I',
    resumo: 'Um toque para irmãos que retornam; dois para selvagens; três para os Outros.',
    notaCidadela: 'Os arquivos de Castelo Negro registram que os três toques não soavam há oito mil anos, desde a Longa Noite e a construção da Muralha.',
  },
  {
    flag: 'ea_corvos_nos_caibros',
    titulo: 'Os Corvos nos Caibros',
    ancora: 'C2',
    livro: 'A Guerra dos Tronos',
    capitulo: 'Jon VII',
    resumo: 'Aves negras que habitam as vigas de pinheiro do refeitório comum.',
    notaCidadela: 'Os corvos de Castelo Negro são maiores e mais resistentes que os do sul; Meistre Aemon os treinou para voar mesmo em tempestades moderadas.',
  },
  {
    flag: 'ea_tres_carnes',
    titulo: 'O Ensopado de Três Carnes',
    ancora: 'C27',
    livro: 'A Guerra dos Tronos',
    capitulo: 'Jon V',
    resumo: 'O prato lendário de Hobb Três-Dedos que todos juram ser apenas carneiro velho.',
    notaCidadela: 'A culinária da Patrulha depende de salga pesada e ervas de turfa para disfarçar carnes guardadas por invernos inteiros nas geleiras.',
  },
  {
    flag: 'ea_creme_de_trigo',
    titulo: 'Creme de Trigo com Mel',
    ancora: 'C27',
    livro: 'A Tormenta de Espadas',
    capitulo: 'Samwell II',
    resumo: 'A refeição reconfortante servida antes de marchas árduas na neve.',
    notaCidadela: 'O mel de abelhas da Dádiva é escasso e reservado principalmente aos doentes e oficiais superiores.',
  },
  {
    flag: 'ea_aco_ferro_cobre',
    titulo: 'Aço, Ferro e Cobre',
    ancora: 'C25',
    livro: 'A Fúria dos Reis',
    capitulo: 'Jon I',
    resumo: 'Donal Noye descreve os três irmãos Baratheon com precisão de ferreiro.',
    notaCidadela: '«Robert era o aço verdadeiro; Stannis é o ferro puro, duro e quebradiço; Renly não passa de cobre brilhante que reluz mas não corta».',
  },
  {
    flag: 'ea_stannis_ferro',
    titulo: 'O Ferro que Não Dobra',
    ancora: 'C25, C32',
    livro: 'A Tormenta de Espadas',
    capitulo: 'Jon XI',
    resumo: 'A profecia de Donal Noye cumprida na vitória de Stannis sobre os selvagens.',
    notaCidadela: 'Stannis louvou publicamente a bravura de Donal Noye na defesa do portão de ferro, reconhecendo o valor do antigo armeiro de sua Casa.',
  },
  {
    flag: 'ea_aemon_dragao',
    titulo: 'O Sangue de Dragão de Aemon',
    ancora: 'C24',
    livro: 'A Fúria dos Reis',
    capitulo: 'Jon I',
    resumo: 'Meistre Aemon Targaryen recusou a coroa de Westeros em 233 d.C.',
    notaCidadela: 'Filho do Rei Maekar I, Aemon abriu mão do Trono de Ferro em favor do irmão mais novo, Aegon V (Egg), para servir a Patrulha da Noite sem ambições políticas.',
  },
  {
    flag: 'ea_lorde_snow',
    titulo: 'Lorde Snow',
    ancora: 'C29',
    livro: 'A Guerra dos Tronos',
    capitulo: 'Jon III',
    resumo: 'O deboche cruel de Sor Alliser Thorne que se tornou título de glória.',
    notaCidadela: 'Thorne usava o epíteto para lembrar a bastardia de Jon; os irmãos mais humildes o adotaram como clamor de lealdade e afeto militar.',
  },
  {
    flag: 'ea_muralha_chora',
    titulo: 'A Muralha que Chora',
    ancora: 'C30',
    livro: 'A Guerra dos Tronos',
    capitulo: 'Jon VI',
    resumo: 'O derretimento superficial do gelo milenar sob o sol e o calor de fogueiras.',
    notaCidadela: 'No verão e sob fogo, torrentes de água escorrem pela face sul da Muralha, criando cascatas brilhantes antes de congelarem novamente na madrugada.',
  },
  {
    flag: 'ea_muralha_se_defende',
    titulo: 'A Muralha Se Defende',
    ancora: 'C30',
    livro: 'A Tormenta de Espadas',
    capitulo: 'Jon VII',
    resumo: 'Placas colossais de gelo que se soltam sozinhas para esmagar os invasores.',
    notaCidadela: 'Os construtores acreditam que as fundações imbuídas de magias antigas dos Primeiros Homens e dos Filhos da Floresta repelem escaladores com avalanches vivas.',
  },
  {
    flag: 'ea_trompa_de_joramun',
    titulo: 'A Trompa de Joramun',
    ancora: 'C31',
    livro: 'A Tormenta de Espadas',
    capitulo: 'Jon IV, Jon X',
    resumo: 'A lendária Corneta de Inverno com poder de derrubar a Muralha de gelo.',
    notaCidadela: 'Dizem as cantigas dos selvagens que Joramun acordou os gigantes da terra ao tocar a grande trompa esculpida em chifre de auroque ancestral.',
  },
  {
    flag: 'ea_numeros_de_marsh',
    titulo: 'A Contabilidade de Bowen Marsh',
    ancora: 'C8',
    livro: 'A Tormenta de Espadas',
    capitulo: 'Jon II',
    resumo: 'O Intendente-Chefe que enxerga o mundo através de rações e inventários.',
    notaCidadela: 'Bowen Marsh mede a guerra em barris de carne seca e sacos de cevada; sua preocupação constante com a fome moldou a política de abastecimento de Castelo Negro.',
  },
  {
    flag: 'ea_sentinela_edd',
    titulo: 'O Boneco de Palha «Edd»',
    ancora: 'C11',
    livro: 'A Tormenta de Espadas',
    capitulo: 'Jon VI',
    resumo: 'O sentinela de estopa batizado em homenagem a Dolorous Edd Tollett.',
    notaCidadela: 'O estratagema de Meistre Aemon de vestir bonecos com mantos negros nos parapeitos iludiu os batedores Thenn sobre o número real de defensores.',
  },
  {
    flag: 'ea_cinco_votos_de_hobb',
    titulo: 'Cinco Votos no Cozinheiro',
    ancora: 'C23',
    livro: 'A Tormenta de Espadas',
    capitulo: 'Samwell V',
    resumo: 'Cinco irmãos negros votaram em Hobb Três-Dedos para Senhor Comandante.',
    notaCidadela: 'O protesto satírico de alguns irmãos durante o impasse da eleição quase transformou o cozinheiro de Castelo Negro em candidato de compromisso.',
  },
];

export interface CadernoDeAchadosProps {
  flags: Record<string, boolean | string | number>;
  className?: string;
}

export function CadernoDeAchados({ flags, className = '' }: CadernoDeAchadosProps) {
  const [filtroTexto, setFiltroTexto] = useState('');

  const achadosComStatus = LISTA_ACHADOS_MURALHA.map((item) => {
    const desbloqueado = Boolean(flags[item.flag] || flags[`tick_${item.flag}`]);
    return { ...item, desbloqueado };
  });

  const totalDesbloqueados = achadosComStatus.filter((a) => a.desbloqueado).length;
  const total = LISTA_ACHADOS_MURALHA.length;
  const porcentagem = Math.round((totalDesbloqueados / total) * 100);

  const achadosFiltrados = achadosComStatus.filter(
    (item) =>
      item.titulo.toLowerCase().includes(filtroTexto.toLowerCase()) ||
      item.resumo.toLowerCase().includes(filtroTexto.toLowerCase()) ||
      item.ancora.toLowerCase().includes(filtroTexto.toLowerCase())
  );

  return (
    <div
      className={`bg-[var(--pergaminho-2)] border border-[var(--borda)] rounded-2xl p-4 shadow-md space-y-4 ${className}`}
      aria-label="Caderno de Achados e Marginálias da Cidadela"
    >
      {/* Cabeçalho */}
      <div className="flex items-center justify-between border-b border-[var(--borda)] pb-3">
        <div className="flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-[var(--ouro)]" />
          <h3 className="font-cinzel font-bold text-sm text-[var(--ouro)]">
            Caderno de Achados
          </h3>
        </div>
        <div className="text-right">
          <span className="font-cinzel text-xs font-bold text-[var(--ouro-claro)]">
            {totalDesbloqueados}/{total}
          </span>
          <span className="text-[10px] text-[var(--tinta-fraca)] ml-1">
            ({porcentagem}%)
          </span>
        </div>
      </div>

      {/* Barra de Progresso */}
      <div className="w-full bg-[var(--pergaminho-3)] h-2 rounded-full overflow-hidden border border-[var(--borda)]">
        <div
          className="bg-gradient-to-r from-[var(--ouro-escuro)] to-[var(--ouro-claro)] h-full transition-all duration-500 rounded-full"
          style={{ width: `${porcentagem}%` }}
        />
      </div>

      {/* Campo de Busca Rápida */}
      <div className="relative">
        <Search className="w-3.5 h-3.5 text-[var(--tinta-fraca)] absolute left-3 top-2.5" />
        <input
          type="text"
          value={filtroTexto}
          onChange={(e) => setFiltroTexto(e.target.value)}
          placeholder="Buscar notas e âncoras..."
          className="w-full pl-8 pr-3 py-1.5 text-xs bg-[var(--pergaminho-3)] border border-[var(--borda)] rounded-lg text-[var(--tinta)] placeholder-[var(--tinta-fraca)] focus:outline-none focus:border-[var(--ouro)]"
        />
      </div>

      {/* Lista de Marginálias */}
      <div className="space-y-2.5 max-h-[380px] overflow-y-auto pr-1">
        {achadosFiltrados.map((item) => (
          <div
            key={item.flag}
            className={`p-3 rounded-xl border transition-all ${
              item.desbloqueado
                ? 'bg-[var(--pergaminho-3)] border-[var(--ouro-escuro)] shadow-sm'
                : 'bg-[var(--pergaminho-1)] border-[var(--borda)] opacity-60'
            }`}
          >
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-1.5">
                {item.desbloqueado ? (
                  <CheckCircle2 className="w-4 h-4 text-[var(--ouro)] flex-shrink-0" />
                ) : (
                  <Lock className="w-4 h-4 text-[var(--tinta-fraca)] flex-shrink-0" />
                )}
                <h4 className="font-cinzel text-xs font-bold text-[var(--tinta)]">
                  {item.desbloqueado ? item.titulo : 'Nota Oculta da Cidadela'}
                </h4>
              </div>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[var(--pergaminho-2)] text-[var(--ouro-claro)] border border-[var(--borda)]">
                {item.ancora}
              </span>
            </div>

            {item.desbloqueado ? (
              <div className="mt-2 space-y-1.5 text-xs">
                <p className="font-garamond italic text-[var(--tinta)]">
                  «{item.resumo}»
                </p>
                <div className="p-2 rounded bg-[var(--pergaminho-2)] border-l-2 border-[var(--ouro)] text-[11px] text-[var(--tinta-suave)] leading-relaxed">
                  <span className="font-bold text-[var(--ouro)]">
                    Nota de Margem dos Meistres:
                  </span>{' '}
                  {item.notaCidadela}
                </div>
                <div className="text-[10px] text-[var(--tinta-fraca)] text-right">
                  Fonte: {item.livro} &bull; {item.capitulo}
                </div>
              </div>
            ) : (
              <p className="mt-1.5 text-[11px] text-[var(--tinta-fraca)] italic">
                Desbloqueie examinando pergaminhos ou realizando testes passivos durante a crônica.
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
