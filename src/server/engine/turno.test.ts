import { describe, it, expect, beforeEach } from 'vitest';
import { mesclarDeltas, validarEscolhaDesbloqueada, executarTurno } from './turno';
import { FichaPersonagem, WorldState } from './rpgEngine';
import { EscolhaNode } from './storyLinter';
import { getSaveRepository, setSaveRepositoryForTesting } from '@/server/saves';
import { MemoriaSaveRepository } from '@/server/saves/memoria';

describe('Motor de Turno Autoritativo (turno.ts)', () => {
  const mockFicha: FichaPersonagem = {
    id: 'char_aegon',
    nome: 'Aegon Targaryen',
    origem: 'valiriana',
    atributos: {
      comando: 5,
      furia: 4,
      astucia: 3,
      cortesia: 3,
      erudicao: 4,
      pressagio: 3,
    },
    estado: {
      sangue: 10,
      compostura: 10,
      honra: 5,
    },
    cicatrizes: [],
    segredos: [],
    inspiracao: 2,
    companheiros: {
      visenya: {
        id: 'visenya',
        nome: 'Visenya Targaryen',
        titulo: 'Irmã-Esposa',
        aprovacao: 35,
        status: 'Leal',
      },
    },
  };

  const mockWorldState: WorldState = {
    flagsBorboleta: { flag_a: true, flag_b: true },
    reputacaoCasas: { Stark: 2 },
    marcosConcluidos: ['marco_1'],
  };

  beforeEach(() => {
    setSaveRepositoryForTesting(new MemoriaSaveRepository());
  });

  describe('mesclarDeltas (Deep Merge)', () => {
    it('deve somar atributos numéricos e unificar arrays de flags sem duplicatas', () => {
      const deltaA = {
        honra: 2,
        sangue: -3,
        flagsAdicionadas: ['flag_1', 'flag_2'],
        flagsBorboleta: { dragao_vivo: true },
        reputacaoCasas: { Stark: 2, Lannister: -1 },
        aprovacaoCompanheiros: { visenya: 10 },
      };

      const deltaB = {
        honra: -1,
        sangue: -2,
        flagsAdicionadas: ['flag_2', 'flag_3'],
        flagsBorboleta: { dragao_ferido: true },
        reputacaoCasas: { Stark: 1, Arryn: 3 },
        aprovacaoCompanheiros: { visenya: 5, rhaenys: 15 },
      };

      const mesclado = mesclarDeltas(deltaA, deltaB);

      expect(mesclado.honra).toBe(1); // 2 + (-1)
      expect(mesclado.sangue).toBe(-5); // -3 + (-2)
      expect(mesclado.flagsAdicionadas).toEqual(['flag_1', 'flag_2', 'flag_3']);
      expect(mesclado.flagsBorboleta).toEqual({
        dragao_vivo: true,
        dragao_ferido: true,
      });
      expect(mesclado.reputacaoCasas).toEqual({
        Stark: 3,
        Lannister: -1,
        Arryn: 3,
      });
      expect(mesclado.aprovacaoCompanheiros).toEqual({
        visenya: 15,
        rhaenys: 15,
      });
    });
  });

  describe('validarEscolhaDesbloqueada', () => {
    const escolhaBase: EscolhaNode = {
      id: 'esc_1',
      texto: 'Decisão de teste',
      tipo: 'simples',
      nextNodeId: 'node_dest',
    };

    it('deve desbloquear se não houver requisitos', () => {
      const res = validarEscolhaDesbloqueada(escolhaBase, mockWorldState, mockFicha);
      expect(res.desbloqueada).toBe(true);
    });

    it('deve bloquear se requiredFlags faltar', () => {
      const escolhaComReq: EscolhaNode = {
        ...escolhaBase,
        requiredFlags: ['flag_a', 'flag_inexistente'],
      };
      const res = validarEscolhaDesbloqueada(escolhaComReq, mockWorldState, mockFicha);
      expect(res.desbloqueada).toBe(false);
      expect(res.flagsFaltantes).toContain('flag_inexistente');
    });

    it('deve bloquear se forbiddenFlags estiver presente', () => {
      const escolhaComProibida: EscolhaNode = {
        ...escolhaBase,
        forbiddenFlags: ['flag_a'],
      };
      const res = validarEscolhaDesbloqueada(escolhaComProibida, mockWorldState, mockFicha);
      expect(res.desbloqueada).toBe(false);
    });

    it('deve validar minCompanionApproval corretamente', () => {
      // Requer aprovação 50 com Visenya (atual 35) -> bloqueada
      const escolhaReqAprovAlta: EscolhaNode = {
        ...escolhaBase,
        minCompanionApproval: { companionId: 'visenya', minApproval: 50 },
      };
      const res1 = validarEscolhaDesbloqueada(escolhaReqAprovAlta, mockWorldState, mockFicha);
      expect(res1.desbloqueada).toBe(false);

      // Requer aprovação 20 com Visenya (atual 35) -> desbloqueada
      const escolhaReqAprovBaixa: EscolhaNode = {
        ...escolhaBase,
        minCompanionApproval: { companionId: 'visenya', minApproval: 20 },
      };
      const res2 = validarEscolhaDesbloqueada(escolhaReqAprovBaixa, mockWorldState, mockFicha);
      expect(res2.desbloqueada).toBe(true);
    });
  });

  describe('executarTurno', () => {
    it('deve executar um turno determinístico, aplicar deltas e incrementar a versão do slot', async () => {
      const repo = getSaveRepository();
      const resSlot = await repo.criarSlot({
        userId: 'usr_teste_1',
        jornadaId: 'jornada_1',
        slotNumber: 1,
        currentNodeId: 'j1_a1_mesa_pintada',
        characterSheet: mockFicha,
        worldState: mockWorldState,
      });

      expect(resSlot.ok).toBe(true);
      if (!resSlot.ok) return;

      const slot = resSlot.valor;

      const resTurno = await executarTurno({
        userId: 'usr_teste_1',
        slotId: slot.id,
        escolhaId: 'esc_ouvir_argilac',
        versaoEsperada: 0,
        journeyId: 'jornada_1',
      });

      expect(resTurno.novoSlot.versao).toBe(1);
      expect(resTurno.proximoNode.id).toBe('j1_a1_oferta_argilac');
      expect(resTurno.novoSlot.turnHistory).toHaveLength(1);
      expect(resTurno.novoSlot.turnHistory[0].snapshotAntes.nodeId).toBe('j1_a1_mesa_pintada');
    });

    it('deve rejeitar execução com versão desatualizada (proteção de concorrência)', async () => {
      const repo = getSaveRepository();
      const resSlot = await repo.criarSlot({
        userId: 'usr_teste_1',
        jornadaId: 'jornada_1',
        slotNumber: 1,
        currentNodeId: 'j1_a1_mesa_pintada',
        characterSheet: mockFicha,
        worldState: mockWorldState,
      });
      if (!resSlot.ok) return;

      await expect(
        executarTurno({
          userId: 'usr_teste_1',
          slotId: resSlot.valor.id,
          escolhaId: 'esc_ouvir_argilac',
          versaoEsperada: 99, // Incorreto
          journeyId: 'jornada_1',
        })
      ).rejects.toThrow(/CONFLITO_VERSAO/);
    });
  });
});
