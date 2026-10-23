import { describe, it, expect } from 'vitest';
import { LISTA_ACHADOS_MURALHA } from '../CadernoDeAchados';
import { NOMES_CANONICOS_MURALHA } from '../LivroDosNomes';
import {
  contarFlags,
  avaliarRelogio,
  sincronizarFlagsDeRelogios,
  RELOGIOS_JORNADA_4,
} from '@/lib/engine-shared/relogios';
import { WorldState } from '@/server/engine/rpgEngine';

describe('Fase 12 — Mecânicas Opcionais (Caderno de Achados, Livro dos Nomes e Relógios)', () => {
  it('o Caderno de Achados deve conter exatamente 14+ marginálias com fontes e âncoras válidas', () => {
    expect(LISTA_ACHADOS_MURALHA.length).toBeGreaterThanOrEqual(14);
    for (const achado of LISTA_ACHADOS_MURALHA) {
      expect(achado.flag).toMatch(/^ea_/);
      expect(achado.ancora).toMatch(/^C\d+/);
      expect(achado.titulo).toBeTruthy();
      expect(achado.notaCidadela).toBeTruthy();
      expect(achado.livro).toBeTruthy();
      expect(achado.capitulo).toBeTruthy();
    }
  });

  it('o Livro dos Nomes deve conter entradas canônicas essenciais da Muralha', () => {
    expect(NOMES_CANONICOS_MURALHA.length).toBeGreaterThanOrEqual(8);
    const nomes = NOMES_CANONICOS_MURALHA.map((n) => n.nome);
    expect(nomes).toContain('Jeor Mormont');
    expect(nomes).toContain('Donal Noye');
    expect(nomes).toContain('Ygritte');
    expect(nomes).toContain('Jon Snow');
    expect(nomes).toContain('Samwell Tarly');
    expect(nomes).toContain('Meistre Aemon Targaryen');
  });

  it('Relógios: deve contar ticks de prefixo e sincronizar flagCheio no WorldState', () => {
    const worldState: WorldState = {
      reputacaoCasas: {},
      marcosConcluidos: [],
      flagsBorboleta: {
        tick_cerco_a2_velhos: true,
        tick_cerco_a3_escada: true,
        tick_cerco_a3_hoste: true,
        tick_cerco_a3_tartaruga: true,
        tick_cerco_a3b_ponte: true,
        tick_cerco_a4_sortida: true,
        outra_flag_qualquer: true,
      },
    };

    const ticks = contarFlags(worldState, 'tick_cerco_');
    expect(ticks).toBe(6);

    const relogioCerco = RELOGIOS_JORNADA_4.cerco;
    const avaliacao = avaliarRelogio(worldState, relogioCerco);
    expect(avaliacao.cheio).toBe(true);
    expect(avaliacao.valor).toBe(6);

    const worldStateAtualizado = sincronizarFlagsDeRelogios(worldState, [relogioCerco]);
    expect(worldStateAtualizado.flagsBorboleta?.cerco_cheio).toBe(true);
  });
});
