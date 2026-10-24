import 'server-only';
import { GrafoJornada } from '@/server/engine/storyLinter';

/**
 * Jornada 5 — A Rebelião de Robert (282 a 283 d.C.)
 * Ato II: A Batalha dos Sinos (Septo de Pedra)
 * Fontes Canônicas: A Tormenta de Espadas, A Dança dos Dragões, O Mundo de Gelo e Fogo
 */
export const grafoJ5Ato2: GrafoJornada = {
  id: 'jornada_5_rebeliao_ato2',
  titulo: 'Ato II: A Batalha dos Sinos & O Resgate de Septo de Pedra',
  startNodeId: 'j5_a2_o_cercamento_em_septo_de_pedra',
  nodes: {
    // 1. O Cercamento em Septo de Pedra
    j5_a2_o_cercamento_em_septo_de_pedra: {
      id: 'j5_a2_o_cercamento_em_septo_de_pedra',
      titulo: 'A Armadilha de Pedra',
      anoHistorico: '283 d.C.',
      localizacao: 'Septo de Pedra, Terras Fluviais',
      regionId: 'terras_fluviais',
      fallbackText: `A cidade murada de Septo de Pedra está cercada. Lorde Jon Connington, a nova e impetuosa Mão do Rei Aerys, marchou com uma hoste real formidável de lanças douradas e cavaleiros de armadura prateada, trancando todos os portões de ferro.
      
Robert Baratheon, ferido na coxa por uma lança em Vaufreixo e ardendo em febre, foi acolhido clandestinamente pelos plebeus da cidade. Os cidadãos o escondem de casa em casa, trocando-o de sótão em porão para despistar as patrulhas do Grifo.
      
Do lado de fora dos muros, os tambores reais ressoam: Connington oferece montanhas de ouro pela cabeça do 'usurpador de veado'.`,
      internalVoices: [
        {
          atributo: 'astucia',
          resultadoPassivo: 'SUCESSO',
          dcPassiva: 10,
          fala: 'A lealdade do povo comum a Robert é impressionante. Ninguém na cidade abriu a boca pelo ouro dos dragões.',
        },
        {
          atributo: 'erudicao',
          resultadoPassivo: 'SUCESSO',
          dcPassiva: 9,
          fala: 'A ferida de Robert precisa de vinho fervido e emplastros de ervas antes que a infecção o prostre em definitivo.',
        },
      ],
      loreContext: {
        fonte: {
          arquivo_md: 'corpus_md/jornada_3_tronos/livro_3_a-tormenta-de-espadas_resumo-completo.md',
          livro: 'A Tormenta de Espadas',
          capitulo: 'Jaime V, Epílogo',
        },
        notaHistorica: 'Âncora Canônica: Jon Connington cerca Septo de Pedra e busca Robert de casa em casa antes da chegada de Ned Stark.',
      },
      escolhas: [
        {
          id: 'esc_j5_a2_tratar_ferida_robert',
          texto: 'Assumir o cuidado das feridas de Robert nos fundos de um bordel, estancando a febre com panos frios e emplastros.',
          tipo: 'teste_atributo',
          atributo: 'erudicao',
          dc: 9,
          onSuccessNodeId: 'j5_a2_robert_escondido_no_bordel',
          onPartialFailureNodeId: 'j5_a2_robert_escondido_no_bordel',
          delta: {
            flagsAdicionadas: ['tratou_ferida_de_robert'],
            aprovacaoCompanheiros: { robert_baratheon: 10 },
            compostura: 1,
          },
        },
        {
          id: 'esc_j5_a2_organizar_vigilancia_ruas',
          texto: 'Vestir farrapos de plebeu e circular pelas tabernas para monitorar o avanço das buscas de Connington.',
          tipo: 'teste_atributo',
          atributo: 'astucia',
          dc: 10,
          onSuccessNodeId: 'j5_a2_connington_vasculha_as_ruas',
          onPartialFailureNodeId: 'j5_a2_connington_vasculha_as_ruas',
          delta: {
            flagsAdicionadas: ['vigilancia_das_ruas_ativa'],
            honra: 1,
          },
        },
      ],
    },

    // 2. Robert Escondido no Bordel
    j5_a2_robert_escondido_no_bordel: {
      id: 'j5_a2_robert_escondido_no_bordel',
      titulo: 'O Veado nas Sombras do Pêssego',
      anoHistorico: '283 d.C.',
      localizacao: 'Porões de Septo de Pedra',
      regionId: 'terras_fluviais',
      fallbackText: `Entre barris de sidra e lençóis de linho, Robert apoia as costas na parede úmida. O suor escorre pela testa larga, mas ao escutar os cavalos de Connington passando na rua de paralelepípedos acima, seus olhos brilham com fúria vulcânica.
      
— Se aquele grifo arrogante arrombar esta porta — sussurra Robert, apertando os dedos gigantes no cabo do martelo —, ele não encontrará um lorde agonizante. Encontrará o fim de sua linhagem.
      
Do alto da torre do septo, um sino solitário soa uma vez. Depois outro. E de repente, os sinos de todas as capelas começam a repicar furiosamente!`,
      internalVoices: [
        {
          atributo: 'pressagio',
          resultadoPassivo: 'SUCESSO',
          dcPassiva: 10,
          fala: 'O repicar frenético dos sinos não é um aviso de incêndio: é o sinal de ataque aos portões externos!',
        },
      ],
      loreContext: {
        fonte: {
          arquivo_md: 'corpus_md/jornada_3_tronos/livro_3_a-tormenta-de-espadas_resumo-completo.md',
          livro: 'A Tormenta de Espadas',
          capitulo: 'Jaime V',
        },
        notaHistorica: 'Âncora Canônica: Os sinos de Septo de Pedra tocam para alertar sobre o ataque rebelde, dando nome à célebre batalha.',
      },
      escolhas: [
        {
          id: 'esc_j5_a2_ajudar_robert_armadura',
          texto: 'Ajudar Robert a vestir sua cota de placas e erguer o martelo de guerra para a batalha que se aproxima.',
          tipo: 'simples',
          delta: {
            flagsAdicionadas: ['robert_armado_e_furioso'],
            aprovacaoCompanheiros: { robert_baratheon: 10 },
            honra: 1,
          },
          nextNodeId: 'j5_a2_os_sinos_tocam_a_rebeldia',
        },
        {
          id: 'esc_j5_a2_subir_telhado_reconhecimento',
          texto: 'Esgueirar-se até a claraboia do telhado para identificar de onde partem os estrondos nos portões.',
          tipo: 'teste_atributo',
          atributo: 'astucia',
          dc: 9,
          onSuccessNodeId: 'j5_a2_os_sinos_tocam_a_rebeldia',
          onPartialFailureNodeId: 'j5_a2_os_sinos_tocam_a_rebeldia',
          delta: {
            flagsAdicionadas: ['reconhecimento_do_telhado'],
            compostura: 1,
          },
        },
      ],
    },

    // 3. Connington Vasculha as Ruas
    j5_a2_connington_vasculha_as_ruas: {
      id: 'j5_a2_connington_vasculha_as_ruas',
      titulo: 'Os Cascos do Grifo nas Vielas',
      anoHistorico: '283 d.C.',
      localizacao: 'Praça do Mercado de Septo de Pedra',
      regionId: 'terras_fluviais',
      fallbackText: `Jon Connington cavalga um alazão de guerra imponente com armadura escarlate e branca decorada com o grifo duplo da Casa Connington.
      
— Arrombem todas as portas! Vasculhem as fossas, os telhados e as camas! — vocifera a Mão do Rei aos seus soldados. — Quem estiver escondendo o traidor morrerá queimado junto com sua casa!
      
Homens de armas derrubam portas de tavernas e reviram sótãos. Connington não incendeia a cidade por respeito às leis de honra e à memória dos septões — uma hesitação cavalheiresca que selará seu destino quando o vento do norte trouxer o rugido de um lobo.`,
      internalVoices: [
        {
          atributo: 'astucia',
          resultadoPassivo: 'SUCESSO',
          dcPassiva: 10,
          fala: 'Tywin Lannister teria queimado a cidade inteira até as cinzas para matar Robert. Connington é nobre demais para isso.',
        },
      ],
      loreContext: {
        fonte: {
          arquivo_md: 'corpus_md/jornada_3_tronos/livro_5_a-dança-dos-dragões_resumo-completo.md',
          livro: 'A Dança dos Dragões',
          capitulo: 'O Grifo Renascido',
        },
        notaHistorica: 'Âncora Canônica: Jon Connington mais tarde lamentará ter buscado Robert de casa em casa em vez de queimar a cidade como Tywin faria.',
      },
      escolhas: [
        {
          id: 'esc_j5_a2_desviar_patrulhas_becos',
          texto: 'Lançar tochas em carroças vazias no beco oposto para desviar a guarda de Connington do esconderijo de Robert.',
          tipo: 'teste_atributo',
          atributo: 'astucia',
          dc: 10,
          onSuccessNodeId: 'j5_a2_os_sinos_tocam_a_rebeldia',
          onPartialFailureNodeId: 'j5_a2_os_sinos_tocam_a_rebeldia',
          delta: {
            flagsAdicionadas: ['guarda_do_grifo_despistada'],
            compostura: 1,
          },
        },
        {
          id: 'esc_j5_a2_retornar_proteger_robert',
          texto: 'Recuar velozmente pelas passagens secretas para guarnecer a porta onde Robert aguarda a cura.',
          tipo: 'simples',
          delta: { honra: 1 },
          nextNodeId: 'j5_a2_os_sinos_tocam_a_rebeldia',
        },
      ],
    },

    // 4. Os Sinos Tocam a Rebeldia
    j5_a2_os_sinos_tocam_a_rebeldia: {
      id: 'j5_a2_os_sinos_tocam_a_rebeldia',
      titulo: 'O Bronze que Racha o Silêncio',
      anoHistorico: '283 d.C.',
      localizacao: 'As Torres do Grande Septo',
      regionId: 'terras_fluviais',
      fallbackText: `DONG! DONG! DONG!
      
Cinquenta sinos de bronze, prata e ferro soam ao mesmo tempo por toda a cidade, ensurdecendo as ruas em uma cacofonia avassaladora.
      
Pelos portões norte e leste, o arrebentar de madeira pesada ecoa como trovões: os machados dos homens do Norte arrebentam os portões de ferro! Eddard Stark e Hoster Tully chegaram com o exército conjunto de Winterfell, Correrrio e do Vale!
      
Gritos de 'Winterfell!' e 'Correrrio!' tomam as ruelas estreitas enquanto a hoste de Connington é pega de surpresa em meio às vielas medievais.`,
      internalVoices: [
        {
          atributo: 'comando',
          resultadoPassivo: 'SUCESSO',
          dcPassiva: 10,
          fala: 'A cidade tornou-se um labirinto letal para a cavalaria pesada de Connington. A infantaria do Norte tem a vantagem.',
        },
      ],
      loreContext: {
        fonte: {
          arquivo_md: 'corpus_md/jornada_3_tronos/livro_3_a-tormenta-de-espadas_resumo-completo.md',
          livro: 'A Tormenta de Espadas',
          capitulo: 'Jaime V',
        },
        notaHistorica: 'Âncora Canônica: Ned Stark e Hoster Tully atacam os muros de Septo de Pedra, iniciando o confronto generalizado.',
      },
      escolhas: [
        {
          id: 'esc_j5_a2_abrir_caminho_portoes_internos',
          texto: 'Atacar os guardas lealistas na retaguarda dos portões para acelerar a entrada dos cavaleiros de Ned Stark.',
          tipo: 'teste_atributo',
          atributo: 'furia',
          dc: 10,
          onSuccessNodeId: 'j5_a2_ned_e_hoster_arrombam_os_portoes',
          onPartialFailureNodeId: 'j5_a2_ned_e_hoster_arrombam_os_portoes',
          delta: {
            flagsAdicionadas: ['abriu_portoes_para_ned'],
            aprovacaoCompanheiros: { ned_stark: 15 },
            honra: 2,
          },
        },
        {
          id: 'esc_j5_a2_proteger_flanco_robert_saida',
          texto: 'Escoltando Robert Baratheon enquanto o gigante ferido irrompe pelas ruas em direção aos degraus do septo.',
          tipo: 'teste_atributo',
          atributo: 'comando',
          dc: 9,
          onSuccessNodeId: 'j5_a2_o_duelo_nos_degraus_do_septo',
          onPartialFailureNodeId: 'j5_a2_o_duelo_nos_degraus_do_septo',
          delta: {
            flagsAdicionadas: ['escolta_de_robert_nas_ruas'],
            aprovacaoCompanheiros: { robert_baratheon: 12 },
            compostura: 1,
          },
        },
      ],
    },

    // 5. Ned e Hoster Arrombam os Portões
    j5_a2_ned_e_hoster_arrombam_os_portoes: {
      id: 'j5_a2_ned_e_hoster_arrombam_os_portoes',
      titulo: 'Os Lobos nas Ruas de Pedra',
      anoHistorico: '283 d.C.',
      localizacao: 'Portão Norte de Septo de Pedra',
      regionId: 'terras_fluviais',
      fallbackText: `Ned Stark desmonta sob o arco do portão arrombado com sua espada de aço valiriano Gelo reluzindo sob a fumaça das tochas. Ao seu lado, Ser Brynden 'Peixe Negro' lidera os archeiros de Correrrio com flechas de ponta larga.
      
— Onde está Robert?! — grita Ned com urgência através do clamor de espadas e dos sinos que não param de dobrar.
      
Antes que alguém possa responder, uma gargalhada retumbante corta o ar: Robert Baratheon surge no final da rua estreita, empunhando o martelo de guerra com as duas mãos e derrubando três homens de Connington com um único arco devastador!`,
      internalVoices: [
        {
          atributo: 'furia',
          resultadoPassivo: 'SUCESSO',
          dcPassiva: 10,
          fala: 'A união de Robert e Ned em combate é imparável. O moral dos lealistas desmorona diante de nossos olhos.',
        },
      ],
      loreContext: {
        fonte: {
          arquivo_md: 'corpus_md/jornada_3_tronos/livro_1_a-guerra-dos-tronos_resumo-completo.md',
          livro: 'A Guerra dos Tronos',
          capitulo: 'Eddard II',
        },
        notaHistorica: 'Âncora Canônica: Robert sai do esconderijo e luta pessoalmente ao lado de Ned Stark e Hoster Tully.',
      },
      escolhas: [
        {
          id: 'esc_j5_a2_avancar_com_ned_degraus',
          texto: 'Unir-se à cunha de escudos de Ned Stark e marchar em direção ao Grande Septo onde Connington tenta reorganizar suas tropas.',
          tipo: 'simples',
          delta: {
            flagsAdicionadas: ['luta_ombro_a_ombro_com_ned'],
            aprovacaoCompanheiros: { ned_stark: 10, robert_baratheon: 10 },
            honra: 2,
          },
          nextNodeId: 'j5_a2_o_duelo_nos_degraus_do_septo',
        },
        {
          id: 'esc_j5_a2_apoiar_peixe_negro_arcos',
          texto: 'Coordenar as salvas de flechas com Ser Brynden Tully para cortar a retirada dos homens de armas reais.',
          tipo: 'teste_atributo',
          atributo: 'comando',
          dc: 9,
          onSuccessNodeId: 'j5_a2_o_duelo_nos_degraus_do_septo',
          onPartialFailureNodeId: 'j5_a2_o_duelo_nos_degraus_do_septo',
          delta: {
            flagsAdicionadas: ['alianca_com_peixe_negro'],
            aprovacaoCompanheiros: { peixe_negro: 15 },
            compostura: 1,
          },
        },
      ],
    },

    // 6. O Duelo nos Degraus do Septo
    j5_a2_o_duelo_nos_degraus_do_septo: {
      id: 'j5_a2_o_duelo_nos_degraus_do_septo',
      titulo: 'A Fuga do Grifo',
      anoHistorico: '283 d.C.',
      localizacao: 'Os Degraus de Mármore do Grande Septo',
      regionId: 'terras_fluviais',
      fallbackText: `Nos degraus de mármore branco do septo, Jon Connington trava um combate feroz contra Lorde Hoster Tully e corta mortalmente o primo de Jon Arryn, Ser Denys Arryn.
      
Mas quando Robert Baratheon sobe os degraus aos rugidos com o martelo em punho, Connington percebe que a batalha está irremediavelmente perdida. O golpe de Robert quebra o escudo do Grifo e fende sua placa de ombro.
      
Com seus homens em debandada por todas as vielas, Jon Connington recua a cavalo sob salva de flechas e foge rumo ao sul para levar a notícia do desastre ao Rei Louco.
      
A Batalha dos Sinos terminou em triunfo total para a Rebelião! Robert, Ned e Jon Arryn abraçam-se ensanguentados sob o repicar triunfante dos sinos. A marcha para o Tridente é agora uma certeza sagrada!`,
      internalVoices: [
        {
          atributo: 'cortesia',
          resultadoPassivo: 'SUCESSO',
          dcPassiva: 10,
          fala: 'O casamento duplo em Correrrio selará a aliança: Ned casará com Catelyn Tully e Jon Arryn com Lysa Tully.',
        },
      ],
      loreContext: {
        fonte: {
          arquivo_md: 'corpus_md/jornada_3_tronos/livro_3_a-tormenta-de-espadas_resumo-completo.md',
          livro: 'A Tormenta de Espadas',
          capitulo: 'Jaime V, Epílogo',
        },
        notaHistorica: 'Âncora Canônica: Jon Connington é derrotado e destituído do cargo de Mão do Rei por Aerys II, sendo enviado ao exílio.',
      },
      escolhas: [
        {
          id: 'esc_j5_a2_concluir_ato2_marchar_tridente',
          texto: 'Comemorar a vitória e cavalgar com o exército unificado em direção ao Vade dos Rubis no Tridente (Avançar para o Ato III).',
          tipo: 'simples',
          delta: {
            flagsAdicionadas: ['heroi_da_batalha_dos_sinos', 'pacto_de_correrrio_selado'],
            marcoConcluido: 'j5_ato2_concluido',
            honra: 2,
            compostura: 2,
          },
          nextNodeId: 'j5_a3_o_acampamento_no_tridente',
        },
        {
          id: 'esc_j5_a2_honrar_caidos_septo',
          texto: 'Permanecer nas escadarias para recolher os feridos e orar pela alma dos irmãos tombados antes da marcha ao Tridente (Avançar para o Ato III).',
          tipo: 'simples',
          delta: {
            flagsAdicionadas: ['heroi_da_batalha_dos_sinos', 'bencao_dos_septões'],
            marcoConcluido: 'j5_ato2_concluido',
            honra: 3,
          },
          nextNodeId: 'j5_a3_o_acampamento_no_tridente',
        },
      ],
    },
  },
};
