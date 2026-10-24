import 'server-only';
import { GrafoJornada, NodeJornada } from '@/server/engine/storyLinter';

export const grafoAto1: GrafoJornada = {
  id: 'jornada_1_ato_1',
  titulo: 'Ato I: A Mesa Pintada e o Desembarque',
  startNodeId: 'j1_a1_mesa_pintada',
  nodes: {
    // ==========================================
    // CENA 1: A REUNIÃO NA MESA PINTADA
    // ==========================================
    j1_a1_mesa_pintada: {
      id: 'j1_a1_mesa_pintada',
      titulo: 'A Mesa Pintada de Pedra do Dragão',
      anoHistorico: '2 a.C.',
      localizacao: 'Pedra do Dragão',
      regionId: 'pedra_dragao',
      fallbackText: `Aegon I Targaryen contemplava a grandiosa Mesa Pintada na câmara alta da fortaleza de Pedra do Dragão. Diante de seus olhos repousava a silhueta esculpida dos Sete Reinos, com mais de quinze metros de comprimento, entalhada nas feições exatas da terra por ordem de Lorde Gaemon, sem qualquer linha ou marco divisório que delimitasse fronteiras entre os reis mesquinhos que sangravam o continente.

Ao seu lado, a rainha Visenya mantinha a destra repousada sobre o pomo esculpido de Irmã Sombria, a lendária lâmina de aço valiriano forjada para a mão de uma guerreira. Seu olhar frio e calculista examinava as falésias recortadas do Vale de Arryn e as muralhas colossais de Harrenhal. Mais adiante, a rainha Rhaenys observava o horizonte da Baía da Água Negra, seus cabelos de ouro e prata chicoteados pela brisa marítima que subia das cavernas onde Balerion, Vhagar e Meraxes descansavam em meio ao enxofre.

Orys Baratheon, irmão bastardo de Aegon e seu companheiro mais leal desde a infância, aproximou-se com passos pesados. Portava pergaminhos selados trazidos por corvos cansados. O continente ardia em disputas territoriais: Argilac Durrandon, o idoso Rei da Tempestade, recuava diante do avanço feroz dos homens de ferro de Harren, o Negro. Westeros estava madura para a forja, mas o primeiro golpe exigia precisão absoluta.`,
      internalVoices: [
        {
          atributo: 'comando',
          resultadoPassivo: 'SUCESSO',
          dcPassiva: 8,
          fala: 'Sete coroas divididas entre déspotas e tiranos. Westeros não precisa de fronteiras desenhadas por reis menores; precisa de um único soberano.',
        },
        {
          atributo: 'astucia',
          resultadoPassivo: 'SUCESSO',
          dcPassiva: 9,
          fala: 'Argilac está encurralado entre o martelo da Tormenta e a bigorna dos rios. Antes de içar as velas, descubra até onde o desespero do Rei da Tempestade o levará.',
        },
      ],
      loreContext: {
        idVerbete: 'mesa_pintada',
        fonte: {
          arquivo_md: 'fogo-e-sangue_01_a-conquista-de-aegon.md',
          livro: 'Fogo & Sangue - Volume 1',
          capitulo: 'A Conquista de Aegon',
        },
        notaHistorica: 'A Mesa Pintada foi encomendada por Aegon anos antes da Conquista, sem fronteiras entre os reinos.',
      },
      escolhas: [
        {
          id: 'esc_ouvir_argilac',
          texto: 'Receber os emissários de Ponta Tempestade e avaliar a proposta de aliança de Argilac Durrandon.',
          tipo: 'simples',
          nextNodeId: 'j1_a1_oferta_argilac',
        },
        {
          id: 'esc_proclamar_direto',
          texto: 'Dispensar negociatas com reis menores e redigir a Proclamação Régia de submissão imediata.',
          tipo: 'teste_atributo',
          atributo: 'comando',
          dc: 9,
          onSuccessNodeId: 'j1_a1_desembarque_agua_negra',
          onPartialFailureNodeId: 'j1_a1_maos_cortadas',
        },

        {
          id: 'esc_mesa_astucia_suborno',
          texto: 'Enviar emissários secretos aos meistres da Cidadela para obter plantas detalhadas das capitanias do continente.',
          tipo: 'simples',
          aprovacaoCompanheiros: { daemon_v: 15, visenya: 10, rhaenys: 5 },
          delta: { compostura: 1, flagsAdicionadas: ['plantas_cidadela_obtidas'] },
          nextNodeId: 'j1_a1_oferta_argilac',
        },
        {
          id: 'esc_mesa_pressagio_valiriano',
          texto: 'Realizar libações valirianas com as duas irmãs e meditar sobre o Sonho de Daenys, a Iluminada.',
          tipo: 'simples',
          tagOrigem: '[SANGUE VALIRIANO]',
          aprovacaoCompanheiros: { rhaenys: 20, visenya: 15, orys: 10 },
          delta: { inspiracao: 1, compostura: 2 },
          nextNodeId: 'j1_a1_oferta_argilac',
        }
      ],
    },

    // ==========================================
    // CENA 2: A OFERTA DE ARGILAC DURRANDON
    // ==========================================
    j1_a1_oferta_argilac: {
      id: 'j1_a1_oferta_argilac',
      titulo: 'A Oferta do Rei da Tempestade',
      anoHistorico: '2 a.C.',
      localizacao: 'Pedra do Dragão',
      regionId: 'pedra_dragao',
      fallbackText: `Os enviados de Ponta Tempestade ajoelharam-se na câmara da Mesa Pintada, desdobrando pergaminhos timbrados com o veado coroado da Casa Durrandon. A proposta de Argilac, o Arrogante, era suntuosa, porém traiçoeira: oferecia a mão de sua única donzela e herdeira, a princesa Argella Durrandon, em matrimônio a Aegon, acompanhada de todas as terras férteis a leste do rio Olho de Deus até a Baía da Água Negra.

Contudo, havia uma armadilha evidente nos termos: aquelas terras não pertenciam a Argilac, mas sim a Harren, o Negro, cujos homens de ferro haviam erguido a gigantesca fortaleza de Harrenhal e submetido os Senhores dos Rios ao chicote. O Rei da Tempestade desejava usar os dragões valirianos como um escudo de carne e chamas para conter seu mais temido rival.

Aegon já possuía duas esposas e não desonraria Visenya e Rhaenys tomando uma terceira. Rhaenys sorriu ironicamente, enquanto Visenya apenas tocou o punho de Irmã Sombria. Aegon formulou sua contraproposta com voz calma: recusou a donzela para si, mas ofereceu a mão de seu melhor amigo e irmão bastardo, Orys Baratheon, exigindo a confirmação das terras prometidas.`,
      internalVoices: [
        {
          atributo: 'cortesia',
          resultadoPassivo: 'SUCESSO',
          dcPassiva: 8,
          fala: 'A diplomacia exige que a recusa seja revestida de honra. Oferecer Orys eleva o sangue do leal irmão e desmascara a soberba de Argilac.',
        },
        {
          atributo: 'erudicao',
          resultadoPassivo: 'SUCESSO',
          dcPassiva: 10,
          fala: 'Os Durrandon descendem dos Reis da Tempestade da Era dos Heróis. O orgulho de Argilac jamais tolerará dar sua herdeira a um bastardo.',
        },
      ],
      loreContext: {
        idVerbete: 'argilac_durrandon',
        fonte: {
          arquivo_md: 'fogo-e-sangue_01_a-conquista-de-aegon.md',
          livro: 'Fogo & Sangue - Volume 1',
          capitulo: 'A Conquista de Aegon',
        },
      },
      escolhas: [
        {
          id: 'esc_propor_orys',
          texto: 'Despachar os termos oferecendo a mão de Orys Baratheon com juramento solene de vassalagem.',
          tipo: 'teste_atributo',
          atributo: 'cortesia',
          dc: 8,
          onSuccessNodeId: 'j1_a1_maos_cortadas',
          onPartialFailureNodeId: 'j1_a1_maos_cortadas',
        },
        {
          id: 'esc_desafiar_argilac',
          texto: 'Rasgar os termos na frente dos emissários e exigir a submissão incondicional de Ponta Tempestade.',
          tipo: 'teste_atributo',
          atributo: 'furia',
          dc: 9,
          onSuccessNodeId: 'j1_a1_maos_cortadas',
          onPartialFailureNodeId: 'j1_a1_maos_cortadas',
        },

        {
          id: 'esc_argilac_astucia_contraproposta',
          texto: 'Enviar espiões para descobrir até onde os vassalos de Argilac estão dispostos a marchar em uma guerra contra dragões.',
          tipo: 'teste_atributo',
          atributo: 'astucia',
          dc: 8,
          onSuccessNodeId: 'j1_a1_maos_cortadas',
          onPartialFailureNodeId: 'j1_a1_maos_cortadas',
          aprovacaoCompanheiros: { visenya: 15, orys: 5 },
        }
      ],
    },

    // ==========================================
    // CENA 3: AS MÃOS DECEPADAS E OS CORVOS
    // ==========================================
    j1_a1_maos_cortadas: {
      id: 'j1_a1_maos_cortadas',
      titulo: 'O Baú de Ferro e a Ira do Dragão',
      anoHistorico: '2 a.C.',
      localizacao: 'Pedra do Dragão',
      regionId: 'pedra_dragao',
      fallbackText: `A resposta de Argilac Durrandon não veio por tinta, mas por sangue. Um mensageiro dornês entregou aos guardas de Pedra do Dragão uma pesada caixa de ferro forjado. Ao ser aberta perante a corte, o silêncio desabou sobre o salão: sobre o veludo repousavam as duas mãos decepadas do emissário de Aegon, ainda adornadas com anéis de selo.

A mensagem inscrita na tampa era uma afronta mortal: "Estas são as únicas mãos que seu bastardo receberá de mim". Visenya cerrou o maxilar, e no pátio dos dragões Balerion soltou uma coluna de fogo negro que iluminou a noite marítima. Não havia mais margem para palavras amenas.

Aegon convocou imediatamente seus vassalos insulares: Daemon Velaryon, senhor de Derivamarca e líder da frota; Crispian Celtigar, senhor da Ilha da Garra; e os chefes das casas Massey e Bar Emmon. Após rezar no septo da fortaleza durante sete horas, Aegon ordenou aos meistres que soltassem centenas de corvos rumo aos quatro cantos do continente. A mensagem era idêntica para todos: de Vilavelha a Winterfell, a partir daquele dia haveria apenas um rei em Westeros.`,
      internalVoices: [
        {
          atributo: 'furia',
          resultadoPassivo: 'SUCESSO',
          dcPassiva: 8,
          fala: 'O sangue do emissário clama por cinzas. Ponta Tempestade aprenderá o significado de Fogo e Sangue.',
        },
        {
          atributo: 'pressagio',
          resultadoPassivo: 'SUCESSO',
          dcPassiva: 9,
          fala: 'As asas dos corvos cobrem o sol. Quando pousarem nos castelos dos homens, o destino do mundo estará traçado.',
        },
      ],
      loreContext: {
        idVerbete: 'aegon_conquistador',
        fonte: {
          arquivo_md: 'fogo-e-sangue_01_a-conquista-de-aegon.md',
          livro: 'Fogo & Sangue - Volume 1',
          capitulo: 'A Conquista de Aegon',
        },
      },
      escolhas: [
        {
          id: 'esc_içar_velas_imediato',
          texto: 'Mobilizar a frota de Derivamarca e içar as velas rumo à costa de Westeros.',
          tipo: 'simples',
          nextNodeId: 'j1_a1_desembarque_agua_negra',
        },
        {
          id: 'esc_bencao_dos_sete',
          texto: 'Consagrar as espadas Fogonegro e Irmã Sombria nos óleos santos antes da travessia.',
          tipo: 'teste_atributo',
          atributo: 'cortesia',
          dc: 8,
          onSuccessNodeId: 'j1_a1_desembarque_agua_negra',
          onPartialFailureNodeId: 'j1_a1_desembarque_agua_negra',
        },

        {
          id: 'esc_maos_honra_orys',
          texto: 'Prometer a Orys perante as chamas de Balerion que ele pessoalmente tomará as terras e as armas do Arrogante.',
          tipo: 'simples',
          aprovacaoCompanheiros: { orys: 25, visenya: 15, rhaenys: -5 },
          delta: { sangue: 1, compostura: 1 },
          nextNodeId: 'j1_a1_desembarque_agua_negra',
        },
        {
          id: 'esc_maos_diplomacia_resposta',
          texto: 'Redigir a proclamação oficial do Rei Aegon a todos os lordes dos Sete Reinos, exigindo que dobrem o joelho ou pereçam.',
          tipo: 'simples',
          aprovacaoCompanheiros: { rhaenys: 15, visenya: 15, orys: 10 },
          delta: { compostura: 2 },
          nextNodeId: 'j1_a1_desembarque_agua_negra',
        }
      ],
    },

    // ==========================================
    // CENA 4: O DESEMBARQUE NA ÁGUA NEGRA
    // ==========================================
    j1_a1_desembarque_agua_negra: {
      id: 'j1_a1_desembarque_agua_negra',
      titulo: 'O Desembarque na Foz da Água Negra',
      anoHistorico: '2 a.C.',
      localizacao: 'Foz do Rio Água Negra',
      regionId: 'pedra_dragao',
      fallbackText: `Menos de três mil homens desembarcaram na foz do rio Água Negra, na costa oriental de Westeros. Era um exército minúsculo se comparado às hostes dos reis dos Sete Reinos, mas acima das velas enfunadas rasgavam os céus três titãs alados. Balerion, o Terror Negro, projetava uma sombra tão vasta sobre a floresta de pinheiros que vilas inteiras pareciam submergir em um eclipse súbito.

No topo da mais alta das três colinas que dominavam a enseada, Aegon cravou seu estandarte pessoal: o dragão vermelho de três cabeças cuspindo chamas sobre campo negro, rompendo a tradição heráldica valiriana para adotar os costumes das Casas nobres westerosi. Imediatamente, homens e operários começaram a erguer uma paliçada de madeira e terra: o embrião do Forte de Aegon (Aegonfort).

Os pequenos senhores da região costeira estavam desamparados. Seus suseranos distantes — Harrenhal a noroeste e Ponta Tempestade ao sul — nada podiam fazer a tempo. Apenas dois dias após o desembarque, os batedores avistaram cavaleiros das fortalezas vizinhas de Rosby e Stokeworth inspecionando os acampamentos com temor indisfarçado.`,
      internalVoices: [
        {
          atributo: 'comando',
          resultadoPassivo: 'SUCESSO',
          dcPassiva: 8,
          fala: 'Esta foz é a chave de todo o continente. Quem controlar este rio e estas três colinas governará o comércio de Westeros.',
        },
        {
          atributo: 'erudicao',
          resultadoPassivo: 'SUCESSO',
          dcPassiva: 8,
          fala: 'A paliçada de madeira logo dará lugar a pedras cinzentas. Estamos plantando a semente da capital do império.',
        },
      ],
      loreContext: {
        idVerbete: 'forte_aegon',
        fonte: {
          arquivo_md: 'fogo-e-sangue_01_a-conquista-de-aegon.md',
          livro: 'Fogo & Sangue - Volume 1',
          capitulo: 'A Conquista de Aegon',
        },
      },
      escolhas: [
        {
          id: 'esc_submeter_rosby',
          texto: 'Enviar as rainhas Visenya e Rhaenys montadas em dragões para exigir a rendição de Rosby e Stokeworth.',
          tipo: 'simples',
          nextNodeId: 'j1_a1_submissao_rosby_stokeworth',
        },
        {
          id: 'esc_reforcar_paliçada',
          texto: 'Consolidar as defesas do Forte de Aegon antes de estender o raio de manobra militar.',
          tipo: 'teste_atributo',
          atributo: 'comando',
          dc: 8,
          onSuccessNodeId: 'j1_a1_submissao_rosby_stokeworth',
          onPartialFailureNodeId: 'j1_a1_submissao_rosby_stokeworth',
        },

        {
          id: 'esc_desembarque_astucia_paliçada',
          texto: 'Mandar erguer fortificações rápidas e fossos de estacas com madeira das colinas antes que os nobres vizinhos reajam.',
          tipo: 'simples',
          aprovacaoCompanheiros: { visenya: 15, orys: 15 },
          delta: { flagsAdicionadas: ['fossos_do_forte_aegon'] },
          nextNodeId: 'j1_a1_submissao_rosby_stokeworth',
        },
        {
          id: 'esc_desembarque_pressagio_fogueiras',
          texto: 'Acender três grandes fogueiras no cume das Três Colinas para que a luz rubra seja vista do outro lado da baía.',
          tipo: 'simples',
          aprovacaoCompanheiros: { rhaenys: 20, orys: 10 },
          delta: { compostura: 1 },
          nextNodeId: 'j1_a1_submissao_rosby_stokeworth',
        }
      ],
    },

    // ==========================================
    // CENA 5: A SUBMISSÃO DE ROSBY E STOKEWORTH
    // ==========================================
    j1_a1_submissao_rosby_stokeworth: {
      id: 'j1_a1_submissao_rosby_stokeworth',
      titulo: 'A Queda de Rosby e Stokeworth',
      anoHistorico: '2 a.C.',
      localizacao: 'Terras da Coroa',
      regionId: 'pedra_dragao',
      fallbackText: `A marcha contra os castelos vizinhos foi rápida e implacável. Diante de Rosby, o rugido de Meraxes fez tremer as vigas de carvalho. Quando a rainha Rhaenys desceu dos céus com seus trajes de seda e montaria escarlate, os portões de ferro do castelo se abriram de par em par sem que uma única flecha fosse disparada. Lorde Rosby curvou os joelhos e entregou o pão e o sal, jurando lealdade eterna.

Em Stokeworth, no entanto, alguns besteiros tentaram a sorte nos adarves de pedra. Uma saraivada de virotes de ferro ricocheteou inútil no couro escamoso de Vhagar. Visenya Targaryen desceu em mergulho rasante, e as chamas douradas e azuis de seu dragão consumiram os telhados do pátio de armas. Com os cabelos chamuscados e a guarnição em pânico, o castelo rendeu-se imediatamente.

Ambos os senhores foram conduzidos ao Forte de Aegon na condição de prisioneiros honrados e vassalos juramentados. Suas tropas foram incorporadas ao exército do Conquistador, que agora crescia em número e confiança. Todavia, das cidades portuárias do norte chegavam notícias alarmantes: Lorde Darklyn de Valdocaso e Lorde Mooton de Lagoa da Donzela reuniram três mil infantes e marcharam para esmagar os invasores antes que o forte estivesse concluído.`,
      internalVoices: [
        {
          atributo: 'cortesia',
          resultadoPassivo: 'SUCESSO',
          dcPassiva: 8,
          fala: 'A clemência para com aqueles que se curvam é a ferramenta mais afiada da conquista. Poupai os derrotados e tereis homens leais.',
        },
        {
          atributo: 'furia',
          resultadoPassivo: 'SUCESSO',
          dcPassiva: 10,
          fala: 'Darklyn e Mooton acreditam que os números vencem guerras. Deixai que avancem até o alcance do hálito de Balerion.',
        },
      ],
      loreContext: {
        idVerbete: 'vhagar',
        fonte: {
          arquivo_md: 'fogo-e-sangue_01_a-conquista-de-aegon.md',
          livro: 'Fogo & Sangue - Volume 1',
          capitulo: 'A Conquista de Aegon',
        },
      },
      escolhas: [
        {
          id: 'esc_marchar_darklyn',
          texto: 'Liderar o exército pessoalmente ao lado de Orys Baratheon e interceptar as hostes de Valdocaso.',
          tipo: 'simples',
          nextNodeId: 'j1_a1_batalha_darklyn_mooton',
        },

        {
          id: 'esc_rosby_diplomacia',
          texto: 'Enviar emissários com termos benevolentes a Valdocaso, garantindo seus feudos se depuserem o aço.',
          tipo: 'teste_atributo',
          atributo: 'cortesia',
          dc: 8,
          onSuccessNodeId: 'j1_a1_batalha_darklyn_mooton',
          onPartialFailureNodeId: 'j1_a1_batalha_darklyn_mooton',
          aprovacaoCompanheiros: { rhaenys: 15, visenya: -10 },
        },
        {
          id: 'esc_rosby_espionagem',
          texto: 'Despachar batedores nas sombras para sabotar os piquetes de cavalaria de Valdocaso.',
          tipo: 'teste_atributo',
          atributo: 'astucia',
          dc: 9,
          onSuccessNodeId: 'j1_a1_batalha_darklyn_mooton',
          onPartialFailureNodeId: 'j1_a1_batalha_darklyn_mooton',
          tagOrigem: '[ESPIONAGEM VALIRIANA]',
          aprovacaoCompanheiros: { visenya: 15, orys: -5, rhaenys: -10 },
        },
        {
          id: 'esc_rosby_pressagio',
          texto: 'Consultar os mapas e os ventos costeiros com Rhaenys para fechar a fuga naval dos Darklyn.',
          tipo: 'simples',
          aprovacaoCompanheiros: { rhaenys: 15, orys: 10 },
          delta: { compostura: 1, flagsAdicionadas: ['bloqueio_naval_darklyn'] },
          nextNodeId: 'j1_a1_batalha_darklyn_mooton',
        }
      ],
    },

    // ==========================================
    // CENA 6: A BATALHA CONTRA DARKLYN E MOOTON
    // ==========================================
    j1_a1_batalha_darklyn_mooton: {
      id: 'j1_a1_batalha_darklyn_mooton',
      titulo: 'O Primeiro Teste de Ferro: Valdocaso e Lagoa da Donzela',
      anoHistorico: '2 a.C.',
      localizacao: 'Campos de Valdocaso',
      regionId: 'pedra_dragao',
      fallbackText: `Os três mil homens de Robin Darklyn e Jon Mooton formaram uma sólida parede de lanças e escudos nos descampados ao norte da baía. Cavaleiros em cotas de malha prateada gritavam ordens, confiantes em sua superioridade numérica sobre os recém-desembarcados. Orys Baratheon posicionou a vanguarda valiriana na borda de um riacho barrento, empunhando um machado de guerra de dois gumes.

O ar subitamente ficou denso com cheiro de enxofre e ozônio. As nuvens se rasgaram com um estalo ensurdecedor e Balerion, o Terror Negro, desabou dos céus em chamas cor de azeviche. O choque térmico transformou escudos de carvalho em cinzas instantâneas e fez o aço fundir sobre a carne dos cavaleiros.

O combate corpo a corpo eclodiu nas alas não tocadas pelo fogo. Lorde Darklyn liderava uma investida desesperada para perfurar a linha de Orys e alcançar a praia, enquanto Jon Mooton buscava reagrupar os arqueiros em uma colina pedregosa. Uma decisão audaciosa de combate decidirá a velocidade e o custo desta primeira grande vitória.`,
      internalVoices: [
        {
          atributo: 'comando',
          resultadoPassivo: 'SUCESSO',
          dcPassiva: 9,
          fala: 'Mantenha a infantaria firme enquanto Balerion cerca as rotas de fuga. Uma vitória esmagadora evitará novas insurreições na baía.',
        },
        {
          atributo: 'furia',
          resultadoPassivo: 'SUCESSO',
          dcPassiva: 11,
          fala: 'Orys precisa de apoio na vanguarda! Desembainhai Fogonegro e mostrai aos lordes de Westeros como luta um herdeiro de Valíria!',
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
          id: 'esc_duelo_vanguarda_mortal',
          texto: 'Cavalgar à frente de batalha para confrontar Robin Darklyn no choque de ferro.',
          tipo: 'teste_atributo',
          atributo: 'furia',
          dc: 11,
          riscoMortal: true,
          onSuccessNodeId: 'j1_a1_vitoria_darklyn',
          onPartialFailureNodeId: 'j1_a1_vitoria_darklyn',
          onCriticalFailureNodeId: 'j1_a1_morte_darklyn',
        },
        {
          id: 'esc_manobra_aerea_balerion',
          texto: 'Permanecer nas costas de Balerion incendiando a retaguarda inimiga para forçar o cerco.',
          tipo: 'teste_atributo',
          atributo: 'comando',
          dc: 9,
          onSuccessNodeId: 'j1_a1_vitoria_darklyn',
          onPartialFailureNodeId: 'j1_a1_vitoria_darklyn',
        },
      
        {
          id: 'esc_j1_a1_investigar_rotas_baia',
          texto: 'Mapear as enseadas da Baía dos Caranguejos e subornar informantes em Valdocaso.',
          tipo: 'teste_atributo',
          atributo: 'astucia',
          dc: 11,
          onSuccessNodeId: 'j1_a1_coroacao_forte_aegon',
          onPartialFailureNodeId: 'j1_a1_coroacao_forte_aegon',
          aprovacaoCompanheiros: { daemon_v: 10, visenya: 5 },
          delta: { mundo: { rotas_baia_mapeadas: true }, ficha: { compostura: 1 } },
        },
        {
          id: 'esc_j1_a1_invocar_fogo_exemplar',
          texto: 'Incendiar as muralhas ribeirinhas com Balerion como demonstração avassaladora de poder!',
          tipo: 'teste_atributo',
          atributo: 'furia',
          dc: 12,
          tagOrigem: '[TERROR VALIRIANO]',
          onSuccessNodeId: 'j1_a1_coroacao_forte_aegon',
          onPartialFailureNodeId: 'j1_a1_coroacao_forte_aegon',
          aprovacaoCompanheiros: { visenya: 15, rhaenys: -10 },
          delta: { mundo: { terror_das_torres: true }, ficha: { honra: -1 } },
        },
      ],
    },

    // ==========================================
    // CENA 7: MORTE EM COMBATE (CANÔNICA)
    // ==========================================
    j1_a1_morte_darklyn: {
      id: 'j1_a1_morte_darklyn',
      titulo: 'Morte Canônica: O Sangue do Dragão Derramado',
      anoHistorico: '2 a.C.',
      localizacao: 'Campos de Valdocaso',
      regionId: 'pedra_dragao',
      isEnding: true,
      fallbackText: `No tumulto lamacento do campo de batalha, a fumaça das chamas de Balerion cegou cavaleiros e montarias. Em meio ao caos da vanguarda, uma lança de freixo arremessada com fúria cega por um veterano de Darklyn encontrou uma brecha sob a couraça de aço valiriano de Aegon.

O Conquistador tombou na terra ensanguentada antes que os Sete Reinos pudessem ver a coroação do dragão. Orys Baratheon soltou um brado de dor e desespero, e os céus se encheram com os gritos ensurdecedores de Balerion e Vhagar, que queimaram o vale inteiro em um luto incontrolável. 

A Conquista morreu em seu nascedouro. Westeros permaneceu dividida entre guerras perpétuas, e a lenda das Três Cabeças do Dragão desfez-se nas brumas da história.`,
      internalVoices: [
        {
          atributo: 'pressagio',
          resultadoPassivo: 'FALHA',
          dcPassiva: 10,
          fala: 'A chama se extinguiu antes que o Trono de Ferro fosse erguido. O destino foi quebrado.',
        },
      ],
      loreContext: {
        fonte: {
          arquivo_md: 'fogo-e-sangue_01_a-conquista-de-aegon.md',
          livro: 'Fogo & Sangue - Volume 1',
          capitulo: 'A Conquista de Aegon',
        },
        notaHistorica: 'Ponto de divergência: A morte precoce de Aegon em Valdocaso impediria a fundação dos Sete Reinos.',
      },
      escolhas: [],
    },

    // ==========================================
    // CENA 8: A VITÓRIA E RENDIÇÃO DOS LORDES
    // ==========================================
    j1_a1_vitoria_darklyn: {
      id: 'j1_a1_vitoria_darklyn',
      titulo: 'A Rendição de Valdocaso e Lagoa da Donzela',
      anoHistorico: '2 a.C.',
      localizacao: 'Forte de Aegon',
      regionId: 'pedra_dragao',
      fallbackText: `A vitória foi total e retumbante. Lorde Jon Mooton sucumbiu no campo de batalha, trespassado por lanças, enquanto Lorde Robin Darklyn, coberto de cinzas e com sua guarda aniquilada, entregou sua espada aos pés de Orys Baratheon. A hoste inimiga dispersou-se pelos bosques ou rendeu suas armas.

Aegon marchou sobre Valdocaso e Lagoa da Donzela sem necessidade de sitiar as muralhas. O irmão de Jon Mooton abriu os portões da cidade portuária e prestou homenagem ao dragão, enquanto o filho herdeiro de Darklyn fez o mesmo em Valdocaso. Ambos os senhores juraram fidelidade e tiveram seus castelos e rendas confirmados pelo Conquistador.

O estuário da Água Negra e toda a costa leste agora pertenciam à Casa Targaryen. Era o momento de consolidar a ordem política e realizar o ato que selaria para sempre o destino do continente: a proclamação oficial do Rei de toda a Westeros.`,
      internalVoices: [
        {
          atributo: 'cortesia',
          resultadoPassivo: 'SUCESSO',
          dcPassiva: 8,
          fala: 'Restaurar as terras aos herdeiros de Mooton e Darklyn transforma antigos inimigos em defensores do seu estandarte.',
        },
        {
          atributo: 'comando',
          resultadoPassivo: 'SUCESSO',
          dcPassiva: 9,
          fala: 'Os pequenos senhores já nos temem e respeitam. Chegou a hora de reunir a corte e erguer a coroa.',
        },
      ],
      loreContext: {
        fonte: {
          arquivo_md: 'fogo-e-sangue_01_a-conquista-de-aegon.md',
          livro: 'Fogo & Sangue - Volume 1',
          capitulo: 'A Conquista de Aegon',
        },
      },
      escolhas: [
        {
          id: 'esc_ir_coroacao',
          texto: 'Retornar ao Forte de Aegon para a cerimônia de coroação e distribuição dos grandes ofícios do reino.',
          tipo: 'simples',
          nextNodeId: 'j1_a1_coroacao_forte_aegon',
        },

        {
          id: 'esc_darklyn_furia_execucao',
          texto: 'Exigir reféns nobres imediatos e confiscar as armas de Valdocaso para o arsenal real.',
          tipo: 'simples',
          aprovacaoCompanheiros: { visenya: 15, rhaenys: -10, orys: 10 },
          delta: { flagsAdicionadas: ['ouro_de_valdocaso'] },
          nextNodeId: 'j1_a1_coroacao_forte_aegon',
        },
        {
          id: 'esc_darklyn_cortesia_perdao',
          texto: 'Estender a mão a Robin Darklyn e Jon Mooton com perdão régio, transformando inimigos em aliados fiéis.',
          tipo: 'teste_atributo',
          atributo: 'cortesia',
          dc: 8,
          onSuccessNodeId: 'j1_a1_coroacao_forte_aegon',
          onPartialFailureNodeId: 'j1_a1_coroacao_forte_aegon',
          aprovacaoCompanheiros: { rhaenys: 20, visenya: -15 },
        },
        {
          id: 'esc_darklyn_estrada_rei',
          texto: 'Ordenar que os agrimensores tracem a primeira Estrada Real unindo o Forte aos portos conquistados.',
          tipo: 'simples',
          aprovacaoCompanheiros: { rhaenys: 10, orys: 10 },
          delta: { flagsAdicionadas: ['marco_estrada_real'] },
          nextNodeId: 'j1_a1_coroacao_forte_aegon',
        }
      ],
    },

    // ==========================================
    // CENA 9: A COROAÇÃO NO FORTE DE AEGON
    // ==========================================
    j1_a1_coroacao_forte_aegon: {
      id: 'j1_a1_coroacao_forte_aegon',
      titulo: 'A Coroação e o Primeiro Conselho do Reino',
      anoHistorico: '2 a.C.',
      localizacao: 'O Forte de Aegon (Aegonfort)',
      regionId: 'pedra_dragao',
      fallbackText: `No pátio central do Forte de Aegon, diante de uma multidão de soldados, marinheiros, meistres e senhores recém-submissos, a rainha Visenya Targaryen ergueu a coroa régia: um circuito de aço valiriano puro, cravejado com grandes rubis que cintilavam como brasas sob a luz da aurora. Com passos solenes, depositou-a sobre os cabelos prateados de Aegon.

Ao lado, a rainha Rhaenys proclamou em alta voz perante os estandartes: "Aegon, Primeiro de Seu Nome, Rei de Toda Westeros e Escudo de Seu Povo!". Os dragões rugiram em uníssono nas três colinas, fazendo o mar vibrar em resposta.

Aegon nomeou imediatamente os primeiros grandes dignitários do império: Orys Baratheon recebeu o título de "Meu escudo, minha força, minha forte Mão direita", tornando-se a primeira Mão do Rei da história; Lorde Daemon Velaryon foi nomeado Mestre dos Navios e comandante da frota real; e Lorde Crispian Celtigar assumiu o encargo de Mestre da Moeda. O reino estava fundado, mas os grandes reis de Westeros mobilizavam seus exércitos. Era preciso decidir para onde marchar.`,
      internalVoices: [
        {
          atributo: 'comando',
          resultadoPassivo: 'SUCESSO',
          dcPassiva: 10,
          fala: 'Westeros possui três frentes cruciais: a frota do Vale no mar, a tirania de Harrenhal nos rios e a fúria de Argilac nas matas do sul. Escolhei onde seu foco trará a maior glória.',
        },
        {
          atributo: 'erudicao',
          resultadoPassivo: 'SUCESSO',
          dcPassiva: 8,
          fala: 'A coroação é apenas um símbolo. A realidade do trono dependerá das campanhas que agora se iniciam.',
        },
      ],
      loreContext: {
        idVerbete: 'trono_de_ferro',
        fonte: {
          arquivo_md: 'fogo-e-sangue_01_a-conquista-de-aegon.md',
          livro: 'Fogo & Sangue - Volume 1',
          capitulo: 'A Conquista de Aegon',
        },
      },
      escolhas: [
        {
          id: 'esc_frente_naval',
          texto: 'Apoiar Lorde Daemon Velaryon e Visenya na Batalha Naval contra a frota de Vila Gaivota.',
          tipo: 'simples',
          nextNodeId: 'j1_a1_frente_naval_valegaivota',
        },
        {
          id: 'esc_frente_fluvial',
          texto: 'Marchar para noroeste com Balerion rumo ao Tridente para desafiar o império de Harren o Negro.',
          tipo: 'simples',
          nextNodeId: 'j1_a1_frente_fluvial_harrenhal',
        },
        {
          id: 'esc_frente_tempestade',
          texto: 'Acompanhar a vanguarda sulista com Orys Baratheon e Rhaenys rumo às florestas de Ponta Tempestade.',
          tipo: 'simples',
          nextNodeId: 'j1_a1_frente_tempestade_orys',
        },
      ],
    },

    // ==========================================
    // CENA 10: RAMO NAVAL (VILA GAIVOTA)
    // ==========================================
    j1_a1_frente_naval_valegaivota: {
      id: 'j1_a1_frente_naval_valegaivota',
      titulo: 'A Batalha das Águas de Vila Gaivota',
      anoHistorico: '2 a.C.',
      localizacao: 'Águas de Vila Gaivota',
      regionId: 'vale',
      fallbackText: `A frota Targaryen, comandada por Lorde Daemon Velaryon e acompanhada pela rainha Visenya nas asas de Vhagar, navegou para o norte em direção a Vila Gaivota. Contudo, os senhores do Vale de Arryn haviam reunido uma armada considerável com auxílio de mercenários das Três Irmãs e galés de guerra bravosis.

Nas águas turbulentas da baía, a vanguarda inimiga realizou uma emboscada náutica de grande astúcia. A nau capitânia de Lorde Daemon foi cercada por quatro trirremes do Vale. Virotes e arpões choviam sobre a coberta de carvalho enquanto o Mestre dos Navios empunhava a espada na proa, cercado por guerreiros de armadura de bronze.

Nos céus, Visenya preparava o mergulho incendiário de Vhagar, mas o vento forte e o emaranhado das velas dificultavam um ataque aéreo que não atingisse as embarcações aliadas. Uma intervenção tática audaciosa pode decidir o destino de Lorde Daemon Velaryon.`,
      internalVoices: [
        {
          atributo: 'pressagio',
          resultadoPassivo: 'SUCESSO',
          dcPassiva: 12,
          fala: 'O destino de Daemon está por um fio nas águas salgadas. Se o vento mudar agora, o Mestre dos Navios perecerá antes de ver o império consolidado.',
        },
        {
          atributo: 'comando',
          resultadoPassivo: 'SUCESSO',
          dcPassiva: 10,
          fala: 'Manobre a esquadra de reserva para abrir uma cunha de fogo entre a nau capitânia e as galés dos Arryn!',
        },
      ],
      loreContext: {
        idVerbete: 'daemon_velaryon',
        fonte: {
          arquivo_md: 'fogo-e-sangue_01_a-conquista-de-aegon.md',
          livro: 'Fogo & Sangue - Volume 1',
          capitulo: 'A Conquista de Aegon',
        },
      },
      escolhas: [
        {
          id: 'esc_salvar_daemon',
          texto: 'Executar um mergulho arriscado com Vhagar cortando os mastros inimigos para resgatar Lorde Daemon.',
          tipo: 'teste_atributo',
          atributo: 'pressagio',
          dc: 12,
          onSuccessNodeId: 'j1_a1_daemon_velaryon_salvo',
          onPartialFailureNodeId: 'j1_a1_daemon_velaryon_morto',
        },
        {
          id: 'esc_ataque_incendiario_frota',
          texto: 'Queimar impiedosamente toda a baía de Vila Gaivota priorizando a destruição da frota Arryn.',
          tipo: 'teste_atributo',
          atributo: 'furia',
          dc: 9,
          onSuccessNodeId: 'j1_a1_daemon_velaryon_morto',
          onPartialFailureNodeId: 'j1_a1_daemon_velaryon_morto',
        },

        {
          id: 'esc_naval_astucia_fogo_grego',
          texto: 'Posicionar barris de piche e enxofre nas trirremes Velaryon para armar um incêndio traiçoeiro na boca da baía.',
          tipo: 'simples',
          aprovacaoCompanheiros: { visenya: 20, daemon_v: 15, rhaenys: -10 },
          delta: { flagsAdicionadas: ['armadilha_piche_naval'] },
          nextNodeId: 'j1_a1_daemon_velaryon_salvo',
        },
        {
          id: 'esc_naval_pressagio_mar',
          texto: 'Consultar os mapas de correntes marítimas e marés com Daemon Velaryon para manobrar na vazante.',
          tipo: 'simples',
          aprovacaoCompanheiros: { daemon_v: 25, rhaenys: 10 },
          delta: { compostura: 1 },
          nextNodeId: 'j1_a1_daemon_velaryon_salvo',
        }
      ],
    },

    // ==========================================
    // CENA 11: WHAT IF - DAEMON VELARYON SALVO
    // ==========================================
    j1_a1_daemon_velaryon_salvo: {
      id: 'j1_a1_daemon_velaryon_salvo',
      titulo: 'Divergência Canônica: Daemon Velaryon Resgatado',
      anoHistorico: '2 a.C.',
      localizacao: 'Vila Gaivota',
      regionId: 'vale',
      fallbackText: `Contra todas as probabilidades e desafiando o registro das antigas crônicas da Cidadela, o mergulho cirúrgico de Vhagar despedaçou os mastros das trirremes Arryn sem tocar a nau capitânia de Derivamarca. Uma lufada de vento favorável permitiu a Lorde Daemon Velaryon repelir os invasores e saltar a salvo para a esquadra de reserva.

Embora um terço dos navios Targaryen tenha sido danificado nas águas rasas, a frota do Vale foi consumida pelas chamas até a última quilha. O porto de Vila Gaivota rendeu-se, e Lorde Daemon sobreviveu para liderar a supremacia marítima dos Targaryen por muitas décadas vindouras.

A notícia da vitória naval e da sobrevivência do Mestre dos Navios ecoou por todo o Mar Estreito, consolidando o controle absoluto das rotas de suprimentos para a campanha que se estenderia até o coração de Harrenhal e o Campo de Fogo.`,
      internalVoices: [
        {
          atributo: 'comando',
          resultadoPassivo: 'SUCESSO',
          dcPassiva: 10,
          fala: 'A preservação de Daemon Velaryon garante que o poderio naval dos valirianos permaneça intacto. O Mar Estreito é nosso.',
        },
      ],
      loreContext: {
        fonte: {
          arquivo_md: 'fogo-e-sangue_01_a-conquista-de-aegon.md',
          livro: 'Fogo & Sangue - Volume 1',
          capitulo: 'A Conquista de Aegon',
        },
        notaHistorica: 'Ponto de divergência original: Na história canônica, Lorde Daemon Velaryon morre na Batalha de Vila Gaivota.',
      },
      escolhas: [
        {
          id: 'esc_concluir_ramo_naval',
          texto: 'Consolidar a vitória naval e registrar o término vitorioso do Ato I.',
          tipo: 'simples',
          nextNodeId: 'j1_a1_checkpoint_naval',
        },

        {
          id: 'esc_daemon_v_reorganizar_frota',
          texto: 'Ordenar que Daemon Velaryon mantenha patrulhas perpétuas no Mar Estreito para asfixiar os Arryn.',
          tipo: 'simples',
          aprovacaoCompanheiros: { daemon_v: 20, visenya: 10 },
          delta: { flagsAdicionadas: ['patrulha_velaryon_mar_estreito'] },
          nextNodeId: 'j1_a1_checkpoint_naval',
        },
        {
          id: 'esc_daemon_v_celebrar_salvamento',
          texto: 'Brindar ao resgate de Daemon no convés com os marinheiros de Derivamarca e conceder-lhe honras de Mestre dos Navios.',
          tipo: 'simples',
          aprovacaoCompanheiros: { daemon_v: 25, orys: 15, rhaenys: 15 },
          delta: { compostura: 2, sangue: 1 },
          nextNodeId: 'j1_a1_checkpoint_naval',
        }
      ],
    },

    // ==========================================
    // CENA 12: CANÔNICA - MORTE DE DAEMON VELARYON
    // ==========================================
    j1_a1_daemon_velaryon_morto: {
      id: 'j1_a1_daemon_velaryon_morto',
      titulo: 'A Batalha das Chamas e o Sacrifício de Velaryon',
      anoHistorico: '2 a.C.',
      localizacao: 'Vila Gaivota',
      regionId: 'vale',
      fallbackText: `A batalha foi sangrenta e implacável. Embora Visenya e Vhagar tenham descido dos céus como um furacão de fogo que incinerou a frota do Vale até a linha d'água, o auxílio chegou tarde demais para a nau capitânia. Lorde Daemon Velaryon tombou com a espada na mão, cravado de flechas nas águas frias da baía.

A vitória tática pertenceu aos Targaryen, mas o preço foi amargo. A Casa Arryn perdeu sua frota e recolheu-se assustada para o alto do Ninho da Águia, enquanto Derivamarca chorava seu senhor mais venerado.

O controle do mar costeiro estava garantido, mas a morte de Daemon ensinou ao jovem império que os dragões, por mais poderosos que fossem, não podiam estar em todos os lugares ao mesmo tempo.`,
      internalVoices: [
        {
          atributo: 'erudicao',
          resultadoPassivo: 'SUCESSO',
          dcPassiva: 8,
          fala: 'Assim atestam os anais dos meistres: o sangue de Derivamarca foi o primeiro grande tributo pago pela coroa de Westeros.',
        },
      ],
      loreContext: {
        fonte: {
          arquivo_md: 'fogo-e-sangue_01_a-conquista-de-aegon.md',
          livro: 'Fogo & Sangue - Volume 1',
          capitulo: 'A Conquista de Aegon',
        },
      },
      escolhas: [
        {
          id: 'esc_concluir_ramo_naval_canon',
          texto: 'Honrar a memória de Lorde Daemon e assinalar a conclusão do Ato I.',
          tipo: 'simples',
          nextNodeId: 'j1_a1_checkpoint_naval',
        },

        {
          id: 'esc_daemon_v_luto_furia',
          texto: 'Jurar perante o mar que Vila Gaivota e os Arryn pagarão com cinzas pelo sangue derramado do Mestre dos Navios.',
          tipo: 'simples',
          aprovacaoCompanheiros: { visenya: 20, orys: 10, rhaenys: -10 },
          delta: { flagsAdicionadas: ['juramento_vinganca_velaryon'] },
          nextNodeId: 'j1_a1_checkpoint_naval',
        },
        {
          id: 'esc_daemon_v_funeral_solene',
          texto: 'Conduzir os ritos fúnebres valirianos nas águas de Vila Gaivota com os cânticos de Rhaenys e chamas de Vhagar.',
          tipo: 'simples',
          aprovacaoCompanheiros: { rhaenys: 20, orys: 15, visenya: 10 },
          delta: { compostura: 1, flagsAdicionadas: ['funeral_solene_velaryon'] },
          nextNodeId: 'j1_a1_checkpoint_naval',
        }
      ],
    },

    // ==========================================
    // CENA 13: RAMO FLUVIAL (HARRENHAL & TULLY)
    // ==========================================
    j1_a1_frente_fluvial_harrenhal: {
      id: 'j1_a1_frente_fluvial_harrenhal',
      titulo: 'A Marcha para o Olho de Deus',
      anoHistorico: '2 a.C.',
      localizacao: 'As Terras Fluviais',
      regionId: 'tridente',
      fallbackText: `Aegon montou Balerion e liderou a coluna principal rumo a noroeste, cruzando as florestas de salgueiros em direção ao Olho de Deus. O rei Harren, o Negro, ciente do desembarque, havia convocado os senhores dos rios e retirado-se para as muralhas monstruosas de Harrenhal, confiante de que suas torres gigantescas resistiriam a qualquer cerco terrestre.

No entanto, o ódio contra os homens de ferro fermentava sob a superfície das Terras Fluviais há gerações. Os meistres interceptaram emissários secretos de Lorde Edmyn Tully de Correrrio. O senhor da foz do Ramo Vermelho desejava livrar-se do jugo opressor de Harrenhal, mas temia que os dragões trouxessem apenas um novo tipo de tirania.

Uma negociação astuta com os Tully pode desencadear a revolta de todos os senhores do Tridente antes mesmo que as cinzas comecem a cair sobre Harrenhal.`,
      internalVoices: [
        {
          atributo: 'astucia',
          resultadoPassivo: 'SUCESSO',
          dcPassiva: 10,
          fala: 'Edmyn Tully é prudente e respeitado pelos senhores dos rios. Se garantirdes a Correrrio a supremacia sobre o Tridente, ele marchará convosco.',
        },
        {
          atributo: 'comando',
          resultadoPassivo: 'SUCESSO',
          dcPassiva: 9,
          fala: 'Sem os vassalos ribeirinhos, Harrenhal torna-se uma ilha de pedra isolada no meio do pântano.',
        },
      ],
      loreContext: {
        idVerbete: 'harrenhal',
        fonte: {
          arquivo_md: 'fogo-e-sangue_01_a-conquista-de-aegon.md',
          livro: 'Fogo & Sangue - Volume 1',
          capitulo: 'A Conquista de Aegon',
        },
      },
      escolhas: [
        {
          id: 'esc_alianca_tully',
          texto: 'Enviar emissários secretos prometendo elevar a Casa Tully à suserania do Tridente em troca de sua rebelião.',
          tipo: 'teste_atributo',
          atributo: 'astucia',
          dc: 10,
          onSuccessNodeId: 'j1_a1_tully_revolta',
          onPartialFailureNodeId: 'j1_a1_tully_revolta',
        },
        {
          id: 'esc_ataque_direto_olho_de_deus',
          texto: 'Avançar diretamente contra as barcas de guerra dos homens de ferro na Batalha dos Juncos.',
          tipo: 'teste_atributo',
          atributo: 'comando',
          dc: 9,
          onSuccessNodeId: 'j1_a1_batalha_dos_juncos',
          onPartialFailureNodeId: 'j1_a1_batalha_dos_juncos',
        },

        {
          id: 'esc_fluvial_astucia_infiltrar',
          texto: 'Mandar espiões fantasiados de barqueiros do lago para semear boatos de revolta entre a guarnição de Harren.',
          tipo: 'simples',
          aprovacaoCompanheiros: { visenya: 15, orys: 5 },
          delta: { flagsAdicionadas: ['boatos_semeados_harrenhal'] },
          nextNodeId: 'j1_a1_tully_revolta',
        },
        {
          id: 'esc_fluvial_bencao_rio',
          texto: 'Oferecer pão e sal aos ribeirinhos e prometer que as leis de ferro dos Hoare nunca mais vigorarão no Tridente.',
          tipo: 'simples',
          aprovacaoCompanheiros: { rhaenys: 20, orys: 15, visenya: -5 },
          delta: { compostura: 2 },
          nextNodeId: 'j1_a1_tully_revolta',
        }
      ],
    },

    // ==========================================
    // CENA 14: A REVOLTA DE CORRERRIO
    // ==========================================
    j1_a1_tully_revolta: {
      id: 'j1_a1_tully_revolta',
      titulo: 'A Aliança de Correrrio e a Queda dos Hoare',
      anoHistorico: '2 a.C.',
      localizacao: 'Correrrio & Tridente',
      regionId: 'tridente',
      fallbackText: `A resposta de Lorde Edmyn Tully transformou a guerra nos rios em uma avalanche. Em Correrrio, a truta prateada foi içada ao lado do dragão vermelho de três cabeças. O senhor do Ramo Vermelho abandonou a causa de Harrenhal e cavalgou com todos os seus cavaleiros para encontrar Aegon nas margens do lago.

Seguindo o exemplo de Tully, os lordes Mallister de Guardamar, Vance de Pouso do Viajante, Bracken de Barreira de Pedra e Blackwood de Solar de Corvos rebelaram-se em uníssono. Em vez de enfrentar um continente hostil, Aegon viu seu exército multiplicar-se com quarenta mil guerreiros ribeirinhos sedentos de vingança contra a crueldade dos homens de ferro.

Harrenhal estava completamente isolada do resto do mundo, cercada por terra e condenada pelo ar. A aliança com Correrrio estava selada, abrindo o caminho para o fatídico confronto do incêndio das cinco torres.`,
      internalVoices: [
        {
          atributo: 'cortesia',
          resultadoPassivo: 'SUCESSO',
          dcPassiva: 8,
          fala: 'A lealdade de Edmyn Tully foi forjada na honra e no alívio de um povo oprimido. O Tridente lhe pertence.',
        },
      ],
      loreContext: {
        idVerbete: 'edmyn_tully',
        fonte: {
          arquivo_md: 'fogo-e-sangue_01_a-conquista-de-aegon.md',
          livro: 'Fogo & Sangue - Volume 1',
          capitulo: 'A Conquista de Aegon',
        },
      },
      escolhas: [
        {
          id: 'esc_concluir_ramo_fluvial',
          texto: 'Cercar as muralhas de Harrenhal e registrar o término do Ato I nas Terras Fluviais.',
          tipo: 'simples',
          nextNodeId: 'j1_a1_checkpoint_fluvial',
        },

        {
          id: 'esc_tully_pacto_honra',
          texto: 'Prometer formalmente a Edmyn Tully a soberania de Correrrio sobre todos os lordes do Tridente quando Harren cair.',
          tipo: 'simples',
          aprovacaoCompanheiros: { orys: 15, rhaenys: 15, visenya: -5 },
          delta: { flagsAdicionadas: ['promessa_tully_supremacia'] },
          nextNodeId: 'j1_a1_checkpoint_fluvial',
        },
        {
          id: 'esc_tully_astucia_bloqueio',
          texto: 'Despachar cavaleiros ribeirinhos para queimar os moinhos e cortar as linhas de grão que abastecem Harrenhal.',
          tipo: 'simples',
          aprovacaoCompanheiros: { visenya: 15, orys: 10 },
          delta: { flagsAdicionadas: ['cerco_suprimentos_harrenhal'] },
          nextNodeId: 'j1_a1_checkpoint_fluvial',
        }
      ],
    },

    // ==========================================
    // CENA 15: A BATALHA DOS JUNCOS NO LAGO
    // ==========================================
    j1_a1_batalha_dos_juncos: {
      id: 'j1_a1_batalha_dos_juncos',
      titulo: 'A Batalha dos Juncos e os Filhos de Harren',
      anoHistorico: '2 a.C.',
      localizacao: 'O Olho de Deus',
      regionId: 'tridente',
      fallbackText: `Nas margens alagadas e juncais do sul do Olho de Deus, dois filhos de Harren atacaram de surpresa as colunas de suprimento Targaryen com barcaças de fundo chato e guerreiros de machado. O choque foi feroz nas águas turvas do pântano, e a infantaria sofreu baixas significativas no lodo.

Contudo, antes que os homens de ferro pudessem retornar à segurança de suas embarcações com os despojos, o rugido de Balerion quebrou o nevoeiro do lago. As chamas negras incineraram as barcaças como se fossem gravetos secos, fervendo a água rasa e cozinhando os guerreiros em suas próprias cotas de malha.

Ambos os filhos de Harren pereceram sob o hálito do Terror Negro. As notícias da catástrofe alcançaram as muralhas de Harrenhal com a força de um raio, quebrando o moral da guarnição nas vésperas do cerco final.`,
      internalVoices: [
        {
          atributo: 'furia',
          resultadoPassivo: 'SUCESSO',
          dcPassiva: 9,
          fala: 'Nenhuma madeira boia sob o fogo do Terror Negro. A linhagem dos reis tiranos começou a sangrar.',
        },
      ],
      loreContext: {
        fonte: {
          arquivo_md: 'fogo-e-sangue_01_a-conquista-de-aegon.md',
          livro: 'Fogo & Sangue - Volume 1',
          capitulo: 'A Conquista de Aegon',
        },
      },
      escolhas: [
        {
          id: 'esc_concluir_ramo_fluvial_direto',
          texto: 'Avançar com as hostes vitoriosas rumo às muralhas de Harrenhal e fechar o Ato I.',
          tipo: 'simples',
          nextNodeId: 'j1_a1_checkpoint_fluvial',
        },

        {
          id: 'esc_juncos_queimar_barcos',
          texto: 'Sobrevoar os juncos com Balerion até incendiar a última barcaça de fundo chato dos homens de ferro.',
          tipo: 'simples',
          aprovacaoCompanheiros: { visenya: 20, rhaenys: -5, orys: 10 },
          delta: { flagsAdicionadas: ['flotilha_harren_aniquilada'] },
          nextNodeId: 'j1_a1_checkpoint_fluvial',
        },
        {
          id: 'esc_juncos_resgate_pescadores',
          texto: 'Prestar socorro às vilas de pescadores do Olho de Deus massacradas por Harren, conquistando a veneração popular.',
          tipo: 'simples',
          aprovacaoCompanheiros: { rhaenys: 20, orys: 15, visenya: -10 },
          delta: { compostura: 2, flagsAdicionadas: ['gratidao_povo_tridente'] },
          nextNodeId: 'j1_a1_checkpoint_fluvial',
        }
      ],
    },

    // ==========================================
    // CENA 16: RAMO DA TEMPESTADE (ORYS & RHAENYS)
    // ==========================================
    j1_a1_frente_tempestade_orys: {
      id: 'j1_a1_frente_tempestade_orys',
      titulo: 'A Marcha pelas Matas da Tempestade',
      anoHistorico: '2 a.C.',
      localizacao: 'Florestas da Tempestade',
      regionId: 'tempestade',
      fallbackText: `Ao sul, a Mão do Rei, Orys Baratheon, liderava o exército de avanço rumo a Ponta Tempestade, com a rainha Rhaenys voando alto nas asas douradas de Meraxes. Contudo, as Terras da Tempestade eram famosas por seus despenhadeiros cobertos de mata virgem e chuvas torrenciais que transformavam caminhos em torrentes de lama.

Ao cruzarem a travessia do rio Wendwater, três valorosos vassalos de Argilac — Lorde Errol, Lorde Fell e Lorde Buckler — armaram uma emboscada traiçoeira na garganta da floresta. Milhares de flechas emplumadas cortaram a folhagem úmida, derrubando mais de mil homens da vanguarda Targaryen.

Orys Baratheon desembainhou sua espada de aço escuro no meio da trilha estreita. A rainha Rhaenys desceu rasgando a copa das árvores em busca dos atiradores ocultos, mas o fogo no meio da mata fechada ameaçava cercar tanto inimigos quanto aliados em uma fogueira incontrolável.`,
      internalVoices: [
        {
          atributo: 'comando',
          resultadoPassivo: 'SUCESSO',
          dcPassiva: 9,
          fala: 'Errol e Fell conhecem cada palmo destas matas. Retirai a coluna da garganta antes que as chamas nos encurralem!',
        },
        {
          atributo: 'furia',
          resultadoPassivo: 'SUCESSO',
          dcPassiva: 11,
          fala: 'Uma investida frontal na mata quebrará o cerco dos arqueiros. Mostrai a força do punho do Baratheon!',
        },
      ],
      loreContext: {
        idVerbete: 'orys_baratheon',
        fonte: {
          arquivo_md: 'fogo-e-sangue_01_a-conquista-de-aegon.md',
          livro: 'Fogo & Sangue - Volume 1',
          capitulo: 'A Conquista de Aegon',
        },
      },
      escolhas: [
        {
          id: 'esc_contra_emboscada_mortal',
          texto: 'Liderar um contra-ataque feroz na mata contra o posto de comando de Lorde Errol.',
          tipo: 'teste_atributo',
          atributo: 'furia',
          dc: 11,
          riscoMortal: true,
          onSuccessNodeId: 'j1_a1_vitoria_bosque',
          onPartialFailureNodeId: 'j1_a1_vitoria_bosque',
          onCriticalFailureNodeId: 'j1_a1_morte_emboscada_tempestade',
        },
        {
          id: 'esc_incendiar_bosque_meraxes',
          texto: 'Ordenar a Meraxes que crie uma barreira de fogo à retaguarda da emboscada forçando a rendição.',
          tipo: 'teste_atributo',
          atributo: 'comando',
          dc: 8,
          onSuccessNodeId: 'j1_a1_vitoria_bosque',
          onPartialFailureNodeId: 'j1_a1_vitoria_bosque',
        },
      
        {
          id: 'esc_j1_a1_enviar_batedores_degraus',
          texto: 'Mapear as trilhas da Mata de Chuva para evitar emboscadas dos homens de Argilac.',
          tipo: 'teste_atributo',
          atributo: 'astucia',
          dc: 11,
          onSuccessNodeId: 'j1_a1_checkpoint_tempestade',
          onPartialFailureNodeId: 'j1_a1_checkpoint_tempestade',
          aprovacaoCompanheiros: { orys: 10, visenya: 5 },
          delta: { mundo: { mata_chuva_mapeada: true } },
        },
        {
          id: 'esc_j1_a1_pressagio_tormenta_rhaenys',
          texto: 'Consultar os sinais das nuvens e relâmpagos com Rhaenys antes da marcha.',
          tipo: 'teste_atributo',
          atributo: 'pressagio',
          dc: 12,
          tagOrigem: '[SONHO DO DRAGÃO]',
          onSuccessNodeId: 'j1_a1_checkpoint_tempestade',
          onPartialFailureNodeId: 'j1_a1_checkpoint_tempestade',
          aprovacaoCompanheiros: { rhaenys: 15, orys: 5 },
          delta: { ficha: { compostura: 1 } },
        },
      ],
    },

    // ==========================================
    // CENA 17: MORTE EM EMBOSCADA NA TEMPESTADE
    // ==========================================
    j1_a1_morte_emboscada_tempestade: {
      id: 'j1_a1_morte_emboscada_tempestade',
      titulo: 'Morte Canônica: O Fim na Garganta de Wendwater',
      anoHistorico: '2 a.C.',
      localizacao: 'Garganta de Wendwater',
      regionId: 'tempestade',
      isEnding: true,
      fallbackText: `No meio da folhagem espessa e da tempestade súbita que apagou as tochas, os arqueiros de Lorde Buckler descarregaram virotes envenenados das copas dos carvalhos. Uma saraivada concentrada atingiu os cavaleiros de vanguarda antes que Meraxes pudesse varrer a mata.

O comandante valiriano caiu crivado de dardos sobre as pedras escorregadias do riacho. Sem a liderança no terreno, o exército do sul desfez-se em fuga desordenada rumo à costa, e a campanha contra Ponta Tempestade desmoronou em humilhação e tragédia.

Argilac, o Arrogante, proclamou vitória nos salões de pedra, enviando os despojos como troféu aos demais reis de Westeros. A Conquista sofreu um golpe fatal em suas fundações.`,
      internalVoices: [
        {
          atributo: 'pressagio',
          resultadoPassivo: 'FALHA',
          dcPassiva: 10,
          fala: 'A floresta foi o túmulo do sonho da coroa. As tempestades de Westeros prevaleceram sobre o dragão.',
        },
      ],
      loreContext: {
        fonte: {
          arquivo_md: 'fogo-e-sangue_01_a-conquista-de-aegon.md',
          livro: 'Fogo & Sangue - Volume 1',
          capitulo: 'A Conquista de Aegon',
        },
        notaHistorica: 'Ponto de divergência: A derrota na travessia de Wendwater frustraria o avanço de Orys Baratheon.',
      },
      escolhas: [],
    },

    // ==========================================
    // CENA 18: VITÓRIA NA MATA DA TEMPESTADE
    // ==========================================
    j1_a1_vitoria_bosque: {
      id: 'j1_a1_vitoria_bosque',
      titulo: 'A Vitória no Wendwater e a Fuga dos Senhores',
      anoHistorico: '2 a.C.',
      localizacao: 'Terras da Tempestade',
      regionId: 'tempestade',
      fallbackText: `Com precisão e bravura titânica, a investida quebrou a linha dos emboscadores. Meraxes fez arder as encostas laterais em chamas douradas e rubras, cercando os homens da tempestade em um círculo de calor insuportável. Lorde Errol pereceu nas labaredas, e as tropas remanescentes de Fell e Buckler bateram em retirada desabalada para o sul.

Orys Baratheon reorganizou as fileiras feridas e garantiu a passagem segura de toda a artilharia e bagagem. As perdas foram sentidas, mas a rota até Ponta Tempestade estava agora desimpedida.

A notícia da queda da emboscada chegou a Argilac com sabor de insulto e fúria. O Rei da Tempestade, recusando-se a morrer sitiado como um rato atrás de suas muralhas colossais, começou a montar seu exército completo para encontrar Orys em campo aberto: a vindoura Batalha do Último Risco.`,
      internalVoices: [
        {
          atributo: 'comando',
          resultadoPassivo: 'SUCESSO',
          dcPassiva: 8,
          fala: 'Argilac sairá dos muros de Ponta Tempestade para nos desafiar no descampado. Era exatamente o que desejávamos.',
        },
      ],
      loreContext: {
        idVerbete: 'meraxes',
        fonte: {
          arquivo_md: 'fogo-e-sangue_01_a-conquista-de-aegon.md',
          livro: 'Fogo & Sangue - Volume 1',
          capitulo: 'A Conquista de Aegon',
        },
      },
      escolhas: [
        {
          id: 'esc_concluir_ramo_tempestade',
          texto: 'Avançar com Orys e Meraxes rumo ao campo do Último Risco e concluir o Ato I.',
          tipo: 'simples',
          nextNodeId: 'j1_a1_checkpoint_tempestade',
        },

        {
          id: 'esc_bosque_honra_cacada',
          texto: 'Pressionar a vanguarda e interceptar as forças de Fell e Buckler antes que se agrupem com o grosso de Argilac.',
          tipo: 'simples',
          aprovacaoCompanheiros: { visenya: 15, orys: 15, rhaenys: -5 },
          delta: { flagsAdicionadas: ['vanguarda_argilac_desbaratada'] },
          nextNodeId: 'j1_a1_checkpoint_tempestade',
        },
        {
          id: 'esc_bosque_confortar_soldados',
          texto: 'Cuidar pessoalmente dos arqueiros feridos na lama com Orys e acender fogueiras sob o abrigo protetor de Meraxes.',
          tipo: 'simples',
          aprovacaoCompanheiros: { rhaenys: 20, orys: 20, visenya: -5 },
          delta: { sangue: 2, compostura: 1 },
          nextNodeId: 'j1_a1_checkpoint_tempestade',
        }
      ],
    },

    // ==========================================
    // CENA 19: CHECKPOINT NAVAL (FIM DO ATO 1)
    // ==========================================
        j1_a1_checkpoint_naval: {
      id: 'j1_a1_checkpoint_naval',
      titulo: 'Acampamento & Conselho Noturno: Costa de Vila Gaivota',
      anoHistorico: '2 a.C.',
      localizacao: 'Acampamento & Pavilhão Real',
      regionId: 'pedra_dragao',
      deltaEstado: {
        sangue: 2,
        compostura: 2,
      },
      fallbackText: `As ondas do Mar Estreito quebram compassadas contra os rochedos salgados. No pavilhão de campanha com as insígnias do dragão de três cabeças, as brasas crepitam enquanto os sentinelas rendem guarda.`,
      internalVoices: [
        {
          atributo: 'cortesia',
          resultadoPassivo: 'SUCESSO',
          dcPassiva: 8,
          fala: 'O calor da fogueira e a partilha do pão com seus vassalos restabelecem a confiança na coroa.',
        },
        {
          atributo: 'pressagio',
          resultadoPassivo: 'SUCESSO',
          dcPassiva: 9,
          fala: 'As estrelas do poente formam o desenho de uma espada de fogo. O próximo capítulo selará o destino de Westeros.',
        },
      ],
            loreContext: {
        fonte: {
          arquivo_md: 'corpus_md/jornada_1_conquista/fogo-e-sangue_01_a-conquista-de-aegon.md',
          livro: 'Fogo & Sangue - Volume 1',
          capitulo: 'A Conquista de Aegon',
        },
        notaHistorica: 'Acampamento e conselho de guerra da Conquista de Aegon.',
      },
      escolhas: [
        {
          id: 'esc_camp_naval_daemon_v',
          texto: 'Conferenciar com Lorde Daemon Velaryon sobre a vigilância marítima e as marés do Mar Estreito.',
          tipo: 'simples',
          aprovacaoCompanheiros: { daemon_v: 15, visenya: 5 },
          delta: { compostura: 1 },
          nextNodeId: 'j1_a1_checkpoint_naval',
        },
        {
          id: 'esc_camp_naval_visenya',
          texto: 'Afinar as táticas de ataque aéreo de Vhagar com a Rainha Visenya sob a luz das velas.',
          tipo: 'simples',
          aprovacaoCompanheiros: { visenya: 15, orys: 5 },
          delta: { compostura: 1 },
          nextNodeId: 'j1_a1_checkpoint_naval',
        },
        {
          id: 'esc_camp_naval_dormir',
          texto: 'Descansar no pavilhão régio e ordenar que os batedores montem vigília cerrada ao redor do acampamento.',
          tipo: 'simples',
          delta: { sangue: 1, compostura: 1 },
          nextNodeId: 'j1_a1_checkpoint_naval',
        }
      ],
    },

    // ==========================================
    // CENA 20: CHECKPOINT FLUVIAL (FIM DO ATO 1)
    // ==========================================
        j1_a1_checkpoint_fluvial: {
      id: 'j1_a1_checkpoint_fluvial',
      titulo: 'Acampamento & Conselho Noturno: Margens do Olho de Deus',
      anoHistorico: '2 a.C.',
      localizacao: 'Acampamento & Pavilhão Real',
      regionId: 'pedra_dragao',
      deltaEstado: {
        sangue: 2,
        compostura: 2,
      },
      fallbackText: `A névoa do lago se ergue sobre os juncais. Diante do pavilhão real, o vulto colossal de Balerion repousa como uma montanha de obsidiana viva, emitindo baforadas de fumaça sob a noite estrelada.`,
      internalVoices: [
        {
          atributo: 'cortesia',
          resultadoPassivo: 'SUCESSO',
          dcPassiva: 8,
          fala: 'O calor da fogueira e a partilha do pão com seus vassalos restabelecem a confiança na coroa.',
        },
        {
          atributo: 'pressagio',
          resultadoPassivo: 'SUCESSO',
          dcPassiva: 9,
          fala: 'As estrelas do poente formam o desenho de uma espada de fogo. O próximo capítulo selará o destino de Westeros.',
        },
      ],
            loreContext: {
        fonte: {
          arquivo_md: 'corpus_md/jornada_1_conquista/fogo-e-sangue_01_a-conquista-de-aegon.md',
          livro: 'Fogo & Sangue - Volume 1',
          capitulo: 'A Conquista de Aegon',
        },
        notaHistorica: 'Acampamento e conselho de guerra da Conquista de Aegon.',
      },
      escolhas: [
        {
          id: 'esc_camp_fluvial_rhaenys',
          texto: 'Caminhar à margem do Olho de Deus com a Rainha Rhaenys ouvindo seus conselhos sobre a paz com os lordes dos rios.',
          tipo: 'simples',
          aprovacaoCompanheiros: { rhaenys: 15, orys: 5 },
          delta: { compostura: 1 },
          nextNodeId: 'j1_a1_checkpoint_fluvial',
        },
        {
          id: 'esc_camp_fluvial_edmyn',
          texto: 'Receber Lorde Edmyn Tully e os nobres ribeirinhos ao redor da mesa de mapas para afinar o cerco a Harrenhal.',
          tipo: 'simples',
          aprovacaoCompanheiros: { orys: 10, visenya: 10 },
          delta: { compostura: 1 },
          nextNodeId: 'j1_a1_checkpoint_fluvial',
        },
        {
          id: 'esc_camp_fluvial_descansar',
          texto: 'Beber o vinho das Terras Fluviais ao lado dos cavaleiros e repousar até o nascer do sol.',
          tipo: 'simples',
          delta: { sangue: 1, compostura: 1 },
          nextNodeId: 'j1_a1_checkpoint_fluvial',
        }
      ],
    },

    // ==========================================
    // CENA 21: CHECKPOINT TEMPESTADE (FIM DO ATO 1)
    // ==========================================
        j1_a1_checkpoint_tempestade: {
      id: 'j1_a1_checkpoint_tempestade',
      titulo: 'Acampamento & Conselho Noturno: Fronteira das Terras da Tempestade',
      anoHistorico: '2 a.C.',
      localizacao: 'Acampamento & Pavilhão Real',
      regionId: 'pedra_dragao',
      deltaEstado: {
        sangue: 2,
        compostura: 2,
      },
      fallbackText: `Trovões distantes anunciam a fúria das hostes de Ponta Tempestade. Entre as árvores do Wendwater, os homens limpam suas cotas de malha e afiam as lanças em silêncio reverente.`,
      internalVoices: [
        {
          atributo: 'cortesia',
          resultadoPassivo: 'SUCESSO',
          dcPassiva: 8,
          fala: 'O calor da fogueira e a partilha do pão com seus vassalos restabelecem a confiança na coroa.',
        },
        {
          atributo: 'pressagio',
          resultadoPassivo: 'SUCESSO',
          dcPassiva: 9,
          fala: 'As estrelas do poente formam o desenho de uma espada de fogo. O próximo capítulo selará o destino de Westeros.',
        },
      ],
            loreContext: {
        fonte: {
          arquivo_md: 'corpus_md/jornada_1_conquista/fogo-e-sangue_01_a-conquista-de-aegon.md',
          livro: 'Fogo & Sangue - Volume 1',
          capitulo: 'A Conquista de Aegon',
        },
        notaHistorica: 'Acampamento e conselho de guerra da Conquista de Aegon.',
      },
      escolhas: [
        {
          id: 'esc_camp_temp_orys',
          texto: 'Ajustar a armadura de Orys Baratheon e brindar à irmandade de armas antes do choque decisivo com Argilac.',
          tipo: 'simples',
          aprovacaoCompanheiros: { orys: 20, rhaenys: 5 },
          delta: { compostura: 1 },
          nextNodeId: 'j1_a1_checkpoint_tempestade',
        },
        {
          id: 'esc_camp_temp_rhaenys',
          texto: 'Observar os relâmpagos ao longe com Rhaenys e traçar o plano de vôo de Meraxes em meio à tempestade.',
          tipo: 'simples',
          aprovacaoCompanheiros: { rhaenys: 15, visenya: 5 },
          delta: { compostura: 1 },
          nextNodeId: 'j1_a1_checkpoint_tempestade',
        },
        {
          id: 'esc_camp_temp_descanso',
          texto: 'Rezar aos deuses antigos e novos pela vitória e revigorar as forças na tenda real.',
          tipo: 'simples',
          delta: { sangue: 1, compostura: 1 },
          nextNodeId: 'j1_a1_checkpoint_tempestade',
        }
      ],
    },
  },
};

export function obterNodeAto1(nodeId: string): NodeJornada | undefined {
  return grafoAto1.nodes[nodeId];
}
