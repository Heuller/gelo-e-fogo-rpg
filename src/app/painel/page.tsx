'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { FichaPersonagem } from '@/server/engine/rpgEngine';
import {
  SaveSlot,
  listarSlotsJornada,
  salvarSlot,
  desfazerUltimoTurno,
  exportarSave,
  importarSave,
} from '@/server/engine/saveManager';
import {
  Scroll,
  Play,
  RotateCcw,
  Download,
  Upload,
  LogOut,
  Flame,
  ShieldAlert,
  Crown,
  Sparkles,
} from 'lucide-react';

interface JornadaInfo {
  id: string;
  numero: number;
  titulo: string;
  subtitulo: string;
  periodo: string;
  ativa: boolean;
  descricao: string;
}

const JORNADAS: JornadaInfo[] = [
  {
    id: 'jornada_1_conquista',
    numero: 1,
    titulo: 'A Conquista de Aegon',
    subtitulo: 'Fogo e Sangue na forja dos Sete Reinos',
    periodo: '2 a.C. — 13 d.C.',
    ativa: true,
    descricao: 'Desembarque na Foz da Água Negra, queima de Harrenhal, Campo de Fogo e a Rendição no Tridente.',
  },
  {
    id: 'jornada_2_danca',
    numero: 2,
    titulo: 'A Dança dos Dragões',
    subtitulo: 'A Guerra Civil dos Targaryen',
    periodo: '129 d.C. — 131 d.C.',
    ativa: true,
    descricao: 'Verdes contra Negros. Ponta Tempestade, Semeadura Vermelha, O Olho de Deus e a Hora do Lobo.',
  },
  {
    id: 'jornada_3_guerra_tronos',
    numero: 3,
    titulo: 'A Guerra dos Cinco Reis',
    subtitulo: 'O Inverno se Aproxima',
    periodo: '298 d.C. — 300 d.C.',
    ativa: true,
    descricao: 'A queda de Winterfell, o golpe em Porto Real, Bosque dos Murmúrios e a vingança do Casamento Vermelho.',
  },
];

