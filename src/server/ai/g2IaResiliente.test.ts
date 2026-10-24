import { describe, it, expect, beforeEach } from 'vitest';
import {
  gerarChaveCacheIA,
  obterCacheIA,
  salvarCacheIA,
  verificarEIncrementarCotaIA,
  limparCacheParaTestes,
} from './cacheELimites';
import { processarEscolhaAction, obterTextoMestreAction } from '@/app/actions/gameActions';
import { getSaveRepository, setSaveRepositoryForTesting } from '@/server/saves';
import { MemoriaSaveRepository } from '@/server/saves/memoria';
import { obterCenaInicialJornada } from '@/server/data/journeys/index';

describe('Fase G2 — IA Fora do Caminho Crítico, Cache e Cota Persistente', () => {
  beforeEach(() => {
    limparCacheParaTestes();
    setSaveRepositoryForTesting(new MemoriaSaveRepository());
  });

  it('deve gerar chave de cache estável e determinística para o mesmo contexto', () => {
    const worldState1 = {
      reputacaoCasas: { stark: 10 },
      flagsBorboleta: { honra_guardada: true, alianca_stark: 'firme' },
      marcosConcluidos: ['marco_1', 'marco_2'],
    };
    const worldState2 = {
      reputacaoCasas: { stark: 10 },
      // Mesmas flags em ordem diferente
      flagsBorboleta: { alianca_stark: 'firme', honra_guardada: true },
      marcosConcluidos: ['marco_1', 'marco_2'],
    };

    const chave1 = gerarChaveCacheIA('j4_patrulha', 'j4_a1_topo', worldState1, null);
    const chave2 = gerarChaveCacheIA('j4_patrulha', 'j4_a1_topo', worldState2, null);

    expect(chave1).toBe(chave2);
    expect(chave1).toContain('j4_patrulha:j4_a1_topo:');
  });

  it('deve gravar e recuperar do cache sem consultar a API externa', async () => {
    const chave = 'j4:cena_teste:hash123';
    await salvarCacheIA(chave, 'j4', 'cena_teste', 'Texto enriquecido do cache', [
      { voz: 'pressagio', fala: 'Um presságio gravado no gelo.' },
    ]);

    const resCache = await obterCacheIA(chave);
    expect(resCache).not.toBeNull();
    expect(resCache?.textoEnriquecido).toBe('Texto enriquecido do cache');
    expect(resCache?.vozesExtras).toHaveLength(1);
    expect(resCache?.vozesExtras[0].voz).toBe('pressagio');
  });

  it('deve bloquear chamadas quando a cota diária for ultrapassada', async () => {
    const userId = 'user-teste-cota';
    const limite = 3;

    for (let i = 0; i < limite; i++) {
      const checagem = await verificarEIncrementarCotaIA(userId, 50, limite);
      expect(checagem.permitido).toBe(true);
    }

    // A 4ª chamada deve ser barrada pela cota
    const barrada = await verificarEIncrementarCotaIA(userId, 50, limite);
    expect(barrada.permitido).toBe(false);
    expect(barrada.motivo).toContain('Cota diária');
  });

  it('processarEscolhaAction deve responder de imediato com fallbackText canônico sem aguardar a IA', async () => {
    const userId = 'd5f86911-0f14-497d-9a9c-7258a2eb18cd';
    const repo = getSaveRepository();
    const inicial = obterCenaInicialJornada('conquista_aegon');

    const resSlot = await repo.criarSlot({
      userId,
      jornadaId: 'conquista_aegon',
      slotNumber: 1,
      currentNodeId: inicial.node.id,
      characterSheet: inicial.fichaInicial,
      worldState: inicial.worldStateInicial,
    });

    if (!resSlot.ok) throw new Error('Falha ao criar slot de teste');

    const inicio = Date.now();
    const resTurno = await processarEscolhaAction({
      slotId: resSlot.valor.id,
      escolhaId: inicial.node.escolhas[0].id,
      versaoEsperada: resSlot.valor.versao,
      usarIA: true,
      journeyId: 'conquista_aegon',
    });
    const duracao = Date.now() - inicio;

    // TTFT no servidor deve ser ultra-rápido (< 300ms)
    expect(duracao).toBeLessThan(300);
    expect(resTurno.proximoNode).toBeDefined();
    expect(resTurno.textoEnriquecido).toBe(resTurno.proximoNode.fallbackText);
  });

  it('obterTextoMestreAction deve consultar e devolver enriquecimento com suporte a cache', async () => {
    const userId = 'd5f86911-0f14-497d-9a9c-7258a2eb18cd';
    const repo = getSaveRepository();
    const inicial = obterCenaInicialJornada('conquista_aegon');

    const resSlot = await repo.criarSlot({
      userId,
      jornadaId: 'conquista_aegon',
      slotNumber: 1,
      currentNodeId: inicial.node.id,
      characterSheet: inicial.fichaInicial,
      worldState: inicial.worldStateInicial,
    });
    if (!resSlot.ok) throw new Error('Falha ao criar slot');

    const chave = gerarChaveCacheIA('conquista_aegon', inicial.node.id, inicial.worldStateInicial, null);
    await salvarCacheIA(chave, 'conquista_aegon', inicial.node.id, 'Narrativa rica do Mestre em cache.', [
      { voz: 'comando', fala: 'A espada é a única lei dos reis.' },
    ]);

    const resMestre = await obterTextoMestreAction({
      slotId: resSlot.valor.id,
      nodeId: inicial.node.id,
      journeyId: 'conquista_aegon',
    });

    expect(resMestre.usouFallback).toBe(false);
    expect(resMestre.textoEnriquecido).toBe('Narrativa rica do Mestre em cache.');
    expect(resMestre.vozesExtras).toHaveLength(1);
    expect(resMestre.vozesExtras[0].voz).toBe('comando');
  });
});
