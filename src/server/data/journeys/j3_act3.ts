import 'server-only';
import { GrafoJornada, NodeJornada } from '@/server/engine/storyLinter';

export const grafoJ3Ato3: GrafoJornada = {
  id: 'jornada_3_tronos_ato3',
  titulo: 'Ato 3: A Fúria dos Reis &bull; Bosque dos Murmúrios, A Muralha e Água Negra',
  startNodeId: 'j3_a3_robb_convoca_norte_gargalo',
  nodes: {
    // 1. Robb Convoca o Norte e Marcha pelo Gargalo
    j3_a3_robb_convoca_norte_gargalo: {
      id: 'j3_a3_robb_convoca_norte_gargalo',
      titulo: 'O Jovem Lobo Convoca os Estandartes do Norte',
      anoHistorico: '298 d.C.',
      localizacao: 'Fosso Cailin, O Gargalo',
      regionId: 'norte',
      fallbackText: `Aos dezesseis anos de idade, Robb Stark convocou os senhores do Norte: os Karstark de Karhold, os Umber da Última Lareira, os Bolton do Forte do Pavor, os Glover e os Manderly. Quando Grande Jon Umber ameaçou levar seus homens de volta por não ter recebido o comando da vanguarda, o lobo gigante Vento Cinzento saltou sobre a mesa e decepou dois dedos da mão do lorde com uma mordida limpa. Grande Jon gargalhou e desembainhou sua espada jurando fidelidade cega.
      
Nas ruínas de Fosso Cailin, Robb uniu suas forças à Senhora Catelyn, preparando a travessia das Gêmeas para salvar o Tridente das forças de Tywin e Jaime Lannister.`,
      internalVoices: [
        {
          atributo: 'comando',
          resultadoPassivo: 'SUCESSO',
          dcPassiva: 10,
          fala: 'Robb provou ser um líder de ferro. Mas para cruzar o rio Tridente, ele precisará pagar o pedágio de Lorde Walder Frey.',
        },
      ],
      loreContext: {
        origem: 'canonica',
        fonte: {
          arquivo_md: 'corpus_md/jornada_3_tronos/livro_1_a-guerra-dos-tronos_resumo-completo.md',
          livro: 'A Guerra dos Tronos',
          capitulo: 'Catelyn VIII',
      },
        notaHistorica: 'Robb Stark reúne o exército do Norte em Fosso Cailin.',
      },
      escolhas: [
        {
          id: 'esc_j3_a3_negociar_travessia_gemeas',
          texto: 'Enviar Catelyn para negociar os termos da travessia com Lorde Walder Frey nas Gêmeas.',
          tipo: 'simples',
          nextNodeId: 'j3_a3_pacto_nupcial_gemeas_frey',
        },
        {
          id: 'esc_j3_a3_tentar_forcar_travessia_forca',
          texto: 'Avaliar assalto militar direto às torres das Gêmeas para não ficar dependente dos Frey.',
          tipo: 'teste_atributo',
          atributo: 'comando',
          dc: 12,
          onSuccessNodeId: 'j3_a3_pacto_nupcial_gemeas_frey',
          onPartialFailureNodeId: 'j3_a3_pacto_nupcial_gemeas_frey',
        },

        {
          id: 'esc_robb_desafio_umber',
          texto: 'Encarar o Grande Jon Umber até que Vento Cinzento arranque dois dedos do lorde em sinal de liderança.',
          tipo: 'simples',
          aprovacaoCompanheiros: { grande_jon: 30, catelyn: 20 },
          delta: { flagsAdicionadas: ['lealdade_umber_conquistada'], compostura: 2 },
          nextNodeId: 'j3_a3_pacto_nupcial_gemeas_frey',
        },
        {
          id: 'esc_robb_conselho_catelyn_estrategia',
          texto: 'Aconselhar-se com Lady Catelyn e Ser Brynden sobre a divisão das forças em duas colunas no Tridente.',
          tipo: 'simples',
          aprovacaoCompanheiros: { catelyn: 25, peixe_negro: 25 },
          delta: { compostura: 2 },
          nextNodeId: 'j3_a3_pacto_nupcial_gemeas_frey',
        }
      ],
    },

    // 2. O Pacto Nupcial das Gêmeas
    j3_a3_pacto_nupcial_gemeas_frey: {
      id: 'j3_a3_pacto_nupcial_gemeas_frey',
      titulo: 'O Preço da Travessia nas Gêmeas',
      anoHistorico: '298 d.C.',
      localizacao: 'Castelo das Gêmeas',
      regionId: 'tridente',
      fallbackText: `Lorde Walder Frey, velho de noventa anos e amargo como vinagre, exigiu um tributo exorbitante: Robb teria de acolher dois netos Frey como escudeiros, casar Arya com um filho Frey, e prometer formalmente casar-se com uma das filhas ou netas de Frey após o fim da guerra.
      
Robb aceitou os termos solenes, e quatro mil lanceiros Frey uniram-se à marcha do Norte cruzando a ponte de pedra.`,
      internalVoices: [
        {
          atributo: 'cortesia',
          resultadoPassivo: 'SUCESSO',
          dcPassiva: 10,
          fala: 'Um juramento sagrado foi firmado. Quebrar essa promessa matrimonial com a Casa Frey significará traição mortal.',
        },
      ],
      loreContext: {
        origem: 'canonica',
        fonte: {
          arquivo_md: 'corpus_md/jornada_3_tronos/livro_1_a-guerra-dos-tronos_resumo-completo.md',
          livro: 'A Guerra dos Tronos',
          capitulo: 'Catelyn IX',
      },
        notaHistorica: 'O pacto nupcial entre Robb Stark e a Casa Frey nas Gêmeas.',
      },
      escolhas: [
        {
          id: 'esc_j3_a3_dividir_exercito_bosque_murmurios',
          texto: 'Marchar com a cavalaria em silêncio noturno para emboscar Jaime no Bosque dos Murmúrios.',
          tipo: 'simples',
          nextNodeId: 'j3_a3_batalha_bosque_dos_murmurios',
        },

        {
          id: 'esc_frey_juramento_catelyn',
          texto: 'Fazer com que Walder Frey jure sobre pão e sal entregar todo o contingente de cavalaria aos Stark.',
          tipo: 'simples',
          aprovacaoCompanheiros: { catelyn: 25, peixe_negro: 15 },
          delta: { flagsAdicionadas: ['cavalaria_frey_alistada'], compostura: 2 },
          nextNodeId: 'j3_a3_batalha_bosque_dos_murmurios',
        },
        {
          id: 'esc_frey_vigilia_retaguarda',
          texto: 'Manter arqueiros de confiança vigiando as duas torres das Gêmeas durante a travessia das hostes.',
          tipo: 'simples',
          aprovacaoCompanheiros: { peixe_negro: 25, grande_jon: 15 },
          delta: { compostura: 1 },
          nextNodeId: 'j3_a3_batalha_bosque_dos_murmurios',
        }
      ],
    },

    // 3. A Batalha do Bosque dos Murmúrios
    j3_a3_batalha_bosque_dos_murmurios: {
      id: 'j3_a3_batalha_bosque_dos_murmurios',
      titulo: 'A Emboscada do Jovem Lobo & A Captura do Regicida',
      anoHistorico: '298 d.C.',
      localizacao: 'Bosque dos Murmúrios, Terras Fluviais',
      regionId: 'tridente',
      fallbackText: `A noite na floresta foi rasgada pelo uivo aterrador de Vento Cinzento e pelo estrondo de trombetas nortenhas. Jaime Lannister, marchando arrogantemente sem batedores adequados, caiu numa emboscada perfeita preparada por Robb e Peixe Negro.
      
Cercado em um desfiladeiro íngreme, o Leão Dourado lutou com fúria heroica sobre-humana, matando Daryn Hornwood e dois filhos de Karstark buscando alcançar Robb em duelo singular. Mas Jaime foi desarmado e rendido na lama com sua armadura dourada manchada de sangue.
O Regicida era prisioneiro dos Stark.`,
      internalVoices: [
        {
          atributo: 'comando',
          resultadoPassivo: 'SUCESSO',
          dcPassiva: 11,
          fala: 'A maior lenda viva da espada de Westeros está acorrentada nos seus pés! Correrrio será libertada.',
        },
      ],
      loreContext: {
        origem: 'canonica',
        fonte: {
          arquivo_md: 'corpus_md/jornada_3_tronos/livro_1_a-guerra-dos-tronos_resumo-completo.md',
          livro: 'A Guerra dos Tronos',
          capitulo: 'Catelyn X',
      },
        notaHistorica: 'A vitória esmagadora de Robb Stark no Bosque dos Murmúrios.',
      },
      escolhas: [
        {
          id: 'esc_j3_a3_libertar_correrrio_rei_no_norte',
          texto: 'Marchar para libertar Correrrio e ouvir a proclamação do Grande Salão.',
          tipo: 'simples',
          nextNodeId: 'j3_a3_proclamacao_rei_no_norte',
        },

        {
          id: 'esc_murmurios_guardar_regicida',
          texto: 'Trancar Jaime Lannister sob pesados grilhões em Correrrio sob guarda de guerreiros de confiança.',
          tipo: 'simples',
          aprovacaoCompanheiros: { peixe_negro: 25, catelyn: 20 },
          delta: { flagsAdicionadas: ['regicida_acorrentado_correrrio'], compostura: 2 },
          nextNodeId: 'j3_a3_proclamacao_rei_no_norte',
        },
        {
          id: 'esc_murmurios_celebrar_vitoria',
          texto: 'Permitir que os soldados bebam à saúde do Jovem Lobo e de Vento Cinzento pelas margens do riacho.',
          tipo: 'simples',
          aprovacaoCompanheiros: { grande_jon: 25, catelyn: 10 },
          delta: { sangue: 2, compostura: 2 },
          nextNodeId: 'j3_a3_proclamacao_rei_no_norte',
        }
      ],
    },

    // 4. Proclamação do Rei no Norte
    j3_a3_proclamacao_rei_no_norte: {
      id: 'j3_a3_proclamacao_rei_no_norte',
      titulo: 'O Rei no Norte! O Rei no Norte!',
      anoHistorico: '298 d.C.',
      localizacao: 'Grande Salão de Correrrio',
      regionId: 'tridente',
      fallbackText: `Em Correrrio, lordes do Norte e dos Rios debatiam se deveriam apoiar Stannis ou Renly Baratheon. De repente, Grande Jon Umber ergueu sua espada gigantesca no ar:
— Por que deveríamos nos curvar perante homens sentados em tronos no sul? O que sabem eles da Muralha ou do Inverno? Nem os dragões estão mais vivos! Lá está o único rei a quem dobrarei o joelho: o Rei no Norte!
      
Cinqüenta espadas desembainhadas reluziram nas tochas. 'O Rei no Norte! O Rei no Norte!', rugiram os lordes. Robb Stark foi coroado com uma réplica de ferro e bronze com pontas afiadas como espadas da antiga coroa dos Reis do Inverno.`,
      internalVoices: [
        {
          atributo: 'comando',
          resultadoPassivo: 'SUCESSO',
          dcPassiva: 11,
          fala: 'Uma coroa soberana foi colocada sobre seus ombros. Não há mais volta nem tratado de paz com Porto Real.',
        },
      ],
      loreContext: {
        origem: 'canonica',
        fonte: {
          arquivo_md: 'corpus_md/jornada_3_tronos/livro_1_a-guerra-dos-tronos_resumo-completo.md',
          livro: 'A Guerra dos Tronos',
          capitulo: 'Catelyn XI',
      },
        notaHistorica: 'A consagração de Robb Stark como Rei no Norte.',
      },
      escolhas: [
        {
          id: 'esc_j3_a3_olhar_para_muralha_patrulha',
          texto: 'Receber notícias do extremo norte onde Jon Snow salva o Comandante Mormont.',
          tipo: 'simples',
          nextNodeId: 'j3_a3_muralha_criatura_garra_longa',
        },

        {
          id: 'esc_rei_norte_coroa_bronze',
          texto: 'Aceitar a coroa de ferro e bronze forjada com espadas antigas em honra aos Reis do Inverno.',
          tipo: 'simples',
          aprovacaoCompanheiros: { grande_jon: 30, peixe_negro: 20, catelyn: -10 },
          delta: { flagsAdicionadas: ['coroa_bronze_robb_aceita'], compostura: 2 },
          nextNodeId: 'j3_a3_muralha_criatura_garra_longa',
        },
        {
          id: 'esc_rei_norte_cautela_catelyn',
          texto: 'Lembrar aos lordes que a guerra contra os Lannister ainda não terminou e exige diplomacia.',
          tipo: 'simples',
          aprovacaoCompanheiros: { catelyn: 25, peixe_negro: 20, grande_jon: -15 },
          delta: { compostura: 2 },
          nextNodeId: 'j3_a3_muralha_criatura_garra_longa',
        }
      ],
    },

    // 5. A Criatura na Muralha & Garra Longa
    j3_a3_muralha_criatura_garra_longa: {
      id: 'j3_a3_muralha_criatura_garra_longa',
      titulo: 'Os Olhos Azuis na Noite & A Lâmina Garra Longa',
      anoHistorico: '298 d.C.',
      localizacao: 'Torre do Senhor Comandante, Castelo Negro',
      regionId: 'muralha',
      fallbackText: `Na calada da noite congelada, Fantasma arranhou a porta de Jon Snow em desespero. Nos aposentos do Senhor Comandante Jeor Mormont, o cadáver de Othor — um patrulheiro trazido do além da Muralha — levantara-se sozinho com olhos brilhantes como safiras frias e mãos negras!
      
A criatura estrangulou os guardas e atacou o Velho Urso. Jon desferiu golpes de espada ineficazes contra a carne morta, até agarrar uma lamparina de azeite e atirar o fogo sobre o monstro, incinerando-o em gritos guturais.
Como recompensa pelo ato heroico, Jeor Mormont entregou a Jon a espada ancestral de aço valiriano de quinhentos anos da Casa Mormont: Garra Longa, com um lobo de pedra esculpido no pomo.`,
      internalVoices: [
        {
          atributo: 'furia',
          resultadoPassivo: 'SUCESSO',
          dcPassiva: 10,
          fala: 'O fogo destrói o que o aço não consegue cortar. Os mortos caminham além da Muralha.',
        },
      ],
      loreContext: {
        origem: 'canonica',
        fonte: {
          arquivo_md: 'corpus_md/jornada_3_tronos/livro_1_a-guerra-dos-tronos_resumo-completo.md',
          livro: 'A Guerra dos Tronos',
          capitulo: 'Jon VIII',
      },
        notaHistorica: 'Jon Snow salva Jeor Mormont da criatura e recebe Garra Longa.',
      },
      escolhas: [
        {
          id: 'esc_j3_a3_partir_grande_patrulha',
          texto: 'Marchar com trezentos irmãos jurados na Grande Patrulha além da Muralha.',
          tipo: 'simples',
          nextNodeId: 'j3_a3_grande_patrulha_punho_primeiros_homens',
        },

        {
          id: 'esc_garra_longa_agradecer_mormont',
          texto: 'Juramentar lealdade ao Senhor Comandante Jeor Mormont e honrar o aço valiriano herdado.',
          tipo: 'simples',
          aprovacaoCompanheiros: { jon_snow: 30 },
          delta: { compostura: 2, sangue: 1 },
          nextNodeId: 'j3_a3_grande_patrulha_punho_primeiros_homens',
        },
        {
          id: 'esc_garra_longa_queimar_corpos',
          texto: 'Mandar queimar os restos da criatura com tochas e piche até que sobrem apenas cinzas frias.',
          tipo: 'simples',
          aprovacaoCompanheiros: { jon_snow: 25 },
          delta: { flagsAdicionadas: ['criatura_incinerada_muralha'] },
          nextNodeId: 'j3_a3_grande_patrulha_punho_primeiros_homens',
        }
      ],
    },

    // 6. A Grande Patrulha e o Punho dos Primeiros Homens
    j3_a3_grande_patrulha_punho_primeiros_homens: {
      id: 'j3_a3_grande_patrulha_punho_primeiros_homens',
      titulo: 'O Punho dos Primeiros Homens & O Sacrifício de Qhorin',
      anoHistorico: '299 d.C.',
      localizacao: 'O Punho dos Primeiros Homens, Além da Muralha',
      regionId: 'muralha',
      fallbackText: `No topo da colina de pedra negra cercada por um anel de ruínas antigas, a Patrulha da Noite descobriu que Mance Rayder reunira cem mil selvagens no Passo dos Guinchos.
      
Enviado com o lendário batedor Qhorin Meia-Mão nas gargantas glaciais, Jon capturou a selvagem Ygritte de cabelos beijados pelo fogo, poupando sua vida. Quando os selvagens cercaram o destacamento, Qhorin ordenou que Jon o matasse em combate singular para provar lealdade aos homens livres e infiltrar-se no acampamento inimigo como espião. Jon cumpriu a dolorosa ordem sob o olhar atento de Fantasma.`,
      internalVoices: [
        {
          atributo: 'astucia',
          resultadoPassivo: 'SUCESSO',
          dcPassiva: 11,
          fala: 'Um espião entre cem mil selvagens... A sobrevivência de Castelo Negro dependerá do seu disfarce.',
        },
      ],
      loreContext: {
        origem: 'canonica',
        fonte: {
          arquivo_md: 'corpus_md/jornada_3_tronos/livro_2_a-furia-dos-reis_resumo-completo.md',
          livro: 'A Fúria dos Reis',
          capitulo: 'Jon VIII',
      },
        notaHistorica: 'O sacrifício de Qhorin Meia-Mão para infiltrar Jon Snow.',
      },
      escolhas: [
        {
          id: 'esc_j3_a3_retornar_ao_sul_ponta_tempestade',
          texto: 'Voltar a atenção para o sul onde Stannis e Melisandre desembarcam em Ponta Tempestade.',
          tipo: 'simples',
          nextNodeId: 'j3_a3_sombra_melisandre_ponta_tempestade',
        },

        {
          id: 'esc_punho_vidro_dragao',
          texto: 'Distribuir as pontas de flecha e adagas de obsidiana encontradas entre os irmãos juramentados.',
          tipo: 'simples',
          aprovacaoCompanheiros: { jon_snow: 30 },
          delta: { flagsAdicionadas: ['adagas_obsidiana_distribuidas'], compostura: 2 },
          nextNodeId: 'j3_a3_sombra_melisandre_ponta_tempestade',
        },
        {
          id: 'esc_punho_honra_qhorin',
          texto: 'Aceitar a missão perigosa ao lado de Qhorin Meia-Mão nas entranhas das Presas de Gelo.',
          tipo: 'simples',
          aprovacaoCompanheiros: { jon_snow: 25 },
          delta: { sangue: 1, compostura: 1 },
          nextNodeId: 'j3_a3_sombra_melisandre_ponta_tempestade',
        }
      ],
    },

    // 7. A Sombra de Melisandre em Ponta Tempestade
    j3_a3_sombra_melisandre_ponta_tempestade: {
      id: 'j3_a3_sombra_melisandre_ponta_tempestade',
      titulo: 'A Sombra Nascida nas Trevas de Ponta Tempestade',
      anoHistorico: '299 d.C.',
      localizacao: 'Ponta Tempestade',
      regionId: 'terras_da_tempestade',
      fallbackText: `Renly Baratheon marchara com cem mil lanças da Campina e da Tempestade, desafiando a pretensão rígida de seu irmão Stannis. Na véspera da batalha campal, Ser Davos Seaworth conduziu Melisandre num pequeno barco a remo por sob as muralhas protegidas por encantamentos antigos de Ponta Tempestade.
      
Ali, no lodo escuro, a sacerdotisa vermelha despiu suas vestes de seda e pariu uma criatura de sombras negras com o rosto esfumaçado de Stannis Baratheon. A sombra deslizou pelas ameias e degolou o Rei Renly dentro de sua própria tenda diante de Catelyn Stark e Brienne de Tarth. Os lordes da Tempestade ajoelharam-se perante Stannis.`,
      internalVoices: [
        {
          atributo: 'pressagio',
          resultadoPassivo: 'SUCESSO',
          dcPassiva: 11,
          fala: 'Magia de sangue e sombras. Stannis pagou com sua própria essência vital para assassinar o irmão.',
        },
      ],
      loreContext: {
        origem: 'canonica',
        fonte: {
          arquivo_md: 'corpus_md/jornada_3_tronos/livro_2_a-furia-dos-reis_resumo-completo.md',
          livro: 'A Fúria dos Reis',
          capitulo: 'Davos II',
      },
        notaHistorica: 'O nascimento da sombra de Melisandre e a morte de Renly.',
      },
      escolhas: [
        {
          id: 'esc_j3_a3_frota_stannis_rumo_capital',
          texto: 'Acompanhar a imensa frota de duzentos navios de guerra de Stannis rumo à Baía da Água Negra.',
          tipo: 'simples',
          nextNodeId: 'j3_a3_batalha_da_agua_negra_climax',
        },

        {
          id: 'esc_sombra_recusar_feitiçaria',
          texto: 'Davos Seaworth manifesta horror e suplica a Stannis que lute com homens de aço, não sombras.',
          tipo: 'simples',
          aprovacaoCompanheiros: { catelyn: 20, peixe_negro: 15 },
          delta: { compostura: 1 },
          nextNodeId: 'j3_a3_batalha_da_agua_negra_climax',
        },
        {
          id: 'esc_sombra_pacto_fogo',
          texto: 'Contemplar em silêncio o poder do Senhor da Luz que abre as portas de Ponta Tempestade.',
          tipo: 'simples',
          aprovacaoCompanheiros: { grande_jon: -10 },
          delta: { flagsAdicionadas: ['sombra_magica_testemunhada'] },
          nextNodeId: 'j3_a3_batalha_da_agua_negra_climax',
        }
      ],
    },

    // 8. O Clímax da Batalha da Água Negra
    j3_a3_batalha_da_agua_negra_climax: {
      id: 'j3_a3_batalha_da_agua_negra_climax',
      titulo: 'O Mar em Chamas Esmeraldas na Água Negra',
      anoHistorico: '299 d.C.',
      localizacao: 'Foz do Rio Água Negra, Porto Real',
      regionId: 'terras_da_coroa',
      fallbackText: `Duzentas galés de Stannis Baratheon entraram na foz do rio Água Negra, desembarcando milhares de cavaleiros famintos nos Portões do Rei.
      
Do topo das muralhas, a Mão em exercício Tyrion Lannister deu o sinal: uma corrente de ferro colossal ergueu-se das águas, trancando a boca da baía. Em seguida, barcas de fogovivo foram detonadas entre os navios inimigos.
Uma explosão apocalíptica transformou o rio em um oceano verde esmeralda de chamas incontroláveis que queimavam sobre a água, derretendo homens e madeira. Davos Seaworth foi atirado às águas.
      
Enquanto a vanguarda de Stannis quase rompia os portões de bronze da cidade, o estrondo de cascos anunciou o salvamento: Lorde Tywin Lannister e os exércitos da Casa Tyrell charged pelo flanco, com Ser Garlan Tyrell envergando a armadura esmeralda do fantasma de Renly. Stannis foi repelido derrotado.`,
      internalVoices: [
        {
          atributo: 'comando',
          resultadoPassivo: 'SUCESSO',
          dcPassiva: 12,
          fala: 'A estratégia do Duende salvou Porto Real da destruição. Mas Tywin colherá toda a glória política.',
        },
      ],
      loreContext: {
        origem: 'canonica',
        fonte: {
          arquivo_md: 'corpus_md/jornada_3_tronos/livro_2_a-furia-dos-reis_resumo-completo.md',
          livro: 'A Fúria dos Reis',
          capitulo: 'Davos III / Tyrion XIV',
      },
        notaHistorica: 'A Batalha da Água Negra e a salvação da capital por Tywin Lannister.',
      },
      escolhas: [
        {
          id: 'esc_j3_a3_avancar_consequencias_agua_negra',
          texto: 'Consolidar a hegemonia Lannister-Tyrell na corte e avançar para o Ato IV.',
          tipo: 'simples',
          nextNodeId: 'j3_a3_pos_agua_negra_conselho',
        },
        {
          id: 'esc_j3_a3_resgatar_tyrion_golpeado',
          texto: 'Resgatar Tyrion Lannister com o rosto mutilado por Ser Mandon Moore na ponte de navios.',
          tipo: 'teste_atributo',
          atributo: 'cortesia',
          dc: 10,
          onSuccessNodeId: 'j3_a3_pos_agua_negra_conselho',
          onPartialFailureNodeId: 'j3_a3_pos_agua_negra_conselho',
        },

        {
          id: 'esc_agua_negra_tyrion_corrente',
          texto: 'Erguer a grande corrente de ferro da foz para prender as galés de Stannis no inferno de fogo-vivo.',
          tipo: 'simples',
          aprovacaoCompanheiros: { peixe_negro: 15 },
          delta: { flagsAdicionadas: ['corrente_ferro_agua_negra'] },
          nextNodeId: 'j3_a3_pos_agua_negra_conselho',
        },
        {
          id: 'esc_agua_negra_resgate_davos',
          texto: 'Observar a destruição do alto das muralhas enquanto os cavaleiros de Tywin e Tyrell quebram as linhas rebeldes.',
          tipo: 'simples',
          aprovacaoCompanheiros: { catelyn: 15 },
          delta: { compostura: 1 },
          nextNodeId: 'j3_a3_pos_agua_negra_conselho',
        }
      ],
    },

    // 9. Pós-Água Negra e o Casamento de Joffrey
    j3_a3_pos_agua_negra_conselho: {
      id: 'j3_a3_pos_agua_negra_conselho',
      titulo: 'O Desfile Triunfal de Tywin Lannister',
      anoHistorico: '299 d.C.',
      localizacao: 'Sala do Trono, Porto Real',
      regionId: 'terras_da_coroa',
      fallbackText: `Lorde Tywin entrou montado a cavalo na Sala do Trono, sendo aclamado Salvador da Cidade e reassumindo como Mão do Rei. Joffrey repudiou Sansa Stark e foi formalmente prometido a Margaery Tyrell para selar a aliança com a Campina.
      
Nas celas e nos corredores, os preparativos para o fim da rebelião do Norte começaram a ser traçados em cartas lacradas com ouro e cera de escorpião enviadas a Roose Bolton e Walder Frey.`,
      loreContext: {
        origem: 'canonica',
        fonte: {
          arquivo_md: 'corpus_md/jornada_3_tronos/livro_2_a-furia-dos-reis_resumo-completo.md',
          livro: 'A Fúria dos Reis',
          capitulo: 'Livro 2',
      },
        notaHistorica: 'A Fúria dos Reis (George R. R. Martin) - Tradução Jorge Candeias (LeYa)',
      },
      escolhas: [
        {
          id: 'esc_j3_a3_concluir_ato3',
          texto: 'Concluir o Ato III e preparar o avanço para a Tormenta de Espadas e o Casamento Vermelho (Ato IV).',
          tipo: 'simples',
          nextNodeId: 'j3_a3_checkpoint_conclusao',
        },

        {
          id: 'esc_pos_agua_negra_alianca_stannis',
          texto: 'Despachar emissários a Pedra do Dragão propondo um pacto de pinça militar contra Tywin Lannister.',
          tipo: 'simples',
          aprovacaoCompanheiros: { peixe_negro: 25, catelyn: 20, grande_jon: -5 },
          delta: { flagsAdicionadas: ['emissarios_stannis_enviados'], compostura: 2 },
          nextNodeId: 'j3_a3_checkpoint_conclusao',
        },
        {
          id: 'esc_pos_agua_negra_reforcar_tridente',
          texto: 'Recuar as tropas em ordem disciplinada e reforçar os vaus do Ramo Vermelho contra a investida leão.',
          tipo: 'simples',
          aprovacaoCompanheiros: { peixe_negro: 25, grande_jon: 20 },
          delta: { compostura: 2 },
          nextNodeId: 'j3_a3_checkpoint_conclusao',
        }
      ],
    },

    // Checkpoint do Ato 3
    j3_a3_checkpoint_conclusao: {
      id: 'j3_a3_checkpoint_conclusao',
      titulo: 'Conclusão do Ato III &bull; A Maré Vira a Favor do Leão',
      anoHistorico: '299 d.C.',
      localizacao: 'Correrrio e Porto Real',
      regionId: 'tridente',
      loreContext: {
        origem: 'canonica',
        fonte: {
          arquivo_md: 'corpus_md/jornada_3_tronos/livro_2_a-furia-dos-reis_resumo-completo.md',
          livro: 'A Fúria dos Reis',
          capitulo: 'Livro 2',
      },
        notaHistorica: 'A Fúria dos Reis (George R. R. Martin) - Tradução Jorge Candeias (LeYa)',
      },
      isEnding: true,
      fallbackText: `O Ato III encerra-se com o triunfo retumbante da aliança Lannister-Tyrell após a Água Negra. Stannis recua ferido para Pedra do Dragão, Jon Snow caminha entre os selvagens de Mance Rayder além da Muralha, e Robb Stark enfrenta rebeliões internas em Correrrio após quebrar seu juramento com os Frey. O Ato IV e o Casamento Vermelho aguardam.`,
      escolhas: [],
    },
  },
};
