import { describe, it, expect } from 'vitest';
import {
  contarFlags,
  avaliarRelogio,
  sincronizarFlagsDeRelogios,
  RELOGIOS_JORNADA_4,
} from '../relogios';
import { WorldState } from '@/server/engine/rpgEngine';

describe('Relógios de Consequência (relogios.ts)', () => {
  const mockWorldState: WorldState = {
    reputacaoCasas: {},
    marcosConcluidos: [],
    flagsBorboleta: {
      tick_cerco_escada: true,
      tick_cerco_portao: true,
      tick_cerco_muralha: true,
      outra_flag_qualquer: true,
    },
  };

  it('deve contar estritamente as flags ativas com o prefixo do relógio', () => {
    const totalCerco = contarFlags(mockWorldState, 'tick_cerco_');
    expect(totalCerco).toBe(3);

    const totalFissura = contarFlags(mockWorldState, 'tick_fissura_');
    expect(totalFissura).toBe(0);
  });

  it('deve avaliar o progresso de segmentos e indicar cheio apenas no limite', () => {
    const cercoDef = RELOGIOS_JORNADA_4.cerco; // 6 segmentos
    const avaliacaoParcial = avaliarRelogio(mockWorldState, cercoDef);
    expect(avaliacaoParcial.valor).toBe(3);
    expect(avaliacaoParcial.maximo).toBe(6);
    expect(avaliacaoParcial.cheio).toBe(false);

    // Estado com 6 ticks
    const worldCheio: WorldState = {
      ...mockWorldState,
      flagsBorboleta: {
        ...mockWorldState.flagsBorboleta,
        tick_cerco_4: true,
        tick_cerco_5: true,
        tick_cerco_6: true,
      },
    };

    const avaliacaoCheia = avaliarRelogio(worldCheio, cercoDef);
    expect(avaliacaoCheia.valor).toBe(6);
    expect(avaliacaoCheia.cheio).toBe(true);
    expect(avaliacaoCheia.flagCheio).toBe('cerco_cheio');
  });

  it('deve derivar e sincronizar a flag de relógio cheio no WorldState', () => {
    const fissuraDef = RELOGIOS_JORNADA_4.fissura; // 4 segmentos
    const worldQuase: WorldState = {
      ...mockWorldState,
      flagsBorboleta: {
        tick_fissura_1: true,
        tick_fissura_2: true,
        tick_fissura_3: true,
        tick_fissura_4: true,
      },
    };

    const sincronizado = sincronizarFlagsDeRelogios(worldQuase, [fissuraDef]);
    expect(sincronizado.flagsBorboleta?.fissura_cheia).toBe(true);
  });
});
