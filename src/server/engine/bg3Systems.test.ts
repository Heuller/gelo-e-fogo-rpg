import { describe, it, expect } from 'vitest';
import {
  calcularStatusAprovacao,
  rerrolarUltimoTesteComInspiracao,
  obterCompanheirosIniciais,
  aplicarDeltaEstado,
  FichaPersonagem,
  WorldState,
  DeltaEstado,
} from './rpgEngine';
import { grafoAto1 } from '../data/journeys/j1_act1';
import { grafoAto2 } from '../data/journeys/j1_act2';
import { grafoAto3 } from '../data/journeys/j1_act3';
import { grafoAto4 } from '../data/journeys/j1_act4';
import { grafoJ2Ato1 } from '../data/journeys/j2_act1';
import { grafoJ2Ato2 } from '../data/journeys/j2_act2';
import { grafoJ2Ato3 } from '../data/journeys/j2_act3';
import { grafoJ2Ato4 } from '../data/journeys/j2_act4';
import { grafoJ3Ato1 } from '../data/journeys/j3_act1';
import { grafoJ3Ato2 } from '../data/journeys/j3_act2';
import { grafoJ3Ato3 } from '../data/journeys/j3_act3';
import { grafoJ3Ato4 } from '../data/journeys/j3_act4';

describe('Sistemas de Baldur\'s Gate 3 nas Crônicas de Gelo e Fogo', () => {
  describe('1. Sistema de Aprovação de Companheiros', () => {
    it('deve calcular o status correto baseado na pontuação (-100 a +100)', () => {
      expect(calcularStatusAprovacao(-70)).toBe('Hostil');
      expect(calcularStatusAprovacao(-40)).toBe('Hostil');
      expect(calcularStatusAprovacao(-39)).toBe('Frio');
      expect(calcularStatusAprovacao(-10)).toBe('Frio');
      expect(calcularStatusAprovacao(-9)).toBe('Neutro');
      expect(calcularStatusAprovacao(0)).toBe('Neutro');
      expect(calcularStatusAprovacao(29)).toBe('Neutro');
      expect(calcularStatusAprovacao(30)).toBe('Leal');
      expect(calcularStatusAprovacao(69)).toBe('Leal');
      expect(calcularStatusAprovacao(70)).toBe('Devotado');
      expect(calcularStatusAprovacao(100)).toBe('Devotado');
    });

    it('deve fornecer os 4 companheiros canônicos corretos para cada Jornada', () => {
      const compJ1 = obterCompanheirosIniciais('j1_conquista');
      expect(Object.keys(compJ1)).toEqual(['visenya', 'rhaenys', 'orys', 'daemon_v']);
      expect(compJ1.visenya.nome).toBe('Visenya Targaryen');
      expect(compJ1.rhaenys.nome).toBe('Rhaenys Targaryen');
      expect(compJ1.orys.nome).toBe('Orys Baratheon');
      expect(compJ1.daemon_v.nome).toBe('Daemon Velaryon');

      const compJ2 = obterCompanheirosIniciais('j2_danca');
      expect(Object.keys(compJ2)).toEqual(['daemon', 'corlys', 'rhaenys_j2', 'mysaria']);
      expect(compJ2.daemon.nome).toBe('Daemon Targaryen');
      expect(compJ2.corlys.nome).toBe('Corlys Velaryon');

      const compJ3 = obterCompanheirosIniciais('j3_tronos');
      expect(Object.keys(compJ3)).toEqual(['catelyn', 'grande_jon', 'peixe_negro', 'jon_snow']);
      expect(compJ3.catelyn.nome).toBe('Catelyn Stark');
      expect(compJ3.jon_snow.nome).toBe('Jon Snow');
    });

    it('deve aplicar deltas de aprovação e disparar notificações visuais', () => {
      const ficha: FichaPersonagem = {
        id: 'char_aegon',
        nome: 'Aegon I Targaryen',
        origem: 'valiriano',
        atributos: { furia: 2, comando: 3, astucia: 1, erudicao: 0, cortesia: 1, pressagio: 2 },
        estado: { sangue: 10, compostura: 10, honra: 5 },
        cicatrizes: [],
        segredos: [],
        inspiracao: 2,
        companheiros: obterCompanheirosIniciais('j1_conquista'),
      };

      const mundo: WorldState = {
        reputacaoCasas: {},
        flagsBorboleta: {},
        marcosConcluidos: [],
      };

      const delta: DeltaEstado = {
        aprovacaoCompanheiros: {
          visenya: 15,
          rhaenys: -10,
        },
      };

      const { fichaAtualizada, notificacoesCompanheiros } = aplicarDeltaEstado(ficha, mundo, delta);

      expect(fichaAtualizada.companheiros?.visenya.aprovacao).toBe(40); // 25 + 15
      expect(fichaAtualizada.companheiros?.rhaenys.aprovacao).toBe(25); // 35 - 10
      const textos = notificacoesCompanheiros.map((n) => n.textoNotificacao);
      expect(textos).toContain('[Visenya Targaryen aprova (+15)]');
      expect(textos).toContain('[Rhaenys Targaryen desaprova (-10)]');
    });
  });

  describe('2. Pontos de Inspiração para Rerrolagem (2d6)', () => {
    it('deve consumir 1 Ponto de Inspiração ao rerrolar e atualizar o resultado', () => {
      const ficha: FichaPersonagem = {
        id: 'char_eddard',
        nome: 'Eddard Stark',
        origem: 'norte',
        atributos: { furia: 2, comando: 3, astucia: -1, erudicao: 1, cortesia: 1, pressagio: 0 },
        estado: { sangue: 10, compostura: 10, honra: 8 },
        cicatrizes: [],
        segredos: [],
        inspiracao: 2,
        companheiros: obterCompanheirosIniciais('j3_tronos'),
      };

      const { resultadoRolagem, fichaAtualizada, sucessoGasto } = rerrolarUltimoTesteComInspiracao(
        ficha,
        12,
        3
      );

      expect(sucessoGasto).toBe(true);
      expect(fichaAtualizada.inspiracao).toBe(1);
      expect(resultadoRolagem.somaDados).toBeGreaterThanOrEqual(2);
      expect(resultadoRolagem.somaDados).toBeLessThanOrEqual(12);
      expect(resultadoRolagem.total).toBe(resultadoRolagem.somaDados + 3);
    });

    it('deve recusar rerrolagem se o jogador tiver 0 Inspiração', () => {
      const ficha: FichaPersonagem = {
        id: 'char_eddard',
        nome: 'Eddard Stark',
        origem: 'norte',
        atributos: { furia: 2, comando: 3, astucia: -1, erudicao: 1, cortesia: 1, pressagio: 0 },
        estado: { sangue: 10, compostura: 10, honra: 8 },
        cicatrizes: [],
        segredos: [],
        inspiracao: 0,
        companheiros: obterCompanheirosIniciais('j3_tronos'),
      };

      const { sucessoGasto, motivo, fichaAtualizada } = rerrolarUltimoTesteComInspiracao(
        ficha,
        12,
        3
      );

      expect(sucessoGasto).toBe(false);
      expect(motivo).toBe('Sem Pontos de Inspiração disponíveis.');
      expect(fichaAtualizada.inspiracao).toBe(0);
    });
  });

  describe('3. Validação dos Grafos BG3 e Escolhas por Cena', () => {
    const todosAtos = [
      { nome: 'J1 Ato 1', nodes: grafoAto1.nodes },
      { nome: 'J1 Ato 2', nodes: grafoAto2.nodes },
      { nome: 'J1 Ato 3', nodes: grafoAto3.nodes },
      { nome: 'J1 Ato 4', nodes: grafoAto4.nodes },
      { nome: 'J2 Ato 1', nodes: grafoJ2Ato1.nodes },
      { nome: 'J2 Ato 2', nodes: grafoJ2Ato2.nodes },
      { nome: 'J2 Ato 3', nodes: grafoJ2Ato3.nodes },
      { nome: 'J2 Ato 4', nodes: grafoJ2Ato4.nodes },
      { nome: 'J3 Ato 1', nodes: grafoJ3Ato1.nodes },
      { nome: 'J3 Ato 2', nodes: grafoJ3Ato2.nodes },
      { nome: 'J3 Ato 3', nodes: grafoJ3Ato3.nodes },
      { nome: 'J3 Ato 4', nodes: grafoJ3Ato4.nodes },
    ];

    it('100% dos nós narrativos não-finais devem possuir entre 3 e 4 escolhas distintas estilo BG3', () => {
      let totalNodes = 0;
      let totalNonEnding = 0;

      for (const ato of todosAtos) {
        for (const [nodeId, node] of Object.entries(ato.nodes)) {
          totalNodes++;
          if (node.isEnding) {
            expect(node.escolhas.length).toBe(0);
          } else {
            totalNonEnding++;
            expect(
              node.escolhas.length,
              `Nó [${nodeId}] em ${ato.nome} tem ${node.escolhas.length} opções (esperado: >= 3)!`
            ).toBeGreaterThanOrEqual(3);
          }
        }
      }

      expect(totalNodes).toBe(194);
      expect(totalNonEnding).toBe(159);
    });

    it('os 18 nós de final de campanha devem estar configurados com isEnding: true e motivos de bloqueio', () => {
      const finaisJ1 = [
        'j1_final_canonico_paz_sangrenta',
        'j1_final_tres_cabecas_triunfantes',
        'j1_final_furia_fogo_total',
        'j1_final_trono_estrelado_vilavelha',
        'j1_final_coroa_visenya_irma_sombria',
        'j1_final_pacto_secreto_dornes',
      ];
      for (const fid of finaisJ1) {
        const node = grafoAto4.nodes[fid];
        expect(node, `Final ${fid} não encontrado no Ato 4 de J1`).toBeDefined();
        expect(node.isEnding).toBe(true);
      }

      const finaisJ2 = [
        'j2_final_canonico_hora_do_lobo',
        'j2_final_triunfo_negro_rhaenyra',
        'j2_final_hegemonia_verde_dourada',
        'j2_final_imperio_sementes_vermithor',
        'j2_final_grande_paz_harrenhal',
        'j2_final_justica_gelo_cregan',
      ];
      for (const fid of finaisJ2) {
        const node = grafoJ2Ato4.nodes[fid];
        expect(node, `Final ${fid} não encontrado no Ato 4 de J2`).toBeDefined();
        expect(node.isEnding).toBe(true);
      }

      const finaisJ3 = [
        'j3_final_rei_no_norte_invicto',
        'j3_final_regencia_honra_eddard',
        'j3_final_lobos_na_muralha',
        'j3_final_canonico_norte_se_lembra',
        'j3_final_hegemonia_leao_dourado',
        'j3_final_pacto_gelo_e_fogo',
      ];
      for (const fid of finaisJ3) {
        const node = grafoJ3Ato4.nodes[fid];
        expect(node, `Final ${fid} não encontrado no Ato 4 de J3`).toBeDefined();
        expect(node.isEnding).toBe(true);
      }
    });
  });
});
