import { describe, it, expect } from 'vitest';
import {
  rolar2d6,
  aplicarDeltaEstado,
  FichaPersonagem,
  WorldState,
  DeltaEstado,
} from './rpgEngine';
import {
  validarGrafoJornada,
  GrafoJornada,
} from './storyLinter';
import {
  obterGlossario,
  buscarTermoGlossario,
  buscarPorCategoria,
  obterCronologiaJ1,
  obterPersonagensJ1,
  obterDragoesJ1,
  obterGanchosJ1,
} from '../data/lore';

describe('1. Motor Determinístico 2d6 (rolar2d6)', () => {
  it('deve gerar CRITICO quando total >= dc + 3', () => {
    // Atributo 3 + dados [5, 4] (soma 9) = 12 contra DC 9 (margem +3)
    const resultado = rolar2d6(3, 9, { dadosFixos: [5, 4] });
    expect(resultado.resultado).toBe('CRITICO');
    expect(resultado.total).toBe(12);
    expect(resultado.morteCanonica).toBe(false);
  });

  it('deve gerar CRITICO com duplo 6 natural [6, 6] mesmo se total < dc + 3', () => {
    // Atributo 1 + dados [6, 6] (soma 12) = 13 contra DC 11 (margem +2, normalmente sucesso comum)
    const resultado = rolar2d6(1, 11, { dadosFixos: [6, 6] });
    expect(resultado.resultado).toBe('CRITICO');
    expect(resultado.morteCanonica).toBe(false);
  });

  it('deve gerar SUCESSO quando total >= dc mas < dc + 3', () => {
    // Atributo 2 + dados [4, 4] (soma 8) = 10 contra DC 10 (margem 0)
    const resultado = rolar2d6(2, 10, { dadosFixos: [4, 4] });
    expect(resultado.resultado).toBe('SUCESSO');
    expect(resultado.morteCanonica).toBe(false);
  });

  it('deve gerar FALHA_PARCIAL quando total === dc - 1 ou dc - 2', () => {
    // Total 9 contra DC 10 (margem -1)
    const res1 = rolar2d6(2, 10, { dadosFixos: [3, 4] });
    expect(res1.resultado).toBe('FALHA_PARCIAL');
    expect(res1.morteCanonica).toBe(false);

    // Total 8 contra DC 10 (margem -2)
    const res2 = rolar2d6(2, 10, { dadosFixos: [3, 3] });
    expect(res2.resultado).toBe('FALHA_PARCIAL');
    expect(res2.morteCanonica).toBe(false);
  });

  it('deve gerar FALHA_PARCIAL (Fail Forward) quando total <= dc - 3 e riscoMortal é false', () => {
    // Total 5 contra DC 10 (margem -5), sem risco mortal
    const resultado = rolar2d6(1, 10, { riscoMortal: false, dadosFixos: [2, 2] });
    expect(resultado.resultado).toBe('FALHA_PARCIAL');
    expect(resultado.morteCanonica).toBe(false);
    expect(resultado.complicacaoNarrativa).toBe(true);
  });

  it('deve gerar FALHA_CRITICA com morteCanonica: true quando total <= dc - 3 e riscoMortal é true', () => {
    // Total 6 contra DC 10 (margem -4), com risco mortal
    const resultado = rolar2d6(2, 10, { riscoMortal: true, dadosFixos: [2, 2] });
    expect(resultado.resultado).toBe('FALHA_CRITICA');
    expect(resultado.morteCanonica).toBe(true);
  });

  it('deve gerar FALHA_CRITICA com duplo 1 natural [1, 1] e riscoMortal é true', () => {
    // Atributo 4 + [1, 1] = 6 contra DC 8
    const resultado = rolar2d6(4, 8, { riscoMortal: true, dadosFixos: [1, 1] });
    expect(resultado.resultado).toBe('FALHA_CRITICA');
    expect(resultado.morteCanonica).toBe(true);
  });
});

