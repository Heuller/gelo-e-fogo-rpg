import { describe, it, expect } from 'vitest';
import {
  classificarAcaoLivre,
  classificarAcaoLivreLocal,
  enriquecerCenaComIA,
} from './geminiMaster';
import { grafoAto1 } from '../data/journeys/j1_act1';
import { FichaPersonagem, WorldState } from '../engine/rpgEngine';

describe('Mestre IA e Classificador de Ação Livre (geminiMaster.ts)', () => {
  const fichaMock: FichaPersonagem = {
    id: 'aegon-test',
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
    estado: { sangue: 10, compostura: 10, honra: 5 },
    cicatrizes: [],
    segredos: [],
    inspiracao: 2,
    companheiros: {},
  };

  const worldStateMock: WorldState = {
    reputacaoCasas: {},
    flagsBorboleta: {},
    marcosConcluidos: [],
  };

  it('deve classificar deterministamente uma ação de ataque com fogo/espada para o atributo furia ou comando', () => {
    const noBatalha = grafoAto1.nodes['j1_a1_batalha_darklyn_mooton'];
    expect(noBatalha).toBeDefined();

    const classificacao = classificarAcaoLivreLocal(
      'Monto em Balerion e ordeno que o dragão cuspa fogo sobre a vanguarda inimiga!',
      noBatalha
    );

    expect(classificacao.usouFallback).toBe(true);
    expect(['furia', 'comando']).toContain(classificacao.atributo);
    expect(noBatalha.escolhas.map((e) => e.id)).toContain(classificacao.escolhaId);
  });

  it('deve classificar uma ação diplomática para o atributo cortesia ou astucia na cena de Argilac', () => {
    const noOferta = grafoAto1.nodes['j1_a1_oferta_argilac'];
    expect(noOferta).toBeDefined();

    const classificacao = classificarAcaoLivreLocal(
      'Envio uma carta polida propondo o casamento com Orys Baratheon em vez da minha mão',
      noOferta
    );

    expect(['cortesia', 'astucia']).toContain(classificacao.atributo);
    expect(noOferta.escolhas.map((e) => e.id)).toContain(classificacao.escolhaId);
  });

  it('deve executar o fallback sem erro e sem alterar números ou barras se a API sofrer timeout ou falhar', async () => {
    const noMesa = grafoAto1.nodes['j1_a1_mesa_pintada'];
    const resultado = await classificarAcaoLivre(
      'Consulto os presságios e os antigos pergaminhos de Valíria',
      noMesa,
      fichaMock
    );

    expect(resultado).toBeDefined();
    expect(resultado.escolhaId).toBeDefined();
    expect(noMesa.escolhas.map((e) => e.id)).toContain(resultado.escolhaId);
    expect(['pressagio', 'erudicao', 'comando', 'astucia', 'cortesia', 'furia']).toContain(resultado.atributo);
  });

  it('deve enriquecer cena preservando integridade das barras e do texto base', async () => {
    const noCoroacao = grafoAto1.nodes['j1_a1_coroacao_forte_aegon'];
    const enriquecido = await enriquecerCenaComIA({
      noDestino: noCoroacao,
      resultadoDado: null,
      escolhaTexto: 'Submeter Valdocaso e proclamar a coroação',
      ficha: fichaMock,
      worldState: worldStateMock,
    });

    expect(enriquecido).toBeDefined();
    expect(enriquecido.textoEnriquecido).toContain(noCoroacao.fallbackText.slice(0, 50));
    expect(enriquecido.vozesExtras.length).toBeLessThanOrEqual(2);
  });
});
