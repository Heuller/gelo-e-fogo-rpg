import 'server-only';
import { GrafoJornada, NodeJornada } from '@/server/engine/storyLinter';

export const grafoJ3Ato4: GrafoJornada = {
  id: 'jornada_3_tronos_ato4',
  titulo: 'Ato 4: A Tormenta de Espadas &bull; As Gêmeas, A Muralha e os 6 Finais',
  startNodeId: 'j3_a4_crise_acampamento_karstark',
  nodes: {
    // 1. Crise em Correrrio (Karstark e Jeyne Westerling)
    j3_a4_crise_acampamento_karstark: {
      id: 'j3_a4_crise_acampamento_karstark',
      titulo: 'A Honra Ferida & O Sangue dos Karstark',
      anoHistorico: '299 d.C.',
      localizacao: 'Pátio de Correrrio',
      regionId: 'tridente',
      fallbackText: `A causa do Norte começou a sangrar por dentro. Ferido na tomada do Risco, Robb Stark consolou-se nos braços de Jeyne Westerling e casou-se com ela na manhã seguinte para proteger a honra da donzela, quebrando irremediavelmente a promessa sagrada de matrimônio feita a Lorde Walder Frey.
      
Enlouquecido de dor pela perda dos filhos, Lorde Rickard Karstark assassinou dois prisioneiros Lannister infantes nas masmorras. Sob chuva inclemente no pátio de Correrrio, Robb Stark honrou o ensinamento de seu pai: pronunciou a sentença e decapitou Lorde Karstark pessoalmente com a espada de aço.
— Assassino de parentes! Os deuses amaldiçoarão o teu sangue! — berrou Karstark antes do golpe. Três mil lanças de Karhold abandonaram o exército do Jovem Lobo.`,
      internalVoices: [
        {
          atributo: 'comando',
          resultadoPassivo: 'SUCESSO',
          dcPassiva: 11,
          fala: 'A perda dos Karstark custou um terço do vosso exército. Sem os Frey, não podereis retomar o Norte dos homens de ferro.',
        },
      ],
      loreContext: {
        fonte: {
          arquivo_md: 'corpus_md/jornada_3_tronos/livro_3_a-tormenta-de-espadas_resumo-completo.md',
          livro: 'A Tormenta de Espadas',
          capitulo: 'Catelyn III',
        },
        notaHistorica: 'Robb executa Lorde Karstark e perde suas forças.',
      },
      escolhas: [
        {
          id: 'esc_j3_a4_marchar_para_as_gemeas_reconciliacao',
          texto: 'Aceitar o pedido de perdão de Walder Frey e marchar para o casamento de Edmure Tully nas Gêmeas.',
          tipo: 'simples',
          nextNodeId: 'j3_a4_banquete_das_gemeas_chuvas_castamere',
        },
        {
          id: 'esc_j3_a4_sondar_lealdade_roose_bolton',
          texto: 'Investigar a atitude fria e calculista de Roose Bolton após a saída de Harrenhal.',
          tipo: 'teste_atributo',
          atributo: 'astucia',
          dc: 12,
          onSuccessNodeId: 'j3_a4_alerta_vento_cinzento_armadilha',
          onPartialFailureNodeId: 'j3_a4_banquete_das_gemeas_chuvas_castamere',
        },
        {
          id: 'esc_karstark_justica_ned',
          texto: 'Executar Rickard Karstark pessoalmente em nome da justiça e da honra de Eddard Stark.',
          tipo: 'simples',
          aprovacaoCompanheiros: { grande_jon: 25, peixe_negro: 20, catelyn: -15 },
          delta: { compostura: 2 },
          nextNodeId: 'j3_a4_alerta_vento_cinzento_armadilha',
        },
        {
          id: 'esc_karstark_poupar_refem',
          texto: 'Manter Lorde Karstark acorrentado como refém para evitar a deserção dos lanceiros de Karhold.',
          tipo: 'simples',
          aprovacaoCompanheiros: { catelyn: 25, peixe_negro: 20, grande_jon: -10 },
          delta: { flagsAdicionadas: ['karstark_mantido_refem'], compostura: 2 },
          nextNodeId: 'j3_a4_alerta_vento_cinzento_armadilha',
        },
      ],
    },

    // 2. Alerta de Vento Cinzento
    j3_a4_alerta_vento_cinzento_armadilha: {
      id: 'j3_a4_alerta_vento_cinzento_armadilha',
      titulo: 'O Uivo de Aviso de Vento Cinzento',
      anoHistorico: '299 d.C.',
      localizacao: 'Portões das Gêmeas',
      regionId: 'tridente',
      fallbackText: `Ao avistar as torres sombrias das Gêmeas sob a chuva torrencial, o lobo gigante Vento Cinzento recusou-se terminantemente a cruzar o fosso, rosnando ferozmente e mostrando as presas aos soldados Frey. Lorde Walder exigiu que o animal fosse acorrentado nos canis antes que o pão e o sal da hospitalidade fossem compartilhados.`,
      internalVoices: [
        {
          atributo: 'pressagio',
          resultadoPassivo: 'SUCESSO',
          dcPassiva: 12,
          fala: 'O lobo gigante sente o cheiro da traição na carne dos homens. Não entreis desarmados!',
        },
      ],
      loreContext: {
        fonte: {
          arquivo_md: 'corpus_md/jornada_3_tronos/livro_3_a-tormenta-de-espadas_resumo-completo.md',
          livro: 'A Tormenta de Espadas',
          capitulo: 'Catelyn VI',
        },
        notaHistorica: 'Vento Cinzento pressente a traição nas Gêmeas.',
      },
      escolhas: [
        {
          id: 'esc_j3_a4_manter_armas_escondidas_cautela',
          texto: 'Ordenar discretamente que a guarda pessoal de Robb mantenha adagas sob as túnicas festivas.',
          tipo: 'simples',
          nextNodeId: 'j3_a4_banquete_das_gemeas_chuvas_castamere',
        },
        {
          id: 'esc_alerta_vento_entrar_armados',
          texto: 'Ordenar que cada cavaleiro nortenho entre no salão das Gêmeas com cota de malha e adaga oculta.',
          tipo: 'simples',
          aprovacaoCompanheiros: { peixe_negro: 25, grande_jon: 25, catelyn: 20 },
          delta: { flagsAdicionadas: ['nortenhos_com_armadura_banquete'], compostura: 2 },
          nextNodeId: 'j3_a4_banquete_das_gemeas_chuvas_castamere',
        },
        {
          id: 'esc_alerta_vento_manter_lobo_perto',
          texto: 'Recusar prender Vento Cinzento nas estrebarias e mantê-lo deitado aos pés da mesa real de Robb.',
          tipo: 'simples',
          aprovacaoCompanheiros: { grande_jon: 25, catelyn: 20 },
          delta: { flagsAdicionadas: ['vento_cinzento_ao_lado_robb'] },
          nextNodeId: 'j3_a4_banquete_das_gemeas_chuvas_castamere',
        },
      ],
    },

    // 3. O Banquete das Gêmeas (O Casamento Vermelho)
    j3_a4_banquete_das_gemeas_chuvas_castamere: {
      id: 'j3_a4_banquete_das_gemeas_chuvas_castamere',
      titulo: 'As Chuvas de Castamere & O Banquete de Sangue',
      anoHistorico: '299 d.C.',
      localizacao: 'Grande Salão das Gêmeas',
      regionId: 'tridente',
      fallbackText: `O casamento de Sor Edmure Tully com Roslin Frey fora consumado e o casal conduzido aos aposentos nupciais ao som de risadas bêbadas. As portas pesadas de carvalho das Gêmeas bateram ruidosamente e foram trancadas por fora.
      
De repente, os músicos na galeria alta pararam de tocar as canções alegres e começaram a entoar a melodia sinistra e fúnebre de 'As Chuvas de Castamere'. Catelyn Stark olhou para o lorde ao seu lado: sob a túnica de veludo de Roose Bolton brilhava o reflexo gélido de uma cota de malha de ferro.
      
Besteiros surgiram na galeria alta disparando virotes sem piedade sobre a mesa desarmada! Robb Stark caiu crivado no ombro e no peito.`,
      internalVoices: [
        {
          atributo: 'furia',
          resultadoPassivo: 'SUCESSO',
          dcPassiva: 11,
          fala: 'A lei sagrada da hospitalidade foi violada! É o massacre planejado por Tywin Lannister!',
        },
        {
          atributo: 'pressagio',
          resultadoPassivo: 'SUCESSO',
          dcPassiva: 13,
          fala: 'Vento Cinzento está tentando arrombar as grades do canil. Se libertardes o lobo, a maré pode virar!',
        },
      ],
      loreContext: {
        fonte: {
          arquivo_md: 'corpus_md/jornada_3_tronos/livro_3_a-tormenta-de-espadas_resumo-completo.md',
          livro: 'A Tormenta de Espadas',
          capitulo: 'Catelyn VII',
        },
        notaHistorica: 'O clímax sombrio do Casamento Vermelho.',
      },
      conditionalParagraphs: [
        {
          requiredFlag: 'vento_cinzento_ao_lado_robb',
          text: 'Vento Cinzento permanece vigilante aos pés da mesa de honra; com as orelhas em pé e rosnando baixo, o lobo gigante pressente a traição antes do primeiro virote.',
        },
        {
          requiredFlag: 'nortenhos_com_armadura_banquete',
          text: 'A cota de malha oculta sob as vestes festivas dos guerreiros nortenhos desvia os tiros iniciais disparados da galeria alta, salvando dezenas de homens leais à Casa Stark.',
        },
        {
          requiredFlag: 'karstark_mantido_refem',
          text: 'Os lanceiros de Karhold permanecem fiéis no pátio exterior, sem abandonar o acampamento de Robb graças à prudência de manter Lorde Rickard sob custódia.',
        },
      ],
      escolhas: [
        {
          id: 'esc_j3_a4_tentativa_heroica_reverter_casamento',
          texto: 'Gritar o alerta, desembainhar a adaga oculta e lançar o ataque desesperado contra Walder Frey!',
          tipo: 'teste_atributo',
          atributo: 'astucia',
          dc: 13,
          onSuccessNodeId: 'j3_a4_whatif_casamento_vermelho_revertido',
          onPartialFailureNodeId: 'j3_a4_morte_canonica_casamento_vermelho',
          onCriticalFailureNodeId: 'j3_a4_morte_canonica_casamento_vermelho',
          riscoMortal: true,
        },
        {
          id: 'esc_j3_a4_sucumbir_ao_canone_tragico',
          texto: 'Testemunhar a tragédia canônica: o punhal de Roose Bolton e o grito de Catelyn.',
          tipo: 'simples',
          nextNodeId: 'j3_a4_morte_canonica_casamento_vermelho',
        },
        {
          id: 'esc_banquete_catelyn_adaga_guizo',
          texto: 'Catelyn saca a adaga e agarra o tolo Guizo ao notar a cota de malha sob o gibão de Roose Bolton.',
          tipo: 'simples',
          aprovacaoCompanheiros: { catelyn: 30, grande_jon: 25 },
          delta: { flagsAdicionadas: ['cota_malha_bolton_descoberta'], compostura: 2 },
          nextNodeId: 'j3_a4_morte_canonica_casamento_vermelho',
        },
        {
          id: 'esc_banquete_robb_espada_mesa',
          texto: 'Robb tenta alcançar sua espada sobre a mesa enquanto os besteiros disparam da galeria de músicos.',
          tipo: 'simples',
          aprovacaoCompanheiros: { grande_jon: 25, peixe_negro: 25 },
          delta: { sangue: -2, compostura: 1 },
          nextNodeId: 'j3_a4_morte_canonica_casamento_vermelho',
        },
      ],
    },

    // 4. Morte Canônica do Casamento Vermelho
    j3_a4_morte_canonica_casamento_vermelho: {
      id: 'j3_a4_morte_canonica_casamento_vermelho',
      titulo: 'Jaime Lannister Manda Lembranças & A Queda do Rei no Norte',
      anoHistorico: '299 d.C.',
      localizacao: 'Grande Salão das Gêmeas',
      regionId: 'tridente',
      fallbackText: `Robb Stark tentou erguer-se do piso ensanguentado, apoiando-se no irmão ferido. Lorde Roose Bolton aproximou-se calmamente em sua cota de malha, ergueu uma adaga afiada e cravou-a no coração do Jovem Lobo:
— Jaime Lannister manda lembranças — sussurrou Bolton com olhos pálidos.
      
Catelyn Stark enlouqueceu de agonia, cortou a garganta do bobo dos Frey com uma faca de carne e começou a rir em desespero enquanto unhas arrancavam a carne de suas próprias bochechas. Um homem aproximou-se por trás e cortou sua garganta até os ossos.
O exército nortenho foi massacrado em suas tendas. A cabeça de Robb foi cortada e substituída pela cabeça costurada de Vento Cinzento. O Norte parecia destruído para sempre.`,
      loreContext: {
        fonte: {
          arquivo_md: 'corpus_md/jornada_3_tronos/livro_3_a-tormenta-de-espadas_resumo-completo.md',
          livro: 'A Tormenta de Espadas',
          capitulo: 'Livro 3',
        },
        notaHistorica: 'A Tormenta de Espadas (George R. R. Martin) - Tradução Jorge Candeias (LeYa)',
      },
      escolhas: [
        {
          id: 'esc_j3_a4_avancar_para_a_muralha_defesa',
          texto: 'Voltar os olhos para a Muralha onde Jon Snow lidera a defesa desesperada de Castelo Negro.',
          tipo: 'simples',
          nextNodeId: 'j3_a4_batalha_castelo_negro_mance',
        },
        {
          id: 'esc_morte_casamento_catelyn_sacrificio',
          texto: 'Lady Catelyn agarra o tolo Guizo e faz o último apelo desesperado em honra à lei sagrada do pão e sal.',
          tipo: 'simples',
          aprovacaoCompanheiros: { catelyn: 30, grande_jon: 25 },
          delta: { sangue: -1, compostura: 1 },
          nextNodeId: 'j3_a4_batalha_castelo_negro_mance',
        },
        {
          id: 'esc_morte_casamento_vinganca_norte',
          texto: 'Lorde Umber derruba as mesas e esmaga o crânio de dois conspiradores antes de tombar sob os virotes.',
          tipo: 'simples',
          aprovacaoCompanheiros: { grande_jon: 30, peixe_negro: 25 },
          delta: { flagsAdicionadas: ['furia_final_umber'] },
          nextNodeId: 'j3_a4_batalha_castelo_negro_mance',
        },
      ],
    },

    // 5. What If: Casamento Vermelho Revertido
    j3_a4_whatif_casamento_vermelho_revertido: {
      id: 'j3_a4_whatif_casamento_vermelho_revertido',
      titulo: 'A Fúria dos Lobos & O Massacre Revertido nas Gêmeas',
      anoHistorico: '299 d.C.',
      localizacao: 'As Gêmeas',
      regionId: 'tridente',
      fallbackText: `Com reflexos extraordinários, Catelyn derrubou a mesa pesada bloqueando a primeira saraivada de virotes, enquanto a guarda oculta degolava os besteiros da porta! As grades dos canis foram rompidas por Peixe Negro e Vento Cinzento invadiu o Grande Salão como um furacão cinzento de mandíbulas devastadoras!
      
Roose Bolton foi encurralado e decapitado pelo próprio Robb ferido; Walder Frey foi jogado de joelhos em sua própria cadeira sob o olhar implacável dos nortenhos. As Gêmeas foram tomadas pelo sangue da justiça, e o exército do Rei no Norte sobreviveu intacto e vingado!`,
      loreContext: {
        fonte: {
          arquivo_md: 'corpus_md/jornada_3_tronos/livro_3_a-tormenta-de-espadas_resumo-completo.md',
          livro: 'A Tormenta de Espadas',
          capitulo: 'Livro 3',
        },
        notaHistorica: 'A Tormenta de Espadas (George R. R. Martin) - Tradução Jorge Candeias (LeYa)',
      },
      escolhas: [
        {
          id: 'esc_j3_a4_proclamar_vitoria_rei_no_norte',
          texto: 'Marchar de volta ao Norte para expulsar os Greyjoy e consagrar a vitória soberana (Final 1).',
          tipo: 'simples',
          nextNodeId: 'j3_final_rei_no_norte_invicto',
        },
        {
          id: 'esc_j3_a4_articular_regencia_eddard_sul',
          texto: 'Enviar corvos a Porto Real apoiando a Regência Honrada e o triunfo do Norte no trono (Final 2).',
          tipo: 'teste_atributo',
          atributo: 'cortesia',
          dc: 12,
          onSuccessNodeId: 'j3_final_regencia_honra_eddard',
          onPartialFailureNodeId: 'j3_final_rei_no_norte_invicto',
        },
        {
          id: 'esc_j3_a4_unir_norte_muralha_contra_outros',
          texto: 'Marchar os estandartes vitoriosos direto para a Muralha e unir-se à Patrulha (Final 3).',
          tipo: 'simples',
          nextNodeId: 'j3_final_lobos_na_muralha',
        },
      ],
    },

    // 6. A Batalha de Castelo Negro
    j3_a4_batalha_castelo_negro_mance: {
      id: 'j3_a4_batalha_castelo_negro_mance',
      titulo: 'A Batalha sob o Muro de Gelo & A Chegada de Stannis',
      anoHistorico: '300 d.C.',
      localizacao: 'Castelo Negro, A Muralha',
      regionId: 'muralha',
      fallbackText: `Com apenas quarenta irmãos jurados capazes de empunhar arcos, Jon Snow assumiu o comando do topo da Muralha. Disparando flechas incandescentes e barris de piche fervente, a Patrulha conteve os gigantes e o mamute de Mag, o Poderoso, até que Ygritte morreu em seus braços ferida por uma flecha perdida:
— Não sabes nada, Jon Snow — murmurou ela ao morrer na neve.
      
Quando Mance Rayder lançava a investida final com dezenas de milhares de guerreiros, trombetas sulistas ecoaram na floresta: Stannis Baratheon desembarcara com sua cavalaria de ferro no Norte, dispersando o exército selvagem e salvando a Muralha.`,
      internalVoices: [
        {
          atributo: 'comando',
          resultadoPassivo: 'SUCESSO',
          dcPassiva: 11,
          fala: 'Stannis respondeu ao chamado de socorro que nenhum outro rei atendeu. O destino do reino se decide aqui.',
        },
      ],
      loreContext: {
        fonte: {
          arquivo_md: 'corpus_md/jornada_3_tronos/livro_3_a-tormenta-de-espadas_resumo-completo.md',
          livro: 'A Tormenta de Espadas',
          capitulo: 'Jon X / Jon XI',
        },
        notaHistorica: 'A vitória da Patrulha da Noite com a chegada do Rei Stannis.',
      },
      conditionalParagraphs: [
        {
          requiredFlag: 'adagas_obsidiana_distribuidas',
          text: 'As lâminas de vidro de dragão resgatadas do Punho dos Primeiros Homens reluzem nas cinturas dos arqueiros na Muralha, lembrando a todos o verdadeiro inimigo além da floresta.',
        },
        {
          requiredFlag: 'criatura_incinerada_muralha',
          text: 'Os irmãos da Patrulha mantêm tochas de pez acesas e flechas embebidas em óleo, cientes de que somente o fogo purificador destrói os mortos-vivos.',
        },
      ],
      escolhas: [
        {
          id: 'esc_j3_a4_eleicao_senhor_comandante_jon',
          texto: 'Presidir a votação solene que elege Jon Snow como o 998º Senhor Comandante da Patrulha.',
          tipo: 'simples',
          nextNodeId: 'j3_a4_eleicao_jon_snow_senhor_comandante',
        },
        {
          id: 'esc_castelo_negro_stannis_saudacao',
          texto: 'Jon Snow saúda o Rei Stannis Baratheon e Sor Davos Seaworth como salvadores da Muralha.',
          tipo: 'simples',
          aprovacaoCompanheiros: { jon_snow: 30 },
          delta: { compostura: 2, sangue: 1 },
          nextNodeId: 'j3_a4_eleicao_jon_snow_senhor_comandante',
        },
        {
          id: 'esc_castelo_negro_parlamentar_mance',
          texto: 'Negociar com Mance Rayder a passagem pacífica das mulheres e crianças selvagens para o sul do Muro.',
          tipo: 'simples',
          aprovacaoCompanheiros: { jon_snow: 25 },
          delta: { flagsAdicionadas: ['selvagens_paz_iniciada'] },
          nextNodeId: 'j3_a4_eleicao_jon_snow_senhor_comandante',
        },
      ],
    },

    // 7. A Eleição de Jon Snow
    j3_a4_eleicao_jon_snow_senhor_comandante: {
      id: 'j3_a4_eleicao_jon_snow_senhor_comandante',
      titulo: 'O 998º Senhor Comandante da Patrulha da Noite',
      anoHistorico: '300 d.C.',
      localizacao: 'Castelo Negro',
      regionId: 'muralha',
      fallbackText: `Após dias de votação empatada entre Janos Slynt e Cotter Pyke, Samwell Tarly usou de sua inteligência para unir as facções. Quando um corvo saiu do caldeirão de ferro e pousou no ombro de Jon Snow grasnando 'Neve! Neve!', o bastardo de Winterfell foi formalmente aclamado o 998º Senhor Comandante da Patrulha da Noite.
      
Stannis Baratheon ofereceu legitimar Jon como Senhor de Winterfell com a mão de Val, mas Jon recusou o Trono do Norte para honrar seus votos sagrados diante da Muralha. As escolhas do jogador decidirão o encerramento supremo da campanha!`,
      loreContext: {
        fonte: {
          arquivo_md: 'corpus_md/jornada_3_tronos/livro_3_a-tormenta-de-espadas_resumo-completo.md',
          livro: 'A Tormenta de Espadas',
          capitulo: 'Livro 3',
        },
        notaHistorica: 'A Tormenta de Espadas (George R. R. Martin) - Tradução Jorge Candeias (LeYa)',
      },
      escolhas: [
        {
          id: 'esc_j3_a4_canonico_o_norte_se_lembra',
          texto: 'Consagrar o desfecho canônico: A resistência no Norte e a vigília de Jon Snow (Final 4).',
          tipo: 'simples',
          nextNodeId: 'j3_final_canonico_norte_se_lembra',
        },
        {
          id: 'esc_j3_a4_lobos_na_muralha_reunidos',
          texto: 'Acolher Eddard Stark e os fiéis do Norte na defesa sagrada de Castelo Negro (Final 3).',
          tipo: 'simples',
          nextNodeId: 'j3_final_lobos_na_muralha',
        },
        {
          id: 'esc_j3_a4_hegemonia_leao_dourado',
          texto: 'Assentar a vitória política absoluta da Casa Lannister em Porto Real (Final 5).',
          tipo: 'simples',
          nextNodeId: 'j3_final_hegemonia_leao_dourado',
        },
        {
          id: 'esc_j3_a4_pacto_cancao_gelo_fogo',
          texto: 'Forjar a grande aliança dos Sete Reinos contra a Longa Noite vindoura (Final 6).',
          tipo: 'teste_atributo',
          atributo: 'pressagio',
          dc: 12,
          onSuccessNodeId: 'j3_final_pacto_gelo_e_fogo',
          onPartialFailureNodeId: 'j3_final_canonico_norte_se_lembra',
        },
      ],
    },

    // ==========================================
    // OS 6 FINAIS DISTINTOS DA JORNADA 3
    // ==========================================

    // FINAL 1: O REI NO NORTE INVICTO
    j3_final_rei_no_norte_invicto: {
      id: 'j3_final_rei_no_norte_invicto',
      titulo: 'Final 1: A Coroa de Inverno e Bronze (Robb Stark Invicto)',
      anoHistorico: '300 d.C.',
      localizacao: 'Winterfell e As Gêmeas',
      regionId: 'norte',
      loreContext: {
        fonte: {
          arquivo_md: 'corpus_md/jornada_3_tronos/livro_3_a-tormenta-de-espadas_resumo-completo.md',
          livro: 'A Tormenta de Espadas',
          capitulo: 'Livro 3',
        },
        notaHistorica: 'A Tormenta de Espadas (George R. R. Martin) - Tradução Jorge Candeias (LeYa)',
      },
      isEnding: true,
      fallbackText: `O Casamento Vermelho foi revertido com fúria heroica! Os Frey e os Bolton foram purgados pelo aço da justiça, e as fortalezas das Gêmeas e do Forte do Pavor hastearam os lobos gigantes de Winterfell.
      
Robb Stark marchou de volta para o Norte, libertou Fosso Cailin e expulsou os homens de ferro das praias. Soberano, invicto em todas as batalhas campais e aclamado pelos senhores dos rios e das florestas, o Jovem Lobo restaura o Reino do Norte e do Tridente como uma potência livre e independente para sempre.`,
      conditionalParagraphs: [
        {
          requiredFlag: 'vento_cinzento_ao_lado_robb',
          text: 'Vento Cinzento caminha ao lado de Robb Stark pelas neves reconquistadas de Winterfell, consagrado como o terror dos traidores e o mais leal guardião da linhagem dos lobos.',
        },
        {
          requiredFlag: 'regicida_acorrentado_correrrio',
          text: 'Jaime Lannister permanece como valioso refém nas masmorras de Correrrio, forçando Rochedo Casterly a reconhecer a soberania intocada do Reino do Norte.',
        },
        {
          requiredFlag: 'lady_salva_em_winterfell',
          text: 'Sansa Stark retorna a Winterfell com a loba Lady viva e imponente ao seu lado, protegida da falsidade e da perversidade da corte do sul.',
        },
      ],
      escolhas: [],
    },

    // FINAL 2: A REGÊNCIA DE EDDARD STARK
    j3_final_regencia_honra_eddard: {
      id: 'j3_final_regencia_honra_eddard',
      titulo: 'Final 2: A Mão de Gelo no Trono de Ferro (Triunfo de Ned)',
      anoHistorico: '300 d.C.',
      localizacao: 'Porto Real',
      regionId: 'terras_da_coroa',
      loreContext: {
        fonte: {
          arquivo_md: 'corpus_md/jornada_3_tronos/livro_3_a-tormenta-de-espadas_resumo-completo.md',
          livro: 'A Tormenta de Espadas',
          capitulo: 'Livro 3',
        },
        notaHistorica: 'A Tormenta de Espadas (George R. R. Martin) - Tradução Jorge Candeias (LeYa)',
      },
      isEnding: true,
      fallbackText: `Ao vencer o golpe na noite fatal de Porto Real com as cem espadas de Renly, Lorde Eddard Stark expurgou a conspiração de Cersei e dos Lannister sem derramamento injusto de sangue.
      
A bastardia dos herdeiros reais foi declarada perante a Fé e os lordes, e a coroa foi oferecida ao legítimo herdeiro Stannis Baratheon. Com Ned governando com justiça austera e a espada Gelo ao lado do Trono, os Sete Reinos evitam a devastação da guerra civil e consolidam uma era de dever, lei e integridade moral.`,
      conditionalParagraphs: [
        {
          requiredFlag: 'adaga_sob_guarda_norte',
          text: 'A adaga de osso de dragão e aço valiriano de Mindinho permanece guardada nos cofres da Torre da Mão como prova material indelével do complô desmontado.',
        },
        {
          requiredFlag: 'arya_resgatada_yoren',
          text: 'Arya Stark é reconduzida em segurança aos salões da Fortaleza Vermelha pelos irmãos da Patrulha da Noite, reunida a seu pai em paz e dignidade.',
        },
      ],
      escolhas: [],
    },

    // FINAL 3: NED E JON NA MURALHA
    j3_final_lobos_na_muralha: {
      id: 'j3_final_lobos_na_muralha',
      titulo: 'Final 3: As Duas Espadas na Noite (Ned e Jon em Castelo Negro)',
      anoHistorico: '300 d.C.',
      localizacao: 'Castelo Negro, A Muralha',
      regionId: 'muralha',
      loreContext: {
        fonte: {
          arquivo_md: 'corpus_md/jornada_3_tronos/livro_3_a-tormenta-de-espadas_resumo-completo.md',
          livro: 'A Tormenta de Espadas',
          capitulo: 'Livro 3',
        },
        notaHistorica: 'A Tormenta de Espadas (George R. R. Martin) - Tradução Jorge Candeias (LeYa)',
      },
      isEnding: true,
      fallbackText: `Poupado no Septo de Baelor, Lorde Eddard Stark vestiu o negro e cavalgou com a Patrulha da Noite até a Muralha de gelo. Nos pátios de Castelo Negro, pai e filho se abraçaram sob o olhar silencioso de Fantasma.
      
Ali, no coração gelado do mundo, Ned revelou a Jon o segredo proibido da promessa de Lyanna Stark na Torre da Alegria e a verdade sobre seu sangue valiriano. Assumindo o comando da irmandade, Ned e Jon lideram a Patrulha e os Sete Reinos unidos contra a verdadeira ameaça que se ergue nas brumas do inverno.`,
      conditionalParagraphs: [
        {
          requiredFlag: 'arya_resgatada_yoren',
          text: 'Arya Stark cavalga até a Muralha ao lado de Yoren, reencontrando Jon Snow e Eddard sob as sombras colossais de Castelo Negro.',
        },
        {
          requiredFlag: 'adagas_obsidiana_distribuidas',
          text: 'Eddard Stark e Meistre Aemon examinam os fragmentos de obsidiana ancestral, forjando armas sagradas para a Patrulha com sabedoria e reverência.',
        },
      ],
      escolhas: [],
    },

    // FINAL 4: CANÔNICO - O NORTE SE LEMBRA
    j3_final_canonico_norte_se_lembra: {
      id: 'j3_final_canonico_norte_se_lembra',
      titulo: 'Final 4: O Norte se Lembra (Caminho Canônico)',
      anoHistorico: '300 d.C.',
      localizacao: 'A Muralha e Winterfell',
      regionId: 'norte',
      loreContext: {
        fonte: {
          arquivo_md: 'corpus_md/jornada_3_tronos/livro_3_a-tormenta-de-espadas_resumo-completo.md',
          livro: 'A Tormenta de Espadas',
          capitulo: 'Livro 3',
        },
        notaHistorica: 'A Tormenta de Espadas (George R. R. Martin) - Tradução Jorge Candeias (LeYa)',
      },
      isEnding: true,
      fallbackText: `O cânone implacável de A Tormenta de Espadas consuma seu destino histórico. Robb e Catelyn Stark tombaram nas Gêmeas, mas o eco de sua memória queima como fogo subterrâneo sob a neve de Westeros: 'O Norte se lembra, e a farsa dos Frey logo terminará.'
      
Em Castelo Negro, Jon Snow empunha a lâmina Garra Longa como Senhor Comandante, preparando a defesa contra os Outros enquanto Stannis Baratheon planeja a libertação do Norte. A escuridão desce sobre o mundo, mas a honra dos lobos jamais será esquecida.`,
      conditionalParagraphs: [
        {
          requiredFlag: 'nymeria_liberta_florestas',
          text: 'Lendas sussurram pelas matas do Tridente sobre Nymeria, a loba gigante que lidera centenas de lobos selvagens caçando os patrulheiros de Walder Frey pelas estradas enlameadas.',
        },
        {
          requiredFlag: 'cota_malha_bolton_descoberta',
          text: 'A infâmia da cota de malha de Roose Bolton é cantada em versos furiosos pelos bardos nortenhos, garantindo que o juramento de vingança jamais se apague.',
        },
      ],
      escolhas: [],
    },

    // FINAL 5: A HEGEMONIA DO LEÃO DOURADO
    j3_final_hegemonia_leao_dourado: {
      id: 'j3_final_hegemonia_leao_dourado',
      titulo: 'Final 5: O Rugido de Rochedo Casterly (Supremacia Lannister)',
      anoHistorico: '300 d.C.',
      localizacao: 'Porto Real',
      regionId: 'terras_da_coroa',
      loreContext: {
        fonte: {
          arquivo_md: 'corpus_md/jornada_3_tronos/livro_3_a-tormenta-de-espadas_resumo-completo.md',
          livro: 'A Tormenta de Espadas',
          capitulo: 'Livro 3',
        },
        notaHistorica: 'A Tormenta de Espadas (George R. R. Martin) - Tradução Jorge Candeias (LeYa)',
      },
      isEnding: true,
      fallbackText: `Com a vitória esmagadora na Baía da Água Negra e a ruína dos Stark no Casamento Vermelho, a aliança Lannister-Tyrell consolida um domínio inexpugnável sobre os Sete Reinos.
      
Lorde Tywin Lannister dita as leis do continente a partir da Torre da Mão com frieza impiedosa. O ouro de Rochedo Casterly e os grãos de Jardim de Cima compram a paz das grandes casas, inaugurando uma era de autoridade centralizadora onde a insurreição é punida com o ferro e o terror da canção de Castamere.`,
      conditionalParagraphs: [
        {
          requiredFlag: 'verdade_incesto_gritada_praca',
          text: 'Apesar do controle absoluto de Tywin, os sussurros sobre a bastardia dos filhos de Cersei continuam a ecoar como um veneno silencioso pelos becos da Baixada das Pulgas.',
        },
        {
          requiredFlag: 'corrente_ferro_agua_negra',
          text: 'Os elos partidos da grande corrente da Baía da Água Negra jazem como troféus enferrujados nos cais de Porto Real, marcos do triunfo implacável do Leão.',
        },
      ],
      escolhas: [],
    },

    // FINAL 6: A CANÇÃO DE GELO E FOGO
    j3_final_pacto_gelo_e_fogo: {
      id: 'j3_final_pacto_gelo_e_fogo',
      titulo: 'Final 6: A Canção de Gelo e Fogo (A Grande Aliança do Inverno)',
      anoHistorico: '300 d.C.',
      localizacao: 'Castelo Negro e Winterfell',
      regionId: 'muralha',
      loreContext: {
        fonte: {
          arquivo_md: 'corpus_md/jornada_3_tronos/livro_3_a-tormenta-de-espadas_resumo-completo.md',
          livro: 'A Tormenta de Espadas',
          capitulo: 'Livro 3',
        },
        notaHistorica: 'A Tormenta de Espadas (George R. R. Martin) - Tradução Jorge Candeias (LeYa)',
      },
      isEnding: true,
      fallbackText: `Diante dos relatórios aterrorizantes das criaturas mortas e dos Caminhantes Brancos, os senhores de Westeros deixam as disputas mesquinhas pelo trono para trás.
      
Jon Snow forja uma aliança histórica integrando o Povo Livre de Mance Rayder aos reinos dos homens. Corvos enviados aos quatro cantos do mundo recebem resposta, e os primeiros rumores do renascimento de dragões no leste trazem a esperança mística da profecia de Daenys e Azor Ahai. Westeros ergue-se unida para cantar sua verdadeira Canção de Gelo e Fogo contra a Longa Noite.`,
      conditionalParagraphs: [
        {
          requiredFlag: 'selvagens_paz_iniciada',
          text: 'A integração pacífica do Povo Livre estabelece guarnições vigilantes em toda a extensão do Muro, acolhendo clãs inteiros como cidadãos de pleno direito dos reinos.',
        },
        {
          requiredFlag: 'adagas_obsidiana_distribuidas',
          text: 'Lanças, flechas e pontas forjadas em vidro de dragão brilham nas mãos de cada sentinela, prontas para a batalha profetizada contra a escuridão sem fim.',
        },
      ],
      escolhas: [],
    },
  },
};
