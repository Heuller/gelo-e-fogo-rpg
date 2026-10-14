import 'server-only';
import { GrafoJornada, NodeJornada } from '@/server/engine/storyLinter';

export const grafoAto2: GrafoJornada = {
  id: 'jornada_1_conquista_ato2',
  titulo: 'Ato 2: Harrenhal e a Última Tempestade',
  startNodeId: 'j1_a2_revolta_terras_fluviais',
  nodes: {
    // ==========================================
    // CENA 1: A REVOLTA DAS TERRAS FLUVIAIS
    // ==========================================
    j1_a2_revolta_terras_fluviais: {
      id: 'j1_a2_revolta_terras_fluviais',
      titulo: 'A Rebelião dos Rios & O Cerco de Harrenhal',
      anoHistorico: '2 a.C.',
      localizacao: 'Margens do Olho de Deus',
      regionId: 'tridente',
      fallbackText: `As águas serenas do lago Olho de Deus refletiam a silhueta monstruosa de Harrenhal, a maior fortaleza jamais erguida em Westeros pelo suor e sangue de quarenta anos de trabalho forçado. Ao redor de suas muralhas gigantescas, as bandeiras dos Senhores dos Rios ondulavam ao vento: a truta prateada de Lorde Edmyn Tully de Correrrio, a águia de Mallister de Saltepedra, os garanhões de Bracken e os corvos de Blackwood.

Lorde Edmyn Tully cavalgou até a tenda real de Aegon, apeando e cravando sua espada na lama úmida em sinal de vassalagem irrestrita. Quarenta mil combatentes fluviais juraram lealdade ao Dragão, rebelando-se contra a tirania sanguinária da Casa Hoare e dos homens de ferro que os escravizavam havia gerações.

Acima deles, Balerion rugiu nos céus, e sua sombra titânica engoliu as margens do lago. O cerco estava posto, mas o orgulhoso Rei Harren, o Negro, ordenara que seus homens fechassem os portões colossais de bronze, zombando dos invasores do topo de suas cinco torres que arranhavam as nuvens.`,
      internalVoices: [
        {
          atributo: 'comando',
          resultadoPassivo: 'SUCESSO',
          dcPassiva: 8,
          fala: 'Os Senhores dos Rios clamam por vingança. Dê a eles justiça contra os Hoare e o Tridente será vosso para sempre.',
        },
        {
          atributo: 'astucia',
          resultadoPassivo: 'SUCESSO',
          dcPassiva: 9,
          fala: 'Harrenhal é uma armadilha de pedra. O tolo reuniu toda a sua família e vassalos mais leais no mesmo caldeirão.',
        },
      ],
      loreContext: {
        idVerbete: 'harrenhal',
        fonte: {
          arquivo_md: 'fogo-e-sangue_01_a-conquista-de-aegon.md',
          livro: 'Fogo & Sangue - Volume 1',
          capitulo: 'A Conquista de Aegon',
        },
        notaHistorica: 'Lorde Edmyn Tully lidera os senhores fluviais na rebelião contra Harren Hoare e une-se a Aegon I.',
      },
      escolhas: [
        {
          id: 'esc_parlamento_harrenhal',
          texto: 'Cavalgar sob o estandarte de trégua até os portões de Harrenhal para intimar Harren, o Negro, à rendição.',
          tipo: 'simples',
          nextNodeId: 'j1_a2_parlamento_harrenhal',
        },
        {
          id: 'esc_estudar_infiltracao_harrenhal',
          texto: 'Consultar desertores fluviais e pescadores do Olho de Deus para infiltrar comandos pelas cloacas submersas.',
          tipo: 'teste_atributo',
          atributo: 'astucia',
          dc: 11,
          onSuccessNodeId: 'j1_a2_whatif_infiltracao_harrenhal',
          onPartialFailureNodeId: 'j1_a2_parlamento_harrenhal',
        },
        {
          id: 'esc_reunir_conselho_fluvial_erudicao',
          texto: 'Consultar meistres e lordes sobre a história dos Hoare para usar rivalidades antigas a favor do cerco.',
          tipo: 'teste_atributo',
          atributo: 'erudicao',
          dc: 9,
          onSuccessNodeId: 'j1_a2_parlamento_harrenhal',
          onPartialFailureNodeId: 'j1_a2_parlamento_harrenhal',
        },
      ],
    },

    // ==========================================
    // CENA 2: O PARLAMENTO NOS PORTÕES DE HARRENHAL
    // ==========================================
    j1_a2_parlamento_harrenhal: {
      id: 'j1_a2_parlamento_harrenhal',
      titulo: 'O Parlamento de Fogo & Ferro',
      anoHistorico: '2 a.C.',
      localizacao: 'Portões de Harrenhal',
      regionId: 'tridente',
      fallbackText: `Sob a sombra opressiva da muralha de Harrenhal, dois reis se encontraram sob um estandarte de paz. Harren, o Negro, trajava armadura completa de placas pretas entalhadas com crânios e espadas, o rosto envelhecido e sulcado por incontáveis atrocidades nas Ilhas de Ferro e nas Terras dos Rios. Do outro lado, sobre seu garanhão de batalha, Aegon I portava Blackfyre à cintura e o circuito de aço valiriano na fronte.

"Renda-se agora", intimou Aegon com voz firme e calma, "e você poderá continuar como Lorde das Ilhas de Ferro. Renda-se, e seus filhos viverão para governar depois de você. Tenho oito mil homens fora de suas muralhas e dragões nos céus."

Harren cuspiu no chão pedregoso e riu com desdém selvagem: "O que está do lado de fora não me importa. Minhas muralhas são grossas, de granito e basalto. E pedra não queima!"

Aegon contemplou as torres colossais e proferiu a sentença que ecoaria nos séculos vindouros: "Pedra não queima, mas meus dragões voam. Quando o sol se pôr esta tarde, sua linhagem inteira terá chegado ao fim."`,
      internalVoices: [
        {
          atributo: 'pressagio',
          resultadoPassivo: 'SUCESSO',
          dcPassiva: 7,
          fala: 'A arrogância cega os homens mais ferozes. Ele assinou a certidão de óbito de toda a Casa Hoare.',
        },
        {
          atributo: 'cortesia',
          resultadoPassivo: 'SUCESSO',
          dcPassiva: 8,
          fala: 'A oferta de clemência foi solene e justa. Ninguém em Westeros poderá acusar o Dragão de tirania desprovida de aviso.',
        },
      ],
      loreContext: {
        idVerbete: 'harren_o_negro',
        fonte: {
          arquivo_md: 'fogo-e-sangue_01_a-conquista-de-aegon.md',
          livro: 'Fogo & Sangue - Volume 1',
          capitulo: 'A Conquista de Aegon',
        },
        notaHistorica: 'O diálogo lendário entre Aegon e Harren nos portões do castelo.',
      },
      escolhas: [
        {
          id: 'esc_aguardar_por_do_sol',
          texto: 'Dar as costas com serenidade régia e aguardar o pôr do sol para montar Balerion.',
          tipo: 'simples',
          nextNodeId: 'j1_a2_preparativos_noite_harrenhal',
        },
        {
          id: 'esc_intimidar_harren_comando',
          texto: 'Desembainhar Blackfyre e intimar a guarnição dos homens de ferro a prender o tirano antes do cair da noite.',
          tipo: 'teste_atributo',
          atributo: 'comando',
          dc: 10,
          onSuccessNodeId: 'j1_a2_preparativos_noite_harrenhal',
          onPartialFailureNodeId: 'j1_a2_preparativos_noite_harrenhal',
        },
        {
          id: 'esc_profetizar_fogo_pressagio',
          texto: 'Invocar o fogo de Valíria e o destino dos deuses antigos sobre as muralhas diante de todo o exército.',
          tipo: 'teste_atributo',
          atributo: 'pressagio',
          dc: 9,
          onSuccessNodeId: 'j1_a2_preparativos_noite_harrenhal',
          onPartialFailureNodeId: 'j1_a2_preparativos_noite_harrenhal',
        },
      ],
    },

    // ==========================================
    // CENA 3: PREPARATIVOS DA NOITE EM HARRENHAL
    // ==========================================
    j1_a2_preparativos_noite_harrenhal: {
      id: 'j1_a2_preparativos_noite_harrenhal',
      titulo: 'O Pôr do Sol sobre o Olho de Deus',
      anoHistorico: '2 a.C.',
      localizacao: 'Harrenhal & Olho de Deus',
      regionId: 'tridente',
      fallbackText: `À medida que o sol descia além das colinas ocidentais, o céu sobre o lago tingiu-se de vermelho-sangue e cobre. Dentro da fortaleza, Harren reuniu seus filhos, netos e a guarda de elite dos homens de ferro na Torre da Pira do Rei, distribuindo lanças, flechas com pontas de ferro e tonéis de óleo fervente por todas as seteiras das cinco torres monumentais: a Torre da Viúva, a Torre Uivante, a Torre do Medo e a Torre dos Fantasmas.

Nas linhas sitiantes, Lorde Edmyn Tully e os cavaleiros dos rios olhavam para cima com temor supersticioso. As muralhas eram tão altas que as escadas de cerco pareciam palitos de dente; as pedras eram tão maciças que os aríetes se esmigalhariam sem sequer lascar o portão.

No entanto, quando a última nesga de luz solar se extinguiu no horizonte, Aegon I subiu a sela de couro preto de Balerion. O Terror Negro abriu suas asas de trinta metros e elevou-se no breu da noite, desaparecendo nas nuvens carregadas acima da vista dos arqueiros da fortaleza.`,
      internalVoices: [
        {
          atributo: 'pressagio',
          resultadoPassivo: 'SUCESSO',
          dcPassiva: 7,
          fala: 'O Terror Negro caça no silêncio da escuridão. O mundo aprenderá esta noite o que significa a fúria da antiga Valíria.',
        },
        {
          atributo: 'furia',
          resultadoPassivo: 'SUCESSO',
          dcPassiva: 8,
          fala: 'O fogo negro purificará séculos de opressão no Tridente. Não haverá sobreviventes nas cinco torres.',
        },
      ],
      loreContext: {
        idVerbete: 'balerion',
        fonte: {
          arquivo_md: 'fogo-e-sangue_01_a-conquista-de-aegon.md',
          livro: 'Fogo & Sangue - Volume 1',
          capitulo: 'A Conquista de Aegon',
        },
      },
      escolhas: [
        {
          id: 'esc_mergulho_balerion',
          texto: 'Mergulhar do ápice das nuvens noturnas e desencadear o cataclismo de fogo sobre as cinco torres.',
          tipo: 'simples',
          nextNodeId: 'j1_a2_queima_de_harrenhal',
        },
        {
          id: 'esc_tentativa_furtiva_ultima_hora',
          texto: 'Ordenar que comandos fluviais forcem as portas inferiores enquanto Balerion atrai a atenção nos céus.',
          tipo: 'teste_atributo',
          atributo: 'astucia',
          dc: 10,
          onSuccessNodeId: 'j1_a2_whatif_infiltracao_harrenhal',
          onPartialFailureNodeId: 'j1_a2_queima_de_harrenhal',
        },
      ],
    },

    // ==========================================
    // CENA 4: A QUEIMA DE HARRENHAL
    // ==========================================
    j1_a2_queima_de_harrenhal: {
      id: 'j1_a2_queima_de_harrenhal',
      titulo: 'A Queima de Harrenhal & O Fim dos Hoare',
      anoHistorico: '2 a.C.',
      localizacao: 'Harrenhal',
      regionId: 'tridente',
      fallbackText: `Do meio das nuvens tempestuosas, Balerion despencou como uma montanha viva em chamas. Seu rugido abalou as fundações do lago, e sua bocarra vomitou torrentes de fogo negro com redemoinhos de escarlate sobre as cinco torres colossais.

Pedra de fato não arde, mas o calor sobrenatural do sopro de Balerion derreteu o granito e o basalto como se fossem cera de vela. Grossas lágrimas de pedra liquefeita escorriam pelas paredes das torres; os vigamentos de carvalho e represeiro arrebentaram em labaredas violentas, transformando cada torre em uma chaminé crepitante de morte.

Gritos horríveis ecoaram no pátio quando o Rei Harren Hoare e todos os seus filhos pereceram carbonizados na Torre da Pira do Rei. A Casa Hoare, que por séculos oprimira as Terras dos Rios com punho de ferro e pirataria, foi apagada da face do mundo em uma única noite de cinzas e fogo.`,
      internalVoices: [
        {
          atributo: 'furia',
          resultadoPassivo: 'SUCESSO',
          dcPassiva: 8,
          fala: 'Fogo e Sangue. As cinco torres agora são túmulos retorcidos de pedra queimada. Ninguém mais ousará zombar do dragão.',
        },
        {
          atributo: 'erudicao',
          resultadoPassivo: 'SUCESSO',
          dcPassiva: 9,
          fala: 'O reino dos homens de ferro sobre os rios durou séculos, mas caiu em menos de uma hora sob o sopro de Balerion.',
        },
      ],
      loreContext: {
        idVerbete: 'harrenhal',
        fonte: {
          arquivo_md: 'fogo-e-sangue_01_a-conquista-de-aegon.md',
          livro: 'Fogo & Sangue - Volume 1',
          capitulo: 'A Conquista de Aegon',
        },
        notaHistorica: 'Balerion incendeia Harrenhal, extinguindo a Casa Hoare.',
      },
      escolhas: [
        {
          id: 'esc_consagrar_edmyn_tully',
          texto: 'Pousar Balerion no pátio enegrecido e aclamar Lorde Edmyn Tully Senhor Supremo do Tridente, cedendo Harrenhal a Sor Quenton Qoherys.',
          tipo: 'simples',
          nextNodeId: 'j1_a2_senhor_supremo_tridente',
        },
        {
          id: 'esc_ceder_harrenhal_tully_politica',
          texto: 'Conceder os domínios de Harrenhal diretamente aos Tully de Correrrio para concentrar o poder fluvial em um único aliado leal.',
          tipo: 'teste_atributo',
          atributo: 'cortesia',
          dc: 9,
          onSuccessNodeId: 'j1_a2_senhor_supremo_tridente',
          onPartialFailureNodeId: 'j1_a2_senhor_supremo_tridente',
        },
        {
          id: 'esc_reclamar_harrenhal_coroa_comando',
          texto: 'Proclamar Harrenhal fortaleza de guarnição direta da Coroa Real de Pedra do Dragão.',
          tipo: 'teste_atributo',
          atributo: 'comando',
          dc: 10,
          onSuccessNodeId: 'j1_a2_senhor_supremo_tridente',
          onPartialFailureNodeId: 'j1_a2_senhor_supremo_tridente',
        },
      ],
    },

    // ==========================================
    // CENA 5: WHAT IF - INFILTRAÇÃO EM HARRENHAL
    // ==========================================
    j1_a2_whatif_infiltracao_harrenhal: {
      id: 'j1_a2_whatif_infiltracao_harrenhal',
      titulo: 'A Fenda nas Muralhas & A Captura de Harrenhal',
      anoHistorico: '2 a.C.',
      localizacao: 'Passagens Secretas de Harrenhal',
      regionId: 'tridente',
      fallbackText: `Guiados por pescadores do Olho de Deus e construtores fluviais que conheciam as entranhas do castelo, os batedores de Aegon infiltraram-se pelos canais de escoamento submersos. Na escuridão dos corredores inferiores, as espadas valirianas e as lanças dos rios subjugaram os guardas das Ilhas de Ferro antes que as trombetas de alarme pudessem soar.

Quando as portas da Torre da Pira do Rei foram arrombadas, Harren Hoare foi encurralado sobre sua própria mesa de carvalho. Diante da ameaça iminente das garras de Balerion pousado sobre as ameias, o velho rei foi forçado a render suas coroas e espada, preservando o castelo e evitando a destruição total das cinco torres.

Embora Harren tenha sido despachado acorrentado para a Muralha para vestir o negro na Patrulha da Noite, o castelo de Harrenhal permaneceu intacto como uma cidadela leal ao Dragão nas Terras Fluviais.`,
      internalVoices: [
        {
          atributo: 'astucia',
          resultadoPassivo: 'SUCESSO',
          dcPassiva: 10,
          fala: 'Uma vitória magistral sem desperdício de fogo. A maior fortaleza do continente agora é vossa, intacta.',
        },
        {
          atributo: 'erudicao',
          resultadoPassivo: 'SUCESSO',
          dcPassiva: 9,
          fala: 'A arquitetura monumental de Harrenhal servirá ao império em vez de se tornar um memorial de pedra derretida.',
        },
      ],
      loreContext: {
        fonte: {
          arquivo_md: 'fogo-e-sangue_01_a-conquista-de-aegon.md',
          livro: 'Fogo & Sangue - Volume 1',
          capitulo: 'A Conquista de Aegon',
        },
        notaHistorica: 'Ramificação alternativa: Harren Hoare capturado com vida e enviado à Patrulha da Noite.',
      },
      escolhas: [
        {
          id: 'esc_avancar_pos_infiltracao_canonico',
          texto: 'Nomear a Casa Tully governante dos rios e conceder Harrenhal intacta a Sor Quenton Qoherys.',
          tipo: 'simples',
          nextNodeId: 'j1_a2_senhor_supremo_tridente',
        },
        {
          id: 'esc_guarnecer_harrenhal_intacta',
          texto: 'Instalar uma guarnição mista de cavaleiros valirianos e dos rios para proteger o castelo contra retaliações das Ilhas de Ferro.',
          tipo: 'teste_atributo',
          atributo: 'comando',
          dc: 9,
          onSuccessNodeId: 'j1_a2_senhor_supremo_tridente',
          onPartialFailureNodeId: 'j1_a2_senhor_supremo_tridente',
        },
      ],
    },

    // ==========================================
    // CENA 6: SENHOR SUPREMO DO TRIDENTE
    // ==========================================
    j1_a2_senhor_supremo_tridente: {
      id: 'j1_a2_senhor_supremo_tridente',
      titulo: 'Lorde Edmyn Tully & O Tridente Pacificado',
      anoHistorico: '2 a.C.',
      localizacao: 'Ruínas Fumegantes de Harrenhal',
      regionId: 'tridente',
      fallbackText: `Na manhã seguinte ao cataclismo, a fumaça de Harrenhal subia em colunas negras que podiam ser vistas a cinquenta léguas de distância. Diante de milhares de guerreiros exultantes das Terras dos Rios, Aegon I desembainhou Blackfyre e tocou os ombros curvados de Lorde Edmyn Tully de Correrrio.

"Por vossa bravura e por ter sido o primeiro a se rebelar contra a tirania dos homens de ferro", proclamou o Conquistador, "eu vos nomeio Senhor Supremo do Tridente. Todos os senhores dos rios prestarão vassalagem a vós e a vossa Casa em Correrrio a partir deste dia."

Os lordes Blackwood, Bracken, Frey, Vance e Mallister ajoelharam-se em aclamação unânime. O Tridente estava livre de seus antigos senhores de ferro e selado para sempre sob a égide dos dragões. Enquanto isso, mensageiros exaustos chegavam do sul trazendo notícias alarmantes: a batalha decisiva nas Terras da Tempestade acabara de ter início sob um temporal furioso.`,
      internalVoices: [
        {
          atributo: 'cortesia',
          resultadoPassivo: 'SUCESSO',
          dcPassiva: 8,
          fala: 'Recompensar generosamente o primeiro aliado forja lealdades inquebrantáveis. A Casa Tully jamais esquecerá este benefício.',
        },
      ],
      loreContext: {
        idVerbete: 'tully',
        fonte: {
          arquivo_md: 'fogo-e-sangue_01_a-conquista-de-aegon.md',
          livro: 'Fogo & Sangue - Volume 1',
          capitulo: 'A Conquista de Aegon',
        },
        notaHistorica: 'Edmyn Tully é aclamado primeiro Senhor Supremo do Tridente.',
      },
      escolhas: [
        {
          id: 'esc_ir_para_ultima_tempestade',
          texto: 'Voltar a atenção e os reforços para a frente de batalha de Orys Baratheon nas Terras da Tempestade.',
          tipo: 'simples',
          nextNodeId: 'j1_a2_marcha_ultima_tempestade',
        },
        {
          id: 'esc_enviar_visenya_garra',
          texto: 'Comandar que a Rainha Visenya voe com Vhagar para pacificar a Ponta da Garra Rachada.',
          tipo: 'simples',
          nextNodeId: 'j1_a2_submissao_garra_rachada',
        },
        {
          id: 'esc_vigiar_fronteira_norte',
          texto: 'Comandar Lorde Edmyn Tully a vigiar as margens do Tridente antecipando a descida do exército nortenho.',
          tipo: 'simples',
          nextNodeId: 'j1_a2_checkpoint_norte_tridente',
        },
      ],
    },

    // ==========================================
    // CENA 7: MARCHA PARA A ÚLTIMA TEMPESTADE
    // ==========================================
    j1_a2_marcha_ultima_tempestade: {
      id: 'j1_a2_marcha_ultima_tempestade',
      titulo: 'A Marcha sob a Torrente & O Rugido do Sul',
      anoHistorico: '2 a.C.',
      localizacao: 'Sul do Rio Água Negra',
      regionId: 'tempestade',
      fallbackText: `Enquanto Harrenhal ardia ao norte, o sul mergulhava no caos de uma das piores tempestades do século. Ventos uivantes sopravam da Baía dos Naufrágios com a violência de navalhas, e chuvas torrenciais transformavam as estradas e colinas em pântanos de lama viscosa.

Orys Baratheon liderava as forças Targaryen com sua couraça de aço martelado respingada de barro, enquanto no céu escurecido a Rainha Rhaenys montava Meraxes, cujas asas douradas e prateadas cortavam as rajadas de vendaval. A notícia da morte de Harren chegara a Ponta Tempestade, mas o Rei Argilac Durrandon, o Arrogante, recusara-se a morrer sitiado.

"Eu sou a tempestade!", bradara o velho rei guerreiro, convocando seus cavaleiros blindados e machadeiros para encontrar Orys em campo aberto nas três colinas ao sul de Bronzegate. O palco da Batalha da Última Tempestade estava pronto.`,
      internalVoices: [
        {
          atributo: 'furia',
          resultadoPassivo: 'SUCESSO',
          dcPassiva: 7,
          fala: 'A chuva apaga tochas e cega arqueiros, mas o fogo do dragão queima sob qualquer água.',
        },
        {
          atributo: 'comando',
          resultadoPassivo: 'SUCESSO',
          dcPassiva: 8,
          fala: 'Orys é a mão direita de Aegon. Se ele cair no sul, a Conquista desmorona pelos alicerces.',
        },
      ],
      loreContext: {
        idVerbete: 'argilac_o_arrogante',
        fonte: {
          arquivo_md: 'fogo-e-sangue_01_a-conquista-de-aegon.md',
          livro: 'Fogo & Sangue - Volume 1',
          capitulo: 'A Conquista de Aegon',
        },
        notaHistorica: 'Argilac marcha para enfrentar Orys na Batalha da Última Tempestade.',
      },
      escolhas: [
        {
          id: 'esc_iniciar_ultima_tempestade',
          texto: 'Travar a Batalha da Última Tempestade nas três colinas contra a fúria dos cavaleiros de Argilac.',
          tipo: 'simples',
          nextNodeId: 'j1_a2_batalha_ultima_tempestade',
        },
        {
          id: 'esc_sondar_passos_astucia',
          texto: 'Enviar Meraxes voando rente aos pinheiros para dispersar os batedores de Argilac antes que o vendaval bloqueie a visão.',
          tipo: 'teste_atributo',
          atributo: 'astucia',
          dc: 10,
          onSuccessNodeId: 'j1_a2_batalha_ultima_tempestade',
          onPartialFailureNodeId: 'j1_a2_batalha_ultima_tempestade',
        },
        {
          id: 'esc_ler_pressagio_vento',
          texto: 'Interpretar as correntes de vento da Baía dos Naufrágios para posicionar a vanguarda a favor das rajadas.',
          tipo: 'teste_atributo',
          atributo: 'pressagio',
          dc: 9,
          onSuccessNodeId: 'j1_a2_batalha_ultima_tempestade',
          onPartialFailureNodeId: 'j1_a2_batalha_ultima_tempestade',
        },
      ],
    },

    // ==========================================
    // CENA 8: A BATALHA DA ÚLTIMA TEMPESTADE
    // ==========================================
    j1_a2_batalha_ultima_tempestade: {
      id: 'j1_a2_batalha_ultima_tempestade',
      titulo: 'A Batalha da Última Tempestade',
      anoHistorico: '2 a.C.',
      localizacao: 'Colinas de Bronzegate',
      regionId: 'tempestade',
      fallbackText: `Três vezes os cavaleiros blindados de Argilac subiram a colina enlameada contra as lanças de Orys Baratheon, e três vezes o ímpeto da tempestade pareceu arrastar as linhas reais. A cavalaria da tempestade rasgou o flanco de Orys, e parecia que a ferocidade de Argilac triunfaria contra os invasores.

Foi então que Meraxes desceu. A tempestade impedira a dragão fêmea de voar alto, mas mesmo em terra, rastejando pelas encostas enlameadas, as bocarra de Meraxes expeliu jatos avassaladores de chamas brancas e douradas. A chuva fervia em vapor ofuscante quando tocava as escamas do dragão, incendiando os cavaleiros em suas selas e fazendo os corcéis de guerra entrarem em pânico cego.

Na terceira carga, o próprio cavalo de Argilac foi derrubado pelas chamas, e o velho rei rolou na lama ensanguentada. Cercado pelos corpos de seus homens, ele ergueu sua espada de duas mãos e rugiu um desafio furioso contra o comandante inimigo.`,
      internalVoices: [
        {
          atributo: 'furia',
          resultadoPassivo: 'SUCESSO',
          dcPassiva: 8,
          fala: 'O velho rei luta como um leão ferido. Derrote-o em duelo e as Terras da Tempestade se renderão.',
        },
      ],
      loreContext: {
        idVerbete: 'meraxes',
        fonte: {
          arquivo_md: 'fogo-e-sangue_01_a-conquista-de-aegon.md',
          livro: 'Fogo & Sangue - Volume 1',
          capitulo: 'A Conquista de Aegon',
        },
        notaHistorica: 'Meraxes quebra a carga de Argilac e o rei é derrubado de seu cavalo.',
      },
      escolhas: [
        {
          id: 'esc_duelo_mortal_argilac',
          texto: 'Apear e cruzar espadas pessoalmente contra Argilac Durrandon no duelo mortal na lama.',
          tipo: 'teste_atributo',
          atributo: 'furia',
          dc: 10,
          riscoMortal: true,
          onSuccessNodeId: 'j1_a2_duelo_orys_argilac',
          onPartialFailureNodeId: 'j1_a2_duelo_orys_argilac',
          onCriticalFailureNodeId: 'j1_a2_morte_duelo_argilac',
        },
        {
          id: 'esc_comando_duelo_argilac',
          texto: 'Comandar Orys e a infantaria pesada para cercar e desarmar o rei antes do golpe fatal.',
          tipo: 'teste_atributo',
          atributo: 'comando',
          dc: 11,
          onSuccessNodeId: 'j1_a2_duelo_orys_argilac',
          onPartialFailureNodeId: 'j1_a2_duelo_orys_argilac',
        },
        {
          id: 'esc_cortesia_apelo_argilac',
          texto: 'Exortar Argilac em nome dos deuses a depor a espada para poupar os poucos guerreiros que restam à tempestade.',
          tipo: 'teste_atributo',
          atributo: 'cortesia',
          dc: 12,
          onSuccessNodeId: 'j1_a2_duelo_orys_argilac',
          onPartialFailureNodeId: 'j1_a2_duelo_orys_argilac',
        },
      ],
    },

    // ==========================================
    // CENA 9: O DUELO ENTRE ORYS E ARGILAC
    // ==========================================
    j1_a2_duelo_orys_argilac: {
      id: 'j1_a2_duelo_orys_argilac',
      titulo: 'O Duelo na Lama & A Queda do Último Rei',
      anoHistorico: '2 a.C.',
      localizacao: 'Colinas de Bronzegate',
      regionId: 'tempestade',
      fallbackText: `O duelo entre Orys Baratheon e o Rei Argilac foi o confronto marcial mais feroz da Conquista. Argilac lutava com a força descomunal de cinquenta batalhas passadas, ferindo Orys duas vezes na coxa e no ombro, rachando o escudo do comandante do Dragão.

Mas a juventude e a obstinação de ferro de Orys prevaleceram na lama espessa. Com um golpe de volta rápida, Orys quebrou a guarda do velho monarca e enterrou sua espada no peito de Argilac, o Arrogante. O último dos Reis da Tempestade caiu de costas na terra ensanguentada, morrendo com os olhos voltados para o céu chuvoso.

Com a morte de seu soberano, o exército da tempestade quebrou as fileiras e fugiu em desespero pela mata. Orys honrou o corpo do rei caído, cobrindo-o com seu manto e ordenando sepultamento digno antes de marchar para Ponta Tempestade.`,
      internalVoices: [
        {
          atributo: 'cortesia',
          resultadoPassivo: 'SUCESSO',
          dcPassiva: 7,
          fala: 'Argilac morreu como viveu: com a espada na mão e a coroa na cabeça. A honra foi prestada ao inimigo digno.',
        },
      ],
      loreContext: {
        idVerbete: 'orys_baratheon',
        fonte: {
          arquivo_md: 'fogo-e-sangue_01_a-conquista-de-aegon.md',
          livro: 'Fogo & Sangue - Volume 1',
          capitulo: 'A Conquista de Aegon',
        },
        notaHistorica: 'Orys Baratheon mata Argilac em combate singular.',
      },
      escolhas: [
        {
          id: 'esc_avancar_ponta_tempestade',
          texto: 'Marchar triunfalmente para receber a capitulação do castelo de Ponta Tempestade.',
          tipo: 'simples',
          nextNodeId: 'j1_a2_motim_ponta_tempestade',
        },
        {
          id: 'esc_resgatar_coroa_durrandon_erudicao',
          texto: 'Recolher a coroa antiga de ferro e bronze de Argilac para preservá-la com respeito nos registros da corte.',
          tipo: 'teste_atributo',
          atributo: 'erudicao',
          dc: 8,
          onSuccessNodeId: 'j1_a2_motim_ponta_tempestade',
          onPartialFailureNodeId: 'j1_a2_motim_ponta_tempestade',
        },
      ],
    },

    // ==========================================
    // CENA 10: MORTE CANÔNICA NO DUELO COM ARGILAC
    // ==========================================
    j1_a2_morte_duelo_argilac: {
      id: 'j1_a2_morte_duelo_argilac',
      titulo: 'Fim Trágico nas Colinas da Tempestade',
      anoHistorico: '2 a.C.',
      localizacao: 'Colinas de Bronzegate',
      regionId: 'tempestade',
      isEnding: true,
      fallbackText: `A lama traiçoeira fez o pé escorregar no momento crucial do embate. A lâmina pesada de duas mãos do Rei Argilac desceu com força brutal, partindo o elmo e a têmpora do comandante real antes que os escudeiros pudessem intervir.

Com a queda de sua liderança, as forças do Dragão foram envolvidas no turbilhão da tempestade. Embora Meraxes continuasse a queimar os campos, a perda irreparável encerrou prematuramente a campanha no sul.

A linhagem dos Targaryen provou que mesmo dragões podem tombar quando o ferro e a terra cobram seu preço em sangue.`,
      internalVoices: [
        {
          atributo: 'furia',
          resultadoPassivo: 'FALHA',
          dcPassiva: 12,
          fala: 'O sangue mancha a lama do sul... O último rei cobrou o preço mais amargo.',
        },
      ],
      loreContext: {
        fonte: {
          arquivo_md: 'fogo-e-sangue_01_a-conquista-de-aegon.md',
          livro: 'Fogo & Sangue - Volume 1',
          capitulo: 'A Conquista de Aegon',
        },
        notaHistorica: 'Derrota fatal de Orys no duelo contra Argilac Durrandon.',
      },
      escolhas: [],
    },

    // ==========================================
    // CENA 11: O MOTIM EM PONTA TEMPESTADE
    // ==========================================
    j1_a2_motim_ponta_tempestade: {
      id: 'j1_a2_motim_ponta_tempestade',
      titulo: 'A Traição dos Covardes & A Princesa Acorrentada',
      anoHistorico: '2 a.C.',
      localizacao: 'Ponta Tempestade',
      regionId: 'tempestade',
      fallbackText: `Quando as notícias da derrota e da morte de Argilac alcançaram Ponta Tempestade, a princesa Argella Durrandon trancou os portões imensos e declarou-se Rainha da Tempestade perante a guarnição. Ela prometeu lutar até o último sopro de vida, jurando que nenhum estrangeiro pisaria no castelo de seus ancestrais.

No entanto, a guarnição e os castelões, apavorados pelas lendas do que Balerion fizera às cinco torres de Harrenhal, recusaram-se a queimar vivos nas muralhas. Na calada da noite, os homens de armas se amotinaram contra a princesa.

Ao amanhecer, quando o exército de Orys e Meraxes chegou aos pés das muralhas gigantescas, os portões rangeram abertos. Para a indignação de todos os cavaleiros honrados, a princesa Argella foi empurrada para fora pelos próprios servos, nua e amarrada em correntes de ferro fundido.`,
      internalVoices: [
        {
          atributo: 'cortesia',
          resultadoPassivo: 'SUCESSO',
          dcPassiva: 7,
          fala: 'Que infâmia covarde! Entregar a própria princesa despida ao inimigo para salvar a própria pele podre.',
        },
        {
          atributo: 'comando',
          resultadoPassivo: 'SUCESSO',
          dcPassiva: 8,
          fala: 'Quem trai seu rei uma vez trairá o novo suserano. A guarnição de traidores deve ser punida com rigor.',
        },
      ],
      loreContext: {
        idVerbete: 'argella_durrandon',
        fonte: {
          arquivo_md: 'fogo-e-sangue_01_a-conquista-de-aegon.md',
          livro: 'Fogo & Sangue - Volume 1',
          capitulo: 'A Conquista de Aegon',
        },
        notaHistorica: 'A guarnição de Ponta Tempestade entrega Argella acorrentada.',
      },
      escolhas: [
        {
          id: 'esc_acolher_argella_honra',
          texto: 'Apear, desacorrentar a princesa pessoalmente, cobri-la com o manto de guerra e fundar a Casa Baratheon com honra.',
          tipo: 'simples',
          nextNodeId: 'j1_a2_honra_argella_baratheon',
        },
        {
          id: 'esc_punir_amotinados_comando',
          texto: 'Ordenar a prisão e execução imediata dos chefes do motim diante das muralhas antes de entrar no castelo.',
          tipo: 'teste_atributo',
          atributo: 'comando',
          dc: 10,
          onSuccessNodeId: 'j1_a2_honra_argella_baratheon',
          onPartialFailureNodeId: 'j1_a2_honra_argella_baratheon',
        },
      ],
    },

    // ==========================================
    // CENA 12: A FUNDAÇÃO DA CASA BARATHEON
    // ==========================================
    j1_a2_honra_argella_baratheon: {
      id: 'j1_a2_honra_argella_baratheon',
      titulo: 'Nossa é a Fúria & O Nascimento da Casa Baratheon',
      anoHistorico: '2 a.C.',
      localizacao: 'Salão dos Reis de Ponta Tempestade',
      regionId: 'tempestade',
      fallbackText: `Orys Baratheon apeou de seu cavalo e caminhou até a jovem princesa caída. Com a ponta de sua adaga, rompeu as cordas e correntes que a prendiam; retirou seu próprio manto carmesim de lã forrado de pele e cobriu os ombros de Argella, erguendo-a do chão com reverência régia.

Ele a conduziu para dentro do salão ancestral de Durran Pesar-dos-Deuses, serviu-lhe vinho temperado com suas próprias mãos e falou com doçura e respeito da coragem inigualável de seu pai, o Rei Argilac.

Em reconhecimento à nobreza dos Durrandon, Orys tomou para sua nova Casa os brasões e o lema da dinastia extinta: o veado coroado negro em campo de ouro e as palavras sagradas "Nossa é a Fúria". Ele tomou a princesa Argella como sua noiva e senhora legítima, e Aegon o confirmou como Senhor Supremo de Ponta Tempestade e Protetor do Sul.`,
      internalVoices: [
        {
          atributo: 'cortesia',
          resultadoPassivo: 'SUCESSO',
          dcPassiva: 7,
          fala: 'A fúria da espada conquistou o reino, mas a cortesia e a honra conquistaram o coração da noiva.',
        },
        {
          atributo: 'erudicao',
          resultadoPassivo: 'SUCESSO',
          dcPassiva: 8,
          fala: 'Assim nasce a Casa Baratheon, fundida no sangue dos antigos Reis da Tempestade e no aço de Valíria.',
        },
      ],
      loreContext: {
        idVerbete: 'baratheon',
        fonte: {
          arquivo_md: 'fogo-e-sangue_01_a-conquista-de-aegon.md',
          livro: 'Fogo & Sangue - Volume 1',
          capitulo: 'A Conquista de Aegon',
        },
        notaHistorica: 'Orys casa-se com Argella e adota o brasão e o lema dos Durrandon.',
      },
      escolhas: [
        {
          id: 'esc_avancar_ato2_checkpoint',
          texto: 'Celebrar a submissão do sul e marchar em direção ao oeste para o confronto iminente contra os Dois Reis.',
          tipo: 'simples',
          nextNodeId: 'j1_a2_checkpoint_campo_de_fogo',
        },
        {
          id: 'esc_reforcar_guarnicao_tempestade',
          texto: 'Deixar Orys Baratheon fortalecendo Ponta Tempestade enquanto Aegon e as rainhas convergem para a Campina.',
          tipo: 'teste_atributo',
          atributo: 'comando',
          dc: 9,
          onSuccessNodeId: 'j1_a2_checkpoint_campo_de_fogo',
          onPartialFailureNodeId: 'j1_a2_checkpoint_campo_de_fogo',
        },
      ],
    },

    // ==========================================
    // CENA 13: A PONTA DA GARRA RACHADA
    // ==========================================
    j1_a2_submissao_garra_rachada: {
      id: 'j1_a2_submissao_garra_rachada',
      titulo: 'A Rainha na Névoa & A Ponta da Garra Rachada',
      anoHistorico: '2 a.C.',
      localizacao: 'Ponta da Garra Rachada',
      regionId: 'pedra_dragao',
      fallbackText: `Enquanto o fogo e o ferro abalavam os grandes reinos, a Rainha Visenya montou Vhagar e voou sobre as florestas densas, colinas pedregosas e pântanos nevoentos da Ponta da Garra Rachada. Os pequenos senhores locais — lordes Brune, Boggs, Cave, Pyne e Crabb — sempre haviam repelido todos os invasores com guerrilha nas matas e flechas envenenadas.

Porém, ao avistarem a envergadura formidável de Vhagar descendo entre as copas dos pinheiros e sentirem o calor de seu hálito incandescente queimar uma colina inteira em minutos, os chefes dos clãs perceberam a loucura de qualquer resistência armada.

Em vez de derramar sangue, Visenya desceu sozinha de Vhagar e recebeu os líderes no Castelo de Sussurros. Os lordes dobraram os joelhos e entregaram suas espadas diretamente nas mãos da rainha, pedindo que nunca fossem subordinados a senhores vizinhos de Valdocaso ou Donzela. Visenya concedeu: a Ponta da Garra Rachada responderia apenas e diretamente à Coroa Real.`,
      internalVoices: [
        {
          atributo: 'cortesia',
          resultadoPassivo: 'SUCESSO',
          dcPassiva: 8,
          fala: 'A diplomacia afiada poupou milhares de vidas nos pântanos. A lealdade desses homens será inabalável.',
        },
        {
          atributo: 'comando',
          resultadoPassivo: 'SUCESSO',
          dcPassiva: 9,
          fala: 'Nenhum outro senhor reinará entre o Dragão e os homens da Garra. Um vassalo direto para a segurança da capital.',
        },
      ],
      loreContext: {
        fonte: {
          arquivo_md: 'fogo-e-sangue_01_a-conquista-de-aegon.md',
          livro: 'Fogo & Sangue - Volume 1',
          capitulo: 'A Conquista de Aegon',
        },
        notaHistorica: 'Visenya pacifica a Ponta da Garra Rachada sem derramamento de sangue.',
      },
      escolhas: [
        {
          id: 'esc_concluir_garra_rumo_oeste',
          texto: 'Retornar ao Forte de Aegon e preparar a frota e os dragões para o confronto contra os reis do oeste.',
          tipo: 'simples',
          nextNodeId: 'j1_a2_checkpoint_campo_de_fogo',
        },
        {
          id: 'esc_recrutar_arqueiros_garra_astucia',
          texto: 'Recrutar os melhores batedores dos pântanos da Garra Rachada como patrulheiros de elite do exército real.',
          tipo: 'teste_atributo',
          atributo: 'astucia',
          dc: 9,
          onSuccessNodeId: 'j1_a2_checkpoint_campo_de_fogo',
          onPartialFailureNodeId: 'j1_a2_checkpoint_campo_de_fogo',
        },
      ],
    },

    // ==========================================
    // CENA 14: CHECKPOINT DO ATO 2 (CAMPO DE FOGO)
    // ==========================================
    j1_a2_checkpoint_campo_de_fogo: {
      id: 'j1_a2_checkpoint_campo_de_fogo',
      isEnding: true,
      titulo: 'Conclusão do Ato II & A Reunião dos Dragões',
      anoHistorico: '2 a.C.',
      localizacao: 'Acampamento Real & Terras da Coroa',
      regionId: 'pedra_dragao',
      fallbackText: `O Ato II da grande Conquista chega ao fim com duas das maiores potências de Westeros derrotadas: a Casa Hoare ardeu em cinzas em Harrenhal, e a Casa Durrandon foi sucedida pelo leão negro de Orys Baratheon em Ponta Tempestade.

Porém, as maiores ameaças ainda erguem suas coroas no horizonte. Em Rochedo Casterly e Jardim de Cima, o Rei Loren Lannister e o Rei Mern IX Gardener reuniram o maior exército que Westeros já contemplou em toda a sua história: cinquenta e cinco mil homens marchando juntos para esmagar os invasores.

Aegon convoca suas duas rainhas irmãs, Visenya e Rhaenys. Pela primeira vez desde o início da guerra, os três grandes dragões — Balerion, Vhagar e Meraxes — voarão juntos no mesmo campo de batalha. O Ato III e o terrível Campo de Fogo aguardam.`,
      internalVoices: [
        {
          atributo: 'comando',
          resultadoPassivo: 'SUCESSO',
          dcPassiva: 8,
          fala: 'Dois reis caíram. Agora dois outros marcham com um mar de espadas douradas. É hora de reunir os três dragões.',
        },
      ],
      loreContext: {
        fonte: {
          arquivo_md: 'fogo-e-sangue_01_a-conquista-de-aegon.md',
          livro: 'Fogo & Sangue - Volume 1',
          capitulo: 'A Conquista de Aegon',
        },
        notaHistorica: 'Fim do Ato 2 e preparação para o Campo de Fogo.',
      },
      escolhas: [],
    },

    // ==========================================
    // CENA 15: CHECKPOINT DO ATO 2 (RAMO DO NORTE)
    // ==========================================
    j1_a2_checkpoint_norte_tridente: {
      id: 'j1_a2_checkpoint_norte_tridente',
      isEnding: true,
      titulo: 'Conclusão do Ato II & O Vento do Inverno no Tridente',
      anoHistorico: '2 a.C.',
      localizacao: 'Tridente & Correrrio',
      regionId: 'tridente',
      fallbackText: `Com o Tridente pacificado sob a liderança de Lorde Edmyn Tully e Harrenhal reduzida a um monumento de granito derretido, os corvos trazem notícias perturbadoras dos ermos gelados do Norte.

O Rei Torrhen Stark cruzou o Gargalo com trinta mil guerreiros nortenhos em fúria, marchando dia e noite para expulsar os invasores valirianos do continente.

Os três dragões precisarão decidir se marcham primeiro para o sul dourado ou se encaram a ferocidade milenar dos Reis do Inverno nas margens dos rios.`,
      internalVoices: [
        {
          atributo: 'pressagio',
          resultadoPassivo: 'SUCESSO',
          dcPassiva: 8,
          fala: 'O lobo gigante desceu de sua floresta com lanças de carvalho e espadas de bronze. A neve se tingirá de sangue.',
        },
      ],
      loreContext: {
        fonte: {
          arquivo_md: 'fogo-e-sangue_01_a-conquista-de-aegon.md',
          livro: 'Fogo & Sangue - Volume 1',
          capitulo: 'A Conquista de Aegon',
        },
        notaHistorica: 'Marco de transição para o encontro com o Norte.',
      },
      escolhas: [],
    },
  },
};

export function obterNodeAto2(nodeId: string): NodeJornada | undefined {
  return grafoAto2.nodes[nodeId];
}
