import 'server-only';
import { GrafoJornada } from '@/server/engine/storyLinter';

export const grafoJ4Ato2V2: GrafoJornada = {
  id: 'jornada_4_muralha_ato2_v2',
  titulo: 'Ato II: O Motim em Craster & A Sentinela do Gelo',
  startNodeId: 'j4_a2_fortaleza_craster_tensoes',
  nodes: {
    // =========================================================================
    // ETAPA 1: ABERTURA (2 CENAS)
    // =========================================================================

    // 1. As Tensões na Fortaleza de Craster
    j4_a2_fortaleza_craster_tensoes: {
      id: 'j4_a2_fortaleza_craster_tensoes',
      titulo: 'O Odor da Peste e a Partilha Escassa',
      anoHistorico: '299 d.C.',
      localizacao: 'Salão Comunal da Fortaleza de Craster',
      regionId: 'floresta_assombrada',
      tipo: 'narracao',
      rota: 'comum',
      pov: 'Irmão Sem Nome',
      origem: 'canonica',
      loreContext: {
        fonte: {
          livro: 'A Tormenta de Espadas',
          capitulo: 'Samwell II',
          arquivo_md: 'asos_samwell_2.md',
        },
      },
      epigrafe: {
        texto: 'O corvo come o grão, o lobo caça a corça, mas é o irmão que crava a faca nas costas de quem veste a mesma capa.',
        autor: 'Dito de Patrulheiro, Arquivos da Torre de Hardin',
      },
      fallbackText: `O calor sufocante da fumaça de turfa não consegue disfarçar o odor adocicado da gangrena. No canto mais escuro do salão de Craster, o irmão Bannen agoniza com o pé negro como carvão, gemendo a cada respiração enquanto o pus escorre pelas frestas dos trapos empapados. Ao redor da lareira baixa, quarenta e quatro homens famintos da Patrulha da Noite observam com ódio silencioso cada naco de carne que o selvagem mastiga diante de suas esposas.

Craster rosna como um cão sarnento a cada pedido de comida a mais. Ele exige machados, pontas de lança e armas de aço em troca de tigelas ralas de caldo de nabo e pão bolorento. O Velho Urso permanece sentado em um tamborete tosco, a barba branca manchada de cinzas, tentando manter a ordem pela autoridade da voz, mas a autoridade pouco vale quando o estômago ronca há quatro dias na neve.`,
      blocos: [
        {
          funcao: 'abertura',
          texto: `O calor sufocante da fumaça de turfa não consegue disfarçar o odor adocicado da gangrena. No canto mais escuro do salão de Craster, o irmão Bannen agoniza com o pé negro como carvão, gemendo a cada respiração enquanto o pus escorre pelas frestas dos trapos empapados.`,
        },
        {
          funcao: 'corpo',
          quando: { flagsTodas: ['ferida_da_neve'] },
          texto: `A sua própria ferida pulsa sob o couro da bota. O frio congelou a carne e a fumaça irrita as feridas abertas, mas você mantém-se de pé para não parecer fraco diante dos olhos cruéis de Craster.`,
        },
        {
          funcao: 'corpo',
          quando: { flagsTodas: ['divida_com_craster'] },
          texto: `Craster cospe perto dos seus pés e olha para a bainha da sua espada, murmurando que se os patrulheiros querem teto, devem pagar com aço e ferro verdadeiro.`,
        },
        {
          funcao: 'fecho',
          texto: `Entre as sombras das esteiras de palha, pequenos grupos se reúnem com punhais à mostra. Karl Pé-Rapado e Dirk cochicham maldições no ouvido de homens que perderam o medo dos juramentos.`,
        },
      ],
      vozesConflito: [
        {
          voz1: 'furia',
          voz2: 'comando',
          fala1: 'Craster tem presuntos e grãos escondidos no sótão! Degolem esse selvagem e alimentem os irmãos!',
          fala2: 'Mormont deu a palavra dele. Se violarmos as leis da hospitalidade sob este teto, não seremos melhores que selvagens.',
        },
      ],
      internalVoices: [
        {
          atributo: 'pressagio',
          resultadoPassivo: 'SUCESSO',
          dcPassiva: 8,
          fala: 'O ar no salão está mais pesado que chumbo derretido. Não será o inverno que matará os líderes esta noite, mas a inveja e o punhal.',
        },
      ],
      escolhas: [
        {
          id: 'j4_a2_c1_cuidar_bannen',
          tipo: 'teste_atributo',
          texto: 'Ajoelhar-se junto a Bannen para limpar a ferida pútrida com conhaque e dar conforto ao irmão',
          atributo: 'cortesia',
          dc: 8,
          tom: 'honesto',
          desfechos: {
            sucesso: {
              ponte: 'Com mãos firmes, você molha um retalho limpo no conhaque e lava a carne necrosada de Bannen. O homem aperta os seus dedos com gratidão sussurrada antes de cerrar os olhos com menos dor.',
              destino: 'j4_a2_craster_hub_conspiracao',
              marcas: ['testemunha_da_fome', 'compaixao_por_irmaos'],
              delta: { honra: 1, compostura: 1 },
            },
            parcial: {
              ponte: 'O odor acre da infecção revira o seu estômago. Você consegue estancar o sangramento parcial, mas o sofrimento do patrulheiro comove os homens ao redor até o desespero.',
              destino: 'j4_a2_craster_hub_conspiracao',
              marcas: ['testemunha_da_fome'],
              delta: { compostura: -1 },
            },
            falha: {
              ponte: 'Bannen estremece em agonia quando você toca o membro enegrecido, gritando alto no salão. Craster pragueja e joga um osso de galinha contra a parede, enfurecido pelo barulho.',
              destino: 'j4_a2_craster_hub_conspiracao',
              marcas: ['testemunha_da_fome', 'divisao_entre_irmaos'],
              delta: { compostura: -2 },
            },
          },
          onSuccessNodeId: 'j4_a2_craster_hub_conspiracao',
          onPartialFailureNodeId: 'j4_a2_craster_hub_conspiracao',
        },
        {
          id: 'j4_a2_c1_vigiar_conspiradores',
          tipo: 'teste_atributo',
          texto: 'Aproximar-se da fogueira de soslaio para escutar os sussurros de Karl Pé-Rapado e Chett',
          atributo: 'astucia',
          dc: 9,
          tom: 'silencio',
          desfechos: {
            sucesso: {
              ponte: 'Misturando-se à fumaça densa, você escuta o plano com clareza: matar Craster primeiro, forçar as mulheres a mostrarem o celeiro secreto e degolar o Velho Urso se ele tentar intervir.',
              destino: 'j4_a2_craster_hub_conspiracao',
              marcas: ['ouviu_karl_pe_rapado', 'divisao_entre_irmaos'],
              delta: { compostura: 2 },
            },
            parcial: {
              ponte: 'Você capta fragmentos sobre facas e o sótão de mantimentos antes que Karl se vire com os olhos injetados de raiva, forçando você a disfarçar olhando para as cinzas.',
              destino: 'j4_a2_craster_hub_conspiracao',
              marcas: ['divisao_entre_irmaos'],
              delta: { compostura: -1 },
            },
            falha: {
              ponte: 'A tábua do assoalho range sob sua bota. Karl interrompe a frase imediatamente e cospe no fogo, avisando que espiões do comandante têm o pescoço mole na floresta.',
              destino: 'j4_a2_craster_hub_conspiracao',
              marcas: ['divisao_entre_irmaos'],
              delta: { compostura: -2, honra: -1 },
            },
          },
          onSuccessNodeId: 'j4_a2_craster_hub_conspiracao',
          onPartialFailureNodeId: 'j4_a2_craster_hub_conspiracao',
        },
      ],
    },

    // 2. Hub de Diálogo: A Conspiração sob a Turfa
    j4_a2_craster_hub_conspiracao: {
      id: 'j4_a2_craster_hub_conspiracao',
      titulo: 'Os Murmúrios Antes da Tormenta',
      anoHistorico: '299 d.C.',
      localizacao: 'Canto das Vigas, Fortaleza de Craster',
      regionId: 'floresta_assombrada',
      tipo: 'hub',
      rota: 'comum',
      pov: 'Irmão Sem Nome',
      origem: 'canonica',
      loreContext: {
        fonte: {
          livro: 'A Tormenta de Espadas',
          capitulo: 'Samwell II',
          arquivo_md: 'asos_samwell_2.md',
        },
      },
      fallbackText: `A tensão entre as vigas enegrecidas atingiu o ponto de ruptura. Os irmãos jurados dividiram-se em ilhas isoladas de rancor. Perto da porta de entrada, Grenn e os homens leais permanecem com as espadas embainhadas mas as mãos nos punhos. Perto das celas dos porcos, Karl Pé-Rapado afia uma adaga curva numa pedra de amolar. Mais ao fundo, o gordo Samwell Tarly soluça em silêncio ao lado de Goiva, a jovem esposa grávida de Craster, que carrega um desespero pálido no olhar.`,
      blocos: [
        {
          funcao: 'abertura',
          texto: `A tensão entre as vigas enegrecidas atingiu o ponto de ruptura. Os irmãos jurados dividiram-se em ilhas isoladas de rancor no salão fétido.`,
        },
        {
          funcao: 'corpo',
          quando: { flagsTodas: ['aliado_grenn'] },
          texto: `Grenn acena discreetamente com a cabeça, indicando que os patrulheiros honestos estão prontos para intervir se a loucura dos traidores começar.`,
        },
        {
          funcao: 'fecho',
          texto: `Cada minuto que passa aproxima a refeição da noite, quando Craster distribuirá as migalhas de pão e a carne dura. É preciso decidir onde você se posicionará antes que o primeiro golpe seja desferido.`,
        },
      ],
      interlocutores: [
        { id: 'grenn', nome: 'Grenn', papel: 'Patrulheiro Leal' },
        { id: 'karl', nome: 'Karl Pé-Rapado', papel: 'Líder dos Amotinados de Vila Toupeira' },
        { id: 'samwell', nome: 'Samwell Tarly', papel: 'Intendente e Protetor de Goiva' },
      ],
      reacoes: [
        {
          companheiro: 'grenn',
          condicao: { flagsTodas: ['lealdade_a_mormont'] },
          fala: 'Fique perto do Velho Urso, irmão. Se Karl puxar aquela lâmina, o sangue vai lavar este assoalho.',
        },
      ],
      escolhas: [
        {
          id: 'j4_a2_hub_alinhar_grenn',
          tipo: 'simples',
          texto: 'Alinhar-se com Grenn e jurar proteção ao Senhor Comandante Mormont',
          tom: 'devocao',
          unica: true,
          permanece: true,
          desfecho: {
            ponte: 'Grenn aperta o seu antebraço com força de ferro. «Mormont é o Senhor Comandante. Se trairmos o homem que nos liderou nas pedras do Punho, nada restará da honra da Patrulha.»',
            marcas: ['lealdade_a_mormont'],
            delta: { honra: 1 },
          },
          nextNodeId: 'j4_a2_craster_hub_conspiracao',
        },
        {
          id: 'j4_a2_hub_sondar_karl',
          tipo: 'simples',
          texto: 'Ouvir a proposta sediciosa de Karl Pé-Rapado sobre a partilha da comida',
          tom: 'ameaca',
          unica: true,
          permanece: true,
          desfecho: {
            ponte: 'Karl sorri com dentes amarelos e fala baixo: «O velho lorde vai nos deixar morrer de fome pelo juramento. Quando o Craster tombar, quem estiver comigo come carne de porco e bebe cerveja quente. Pense bem de que lado quer estar.»',
            marcas: ['ouviu_karl_pe_rapado'],
          },
          nextNodeId: 'j4_a2_craster_hub_conspiracao',
        },
        {
          id: 'j4_a2_hub_consolar_sam',
          tipo: 'simples',
          texto: 'Falar com Samwell Tarly e a jovem Goiva sobre a criança prestes a nascer',
          tom: 'diplomatico',
          unica: true,
          permanece: true,
          desfecho: {
            ponte: 'Goiva segura o seu manto com dedos trêmulos de menina: «Se for homem, Craster vai dar meu filho para os deuses brancos da floresta... por favor, me ajudem a fugir.» Samwell engole em seco e olha para você com desespero.',
            marcas: ['compaixao_por_sam'],
            delta: { honra: 1 },
          },
          nextNodeId: 'j4_a2_craster_hub_conspiracao',
        },
        {
          id: 'j4_a2_hub_avancar_refeicao',
          tipo: 'simples',
          texto: 'Tomar lugar junto ao banco central para o início da ceia tensa [Avançar]',
          tom: 'honesto',
          desfecho: {
            ponte: 'Craster chuta uma das esposas para acender o fogo e senta-se no centro do estrado. Os pratos toscos de madeira batem na mesa; a tempestade de sangue está armada.',
            destino: 'j4_a2_estopim_do_motim',
          },
          nextNodeId: 'j4_a2_estopim_do_motim',
        },
      ],
    },

    // =========================================================================
    // ETAPA 2: ENCRUZILHADA (1 CENA)
    // =========================================================================

    j4_a2_estopim_do_motim: {
      id: 'j4_a2_estopim_do_motim',
      titulo: 'A Faca na Garganta do Selvagem',
      anoHistorico: '299 d.C.',
      localizacao: 'Estrado Principal, Fortaleza de Craster',
      regionId: 'floresta_assombrada',
      tipo: 'narracao',
      rota: 'comum',
      pov: 'Irmão Sem Nome',
      origem: 'canonica',
      loreContext: {
        fonte: {
          livro: 'A Tormenta de Espadas',
          capitulo: 'Samwell II',
          arquivo_md: 'asos_samwell_2.md',
        },
      },
      fallbackText: `A tigela de ensopado é quase pura água fétida com cascas de nabo. Dirk, um dos homens mais violentos da Patrulha, atira a madeira ao chão e cospe no fogo: «Você come carne assada no quarto dos fundos e nos serve lavagem de porco, selvagem desgraçado!»

Craster ergue-se com um rugido furioso, brandindo uma machadinha afiada: «Corvos bastardos! Comem do meu pão e dormem no meu teto, e ainda cospem no meu chão? Fora daqui, todos vocês, ou vou abrir suas barrigas como fiz com meus próprios porcos!»

Num piscar de olhos, Karl Pé-Rapado saca a adaga e salta sobre a mesa. Craster tomba de costas com a garganta aberta, o sangue espumando vermelho sobre a palha podre. O caos explode no salão. Mormont saca Garralonga e berra em fúria contra os traidores, enquanto Ollo Mão Cortada e outros três homens cercam o Senhor Comandante pelas costas com lâminas brilhando no escuro. Perto da saída dos fundos, Goiva puxa Sam aos berros para as estrebarias.`,
      blocos: [
        {
          funcao: 'abertura',
          texto: `Craster ergue-se com um rugido furioso, brandindo a machadinha de caça. Num movimento ágil e traiçoeiro, Karl Pé-Rapado salta sobre o estrado e crava a adaga sob a mandíbula do selvagem. O sangue borbulha pelo assoalho.`,
        },
        {
          funcao: 'corpo',
          quando: { flagsTodas: ['lealdade_a_mormont'] },
          texto: `Mormont avança rugindo como o urso da Ilha dos Ursos, o aço valiriano de Garralonga pronto para decepar os rebeldes, mas Ollo Mão Cortada move-se como uma cobra por trás do comandante.`,
        },
        {
          funcao: 'corpo',
          quando: { flagsTodas: ['compaixao_por_sam'] },
          texto: `Você enxerga o pânico nos olhos de Samwell Tarly enquanto Goiva agarra a manga da capa dele e corre em direção aos currais dos cavalos, desprotegida contra os amotinados.`,
        },
        {
          funcao: 'fecho',
          texto: `O salão virou uma matilha em fúria: metade dos homens cerca Mormont para silenciar o comando; a outra metade espalha-se para saquear o celeiro e caçar os fracos. Para onde você corre?`,
        },
      ],
      escolhas: [
        {
          id: 'j4_a2_decisao_leais',
          tipo: 'simples',
          texto: 'Desembainhar a espada e lutar ao lado de Jeor Mormont contra os amotinados de Ollo',
          tom: 'violencia',
          desfecho: {
            ponte: 'Você salta sobre a mesa quebrada com a lâmina erguida, colocando-se entre o Senhor Comandante e os punhais traidores de Ollo Mão Cortada.',
            destino: 'j4_a2_leais_sangue_no_salao',
            marcas: ['posto_defesa_mormont'],
            delta: { honra: 2 },
          },
          nextNodeId: 'j4_a2_leais_sangue_no_salao',
        },
        {
          id: 'j4_a2_decisao_resgate',
          tipo: 'simples',
          texto: 'Correr para as estrebarias dos fundos e abrir caminho para a fuga de Samwell e Goiva',
          tom: 'devocao',
          desfecho: {
            ponte: 'Ignorando os berros do salão comunal, você dispara entre os fardos de turfa para proteger Goiva e Sam antes que os rebeldes fechem o portão de saída.',
            destino: 'j4_a2_resgate_fuga_estrebarias',
            marcas: ['posto_fuga_sam'],
            delta: { compostura: 1, honra: 1 },
          },
          nextNodeId: 'j4_a2_resgate_fuga_estrebarias',
        },
      ],
    },

    // =========================================================================
    // ETAPA 3: ROTAS (6 CENAS: 3 POR ROTA, EXCLUSIVIDADE ≥ 60%)
    // =========================================================================

    // --- ROTA A: OS LEAIS DE MORMONT ---

    // Rota A1: Sangue no Salão
    j4_a2_leais_sangue_no_salao: {
      id: 'j4_a2_leais_sangue_no_salao',
      titulo: 'A Dança de Ferro sob o Teto de Turfa',
      anoHistorico: '299 d.C.',
      localizacao: 'Centro do Salão Comunal de Craster',
      regionId: 'floresta_assombrada',
      tipo: 'narracao',
      rota: 'leais',
      pov: 'Irmão Sem Nome',
      origem: 'original',
      notaHistorica: 'Combate corpo a corpo violento travado pelos patrulheiros leais tentando conter a facção rebelde de Karl e Ollo.',
      loreContext: {
        fonte: {
          livro: 'A Tormenta de Espadas',
          capitulo: 'Samwell II',
          arquivo_md: 'asos_samwell_2.md',
        },
      },
      fallbackText: `O salão transformou-se em um açougue fumegante. Cadeiras arrebentadas voam pelo ar; homens rolam no esterco perfurando os olhos uns dos outros com adagas e espetos de ferro. Grenn derruba um amotinado com um golpe de escudo no queixo, enquanto Mormont brande Garralonga, o aço negro decepando o braço armado de um desertor em um arco escuro de sangue.

Dois traidores com lanças curtas avançam contra você, aproveitando que a fumaça de turfa cega a sua visão lateral. «Mais um lorde de capa limpa para enterrar!», grita um deles ao desferir a ponta de ferro na altura da sua garganta.`,
      blocos: [
        {
          funcao: 'abertura',
          texto: `O salão transformou-se em um açougue fumegante. Cadeiras arrebentadas voam pelo ar; homens rolam no esterco perfurando os olhos uns dos outros com adagas e espetos de ferro.`,
        },
        {
          funcao: 'corpo',
          quando: { flagsTodas: ['irmandade_grenn'] },
          texto: `Grenn trava as costas contra as suas, berrando palavras de ordem enquanto o aço se choca com estrondo no centro do salão em chamas.`,
        },
        {
          funcao: 'fecho',
          texto: `Dois homens de Karl tentam cercar você para abrir caminho até o Velho Urso. Cada golpe aqui dita quem sai vivo pela porta.`,
        },
      ],
      escolhas: [
        {
          id: 'j4_a2_la1_aparar_e_contraatacar',
          tipo: 'teste_atributo',
          texto: 'Aparar a ponta da lança com a lâmina e arremeter contra o peito do atacante',
          atributo: 'furia',
          dc: 9,
          tom: 'violencia',
          circunstancias: [
            {
              tipo: 'vantagem',
              motivo: 'O aço de forja da Patrulha parte a madeira tosca da lança improvisada.',
            },
          ],
          desfechos: {
            sucesso: {
              ponte: 'A sua espada desvia o ferro e a ponta entra fundo entre as costelas do desertor. Num giro rápido, você chuta o segundo traidor para dentro das brasas da lareira, abrindo espaço para Mormont recuar.',
              destino: 'j4_a2_leais_queda_do_velho_urso',
              marcas: ['luta_no_salao_craster', 'golpe_desferido'],
              delta: { honra: 1, compostura: 1 },
            },
            parcial: {
              ponte: 'Você abate o primeiro agressor com um corte seco, mas a ponta do segundo rasga a sua couraça de couro, deixando um vergão sangrento antes que Grenn o derrube com o machado.',
              destino: 'j4_a2_leais_queda_do_velho_urso',
              marcas: ['luta_no_salao_craster'],
              delta: { sangue: -1 },
            },
            falha: {
              ponte: 'A haste da lança golpeia o seu elmo de ferro, atordoando a sua visão. Você cai de joelhos no esterco enquanto os rebeldes empurram a linha leal contra o estrado.',
              destino: 'j4_a2_leais_queda_do_velho_urso',
              marcas: ['luta_no_salao_craster'],
              delta: { sangue: -2, compostura: -1 },
            },
          },
          onSuccessNodeId: 'j4_a2_leais_queda_do_velho_urso',
          onPartialFailureNodeId: 'j4_a2_leais_queda_do_velho_urso',
        },
        {
          id: 'j4_a2_la1_formar_bloqueio_banco',
          tipo: 'teste_atributo',
          texto: 'Virar um banco maciço de carvalho para criar uma barricada diante do estrado',
          atributo: 'comando',
          dc: 8,
          tom: 'honesto',
          desfechos: {
            sucesso: {
              ponte: 'Com um esforço concentrado, você e outro patrulheiro tombam o pesado banco de madeira. A barreira trava a investida dos rebeldes e garante cobertura para o Velho Urso reagrupar os homens.',
              destino: 'j4_a2_leais_queda_do_velho_urso',
              marcas: ['luta_no_salao_craster', 'barricada_erguida'],
              delta: { compostura: 1, honra: 1 },
            },
            parcial: {
              ponte: 'O banco tomba com estrépito, detendo os passos dos atacantes, embora um tição aceso role para a palha seca, iniciando um foco perigoso de incêndio.',
              destino: 'j4_a2_leais_queda_do_velho_urso',
              marcas: ['luta_no_salao_craster'],
              delta: { compostura: -1 },
            },
            falha: {
              ponte: 'A madeira escorrega nas mãos suadas de sangue. O banco cai torto e os amotinados saltam por cima com punhais erguidos, ferindo o patrulheiro ao seu lado.',
              destino: 'j4_a2_leais_queda_do_velho_urso',
              marcas: ['luta_no_salao_craster'],
              delta: { sangue: -1, compostura: -1 },
            },
          },
          onSuccessNodeId: 'j4_a2_leais_queda_do_velho_urso',
          onPartialFailureNodeId: 'j4_a2_leais_queda_do_velho_urso',
        },
      ],
    },

    // Rota A2: A Queda do Velho Urso
    j4_a2_leais_queda_do_velho_urso: {
      id: 'j4_a2_leais_queda_do_velho_urso',
      titulo: 'O Último Rugido do Velho Urso',
      anoHistorico: '299 d.C.',
      localizacao: 'Atrás do Estrado de Craster',
      regionId: 'floresta_assombrada',
      tipo: 'dialogo',
      rota: 'leais',
      pov: 'Irmão Sem Nome',
      origem: 'canonica',
      loreContext: {
        fonte: {
          livro: 'A Tormenta de Espadas',
          capitulo: 'Samwell II',
          arquivo_md: 'asos_samwell_2.md',
        },
      },
      fallbackText: `O grito que rasga o ar não é de medo, mas de traição. Ollo Mão Cortada surge por trás da cortina de pele e enterra uma faca de desossar na barriga de Jeor Mormont. O Senhor Comandante vacila, a mão enluvada tateando o ventre ensanguentado enquanto Garralonga escorrega de seus dedos entorpecidos e bate com estrondo na pedra.

Você corre até o velho comandante enquanto Grenn afasta os assassinos a golpes de machado. Mormont desaba nos seus braços, pesado como uma muralha de granito desmoronada. O sangue negro e espesso mancha a barba branca. O olhar do Velho Urso fixa-se em você com a última chama de vida.`,
      blocos: [
        {
          funcao: 'abertura',
          texto: `O grito que rasga o ar não é de medo, mas de traição. Ollo Mão Cortada enterra uma faca de desossar na barriga de Jeor Mormont. O Senhor Comandante vacila e cai nos seus braços.`,
        },
        {
          funcao: 'corpo',
          quando: { flagsTodas: ['confianca_mormont'] },
          texto: `O Velho Urso reconhece o seu rosto mesmo através das lágrimas e do sangue. A mão trêmula aperta o seu gibão com a força desesperada de um moribundo.`,
        },
        {
          funcao: 'fecho',
          texto: `«Diga a meu filho...», sussurra Mormont com voz rouca e entrecortada pelo estertor da morte. Restam poucos segundos antes que os amotinados terminem o cerco.`,
        },
      ],
      interlocutores: [
        { id: 'jeor_mormont', nome: 'Jeor Mormont', papel: 'Senhor Comandante da Patrulha da Noite' },
      ],
      falas: [
        {
          quem: 'jeor_mormont',
          texto: 'Diga a Jorah... que o perdoo. Diga que ele deve tomar o negro... salvar a casa. E levem os homens... salvem a Muralha...',
        },
      ],
      escolhas: [
        {
          id: 'j4_a2_la2_jurar_lealdade_morte',
          tipo: 'simples',
          texto: 'Segurar a mão do Senhor Comandante e jurar pela honra da Patrulha que a mensagem será entregue',
          tom: 'devocao',
          desfecho: {
            ponte: '«Pela honra dos Primeiros Homens e pelo meu juramento, seu filho saberá», promete você em sussurro sagrado. O Velho Urso solta um último suspiro aliviado e parte para o abraço dos deuses antigos.',
            destino: 'j4_a2_leais_retirada_chamas',
            marcas: ['testemunha_morte_mormont', 'juramento_ao_velho_urso'],
            delta: { honra: 2, compostura: 1 },
          },
          nextNodeId: 'j4_a2_leais_retirada_chamas',
        },
        {
          id: 'j4_a2_la2_apanhar_garralonga_ou_recuar',
          tipo: 'teste_atributo',
          texto: 'Fechar os olhos do comandante e recolher o estandarte negro rasgado antes que os traidores o pisoteiem',
          atributo: 'comando',
          dc: 8,
          tom: 'honesto',
          desfechos: {
            sucesso: {
              ponte: 'Com reverência serena, você fecha os olhos de Mormont e recolhe o estandarte negro encharcado de sangue. Erguendo o pano diante dos leais, você comanda a retirada com dignidade inquebrantável.',
              destino: 'j4_a2_leais_retirada_chamas',
              marcas: ['testemunha_morte_mormont', 'juramento_ao_velho_urso'],
              delta: { honra: 2, inspiracao: 1 },
            },
            parcial: {
              ponte: 'Você arranca o manto negro das mãos do velho antes que uma lança perfure o chão onde ele repousava. O peso da perda cai sobre os ombros de todos.',
              destino: 'j4_a2_leais_retirada_chamas',
              marcas: ['testemunha_morte_mormont'],
              delta: { compostura: -1 },
            },
            falha: {
              ponte: 'O clamor dos assassinos força você a recuar antes de erguer o estandarte. Você puxa o corpo de Mormont para trás da bancada e desembainha a espada para não ser degolado.',
              destino: 'j4_a2_leais_retirada_chamas',
              marcas: ['testemunha_morte_mormont'],
              delta: { sangue: -1, compostura: -1 },
            },
          },
          onSuccessNodeId: 'j4_a2_leais_retirada_chamas',
          onPartialFailureNodeId: 'j4_a2_leais_retirada_chamas',
        },
      ],
    },

    // Rota A3: Retirada sob as Chamas
    j4_a2_leais_retirada_chamas: {
      id: 'j4_a2_leais_retirada_chamas',
      titulo: 'O Fogo sobre as Toras Malditas',
      anoHistorico: '299 d.C.',
      localizacao: 'Paliçada Sul da Fortaleza de Craster',
      regionId: 'floresta_assombrada',
      tipo: 'narracao',
      rota: 'leais',
      pov: 'Irmão Sem Nome',
      origem: 'original',
      notaHistorica: 'Fuga caótica dos irmãos leais rompendo a cerca de Craster enquanto o teto de palha e madeira arde em fogo mortal.',
      loreContext: {
        fonte: {
          livro: 'A Tormenta de Espadas',
          capitulo: 'Samwell II',
          arquivo_md: 'asos_samwell_2.md',
        },
      },
      fallbackText: `O fogo alcançou a turfa seca do telhado e o salão transformou-se em uma fornalha crepitante. Faíscas e cinzas chovem sobre as esteiras de palha enquanto as mulheres de Craster berram em desespero e os homens de Karl arrombam os tonéis de cerveja azeda, completamente embriagados pelo sangue e pela loucura.

«Portão sul! Agora!», troveja Grenn, empurrando as toras caídas da cerca. Sobram menos de doze homens leais com armas nas mãos. Atrás de vocês, as labaredas consom a fortaleza onde o Senhor Comandante foi assassinado. À frente, abre-se a escuridão gelada e faminta da Floresta Assombrada.`,
      blocos: [
        {
          funcao: 'abertura',
          texto: `O fogo alcançou a turfa seca do telhado e o salão transformou-se em uma fornalha crepitante. Labaredas vermelhas devoram o casebre onde Jeor Mormont tombou traído.`,
        },
        {
          funcao: 'corpo',
          quando: { flagsTodas: ['juramento_ao_velho_urso'] },
          texto: `A última promessa feita a Mormont arde na sua mente com mais força que o incêndio. Vingar o Velho Urso exigirá que você sobreviva à floresta e leve a notícia à Muralha.`,
        },
        {
          funcao: 'fecho',
          texto: `Grenn abre a fresta nas estacas da paliçada. Doze irmãos leais precipitam-se na neve funda da madrugada, deixando para trás o inferno em chamas de Craster.`,
        },
      ],
      escolhas: [
        {
          id: 'j4_a2_la3_romper_palicada_sul',
          tipo: 'teste_atributo',
          texto: 'Abrir caminho à força de ombro pelas estacas em chamas e liderar a coluna na nevasca',
          atributo: 'furia',
          dc: 8,
          tom: 'violencia',
          desfechos: {
            sucesso: {
              ponte: 'Você derruba a estaca meio queimada com um chute violento. A passagem se abre na neve virgem e os doze irmãos rompem o cerco sem perder mais nenhum homem para as flechas dos traidores.',
              destino: 'j4_a2_marcha_dos_esfarrapados',
              marcas: ['escapou_do_motim', 'vinganca_jurada'],
              delta: { honra: 1, compostura: 1 },
            },
            parcial: {
              ponte: 'A madeira em brasa chamusca o couro do seu gibão ao ceder. O tranco arremessa você na neve fria, mas todos conseguem cruzar a cerca antes que os amotinados organizem a perseguição.',
              destino: 'j4_a2_marcha_dos_esfarrapados',
              marcas: ['escapou_do_motim'],
              delta: { sangue: -1 },
            },
            falha: {
              ponte: 'Um pedaço de viga em chamas desaba sobre o caminho, obrigando os homens a contornarem pelo curral dos porcos sob pedradas e berros dos bêbados de Karl.',
              destino: 'j4_a2_marcha_dos_esfarrapados',
              marcas: ['escapou_do_motim'],
              delta: { sangue: -2, compostura: -1 },
            },
          },
          onSuccessNodeId: 'j4_a2_marcha_dos_esfarrapados',
          onPartialFailureNodeId: 'j4_a2_marcha_dos_esfarrapados',
        },
        {
          id: 'j4_a2_la3_cobrir_recuo_irmãos',
          tipo: 'simples',
          texto: 'Ficar na retaguarda com arco e flecha para repelir qualquer perseguidor que saia da fumaça',
          tom: 'silencio',
          desfecho: {
            ponte: 'Você dispara duas flechas certeiras contra as silhuetas que tentam cruzar a cerca com machados. Os traidores recuam assustados para a segurança do saque e a sua retaguarda fecha a trilha em silêncio.',
            destino: 'j4_a2_marcha_dos_esfarrapados',
            marcas: ['escapou_do_motim', 'vinganca_jurada'],
            delta: { compostura: 2, honra: 1 },
          },
          nextNodeId: 'j4_a2_marcha_dos_esfarrapados',
        },
      ],
    },

    // --- ROTA B: O RESGATE DE SAM & GOIVA ---

    // Rota B1: Fuga pelas Estrebarias
    j4_a2_resgate_fuga_estrebarias: {
      id: 'j4_a2_resgate_fuga_estrebarias',
      titulo: 'Um Bebê sob a Palha Úmida',
      anoHistorico: '299 d.C.',
      localizacao: 'Estrebarias Traseiras da Fortaleza de Craster',
      regionId: 'floresta_assombrada',
      tipo: 'narracao',
      rota: 'resgate',
      pov: 'Irmão Sem Nome',
      origem: 'canonica',
      loreContext: {
        fonte: {
          livro: 'A Tormenta de Espadas',
          capitulo: 'Samwell II & III',
          arquivo_md: 'asos_samwell_2.md',
        },
      },
      fallbackText: `Nas estrebarias escuras, o cheiro de estrume misturado à fumaça acre sufoca o choro fraco do bebê recém-nascido. Goiva está encolhida contra o fardo de feno podre, apertando a trouxa de panos contra o peito enquanto o corpo treme incontrolavelmente de febre e medo. Samwell Tarly tenta desatar as correias de um velho cavalo de tração com dedos gordos e desajeitados, soluçando a cada tropeço.

«Ele é menino... se eles nos pegarem, Dirk vai cortar a garganta dele ou entregar para as coisas da floresta!», implora a garota selvagem com olhos desorbitados. Do salão comunal chegam os rugidos de vitória dos rebeldes e o ruído de espadas triturando madeira.`,
      blocos: [
        {
          funcao: 'abertura',
          texto: `Nas estrebarias escuras, o choro fraco do recém-nascido corta o ar gelado. Goiva aperta a criança nos braços enquanto Samwell tenta desatar a montaria com dedos trêmulos.`,
        },
        {
          funcao: 'corpo',
          quando: { flagsTodas: ['protegeu_paul'] },
          texto: `Pequeno Paul surge subitamente entre as baias, segurando a rédea de uma égua magra: «Eu ajudo o Sam... o cavalinho vai levar a moça e o bebê, ninguém encosta neles!»`,
        },
        {
          funcao: 'fecho',
          texto: `As trancas da porta dos fundos estão emperradas pelo gelo. Um movimento errado chamará a atenção dos desertores que rondam a área externa.`,
        },
      ],
      escolhas: [
        {
          id: 'j4_a2_rb1_arrombar_tranca_fuga',
          tipo: 'teste_atributo',
          texto: 'Usar uma alavanca de ferro para estourar o cadeado congelado da porta dos fundos',
          atributo: 'furia',
          dc: 8,
          tom: 'violencia',
          desfechos: {
            sucesso: {
              ponte: 'Com um golpe seco e certeiro da barra de ferro, o cadeado quebra-se sem estalo alto. A porta dos fundos abre-se para a floresta e o cavalo conduz Goiva e a criança diretamente para a mata fechada.',
              destino: 'j4_a2_resgate_emboscada_pinheiros',
              marcas: ['protegeu_goiva_e_sam', 'cavalo_de_fuga_selado'],
              delta: { honra: 2, compostura: 1 },
            },
            parcial: {
              ponte: 'A madeira range com força antes de ceder. A saída é liberada, mas o barulho atrai olhares suspeitos do pátio traseiro, obrigando vocês a correrem sob a nevasca.',
              destino: 'j4_a2_resgate_emboscada_pinheiros',
              marcas: ['protegeu_goiva_e_sam'],
              delta: { compostura: -1 },
            },
            falha: {
              ponte: 'A barra entorta na trava congelada. Sam precisa empurrar com todo o seu peso corporal para forçar a abertura, atrasando a partida em minutos preciosos.',
              destino: 'j4_a2_resgate_emboscada_pinheiros',
              marcas: ['protegeu_goiva_e_sam'],
              delta: { sangue: -1, compostura: -1 },
            },
          },
          onSuccessNodeId: 'j4_a2_resgate_emboscada_pinheiros',
          onPartialFailureNodeId: 'j4_a2_resgate_emboscada_pinheiros',
        },
        {
          id: 'j4_a2_rb1_acalmar_animais_silencio',
          tipo: 'teste_atributo',
          texto: 'Acalmar o cavalo e conduzir os fugitivos pelos fundos sem fazer o menor ruído',
          atributo: 'astucia',
          dc: 8,
          tom: 'silencio',
          desfechos: {
            sucesso: {
              ponte: 'Você acaricia as orelhas do animal e cobre os cascos com trapos velhos. O cavalo avança suavemente na neve profunda e o grupo desaparece entre as faias sem que nenhum rebelde perceba.',
              destino: 'j4_a2_resgate_emboscada_pinheiros',
              marcas: ['protegeu_goiva_e_sam', 'cavalo_de_fuga_selado'],
              delta: { compostura: 2, honra: 1 },
            },
            parcial: {
              ponte: 'O animal resfolega alto ao sentir o cheiro de queimado, mas você o controla a tempo de sumir na orla dos pinheiros antes que as tochas cheguem.',
              destino: 'j4_a2_resgate_emboscada_pinheiros',
              marcas: ['protegeu_goiva_e_sam'],
              delta: { compostura: -1 },
            },
            falha: {
              ponte: 'O cavalo empaca na vala congelada e Samwell escorrega na lama. O susto quase faz Goiva soltar o bebê antes que você erga a montaria pelo cabresto.',
              destino: 'j4_a2_resgate_emboscada_pinheiros',
              marcas: ['protegeu_goiva_e_sam'],
              delta: { sangue: -1, compostura: -1 },
            },
          },
          onSuccessNodeId: 'j4_a2_resgate_emboscada_pinheiros',
          onPartialFailureNodeId: 'j4_a2_resgate_emboscada_pinheiros',
        },
      ],
    },

    // Rota B2: Emboscada nos Pinheiros
    j4_a2_resgate_emboscada_pinheiros: {
      id: 'j4_a2_resgate_emboscada_pinheiros',
      titulo: 'Os Desertores na Trilha do Norte',
      anoHistorico: '299 d.C.',
      localizacao: 'Trilha Oculta a Leste de Craster',
      regionId: 'floresta_assombrada',
      tipo: 'dialogo',
      rota: 'resgate',
      pov: 'Irmão Sem Nome',
      origem: 'original',
      notaHistorica: 'Confronto com amotinados que perseguiram Sam e Goiva para roubar a montaria e mantimentos.',
      loreContext: {
        fonte: {
          livro: 'A Tormenta de Espadas',
          capitulo: 'Samwell III',
          arquivo_md: 'asos_samwell_3.md',
        },
      },
      fallbackText: `A nevasca cai implacável entre os troncos altos, mas o perigo ainda caminha sobre duas pernas. Das sombras de uma ravina estreita, dois patrulheiros desertores com tochas encharcadas surgem no meio do caminho: Ollo Mão Cortada e Lark das Irmãs.

«Olha só o que temos aqui», zomba Lark, sacando uma faca de açougueiro suja de sangue fresco de Craster. «O porquinho gordo do Meistre e a selvagem preferida do velho. Deixem o cavalo e a comida, ou abrimos a garganta de vocês dois aqui mesmo!» Samwell treme como vara verde, mas você coloca-se entre a lâmina de Lark e a montaria de Goiva.`,
      blocos: [
        {
          funcao: 'abertura',
          texto: `Dois desertores armados com facas de Craster bloqueiam a passagem entre os pinheiros. Lark das Irmãs sorri com crueldade ao exigir o cavalo de Goiva.`,
        },
        {
          funcao: 'corpo',
          quando: { flagsTodas: ['adaga_obsidiana_guardada'] },
          texto: `O peso frio da adaga de vidro de dragão na sua bota dá segurança aos seus movimentos, mas contra aço e carne humana o ferro comum falará mais alto.`,
        },
        {
          funcao: 'fecho',
          texto: `Não há negociação com quem assassinou o Senhor Comandante. O sangue tem de lavar a honra quebrada da Patrulha.`,
        },
      ],
      interlocutores: [
        { id: 'lark', nome: 'Lark das Irmãs', papel: 'Desertor Amotinado' },
      ],
      falas: [
        {
          quem: 'lark',
          texto: 'O Velho Urso já virou comida de corvo, rapaz. Entregue o bicho e a mulher ou você morre na neve.',
        },
      ],
      escolhas: [
        {
          id: 'j4_a2_rb2_confrontar_traidores',
          tipo: 'teste_atributo',
          texto: 'Desembainhar a espada e abater Lark das Irmãs com um golpe fulminante na clavícula',
          atributo: 'furia',
          dc: 9,
          tom: 'violencia',
          desfechos: {
            sucesso: {
              ponte: 'A sua lâmina corta o ar frio com precisão implacável, fendendo o ombro de Lark antes que o traidor erga o punhal. O segundo desertor entra em pânico ao ver o companheiro tombar no gelo e foge uivando para a escuridão da mata.',
              destino: 'j4_a2_resgate_o_corvo_e_a_lamina',
              marcas: ['derrotou_desertores', 'sangue_de_traidor'],
              delta: { honra: 2, compostura: 1 },
            },
            parcial: {
              ponte: 'Você fere Lark no braço e força os dois a recuarem, mas a lâmina do desertor ainda rasga a manga da sua cota antes que eles desistam da perseguição.',
              destino: 'j4_a2_resgate_o_corvo_e_a_lamina',
              marcas: ['derrotou_desertores'],
              delta: { sangue: -1, honra: 1 },
            },
            falha: {
              ponte: 'A neve fofa trai o seu apoio e o golpe passa raspando. Lark atira uma tocha ardente no seu rosto, queimando o seu capuz antes que Samwell o atinja com um galho pesado pelas costas.',
              destino: 'j4_a2_resgate_o_corvo_e_a_lamina',
              marcas: ['derrotou_desertores'],
              delta: { sangue: -2, compostura: -1 },
            },
          },
          onSuccessNodeId: 'j4_a2_resgate_o_corvo_e_a_lamina',
          onPartialFailureNodeId: 'j4_a2_resgate_o_corvo_e_a_lamina',
        },
        {
          id: 'j4_a2_rb2_intimidar_desertores',
          tipo: 'teste_atributo',
          texto: 'Fixar os olhos em Lark e prometer a forca de Castelo Negro em nome do juramento',
          atributo: 'comando',
          dc: 9,
          tom: 'ameaca',
          desfechos: {
            sucesso: {
              ponte: 'A sua voz soa com a frieza cortante da Muralha: «Se tocarem neste cavalo, os batedores de Bowen Marsh caçarão vocês até os confins de Além-da-Muralha». Covardes por natureza, os homens hesitam e recuam para as sombras.',
              destino: 'j4_a2_resgate_o_corvo_e_a_lamina',
              marcas: ['derrotou_desertores'],
              delta: { compostura: 2, honra: 1 },
            },
            parcial: {
              ponte: 'Lark pragueja e cospe no chão, acovardado pela sua postura, mas jura vingança antes de sumir com o comparsa na neblina.',
              destino: 'j4_a2_resgate_o_corvo_e_a_lamina',
              marcas: ['derrotou_desertores'],
              delta: { compostura: -1 },
            },
            falha: {
              ponte: 'As ameaças não detêm os assassinos. Eles avançam com ferocidade e a luta só termina quando o cavalo de Goiva dá um coice violento no peito de Lark, permitindo a fuga aos trancos.',
              destino: 'j4_a2_resgate_o_corvo_e_a_lamina',
              marcas: ['derrotou_desertores'],
              delta: { sangue: -1, compostura: -1 },
            },
          },
          onSuccessNodeId: 'j4_a2_resgate_o_corvo_e_a_lamina',
          onPartialFailureNodeId: 'j4_a2_resgate_o_corvo_e_a_lamina',
        },
      ],
    },

    // Rota B3: O Corvo e a Lâmina
    j4_a2_resgate_o_corvo_e_a_lamina: {
      id: 'j4_a2_resgate_o_corvo_e_a_lamina',
      titulo: 'As Sombras no Cemitério de Pinheiros',
      anoHistorico: '299 d.C.',
      localizacao: 'Bosque Ancestral a Leste de Craster',
      regionId: 'floresta_assombrada',
      tipo: 'narracao',
      rota: 'resgate',
      pov: 'Irmão Sem Nome',
      origem: 'original',
      notaHistorica: 'Passagem tensa por um represeiro antigo onde corvos e mortos observam os fugitivos na neve.',
      loreContext: {
        fonte: {
          livro: 'A Tormenta de Espadas',
          capitulo: 'Samwell III',
          arquivo_md: 'asos_samwell_3.md',
        },
      },
      fallbackText: `A três léguas da fortaleza de Craster, a floresta torna-se tão densa que a luz do meio-dia parece crepúsculo perpétuo. As copas dos pinheiros ancestrais vergam sob montanhas de neve pura. Em uma clareira circular, ergue-se um represeiro colossal de casca branca como osso, as folhas vermelho-sangue farfalhando sob o vento que vem do norte.

Centenas de corvos negros cobrem os galhos da árvore sagrada. Eles não gritam por grão nem por carne; apenas observam em silêncio fúnebre. Samwell caminha tropeçando nas próprias botas, sustentando o cavalo onde Goiva embala a criança adormecida. Você sabe que os mortos estão caçando na floresta e que cada passo rumo ao sul é uma vitória arrancada das garras da Longa Noite.`,
      blocos: [
        {
          funcao: 'abertura',
          texto: `Em uma clareira circular, ergue-se um represeiro colossal de casca branca como osso, com centenas de corvos negros empoleirados em silêncio sepulcral sobre os galhos sangrentos.`,
        },
        {
          funcao: 'corpo',
          quando: { flagsTodas: ['sangue_de_traidor'] },
          texto: `O sangue manchado na sua lâmina esfria com a geada. Você limpa o aço na neve diante do represeiro, oferecendo a justiça sumária aos deuses antigos da floresta.`,
        },
        {
          funcao: 'fecho',
          texto: `Um dos corvos solta um pio rouco e salta na direção sul, indicando a garganta rochosa que leva de volta à trilha batida dos patrulheiros.`,
        },
      ],
      escolhas: [
        {
          id: 'j4_a2_rb3_seguir_pressagio_corvos',
          tipo: 'simples',
          texto: 'Guiar os fugitivos pela garganta indicada pelo corvo em direção ao sul',
          tom: 'devocao',
          desfecho: {
            ponte: 'Confiando no instinto das aves de Mormont, você conduz Samwell e Goiva pelo desfiladeiro protegido. O vento cessa momentaneamente e a trilha abre-se rumo à Muralha.',
            destino: 'j4_a2_marcha_dos_esfarrapados',
            marcas: ['guiou_os_desamparados', 'pressagio_dos_corvos'],
            delta: { compostura: 2, honra: 1 },
          },
          nextNodeId: 'j4_a2_marcha_dos_esfarrapados',
        },
        {
          id: 'j4_a2_rb3_manter_vigilia_retaguarda',
          tipo: 'simples',
          texto: 'Apressar o passo do cavalo e cobrir os rastros na clareira sagrada',
          tom: 'silencio',
          desfecho: {
            ponte: 'Com galhos de pinheiro, você apaga as marcas dos cascos na neve virgem. Nenhum inimigo, vivo ou morto, conseguirá seguir a trilha dos fugitivos.',
            destino: 'j4_a2_marcha_dos_esfarrapados',
            marcas: ['guiou_os_desamparados'],
            delta: { compostura: 1 },
          },
          nextNodeId: 'j4_a2_marcha_dos_esfarrapados',
        },
      ],
    },

    // =========================================================================
    // ETAPA 4: PEÇA DE CENÁRIO CANÔNICA (3 CENAS FIXAS)
    // =========================================================================

    // Peça 1: A Marcha dos Esfarrapados
    j4_a2_marcha_dos_esfarrapados: {
      id: 'j4_a2_marcha_dos_esfarrapados',
      titulo: 'Os Restos dos Homens de Preto',
      anoHistorico: '299 d.C.',
      localizacao: 'Trilha Sul da Floresta Assombrada',
      regionId: 'floresta_assombrada',
      tipo: 'peca_de_cenario',
      rota: 'comum',
      pov: 'Irmão Sem Nome',
      origem: 'canonica',
      loreContext: {
        fonte: {
          livro: 'A Tormenta de Espadas',
          capitulo: 'Samwell III & Jon VI',
          arquivo_md: 'asos_samwell_3.md',
        },
      },
      fallbackText: `Dos trezentos homens que marcharam para Além-da-Muralha cheios de orgulho, menos de trinta ainda caminham sobre a neve em direção ao sul. As duas colunas fragmentadas — os que lutaram no salão com Grenn e os que fugiram com Samwell — reencontram-se na orla do Rio dos Chocalhos.

Não há mais Senhor Comandante. O estandarte do Velho Urso está rasgado e empapado de sangue. Homens marcham envoltos em peles imundas, os olhos encovados pela fome e os lábios rachados pela geada. Ninguém canta; ninguém fala. Apenas o rangido monótono das botas no gelo marca a cadência da retirada mais trágica da história da Patrulha da Noite.`,
      blocos: [
        {
          funcao: 'abertura',
          texto: `Dos trezentos homens que marcharam para Além-da-Muralha cheios de orgulho, menos de trinta ainda caminham sobre a neve em direção ao sul. As colunas dispersas unem-se na beira do rio congelado.`,
        },
        {
          funcao: 'corpo',
          quando: { flagsTodas: ['juramento_ao_velho_urso'] },
          texto: `Grenn aproxima-se e bate no seu ombro em silêncio. A promessa feita a Jeor Mormont nos seus braços é a única chama de honra que impede os sobreviventes de desabarem na neve.`,
        },
        {
          funcao: 'corpo',
          quando: { flagsTodas: ['protegeu_goiva_e_sam'] },
          texto: `Samwell Tarly guia o cavalo onde Goiva protege a criança, olhando para você com gratidão imensa por tê-los tirado vivos das mãos de Karl Pé-Rapado.`,
        },
        {
          funcao: 'corpo',
          quando: { flagsTodas: ['escapou_do_motim'] },
          texto: `As roupas chamuscadas e o cheiro de queimado ainda impregnam os sobreviventes que romperam as paliçadas sob o fogo rebelde.`,
        },
        {
          funcao: 'corpo',
          quando: { flagsTodas: ['guiou_os_desamparados'] },
          texto: `A presença frágil do bebê no lombo do cavalo lembra aos homens que até mesmo nas noites mais escuras há vida a ser preservada.`,
        },
        {
          funcao: 'corpo',
          quando: { flagsTodas: ['posto_defesa_mormont'] },
          texto: `Aqueles que permaneceram no salão até a queda do comandante marcham com um silêncio pesado e sombrio nos olhos.`,
        },
        {
          funcao: 'corpo',
          quando: { flagsTodas: ['posto_fuga_sam'] },
          texto: `A audácia de abrir caminho pelas estrebarias garantiu que as mulheres e a criança não caíssem nas mãos de Karl.`,
        },
        {
          funcao: 'fecho',
          texto: `A floresta finalmente começa a rarear à frente. O ar cheira a pedra nua e vento limpo; a Muralha está próxima.`,
        },
      ],
      escolhas: [
        {
          id: 'j4_a2_pc1_liderar_ritmo_marcha',
          tipo: 'teste_atributo',
          texto: 'Assumir a dianteira ao lado de Grenn e ditar o ritmo para que nenhum ferido fique para trás',
          atributo: 'comando',
          dc: 8,
          tom: 'devocao',
          desfechos: {
            sucesso: {
              ponte: 'A sua voz firme sustenta a marcha dos homens esgotados. Mesmo os irmãos mais feridos encontram forças no seu exemplo e a coluna avança sem perdas pelas últimas ravinas da floresta.',
              destino: 'j4_a2_a_visao_da_muralha',
              marcas: ['liderou_os_esfarrapados'],
              delta: { honra: 2, compostura: 1 },
            },
            parcial: {
              ponte: 'O cansaço dobra os seus próprios joelhos, mas você puxa dois irmãos caídos pela gola do manto, mantendo a fila em movimento aos trancos e barrancos.',
              destino: 'j4_a2_a_visao_da_muralha',
              marcas: ['liderou_os_esfarrapados'],
              delta: { sangue: -1 },
            },
            falha: {
              ponte: 'A fraqueza faz dois patrulheiros desabarem na vala congelada. É preciso parar por preciosos minutos para erguê-los antes que a nevasca cubra as pegadas.',
              destino: 'j4_a2_a_visao_da_muralha',
              marcas: ['liderou_os_esfarrapados'],
              delta: { sangue: -2, compostura: -1 },
            },
          },
          onSuccessNodeId: 'j4_a2_a_visao_da_muralha',
          onPartialFailureNodeId: 'j4_a2_a_visao_da_muralha',
        },
        {
          id: 'j4_a2_pc1_repartir_ultimas_provisoes',
          tipo: 'simples',
          texto: 'Dividir os últimos nacos de carne seca entre os homens que cambaleiam de fome',
          tom: 'honesto',
          desfecho: {
            ponte: 'Você partilha a sua própria ração com os patrulheiros mais jovens. A comida escassa aquece a garganta dormente dos homens e renova o espírito de corpo no último trecho da viagem.',
            destino: 'j4_a2_a_visao_da_muralha',
            marcas: ['liderou_os_esfarrapados'],
            delta: { honra: 2, compostura: 1 },
          },
          nextNodeId: 'j4_a2_a_visao_da_muralha',
        },
      ],
    },

    // Peça 2: A Visão da Muralha Colossal
    j4_a2_a_visao_da_muralha: {
      id: 'j4_a2_a_visao_da_muralha',
      titulo: 'O Gigante de Gelo no Fim do Horizonte',
      anoHistorico: '299 d.C.',
      localizacao: 'Orla Sul da Floresta Assombrada',
      regionId: 'floresta_assombrada',
      tipo: 'peca_de_cenario',
      rota: 'comum',
      pov: 'Irmão Sem Nome',
      origem: 'canonica',
      loreContext: {
        fonte: {
          livro: 'A Tormenta de Espadas',
          capitulo: 'Jon VI',
          arquivo_md: 'asos_samwell_3.md',
        },
      },
      fallbackText: `A floresta acaba subitamente como se tivesse sido decepada pela lâmina de um deus. Diante de vocês, erguendo-se a setecentos pés de altura rumo às nuvens cinzentas, está a Muralha. O paredão infinito de gelo azul e pedra reluz contra a luz do poente como a espinha dorsal do próprio mundo.

Lágrimas congelam nas faces encardidas dos veteranos. Homens rudes caem de joelhos na neve batida, beijando o solo congelado. A fortaleza dos Primeiros Homens, que tantas vezes pareceu uma prisão de frio e exílio, surge agora como o único refúgio seguro entre a vida e a morte. Mais adiante, os portões de ferro e madeira de Castelo Negro aguardam entre as sombras das torres.`,
      blocos: [
        {
          funcao: 'abertura',
          texto: `A floresta recua e revela o monstro de setecentos pés de altura: a Muralha ergue-se contra o céu cinzento de chumbo, reluzindo azul e impenetrável contra a noite que cai.`,
        },
        {
          funcao: 'corpo',
          quando: { flagsTodas: ['luta_no_salao_craster'] },
          texto: `As feridas abertas no motim ainda ardem sob a cota de malha, mas a visão da Muralha afasta a dor física diante da certeza de que os traidores ficaram para trás.`,
        },
        {
          funcao: 'corpo',
          quando: { flagsTodas: ['protegeu_goiva_e_sam'] },
          texto: `Goiva ergue a cabeça do manto e contempla a barreira colossal com olhos arregalados de espanto: pela primeira vez na vida, ela e o filho estão fora do alcance de Craster.`,
        },
        {
          funcao: 'fecho',
          texto: `O portão norte de Castelo Negro range nas roldanas de ferro, abrindo passagem para os poucos sobreviventes do Grande Patrulhamento.`,
        },
      ],
      escolhas: [
        {
          id: 'j4_a2_pc2_atravessar_portao_norte',
          tipo: 'simples',
          texto: 'Cruzar o túnel escavado no gelo da Muralha e adentrar o pátio de Castelo Negro',
          tom: 'devocao',
          desfecho: {
            ponte: 'As barras de ferro levantam-se com estrépito. Você atravessa o túnel gélido sob o peso de setecentos pés de gelo ancestral e pisa na lama congelada do pátio de Castelo Negro.',
            destino: 'j4_a2_retorno_jon_snow_ferido',
            marcas: ['avistou_muralha_salvacao'],
            delta: { compostura: 1 },
          },
          nextNodeId: 'j4_a2_retorno_jon_snow_ferido',
        },
        {
          id: 'j4_a2_pc2_olhar_para_tras_floresta',
          tipo: 'simples',
          texto: 'Lançar um último olhar para a floresta negra antes de fechar os portões para sempre',
          tom: 'silencio',
          desfecho: {
            ponte: 'Você contempla a orla escura dos pinheiros uma última vez, sabendo que duzentos e setenta irmãos e o Senhor Comandante ficaram sepultados naquelas sombras.',
            destino: 'j4_a2_retorno_jon_snow_ferido',
            marcas: ['avistou_muralha_salvacao'],
            delta: { honra: 1, compostura: 1 },
          },
          nextNodeId: 'j4_a2_retorno_jon_snow_ferido',
        },
      ],
    },

    // Peça 3: O Retorno de Jon Snow Ferido
    j4_a2_retorno_jon_snow_ferido: {
      id: 'j4_a2_retorno_jon_snow_ferido',
      titulo: 'Um Cavalo Espumante no Portão Sul',
      anoHistorico: '299 d.C.',
      localizacao: 'Pátio Central de Castelo Negro',
      regionId: 'castelo_negro',
      tipo: 'peca_de_cenario',
      rota: 'comum',
      pov: 'Irmão Sem Nome',
      origem: 'canonica',
      loreContext: {
        fonte: {
          livro: 'A Tormenta de Espadas',
          capitulo: 'Jon VI',
          arquivo_md: 'asos_samwell_3.md',
        },
      },
      fallbackText: `Você mal teve tempo de desatar as correias da armadura no pátio quando um relincho agudo e desesperado corta o silêncio fúnebre do castelo. Pelo portão sul — o lado desprotegido voltado para as terras de Westeros — entra um cavalo banhado em suor cinzento e espuma sanguinolenta, desabando sobre as pedras.

Preso aos estribos da montaria está Jon Snow. A capa negra do bastardo de Ned Stark está em farrapos ensopados de sangue e uma flecha com penas cinzentas atravessa a carne de sua coxa direita. Ao ver você e os outros sobreviventes reunidos, Jon tenta se erguer sobre a neve ensanguentada:
— Fechem... fechem as portas! Não pelo norte... eles vêm pelo sul! Styr... o Magnar de Thenn escalou a Muralha perto da Atalaia da Água Cinzenta! Cem homens com machados de bronze... estão cavalgando pela Estrada do Rei e atacam antes do amanhecer!`,
      blocos: [
        {
          funcao: 'abertura',
          texto: `Pelo portão sul entra um cavalo banhado em suor e sangue, desabando sobre o pátio. Preso aos estribos está Jon Snow, com uma flecha atravessada na coxa e o rosto desfigurado pela exaustão.`,
        },
        {
          funcao: 'corpo',
          quando: { flagsTodas: ['testemunha_morte_mormont'] },
          texto: `Jon arregala os olhos ao ver o estandarte negro rasgado e os poucos sobreviventes: «O Senhor Comandante... onde está Mormont?» A notícia da morte do Velho Urso atinge o rapaz como um golpe de machado no peito.`,
        },
        {
          funcao: 'corpo',
          quando: { flagsTodas: ['aliado_grenn'] },
          texto: `Grenn corre aos berros para amparar o amigo de infância: «Jon! Pelos deuses antigos, você está vivo!»`,
        },
        {
          funcao: 'corpo',
          quando: { flagsTodas: ['avistou_muralha_salvacao'] },
          texto: `O alívio temporário de cruzar o túnel do gelo desvanece de pronto diante da constatação de que a verdadeira batalha começará agora.`,
        },
        {
          funcao: 'fecho',
          texto: `Donal Noye, o ferreiro de um braço só, surge mancando da forja com um martelo pesado na mão. Castelo Negro não tem muralhas voltadas para o sul; os Thenns estão a poucas léguas de distância.`,
        },
      ],
      escolhas: [
        {
          id: 'j4_a2_pc3_amparar_jon_enfermaria',
          tipo: 'teste_atributo',
          texto: 'Apoiar o ombro de Jon Snow e levá-lo com urgência às câmaras de Meistre Aemon',
          atributo: 'cortesia',
          dc: 8,
          tom: 'honesto',
          desfechos: {
            sucesso: {
              ponte: 'Com cuidado e firmeza, você carrega Jon através das escadarias da Torre de Hardin. Meistre Aemon extrai a flecha com mãos ágeis e Jon recupera a lucidez para desenhar as posições dos Thenns no pergaminho.',
              destino: 'j4_a2_acerto_de_contas_castelo_negro',
              marcas: ['recebeu_jon_ferido', 'alerta_de_jon_snow'],
              delta: { honra: 2, aprovacaoCompanheiros: { jon_snow: 15 } },
            },
            parcial: {
              ponte: 'Você ampara o rapaz na subida, mas a ponta farpada rasga a carne ao se mover, arrancando um gemido rouco de Jon antes que ele desmaie na mesa do meistre.',
              destino: 'j4_a2_acerto_de_contas_castelo_negro',
              marcas: ['recebeu_jon_ferido'],
              delta: { compostura: -1 },
            },
            falha: {
              ponte: 'O peso de Jon faz vocês dois escorregarem no gelo das escadarias. Clydas precisa intervir com dois noviços para içar o ferido até a enfermaria aquecida.',
              destino: 'j4_a2_acerto_de_contas_castelo_negro',
              marcas: ['recebeu_jon_ferido'],
              delta: { sangue: -1, compostura: -1 },
            },
          },
          onSuccessNodeId: 'j4_a2_acerto_de_contas_castelo_negro',
          onPartialFailureNodeId: 'j4_a2_acerto_de_contas_castelo_negro',
        },
        {
          id: 'j4_a2_pc3_soar_trompa_alarme',
          tipo: 'simples',
          texto: 'Correr até a Torre do Rei e soar a trompa de alarme para alertar os poucos homens de Castelo Negro',
          tom: 'devocao',
          desfecho: {
            ponte: 'Você puxa a corda do corno de bronze. O som grave e estridente ecoa por toda a Muralha: dois toques para selvagens. Os quarenta homens aptos correm para o arsenal aos berros de Donal Noye.',
            destino: 'j4_a2_acerto_de_contas_castelo_negro',
            marcas: ['recebeu_jon_ferido', 'alarme_sul_soado'],
            delta: { honra: 1, compostura: 1 },
          },
          nextNodeId: 'j4_a2_acerto_de_contas_castelo_negro',
        },
      ],
    },

    // =========================================================================
    // ETAPA 5: ACERTO DE CONTAS (1 CENA QUE LÊ AS MARCAS DO ATO)
    // =========================================================================

    j4_a2_acerto_de_contas_castelo_negro: {
      id: 'j4_a2_acerto_de_contas_castelo_negro',
      titulo: 'O Conselho sob a Espinha do Mundo',
      anoHistorico: '299 d.C.',
      localizacao: 'Armaria Central de Castelo Negro',
      regionId: 'castelo_negro',
      tipo: 'acerto_de_contas',
      rota: 'comum',
      pov: 'Irmão Sem Nome',
      origem: 'canonica',
      isEnding: true,
      loreContext: {
        fonte: {
          livro: 'A Tormenta de Espadas',
          capitulo: 'Jon VI & VII',
          arquivo_md: 'asos_samwell_3.md',
        },
      },
      fallbackText: `O calor das forjas de Donal Noye crepita com o cheiro acre de ferro em brasa e carvão. Ao redor da mesa de carvalho da armaria, restam menos de quarenta homens aptos para defender o portão sul de Castelo Negro: aprendizes de catorze anos, cocheiros velhos e os poucos veteranos que sobreviveram ao massacre do Punho e ao motim de Craster.

Meistre Aemon entra apoiado no braço de Clydas, os olhos cegos e leitosos fixando-se no silêncio dos homens. Donal Noye crava uma espada longa no cepo de carvalho e fala com voz de bigorna: «O Velho Urso está morto. Bowen Marsh marchou para a Ponte dos Crânios. Não há lorde para nos comandar, nem muralhas de pedra para nos proteger pelo sul. Apenas nós e o aço das nossas mãos entre os Thenns e a garganta de Westeros.»

O mundo avalia cada decisão, cada vida salva e cada gota de sangue derramada no salão em chamas de Craster.`,
      blocos: [
        {
          funcao: 'abertura',
          texto: `As forjas de Donal Noye crepitam com carvão ardente. Quarenta homens da Patrulha reúnem-se na armaria sob a liderança do ferreiro de um braço só e do cego Meistre Aemon.`,
        },
        {
          funcao: 'corpo',
          quando: { flagsTodas: ['testemunha_da_fome'] },
          texto: `A memória da fome degradante suportada na cabana de Craster gravou em você a certeza de que homens desesperados são capazes de qualquer atrocidade.`,
        },
        {
          funcao: 'corpo',
          quando: { flagsTodas: ['compaixao_por_irmaos'] },
          texto: `O conforto dispensado a Bannen em seus momentos finais foi notado pelos companheiros leais, provando que o manto negro não afogou a sua compaixão.`,
        },
        {
          funcao: 'corpo',
          quando: { flagsTodas: ['divisao_entre_irmaos'] },
          texto: `A traição consumada na cabana de Craster deixa uma ferida aberta na alma da Patrulha: a desconfiança mútua agora divide os homens.`,
        },
        {
          funcao: 'corpo',
          quando: { flagsTodas: ['lealdade_a_mormont'] },
          texto: `Você honrou a memória de Jeor Mormont até o fim, recusando as promessas fáceis dos amotinados e preservando a honra pura do manto negro.`,
        },
        {
          funcao: 'corpo',
          quando: { flagsTodas: ['testemunha_morte_mormont'] },
          texto: `O peso do sangue do Senhor Comandante ainda queima a sua cota de malha; a queda do Velho Urso será vingada com cada flecha disparada contra os invasores.`,
        },
        {
          funcao: 'corpo',
          quando: { flagsTodas: ['juramento_ao_velho_urso'] },
          texto: `O último pedido sussurrado por Mormont sobre seu filho Jorah foi confiado a você, um fardo solene que atravessará o mar quando a batalha terminar.`,
        },
        {
          funcao: 'corpo',
          quando: { flagsTodas: ['golpe_desferido'] },
          texto: `O sangue dos assassinos do Senhor Comandante derramado na sua lâmina foi a primeira cobrança da justiça pelo motim.`,
        },
        {
          funcao: 'corpo',
          quando: { flagsTodas: ['barricada_erguida'] },
          texto: `A determinação em improvisar defesas no caos do salão inspira Donal Noye a posicionar barreiras similares no pátio sul.`,
        },
        {
          funcao: 'corpo',
          quando: { flagsTodas: ['vinganca_jurada'] },
          texto: `O juramento solene de fazer os assassinos de Mormont pagarem pelo crime sela a sua postura diante dos líderes do conselho.`,
        },
        {
          funcao: 'corpo',
          quando: { flagsTodas: ['protegeu_goiva_e_sam'] },
          texto: `Goiva e a criança recém-nascida estão em segurança sob a proteção de Meistre Aemon, salvas das facas de Karl Pé-Rapado pela sua coragem nas estrebarias.`,
        },
        {
          funcao: 'corpo',
          quando: { flagsTodas: ['cavalo_de_fuga_selado'] },
          texto: `A rapidez com que aparelhou a fuga nas estrebarias evitou que o sangue inocente fosse derramado na neve.`,
        },
        {
          funcao: 'corpo',
          quando: { flagsTodas: ['derrotou_desertores'] },
          texto: `A firmeza com que abateu os desertores na floresta mostrou aos irmãos mais jovens que a covardia não tem lugar entre os defensores da Muralha.`,
        },
        {
          funcao: 'corpo',
          quando: { flagsTodas: ['pressagio_dos_corvos'] },
          texto: `O voo misterioso dos corvos sob o represeiro antigo ainda ecoa na sua mente como um aviso dos deuses antigos sobre a tempestade que se aproxima.`,
        },
        {
          funcao: 'corpo',
          quando: { flagsTodas: ['liderou_os_esfarrapados'] },
          texto: `Grenn e os sobreviventes olham para você com respeito de veterano, reconhecendo quem guiou a coluna extenuada pelas ravinas congeladas até o portão.`,
        },
        {
          funcao: 'corpo',
          quando: { flagsTodas: ['recebeu_jon_ferido'] },
          texto: `O aviso trazido por Jon Snow e acolhido prontamente no pátio deu a Castelo Negro as horas preciosas necessárias para armar barricadas de barris e fardos de feno.`,
        },
        {
          funcao: 'corpo',
          quando: { flagsTodas: ['alerta_de_jon_snow'] },
          texto: `Os mapas de patrulha foram marcados com as trilhas secretas que os guerreiros Thenn utilizarão ao se aproximarem da base desguarnecida.`,
        },
        {
          funcao: 'corpo',
          quando: { flagsTodas: ['alarme_sul_soado'] },
          texto: `O toque de alarme precoce impediu que os vigias fossem surpreendidos durante o sono, deixando todos em vigília atenta.`,
        },
        {
          funcao: 'fecho',
          texto: `Donal Noye aponta o martelo para as janelas da armaria: a noite cai sobre a Muralha e as tochas dos Thenns já riscam as colinas do sul. O Ato II encerra-se aqui; a Batalha de Castelo Negro aguarda no Ato III.`,
        },
      ],
      escolhas: [],
    },
  },
};
