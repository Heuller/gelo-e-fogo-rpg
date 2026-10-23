import { describe, it, expect } from 'vitest';
import {
  obterGuiaEstilo,
  validarAnacronismosEra,
  construirPromptMestre,
  GUIAS_DE_ESTILO_POR_JORNADA,
} from '../guiasDeEstilo';
import { NodeJornada } from '@/server/engine/storyLinter';
import { FichaPersonagem } from '@/server/engine/rpgEngine';

describe('Guias de Estilo e Guardrails Temporais do Mestre IA (Fase 11)', () => {
  it('todas as 4 eras canônicas devem possuir guias de estilo detalhados', () => {
    const erasEsperadas = ['conquista_aegon', 'danca_dragoes', 'guerra_tronos', 'patrulha_muralha'];
    for (const era of erasEsperadas) {
      const guia = GUIAS_DE_ESTILO_POR_JORNADA[era];
      expect(guia).toBeDefined();
      expect(guia.tomNarrativo.length).toBeGreaterThan(20);
      expect(guia.diretrizesEstilo.length).toBeGreaterThanOrEqual(3);
      expect(guia.personagensPermitidos.length).toBeGreaterThanOrEqual(10);
      expect(guia.anacronismosProibidos.length).toBeGreaterThanOrEqual(5);
      expect(guia.sensoriaisChave.length).toBeGreaterThanOrEqual(5);
    }
  });

  describe('Validação de Anacronismos: A Conquista de Aegon', () => {
    it('deve aprovar texto puramente canônico da Conquista', () => {
      const texto = 'Balerion sobrevoou as muralhas de Harrenhal com chamas negras enquanto Aegon exigia submissão.';
      const res = validarAnacronismosEra(texto, 'conquista_aegon');
      expect(res.valido).toBe(true);
      expect(res.anacronismosEncontrados).toHaveLength(0);
    });

    it('deve barrar menções a personagens da Guerra dos Cinco Reis na Conquista', () => {
      const texto = 'Aegon conversou com Daenerys e Tyrion sobre o destino do Trono de Ferro.';
      const res = validarAnacronismosEra(texto, 'conquista_aegon');
      expect(res.valido).toBe(false);
      expect(res.anacronismosEncontrados).toContain('Daenerys');
      expect(res.anacronismosEncontrados).toContain('Tyrion');
    });

    it('deve barrar menções a personagens da Dança dos Dragões na Conquista', () => {
      const texto = 'Aemond Caolho desembainhou a espada perante a Rainha Rhaenyra.';
      const res = validarAnacronismosEra(texto, 'conquista_aegon');
      expect(res.valido).toBe(false);
      expect(res.anacronismosEncontrados).toContain('Rhaenyra');
      expect(res.anacronismosEncontrados).toContain('Aemond');
    });

    it('deve barrar armas e tecnologias modernas', () => {
      const texto = 'O guerreiro sacou um rifle com polvora e disparou.';
      const res = validarAnacronismosEra(texto, 'conquista_aegon');
      expect(res.valido).toBe(false);
      expect(res.anacronismosEncontrados).toContain('rifle');
      expect(res.anacronismosEncontrados).toContain('polvora');
    });
  });

  describe('Validação de Anacronismos: A Dança dos Dragões', () => {
    it('deve aprovar narrativa fiel à Dança dos Dragões', () => {
      const texto = 'Daemon e Caraxes sobrevoaram o Olho de Deus aguardando Vhagar nas nuvens de chuva.';
      const res = validarAnacronismosEra(texto, 'danca_dragoes');
      expect(res.valido).toBe(true);
    });

    it('deve barrar menção a Robert Baratheon ou Jon Snow na Dança', () => {
      const texto = 'Robert Baratheon bradou com seu martelo ao lado de Jon Snow.';
      const res = validarAnacronismosEra(texto, 'danca_dragoes');
      expect(res.valido).toBe(false);
      expect(res.anacronismosEncontrados).toContain('Jon Snow');
    });
  });

  describe('Validação de Anacronismos: A Guerra dos Cinco Reis', () => {
    it('deve aprovar prosa canônica da Guerra dos Cinco Reis', () => {
      const texto = 'Lorde Eddard Stark empunhou Gelo sob o represeiro de Winterfell antes do amanhecer.';
      const res = validarAnacronismosEra(texto, 'guerra_tronos');
      expect(res.valido).toBe(true);
    });

    it('deve barrar dragões vivos voando na Guerra dos Cinco Reis em Westeros', () => {
      const texto = 'Balerion desceu rugindo sobre a Fortaleza Vermelha com suas asas negras.';
      const res = validarAnacronismosEra(texto, 'guerra_tronos');
      expect(res.valido).toBe(false);
      expect(res.anacronismosEncontrados).toContain('Balerion');
    });
  });

  describe('Construção de Prompt do Mestre', () => {
    const noMock: NodeJornada = {
      id: 'no_teste_muralha',
      titulo: 'A Sentinela da Noite',
      anoHistorico: '299 d.C.',
      localizacao: 'Castelo Negro',
      regionId: 'muralha',
      fallbackText: 'O gelo da Muralha range sob o vendaval do norte.',
      loreContext: {
        fonte: {
          arquivo_md: 'corpus_md/jornada_4/cap1.md',
          livro: 'A Tormenta de Espadas',
          capitulo: 'Jon I',
        },
      },
      escolhas: [],
    };

    const fichaMock: FichaPersonagem = {
      id: 'jon_snow',
      nome: 'Jon Snow',
      origem: 'honra_do_norte',
      atributos: { comando: 4, furia: 3, astucia: 3, cortesia: 2, erudicao: 3, pressagio: 3 },
      estado: { sangue: 10, compostura: 10, honra: 5 },
      cicatrizes: [],
      segredos: [],
      inspiracao: 1,
      companheiros: {},
    };

    it('deve construir prompt contendo a era, o protagonista e diretrizes sensoriais', () => {
      const prompt = construirPromptMestre({
        jornadaId: 'patrulha_muralha',
        noDestino: noMock,
        resultadoDado: null,
        escolhaTexto: 'Subir ao topo da Muralha na gaiola de ferro',
        ficha: fichaMock,
      });

      expect(prompt).toContain('Irmão Sem Nome');
      expect(prompt).toContain('Jon Snow');
      expect(prompt).toContain('Castelo Negro');
      expect(prompt).toContain('vento polar');
      expect(prompt).toContain('RESTRIÇÕES INVIOLÁVEIS');
    });
  });
});
