import 'server-only';
import { GrafoJornada } from '@/server/engine/storyLinter';

export const grafoJ4Ato3: GrafoJornada = {
  id: 'jornada_4_muralha_ato3',
  titulo: 'Ato III: A Noite sob a Muralha & O Cerco do Norte',
  startNodeId: 'j4_a3_a_noite_cai',
  nodes: {
    // 1. A Noite Cai e o Ataque dos Thenns
    j4_a3_a_noite_cai: {
      id: 'j4_a3_a_noite_cai',
      titulo: 'Gritos na Escuridão do Sul',
      anoHistorico: '300 d.C.',
      localizacao: 'Castelo Negro',
      regionId: 'castelo_negro',
      fallbackText: `A noite transforma-se em um caldeirão de fogo e sombras. Flechas incendiárias riscam o ar gelado, assobiando sobre os telhados de madeira da armaria e dos estábulos. Cem guerreiros Thenn irrompem pela linha das árvores ao sul aos berros: suas couraças de bronze polido reluzem vermelhas à luz das chamas e seus machados cortam os primeiros piquetes da Patrulha.
      
— Mantenham a linha! — grita a voz rouca de Donal Noye através da fumaça acre. — Ninguém dá um passo para trás ou eles incendeiam as torres com nossos feridos dentro!`,
      internalVoices: [
        {
          atributo: 'comando',
          resultadoPassivo: 'SUCESSO',
          dcPassiva: 9,
          fala: 'A muralha de escudos no meio do pátio é o que impede os Thenns de alcançarem a porta da enfermaria.',
        },
        {
          atributo: 'furia',
          resultadoPassivo: 'SUCESSO',
          dcPassiva: 10,
          fala: 'O bronze deles é pesado, mas o nosso aço de forja corta mais fundo. Firmai os calcanhares na lama congelada!',
        },
      ],
      loreContext: {
        fonte: {
          arquivo_md: 'corpus_md/jornada_3_tronos/livro_3_a-tormenta-de-espadas_resumo-completo.md',
          livro: 'A Tormenta de Espadas',
          capitulo: 'Jon VII',
        },
        notaHistorica: 'Âncora: C12. O ataque noturno dos Thenns liderados por Styr pelo flanco desprotegido do sul.',
      },
      escolhas: [
        {
          id: 'esc_j4_a3_fechar_parede_escudos',
          texto: 'Travar o escudo ombro a ombro com os irmãos no pátio e conter a primeira investida dos Thenns.',
          tipo: 'teste_atributo',
          atributo: 'comando',
          dc: 10,
          onSuccessNodeId: 'j4_a3_combate_no_patio',
          onPartialFailureNodeId: 'j4_a3_combate_no_patio',
          delta: { compostura: 1, honra: 1 },
        },
        {
          id: 'esc_j4_a3_disparar_balestras_telhado',
          texto: 'Subir ao telhado baixo do arsenal com a balestra e alvejar os líderes de machado de bronze.',
          tipo: 'teste_atributo',
          atributo: 'astucia',
          dc: 9,
          onSuccessNodeId: 'j4_a3_combate_no_patio',
          onPartialFailureNodeId: 'j4_a3_combate_no_patio',
          delta: { flagsAdicionadas: ['arqueiro_no_telhado'] },
        },
      ],
    },

    // 2. Combate no Pátio
    j4_a3_combate_no_patio: {
      id: 'j4_a3_combate_no_patio',
      titulo: 'Sangue e Bronze na Lama Congelada',
      anoHistorico: '300 d.C.',
      localizacao: 'O Pátio dos Quartéis',
      regionId: 'castelo_negro',
      fallbackText: `O combate degenera em um massacre feroz e caótico de curta distância. Homens resvalam na lama e no gelo escorregadio; um thenn com tatuagens de runas nas bochechas arremete contra vós com um machado largo de duas mãos, urrando na Língua Antiga.
      
Ao vosso lado, um noviço de dezesseis anos tomba com o crânio fendido pelo bronze. O cheiro de entranhas fumegantes e sangue quente no gelo embrulha o estômago, mas os gritos de incentivo de Jon Snow do alto da barricada mantêm a resistência unida.`,
      internalVoices: [
        {
          atributo: 'furia',
          resultadoPassivo: 'SUCESSO',
          dcPassiva: 9,
          fala: 'A hesitação aqui significa morrer com a garganta aberta. Batei com o pomo da espada no elmo dele!',
        },
      ],
      loreContext: {
        fonte: {
          arquivo_md: 'corpus_md/jornada_3_tronos/livro_3_a-tormenta-de-espadas_resumo-completo.md',
          livro: 'A Tormenta de Espadas',
          capitulo: 'Jon VII',
        },
        notaHistorica: 'Âncora: C12, C13. O combate corpo a corpo no pátio interno contra os guerreiros de Styr.',
      },
      escolhas: [
        {
          id: 'esc_j4_a3_aparar_e_contraatacar',
          texto: 'Aparar o machado de bronze com o bordo reforçado do escudo e trespassar o peito do guerreiro.',
          tipo: 'teste_atributo',
          atributo: 'furia',
          dc: 10,
          onSuccessNodeId: 'j4_a3_a_escada_em_chamas',
          onPartialFailureNodeId: 'j4_a3_a_escada_em_chamas',
          delta: { flagsAdicionadas: ['thenn_derrotado_combate'], sangue: -1 },
        },
        {
          id: 'esc_j4_a3_recuar_para_base_escada',
          texto: 'Manobrar em retirada ordenada atraindo o grupo de invasores em direção à grande escadaria de madeira.',
          tipo: 'simples',
          aprovacaoCompanheiros: { donal_noye: 15 },
          delta: { flagsAdicionadas: ['atraiu_thenns_armadilha'] },
          nextNodeId: 'j4_a3_a_escada_em_chamas',
        },
      ],
    },

    // 3. A Escada em Chamas
    j4_a3_a_escada_em_chamas: {
      id: 'j4_a3_a_escada_em_chamas',
      titulo: 'A Torre de Chamas na Grande Escadaria',
      anoHistorico: '300 d.C.',
      localizacao: 'A Grande Escadaria de Madeira',
      regionId: 'castelo_negro',
      fallbackText: `Styr e dezenas de guerreiros Thenn saltam sobre a base da colossal escadaria em zigue-zague, tentando subir aos lances superiores para dominar os parapeitos da Muralha.
      
— Agora! Acendam o pez! — ruge Donal Noye no topo de um barril.
      
Flechas acesas voam no mesmo segundo. O óleo de baleia, a aguarrás e o breu mineral explodem com um rugido ensurdecedor: uma parede de fogo de cinquenta pés de altura sobe pelas vigas de madeira! O calor abrasador queima os cílios a vinte passos de distância; a escadaria inteira geme como um animal ferido antes de estalar e desabar em uma chuva de carvão e homens em chamas sobre os invasores.`,
      internalVoices: [
        {
          atributo: 'astucia',
          resultadoPassivo: 'SUCESSO',
          dcPassiva: 9,
          fala: 'A armadilha funcionou com precisão mortal. O fogo isolou os sobreviventes e cortou qualquer rota de fuga.',
        },
      ],
      loreContext: {
        fonte: {
          arquivo_md: 'corpus_md/jornada_3_tronos/livro_3_a-tormenta-de-espadas_resumo-completo.md',
          livro: 'A Tormenta de Espadas',
          capitulo: 'Jon VII',
        },
        notaHistorica: 'Âncora: C13. O incêndio deliberado da escadaria de madeira colapsa sobre os Thenns.',
      },
      escolhas: [
        {
          id: 'esc_j4_a3_lancar_barris_oleo_fogo',
          texto: 'Rolar dois barris extras de óleo para alimentar o incêndio e selar a derrota dos Thenns.',
          tipo: 'teste_atributo',
          atributo: 'furia',
          dc: 9,
          onSuccessNodeId: 'j4_a3_o_gelo_cai',
          onPartialFailureNodeId: 'j4_a3_o_gelo_cai',
          delta: { flagsAdicionadas: ['ajudou_incendio_escada'] },
        },
        {
          id: 'esc_j4_a3_proteger_corredores_retirada',
          texto: 'Formar um semicírculo de lanças para impedir que guerreiros em chamas atinjam os estábulos.',
          tipo: 'simples',
          aprovacaoCompanheiros: { donal_noye: 15 },
          delta: { flagsAdicionadas: ['estabulos_salvos_incendio'], compostura: 1 },
          nextNodeId: 'j4_a3_o_gelo_cai',
        },
      ],
    },

    // 4. O Gelo Cai
    j4_a3_o_gelo_cai: {
      id: 'j4_a3_o_gelo_cai',
      titulo: 'A Muralha Se Defende: O Desabamento do Gelo',
      anoHistorico: '300 d.C.',
      localizacao: 'A Base da Muralha',
      regionId: 'castelo_negro',
      fallbackText: `O calor tremendo do incêndio da escadaria atinge a face sul da colossal Muralha de gelo. A montanha translúcida de setecentos pés «chora» rios de água fervilhante antes que um estalo cavernoso, como o trovão de um deus enfurecido, ecoe de leste a oeste.
      
Placas maciças de gelo azul do tamanho de carroças de carga desprendem-se do alto e desabam em queda livre contra o solo! O impacto faz o solo tremer, sepultando o próprio Magnar Styr e seus últimos homens sob toneladas de gelo estilhaçado e vapor ofuscante.`,
      internalVoices: [
        {
          atributo: 'astucia',
          resultadoPassivo: 'SUCESSO',
          dcPassiva: 10,
          fala: 'O gelo cai sem escolher lados! Saltar para trás do batente de pedra da Torre de Hardin ou ser esmagado pela avalanche!',
        },
      ],
      loreContext: {
        fonte: {
          arquivo_md: 'corpus_md/jornada_3_tronos/livro_3_a-tormenta-de-espadas_resumo-completo.md',
          livro: 'A Tormenta de Espadas',
          capitulo: 'Jon VII',
        },
        notaHistorica: 'Âncora: C13, C30. A Muralha chora e desaba placas de gelo esmagando os atacantes Thenns.',
      },
      escolhas: [
        {
          id: 'esc_j4_a3_saltar_abrigo_pedra',
          texto: 'Lançar-se para dentro da arcada de pedra da Torre de Hardin para escapar dos blocos de gelo cadentes.',
          tipo: 'teste_atributo',
          atributo: 'astucia',
          dc: 10,
          riscoMortal: true,
          onSuccessNodeId: 'j4_a3_ygritte_na_torre',
          onPartialFailureNodeId: 'j4_a3_ygritte_na_torre',
          onCriticalFailureNodeId: 'j4_end_morte_queda_da_escada',
          delta: { flagsAdicionadas: ['ea_muralha_se_defende', 'ea_muralha_chora'] },
        },
        {
          id: 'esc_j4_a3_puxar_irmao_ferido_gelo',
          texto: 'Agarrar um noviço atordoado pela capa e arrastá-lo para a segurança antes do desabamento.',
          tipo: 'teste_atributo',
          atributo: 'comando',
          dc: 11,
          riscoMortal: true,
          onSuccessNodeId: 'j4_a3_ygritte_na_torre',
          onPartialFailureNodeId: 'j4_a3_ygritte_na_torre',
          onCriticalFailureNodeId: 'j4_end_morte_queda_da_escada',
          delta: { flagsAdicionadas: ['salvou_irmao_no_gelo'], honra: 1 },
        },
      ],
    },

    // 5. Ygritte na Torre
    j4_a3_ygritte_na_torre: {
      id: 'j4_a3_ygritte_na_torre',
      titulo: 'O Beijo do Fogo e o Último Suspiro',
      anoHistorico: '300 d.C.',
      localizacao: 'Ruínas Próximas à Torre do Senhor Comandante',
      regionId: 'castelo_negro',
      fallbackText: `A calmaria desce sobre o pátio fumegante, quebrada apenas pelo crepitar das brasas e pelos gemidos dos agonizantes. Vós caminhais entre as ruínas carbonizadas e encontrais Jon Snow de joelhos sobre a neve manchada de fuligem.
      
Em seus braços está a garota selvagem de cabelos ruivos cor de fogo: Ygritte. Uma flecha com penas cinzentas está cravada logo abaixo de sua clavícula; o sangue escorre escuro por seus lábios entreabertos. Ela ergue uma mão trêmula, toca a face de Jon e sussurra com um sorriso doloroso e tênue:
— Você não sabe de nada... Jon Snow...
      
Sua cabeça tomba para o lado; a respiração cessa suavemente na noite gelada. Ninguém sabe de quem partiu a flecha que a matou entre as centenas que voaram no escuro.`,
      internalVoices: [
        {
          atributo: 'cortesia',
          resultadoPassivo: 'SUCESSO',
          dcPassiva: 9,
          fala: 'O luto é sagrado, mesmo para uma inimiga. Manter a vigília em silêncio respeitoso enquanto Jon se despede.',
        },
      ],
      loreContext: {
        fonte: {
          arquivo_md: 'corpus_md/jornada_3_tronos/livro_3_a-tormenta-de-espadas_resumo-completo.md',
          livro: 'A Tormenta de Espadas',
          capitulo: 'Jon VII, Jon VIII',
        },
        notaHistorica: 'Âncora: C14. Ygritte morre nos braços de Jon perto da Torre do Senhor Comandante; o autor do disparo da flecha nunca é revelado.',
      },
      escolhas: [
        {
          id: 'esc_j4_a3_guardar_silencio_com_jon',
          texto: 'Pôr a mão no ombro de Jon Snow em sinal de condolência e vigiar o perímetro em respeito ao seu pesar.',
          tipo: 'simples',
          aprovacaoCompanheiros: { jon_snow: 25 },
          delta: { flagsAdicionadas: ['presenciou_morte_ygritte'], compostura: 1 },
          nextNodeId: 'j4_a3_alvorecer_de_cinzas',
        },
        {
          id: 'esc_j4_a3_cobrir_corpo_ygritte_manto',
          texto: 'Oferecer um manto de lã limpo para cobrir o corpo da jovem selvagem com dignidade humana.',
          tipo: 'simples',
          delta: { flagsAdicionadas: ['dignidade_a_ygritte', 'nome_selvagem_ygritte'], honra: 1 },
          nextNodeId: 'j4_a3_alvorecer_de_cinzas',
        },
      ],
    },

    // 6. Alvorecer de Cinzas
    j4_a3_alvorecer_de_cinzas: {
      id: 'j4_a3_alvorecer_de_cinzas',
      titulo: 'A Pira da Alvorada e o Fim dos Thenns',
      anoHistorico: '300 d.C.',
      localizacao: 'Além do Pátio Sul',
      regionId: 'castelo_negro',
      fallbackText: `A aurora rompe em tons de ardósia e sangue diluído. Oitenta guerreiros Thenn e dezoito irmãos juramentados jazem mortos na lama enegrecida pelo óleo.
      
Jon Snow não permite que o corpo de Ygritte seja jogado na vala comum dos inimigos; com a ajuda de vós e de Pyp, ele ergue uma pira de troncos de pinheiro em uma elevação ao sul. Quando a tocha toca a lenha resinosa, as chamas alaranjadas sobem aos céus, devolvendo os cabelos cor de fogo ao vento do norte. Mas não há tempo para descanso: ao norte da Muralha, uma trompa soa longa e estrondosa na Floresta Assombrada!`,
      internalVoices: [
        {
          atributo: 'pressagio',
          resultadoPassivo: 'SUCESSO',
          dcPassiva: 9,
          fala: 'A batalha do sul foi apenas a vanguarda. O verdadeiro exército de Mance Rayder está diante de nós.',
        },
      ],
      loreContext: {
        fonte: {
          arquivo_md: 'corpus_md/jornada_3_tronos/livro_3_a-tormenta-de-espadas_resumo-completo.md',
          livro: 'A Tormenta de Espadas',
          capitulo: 'Jon VIII',
        },
        notaHistorica: 'Âncora: C14, C16. A queima do corpo de Ygritte por Jon e o início do cerco de Mance pelo norte.',
      },
      escolhas: [
        {
          id: 'esc_j4_a3_correr_ao_guincho_muralha',
          texto: 'Entrar na cesta do guincho com Noye e subir imediatamente ao topo para observar a hoste inimiga.',
          tipo: 'simples',
          aprovacaoCompanheiros: { donal_noye: 15 },
          delta: { flagsAdicionadas: ['subiu_topo_observacao'] },
          nextNodeId: 'j4_a3_o_dia_do_portao',
        },
        {
          id: 'esc_j4_a3_reunir_arcos_flechas_mortos',
          texto: 'Recolher flechas intactas e aljavas dos thenns mortos para reforçar o arsenal dos parapeitos.',
          tipo: 'teste_atributo',
          atributo: 'astucia',
          dc: 9,
          onSuccessNodeId: 'j4_a3_o_dia_do_portao',
          onPartialFailureNodeId: 'j4_a3_o_dia_do_portao',
          delta: { flagsAdicionadas: ['municao_recuperada'] },
        },
      ],
    },

    // 7. O Dia do Portão e a Hoste de Mance
    j4_a3_o_dia_do_portao: {
      id: 'j4_a3_o_dia_do_portao',
      titulo: 'Cem Mil Homens sob a Sombra da Floresta',
      anoHistorico: '300 d.C.',
      localizacao: 'O Topo da Muralha',
      regionId: 'topo_da_muralha',
      fallbackText: `Do alto de setecentos pés de gelo, o mundo parece plano e infinito. Mas o que se estende além da linha das árvores da Floresta Assombrada gela a alma de qualquer homem vivo.
      
Cem mil homens, mulheres e guerreiros do Povo Livre acampam na neve: fogueiras fumegam por léguas a fio, trenós puxados por cães gigantescos, guerreiros do Pé Leve, canibais do Rio Gelado e clãs das Cavernas. E marchando na vanguarda, gigantes cobertos de peles montam mamutes cinzentos cujas presas curvas arrastam-se na neve como arados de guerra.`,
      internalVoices: [
        {
          atributo: 'pressagio',
          resultadoPassivo: 'SUCESSO',
          dcPassiva: 10,
          fala: 'Nenhuma força militar em Westeros jamais enfrentou gigantes montados em mamutes. O impacto no portão de ferro será titânico.',
        },
      ],
      loreContext: {
        fonte: {
          arquivo_md: 'corpus_md/jornada_3_tronos/livro_3_a-tormenta-de-espadas_resumo-completo.md',
          livro: 'A Tormenta de Espadas',
          capitulo: 'Jon VIII',
        },
        notaHistorica: 'Âncora: C16. O cerco maciço de Mance Rayder com gigantes e mamutes.',
      },
      escolhas: [
        {
          id: 'esc_j4_a3_posicionar_catapultas_topo',
          texto: 'Ajudar Grenn e Kegs a mirar a catapulta com blocos maciços de gelo na direção dos mamutes.',
          tipo: 'teste_atributo',
          atributo: 'astucia',
          dc: 10,
          onSuccessNodeId: 'j4_a3_mamutes_e_ariete',
          onPartialFailureNodeId: 'j4_a3_mamutes_e_ariete',
          delta: { flagsAdicionadas: ['catapultas_calibradas'] },
        },
        {
          id: 'esc_j4_a3_aquecer_piche_braseiros',
          texto: 'Atiçar os braseiros de turfa para manter os tachos de óleo de piche em ponto de fervura.',
          tipo: 'simples',
          aprovacaoCompanheiros: { grenn: 15 },
          delta: { flagsAdicionadas: ['piche_fervendo_topo'], compostura: 1 },
          nextNodeId: 'j4_a3_mamutes_e_ariete',
        },
      ],
    },

    // 8. Mamutes e o Aríete
    j4_a3_mamutes_e_ariete: {
      id: 'j4_a3_mamutes_e_ariete',
      titulo: 'A Investida dos Mamutes contra o Portão Externo',
      anoHistorico: '300 d.C.',
      localizacao: 'O Topo da Muralha sobre o Portão',
      regionId: 'topo_da_muralha',
      fallbackText: `Dois mamutes colossais avançam em linha reta em direção à soleira da Muralha, puxando correntes pesadas presas a um tronco maciço de carvalho com a ponta cravada em ferro fundido: o aríete de Mance Rayder!
      
Sobre suas corcovas peludas, gigantes urram com vozes que parecem avalanches de pedras. Embaixo, a porta externa de carvalho cravejada de pregos de ferro é a única barreira antes do túnel escuro.
      
— Fogo! Lancem as flechas incendiárias nos olhos dos animais! — berra Jon Snow, disparando flecha após flecha com seu arco recurvo.`,
      internalVoices: [
        {
          atributo: 'astucia',
          resultadoPassivo: 'SUCESSO',
          dcPassiva: 10,
          fala: 'Um mamute com a pelagem em chamas entrará em pânico e esmagará os próprios gigantes que o conduzem.',
        },
      ],
      loreContext: {
        fonte: {
          arquivo_md: 'corpus_md/jornada_3_tronos/livro_3_a-tormenta-de-espadas_resumo-completo.md',
          livro: 'A Tormenta de Espadas',
          capitulo: 'Jon VIII',
        },
        notaHistorica: 'Âncora: C16, C17. O ataque com mamutes e aríete contra o portão externo.',
      },
      escolhas: [
        {
          id: 'esc_j4_a3_despejar_piche_sobre_mamute',
          texto: 'Virar um caldeirão de piche fumegante direto sobre o dorso do mamute líder do aríete.',
          tipo: 'teste_atributo',
          atributo: 'furia',
          dc: 10,
          onSuccessNodeId: 'j4_a3_a_tartaruga',
          onPartialFailureNodeId: 'j4_a3_a_tartaruga',
          delta: { flagsAdicionadas: ['mamute_posto_em_fuga'], compostura: 1 },
        },
        {
          id: 'esc_j4_a3_coordenar_voleio_flechas_fogo',
          texto: 'Coordenar um voleio concentrado de flechas incendiárias com Pyp e Grenn nos condutores.',
          tipo: 'teste_atributo',
          atributo: 'comando',
          dc: 10,
          onSuccessNodeId: 'j4_a3_a_tartaruga',
          onPartialFailureNodeId: 'j4_a3_a_tartaruga',
          delta: { aprovacaoCompanheiros: { pyp: 15, grenn: 15 } },
        },
      ],
    },

    // 9. A Tartaruga
    j4_a3_a_tartaruga: {
      id: 'j4_a3_a_tartaruga',
      titulo: 'A Tartaruga de Couro e Troncos na Soleira',
      anoHistorico: '300 d.C.',
      localizacao: 'O Parapeito Norte da Muralha',
      regionId: 'topo_da_muralha',
      fallbackText: `Apesar do pânico entre os mamutes, os selvagens não recuam. Centenas de homens empurram uma «tartaruga» — um colossal teto móvel de troncos entrelaçados coberto por camadas grossas de couro de alce cru e terra congelada para repelir flechas normais.
      
Sob o abrigo da tartaruga, mineiros e machadeiros trabalham com picaretas e barras de ferro para escavar o gelo ao redor das dobradiças do portão e instalar cunhas incendiárias. Se conseguirem explodir o batente, o portão cederá!`,
      internalVoices: [
        {
          atributo: 'astucia',
          resultadoPassivo: 'SUCESSO',
          dcPassiva: 10,
          fala: 'Flechas ricocheteiam no couro verde da tartaruga. Somente o peso cego da gravidade de setecentos pés pode esmagá-la.',
        },
      ],
      loreContext: {
        fonte: {
          arquivo_md: 'corpus_md/jornada_3_tronos/livro_3_a-tormenta-de-espadas_resumo-completo.md',
          livro: 'A Tormenta de Espadas',
          capitulo: 'Jon VIII, Jon IX',
        },
        notaHistorica: 'Âncora: C17. A estrutura móvel («a tartaruga») usada para proteger os mineiros selvagens.',
      },
      escolhas: [
        {
          id: 'esc_j4_a3_preparar_barril_pedra_britada',
          texto: 'Rolar o grande barril amarrado com correntes e abarrotado de pedra britada até o rebordo de ferro.',
          tipo: 'simples',
          delta: { flagsAdicionadas: ['barril_britada_alinhado'] },
          nextNodeId: 'j4_a3_destruicao_da_tartaruga',
        },
        {
          id: 'esc_j4_a3_cortar_cabos_guincho_pedras',
          texto: 'Cortar os cabos de suporte para soltar um bloco maciço de gelo lapidado sobre a estrutura.',
          tipo: 'teste_atributo',
          atributo: 'astucia',
          dc: 10,
          onSuccessNodeId: 'j4_a3_destruicao_da_tartaruga',
          onPartialFailureNodeId: 'j4_a3_destruicao_da_tartaruga',
          delta: { flagsAdicionadas: ['bloco_gelo_lancado'] },
        },
      ],
    },

    // 10. Destruição da Tartaruga
    j4_a3_destruicao_da_tartaruga: {
      id: 'j4_a3_destruicao_da_tartaruga',
      titulo: 'Setecentos Pés de Queda Livre',
      anoHistorico: '300 d.C.',
      localizacao: 'O Topo da Muralha',
      regionId: 'topo_da_muralha',
      fallbackText: `Vós, Grenn e dois irmãos forçam as alavancas de ferro com todo o vigor dos corpos. O colossal barril abarrotado com meia tonelada de pedregulhos e cascalho rola sobre o parapeito de gelo e despenca em silêncio absoluto através do abismo de setecentos pés.
      
Um segundo... dois segundos... três segundos...
      
CRASH! O impacto é estrondoso como a queda de uma torre inteira. A tartaruga de troncos é esmagada como uma casca de noz; estilhaços de madeira e corpos voam em todas as direções enquanto um barril de piche incandescente é lançado logo em seguida, transformando os destroços em uma fornalha crepitante!`,
      internalVoices: [
        {
          atributo: 'comando',
          resultadoPassivo: 'SUCESSO',
          dcPassiva: 9,
          fala: 'A tartaruga foi destruída! Mas o estrondo atraiu o rei dos gigantes em direção ao túnel!',
        },
      ],
      loreContext: {
        fonte: {
          arquivo_md: 'corpus_md/jornada_3_tronos/livro_3_a-tormenta-de-espadas_resumo-completo.md',
          livro: 'A Tormenta de Espadas',
          capitulo: 'Jon VIII',
        },
        notaHistorica: 'Âncora: C17. Destruição da tartaruga com barris de pedra britada e piche.',
      },
      escolhas: [
        {
          id: 'esc_j4_a3_comemorar_com_grenn',
          texto: 'Gritar de triunfo com Grenn e bater as manoplas contra o parapeito gelado.',
          tipo: 'simples',
          aprovacaoCompanheiros: { grenn: 20 },
          delta: { compostura: 1 },
          nextNodeId: 'j4_a3_o_chamado_do_tunel',
        },
        {
          id: 'esc_j4_a3_olhar_para_o_portao_abaixo',
          texto: 'Olhar tenso para a boca do túnel e verificar o estado dos portões externos de ferro.',
          tipo: 'simples',
          nextNodeId: 'j4_a3_o_chamado_do_tunel',
        },
      ],
    },

    // 11. O Chamado do Túnel
    j4_a3_o_chamado_do_tunel: {
      id: 'j4_a3_o_chamado_do_tunel',
      titulo: 'O Portão Externo Rompido',
      anoHistorico: '300 d.C.',
      localizacao: 'A Plataforma do Guincho',
      regionId: 'topo_da_muralha',
      fallbackText: `O som de madeira grossa de carvalho estilhaçando-se reverbera das entranhas do gelo. Mag Mar Tun Doh Weg — Mag, o Poderoso, o rei ancestral dos gigantes — avançou sozinho sob a fumaça, ergueu o tronco de carvalho com as próprias mãos desnudas e despedaçou o portão externo!
      
Ele entrou no túnel escuro da Muralha.
      
Donal Noye desembainha sua espada longa e aperta a empunhadura com sua única mão de ferro:
— Grenn! Jon! Vossos postos são no alto! Eu vou descer pela cesta para segurar os portões internos de ferro! Preciso de voluntários que não temam a morte! Quem vem comigo para as trevas?`,
      internalVoices: [
        {
          atributo: 'furia',
          resultadoPassivo: 'SUCESSO',
          dcPassiva: 10,
          fala: 'Entrar em um túnel escuro contra um gigante furioso é quase uma sentença de morte. Mas se ele romper a grade interna, Castelo Negro cai por dentro.',
        },
      ],
      loreContext: {
        fonte: {
          arquivo_md: 'corpus_md/jornada_3_tronos/livro_3_a-tormenta-de-espadas_resumo-completo.md',
          livro: 'A Tormenta de Espadas',
          capitulo: 'Jon VIII',
        },
        notaHistorica: 'Âncora: C16. Noye passa o comando do alto da Muralha para Jon/Grenn e desce para defender o túnel contra Mag.',
      },
      escolhas: [
        {
          id: 'esc_j4_a3_descer_com_noye_tunel',
          texto: 'Pular na cesta do guincho ao lado de Donal Noye: «Eu vou convosco, ferreiro!»',
          tipo: 'simples',
          aprovacaoCompanheiros: { donal_noye: 30 },
          delta: { flagsAdicionadas: ['desceu_tunel_com_noye'], honra: 2 },
          nextNodeId: 'j4_a3_noye_e_mag',
        },
        {
          id: 'esc_j4_a3_permanecer_no_topo_cobertura',
          texto: 'Permanecer no topo da Muralha sob as ordens de Jon para despejar lanças e óleo na entrada norte.',
          tipo: 'simples',
          aprovacaoCompanheiros: { jon_snow: 15 },
          delta: { flagsAdicionadas: ['permaneceu_topo_cobertura'] },
          nextNodeId: 'j4_a3_o_corpo_de_noye',
        },
      ],
    },

    // 12. Noye e Mag no Túnel
    j4_a3_noye_e_mag: {
      id: 'j4_a3_noye_e_mag',
      titulo: 'O Confronto no Túnel da Muralha',
      anoHistorico: '300 d.C.',
      localizacao: 'O Túnel Interno através da Muralha',
      regionId: 'portao_e_tunel',
      fallbackText: `O túnel através da Muralha tem trezentos passos de comprimento, esculpido no gelo eterno, escuro como a boca de um túmulo. O ar cheira a podridão congelada e sangue.
      
À frente, a terceira grade de ferro maciço range e verga sob o impacto monstruoso. Das sombras surge Mag, o Poderoso: doze pés de altura, pelagem marrom empapada de sangue, olhos vermelhos brilhando como brasas e um clava de pedra amarrada no punho.
      
Donal Noye não recua um único palmo. Ele finca a bota na pedra e ergue a lâmina:
— Pela Patrulha da Noite! — berra o homem de um braço só, lançando-se contra a montanha de músculos!`,
      internalVoices: [
        {
          atributo: 'comando',
          resultadoPassivo: 'SUCESSO',
          dcPassiva: 11,
          fala: 'Avançar com a lança longa para o olho do gigante enquanto Noye ataca pela garganta!',
        },
      ],
      loreContext: {
        fonte: {
          arquivo_md: 'corpus_md/jornada_3_tronos/livro_3_a-tormenta-de-espadas_resumo-completo.md',
          livro: 'A Tormenta de Espadas',
          capitulo: 'Jon VIII',
        },
        notaHistorica: 'Âncora: C16. O combate fatal entre Donal Noye e Mag, o Poderoso, no túnel da Muralha.',
      },
      escolhas: [
        {
          id: 'esc_j4_a3_cavar_lanca_olho_gigante',
          texto: 'Mergulhar a lança de ponta de ferro no olho de Mag para desviar a clava que esmagaria a cabeça de Noye.',
          tipo: 'teste_atributo',
          atributo: 'comando',
          dc: 11,
          riscoMortal: true,
          onSuccessNodeId: 'j4_a3_o_corpo_de_noye',
          onPartialFailureNodeId: 'j4_a3_o_corpo_de_noye',
          onCriticalFailureNodeId: 'j4_end_morte_esmagado_no_portao',
          delta: { flagsAdicionadas: ['lutou_ao_lado_de_noye'], sangue: -2 },
        },
        {
          id: 'esc_j4_a3_fechar_cancela_ferro_trancas',
          texto: 'Girar a roda de ferro para descer as trancas de segurança e impedir que outros selvagens entrem.',
          tipo: 'teste_atributo',
          atributo: 'astucia',
          dc: 10,
          onSuccessNodeId: 'j4_a3_o_corpo_de_noye',
          onPartialFailureNodeId: 'j4_a3_o_corpo_de_noye',
          delta: { flagsAdicionadas: ['tranca_do_tunel_cerrada'] },
        },
      ],
    },

    // 13. O Corpo de Noye
    j4_a3_o_corpo_de_noye: {
      id: 'j4_a3_o_corpo_de_noye',
      titulo: 'O Aço na Garganta do Gigante',
      anoHistorico: '300 d.C.',
      localizacao: 'O Portão Interno de Ferro',
      regionId: 'portao_e_tunel',
      fallbackText: `Quando as tochas são trazidas para o fundo do túnel enregelado, o silêncio da morte impera.
      
Mag, o Poderoso, jaz tombado de costas sobre a grade de ferro que ele próprio entortou com a força dos ombros. Enterrada até o cabo em sua garganta grossa está a espada longa de Donal Noye. Sob o corpo do gigante está o armeiro de Castelo Negro: sua espinha foi esmagada pelo abraço titânico do monstro, mas sua mão direita ainda segura o punho de ferro com o rigor mortis da coragem suprema.
      
O portão segurou. Castelo Negro resistiu.`,
      internalVoices: [
        {
          atributo: 'pressagio',
          resultadoPassivo: 'SUCESSO',
          dcPassiva: 9,
          fala: '«Robert era o aço verdadeiro; Stannis é o ferro que quebra; Renly era apenas cobre brilhante». As palavras de Noye ecoam agora na pedra fria.',
        },
      ],
      loreContext: {
        fonte: {
          arquivo_md: 'corpus_md/jornada_3_tronos/livro_3_a-tormenta-de-espadas_resumo-completo.md',
          livro: 'A Tormenta de Espadas',
          capitulo: 'Jon VIII, Jon X',
        },
        notaHistorica: 'Âncora: C16, C25, C32. Donal Noye e Mag matam-se mutuamente no túnel; o portão permanece fechado.',
      },
      escolhas: [
        {
          id: 'esc_j4_a3_fechar_olhos_noye',
          texto: 'Ajoelhar-se na poça congelada e fechar os olhos de Donal Noye com reverência militar.',
          tipo: 'simples',
          delta: { flagsAdicionadas: ['ea_aco_ferro_cobre', 'ea_stannis_ferro', 'nome_noye'], honra: 2, compostura: 1 },
          nextNodeId: 'j4_a3_pao_preto_e_caldo',
        },
        {
          id: 'esc_j4_a3_erguer_espada_noye_tributo',
          texto: 'Puxar com esforço a espada de Noye da carcaça do gigante e guardá-la como relíquia da armaria.',
          tipo: 'simples',
          delta: { flagsAdicionadas: ['reliquia_espada_noye', 'nome_noye'] },
          nextNodeId: 'j4_a3_pao_preto_e_caldo',
        },
      ],
    },

    // 14. Pão Preto e Caldo de Cebola
    j4_a3_pao_preto_e_caldo: {
      id: 'j4_a3_pao_preto_e_caldo',
      titulo: 'O Caldo de Cebola e o Pão de Hobb',
      anoHistorico: '300 d.C.',
      localizacao: 'O Refeitório sob o Abrigo da Muralha',
      regionId: 'castelo_negro',
      fallbackText: `No salão esfumaçado onde corvos sonolentos piam nas vigas de pinheiro, Hobb Três-Dedos mexe um caldeirão colossal de ferro com uma concha de carvalho.
      
Os defensores sobreviventes chegam trôpegos, com as mãos roxas de queimaduras de gelo e as barbas empastadas de sangue e fuligem. Hobb serve tigelas fumegantes de caldo de cebola com nabo e pedaços de pão de centeio preto tão duro que precisa ser amolecido no caldo quente:
— Comam, rapazes — diz o cozinheiro, sem suas piadas habituais. — Noye se foi, mas o fogo da cozinha ainda queima. Quem tem caldo quente na barriga não morre de frio.`,
      internalVoices: [
        {
          atributo: 'cortesia',
          resultadoPassivo: 'SUCESSO',
          dcPassiva: 8,
          fala: 'O pão preto e o caldo quente salvam mais homens do desespero do que cem discursos de nobreza.',
        },
      ],
      loreContext: {
        fonte: {
          arquivo_md: 'corpus_md/jornada_3_tronos/livro_3_a-tormenta-de-espadas_resumo-completo.md',
          livro: 'A Tormenta de Espadas',
          capitulo: 'Jon VIII',
        },
        notaHistorica: 'Âncora: C15, C27. Hobb serve pão preto e caldo de cebola aos exaustos defensores.',
      },
      escolhas: [
        {
          id: 'esc_j4_a3_agradecer_hobb_refeicao',
          texto: 'Agradecer a Hobb pela comida e dividir vossa côdea de pão com um jovem noviço que chora de exaustão.',
          tipo: 'simples',
          delta: { flagsAdicionadas: ['ea_creme_de_trigo', 'ea_tres_carnes'], compostura: 2, honra: 1 },
          nextNodeId: 'j4_a3_comando_de_jon',
        },
        {
          id: 'esc_j4_a3_levar_tigela_caldo_vigia',
          texto: 'Encher duas tigelas e levá-las aos sentinelas que continuam de guarda sob o vento cortante.',
          tipo: 'simples',
          delta: { flagsAdicionadas: ['cuidou_dos_vigias'], honra: 1 },
          nextNodeId: 'j4_a3_comando_de_jon',
        },
      ],
    },

    // 15. O Comando de Jon Snow
    j4_a3_comando_de_jon: {
      id: 'j4_a3_comando_de_jon',
      titulo: 'Jon Snow Assume o Comando do Muro',
      anoHistorico: '300 d.C.',
      localizacao: 'O Topo da Muralha ao Crepúsculo',
      regionId: 'topo_da_muralha',
      fallbackText: `Sem Noye, a liderança recai naturalmente sobre os ombros de Jon Snow. Embora ainda claudique da perna ferida, o bastardo de Winterfell sobe ao topo da Muralha com Garra Longa à cinta e distribui os turnos de vigia.
      
— Mance atacará novamente amanhã — declara Jon aos homens reunidos. — Ele tentará escalar com escadas de corda ao leste e mandará mais aríetes. Mas nós somos o escudo que guarda os reinos dos homens. Enquanto um de nós respirar no topo deste gelo, o Norte continuará livre!
      
Ao longe, pela estrada oriental de Vigilância do Mar, estandartes negros e lanças reluzem na neve: reforços estão chegando!`,
      internalVoices: [
        {
          atributo: 'comando',
          resultadoPassivo: 'SUCESSO',
          dcPassiva: 10,
          fala: 'Jon conquistou a lealdade dos irmãos com sangue e exemplo. A chegada de reforços do leste mudará tudo.',
        },
      ],
      loreContext: {
        fonte: {
          arquivo_md: 'corpus_md/jornada_3_tronos/livro_3_a-tormenta-de-espadas_resumo-completo.md',
          livro: 'A Tormenta de Espadas',
          capitulo: 'Jon VIII, Jon IX',
        },
        notaHistorica: 'Âncora: C16, C18. Jon assume a liderança militar da Muralha enquanto reforços de Vigilância do Mar chegam.',
      },
      escolhas: [
        {
          id: 'esc_j4_a3_concluir_ato3_avancar_ato4',
          texto: 'Bater o punho no peito em saudação a Lorde Snow e preparar-se para receber os reforços (Avançar para o Ato IV).',
          tipo: 'simples',
          delta: { marcoConcluido: 'ato3_concluido' },
          nextNodeId: 'j4_a4_thorne_e_slynt_chegam',
        },
      ],
    },
  },
};
