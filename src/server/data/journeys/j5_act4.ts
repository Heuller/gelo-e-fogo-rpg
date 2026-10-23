import 'server-only';
import { GrafoJornada } from '@/server/engine/storyLinter';

/**
 * Jornada 5 — A Rebelião de Robert (282 a 283 d.C.)
 * Ato IV: O Saque de Porto Real & A Torre da Alegria
 * Fontes Canônicas: A Guerra dos Tronos, A Fúria dos Reis, A Tormenta de Espadas, O Mundo de Gelo e Fogo
 */
export const grafoJ5Ato4: GrafoJornada = {
  id: 'jornada_5_rebeliao_ato4',
  titulo: 'Ato IV: O Saque de Porto Real & A Torre da Alegria',
  startNodeId: 'j5_a4_a_marcha_rapida_para_a_capital',
  nodes: {
    // 1. A Marcha Rápida para a Capital
    j5_a4_a_marcha_rapida_para_a_capital: {
      id: 'j5_a4_a_marcha_rapida_para_a_capital',
      titulo: 'A Corrida Pela Coroa',
      anoHistorico: '283 d.C.',
      localizacao: 'A Estrada do Rei, descendo pelo Ramo da Água Negra',
      regionId: 'porto_real',
      fallbackText: `Após a vitória devastadora no Tridente, Robert Baratheon permanece no vau para tratar as graves feridas causadas pela lança e pelo aço de Rhaegar. Ele confia o comando supremo da vanguarda rebelde a Eddard Stark.
      
Montado em seu garanhão do Norte, Ned não concede descanso aos seus cavaleiros. Sob chuvas torrenciais de primavera, a coluna cavalga noite e dia pela Estrada do Rei. O objetivo é alcançar Porto Real antes que os remanescentes do exército lealista consigam reforçar as defesas da capital.
      
No entanto, quando os muros de arenito vermelho da cidade surgem no horizonte enevoado, uma visão estarrecedora gela o sangue dos cavaleiros: doze mil lanças do Ocidente, ostentando o leão dourado de Rochedo Casterly, já acampam diante dos Portões do Rei. Lorde Tywin Lannister chegou primeiro.`,
      internalVoices: [
        {
          atributo: 'comando',
          resultadoPassivo: 'SUCESSO',
          dcPassiva: 10,
          fala: 'Tywin manteve-se neutro durante toda a guerra. Sua chegada súbita sob os muros pode ser tanto salvação quanto ruína.',
        },
        {
          atributo: 'astucia',
          resultadoPassivo: 'SUCESSO',
          dcPassiva: 11,
          fala: 'Os leões não marcharam quinhentas léguas para defender uma causa perdida. O cheiro de carniça atrai os predadores mais vorazes.',
        },
      ],
      loreContext: {
        fonte: {
          arquivo_md: 'corpus_md/jornada_3_tronos/livro_1_a-guerra-dos-tronos_resumo-completo.md',
          livro: 'A Guerra dos Tronos',
          capitulo: 'Eddard II',
        },
        notaHistorica: 'Âncora Canônica: Eddard Stark lidera a vanguarda rebelde para tomar Porto Real, mas encontra o exército de Tywin Lannister às portas da capital.',
      },
      escolhas: [
        {
          id: 'esc_j5_a4_avanco_rapido_portoes',
          texto: 'Avançar a galope com a vanguarda do Norte para interceptar o exército Lannister antes que tomem os portões.',
          tipo: 'simples',
          delta: {
            flagsAdicionadas: ['vanguarda_nortista_pressiona_capital'],
            honra: 1,
          },
          nextNodeId: 'j5_a4_os_leoes_nos_portoes',
        },
        {
          id: 'esc_j5_a4_batedores_colina',
          texto: 'Enviar batedores velozes pelas colinas para avaliar se os Lannister atacam as muralhas ou foram recebidos em paz.',
          tipo: 'simples',
          delta: {
            flagsAdicionadas: ['reconhecimento_porto_real'],
            compostura: 1,
          },
          nextNodeId: 'j5_a4_os_leoes_nos_portoes',
        },
      ],
    },

    // 2. Os Leões nos Portões
    j5_a4_os_leoes_nos_portoes: {
      id: 'j5_a4_os_leoes_nos_portoes',
      titulo: 'A Traição e o Saque de Porto Real',
      anoHistorico: '283 d.C.',
      localizacao: 'Portão do Rei e as Ruas de Porto Real',
      regionId: 'porto_real',
      fallbackText: `A tragédia já foi consumada antes mesmo que a vanguarda de Stark cruze as muralhas externas. Lorde Tywin proclamou sua absoluta fidelidade ao Rei Louco diante das portas fechadas. O Grande Meistre Pycelle persuadiu Aerys II a abrir os portões de ferro, ignorando os apelos desesperados de Lorde Varys.
      
Assim que os portões giraram em seus gonzos, os homens de armas de Rochedo Casterly invadiram as ruas com lâminas nuas e tochas acesas.
      
Agora, fumaça negra sobe de centenas de casas incendiadas. Gritos de desespero ecoam da Praça do Pescador à Colina de Rhaenys. Cavaleiros Lannister arrombam solares, enquanto Sor Gregor Clegane, a Montanha que Cavalga, e Sor Amory Lorch sobem a cavalo em direção à Fortaleza de Maegor. O Saque de Porto Real começou em toda a sua brutalidade desenfreada.`,
      internalVoices: [
        {
          atributo: 'furia',
          resultadoPassivo: 'SUCESSO',
          dcPassiva: 10,
          fala: 'Isto não é vitória militar nem justiça de guerra; é um massacre covarde de civis desarmados.',
        },
        {
          atributo: 'pressagio',
          resultadoPassivo: 'SUCESSO',
          dcPassiva: 12,
          fala: 'O sangue derramado nestas vielas manchará para sempre a nova era que Robert pretendia erguer.',
        },
      ],
      loreContext: {
        fonte: {
          arquivo_md: 'corpus_md/jornada_3_tronos/livro_1_a-guerra-dos-tronos_resumo-completo.md',
          livro: 'A Guerra dos Tronos',
          capitulo: 'Eddard II, Daenerys I, Jaime II',
        },
        notaHistorica: 'Âncora Canônica: Pycelle convence Aerys a abrir as portas; os Lannister saquearam a cidade impiedosamente.',
      },
      escolhas: [
        {
          id: 'esc_j5_a4_abrir_caminho_fortaleza_vermelha',
          texto: 'Comandar os cavaleiros do Norte para abrir caminho através das turbas e marchar direto para a Fortaleza Vermelha.',
          tipo: 'simples',
          delta: {
            flagsAdicionadas: ['corrida_para_fortaleza_vermelha'],
            honra: 1,
            compostura: 1,
          },
          nextNodeId: 'j5_a4_o_regicida_diante_do_trono',
        },
        {
          id: 'esc_j5_a4_conter_massacre_ruas',
          texto: 'Destacar esquadrões para conter cavaleiros saqueadores e proteger septos e cidadãos encurralados antes de subir a colina.',
          tipo: 'simples',
          delta: {
            flagsAdicionadas: ['protetor_dos_indefesos_porto_real'],
            honra: 2,
          },
          nextNodeId: 'j5_a4_o_regicida_diante_do_trono',
        },
      ],
    },

    // 3. O Regicida Diante do Trono
    j5_a4_o_regicida_diante_do_trono: {
      id: 'j5_a4_o_regicida_diante_do_trono',
      titulo: 'O Regicida e o Trono de Ferro',
      anoHistorico: '283 d.C.',
      localizacao: 'A Grande Sala do Trono, Fortaleza Vermelha',
      regionId: 'fortaleza_vermelha',
      fallbackText: `Ned Stark desmonta nos pátios sangrentos da Fortaleza Vermelha e atravessa as imensas portas de carvalho e bronze da Sala do Trono.
      
O ar dentro da abóbada cheira a fumaça de incenso e sangue fresco. Aos pés dos degraus assimétricos de aço fundido, o corpo degolado do Rei Aerys II Targaryen jaz em uma poça carmesim que ainda fumega sobre os ladrilhos frios. Mais adiante, os restos do Piromante Rossart jazem em trapos ensanguentados.
      
No alto do Trono de Ferro, sentado com arrogância indolente e uma perna pendurada sobre o braço farpado de metal, está Sor Jaime Lannister. O jovem cavaleiro da Guarda Real ostenta sua armadura de ouro dourado coberta de respingos escarlates, repousando uma longa espada embebida de sangue sobre os joelhos.
      
Quando os olhos gélidos e severos de Ned Stark encontram o olhar verde e brilhante do rapaz dourado, um silêncio sepulcral domina a sala.
      
— Não temais, Stark — diz Jaime com um sorriso irônico e cansado. — Apenas guardava o assento quente para o vosso amigo Robert.`,
      internalVoices: [
        {
          atributo: 'erudicao',
          resultadoPassivo: 'SUCESSO',
          dcPassiva: 10,
          fala: 'Ele fez o juramento mais sagrado dos Sete Reinos: proteger a vida do rei mesmo ao custo da própria.',
        },
        {
          atributo: 'comando',
          resultadoPassivo: 'SUCESSO',
          dcPassiva: 11,
          fala: 'O Trono de Ferro pertence a quem venceu a guerra no Tridente, não a um membro traidor da guarda pessoal do monarca deposto.',
        },
      ],
      loreContext: {
        fonte: {
          arquivo_md: 'corpus_md/jornada_3_tronos/livro_1_a-guerra-dos-tronos_resumo-completo.md',
          livro: 'A Guerra dos Tronos',
          capitulo: 'Eddard II',
        },
        notaHistorica: 'Âncora Canônica: Jaime mata Aerys e senta no Trono de Ferro; Ned Stark entra na sala do trono e o força a descer.',
      },
      escolhas: [
        {
          id: 'esc_j5_a4_exigir_descida_jaime',
          texto: 'Exigir friamente que Sor Jaime desembarque do Trono de Ferro e se afaste do cadáver do rei em nome da aliança rebelde.',
          tipo: 'simples',
          delta: {
            flagsAdicionadas: ['confrontou_o_regicida_com_honra'],
            honra: 2,
            compostura: 1,
          },
          nextNodeId: 'j5_a4_ned_stark_rompe_com_robert',
        },
        {
          id: 'esc_j5_a4_desafiar_jaime_lannister',
          texto: 'Desembainhar a espada e colocar-se à frente de Ned Stark, intimando o cavaleiro dourado por sua quebra de juramento.',
          tipo: 'teste_atributo',
          atributo: 'comando',
          dc: 12,
          riscoMortal: true,
          onSuccessNodeId: 'j5_a4_ned_stark_rompe_com_robert',
          onPartialFailureNodeId: 'j5_a4_ned_stark_rompe_com_robert',
          onCriticalSuccessNodeId: 'j5_a4_ned_stark_rompe_com_robert',
          onCriticalFailureNodeId: 'j5_end_morte_salao_trono',
        },
      ],
    },

    // 4. Ned Stark Rompe com Robert
    j5_a4_ned_stark_rompe_com_robert: {
      id: 'j5_a4_ned_stark_rompe_com_robert',
      titulo: 'A Fratura dos Irmãos de Armas',
      anoHistorico: '283 d.C.',
      localizacao: 'A Grande Sala do Trono, Fortaleza Vermelha',
      regionId: 'fortaleza_vermelha',
      fallbackText: `Dias depois, Robert Baratheon chega finalmente a Porto Real em sua liteira de campanha, aclamado como o novo soberano dos Sete Reinos. Mas a glória da vitória logo se transforma em um pesadelo moral.
      
Lorde Tywin Lannister entra na Sala do Trono trazendo presentes de fidelidade para o novo monarca: diante do Trono de Ferro são depositados dois pequenos fardos envoltos em mantos carmesim dos soldados Lannister. Quando os mantos são abertos, revelam-se os corpos trucidados da Princesa Elia Martell e de seus dois filhos pequenos, a pequena Princesa Rhaenys e o bebê Príncipe Aegon.
      
Eddard Stark enche-se de repulsa visceral e exige que os assassinos — Sor Gregor Clegane e Sor Amory Lorch — sejam imediatamente executados por crimes monstruosos de guerra. Mas Robert, consumido pelo ódio cego que nutre por todos os descendentes do dragão, recusa-se a punir os leões de Rochedo Casterly, chamando o massacre de "necessidade cruel de guerra".
      
A discussão entre os dois grandes amigos transforma-se em uma tempestade de palavras amargas. Jon Arryn tenta em vão conciliar os ânimos.
      
— Isto não é justiça! Isto é carniçaria! — brada Ned, com o rosto cinzento de dor e desprezo. — Não derrubamos um tirano louco para nos tornarmos monstros piores do que ele!
      
Sem olhar para trás, Lorde Stark reúne seus cavaleiros do Norte e parte a galope para o Sul, determinado a levantar o cerco de Ponta Tempestade e resgatar sua irmã Lyanna por conta própria.`,
      internalVoices: [
        {
          atributo: 'cortesia',
          resultadoPassivo: 'SUCESSO',
          dcPassiva: 10,
          fala: 'A fúria de Robert cega sua nobreza. Essa complacência com o massacre assombrará seu reinado para sempre.',
        },
        {
          atributo: 'comando',
          resultadoPassivo: 'SUCESSO',
          dcPassiva: 11,
          fala: 'Seguir Ned Stark até os confins de Dorne é o único caminho para um homem que preza sua honra acima de favores reais.',
        },
      ],
      loreContext: {
        fonte: {
          arquivo_md: 'corpus_md/jornada_3_tronos/livro_1_a-guerra-dos-tronos_resumo-completo.md',
          livro: 'A Guerra dos Tronos',
          capitulo: 'Eddard II, Daenerys I',
        },
        notaHistorica: 'Âncora Canônica: Ned e Robert rompem violentamente após o massacre dos filhos de Rhaegar; Ned parte sozinho para o Sul.',
      },
      escolhas: [
        {
          id: 'esc_j5_a4_marchar_com_ned_sul',
          texto: 'Acompanhar lealmente Eddard Stark em sua cavalgada solitária para erguer o cerco de Ponta Tempestade e alcançar Dorne.',
          tipo: 'simples',
          delta: {
            flagsAdicionadas: ['leal_a_eddard_stark_no_sul'],
            honra: 2,
            compostura: 1,
          },
          nextNodeId: 'j5_a4_a_cavalgada_para_dorne',
        },
        {
          id: 'esc_j5_a4_tentar_apaziguar_robert',
          texto: 'Expressar vossa profunda desaprovação pelo massacre a Robert antes de montar e galopar atrás da coluna de Ned.',
          tipo: 'simples',
          delta: {
            flagsAdicionadas: ['voz_da_consciencia_de_robert'],
            honra: 1,
            compostura: 1,
          },
          nextNodeId: 'j5_a4_a_cavalgada_para_dorne',
        },
      ],
    },

    // 5. A Cavalgada para Dorne
    j5_a4_a_cavalgada_para_dorne: {
      id: 'j5_a4_a_cavalgada_para_dorne',
      titulo: 'As Montanhas Vermelhas de Dorne',
      anoHistorico: '283 d.C.',
      localizacao: 'Passo do Príncipe, Montanhas Vermelhas de Dorne',
      regionId: 'dorne',
      fallbackText: `A marcha para o Sul alivia o cerco de Ponta Tempestade sem derramar uma única gota de sangue: Lorde Mace Tyrell e Lorde Paxter Redwyne dobram prontamente seus joelhos e baixam os estandartes diante do exército triunfante de Ned Stark. Stannis Baratheon e sua guarnição faminta são salvos.
      
Porém, o alívio dura pouco. Ned não descansa. Guiado por sussurros recolhidos nas marchas lealistas, ele ruma com apenas seis companheiros de confiança em direção ao Passo do Príncipe nas Montanhas Vermelhas de Dorne: Howland Reed, Lorde Willam Dustin, Ethan Glover, Martyn Cassel, Theo Wull e Sor Mark Ryswell.
      
O sol do Sul é implacável. Entre desfiladeiros de arenito avermelhado e cactos secos fustigados pelo vento quente, uma torre redonda e solitária ergue-se contra o céu azul cobalto, guardando a passagem rochosa. É a Torre da Alegria, batizada pelo próprio Rhaegar Targaryen.
      
Aos pés da muralha da torre, três cavaleiros com mantos brancos imaculados e armaduras prateadas aguardam em silêncio.`,
      internalVoices: [
        {
          atributo: 'pressagio',
          resultadoPassivo: 'SUCESSO',
          dcPassiva: 10,
          fala: 'Eles não foram defender a capital nem lutar ao lado de Rhaegar no Tridente. O maior tesouro do príncipe está dentro daquela torre.',
        },
        {
          atributo: 'erudicao',
          resultadoPassivo: 'SUCESSO',
          dcPassiva: 12,
          fala: 'Os três últimos irmãos juramentados da Guarda Real de Aerys: o Touro Branco, Sor Oswell Whent e a lendária Espada da Manhã.',
        },
      ],
      loreContext: {
        fonte: {
          arquivo_md: 'corpus_md/jornada_3_tronos/livro_1_a-guerra-dos-tronos_resumo-completo.md',
          livro: 'A Guerra dos Tronos',
          capitulo: 'Eddard X',
        },
        notaHistorica: 'Âncora Canônica: Ned Stark cavalga com 6 companheiros até a Torre da Alegria nas montanhas de Dorne.',
      },
      escolhas: [
        {
          id: 'esc_j5_a4_cavalgar_ao_lado_de_ned',
          texto: 'Avançar em linha com Eddard Stark e Howland Reed para confrontar os três mantos brancos sob a sombra da torre.',
          tipo: 'simples',
          delta: {
            flagsAdicionadas: ['diante_da_torre_da_alegria'],
            honra: 1,
            compostura: 1,
          },
          nextNodeId: 'j5_a4_os_tres_guardas_na_torre_da_alegria',
        },
        {
          id: 'esc_j5_a4_preparar_armas_e_escudo',
          texto: 'Afrouxar a espada na bainha e ajeitar o escudo com firmeza, sentindo o presságio de uma luta até a morte.',
          tipo: 'simples',
          delta: {
            flagsAdicionadas: ['pronto_para_o_combate_lendario'],
            compostura: 1,
          },
          nextNodeId: 'j5_a4_os_tres_guardas_na_torre_da_alegria',
        },
      ],
    },

    // 6. Os Três Guardas na Torre da Alegria
    j5_a4_os_tres_guardas_na_torre_da_alegria: {
      id: 'j5_a4_os_tres_guardas_na_torre_da_alegria',
      titulo: 'O Duelo Sob a Sombra da Torre',
      anoHistorico: '283 d.C.',
      localizacao: 'Torre da Alegria, Montanhas Vermelhas de Dorne',
      regionId: 'dorne',
      fallbackText: `O vento sopra pelas ravinas eriçadas de espinhos, agitando os mantos brancos dos três guerreiros mais temidos de Westeros.
      
Sor Gerold Hightower, o Touro Branco e Senhor Comandante da Guarda Real, apoia as duas mãos no pomo de sua espada larga. Ao lado dele, Sor Oswell Whent curva-se sobre uma pedra, afiando a lâmina com sua pedra de amolar enquanto seu elmo com asas de morcego descansa na relva. E diante de ambos ergue-se Sor Arthur Dayne, a Espada da Manhã, empunhando Alvorada — a grande lâmina pálida como vidro de leite forjada do coração de uma estrela cadente.
      
— Procurei-vos no Tridente — diz Ned Stark com voz serena e grave.
— Nosso lugar não era lá — responde Sor Arthur Dayne.
— Quando Porto Real caiu, Sor Jaime matou vosso rei com uma espada de ouro, e perguntei-me onde estarias.
— Bem longe — disse Sor Gerold. — Se estivéssemos lá, ai do Regicida.
— Sor Willem Darry fugiu para Pedra do Dragão com a vossa rainha e o Príncipe Viserys. Julguei que tivésseis zarpado com eles.
— Sor Willem é um homem bom e verdadeiro — disse Sor Oswell.
— Mas não pertence à Guarda Real — declarou Sor Gerold. — A Guarda Real não foge.
— Então nem agora — completou Sor Arthur Dayne, puxando Alvorada com as duas mãos. A lâmina pareceu acender-se com a luz do meio-dia. — Agora começa.
— Não — retrucou Ned Stark com tristeza infinita, desembainhando seu aço. — Agora acaba.
      
Sete homens do Norte contra três dos maiores cavaleiros que o reino já viu.`,
      internalVoices: [
        {
          atributo: 'furia',
          resultadoPassivo: 'SUCESSO',
          dcPassiva: 10,
          fala: 'Alvorada brilha como um raio de sol congelado. O menor erro contra Arthur Dayne significará decapitação instantânea.',
        },
        {
          atributo: 'astucia',
          resultadoPassivo: 'SUCESSO',
          dcPassiva: 11,
          fala: 'Howland Reed traz um tridente dos pântanos e redes de caça. O combate de honra tradicional não vencerá esses três sem astúcia.',
        },
      ],
      loreContext: {
        fonte: {
          arquivo_md: 'corpus_md/jornada_3_tronos/livro_1_a-guerra-dos-tronos_resumo-completo.md',
          livro: 'A Guerra dos Tronos',
          capitulo: 'Eddard X',
        },
        notaHistorica: 'Âncora Canônica: O diálogo mais célebre das Crônicas: "Agora começa." / "Não, agora acaba." 7 nortistas contra 3 guardas reais.',
      },
      escolhas: [
        {
          id: 'esc_j5_a4_lutar_com_ned_contra_dayne',
          texto: 'Empunhar vossa arma com ferocidade inabalável e carregar ao lado de Ned Stark e Howland Reed contra a Espada da Manhã.',
          tipo: 'teste_atributo',
          atributo: 'furia',
          dc: 13,
          riscoMortal: true,
          onSuccessNodeId: 'j5_a4_prometa_me_ned_final_epilogo',
          onPartialFailureNodeId: 'j5_a4_prometa_me_ned_final_epilogo',
          onCriticalSuccessNodeId: 'j5_a4_prometa_me_ned_final_epilogo',
          onCriticalFailureNodeId: 'j5_end_morte_sob_a_alvorada',
        },
        {
          id: 'esc_j5_a4_proteger_howland_reed',
          texto: 'Manter a linha e proteger o pequeno lorde crannogman Howland Reed para que suas redes e dardos desequilibrem os cavaleiros.',
          tipo: 'simples',
          delta: {
            flagsAdicionadas: ['escudo_de_howland_reed'],
            compostura: 1,
            honra: 1,
          },
          nextNodeId: 'j5_a4_prometa_me_ned_final_epilogo',
        },
      ],
    },

    // 7. Prometa-me, Ned (Nó Clímax de Desfecho)
    j5_a4_prometa_me_ned_final_epilogo: {
      id: 'j5_a4_prometa_me_ned_final_epilogo',
      titulo: 'Prometa-me, Ned',
      anoHistorico: '283 d.C.',
      localizacao: 'O Topo da Torre da Alegria, Dorne',
      regionId: 'dorne',
      fallbackText: `O clangor do aço cessa abruptamente na encosta pedregosa. Dos dez homens que iniciaram o combate, apenas dois nortistas permanecem de pé entre os mortos: Eddard Stark e Howland Reed. Arthur Dayne, o Touro Branco e Oswell Whent jazem em repouso solene sob o sol vermelho de Dorne.
      
Um lamento débil ecoa do interior da torre.
      
Ned corre subindo os degraus em espiral, arrombando a porta da câmara mais alta. O ar lá dentro cheira intensamente a sangue e a rosas de inverno azuis. Sobre um leito empapado de sangue, Lyanna Stark jaz moribunda, febril e lívida.
      
Ao lado dela, enrolado em panos de linho, está um recém-nascido saudável de olhos escuros e cabelos negros como a noite.
      
Com mãos trêmulas e geladas, Lyanna agarra os dedos do irmão. O medo nos olhos da garota supera até a dor da morte. Se Robert Baratheon souber da existência desta criança gerada por Rhaegar Targaryen, o sangue dos dragões será derramado mais uma vez.
      
— Prometa-me, Ned... — sussurra ela, com a voz falhando em um último suspiro desesperado. — Prometa-me...
      
As lágrimas lavam a poeira e o sangue das faces de Lorde Stark enquanto ele aperta a mão da irmã e sela o pacto mais sagrado e perigoso de sua vida.
      
Mais tarde, as pedras da Torre da Alegria são derrubadas uma a uma para erguer oito túmulos solenes para os bravos guerreiros que ali tombaram. Ned devolve Alvorada ao Solar das Estrelas, entrega o corpo de Lyanna para as criptas de Winterfell e finalmente reconcilia-se com o Rei Robert sobre o túmulo de seu amor em comum. A Rebelião terminou. Um novo reinado tem início.`,
      internalVoices: [
        {
          atributo: 'pressagio',
          resultadoPassivo: 'SUCESSO',
          dcPassiva: 10,
          fala: 'Uma canção de gelo e fogo acaba de nascer neste berço ensanguentado.',
        },
        {
          atributo: 'erudicao',
          resultadoPassivo: 'SUCESSO',
          dcPassiva: 12,
          fala: 'O segredo guardado nesta câmara custará a honra aparente de Lorde Stark, mas salvará uma vida inocente.',
        },
      ],
      loreContext: {
        fonte: {
          arquivo_md: 'corpus_md/jornada_3_tronos/livro_1_a-guerra-dos-tronos_resumo-completo.md',
          livro: 'A Guerra dos Tronos',
          capitulo: 'Eddard I, Eddard X',
        },
        notaHistorica: 'Âncora Canônica: A promessa de Lyanna Stark no leito de morte e o nascimento de Jon Snow como herdeiro de Rhaegar e Lyanna.',
      },
      escolhas: [
        {
          id: 'esc_j5_a4_guardiao_do_segredo',
          texto: 'Jurar segredo absoluto diante de Ned Stark e cavalgar de volta ao Norte como guardião eterno do segredo de Winterfell.',
          tipo: 'simples',
          delta: {
            flagsAdicionadas: ['guardiao_do_segredo_de_sangue'],
            marcoConcluido: 'jornada_5_concluida',
            honra: 3,
            compostura: 2,
          },
          nextNodeId: 'j5_end_o_guardiao_do_segredo',
        },
        {
          id: 'esc_j5_a4_retorno_com_honras_porto_real',
          texto: 'Regressar a Porto Real e aceitar honrarias e postos de comando na nova corte do Rei Robert Baratheon.',
          tipo: 'simples',
          delta: {
            flagsAdicionadas: ['veterano_da_rebeliao_em_porto_real'],
            marcoConcluido: 'jornada_5_concluida',
            honra: 2,
            compostura: 1,
          },
          nextNodeId: 'j5_end_a_paz_do_rei_robert',
        },
        {
          id: 'esc_j5_a4_retorno_ao_lar_ancestral',
          texto: 'Pendurar a espada e retornar às vossas próprias terras ancestrais, levando a sabedoria solene do custo de uma coroa.',
          tipo: 'simples',
          delta: {
            flagsAdicionadas: ['retirada_solene_da_guerra'],
            marcoConcluido: 'jornada_5_concluida',
            honra: 2,
          },
          nextNodeId: 'j5_end_o_retorno_ao_lar',
        },
      ],
    },

    // --- FINAIS NARRATIVOS (isEnding: true) ---

    // Final Canônico 1: O Guardião do Segredo
    j5_end_o_guardiao_do_segredo: {
      id: 'j5_end_o_guardiao_do_segredo',
      titulo: 'Final Vitorioso: O Guardião do Segredo de Gelo e Sangue',
      anoHistorico: '283 d.C.',
      localizacao: 'As Criptas de Winterfell, O Norte',
      regionId: 'winterfell',
      isEnding: true,
      fallbackText: `Vós cavalgastes ao lado de Eddard Stark por milhares de léguas ensolaradas e gélidas, trazendo os restos mortais de Lyanna e o menino nos braços.
      
Enquanto o reino celebra a coroação de Robert Baratheon e seu noivado arranjado com Cersei Lannister, vós compartilhas com o Lorde de Winterfell o fardo solene da promessa. O bebê crescerá sob o nome de Jon Snow, protegido pelo manto cinzento dos lobos do Norte contra a vingança dos homens da coroa.
      
Vossa honra permanece imaculada perante os Deuses Antigos do bosque sagrado. Vós sobrevivestes à Rebelião que derrubou três séculos de reinado de dragões, e guardareis o maior mistério de Westeros até o vosso último suspiro.`,
      loreContext: {
        fonte: {
          arquivo_md: 'corpus_md/jornada_3_tronos/livro_1_a-guerra-dos-tronos_resumo-completo.md',
          livro: 'A Guerra dos Tronos',
          capitulo: 'Eddard II',
        },
        notaHistorica: 'Conclusão Histórica Canônica: O pacto sagrado da Torre da Alegria é preservado em Winterfell.',
      },
      escolhas: [],
    },

    // Final Canônico 2: A Paz do Rei Robert
    j5_end_a_paz_do_rei_robert: {
      id: 'j5_end_a_paz_do_rei_robert',
      titulo: 'Final Vitorioso: A Nova Alvorada de Porto Real',
      anoHistorico: '283 d.C.',
      localizacao: 'A Fortaleza Vermelha, Porto Real',
      regionId: 'porto_real',
      isEnding: true,
      fallbackText: `A coroa com chifres de ouro brilha sobre a cabeça do Rei Robert Baratheon. Ao lado dele, Jon Arryn assume o comando como Mão do Rei, pacificando os Sete Reinos com justiça, ouro e acordos matrimoniais.
      
Pelos vossos feitos audaciosos desde o Ninho da Águia até as margens turbulentas do Tridente, vosso nome é cantado pelos menestréis em banquetes e justas da capital. Vós vos tornais um pilar militar do novo regime em Porto Real, com feudos e influência concedidos pelo Trono de Ferro.
      
A paz finalmente recai sobre Westeros — uma paz dourada e frágil, erguida sobre as cinzas de uma dinastia de dragões.`,
      loreContext: {
        fonte: {
          arquivo_md: 'corpus_md/jornada_3_tronos/livro_1_a-guerra-dos-tronos_resumo-completo.md',
          livro: 'A Guerra dos Tronos',
          capitulo: 'Eddard II',
        },
        notaHistorica: 'Conclusão Política: A ascensão da Casa Baratheon e a pacificação dos Sete Reinos sob Robert I.',
      },
      escolhas: [],
    },

    // Final Canônico 3: O Retorno ao Lar Ancestral
    j5_end_o_retorno_ao_lar: {
      id: 'j5_end_o_retorno_ao_lar',
      titulo: 'Final Vitorioso: A Paz do Guerreiro',
      anoHistorico: '283 d.C.',
      localizacao: 'O Solar Ancestral',
      regionId: 'o_norte',
      isEnding: true,
      fallbackText: `Vós guardastes a vossa espada manchada de batalhas e regressastes aos vossos próprios campos e salões de pedra.
      
As cicatrizes do Tridente, do Septo de Pedra e das montanhas de Dorne continuam a doer quando as chuvas de outono caem sobre os telhados. Porém, vossos lares estão a salvo dos caprichos e dos fogos de um monarca insano.
      
Vosso povo vos saúda como um herói que marchou ao lado de Ned Stark e Robert Baratheon para trazer a justiça de volta ao mundo. Nos longos invernos que virão, vossos netos ouvirão à lareira o relato verídico de como os homens livres quebraram as correntes do dragão.`,
      loreContext: {
        fonte: {
          arquivo_md: 'corpus_md/jornada_3_tronos/livro_1_a-guerra-dos-tronos_resumo-completo.md',
          livro: 'A Guerra dos Tronos',
          capitulo: 'Eddard I',
        },
        notaHistorica: 'Conclusão Reflexiva: O guerreiro veterano regressa às suas terras ancestrais após o término da guerra civil.',
      },
      escolhas: [],
    },

    // Morte M1: Duelo com Arthur Dayne
    j5_end_morte_sob_a_alvorada: {
      id: 'j5_end_morte_sob_a_alvorada',
      titulo: 'Final Trágico: Tombado sob Alvorada',
      anoHistorico: '283 d.C.',
      localizacao: 'A Torre da Alegria, Dorne',
      regionId: 'dorne',
      isEnding: true,
      fallbackText: `A lâmina leitosa de Alvorada moveu-se com a velocidade de um raio estelar. Em um único movimento fluido de graça letal, a Espada da Manhã desferiu um contra-ataque magistral que partiu vosso escudo e trespassou vossa cota de malha.
      
Vós tombastes de joelhos na poeira vermelha de Dorne, ouvindo as palavras finais de respeito de Sor Arthur Dayne ecoando pelo desfiladeiro antes que o mundo mergulhasse na escuridão.
      
Vós caístes enfrentando o cavaleiro mais formidável de toda uma era. Vossas façanhas serão lembradas com honra eterna nos contos dos homens do Norte. Vosso turno terminou.`,
      loreContext: {
        fonte: {
          arquivo_md: 'corpus_md/jornada_3_tronos/livro_1_a-guerra-dos-tronos_resumo-completo.md',
          livro: 'A Guerra dos Tronos',
          capitulo: 'Eddard X',
        },
        notaHistorica: 'Morte Canônica: Um dos oito guerreiros caídos no lendário combate da Torre da Alegria.',
      },
      escolhas: [],
    },

    // Morte M2: Confronto no Salão do Trono
    j5_end_morte_salao_trono: {
      id: 'j5_end_morte_salao_trono',
      titulo: 'Final Trágico: Morte Diante do Trono de Ferro',
      anoHistorico: '283 d.C.',
      localizacao: 'A Grande Sala do Trono, Fortaleza Vermelha',
      regionId: 'fortaleza_vermelha',
      isEnding: true,
      fallbackText: `Vossa fúria impetuosa levou-vos a avançar desprovido de cautela contra Sor Jaime Lannister. Rápido como uma serpente dourada, o jovem cavaleiro da Guarda Real desviou vosso golpe com a lâmina dourada e girou com destreza inumana, cravando o aço sob a junta de vosso gorjal.
      
Vós desabastes sobre os ladrilhos frios da Fortaleza Vermelha, mesclando vosso sangue com o do falecido Rei Louco sob os espigões pontiagudos do Trono de Ferro.
      
Vossa audácia foi vossa ruína nos corredores traiçoeiros do poder da capital. Vosso turno terminou.`,
      loreContext: {
        fonte: {
          arquivo_md: 'corpus_md/jornada_3_tronos/livro_1_a-guerra-dos-tronos_resumo-completo.md',
          livro: 'A Guerra dos Tronos',
          capitulo: 'Eddard II',
        },
        notaHistorica: 'Morte Trágica: Queda em combate perante o Regicida no Salão do Trono durante o Saque de Porto Real.',
      },
      escolhas: [],
    },
  },
};
