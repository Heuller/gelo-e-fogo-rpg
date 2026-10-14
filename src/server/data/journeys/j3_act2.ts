import 'server-only';
import { GrafoJornada, NodeJornada } from '@/server/engine/storyLinter';

export const grafoJ3Ato2: GrafoJornada = {
  id: 'jornada_3_tronos_ato2',
  titulo: 'Ato 2: O Ninho de Víboras em Porto Real & O Golpe do Trono',
  startNodeId: 'j3_a2_investigacao_bastardos_livro',
  nodes: {
    // 1. Investigação dos Bastardos e o Livro de Pycelle
    j3_a2_investigacao_bastardos_livro: {
      id: 'j3_a2_investigacao_bastardos_livro',
      titulo: 'As Linhagens das Grandes Casas & A Semente é Forte',
      anoHistorico: '298 d.C.',
      localizacao: 'Torre da Mão, Porto Real',
      regionId: 'terras_da_coroa',
      fallbackText: `Examinando o pesado tomo encadernado em couro carcomido do Grande Meistre Kaeth — As Linhagens e Histórias das Grandes Casas dos Sete Reinos —, Ned Stark encontrou as anotações secretas deixadas por Jon Arryn nos seus últimos dias de vida.
      
Todos os Baratheon de sangue, desde Orys até Robert, tinham cabelos pretos como carvão e mandíbulas quadradas: 'Ouro curvou-se perante o carvão.'
Visitando uma forja na Colina de Visenya, Ned encontrou Gendry, um rapaz forte como um touro moldando aço: o rosto do jovem ferreiro era idêntico ao de Robert Baratheon na juventude. Todas as amantes de Robert geravam bastardos de cabelos pretos... mas os três filhos régios da Rainha Cersei eram de ouro puro.`,
      internalVoices: [
        {
          atributo: 'erudicao',
          resultadoPassivo: 'SUCESSO',
          dcPassiva: 10,
          fala: 'A semente é forte! Jon Arryn não morreu de febre estomacal; ele foi assassinado porque descobriu o segredo da sucessão!',
        },
        {
          atributo: 'astucia',
          resultadoPassivo: 'SUCESSO',
          dcPassiva: 11,
          fala: 'Joffrey, Myrcella e Tommen são bastardos do incesto de Jaime e Cersei. O Trono de Ferro pertence a Stannis Baratheon por direito divino.',
        },
      ],
      loreContext: {
        fonte: {
          arquivo_md: 'corpus_md/jornada_3_tronos/livro_1_a-guerra-dos-tronos_resumo-completo.md',
          livro: 'A Guerra dos Tronos',
          capitulo: 'Eddard VI',
        },
        notaHistorica: 'Ned Stark descobre a verdade sobre a bastardia de Joffrey.',
      },
      escolhas: [
        {
          id: 'esc_j3_a2_visitar_prostibulo_barra',
          texto: 'Seguir as pistas de Mindinho e visitar a bebê bastarda Barra no bordel de Chataya.',
          tipo: 'simples',
          nextNodeId: 'j3_a2_torneio_da_mao_montanha',
        },
        {
          id: 'esc_j3_a2_confrontar_pycelle_veneno',
          texto: 'Interrogar o Grande Meistre Pycelle sobre o veneno Lágrimas de Lys que matou Jon Arryn.',
          tipo: 'teste_atributo',
          atributo: 'astucia',
          dc: 11,
          onSuccessNodeId: 'j3_a2_confissao_velada_pycelle',
          onPartialFailureNodeId: 'j3_a2_torneio_da_mao_montanha',
        },
      ],
    },

    // 2. Confissão de Pycelle
    j3_a2_confissao_velada_pycelle: {
      id: 'j3_a2_confissao_velada_pycelle',
      titulo: 'As Lágrimas de Lys & A Conivência do Meistre',
      anoHistorico: '298 d.C.',
      localizacao: 'Aposentos do Grande Meistre',
      regionId: 'terras_da_coroa',
      fallbackText: `Encurralado pelas perguntas diretas de Ned, Pycelle tremeu sob suas correntes:
— Jon Arryn estava fazendo perguntas perigosas demais, milorde. Algumas verdades são pesadas demais para a paz do reino.`,
      internalVoices: [
        {
          atributo: 'astucia',
          resultadoPassivo: 'SUCESSO',
          dcPassiva: 10,
          fala: 'Pycelle é uma criatura servil dos Lannister. Ele deixou Jon Arryn morrer sem administrar o antídoto.',
        },
      ],
      loreContext: {
        fonte: {
          arquivo_md: 'corpus_md/jornada_3_tronos/livro_1_a-guerra-dos-tronos_resumo-completo.md',
          livro: 'A Guerra dos Tronos',
          capitulo: 'Eddard V',
        },
        notaHistorica: 'O confronto velado entre Ned e Pycelle.',
      },
      escolhas: [
        {
          id: 'esc_j3_a2_avancar_torneio_da_mao',
          texto: 'Comparecer aos campos de justa do suntuoso Torneio da Mão.',
          tipo: 'simples',
          nextNodeId: 'j3_a2_torneio_da_mao_montanha',
        },
      ],
    },

    // 3. O Torneio da Mão
    j3_a2_torneio_da_mao_montanha: {
      id: 'j3_a2_torneio_da_mao_montanha',
      titulo: 'O Torneio da Mão & A Fúria da Montanha',
      anoHistorico: '298 d.C.',
      localizacao: 'Campos de Justa fora das Muralhas',
      regionId: 'terras_da_coroa',
      fallbackText: `Milhares de espectadores aplaudiam as justas onde Sor Loras Tyrell, o Cavaleiro das Flores, desmontou Sor Gregor Clegane, a Montanha que Cavalga, usando uma égua no cio para distrair o garanhão da besta.
      
Enlouquecido de raiva, a Montanha decapitou seu próprio cavalo com um único golpe de montante e saltou para assassinar o jovem Loras! O Cão de Caça Sandor Clegane saltou para a liça com sua espada, travando um duelo brutal de irmãos até que o trovão da voz do Rei Robert ordenou o cessar das lâminas.
      
Naquela mesma tarde, corvos trouxeram notícias alarmantes do Tridente: na Estalagem do Entroncamento, Senhora Catelyn Stark prendera publicamente Tyrion Lannister pelo atentado contra Bran.`,
      internalVoices: [
        {
          atributo: 'comando',
          resultadoPassivo: 'SUCESSO',
          dcPassiva: 11,
          fala: 'A prisão de Tyrion é um pavio aceso no barril de pólvora. Tywin Lannister marchará com todo o Ocidente.',
        },
      ],
      loreContext: {
        fonte: {
          arquivo_md: 'corpus_md/jornada_3_tronos/livro_1_a-guerra-dos-tronos_resumo-completo.md',
          livro: 'A Guerra dos Tronos',
          capitulo: 'Eddard VII',
        },
        notaHistorica: 'O Torneio da Mão e a briga dos irmãos Clegane.',
      },
      escolhas: [
        {
          id: 'esc_j3_a2_enfrentar_represalia_capital',
          texto: 'Preparar a guarda Stark na capital para a retaliação iminente dos Lannister.',
          tipo: 'simples',
          nextNodeId: 'j3_a2_emboscada_jaime_chuva',
        },
      ],
    },

    // 4. A Emboscada de Jaime Lannister na Chuva
    j3_a2_emboscada_jaime_chuva: {
      id: 'j3_a2_emboscada_jaime_chuva',
      titulo: 'O Sangue na Chuva & A Emboscada do Regicida',
      anoHistorico: '298 d.C.',
      localizacao: 'Ruelas de Porto Real',
      regionId: 'terras_da_coroa',
      fallbackText: `Retornando de um bordel sob uma tempestade torrencial, Ned Stark e seus homens foram cercados por cem lanceiros Lannister liderados por Sor Jaime a cavalo em armadura de ouro reluzente.
— Vosso irmão anão pagará por seus crimes — disse Ned com a mão no punho de Gelo.
— Eu quero meu irmão de volta — respondeu Jaime, com olhos frios. — Matem os homens dele! Deixem Lorde Stark vivo.
      
Jory Cassel e os fiéis guardas de Winterfell foram massacrados na lama diante dos olhos de Ned. Ao desembainhar sua espada para lutar, o cavalo de Ned escorregou e caiu sobre sua perna, estilhaçando os ossos do membro inferior. Jaime partiu a galope, abandonando Porto Real para liderar os exércitos do pai.`,
      internalVoices: [
        {
          atributo: 'furia',
          resultadoPassivo: 'SUCESSO',
          dcPassiva: 11,
          fala: 'Jory Cassel morreu nos vossos braços. A dívida de sangue dos Lannister clama por vingança total.',
        },
      ],
      loreContext: {
        fonte: {
          arquivo_md: 'corpus_md/jornada_3_tronos/livro_1_a-guerra-dos-tronos_resumo-completo.md',
          livro: 'A Guerra dos Tronos',
          capitulo: 'Eddard IX',
        },
        notaHistorica: 'A emboscada de Jaime Lannister contra Ned Stark na chuva.',
      },
      escolhas: [
        {
          id: 'esc_j3_a2_convalescer_e_confrontar_cersei',
          texto: 'Tratar a perna fraturada com leite de papoila e confrontar a Rainha Cersei no Bosque Sagrado.',
          tipo: 'simples',
          nextNodeId: 'j3_a2_confronto_bosque_sagrado_cersei',
        },
      ],
    },

    // 5. O Confronto com Cersei no Bosque Sagrado
    j3_a2_confronto_bosque_sagrado_cersei: {
      id: 'j3_a2_confronto_bosque_sagrado_cersei',
      titulo: 'Quando Se Joga o Jogo dos Tronos, Ganha-se ou Morre-se',
      anoHistorico: '298 d.C.',
      localizacao: 'Bosque Sagrado da Fortaleza Vermelha',
      regionId: 'terras_da_coroa',
      fallbackText: `Mancando apoiado numa bengala de freixo, Ned encontrou a Rainha Cersei sob as árvores do bosque sagrado. Por honra e piedade aos filhos infantes dela, Ned deu seu aviso solene:
— Eu sei o vosso segredo, Cersei. O que Jaime e vós fizestes na torre de Winterfell. Quando Robert retornar de sua caçada, eu direi a ele toda a verdade. Pegai vossos filhos e fujai para o exílio em Essos antes que a fúria dele os consuma.
      
Cersei ergueu a cabeça dourada, olhando-o com escárnio e compaixão cortante:
— Quando se joga o jogo dos tronos, ganha-se ou morre-se, Lorde Stark. Não há meio-termo.`,
      internalVoices: [
        {
          atributo: 'cortesia',
          resultadoPassivo: 'SUCESSO',
          dcPassiva: 10,
          fala: 'A piedade de Ned Stark é sua virtude mais nobre... e seu erro fatal diante de uma leoa encurralada.',
        },
        {
          atributo: 'astucia',
          resultadoPassivo: 'SUCESSO',
          dcPassiva: 12,
          fala: 'Cersei não fugirá para Essos. Ela agirá esta noite para assassinar Robert antes que ele volte da floresta.',
        },
      ],
      loreContext: {
        fonte: {
          arquivo_md: 'corpus_md/jornada_3_tronos/livro_1_a-guerra-dos-tronos_resumo-completo.md',
          livro: 'A Guerra dos Tronos',
          capitulo: 'Eddard XII',
        },
        notaHistorica: 'O diálogo lendário entre Ned e Cersei sobre o jogo dos tronos.',
      },
      escolhas: [
        {
          id: 'esc_j3_a2_enviar_corvo_para_stannis',
          texto: 'Despachar corvo secreto urgente para Pedra do Dragão chamando Stannis com sua frota.',
          tipo: 'teste_atributo',
          atributo: 'astucia',
          dc: 11,
          onSuccessNodeId: 'j3_a2_leito_morte_robert_javali',
          onPartialFailureNodeId: 'j3_a2_leito_morte_robert_javali',
        },
        {
          id: 'esc_j3_a2_aguardar_retorno_robert',
          texto: 'Aguardar o retorno da caçada do rei na Torre da Mão.',
          tipo: 'simples',
          nextNodeId: 'j3_a2_leito_morte_robert_javali',
        },
      ],
    },

    // 6. O Leito de Morte de Robert (O Javali)
    j3_a2_leito_morte_robert_javali: {
      id: 'j3_a2_leito_morte_robert_javali',
      titulo: 'O Leito de Morte do Usurpador',
      anoHistorico: '298 d.C.',
      localizacao: 'Aposentos Reais, Fortaleza Vermelha',
      regionId: 'terras_da_coroa',
      fallbackText: `O cheiro de sangue azedo e vinho forte infestava o quarto régio. Robert Baratheon jazia com as entranhas rasgadas pelas presas monstruosas de um javali da Mata do Rei. Seu jovem escudeiro Lancel Lannister garantira que seu odre de vinho fosse três vezes mais forte que o normal por ordem de Cersei.
      
Gaguejando de dor entre doses de leite de papoila, Robert ordenou que Ned redigisse sua última vontade:
— 'Eu nomeio meu amigo fiel Eddard Stark como Lorde Protetor do Reino para governar em nome de meu herdeiro legítimo até que ele atinja a maioridade.'
      
Robert assinou com mão trêmula e fechou os olhos. A contagem regressiva para o golpe de estado começara.`,
      internalVoices: [
        {
          atributo: 'comando',
          resultadoPassivo: 'SUCESSO',
          dcPassiva: 11,
          fala: 'O rei está morrendo. Quem controlar a Fortaleza Vermelha antes do nascer do sol controlará os Sete Reinos.',
        },
      ],
      loreContext: {
        fonte: {
          arquivo_md: 'corpus_md/jornada_3_tronos/livro_1_a-guerra-dos-tronos_resumo-completo.md',
          livro: 'A Guerra dos Tronos',
          capitulo: 'Eddard XIII',
        },
        notaHistorica: 'O testamento final do Rei Robert Baratheon.',
      },
      escolhas: [
        {
          id: 'esc_j3_a2_proposta_renly_cem_espadas',
          texto: 'Ouvir a proposta secreta de Renly Baratheon de atacar a rainha na calada da noite com 100 espadas.',
          tipo: 'simples',
          nextNodeId: 'j3_a2_proposta_noturna_renly_espadas',
        },
        {
          id: 'esc_j3_a2_proposta_mindinho_suborno',
          texto: 'Consultar Petyr Baelish para garantir a compra da lealdade dos Mantos Dourados de Janos Slynt.',
          tipo: 'simples',
          nextNodeId: 'j3_a2_pacto_traicoeiro_mindinho',
        },
      ],
    },

    // 7. Proposta de Renly Baratheon
    j3_a2_proposta_noturna_renly_espadas: {
      id: 'j3_a2_proposta_noturna_renly_espadas',
      titulo: 'As Cem Lâminas na Escuridão de Renly',
      anoHistorico: '298 d.C.',
      localizacao: 'Torre da Mão',
      regionId: 'terras_da_coroa',
      fallbackText: `Renly Baratheon bateu à porta de Ned às duas da madrugada:
— Lorde Stark, não podemos hesitar! Tenho cem homens armados sob meu comando. Ataquemos os aposentos de Cersei agora! Prendei as crianças, tirai Joffrey da mãe e assumamos a regência antes que os Lannister acordem!
      
Ned recusou com a honra cega do Norte:
— Não violarei a paz do castelo enquanto o cadáver do meu rei ainda estiver quente em seus lençóis.`,
      internalVoices: [
        {
          atributo: 'comando',
          resultadoPassivo: 'SUCESSO',
          dcPassiva: 10,
          fala: 'Renly tem razão militar. Na política sulista, esperar o dia amanhecer é assinar a própria sentença.',
        },
      ],
      loreContext: {
        fonte: {
          arquivo_md: 'corpus_md/jornada_3_tronos/livro_1_a-guerra-dos-tronos_resumo-completo.md',
          livro: 'A Guerra dos Tronos',
          capitulo: 'Eddard XIII',
        },
        notaHistorica: 'A oferta rejeitada de Renly Baratheon a Ned.',
      },
      escolhas: [
        {
          id: 'esc_j3_a2_aceitar_cem_espadas_whatif',
          texto: 'MUDAR DE IDEIA: Aceitar as 100 espadas de Renly e prender Cersei e Joffrey nesta noite! (What If)',
          tipo: 'teste_atributo',
          atributo: 'comando',
          dc: 12,
          onSuccessNodeId: 'j3_a2_whatif_golpe_lobo_venceu',
          onPartialFailureNodeId: 'j3_a2_pacto_traicoeiro_mindinho',
        },
        {
          id: 'esc_j3_a2_recusar_e_chamar_mindinho',
          texto: 'Recusar a proposta de Renly e recorrer ao ouro de Mindinho para subornar a Patrulha da Cidade.',
          tipo: 'simples',
          nextNodeId: 'j3_a2_pacto_traicoeiro_mindinho',
        },
      ],
    },

    // 8. O Pacto com Mindinho
    j3_a2_pacto_traicoeiro_mindinho: {
      id: 'j3_a2_pacto_traicoeiro_mindinho',
      titulo: 'O Ouro de Baelish & A Promessa dos Mantos Dourados',
      anoHistorico: '298 d.C.',
      localizacao: 'Torre da Mão',
      regionId: 'terras_da_coroa',
      fallbackText: `Mindinho sorriu no clarão da lareira, prometendo que Janos Slynt e dois mil Mantos Dourados ficariam ao lado de Ned Stark na manhã seguinte em troca de bolsas de ouro e títulos.
— Não confieis em mim, milorde. Eu vos avisei para não confiar em ninguém nesta cidade — murmurou Mindinho ao despedir-se com um olhar indecifrável.`,
      internalVoices: [
        {
          atributo: 'astucia',
          resultadoPassivo: 'SUCESSO',
          dcPassiva: 11,
          fala: 'Mindinho já vendeu os Mantos Dourados para a Rainha Cersei há duas horas atrás. É uma cilada mortal!',
        },
      ],
      loreContext: {
        fonte: {
          arquivo_md: 'corpus_md/jornada_3_tronos/livro_1_a-guerra-dos-tronos_resumo-completo.md',
          livro: 'A Guerra dos Tronos',
          capitulo: 'Eddard XIV',
        },
        notaHistorica: 'O pacto fatal de Ned com Mindinho.',
      },
      escolhas: [
        {
          id: 'esc_j3_a2_entrar_sala_do_trono_manha',
          texto: 'Marchar para a Sala do Trono com o testamento régio nas mãos (A Conspiração do Trono).',
          tipo: 'simples',
          nextNodeId: 'j3_a2_traicao_sala_do_trono_mindinho',
        },
        {
          id: 'esc_j3_a2_tentar_subornar_janos_direto',
          texto: 'Tentar subornar Janos Slynt diretamente sem passar pelas mãos de Mindinho.',
          tipo: 'teste_atributo',
          atributo: 'astucia',
          dc: 13,
          onSuccessNodeId: 'j3_a2_whatif_golpe_lobo_venceu',
          onPartialFailureNodeId: 'j3_a2_traicao_sala_do_trono_mindinho',
        },
      ],
    },

    // 9. A Traição na Sala do Trono
    j3_a2_traicao_sala_do_trono_mindinho: {
      id: 'j3_a2_traicao_sala_do_trono_mindinho',
      titulo: 'A Traição de Mindinho & A Queda da Mão',
      anoHistorico: '298 d.C.',
      localizacao: 'Sala do Trono, Fortaleza Vermelha',
      regionId: 'terras_da_coroa',
      fallbackText: `Na majestosa Sala do Trono, o menino Joffrey sentava-se no Trono de Ferro com Cersei altiva ao seu lado. Quando Ned entregou o testamento assinado por Robert declarando-o Protetor do Reino, Cersei rasgou o pergaminho régio em pedaços e atirou-o aos pés da corte.
— Os Mantos Dourados são vossos, Lorde Stark? — zombou Cersei.
      
Ned ordenou que Janos Slynt prendesse a rainha e o menino. Num relance de aço, as lanças da Patrulha da Cidade viraram-se contra os guardas de Winterfell, massacrando-os pelas costas. Petyr Baelish aproximou-se por trás de Ned, deslizou a adaga valiriana sob o queixo de Ned e sussurrou no seu ouvido com um sorriso frio:
— Eu vos avisei para não confiar em mim, milorde.`,
      internalVoices: [
        {
          atributo: 'comando',
          resultadoPassivo: 'SUCESSO',
          dcPassiva: 12,
          fala: 'A armadilha fechou-se com dentes de aço. Ned Stark é jogado nas masmorras negras da Fortaleza.',
        },
      ],
      loreContext: {
        fonte: {
          arquivo_md: 'corpus_md/jornada_3_tronos/livro_1_a-guerra-dos-tronos_resumo-completo.md',
          livro: 'A Guerra dos Tronos',
          capitulo: 'Eddard XIV',
        },
        notaHistorica: 'A traição de Mindinho na Sala do Trono.',
      },
      escolhas: [
        {
          id: 'esc_j3_a2_masmorras_negras_varys',
          texto: 'Descer às masmorras negras onde Varys surge das sombras para oferecer um acordo.',
          tipo: 'simples',
          nextNodeId: 'j3_a2_masmorras_escuras_acordo_varys',
        },
      ],
    },

    // 10. What If: O Golpe do Lobo Venceu
    j3_a2_whatif_golpe_lobo_venceu: {
      id: 'j3_a2_whatif_golpe_lobo_venceu',
      titulo: 'O Lobo Vence na Noite & Cersei Detida',
      anoHistorico: '298 d.C.',
      localizacao: 'Fortaleza Vermelha',
      regionId: 'terras_da_coroa',
      fallbackText: `Agindo com audácia cirúrgica, os cem soldados de Renly e a guarda Stark arrombaram os aposentos reais antes que Mindinho pudesse vender o golpe! Cersei Lannister e Joffrey foram colocados sob ferros nos seus próprios quartos.
      
Ned Stark ergueu o selo régio de Robert e proclamou a regência legítima diante do Pequeno Conselho estupefato. Uma carta urgente foi despachada a Stannis Baratheon para que assuma a coroa de direito.`,
      loreContext: {
        fonte: {
          arquivo_md: 'corpus_md/jornada_3_tronos/livro_1_a-guerra-dos-tronos_resumo-completo.md',
          livro: 'A Guerra dos Tronos',
          capitulo: 'Livro 1 - Porto Real',
        },
        notaHistorica: 'A Guerra dos Tronos (George R. R. Martin) - Tradução Jorge Candeias (LeYa)',
      },
      escolhas: [
        {
          id: 'esc_j3_a2_consolidar_regencia_ned',
          texto: 'Consolidar a Regência legítima em Porto Real e enviar corvos a Correrrio e Winterfell.',
          tipo: 'simples',
          nextNodeId: 'j3_a2_checkpoint_conclusao',
        },
        {
          id: 'esc_j3_a2_enviar_ordens_norte_regencia',
          texto: 'Comandar Robb Stark a manter os estandartes alertas enquanto Tywin Lannister recua.',
          tipo: 'teste_atributo',
          atributo: 'comando',
          dc: 11,
          onSuccessNodeId: 'j3_a2_checkpoint_conclusao',
          onPartialFailureNodeId: 'j3_a2_checkpoint_conclusao',
        },
      ],
    },

    // 11. Masmorras Escuras e Acordo com Varys
    j3_a2_masmorras_escuras_acordo_varys: {
      id: 'j3_a2_masmorras_escuras_acordo_varys',
      titulo: 'O Eunuco nas Sombras das Masmorras',
      anoHistorico: '298 d.C.',
      localizacao: 'Masmorras Negras da Fortaleza Vermelha',
      regionId: 'terras_da_coroa',
      fallbackText: `Acorrentado à parede fria com a perna estilhaçada pulsando em agonia e sem água, Ned ouviu passos de veludo. Varys emergiu disfarçado com uma tocha:
— O que é a vossa vida, Lorde Stark? E a vida de vossa filha Sansa? Cersei quer vossa confissão pública de traição no Septo de Baelor. Se vos confessardes, sereis poupado e enviado à Muralha para vestir o negro com vosso filho Jon. A vida pela honra... O que escolheis?`,
      internalVoices: [
        {
          atributo: 'cortesia',
          resultadoPassivo: 'SUCESSO',
          dcPassiva: 10,
          fala: 'Manchar o próprio nome perante os deuses é uma agonia insuportável, mas é o único modo de salvar Sansa.',
        },
      ],
      loreContext: {
        fonte: {
          arquivo_md: 'corpus_md/jornada_3_tronos/livro_1_a-guerra-dos-tronos_resumo-completo.md',
          livro: 'A Guerra dos Tronos',
          capitulo: 'Eddard XV',
        },
        notaHistorica: 'O diálogo de Varys e Ned Stark nas masmorras.',
      },
      escolhas: [
        {
          id: 'esc_j3_a2_aceitar_confissao_septo_baelor',
          texto: 'Aceitar a confissão pública no Septo de Baelor para salvar a vida de Sansa.',
          tipo: 'simples',
          nextNodeId: 'j3_a2_septo_baelor_execucao_ned',
        },
        {
          id: 'esc_j3_a2_recusar_confissao_morrer_orgulho',
          texto: 'Recusar a mentira e enfrentar o julgamento do Trono com a verdade em riste.',
          tipo: 'simples',
          nextNodeId: 'j3_a2_septo_baelor_execucao_ned',
        },
      ],
    },

    // 12. O Septo de Baelor e a Execução de Ned Stark
    j3_a2_septo_baelor_execucao_ned: {
      loreContext: {
        fonte: {
          arquivo_md: 'corpus_md/jornada_3_tronos/livro_1_a-guerra-dos-tronos_resumo-completo.md',
          livro: 'A Guerra dos Tronos',
          capitulo: 'Livro 1 - Porto Real',
        },
        notaHistorica: 'A Guerra dos Tronos (George R. R. Martin) - Tradução Jorge Candeias (LeYa)',
      },

      id: 'j3_a2_septo_baelor_execucao_ned',
      titulo: 'A Sentença do Rei Menino no Septo de Baelor',
      anoHistorico: '298 d.C.',
      localizacao: 'Praça do Grande Septo de Baelor',
      regionId: 'terras_da_coroa',
      fallbackText: `Diante de cinquenta mil plebeus aos berros na praça de mármore do Grande Septo de Baelor, Ned Stark foi conduzido aos degraus diante da estátua de Baelor, o Abençoado. Entre a multidão, ele avistou Arya aos pés da estátua e sussurrou para o irmão Yoren da Patrulha da Noite resgatá-la.
      
Engolindo o próprio orgulho para salvar a filha, Ned proclamou em voz alta que conspirara para usurpar a coroa de Joffrey. A multidão aplaudiu. Cersei e o Alto Septão acenaram para que o prisioneiro fosse poupado e enviado à Muralha.
Mas o Rei Joffrey deu um passo à frente com um sorriso sádico:
— Minha mãe e a Fé me pediram misericórdia. Mas eles têm o coração brando das mulheres. Enquanto eu for vosso rei, a traição nunca passará impune! Sor Ilyn, trazei-me a cabeça dele!`,
      internalVoices: [
        {
          atributo: 'comando',
          resultadoPassivo: 'SUCESSO',
          dcPassiva: 12,
          fala: 'Joffrey quebrou o acordo na frente de todos! Sor Ilyn Payne ergueu a gigantesca espada valiriana Gelo.',
        },
        {
          atributo: 'pressagio',
          resultadoPassivo: 'SUCESSO',
          dcPassiva: 13,
          fala: 'Se a lâmina descer, o Norte arderá em chamas de vingança que consumirão dezenas de milhares de vidas.',
        },
      ],
      escolhas: [
        {
          id: 'esc_j3_a2_tentativa_heroica_salvar_ned',
          texto: 'Intervenção heroica: Bater no braço de Ilyn Payne e forçar o cumprimento do juramento de vestimenta do negro!',
          tipo: 'teste_atributo',
          atributo: 'comando',
          dc: 13,
          onSuccessNodeId: 'j3_a2_whatif_ned_na_muralha',
          onPartialFailureNodeId: 'j3_a2_morte_canonica_ned_stark',
          onCriticalFailureNodeId: 'j3_a2_morte_canonica_ned_stark',
          riscoMortal: true,
        },
        {
          id: 'esc_j3_a2_deixar_lamina_descer_canone',
          texto: 'Testemunhar a tragédia que incendeia os Sete Reinos: a queda da cabeça de Ned Stark (Cânone).',
          tipo: 'simples',
          nextNodeId: 'j3_a2_morte_canonica_ned_stark',
        },
      ],
    },

    // 13. Morte Canônica de Ned Stark
    j3_a2_morte_canonica_ned_stark: {
      id: 'j3_a2_morte_canonica_ned_stark',
      titulo: 'A Espada de Gelo & A Queda do Protetor do Norte',
      anoHistorico: '298 d.C.',
      localizacao: 'Degraus do Septo de Baelor',
      regionId: 'terras_da_coroa',
      fallbackText: `A lâmina colossal de Gelo brilhou sob o sol escaldante de Porto Real e desceu num arco prateado inexorável. O sangue escarlate de Lorde Eddard Stark espirrou nas vestes do Alto Septão, e sua cabeça rolou sobre as pedras de mármore.
      
Sansa desmaiou nos degraus; Yoren agarrou Arya pelas roupas de menino, cortou seus cabelos com uma adaga para disfarçá-la e arrastou-a para longe do horror. A cabeça de Ned foi cravada numa estaca de ferro coberta de piche sobre as muralhas da Fortaleza Vermelha.
O Norte recebia o chamado definitivo para a guerra.`,
      loreContext: {
        fonte: {
          arquivo_md: 'corpus_md/jornada_3_tronos/livro_1_a-guerra-dos-tronos_resumo-completo.md',
          livro: 'A Guerra dos Tronos',
          capitulo: 'Livro 1 - Porto Real',
        },
        notaHistorica: 'A Guerra dos Tronos (George R. R. Martin) - Tradução Jorge Candeias (LeYa)',
      },
      escolhas: [
        {
          id: 'esc_j3_a2_avancar_rebeliao_robb',
          texto: 'Os corvos voam para Winterfell onde Robb Stark convoca os estandartes do Norte (Ato III).',
          tipo: 'simples',
          nextNodeId: 'j3_a2_checkpoint_conclusao',
        },
      ],
    },

    // 14. What If: Ned Salvo Rumo à Muralha
    j3_a2_whatif_ned_na_muralha: {
      id: 'j3_a2_whatif_ned_na_muralha',
      titulo: 'O Manto Negro & O Resgate de Eddard Stark',
      anoHistorico: '298 d.C.',
      localizacao: 'Praça do Septo de Baelor',
      regionId: 'terras_da_coroa',
      fallbackText: `Sor Barristan Selmy e guardas leais à honra intervieram a tempo, segurando o braço de Ilyn Payne enquanto o Alto Septão amaldiçoava a quebra do solo sagrado! Envergonhada e temendo o motim popular, Cersei obrigou Joffrey a recuar.
      
Ned Stark teve os ferros trocados pelo manto negro da Patrulha da Noite e foi entregue imediatamente a Yoren para ser escoltado em segredo até Castelo Negro vivo!`,
      loreContext: {
        fonte: {
          arquivo_md: 'corpus_md/jornada_3_tronos/livro_1_a-guerra-dos-tronos_resumo-completo.md',
          livro: 'A Guerra dos Tronos',
          capitulo: 'Livro 1 - Porto Real',
        },
        notaHistorica: 'A Guerra dos Tronos (George R. R. Martin) - Tradução Jorge Candeias (LeYa)',
      },
      escolhas: [
        {
          id: 'esc_j3_a2_marchar_com_yoren_para_muralha',
          texto: 'Seguir pela Estrada do Rei com a caravana de Yoren sob o juramento do Manto Negro.',
          tipo: 'simples',
          nextNodeId: 'j3_a2_checkpoint_conclusao',
        },
        {
          id: 'esc_j3_a2_enviar_recado_clandestino_robb',
          texto: 'Despachar secretamente uma mensagem a Winterfell instruindo Robb a guardar o Norte.',
          tipo: 'teste_atributo',
          atributo: 'astucia',
          dc: 11,
          onSuccessNodeId: 'j3_a2_checkpoint_conclusao',
          onPartialFailureNodeId: 'j3_a2_checkpoint_conclusao',
        },
      ],
    },

    // Checkpoint do Ato 2
    j3_a2_checkpoint_conclusao: {
      id: 'j3_a2_checkpoint_conclusao',
      titulo: 'Conclusão do Ato II &bull; A Cabeça do Lobo na Estaca',
      anoHistorico: '298 d.C.',
      localizacao: 'Porto Real e Winterfell',
      regionId: 'norte',
      loreContext: {
        fonte: {
          arquivo_md: 'corpus_md/jornada_3_tronos/livro_1_a-guerra-dos-tronos_resumo-completo.md',
          livro: 'A Guerra dos Tronos',
          capitulo: 'Livro 1 - Porto Real',
        },
        notaHistorica: 'A Guerra dos Tronos (George R. R. Martin) - Tradução Jorge Candeias (LeYa)',
      },
      isEnding: true,
      fallbackText: `O Ato II encerra-se com a execução bárbara de Eddard Stark que destruiu qualquer esperança de paz. Robb Stark reuniu vinte mil homens e cruza o Gargalo marchando para o sul em fúria. A Guerra dos Cinco Reis começou de verdade. O Ato III aguarda.`,
      escolhas: [],
    },
  },
};
