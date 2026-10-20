'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import {
  listarSlotsJornada,
  salvarSlot,
  SaveSlot,
  obterSlot,
  exportarSave,
  importarSave,
} from '@/server/engine/saveManager';
import { FichaPersonagem, WorldState, AtributoVoz, obterCompanheirosIniciais } from '@/server/engine/rpgEngine';
import {
  Play,
  RotateCcw,
  Download,
  Upload,
  Sparkles,
  BookOpen,
  Crown,
  Scroll,
  LogOut,
  X,
  Swords,
  Eye,
  Shield,
} from 'lucide-react';

interface JornadaInfo {
  id: string;
  numero: number;
  titulo: string;
  periodo: string;
  descricao: string;
  ativa: boolean;
  protagonista: {
    id: string;
    nome: string;
    titulo: string;
    origem: string;
    atributos: Record<AtributoVoz, number>;
  };
}

const JORNADAS_DISPONIVEIS: JornadaInfo[] = [
  {
    id: 'conquista_aegon',
    numero: 1,
    titulo: 'A Conquista de Aegon',
    periodo: '2 a.C. a 1 d.C.',
    descricao:
      'Unifique os Sete Reinos sob a dinastia Targaryen a partir da Mesa Pintada com Balerion, Vhagar e Meraxes.',
    ativa: true,
    protagonista: {
      id: 'aegon-conquistador',
      nome: 'Aegon I Targaryen',
      titulo: 'Senhor de Pedra do Dragão',
      origem: 'sangue_valiriano',
      atributos: {
        comando: 5,
        furia: 4,
        astucia: 3,
        cortesia: 3,
        erudicao: 3,
        pressagio: 4,
      },
    },
  },
  {
    id: 'jornada_2_danca',
    numero: 2,
    titulo: 'A Dança dos Dragões',
    periodo: '129 d.C. a 131 d.C.',
    descricao:
      'A sangrenta guerra civil entre Pretos e Verdes pela sucessão do Trono de Ferro com fogo e sangue.',
    ativa: true,
    protagonista: {
      id: 'rhaenyra-targaryen',
      nome: 'Rhaenyra Targaryen',
      titulo: 'A Rainha dos Sete Reinos',
      origem: 'sangue_valiriano',
      atributos: {
        comando: 4,
        furia: 4,
        astucia: 4,
        cortesia: 4,
        erudicao: 3,
        pressagio: 3,
      },
    },
  },
  {
    id: 'jornada_3_guerra_tronos',
    numero: 3,
    titulo: 'A Guerra dos Cinco Reis',
    periodo: '298 d.C. em diante',
    descricao:
      'A conspiração das grandes Casas após a morte de Jon Arryn e o colapso do reinado de Robert Baratheon.',
    ativa: true,
    protagonista: {
      id: 'eddard-stark',
      nome: 'Eddard Stark',
      titulo: 'Senhor de Winterfell & Protetor do Norte',
      origem: 'honra_do_norte',
      atributos: {
        comando: 4,
        furia: 3,
        astucia: 2,
        cortesia: 3,
        erudicao: 4,
        pressagio: 4,
      },
    },
  },
];

const ORIGENS_DISPONIVEIS = [
  { id: 'sangue_valiriano', nome: 'Sangue Valiriano', desc: 'A afinidade milenar com as chamas e o vínculo ancestral com montarias aladas.' },
  { id: 'honra_do_norte', nome: 'Honra do Norte', desc: 'A têmpera dos Primeiros Homens, a palavra inquebrável e a lealdade do represeiro.' },
  { id: 'astucia_rochedo', nome: 'Astúcia de Rochedo', desc: 'O poderio das minas de ouro, os subornos e as manobras implacáveis da corte.' },
  { id: 'furia_tempestade', nome: 'Fúria da Tempestade', desc: 'A coragem tempestuosa dos guerreiros costeiros, bravura em duelo de machado e aço.' },
  { id: 'sangue_roinar', nome: 'Sangue Roinar', desc: 'Insubmisso, Incurvado, Inquebrável: guerrilha do deserto e soberania das areias.' },
  { id: 'homem_de_ferro', nome: 'Homem de Ferro', desc: 'O preço do ferro, as galés saqueadoras e a recusa da servidão a qualquer coroa.' },
];

