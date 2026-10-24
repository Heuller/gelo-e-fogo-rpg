'use client';

import React, { useState, useEffect, Suspense, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import { TopBar } from '@/components/game/shell/TopBar';
import { ColunaFicha } from '@/components/game/shell/ColunaFicha';
import { ColunaMundo, AbaColunaMundo } from '@/components/game/shell/ColunaMundo';
import { BarraInferiorMobile } from '@/components/game/shell/BarraInferiorMobile';
import { NarrativeScroll } from '@/components/game/NarrativeScroll';
import { CartaoDeRolagem } from '@/components/game/CartaoDeRolagem';
import { TelaDeFinal } from '@/components/game/TelaDeFinal';
import {
  PainelDeConfiguracoes,
  PreferenciasLeitura,
  PREFERENCIAS_PADRAO,
  obterPreferenciasSalvas,
} from '@/components/game/PainelDeConfiguracoes';
import { Dialogo } from '@/components/ui/Dialogo';
import { Botao } from '@/components/ui/Botao';
import { AvisoProvider, useAvisos } from '@/components/ui/Aviso';
import { useAtalhos } from '@/lib/hooks/useAtalhos';
import { useScrollNaCena } from '@/lib/hooks/useScrollNaCena';
import { useJogoStore } from '@/lib/store/jogoStore';
import { FichaPersonagem, ResultadoRolagem, WorldState, obterCompanheirosIniciais } from '@/server/engine/rpgEngine';
import type { TurnEvent, SaveSlot } from '@/server/saves';
import { exportarSaveAction } from '@/app/actions/slotActions';
import { NodeJornada, EscolhaNode } from '@/server/engine/storyLinter';
import { VerbeteGlossario } from '@/server/data/lore';
import { getGlossaryEntriesAction } from '@/app/actions/loreActions';
import { obterTemaJornada } from '@/lib/temas';
import {
  carregarSessaoJogoAction,
  obterCenaInicialAction,
  obterCenaPorIdAction,
  processarEscolhaAction,
  processarAcaoLivreAction,
  executarTentativaLivreAction,
  rerrolarTesteInspiracaoAction,
  desfazerTurnoAction,
} from '@/app/actions/gameActions';
import type { RespostaTentativaLivre } from '@/server/engine/tentativaLivre';
import { Keyboard } from 'lucide-react';

function getTituloJornadaFormatado(id: string): string {
  const lower = id.toLowerCase();
  if (lower.includes('danca') || lower.includes('jornada_2')) {
    return 'Jornada 2: A Dança dos Dragões';
  }
  if (lower.includes('tronos') || lower.includes('guerra') || lower.includes('jornada_3')) {
    return 'Jornada 3: A Guerra dos Cinco Reis';
  }
  if (lower.includes('patrulha') || lower.includes('muralha') || lower.includes('jornada_4')) {
    return 'Jornada 4: Irmão Sem Nome';
  }
  return 'Jornada 1: A Conquista de Aegon';
}

function JogarJogoInterno() {
  const searchParams = useSearchParams();
  const journeyParam = searchParams.get('journey') || 'conquista_aegon';
  const slotParam = searchParams.get('slot') ? parseInt(searchParams.get('slot')!, 10) : 1;

  const { adicionarAviso } = useAvisos();
  const temaAtual = obterTemaJornada(journeyParam);

  // Estados principais da sessão
  const [carregando, setCarregando] = useState(true);
  const [modoIA, setModoIA] = useState(true);
  const [nodeAtual, setNodeAtual] = useState<NodeJornada | null>(null);
  const [textoCenaExibido, setTextoCenaExibido] = useState<string>('');
  const [textoMestre, setTextoMestre] = useState<string | null>(null);
  const [statusMestre, setStatusMestre] = useState<'idle' | 'escrevendo' | 'pronto' | 'falhou'>('idle');
  const [verbetes, setVerbetes] = useState<VerbeteGlossario[]>([]);
  const [abaLateral, setAbaLateral] = useState<AbaColunaMundo>('mapa');
  const [resultadoRolagem, setResultadoRolagem] = useState<ResultadoRolagem | null>(null);
  const [ultimaEscolhaId, setUltimaEscolhaId] = useState<string | null>(null);
  const [ultimoNodeId, setUltimoNodeId] = useState<string | null>(null);

  // Colunas colapsáveis desktop
  const [colunaFichaAberta, setColunaFichaAberta] = useState(true);
  const [colunaMundoAberta, setColunaMundoAberta] = useState(true);

  // Configurações e Modais
  const [modalConfigAberto, setModalConfigAberto] = useState(false);
  const [modalAjudaAberto, setModalAjudaAberto] = useState(false);
  const [preferencias, setPreferencias] = useState<PreferenciasLeitura>(PREFERENCIAS_PADRAO);

  const [ficha, setFicha] = useState<FichaPersonagem>({
    id: 'aegon-conquistador',
    nome: 'Aegon I Targaryen',
    origem: 'sangue_valiriano',
    inspiracao: 2,
    atributos: {
      comando: 5,
      furia: 4,
      astucia: 3,
      cortesia: 3,
      erudicao: 3,
      pressagio: 4,
    },
    estado: { sangue: 10, compostura: 10, honra: 5 },
    cicatrizes: [],
    segredos: ['A profecia de Daenys a Sonhadora'],
    companheiros: obterCompanheirosIniciais('j1_conquista'),
  });

  const [worldState, setWorldState] = useState<WorldState>({
    reputacaoCasas: { Targaryen: 10 },
    flagsBorboleta: { jogo_iniciado: true },
    marcosConcluidos: ['inicio_campanha'],
  });

  const [historico, setHistorico] = useState<TurnEvent[]>([]);
  const [slotAtual, setSlotAtual] = useState<SaveSlot | null>(null);
  const [statusSalvamento, setStatusSalvamento] = useState<'salvo' | 'salvando' | 'erro'>('salvo');

  // Ganchos de Acessibilidade, Rolagem e Foco
  const { headingRef, anunciadorRef } = useScrollNaCena(
    nodeAtual ? nodeAtual.id : null,
    nodeAtual ? nodeAtual.titulo : null
  );

  // Carregar preferências salvas do usuário no mount
  useEffect(() => {
    setPreferencias(obterPreferenciasSalvas());
  }, []);

  // Carga inicial dos dados da crônica e slot
  useEffect(() => {
    setCarregando(true);
    setStatusSalvamento('salvando');

    Promise.all([
      getGlossaryEntriesAction(),
      carregarSessaoJogoAction(journeyParam, slotParam),
    ])
      .then(([verbetesData, sessaoData]) => {
        setVerbetes(verbetesData);
        setSlotAtual(sessaoData.slot);
        setNodeAtual(sessaoData.node);
        setTextoCenaExibido(sessaoData.node.fallbackText);
        setFicha(sessaoData.slot.characterSheet);
        setWorldState(sessaoData.slot.worldState);
        setHistorico(sessaoData.slot.turnHistory || []);
        setStatusSalvamento('salvo');
        setCarregando(false);
      })
      .catch((err) => {
        adicionarAviso('Erro ao carregar crônica: ' + err.message, 'erro');
        setStatusSalvamento('erro');
        setCarregando(false);
      });
  }, [journeyParam, slotParam, adicionarAviso]);

  // Execução de escolha pelo jogador
  async function handleEscolha(escolhaId: string) {
    if (!nodeAtual || !slotAtual) return;

    try {
      setUltimoNodeId(nodeAtual.id);
      setUltimaEscolhaId(escolhaId);
      setStatusSalvamento('salvando');
      if (modoIA) setStatusMestre('escrevendo');

      const res = await processarEscolhaAction({
        slotId: slotAtual.id,
        escolhaId,
        versaoEsperada: slotAtual.versao,
        usarIA: modoIA,
        journeyId: journeyParam,
      });

      if (res.slotAtualizado) {
        setSlotAtual(res.slotAtualizado);
      }
      setStatusSalvamento('salvo');

      setNodeAtual(res.proximoNode);
      setTextoCenaExibido(res.proximoNode.fallbackText);

      if (res.textoEnriquecido) {
        setTextoMestre(res.textoEnriquecido);
        setStatusMestre('pronto');
      } else {
        setTextoMestre(null);
        setStatusMestre('idle');
      }

      setFicha(res.fichaAtualizada);
      setWorldState(res.worldStateAtualizado);
      setHistorico([res.turnEvent, ...historico]);

      // Avisos de aprovação de companheiros (toasts elegantes)
      if (res.notificacoesCompanheiros && res.notificacoesCompanheiros.length > 0) {
        res.notificacoesCompanheiros.forEach((notif) => {
          const ehAprovacao = notif.includes('aprova');
          adicionarAviso(notif, ehAprovacao ? 'sucesso' : 'erro');
        });
      }

      if (res.resultadoRolagem) {
        setResultadoRolagem(res.resultadoRolagem);
        const veredito = res.resultadoRolagem.resultado.toUpperCase();
        adicionarAviso(
          `Rolagem 2d6: [${res.resultadoRolagem.dados[0]}+${res.resultadoRolagem.dados[1]} + ${res.resultadoRolagem.valorAtributo} = ${res.resultadoRolagem.total} vs DC ${res.resultadoRolagem.dc}] — ${veredito}`,
          veredito.includes('SUCESSO') ? 'sucesso' : 'erro'
        );
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      if (msg.includes('CONFLITO_VERSAO')) {
        adicionarAviso('Conflito de versão detectado. Sincronizando com o servidor...', 'info');
        carregarSessaoJogoAction(journeyParam, slotParam).then((sessaoData) => {
          setSlotAtual(sessaoData.slot);
          setNodeAtual(sessaoData.node);
          setTextoCenaExibido(sessaoData.node.fallbackText);
          setFicha(sessaoData.slot.characterSheet);
          setWorldState(sessaoData.slot.worldState);
          setHistorico(sessaoData.slot.turnHistory || []);
        }).catch(() => {});
      } else {
        adicionarAviso('Erro ao processar escolha: ' + msg, 'erro');
      }
      setStatusSalvamento('erro');
      setStatusMestre('falhou');
    }
  }

  // Atalhos de teclado [1..4, J, M, [, ], ?]
  useAtalhos({
    onEscolher: (indice) => {
      if (!nodeAtual || !nodeAtual.escolhas[indice]) return;
      handleEscolha(nodeAtual.escolhas[indice].id);
    },
    onAlternarAba: (aba) => {
      setAbaLateral(aba);
      setColunaMundoAberta(true);
    },
    onAlternarColunaFicha: () => setColunaFichaAberta((v) => !v),
    onAlternarColunaMundo: () => setColunaMundoAberta((v) => !v),
    onAbrirAjuda: () => setModalAjudaAberto(true),
    desabilitado: modalConfigAberto || modalAjudaAberto,
  });

  async function handleRerrolarComInspiracao() {
    if (!slotAtual) {
      adicionarAviso('Sessão de jogo não inicializada.', 'erro');
      return;
    }
    if ((ficha.inspiracao ?? 0) <= 0) {
      adicionarAviso('Não possuís Pontos de Inspiração suficientes.', 'erro');
      return;
    }

    try {
      adicionarAviso('Gastando 1 Ponto de Inspiração para rerrolar o teste…', 'info');
      const res = await rerrolarTesteInspiracaoAction({
        slotId: slotAtual.id,
        versaoEsperada: slotAtual.versao,
        escolhaId: ultimaEscolhaId || undefined,
        journeyId: journeyParam,
        usarIA: modoIA,
      });

      if (res.slotAtualizado) {
        setSlotAtual(res.slotAtualizado);
      }
      setNodeAtual(res.proximoNode);
      setTextoCenaExibido(res.proximoNode.fallbackText);
      if (res.textoEnriquecido) {
        setTextoMestre(res.textoEnriquecido);
      }
      setFicha(res.fichaAtualizada);
      setWorldState(res.worldStateAtualizado);
      setHistorico([res.turnEvent, ...historico]);

      if (res.resultadoRolagem) {
        setResultadoRolagem(res.resultadoRolagem);
        const veredito = res.resultadoRolagem.resultado.toUpperCase();
        adicionarAviso(
          `Nova Rolagem com Inspiração: [${res.resultadoRolagem.total} vs DC ${res.resultadoRolagem.dc}] — ${veredito}`,
          veredito.includes('SUCESSO') ? 'sucesso' : 'erro'
        );
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      adicionarAviso('Erro ao rerrolar com Inspiração: ' + msg, 'erro');
    }
  }

  async function handleAcaoLivre(textoAcao: string) {
    if (!nodeAtual || !slotAtual) return;

    try {
      adicionarAviso('O Mestre IA está interpretando sua ação livre…', 'info');
      const res = await processarAcaoLivreAction({
        slotId: slotAtual.id,
        versaoEsperada: slotAtual.versao,
        nodeId: nodeAtual.id,
        textoAcaoLivre: textoAcao,
        usarIA: modoIA,
        journeyId: journeyParam,
      });

      if (res.slotAtualizado) {
        setSlotAtual(res.slotAtualizado);
      }
      setNodeAtual(res.proximoNode);
      setTextoCenaExibido(res.proximoNode.fallbackText);
      if (res.textoEnriquecido) {
        setTextoMestre(res.textoEnriquecido);
        setStatusMestre('pronto');
      }
      setFicha(res.fichaAtualizada);
      setWorldState(res.worldStateAtualizado);
      setHistorico([res.turnEvent, ...historico]);

      if (res.resultadoRolagem) {
        setResultadoRolagem(res.resultadoRolagem);
      }

      const msg = res.classificacao
        ? `[Mestre]: ${res.classificacao.justificativa}`
        : `Ação proclamada: "${textoAcao}"`;
      adicionarAviso(msg, 'sucesso');
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      adicionarAviso('Erro ao processar ação livre: ' + msg, 'erro');
    }
  }

  async function handleTentativaLivre(textoAcao: string): Promise<RespostaTentativaLivre | null> {
    if (!nodeAtual || !slotAtual) return null;

    try {
      adicionarAviso('Executando tentativa livre na Cidadela…', 'info');
      const res = await executarTentativaLivreAction({
        slotId: slotAtual.id,
        versaoEsperada: slotAtual.versao,
        texto: textoAcao,
        journeyId: journeyParam,
      });

      setSlotAtual(res.novoSlot);
      setFicha(res.novoSlot.characterSheet);
      setWorldState(res.novoSlot.worldState);
      setHistorico(res.novoSlot.turnHistory || []);
      setResultadoRolagem(res.resultadoRolagem);

      const veredito = res.resultadoRolagem.resultado.toUpperCase();
      adicionarAviso(
        `Tentativa [${res.rotuloIntencao}]: ${veredito} (${res.resultadoRolagem.total} vs CD ${res.resultadoRolagem.dc})`,
        veredito.includes('SUCESSO') || veredito === 'CRITICO' ? 'sucesso' : 'erro'
      );

      return res;
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      adicionarAviso('Erro ao executar tentativa livre: ' + msg, 'erro');
      return null;
    }
  }

  async function handleDesfazerTurno() {
    if (!slotAtual) {
      adicionarAviso('Sessão de jogo não inicializada.', 'erro');
      return;
    }

    try {
      adicionarAviso('Desfazendo último turno no servidor...', 'info');
      const { slot: slotRestaurado, node: nodeRestaurado } = await desfazerTurnoAction(
        slotAtual.id,
        slotAtual.versao
      );

      setSlotAtual(slotRestaurado);
      setNodeAtual(nodeRestaurado);
      setTextoCenaExibido(nodeRestaurado.fallbackText);
      setFicha(slotRestaurado.characterSheet);
      setWorldState(slotRestaurado.worldState);
      setHistorico(slotRestaurado.turnHistory || []);
      adicionarAviso(`Retornado à cena '${nodeRestaurado.titulo}'.`, 'info');
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      adicionarAviso('Erro ao desfazer turno: ' + msg, 'erro');
    }
  }

  async function handleVoltarCheckpoint() {
    try {
      const inicio = await obterCenaInicialAction(journeyParam);
      setNodeAtual(inicio.node);
      setTextoCenaExibido(inicio.node.fallbackText);
      setFicha(inicio.fichaInicial);
      setWorldState(inicio.worldStateInicial);
      setHistorico([
        {
          slotId: slotAtual?.id || `slot_${slotParam}`,
          userId: inicio.fichaInicial.id,
          turnNumber: 1,
          nodeId: inicio.node.id,
          choiceMade: 'Reinício no Checkpoint Inicial da Era',
          stateDelta: {},
          snapshotAntes: {
            ficha: inicio.fichaInicial,
            worldState: inicio.worldStateInicial,
            nodeId: inicio.node.id,
          },
          resultado: {},
          timestamp: new Date().toISOString(),
        },
      ]);
      adicionarAviso('Retornado com sucesso ao início do Ato I.', 'sucesso');
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      adicionarAviso('Erro ao voltar ao checkpoint: ' + msg, 'erro');
    }
  }

  async function handleExportarSave() {
    try {
      const json = await exportarSaveAction(journeyParam, slotParam);
      const blob = new Blob([json], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `save_${journeyParam}_slot_${slotParam}_${Date.now()}.json`;
      a.click();
      URL.revokeObjectURL(url);
      adicionarAviso('Save exportado com sucesso em .json!', 'sucesso');
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      adicionarAviso('Erro ao exportar save: ' + msg, 'erro');
    }
  }

  if (carregando || !nodeAtual) {
    return (
      <div className="min-h-screen bg-[var(--pagina)] text-[var(--ouro)] flex items-center justify-center font-cinzel text-lg">
        Consultando os pergaminhos da Cidadela…
      </div>
    );
  }

  const paragrafos = textoCenaExibido
    .split('\n\n')
    .map((p) => p.trim())
    .filter((p) => p.length > 0);

  const worldFlags = Object.keys(worldState.flagsBorboleta || {});

  return (
    <div className="min-h-screen bg-[var(--pagina)] text-[var(--tinta)] flex flex-col font-garamond pb-20 lg:pb-8">
      {/* Região Viva para Leitores de Tela */}
      <div ref={anunciadorRef} aria-live="polite" className="sr-only" />

      {/* Barra de Topo do Códice Vivo */}
      <TopBar
        jornadaTitulo={getTituloJornadaFormatado(journeyParam)}
        atoTitulo={nodeAtual.titulo}
        anoHistorico={nodeAtual.anoHistorico || '2 a.C.'}
        localizacao={nodeAtual.localizacao || 'Westeros'}
        slotAtivo={slotParam}
        statusSalvamento={statusSalvamento}
        statusMestre={statusMestre}
        modoIA={modoIA}
        onToggleModoIA={() => setModoIA(!modoIA)}
        onAbrirConfiguracoes={() => setModalConfigAberto(true)}
        onAbrirAjuda={() => setModalAjudaAberto(true)}
        onToggleColunaFicha={() => setColunaFichaAberta((v) => !v)}
        onToggleColunaMundo={() => setColunaMundoAberta((v) => !v)}
        colunaFichaAberta={colunaFichaAberta}
        colunaMundoAberta={colunaMundoAberta}
      />

      {/* Conteúdo Principal do Jogo */}
      {nodeAtual.isEnding ? (
        <main className="max-w-4xl mx-auto w-full p-4 sm:p-6 flex-1 entrada-fade">
          <TelaDeFinal
            node={nodeAtual}
            ficha={ficha}
            worldState={worldState}
            jornadaId={journeyParam}
            slotNumber={slotParam}
            onRecomecar={handleVoltarCheckpoint}
          />
        </main>
      ) : (
        <main className="max-w-7xl mx-auto w-full p-3 sm:p-6 flex justify-center gap-6 flex-1 items-start">
          {/* Coluna Esquerda: Ficha do Personagem (280px) */}
          <ColunaFicha ficha={ficha} aberta={colunaFichaAberta} />

          {/* Coluna Central: Rolo Narrativo (max-w-[66ch]) e Mesa de Dados */}
          <div className="w-full max-w-[66ch] flex-1 space-y-6">
            {/* Cartão de Rolagem Dramático (Overlay central ao realizar teste) */}
            {resultadoRolagem && (
              <CartaoDeRolagem
                resultado={resultadoRolagem}
                nomeAtributo={
                  ultimaEscolhaId && nodeAtual
                    ? (() => {
                        const esc = nodeAtual.escolhas.find((e) => e.id === ultimaEscolhaId);
                        if (esc && esc.tipo === 'teste_atributo') {
                          const mapaNomes: Record<string, string> = {
                            comando: 'Comando',
                            furia: 'Fúria',
                            astucia: 'Astúcia',
                            cortesia: 'Cortesia',
                            erudicao: 'Erudição',
                            pressagio: 'Presságio',
                          };
                          return mapaNomes[esc.atributo] || 'Atributo';
                        }
                        return 'Atributo';
                      })()
                    : 'Atributo'
                }
                inspiracaoRestante={ficha.inspiracao ?? 0}
                onContinuar={() => setResultadoRolagem(null)}
                onRerrolar={handleRerrolarComInspiracao}
              />
            )}

            <NarrativeScroll
              nodeId={nodeAtual.id}
              atoTitulo={nodeAtual.titulo}
              anoHistorico={nodeAtual.anoHistorico || '2 a.C.'}
              localizacao={nodeAtual.localizacao || 'Westeros'}
              paragrafos={paragrafos}
              conditionalParagraphs={nodeAtual.conditionalParagraphs || []}
              worldFlags={worldFlags}
              worldState={worldState}
              ficha={ficha}
              vozesInternas={nodeAtual.internalVoices || []}
              escolhas={nodeAtual.escolhas}
              verbetes={verbetes}
              textoMestre={textoMestre}
              statusMestre={statusMestre}
              modoIA={modoIA}
              temaId={journeyParam}
              preferencias={preferencias}
              headingRef={headingRef}
              onEscolha={handleEscolha}
              onAcaoLivre={handleAcaoLivre}
              nodeCompleto={nodeAtual}
              historicoTurnos={historico}
              onTentativaLivre={handleTentativaLivre}
            />
          </div>

          {/* Coluna Direita: Mapa, Casas e Diário (320px) */}
          <ColunaMundo
            aberta={colunaMundoAberta}
            abaAtiva={abaLateral}
            onAlternarAba={setAbaLateral}
            regioes={temaAtual.regioes}
            regiaoAtualId={nodeAtual.regionId || 'pedra_dragao'}
            casasPrincipais={temaAtual.casas}
            reputacaoCasas={worldState.reputacaoCasas}
            historico={historico}
            flags={worldState.flagsBorboleta}
            nomeJogador={ficha.nome}
            onDesfazer={handleDesfazerTurno}
            onExportarSave={handleExportarSave}
          />
        </main>
      )}

      {/* Barra Inferior Fixa e Gavetas para Mobile (< 1024px) */}
      <BarraInferiorMobile
        ficha={ficha}
        regioes={temaAtual.regioes}
        regiaoAtualId={nodeAtual.regionId || 'pedra_dragao'}
        casasPrincipais={temaAtual.casas}
        reputacaoCasas={worldState.reputacaoCasas}
        historico={historico}
        onDesfazer={handleDesfazerTurno}
        onExportarSave={handleExportarSave}
        onAbrirConfiguracoes={() => setModalConfigAberto(true)}
      />

      {/* Modal de Configurações de Leitura */}
      <PainelDeConfiguracoes
        aberto={modalConfigAberto}
        onFechar={() => setModalConfigAberto(false)}
        preferencias={preferencias}
        onSalvar={(novas) => setPreferencias(novas)}
      />

      {/* Modal de Atalhos do Teclado */}
      <Dialogo
        aberto={modalAjudaAberto}
        onFechar={() => setModalAjudaAberto(false)}
        titulo="Atalhos do Teclado"
      >
        <div className="space-y-4 text-xs font-sans text-[var(--tinta)]">
          <p className="text-[var(--tinta-suave)] font-garamond text-sm">
            Navegai pelas Crônicas de Sangue e Gelo com agilidade usando o teclado:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-3 rounded-lg bg-[var(--pergaminho-1)] border border-[var(--borda)] flex items-center justify-between">
              <span className="text-[var(--tinta-suave)]">Escolhas Narrativas</span>
              <kbd className="px-2 py-1 rounded bg-[var(--pergaminho-3)] border border-[var(--borda)] font-mono text-[var(--ouro)] font-bold">
                1 · 2 · 3 · 4
              </kbd>
            </div>

            <div className="p-3 rounded-lg bg-[var(--pergaminho-1)] border border-[var(--borda)] flex items-center justify-between">
              <span className="text-[var(--tinta-suave)]">Mapa das Crônicas</span>
              <kbd className="px-2 py-1 rounded bg-[var(--pergaminho-3)] border border-[var(--borda)] font-mono text-[var(--ouro)] font-bold">
                M
              </kbd>
            </div>

            <div className="p-3 rounded-lg bg-[var(--pergaminho-1)] border border-[var(--borda)] flex items-center justify-between">
              <span className="text-[var(--tinta-suave)]">Reputação das Casas</span>
              <kbd className="px-2 py-1 rounded bg-[var(--pergaminho-3)] border border-[var(--borda)] font-mono text-[var(--ouro)] font-bold">
                C
              </kbd>
            </div>

            <div className="p-3 rounded-lg bg-[var(--pergaminho-1)] border border-[var(--borda)] flex items-center justify-between">
              <span className="text-[var(--tinta-suave)]">Diário da Crônica</span>
              <kbd className="px-2 py-1 rounded bg-[var(--pergaminho-3)] border border-[var(--borda)] font-mono text-[var(--ouro)] font-bold">
                J
              </kbd>
            </div>

            <div className="p-3 rounded-lg bg-[var(--pergaminho-1)] border border-[var(--borda)] flex items-center justify-between">
              <span className="text-[var(--tinta-suave)]">Alternar Ficha</span>
              <kbd className="px-2 py-1 rounded bg-[var(--pergaminho-3)] border border-[var(--borda)] font-mono text-[var(--ouro)] font-bold">
                [
              </kbd>
            </div>

            <div className="p-3 rounded-lg bg-[var(--pergaminho-1)] border border-[var(--borda)] flex items-center justify-between">
              <span className="text-[var(--tinta-suave)]">Alternar Mundo</span>
              <kbd className="px-2 py-1 rounded bg-[var(--pergaminho-3)] border border-[var(--borda)] font-mono text-[var(--ouro)] font-bold">
                ]
              </kbd>
            </div>

            <div className="p-3 rounded-lg bg-[var(--pergaminho-1)] border border-[var(--borda)] flex items-center justify-between">
              <span className="text-[var(--tinta-suave)]">Esta Ajuda</span>
              <kbd className="px-2 py-1 rounded bg-[var(--pergaminho-3)] border border-[var(--borda)] font-mono text-[var(--ouro)] font-bold">
                ?
              </kbd>
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <Botao variante="primario" onClick={() => setModalAjudaAberto(false)}>
              Entendido
            </Botao>
          </div>
        </div>
      </Dialogo>
    </div>
  );
}

export default function JogarPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[var(--pagina)] text-[var(--ouro)] flex items-center justify-center font-cinzel text-lg">
          Abrindo os pergaminhos de Westeros…
        </div>
      }
    >
      <AvisoProvider>
        <JogarJogoInterno />
      </AvisoProvider>
    </Suspense>
  );
}
