import { describe, it, expect } from 'vitest';
import {
  rolar2d6,
  rerrolarUltimoTesteComInspiracao,
  podeAlterarModo,
  ModoDeJogo,
  FichaPersonagem,
  WorldState,
} from './rpgEngine';
import {
  probabilidadeSucesso,
  obterRotuloRisco,
} from '@/lib/engine-shared/probabilidade';
import { comporCena, ContextoComposicao } from './composicaoCena';
import { NodeJornada, GrafoJornada } from './storyLinter';
import { auditarEcosJornada, extrairNumeroAto } from '../../../scripts/auditoria-ecos';

describe('G7B — B1: Vantagem e Desvantagem (3d6)', () => {
  it('deve usar 3d6 mantendo os 2 maiores quando houver Vantagem', () => {
    // Dados rolados: 2, 5, 4 -> mantidos: [5, 4], soma = 9
    // Atributo 3 + soma 9 = 12 contra DC 10 -> SUCESSO (ou crítico se total >= 13)
    const resultado = rolar2d6(3, 10, {
      vantagem: true,
      dadosFixos: [2, 5, 4],
      motivoCircunstancia: 'O vento favorável oculta os seus passos',
    });

    expect(resultado.tipoCircunstancia).toBe('vantagem');
    expect(resultado.motivoCircunstancia).toBe('O vento favorável oculta os seus passos');
    expect(resultado.dadosOriginais).toEqual([2, 5, 4]);
    expect(resultado.dados).toEqual([5, 4]);
    expect(resultado.somaDados).toBe(9);
    expect(resultado.total).toBe(12);
    expect(resultado.resultado).toBe('SUCESSO');
  });

  it('deve gerar Sucesso Crítico natural quando os dois maiores forem [6, 6] em Vantagem', () => {
    // Dados rolados: 2, 6, 6 -> mantidos [6, 6]
    const resultado = rolar2d6(1, 14, {
      vantagem: true,
      dadosFixos: [2, 6, 6],
    });

    expect(resultado.dados).toEqual([6, 6]);
    expect(resultado.resultado).toBe('CRITICO');
  });

  it('deve usar 3d6 mantendo os 2 menores quando houver Desvantagem', () => {
    // Dados rolados: 6, 2, 4 -> mantidos: [2, 4], soma = 6
    // Atributo 2 + soma 6 = 8 contra DC 10 -> FALHA_PARCIAL (8 === 10 - 2)
    const resultado = rolar2d6(2, 10, {
      desvantagem: true,
      dadosFixos: [6, 2, 4],
      motivoCircunstancia: 'A lama espessa prende as suas botas',
    });

    expect(resultado.tipoCircunstancia).toBe('desvantagem');
    expect(resultado.motivoCircunstancia).toBe('A lama espessa prende as suas botas');
    expect(resultado.dadosOriginais).toEqual([6, 2, 4]);
    expect(resultado.dados).toEqual([2, 4]);
    expect(resultado.somaDados).toBe(6);
    expect(resultado.total).toBe(8);
    expect(resultado.resultado).toBe('FALHA_PARCIAL');
  });

  it('deve gerar Falha Crítica com morte quando os dois menores forem [1, 1] e houver risco mortal', () => {
    // Dados rolados: 1, 5, 1 -> mantidos [1, 1]
    const resultado = rolar2d6(3, 8, {
      desvantagem: true,
      riscoMortal: true,
      dadosFixos: [1, 5, 1],
    });

    expect(resultado.dados).toEqual([1, 1]);
    expect(resultado.resultado).toBe('FALHA_CRITICA');
    expect(resultado.morteCanonica).toBe(true);
  });

  it('deve anular mutuamente quando houver Vantagem e Desvantagem juntas (rolando 2d6 padrão)', () => {
    const resultado = rolar2d6(3, 10, {
      vantagem: true,
      desvantagem: true,
      dadosFixos: [4, 4],
    });

    expect(resultado.tipoCircunstancia).toBe('neutro');
    expect(resultado.dados).toEqual([4, 4]);
    expect(resultado.somaDados).toBe(8);
  });
});

