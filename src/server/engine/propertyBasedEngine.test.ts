import { describe, it, expect } from 'vitest';
import {
  rolar2d6,
  aplicarDeltaEstado,
  FichaPersonagem,
  WorldState,
  DeltaEstado,
  calcularStatusAprovacao,
} from './rpgEngine';

describe('Testes de Propriedades e Invariantes do Motor (Property-Based Simulation)', () => {
  const criarFichaBase = (): FichaPersonagem => ({
    id: 'char_test',
    nome: 'Teste de Propriedades',
    origem: 'sangue_valiriano',
    atributos: { comando: 3, furia: 3, astucia: 3, cortesia: 3, erudicao: 3, pressagio: 3 },
    estado: { sangue: 5, compostura: 5, honra: 0 },
    cicatrizes: [],
    segredos: [],
    inspiracao: 2,
    companheiros: {
      comp1: { id: 'comp1', nome: 'Companheiro 1', titulo: 'Sor', aprovacao: 0, status: 'Neutro' },
    },
  });

  const criarMundoBase = (): WorldState => ({
    reputacaoCasas: {},
    flagsBorboleta: {},
    marcosConcluidos: [],
  });

  it('Propriedade 1: Rolagem 2d6 pura sempre resulta em valor dentro de [2, 12]', () => {
    // 500 simulações de dados aleatórios
    for (let i = 0; i < 500; i++) {
      const res = rolar2d6(0, 10);
      const somaDados = res.dados[0] + res.dados[1];
      expect(somaDados).toBeGreaterThanOrEqual(2);
      expect(somaDados).toBeLessThanOrEqual(12);
      expect(res.dados[0]).toBeGreaterThanOrEqual(1);
      expect(res.dados[0]).toBeLessThanOrEqual(6);
      expect(res.dados[1]).toBeGreaterThanOrEqual(1);
      expect(res.dados[1]).toBeLessThanOrEqual(6);
    }
  });

  it('Propriedade 2: Invariante de Barras Vitais: Sangue [0, 10], Compostura [0, 10], Honra [-10, 10]', () => {
    // Testar 200 variações com valores extremos positivos e negativos
    for (let i = 0; i < 200; i++) {
      const deltaAleatorio: DeltaEstado = {
        sangue: Math.floor(Math.random() * 50) - 25,     // -25 a +25
        compostura: Math.floor(Math.random() * 50) - 25, // -25 a +25
        honra: Math.floor(Math.random() * 50) - 25,      // -25 a +25
      };

      const ficha = criarFichaBase();
      const mundo = criarMundoBase();
      const { fichaAtualizada } = aplicarDeltaEstado(ficha, mundo, deltaAleatorio);

      expect(fichaAtualizada.estado.sangue).toBeGreaterThanOrEqual(0);
      expect(fichaAtualizada.estado.sangue).toBeLessThanOrEqual(10);

      expect(fichaAtualizada.estado.compostura).toBeGreaterThanOrEqual(0);
      expect(fichaAtualizada.estado.compostura).toBeLessThanOrEqual(10);

      expect(fichaAtualizada.estado.honra).toBeGreaterThanOrEqual(-10);
      expect(fichaAtualizada.estado.honra).toBeLessThanOrEqual(10);
    }
  });

  it('Propriedade 3: Invariante de Inspiração sempre permanece em [0, 4]', () => {
    for (let i = 0; i < 100; i++) {
      const delta: DeltaEstado = {
        inspiracao: Math.floor(Math.random() * 20) - 10, // -10 a +10
      };
      const ficha = criarFichaBase();
      const mundo = criarMundoBase();
      const { fichaAtualizada } = aplicarDeltaEstado(ficha, mundo, delta);

      expect(fichaAtualizada.inspiracao).toBeGreaterThanOrEqual(0);
      expect(fichaAtualizada.inspiracao).toBeLessThanOrEqual(4);
    }
  });

  it('Propriedade 4: Invariante de Aprovação de Companheiro sempre permanece em [-100, 100]', () => {
    for (let i = 0; i < 100; i++) {
      const delta: DeltaEstado = {
        aprovacaoCompanheiros: {
          comp1: Math.floor(Math.random() * 400) - 200, // -200 a +200
        },
      };
      const ficha = criarFichaBase();
      const mundo = criarMundoBase();
      const { fichaAtualizada } = aplicarDeltaEstado(ficha, mundo, delta);

      const aprov = fichaAtualizada.companheiros?.comp1.aprovacao!;
      expect(aprov).toBeGreaterThanOrEqual(-100);
      expect(aprov).toBeLessThanOrEqual(100);

      const statusCalculado = calcularStatusAprovacao(aprov);
      expect(fichaAtualizada.companheiros?.comp1.status).toBe(statusCalculado);
    }
  });

  it('Propriedade 5: Determinismo absoluto com dados fixos', () => {
    const dadosTeste: [number, number] = [3, 4];
    const atributo = 4;
    const dc = 10;

    const res1 = rolar2d6(atributo, dc, { dadosFixos: dadosTeste });
    const res2 = rolar2d6(atributo, dc, { dadosFixos: dadosTeste });

    expect(res1.total).toBe(res2.total);
    expect(res1.resultado).toBe(res2.resultado);
    expect(res1.dados).toEqual(res2.dados);
  });
});
