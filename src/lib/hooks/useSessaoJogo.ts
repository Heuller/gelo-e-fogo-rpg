'use client';

import { useState, useEffect, useCallback } from 'react';
import { NodeJornada } from '@/server/engine/storyLinter';
import { FichaPersonagem, WorldState, obterCompanheirosIniciais } from '@/server/engine/rpgEngine';
import type { TurnEvent, SaveSlot } from '@/server/saves';
import { VerbeteGlossario } from '@/server/data/lore';
import { getGlossaryEntriesAction } from '@/app/actions/loreActions';
import { carregarSessaoJogoAction } from '@/app/actions/gameActions';
import {
  PreferenciasLeitura,
  PREFERENCIAS_PADRAO,
  obterPreferenciasSalvas,
} from '@/components/game/PainelDeConfiguracoes';

export interface UseSessaoJogoProps {
  journeyParam: string;
  slotParam: number;
  adicionarAviso: (mensagem: string, tipo?: 'sucesso' | 'erro' | 'info') => void;
}

export function useSessaoJogo({
  journeyParam,
  slotParam,
  adicionarAviso,
}: UseSessaoJogoProps) {
  const [carregando, setCarregando] = useState(true);
  const [statusSalvamento, setStatusSalvamento] = useState<'salvo' | 'salvando' | 'erro'>('salvo');
  const [slotAtual, setSlotAtual] = useState<SaveSlot | null>(null);
  const [nodeAtual, setNodeAtual] = useState<NodeJornada | null>(null);
  const [verbetes, setVerbetes] = useState<VerbeteGlossario[]>([]);
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

  // Carregar preferências salvas do usuário no mount
  useEffect(() => {
    setPreferencias(obterPreferenciasSalvas());
  }, []);

  const carregarDados = useCallback(() => {
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
        setFicha(sessaoData.slot.characterSheet);
        setWorldState(sessaoData.slot.worldState);
        setHistorico(sessaoData.slot.turnHistory || []);
        setStatusSalvamento('salvo');
        setCarregando(false);
      })
      .catch((err: unknown) => {
        const msg = err instanceof Error ? err.message : String(err);
        adicionarAviso('Erro ao carregar crônica: ' + msg, 'erro');
        setStatusSalvamento('erro');
        setCarregando(false);
      });
  }, [journeyParam, slotParam, adicionarAviso]);

  useEffect(() => {
    carregarDados();
  }, [carregarDados]);

  return {
    carregando,
    statusSalvamento,
    setStatusSalvamento,
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
    verbetes,
    preferencias,
    setPreferencias,
    recarregarSessao: carregarDados,
  };
}
