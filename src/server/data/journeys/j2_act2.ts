import 'server-only';
import { GrafoJornada, NodeJornada } from '@/server/engine/storyLinter';

export const grafoJ2Ato2: GrafoJornada = {
  id: 'jornada_2_danca_ato2',
  titulo: 'Ato 2: Pouso de Gralhas, A Semeadura Vermelha e A Queda da Capital',
  startNodeId: 'j2_a2_duelo_gemeos_cargyll',
  nodes: {
    // 1. O Duelo dos Irmãos Cargyll
    j2_a2_duelo_gemeos_cargyll: {
      id: 'j2_a2_duelo_gemeos_cargyll',
      titulo: 'O Duelo Trágico dos Irmãos Cargyll',
      anoHistorico: '129 d.C.',
      localizacao: 'Pedra do Dragão',
      regionId: 'pedra_dragao',
      fallbackText: `Sor Otto Hightower enviou Sor Arryk Cargyll disfarçado para se infiltrar em Pedra do Dragão e assassinar Rhaenyra em seus aposentos. Nos corredores escuros da cidadela de obsidiana, Arryk deu de cara com seu irmão gêmeo, Sor Erryk Cargyll da Guarda da Rainha.
      
Com lágrimas nos olhos e lâminas desembainhadas, os dois irmãos idênticos travaram um duelo mortal em silêncio fúnebre, matando-se mutuamente nos braços um do outro.`,
      internalVoices: [
        {
          atributo: 'comando',
          resultadoPassivo: 'SUCESSO',
          dcPassiva: 10,
          fala: 'A guerra corrompeu até o sangue mais íntimo. A segurança de Pedra do Dragão precisa ser redobrada imediatamente.',
        },
      ],      loreContext: {
        fonte: {
          arquivo_md: 'corpus_md/jornada_2_danca/fogo-e-sangue_04_morte-dos-dragoes-dragao-vermelho-dourado.md',
          livro: 'Fogo & Sangue - Volume 1',
          capitulo: 'A Morte dos Dragões - Dragão Vermelho e Dourado',
        },
        notaHistorica: 'Fogo & Sangue (George R. R. Martin)',
      },

      escolhas: [
        {
          id: 'esc_j2_a2_reforcar_seguranca_rainha',
          texto: 'Honrar os irmãos mortos e colocar a frota Velaryon em alerta máximo contra espiões.',
          tipo: 'simples',
          nextNodeId: 'j2_a2_marcha_cole_pouso_gralhas',
        },
        {
          id: 'esc_j2_a2_investigar_rede_porto_real',
          texto: 'Usar a rede de Mysaria para descobrir onde Criston Cole e o exército Verde estão marchando.',
          tipo: 'teste_atributo',
          atributo: 'astucia',
          dc: 10,
          onSuccessNodeId: 'j2_a2_aviso_armadilha_cole',
          onPartialFailureNodeId: 'j2_a2_marcha_cole_pouso_gralhas',
        },
      
        {
          id: 'esc_j2_a2_interrogar_servicais_pedra_dragao',
          texto: 'Interrogar criados e pescadores de Pedra do Dragão para expor qualquer cúmplice infiltrado.',
          tipo: 'teste_atributo',
          atributo: 'astucia',
          dc: 11,
          onSuccessNodeId: 'j2_a2_marcha_cole_pouso_gralhas',
          onPartialFailureNodeId: 'j2_a2_marcha_cole_pouso_gralhas',
          aprovacaoCompanheiros: { mysaria: 15, daemon: 10 },
          delta: { mundo: { espioes_ilha_revelados: true } },
        },
        {
          id: 'esc_j2_a2_sepultamento_honrado_gemeos',
          texto: 'Enterrar Erryk e Arryk lado a lado com todas as honras da Guarda Real, comovendo a guarnição.',
          tipo: 'teste_atributo',
          atributo: 'cortesia',
          dc: 11,
          onSuccessNodeId: 'j2_a2_marcha_cole_pouso_gralhas',
          onPartialFailureNodeId: 'j2_a2_marcha_cole_pouso_gralhas',
          aprovacaoCompanheiros: { rhaenys_j2: 15, corlys: 10 },
          delta: { ficha: { honra: 1 } },
        },
      ],
    },

    // 2. Aviso da Armadilha
    j2_a2_aviso_armadilha_cole: {
      id: 'j2_a2_aviso_armadilha_cole',
      titulo: 'A Armadilha de Pouso de Gralhas Revelada',
      anoHistorico: '129 d.C.',
      localizacao: 'Pedra do Dragão',
      regionId: 'pedra_dragao',
      fallbackText: `Os batedores descobriram o ardil: Sor Criston Cole cercara deliberadamente o modesto castelo de Lorde Staunton em Pouso de Gralhas para forçar um dragão dos Pretos a vir em socorro, mantendo Sunfyre e Vhagar emboscados nas florestas próximas.`,      loreContext: {
        fonte: {
          arquivo_md: 'corpus_md/jornada_2_danca/fogo-e-sangue_04_morte-dos-dragoes-dragao-vermelho-dourado.md',
          livro: 'Fogo & Sangue - Volume 1',
          capitulo: 'A Morte dos Dragões - Dragão Vermelho e Dourado',
        },
        notaHistorica: 'Fogo & Sangue (George R. R. Martin)',
      },

      escolhas: [
        {
          id: 'esc_j2_a2_enviar_reforcos_duplos',
          texto: 'Alertar a Rainha Rhaenys para não voar sozinha e enviar escolta aéreos com ela.',
          tipo: 'simples',
          nextNodeId: 'j2_a2_batalha_pouso_de_gralhas_climax',
        },

        {
          id: 'esc_cole_contra_cerco',
          texto: 'Enviar uma flotilha rápida de Velaryon para evacuar a guarnição de Pouso de Gralhas pelo mar.',
          tipo: 'simples',
          aprovacaoCompanheiros: { corlys: 20, rhaenys_j2: 15, daemon: -5 },
          delta: { flagsAdicionadas: ['guarnicao_gralhas_evacuada'] },
          nextNodeId: 'j2_a2_batalha_pouso_de_gralhas_climax',
        },
        {
          id: 'esc_cole_armadilha_floresta',
          texto: 'Ordenar que arqueiros ribeirinhos armem emboscadas na floresta para atrasar as carroças de cerco de Cole.',
          tipo: 'simples',
          aprovacaoCompanheiros: { mysaria: 20, corlys: 10 },
          delta: { compostura: 1 },
          nextNodeId: 'j2_a2_batalha_pouso_de_gralhas_climax',
        }
      ],
    },

    // 3. Marcha de Cole
    j2_a2_marcha_cole_pouso_gralhas: {
      id: 'j2_a2_marcha_cole_pouso_gralhas',
      titulo: 'A Marcha de Ferro do Criador de Reis',
      anoHistorico: '129 d.C.',
      localizacao: 'Terras da Ponta da Garra Rachada',
      regionId: 'terras_da_coroa',
      fallbackText: `Sor Criston Cole queimou Rosby e Stokeworth, incorporando suas forças e cercando Pouso de Gralhas. Lorde Staunton trancou os portões e enviou um corvo desesperado para Pedra do Dragão implorando socorro de asas.`,      loreContext: {
        fonte: {
          arquivo_md: 'corpus_md/jornada_2_danca/fogo-e-sangue_04_morte-dos-dragoes-dragao-vermelho-dourado.md',
          livro: 'Fogo & Sangue - Volume 1',
          capitulo: 'A Morte dos Dragões - Dragão Vermelho e Dourado',
        },
        notaHistorica: 'Fogo & Sangue (George R. R. Martin)',
      },

      escolhas: [
        {
          id: 'esc_j2_a2_voar_com_rhaenys',
          texto: 'A Princesa Rhaenys monta Meleys, a Rainha Vermelha, e ruma aos céus para quebrar o cerco.',
          tipo: 'simples',
          nextNodeId: 'j2_a2_batalha_pouso_de_gralhas_climax',
        },

        {
          id: 'esc_marcha_cole_reforcar_gralhas',
          texto: 'Enviar batedores montados para desviar a vanguarda de Criston Cole em direção aos pântanos.',
          tipo: 'simples',
          aprovacaoCompanheiros: { corlys: 15, mysaria: 15 },
          delta: { flagsAdicionadas: ['vanguarda_cole_atrasada'] },
          nextNodeId: 'j2_a2_batalha_pouso_de_gralhas_climax',
        },
        {
          id: 'esc_marcha_cole_convocar_meleys',
          texto: 'A Princesa Rhaenys monta Meleys decidida a interceptar o exército de Cole antes do cerco.',
          tipo: 'simples',
          aprovacaoCompanheiros: { rhaenys_j2: 25, daemon: 15, corlys: -10 },
          delta: { compostura: 1 },
          nextNodeId: 'j2_a2_batalha_pouso_de_gralhas_climax',
        }
      ],
    },

    // 4. Clímax de Pouso de Gralhas
    j2_a2_batalha_pouso_de_gralhas_climax: {
      id: 'j2_a2_batalha_pouso_de_gralhas_climax',
      titulo: 'O Holocausto Aéreo em Pouso de Gralhas',
      anoHistorico: '129 d.C.',
      localizacao: 'Pouso de Gralhas',
      regionId: 'terras_da_coroa',
      fallbackText: `Quando Meleys desceu vomitando fogo escarlate sobre as linhas de Cole, dois rugidos estrondosos cortaram as nuvens: Aegon II surgiu montado em Sunfyre, o Dourado, e das árvores ergueu-se a montanha colossal de Vhagar com Aemond Caolho!
      
Rhaenys não fugiu. Rindo com desdém valiriano, ela lançou Meleys diretamente contra Sunfyre. As feras chocaram-se no ar a trezentos metros de altura, caindo envoltas em fumaça e labaredas incandescentes.`,
      internalVoices: [
        {
          atributo: 'comando',
          resultadoPassivo: 'SUCESSO',
          dcPassiva: 12,
          fala: 'São dois dragões contra um! Se Meleys conseguir romper o flanco de Sunfyre, Vhagar não conseguirá manobrar a tempo.',
        },
        {
          atributo: 'furia',
          resultadoPassivo: 'SUCESSO',
          dcPassiva: 11,
          fala: 'O calor da queda é infernal. As armaduras de ferro derretem na própria carne dos cavaleiros!',
        },
      ],      loreContext: {
        fonte: {
          arquivo_md: 'corpus_md/jornada_2_danca/fogo-e-sangue_04_morte-dos-dragoes-dragao-vermelho-dourado.md',
          livro: 'Fogo & Sangue - Volume 1',
          capitulo: 'A Morte dos Dragões - Dragão Vermelho e Dourado',
        },
        notaHistorica: 'Fogo & Sangue (George R. R. Martin)',
      },

      escolhas: [
        {
          id: 'esc_j2_a2_tentar_resgatar_rhaenys',
          texto: 'Intervir no combate com batedores navais e manobra aérea para salvar a Rainha Rhaenys e Meleys!',
          tipo: 'teste_atributo',
          atributo: 'comando',
          dc: 13,
          onSuccessNodeId: 'j2_a2_whatif_rhaenys_salva',
          onPartialFailureNodeId: 'j2_a2_queda_canonica_rhaenys_meleys',
          onCriticalFailureNodeId: 'j2_a2_morte_chamas_pouso_gralhas',
          riscoMortal: true,
        },
        {
          id: 'esc_j2_a2_seguir_canone_pouso_gralhas',
          texto: 'Testemunhar a queda canônica: Sunfyre despedaçado e Meleys incinerada no solo.',
          tipo: 'simples',
          nextNodeId: 'j2_a2_queda_canonica_rhaenys_meleys',
        },
      
        {
          id: 'esc_j2_a2_disparar_balistas_vhagar',
          texto: 'Coordenar saraivada concentrada de escorpiões navais contra os olhos de Vhagar para cobrir a fuga de Meleys.',
          tipo: 'teste_atributo',
          atributo: 'astucia',
          dc: 12,
          onSuccessNodeId: 'j2_a2_whatif_rhaenys_salva',
          onPartialFailureNodeId: 'j2_a2_queda_canonica_rhaenys_meleys',
          aprovacaoCompanheiros: { corlys: 20, rhaenys_j2: 10 },
          delta: { mundo: { vhagar_ferida_olho: true } },
        },
        {
          id: 'esc_j2_a2_desafio_aereo_aegon_sunfyre',
          texto: 'Concentrar todo o ataque contra Sunfyre para incapacitar o monarca Verde antes do impacto de Vhagar!',
          tipo: 'teste_atributo',
          atributo: 'furia',
          dc: 13,
          onSuccessNodeId: 'j2_a2_queda_canonica_rhaenys_meleys',
          onPartialFailureNodeId: 'j2_a2_queda_canonica_rhaenys_meleys',
          aprovacaoCompanheiros: { daemon: 20, rhaenys_j2: -5 },
          delta: { mundo: { sunfyre_mutilado_pouso: true } },
        },
      ],
    },

    // 5. Morte nas Chamas
    j2_a2_morte_chamas_pouso_gralhas: {
      id: 'j2_a2_morte_chamas_pouso_gralhas',
      titulo: 'Incinerado nas Chamas de Vhagar',
      anoHistorico: '129 d.C.',
      localizacao: 'Pouso de Gralhas',
      regionId: 'terras_da_coroa',
      isEnding: true,
      fallbackText: `Vossa intervenção foi engolida pela torrente monumental de fogo de Vhagar. Vossa montaria e vosso corpo foram reduzidos a cinzas estalantes antes que vossos pés pudessem tocar a terra queimada.`,      loreContext: {
        fonte: {
          arquivo_md: 'corpus_md/jornada_2_danca/fogo-e-sangue_04_morte-dos-dragoes-dragao-vermelho-dourado.md',
          livro: 'Fogo & Sangue - Volume 1',
          capitulo: 'A Morte dos Dragões - Dragão Vermelho e Dourado',
        },
        notaHistorica: 'Fogo & Sangue (George R. R. Martin)',
      },

      escolhas: [],
    },

    // 6. Queda Canônica de Rhaenys
    j2_a2_queda_canonica_rhaenys_meleys: {
      id: 'j2_a2_queda_canonica_rhaenys_meleys',
      titulo: 'A Queda da Rainha Que Nunca Foi',
      anoHistorico: '129 d.C.',
      localizacao: 'Pouso de Gralhas',
      regionId: 'terras_da_coroa',
      fallbackText: `O impacto da queda estremeceu as colinas. Meleys morreu no impacto com a espinha partida; ao lado de sua carcaça, o corpo carbonizado da Princesa Rhaenys jazia irreconhecível.
      
Mas a vitória dos Verdes teve um custo devastador: uma das asas de Sunfyre foi arrancada, e o Rei Aegon II sofreu queimaduras terríveis, com sua armadura de aço fundida na carne das costelas e o quadril estilhaçado. Aemond assumiu como Príncipe Regente.`,      loreContext: {
        fonte: {
          arquivo_md: 'corpus_md/jornada_2_danca/fogo-e-sangue_04_morte-dos-dragoes-dragao-vermelho-dourado.md',
          livro: 'Fogo & Sangue - Volume 1',
          capitulo: 'A Morte dos Dragões - Dragão Vermelho e Dourado',
        },
        notaHistorica: 'Fogo & Sangue (George R. R. Martin)',
      },

      escolhas: [
        {
          id: 'esc_j2_a2_avancar_semeadura_vermelha',
          texto: 'Retornar a Pedra do Dragão onde o Príncipe Jacaerys convoca a Semeadura Vermelha.',
          tipo: 'simples',
          nextNodeId: 'j2_a2_semeadura_vermelha_convocacao',
        },

        {
          id: 'esc_queda_meleys_luto_corlys',
          texto: 'Corlys Velaryon amaldiçoa a imprudência de Rhaenyra e exige que a frota permaneça em Derivamarca.',
          tipo: 'simples',
          aprovacaoCompanheiros: { corlys: 25, rhaenys_j2: 20, daemon: -15 },
          delta: { sangue: -1, compostura: 1 },
          nextNodeId: 'j2_a2_semeadura_vermelha_convocacao',
        },
        {
          id: 'esc_queda_meleys_furia_vinganca',
          texto: 'Jurar perante os restos fumegantes de Meleys que Pouso de Gralhas e Criston Cole pagarão com sangue.',
          tipo: 'simples',
          aprovacaoCompanheiros: { daemon: 25, corlys: 15 },
          delta: { flagsAdicionadas: ['juramento_vinganca_meleys'] },
          nextNodeId: 'j2_a2_semeadura_vermelha_convocacao',
        }
      ],
    },

    // 7. What If: Rhaenys Salva
    j2_a2_whatif_rhaenys_salva: {
      id: 'j2_a2_whatif_rhaenys_salva',
      titulo: 'A Sobrevivência da Rainha Vermelha',
      anoHistorico: '129 d.C.',
      localizacao: 'Pouso de Gralhas',
      regionId: 'terras_da_coroa',
      fallbackText: `Com uma manobra arrojada, Meleys conseguiu soltar-se de Sunfyre antes do impacto final, forçando o dragão de Aegon a colidir sozinho contra o penhasco! Rhaenys retornou gravemente ferida mas viva para Derivaderiva, enquanto Sunfyre permaneceu mutilado na lama.`,      loreContext: {
        fonte: {
          arquivo_md: 'corpus_md/jornada_2_danca/fogo-e-sangue_04_morte-dos-dragoes-dragao-vermelho-dourado.md',
          livro: 'Fogo & Sangue - Volume 1',
          capitulo: 'A Morte dos Dragões - Dragão Vermelho e Dourado',
        },
        notaHistorica: 'Fogo & Sangue (George R. R. Martin)',
      },

      escolhas: [
        {
          id: 'esc_j2_a2_avancar_pos_salvamento_rhaenys',
          texto: 'Fortalecer a frota Velaryon com a lealdade inquebrável de Corlys e Rhaenys.',
          tipo: 'simples',
          delta: { flagsAdicionadas: ['rhaenys_salva'] },
          nextNodeId: 'j2_a2_semeadura_vermelha_convocacao',
        },

        {
          id: 'esc_salva_rhaenys_convalescenca',
          texto: 'Levar a Princesa Rhaenys e Meleys ferida para os estaleiros de Derivamarca sob cuidados dos melhores boticários.',
          tipo: 'simples',
          aprovacaoCompanheiros: { corlys: 30, rhaenys_j2: 25, daemon: 10 },
          delta: { sangue: 2, compostura: 2 },
          nextNodeId: 'j2_a2_semeadura_vermelha_convocacao',
        },
        {
          id: 'esc_salva_rhaenys_proclamar_heroina',
          texto: 'Enviar corvos a todos os castelos do reino proclamando que Meleys sobreviveu e mutilou o dragão do Rei Usurpador.',
          tipo: 'simples',
          aprovacaoCompanheiros: { rhaenys_j2: 20, corlys: 20, mysaria: 15 },
          delta: { compostura: 2 },
          nextNodeId: 'j2_a2_semeadura_vermelha_convocacao',
        }
      ],
    },

    // 8. A Semeadura Vermelha: Convocação
    j2_a2_semeadura_vermelha_convocacao: {
      id: 'j2_a2_semeadura_vermelha_convocacao',
      titulo: 'A Semeadura Vermelha em Pedra do Dragão',
      anoHistorico: '129 d.C.',
      localizacao: 'Pedra do Dragão',
      regionId: 'pedra_dragao',
      fallbackText: `Com Meleys tombada e poucos dragões adultos sob sela, o Príncipe Jacaerys Velaryon tomou uma decisão audaciosa: abrir as cavernas do Monte Dragão e convocar todos os bastardos de sangue valiriano — as sementes de dragão — prometendo títulos de nobreza e ouro para quem domasse Vermithor, Asaprata, Fumaresia ou Rouba-Ovelhas.
      
Centenas de homens e mulheres queimaram e foram devorados nas semanas seguintes, mas quatro novos montadores ergueram-se das cinzas.`,
      internalVoices: [
        {
          atributo: 'erudicao',
          resultadoPassivo: 'SUCESSO',
          dcPassiva: 10,
          fala: 'O sangue do dragão não conhece leis de matrimônio. Um bastardo montado num dragão pode ser tanto a salvação quanto a ruína de um reino.',
        },
      ],      loreContext: {
        fonte: {
          arquivo_md: 'corpus_md/jornada_2_danca/fogo-e-sangue_04_morte-dos-dragoes-dragao-vermelho-dourado.md',
          livro: 'Fogo & Sangue - Volume 1',
          capitulo: 'A Morte dos Dragões - Dragão Vermelho e Dourado',
        },
        notaHistorica: 'Fogo & Sangue (George R. R. Martin)',
      },

      escolhas: [
        {
          id: 'esc_j2_a2_domar_vermithor_mortal',
          texto: 'Adentrar o covil de Vermithor, a Fúria de Bronze, e tentar domá-lo pessoalmente!',
          tipo: 'teste_atributo',
          atributo: 'furia',
          dc: 12,
          onSuccessNodeId: 'j2_a2_doma_vermithor_sucesso',
          onPartialFailureNodeId: 'j2_a2_semeadura_concluida_sementes',
          onCriticalFailureNodeId: 'j2_a2_morte_chamas_vermithor',
          riscoMortal: true,
        },
        {
          id: 'esc_j2_a2_auxiliar_urtigas_astucia',
          texto: 'Ajudar a jovem camponesa Urtigas a pacificar o selvagem Rouba-Ovelhas com carne fresca.',
          tipo: 'teste_atributo',
          atributo: 'astucia',
          dc: 9,
          onSuccessNodeId: 'j2_a2_urtigas_sucesso_rouba_ovelhas',
          onPartialFailureNodeId: 'j2_a2_semeadura_concluida_sementes',
        },
        {
          id: 'esc_j2_a2_consagrar_addam_velaryon',
          texto: 'Apoiar Addam de Casco na doma de Fumaresia e garantir sua legitimação por Corlys Velaryon.',
          tipo: 'simples',
          nextNodeId: 'j2_a2_semeadura_concluida_sementes',
        },
      ],
    },

    // 9. Morte por Vermithor
    j2_a2_morte_chamas_vermithor: {
      id: 'j2_a2_morte_chamas_vermithor',
      titulo: 'Devorado pela Fúria de Bronze',
      anoHistorico: '129 d.C.',
      localizacao: 'Monte Dragão, Pedra do Dragão',
      regionId: 'pedra_dragao',
      isEnding: true,
      fallbackText: `Vossa aproximação irritou o antigo dragão do Rei Jaehaerys. Com um bafo flamejante que derreteu vossa cota de malha em segundos, Vermithor engoliu vossos restos e retornou ao seu sono na caverna vulcânica.`,      loreContext: {
        fonte: {
          arquivo_md: 'corpus_md/jornada_2_danca/fogo-e-sangue_04_morte-dos-dragoes-dragao-vermelho-dourado.md',
          livro: 'Fogo & Sangue - Volume 1',
          capitulo: 'A Morte dos Dragões - Dragão Vermelho e Dourado',
        },
        notaHistorica: 'Fogo & Sangue (George R. R. Martin)',
      },

      escolhas: [],
    },

    // 10. Sucesso ao Domar Vermithor
    j2_a2_doma_vermithor_sucesso: {
      id: 'j2_a2_doma_vermithor_sucesso',
      titulo: 'O Cavaleiro da Fúria de Bronze',
      anoHistorico: '129 d.C.',
      localizacao: 'Monte Dragão',
      regionId: 'pedra_dragao',
      fallbackText: `Com nervos de aço e a voz ressoando em alto valiriano, conseguistes subjugar a besta titânica! Vermithor curvou sua cabeça cor de bronze, permitindo que a sela fosse atada em seu dorso. Vós sois agora o senhor da segunda maior arma viva de Westeros!`,      loreContext: {
        fonte: {
          arquivo_md: 'corpus_md/jornada_2_danca/fogo-e-sangue_04_morte-dos-dragoes-dragao-vermelho-dourado.md',
          livro: 'Fogo & Sangue - Volume 1',
          capitulo: 'A Morte dos Dragões - Dragão Vermelho e Dourado',
        },
        notaHistorica: 'Fogo & Sangue (George R. R. Martin)',
      },

      escolhas: [
        {
          id: 'esc_j2_a2_avancar_batalha_goela',
          texto: 'Voar em Vermithor para esmagar a frota da Triarquia na Batalha da Goela.',
          tipo: 'simples',
          delta: { flagsAdicionadas: ['domou_vermithor'] },
          nextNodeId: 'j2_a2_batalha_da_goela_frota',
        },

        {
          id: 'esc_vermithor_juramento_bronze',
          texto: 'Exigir de Hugh Martelo juramento sagrado diante da Mesa Pintada antes de conceder-lhe terras de cavaleiro.',
          tipo: 'simples',
          aprovacaoCompanheiros: { corlys: 20, rhaenys_j2: 15, daemon: 10 },
          delta: { flagsAdicionadas: ['juramento_sagrado_hugh'], compostura: 2 },
          nextNodeId: 'j2_a2_semeadura_concluida_sementes',
        },
        {
          id: 'esc_vermithor_manto_ouro',
          texto: 'Dar a Hugh Martelo um broche de dragão de bronze e armadura forjada pelos ferreiros reais.',
          tipo: 'simples',
          aprovacaoCompanheiros: { daemon: 20, mysaria: 15 },
          delta: { compostura: 1 },
          nextNodeId: 'j2_a2_semeadura_concluida_sementes',
        }
      ],
    },

    // 11. Urtigas Domando Rouba-Ovelhas
    j2_a2_urtigas_sucesso_rouba_ovelhas: {
      id: 'j2_a2_urtigas_sucesso_rouba_ovelhas',
      titulo: 'A Camponesa e o Dragão Selvagem',
      anoHistorico: '129 d.C.',
      localizacao: 'Pedra do Dragão',
      regionId: 'pedra_dragao',
      fallbackText: `Urtigas ofereceu pacientemente uma ovelha recém-abatida todas as manhãs até que a criatura selvagem aceitou seu toque. Uma garota plebeia morena e descalça tornara-se senhora dos céus.`,      loreContext: {
        fonte: {
          arquivo_md: 'corpus_md/jornada_2_danca/fogo-e-sangue_04_morte-dos-dragoes-dragao-vermelho-dourado.md',
          livro: 'Fogo & Sangue - Volume 1',
          capitulo: 'A Morte dos Dragões - Dragão Vermelho e Dourado',
        },
        notaHistorica: 'Fogo & Sangue (George R. R. Martin)',
      },

      escolhas: [
        {
          id: 'esc_j2_a2_avancar_goela_urtigas',
          texto: 'Unir os novos dragões e marchar para a grande batalha naval da Goela.',
          tipo: 'simples',
          nextNodeId: 'j2_a2_batalha_da_goela_frota',
        },

        {
          id: 'esc_urtigas_afeto_paterno',
          texto: 'Acolher Urtigas na tenda de comando com carinho e provisões fartas para alimentar Rouba-Ovelhas.',
          tipo: 'simples',
          aprovacaoCompanheiros: { daemon: 25, mysaria: 20, rhaenys_j2: 10 },
          delta: { compostura: 2, sangue: 1 },
          nextNodeId: 'j2_a2_semeadura_concluida_sementes',
        },
        {
          id: 'esc_urtigas_ouro_e_armas',
          texto: 'Conceder à jovem plebeia um estipêndio generoso de Derivamarca e roupas dignas de uma princesa alada.',
          tipo: 'simples',
          aprovacaoCompanheiros: { corlys: 20, mysaria: 25 },
          delta: { flagsAdicionadas: ['urtigas_patrocinada_velaryon'] },
          nextNodeId: 'j2_a2_semeadura_concluida_sementes',
        }
      ],
    },

    // 12. Semeadura Concluída
    j2_a2_semeadura_concluida_sementes: {
      id: 'j2_a2_semeadura_concluida_sementes',
      titulo: 'Os Novos Senhores dos Céus',
      anoHistorico: '129 d.C.',
      localizacao: 'Pedra do Dragão',
      regionId: 'pedra_dragao',
      fallbackText: `Hugh Martelo domou Vermithor; Ulf, o Branco montou Asaprata; Addam de Casco reivindicou Fumaresia e Urtigas subiu em Rouba-Ovelhas. Seis dragões voavam agora sob o estandarte de Rhaenyra, mas a frota de guerra de Lys, Myr e Tyrosh aproximava-se com noventa galés.`,      loreContext: {
        fonte: {
          arquivo_md: 'corpus_md/jornada_2_danca/fogo-e-sangue_04_morte-dos-dragoes-dragao-vermelho-dourado.md',
          livro: 'Fogo & Sangue - Volume 1',
          capitulo: 'A Morte dos Dragões - Dragão Vermelho e Dourado',
        },
        notaHistorica: 'Fogo & Sangue (George R. R. Martin)',
      },

      escolhas: [
        {
          id: 'esc_j2_a2_iniciar_batalha_goela',
          texto: 'Soar os búzios de guerra e interceptar as galés mercenárias na Batalha da Goela.',
          tipo: 'simples',
          nextNodeId: 'j2_a2_batalha_da_goela_frota',
        },

        {
          id: 'esc_semeadura_banquete_alianca',
          texto: 'Oferecer um banquete solene em honra aos novos cavaleiros de dragão na câmara de Pedra do Dragão.',
          tipo: 'simples',
          aprovacaoCompanheiros: { daemon: 20, corlys: 15, mysaria: 15 },
          delta: { compostura: 2 },
          nextNodeId: 'j2_a2_batalha_da_goela_frota',
        },
        {
          id: 'esc_semeadura_vigilia_sementes',
          texto: 'Fazer com que os bastardos valirianos jurem lealdade solene com adagas sobre a Mesa Pintada.',
          tipo: 'simples',
          aprovacaoCompanheiros: { corlys: 20, daemon: 15 },
          delta: { flagsAdicionadas: ['juramento_sementes_selado'] },
          nextNodeId: 'j2_a2_batalha_da_goela_frota',
        }
      ],
    },

    // 13. A Batalha da Goela
    j2_a2_batalha_da_goela_frota: {
      id: 'j2_a2_batalha_da_goela_frota',
      titulo: 'O Sangue e o Fogo na Batalha da Goela',
      anoHistorico: '130 d.C.',
      localizacao: 'Mar da Goela, Derivaderiva',
      regionId: 'pedra_dragao',
      fallbackText: `Noventa galés da Triarquia sob o comando de Sharako Lohar caíram sobre o canal da Goela, atacando o navio onde viajavam os jovens príncipes Aegon e Viserys.
      
Cinco dragões caíram dos céus vomitando chamas vorazes que transformaram as galés de madeira em tochas flutuantes. No calor do combate, Vermax voou baixo demais e foi cravado por arpões e virotes de ferro, arrastando o Príncipe Jacaerys para o mar sangrento.`,
      internalVoices: [
        {
          atributo: 'comando',
          resultadoPassivo: 'SUCESSO',
          dcPassiva: 11,
          fala: 'A frota inimiga está em cinzas, mas o herdeiro de Rhaenyra está no mar cercado por flecheiros de Lys!',
        },
      ],      loreContext: {
        fonte: {
          arquivo_md: 'corpus_md/jornada_2_danca/fogo-e-sangue_04_morte-dos-dragoes-dragao-vermelho-dourado.md',
          livro: 'Fogo & Sangue - Volume 1',
          capitulo: 'A Morte dos Dragões - Dragão Vermelho e Dourado',
        },
        notaHistorica: 'Fogo & Sangue (George R. R. Martin)',
      },

      escolhas: [
        {
          id: 'esc_j2_a2_tentar_salvar_jacaerys',
          texto: 'Mergulhar nas águas em chamas para salvar o Príncipe Jacaerys Velaryon!',
          tipo: 'teste_atributo',
          atributo: 'comando',
          dc: 12,
          onSuccessNodeId: 'j2_a2_whatif_jacaerys_salvo',
          onPartialFailureNodeId: 'j2_a2_queda_jacaerys_canonico',
        },
        {
          id: 'esc_j2_a2_concentrar_ataque_vitoria_mar',
          texto: 'Aniquilar os últimos navios de Myr e quebrar o cerco naval a Derivaderiva.',
          tipo: 'simples',
          nextNodeId: 'j2_a2_queda_jacaerys_canonico',
        },
      
        {
          id: 'esc_j2_a2_queimar_galeotes_triarquia',
          texto: 'Liderar os dragões em rasantes devastadores sobre os conveses de madeira de Lys e Tyrosh!',
          tipo: 'teste_atributo',
          atributo: 'comando',
          dc: 12,
          onSuccessNodeId: 'j2_a2_whatif_jacaerys_salvo',
          onPartialFailureNodeId: 'j2_a2_queda_jacaerys_canonico',
          aprovacaoCompanheiros: { corlys: 15, daemon: 10 },
          delta: { mundo: { frota_triarquia_devastada: true } },
        },
        {
          id: 'esc_j2_a2_sinalizar_manobra_velaryon',
          texto: 'Usar trombetas de guerra para organizar as quinas marítimas e fechar a rota de fuga das galés inimigas.',
          tipo: 'teste_atributo',
          atributo: 'astucia',
          dc: 11,
          onSuccessNodeId: 'j2_a2_queda_jacaerys_canonico',
          onPartialFailureNodeId: 'j2_a2_queda_jacaerys_canonico',
          aprovacaoCompanheiros: { corlys: 20, mysaria: 10 },
          delta: { ficha: { compostura: 1 } },
        },
      ],
    },

    // 14. Queda de Jacaerys
    j2_a2_queda_jacaerys_canonico: {
      id: 'j2_a2_queda_jacaerys_canonico',
      titulo: 'A Morte do Príncipe Herdeiro',
      anoHistorico: '130 d.C.',
      localizacao: 'Mar da Goela',
      regionId: 'pedra_dragao',
      fallbackText: `Jacaerys conseguiu soltar-se dos arreios de Vermax, mas ao emergir entre os destroços, dezenas de besteiros myrenses dispararam em uníssono. O príncipe desapareceu nas águas salgadas. A vitória foi conquistada, mas Derivaderiva foi saqueada e Espreitamar ardeu.`,      loreContext: {
        fonte: {
          arquivo_md: 'corpus_md/jornada_2_danca/fogo-e-sangue_04_morte-dos-dragoes-dragao-vermelho-dourado.md',
          livro: 'Fogo & Sangue - Volume 1',
          capitulo: 'A Morte dos Dragões - Dragão Vermelho e Dourado',
        },
        notaHistorica: 'Fogo & Sangue (George R. R. Martin)',
      },

      escolhas: [
        {
          id: 'esc_j2_a2_avancar_queda_capital',
          texto: 'Unir as forças de Rhaenyra e marchar imediatamente para tomar Porto Real desprotegida.',
          tipo: 'simples',
          nextNodeId: 'j2_a2_queda_de_porto_real_trono',
        },

        {
          id: 'esc_queda_jace_vinganca_triarquia',
          texto: 'Ordenar que Caraxes e Vermax remanescentes persigam as galés da Triarquia e afundem seus sobreviventes.',
          tipo: 'simples',
          aprovacaoCompanheiros: { daemon: 25, corlys: 20 },
          delta: { flagsAdicionadas: ['triarquia_estracalhada'] },
          nextNodeId: 'j2_a2_queda_de_porto_real_trono',
        },
        {
          id: 'esc_queda_jace_luto_nobreza',
          texto: 'Decretar luto oficial em Derivamarca e proclamar o Príncipe Joffrey herdeiro de Pedra do Dragão.',
          tipo: 'simples',
          aprovacaoCompanheiros: { corlys: 25, rhaenys_j2: 20 },
          delta: { compostura: 1 },
          nextNodeId: 'j2_a2_queda_de_porto_real_trono',
        }
      ],
    },

    // 15. What If: Jacaerys Salvo
    j2_a2_whatif_jacaerys_salvo: {
      id: 'j2_a2_whatif_jacaerys_salvo',
      titulo: 'O Resgate de Jacaerys na Goela',
      anoHistorico: '130 d.C.',
      localizacao: 'Águas de Derivaderiva',
      regionId: 'pedra_dragao',
      fallbackText: `Com bravura descomunal, uma galera Velaryon interceptou os disparos e resgatou o jovem herdeiro ferido mas com vida! A vitória na Goela é total e a sucessão de Rhaenyra permanece firme.`,      loreContext: {
        fonte: {
          arquivo_md: 'corpus_md/jornada_2_danca/fogo-e-sangue_04_morte-dos-dragoes-dragao-vermelho-dourado.md',
          livro: 'Fogo & Sangue - Volume 1',
          capitulo: 'A Morte dos Dragões - Dragão Vermelho e Dourado',
        },
        notaHistorica: 'Fogo & Sangue (George R. R. Martin)',
      },

      escolhas: [
        {
          id: 'esc_j2_a2_avancar_porto_real_jace_vivo',
          texto: 'Lançar o ataque supremo sobre a capital com Jacaerys ao lado de sua mãe.',
          tipo: 'simples',
          nextNodeId: 'j2_a2_queda_de_porto_real_trono',
        },

        {
          id: 'esc_salvo_jace_reorganizar_mar',
          texto: 'Nomear Jacaerys Comandante Geral dos Estreitos ao lado de Corlys para vingar a nau Gay Abandon.',
          tipo: 'simples',
          aprovacaoCompanheiros: { corlys: 25, rhaenys_j2: 20, daemon: 15 },
          delta: { flagsAdicionadas: ['jacaerys_almirante_estreitos'], compostura: 2 },
          nextNodeId: 'j2_a2_queda_de_porto_real_trono',
        },
        {
          id: 'esc_salvo_jace_agradecer_deuses',
          texto: 'Orar nos septos e bosques sagrados de Pedra do Dragão em ação de graças pelo resgate do Príncipe de Pedra do Dragão.',
          tipo: 'simples',
          aprovacaoCompanheiros: { rhaenys_j2: 25, corlys: 20 },
          delta: { compostura: 2 },
          nextNodeId: 'j2_a2_queda_de_porto_real_trono',
        }
      ],
    },

    // 16. A Queda de Porto Real (Tomada do Trono)
    j2_a2_queda_de_porto_real_trono: {
      id: 'j2_a2_queda_de_porto_real_trono',
      titulo: 'A Queda de Porto Real & O Trono de Ferro Tomado',
      anoHistorico: '130 d.C.',
      localizacao: 'Porto Real',
      regionId: 'terras_da_coroa',
      fallbackText: `Com Aemond e Vhagar longe queimando as terras do Tridente, Daemon em Caraxes e Rhaenyra em Syrax desceram sobre as colinas de Porto Real com seis dragões. Os Mantos Dourados revoltaram-se contra os Verdes e abriram os portões de ferro.
      
A Rainha Alicent rendeu a Fortaleza Vermelha, mas Aegon II e seus dois filhos haviam desaparecido pelas passagens secretas graças a Larys Strong. Rhaenyra subiu os degraus do Trono de Ferro envergando uma armadura de escamas negras e a coroa de seu pai. O Ato II encerra-se com os Pretos no poder, enquanto a tempestade se avizinha nas Terras Fluviais.`,
      internalVoices: [
        {
          atributo: 'comando',
          resultadoPassivo: 'SUCESSO',
          dcPassiva: 10,
          fala: 'A coroa foi recuperada, mas as lâminas do Trono cortaram a mão de Rhaenyra. O ferro frio ainda não aceitou seu reinado por completo.',
        },
      ],      loreContext: {
        fonte: {
          arquivo_md: 'corpus_md/jornada_2_danca/fogo-e-sangue_04_morte-dos-dragoes-dragao-vermelho-dourado.md',
          livro: 'Fogo & Sangue - Volume 1',
          capitulo: 'A Morte dos Dragões - Dragão Vermelho e Dourado',
        },
        notaHistorica: 'Fogo & Sangue (George R. R. Martin)',
      },

            conditionalParagraphs: [
        {
          requiredFlag: 'lucerys_salvo',
          text: 'O jovem Príncipe Lucerys Velaryon, salvo em Ponta Tempestade, atua como arauto de sua mãe, conquistando os corações dos marinheiros do cais que celebram sua bravura contra Vhagar.',
        }
      ],
escolhas: [
        {
          id: 'esc_j2_a2_avancar_ato3_checkpoint',
          texto: 'Concluir o Ato II e consolidar o governo de Rhaenyra na Fortaleza Vermelha.',
          tipo: 'simples',
          nextNodeId: 'j2_a2_checkpoint_conclusao',
        },

        {
          id: 'esc_queda_pr_disciplina_manto_ouro',
          texto: 'Nomear Daemon comandante da capital para reestabelecer a disciplina da Patrulha da Cidade sem saques.',
          tipo: 'simples',
          aprovacaoCompanheiros: { daemon: 25, corlys: 20, mysaria: 15 },
          delta: { compostura: 2 },
          nextNodeId: 'j2_a2_checkpoint_conclusao',
        },
        {
          id: 'esc_queda_pr_anistia_povo',
          texto: 'Distribuir cevada e peixe seco aos plebeus da Baixada das Pulgas, conquistando a aclamação das ruas.',
          tipo: 'simples',
          aprovacaoCompanheiros: { corlys: 20, mysaria: 25, daemon: -5 },
          delta: { flagsAdicionadas: ['aclamacao_popular_porto_real'] },
          nextNodeId: 'j2_a2_checkpoint_conclusao',
        }
      ],
    },

    // Checkpoint do Ato 2
    j2_a2_checkpoint_conclusao: {
      id: 'j2_a2_checkpoint_conclusao',
      titulo: 'Conclusão do Ato II &bull; Rhaenyra no Trono de Ferro',
      anoHistorico: '130 d.C.',
      localizacao: 'Sala do Trono, Porto Real',
      regionId: 'terras_da_coroa',
      isEnding: true,
      fallbackText: `O Trono de Ferro pertence a Rhaenyra, mas o tesouro real foi esvaziado pelos Hightower e o povo geme sob pesados impostos. Aemond Caolho queima o Tridente com Vhagar, e o exército Verde de Ormund Hightower marcha em direção a Tumbleton com o Príncipe Daeron e Tessarion. O Ato III e as maiores traições da guerra aguardam.`,      loreContext: {
        fonte: {
          arquivo_md: 'corpus_md/jornada_2_danca/fogo-e-sangue_04_morte-dos-dragoes-dragao-vermelho-dourado.md',
          livro: 'Fogo & Sangue - Volume 1',
          capitulo: 'A Morte dos Dragões - Dragão Vermelho e Dourado',
        },
        notaHistorica: 'Fogo & Sangue (George R. R. Martin)',
      },

      escolhas: [],
    },
  },
};
