import 'server-only';
import { GrafoJornada } from '@/server/engine/storyLinter';

export const grafoJ4Ato4: GrafoJornada = {
  id: 'jornada_4_muralha_ato4',
  titulo: 'Ato IV: A Contagem, A Batalha de Stannis & A Eleição do 998º',
  startNodeId: 'j4_a4_thorne_e_slynt_chegam',
  nodes: {
    // 1. Thorne e Slynt Chegam de Vigilância do Mar
    j4_a4_thorne_e_slynt_chegam: {
      id: 'j4_a4_thorne_e_slynt_chegam',
      titulo: 'Os Nobres de Vigilância do Mar',
      anoHistorico: '300 d.C.',
      localizacao: 'Pátio Central, Castelo Negro',
      regionId: 'castelo_negro',
      fallbackText: `Cavalos frescos e lanças bem engraxadas entram pelo portão leste. Uma coluna de reforços de Vigilância do Mar chega liderada por Sor Alliser Thorne e Janos Slynt — o ex-comandante dos Mantos Dourados de Porto Real, exilado para o Muro pelo Duende Tyrion Lannister.
      
Slynt usa um pesado casaco de peles forrado de veludo escuro e tem a cara vermelha e inflada de um sapo gordo. Ao ver os destroços da escadaria e Jon Snow claudicando à frente dos homens, Thorne aponta um dedo acusador:
— Aí está ele! O bastardo desertor! Fugiu com os selvagens, dividiu a tenda com uma cadela ruiva e agora se proclama o senhor de Castelo Negro!
      
Janos Slynt franze o cenho espesso e ladra ordens aos guardas:
— Peguem esse traidor! Quebrem os joelhos dele se resistir! Ele vai para as celas de gelo até armarmos a forca!`,
      internalVoices: [
        {
          atributo: 'cortesia',
          resultadoPassivo: 'SUCESSO',
          dcPassiva: 10,
          fala: 'Janos Slynt é um bajulador covarde que comprou títulos com ouro sujo de traições no sul. Enfrentá-lo abertamente sem apoio pode ser fatal.',
        },
        {
          atributo: 'comando',
          resultadoPassivo: 'SUCESSO',
          dcPassiva: 10,
          fala: 'Jon sangrou para salvar o castelo enquanto esses dois estavam comendo salmão fumado à beira-mar.',
        },
      ],
      loreContext: {
        fonte: {
          arquivo_md: 'corpus_md/jornada_3_tronos/livro_3_a-tormenta-de-espadas_resumo-completo.md',
          livro: 'A Tormenta de Espadas',
          capitulo: 'Jon IX',
        },
        notaHistorica: 'Âncora: C18, C29. A chegada de Thorne e Janos Slynt e a acusação de deserção contra Jon Snow.',
      },
      escolhas: [
        {
          id: 'esc_j4_a4_interpor_espada_proteger_jon',
          texto: 'Dar um passo à frente de Jon Snow com a mão na empunhadura da espada e contestar a autoridade de Slynt.',
          tipo: 'teste_atributo',
          atributo: 'comando',
          dc: 10,
          onSuccessNodeId: 'j4_a4_celas_de_gelo',
          onPartialFailureNodeId: 'j4_a4_celas_de_gelo',
          delta: { aprovacaoCompanheiros: { jon_snow: 25, alliser_thorne: -20 }, honra: 1 },
        },
        {
          id: 'esc_j4_a4_recuar_e_buscar_aemon',
          texto: 'Conter os outros irmãos e correr imediatamente à torre de Meistre Aemon para impedir uma execução sumária.',
          tipo: 'simples',
          aprovacaoCompanheiros: { aemon: 15 },
          delta: { flagsAdicionadas: ['buscou_ajuda_aemon'], compostura: 1 },
          nextNodeId: 'j4_a4_celas_de_gelo',
        },
      ],
    },

    // 2. As Celas de Gelo
    j4_a4_celas_de_gelo: {
      id: 'j4_a4_celas_de_gelo',
      titulo: 'O Frio Mortal das Celas de Gelo',
      anoHistorico: '300 d.C.',
      localizacao: 'As Celas Escavadas no Gelo da Muralha',
      regionId: 'castelo_negro',
      fallbackText: `Jon Snow é jogado no fundo de uma cela escavada diretamente nas entranhas da colossal Muralha de gelo. O piso é gelo sólido, as paredes suam geada e o ar ali dentro é tão gélido que os pulmões ardem a cada respiração.
      
Do lado de fora das grades de ferro, Thorne e Slynt comemoram com vinho quente e pretendem enforcá-lo antes do anoitecer como um exemplo para a guarnição.
      
— Um bastardo não tem direitos de nobreza aqui — zomba Thorne pelas frestas. — O senhor Stark não está mais no Norte para protegê-lo com mentiras.`,
      internalVoices: [
        {
          atributo: 'erudicao',
          resultadoPassivo: 'SUCESSO',
          dcPassiva: 9,
          fala: 'As leis da Patrulha da Noite exigem um julgamento justo diante de um conselho de irmãos jurados, não uma sentença unilateral.',
        },
      ],
      loreContext: {
        fonte: {
          arquivo_md: 'corpus_md/jornada_3_tronos/livro_3_a-tormenta-de-espadas_resumo-completo.md',
          livro: 'A Tormenta de Espadas',
          capitulo: 'Jon IX',
        },
        notaHistorica: 'Âncora: C18. A prisão de Jon nas celas de gelo.',
      },
      escolhas: [
        {
          id: 'esc_j4_a4_levar_manto_la_jon_cela',
          texto: 'Subornar ou desafiar o carcereiro para entregar uma manta de lã e um cantil de caldo quente a Jon na cela.',
          tipo: 'teste_atributo',
          atributo: 'cortesia',
          dc: 9,
          onSuccessNodeId: 'j4_a4_a_palavra_de_aemon',
          onPartialFailureNodeId: 'j4_a4_a_palavra_de_aemon',
          delta: { aprovacaoCompanheiros: { jon_snow: 20 }, honra: 1 },
        },
        {
          id: 'esc_j4_a4_confrontar_janos_slynt',
          texto: 'Lembrar a Slynt na presença dos irmãos que Meistre Aemon e os homens da guarnição testemunharam a bravura de Jon.',
          tipo: 'simples',
          aprovacaoCompanheiros: { alliser_thorne: -15 },
          delta: { flagsAdicionadas: ['confrontou_slynt'] },
          nextNodeId: 'j4_a4_a_palavra_de_aemon',
        },
      ],
    },

    // 3. A Palavra de Meistre Aemon
    j4_a4_a_palavra_de_aemon: {
      id: 'j4_a4_a_palavra_de_aemon',
      titulo: 'O Sangue de Dragão Fala mais Alto',
      anoHistorico: '300 d.C.',
      localizacao: 'O Salão de Julgamento',
      regionId: 'castelo_negro',
      fallbackText: `A porta de carvalho do tribunal improvisado abre-se com um rangido pesado. Apoiado nos braços de Clydas e de vós, Meistre Aemon Targaryen entra lentamente no salão. Cego, encurvado por um século de invernos, ele parece frágil como um galho seco, mas quando ergue a voz, o silêncio desce instantâneo sobre a sala.
      
— Sor Alliser. Lorde Slynt. Vós sois recém-chegados a este castelo — diz Aemon, cada palavra afiada como obsidiana. — Jon Snow agiu sob ordens de Qhorin Meia-Mão para infiltrar os selvagens. Ele nos alertou sobre os Thenns. Ele lutou na escadaria quando outros fugiam. Vós não derramareis o sangue deste rapaz sob este teto enquanto eu viver.
      
Janos Slynt engole em seco, intimidado pelo peso de um Targaryen centenário que recusou a coroa de Westeros.`,
      internalVoices: [
        {
          atributo: 'erudicao',
          resultadoPassivo: 'SUCESSO',
          dcPassiva: 10,
          fala: 'Aemon evitou a forca, mas o rancor de Slynt e Thorne procurará uma saída ainda mais ardilosa e venenosa.',
        },
      ],
      loreContext: {
        fonte: {
          arquivo_md: 'corpus_md/jornada_3_tronos/livro_3_a-tormenta-de-espadas_resumo-completo.md',
          livro: 'A Tormenta de Espadas',
          capitulo: 'Jon IX',
        },
        notaHistorica: 'Âncora: C18, C24. Meistre Aemon intervém e impede a execução sumária de Jon por Janos Slynt.',
      },
      escolhas: [
        {
          id: 'esc_j4_a4_apoiar_meistre_aemon_publicamente',
          texto: 'Confirmar solenemente o relato de Aemon diante de todos os irmãos jurados no salão.',
          tipo: 'simples',
          aprovacaoCompanheiros: { aemon: 25, jon_snow: 20 },
          delta: { flagsAdicionadas: ['ea_aemon_dragao'], honra: 1, compostura: 1 },
          nextNodeId: 'j4_a4_o_emissario',
        },
        {
          id: 'esc_j4_a4_exigir_libertacao_imediata',
          texto: 'Exigir a retirada imediata de Jon das celas de gelo antes que o frio congele seus pés.',
          tipo: 'teste_atributo',
          atributo: 'comando',
          dc: 10,
          onSuccessNodeId: 'j4_a4_o_emissario',
          onPartialFailureNodeId: 'j4_a4_o_emissario',
          delta: { flagsAdicionadas: ['exigiu_libertacao_jon'] },
        },
      ],
    },

    // 4. O Emissário e a Missão Suicida
    j4_a4_o_emissario: {
      id: 'j4_a4_o_emissario',
      titulo: 'Uma Bandeira de Trégua Manchada de Sangue',
      anoHistorico: '300 d.C.',
      localizacao: 'A Armaria de Castelo Negro',
      regionId: 'castelo_negro',
      fallbackText: `Impossibilitados de enforcar Jon Snow, Thorne e Slynt urdem um plano maquiavélico. Convocam Jon e vós na armaria:
      
— Se o bastardo é tão inocente — sibila Janos Slynt com um sorriso torpe —, ele cavalgará além da Muralha sob um estandarte de trégua. Ele irá à tenda de Mance Rayder como emissário da Patrulha. Mas quando estiver a sós com o Rei-para-lá-da-Muralha... ele enterrará esta adaga na garganta de Mance. Ou os selvagens o degolam, ou ele volta como herói.
      
Jon olha para a lâmina fria. Sabe que matar um rei sob uma bandeira de paz é quebrar todas as leis dos deuses e dos homens, mas não há outra escolha para salvar o pescoço.`,
      internalVoices: [
        {
          atributo: 'pressagio',
          resultadoPassivo: 'SUCESSO',
          dcPassiva: 10,
          fala: 'É uma armadilha óbvia: Slynt espera que Mance esfole Jon vivo antes que ele consiga sacar o punhal.',
        },
      ],
      loreContext: {
        fonte: {
          arquivo_md: 'corpus_md/jornada_3_tronos/livro_3_a-tormenta-de-espadas_resumo-completo.md',
          livro: 'A Tormenta de Espadas',
          capitulo: 'Jon X',
        },
        notaHistorica: 'Âncora: C19. Slynt e Thorne enviam Jon como falso emissário para assassinar Mance Rayder.',
      },
      escolhas: [
        {
          id: 'esc_j4_a4_cavalgar_com_jon_como_escolta',
          texto: 'Apresentar-se como voluntário para cavalgar ao lado de Jon até a tenda de Mance Rayder.',
          tipo: 'simples',
          aprovacaoCompanheiros: { jon_snow: 30 },
          delta: { flagsAdicionadas: ['escoltou_jon_emissario'], honra: 2 },
          nextNodeId: 'j4_a4_parlamento_com_mance',
        },
        {
          id: 'esc_j4_a4_aconselhar_cautela_jon',
          texto: 'Aconselhar Jon a não sacar a adaga sem ouvir o que Mance Rayder realmente deseja.',
          tipo: 'teste_atributo',
          atributo: 'astucia',
          dc: 9,
          onSuccessNodeId: 'j4_a4_parlamento_com_mance',
          onPartialFailureNodeId: 'j4_a4_parlamento_com_mance',
          delta: { flagsAdicionadas: ['conselho_diplomatico_dado'] },
        },
      ],
    },

    // 5. Parlamento com Mance Rayder
    j4_a4_parlamento_com_mance: {
      id: 'j4_a4_parlamento_com_mance',
      titulo: 'A Tenda de Couros e a Trompa de Joramun',
      anoHistorico: '300 d.C.',
      localizacao: 'O Acampamento do Povo Livre na Floresta Assombrada',
      regionId: 'floresta_assombrada',
      fallbackText: `No interior da grande tenda real aquecida por braseiros de turfa, Mance Rayder recebe Jon e vós com uma tigela de hidromel quente. Mance veste seu manto negro remendado com seda escarlate de Asshai; no canto da tenda, sua mulher Dalla geme em trabalho de parto, assistida por sua irmã Val, a bela de olhos azuis como gelo.
      
Mance aponta para um objeto colocado sobre peles de urso: uma corneta colossal de oito pés de comprimento, feita de chifre de auroque ancestral, com anéis de ouro gravados com runas dos Primeiros Homens: a lendária Trompa de Joramun.
      
— Meus termos são simples, Jon Snow — diz Mance com gravidade fúnebre. — Abram o portão. Deixem meu povo passar para as terras do sul. Não queremos vossos castelos; queremos salvar nossos filhos dos Outros que marcham atrás de nós. Se recusardes... eu toco a Trompa de Inverno e a Muralha inteira desaba sobre vossas cabeças!`,
      internalVoices: [
        {
          atributo: 'cortesia',
          resultadoPassivo: 'SUCESSO',
          dcPassiva: 10,
          fala: 'Mance não está blefando por poder; ele está fugindo do horror indizível da Noite Eterna.',
        },
        {
          atributo: 'erudicao',
          resultadoPassivo: 'SUCESSO',
          dcPassiva: 10,
          fala: 'As lendas antigas dizem que Joramun tocou a trompa e acordou os gigantes da terra. Se for verdadeira, a ruína é certa.',
        },
      ],
      loreContext: {
        fonte: {
          arquivo_md: 'corpus_md/jornada_3_tronos/livro_3_a-tormenta-de-espadas_resumo-completo.md',
          livro: 'A Tormenta de Espadas',
          capitulo: 'Jon X',
        },
        notaHistorica: 'Âncora: C20, C31, C33. O parlamento na tenda de Mance; a Trompa de Joramun e o parto de Dalla.',
      },
      escolhas: [
        {
          id: 'esc_j4_a4_ganhar_tempo_dialogo',
          texto: 'Dialogar com Mance sobre o destino dos inocentes e o trabalho de parto de Dalla para ganhar tempo.',
          tipo: 'teste_atributo',
          atributo: 'cortesia',
          dc: 10,
          onSuccessNodeId: 'j4_a4_a_carga_de_stannis',
          onPartialFailureNodeId: 'j4_a4_a_carga_de_stannis',
          delta: { flagsAdicionadas: ['ea_trompa_de_joramun', 'compreendeu_mance'], compostura: 1 },
        },
        {
          id: 'esc_j4_a4_tentar_destruir_trompa',
          texto: 'Lançar-se para frente para tentar chutar a grande trompa no braseiro aceso.',
          tipo: 'teste_atributo',
          atributo: 'furia',
          dc: 11,
          onSuccessNodeId: 'j4_a4_a_carga_de_stannis',
          onPartialFailureNodeId: 'j4_a4_a_carga_de_stannis',
          delta: { flagsAdicionadas: ['tentou_destruir_trompa'] },
        },
      ],
    },

    // 6. A Carga de Stannis Baratheon
    j4_a4_a_carga_de_stannis: {
      id: 'j4_a4_a_carga_de_stannis',
      titulo: 'Trombetas de Ferro e o Coração Flamejante',
      anoHistorico: '300 d.C.',
      localizacao: 'As Margens da Floresta Assombrada',
      regionId: 'floresta_assombrada',
      fallbackText: `Antes que uma resposta possa ser dada, um som estrondoso rasga os céus: trombetas militares afinadas em prata e bronze soam do leste e do sul!
      
Três cunhas compactas de cavalaria blindada rompem a linha dos pinheiros a galope estrondoso. Mil cavaleiros com armaduras prateadas empunhando lanças e espadas, acompanhados pelos batedores de Cotter Pyke de Vigilância do Mar, caem como um raio sobre o flanco desprotegido do acampamento selvagem! E à frente da formação central, sob o grande estandarte amarelo com o veado coroado dentro de um coração em chamas, cavalga o Rei Stannis Baratheon!
      
O acampamento dos selvagens colapsa em segundos: guerreiros fogem em pânico, o cavalo de Mance é derrubado e a muralha de lanças esmaga toda a resistência!`,
      internalVoices: [
        {
          atributo: 'furia',
          resultadoPassivo: 'SUCESSO',
          dcPassiva: 11,
          fala: 'A carga de cavalaria é avassaladora! Proteger a tenda de Dalla e seu bebê recém-nascido no meio do caos ou ser atropelado pelos corcéis de guerra!',
        },
      ],
      loreContext: {
        fonte: {
          arquivo_md: 'corpus_md/jornada_3_tronos/livro_3_a-tormenta-de-espadas_resumo-completo.md',
          livro: 'A Tormenta de Espadas',
          capitulo: 'Jon X',
        },
        notaHistorica: 'Âncora: C20. A chegada fulminante de Stannis Baratheon e Cotter Pyke destroçando o exército de Mance Rayder.',
      },
      escolhas: [
        {
          id: 'esc_j4_a4_proteger_val_e_bebe_dalla',
          texto: 'Erguer o escudo na entrada da tenda para proteger Val e o filho recém-nascido de Dalla da carga.',
          tipo: 'teste_atributo',
          atributo: 'furia',
          dc: 11,
          riscoMortal: true,
          onSuccessNodeId: 'j4_a4_o_rei_na_torre',
          onPartialFailureNodeId: 'j4_a4_o_rei_na_torre',
          onCriticalFailureNodeId: 'j4_end_morte_tocha_na_neve',
          delta: { flagsAdicionadas: ['protegeu_filho_de_mance', 'nome_selvagem_val'], honra: 2 },
        },
        {
          id: 'esc_j4_a4_capturar_estandarte_mance',
          texto: 'Juntar-se à guarda de Stannis na captura de Mance Rayder e na contenção dos chefes de clã.',
          tipo: 'teste_atributo',
          atributo: 'comando',
          dc: 10,
          onSuccessNodeId: 'j4_a4_o_rei_na_torre',
          onPartialFailureNodeId: 'j4_a4_o_rei_na_torre',
          delta: { flagsAdicionadas: ['ajudou_captura_mance'] },
        },
      ],
    },

    // 7. O Rei na Torre
    j4_a4_o_rei_na_torre: {
      id: 'j4_a4_o_rei_na_torre',
      titulo: 'O Julgamento de Ferro de Stannis Baratheon',
      anoHistorico: '300 d.C.',
      localizacao: 'A Torre do Rei, Castelo Negro',
      regionId: 'castelo_negro',
      fallbackText: `A vitória de Stannis é completa: mil guerreiros selvagens mortos, mais de mil prisioneiros acorrentados e Mance Rayder preso em correntes de ferro.
      
Na Torre do Rei, Stannis Baratheon senta-se diante de uma mesa tosca, seu rosto lívido e magro marcado por linhas duras como granito. Ao lado dele, a espada Luminífera brilha com uma luz trêmula avermelhada.
      
— Donal Noye me conhecia melhor do que a maioria — diz Stannis friamente, olhando para Jon e vós. — Ele disse que Robert era o aço verdadeiro e eu era o ferro que quebra antes de dobrar. Mas eu salvei este reino enquanto o rapaz Joffrey brincava com bonecas de ouro em Porto Real.
      
O rei vira-se para Jon Snow com uma oferta tentadora:
— Dobre o joelho perante o Senhor da Luz, queime os represeiros e eu o legitimarei perante os Sete Reinos como Jon Stark, Lorde de Winterfell!`,
      internalVoices: [
        {
          atributo: 'erudicao',
          resultadoPassivo: 'SUCESSO',
          dcPassiva: 10,
          fala: 'A legitimidade e o nome Stark foram o sonho secreto de Jon por toda a sua infância. Mas o preço é renegar seus deuses antigos e quebrar o voto da Patrulha.',
        },
      ],
      loreContext: {
        fonte: {
          arquivo_md: 'corpus_md/jornada_3_tronos/livro_3_a-tormenta-de-espadas_resumo-completo.md',
          livro: 'A Tormenta de Espadas',
          capitulo: 'Jon XI',
        },
        notaHistorica: 'Âncora: C21, C25, C32. Stannis na Torre do Rei elogia Donal Noye e oferece legitimar Jon como Senhor de Winterfell.',
      },
      escolhas: [
        {
          id: 'esc_j4_a4_lembrar_juramento_voto',
          texto: 'Murmurar a Jon: «A noite se aproxima e o vosso manto é negro, irmão». Reforçar a fidelidade ao Voto.',
          tipo: 'simples',
          aprovacaoCompanheiros: { jon_snow: 25 },
          delta: { flagsAdicionadas: ['fidelidade_ao_voto_lembrada'], honra: 2 },
          nextNodeId: 'j4_a4_prisioneiros_do_povo_livre',
        },
        {
          id: 'esc_j4_a4_prestar_continencia_a_stannis',
          texto: 'Agradecer a Stannis pela salvação de Castelo Negro em nome dos irmãos juramentados.',
          tipo: 'simples',
          delta: { flagsAdicionadas: ['grato_a_stannis', 'ea_stannis_ferro'], compostura: 1 },
          nextNodeId: 'j4_a4_prisioneiros_do_povo_livre',
        },
      ],
    },

    // 8. Prisioneiros do Povo Livre
    j4_a4_prisioneiros_do_povo_livre: {
      id: 'j4_a4_prisioneiros_do_povo_livre',
      titulo: 'As Correntes do Povo Livre',
      anoHistorico: '300 d.C.',
      localizacao: 'Os Cercados Provisórios de Castelo Negro',
      regionId: 'castelo_negro',
      fallbackText: `Mais de mil selvagens estão amontoados em currais improvisados no pátio congelado. Crianças com os lábios roxos de frio tremem sob peles rotas; homens feridos gemem sem ataduras e as mulheres guardam silêncio altivo perante os cavaleiros sulistas de Stannis.
      
Sor Alliser Thorne e Janos Slynt defendem colocá-los todos na forca ou despachá-los amarrados para as minas de sal. Mas Val e as mães livres olham nos vossos olhos, implorando por água e pão preto.`,
      internalVoices: [
        {
          atributo: 'cortesia',
          resultadoPassivo: 'SUCESSO',
          dcPassiva: 9,
          fala: 'Eles são seres humanos de carne e osso, não monstros. Tratar os prisioneiros com misericórdia mudará a história da Muralha para sempre.',
        },
      ],
      loreContext: {
        fonte: {
          arquivo_md: 'corpus_md/jornada_3_tronos/livro_3_a-tormenta-de-espadas_resumo-completo.md',
          livro: 'A Tormenta de Espadas',
          capitulo: 'Jon XI',
        },
        notaHistorica: 'Âncora: C20. Os cativos do Povo Livre e o debate sobre seu destino.',
      },
      escolhas: [
        {
          id: 'esc_j4_a4_levar_comida_e_agua_prisioneiros',
          texto: 'Convencer Hobb a cozinhar panelões extras de aveia para alimentar as crianças e mães cativas.',
          tipo: 'simples',
          delta: { flagsAdicionadas: ['misericordia_ao_povo_livre', 'nome_selvagem_criancas'], honra: 1, compostura: 1 },
          nextNodeId: 'j4_a4_sam_e_gilly_chegam',
        },
        {
          id: 'esc_j4_a4_manter_vigia_rigida_currais',
          texto: 'Obedecer às ordens de guarda estrita para impedir motins e rebeliões no acampamento.',
          tipo: 'simples',
          aprovacaoCompanheiros: { alliser_thorne: 10 },
          delta: { flagsAdicionadas: ['disciplina_militar_rigida'] },
          nextNodeId: 'j4_a4_sam_e_gilly_chegam',
        },
      ],
    },

    // 9. Samwell e Gilly Chegam
    j4_a4_sam_e_gilly_chegam: {
      id: 'j4_a4_sam_e_gilly_chegam',
      titulo: 'O Retorno de Samwell Tarly e os Três Comandantes',
      anoHistorico: '300 d.C.',
      localizacao: 'O Portão da Guarda',
      regionId: 'castelo_negro',
      fallbackText: `Pela estrada do oeste, uma nova comitiva surge na neve. É Samwell Tarly, ainda gordo mas com o rosto marcado pela jornada além do Muro, trazendo Goiva e seu bebê a salvo.
      
Com eles marcham os comandantes restantes da Patrulha: Sor Denys Mallister, o idoso e cortês senhor da Torre Sombria, e Cotter Pyke, o marinheiro rude de Vigilância do Mar, além de Bowen Marsh, com a cabeça envolta em ataduras sangrentas após a terrível carnificina contra o Chorão na Ponte das Caveiras.
      
Com a liderança reunida, Stannis exige uma solução imediata: a Patrulha da Noite precisa eleger seu 998º Senhor Comandante!`,
      internalVoices: [
        {
          atributo: 'cortesia',
          resultadoPassivo: 'SUCESSO',
          dcPassiva: 9,
          fala: 'Samwell sobreviveu ao Punho, aos mortos e à floresta. Sua timidez esconde agora uma mente afiada e leal.',
        },
      ],
      loreContext: {
        fonte: {
          arquivo_md: 'corpus_md/jornada_3_tronos/livro_3_a-tormenta-de-espadas_resumo-completo.md',
          livro: 'A Tormenta de Espadas',
          capitulo: 'Samwell IV',
        },
        notaHistorica: 'Âncora: C22. A volta de Samwell, Goiva, Mallister e Marsh ferido para a eleição.',
      },
      escolhas: [
        {
          id: 'esc_j4_a4_abracar_samwell_retorno',
          texto: 'Abraçar Samwell Tarly com calor fraternal e ajudá-lo a instalar Goiva e a criança em segurança.',
          tipo: 'simples',
          aprovacaoCompanheiros: { samwell: 30 },
          delta: { flagsAdicionadas: ['samwell_acolhido_irmandade', 'nome_goiva'], compostura: 1 },
          nextNodeId: 'j4_a4_a_escolha_comeca',
        },
        {
          id: 'esc_j4_a4_ouvir_relato_mallister_marsh',
          texto: 'Acompanhar o relatório militar de Mallister e Marsh sobre a vitória na Ponte das Caveiras.',
          tipo: 'simples',
          delta: { flagsAdicionadas: ['relato_ponte_caveiras_ouvido'] },
          nextNodeId: 'j4_a4_a_escolha_comeca',
        },
      ],
    },

    // 10. A Escolha Começa: A Eleição do Senhor Comandante
    j4_a4_a_escolha_comeca: {
      id: 'j4_a4_a_escolha_comeca',
      titulo: 'Os Caldeirões de Ferro e os Votos da Noite',
      anoHistorico: '300 d.C.',
      localizacao: 'O Grande Salão Comum de Castelo Negro',
      regionId: 'castelo_negro',
      fallbackText: `O grande salão comum está lotado até as vigas. Centenas de irmãos juramentados vestindo seus mantos negros sentam-se ombro a ombro enquanto os caldeirões de ferro são colocados sobre a mesa do conselho.
      
Pela lei ancestral da Patrulha da Noite, o Senhor Comandante só é eleito quando um candidato alcança dois terços dos votos de todos os irmãos. Moedas de cobre, conchas, botões de chumbo e seixos de pedra representam os votos de cada homem.
      
Sor Denys Mallister tem o apoio dos cavaleiros e homens honrados; Cotter Pyke tem o voto dos homens do mar e dos arqueiros; e Janos Slynt distribui favores, comida fresca e promessas de títulos para comprar os votos dos mais fracos.`,
      internalVoices: [
        {
          atributo: 'astucia',
          resultadoPassivo: 'SUCESSO',
          dcPassiva: 9,
          fala: 'A rivalidade ferrenha entre Mallister e Pyke impede que qualquer um atinja os dois terços. Se continuarem assim, Janos Slynt pode roubar o comando.',
        },
      ],
      loreContext: {
        fonte: {
          arquivo_md: 'corpus_md/jornada_3_tronos/livro_3_a-tormenta-de-espadas_resumo-completo.md',
          livro: 'A Tormenta de Espadas',
          capitulo: 'Samwell V',
        },
        notaHistorica: 'Âncora: C23. O sistema de eleição por dois terços com caldeirões de ferro.',
      },
      escolhas: [
        {
          id: 'esc_j4_a4_depositar_seixo_nos_caldeiroes',
          texto: 'Depositar o vosso seixo de voto e ouvir o debate acalorado entre as facções.',
          tipo: 'simples',
          delta: { flagsAdicionadas: ['voto_depositado'], honra: 1 },
          nextNodeId: 'j4_a4_os_dias_longos',
        },
        {
          id: 'esc_j4_a4_procurar_samwell_conspiracao',
          texto: 'Aproximar-se de Samwell Tarly nos cantos da sala para entender o que ele trama em silêncio.',
          tipo: 'teste_atributo',
          atributo: 'astucia',
          dc: 9,
          onSuccessNodeId: 'j4_a4_os_dias_longos',
          onPartialFailureNodeId: 'j4_a4_os_dias_longos',
          delta: { aprovacaoCompanheiros: { samwell: 15 } },
        },
      ],
    },

    // 11. Os Dias Longos e o Impasse
    j4_a4_os_dias_longos: {
      id: 'j4_a4_os_dias_longos',
      titulo: 'Dias de Disputa e a Panela de Votos de Hobb',
      anoHistorico: '300 d.C.',
      localizacao: 'O Salão Comum de Castelo Negro',
      regionId: 'castelo_negro',
      fallbackText: `Sete dias se passam em votações diárias infrutíferas. A cada contagem ao fim da tarde, a contenda recomeça: Mallister alcança duzentos votos; Cotter Pyke quase duzentos; Thorne perde fôlego e Bowen Marsh retira seu nome para apoiar abertamente Janos Slynt.
      
Em uma das noites, uma gargalhada estrondosa sacode o salão: quando Clydas vira o pote dos intendentes, cinco feijões negros foram depositados para o cozinheiro Hobb Três-Dedos!
      
— Se votarem em mim — grita Hobb com uma concha na mão —, prometo que nunca mais sirvo carneiro velho nem caldo sem pimenta!
      
Mas a paciência do Rei Stannis está esgotando-se: ele avisa que se a Patrulha não escolher um líder até o dia seguinte, ele mesmo nomeará um governante militar para o Muro!`,
      internalVoices: [
        {
          atributo: 'cortesia',
          resultadoPassivo: 'SUCESSO',
          dcPassiva: 10,
          fala: 'Stannis não hesitará em tomar o comando. Precisamos de um milagre político antes da aurora.',
        },
      ],
      loreContext: {
        fonte: {
          arquivo_md: 'corpus_md/jornada_3_tronos/livro_3_a-tormenta-de-espadas_resumo-completo.md',
          livro: 'A Tormenta de Espadas',
          capitulo: 'Samwell V',
        },
        notaHistorica: 'Âncora: C23. O impasse na eleição, os votos em Hobb e a ameaça de Stannis.',
      },
      escolhas: [
        {
          id: 'esc_j4_a4_ajudar_samwell_conversar_pyke_mallister',
          texto: 'Ajudar Samwell a circular furtivamente entre as mesas de Pyke e Mallister para costurar o acordo.',
          tipo: 'teste_atributo',
          atributo: 'cortesia',
          dc: 10,
          onSuccessNodeId: 'j4_a4_a_jogada_de_sam',
          onPartialFailureNodeId: 'j4_a4_a_jogada_de_sam',
          delta: { flagsAdicionadas: ['ea_cinco_votos_de_hobb', 'articulacao_politica_sam'], compostura: 1 },
        },
        {
          id: 'esc_j4_a4_rir_da_piada_de_hobb',
          texto: 'Rir com Grenn e Pyp da ousadia dos votos em Hobb e tentar acalmar os ânimos exaltados.',
          tipo: 'simples',
          aprovacaoCompanheiros: { pyp: 15, grenn: 15 },
          delta: { flagsAdicionadas: ['ea_cinco_votos_de_hobb'] },
          nextNodeId: 'j4_a4_a_jogada_de_sam',
        },
      ],
    },

    // 12. A Jogada de Mestre de Samwell Tarly
    j4_a4_a_jogada_de_sam: {
      id: 'j4_a4_a_jogada_de_sam',
      titulo: 'A Diplomacia Oculta do Rapaz Gordo',
      anoHistorico: '300 d.C.',
      localizacao: 'Os Quartéis dos Oficiais',
      regionId: 'castelo_negro',
      fallbackText: `Na calada da noite anterior à votação final, Samwell Tarly revela a genialidade herdada da Casa Tarly. Ele vai aos aposentos de Cotter Pyke e depois aos de Sor Denys Mallister com a mesma pergunta delicada:
      
— Nenhum dos senhores aceitará ver o rival comandando o Muro — sussurra Sam com humildade respeitosa. — Mas os senhores permitiriam que um vassalo corrupto dos Lannister como Janos Slynt assumisse o manto do Velho Urso?
      
Ambos os comandantes recusam Slynt com repulsa. Então Sam propõe a solução:
— O rapaz Jon Snow. Filho de Eddard Stark. Sangue do Norte. Lutou na escadaria e não deve lealdade a nenhuma das duas facções.
      
Na manhã seguinte, no salão comum, o nome de Jon Snow é formally apresentado para a votação!`,
      internalVoices: [
        {
          atributo: 'astucia',
          resultadoPassivo: 'SUCESSO',
          dcPassiva: 10,
          fala: 'A manobra foi perfeita. Samwell Tarly orquestrou o destino de Westeros sem desembainhar uma única espada.',
        },
      ],
      loreContext: {
        fonte: {
          arquivo_md: 'corpus_md/jornada_3_tronos/livro_3_a-tormenta-de-espadas_resumo-completo.md',
          livro: 'A Tormenta de Espadas',
          capitulo: 'Samwell V',
        },
        notaHistorica: 'Âncora: C23. Sam convence Cotter Pyke e Denys Mallister a apoiarem Jon Snow.',
      },
      escolhas: [
        {
          id: 'esc_j4_a4_acompanhar_sam_ao_salão',
          texto: 'Caminhar ao lado de Samwell Tarly e Pyp rumo ao salão para a contagem final dos votos.',
          tipo: 'simples',
          aprovacaoCompanheiros: { samwell: 25 },
          delta: { flagsAdicionadas: ['testemunhou_jogada_sam'], compostura: 1 },
          nextNodeId: 'j4_a4_o_corvo_no_ombro',
        },
        {
          id: 'esc_j4_a4_votar_em_jon_snow',
          texto: 'Pegar o vosso seixo negro e depositá-lo firmemente no caldeirão em nome de Jon Snow.',
          tipo: 'simples',
          aprovacaoCompanheiros: { jon_snow: 30 },
          delta: { flagsAdicionadas: ['votou_em_jon_snow'], honra: 2 },
          nextNodeId: 'j4_a4_o_corvo_no_ombro',
        },
      ],
    },

    // 13. O Corvo no Ombro
    j4_a4_o_corvo_no_ombro: {
      id: 'j4_a4_o_corvo_no_ombro',
      titulo: 'Três Palavras de Pena Negra',
      anoHistorico: '300 d.C.',
      localizacao: 'O Estrado do Grande Salão',
      regionId: 'castelo_negro',
      fallbackText: `O silêncio no salão é tão absoluto que se pode ouvir a geada estalando nos caibros do telhado. Clydas e Meistre Aemon aproximam-se do último caldeirão de ferro lacrado.
      
Quando o velho meistre ergue a pesada tampa de ferro, um farfalhar violento de penas negras ecoa de dentro do vaso! Um corvo enorme e brilhante — o pássaro do próprio falecido Senhor Comandante Jeor Mormont — bate as asas, sobe em um voo circular pelo salão e desce direto sobre o ombro esquerdo de Jon Snow!
      
O corvo estica o bico afiado, fita a multidão de irmãos boquiabertos e grita com sua voz rouca e gutural:
— Snow! Snow! Snow!
      
Uma onda de espanto e reverência percorre a sala. Os deuses falaram.`,
      internalVoices: [
        {
          atributo: 'pressagio',
          resultadoPassivo: 'SUCESSO',
          dcPassiva: 9,
          fala: 'O corvo do Velho Urso escolheu seu herdeiro diante de todos os homens da Muralha. Não há homem vivo que possa contestar este sinal.',
        },
      ],
      loreContext: {
        fonte: {
          arquivo_md: 'corpus_md/jornada_3_tronos/livro_3_a-tormenta-de-espadas_resumo-completo.md',
          livro: 'A Tormenta de Espadas',
          capitulo: 'Jon XII',
        },
        notaHistorica: 'Âncora: C23. O corvo de Mormont pousa no ombro de Jon gritando «Snow!».',
      },
      escolhas: [
        {
          id: 'esc_j4_a4_gritar_viva_lorde_comandante',
          texto: 'Erguer a lâmina ao alto e liderar o clamor do salão: «Lorde Snow! O 998º Senhor Comandante!»',
          tipo: 'simples',
          aprovacaoCompanheiros: { jon_snow: 30 },
          delta: { flagsAdicionadas: ['ea_lorde_snow', 'aclamou_jon_snow'], compostura: 2, honra: 1 },
          nextNodeId: 'j4_a4_o_998_senhor_comandante',
        },
        {
          id: 'esc_j4_a4_olhar_derrota_de_slynt',
          texto: 'Observar a face lívida e derrotada de Janos Slynt e Alliser Thorne enquanto o salão explode em vivas.',
          tipo: 'simples',
          aprovacaoCompanheiros: { alliser_thorne: -20 },
          delta: { flagsAdicionadas: ['testemunhou_queda_slynt'] },
          nextNodeId: 'j4_a4_o_998_senhor_comandante',
        },
      ],
    },

    // 14. O 998º Senhor Comandante
    j4_a4_o_998_senhor_comandante: {
      id: 'j4_a4_o_998_senhor_comandante',
      titulo: 'O 998º Senhor Comandante da Patrulha da Noite',
      anoHistorico: '300 d.C.',
      localizacao: 'O Estrado do Grande Salão',
      regionId: 'castelo_negro',
      fallbackText: `Meistre Aemon toma a mão de Jon Snow e ergue-a para a assembleia:
— Jon Snow é o nosso 998º Senhor Comandante da Patrulha da Noite!
      
Os homens batem os pés nas tábuas do chão; canecos de cerveja tilintam e abraços fraternais ecoam de ponta a ponta. Jon Snow, com Garra Longa à cinta e os olhos cinzentos brilhando de serenidade firme, olha para os irmãos sobreviventes.
      
Ele não esqueceu quem esteve ao seu lado na escadaria em chamas, no portão escuro e na defesa dos inocentes. O olhar de Jon cruza o vosso:
— O inverno está sobre nós, irmãos — diz Jon com voz mansa e firme. — E nós temos um reino inteiro para salvar.`,
      internalVoices: [
        {
          atributo: 'comando',
          resultadoPassivo: 'SUCESSO',
          dcPassiva: 10,
          fala: 'A batalha terminou, mas o dever eterno apenas começou. Vossa conduta neste cerco definiu quem vós sois.',
        },
      ],
      loreContext: {
        fonte: {
          arquivo_md: 'corpus_md/jornada_3_tronos/livro_3_a-tormenta-de-espadas_resumo-completo.md',
          livro: 'A Tormenta de Espadas',
          capitulo: 'Jon XII',
        },
        notaHistorica: 'Âncora: C23. Jon é oficializado como o 998º Senhor Comandante da Patrulha da Noite.',
      },
      escolhas: [
        {
          id: 'esc_j4_a4_ir_ao_livro_dos_nomes',
          texto: 'Retirar-se para o vosso beliche e contemplar o vosso legado na Muralha (Avançar para o Veredito Final).',
          tipo: 'simples',
          delta: { marcoConcluido: 'jornada4_concluida' },
          nextNodeId: 'j4_a4_o_livro_dos_nomes',
        },
        {
          id: 'esc_j4_a4_brindar_com_pyp_grenn',
          texto: 'Brindar com Pyp e Grenn à honra do novo Comandante antes de recolher-se à biblioteca.',
          tipo: 'simples',
          aprovacaoCompanheiros: { pyp: 15, grenn: 15 },
          delta: { marcoConcluido: 'jornada4_concluida', compostura: 2 },
          nextNodeId: 'j4_a4_o_livro_dos_nomes',
        },
      ],
    },

    // 15. O Livro dos Nomes (Hub de Veredito Final)
    j4_a4_o_livro_dos_nomes: {
      id: 'j4_a4_o_livro_dos_nomes',
      titulo: 'O Livro dos Nomes: A Encruzilhada do Destino',
      anoHistorico: '300 d.C.',
      localizacao: 'A Biblioteca de Castelo Negro',
      regionId: 'castelo_negro',
      fallbackText: `A calmaria desce sobre a fortaleza congelada. Nas mesas da velha biblioteca onde a luz fraca de velas de sebo espanta a escuridão, repousa um pesado tomo encadernado em couro negro de carneiro: o registro dos homens da Patrulha da Noite.
      
Nenhum corvo comum recebe cantigas de menestréis no sul. Mas a Muralha não esquece. Vossas escolhas, vosso sangue derramado nas vigas e vossas palavras forjaram um nome que ecoará pelos séculos de gelo.
      
Qual é o vosso desígnio derradeiro, irmão juramentado?`,
      internalVoices: [
        {
          atributo: 'pressagio',
          resultadoPassivo: 'SUCESSO',
          dcPassiva: 10,
          fala: 'O livro está aberto diante de vós. Escolhei como vossa lenda será lembrada pelas gerações futuras.',
        },
      ],
      loreContext: {
        fonte: {
          arquivo_md: 'corpus_md/jornada_3_tronos/livro_3_a-tormenta-de-espadas_resumo-completo.md',
          livro: 'A Tormenta de Espadas',
          capitulo: 'Jon XII',
        },
        notaHistorica: 'Hub de veredito final da Jornada 4 «Irmão Sem Nome». Ponto de convergência para os 6 finais canônicos.',
      },
      escolhas: [
        {
          id: 'esc_j4_end_nome_na_lista',
          texto: 'Apresentar-se a Lorde Snow como batedor de confiança e oficial de campo (Final: Nome na Lista de Jon).',
          tipo: 'simples',
          nextNodeId: 'j4_end_nome_na_lista_de_jon',
        },
        {
          id: 'esc_j4_end_corvo_de_passagem',
          texto: 'Retornar silenciosamente ao vosso posto de vigia nos parapeitos como mais um irmão (Final: Corvo de Passagem).',
          tipo: 'simples',
          nextNodeId: 'j4_end_corvo_de_passagem',
        },
        {
          id: 'esc_j4_end_pira_das_duas_gentes',
          texto: 'Assumir a missão de integrar e proteger os refugiados do Povo Livre na Dádiva (Final: A Pira das Duas Gentes).',
          tipo: 'simples',
          nextNodeId: 'j4_end_pira_das_duas_gentes',
        },
        {
          id: 'esc_j4_end_voto_da_guarda_velha',
          texto: 'Permanecer fiel à linha dura tradicional de Alliser Thorne e Bowen Marsh (Final: O Voto da Guarda Velha).',
          tipo: 'simples',
          nextNodeId: 'j4_end_voto_da_guarda_velha',
        },
        {
          id: 'esc_j4_end_capa_virada',
          texto: 'Aproveitar a confusão do cerco para abandonar o manto negro e fugir para o norte livre (Final: Capa Virada).',
          tipo: 'simples',
          nextNodeId: 'j4_end_capa_virada',
        },
        {
          id: 'esc_j4_end_livro_dos_nomes',
          texto: 'Ficar como escriba da biblioteca ao lado de Meistre Aemon registrando os mortos (Final: O Livro dos Nomes).',
          tipo: 'simples',
          nextNodeId: 'j4_end_livro_dos_nomes',
        },
      ],
    },

    // =========================================================================
    // OS 6 FINAIS PRINCIPAIS (isEnding: true)
    // =========================================================================

    // F1. Nome na Lista de Jon
    j4_end_nome_na_lista_de_jon: {
      id: 'j4_end_nome_na_lista_de_jon',
      titulo: 'Final I: O Nome na Lista de Jon',
      anoHistorico: '300 d.C.',
      localizacao: 'Torre do Senhor Comandante',
      regionId: 'castelo_negro',
      isEnding: true,
      fallbackText: `Vosso nome foi inscrito com tinta fresca pelo punho do próprio Jon Snow no rol dos batedores de elite de Castelo Negro. Quando o novo Senhor Comandante convoca o conselho de guerra para planejar o acolhimento dos selvagens e o reforço dos castelos abandonados, vós estais ao lado dele na cabeceira da mesa.
      
Vós não sois mais um estranho sem rosto nas casernas; vós sois o homem que guardou as costas de Jon quando o aço ardia e as intrigas queriam enforcá-lo. Enquanto a Patrulha da Noite permanecer de pé no fim do mundo, vosso juramento será o alicerce da nova era da Muralha.`,
      loreContext: {
        fonte: {
          arquivo_md: 'corpus_md/jornada_3_tronos/livro_3_a-tormenta-de-espadas_resumo-completo.md',
          livro: 'A Tormenta de Espadas',
          capitulo: 'Jon XII',
        },
        notaHistorica: 'Final F1: Lealdade ao 998º Senhor Comandante Jon Snow e reconhecimento como irmão de confiança.',
      },
      escolhas: [],
    },

    // F2. Corvo de Passagem
    j4_end_corvo_de_passagem: {
      id: 'j4_end_corvo_de_passagem',
      titulo: 'Final II: Corvo de Passagem',
      anoHistorico: '300 d.C.',
      localizacao: 'O Topo da Muralha sob a Neve',
      regionId: 'topo_da_muralha',
      isEnding: true,
      fallbackText: `Quando a eleição termina e os vivas silenciam, vós colocais a luva de couro grosso, ajeitais a capa esfarrapada e tomais o guincho de volta para o topo da Muralha.
      
O vento uiva feroz vindo do norte distante, trazendo os primeiros flocos pesados do verdadeiro inverno. Nenhum bardo no sul cantará vossas façanhas; nenhum rei vos cobrirá de ouro. Mas lá embaixo, do outro lado do abismo de gelo, milhões de almas dormem em paz porque vós e vossos irmãos anônimos continuais de pé na sentinela. Vós sois a espada na escuridão, o vigia nas muralhas... um corvo de passagem que cumpriu seu voto até o fim.`,
      loreContext: {
        fonte: {
          arquivo_md: 'corpus_md/jornada_3_tronos/livro_3_a-tormenta-de-espadas_resumo-completo.md',
          livro: 'A Tormenta de Espadas',
          capitulo: 'Jon XII',
        },
        notaHistorica: 'Final F2: A sobrevivência digna do irmão juramentado anônimo no posto eterno da sentinela.',
      },
      escolhas: [],
    },

    // F3. A Pira das Duas Gentes
    j4_end_pira_das_duas_gentes: {
      id: 'j4_end_pira_das_duas_gentes',
      titulo: 'Final III: A Pira das Duas Gentes',
      anoHistorico: '300 d.C.',
      localizacao: 'A Dádiva de Brandon',
      regionId: 'a_dadiva',
      isEnding: true,
      fallbackText: `Vós fostes nomeado pelo Senhor Comandante Jon Snow para supervisionar o assentamento dos clãs do Povo Livre nas aldeias abandonadas da Dádiva.
      
Onde antes havia apenas medo e sangue derramado, vossa voz ergueu pontes de respeito mútuo. Val e os guerreiros livres chamam-vos de irmão que não mente; os corvos negros da Patrulha aprendem a marchar ao lado de lanceiras selvagens. Ao entardecer, quando as fogueiras se acendem nos vales ao sul da Muralha, homens livres e irmãos negros sentam-se à mesma mesa, unidos pelo mesmo fogo contra a longa noite que se aproxima.`,
      loreContext: {
        fonte: {
          arquivo_md: 'corpus_md/jornada_3_tronos/livro_3_a-tormenta-de-espadas_resumo-completo.md',
          livro: 'A Tormenta de Espadas',
          capitulo: 'Jon XII',
        },
        notaHistorica: 'Final F3: A reconciliação entre a Patrulha da Noite e o Povo Livre além da Muralha.',
      },
      escolhas: [],
    },

    // F4. O Voto da Guarda Velha
    j4_end_voto_da_guarda_velha: {
      id: 'j4_end_voto_da_guarda_velha',
      titulo: 'Final IV: O Voto da Guarda Velha',
      anoHistorico: '300 d.C.',
      localizacao: 'A Armaria dos Tradicionalistas',
      regionId: 'castelo_negro',
      isEnding: true,
      fallbackText: `Vós vos recusais a dobrar a espinha perante as ideias heréticas do jovem bastardo de Winterfell. Nas sombras da intendência e nos corredores gelados da Torre dos Guardas, vós vos reunis com Bowen Marsh e Sor Alliser Thorne.
      
Para vós, a Patrulha jurou proteger o reino dos selvagens, não trazê-los para dentro de nossas camas e despensas. Vós guardais vosso aço bem afiado, observando cada decisão de Jon Snow com desconfiança gélida. A semente da fissura foi plantada no gelo; vós aguardareis o vosso momento... «Pela Patrulha».`,
      loreContext: {
        fonte: {
          arquivo_md: 'corpus_md/jornada_3_tronos/livro_3_a-tormenta-de-espadas_resumo-completo.md',
          livro: 'A Tormenta de Espadas',
          capitulo: 'Jon XII',
        },
        notaHistorica: 'Final F4: O alinhamento com a facção conservadora da Guarda Velha liderada por Marsh e Thorne.',
      },
      escolhas: [],
    },

    // F5. Capa Virada
    j4_end_capa_virada: {
      id: 'j4_end_capa_virada',
      titulo: 'Final V: Capa Virada Além da Muralha',
      anoHistorico: '300 d.C.',
      localizacao: 'As Matas Profundas da Floresta Assombrada',
      regionId: 'floresta_assombrada',
      isEnding: true,
      fallbackText: `Na névoa que se seguiu à carga de cavalaria de Stannis, vós despistes o manto negro puído e atirastes o broquel da Patrulha no fundo de uma ravina de neve.
      
Com um casaco de peles de foca e um machado de caçador, vós cavalgais para o norte profundo com um bando disperso de homens livres fugitivos. Vós quebrastes o juramento que fizestes perante os homens, mas ganhestes o ar livre e a vastidão infinita das florestas sem mestres. Se os Outros marcharem, vós lutareis como um homem livre, não como um prisioneiro vestindo o negro.`,
      loreContext: {
        fonte: {
          arquivo_md: 'corpus_md/jornada_3_tronos/livro_3_a-tormenta-de-espadas_resumo-completo.md',
          livro: 'A Tormenta de Espadas',
          capitulo: 'Jon XII',
        },
        notaHistorica: 'Final F5: Deserção e integração definitiva no Povo Livre além da Muralha.',
      },
      escolhas: [],
    },

    // F6. O Livro dos Nomes
    j4_end_livro_dos_nomes: {
      id: 'j4_end_livro_dos_nomes',
      titulo: 'Final VI: O Guardião do Livro dos Nomes',
      anoHistorico: '300 d.C.',
      localizacao: 'As Câmaras de Meistre Aemon',
      regionId: 'castelo_negro',
      isEnding: true,
      fallbackText: `Vós guardastes a espada no armário de ferro e tomais a pena de ganso e o tinteiro de chumbo. A pedido de Meistre Aemon, vós vos tornais o escriba oficial de Castelo Negro.
      
Página após página, com caligrafia firme e tinta indelével, vós registrais cada homem que caiu no Grande Patrulhamento, cada irmão esmagado no portão de ferro e cada alma que sangrou na neve para deter a escuridão. Vossas mãos preservam a memória dos homens sem nome; daqui a quinhentos anos, quando outros lerem as crônicas do Muro, eles saberão que nenhum irmão lutou em vão.`,
      loreContext: {
        fonte: {
          arquivo_md: 'corpus_md/jornada_3_tronos/livro_3_a-tormenta-de-espadas_resumo-completo.md',
          livro: 'A Tormenta de Espadas',
          capitulo: 'Jon XII',
        },
        notaHistorica: 'Final F6: O papel de cronista e guardião dos nomes dos caídos na Patrulha da Noite.',
      },
      escolhas: [],
    },

    // =========================================================================
    // OS 3 FINAIS FATAIS (MORTES CANÔNICAS/TRÁGICAS)
    // =========================================================================

    // M1. Esmagado no Portão
    j4_end_morte_esmagado_no_portao: {
      id: 'j4_end_morte_esmagado_no_portao',
      titulo: 'Final Trágico: Esmagado no Portão',
      anoHistorico: '300 d.C.',
      localizacao: 'O Túnel Interno da Muralha',
      regionId: 'portao_e_tunel',
      isEnding: true,
      fallbackText: `A clava monstruosa de pedra de Mag, o Poderoso, fendeu a escuridão do túnel com a fúria cega de uma montanha em colapso. O impacto quebrou vosso escudo de carvalho em mil lascas e esmagou vossa caixa torácica contra a parede maciça de gelo.
      
Enquanto vossa visão escurecia em um vermelho pulsante, vós vistes Donal Noye cravando a lâmina de aço na garganta da besta e a grande grade de ferro descendo com um estrondo de vitória. O portão não caiu; vosso sangue selou a passagem. Vosso turno terminou.`,
      loreContext: {
        fonte: {
          arquivo_md: 'corpus_md/jornada_3_tronos/livro_3_a-tormenta-de-espadas_resumo-completo.md',
          livro: 'A Tormenta de Espadas',
          capitulo: 'Jon VIII',
        },
        notaHistorica: 'Morte M1: Morte heroica no túnel da Muralha enfrentando Mag, o Poderoso.',
      },
      escolhas: [],
    },

    // M2. Queda da Escada
    j4_end_morte_queda_da_escada: {
      id: 'j4_end_morte_queda_da_escada',
      titulo: 'Final Trágico: Queda da Muralha',
      anoHistorico: '300 d.C.',
      localizacao: 'A Face Sul da Muralha',
      regionId: 'castelo_negro',
      isEnding: true,
      fallbackText: `Uma colossal placa de gelo desprendida pelo calor do incêndio da escadaria rompeu-se no ar com um trovão ensurdecedor. A onda de choque e os estilhaços de gelo afiados como navalhas arrastaram-vos para o abismo vazio.
      
O mundo girou em um turbilhão vertiginoso de fumaça, chamas e neve. Vós sentistes o vento gélido da Muralha fustigando vosso rosto em queda livre antes do impacto final na rocha fria. Vós destes a vida para conter o fogo do sul. Vosso turno terminou.`,
      loreContext: {
        fonte: {
          arquivo_md: 'corpus_md/jornada_3_tronos/livro_3_a-tormenta-de-espadas_resumo-completo.md',
          livro: 'A Tormenta de Espadas',
          capitulo: 'Jon VII',
        },
        notaHistorica: 'Morte M2: Morte trágica na queda da grande escadaria ou durante o desabamento do gelo.',
      },
      escolhas: [],
    },

    // M3. A Tocha na Neve
    j4_end_morte_tocha_na_neve: {
      id: 'j4_end_morte_tocha_na_neve',
      titulo: 'Final Trágico: A Tocha na Neve',
      anoHistorico: '300 d.C.',
      localizacao: 'As Margens da Floresta Assombrada',
      regionId: 'floresta_assombrada',
      isEnding: true,
      fallbackText: `No caos desenfreado da investida dos cavaleiros de Stannis contra o acampamento de Mance Rayder, uma lança montada trespassou vossa cota de malha em meio à confusão da nevasca.
      
Vós tombastes de joelhos sobre a neve imaculada da Floresta Assombrada, vendo o estandarte do coração flamejante tremulando ao longe enquanto vosso sangue quente derretia o gelo ao redor. Vós tombastes na vitória final que salvou o reino dos homens. Vosso turno terminou.`,
      loreContext: {
        fonte: {
          arquivo_md: 'corpus_md/jornada_3_tronos/livro_3_a-tormenta-de-espadas_resumo-completo.md',
          livro: 'A Tormenta de Espadas',
          capitulo: 'Jon X',
        },
        notaHistorica: 'Morte M3: Morte no campo de batalha durante a grande sortida e a carga de cavalaria de Stannis.',
      },
      escolhas: [],
    },
  },
};
