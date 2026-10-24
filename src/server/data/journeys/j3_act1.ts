import 'server-only';
import { GrafoJornada, NodeJornada } from '@/server/engine/storyLinter';

export const grafoJ3Ato1: GrafoJornada = {
  id: 'jornada_3_tronos_ato1',
  titulo: 'Ato 1: O Inverno Está Chegando &bull; De Winterfell à Estrada do Rei',
  startNodeId: 'j3_a1_execucao_desertor_lobos',
  nodes: {
    // 1. Execução do Desertor e os Seis Lobos Gigantes
    j3_a1_execucao_desertor_lobos: {
      id: 'j3_a1_execucao_desertor_lobos',
      titulo: 'A Lâmina de Gelo & A Ninhada na Neve',
      anoHistorico: '298 d.C.',
      localizacao: 'Colinas ao redor de Winterfell',
      regionId: 'norte',
      fallbackText: `A manhã estava cinzenta e gélida quando Lorde Eddard Stark conduziu seus filhos para a justiça do Norte. Um desertor da Patrulha da Noite, jurando ter visto os Outros e criaturas mortas com olhos azuis nas florestas além da Muralha, foi ajoelhado sobre o cepo de ferro.
      
Ned desembainhou a ancestral espada de aço valiriano Gelo.
— Quem pronuncia a sentença deve brandir a espada — ensinou Ned ao jovem Bran antes de decepar a cabeça com um único golpe limpo.
      
No regresso através da mata nevada, Robb e Jon Snow encontraram a carcaça de uma loba gigante morta por um chifre de veado na garganta. Ao redor dela, ganindo no frio, estavam cinco filhotes — e um sexto, albino e silencioso, escondido na neve: Fantasma. Havia exatamente um lobo gigante para cada filho e bastardo de Stark.`,
      internalVoices: [
        {
          atributo: 'comando',
          resultadoPassivo: 'SUCESSO',
          dcPassiva: 8,
          fala: 'A justiça austera mantém o respeito dos homens do Norte. O desertor morreu com dignidade.',
        },
        {
          atributo: 'pressagio',
          resultadoPassivo: 'SUCESSO',
          dcPassiva: 10,
          fala: 'Uma loba gigante morta por um chifre de veado... É um aviso sombrio dos deuses antigos sobre a vinda do Rei.',
        },
      ],
      loreContext: {
        fonte: {
          arquivo_md: 'corpus_md/jornada_3_tronos/livro_1_a-guerra-dos-tronos_resumo-completo.md',
          livro: 'A Guerra dos Tronos',
          capitulo: 'Bran I',
        },
        notaHistorica: 'O início da saga com a execução de Gared e os lobos gigantes.',
      },
      escolhas: [
        {
          id: 'esc_j3_a1_acolher_lobos_pressagio',
          texto: 'Interceder junto a Ned para que cada criança Stark crie seu próprio lobo gigante.',
          tipo: 'simples',
          nextNodeId: 'j3_a1_chegada_comitiva_real_robert',
        },
        {
          id: 'esc_j3_a1_interrogar_relato_desertor',
          texto: 'Investigar os delírios do desertor sobre os Caminhantes Brancos antes que a comitiva real chegue.',
          tipo: 'teste_atributo',
          atributo: 'erudicao',
          dc: 10,
          onSuccessNodeId: 'j3_a1_pressagio_frio_muralha',
          onPartialFailureNodeId: 'j3_a1_chegada_comitiva_real_robert',
        },

        {
          id: 'esc_execucao_ouvir_palavras',
          texto: 'Ouvir com gravidade o relato trêmulo do patrulheiro sobre as sombras de olhos azuis na floresta assombrada.',
          tipo: 'simples',
          aprovacaoCompanheiros: { jon_snow: 25, catelyn: 10 },
          delta: { compostura: 1 },
          nextNodeId: 'j3_a1_pressagio_frio_muralha',
        },
        {
          id: 'esc_execucao_oracao_antiga',
          texto: 'Tocar a casca cinzenta do represeiro ao limpar a lâmina de Gelo, pedindo aos deuses que afastem o frio.',
          tipo: 'simples',
          tagOrigem: '[HONRA DO NORTE]',
          aprovacaoCompanheiros: { catelyn: 20, jon_snow: 20 },
          delta: { inspiracao: 1, compostura: 2 },
          nextNodeId: 'j3_a1_pressagio_frio_muralha',
        }
      ],
    },

    // 2. Presságio do Frio
    j3_a1_pressagio_frio_muralha: {
      id: 'j3_a1_pressagio_frio_muralha',
      titulo: 'Os Murmúrios do Bosque Sagrado',
      anoHistorico: '298 d.C.',
      localizacao: 'Bosque Sagrado de Winterfell',
      regionId: 'norte',
      fallbackText: `Nas sombras do represeiro milenar de folhas carmesins e rosto entalhado que chorava seiva vermelha, Ned Stark limpou o sangue da lâmina de Gelo nas águas escuras da lagoa termal. Catelyn aproximou-se trazendo uma carta com o selo azul de Arryn: Jon Arryn, a Mão do Rei e segundo pai de Ned, morrera subitamente em Porto Real — e Lysa Arryn afirmava que ele fora envenenado pelos Lannister.`,
      internalVoices: [
        {
          atributo: 'astucia',
          resultadoPassivo: 'SUCESSO',
          dcPassiva: 10,
          fala: 'O veneno é a arma dos covardes e das cortes do sul. O leão dourado já começou seu cerco.',
        },
      ],
      loreContext: {
        fonte: {
          arquivo_md: 'corpus_md/jornada_3_tronos/livro_1_a-guerra-dos-tronos_resumo-completo.md',
          livro: 'A Guerra dos Tronos',
          capitulo: 'Catelyn II',
        },
        notaHistorica: 'A revelação do veneno de Jon Arryn por Lysa.',
      },
      escolhas: [
        {
          id: 'esc_j3_a1_aguardar_comitiva_winterfell',
          texto: 'Receber a enorme comitiva do Rei Robert nos portões principais de Winterfell.',
          tipo: 'simples',
          nextNodeId: 'j3_a1_chegada_comitiva_real_robert',
        },

        {
          id: 'esc_pressagio_prece_bosque',
          texto: 'Ajoelhar-se diante do represeiro antigo e pedir proteção aos deuses pelos filhos de Winterfell.',
          tipo: 'simples',
          aprovacaoCompanheiros: { catelyn: 20, jon_snow: 15 },
          delta: { compostura: 2 },
          nextNodeId: 'j3_a1_banquete_e_conversa_tyrion',
        },
        {
          id: 'esc_pressagio_vigilia_muralha',
          texto: 'Conversar com Jon Snow sobre os deveres da Patrulha da Noite e a honra de empunhar o aço no gelo.',
          tipo: 'simples',
          aprovacaoCompanheiros: { jon_snow: 25, catelyn: -10 },
          delta: { compostura: 1 },
          nextNodeId: 'j3_a1_banquete_e_conversa_tyrion',
        }
      ],
    },

    // 3. Chegada da Comitiva Real
    j3_a1_chegada_comitiva_real_robert: {
      id: 'j3_a1_chegada_comitiva_real_robert',
      titulo: 'O Cervo Coroado nas Muralhas de Granito',
      anoHistorico: '298 d.C.',
      localizacao: 'Pátio de Winterfell',
      regionId: 'norte',
      fallbackText: `Trombetas ecoaram quando trezentos cavaleiros cruzaram a ponte levadiça de Winterfell. O Rei Robert Baratheon apeou de seu imenso garanhão, pesado e barbudo, abraçando Ned com um estrondo de gargalhadas.
      
Ao seu lado desceram a Rainha Cersei em sedas e peles douradas, Ser Jaime Lannister resplandecente como o sol em sua armadura dourada da Guarda Real, e o anão Tyrion Lannister. Antes mesmo de lavar a poeira da viagem, Robert arrastou Ned até as criptas subterrâneas para chorar sobre a estátua de pedra de Lyanna Stark. Ali, no silêncio dos túmulos dos Reis do Inverno, Robert pediu a mão de Sansa para o Príncipe Joffrey e nomeou Ned como a nova Mão do Rei.`,
      internalVoices: [
        {
          atributo: 'cortesia',
          resultadoPassivo: 'SUCESSO',
          dcPassiva: 9,
          fala: 'Recusar o rei diante de toda a corte seria uma ofensa imperdoável. Mas aceitar significa mergulhar num ninho de víboras.',
        },
      ],
      loreContext: {
        fonte: {
          arquivo_md: 'corpus_md/jornada_3_tronos/livro_1_a-guerra-dos-tronos_resumo-completo.md',
          livro: 'A Guerra dos Tronos',
          capitulo: 'Eddard I',
        },
        notaHistorica: 'Robert nas criptas de Winterfell nomeando Ned Mão do Rei.',
      },
      escolhas: [
        {
          id: 'esc_j3_a1_aceitar_mao_dever',
          texto: 'Aceitar o encargo de Mão do Rei para proteger Robert e descobrir a verdade sobre Jon Arryn.',
          tipo: 'simples',
          nextNodeId: 'j3_a1_banquete_e_conversa_tyrion',
        },
        {
          id: 'esc_j3_a1_alertar_robert_sobre_lannister',
          texto: 'Sondar Robert cautelosamente sobre o poder desmedido dos parentes da Rainha Cersei.',
          tipo: 'teste_atributo',
          atributo: 'cortesia',
          dc: 11,
          onSuccessNodeId: 'j3_a1_banquete_e_conversa_tyrion',
          onPartialFailureNodeId: 'j3_a1_banquete_e_conversa_tyrion',
        },

        {
          id: 'esc_comitiva_homenagem_criptas',
          texto: 'Conduzir Robert pessoalmente às criptas profundas para depositar uma rosa de inverno no túmulo de Lyanna.',
          tipo: 'simples',
          aprovacaoCompanheiros: { catelyn: 20, jon_snow: 15 },
          delta: { compostura: 2 },
          nextNodeId: 'j3_a1_banquete_e_conversa_tyrion',
        },
        {
          id: 'esc_comitiva_vigilia_nobre',
          texto: 'Designar os guerreiros Umber e Cassel para a guarda de honra dos portões de granito.',
          tipo: 'simples',
          aprovacaoCompanheiros: { grande_jon: 25, catelyn: 15 },
          delta: { compostura: 1 },
          nextNodeId: 'j3_a1_banquete_e_conversa_tyrion',
        }
      ],
    },

    // 4. O Banquete e a Conversa com Tyrion
    j3_a1_banquete_e_conversa_tyrion: {
      id: 'j3_a1_banquete_e_conversa_tyrion',
      titulo: 'O Banquete de Boas-Vindas & O Conselho do Duende',
      anoHistorico: '298 d.C.',
      localizacao: 'Grande Salão de Winterfell',
      regionId: 'norte',
      fallbackText: `Enquanto os javalis assados eram servidos e o vinho fluía, Jon Snow observava a corte do lado de fora, no pátio gélido. Ali encontrou Tyrion Lannister.
— Todos os anões são bastardos aos olhos dos pais — disse Tyrion, sorrindo com um cálice de vinho na mão. — Deixa que eu te dê um conselho, bastardo: nunca te esqueças do que és. O resto do mundo não esquecerá. Veste isso como uma armadura, e nunca poderá ser usado para te ferir.
      
No dia seguinte, o rei partiu para uma caçada nos bosques. Bran Stark, escalando os muros antigos, alcançou a janela da torre abandonada.`,
      internalVoices: [
        {
          atributo: 'astucia',
          resultadoPassivo: 'SUCESSO',
          dcPassiva: 10,
          fala: 'O Duende vê o mundo com uma clareza cortante. Ele sabe mais sobre as fraquezas dos homens do que todos os lordes.',
        },
      ],
      loreContext: {
        fonte: {
          arquivo_md: 'corpus_md/jornada_3_tronos/livro_1_a-guerra-dos-tronos_resumo-completo.md',
          livro: 'A Guerra dos Tronos',
          capitulo: 'Jon I',
        },
        notaHistorica: 'O diálogo célebre de Tyrion e Jon Snow no pátio.',
      },
      escolhas: [
        {
          id: 'esc_j3_a1_escalar_torre_quebrada_bran',
          texto: 'Acompanhar a escalada de Bran até o quarto alto da torre quebrada.',
          tipo: 'simples',
          nextNodeId: 'j3_a1_queda_de_bran_torre',
        },

        {
          id: 'esc_banquete_dialogo_robert',
          texto: 'Beber com o Rei Robert e recordar os dias de juventude no Ninho da Águia com Jon Arryn.',
          tipo: 'simples',
          aprovacaoCompanheiros: { catelyn: 15, grande_jon: 15 },
          delta: { compostura: 2 },
          nextNodeId: 'j3_a1_queda_de_bran_torre',
        },
        {
          id: 'esc_banquete_observar_lannister',
          texto: 'Manter olhar atento sobre a Rainha Cersei e Ser Jaime durante todo o serviço de jantar.',
          tipo: 'simples',
          aprovacaoCompanheiros: { catelyn: 20, peixe_negro: 15 },
          delta: { flagsAdicionadas: ['lannister_observados_banquete'] },
          nextNodeId: 'j3_a1_queda_de_bran_torre',
        }
      ],
    },

    // 5. A Queda de Bran
    j3_a1_queda_de_bran_torre: {
      id: 'j3_a1_queda_de_bran_torre',
      titulo: 'O Segredo Incestuoso & O Empurrão no Abismo',
      anoHistorico: '298 d.C.',
      localizacao: 'Torre Quebrada de Winterfell',
      regionId: 'norte',
      fallbackText: `Espiando pela fresta estreita da janela alta, os olhos de sete anos de Bran contemplaram o horror indizível: a Rainha Cersei e Ser Jaime Lannister nus em abraço carnal sobre o piso empoeirado da torre.
      
Um gemido escapou de seus lábios. Jaime virou-se com agilidade felina, agarrou o menino pelo pulso e suspendeu-o sobre o precipício de pedras pontiagudas cem pés abaixo.
— As coisas que eu faço por amor — sussurrou o Regicida antes de empurrá-lo para o vazio.`,
      internalVoices: [
        {
          atributo: 'furia',
          resultadoPassivo: 'SUCESSO',
          dcPassiva: 10,
          fala: 'Traição monstruosa! O sangue do rei está manchado pelo incesto dos leões.',
        },
      ],
      loreContext: {
        fonte: {
          arquivo_md: 'corpus_md/jornada_3_tronos/livro_1_a-guerra-dos-tronos_resumo-completo.md',
          livro: 'A Guerra dos Tronos',
          capitulo: 'Bran II',
        },
        notaHistorica: 'O empurrão de Jaime Lannister em Bran.',
      },
      escolhas: [
        {
          id: 'esc_j3_a1_socorrer_bran_inconsciente',
          texto: 'Resgatar o corpo quebrado de Bran na neve e levá-lo para os cuidados de Meistre Luwin.',
          tipo: 'simples',
          nextNodeId: 'j3_a1_vigilia_catelyn_assassino',
        },

        {
          id: 'esc_queda_bran_vigilia_solene',
          texto: 'Montar vigília ininterrupta com guardas leais na porta dos aposentos de Bran ferido.',
          tipo: 'simples',
          aprovacaoCompanheiros: { catelyn: 25, grande_jon: 15 },
          delta: { compostura: 2, sangue: 1 },
          nextNodeId: 'j3_a1_vigilia_catelyn_assassino',
        },
        {
          id: 'esc_queda_bran_investigar_torre',
          texto: 'Subir à torre abandonada em busca de pegadas, fios de cabelo ou pegadas de botas no parapeito.',
          tipo: 'teste_atributo',
          atributo: 'astucia',
          dc: 8,
          onSuccessNodeId: 'j3_a1_vigilia_catelyn_assassino',
          onPartialFailureNodeId: 'j3_a1_vigilia_catelyn_assassino',
          tagOrigem: '[INVESTIGACAO DO NORTE]',
          aprovacaoCompanheiros: { peixe_negro: 20, catelyn: 15 },
        }
      ],
    },

    // 6. A Vigília de Catelyn e o Assassino
    j3_a1_vigilia_catelyn_assassino: {
      id: 'j3_a1_vigilia_catelyn_assassino',
      titulo: 'A Adaga de Aço Valiriano na Noite',
      anoHistorico: '298 d.C.',
      localizacao: 'Aposentos de Bran, Winterfell',
      regionId: 'norte',
      fallbackText: `Enquanto Bran jazia em coma profundo e um incêndio distraía os guardas na biblioteca, um homem magro e fétido entrou no quarto empunhando uma lâmina reluzente:
— Não devia estar aqui. Ninguém devia estar aqui. É uma misericórdia para ele — sibilou o assassino.
      
Catelyn Stark agarrou a lâmina com as duas mãos nuas, o aço cortando seus tendões até os ossos. Quando suas forças estavam cedendo, o lobo gigante Verão saltou pela porta como uma tromba cinzenta e arrancou a garganta do assassino com uma única dentada feroz. A adaga caída no tapete tinha cabo de osso de dragão e lâmina impecável de aço valiriano.`,
      internalVoices: [
        {
          atributo: 'furia',
          resultadoPassivo: 'SUCESSO',
          dcPassiva: 11,
          fala: 'A lâmina é fina demais para um camponês. Alguém de imensa riqueza pagou pelo assassinato de Bran!',
        },
        {
          atributo: 'erudicao',
          resultadoPassivo: 'SUCESSO',
          dcPassiva: 10,
          fala: 'Aço valiriano e osso de dragão... Esta arma pertenceu à corte real de Porto Real.',
        },
      ],
      loreContext: {
        fonte: {
          arquivo_md: 'corpus_md/jornada_3_tronos/livro_1_a-guerra-dos-tronos_resumo-completo.md',
          livro: 'A Guerra dos Tronos',
          capitulo: 'Catelyn III',
        },
        notaHistorica: 'O ataque do assassino com a adaga de aço valiriano.',
      },
      escolhas: [
        {
          id: 'esc_j3_a1_examinar_adaga_viajar_sul',
          texto: 'Catelyn decide cavalgar disfarçada para Porto Real levando a adaga para Ned e Mindinho.',
          tipo: 'simples',
          nextNodeId: 'j3_a1_partida_catelyn_estrada_sul',
        },
        {
          id: 'esc_j3_a1_confrontar_assassino_sobrevivente',
          texto: 'Tentar estancar o sangue do assassino para interrogá-lo sobre quem contratou o golpe.',
          tipo: 'teste_atributo',
          atributo: 'erudicao',
          dc: 11,
          onSuccessNodeId: 'j3_a1_pista_adaga_corte',
          onPartialFailureNodeId: 'j3_a1_partida_catelyn_estrada_sul',
        },
      
        {
          id: 'esc_j3_a1_investigar_pegadas_bosque_sagrado',
          texto: 'Varrer o Bosque Sagrado em busca de vestígios do cúmplice que abriu os portões de Winterfell.',
          tipo: 'teste_atributo',
          atributo: 'astucia',
          dc: 11,
          onSuccessNodeId: 'j3_a1_partida_catelyn_estrada_sul',
          onPartialFailureNodeId: 'j3_a1_partida_catelyn_estrada_sul',
          aprovacaoCompanheiros: { catelyn: 15, grande_jon: 5 },
          delta: { mundo: { vestigios_assassino_encontrados: true } },
        },
        {
          id: 'esc_j3_a1_oracao_arvore_coracao_bran',
          texto: 'Ajoelhar diante do represeiro ancestral buscando a sabedoria dos Deuses Antigos para salvar Bran.',
          tipo: 'teste_atributo',
          atributo: 'pressagio',
          dc: 11,
          tagOrigem: '[HONRA DO NORTE]',
          onSuccessNodeId: 'j3_a1_partida_catelyn_estrada_sul',
          onPartialFailureNodeId: 'j3_a1_partida_catelyn_estrada_sul',
          aprovacaoCompanheiros: { jon_snow: 15, catelyn: 10 },
          delta: { ficha: { compostura: 1 } },
        },
      ],
    },

    // 7. Pista da Adaga
    j3_a1_pista_adaga_corte: {
      id: 'j3_a1_pista_adaga_corte',
      titulo: 'As Moedas de Prata do Bagageiro Real',
      anoHistorico: '298 d.C.',
      localizacao: 'Winterfell',
      regionId: 'norte',
      fallbackText: `Nos bolsos do assassino moribundo foram encontradas noventa moedas de prata de cunhagem recente da capital. O homem era um cavalariço que viajava com a comitiva do Rei. A ordem partira do próprio séquito real.`,
      loreContext: {
        fonte: {
          arquivo_md: 'corpus_md/jornada_3_tronos/livro_1_a-guerra-dos-tronos_resumo-completo.md',
          livro: 'A Guerra dos Tronos',
          capitulo: 'Livro 1',
        },
        notaHistorica: 'A Guerra dos Tronos (George R. R. Martin) - Tradução Jorge Candeias (LeYa)',
      },
      escolhas: [
        {
          id: 'esc_j3_a1_seguir_estrada_do_sul',
          texto: 'Cavalgar às pressas para alcançar Lorde Eddard antes que a comitiva entre no Tridente.',
          tipo: 'simples',
          nextNodeId: 'j3_a1_partida_catelyn_estrada_sul',
        },

        {
          id: 'esc_pista_adaga_catelyn_viagem',
          texto: 'Apoiar Catelyn em sua jornada secreta a cavalo até Porto Real com Ser Rodrik Cassel.',
          tipo: 'simples',
          aprovacaoCompanheiros: { catelyn: 25, peixe_negro: 20 },
          delta: { compostura: 2 },
          nextNodeId: 'j3_a1_estrada_final_porto_real',
        },
        {
          id: 'esc_pista_adaga_guardar_winterfell',
          texto: 'Manter a adaga guardada sob sete chaves e confiar a governança do castelo a Robb Stark.',
          tipo: 'simples',
          aprovacaoCompanheiros: { grande_jon: 20, catelyn: 15 },
          delta: { flagsAdicionadas: ['adaga_sob_guarda_norte'] },
          nextNodeId: 'j3_a1_estrada_final_porto_real',
        }
      ],
    },

    // 8. Partida para o Sul e a Muralha
    j3_a1_partida_catelyn_estrada_sul: {
      id: 'j3_a1_partida_catelyn_estrada_sul',
      titulo: 'Os Caminhos que se Dividem no Norte',
      anoHistorico: '298 d.C.',
      localizacao: 'Portões de Winterfell',
      regionId: 'norte',
      fallbackText: `A família Stark dispersou-se pelo continente: Jon Snow partiu para o norte com seu tio Benjen e Tyrion para vestir o negro em Castelo Negro. Robb assumiu Winterfell como o Senhor em funções ao lado de Bran quebrado.
      
Ned cavalgava para o sul pela Estrada do Rei com Sansa, Arya e as lobas Lady e Nymeria, cercado pelos cavaleiros arrogantes de Joffrey.`,
      loreContext: {
        fonte: {
          arquivo_md: 'corpus_md/jornada_3_tronos/livro_1_a-guerra-dos-tronos_resumo-completo.md',
          livro: 'A Guerra dos Tronos',
          capitulo: 'Livro 1',
        },
        notaHistorica: 'A Guerra dos Tronos (George R. R. Martin) - Tradução Jorge Candeias (LeYa)',
      },
      escolhas: [
        {
          id: 'esc_j3_a1_acompanhar_jon_castelo_negro',
          texto: 'Acompanhar a jornada de Jon Snow e Tyrion até o topo da Muralha de gelo.',
          tipo: 'simples',
          nextNodeId: 'j3_a1_jon_snow_muralha_juramento',
        },
        {
          id: 'esc_j3_a1_seguir_comitiva_tridente',
          texto: 'Seguir com a comitiva de Ned e as meninas até a encruzilhada do Tridente.',
          tipo: 'simples',
          nextNodeId: 'j3_a1_incidente_tridente_nymeria_joffrey',
        },
      
        {
          id: 'esc_j3_a1_escoltar_catelyn_porto_branco',
          texto: 'Escoltar Lady Catelyn e Ser Rodrik Cassel até Porto Branco para fretar uma galé rápida e segura.',
          tipo: 'teste_atributo',
          atributo: 'comando',
          dc: 11,
          onSuccessNodeId: 'j3_a1_incidente_tridente_nymeria_joffrey',
          onPartialFailureNodeId: 'j3_a1_incidente_tridente_nymeria_joffrey',
          aprovacaoCompanheiros: { catelyn: 20, grande_jon: 10 },
          delta: { mundo: { viagem_porto_branco_segura: true } },
        },
        {
          id: 'esc_j3_a1_permanecer_winterfell_com_robb',
          texto: 'Permanecer em Winterfell instruindo o jovem Robb na colheita e nas defesas da fortaleza.',
          tipo: 'teste_atributo',
          atributo: 'erudicao',
          dc: 11,
          onSuccessNodeId: 'j3_a1_incidente_tridente_nymeria_joffrey',
          onPartialFailureNodeId: 'j3_a1_incidente_tridente_nymeria_joffrey',
          aprovacaoCompanheiros: { grande_jon: 15, jon_snow: 10 },
          delta: { ficha: { honra: 1 } },
        },
      ],
    },

    // 9. Jon Snow na Muralha
    j3_a1_jon_snow_muralha_juramento: {
      id: 'j3_a1_jon_snow_muralha_juramento',
      titulo: 'O Muro de Gelo no Fim do Mundo',
      anoHistorico: '298 d.C.',
      localizacao: 'Castelo Negro, A Muralha',
      regionId: 'muralha',
      fallbackText: `Setecentos pés de gelo sólido brilhavam sob o sol pálido do norte. Em Castelo Negro, Jon encontrou uma realidade dura e crua: em vez de nobres cavaleiros, a Patrulha da Noite era formada por ladrões, estupradores e camponeses famintos treinados pelo brutal Ser Alliser Thorne.
      
Com ajuda de Tyrion e seu lobo Fantasma, Jon venceu a hostilidade inicial e jurou proteger Samwell Tarly, o gordo e covarde herdeiro deserdado de Monte Chifre. No topo da Muralha, contemplando a imensidão da Floresta Assombrada, Tyrion urinou sobre a borda do mundo antes de despedir-se como amigo.`,
      internalVoices: [
        {
          atributo: 'comando',
          resultadoPassivo: 'SUCESSO',
          dcPassiva: 10,
          fala: 'A honra na Muralha não se herda do sangue nobre, forja-se na neve e na solidariedade dos irmãos negros.',
        },
      ],
      loreContext: {
        fonte: {
          arquivo_md: 'corpus_md/jornada_3_tronos/livro_1_a-guerra-dos-tronos_resumo-completo.md',
          livro: 'A Guerra dos Tronos',
          capitulo: 'Jon III',
        },
        notaHistorica: 'Jon Snow e Tyrion Lannister no topo da Muralha.',
      },
      escolhas: [
        {
          id: 'esc_j3_a1_voltar_para_sul_tridente',
          texto: 'Retornar ao sul acompanhando Tyrion até a encruzilhada do Tridente.',
          tipo: 'simples',
          nextNodeId: 'j3_a1_incidente_tridente_nymeria_joffrey',
        },

        {
          id: 'esc_jon_muralha_despedida_ned',
          texto: 'Abraçar Jon Snow e prometer-lhe que quando nos virmos novamente conversaremos sobre sua mãe.',
          tipo: 'simples',
          aprovacaoCompanheiros: { jon_snow: 30, catelyn: -15 },
          delta: { compostura: 2 },
          nextNodeId: 'j3_a1_julgamento_darry_lady',
        },
        {
          id: 'esc_jon_muralha_garra_fantasma',
          texto: 'Observar o lobo albino Fantasma ao lado de Jon e desejar que o Norte permaneça sempre em seu coração.',
          tipo: 'simples',
          aprovacaoCompanheiros: { jon_snow: 25 },
          delta: { compostura: 1 },
          nextNodeId: 'j3_a1_julgamento_darry_lady',
        }
      ],
    },

    // 10. O Incidente no Tridente (Arya, Joffrey e Nymeria)
    j3_a1_incidente_tridente_nymeria_joffrey: {
      id: 'j3_a1_incidente_tridente_nymeria_joffrey',
      titulo: 'O Sangue na Margem do Tridente',
      anoHistorico: '298 d.C.',
      localizacao: 'Margens do Tridente',
      regionId: 'tridente',
      fallbackText: `Às margens do rio, Arya brincava de esgrima com gravetos com Mycah, o filho do açougueiro. O Príncipe Joffrey, bêbado de vinho e vaidade, desembainhou sua espada de aço afiada Dente de Leão e cortou a bochecha do menino por diversão.
      
Arya atacou o príncipe com um pedaço de pau. Quando Joffrey ergueu a lâmina para feri-la, a loba gigante Nymeria saltou das árvores, cravando as presas no braço do príncipe até ele berrar em prantos jogado na lama. Arya desarmou Joffrey e atirou sua espada no fundo do rio, forçando Nymeria a fugir para a floresta para salvá-la da forca.`,
      internalVoices: [
        {
          atributo: 'furia',
          resultadoPassivo: 'SUCESSO',
          dcPassiva: 10,
          fala: 'Joffrey é um monstro covarde que chora ao ver o próprio sangue. Cersei exigirá cabeças inocentes.',
        },
      ],
      loreContext: {
        fonte: {
          arquivo_md: 'corpus_md/jornada_3_tronos/livro_1_a-guerra-dos-tronos_resumo-completo.md',
          livro: 'A Guerra dos Tronos',
          capitulo: 'Arya III',
        },
        notaHistorica: 'O ataque de Nymeria a Joffrey no Tridente.',
      },
      escolhas: [
        {
          id: 'esc_j3_a1_julgar_tridente_robert',
          texto: 'Apresentar-se diante do Rei Robert e da Rainha Cersei na tenda régia de Darry.',
          tipo: 'simples',
          nextNodeId: 'j3_a1_julgamento_darry_lady',
        },
        {
          id: 'esc_j3_a1_desmascarar_mentira_joffrey',
          texto: 'Expor a covardia e as mentiras de Joffrey perante o Rei Robert com teste de persuasão!',
          tipo: 'teste_atributo',
          atributo: 'cortesia',
          dc: 11,
          onSuccessNodeId: 'j3_a1_whatif_lady_salva',
          onPartialFailureNodeId: 'j3_a1_julgamento_darry_lady',
        },

        {
          id: 'esc_tridente_acalmar_arya',
          texto: 'Abraçar Arya com firmeza e ordenar que espalhe carne fresca para que Nymeria fuja para as matas do Tridente.',
          tipo: 'simples',
          aprovacaoCompanheiros: { catelyn: 25, jon_snow: 20 },
          delta: { flagsAdicionadas: ['nymeria_liberta_florestas'], compostura: 2 },
          nextNodeId: 'j3_a1_julgamento_darry_lady',
        },
        {
          id: 'esc_tridente_repreender_joffrey',
          texto: 'Exigir que Joffrey aprenda a honrar as damas e cesse as provocações perante a guarda.',
          tipo: 'simples',
          aprovacaoCompanheiros: { grande_jon: 25, catelyn: 15 },
          delta: { compostura: 1 },
          nextNodeId: 'j3_a1_julgamento_darry_lady',
        }
      ],
    },

    // 11. Julgamento em Darry & Sacrifício Canônico de Lady
    j3_a1_julgamento_darry_lady: {
      id: 'j3_a1_julgamento_darry_lady',
      titulo: 'O Julgamento de Darry & A Sentença de Lady',
      anoHistorico: '298 d.C.',
      localizacao: 'Castelo de Darry, Terras Fluviais',
      regionId: 'tridente',
      fallbackText: `Na tenda real, Joffrey mentiu descaradamente dizendo ter sido emboscado por Mycah e Arya. Sansa, apavorada e desejando agradar o príncipe noivo, hesitou e mentiu que não se lembrava de nada.
      
Como Nymeria não pôde ser encontrada, a Rainha Cersei exigiu com histeria venenosa o abate de outro lobo gigante: Lady, a inocente loba de Sansa. Robert, cansado das queixas da esposa, cedeu covardemente.
Ned recusou que o carrasco Ilyn Payne tocasse na criatura:
— Ela é do Norte. Ela merece uma morte limpa por mãos do Norte — disse Ned, abatendo Lady com sua própria adaga e ordenando que seus ossos fossem levados a Winterfell.`,
      internalVoices: [
        {
          atributo: 'comando',
          resultadoPassivo: 'SUCESSO',
          dcPassiva: 11,
          fala: 'A morte de Lady enterrou a inocência das crianças Stark. A justiça da corte sulista é podre.',
        },
      ],
      loreContext: {
        fonte: {
          arquivo_md: 'corpus_md/jornada_3_tronos/livro_1_a-guerra-dos-tronos_resumo-completo.md',
          livro: 'A Guerra dos Tronos',
          capitulo: 'Eddard III',
        },
        notaHistorica: 'O sacrifício trágico da loba Lady por Ned Stark.',
      },
      escolhas: [
        {
          id: 'esc_j3_a1_avancar_porto_real_luto',
          texto: 'Seguir em marcha sombria para os portões da capital Porto Real.',
          tipo: 'simples',
          nextNodeId: 'j3_a1_estrada_final_porto_real',
        },

        {
          id: 'esc_darry_confrontar_cersei',
          texto: 'Exigir que o Rei Robert faça justiça entre os meninos sem sacrificar uma loba inocente.',
          tipo: 'simples',
          aprovacaoCompanheiros: { catelyn: 20, grande_jon: 25 },
          delta: { compostura: 1 },
          nextNodeId: 'j3_a1_whatif_lady_salva',
        },
        {
          id: 'esc_darry_sacrificio_doloroso',
          texto: 'Executar Lady pessoalmente para que ela não sinta as mãos cruéis de Ilyn Payne.',
          tipo: 'simples',
          aprovacaoCompanheiros: { catelyn: 15, grande_jon: 10 },
          delta: { sangue: -1, compostura: -1 },
          nextNodeId: 'j3_a1_estrada_final_porto_real',
        }
      ],
    },

    // 12. What If: Lady Salva
    j3_a1_whatif_lady_salva: {
      id: 'j3_a1_whatif_lady_salva',
      titulo: 'A Verdade de Robert & Lady Poupada',
      anoHistorico: '298 d.C.',
      localizacao: 'Castelo de Darry',
      regionId: 'tridente',
      fallbackText: `Com eloquência e firmeza inabalável, confrontastes o príncipe em suas próprias contradições diante de Robert Baratheon! Furioso com o choro manhoso do filho, Robert bateu na mesa:
— Chega de tolices, mulher! Um rapaz apanhou de uma menina menor e inventou mentiras! O lobo não morrerá!
Lady foi enviada secretamente de volta a Winterfell em segurança.`,
      loreContext: {
        fonte: {
          arquivo_md: 'corpus_md/jornada_3_tronos/livro_1_a-guerra-dos-tronos_resumo-completo.md',
          livro: 'A Guerra dos Tronos',
          capitulo: 'Livro 1',
        },
        notaHistorica: 'A Guerra dos Tronos (George R. R. Martin) - Tradução Jorge Candeias (LeYa)',
      },
      escolhas: [
        {
          id: 'esc_j3_a1_avancar_com_lady_salva',
          texto: 'Marchar para Porto Real com a dignidade Stark preservada.',
          tipo: 'simples',
          nextNodeId: 'j3_a1_estrada_final_porto_real',
        },

        {
          id: 'esc_salva_lady_enviar_winterfell',
          texto: 'Despachar Lady com batedores nortenhos para que retorne em segurança aos bosques de Winterfell.',
          tipo: 'simples',
          aprovacaoCompanheiros: { catelyn: 25, jon_snow: 20 },
          delta: { flagsAdicionadas: ['lady_salva_em_winterfell'], compostura: 2 },
          nextNodeId: 'j3_a1_estrada_final_porto_real',
        },
        {
          id: 'esc_salva_lady_guardar_sansa',
          texto: 'Manter a loba vigiada e protegida sob a guarda de Jory Cassel na comitiva real.',
          tipo: 'simples',
          aprovacaoCompanheiros: { catelyn: 20 },
          delta: { compostura: 1 },
          nextNodeId: 'j3_a1_estrada_final_porto_real',
        }
      ],
    },

    // 13. A Entrada em Porto Real
    j3_a1_estrada_final_porto_real: {
      id: 'j3_a1_estrada_final_porto_real',
      titulo: 'Os Muros Carmesins de Porto Real',
      anoHistorico: '298 d.C.',
      localizacao: 'Portão dos Reis, Porto Real',
      regionId: 'terras_da_coroa',
      fallbackText: `No horizonte banhado pela maresia e fétido de curtumes e dejetos humanos, erguiam-se as três colinas da capital do império. No alto da Colina de Aegon, a Fortaleza Vermelha brilhava com suas pedras cor de sangue e ameias imensas voltadas para a baía.
      
Ser Barristan Selmy e os membros do Pequeno Conselho saíram ao encontro de Ned. A corte aguardava sua nova Mão do Rei para abrir o primeiro conselho de governo.`,
      loreContext: {
        fonte: {
          arquivo_md: 'corpus_md/jornada_3_tronos/livro_1_a-guerra-dos-tronos_resumo-completo.md',
          livro: 'A Guerra dos Tronos',
          capitulo: 'Livro 1',
        },
        notaHistorica: 'A Guerra dos Tronos (George R. R. Martin) - Tradução Jorge Candeias (LeYa)',
      },
      escolhas: [
        {
          id: 'esc_j3_a1_entrar_fortaleza_vermelha',
          texto: 'Atravessar os portões de ferro e assumir os aposentos da Torre da Mão.',
          tipo: 'simples',
          nextNodeId: 'j3_a1_torre_da_mao_aposentos',
        },

        {
          id: 'esc_estrada_final_batedores_alerta',
          texto: 'Redobrar os piquetes de batedores e entrar na capital em coluna cerrada com as cores Stark.',
          tipo: 'simples',
          aprovacaoCompanheiros: { grande_jon: 20, peixe_negro: 20 },
          delta: { compostura: 1 },
          nextNodeId: 'j3_a1_torre_da_mao_aposentos',
        },
        {
          id: 'esc_estrada_final_confortar_filhas',
          texto: 'Confortar Sansa e Arya diante da visão imponente das muralhas vermelhas de Porto Real.',
          tipo: 'simples',
          aprovacaoCompanheiros: { catelyn: 25 },
          delta: { compostura: 2 },
          nextNodeId: 'j3_a1_torre_da_mao_aposentos',
        }
      ],
    },

    // 14. Aposentos da Torre da Mão
    j3_a1_torre_da_mao_aposentos: {
      id: 'j3_a1_torre_da_mao_aposentos',
      titulo: 'A Torre da Mão & O Peso do Selo Real',
      anoHistorico: '298 d.C.',
      localizacao: 'Torre da Mão, Fortaleza Vermelha',
      regionId: 'terras_da_coroa',
      fallbackText: `A lareira crepitava nos aposentos circulares da Torre da Mão. Ned depositou a espada Gelo sobre a mesa de carvalho negro e contemplou a corrente de mãos entrelaçadas de ouro pesado. Ao seu redor, as paredes de pedra pareciam ter ouvidos.`,
      loreContext: {
        fonte: {
          arquivo_md: 'corpus_md/jornada_3_tronos/livro_1_a-guerra-dos-tronos_resumo-completo.md',
          livro: 'A Guerra dos Tronos',
          capitulo: 'Livro 1',
        },
        notaHistorica: 'A Guerra dos Tronos (George R. R. Martin) - Tradução Jorge Candeias (LeYa)',
      },
      escolhas: [
        {
          id: 'esc_j3_a1_convocar_pequeno_conselho',
          texto: 'Avançar para a sala do conselho onde Mindinho e Varys esperam nas sombras.',
          tipo: 'simples',
          nextNodeId: 'j3_a1_conselho_primeiro_contato',
        },

        {
          id: 'esc_torre_mao_trocar_guardas',
          texto: 'Substituir os guardas dos corredores da Torre da Mão por homens de Winterfell sob o comando de Jory.',
          tipo: 'simples',
          aprovacaoCompanheiros: { catelyn: 25, peixe_negro: 25 },
          delta: { flagsAdicionadas: ['guardas_norte_torre_mao'], compostura: 2 },
          nextNodeId: 'j3_a1_conselho_primeiro_contato',
        },
        {
          id: 'esc_torre_mao_examinar_contas',
          texto: 'Abrir os livros de despesas deixados por Jon Arryn e constatar o endividamento catastrófico da coroa.',
          tipo: 'simples',
          aprovacaoCompanheiros: { peixe_negro: 20, catelyn: 15 },
          delta: { flagsAdicionadas: ['divida_coroa_descoberta'] },
          nextNodeId: 'j3_a1_conselho_primeiro_contato',
        }
      ],
    },

    // 15. Primeiro Contato no Conselho
    j3_a1_conselho_primeiro_contato: {
      id: 'j3_a1_conselho_primeiro_contato',
      titulo: 'O Primeiro Encontro com as Víboras da Corte',
      anoHistorico: '298 d.C.',
      localizacao: 'Câmara do Pequeno Conselho',
      regionId: 'terras_da_coroa',
      fallbackText: `Petyr Baelish, de cavanhaque pontudo e sorriso insolente, saudou Ned com desdém velado:
— Ah, Lorde Stark. Esperava um homem mais alto.
Ao seu lado, o eunuco Varys cheirava a pó de lilás e água de rosas, com passos silenciosos de veludo. Lorde Renly Baratheon sorria com elegância esbanjadora, e o Grande Meistre Pycelle cochilava sob suas pesadas correntes de múltiplos metais. O Ato I encerra-se com Ned percebendo que a coroa está falida com seis milhões de dragões em dívidas — a maior parte aos Lannister.`,
      loreContext: {
        fonte: {
          arquivo_md: 'corpus_md/jornada_3_tronos/livro_1_a-guerra-dos-tronos_resumo-completo.md',
          livro: 'A Guerra dos Tronos',
          capitulo: 'Livro 1',
        },
        notaHistorica: 'A Guerra dos Tronos (George R. R. Martin) - Tradução Jorge Candeias (LeYa)',
      },
      escolhas: [
        {
          id: 'esc_j3_a1_concluir_ato1',
          texto: 'Concluir o Ato I e mergulhar na investigação sombria da morte de Jon Arryn (Ato II).',
          tipo: 'simples',
          nextNodeId: 'j3_a1_checkpoint_conclusao',
        },

        {
          id: 'esc_conselho_firmeza_norte',
          texto: 'Repreender os gastos do Pequeno Conselho com o Torneio da Mão e impor disciplina orçamentária.',
          tipo: 'simples',
          aprovacaoCompanheiros: { catelyn: 20, peixe_negro: 20, grande_jon: 15 },
          delta: { compostura: 2 },
          nextNodeId: 'j3_a1_checkpoint_conclusao',
        },
        {
          id: 'esc_conselho_sondar_varys',
          texto: 'Ouvir os sussurros enigmáticos do eunuco Varys sobre os perigos ocultos que cercam o trono.',
          tipo: 'simples',
          aprovacaoCompanheiros: { peixe_negro: 15, catelyn: 10 },
          delta: { flagsAdicionadas: ['aviso_varys_recebido'] },
          nextNodeId: 'j3_a1_checkpoint_conclusao',
        }
      ],
    },

    // Checkpoint do Ato 1
    j3_a1_checkpoint_conclusao: {
      id: 'j3_a1_checkpoint_conclusao',
      titulo: 'Conclusão do Ato I &bull; O Lobo no Ninho de Víboras',
      anoHistorico: '298 d.C.',
      localizacao: 'Porto Real',
      regionId: 'terras_da_coroa',
      loreContext: {
        fonte: {
          arquivo_md: 'corpus_md/jornada_3_tronos/livro_1_a-guerra-dos-tronos_resumo-completo.md',
          livro: 'A Guerra dos Tronos',
          capitulo: 'Livro 1',
        },
        notaHistorica: 'A Guerra dos Tronos (George R. R. Martin) - Tradução Jorge Candeias (LeYa)',
      },
      isEnding: true,
      fallbackText: `O Ato I encerra-se com Eddard Stark instalado como Mão do Rei numa corte corrupta e falida. Bran jaz quebrado em Winterfell, Jon Snow guarda a Muralha congelada e os segredos do veneno de Jon Arryn começam a emergir nas sombras da capital. O Ato II e a grande conspiração do Trono aguardam.`,
      escolhas: [],
    },
  },
};
