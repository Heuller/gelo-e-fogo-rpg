import 'server-only';
import { GrafoJornada } from '@/server/engine/storyLinter';

/**
 * Jornada 5 — A Rebelião de Robert (282 a 283 d.C.)
 * Ato I: O Juramento do Ninho da Águia & As Batalhas de Solarestival
 * Fontes Canônicas: A Guerra dos Tronos, A Fúria dos Reis, O Mundo de Gelo e Fogo
 */
export const grafoJ5Ato1: GrafoJornada = {
  id: 'jornada_5_rebeliao_ato1',
  titulo: 'Ato I: O Chamado das Águias & O Fogo de Solarestival',
  startNodeId: 'j5_a1_o_chamado_do_ninho',
  nodes: {
    // 1. O Chamado do Ninho da Águia
    j5_a1_o_chamado_do_ninho: {
      id: 'j5_a1_o_chamado_do_ninho',
      titulo: 'O Desafio do Guardião do Oriente',
      anoHistorico: '282 d.C.',
      localizacao: 'O Ninho da Águia, Sala Crescente',
      regionId: 'vale_arryn',
      fallbackText: `O vento uiva através da Porta da Lua, trazendo flocos de neve das Lanças do Gigante. No centro do salão de mármore branco com veios azuis, Jon Arryn segura a carta selada com o dragão de três cabeças em cera negra.
      
As notícias de Porto Real são monstruosas: o Rei Louco Aerys queimou Lorde Rickard Stark vivo em sua armadura com fogo-vivo e estrangulou Brandon Stark na sala do trono. Agora, o corvo real exige as cabeças dos dois protegidos de Jon: Robert Baratheon e Eddard Stark.
      
Jon Arryn rasga o pergaminho real e joga os pedaços no abismo.
      
— Eu criei vocês como filhos — diz o velho senhor, o olhar firme como granito. — Nenhum homem sob o meu teto será entregue a um carrasco ensandecido. Hoje, o Vale ergue seus falcões contra o Trono de Ferro!`,
      internalVoices: [
        {
          atributo: 'comando',
          resultadoPassivo: 'SUCESSO',
          dcPassiva: 9,
          fala: 'O desafio de Jon Arryn quebra três séculos de submissão do Vale aos Targaryen. A guerra civil é inevitável.',
        },
        {
          atributo: 'cortesia',
          resultadoPassivo: 'SUCESSO',
          dcPassiva: 10,
          fala: 'Nem todos os senhores do Vale apoiam a rebeldia. Os Grafton de Vila Gaivota permanecem ferrenhamente lealistas.',
        },
      ],
      loreContext: {
        fonte: {
          arquivo_md: 'corpus_md/jornada_3_tronos/livro_1_a-guerra-dos-tronos_resumo-completo.md',
          livro: 'A Guerra dos Tronos',
          capitulo: 'Eddard II',
        },
        notaHistorica: 'Âncora Canônica: Jon Arryn recusa a ordem de Aerys II de entregar as cabeças de Robert e Ned, iniciando a Rebelião.',
      },
      escolhas: [
        {
          id: 'esc_j5_a1_jurar_espada_ned_e_robert',
          texto: 'Desembainhar sua espada e jurar lealdade aos três senhores: a Arryn, a Baratheon e a Stark.',
          tipo: 'simples',
          delta: {
            flagsAdicionadas: ['juramento_do_ninho_prestado'],
            aprovacaoCompanheiros: { robert_baratheon: 10, ned_stark: 10, jon_arryn: 10 },
            honra: 2,
            compostura: 1,
          },
          nextNodeId: 'j5_a1_batalha_de_vila_gaivota',
        },
        {
          id: 'esc_j5_a1_planejar_rotas_fuga',
          texto: 'Aconselhar a rota imediata: Ned precisa cruzar as Montanhas da Lua até os Dedos para reunir os estandartes do Norte.',
          tipo: 'teste_atributo',
          atributo: 'astucia',
          dc: 9,
          onSuccessNodeId: 'j5_a1_batalha_de_vila_gaivota',
          onPartialFailureNodeId: 'j5_a1_batalha_de_vila_gaivota',
          delta: {
            flagsAdicionadas: ['estrategia_de_retorno_ao_norte'],
            compostura: 1,
          },
        },
      ],
    },

    // 2. Batalha de Vila Gaivota
    j5_a1_batalha_de_vila_gaivota: {
      id: 'j5_a1_batalha_de_vila_gaivota',
      titulo: 'O Sangue nos Muros de Vila Gaivota',
      anoHistorico: '282 d.C.',
      localizacao: 'Portões de Vila Gaivota',
      regionId: 'vale_arryn',
      fallbackText: `Para que os rebeldes possam navegar e libertar as rotas marítimas, Vila Gaivota precisa cair. Lorde Marq Grafton barricou os portões de pedra e ergueu os estandartes dourados do Rei Aerys nas amuradas.
      
Robert Baratheon não espera por arietes ou catapultas. Com seu elmo adornado por grandes chifres de veado e seu colossal martelo de guerra de duas mãos, o jovem senhor de Ponta da Tempestade é o primeiro a galgar as escadas de assalto sob chuva de flechas e piche fervente.
      
— Pelo Trono ou pela cova! — urra Robert, esmagando o primeiro defensor da muralha com um golpe estrondoso.`,
      internalVoices: [
        {
          atributo: 'furia',
          resultadoPassivo: 'SUCESSO',
          dcPassiva: 10,
          fala: 'A ferocidade de Robert em combate corpo a corpo contagia os homens. Nenhuma couraça resiste ao seu martelo.',
        },
        {
          atributo: 'comando',
          resultadoPassivo: 'SUCESSO',
          dcPassiva: 9,
          fala: 'Se protegermos o flanco de Robert na escada de assalto, o portão principal será arrombado por dentro.',
        },
      ],
      loreContext: {
        fonte: {
          arquivo_md: 'corpus_md/jornada_3_tronos/livro_1_a-guerra-dos-tronos_resumo-completo.md',
          livro: 'A Guerra dos Tronos',
          capitulo: 'Eddard II',
        },
        notaHistorica: 'Âncora Canônica: Robert Baratheon é o primeiro a escalar as muralhas de Vila Gaivota e mata pessoalmente Lorde Marq Grafton.',
      },
      escolhas: [
        {
          id: 'esc_j5_a1_lutar_ao_lado_robert_muralha',
          texto: 'Subir a escada colado ao escudo de Robert, desviando flechas e abrindo passagem para a tomada da torre do portão.',
          tipo: 'teste_atributo',
          atributo: 'furia',
          dc: 10,
          onSuccessNodeId: 'j5_a1_desembarque_ponta_tempestade',
          onPartialFailureNodeId: 'j5_a1_desembarque_ponta_tempestade',
          delta: {
            flagsAdicionadas: ['heroi_de_vila_gaivota'],
            aprovacaoCompanheiros: { robert_baratheon: 15 },
            honra: 2,
          },
        },
        {
          id: 'esc_j5_a1_arrombar_o_ancoradouro',
          texto: 'Liderar um pelotão de homens pelo cais para capturar as galeras de guerra e garantir a travessia de Ned Stark.',
          tipo: 'teste_atributo',
          atributo: 'comando',
          dc: 9,
          onSuccessNodeId: 'j5_a1_desembarque_ponta_tempestade',
          onPartialFailureNodeId: 'j5_a1_desembarque_ponta_tempestade',
          delta: {
            flagsAdicionadas: ['galeras_de_vila_gaivota_capturadas'],
            aprovacaoCompanheiros: { ned_stark: 10 },
            compostura: 1,
          },
        },
      ],
    },

    // 3. Desembarque em Ponta da Tempestade
    j5_a1_desembarque_ponta_tempestade: {
      id: 'j5_a1_desembarque_ponta_tempestade',
      titulo: 'Os Tambores da Baía dos Naufrágios',
      anoHistorico: '282 d.C.',
      localizacao: 'Ponta da Tempestade',
      regionId: 'terras_da_tempestade',
      fallbackText: `Após a vitória em Vila Gaivota, os caminhos se dividem: Ned Stark navega para o Norte através do Dentadouro para convocar Winterfell, enquanto você embarcais com Robert rumo a Ponta da Tempestade.
      
A colossal fortaleza cilíndrica ergue-se contra os rochedos negros, imune às vagas violentas da Baía dos Naufrágios. Stannis Baratheon recebe o irmão mais velho no pátio com reverência austera.
      
— Os vassalos das Terras da Tempestade estão divididos, Robert — relata Stannis com seu tom gélido habitual. — Os lordes Fell, Cafferen e Grandison consideram sua revolta uma traição à Coroa e reúnem seus exércitos nas ruínas de Solarestival para marcharem juntos contra nós.
      
Robert ri alto, secando o sal marinho da barba.
      
— Então marcharemos mais rápido que eles! Surpreenderemos cada um antes que consigam unir suas hostes!`,
      internalVoices: [
        {
          atributo: 'pressagio',
          resultadoPassivo: 'SUCESSO',
          dcPassiva: 10,
          fala: 'Solarestival carrega a maldição da tragédia onde o Rei Egg morreu no fogo. Lutar sobre aquelas cinzas exige coragem moral.',
        },
        {
          atributo: 'comando',
          resultadoPassivo: 'SUCESSO',
          dcPassiva: 9,
          fala: 'A marcha forçada pegará os lealistas em acampamentos separados antes que formem uma linha unificada.',
        },
      ],
      loreContext: {
        fonte: {
          arquivo_md: 'corpus_md/jornada_3_tronos/livro_2_a-furia-dos-reis_resumo-completo.md',
          livro: 'A Fúria dos Reis',
          capitulo: 'Catelyn III',
        },
        notaHistorica: 'Âncora Canônica: Robert marcha velozmente para Solarestival e vence três batalhas no mesmo dia.',
      },
      escolhas: [
        {
          id: 'esc_j5_a1_marchar_vanguarda_cavalaria',
          texto: 'Cavalgar na vanguarda veloz com Robert para alcançar Solarestival ao alvorecer.',
          tipo: 'teste_atributo',
          atributo: 'comando',
          dc: 9,
          onSuccessNodeId: 'j5_a1_as_tres_batalhas_solarestival',
          onPartialFailureNodeId: 'j5_a1_as_tres_batalhas_solarestival',
          delta: {
            flagsAdicionadas: ['vanguarda_de_solarestival'],
            compostura: 1,
          },
        },
        {
          id: 'esc_j5_a1_reforcar_defesas_com_stannis',
          texto: 'Ajudar Stannis a organizar os mantimentos e guarnições de Ponta da Tempestade antes da partida.',
          tipo: 'teste_atributo',
          atributo: 'astucia',
          dc: 9,
          onSuccessNodeId: 'j5_a1_as_tres_batalhas_solarestival',
          onPartialFailureNodeId: 'j5_a1_as_tres_batalhas_solarestival',
          delta: {
            flagsAdicionadas: ['confiança_de_stannis'],
            honra: 1,
          },
        },
      ],
    },

    // 4. As Três Batalhas de Solarestival
    j5_a1_as_tres_batalhas_solarestival: {
      id: 'j5_a1_as_tres_batalhas_solarestival',
      titulo: 'Três Vitórias em um Único Dia',
      anoHistorico: '282 d.C.',
      localizacao: 'As Ruínas de Solarestival',
      regionId: 'terras_da_tempestade',
      fallbackText: `O sol nasce sobre as pedras calcinadas de Solarestival, onde colunas de mármore partido e heras cobrem os restos do palácio de verão dos Targaryen.
      
O plano de Robert funciona com perfeição letal. Primeiro, a vanguarda de Lorde Fell é interceptada e desbaratada em meio às colinas. Horas depois, as forças de Lorde Cafferen chegam desavisadas ao vale e são cercadas pelos cavaleiros do veado galopante.
      
— Rendam-se e viverão como irmãos! — grita Robert, girando o martelo ensanguentado enquanto os lealistas remanescentes se entrincheiram nos alicerces do palácio.`,
      internalVoices: [
        {
          atributo: 'furia',
          resultadoPassivo: 'SUCESSO',
          dcPassiva: 10,
          fala: 'O cansaço dos homens pesa após duas investidas consecutivas, mas a presença triunfante de Robert não dá trégua ao inimigo.',
        },
        {
          atributo: 'cortesia',
          resultadoPassivo: 'SUCESSO',
          dcPassiva: 9,
          fala: 'Robert não massacra os inimigos rendidos; ele os convida para sua mesa e ganha seus corações.',
        },
      ],
      loreContext: {
        fonte: {
          arquivo_md: 'corpus_md/jornada_3_tronos/livro_2_a-furia-dos-reis_resumo-completo.md',
          livro: 'A Fúria dos Reis',
          capitulo: 'Catelyn III',
        },
        notaHistorica: 'Âncora Canônica: As três batalhas de Solarestival consagram a lenda militar de Robert Baratheon.',
      },
      escolhas: [
        {
          id: 'esc_j5_a1_duelar_lorde_fell',
          texto: 'Avançar na linha de frente contra os guardas de Lorde Fell para abrir passagem direta a Robert.',
          tipo: 'teste_atributo',
          atributo: 'furia',
          dc: 10,
          onSuccessNodeId: 'j5_a1_vencendo_os_lealistas',
          onPartialFailureNodeId: 'j5_a1_vencendo_os_lealistas',
          delta: {
            flagsAdicionadas: ['golpe_decisivo_solarestival'],
            honra: 2,
          },
        },
        {
          id: 'esc_j5_a1_coordenar_cerco_grandison',
          texto: 'Manter a linha de archeiros controlando a elevação para impedir a retirada das forças de Lorde Grandison.',
          tipo: 'teste_atributo',
          atributo: 'comando',
          dc: 9,
          onSuccessNodeId: 'j5_a1_vencendo_os_lealistas',
          onPartialFailureNodeId: 'j5_a1_vencendo_os_lealistas',
          delta: {
            flagsAdicionadas: ['cerco_impecavel_grandison'],
            compostura: 1,
          },
        },
      ],
    },

    // 5. Vencendo os Lealistas
    j5_a1_vencendo_os_lealistas: {
      id: 'j5_a1_vencendo_os_lealistas',
      titulo: 'De Inimigos a Irmãos de Armas',
      anoHistorico: '282 d.C.',
      localizacao: 'O Grande Salão Negro de Ponta da Tempestade',
      regionId: 'terras_da_tempestade',
      fallbackText: `A vitória em Solarestival é total. Lorde Fell caiu em combate, mas seu filho Silveraxe, junto com Lorde Cafferen e Lorde Grandison, foram capturados e conduzidos de volta a Ponta da Tempestade.
      
Em vez de masmorras ou correntes, Robert ordena que barris de cerveja sejam abertos no grande salão. Ele coloca o braço sobre os ombros de Silveraxe e bebe com os homens que tentaram matá-lo horas antes.
      
— Um rei louco exigiu sangue inocente em Porto Real — brada Robert, erguendo a taça. — Nós lutamos pela justiça de todos os lordes dos Sete Reinos! Quem aqui beberá pela liberdade de Westeros?
      
Os cativos, conquistados pelo carisma e pela generosidade descomunal de Robert, caem de joelhos e juram suas espadas ao veado coroado!`,
      internalVoices: [
        {
          atributo: 'cortesia',
          resultadoPassivo: 'SUCESSO',
          dcPassiva: 10,
          fala: 'O dom supremo de Robert é transformar inimigos jurados em amigos devotados com um barril de vinho e um abraço leal.',
        },
      ],
      loreContext: {
        fonte: {
          arquivo_md: 'corpus_md/jornada_3_tronos/livro_2_a-furia-dos-reis_resumo-completo.md',
          livro: 'A Fúria dos Reis',
          capitulo: 'Catelyn III',
        },
        notaHistorica: 'Âncora Canônica: Robert conquista a devoção eterna de Silveraxe e dos lordes rebeldes em Ponta da Tempestade.',
      },
      escolhas: [
        {
          id: 'esc_j5_a1_celebrar_com_silveraxe',
          texto: 'Brindar com Ser Silveraxe e assegurar a união de todas as Terras da Tempestade sob o estandarte de Robert.',
          tipo: 'simples',
          delta: {
            flagsAdicionadas: ['terras_da_tempestade_unificadas'],
            aprovacaoCompanheiros: { robert_baratheon: 12 },
            honra: 1,
            compostura: 2,
          },
          nextNodeId: 'j5_a1_uniao_das_forcas',
        },
        {
          id: 'esc_j5_a1_preparar_marcha_norte',
          texto: 'Alertar Robert de que o verdadeiro perigo vem do exército de Mace Tyrell marchando de Jardim de Cima.',
          tipo: 'teste_atributo',
          atributo: 'astucia',
          dc: 9,
          onSuccessNodeId: 'j5_a1_uniao_das_forcas',
          onPartialFailureNodeId: 'j5_a1_uniao_das_forcas',
          delta: {
            flagsAdicionadas: ['alerta_alcance_tyrell'],
            compostura: 1,
          },
        },
      ],
    },

    // 6. União das Forças
    j5_a1_uniao_das_forcas: {
      id: 'j5_a1_uniao_das_forcas',
      titulo: 'A Marcha para as Terras Fluviais',
      anoHistorico: '282 d.C.',
      localizacao: 'Fronteira com as Terras Fluviais',
      regionId: 'terras_fluviais',
      fallbackText: `Com o Vale de Arryn em armas, o Norte convocado por Ned Stark e as Terras da Tempestade asseguradas, a rebelião ganha corpo como um incêndio florestal.
      
No entanto, os exércitos reais despertam: o Príncipe Rhaegar ainda está desaparecido no Sul, mas o Lorde Comandante Gerold Hightower e a Mão do Rei, Lorde Jon Connington, mobilizam as hostes imperiais para encurralar Robert antes que os quatro grandes exércitos rebeldes consigam se unir.
      
— Devemos alcançar as Terras Fluviais e encontrar Ned em Septo de Pedra — decide Robert, afivelando a couraça de guerra. — O destino de Westeros será decidido no Tridente!`,
      internalVoices: [
        {
          atributo: 'comando',
          resultadoPassivo: 'SUCESSO',
          dcPassiva: 10,
          fala: 'A marcha rumo a Septo de Pedra será perigosa. Se Connington nos alcançar antes de Ned, seremos aniquilados.',
        },
      ],
      loreContext: {
        fonte: {
          arquivo_md: 'corpus_md/jornada_3_tronos/livro_1_a-guerra-dos-tronos_resumo-completo.md',
          livro: 'A Guerra dos Tronos',
          capitulo: 'Eddard II',
        },
        notaHistorica: 'Âncora Canônica: Robert marcha em direção às Terras Fluviais para encontrar Ned Stark e Jon Arryn, culminando na Batalha dos Sinos.',
      },
      escolhas: [
        {
          id: 'esc_j5_a1_avancar_ato2_septo_pedra',
          texto: 'Marchar em ritmo acelerado para Septo de Pedra ao lado de Robert Baratheon (Avançar para o Ato II).',
          tipo: 'simples',
          delta: { marcoConcluido: 'j5_ato1_concluido' },
          nextNodeId: 'j5_a2_o_cercamento_em_septo_de_pedra',
        },
        {
          id: 'esc_j5_a1_estabelecer_pombais_contato',
          texto: 'Enviar cavaleiros montados com corvos mensageiros para sincronizar o avanço com as tropas de Ned Stark.',
          tipo: 'simples',
          delta: {
            flagsAdicionadas: ['contato_sincronizado_com_ned'],
            marcoConcluido: 'j5_ato1_concluido',
            honra: 1,
          },
          nextNodeId: 'j5_a2_o_cercamento_em_septo_de_pedra',
        },
      ],
    },
  },
};