export default function PainelPage() {
  const router = useRouter();
  const [jornadaSelecionada, setJornadaSelecionada] = useState<string>('jornada_1_conquista');
  const [slots, setSlots] = useState<(SaveSlot | null)[]>([null, null, null]);
  const [loading, setLoading] = useState<boolean>(true);
  const [feedback, setFeedback] = useState<string | null>(null);

  // Usuário autenticado mockado ou do Supabase
  const userId = 'usr_meistre_cidadela';

  useEffect(() => {
    carregarSlots(jornadaSelecionada);
  }, [jornadaSelecionada]);

  async function carregarSlots(jornadaId: string) {
    setLoading(true);
    try {
      const lista = await listarSlotsJornada(userId, jornadaId);
      setSlots(lista);
    } catch (err: any) {
      setFeedback('Erro ao carregar slots: ' + err.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleNovoJogo(slotNumber: number) {
    let characterSheet: FichaPersonagem = {
      id: 'aegon-conquistador',
      nome: 'Aegon I Targaryen',
      origem: 'sangue_valiriano',
      atributos: {
        comando: 5,
        furia: 4,
        astucia: 3,
        cortesia: 3,
        erudicao: 3,
        pressagio: 4,
      },
      estado: {
        sangue: 10,
        compostura: 10,
        honra: 5,
      },
      cicatrizes: [],
      segredos: ['A profecia de Daenys a Sonhadora', 'A carta secreta do Banco de Bravos'],
    };
    let currentNodeId = 'j1_a1_mesa_pintada';
    let capituloTitulo = 'Ato I - A Mesa Pintada';
    let choiceMade = 'Reunir os meistres e vassalos na Mesa Pintada';

    if (jornadaSelecionada === 'jornada_2_danca') {
      characterSheet = {
        id: 'rhaenyra-targaryen',
        nome: 'Rhaenyra Targaryen',
        origem: 'sangue_valiriano',
        atributos: {
          comando: 4,
          furia: 4,
          astucia: 4,
          cortesia: 4,
          erudicao: 3,
          pressagio: 3,
        },
        estado: {
          sangue: 10,
          compostura: 10,
          honra: 5,
        },
        cicatrizes: [],
        segredos: ['O testamento solene de Viserys I', 'A aliança matrimonial com a Casa Velaryon'],
      };
      currentNodeId = 'j2_a1_morte_viserys_conselho_verde';
      capituloTitulo = 'Ato I - Os Dois Conselhos & A Dança Começa';
      choiceMade = 'A Coroação Negra em Pedra do Dragão e a defesa do Trono';
    } else if (jornadaSelecionada === 'jornada_3_guerra_tronos') {
      characterSheet = {
        id: 'eddard-stark',
        nome: 'Eddard Stark',
        origem: 'sangue_primeiros_homens',
        atributos: {
          comando: 5,
          furia: 3,
          astucia: 3,
          cortesia: 3,
          erudicao: 3,
          pressagio: 4,
        },
        estado: {
          sangue: 10,
          compostura: 10,
          honra: 5,
        },
        cicatrizes: [],
        segredos: ['A promessa de Lyanna na Torre da Alegria', 'A carta cifrada de Lysa Arryn'],
      };
      currentNodeId = 'j3_a1_desertor_muralha_execucao';
      capituloTitulo = 'Ato I - O Inverno Está Chegando';
      choiceMade = 'A Sentença e a Execução do Desertor da Patrulha da Noite';
    }

    const novoSlot: SaveSlot = {
      userId,
      jornadaId: jornadaSelecionada,
      slotNumber,
      contentVersion: '1.0.0',
      currentNodeId,
      characterSheet,
      worldState: {
        reputacaoCasas: { Targaryen: 10, Stark: 10 },
        flagsBorboleta: { jogo_iniciado: true },
        marcosConcluidos: ['inicio_campanha'],
      },
      chapterCheckpoint: {
        atoId: 'ato_1',
        capituloTitulo,
        timestamp: new Date().toISOString(),
      },
      turnHistory: [
        {
          slotId: `slot_${slotNumber}`,
          userId,
          turnNumber: 1,
          nodeId: currentNodeId,
          choiceMade,
          stateDelta: {},
          timestamp: new Date().toISOString(),
        },
      ],
    };

    const res = await salvarSlot(novoSlot);
    if (res.sucesso) {
      router.push(`/jogar?journey=${jornadaSelecionada}&slot=${slotNumber}`);
    } else {
      setFeedback('Erro ao salvar novo jogo: ' + (res.erro || 'Erro desconhecido'));
    }
  }

  async function handleDesfazerTurno(slotNumber: number) {
    const res = await desfazerUltimoTurno(userId, jornadaSelecionada, slotNumber);
    if (res.sucesso) {
      setFeedback(`Último turno desfeito no Slot ${slotNumber}. O tempo retrocedeu.`);
      carregarSlots(jornadaSelecionada);
    } else {
      setFeedback(res.motivo || 'Não foi possível retroceder.');
    }
  }

  async function handleExportarSave(slotNumber: number) {
    try {
      const json = await exportarSave(userId, jornadaSelecionada, slotNumber);
      const blob = new Blob([json], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `save_${jornadaSelecionada}_slot_${slotNumber}.json`;
      a.click();
      URL.revokeObjectURL(url);
      setFeedback(`Save do Slot ${slotNumber} exportado em arquivo .json!`);
    } catch (err: any) {
      setFeedback('Falha na exportação: ' + err.message);
    }
  }

  function handleImportarSave(e: React.ChangeEvent<HTMLInputElement>, slotNumber: number) {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (evt) => {
      const content = evt.target?.result as string;
      try {
        await importarSave(content, userId, slotNumber);
        setFeedback(`Save importado com sucesso no Slot ${slotNumber}!`);
        carregarSlots(jornadaSelecionada);
      } catch (err: any) {
        setFeedback('Erro ao importar arquivo de save: ' + err.message);
      }
    };
    reader.readAsText(file);
  }

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push('/login');
  }

  return (
    <main className="min-h-screen bg-[#0a0a0c] text-slate-100 p-6 md:p-10 font-sans">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Cabeçalho do Painel */}
        <header className="flex flex-col md:flex-row md:items-center md:justify-between border-b border-amber-950/60 pb-6 gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg bg-red-950 border border-amber-600/60 flex items-center justify-center text-amber-500 shadow-lg">
              <Crown className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold font-serif text-amber-400">
                Crônicas de Sangue e Gelo
              </h1>
              <p className="text-xs uppercase tracking-wider text-slate-400">
                Painel das Três Grandes Eras de Westeros
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-xs bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-full text-slate-300">
              Meistre: <strong className="text-amber-400">meistre@cidadela.westeros</strong>
            </span>
            <button
              onClick={handleLogout}
              className="p-2 text-slate-400 hover:text-red-400 hover:bg-slate-900 rounded-lg transition-colors cursor-pointer"
              title="Encerrar Sessão"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </header>

        {feedback && (
          <div className="p-4 bg-amber-950/40 border border-amber-600/40 rounded-lg text-amber-200 text-sm flex items-center justify-between">
            <span>{feedback}</span>
            <button onClick={() => setFeedback(null)} className="text-xs text-amber-400 underline cursor-pointer">
              Fechar
            </button>
          </div>
        )}

        {/* Seleção das 3 Jornadas Cronológicas */}
        <section>
          <h2 className="text-xs uppercase tracking-widest text-slate-400 font-semibold mb-4">
            Escolha a Era Histórica
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {JORNADAS.map((j) => {
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

                        <div className="text-[11px] text-slate-400">
                          Turnos jogados: <strong className="text-slate-200">{slot.turnHistory.length}</strong>
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
                        onClick={() => handleNovoJogo(slotNum)}
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
    </main>
  );
}