describe('2. Aplicação de Delta de Estado (aplicarDeltaEstado)', () => {
  const fichaInicial: FichaPersonagem = {
    id: 'aegon-conquistador',
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
      compostura: 8,
      honra: 5,
    },
    cicatrizes: [],
    segredos: [],
  };

  const worldStateInicial: WorldState = {
    reputacaoCasas: { Stark: 0, Durrandon: -2 },
    flagsBorboleta: { conheceu_visenya: true },
    marcosConcluidos: ['desembarque'],
  };

  it('deve respeitar os limites mínimos (clamp 0 para sangue/compostura e -10 para honra)', () => {
    const delta: DeltaEstado = {
      sangue: -15, // Deve limitar em 0
      compostura: -20, // Deve limitar em 0
      honra: -25, // Deve limitar em -10
    };
    const { fichaAtualizada } = aplicarDeltaEstado(fichaInicial, worldStateInicial, delta);
    expect(fichaAtualizada.estado.sangue).toBe(0);
    expect(fichaAtualizada.estado.compostura).toBe(0);
    expect(fichaAtualizada.estado.honra).toBe(-10);
  });

  it('deve respeitar os limites máximos (clamp 10)', () => {
    const delta: DeltaEstado = {
      sangue: 5, // 10 + 5 -> 10
      compostura: 10, // 8 + 10 -> 10
      honra: 10, // 5 + 10 -> 10
    };
    const { fichaAtualizada } = aplicarDeltaEstado(fichaInicial, worldStateInicial, delta);
    expect(fichaAtualizada.estado.sangue).toBe(10);
    expect(fichaAtualizada.estado.compostura).toBe(10);
    expect(fichaAtualizada.estado.honra).toBe(10);
  });

  it('deve adicionar cicatrizes, segredos e reputação de casas sem mutar o original', () => {
    const delta: DeltaEstado = {
      novaCicatriz: 'Corte no Ombro por Lança dornesa',
      novoSegredo: 'A Carta Secreta de Nymor',
      reputacaoCasas: { Stark: 2, Tully: 5 },
      flagsBorboleta: { salvou_meraxes: true },
      marcoConcluido: 'paz_com_dorne',
    };
    const { fichaAtualizada, worldStateAtualizado } = aplicarDeltaEstado(
      fichaInicial,
      worldStateInicial,
      delta
    );

    // Ficha atualizada
    expect(fichaAtualizada.cicatrizes).toContain('Corte no Ombro por Lança dornesa');
    expect(fichaAtualizada.segredos).toContain('A Carta Secreta de Nymor');
    expect(fichaInicial.cicatrizes.length).toBe(0); // Imutável

    // WorldState atualizado
    expect(worldStateAtualizado.reputacaoCasas['Stark']).toBe(2);
    expect(worldStateAtualizado.reputacaoCasas['Tully']).toBe(5);
    expect(worldStateAtualizado.reputacaoCasas['Durrandon']).toBe(-2);
    expect(worldStateAtualizado.flagsBorboleta['salvou_meraxes']).toBe(true);
    expect(worldStateAtualizado.marcosConcluidos).toContain('paz_com_dorne');
    expect(worldStateInicial.marcosConcluidos.length).toBe(1); // Imutável
  });
});