export default function PainelPage() {
  const router = useRouter();
  const [jornadaSelecionada, setJornadaSelecionada] = useState<string>('conquista_aegon');
  const [slots, setSlots] = useState<(SaveSlot | null)[]>([null, null, null]);
  const [feedback, setFeedback] = useState<string | null>(null);

  // Estado do Modal Baldur's Gate 3 para "Novo Jogo"
  const [modalNovoJogoAberto, setModalNovoJogoAberto] = useState(false);
  const [slotNovoJogo, setSlotNovoJogo] = useState<number | null>(null);
  const [tipoCriacao, setTipoCriacao] = useState<'canonico' | 'customizado'>('canonico');
  const [nomeCustom, setNomeCustom] = useState('');
  const [tituloCustom, setTituloCustom] = useState('');
  const [origemCustom, setOrigemCustom] = useState('sangue_valiriano');
  const [atributosCustom, setAtributosCustom] = useState<Record<AtributoVoz, number>>({
    comando: 4,
    furia: 4,
    astucia: 3,
    cortesia: 3,
    erudicao: 4,
    pressagio: 4,
  });

  const jornadaInfoAtual =
    JORNADAS_DISPONIVEIS.find((j) => j.id === jornadaSelecionada) || JORNADAS_DISPONIVEIS[0];

  const carregarSlots = useCallback(async () => {
    const slotsCarregados = await listarSlotsJornada('player_default', jornadaSelecionada);
    setSlots(slotsCarregados);
  }, [jornadaSelecionada]);

  useEffect(() => {
    carregarSlots();
  }, [carregarSlots]);

  function abrirModalNovoJogo(slotNum: number) {
    setSlotNovoJogo(slotNum);
    setTipoCriacao('canonico');
    setNomeCustom(jornadaInfoAtual.protagonista.nome);
    setTituloCustom(jornadaInfoAtual.protagonista.titulo);
    setOrigemCustom(jornadaInfoAtual.protagonista.origem);
    setAtributosCustom({ ...jornadaInfoAtual.protagonista.atributos });
    setModalNovoJogoAberto(true);
  }

  async function handleConfirmarCriacao() {
    if (!slotNovoJogo) return;

    let characterSheet: FichaPersonagem;
    let currentNodeId = 'j1_a1_mesa_pintada';
    let capituloTitulo = 'Ato I - A Mesa Pintada';
    let choiceMade = 'Reunir os meistres e vassalos na Mesa Pintada';

    if (jornadaSelecionada === 'jornada_2_danca') {
      currentNodeId = 'j2_a1_morte_viserys_conselho_verde';
      capituloTitulo = 'Ato I - A Morte do Rei Viserys';
      choiceMade = 'Reunir o Conselho Negro em Pedra do Dragão';
    } else if (
      jornadaSelecionada === 'jornada_3_guerra_tronos' ||
      jornadaSelecionada === 'guerra_tronos'
    ) {
      currentNodeId = 'j3_a1_execucao_desertor_lobos';
      capituloTitulo = 'Ato I - A Lâmina de Gelo & A Ninhada na Neve';
      choiceMade = 'Executar o desertor e adotar a ninhada de lobos';
    }

    const companheirosIniciais = obterCompanheirosIniciais(jornadaSelecionada);

    if (tipoCriacao === 'canonico') {
      const proto = jornadaInfoAtual.protagonista;
      characterSheet = {
        id: proto.id,
        nome: proto.nome,
        titulo: proto.titulo,
        origem: proto.origem,
        inspiracao: 2,
        atributos: { ...proto.atributos },
        estado: {
          sangue: 10,
          compostura: 10,
          honra: 5,
        },
        cicatrizes: [],
        segredos: ['As crônicas secretas da Cidadela sobre Westeros'],
        companheiros: companheirosIniciais,
      };
    } else {
      characterSheet = {
        id: `custom_${Date.now()}`,
        nome: nomeCustom.trim() || 'Lorde de Westeros',
        titulo: tituloCustom.trim() || 'Senhor de Terras Antigas',
        origem: origemCustom,
        inspiracao: 2,
        atributos: { ...atributosCustom },
        estado: {
          sangue: 10,
          compostura: 10,
          honra: 5,
        },
        cicatrizes: [],
        segredos: ['As profecias e segredos da vossa linhagem ancestral'],
        companheiros: companheirosIniciais,
      };
    }

    const novoSave: SaveSlot = {
      slotNumber: slotNovoJogo,
      userId: 'player_default',
      jornadaId: jornadaSelecionada,
      contentVersion: '1.0.0',
      currentNodeId,
      characterSheet,
      worldState: {
        reputacaoCasas: { [jornadaSelecionada]: 10 },
        flagsBorboleta: { jogo_iniciado: true },
        marcosConcluidos: ['inicio_campanha'],
      },
      chapterCheckpoint: {
        atoId: 'ato_1',
        capituloTitulo,
        timestamp: new Date().toISOString(),
        dataFiccao: jornadaInfoAtual.periodo,
        snapshotFicha: characterSheet,
      },
      turnHistory: [
        {
          slotId: `slot_${slotNovoJogo}`,
          userId: 'player_default',
          turnNumber: 1,
          nodeId: currentNodeId,
          choiceMade,
          stateDelta: {},
          timestamp: new Date().toISOString(),
        },
      ],
      updatedAt: new Date().toISOString(),
    };

    await salvarSlot(novoSave);
    await carregarSlots();
    setModalNovoJogoAberto(false);
    setFeedback(`Novo jogo iniciado com ${characterSheet.nome} no Slot ${slotNovoJogo}!`);
    router.push(`/jogar?journey=${jornadaSelecionada}&slot=${slotNovoJogo}`);
  }

  async function handleDesfazerTurno(slotNumber: number) {
    const slot = await obterSlot('player_default', jornadaSelecionada, slotNumber);
    if (!slot || slot.turnHistory.length <= 1) {
      setFeedback('Não é possível desfazer o primeiro turno da campanha.');
      return;
    }

    const historicoAtualizado = slot.turnHistory.slice(0, -1);
    const ultimoTurno = historicoAtualizado[historicoAtualizado.length - 1];

    const slotAtualizado: SaveSlot = {
      ...slot,
      currentNodeId: ultimoTurno.nodeId,
      turnHistory: historicoAtualizado,
      updatedAt: new Date().toISOString(),
    };

    await salvarSlot(slotAtualizado);
    await carregarSlots();
    setFeedback(`Último turno desfeito com sucesso no Slot ${slotNumber}.`);
  }

  async function handleExportarSave(slotNumber: number) {
    const json = await exportarSave('player_default', jornadaSelecionada, slotNumber);
    if (!json) {
      setFeedback('Nenhum dado encontrado para exportação neste slot.');
      return;
    }

    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `gelo_fogo_${jornadaSelecionada}_slot_${slotNumber}.json`;
    a.click();
    URL.revokeObjectURL(url);
    setFeedback(`Pergaminho do Slot ${slotNumber} exportado.`);
  }

  function handleImportarSave(e: React.ChangeEvent<HTMLInputElement>, slotNumber: number) {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (event) => {
      try {
        const conteudo = event.target?.result as string;
        await importarSave(conteudo, 'player_default', slotNumber);
        await carregarSlots();
        setFeedback(`Pergaminho importado com sucesso para o Slot ${slotNumber}.`);
      } catch (err) {
        setFeedback('Falha ao restaurar o pergaminho. Arquivo corrompido ou formato inválido.');
      }
    };
    reader.readAsText(file);
  }

  const somaAtributos = Object.values(atributosCustom).reduce((a, b) => a + b, 0);

  return (
    <main className="min-h-screen bg-[#0a0a0c] text-slate-100 p-6 md:p-12 font-sans">
      <div className="max-w-6xl mx-auto space-y-10">
        
        {/* Cabeçalho do Painel */}
        <header className="flex flex-col md:flex-row md:items-center justify-between border-b border-slate-800 pb-6 gap-4">
          <div>
            <div className="flex items-center gap-2">
              <Crown className="w-6 h-6 text-amber-500" />
              <h1 className="text-3xl font-extrabold font-serif tracking-wider text-amber-400">
                A Fortaleza da Memória
              </h1>
            </div>
            <p className="text-slate-400 text-sm mt-1">
              Painel de Crônicas &bull; As Crônicas de Gelo e Fogo RPG
            </p>
          </div>

          <button
            onClick={() => router.push('/login')}
            className="flex items-center gap-2 px-4 py-2 bg-slate-900 border border-slate-700/80 hover:bg-slate-800 rounded-lg text-xs font-semibold text-slate-300 transition cursor-pointer self-start md:self-auto"
          >
            <LogOut className="w-4 h-4 text-slate-400" />
            <span>Sair da Fortaleza</span>
          </button>
        </header>

        {/* Mensagem de Feedback */}
        {feedback && (
          <div className="p-4 bg-[#1a151b] border border-amber-500/40 rounded-xl text-amber-200 text-sm flex items-center justify-between">
            <span>{feedback}</span>
            <button
              onClick={() => setFeedback(null)}
              className="text-xs text-amber-400 underline cursor-pointer ml-4"
            >
              Fechar
            </button>
          </div>
        )}

        {/* Seletor das 3 Grandes Eras / Jornadas */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold font-serif text-slate-200 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-amber-500" />
              <span>Escolha a Era Histórica de Westeros</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {JORNADAS_DISPONIVEIS.map((j) => {
              const selecionada = jornadaSelecionada === j.id;

              return (
                <div
                  key={j.id}
                  onClick={() => setJornadaSelecionada(j.id)}
                  className={`p-5 rounded-xl border transition-all cursor-pointer relative overflow-hidden ${
                    selecionada
                      ? 'bg-gradient-to-b from-[#1c1417] to-[#120f12] border-amber-500/80 shadow-xl shadow-amber-950/20'
                      : 'bg-[#121217] border-slate-800/80 hover:border-slate-700 opacity-80 hover:opacity-100'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-amber-500/90">
                      Jornada {j.numero}
                    </span>
                    <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded ${
                      j.ativa ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-800/50' : 'bg-slate-800 text-slate-400'
                    }`}>
                      {j.ativa ? 'Canônica Ativa' : 'Em Breve'}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold font-serif text-slate-100 mb-1">{j.titulo}</h3>
                  <p className="text-xs text-amber-300/80 mb-3">{j.periodo}</p>
                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">{j.descricao}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Gerenciamento dos 3 Slots de Save da Jornada Selecionada */}
        <section className="bg-[#121216] border border-slate-800/80 rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold font-serif text-amber-400">
                Slots de Progresso
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                3 posições de memória salvas no Supabase com sincronização local
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((slotNum) => {
              const slot = slots[slotNum - 1];

              return (
                <div
                  key={slotNum}
                  className="bg-[#0e0e12] border border-slate-800 rounded-lg p-5 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3 border-b border-slate-800/60 pb-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                        Slot {slotNum}
                      </span>
                      <span className={`text-[10px] uppercase px-2 py-0.5 rounded font-bold ${
                        slot ? 'bg-amber-950/80 text-amber-400 border border-amber-700/50' : 'bg-slate-900 text-slate-500'
                      }`}>
                        {slot ? 'Ativo' : 'Vazio'}
                      </span>
                    </div>

                    {slot ? (
                      <div className="space-y-3 mb-6">
                        <div>
                          <p className="text-sm font-bold text-slate-200">{slot.characterSheet.nome}</p>
                          <p className="text-xs text-amber-500/80">{slot.chapterCheckpoint.capituloTitulo}</p>
                        </div>

                        {/* Barras de Estado */}
                        <div className="grid grid-cols-3 gap-2 text-center text-[11px] bg-slate-900/60 p-2 rounded border border-slate-800">
                          <div>
                            <span className="text-red-400 block font-bold">Sangue</span>
                            <span>{slot.characterSheet.estado.sangue}/10</span>
                          </div>
                          <div>
                            <span className="text-blue-400 block font-bold">Compost.</span>
                            <span>{slot.characterSheet.estado.compostura}/10</span>
                          </div>
                          <div>
                            <span className="text-amber-400 block font-bold">Honra</span>
                            <span>{slot.characterSheet.estado.honra}</span>
                          </div>
                        </div>

                        <div className="text-[11px] text-slate-400 flex items-center justify-between">
                          <span>Turnos jogados: <strong className="text-slate-200">{slot.turnHistory.length}</strong></span>
                          <span className="text-amber-400">★ {slot.characterSheet.inspiracao ?? 2}/4</span>
                        </div>
                      </div>
                    ) : (
                      <div className="py-10 text-center text-slate-600 space-y-2">
                        <Scroll className="w-8 h-8 mx-auto stroke-1" />
                        <p className="text-xs">Nenhuma crônica registrada neste pergaminho.</p>
                      </div>
                    )}
                  </div>

                  {/* Ações do Slot */}
                  <div className="space-y-2 pt-4 border-t border-slate-800/60">
                    {slot ? (
                      <>
                        <button
                          onClick={() => router.push(`/jogar?journey=${jornadaSelecionada}&slot=${slotNum}`)}
                          className="w-full py-2 bg-amber-600 hover:bg-amber-500 text-black font-bold text-xs rounded transition flex items-center justify-center gap-1.5 cursor-pointer shadow-md"
                        >
                          <Play className="w-3.5 h-3.5 fill-current" />
                          <span>Continuar Jornada</span>
                        </button>

                        <button
                          onClick={() => handleDesfazerTurno(slotNum)}
                          className="w-full py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs rounded transition flex items-center justify-center gap-1.5 cursor-pointer"
                        >
                          <RotateCcw className="w-3.5 h-3.5" />
                          <span>Desfazer Último Turno</span>
                        </button>

                        <div className="grid grid-cols-2 gap-2 pt-1">
                          <button
                            onClick={() => handleExportarSave(slotNum)}
                            className="py-1.5 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 text-[11px] rounded transition flex items-center justify-center gap-1 cursor-pointer"
                          >
                            <Download className="w-3 h-3 text-amber-500" />
                            <span>Exportar</span>
                          </button>

                          <label className="py-1.5 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 text-[11px] rounded transition flex items-center justify-center gap-1 cursor-pointer text-center">
                            <Upload className="w-3 h-3 text-amber-500" />
                            <span>Importar</span>
                            <input
                              type="file"
                              accept=".json"
                              onChange={(e) => handleImportarSave(e, slotNum)}
                              className="hidden"
                            />
                          </label>
                        </div>
                      </>
                    ) : (
                      <button
                        onClick={() => abrirModalNovoJogo(slotNum)}
                        className="w-full py-2.5 bg-red-950 hover:bg-red-900 border border-red-800/60 text-amber-400 font-bold text-xs rounded transition flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Novo Jogo</span>
                      </button>
                    )}
                  </div>

                </div>
              );
            })}
          </div>
        </section>

      </div>

      {/* MODAL BALDUR'S GATE 3: NOVO JOGO & CRIAÇÃO DE PERSONAGEM */}
      {modalNovoJogoAberto && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#171412] border-2 border-[#C5A059] rounded-2xl max-w-2xl w-full p-6 sm:p-8 text-[#E6DEC8] shadow-2xl relative max-h-[90vh] overflow-y-auto font-garamond">
            {/* Fechar */}
            <button
              onClick={() => setModalNovoJogoAberto(false)}
              className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-amber-200 hover:bg-white/5 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <header className="text-center pb-4 border-b border-[#C5A059]/30">
              <span className="text-[11px] font-cinzel uppercase tracking-[0.25em] text-[#C5A059] font-bold">
                {jornadaInfoAtual.titulo}
              </span>
              <h2 className="text-2xl font-cinzel font-bold text-amber-200 mt-1 uppercase">
                Origem & Ficha do Protagonista
              </h2>
            </header>

            {/* Alternador Canônico vs Customizado */}
            <div className="grid grid-cols-2 gap-2 my-5 p-1 bg-[#100e0c] border border-stone-800 rounded-xl font-cinzel text-xs font-bold">
              <button
                type="button"
                onClick={() => setTipoCriacao('canonico')}
                className={`py-2 px-3 rounded-lg transition-all flex items-center justify-center gap-2 cursor-pointer ${
                  tipoCriacao === 'canonico'
                    ? 'bg-[#C5A059] text-stone-950 shadow'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Crown className="w-4 h-4" />
                <span>Protagonista Canônico</span>
              </button>
              <button
                type="button"
                onClick={() => setTipoCriacao('customizado')}
                className={`py-2 px-3 rounded-lg transition-all flex items-center justify-center gap-2 cursor-pointer ${
                  tipoCriacao === 'customizado'
                    ? 'bg-[#C5A059] text-stone-950 shadow'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Sparkles className="w-4 h-4" />
                <span>Customizar Ficha & Traço</span>
              </button>
            </div>

            {tipoCriacao === 'canonico' ? (
              <div className="space-y-4 bg-[#12100E] border border-stone-800 p-5 rounded-xl">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-red-950 border-2 border-[#C5A059] flex items-center justify-center text-[#C5A059]">
                    <Crown className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-lg font-cinzel font-bold text-amber-200">
                      {jornadaInfoAtual.protagonista.nome}
                    </h3>
                    <p className="text-xs text-slate-400 font-cinzel">
                      {jornadaInfoAtual.protagonista.titulo}
                    </p>
                    <span className="inline-block mt-1 text-[10px] font-cinzel uppercase px-2 py-0.5 rounded bg-red-950/80 border border-red-700/60 text-red-300 font-bold">
                      {jornadaInfoAtual.protagonista.origem.replace(/_/g, ' ')}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 text-xs font-cinzel pt-2">
                  {Object.entries(jornadaInfoAtual.protagonista.atributos).map(([attr, val]) => (
                    <div key={attr} className="p-2 rounded bg-black/40 border border-stone-800 flex justify-between">
                      <span className="capitalize text-slate-300">{attr}:</span>
                      <strong className="text-amber-400">{val}</strong>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-cinzel uppercase tracking-wider text-amber-400 mb-1">
                      Nome do Protagonista
                    </label>
                    <input
                      type="text"
                      value={nomeCustom}
                      onChange={(e) => setNomeCustom(e.target.value)}
                      placeholder="Ex.: Valerius Targaryen"
                      className="w-full p-2.5 rounded-lg bg-[#100e0c] border border-stone-700 text-sm text-slate-100 focus:outline-none focus:border-[#C5A059]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-cinzel uppercase tracking-wider text-amber-400 mb-1">
                      Título Nobiliárquico
                    </label>
                    <input
                      type="text"
                      value={tituloCustom}
                      onChange={(e) => setTituloCustom(e.target.value)}
                      placeholder="Ex.: Herdeiro de Pedra do Dragão"
                      className="w-full p-2.5 rounded-lg bg-[#100e0c] border border-stone-700 text-sm text-slate-100 focus:outline-none focus:border-[#C5A059]"
                    />
                  </div>
                </div>

                {/* Seleção de Traço de Origem */}
                <div>
                  <label className="block text-xs font-cinzel uppercase tracking-wider text-amber-400 mb-1.5">
                    Traço de Origem (Baldur&apos;s Gate 3)
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {ORIGENS_DISPONIVEIS.map((origem) => (
                      <div
                        key={origem.id}
                        onClick={() => setOrigemCustom(origem.id)}
                        className={`p-2.5 rounded-lg border text-xs cursor-pointer transition-all ${
                          origemCustom === origem.id
                            ? 'bg-amber-950/60 border-amber-500 text-amber-200'
                            : 'bg-[#100e0c] border-stone-800 text-slate-400 hover:border-stone-700'
                        }`}
                      >
                        <strong className="block font-cinzel">{origem.nome}</strong>
                        <span className="text-[11px] text-slate-400 font-garamond">{origem.desc}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Distribuição dos 6 Atributos */}
                <div className="pt-2">
                  <div className="flex items-center justify-between text-xs font-cinzel mb-2">
                    <span className="text-amber-400 uppercase tracking-wider">
                      Distribuir Pontos nos 6 Atributos-Vozes
                    </span>
                    <span className="text-slate-400">Total: {somaAtributos} / 22 pts</span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs font-cinzel">
                    {(Object.keys(atributosCustom) as AtributoVoz[]).map((attr) => (
                      <div
                        key={attr}
                        className="p-2 rounded-lg bg-[#100e0c] border border-stone-800 flex items-center justify-between"
                      >
                        <span className="capitalize text-slate-300">{attr}</span>
                        <div className="flex items-center gap-1.5">
                          <button
                            type="button"
                            onClick={() => {
                              if (atributosCustom[attr] > 1) {
                                setAtributosCustom({
                                  ...atributosCustom,
                                  [attr]: atributosCustom[attr] - 1,
                                });
                              }
                            }}
                            className="w-5 h-5 rounded bg-stone-800 hover:bg-stone-700 text-slate-200 flex items-center justify-center font-bold"
                          >
                            -
                          </button>
                          <span className="w-4 text-center font-bold text-amber-400">
                            {atributosCustom[attr]}
                          </span>
                          <button
                            type="button"
                            onClick={() => {
                              if (atributosCustom[attr] < 5 && somaAtributos < 24) {
                                setAtributosCustom({
                                  ...atributosCustom,
                                  [attr]: atributosCustom[attr] + 1,
                                });
                              }
                            }}
                            className="w-5 h-5 rounded bg-stone-800 hover:bg-stone-700 text-slate-200 flex items-center justify-center font-bold"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Rodapé de Confirmação */}
            <div className="mt-6 pt-4 border-t border-[#C5A059]/30 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setModalNovoJogoAberto(false)}
                className="px-4 py-2 rounded-lg bg-stone-800 hover:bg-stone-700 text-slate-300 font-cinzel text-xs font-bold uppercase tracking-wider cursor-pointer"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleConfirmarCriacao}
                className="px-6 py-2 rounded-lg bg-gradient-to-r from-amber-600 via-amber-500 to-yellow-600 hover:from-amber-500 hover:to-yellow-500 text-stone-950 font-cinzel text-xs font-bold uppercase tracking-wider shadow-lg shadow-amber-900/40 cursor-pointer flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4 fill-current" />
                <span>Iniciar Crônica</span>
              </button>
            </div>

          </div>
        </div>
      )}
    </main>
  );
}
