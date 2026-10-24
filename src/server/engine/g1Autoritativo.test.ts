import { describe, it, expect, beforeEach } from 'vitest';
import {
  executarTurnoAutoritativo,
  rerrolarComInspiracao,
} from './turno';
import { getSaveRepository, setSaveRepositoryForTesting } from '@/server/saves';
import { MemoriaSaveRepository } from '@/server/saves/memoria';
import { FichaPersonagem, WorldState } from './rpgEngine';
import { TurnBodySchema } from '@/server/saves/schemas';

describe('G1 — Servidor Autoritativo, Desfazer em Pilha e Rerrolagem Atômica', () => {
  const mockFicha: FichaPersonagem = {
    id: 'char_aegon_g1',
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
    segredos: [],
    inspiracao: 1, // Começa com exatamente 1 ponto de inspiração
    companheiros: {},
  };

  const mockWorldState: WorldState = {
    flagsBorboleta: { inicio: true },
    reputacaoCasas: {},
    marcosConcluidos: ['inicio'],
  };

  beforeEach(() => {
    setSaveRepositoryForTesting(new MemoriaSaveRepository());
  });

  it('1. Rerrolar com inspiracao = 1 deve persistir 0 no repositório; segundo rerrolar deve falhar', async () => {
    const repo = getSaveRepository();
    const resCriar = await repo.criarSlot({
      userId: 'usr_g1_1',
      jornadaId: 'conquista_aegon',
      slotNumber: 1,
      currentNodeId: 'j1_a1_mesa_pintada',
      characterSheet: { ...mockFicha, inspiracao: 1 },
      worldState: mockWorldState,
    });
    expect(resCriar.ok).toBe(true);
    if (!resCriar.ok) return;

    const slotInicial = resCriar.valor;

    // Executa um teste de atributo que gera rolagem (esc_proclamar_direto: comando DC 9)
    const turno1 = await executarTurnoAutoritativo({
      userId: 'usr_g1_1',
      slotId: slotInicial.id,
      escolhaId: 'esc_proclamar_direto',
      versaoEsperada: 0,
      journeyId: 'conquista_aegon',
      dadosFixos: [1, 2], // Força falha parcial
    });

    expect(turno1.novoSlot.versao).toBe(1);

    // Primeiro rerrolar: consome o único ponto de inspiração
    const rerrolar1 = await rerrolarComInspiracao({
      userId: 'usr_g1_1',
      slotId: slotInicial.id,
      versaoEsperada: turno1.novoSlot.versao,
      journeyId: 'conquista_aegon',
      dadosFixos: [3, 2], // Força sucesso regular (total 10 vs DC 9, sem bônus de crítico)
    });

    // Valida no retorno
    expect(rerrolar1.novoSlot.characterSheet.inspiracao).toBe(0);

    // RECARREGA DO REPOSITÓRIO: Deve persistir 0 no banco/repositório
    const slotRecarregado = await repo.obterSlotPorId('usr_g1_1', slotInicial.id);
    expect(slotRecarregado.ok).toBe(true);
    if (slotRecarregado.ok) {
      expect(slotRecarregado.valor.characterSheet.inspiracao).toBe(0);
    }

    // Segundo rerrolar sem inspiração deve FALHAR
    await expect(
      rerrolarComInspiracao({
        userId: 'usr_g1_1',
        slotId: slotInicial.id,
        versaoEsperada: rerrolar1.novoSlot.versao,
        journeyId: 'conquista_aegon',
      })
    ).rejects.toThrow(/inspiração/i);
  });

  it('2. Dois desfazeres seguidos devem voltar dois turnos em pilha; terceiro sem histórico deve falhar', async () => {
    const repo = getSaveRepository();
    const resCriar = await repo.criarSlot({
      userId: 'usr_g1_2',
      jornadaId: 'conquista_aegon',
      slotNumber: 1,
      currentNodeId: 'j1_a1_mesa_pintada',
      characterSheet: mockFicha,
      worldState: mockWorldState,
    });
    if (!resCriar.ok) return;

    const slot = resCriar.valor;

    // Turno 1: mesa_pintada -> oferta_argilac
    const t1 = await executarTurnoAutoritativo({
      userId: 'usr_g1_2',
      slotId: slot.id,
      escolhaId: 'esc_ouvir_argilac',
      versaoEsperada: 0,
      journeyId: 'conquista_aegon',
    });
    expect(t1.proximoNode.id).toBe('j1_a1_oferta_argilac');

    // Turno 2: oferta_argilac -> maos_cortadas
    const t2 = await executarTurnoAutoritativo({
      userId: 'usr_g1_2',
      slotId: slot.id,
      escolhaId: 'esc_propor_orys',
      versaoEsperada: t1.novoSlot.versao,
      journeyId: 'conquista_aegon',
    });
    expect(t2.proximoNode.id).toBe('j1_a1_maos_cortadas');

    // Desfazer 1: Deve voltar para 'j1_a1_oferta_argilac'
    const desfaz1 = await repo.desfazerUltimoTurno('usr_g1_2', slot.id);
    expect(desfaz1.ok).toBe(true);
    if (desfaz1.ok) {
      expect(desfaz1.valor.currentNodeId).toBe('j1_a1_oferta_argilac');
    }

    // Desfazer 2: Deve voltar para a cena inicial 'j1_a1_mesa_pintada'
    const desfaz2 = await repo.desfazerUltimoTurno('usr_g1_2', slot.id);
    expect(desfaz2.ok).toBe(true);
    if (desfaz2.ok) {
      expect(desfaz2.valor.currentNodeId).toBe('j1_a1_mesa_pintada');
    }

    // Desfazer 3: Sem mais turnos históricos válidos, deve falhar
    const desfaz3 = await repo.desfazerUltimoTurno('usr_g1_2', slot.id);
    expect(desfaz3.ok).toBe(false);
    if (!desfaz3.ok) {
      expect(desfaz3.erro).toBe('VALIDACAO');
    }
  });

  it('3. Execução com versaoEsperada divergente deve falhar com CONFLITO_VERSAO', async () => {
    const repo = getSaveRepository();
    const resCriar = await repo.criarSlot({
      userId: 'usr_g1_3',
      jornadaId: 'conquista_aegon',
      slotNumber: 1,
      currentNodeId: 'j1_a1_mesa_pintada',
      characterSheet: mockFicha,
      worldState: mockWorldState,
    });
    if (!resCriar.ok) return;

    await expect(
      executarTurnoAutoritativo({
        userId: 'usr_g1_3',
        slotId: resCriar.valor.id,
        escolhaId: 'esc_ouvir_argilac',
        versaoEsperada: 42, // Versão errada
        journeyId: 'conquista_aegon',
      })
    ).rejects.toThrow(/CONFLITO_VERSAO/);
  });

  it('4. Schema do turno rejeita estritamente corpos contendo ficha ou worldState', () => {
    // Corpo contendo propriedades legadas mutáveis (ficha e worldState)
    const corpoInvalido = {
      slotId: 'slot_1',
      escolhaId: 'esc_1',
      versaoEsperada: 0,
      ficha: mockFicha, // Não permitido
      worldState: mockWorldState, // Não permitido
      turnNumber: 1, // Não permitido
    };

    const parsed = TurnBodySchema.safeParse(corpoInvalido);
    expect(parsed.success).toBe(false);
    if (!parsed.success) {
      const issues = parsed.error.issues.map((i) => i.message);
      expect(issues.some((m) => m.includes('unrecognized') || m.includes('Unrecognized'))).toBe(true);
    }

    // Corpo válido estrito
    const corpoValido = {
      slotId: 'slot_1',
      escolhaId: 'esc_1',
      versaoEsperada: 0,
    };
    const parsedValido = TurnBodySchema.safeParse(corpoValido);
    expect(parsedValido.success).toBe(true);
  });

  it('5. Regressão S-09: Fluxo combinado (escolha -> rerrolar -> desfazer -> escolha normal) mantém sincronia', async () => {
    const repo = getSaveRepository();
    const resCriar = await repo.criarSlot({
      userId: 'usr_g1_reg',
      jornadaId: 'conquista_aegon',
      slotNumber: 1,
      currentNodeId: 'j1_a1_mesa_pintada',
      characterSheet: { ...mockFicha, inspiracao: 2 },
      worldState: mockWorldState,
    });
    expect(resCriar.ok).toBe(true);
    if (!resCriar.ok) return;

    let slot = resCriar.valor;

    // 1. Escolha normal (teste de atributo)
    const t1 = await executarTurnoAutoritativo({
      userId: 'usr_g1_reg',
      slotId: slot.id,
      escolhaId: 'esc_proclamar_direto',
      versaoEsperada: slot.versao,
      journeyId: 'conquista_aegon',
      dadosFixos: [1, 2],
    });
    slot = t1.novoSlot;
    expect(slot.versao).toBe(1);

    // 2. Rerrolagem atômica com Inspiração
    const rerrolado = await rerrolarComInspiracao({
      userId: 'usr_g1_reg',
      slotId: slot.id,
      versaoEsperada: slot.versao,
      journeyId: 'conquista_aegon',
      dadosFixos: [3, 2],
    });
    slot = rerrolado.novoSlot;
    expect(slot.characterSheet.inspiracao).toBe(1); // De 2 para 1

    // 3. Desfazer volta o turno rerrolado
    const desfaz = await repo.desfazerUltimoTurno('usr_g1_reg', slot.id, slot.versao);
    expect(desfaz.ok).toBe(true);
    if (!desfaz.ok) return;
    slot = desfaz.valor;
    expect(slot.currentNodeId).toBe('j1_a1_mesa_pintada');

    // 4. Próxima escolha normal a partir da cena restaurada
    const tFinal = await executarTurnoAutoritativo({
      userId: 'usr_g1_reg',
      slotId: slot.id,
      escolhaId: 'esc_ouvir_argilac',
      versaoEsperada: slot.versao,
      journeyId: 'conquista_aegon',
    });
    expect(tFinal.proximoNode.id).toBe('j1_a1_oferta_argilac');
    expect(tFinal.novoSlot.versao).toBeGreaterThan(slot.versao);
  });
});