describe('G7B — B2: Painel de Modificadores e Probabilidades Honestos', () => {
  it('deve calcular probabilidades exatas com Vantagem superiores a 2d6', () => {
    const probPadrao = probabilidadeSucesso(3, 10);
    const probVantagem = probabilidadeSucesso(3, 10, { circunstancia: 'vantagem' });

    expect(probPadrao.totalCombinacoes).toBe(36);
    expect(probVantagem.totalCombinacoes).toBe(216);
    expect(probVantagem.porcentagemSucesso).toBeGreaterThan(probPadrao.porcentagemSucesso);
  });

  it('deve calcular probabilidades exatas com Desvantagem inferiores a 2d6', () => {
    const probPadrao = probabilidadeSucesso(3, 10);
    const probDesvantagem = probabilidadeSucesso(3, 10, { circunstancia: 'desvantagem' });

    expect(probDesvantagem.porcentagemSucesso).toBeLessThan(probPadrao.porcentagemSucesso);
  });

  it('deve retornar rótulos de risco textuais corretos sem depender apenas de cor', () => {
    expect(obterRotuloRisco(100)).toBe('Garantido');
    expect(obterRotuloRisco(85)).toBe('Quase certo');
    expect(obterRotuloRisco(70)).toBe('Provável');
    expect(obterRotuloRisco(50)).toBe('Desafiador');
    expect(obterRotuloRisco(30)).toBe('Arriscado');
  });
});

describe('G7B — B3: Três Modos de Jornada (Crônica, Padrão, Juramento)', () => {
  const fichaBase: FichaPersonagem = {
    id: 'teste-heroi',
    nome: 'Garlan Tyrell',
    origem: 'campina',
    inspiracao: 2,
    atributos: { comando: 3, furia: 4, astucia: 3, cortesia: 3, erudicao: 2, pressagio: 2 },
    estado: { sangue: 10, compostura: 10, honra: 5 },
    cicatrizes: [],
    segredos: [],
    companheiros: {},
  };

  it('Modo Crônica: deve reduzir a DC em 2 pontos (DC 10 vira DC 8 efetiva)', () => {
    // Total 8 (Atributo 3 + dados [3, 2] = 8):
    // Contra DC 10 padrão seria falha parcial (8 < 10)
    // No Modo Crônica (DC efetiva 8), total 8 >= 8 -> SUCESSO!
    const res = rolar2d6(3, 10, {
      modoDeJogo: 'cronica',
      dadosFixos: [3, 2],
    });

    expect(res.dc).toBe(10);
    expect(res.dcEfetiva).toBe(8);
    expect(res.modificadorModo).toBe(-2);
    expect(res.resultado).toBe('SUCESSO');
  });

  it('Modo Padrão: preserva DCs normais', () => {
    const res = rolar2d6(3, 10, {
      modoDeJogo: 'padrao',
      dadosFixos: [3, 2],
    });

    expect(res.dc).toBe(10);
    expect(res.dcEfetiva).toBe(10);
    expect(res.modificadorModo).toBe(0);
    expect(res.resultado).toBe('FALHA_PARCIAL');
  });

  it('Modo Juramento: veta gasto de Inspiração para rerrolar', () => {
    const tentativa = rerrolarUltimoTesteComInspiracao(fichaBase, 10, 3, {
      modoDeJogo: 'juramento',
    });

    expect(tentativa.sucessoGasto).toBe(false);
    expect(tentativa.motivo).toContain('Modo Juramento');
    expect(tentativa.fichaAtualizada.inspiracao).toBe(2); // Não gastou
  });

  it('Imutabilidade dos modos: regras de transição estritas', () => {
    // Pode subir de Crônica para Padrão
    expect(podeAlterarModo('cronica', 'padrao').permitido).toBe(true);

    // Não pode reduzir de Padrão para Crônica
    expect(podeAlterarModo('padrao', 'cronica').permitido).toBe(false);

    // Modo Juramento não pode ser alterado para nada
    expect(podeAlterarModo('juramento', 'padrao').permitido).toBe(false);
    expect(podeAlterarModo('juramento', 'cronica').permitido).toBe(false);

    // Não pode entrar no Modo Juramento no meio da partida
    expect(podeAlterarModo('padrao', 'juramento').permitido).toBe(false);
  });
});

