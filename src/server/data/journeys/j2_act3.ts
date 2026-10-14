import 'server-only';
import { GrafoJornada, NodeJornada } from '@/server/engine/storyLinter';

export const grafoJ2Ato3: GrafoJornada = {
  id: 'jornada_2_danca_ato3',
  titulo: 'Ato 3: As Terras Fluviais, Tumbleton, O Olho de Deus e o Fosso dos Dragões',
  startNodeId: 'j2_a3_aemond_chamas_fluviais',
  nodes: {
    // 1. Aemond e Vhagar Queimam o Tridente
    j2_a3_aemond_chamas_fluviais: {
      id: 'j2_a3_aemond_chamas_fluviais',
      titulo: 'A Fúria Cega de Aemond nas Terras Fluviais',
      anoHistorico: '130 d.C.',
      localizacao: 'Terras Fluviais',
      regionId: 'tridente',
      fallbackText: `Enlouquecido pela perda de Porto Real, o Príncipe Regente Aemond abandonou o exército de Criston Cole e passou a voar sozinho em Vhagar, incinerando aldeias, plantações e castelos de Darry, Harrenhal e Lagoa da Donzela.
      
Sor Criston Cole, marchando para o sul em busca dos aliados da Campina, foi cercado no 'Baile do Açougueiro' pelos Senhores dos Rios comandados por Roddy Ruína e seus nortenhos. Cole caiu crivado de flechas sem direito a um duelo singular.`,
      internalVoices: [
        {
          atributo: 'comando',
          resultadoPassivo: 'SUCESSO',
          dcPassiva: 10,
          fala: 'Cole morreu como um cão sem honra, mas enquanto Vhagar voar nos céus, nenhuma vitória em terra é segura.',
        },
      ],      loreContext: {
        fonte: {
          arquivo_md: 'corpus_md/jornada_2_danca/fogo-e-sangue_05_morte-dos-dragoes-rhaenyra-triunfante.md',
          livro: 'Fogo & Sangue - Volume 1',
          capitulo: 'A Morte dos Dragões - Rhaenyra Triunfante',
        },
        notaHistorica: 'Fogo & Sangue (George R. R. Martin)',
      },

      escolhas: [
        {
          id: 'esc_j2_a3_liderar_roddy_ruina',
          texto: 'Unir forças aos lobos nortenhos de Roddy Ruína no Baile do Açougueiro.',
          tipo: 'simples',
          nextNodeId: 'j2_a3_marcha_roddy_ruina',
        },
        {
          id: 'esc_j2_a3_enviar_daemon_urtigas_caca',
          texto: 'Autorizar Daemon (Caraxes) e Urtigas (Rouba-Ovelhas) a caçar Aemond em Harrenhal.',
          tipo: 'simples',
          nextNodeId: 'j2_a3_caca_aemond_harrenhal',
        },
        {
          id: 'esc_j2_a3_despachar_sementes_tumbleton',
          texto: 'Despachar Hugh Martelo (Vermithor) e Ulf, o Branco (Asaprata) para conter o exército Verde em Tumbleton.',
          tipo: 'simples',
          nextNodeId: 'j2_a3_conspiracao_tumbleton_primeira',
        },
      ],
    },

    // 2. Caçada a Aemond em Harrenhal
    j2_a3_caca_aemond_harrenhal: {
      id: 'j2_a3_caca_aemond_harrenhal',
      titulo: 'A Espera Solitária em Harrenhal',
      anoHistorico: '130 d.C.',
      localizacao: 'Harrenhal',
      regionId: 'tridente',
      fallbackText: `Durante quatorze dias, Daemon Targaryen acampou em Harrenhal, fazendo um corte em um represeiro a cada manhã e desafiando Aemond a enfrentá-lo. Urtigas partiu para o exílio nas montanhas após uma ordem desvairada de Rhaenyra exigindo sua cabeça por ciúmes. No décimo quarto dia, a sombra titânica de Vhagar finalmente cruzou as nuvens.`,      loreContext: {
        fonte: {
          arquivo_md: 'corpus_md/jornada_2_danca/fogo-e-sangue_05_morte-dos-dragoes-rhaenyra-triunfante.md',
          livro: 'Fogo & Sangue - Volume 1',
          capitulo: 'A Morte dos Dragões - Rhaenyra Triunfante',
        },
        notaHistorica: 'Fogo & Sangue (George R. R. Martin)',
      },

      escolhas: [
        {
          id: 'esc_j2_a3_iniciar_duelo_olho_de_deus',
          texto: 'Montar em Caraxes e erguer voo sobre o Olho de Deus para o duelo dos séculos.',
          tipo: 'simples',
          nextNodeId: 'j2_a3_duelo_lendario_olho_de_deus',
        },
      ],
    },

    // 3. Conspiração em Tumbleton
    j2_a3_conspiracao_tumbleton_primeira: {
      id: 'j2_a3_conspiracao_tumbleton_primeira',
      titulo: 'A Tensão em Tumbleton & O Rastro da Traição',
      anoHistorico: '130 d.C.',
      localizacao: 'Tumbleton, Campina',
      regionId: 'campina',
      fallbackText: `Em Tumbleton, o exército dos Pretos aguardava o choque contra as tropas de Lorde Ormund Hightower e o dragão Tessarion. Porém, nas tabernas e tendas, Hugh Martelo e Ulf, o Branco bebiam além da conta e murmuravam insultos à rainha, descontentes com suas recompensas e cobiçando coroas reais.`,
      internalVoices: [
        {
          atributo: 'astucia',
          resultadoPassivo: 'SUCESSO',
          dcPassiva: 11,
          fala: 'O olhar de Hugh Martelo é de pura cobiça. Se eles voltarem suas chamas no meio da batalha, ninguém escapará.',
        },
      ],      loreContext: {
        fonte: {
          arquivo_md: 'corpus_md/jornada_2_danca/fogo-e-sangue_05_morte-dos-dragoes-rhaenyra-triunfante.md',
          livro: 'Fogo & Sangue - Volume 1',
          capitulo: 'A Morte dos Dragões - Rhaenyra Triunfante',
        },
        notaHistorica: 'Fogo & Sangue (George R. R. Martin)',
      },

      escolhas: [
        {
          id: 'esc_j2_a3_desmascarar_traidores_tumbleton',
          texto: 'Infiltrar guardas fiéis e neutralizar Hugh Martelo e Ulf antes que montem seus dragões!',
          tipo: 'teste_atributo',
          atributo: 'astucia',
          dc: 12,
          onSuccessNodeId: 'j2_a3_whatif_traicao_evitada',
          onPartialFailureNodeId: 'j2_a3_primeira_batalha_tumbleton_canonico',
        },
        {
          id: 'esc_j2_a3_confiar_sementes_batalha',
          texto: 'Confiar nas sementes de dragão e dar a ordem de ataque contra o exército dos Verdes (Cânone).',
          tipo: 'simples',
          nextNodeId: 'j2_a3_primeira_batalha_tumbleton_canonico',
        },
      ],
    },

    // 4. Primeira Batalha de Tumbleton (Canônica)
    j2_a3_primeira_batalha_tumbleton_canonico: {
      id: 'j2_a3_primeira_batalha_tumbleton_canonico',
      titulo: 'As Duas Traições e a Destruição de Tumbleton',
      anoHistorico: '130 d.C.',
      localizacao: 'Tumbleton',
      regionId: 'campina',
      fallbackText: `Quando a infantaria leal a Rhaenyra estava prestes a romper as linhas inimigas, Vermithor e Asaprata alçaram voo — e viraram suas chamas nas costas dos próprios soldados Pretos!
      
Hugh Martelo e Ulf, o Branco traíram a rainha pelo ouro e terras prometidos pelos Verdes. Tumbleton foi pilhada com ferocidade monstruosa, incendiada por três dragões. A notícia da traição chegou a Porto Real como um golpe devastador na sanidade de Rhaenyra.`,      loreContext: {
        fonte: {
          arquivo_md: 'corpus_md/jornada_2_danca/fogo-e-sangue_05_morte-dos-dragoes-rhaenyra-triunfante.md',
          livro: 'Fogo & Sangue - Volume 1',
          capitulo: 'A Morte dos Dragões - Rhaenyra Triunfante',
        },
        notaHistorica: 'Fogo & Sangue (George R. R. Martin)',
      },

      escolhas: [
        {
          id: 'esc_j2_a3_desespero_capital_paranoia',
          texto: 'Retornar à capital onde Rhaenyra enlouquece de desconfiança e ordena a prisão de Addam Velaryon.',
          tipo: 'simples',
          nextNodeId: 'j2_a3_paranoia_rhaenyra_capital',
        },
      ],
    },

    // 5. What If: Traição Evitada
    j2_a3_whatif_traicao_evitada: {
      id: 'j2_a3_whatif_traicao_evitada',
      titulo: 'A Conspiração Sufocada nas Taças de Vinho',
      anoHistorico: '130 d.C.',
      localizacao: 'Tumbleton',
      regionId: 'campina',
      fallbackText: `Com astúcia cirúrgica, os batedores fiéis misturaram veneno do estrangulador nas jarras de cerveja de Hugh e Ulf antes que pudessem alcançar as selas! O exército Verde de Hightower foi pego de surpresa e aniquilado pelo choque conjunto das Terras Fluviais.`,      loreContext: {
        fonte: {
          arquivo_md: 'corpus_md/jornada_2_danca/fogo-e-sangue_05_morte-dos-dragoes-rhaenyra-triunfante.md',
          livro: 'Fogo & Sangue - Volume 1',
          capitulo: 'A Morte dos Dragões - Rhaenyra Triunfante',
        },
        notaHistorica: 'Fogo & Sangue (George R. R. Martin)',
      },

      escolhas: [
        {
          id: 'esc_j2_a3_avancar_vitoria_tumbleton',
          texto: 'Celebrar a vitória sem traições e marchar para proteger o Trono de Ferro.',
          tipo: 'simples',
          nextNodeId: 'j2_a3_duelo_lendario_olho_de_deus',
        },
      ],
    },

    // 6. O Duelo Lendário sobre o Olho de Deus
    j2_a3_duelo_lendario_olho_de_deus: {
      id: 'j2_a3_duelo_lendario_olho_de_deus',
      titulo: 'O Salto Mortal sobre o Olho de Deus',
      anoHistorico: '130 d.C.',
      localizacao: 'Águas do Olho de Deus, Harrenhal',
      regionId: 'tridente',
      fallbackText: `Acima do espelho de água do lago Olho de Deus, Caraxes e Vhagar chocaram-se ao pôr do sol em meio a nuvens incandescentes. O dragão vermelho fechou suas mandíbulas no pescoço de Vhagar, enquanto as garras da velha besta estripavam o ventre de Caraxes.
      
Enquanto os dois dragões despencavam em espiral mortal em direção às águas, o Príncipe Daemon Targaryen soltou os pés dos estribos. Em um salto heroico sem precedentes, ele voou pelo ar, desembainhou a reluzente Irmã Sombria e cravou a lâmina valiriana até o punho na órbita cega de Aemond Caolho!`,
      internalVoices: [
        {
          atributo: 'furia',
          resultadoPassivo: 'SUCESSO',
          dcPassiva: 12,
          fala: 'O salto de Daemon desafia os deuses e os homens! É a morte definitiva do maior monstro alado de Westeros.',
        },
      ],      loreContext: {
        fonte: {
          arquivo_md: 'corpus_md/jornada_2_danca/fogo-e-sangue_05_morte-dos-dragoes-rhaenyra-triunfante.md',
          livro: 'Fogo & Sangue - Volume 1',
          capitulo: 'A Morte dos Dragões - Rhaenyra Triunfante',
        },
        notaHistorica: 'Fogo & Sangue (George R. R. Martin)',
      },

      escolhas: [
        {
          id: 'esc_j2_a3_tentar_resgatar_daemon_sobrevivencia',
          texto: 'Tentar rastrear a queda de Daemon nas margens do lago com uma manobra mágica heroica!',
          tipo: 'teste_atributo',
          atributo: 'pressagio',
          dc: 13,
          onSuccessNodeId: 'j2_a3_whatif_daemon_sobrevive',
          onPartialFailureNodeId: 'j2_a3_morte_dupla_daemon_aemond_canonico',
          onCriticalFailureNodeId: 'j2_a3_morte_dupla_daemon_aemond_canonico',
          riscoMortal: true,
        },
        {
          id: 'esc_j2_a3_testemunhar_queda_canonica',
          texto: 'Testemunhar o impacto que levantou uma onda colossal como uma montanha de água (Caminho Canônico).',
          tipo: 'simples',
          nextNodeId: 'j2_a3_morte_dupla_daemon_aemond_canonico',
        },
      ],
    },

    // 7. Morte Canônica de Daemon e Aemond
    j2_a3_morte_dupla_daemon_aemond_canonico: {
      id: 'j2_a3_morte_dupla_daemon_aemond_canonico',
      titulo: 'A Tumba de Água e Aço Valiriano',
      anoHistorico: '130 d.C.',
      localizacao: 'Olho de Deus',
      regionId: 'tridente',
      fallbackText: `O estrondo da queda no lago foi ouvido a léguas de distância. O crânio de Vhagar afundou no lodo com os ossos de Aemond acorrentados à sela e a espada Irmã Sombria ainda cravada em seu olho. O corpo de Daemon nunca foi encontrado, alimentando canções eternas de que teria sobrevivido com Urtigas nas montanhas.`,      loreContext: {
        fonte: {
          arquivo_md: 'corpus_md/jornada_2_danca/fogo-e-sangue_05_morte-dos-dragoes-rhaenyra-triunfante.md',
          livro: 'Fogo & Sangue - Volume 1',
          capitulo: 'A Morte dos Dragões - Rhaenyra Triunfante',
        },
        notaHistorica: 'Fogo & Sangue (George R. R. Martin)',
      },

      escolhas: [
        {
          id: 'esc_j2_a3_retornar_a_capital_revolta',
          texto: 'Voar para Porto Real onde a plebe amotinada cerca as colinas.',
          tipo: 'simples',
          nextNodeId: 'j2_a3_paranoia_rhaenyra_capital',
        },
      ],
    },

    // 8. What If: Daemon Sobrevive
    j2_a3_whatif_daemon_sobrevive: {
      id: 'j2_a3_whatif_daemon_sobrevive',
      titulo: 'O Retorno do Príncipe Canalha',
      anoHistorico: '130 d.C.',
      localizacao: 'Margens do Olho de Deus',
      regionId: 'tridente',
      fallbackText: `Resgatado semi-afogado entre os juncos por homens fiéis de Harrenhal antes de sucumbir, Daemon Targaryen ergueu-se com a Irmã Sombria recuperada! Aemond e Vhagar estavam mortos, e o Príncipe Negro ainda respirava para liderar a batalha final.`,      loreContext: {
        fonte: {
          arquivo_md: 'corpus_md/jornada_2_danca/fogo-e-sangue_05_morte-dos-dragoes-rhaenyra-triunfante.md',
          livro: 'Fogo & Sangue - Volume 1',
          capitulo: 'A Morte dos Dragões - Rhaenyra Triunfante',
        },
        notaHistorica: 'Fogo & Sangue (George R. R. Martin)',
      },

      escolhas: [
        {
          id: 'esc_j2_a3_marchar_com_daemon_capital',
          texto: 'Marchar com Daemon para salvar a capital da histeria das multidões.',
          tipo: 'simples',
          nextNodeId: 'j2_a3_assalto_fosso_dos_dragoes_pastor',
        },
      ],
    },

    // 9. Paranoía de Rhaenyra na Capital
    j2_a3_paranoia_rhaenyra_capital: {
      id: 'j2_a3_paranoia_rhaenyra_capital',
      titulo: 'A Rainha Sitiada pelas Próprias Sombras',
      anoHistorico: '130 d.C.',
      localizacao: 'Fortaleza Vermelha, Porto Real',
      regionId: 'terras_da_coroa',
      fallbackText: `Consumida pelo luto dos filhos e pela traição de Tumbleton, Rhaenyra ordenou a prisão de Sor Addam Velaryon, duvidando da lealdade de todos os bastardos. Lorde Corlys Velaryon interveio, permitindo que Addam fugisse em Fumaresia.
      
Por sua lealdade, Corlys foi espancado e jogado nas masmorras. A frota Velaryon retirou-se em protesto, deixando a capital vulnerável e faminta. Nas ruas da Baixada das Pulgas, um profeta louco e mutilado chamado O Pastor começou a pregar que os dragões eram demônios do fogo que deviam ser extirpados.`,
      internalVoices: [
        {
          atributo: 'cortesia',
          resultadoPassivo: 'SUCESSO',
          dcPassiva: 10,
          fala: 'Prender a Serpente do Mar é um suicídio político. A cidade entrará em erupção em poucas horas.',
        },
      ],      loreContext: {
        fonte: {
          arquivo_md: 'corpus_md/jornada_2_danca/fogo-e-sangue_05_morte-dos-dragoes-rhaenyra-triunfante.md',
          livro: 'Fogo & Sangue - Volume 1',
          capitulo: 'A Morte dos Dragões - Rhaenyra Triunfante',
        },
        notaHistorica: 'Fogo & Sangue (George R. R. Martin)',
      },

      escolhas: [
        {
          id: 'esc_j2_a3_libertar_corlys_reconciliacao',
          texto: 'Tentar libertar Corlys Velaryon e acalmar a multidão nas portas da Fortaleza.',
          tipo: 'teste_atributo',
          atributo: 'cortesia',
          dc: 11,
          onSuccessNodeId: 'j2_a3_motim_ruas_porto_real',
          onPartialFailureNodeId: 'j2_a3_assalto_fosso_dos_dragoes_pastor',
        },
        {
          id: 'esc_j2_a3_armar_guarda_porto_real',
          texto: 'Organizar os cavaleiros leais para guarnecer a Colina de Rhaenys contra o motim.',
          tipo: 'simples',
          nextNodeId: 'j2_a3_assalto_fosso_dos_dragoes_pastor',
        },
      ],
    },

    // 10. O Assalto ao Fosso dos Dragões
    j2_a3_assalto_fosso_dos_dragoes_pastor: {
      id: 'j2_a3_assalto_fosso_dos_dragoes_pastor',
      titulo: 'O Massacre no Fosso dos Dragões',
      anoHistorico: '130 d.C.',
      localizacao: 'Colina de Rhaenys, Porto Real',
      regionId: 'terras_da_coroa',
      fallbackText: `Vinte mil plebeus enfurecidos, armados com foices, tochas e barras de ferro, subiram a colina aos berros liderados pelo Pastor fanático. Arrombaram as portas colossais do Fosso dos Dragões.
      
Presos em correntes de ferro, Shrykos, Morghul e Tyraxes lutaram bravamente, queimando centenas de homens antes de serem abatidos por machados e lanças. Dreamfyre quebrou suas correntes e voou pelo domo, derrubando toneladas de pedra e mármore sobre a turba antes de sucumbir. No alto dos céus, Syrax desceu sobre as ruínas, enfrentando a multidão em terra.`,
      internalVoices: [
        {
          atributo: 'comando',
          resultadoPassivo: 'SUCESSO',
          dcPassiva: 11,
          fala: 'Se os dragões do Fosso morrerem hoje, a linhagem dos senhores do fogo jamais se recuperará.',
        },
        {
          atributo: 'furia',
          resultadoPassivo: 'SUCESSO',
          dcPassiva: 12,
          fala: 'A turba está cega de ódio fanático. Só uma carga impiedosa de cavaleiros com lanças e espadas pode dispersá-los!',
        },
      ],      loreContext: {
        fonte: {
          arquivo_md: 'corpus_md/jornada_2_danca/fogo-e-sangue_05_morte-dos-dragoes-rhaenyra-triunfante.md',
          livro: 'Fogo & Sangue - Volume 1',
          capitulo: 'A Morte dos Dragões - Rhaenyra Triunfante',
        },
        notaHistorica: 'Fogo & Sangue (George R. R. Martin)',
      },

      escolhas: [
        {
          id: 'esc_j2_a3_liderar_carga_salvar_dragoes',
          texto: 'Liderar carga feroz de cavaleiros para romper a turba e salvar Syrax e os dragões do Fosso!',
          tipo: 'teste_atributo',
          atributo: 'comando',
          dc: 12,
          onSuccessNodeId: 'j2_a3_whatif_fosso_dragoes_salvo',
          onPartialFailureNodeId: 'j2_a3_ruina_canonica_fosso_dragoes',
          onCriticalFailureNodeId: 'j2_a3_morte_linchamento_pastor',
          riscoMortal: true,
        },
        {
          id: 'esc_j2_a3_proteger_rainha_fuga',
          texto: 'Proteger a Rainha Rhaenyra na Fortaleza Vermelha e preparar sua fuga imediata (Cânone).',
          tipo: 'simples',
          nextNodeId: 'j2_a3_ruina_canonica_fosso_dragoes',
        },
      ],
    },

    // 11. Morte na Turba
    j2_a3_morte_linchamento_pastor: {
      id: 'j2_a3_morte_linchamento_pastor',
      titulo: 'Tragado pela Turba Fanática do Pastor',
      anoHistorico: '130 d.C.',
      localizacao: 'Colina de Rhaenys',
      regionId: 'terras_da_coroa',
      isEnding: true,
      fallbackText: `Vosso cavalo foi puxado para a lama por dezenas de mãos ensanguentadas. Desarmado e pisoteado sob as pedras em colapso do domo do Fosso, vossa vida apagou-se entre os gritos dos moribundos e a fumaça de enxofre.`,      loreContext: {
        fonte: {
          arquivo_md: 'corpus_md/jornada_2_danca/fogo-e-sangue_05_morte-dos-dragoes-rhaenyra-triunfante.md',
          livro: 'Fogo & Sangue - Volume 1',
          capitulo: 'A Morte dos Dragões - Rhaenyra Triunfante',
        },
        notaHistorica: 'Fogo & Sangue (George R. R. Martin)',
      },

      escolhas: [],
    },

    // 12. Ruína Canônica do Fosso
    j2_a3_ruina_canonica_fosso_dragoes: {
      id: 'j2_a3_ruina_canonica_fosso_dragoes',
      titulo: 'As Cinzas dos Dragões de Westeros',
      anoHistorico: '130 d.C.',
      localizacao: 'Colina de Rhaenys',
      regionId: 'terras_da_coroa',
      fallbackText: `Syrax foi morta a golpes de machado e picaretas na lama da praça. Pela primeira vez desde a Conquista, cinco dragões reais foram abatidos em uma única noite de pavor popular. O príncipe Joffrey Velaryon despencou do dorso de Syrax tentando montá-la e morreu na calçada de paralelepípedos.
      
Porto Real estava em chamas e sem governo. Rhaenyra foi forçada a fugir na calada da noite sob disfarce com o pequeno príncipe Aegon, vendendo sua coroa para comprar passagem num navio mercante.`,      loreContext: {
        fonte: {
          arquivo_md: 'corpus_md/jornada_2_danca/fogo-e-sangue_05_morte-dos-dragoes-rhaenyra-triunfante.md',
          livro: 'Fogo & Sangue - Volume 1',
          capitulo: 'A Morte dos Dragões - Rhaenyra Triunfante',
        },
        notaHistorica: 'Fogo & Sangue (George R. R. Martin)',
      },

      escolhas: [
        {
          id: 'esc_j2_a3_avancar_fuga_pedra_dragao',
          texto: 'Acompanhar a fuga desesperada de Rhaenyra rumo a Pedra do Dragão.',
          tipo: 'simples',
          nextNodeId: 'j2_a3_checkpoint_conclusao',
        },
      ],
    },

    // 13. What If: Fosso dos Dragões Salvo
    j2_a3_whatif_fosso_dragoes_salvo: {
      id: 'j2_a3_whatif_fosso_dragoes_salvo',
      titulo: 'O Domo Preservado & A Turba Dispersada',
      anoHistorico: '130 d.C.',
      localizacao: 'Fosso dos Dragões',
      regionId: 'terras_da_coroa',
      fallbackText: `Vossa carga de cavalaria despedaçou as linhas dos fanáticos antes que as correntes dos dragões cedessem! O Pastor foi capturado e amarrado aos portões de ferro. Syrax e Dreamfyre rugiram triunfantes no topo da colina, preservando os dragões vivos de Westeros!`,      loreContext: {
        fonte: {
          arquivo_md: 'corpus_md/jornada_2_danca/fogo-e-sangue_05_morte-dos-dragoes-rhaenyra-triunfante.md',
          livro: 'Fogo & Sangue - Volume 1',
          capitulo: 'A Morte dos Dragões - Rhaenyra Triunfante',
        },
        notaHistorica: 'Fogo & Sangue (George R. R. Martin)',
      },

      escolhas: [
        {
          id: 'esc_j2_a3_avancar_com_fosso_salvo',
          texto: 'Concluir o Ato III com os dragões a salvo e marchar para o confronto final em Tumbleton.',
          tipo: 'simples',
          nextNodeId: 'j2_a3_checkpoint_conclusao',
        },
      ],
    },


    // 14. A Revolta dos Famintos nas Ruas da Capital
    j2_a3_motim_ruas_porto_real: {
      id: 'j2_a3_motim_ruas_porto_real',
      titulo: 'Os Portões Fechados & O Desespero em Porto Real',
      anoHistorico: '130 d.C.',
      localizacao: 'Baixada das Pulgas, Porto Real',
      regionId: 'terras_da_coroa',
      fallbackText: `A fome e a escassez transformaram as ruas de paralelepípedos em campos de desespero. Sem ouro no tesouro, a cobrança abusiva de impostos da Rainha Rhaenyra fez os plebeus clamarem por pão, enquanto o Pastor incendiava o ódio popular contra os dragões.`,
      internalVoices: [
        {
          atributo: 'cortesia',
          resultadoPassivo: 'SUCESSO',
          dcPassiva: 10,
          fala: 'Distribuir grãos agora salvará o trono; fechar os portões condenará a Fortaleza Vermelha.',
        },
      ],
      loreContext: {
        fonte: {
          arquivo_md: 'corpus_md/jornada_2_danca/fogo-e-sangue_06_morte-dos-dragoes-rhaenyra-destituida.md',
          livro: 'Fogo & Sangue - Volume 1',
          capitulo: 'A Morte dos Dragões - Rhaenyra Destituída',
        },
        notaHistorica: 'A revolta popular em Porto Real.',
      },
      escolhas: [
        {
          id: 'esc_j2_a3_conter_motim_distribuir_graos',
          texto: 'Abrir os celeiros régios e distribuir farinha e peixe aos famintos.',
          tipo: 'simples',
          nextNodeId: 'j2_a3_assalto_fosso_dos_dragoes_pastor',
        },
        {
          id: 'esc_j2_a3_reforcar_muralhas_colina',
          texto: 'Recuar as tropas para a Colina de Rhaenys e guarnecer o Fosso dos Dragões.',
          tipo: 'simples',
          nextNodeId: 'j2_a3_assalto_fosso_dos_dragoes_pastor',
        },
      ],
    },

    // 15. A Fúria dos Nortenhos no Baile do Açougueiro
    j2_a3_marcha_roddy_ruina: {
      id: 'j2_a3_marcha_roddy_ruina',
      titulo: 'O Rugido dos Lobos no Baile do Açougueiro',
      anoHistorico: '130 d.C.',
      localizacao: 'Terras Fluviais',
      regionId: 'tridente',
      fallbackText: `Sor Roderick Dustin, conhecido como Roddy Ruína, liderou seus velhos lobos nortenhos desdentados com machados de guerra em punho. Enfrentando o exército de Criston Cole, eles lutaram como bêbados de sangue, abatendo cavaleiros montados até a morte de Cole.`,
      internalVoices: [
        {
          atributo: 'furia',
          resultadoPassivo: 'SUCESSO',
          dcPassiva: 10,
          fala: 'Os homens do Norte vieram ao sul para morrer lutando, e nenhum inimigo resiste à sua investida.',
        },
      ],
      loreContext: {
        fonte: {
          arquivo_md: 'corpus_md/jornada_2_danca/fogo-e-sangue_05_morte-dos-dragoes-rhaenyra-triunfante.md',
          livro: 'Fogo & Sangue - Volume 1',
          capitulo: 'A Morte dos Dragões - Rhaenyra Triunfante',
        },
        notaHistorica: 'O massacre de Criston Cole no Baile do Açougueiro.',
      },
      escolhas: [
        {
          id: 'esc_j2_a3_seguir_para_harrenhal_pos_baile',
          texto: 'Marchar com os vencedores em direção a Harrenhal para o cerco final.',
          tipo: 'simples',
          nextNodeId: 'j2_a3_caca_aemond_harrenhal',
        },
      ],
    },

    // Checkpoint do Ato 3
    j2_a3_checkpoint_conclusao: {
      id: 'j2_a3_checkpoint_conclusao',
      titulo: 'Conclusão do Ato III &bull; A Noite Mais Escura dos Dragões',
      anoHistorico: '130 d.C.',
      localizacao: 'Porto Real e Mar Estreito',
      regionId: 'terras_da_coroa',
      isEnding: true,
      fallbackText: `O Ato III encerra-se no ponto de maior tensão da Dança dos Dragões: com a capital em ruínas, Rhaenyra em fuga ignorando que Aegon II está escondido em Pedra do Dragão, e Sor Addam Velaryon reunindo quatro mil homens leais para um ataque noturno desesperado em Tumbleton. O Ato IV decidirá quem reinará sobre os escombros.`,      loreContext: {
        fonte: {
          arquivo_md: 'corpus_md/jornada_2_danca/fogo-e-sangue_05_morte-dos-dragoes-rhaenyra-triunfante.md',
          livro: 'Fogo & Sangue - Volume 1',
          capitulo: 'A Morte dos Dragões - Rhaenyra Triunfante',
        },
        notaHistorica: 'Fogo & Sangue (George R. R. Martin)',
      },

      escolhas: [],
    },
  },
};
