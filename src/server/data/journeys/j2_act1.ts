import 'server-only';
import { GrafoJornada, NodeJornada } from '@/server/engine/storyLinter';

export const grafoJ2Ato1: GrafoJornada = {
  id: 'jornada_2_danca_ato1',
  titulo: 'Ato 1: Os Dois Conselhos, Ponta Tempestade e Sangue e Queijo',
  startNodeId: 'j2_a1_morte_viserys_conselho_verde',
  nodes: {
    // 1. A Morte de Viserys I e o Conselho Verde
    j2_a1_morte_viserys_conselho_verde: {
      id: 'j2_a1_morte_viserys_conselho_verde',
      titulo: 'A Morte do Rei & O Juramento Secreto do Conselho Verde',
      anoHistorico: '129 d.C.',
      localizacao: 'Fortaleza Vermelha, Porto Real',
      regionId: 'terras_da_coroa',
      fallbackText: `No terceiro dia do terceiro mês de 129 d.C., o Rei Viserys I Targaryen fechou os olhos em seus aposentos na Fortaleza Vermelha e nunca mais despertou. Antes que os sinos da capital pudessem dobrar, a Rainha Viúva Alicent Hightower e Sor Criston Cole trancaram o quarto régio e convocaram uma reunião secreta do Pequeno Conselho.
      
Sor Otto Hightower anunciou que o Trono de Ferro não seria entregue a uma mulher, desafiando o juramento solene feito a Rhaenyra vinte e quatro anos antes. Lorde Lyman Beesbury, mestre da moeda e único a erguer a voz pela honra de Rhaenyra, teve a garganta cortada por Sor Criston Cole sobre a mesa do conselho. O sangue inocente manchou o pergaminho da sucessão.`,
      internalVoices: [
        {
          atributo: 'comando',
          resultadoPassivo: 'SUCESSO',
          dcPassiva: 8,
          fala: 'A morte de um rei exige ação rápida. O controle dos portões e do tesouro decidirá o destino do reino.',
        },
        {
          atributo: 'astucia',
          resultadoPassivo: 'SUCESSO',
          dcPassiva: 10,
          fala: 'O sangue de Beesbury ainda está morno. Quem hesitar agora terminará nas masmorras de Larys Strong.',
        },
      ],      loreContext: {
        fonte: {
          arquivo_md: 'corpus_md/jornada_2_danca/fogo-e-sangue_02_morte-dos-dragoes-pretos-e-verdes.md',
          livro: 'Fogo & Sangue - Volume 1',
          capitulo: 'A Morte dos Dragões - Pretos e Verdes',
        },
        notaHistorica: 'Fogo & Sangue (George R. R. Martin)',
      },

      escolhas: [
        {
          id: 'esc_j2_a1_apoiar_verdes_pragmatismo',
          texto: 'Apoiar o juramento dos Verdes e organizar a coroação urgente de Aegon II no Fosso dos Dragões.',
          tipo: 'simples',
          nextNodeId: 'j2_a1_coroacao_aegon_ii_fosso',
        },
        {
          id: 'esc_j2_a1_enviar_aviso_pedra_dragao',
          texto: 'Subornar guardas e despachar um corvo secreto para Pedra do Dragão alertando a Princesa Rhaenyra.',
          tipo: 'teste_atributo',
          atributo: 'astucia',
          dc: 10,
          onSuccessNodeId: 'j2_a1_corvo_secreto_pedra_dragao',
          onPartialFailureNodeId: 'j2_a1_fuga_porto_real_noite',
          onCriticalFailureNodeId: 'j2_a1_morte_masmorras_vermelhas',
          riscoMortal: true,
        },
        {
          id: 'esc_j2_a1_fingir_lealdade_agente_duplo',
          texto: 'Fingir submissão aos Hightower enquanto se mapeia as passagens secretas com Larys Strong.',
          tipo: 'teste_atributo',
          atributo: 'cortesia',
          dc: 11,
          onSuccessNodeId: 'j2_a1_intrigas_larys_passagens',
          onPartialFailureNodeId: 'j2_a1_coroacao_aegon_ii_fosso',
        },
      ],
    },

    // 2. Morte nas Masmorras
    j2_a1_morte_masmorras_vermelhas: {
      id: 'j2_a1_morte_masmorras_vermelhas',
      titulo: 'Traição Sufocada nas Masmorras Negras',
      anoHistorico: '129 d.C.',
      localizacao: 'Masmorras da Fortaleza Vermelha',
      regionId: 'terras_da_coroa',
      isEnding: true,
      fallbackText: `Vossos passos nas galerias escuras foram interceptados pelos carrascos silenciosos de Sor Otto Hightower. Acusado de traição à nova ordem de Aegon II, fostes arrastado para o terceiro nível das masmorras, onde a lâmina de Sor Criston Cole pôs fim aos vossos desígnios na escuridão úmida.`,      loreContext: {
        fonte: {
          arquivo_md: 'corpus_md/jornada_2_danca/fogo-e-sangue_02_morte-dos-dragoes-pretos-e-verdes.md',
          livro: 'Fogo & Sangue - Volume 1',
          capitulo: 'A Morte dos Dragões - Pretos e Verdes',
        },
        notaHistorica: 'Fogo & Sangue (George R. R. Martin)',
      },

      escolhas: [],
    },

    // 3. O Corvo para Pedra do Dragão
    j2_a1_corvo_secreto_pedra_dragao: {
      id: 'j2_a1_corvo_secreto_pedra_dragao',
      titulo: 'As Asas Negras Sobre o Mar Estreito',
      anoHistorico: '129 d.C.',
      localizacao: 'Torre do Meistre, Porto Real',
      regionId: 'terras_da_coroa',
      fallbackText: `O corvo bateu asas na névoa da madrugada, carregando a fita negra que mudaria a história. Em Pedra do Dragão, a Princesa Rhaenyra entrou em trabalho de parto convulsivo de pura fúria e dor ao saber que seu irmão mais novo usurpara a coroa de seu pai.
      
O Príncipe Daemon Targaryen desembainhou a reluzente Irmã Sombria e jurou que Porto Real arderia. Ao seu lado, Lorde Corlys Velaryon ofereceu a lendária frota de Derivaderiva para bloquear a Baía da Água Negra.`,
      internalVoices: [
        {
          atributo: 'furia',
          resultadoPassivo: 'SUCESSO',
          dcPassiva: 9,
          fala: 'Traição pura e vil! O sangue dos dragões legítimos deve lavar os degraus da Fortaleza Vermelha.',
        },
      ],      loreContext: {
        fonte: {
          arquivo_md: 'corpus_md/jornada_2_danca/fogo-e-sangue_02_morte-dos-dragoes-pretos-e-verdes.md',
          livro: 'Fogo & Sangue - Volume 1',
          capitulo: 'A Morte dos Dragões - Pretos e Verdes',
        },
        notaHistorica: 'Fogo & Sangue (George R. R. Martin)',
      },

      escolhas: [
        {
          id: 'esc_j2_a1_coroacao_negra_mesa_dragao',
          texto: 'Participar do Conselho Preto e proclamar a Rainha Rhaenyra com a coroa de Viserys I.',
          tipo: 'simples',
          nextNodeId: 'j2_a1_conselho_preto_coroacao_rhaenyra',
        },
        {
          id: 'esc_j2_a1_estrategia_daemon_degraus',
          texto: 'Apoiar o plano de Daemon de voar em Caraxes para tomar Harrenhal e unir as Terras Fluviais.',
          tipo: 'teste_atributo',
          atributo: 'comando',
          dc: 11,
          onSuccessNodeId: 'j2_a1_partida_daemon_harrenhal',
          onPartialFailureNodeId: 'j2_a1_conselho_preto_coroacao_rhaenyra',
        },
      
        {
          id: 'esc_j2_a1_sobrevoo_intimidador_capital',
          texto: 'Voar com Caraxes e Syrax próximo à Baía da Água Negra como demonstração indomável de poder!',
          tipo: 'teste_atributo',
          atributo: 'furia',
          dc: 12,
          onSuccessNodeId: 'j2_a1_conselho_preto_coroacao_rhaenyra',
          onPartialFailureNodeId: 'j2_a1_conselho_preto_coroacao_rhaenyra',
          aprovacaoCompanheiros: { daemon: 15, rhaenys_j2: -10 },
          delta: { mundo: { sobrevoo_capital_realizado: true } },
        },
        {
          id: 'esc_j2_a1_pesquisar_testamento_viserys',
          texto: 'Ordenar a Meistre Gerardys que vasculhe os arquivos em busca do testamento selado do Rei Viserys I.',
          tipo: 'teste_atributo',
          atributo: 'erudicao',
          dc: 11,
          onSuccessNodeId: 'j2_a1_conselho_preto_coroacao_rhaenyra',
          onPartialFailureNodeId: 'j2_a1_conselho_preto_coroacao_rhaenyra',
          aprovacaoCompanheiros: { corlys: 10, rhaenys_j2: 10 },
          delta: { mundo: { testamento_viserys_encontrado: true } },
        },
      ],
    },

    // 4. Fuga de Porto Real
    j2_a1_fuga_porto_real_noite: {
      id: 'j2_a1_fuga_porto_real_noite',
      titulo: 'A Fuga pelos Portões do Rio',
      anoHistorico: '129 d.C.',
      localizacao: 'Portão da Lama, Porto Real',
      regionId: 'terras_da_coroa',
      fallbackText: `Esquivando-se das patrulhas dos Mantos Dourados leais a Sor Otto, conseguistes escapar num esquife mercante pelo rio Água Negra, alcançando as praias de basalto negro de Pedra do Dragão sob o olhar vigilante de Syrax e Caraxes.`,      loreContext: {
        fonte: {
          arquivo_md: 'corpus_md/jornada_2_danca/fogo-e-sangue_02_morte-dos-dragoes-pretos-e-verdes.md',
          livro: 'Fogo & Sangue - Volume 1',
          capitulo: 'A Morte dos Dragões - Pretos e Verdes',
        },
        notaHistorica: 'Fogo & Sangue (George R. R. Martin)',
      },

      escolhas: [
        {
          id: 'esc_j2_a1_fuga_para_conselho_preto',
          texto: 'Apresentar-se diante de Rhaenyra e Daemon jurando a lâmina pela causa Negra.',
          tipo: 'simples',
          nextNodeId: 'j2_a1_conselho_preto_coroacao_rhaenyra',
        },

        {
          id: 'esc_fuga_suborno_guardas',
          texto: 'Subornar os sargentos da Patrulha da Cidade para garantir uma saída silenciosa pelo Portão da Lama.',
          tipo: 'teste_atributo',
          atributo: 'astucia',
          dc: 8,
          onSuccessNodeId: 'j2_a1_conselho_preto_coroacao_rhaenyra',
          onPartialFailureNodeId: 'j2_a1_conselho_preto_coroacao_rhaenyra',
          tagOrigem: '[OURO DE DERIVAMARCA]',
          aprovacaoCompanheiros: { corlys: 20, mysaria: 15, daemon: -5 },
        },
        {
          id: 'esc_fuga_carid_furia',
          texto: 'Cortar a garganta do capitão do portão com adaga valiriana antes que a grade desça.',
          tipo: 'simples',
          aprovacaoCompanheiros: { daemon: 20, rhaenys_j2: -15, corlys: -5 },
          delta: { flagsAdicionadas: ['golpe_sangrento_portao_lama'] },
          nextNodeId: 'j2_a1_conselho_preto_coroacao_rhaenyra',
        }
      ],
    },

    // 5. Coroação de Aegon II no Fosso dos Dragões
    j2_a1_coroacao_aegon_ii_fosso: {
      id: 'j2_a1_coroacao_aegon_ii_fosso',
      titulo: 'A Coroação Dourada no Fosso dos Dragões',
      anoHistorico: '129 d.C.',
      localizacao: 'Colina de Rhaenys, Porto Real',
      regionId: 'terras_da_coroa',
      fallbackText: `Milhares de plebeus e soldados apinharam-se sob o imenso domo do Fosso dos Dragões. Sor Criston Cole ergueu a coroa de ferro e rubis de Aegon, o Conquistador, depositando-a sobre a fronte dourada de Aegon II. Sunfyre rugiu, lançando chamas douradas que iluminaram as abóbadas colossais.
      
Aemond Caolho desembainhou sua espada, jurando montar Vhagar e fazer os traidores de Pedra do Dragão se afogarem em cinzas.`,
      internalVoices: [
        {
          atributo: 'comando',
          resultadoPassivo: 'SUCESSO',
          dcPassiva: 10,
          fala: 'A facção Verde tem o ouro, o tesouro e a maior besta alada de Westeros. Mas o Norte e o Mar Estreito não se curvarão sem sangue.',
        },
      ],      loreContext: {
        fonte: {
          arquivo_md: 'corpus_md/jornada_2_danca/fogo-e-sangue_02_morte-dos-dragoes-pretos-e-verdes.md',
          livro: 'Fogo & Sangue - Volume 1',
          capitulo: 'A Morte dos Dragões - Pretos e Verdes',
        },
        notaHistorica: 'Fogo & Sangue (George R. R. Martin)',
      },

      escolhas: [
        {
          id: 'esc_j2_a1_enviar_aemond_ponta_tempestade',
          texto: 'Acompanhar a corte Verde despachando o Príncipe Aemond e Vhagar para Ponta Tempestade.',
          tipo: 'simples',
          nextNodeId: 'j2_a1_ponta_tempestade_chegada_aemond',
        },
        {
          id: 'esc_j2_a1_reforcar_defesas_capital_cole',
          texto: 'Ajudar Criston Cole a organizar as guarnições e preparar o bloqueio contra os navios Velaryon.',
          tipo: 'teste_atributo',
          atributo: 'comando',
          dc: 11,
          onSuccessNodeId: 'j2_a1_preparativos_guerra_porto_real',
          onPartialFailureNodeId: 'j2_a1_ponta_tempestade_chegada_aemond',
        },
      
        {
          id: 'esc_j2_a1_subornar_guardas_dourados',
          texto: 'Ativar os contatos de Mysaria nos Mantos Dourados para minar a lealdade da guarnição urbana.',
          tipo: 'teste_atributo',
          atributo: 'astucia',
          dc: 11,
          onSuccessNodeId: 'j2_a1_conselho_preto_coroacao_rhaenyra',
          onPartialFailureNodeId: 'j2_a1_conselho_preto_coroacao_rhaenyra',
          aprovacaoCompanheiros: { mysaria: 15, corlys: 5 },
          delta: { mundo: { mantos_dourados_subornados: true } },
        },
        {
          id: 'esc_j2_a1_enviar_proposta_paz_alicent',
          texto: 'Enviar corvo a Alicent Hightower apelando à memória de sua antiga afeição na infância.',
          tipo: 'teste_atributo',
          atributo: 'cortesia',
          dc: 12,
          onSuccessNodeId: 'j2_a1_conselho_preto_coroacao_rhaenyra',
          onPartialFailureNodeId: 'j2_a1_conselho_preto_coroacao_rhaenyra',
          aprovacaoCompanheiros: { rhaenys_j2: 15, daemon: -15 },
          delta: { ficha: { honra: 1 } },
        },
      ],
    },

    // 6. Intrigas com Larys Strong
    j2_a1_intrigas_larys_passagens: {
      id: 'j2_a1_intrigas_larys_passagens',
      titulo: 'As Sombras de Larys Pé Torto',
      anoHistorico: '129 d.C.',
      localizacao: 'Passagens Secretas de Maegor',
      regionId: 'terras_da_coroa',
      fallbackText: `Lorde Larys Strong, o mestre dos sussurros de passos mancos, conduziu-vos pelos túneis secretos escavados dentro das paredes de pedra vermelha. Seus espiões sabiam que o jovem Lucerys Velaryon estava voando em Arrax para o sul, rumo a Ponta Tempestade.`,      loreContext: {
        fonte: {
          arquivo_md: 'corpus_md/jornada_2_danca/fogo-e-sangue_02_morte-dos-dragoes-pretos-e-verdes.md',
          livro: 'Fogo & Sangue - Volume 1',
          capitulo: 'A Morte dos Dragões - Pretos e Verdes',
        },
        notaHistorica: 'Fogo & Sangue (George R. R. Martin)',
      },

      escolhas: [
        {
          id: 'esc_j2_a1_larys_rumo_sul',
          texto: 'Montar a cavalo na direção do Passo do Príncipe antes que a tempestade despenque sobre o mar.',
          tipo: 'simples',
          nextNodeId: 'j2_a1_ponta_tempestade_chegada_aemond',
        },

        {
          id: 'esc_larys_contra_espionagem',
          texto: 'Atrair os espiões de Larys para uma emboscada em uma taverna da Baixada das Pulgas.',
          tipo: 'simples',
          aprovacaoCompanheiros: { mysaria: 25, daemon: 15, rhaenys_j2: -5 },
          delta: { flagsAdicionadas: ['rede_larys_cegada'], compostura: 1 },
          nextNodeId: 'j2_a1_preparativos_guerra_porto_real',
        },
        {
          id: 'esc_larys_comprar_silencio',
          texto: 'Oferecer um salvo-conduto e terras em Derivamarca para os informantes de Larys mudarem de lado.',
          tipo: 'simples',
          aprovacaoCompanheiros: { corlys: 20, mysaria: 15 },
          delta: { compostura: 1 },
          nextNodeId: 'j2_a1_preparativos_guerra_porto_real',
        }
      ],
    },

    // 7. Preparativos em Porto Real
    j2_a1_preparativos_guerra_porto_real: {
      id: 'j2_a1_preparativos_guerra_porto_real',
      titulo: 'Os Portões Trancados da Capital',
      anoHistorico: '129 d.C.',
      localizacao: 'Porto Real',
      regionId: 'terras_da_coroa',
      fallbackText: `Os navios da Serpente do Mar fecharam a Goela, impedindo a chegada de grãos e vinho a Porto Real. Otto Hightower despachou corvos para Vilavelha e Rochedo Casterly, convocando as lanças do Ocidente e da Campina.`,      loreContext: {
        fonte: {
          arquivo_md: 'corpus_md/jornada_2_danca/fogo-e-sangue_02_morte-dos-dragoes-pretos-e-verdes.md',
          livro: 'Fogo & Sangue - Volume 1',
          capitulo: 'A Morte dos Dragões - Pretos e Verdes',
        },
        notaHistorica: 'Fogo & Sangue (George R. R. Martin)',
      },

      escolhas: [
        {
          id: 'esc_j2_a1_seguir_rumo_ponta_tempestade',
          texto: 'Seguir para Ponta Tempestade para testemunhar a crucial negociação com Borros Baratheon.',
          tipo: 'simples',
          nextNodeId: 'j2_a1_ponta_tempestade_chegada_aemond',
        },

        {
          id: 'esc_prep_arrecadar_grãos',
          texto: 'Confiscar os armazéns de grãos dos comerciantes da Campina fiéis aos Hightower.',
          tipo: 'simples',
          aprovacaoCompanheiros: { daemon: 15, corlys: 10, rhaenys_j2: -10 },
          delta: { flagsAdicionadas: ['celeiros_hightower_tomados'] },
          nextNodeId: 'j2_a1_conselho_preto_coroacao_rhaenyra',
        },
        {
          id: 'esc_prep_discurso_muralha',
          texto: 'Subir ao adarve e lembrar aos marinheiros que Rhaenyra é a herdeira jurada pelo falecido Rei Viserys.',
          tipo: 'simples',
          aprovacaoCompanheiros: { rhaenys_j2: 20, corlys: 15 },
          delta: { compostura: 2 },
          nextNodeId: 'j2_a1_conselho_preto_coroacao_rhaenyra',
        }
      ],
    },

    // 8. O Conselho Preto e Coroação de Rhaenyra
    j2_a1_conselho_preto_coroacao_rhaenyra: {
      id: 'j2_a1_conselho_preto_coroacao_rhaenyra',
      titulo: 'A Coroação Negra em Pedra do Dragão',
      anoHistorico: '129 d.C.',
      localizacao: 'Salão da Mesa Pintada, Pedra do Dragão',
      regionId: 'pedra_dragao',
      fallbackText: `Sor Steffon Darklyn da Guarda Real chegou do mar trazendo a coroa de ouro e jade do Rei Viserys I. Diante de Daemon, Corlys Velaryon e da Princesa Rhaenys, a coroa foi pousada sobre os cabelos prateados de Rhaenyra.
      
Os jovens príncipes Jacaerys e Lucerys deram um passo à frente. Jacaerys ofereceu-se para voar em Vermax até o Vale e o Norte em busca de Cregan Stark. O jovem Luke propôs voar em Arrax para Ponta Tempestade, jurando que nenhum sangue seria derramado como mensageiro de paz.`,
      internalVoices: [
        {
          atributo: 'pressagio',
          resultadoPassivo: 'SUCESSO',
          dcPassiva: 10,
          fala: 'O cheiro de tempestade e salitre no horizonte traz o presságio de asas gigantes e sangue derramado sobre o mar.',
        },
        {
          atributo: 'cortesia',
          resultadoPassivo: 'SUCESSO',
          dcPassiva: 9,
          fala: 'Lorde Borros é um homem iletrado e belicoso. Palavras doces não bastarão diante de uma promessa de casamento.',
        },
      ],      loreContext: {
        fonte: {
          arquivo_md: 'corpus_md/jornada_2_danca/fogo-e-sangue_02_morte-dos-dragoes-pretos-e-verdes.md',
          livro: 'Fogo & Sangue - Volume 1',
          capitulo: 'A Morte dos Dragões - Pretos e Verdes',
        },
        notaHistorica: 'Fogo & Sangue (George R. R. Martin)',
      },

      escolhas: [
        {
          id: 'esc_j2_a1_escoltar_lucerys_ponta_tempestade',
          texto: 'Voar imediatamente na retaguarda de Lucerys para protegê-lo diante dos Baratheon.',
          tipo: 'simples',
          nextNodeId: 'j2_a1_ponta_tempestade_chegada_aemond',
        },
        {
          id: 'esc_j2_a1_acompanhar_jacaerys_norte',
          texto: 'Acompanhar o Príncipe Jacaerys rumo ao Ninho da Águia e Winterfell (Pacto de Gelo e Fogo).',
          tipo: 'teste_atributo',
          atributo: 'cortesia',
          dc: 10,
          onSuccessNodeId: 'j2_a1_missao_jacaerys_cregan_stark',
          onPartialFailureNodeId: 'j2_a1_ponta_tempestade_chegada_aemond',
        },
      
        {
          id: 'esc_j2_a1_marchar_harrenhal_daemon',
          texto: 'Comandar Daemon a partir com Caraxes e tomar Harrenhal sem demora nas Terras Fluviais.',
          tipo: 'teste_atributo',
          atributo: 'comando',
          dc: 11,
          onSuccessNodeId: 'j2_a1_ponta_tempestade_chegada_aemond',
          onPartialFailureNodeId: 'j2_a1_ponta_tempestade_chegada_aemond',
          aprovacaoCompanheiros: { daemon: 20, corlys: 5 },
          delta: { mundo: { harrenhal_tomada_daemon: true } },
        },
        {
          id: 'esc_j2_a1_apelo_juramento_senhores',
          texto: 'Redigir cartas solenes lembrando a cada lorde o juramento prestado de joelhos a Viserys I em 105 d.C.',
          tipo: 'teste_atributo',
          atributo: 'cortesia',
          dc: 12,
          onSuccessNodeId: 'j2_a1_ponta_tempestade_chegada_aemond',
          onPartialFailureNodeId: 'j2_a1_ponta_tempestade_chegada_aemond',
          aprovacaoCompanheiros: { rhaenys_j2: 15, daemon: -5 },
          delta: { ficha: { honra: 1 } },
        },
      ],
    },

    // 9. Partida de Daemon para Harrenhal
    j2_a1_partida_daemon_harrenhal: {
      id: 'j2_a1_partida_daemon_harrenhal',
      titulo: 'As Asas de Caraxes Sobre o Olho de Deus',
      anoHistorico: '129 d.C.',
      localizacao: 'Harrenhal, Terras Fluviais',
      regionId: 'tridente',
      fallbackText: `Daemon Targaryen pousou Caraxes sobre o topo da Torre dos Fogos Vermelhos de Harrenhal. Diante das mandíbulas sibilantes do dragão vermelho, Sor Simon Strong rendeu as doze muralhas sem disparar uma flecha.
      
Harrenhal tornou-se a fortaleza avançada dos Pretos no coração de Westeros, mas as más novas de Ponta Tempestade logo cruzaram os céus.`,      loreContext: {
        fonte: {
          arquivo_md: 'corpus_md/jornada_2_danca/fogo-e-sangue_02_morte-dos-dragoes-pretos-e-verdes.md',
          livro: 'Fogo & Sangue - Volume 1',
          capitulo: 'A Morte dos Dragões - Pretos e Verdes',
        },
        notaHistorica: 'Fogo & Sangue (George R. R. Martin)',
      },

      escolhas: [
        {
          id: 'esc_j2_a1_retornar_a_ponta_tempestade',
          texto: 'Receber os relatos aéreos do confronto mortal na Baía dos Naufrágios.',
          tipo: 'simples',
          nextNodeId: 'j2_a1_ponta_tempestade_chegada_aemond',
        },

        {
          id: 'esc_daemon_harren_pacto_fluvial',
          texto: 'Exigir que os lordes ribeirinhos enviem seus herdeiros a Harrenhal como prova de vassalagem imediata.',
          tipo: 'simples',
          aprovacaoCompanheiros: { daemon: 25, rhaenys_j2: -10 },
          delta: { flagsAdicionadas: ['refens_fluviais_harrenhal'] },
          nextNodeId: 'j2_a1_missao_jacaerys_cregan_stark',
        },
        {
          id: 'esc_daemon_harren_patrulha_caraxes',
          texto: 'Montar vigília com Caraxes nos céus do Olho de Deus para caçar qualquer mensageiro dos Verdes.',
          tipo: 'simples',
          aprovacaoCompanheiros: { daemon: 20, corlys: 10 },
          delta: { compostura: 1 },
          nextNodeId: 'j2_a1_missao_jacaerys_cregan_stark',
        }
      ],
    },

    // 10. Missão de Jacaerys: Pacto de Gelo e Fogo
    j2_a1_missao_jacaerys_cregan_stark: {
      id: 'j2_a1_missao_jacaerys_cregan_stark',
      titulo: 'O Pacto de Gelo e Fogo em Winterfell',
      anoHistorico: '129 d.C.',
      localizacao: 'Bosque Sagrado de Winterfell',
      regionId: 'norte',
      fallbackText: `Jacaerys Velaryon pousou Vermax nos pátios nevados de Winterfell. Diante do represeiro ancestral de olhos ensanguentados, ele e o jovem Lorde Cregan Stark beberam sangue e vinho, forjando o Pacto de Gelo e Fogo: o Norte enviaria milhares de homens armados e, em troca, uma princesa Targaryen se casaria com o herdeiro Stark.`,      loreContext: {
        fonte: {
          arquivo_md: 'corpus_md/jornada_2_danca/fogo-e-sangue_02_morte-dos-dragoes-pretos-e-verdes.md',
          livro: 'Fogo & Sangue - Volume 1',
          capitulo: 'A Morte dos Dragões - Pretos e Verdes',
        },
        notaHistorica: 'Fogo & Sangue (George R. R. Martin)',
      },

      escolhas: [
        {
          id: 'esc_j2_a1_voltar_com_o_norte',
          texto: 'Concluir a aliança com Winterfell e retornar ao sul antes da catástrofe.',
          tipo: 'simples',
          nextNodeId: 'j2_a1_ponta_tempestade_chegada_aemond',
        },

        {
          id: 'esc_jacaerys_cregan_honra_gelo',
          texto: 'Prometer a mão da futura princesa herdeira ao filho de Cregan Stark no Pacto de Gelo e Fogo.',
          tipo: 'simples',
          aprovacaoCompanheiros: { rhaenys_j2: 25, corlys: 20, daemon: 10 },
          delta: { flagsAdicionadas: ['pacto_gelo_e_fogo_selado'], compostura: 2 },
          nextNodeId: 'j2_a1_ponta_tempestade_chegada_aemond',
        },
        {
          id: 'esc_jacaerys_arqueiros_donzela',
          texto: 'Negociar com Lady Jeyne Arryn contingentes de arqueiros do Vale em troca de proteção aérea.',
          tipo: 'simples',
          aprovacaoCompanheiros: { corlys: 20, rhaenys_j2: 15 },
          delta: { flagsAdicionadas: ['arqueiros_vale_garantidos'] },
          nextNodeId: 'j2_a1_ponta_tempestade_chegada_aemond',
        }
      ],
    },

    // 11. O Confronto em Ponta Tempestade (Aemond vs Lucerys)
    j2_a1_ponta_tempestade_chegada_aemond: {
      id: 'j2_a1_ponta_tempestade_chegada_aemond',
      titulo: 'Ponta Tempestade & O Rugido de Vhagar',
      anoHistorico: '129 d.C.',
      localizacao: 'Castelo de Ponta Tempestade',
      regionId: 'terras_da_tempestade',
      fallbackText: `Uma tempestade diluviana chicoteava as colossais muralhas de Ponta Tempestade quando o jovem Lucerys pousou Arrax. No pátio externo, a silhueta monstruosa de Vhagar descansava como uma montanha esverdeada viva.
      
No Grande Salão, Lorde Borros Baratheon zombou da mensagem de Rhaenyra, exigindo uma proposta de casamento que Luke não podia oferecer. Aemond Caolho deu um passo à frente, retirando o tapa-olho para exibir a safira azul incrustada na carne e desembainhando sua adaga:
— Pagai vossa dívida, pequeno bastardo! Eu quero vosso olho ou vossa vida!`,
      internalVoices: [
        {
          atributo: 'comando',
          resultadoPassivo: 'SUCESSO',
          dcPassiva: 11,
          fala: 'Lorde Borros proibiu sangue sob seu teto, mas nos céus não há regras de hospitalidade. Aemond vai caçá-lo!',
        },
        {
          atributo: 'pressagio',
          resultadoPassivo: 'SUCESSO',
          dcPassiva: 12,
          fala: 'Arrax é jovem e veloz, mas a tempestade favorece o peso colossal e a envergadura de Vhagar.',
        },
      ],      loreContext: {
        fonte: {
          arquivo_md: 'corpus_md/jornada_2_danca/fogo-e-sangue_02_morte-dos-dragoes-pretos-e-verdes.md',
          livro: 'Fogo & Sangue - Volume 1',
          capitulo: 'A Morte dos Dragões - Pretos e Verdes',
        },
        notaHistorica: 'Fogo & Sangue (George R. R. Martin)',
      },

      escolhas: [
        {
          id: 'esc_j2_a1_tentar_salvar_lucerys_heroico',
          texto: 'Intervir na névoa e executar manobra desesperada para resgatar Lucerys das mandíbulas de Vhagar!',
          tipo: 'teste_atributo',
          atributo: 'pressagio',
          dc: 13,
          onSuccessNodeId: 'j2_a1_whatif_lucerys_salvo',
          onPartialFailureNodeId: 'j2_a1_morte_canonica_lucerys_arrax',
          onCriticalFailureNodeId: 'j2_a1_morte_canonica_lucerys_arrax',
          riscoMortal: true,
        },
        {
          id: 'esc_j2_a1_obedecer_borros_partir_imediato',
          texto: 'Seguir o conselho de Lorde Borros e alçar voo cegamente no coração do vendaval (Caminho Canônico).',
          tipo: 'simples',
          nextNodeId: 'j2_a1_morte_canonica_lucerys_arrax',
        },
        {
          id: 'esc_j2_a1_apelar_aemond_cortesia',
          texto: 'Desafiar a honra de cavaleiro de Aemond perante Lorde Borros para impedi-lo de montar Vhagar.',
          tipo: 'teste_atributo',
          atributo: 'cortesia',
          dc: 12,
          onSuccessNodeId: 'j2_a1_whatif_lucerys_salvo',
          onPartialFailureNodeId: 'j2_a1_morte_canonica_lucerys_arrax',
        },
      ],
    },

    // 12. O Cânone Trágico: A Queda de Lucerys e Arrax
    j2_a1_morte_canonica_lucerys_arrax: {
      id: 'j2_a1_morte_canonica_lucerys_arrax',
      titulo: 'A Dança dos Dragões Começa nas Trevas',
      anoHistorico: '129 d.C.',
      localizacao: 'Baía dos Naufrágios, Ponta Tempestade',
      regionId: 'terras_da_tempestade',
      fallbackText: `Entre relâmpagos e trovões estrondosos, Arrax tentou fugir pelas rajadas de chuva, mas a sombra colossal de Vhagar emergiu das nuvens cinco vezes maior. As mandíbulas titânicas da velha dragão fecharam-se sobre o pescoço de Arrax.
      
Pedaços de carne, escamas brancas e o corpo do jovem Príncipe Lucerys Velaryon despencaram nas ondas revoltas da Baía dos Naufrágios. A guerra de palavras terminara; a guerra de sangue e fogo estava decretada.`,      loreContext: {
        fonte: {
          arquivo_md: 'corpus_md/jornada_2_danca/fogo-e-sangue_02_morte-dos-dragoes-pretos-e-verdes.md',
          livro: 'Fogo & Sangue - Volume 1',
          capitulo: 'A Morte dos Dragões - Pretos e Verdes',
        },
        notaHistorica: 'Fogo & Sangue (George R. R. Martin)',
      },

      escolhas: [
        {
          id: 'esc_j2_a1_levar_noticia_pedra_dragao',
          texto: 'Voar velozmente para Pedra do Dragão com o terrível relato da morte do príncipe.',
          tipo: 'simples',
          nextNodeId: 'j2_a1_luto_e_vinganca_sangue_e_queijo',
        },

        {
          id: 'esc_morte_luke_luto_furia',
          texto: 'Jurar que cada osso de Aemond Caolho e de Vhagar pagará em chamas pelo sangue de Lucerys.',
          tipo: 'simples',
          aprovacaoCompanheiros: { daemon: 30, corlys: 20, rhaenys_j2: 15 },
          delta: { flagsAdicionadas: ['juramento_vinganca_lucerys'], sangue: -1, compostura: 2 },
          nextNodeId: 'j2_a1_luto_e_vinganca_sangue_e_queijo',
        },
        {
          id: 'esc_morte_luke_vigilia_solene',
          texto: 'Conduzir os ritos funerários no mar de Derivamarca ao lado de Corlys e Rhaenys desolados.',
          tipo: 'simples',
          aprovacaoCompanheiros: { rhaenys_j2: 25, corlys: 25, daemon: -10 },
          delta: { compostura: 1 },
          nextNodeId: 'j2_a1_luto_e_vinganca_sangue_e_queijo',
        }
      ],
    },

    // 13. What If: Lucerys Velaryon Salvo
    j2_a1_whatif_lucerys_salvo: {
      id: 'j2_a1_whatif_lucerys_salvo',
      titulo: 'O Milagre das Brumas & Lucerys Resgatado',
      anoHistorico: '129 d.C.',
      localizacao: 'Baía dos Naufrágios',
      regionId: 'terras_da_tempestade',
      fallbackText: `Com uma manobra acrobática quase sobrenatural guiada pelo presságio dos ventos, Arrax mergulhou numa fenda de penhascos onde a envergadura monumental de Vhagar não pôde passar! O bafo de chamas verdes de Vhagar queimou apenas a rocha úmida.
      
Lucerys Velaryon sobreviveu à fúria de Aemond, conseguindo ganhar altitude e escapar rumo ao Mar Estreito com segredos vitais sobre a aliança dos Verdes!`,      loreContext: {
        fonte: {
          arquivo_md: 'corpus_md/jornada_2_danca/fogo-e-sangue_02_morte-dos-dragoes-pretos-e-verdes.md',
          livro: 'Fogo & Sangue - Volume 1',
          capitulo: 'A Morte dos Dragões - Pretos e Verdes',
        },
        notaHistorica: 'Fogo & Sangue (George R. R. Martin)',
      },

      escolhas: [
        {
          id: 'esc_j2_a1_retorno_triunfante_luke',
          texto: 'Acompanhar Lucerys de volta a Pedra do Dragão vivo e ileso.',
          tipo: 'simples',
          delta: { flagsAdicionadas: ['lucerys_salvo'] },
          nextNodeId: 'j2_a1_luto_e_vinganca_sangue_e_queijo',
        },

        {
          id: 'esc_salvo_luke_abrigar_derivamarca',
          texto: 'Enviar Lucerys imediatamente para a segurança de Derivamarca sob a escolta das galés de Corlys.',
          tipo: 'simples',
          aprovacaoCompanheiros: { corlys: 25, rhaenys_j2: 25, daemon: -5 },
          delta: { compostura: 2, sangue: 1 },
          nextNodeId: 'j2_a1_checkpoint_conclusao',
        },
        {
          id: 'esc_salvo_luke_contra_ataque_vhagar',
          texto: 'Aproveitar que Aemond está isolado na tempestade para armar uma emboscada aérea com Caraxes e Meleys.',
          tipo: 'simples',
          aprovacaoCompanheiros: { daemon: 25, rhaenys_j2: 15, corlys: -10 },
          delta: { flagsAdicionadas: ['emboscada_aemond_tentada'] },
          nextNodeId: 'j2_a1_checkpoint_conclusao',
        }
      ],
    },

    // 14. A Vingança: Sangue e Queijo
    j2_a1_luto_e_vinganca_sangue_e_queijo: {
      id: 'j2_a1_luto_e_vinganca_sangue_e_queijo',
      titulo: 'Um Olho por um Olho, Um Filho por um Filho',
      anoHistorico: '129 d.C.',
      localizacao: 'Aposentos da Rainha Helaena, Porto Real',
      regionId: 'terras_da_coroa',
      fallbackText: `Em Pedra do Dragão, a carta do Príncipe Daemon selou o destino: 'Olho por olho, filho por filho. Lucerys será vingado.'
      
Através de Mysaria, dois assassinos — Sangue, um carniceiro, e Queijo, um caçador de ratos da Fortaleza Vermelha — esgueiraram-se pelas passagens secretas até a câmara da Rainha Helaena. Diante dos príncipes infantes Jaehaerys e Maelor, forçaram a mãe a escolher qual de seus filhos morreria. Helaena enlouqueceu de agonia.`,
      internalVoices: [
        {
          atributo: 'furia',
          resultadoPassivo: 'SUCESSO',
          dcPassiva: 9,
          fala: 'A vingança de sangue foi servida. Mas a crueldade daquele ato manchará para sempre a causa dos Pretos.',
        },
        {
          atributo: 'cortesia',
          resultadoPassivo: 'SUCESSO',
          dcPassiva: 11,
          fala: 'A morte de uma criança no berço destruirá a simpatia dos nobres de Westeros por Rhaenyra.',
        },
      ],      loreContext: {
        fonte: {
          arquivo_md: 'corpus_md/jornada_2_danca/fogo-e-sangue_02_morte-dos-dragoes-pretos-e-verdes.md',
          livro: 'Fogo & Sangue - Volume 1',
          capitulo: 'A Morte dos Dragões - Pretos e Verdes',
        },
        notaHistorica: 'Fogo & Sangue (George R. R. Martin)',
      },

      escolhas: [
        {
          id: 'esc_j2_a1_conter_assassinos_tentativa',
          texto: 'Tentar impedir a decapitação de Jaehaerys para preservar a honra dos Pretos.',
          tipo: 'teste_atributo',
          atributo: 'cortesia',
          dc: 12,
          onSuccessNodeId: 'j2_a1_bloqueio_honra_assassinato',
          onPartialFailureNodeId: 'j2_a1_execucao_sangue_queijo_canonico',
        },
        {
          id: 'esc_j2_a1_deixar_vinganca_consumar',
          texto: 'Permitir que a vingança de Daemon e Mysaria seja consumada sem hesitação (Caminho Canônico).',
          tipo: 'simples',
          nextNodeId: 'j2_a1_execucao_sangue_queijo_canonico',
        },
      
        {
          id: 'esc_j2_a1_sequestrar_herdeiro_refem',
          texto: 'Comandar que Jaehaerys seja capturado como refém vivo em vez de degolado na frente da mãe.',
          tipo: 'teste_atributo',
          atributo: 'astucia',
          dc: 12,
          onSuccessNodeId: 'j2_a1_bloqueio_honra_assassinato',
          onPartialFailureNodeId: 'j2_a1_execucao_sangue_queijo_canonico',
          aprovacaoCompanheiros: { corlys: 15, daemon: -10 },
          delta: { mundo: { jaehaerys_refem_vivo: true }, ficha: { honra: 1 } },
        },
        {
          id: 'esc_j2_a1_consultar_pressagio_fogo_luto',
          texto: 'Queimar incenso valiriano para apaziguar a alma de Lucerys sem incorrer na maldição dos fratricidas.',
          tipo: 'teste_atributo',
          atributo: 'pressagio',
          dc: 11,
          onSuccessNodeId: 'j2_a1_bloqueio_honra_assassinato',
          onPartialFailureNodeId: 'j2_a1_execucao_sangue_queijo_canonico',
          aprovacaoCompanheiros: { rhaenys_j2: 15, mysaria: 5 },
          delta: { ficha: { compostura: 1 } },
        },
      ],
    },

    // 15. A Execução Canônica de Sangue e Queijo
    j2_a1_execucao_sangue_queijo_canonico: {
      id: 'j2_a1_execucao_sangue_queijo_canonico',
      titulo: 'O Horror na Fortaleza Vermelha',
      anoHistorico: '129 d.C.',
      localizacao: 'Porto Real',
      regionId: 'terras_da_coroa',
      fallbackText: `A cabeça do Príncipe Jaehaerys rolou diante dos olhos de sua mãe, que caiu em loucura irreversível. O reino estremeceu em pavor. Aegon II jurou arrancar o coração de Rhaenyra com as próprias mãos, e Sor Otto Hightower ordenou o enforcamento de todos os caçadores de ratos da cidade.`,      loreContext: {
        fonte: {
          arquivo_md: 'corpus_md/jornada_2_danca/fogo-e-sangue_02_morte-dos-dragoes-pretos-e-verdes.md',
          livro: 'Fogo & Sangue - Volume 1',
          capitulo: 'A Morte dos Dragões - Pretos e Verdes',
        },
        notaHistorica: 'Fogo & Sangue (George R. R. Martin)',
      },

      escolhas: [
        {
          id: 'esc_j2_a1_avancar_checkpoint_ato1',
          texto: 'Avançar para os preparativos militares do Ato II (Pouso de Gralhas e A Semeadura Vermelha).',
          tipo: 'simples',
          nextNodeId: 'j2_a1_checkpoint_conclusao',
        },

        {
          id: 'esc_sq_repudio_publico',
          texto: 'Declarar que o assassinato de Jaehaerys foi obra de criminosos comuns sem o aval da Rainha.',
          tipo: 'simples',
          aprovacaoCompanheiros: { rhaenys_j2: 25, corlys: 15, daemon: -20 },
          delta: { compostura: 1 },
          nextNodeId: 'j2_a1_checkpoint_conclusao',
        },
        {
          id: 'esc_sq_justica_cruel',
          texto: 'Aceitar em silêncio o peso do golpe: na guerra dos dragões, a clemência é fraqueza mortal.',
          tipo: 'simples',
          aprovacaoCompanheiros: { daemon: 25, mysaria: 20, rhaenys_j2: -25 },
          delta: { flagsAdicionadas: ['olho_por_olho_aceito'] },
          nextNodeId: 'j2_a1_checkpoint_conclusao',
        }
      ],
    },

    // 16. Bloqueio da Honra
    j2_a1_bloqueio_honra_assassinato: {
      id: 'j2_a1_bloqueio_honra_assassinato',
      titulo: 'A Restrição da Honra Valiriana',
      anoHistorico: '129 d.C.',
      localizacao: 'Porto Real',
      regionId: 'terras_da_coroa',
      fallbackText: `Vossa intervenção conseguiu conter a lâmina de Sangue, sequestrando o príncipe infante como refém em vez de assassiná-lo barbaramente. A guerra ganha um tom de disputa política sem o estigma hediondo do infanticídio.`,      loreContext: {
        fonte: {
          arquivo_md: 'corpus_md/jornada_2_danca/fogo-e-sangue_02_morte-dos-dragoes-pretos-e-verdes.md',
          livro: 'Fogo & Sangue - Volume 1',
          capitulo: 'A Morte dos Dragões - Pretos e Verdes',
        },
        notaHistorica: 'Fogo & Sangue (George R. R. Martin)',
      },

      escolhas: [
        {
          id: 'esc_j2_a1_avancar_checkpoint_honra',
          texto: 'Concluir o Ato I e preparar a marcha para os grandes combates aéreos do Ato II.',
          tipo: 'simples',
          nextNodeId: 'j2_a1_checkpoint_conclusao',
        },

        {
          id: 'esc_bloqueio_vigilia_costeira',
          texto: 'Deslocar toda a esquadra de Velaryon para fechar a Baía da Água Negra e estrangular o abastecimento dos Verdes.',
          tipo: 'simples',
          aprovacaoCompanheiros: { corlys: 25, rhaenys_j2: 15, daemon: 10 },
          delta: { flagsAdicionadas: ['bloqueio_baia_total'], compostura: 2 },
          nextNodeId: 'j2_a1_checkpoint_conclusao',
        },
        {
          id: 'esc_bloqueio_recrutar_batedores',
          texto: 'Pagar batedores plebeus com a ajuda de Mysaria para mapear cada movimento de Criston Cole.',
          tipo: 'simples',
          aprovacaoCompanheiros: { mysaria: 25, corlys: 10 },
          delta: { flagsAdicionadas: ['batedores_cole_rastreados'] },
          nextNodeId: 'j2_a1_checkpoint_conclusao',
        }
      ],
    },

    // Checkpoint do Ato 1
    j2_a1_checkpoint_conclusao: {
      id: 'j2_a1_checkpoint_conclusao',
      titulo: 'Conclusão do Ato I &bull; O Início da Dança dos Dragões',
      anoHistorico: '129 d.C.',
      localizacao: 'Baía da Água Negra e Mar Estreito',
      regionId: 'pedra_dragao',
      isEnding: true,
      fallbackText: `O primeiro ano da guerra dinástica chega ao fim marcado por tragédias indeléveis. O sangue de príncipes e dragões foi derramado nos céus e na corte. Criston Cole prepara a grande marcha militar sobre as terras da Coroa, marchando para o Pouso de Gralhas onde os dragões de ambos os lados colidirão em chamas.`,      loreContext: {
        fonte: {
          arquivo_md: 'corpus_md/jornada_2_danca/fogo-e-sangue_02_morte-dos-dragoes-pretos-e-verdes.md',
          livro: 'Fogo & Sangue - Volume 1',
          capitulo: 'A Morte dos Dragões - Pretos e Verdes',
        },
        notaHistorica: 'Fogo & Sangue (George R. R. Martin)',
      },

      escolhas: [],
    },
  },
};