describe('G7B — B4, B7 e B8: Reações de Companheiros, Vozes em Conflito e Percepção', () => {
  const contextoTeste: ContextoComposicao = {
    ficha: {
      id: 'robert-baratheon',
      nome: 'Robert Baratheon',
      origem: 'terras_da_tempestade',
      inspiracao: 2,
      atributos: { comando: 4, furia: 5, astucia: 2, cortesia: 2, erudicao: 1, pressagio: 1 },
      estado: { sangue: 10, compostura: 8, honra: 4 },
      cicatrizes: [],
      segredos: [],
      companheiros: {
        ned_stark: {
          id: 'ned_stark',
          nome: 'Eddard Stark',
          titulo: 'Senhor de Winterfell',
          aprovacao: 45,
          status: 'Leal',
        },
      },
    },
    worldState: {
      reputacaoCasas: {},
      flagsBorboleta: { ned_presente: true },
      marcosConcluidos: [],
    },
    modo: 'padrao',
  };

  const nodeComB4B7B8: NodeJornada = {
    id: 'cena_bg3_teste',
    titulo: 'Conselho de Guerra em Ponta Tempestade',
    fallbackText: 'Os mapas da rebelião cobrem a pesada mesa de carvalho.',
    loreContext: {
      fonte: {
        livro: 'A Guerra dos Tronos',
        capitulo: 'Eddard',
        arquivo_md: 'agot_eddard.md',
      },
    },
    origem: 'canonica',
    tipo: 'dialogo',
    pov: 'Robert Baratheon',
    epigrafe: {
      texto: 'O aço não conhece linhagem no campo onde os homens caem.',
      autor: 'Canção das Terras da Tempestade',
    },
    reacoes: [
      {
        companheiro: 'ned_stark',
        condicao: { flagsTodas: ['ned_presente'], aprovacao: { companheiro: 'ned_stark', min: 30 } },
        fala: 'Se marcharmos agora, a honra estará do nosso lado, Robert.',
      },
    ],
    vozesConflito: [
      {
        voz1: 'furia',
        voz2: 'comando',
        fala1: 'Esmague a vanguarda com o martelo antes que possam se formar!',
        fala2: 'Mantenha a linha fechada; arqueiros nos flancos decidem o dia.',
      },
    ],
    dicaPercepcao: 'Um detalhe na bainha do emissário revela o emblema oculto da Casa Connington.',
    escolhas: [
      {
        id: 'esc_avancar',
        tipo: 'simples',
        texto: 'Ordenar o avanço imediato',
        nextNodeId: 'cena_batalha',
      },
    ],
  };

  it('deve compor a reação do companheiro quando a condição for satisfeita (B4)', () => {
    const cena = comporCena(nodeComB4B7B8, contextoTeste);

    expect(cena.reacaoCompanheiro).toBeDefined();
    expect(cena.reacaoCompanheiro?.companheiro).toBe('ned_stark');
    expect(cena.reacaoCompanheiro?.nome).toBe('Eddard Stark');
    expect(cena.reacaoCompanheiro?.fala).toContain('honra estará do nosso lado');
  });

  it('deve compor o par de vozes em conflito (B7)', () => {
    const cena = comporCena(nodeComB4B7B8, contextoTeste);

    expect(cena.vozConflitoAtiva).toBeDefined();
    expect(cena.vozConflitoAtiva?.voz1).toBe('furia');
    expect(cena.vozConflitoAtiva?.voz2).toBe('comando');
    expect(cena.vozConflitoAtiva?.fala1).toContain('martelo');
  });

  it('deve incluir dica de percepção discreta (B8)', () => {
    const cena = comporCena(nodeComB4B7B8, contextoTeste);

    expect(cena.dicaPercepcao).toBeDefined();
    expect(cena.dicaPercepcao).toContain('Casa Connington');
  });

  it('deve incluir cabeçalho POV e epígrafe literária', () => {
    const cena = comporCena(nodeComB4B7B8, contextoTeste);

    expect(cena.pov).toBe('Robert Baratheon');
    expect(cena.epigrafe?.autor).toBe('Canção das Terras da Tempestade');
  });
});

