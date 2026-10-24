import 'server-only';
import { GrafoJornada } from '@/server/engine/storyLinter';

/**
 * Jornada 5 — A Rebelião de Robert (282 a 283 d.C.)
 * Ato III: O Vade dos Rubis & A Batalha do Tridente
 * Fontes Canônicas: A Guerra dos Tronos, A Tormenta de Espadas, O Mundo de Gelo e Fogo
 */
export const grafoJ5Ato3: GrafoJornada = {
  id: 'jornada_5_rebeliao_ato3',
  titulo: 'Ato III: O Vade dos Rubis & O Duelo no Tridente',
  startNodeId: 'j5_a3_o_acampamento_no_tridente',
  nodes: {
    // 1. O Acampamento no Tridente
    j5_a3_o_acampamento_no_tridente: {
      id: 'j5_a3_o_acampamento_no_tridente',
      titulo: 'As Margens do Destino',
      anoHistorico: '283 d.C.',
      localizacao: 'O Vade dos Rubis, Ramo Verde do Tridente',
      regionId: 'tridente',
      fallbackText: `O Ramo Verde do Tridente corre largo e barrento entre margens de salgueiros e caniços. Do outro lado da água rasa do vau, quarenta mil lanças reais estendem-se até o horizonte sob uma floresta de estandartes de dragões de três cabeças.
      
O Príncipe Rhaegar Targaryen retornou finalmente do Sul. Ele monta um corcel negro puro com armadura de escamas de aço escurecido, seu peitoral resplandecendo com um dragão heráldico moldado inteiramente em rubis reluzentes. Ao lado dele cavalgam os irmãos da Guarda Real: Ser Jonothor Darry e o formidável Ser Barristan Selmy.
      
Do lado rebelde, Robert Baratheon ajeita o elmo com chifres de veado e ergue o martelo forjado por Donal Noye.
      
— Hoje decidimos quem governa esta terra — brada Robert, a voz trovejando acima do murmúrio das águas. — Não haverá recuo! Quem quiser viver sob a loucura de Aerys, que nade de volta a Porto Real!`,
      internalVoices: [
        {
          atributo: 'comando',
          resultadoPassivo: 'SUCESSO',
          dcPassiva: 10,
          fala: 'O vau é o único ponto de travessia seguro. O exército que controlar as margens vencerá a guerra.',
        },
        {
          atributo: 'pressagio',
          resultadoPassivo: 'SUCESSO',
          dcPassiva: 11,
          fala: 'Há uma melancolia fúnebre nos olhos de Rhaegar. Ele luta como se soubesse que um império está morrendo nesta tarde.',
        },
      ],
      loreContext: {
        fonte: {
          arquivo_md: 'corpus_md/jornada_3_tronos/livro_1_a-guerra-dos-tronos_resumo-completo.md',
          livro: 'A Guerra dos Tronos',
          capitulo: 'Eddard II, Daenerys I',
        },
        notaHistorica: 'Âncora Canônica: A Batalha do Tridente opõe quarenta mil rebeldes a quarenta mil lealistas pelo destino do Trono de Ferro.',
      },
      escolhas: [
        {
          id: 'esc_j5_a3_marchar_na_linha_central',
          texto: 'Cavalgar na linha central de choque ao lado de Robert Baratheon, apontando as lanças para a água corrente.',
          tipo: 'teste_atributo',
          atributo: 'comando',
          dc: 10,
          onSuccessNodeId: 'j5_a3_as_aguas_tingidas_de_sangue',
          onPartialFailureNodeId: 'j5_a3_as_aguas_tingidas_de_sangue',
          delta: {
            flagsAdicionadas: ['linha_central_no_vau'],
            aprovacaoCompanheiros: { robert_baratheon: 10 },
            honra: 1,
          },
        },
        {
          id: 'esc_j5_a3_reforcar_flanco_com_ned',
          texto: 'Compor a ala esquerda com Eddard Stark e os homens do Norte para interceptar a infantaria dornesa.',
          tipo: 'teste_atributo',
          atributo: 'furia',
          dc: 10,
          onSuccessNodeId: 'j5_a3_os_dorneses_de_lewin_martell',
          onPartialFailureNodeId: 'j5_a3_os_dorneses_de_lewin_martell',
          delta: {
            flagsAdicionadas: ['flanco_norte_reforcado'],
            aprovacaoCompanheiros: { ned_stark: 12 },
            compostura: 1,
          },
        },
      ],
    },

    // 2. As Águas Tingidas de Sangue
    j5_a3_as_aguas_tingidas_de_sangue: {
      id: 'j5_a3_as_aguas_tingidas_de_sangue',
      titulo: 'O Choque no Vau dos Rubis',
      anoHistorico: '283 d.C.',
      localizacao: 'O Leito do Rio Tridente',
      regionId: 'tridente',
      fallbackText: `O choque dos dois exércitos nas águas rasas faz o rio espumar em vermelho. Cavalos escorregam nos seixos de cascalho; escudos de carvalho lascam sob golpes de machado e flechas caem como chuva torrencial do céu cinzento.
      
Ser Barristan Selmy, o Ousado, avança como uma lenda viva em seu manto branco imaculado, abatendo uma dúzia de cavaleiros rebeldes ao redor de sua lâmina cintilante. Ao seu lado, a lança de um guarda real quebra contra seu escudo e a correnteza fria puxa homens e armaduras para o fundo do leito.`,
      internalVoices: [
        {
          atributo: 'furia',
          resultadoPassivo: 'SUCESSO',
          dcPassiva: 11,
          fala: 'Manter o equilíbrio nas pedras cobertas de lodo é tão vital quanto aparar os golpes de espada.',
        },
      ],
      loreContext: {
        fonte: {
          arquivo_md: 'corpus_md/jornada_3_tronos/livro_1_a-guerra-dos-tronos_resumo-completo.md',
          livro: 'A Guerra dos Tronos',
          capitulo: 'Eddard II',
        },
        notaHistorica: 'Âncora Canônica: Barristan Selmy luta com bravura descomunal no Tridente, matando muitos rebeldes antes de cair ferido.',
      },
      escolhas: [
        {
          id: 'esc_j5_a3_conter_investida_guarda_real',
          texto: 'Formar um círculo de escudos na água para conter o avanço devastador da guarda real de Selmy.',
          tipo: 'teste_atributo',
          atributo: 'comando',
          dc: 11,
          onSuccessNodeId: 'j5_a3_robert_vs_rhaegar_no_vau',
          onPartialFailureNodeId: 'j5_a3_robert_vs_rhaegar_no_vau',
          delta: {
            flagsAdicionadas: ['guarda_real_contida_no_vau'],
            sangue: -1,
            honra: 2,
          },
        },
        {
          id: 'esc_j5_a3_flanquear_pelo_leito_baixo',
          texto: 'Manobrar a cavalaria leve pelas águas mais rasas a jusante para atacar a retaguarda dos lanceiros reais.',
          tipo: 'teste_atributo',
          atributo: 'astucia',
          dc: 10,
          onSuccessNodeId: 'j5_a3_robert_vs_rhaegar_no_vau',
          onPartialFailureNodeId: 'j5_a3_robert_vs_rhaegar_no_vau',
          delta: {
            flagsAdicionadas: ['manobra_de_flanco_no_tridente'],
            compostura: 1,
          },
        },
      ],
    },

    // 3. Os Dorneses de Lewyn Martell
    j5_a3_os_dorneses_de_lewin_martell: {
      id: 'j5_a3_os_dorneses_de_lewin_martell',
      titulo: 'A Fúria das Lanças de Dorne',
      anoHistorico: '283 d.C.',
      localizacao: 'Ala Esquerda do Vau do Tridente',
      regionId: 'tridente',
      fallbackText: `Dez mil guerreiros de Dorne marcham sob as ordens do Príncipe Lewyn Martell da Guarda Real. Suas lanças compridas de freixo formam uma cerca impenetrável de aço pontiagudo que começa a empurrar a linha do Vale de volta para a água.
      
Ser Lyn Corbray pega a espada de aço valiriano de seu pai caído, a lendária Senhora Desespero, e com um grito de fúria selvagem rasga a linha dornesa. Em um duelo vertiginoso sobre a lama avermelhada, Corbray fere mortalmente o Príncipe Lewyn, quebrando a espinha dorsal da infantaria do Sul!`,
      internalVoices: [
        {
          atributo: 'comando',
          resultadoPassivo: 'SUCESSO',
          dcPassiva: 10,
          fala: 'A morte de Lewyn Martell abala irremediavelmente a hoste dornesa. É o momento de pressionar a vanguarda lealista!',
        },
      ],
      loreContext: {
        fonte: {
          arquivo_md: 'corpus_md/jornada_3_tronos/livro_3_a-tormenta-de-espadas_resumo-completo.md',
          livro: 'A Tormenta de Espadas',
          capitulo: 'Sansa VI',
        },
        notaHistorica: 'Âncora Canônica: Ser Lyn Corbray mata o Príncipe Lewyn Martell com a Senhora Desespero na Batalha do Tridente.',
      },
      escolhas: [
        {
          id: 'esc_j5_a3_avanco_apos_morte_lewyn',
          texto: 'Aproveitar a brecha deixada pelos dorneses para liderar os lanceiros do Norte rumo ao centro do rio.',
          tipo: 'teste_atributo',
          atributo: 'furia',
          dc: 10,
          onSuccessNodeId: 'j5_a3_robert_vs_rhaegar_no_vau',
          onPartialFailureNodeId: 'j5_a3_robert_vs_rhaegar_no_vau',
          delta: {
            flagsAdicionadas: ['ruptura_do_flanco_dornes'],
            honra: 2,
          },
        },
        {
          id: 'esc_j5_a3_salvar_feridos_vale',
          texto: 'Cobrir a retirada dos homens feridos do Vale e garantir a integridade da ala de Jon Arryn.',
          tipo: 'teste_atributo',
          atributo: 'comando',
          dc: 9,
          onSuccessNodeId: 'j5_a3_robert_vs_rhaegar_no_vau',
          onPartialFailureNodeId: 'j5_a3_robert_vs_rhaegar_no_vau',
          delta: {
            flagsAdicionadas: ['protetor_dos_homens_do_vale'],
            aprovacaoCompanheiros: { jon_arryn: 15 },
            compostura: 1,
          },
        },
      ],
    },

    // 4. Robert vs Rhaegar no Vau
    j5_a3_robert_vs_rhaegar_no_vau: {
      id: 'j5_a3_robert_vs_rhaegar_no_vau',
      titulo: 'O Encontro dos Reis no Meio das Águas',
      anoHistorico: '283 d.C.',
      localizacao: 'O Centro do Vau do Tridente',
      regionId: 'tridente',
      fallbackText: `O mundo inteiro parece silenciar ao redor do vau quando os dois líderes finalmente se encontram no meio da correnteza.
      
Robert Baratheon, manchado de sangue da cabeça aos pés, monta um garanhão empinado; seu elmo de chifres racha o ar. À frente dele está o Príncipe Rhaegar Targaryen, esbelto e magnífico, brandindo uma espada de aço reluzente que traça círculos perfeitos sob a garoa fria.
      
Os dois cavalos colidem nas águas profundas. A espada de Rhaegar abre um corte profundo no flanco de Robert, rasgando couro e cota de malha. Mas Robert não vacila: erguendo o martelo de guerra com as duas mãos acima da cabeça com a força de um furacão, ele desce o golpe final contra o dragão de rubis!`,
      internalVoices: [
        {
          atributo: 'furia',
          resultadoPassivo: 'SUCESSO',
          dcPassiva: 12,
          fala: 'É o momento decisivo de uma dinastia de trezentos anos. Um único golpe de martelo decidirá o trono.',
        },
      ],
      loreContext: {
        fonte: {
          arquivo_md: 'corpus_md/jornada_3_tronos/livro_1_a-guerra-dos-tronos_resumo-completo.md',
          livro: 'A Guerra dos Tronos',
          capitulo: 'Eddard II',
        },
        notaHistorica: 'Âncora Canônica: Robert mata Rhaegar Targaryen no vau do Tridente com um golpe devastador de martelo no peito.',
      },
      escolhas: [
        {
          id: 'esc_j5_a3_proteger_retaguarda_robert_duelo',
          texto: 'Interceptar os cavaleiros lealistas que tentam interferir no duelo sagrado entre os dois pretendentes.',
          tipo: 'teste_atributo',
          atributo: 'furia',
          dc: 11,
          onSuccessNodeId: 'j5_a3_o_martelo_destroca_o_rubi',
          onPartialFailureNodeId: 'j5_a3_o_martelo_destroca_o_rubi',
          delta: {
            flagsAdicionadas: ['guardiao_do_duelo_do_tridente'],
            aprovacaoCompanheiros: { robert_baratheon: 15 },
            honra: 2,
          },
        },
        {
          id: 'esc_j5_a3_inspirar_a_tropa_com_brados',
          texto: 'Erguer o estandarte do veado e do lobo nas águas, bradando pela vitória de Robert sobre o usurpador.',
          tipo: 'teste_atributo',
          atributo: 'comando',
          dc: 10,
          onSuccessNodeId: 'j5_a3_o_martelo_destroca_o_rubi',
          onPartialFailureNodeId: 'j5_a3_o_martelo_destroca_o_rubi',
          delta: {
            flagsAdicionadas: ['clamor_do_veado_no_tridente'],
            compostura: 1,
          },
        },
      ],
    },

    // 5. O Martelo Destroça o Rubi
    j5_a3_o_martelo_destroca_o_rubi: {
      id: 'j5_a3_o_martelo_destroca_o_rubi',
      titulo: 'A Queda do Dragão',
      anoHistorico: '283 d.C.',
      localizacao: 'O Vau dos Rubis',
      regionId: 'tridente',
      fallbackText: `CRACK!
      
O som do martelo de Robert atingindo o peito de Rhaegar ressoa como a queda de uma torre de castelo.
      
O peitoral de aço negro racha e explode para dentro. Centenas de rubis vermelhos incrustados espalham-se no ar como brasas estilhaçadas, caindo na água corrente e brilhando no fundo lodoso do leito.
      
Com um último murmúrio que sussurra um nome feminino que a correnteza engole — 'Lyanna...' —, o Príncipe Rhaegar tomba de bruços nas águas barrentas do Tridente. A dinastia dos dragões de Aegon o Conquistador acaba de quebrar para sempre!`,
      internalVoices: [
        {
          atributo: 'pressagio',
          resultadoPassivo: 'SUCESSO',
          dcPassiva: 10,
          fala: 'O Tridente agora e para sempre se chamará o Vau dos Rubis. Homens passarão décadas procurando essas pedras no fundo da água.',
        },
      ],
      loreContext: {
        fonte: {
          arquivo_md: 'corpus_md/jornada_3_tronos/livro_1_a-guerra-dos-tronos_resumo-completo.md',
          livro: 'A Guerra dos Tronos',
          capitulo: 'Eddard II',
        },
        notaHistorica: 'Âncora Canônica: Rhaegar morre com o peitoral de rubis estilhaçado murmurando o nome de Lyanna.',
      },
      escolhas: [
        {
          id: 'esc_j5_a3_socorrer_robert_ferido',
          texto: 'Descer do cavalo para amparar Robert Baratheon, que tomba no leito do rio sangrando do ferimento na coxa.',
          tipo: 'simples',
          delta: {
            flagsAdicionadas: ['socorreu_o_futuro_rei'],
            aprovacaoCompanheiros: { robert_baratheon: 15 },
            honra: 2,
          },
          nextNodeId: 'j5_a3_a_rota_do_exercito_real',
        },
        {
          id: 'esc_j5_a3_proteger_barristan_caido',
          texto: 'Intervir para que Ser Barristan Selmy, caído gravemente ferido no cascalho, não seja degolado por soldados saqueadores.',
          tipo: 'teste_atributo',
          atributo: 'cortesia',
          dc: 10,
          onSuccessNodeId: 'j5_a3_a_rota_do_exercito_real',
          onPartialFailureNodeId: 'j5_a3_a_rota_do_exercito_real',
          delta: {
            flagsAdicionadas: ['salvou_barristan_selmy'],
            honra: 3,
            compostura: 1,
          },
        },
      ],
    },

    // 6. A Rota do Exército Real
    j5_a3_a_rota_do_exercito_real: {
      id: 'j5_a3_a_rota_do_exercito_real',
      titulo: 'A Corrida para a Fortaleza Vermelha',
      anoHistorico: '283 d.C.',
      localizacao: 'As Margens Sul do Tridente',
      regionId: 'tridente',
      fallbackText: `Com a morte de Rhaegar, o exército real quebra em pânico e debandada absoluta. Soldados atiram escudos e elmos na água e fogem pela Estrada do Rei em direção ao sul.
      
Robert Baratheon, apoiado em seus ombros enquanto seu meistre estanca o sangue, entrega a Ned Stark a liderança das tropas avançadas.
      
— Eu não consigo montar com esta coxa rasgada, Ned — diz Robert, respirando com dificuldade. — Pega a vanguarda e cavalga como o vento. Tywin Lannister ainda não declarou de que lado está e Porto Real está desprotegida. Não permitas que o Rei Louco destrua a cidade antes da nossa chegada!`,
      internalVoices: [
        {
          atributo: 'comando',
          resultadoPassivo: 'SUCESSO',
          dcPassiva: 10,
          fala: 'A corrida contra o tempo começou. Quem chegar primeiro a Porto Real ditará os termos da paz.',
        },
      ],
      loreContext: {
        fonte: {
          arquivo_md: 'corpus_md/jornada_3_tronos/livro_1_a-guerra-dos-tronos_resumo-completo.md',
          livro: 'A Guerra dos Tronos',
          capitulo: 'Eddard II',
        },
        notaHistorica: 'Âncora Canônica: Robert confia a perseguição e a vanguarda para Porto Real a Eddard Stark devido aos seus ferimentos.',
      },
      escolhas: [
        {
          id: 'esc_j5_a3_cavalgar_com_ned_porto_real',
          texto: 'Montar com a vanguarda veloz de Eddard Stark e cavalgar a galope implacável rumo a Porto Real (Avançar para o Ato IV).',
          tipo: 'simples',
          delta: {
            flagsAdicionadas: ['vanguarda_de_ned_a_porto_real'],
            marcoConcluido: 'j5_ato3_concluido',
            honra: 2,
            compostura: 1,
          },
          nextNodeId: 'j5_a4_a_marcha_rapida_para_a_capital',
        },
        {
          id: 'esc_j5_a3_cuidar_dos_feridos_tridente',
          texto: 'Permanecer temporariamente para organizar as carroças de feridos de Robert antes de marchar para a capital (Avançar para o Ato IV).',
          tipo: 'simples',
          delta: {
            flagsAdicionadas: ['guarda_da_comitiva_real'],
            marcoConcluido: 'j5_ato3_concluido',
            honra: 1,
          },
          nextNodeId: 'j5_a4_a_marcha_rapida_para_a_capital',
        },
      ],
    },
  },
};