describe('3. Loader da Bíblia Canônica e Glossário da Cidadela', () => {
  it('deve carregar todos os itens do glossário expandido da Cidadela (220+ verbetes)', () => {
    const glossario = obterGlossario();
    expect(glossario.length).toBeGreaterThanOrEqual(220);
  });

  it('deve buscar com sucesso termos fundamentais da Conquista', () => {
    const fogonegro = buscarTermoGlossario('Fogonegro');
    expect(fogonegro).toBeDefined();
    expect(fogonegro?.categoria).toBe('artefato_espada');
    expect(fogonegro?.fonte.livro).toContain('Fogo & Sangue');

    const balerion = buscarTermoGlossario('Balerion, o Terror Negro');
    expect(balerion).toBeDefined();
    expect(balerion?.categoria).toBe('dragao');

    const trono = buscarTermoGlossario('O Trono de Ferro');
    expect(trono).toBeDefined();
    expect(trono?.categoria).toBe('artefato_espada');

    const meistres = buscarTermoGlossario('Meistres da Cidadela');
    expect(meistres).toBeDefined();
  });

  it('deve filtrar corretamente verbetes por categoria', () => {
    const dragoes = buscarPorCategoria('dragao');
    expect(dragoes.length).toBeGreaterThanOrEqual(3);

    const casas = buscarPorCategoria('grande_casa');
    expect(casas.length).toBe(15);
  });

  it('deve carregar a cronologia com 10 marcos e 17 personagens canônicos', () => {
    const cronologia = obterCronologiaJ1();
    expect(cronologia.length).toBe(10);
    expect(cronologia[0].periodo).toContain('2 a.C.');
    expect(cronologia[cronologia.length - 1].periodo).toContain('13 d.C.');

    const personagens = obterPersonagensJ1();
    expect(personagens.length).toBe(17);

    const dragoes = obterDragoesJ1();
    expect(dragoes.length).toBeGreaterThanOrEqual(3);

    const ganchos = obterGanchosJ1();
    expect(ganchos.length).toBe(4);
    expect(ganchos.every((g) => g.origem === 'original')).toBe(true);
  });
});