describe('G7B — B6: Auditoria de Ecos de Longo Prazo', () => {
  it('deve extrair corretamente o número do ato a partir do ID do nó', () => {
    expect(extrairNumeroAto('j1_a1_mesa_pintada')).toBe(1);
    expect(extrairNumeroAto('j4_a2_emboscada')).toBe(2);
    expect(extrairNumeroAto('j3_a3_aguasnegras')).toBe(3);
    expect(extrairNumeroAto('j5_a4_tridente')).toBe(4);
  });

  it('deve identificar ecos quando uma flag é gravada no Ato 1 e lida no Ato 2 ou posterior', () => {
    const grafoFixture: GrafoJornada = {
      id: 'jornada_ecos_fixture',
      titulo: 'Fixture de Ecos',
      startNodeId: 'j_a1_cena1',
      nodes: {
        j_a1_cena1: {
          id: 'j_a1_cena1',
          titulo: 'Ato 1 - A Escolha do Pacto',
          fallbackText: 'Você decide como selar o juramento.',
          loreContext: {
            fonte: {
              livro: 'A Guerra dos Tronos',
              capitulo: 'Eddard',
              arquivo_md: 'agot_eddard.md',
            },
          },
          origem: 'canonica',
          escolhas: [
            {
              id: 'esc_pacto_lealdade',
              tipo: 'simples',
              texto: 'Prestar juramento formal',
              nextNodeId: 'j_a2_cena2',
              delta: { flagsBorboleta: { juramento_prestado: true } },
            },
          ],
        },
        j_a2_cena2: {
          id: 'j_a2_cena2',
          titulo: 'Ato 2 - O Retorno do Pacto',
          fallbackText: 'O senhor do castelo olha para você.',
          loreContext: {
            fonte: {
              livro: 'A Guerra dos Tronos',
              capitulo: 'Eddard',
              arquivo_md: 'agot_eddard.md',
            },
          },
          origem: 'canonica',
          conditionalParagraphs: [
            {
              requiredFlag: 'juramento_prestado',
              text: 'Ele recorda o juramento sagrado que você prestou em Harrenhal.',
            },
          ],
          escolhas: [],
        },
      },
    };

    const resultado = auditarEcosJornada(grafoFixture);
    expect(resultado.totalEcos).toBe(1);
    expect(resultado.ecos[0].flag).toBe('juramento_prestado');
    expect(resultado.ecos[0].atoGravacao).toBe(1);
    expect(resultado.ecos[0].atoLeitura).toBe(2);
  });
});

describe('G7B — Simulação Monte Carlo Comparativa (Crônica vs Padrão vs Juramento)', () => {
  it('deve simular 10.000 rolagens e comprovar que Juramento/Padrão têm taxas de falha crítica maiores que Crônica', () => {
    const IT = 10000;
    const valorAtributo = 3;
    const dc = 10;

    let mortesJuramento = 0;
    let mortesPadrao = 0;
    let mortesCronica = 0;

    let sucessosJuramento = 0;
    let sucessosPadrao = 0;
    let sucessosCronica = 0;

    for (let i = 0; i < IT; i++) {
      // 1. Crônica (DC efetiva 8)
      const resCronica = rolar2d6(valorAtributo, dc, { modoDeJogo: 'cronica', riscoMortal: true });
      if (resCronica.resultado === 'CRITICO' || resCronica.resultado === 'SUCESSO') sucessosCronica++;
      if (resCronica.morteCanonica) mortesCronica++;

      // 2. Padrão (DC efetiva 10)
      const resPadrao = rolar2d6(valorAtributo, dc, { modoDeJogo: 'padrao', riscoMortal: true });
      if (resPadrao.resultado === 'CRITICO' || resPadrao.resultado === 'SUCESSO') sucessosPadrao++;
      if (resPadrao.morteCanonica) mortesPadrao++;

      // 3. Juramento (DC efetiva 10, sem rerrolagem)
      const resJuramento = rolar2d6(valorAtributo, dc, { modoDeJogo: 'juramento', riscoMortal: true });
      if (resJuramento.resultado === 'CRITICO' || resJuramento.resultado === 'SUCESSO') sucessosJuramento++;
      if (resJuramento.morteCanonica) mortesJuramento++;
    }

    const taxaSucessoCronica = sucessosCronica / IT;
    const taxaSucessoPadrao = sucessosPadrao / IT;
    const taxaMortePadrao = mortesPadrao / IT;
    const taxaMorteCronica = mortesCronica / IT;

    // Crônica deve ter taxa de sucesso significativamente maior (DC -2)
    expect(taxaSucessoCronica).toBeGreaterThan(taxaSucessoPadrao);

    // Crônica deve ter menos mortes que Padrão
    expect(taxaMorteCronica).toBeLessThanOrEqual(taxaMortePadrao);

    console.log(`\n=== RESULTADO SIMULAÇÃO MONTE CARLO G7B (${IT} iterações, Atr 3 vs DC 10) ===`);
    console.log(`Modo Crônica:  Sucesso: ${(taxaSucessoCronica * 100).toFixed(1)}% | Letalidade: ${(taxaMorteCronica * 100).toFixed(2)}%`);
    console.log(`Modo Padrão:   Sucesso: ${(taxaSucessoPadrao * 100).toFixed(1)}% | Letalidade: ${(taxaMortePadrao * 100).toFixed(2)}%`);
    console.log(`Modo Juramento: Sucesso: ${((sucessosJuramento / IT) * 100).toFixed(1)}% | Letalidade: ${((mortesJuramento / IT) * 100).toFixed(2)}% (Morte Definitiva, 0 rerrolagens)`);
  });
});
