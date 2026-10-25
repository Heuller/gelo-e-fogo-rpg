'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { TopBar } from '@/components/game/shell/TopBar';
import { ColunaFicha } from '@/components/game/shell/ColunaFicha';
import { ColunaMundo, AbaColunaMundo } from '@/components/game/shell/ColunaMundo';
import { BarraInferiorMobile } from '@/components/game/shell/BarraInferiorMobile';
import { NarrativeScroll } from '@/components/game/NarrativeScroll';
import { CartaoDeRolagem } from '@/components/game/CartaoDeRolagem';
import { TelaDeFinal } from '@/components/game/TelaDeFinal';
import { PainelDeConfiguracoes } from '@/components/game/PainelDeConfiguracoes';
import { ModalAtalhosTeclado } from '@/components/game/ModalAtalhosTeclado';
import { AvisoProvider, useAvisos } from '@/components/ui/Aviso';
import { useAtalhos } from '@/lib/hooks/useAtalhos';
import { useScrollNaCena } from '@/lib/hooks/useScrollNaCena';
import { obterTemaJornada } from '@/lib/temas';
import { useSessaoJogo } from '@/lib/hooks/useSessaoJogo';
import { useTurno } from '@/lib/hooks/useTurno';
import { extrairNomeAtributo, getTituloJornadaFormatado } from '@/lib/engine-shared/jornadaHelpers';

function JogarJogoInterno() {
  const searchParams = useSearchParams();
  const journeyParam = searchParams.get('journey') || 'conquista_aegon';
  const slotParam = searchParams.get('slot') ? parseInt(searchParams.get('slot')!, 10) : 1;

  const { adicionarAviso } = useAvisos();
  const temaAtual = obterTemaJornada(journeyParam);

  const [modoIA, setModoIA] = useState(true);
  const [abaLateral, setAbaLateral] = useState<AbaColunaMundo>('mapa');

  // Colunas colapsáveis desktop
  const [colunaFichaAberta, setColunaFichaAberta] = useState(true);
  const [colunaMundoAberta, setColunaMundoAberta] = useState(true);

  // Modais de Configuração e Ajuda
  const [modalConfigAberto, setModalConfigAberto] = useState(false);
  const [modalAjudaAberto, setModalAjudaAberto] = useState(false);

  // Hook de Gerenciamento da Sessão e Persistência
  const {
    carregando,
    statusSalvamento,
    setStatusSalvamento,
    slotAtual,
    setSlotAtual,
    nodeAtual,
    setNodeAtual,
    cenaComposta,
    ficha,
    setFicha,
    worldState,
    setWorldState,
    historico,
    setHistorico,
    verbetes,
    preferencias,
    setPreferencias,
  } = useSessaoJogo({
    journeyParam,
    slotParam,
    adicionarAviso,
  });

  // Hook de Ações do Turno e Resolução de Escolhas
  const {
    textoCenaExibido,
    setTextoCenaExibido,
    ponte,
    marcasRecebidas,
    falasCena,
    setFalasCena,
    textoMestre,
    statusMestre,
    resultadoRolagem,
    setResultadoRolagem,
    ultimaEscolhaId,
    handleEscolha,
    handleRerrolarComInspiracao,
    handleAcaoLivre,
    handleTentativaLivre,
    handleDesfazerTurno,
    handleVoltarCheckpoint,
    handleExportarSave,
  } = useTurno({
    slotAtual,
    setSlotAtual,
    nodeAtual,
    setNodeAtual,
    ficha,
    setFicha,
    worldState,
    setWorldState,
    historico,
    setHistorico,
    journeyParam,
    slotParam,
    modoIA,
    adicionarAviso,
    setStatusSalvamento,
  });

  // Sincroniza o texto inicial da cena quando o nó for carregado pela primeira vez
  useEffect(() => {
    if (nodeAtual && !textoCenaExibido) {
      if (cenaComposta?.textoPrincipal) {
        setTextoCenaExibido(cenaComposta.textoPrincipal);
        setFalasCena(cenaComposta.falas || []);
      } else {
        setTextoCenaExibido(nodeAtual.fallbackText);
      }
    }
  }, [nodeAtual, textoCenaExibido, setTextoCenaExibido, cenaComposta, setFalasCena]);

  // Ganchos de Acessibilidade, Rolagem e Foco
  const { headingRef, anunciadorRef } = useScrollNaCena(
    nodeAtual ? nodeAtual.id : null,
    nodeAtual ? nodeAtual.titulo : null
  );

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

  if (carregando || !nodeAtual) {
    return (
      <div className="min-h-screen bg-[var(--pagina)] text-[var(--ouro)] flex items-center justify-center font-cinzel text-lg">
        Consultando os pergaminhos da Cidadela…
      </div>
    );
  }

  const paragrafos = (textoCenaExibido || nodeAtual.fallbackText)
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
                nomeAtributo={extrairNomeAtributo(nodeAtual, ultimaEscolhaId)}
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
              ponte={ponte || undefined}
              marcasRecebidas={marcasRecebidas}
              falas={falasCena}
              tipo={nodeAtual.tipo}
              reacaoCompanheiro={cenaComposta?.reacaoCompanheiro}
              vozConflitoAtiva={cenaComposta?.vozConflitoAtiva}
              dicaPercepcao={cenaComposta?.dicaPercepcao}
              pov={cenaComposta?.pov || nodeAtual.pov}
              epigrafe={cenaComposta?.epigrafe || nodeAtual.epigrafe}
              modoDeJogo={slotAtual?.modo || 'padrao'}
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
      <ModalAtalhosTeclado
        aberto={modalAjudaAberto}
        onFechar={() => setModalAjudaAberto(false)}
      />
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