describe('4. Linter Narrativo com Zod (validarGrafoJornada)', () => {
  const grafoValido: GrafoJornada = {
    id: 'j1_ato_1_teste',
    titulo: 'Ato I - A Mesa Pintada',
    startNodeId: 'node_inicio',
    nodes: {
      node_inicio: {
        id: 'node_inicio',
        titulo: 'A Reunião em Pedra do Dragão',
        fallbackText: 'Aegon contempla a Mesa Pintada enquanto o vento do mar ruge.',
        loreContext: {
          fonte: {
            arquivo_md: 'fogo-e-sangue_01_a-conquista-de-aegon.md',
            livro: 'Fogo & Sangue',
            capitulo: 'A Conquista de Aegon',
          },
        },
        escolhas: [
          {
            id: 'esc_simples',
            texto: 'Convocar os vassalos de Valíria',
            tipo: 'simples',
            nextNodeId: 'node_vassalos',
          },
          {
            id: 'esc_teste',
            texto: 'Impor submissão a Argilac pela força',
            tipo: 'teste_atributo',
            atributo: 'comando',
            dc: 8,
            riscoMortal: true,
            onSuccessNodeId: 'node_vassalos',
            onPartialFailureNodeId: 'node_complicacao',
            onCriticalFailureNodeId: 'node_morte',
          },
        ],
      },
      node_vassalos: {
        id: 'node_vassalos',
        titulo: 'O Desembarque na Foz da Água Negra',
        fallbackText: 'As velas com o dragão tricéfalo partem para Westeros.',
        loreContext: {
          fonte: {
            arquivo_md: 'fogo-e-sangue_01_a-conquista-de-aegon.md',
            livro: 'Fogo & Sangue',
            capitulo: 'A Conquista de Aegon',
          },
        },
        escolhas: [],
        isEnding: true,
      },
      node_complicacao: {
        id: 'node_complicacao',
        titulo: 'Complicações Diplomáticas',
        fallbackText: 'Argilac envia as mãos dos emissários decepadas.',
        loreContext: {
          fonte: {
            arquivo_md: 'fogo-e-sangue_01_a-conquista-de-aegon.md',
            livro: 'Fogo & Sangue',
            capitulo: 'A Conquista de Aegon',
          },
        },
        escolhas: [],
        isEnding: true,
      },
      node_morte: {
        id: 'node_morte',
        titulo: 'Morte Canônica em Duelo',
        fallbackText: 'A lança encontra seu coração em meio à tempestade.',
        loreContext: {
          fonte: {
            arquivo_md: 'fogo-e-sangue_01_a-conquista-de-aegon.md',
            livro: 'Fogo & Sangue',
            capitulo: 'A Conquista de Aegon',
          },
        },
        escolhas: [],
        isEnding: true,
      },
    },
  };

  it('deve validar com sucesso um grafo narrativo perfeito', () => {
    const relatorio = validarGrafoJornada(grafoValido);
    expect(relatorio.valido).toBe(true);
    expect(relatorio.erros.length).toBe(0);
    expect(relatorio.estatisticas.totalNos).toBe(4);
    expect(relatorio.estatisticas.nosAlcancaveis).toBe(4);
    expect(relatorio.estatisticas.testesComRiscoMortal).toBe(1);
  });

  it('deve acusar erro quando nextNodeId apontar para nó inexistente', () => {
    const grafoQuebrado: GrafoJornada = {
      ...grafoValido,
      nodes: {
        ...grafoValido.nodes,
        node_inicio: {
          ...grafoValido.nodes['node_inicio'],
          escolhas: [
            {
              id: 'esc_fantasma',
              texto: 'Caminho inexistente',
              tipo: 'simples',
              nextNodeId: 'node_que_nao_existe',
            },
          ],
        },
      },
    };
    const relatorio = validarGrafoJornada(grafoQuebrado);
    expect(relatorio.valido).toBe(false);
    expect(relatorio.erros.some((e) => e.includes('nextNodeId inexistente'))).toBe(true);
  });

  it('deve acusar erro quando houver nó órfão inalcançável', () => {
    const grafoComOrfao: GrafoJornada = {
      ...grafoValido,
      nodes: {
        ...grafoValido.nodes,
        node_orfao: {
          id: 'node_orfao',
          titulo: 'Nó Ilhado',
          fallbackText: 'Nenhum caminho conduz a este lugar.',
          loreContext: {
            fonte: {
              arquivo_md: 'fogo-e-sangue_01_a-conquista-de-aegon.md',
              livro: 'Fogo & Sangue',
              capitulo: 'A Conquista de Aegon',
            },
          },
          escolhas: [],
          isEnding: true,
        },
      },
    };
    const relatorio = validarGrafoJornada(grafoComOrfao);
    expect(relatorio.valido).toBe(false);
    expect(relatorio.erros.some((e) => e.includes('Nó Órfão'))).toBe(true);
  });

  it('deve acusar erro se escolha com riscoMortal não tiver onCriticalFailureNodeId', () => {
    const grafoSemMorte: GrafoJornada = {
      ...grafoValido,
      nodes: {
        ...grafoValido.nodes,
        node_inicio: {
          ...grafoValido.nodes['node_inicio'],
          escolhas: [
            {
              id: 'esc_arriscada',
              texto: 'Avançar com risco mortal sem destino de morte',
              tipo: 'teste_atributo',
              atributo: 'furia',
              dc: 10,
              riscoMortal: true,
              onSuccessNodeId: 'node_vassalos',
              onPartialFailureNodeId: 'node_complicacao',
              // onCriticalFailureNodeId ausente intencionalmente
            },
          ],
        },
      },
    };
    const relatorio = validarGrafoJornada(grafoSemMorte);
    expect(relatorio.valido).toBe(false);
    expect(relatorio.erros.some((e) => e.includes('Morte Sem Destino'))).toBe(true);
  });

  it('deve acusar erro se nó não possuir fallbackText ou fonte de lore', () => {
    const grafoSemLore: GrafoJornada = {
      ...grafoValido,
      nodes: {
        ...grafoValido.nodes,
        node_inicio: {
          ...grafoValido.nodes['node_inicio'],
          fallbackText: '', // Texto vazio!
        },
      },
    };
    const relatorio = validarGrafoJornada(grafoSemLore);
    expect(relatorio.valido).toBe(false);
    expect(relatorio.erros.some((e) => e.includes('fallbackText'))).toBe(true);
  });
});
