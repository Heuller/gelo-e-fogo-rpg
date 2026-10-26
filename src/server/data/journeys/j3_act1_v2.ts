import 'server-only';
import { GrafoJornada } from '@/server/engine/storyLinter';

export const grafoJ3Ato1V2: GrafoJornada = {
  id: 'jornada_3_tronos_ato1_v2',
  titulo: 'Ato I: O Lobo e o Trono — De Winterfell ao Tridente',
  startNodeId: 'j3_a1_execucao_desertor_e_lobos',
  nodes: {
    // =========================================================================
    // ETAPA 1: ABERTURA (2 CENAS)
    // =========================================================================

    // 1. Execução do Desertor e Ninhada de Lobos
    j3_a1_execucao_desertor_e_lobos: {
      id: 'j3_a1_execucao_desertor_e_lobos',
      titulo: 'A Lâmina de Gelo & A Ninhada na Neve',
      anoHistorico: '298 d.C.',
      localizacao: 'Colinas Próximas a Winterfell',
      regionId: 'norte',
      tipo: 'narracao',
      rota: 'comum',
      pov: 'Eddard Stark',
      origem: 'canonica',
      loreContext: {
        fonte: {
          livro: 'A Guerra dos Tronos',
          capitulo: 'Bran I',
          arquivo_md: 'agot_bran_1.md',
        },
      },
      epigrafe: {
        texto: 'O homem que profere a sentença deve brandir a espada. Se vai tirar a vida de um homem, deve olhá-lo nos olhos e ouvir suas últimas palavras.',
        autor: 'Lorde Eddard Stark de Winterfell',
      },
      fallbackText: `A manhã nasce cinzenta e gélida sobre as colinas do Norte. Sob a respiração fumegante dos cavalos de guerra, o desertor da Patrulha da Noite é ajoelhado sobre o cepo de granito coberto de musgo seco. O homem treme, não apenas pelo vento cortante que sopra da Muralha, mas por um horror visceral que desfez sua sanidade: «Criaturas na escuridão», balbucia ele, olhando para além dos homens reunidos. «Cavaleiros brancos com olhos azuis como safiras e lâminas finas como lascas de gelo.»

Você apoia as duas mãos no cabo de duas pontas de Gelo, a lendária espada ancestral de aço valiriano da Casa Stark, larga como a mão de um homem e escura como fumaça. Robb e o jovem Bran observam com solenidade rústica. Ao pronunciar as palavras antigas de fé e lei, a lâmina desce em um arco impecável e silencioso, decepando a cabeça do traidor com um único golpe limpo.

No caminho de regresso pela mata nevada, um uivo rouco quebra o silêncio do bosque. Junto a uma ribanceira pedregosa, jaz o corpo gigantesco de uma loba de tamanho descomunal, morta com a garganta perfurada pela ponta quebrada de um chifre de veado. Ao redor do ventre ainda morno, cinco filhotes ganem contra o frio — e, escondido na neve cinzenta a alguns passos, um sexto filhote albino, de olhos rubros e absolutamente mudo, encara Jon Snow. Exatamente seis animais para os filhos de Winterfell.`,
      blocos: [
        {
          funcao: 'abertura',
          texto: `Nas colinas gélidas de Winterfell, a justiça do Primeiro Homem é cumprida com o fio ancestral de Gelo. O desertor jura ter visto os Caminhantes Brancos antes que sua cabeça role sobre a neve.`,
        },
        {
          funcao: 'corpo',
          texto: `A carcaça da loba gigante com o chifre de veado cravado na carne é um presságio que perturba o silêncio do regresso: as feras dos Stark e o símbolo da Casa Baratheon unidos em um abraço de morte.`,
        },
        {
          funcao: 'fecho',
          texto: `Bran segura o pequeno filhote contra o peito, implorando pela vida das criaturas. A decisão de acolher as feras moldará os passos de cada herdeiro diante do inverno que se aproxima.`,
        },
      ],
      vozesConflito: [
        {
          voz1: 'comando',
          voz2: 'pressagio',
          fala1: 'A lei do Norte é clara: a loba morreu além da Muralha e os filhotes não sobrevivem sem a mãe. Mate-os por misericórdia antes que sofram.',
          fala2: 'Veja o número e a cor do albino! Os deuses antigos colocaram essas feras no caminho dos seus filhos. Rejeitá-las é cuspir no próprio destino.',
        },
      ],
      internalVoices: [
        {
          atributo: 'comando',
          resultadoPassivo: 'SUCESSO',
          dcPassiva: 7,
          fala: 'O sangue no aço não mente. O desertor morreu com dignidade porque a sentença foi pronunciada e executada pela mesma mão.',
        },
      ],
      escolhas: [
        {
          id: 'j3_a1_c1_acolher_ninhada_stark',
          tipo: 'teste_atributo',
          texto: 'Ouvir o apelo de Jon Snow e permitir que cada filho adote um dos filhotes de lobo gigante',
          atributo: 'comando',
          dc: 8,
          tom: 'honesto',
          circunstancias: [
            {
              tipo: 'vantagem',
              motivo: 'Jon argumenta que há cinco filhotes legítimos e um albino, exato reflexo dos filhos de Ned.',
            },
          ],
          desfechos: {
            sucesso: {
              ponte: 'Você embainha a adaga e concorda com um aceno grave. Os meninos envolvem os filhotes em suas capas de pele com júbilo contido, selando o vínculo sagrado entre o sangue Stark e os lobos gigantes.',
              destino: 'j3_a1_hub_criptas_de_winterfell',
              marcas: ['justica_de_gelo', 'ninhada_de_lobos_acolhida'],
              delta: { honra: 2, compostura: 1 },
            },
            parcial: {
              ponte: 'Você autoriza a tutela sob aviso severo de que cada criança alimentará e domará seu próprio animal. A presença dos predadores traz um pressentimento pesado para o pátio de Winterfell.',
              destino: 'j3_a1_hub_criptas_de_winterfell',
              marcas: ['justica_de_gelo'],
              delta: { compostura: 1 },
            },
            falha: {
              ponte: 'Você hesita, lembrando o chifre do veado cravado na garganta da besta, mas o olhar suplicante de Bran o convence a poupá-los temporariamente.',
              destino: 'j3_a1_hub_criptas_de_winterfell',
              marcas: ['justica_de_gelo'],
              delta: { sangue: -1 },
            },
          },
          onSuccessNodeId: 'j3_a1_hub_criptas_de_winterfell',
          onPartialFailureNodeId: 'j3_a1_hub_criptas_de_winterfell',
        },
        {
          id: 'j3_a1_c2_examinar_relato_desertor',
          tipo: 'teste_atributo',
          texto: 'Interrogar os batedores sobre os rastros deixados pelo desertor na Floresta Assombrada',
          atributo: 'erudicao',
          dc: 9,
          tom: 'engano',
          desfechos: {
            sucesso: {
              ponte: 'Os relatos confirmam que o homem cavalgou sem descanso desde os desfiladeiros gelados, aterrorizado por algo que aniquilou experientes patrulheiros sem deixar sangue na neve.',
              destino: 'j3_a1_hub_criptas_de_winterfell',
              marcas: ['justica_de_gelo', 'investigou_ameaca_norte'],
              delta: { compostura: 2 },
            },
            parcial: {
              ponte: 'Ouvir os murmúrios dos homens apenas reforça o desconforto: se o frio está despertando coisas antigas, o reino não pode se dividir em querelas de corte.',
              destino: 'j3_a1_hub_criptas_de_winterfell',
              marcas: ['justica_de_gelo'],
              delta: { compostura: 1 },
            },
            falha: {
              ponte: 'O vento dispersa as pistas na neve e você guarda a dúvida no coração, ciente de que as obrigações da comitiva real exigem toda a sua atenção imediata.',
              destino: 'j3_a1_hub_criptas_de_winterfell',
              marcas: ['justica_de_gelo'],
              delta: { sangue: -1 },
            },
          },
          onSuccessNodeId: 'j3_a1_hub_criptas_de_winterfell',
          onPartialFailureNodeId: 'j3_a1_hub_criptas_de_winterfell',
        },
      ],
    },

    // 2. Hub das Criptas com Robert Baratheon
    j3_a1_hub_criptas_de_winterfell: {
      id: 'j3_a1_hub_criptas_de_winterfell',
      titulo: 'As Sombras das Criptas & A Oferta da Mão',
      anoHistorico: '298 d.C.',
      localizacao: 'Criptas Ancestrais de Winterfell',
      regionId: 'norte',
      tipo: 'hub',
      rota: 'comum',
      pov: 'Eddard Stark',
      origem: 'canonica',
      loreContext: {
        fonte: {
          livro: 'A Guerra dos Tronos',
          capitulo: 'Eddard I',
          arquivo_md: 'agot_eddard_1.md',
        },
      },
      fallbackText: `A tocha estala nas paredes de pedra úmida enquanto você guia o Rei Robert Baratheon pelas profundezas das criptas. Ao redor, fileiras intermináveis de estátuas de granito dos antigos Reis do Inverno encaram a escuridão com espadas de ferro pousadas sobre os joelhos e lobos de pedra vigiando seus pés.

Robert caminha pesadamente, arquejando sob o peso da banha e da veludo escarlate que substituíram a musculatura do jovem guerreiro do Tridente. Ele para diante da efígie talhada de Lyanna Stark. O rei toca o rosto frio de pedra com ternura desajeitada, e seus olhos azuis se turvam de fúria e nostalgia: «Ela deveria estar descansando em uma colina ensolarada, Ned. Não aqui no fundo da terra.»

«Ela era uma Stark de Winterfell», você responde em tom baixo e firme. «Este é o lugar dela.»

Robert vira-se bruscamente, o hálito exalando vinho azedo e cansaço: «Jon Arryn está morto, Ned. Foi uma febre repentina que o queimou em dias. Preciso de você em Porto Real. Não como cortesão, mas como minha Mão. O Trono de Ferro está cercado de lisonjeiros e cobras Lannister. Preciso do homem que me deu a coroa para me ajudar a governar.»`,
      blocos: [
        {
          funcao: 'abertura',
          texto: `Nas profundezas silenciosas das criptas de Winterfell, as tochas iluminam os olhos de pedra dos Reis do Inverno enquanto o Rei Robert desabafa sua dor diante do túmulo de Lyanna.`,
        },
        {
          funcao: 'corpo',
          quando: { flagsTodas: ['ninhada_de_lobos_acolhida'] },
          texto: `A memória da loba morta com o chifre na garganta ecoa nas sombras da galeria, como um aviso mudo gravado na pedra antes mesmo da comitiva do rei pisar no Norte.`,
        },
        {
          funcao: 'corpo',
          quando: { flagsTodas: ['investigou_ameaca_norte'] },
          texto: `O relato desesperado do desertor ressoa entre as sepulturas antigas: enquanto o sul se consome em intrigas douradas, o verdadeiro inverno começa a marchar.`,
        },
        {
          funcao: 'fecho',
          texto: `Robert Baratheon estende o pesado broche de ferro e prata da Mão do Rei e oferece a união entre seu herdeiro Joffrey e a jovem Sansa.`,
        },
      ],
      interlocutores: [
        {
          id: 'robert_baratheon',
          nome: 'Rei Robert Baratheon',
          papel: 'Rei dos Sete Reinos',
        },
      ],
      falas: [
        {
          quem: 'robert_baratheon',
          texto: 'Maldita seja a corte de Porto Real, Ned! Eu me sinto cercado por mulheres venenosas, escribas gananciosos e meistres bajuladores. Jon Arryn era o meu escudo. Agora preciso da sua espada.',
        },
      ],
      escolhas: [
        {
          id: 'j3_a1_hub_lembranca_lyanna',
          tipo: 'simples',
          texto: 'Questionar Robert sobre as verdadeiras circunstâncias da morte súbita de Jon Arryn',
          tom: 'honesto',
          unica: true,
          permanece: true,
          desfecho: {
            ponte: 'Robert desvia o olhar para a espada de ferro de Lorde Rickard Stark e aperta a mandíbula: «Ele adoeceu após pesquisar linhagens e pergaminhos antigos na Cidadela. Cersei diz que foi a idade, mas não confio no sorriso da minha rainha.» A desconfiança lança uma sombra gélida sobre o ar úmido da cripta.',
            marcas: ['suspeita_lannister', 'juramento_nas_criptas'],
            delta: { compostura: 1 },
          },
          nextNodeId: 'j3_a1_hub_criptas_de_winterfell',
        },
        {
          id: 'j3_a1_hub_noivado_sansa_joffrey',
          tipo: 'simples',
          texto: 'Discutir a proposta de casamento entre sua filha Sansa e o Príncipe Herdeiro Joffrey',
          tom: 'diplomatico',
          unica: true,
          permanece: true,
          desfecho: {
            ponte: 'Robert sorri pela primeira vez, uma gargalhada rouca ecoando nas abóbadas subterrâneas: «Nossos sangues finalmente unidos, como deveria ter sido no nosso tempo, Ned! O garoto tem o orgulho dos leões da mãe, mas você saberá moldá-lo como um verdadeiro rei.»',
            marcas: ['noivado_joffrey_proposto'],
            delta: { honra: 1 },
          },
          nextNodeId: 'j3_a1_hub_criptas_de_winterfell',
        },
        {
          id: 'j3_a1_hub_memoria_antigos_reis',
          tipo: 'simples',
          texto: 'Contemplar as estátuas dos antigos Reis do Inverno e recordar o peso do dever da Casa Stark',
          tom: 'devocao',
          unica: true,
          permanece: true,
          desfecho: {
            ponte: 'Você passa a mão na lâmina de pedra de Brandon, o Construtor. Os reis antigos governaram com ferro e gelo; se Porto Real precisa da força do Norte, você não hesitará em cumprir seu destino.',
            marcas: ['luto_por_lyanna'],
            delta: { compostura: 1, honra: 1 },
          },
          nextNodeId: 'j3_a1_hub_criptas_de_winterfell',
        },
        {
          id: 'j3_a1_hub_aceitar_oferta_robert',
          tipo: 'simples',
          texto: 'Assumir solenemente o compromisso com Robert e aceitar o encargo de Mão do Rei',
          tom: 'honesto',
          desfecho: {
            ponte: 'Você ajoelha diante do velho amigo e aceita o juramento que selará o destino da Casa Stark. O broche de prata brilha sob a tocha enquanto vocês sobem as escadarias em direção à luz pálida de Winterfell.',
            destino: 'j3_a1_dilema_a_partida_de_winterfell',
            marcas: ['juramento_mao_do_rei'],
            delta: { honra: 2, compostura: 1 },
          },
          nextNodeId: 'j3_a1_dilema_a_partida_de_winterfell',
        },
      ],
    },

    // =========================================================================
    // ETAPA 2: ENCRUZILHADA (1 CENA)
    // =========================================================================

    // 3. Dilema da Partida após a Queda de Bran
    j3_a1_dilema_a_partida_de_winterfell: {
      id: 'j3_a1_dilema_a_partida_de_winterfell',
      titulo: 'A Torre Quebrada & O Voo do Corvo',
      anoHistorico: '298 d.C.',
      localizacao: 'Aposentos de Lorde Eddard em Winterfell',
      regionId: 'norte',
      tipo: 'narracao',
      rota: 'comum',
      pov: 'Eddard Stark',
      origem: 'canonica',
      loreContext: {
        fonte: {
          livro: 'A Guerra dos Tronos',
          capitulo: 'Eddard II & Catelyn II',
          arquivo_md: 'agot_catelyn_2.md',
        },
      },
      fallbackText: `A tragédia atinge Winterfell como um raio de inverno. Bran jaz imóvel na cama da torre, os olhos fechados e o corpo quebrado após uma queda inexplicável dos muros da Torre Quebrada. Meistre Luwin não oferece esperança de que o menino volte a andar, e Catelyn recusa-se a sair do lado do filho, desfeita em lágrimas e vigília.

No meio da noite, Luwin traz uma mensagem secreta escondida na lente de seu telescópio: uma carta codificada de Lysa Arryn enviada do Ninho da Águia. As palavras ardem na lareira: «Lorde Arryn foi assassinado. Foram os Lannister. Tenha cuidado com o leão.»

A obrigação para com Robert chama no sul, enquanto o coração e os deveres do Norte clamam por justiça e proteção. Você precisa definir a marcha para a capital: conduzir uma marcha aberta e ostensiva ao lado do rei, protegendo a honra pública de Winterfell, ou destacar batedores secretos e focar na investigação silenciosa do atentado antes que as teias de Porto Real se fechem.`,
      blocos: [
        {
          funcao: 'abertura',
          texto: `Com Bran em coma profundo e a carta secreta de Lysa Arryn acusando os Lannister pelo envenenamento da Mão anterior, o perigo torna-se imediato.`,
        },
        {
          funcao: 'corpo',
          quando: { flagsTodas: ['suspeita_lannister'] },
          texto: `As palavras ditas por Robert nas criptas ganham contornos aterrorizantes: os leões de Rochedo Casterly já começaram a devorar os homens honrados do reino.`,
        },
        {
          funcao: 'corpo',
          quando: { flagsTodas: ['noivado_joffrey_proposto'] },
          texto: `A proposta de noivado entre Sansa e Joffrey agora parece uma armadilha dourada, ameaçando prender sua filha na corte dos assassinos.`,
        },
        {
          funcao: 'fecho',
          texto: `O sol nasce sobre a Estrada do Rei. É preciso escolher a conduta da guarda de Winterfell na jornada rumo a Porto Real.`,
        },
      ],
      vozesConflito: [
        {
          voz1: 'astucia',
          voz2: 'comando',
          fala1: 'Catelyn tem razão: marche com poucos e mantenha os olhos abertos. Se os Lannister tentaram matar Bran, cada passo deve ser uma armadilha velada.',
          fala2: 'Um Senhor de Winterfell não viaja furtivo como um espião. Cavalgue ao lado de Robert e confronte a corte com a autoridade legítima da Mão.',
        },
      ],
      escolhas: [
        {
          id: 'j3_a1_c1_rota_investigacao_adaga',
          tipo: 'simples',
          texto: 'Coordenar com Catelyn uma investigação sigilosa e adiantar a escolta para vigiar as rotas do Gargalo (Rota A: Investigação)',
          tom: 'engano',
          desfecho: {
            ponte: 'Você instrui Catelyn a selar os portões e manter Meistre Luwin alerta para qualquer mensageiro. Despachando batedores ligeiros sob o comando de Jory Cassel, sua coluna assume formação dispersa e vigilante ao longo da Estrada do Rei.',
            destino: 'j3_a1_investigacao_a_adaga_valiriana',
            marcas: ['estrategia_investigativa', 'pacto_com_catelyn'],
            delta: { compostura: 1, honra: 1 },
          },
          nextNodeId: 'j3_a1_investigacao_a_adaga_valiriana',
        },
        {
          id: 'j3_a1_c2_rota_comitiva_real_corte',
          tipo: 'simples',
          texto: 'Cavalgar na vanguarda da comitiva real ao lado do Rei Robert, vigiando de perto a Rainha Cersei e Jaime (Rota B: Comitiva Real)',
          tom: 'honesto',
          desfecho: {
            ponte: 'Você monta seu corcel negro com a espada Gelo embainhada nas costas e assume a liderança da comitiva imperial. O estandarte do lobo gigante flutua ao lado do veado coroado, enfrentando os olhares gélidos da comitiva dourada dos Lannister.',
            destino: 'j3_a1_comitiva_banquete_com_robert',
            marcas: ['postura_honra_publica', 'confronto_com_cersei'],
            delta: { compostura: 1, honra: 1 },
          },
          nextNodeId: 'j3_a1_comitiva_banquete_com_robert',
        },
      ],
    },

    // =========================================================================
    // ETAPA 3: ROTAS (6 CENAS: 3 POR ROTA)
    // =========================================================================

    // ROTA A: A Investigação Silenciosa (3 cenas)
    j3_a1_investigacao_a_adaga_valiriana: {
      id: 'j3_a1_investigacao_a_adaga_valiriana',
      titulo: 'O Aço da Traição no Bosque Sagrado',
      anoHistorico: '298 d.C.',
      localizacao: 'Bosque Sagrado de Winterfell',
      regionId: 'norte',
      tipo: 'dialogo',
      rota: 'investigacao',
      pov: 'Eddard Stark',
      origem: 'canonica',
      loreContext: {
        fonte: {
          livro: 'A Guerra dos Tronos',
          capitulo: 'Catelyn III',
          arquivo_md: 'agot_catelyn_3.md',
        },
      },
      fallbackText: `A neblina cobre o lago escuro do Bosque Sagrado sob os ramos vermelhos do represeiro ancestral. Catelyn entrega em suas mãos a arma recolhida no quarto de Bran: uma adaga de lâmina ondulada de aço valiriano puro, com cabo de osso de dragão polido. Uma arma de lorde, valiosa demais para pertencer a um mero mercenário de estrumeira.

«O assassino tentou cortar a garganta de Bran», fala Catelyn com as mãos enfaixadas onde o aço cortou sua carne até o osso. «Foi o lobo gigante quem arrancou a traqueia do patife. Se o animal não estivesse lá, nosso menino estaria morto.»

Você segura a lâmina contra a luz pálida. O aço valiriano é inconfundível: escuro, com dobras esfumaçadas que jamais perdem o fio. Ninguém em Winterfell possui tal riqueza. A arma veio com a corte real.`,
      blocos: [
        {
          funcao: 'abertura',
          texto: `Sob o olhar solene do represeiro ancestral, você examina a adaga que quase tirou a vida de Bran: aço valiriano e osso de dragão, indícios irrefutáveis de sangue nobre por trás do golpe.`,
        },
        {
          funcao: 'corpo',
          quando: { flagsTodas: ['ninhada_de_lobos_acolhida'] },
          texto: `O filhote de Bran salvou a vida do herdeiro, comprovando que a misericórdia concedida na neve das colinas foi o maior acerto do Norte.`,
        },
        {
          funcao: 'fecho',
          texto: `Catelyn decide viajar secretamente de navio para Porto Real para entregar a adaga e identificar seu dono nos registros da capital.`,
        },
      ],
      interlocutores: [
        {
          id: 'catelyn_stark',
          nome: 'Catelyn Stark',
          papel: 'Senhora de Winterfell',
        },
      ],
      falas: [
        {
          quem: 'catelyn_stark',
          texto: 'Quem enviou um homem com aço valiriano para matar um menino aleijado não hesitará em destruir toda a nossa Casa, Ned. Não confie em ninguém no sul.',
        },
      ],
      escolhas: [
        {
          id: 'j3_a1_c_investigar_corte_adaga',
          tipo: 'teste_atributo',
          texto: 'Traçar o perfil do mandante e instruir Catelyn a procurar Lorde Petyr Baelish na capital',
          atributo: 'astucia',
          dc: 9,
          tom: 'engano',
          desfechos: {
            sucesso: {
              ponte: 'Você recomenda cautela extrema com Mindinho, lembrando que o homem amou Catelyn na juventude, mas agora serve às moedas do Trono. Catelyn guarda a adaga sob a capa e parte às escondidas com Ser Rodrik Cassel.',
              destino: 'j3_a1_investigacao_conversa_com_tyrion',
              marcas: ['investigacao_adaga_valiriana', 'alerta_mindinho_dado'],
              delta: { compostura: 2 },
            },
            parcial: {
              ponte: 'A despedida é dolorosa e apressada. Catelyn toma o caminho do mar com a adaga oculta em linho grosso enquanto você retoma a cavalgada pela Estrada do Rei.',
              destino: 'j3_a1_investigacao_conversa_com_tyrion',
              marcas: ['investigacao_adaga_valiriana'],
              delta: { compostura: 1 },
            },
            falha: {
              ponte: 'O peso da culpa por deixar a família desprotegida consome seus pensamentos enquanto a comitiva avança para os pântanos do sul.',
              destino: 'j3_a1_investigacao_conversa_com_tyrion',
              marcas: ['investigacao_adaga_valiriana'],
              delta: { sangue: -1 },
            },
          },
          onSuccessNodeId: 'j3_a1_investigacao_conversa_com_tyrion',
          onPartialFailureNodeId: 'j3_a1_investigacao_conversa_com_tyrion',
        },
        {
          id: 'j3_a1_c_reforcar_guarnicao_robb',
          tipo: 'simples',
          texto: 'Deixar ordens estritas para que Robb convoque homens de armas leais para patrulhar os muros de Winterfell',
          tom: 'honesto',
          desfecho: {
            ponte: 'Robb recebe a incumbência de governar o Norte com a firmeza de um lorde feito. Sabendo que o castelo está protegido, você desce para o sul com a determinação redobrada.',
            destino: 'j3_a1_investigacao_conversa_com_tyrion',
            marcas: ['winterfell_guarnecido', 'investigacao_adaga_valiriana'],
            delta: { honra: 2 },
          },
          nextNodeId: 'j3_a1_investigacao_conversa_com_tyrion',
        },
      ],
    },

    j3_a1_investigacao_conversa_com_tyrion: {
      id: 'j3_a1_investigacao_conversa_com_tyrion',
      titulo: 'Palavras na Penumbra da Estalagem',
      anoHistorico: '298 d.C.',
      localizacao: 'Estalagem na Estrada do Rei',
      regionId: 'terras_fluviais',
      tipo: 'dialogo',
      rota: 'investigacao',
      pov: 'Eddard Stark',
      origem: 'original',
      loreContext: {
        fonte: {
          livro: 'A Guerra dos Tronos',
          capitulo: 'Tyrion II',
          arquivo_md: 'agot_tyrion_2.md',
        },
        notaHistorica: 'Dramatização de diálogo filosófico e político entre Ned Stark e Tyrion Lannister sobre as intrigas da capital e o estado da Patrulha da Noite.',
      },
      fallbackText: `A chuva tamborila no teto de palha da estalagem da encruzilhada. Junto a uma lareira esfumaçada, Tyrion Lannister bebe vinho espesso em um cálice de estanho, lendo um tomo encadernado em couro carcomido. Ele ergue os olhos de cores desiguais — um verde e outro negro — e saúda a Mão do Rei com uma reverência zombeteira:

«Lorde Stark. Que honra ver o Protetor do Norte partilhando o banco duro de uma estalagem decadente com um anão. Diga-me, meu senhor: a lama do Tridente é tão convidativa quanto a neve eterna de Winterfell?»

Você senta-se defronte ao pequeno homem com postura ereta. Tyrion não carrega a arrogância belicosa de Jaime nem o veneno perfumado de Cersei, mas sua mente é uma lâmina afiada como aço valiriano. Sondar o leão sem revelar suas cartas é o teste mais sutil da marcha.`,
      blocos: [
        {
          funcao: 'abertura',
          texto: `Em uma parada chuvosa na Estrada do Rei, você encontra Tyrion Lannister retornando do seu passeio curioso pela Muralha.`,
        },
        {
          funcao: 'corpo',
          quando: { flagsTodas: ['alerta_mindinho_dado'] },
          texto: `A cautela que você recomendou a Catelyn sobre as maquinações de Porto Real ecoa enquanto você mede o sorriso ardiloso do anão.`,
        },
        {
          funcao: 'corpo',
          quando: { flagsTodas: ['winterfell_guarnecido'] },
          texto: `Saber que Robb mantém Winterfell sob vigilância armada traz serenidade para enfrentar as ironias venenosas da corte.`,
        },
        {
          funcao: 'fecho',
          texto: `O anão ergue o cálice e desafia sua retidão nortenha: «Um homem honrado em Porto Real é como uma donzela virgem em um bordel: atrai todos os abutres da cidade.»`,
        },
      ],
      interlocutores: [
        {
          id: 'tyrion_lannister',
          nome: 'Tyrion Lannister',
          papel: 'Irmão da Rainha Cersei',
        },
      ],
      falas: [
        {
          quem: 'tyrion_lannister',
          texto: 'A mente necessita de livros da mesma forma que a espada necessita da pedra de amolar, se quisermos que se mantenha afiada. Que livro você anda lendo sobre Porto Real, Lorde Stark?',
        },
      ],
      escolhas: [
        {
          id: 'j3_a1_c_sondar_dividas_coroa',
          tipo: 'teste_atributo',
          texto: 'Questionar Tyrion sobre os milhões em ouro que o Trono deve ao Rochedo Casterly',
          atributo: 'astucia',
          dc: 8,
          tom: 'engano',
          desfechos: {
            sucesso: {
              ponte: 'Tyrion sorri com honestidade perturbadora: «Meu pai não empresta ouro por caridade, Lorde Stark. Cada moeda colocada no cofre de Robert é um grilhão de ferro forjado no pescoço da coroa.» O aviso é cristalino.',
              destino: 'j3_a1_investigacao_a_marcha_pelo_gargalo',
              marcas: ['alerta_de_tyrion', 'mente_astuta_desafiada'],
              delta: { compostura: 2 },
            },
            parcial: {
              ponte: 'O anão esquiva-se com piadas sobre os torneios extravagantes de Robert, mas o cálculo em seus olhos não deixa dúvidas: os Lannister cobram suas dívidas.',
              destino: 'j3_a1_investigacao_a_marcha_pelo_gargalo',
              marcas: ['alerta_de_tyrion'],
              delta: { compostura: 1 },
            },
            falha: {
              ponte: 'Tyrion percebe sua intenção inquisitória e fecha-se em silêncio cortês, brindando à longa e perigosa viagem que o aguarda no sul.',
              destino: 'j3_a1_investigacao_a_marcha_pelo_gargalo',
              marcas: ['alerta_de_tyrion'],
              delta: { honra: -1 },
            },
          },
          onSuccessNodeId: 'j3_a1_investigacao_a_marcha_pelo_gargalo',
          onPartialFailureNodeId: 'j3_a1_investigacao_a_marcha_pelo_gargalo',
        },
        {
          id: 'j3_a1_c_defender_honra_muralha',
          tipo: 'simples',
          texto: 'Reafirmar a nobreza do dever da Patrulha da Noite e repreender o cinismo do anão',
          tom: 'honesto',
          desfecho: {
            ponte: 'Tyrion suspira e curva a cabeça com genuíno respeito: «Admiro sua convicção, lorde Eddard. Mas quando estiver na Fortaleza Vermelha, lembre-se de que lobos leais não duram muito entre serpentes.»',
            destino: 'j3_a1_investigacao_a_marcha_pelo_gargalo',
            marcas: ['honra_da_muralha_defendida', 'alerta_de_tyrion'],
            delta: { honra: 2 },
          },
          nextNodeId: 'j3_a1_investigacao_a_marcha_pelo_gargalo',
        },
      ],
    },

    j3_a1_investigacao_a_marcha_pelo_gargalo: {
      id: 'j3_a1_investigacao_a_marcha_pelo_gargalo',
      titulo: 'Os Pântanos do Gargalo & A Estrada dos Reis',
      anoHistorico: '298 d.C.',
      localizacao: 'Fosso Cailin e Pântanos do Gargalo',
      regionId: 'norte',
      tipo: 'narracao',
      rota: 'investigacao',
      pov: 'Eddard Stark',
      origem: 'original',
      loreContext: {
        fonte: {
          livro: 'A Guerra dos Tronos',
          capitulo: 'Catelyn III',
          arquivo_md: 'agot_catelyn_3.md',
        },
        notaHistorica: 'Travessia estratégica pela fortaleza em ruínas de Fosso Cailin e navegação pelos pântanos patrulhados pelos homens do junco de Howland Reed.',
      },
      fallbackText: `A calçada da Estrada do Rei torna-se uma fita estreita de pedra escura erguida sobre milhas intermináveis de lodo negro, águas estagnadas e juncos venenosos. O ar cheira a podridão vegetal e enxofre. À retaguarda, as três torres colossais de basalto de Fosso Cailin vigiam a passagem: nenhuma hoste do sul jamais rompeu aquela garganta de pedra e lodo.

Batedores silenciosos montados em pôneis magros emergem dos canaviais: cranogumanos, o pequeno povo das terras pantanosas juramentado à Casa Reed. Eles trazem mensagens discretas de Atalaia da Água Cinzenta, assegurando que as rotas secretas permanecem livres de olhos inimigos.

Jory Cassel cavalga ao seu lado com o arco em punho, perscrutando os nevoeiros espessos. Comandar essa vanguarda com prudência garantiu que suas linhas chegassem às ricas bacias do Tridente com provisões intactas e batedores alertas contra qualquer emboscada.`,
      blocos: [
        {
          funcao: 'abertura',
          texto: `A travessia do Gargalo exige disciplina férrea sobre a calçada estreita cercada por pântanos traiçoeiros e cobras de água doce.`,
        },
        {
          funcao: 'corpo',
          quando: { flagsTodas: ['investigacao_adaga_valiriana'] },
          texto: `A certeza de que uma conspiração sombria ameaça sua Casa torna cada sombra entre os juncos um motivo para redobrar as patrulhas nortenhas.`,
        },
        {
          funcao: 'corpo',
          quando: { flagsTodas: ['mente_astuta_desafiada'] },
          texto: `O alerta de Tyrion sobre as dívidas da coroa faz com que você encare os pântanos como a última fronteira livre da tirania do ouro Lannister.`,
        },
        {
          funcao: 'corpo',
          quando: { flagsTodas: ['honra_da_muralha_defendida'] },
          texto: `A retidão com que defendeu a Muralha renova o orgulho dos guardas que marcham a pé ao lado dos seus cavalos.`,
        },
        {
          funcao: 'fecho',
          texto: `Ao cruzar os limites do Tridente, as cores verdejantes das Terras Fluviais recebem os cavalos, mas a tranquilidade da paisagem esconde a tempestade que aguarda no acampamento do rei.`,
        },
      ],
      escolhas: [
        {
          id: 'j3_a1_c_reforcar_segredos_howland',
          tipo: 'teste_atributo',
          texto: 'Enviar emissários secretos a Howland Reed para que mantenha os pântanos fechados a estranhos',
          atributo: 'comando',
          dc: 8,
          tom: 'honesto',
          desfechos: {
            sucesso: {
              ponte: 'Os cranogumanos desaparecem na névoa como fantasmas. Fosso Cailin e os pântanos tornam-se uma muralha intransponível às suas costas, protegendo o Norte contra qualquer investida vinda do sul.',
              destino: 'j3_a1_peca_incidente_no_tridente',
              marcas: ['prudencia_no_gargalo', 'alianca_cranogumanos'],
              delta: { compostura: 2, honra: 1 },
            },
            parcial: {
              ponte: 'A marcha transcorre sem incidentes graves, embora o lodo e os mosquitos esgotem os recrutas mais jovens da escolta.',
              destino: 'j3_a1_peca_incidente_no_tridente',
              marcas: ['prudencia_no_gargalo'],
              delta: { compostura: 1 },
            },
            falha: {
              ponte: 'Duas carroças de suprimentos atolam no lodo e atrasam a coluna, forçando os homens a dobrarem a marcha sob chuva pesada.',
              destino: 'j3_a1_peca_incidente_no_tridente',
              marcas: ['prudencia_no_gargalo'],
              delta: { sangue: -1 },
            },
          },
          onSuccessNodeId: 'j3_a1_peca_incidente_no_tridente',
          onPartialFailureNodeId: 'j3_a1_peca_incidente_no_tridente',
        },
        {
          id: 'j3_a1_c_acelerar_passo_tridente',
          tipo: 'simples',
          texto: 'Acelerar o passo da guarda para reencontrar as filhas Sansa e Arya na comitiva principal',
          tom: 'honesto',
          desfecho: {
            ponte: 'Você comanda a cavalgada célere e alcança as margens do rio Tridente bem a tempo de ouvir o clamor de trombetas e gritos assustados vindos da margem.',
            destino: 'j3_a1_peca_incidente_no_tridente',
            marcas: ['pressa_de_pai', 'prudencia_no_gargalo'],
            delta: { honra: 1 },
          },
          nextNodeId: 'j3_a1_peca_incidente_no_tridente',
        },
      ],
    },

    // ROTA B: A Comitiva Real (3 cenas)
    j3_a1_comitiva_banquete_com_robert: {
      id: 'j3_a1_comitiva_banquete_com_robert',
      titulo: 'Vinho Azedo & O Peso da Coroa',
      anoHistorico: '298 d.C.',
      localizacao: 'Pavilhão Real na Estrada do Rei',
      regionId: 'terras_fluviais',
      tipo: 'dialogo',
      rota: 'comitiva_real',
      pov: 'Eddard Stark',
      origem: 'canonica',
      loreContext: {
        fonte: {
          livro: 'A Guerra dos Tronos',
          capitulo: 'Eddard II',
          arquivo_md: 'agot_eddard_2.md',
        },
      },
      fallbackText: `O pavilhão de veludo dourado e seda carmesim da comitiva real é sufocante com o cheiro de javali assado, lareiras acesas e vinho derramado. Robert Baratheon afunda em seu trono portátil com a túnica aberta no peito, rindo alto enquanto cortesãos do sul aplaudem anedotas vulgares.

A Rainha Cersei Lannister senta-se distante, a taça de prata intocada entre dedos cheios de anéis de rubi. Seus olhos verdes faiscam com desprezo gélido toda vez que Robert grita por mais bebida.

Quando os servos se retiram, Robert apoia os cotovelos pesados na mesa e encara você com um brilho febril: «Chega de bajuladores, Ned! A Cidadela mandou mensageiros dizendo que Daenerys Targaryen se casou com um senhor dos cavalos dothraki além do Mar Estreito. Um selvagem com cem mil guerreiros montados! Devemos cortar a cabeça da donzela antes que ela pare um dragão.»`,
      blocos: [
        {
          funcao: 'abertura',
          texto: `No banquete de viagem da comitiva real, Robert Baratheon confronta você sobre a ameaça dos Targaryen exilados em Essos.`,
        },
        {
          funcao: 'corpo',
          quando: { flagsTodas: ['postura_honra_publica'] },
          texto: `Sua presença altiva no centro da mesa impõe um silêncio constrangido entre os nobres do Rochedo Casterly, pouco acostumados à sobriedade austera do Norte.`,
        },
        {
          funcao: 'fecho',
          texto: `A insistência do rei em assassinar uma jovem exilada fere seu senso de justiça e desencadeia a primeira fratura moral com o velho amigo.`,
        },
      ],
      interlocutores: [
        {
          id: 'robert_baratheon',
          nome: 'Rei Robert Baratheon',
          papel: 'Rei dos Sete Reinos',
        },
      ],
      falas: [
        {
          quem: 'robert_baratheon',
          texto: 'Eu vou matar todos os Targaryen em que conseguir pôr as mãos, Ned, até que estejam tão mortos quanto o desgraçado do Rhaegar! Não me venha com sermões de honra.',
        },
      ],
      escolhas: [
        {
          id: 'j3_a1_c_repreender_assassinato_robert',
          tipo: 'teste_atributo',
          texto: 'Condenar veementemente o plano de assassinato como indigno de um rei justo',
          atributo: 'comando',
          dc: 8,
          tom: 'honesto',
          desfechos: {
            sucesso: {
              ponte: 'Sua voz corta o ar como gelo: «Você governou por dezessete anos com justiça, Robert. Não manche sua honra assassinando uma criança inocente a mando do medo.» Robert pragueja e esmurra a mesa, mas recua constrangido diante de sua retidão.',
              destino: 'j3_a1_comitiva_desafio_a_jaime_lannister',
              marcas: ['lealdade_a_robert', 'honra_inflexivel'],
              delta: { honra: 2, compostura: 1 },
            },
            parcial: {
              ponte: 'A discussão é ríspida e atrai os olhares alertas de Cersei. Robert desvia o assunto bufando, mas a semente do desacordo está plantada.',
              destino: 'j3_a1_comitiva_desafio_a_jaime_lannister',
              marcas: ['lealdade_a_robert'],
              delta: { compostura: 1 },
            },
            falha: {
              ponte: 'Robert acusa-o de moleza nortenha e bebe mais vinho, criando um silêncio pesado entre os dois irmãos de armas.',
              destino: 'j3_a1_comitiva_desafio_a_jaime_lannister',
              marcas: ['lealdade_a_robert'],
              delta: { honra: -1 },
            },
          },
          onSuccessNodeId: 'j3_a1_comitiva_desafio_a_jaime_lannister',
          onPartialFailureNodeId: 'j3_a1_comitiva_desafio_a_jaime_lannister',
        },
        {
          id: 'j3_a1_c_confrontar_olhar_cersei',
          tipo: 'simples',
          texto: 'Fixar o olhar na Rainha Cersei e questionar a influência excessiva da Casa Lannister no conselho',
          tom: 'ameaca',
          desfecho: {
            ponte: 'Cersei ergue o queixo com frieza régia: «O Rochedo financia a paz do seu rei, lorde Stark. Talvez os senhores do Norte devessem aprender o valor das moedas de ouro.» O ódio mútuo fica selado sob o teto de seda.',
            destino: 'j3_a1_comitiva_desafio_a_jaime_lannister',
            marcas: ['confronto_com_cersei', 'afrontou_rainha'],
            delta: { compostura: 1, honra: 1 },
          },
          nextNodeId: 'j3_a1_comitiva_desafio_a_jaime_lannister',
        },
      ],
    },

    j3_a1_comitiva_desafio_a_jaime_lannister: {
      id: 'j3_a1_comitiva_desafio_a_jaime_lannister',
      titulo: 'A Armadura Dourada & A Memória do Trono',
      anoHistorico: '298 d.C.',
      localizacao: 'Acampamento da Guarda Real na Estrada',
      regionId: 'terras_fluviais',
      tipo: 'dialogo',
      rota: 'comitiva_real',
      pov: 'Eddard Stark',
      origem: 'original',
      loreContext: {
        fonte: {
          livro: 'A Guerra dos Tronos',
          capitulo: 'Eddard II',
          arquivo_md: 'agot_eddard_2.md',
        },
        notaHistorica: 'Confronto tenso entre Ned Stark e Ser Jaime Lannister sobre o quebra de juramento da Guarda Real e o assassinato de Aerys II no Trono de Ferro.',
      },
      fallbackText: `O crepúsculo banha o acampamento em tons de cobre e cinzas. Enquanto você inspeciona a guarda dos cavalos, a figura imponente de Ser Jaime Lannister bloqueia a trilha. A armadura dourada e esmaltada de branco brilha mesmo sob a poeira da estrada, e a espada embainhada tem o pomo talhado como uma cabeça de leão rugindo.

O Regicida sorri com a insolência habitual que enfurece os homens honrados: «Lorde Stark. Sempre com essa carranca sombria, como se o inverno estivesse pessoalmente sentado sobre os seus ombros. Diga-me: quando encontrou meu pai com o cadáver de Aerys no chão do salão do trono, que justiça esperava que cumpríssemos?»

As feridas antigas da Rebelião nunca cicatrizaram. Você lembra com exatidão o dia em que entrou a cavalo na Fortaleza Vermelha e viu Jaime sentado no Trono de Ferro com a espada ensanguentada sobre os joelhos.`,
      blocos: [
        {
          funcao: 'abertura',
          texto: `No limite do acampamento real, Jaime Lannister interpõe-se no seu caminho com um sorriso provocador e a armadura dourada reluzindo sob o poente.`,
        },
        {
          funcao: 'corpo',
          quando: { flagsTodas: ['honra_inflexivel'] },
          texto: `A sua recusa firme em aprovar assassinatos covardes perante Robert aumenta seu desprezo pela traição dourada de Jaime.`,
        },
        {
          funcao: 'corpo',
          quando: { flagsTodas: ['afrontou_rainha'] },
          texto: `Jaime sabe do confronto ocorrido no pavilhão e mede cada palavra sua como quem desembainha uma lâmina sutil.`,
        },
        {
          funcao: 'fecho',
          texto: `A tensão entre o aço valiriano de Winterfell e o ouro de Rochedo Casterly atrai a atenção dos guardas ao redor.`,
        },
      ],
      interlocutores: [
        {
          id: 'jaime_lannister',
          nome: 'Ser Jaime Lannister',
          papel: 'Irmão Juramentado da Guarda Real',
        },
      ],
      falas: [
        {
          quem: 'jaime_lannister',
          texto: 'Você nos julga com tanta severidade, lorde Eddard. Mas se eu não tivesse aberto a garganta de Aerys, a cidade inteira teria queimado sob o fogo-vivo do Rei Louco.',
        },
      ],
      escolhas: [
        {
          id: 'j3_a1_c_relembrar_juramento_sagrado',
          tipo: 'teste_atributo',
          texto: 'Lembrar a Jaime que um manto branco juramentado não escolhe quando manter a palavra',
          atributo: 'comando',
          dc: 8,
          tom: 'honesto',
          desfechos: {
            sucesso: {
              ponte: 'Você fixa o olhar cinzento nos olhos dourados do cavaleiro: «Você jurou lealdade com a vida, Ser Jaime. Se o rei era um monstro, você deveria ter morrido protegendo seu juramento ou renunciado ao manto.» O sorriso debochado de Jaime se desfaz, substituído por um ódio amargo.',
              destino: 'j3_a1_comitiva_intrigas_do_acampamento',
              marcas: ['afrontou_regicida', 'honra_stark_reafirmada'],
              delta: { honra: 2, compostura: 1 },
            },
            parcial: {
              ponte: 'Jaime dá de ombros com desdém fingido, mas dá um passo atrás para abrir passagem. Os homens de armas da guarda recolhem as armas com alívio.',
              destino: 'j3_a1_comitiva_intrigas_do_acampamento',
              marcas: ['afrontou_regicida'],
              delta: { compostura: 1 },
            },
            falha: {
              ponte: 'A troca de insultos atrai guardas Lannister e gera um impasse tenso que só é quebrado com a chegada de Ser Barristan Selmy.',
              destino: 'j3_a1_comitiva_intrigas_do_acampamento',
              marcas: ['afrontou_regicida'],
              delta: { sangue: -1 },
            },
          },
          onSuccessNodeId: 'j3_a1_comitiva_intrigas_do_acampamento',
          onPartialFailureNodeId: 'j3_a1_comitiva_intrigas_do_acampamento',
        },
        {
          id: 'j3_a1_c_desprezar_provocacao_jaime',
          tipo: 'simples',
          texto: 'Ignorar a insolência e passar direto sem desembainhar uma palavra',
          tom: 'silencio',
          desfecho: {
            ponte: 'Você caminha sem desviar um palmo do seu trajeto, tratando o guerreiro mais celebrado do reino como ar rarefeito. O silêncio fere o ego de Jaime mais fundo do que qualquer lâmina.',
            destino: 'j3_a1_comitiva_intrigas_do_acampamento',
            marcas: ['desprezo_ao_regicida', 'afrontou_regicida'],
            delta: { compostura: 2 },
          },
          nextNodeId: 'j3_a1_comitiva_intrigas_do_acampamento',
        },
      ],
    },

    j3_a1_comitiva_intrigas_do_acampamento: {
      id: 'j3_a1_comitiva_intrigas_do_acampamento',
      titulo: 'Os Treinos da Guarda & O Murmúrio dos Cavaleiros',
      anoHistorico: '298 d.C.',
      localizacao: 'Campos de Treino na Margem Norte do Tridente',
      regionId: 'terras_fluviais',
      tipo: 'narracao',
      rota: 'comitiva_real',
      pov: 'Eddard Stark',
      origem: 'canonica',
      loreContext: {
        fonte: {
          livro: 'A Guerra dos Tronos',
          capitulo: 'Sansa I',
          arquivo_md: 'agot_sansa_1.md',
        },
      },
      fallbackText: `O som de espadas de treino e escudos de madeira ecoa pela pradaria ensolarada. Sansa caminha com o Príncipe Joffrey entre as tendas decoradas de seda, fascinada pelas roupas extravagantes e cortesias perfumadas do jovem herdeiro. Ao longe, Arya corre desgrenhada com seu amigo Mycah, o filho do carniceiro, fingindo duelar com galhos grossos de árvore.

Ser Barristan Selmy, o lendário Senhor Comandante da Guarda Real, desmonta ao seu lado. O veterano retira o elmo de aço imaculado, revelando cabelos brancos e um rosto marcado por incontáveis campanhas: «Lorde Stark. É um alívio ver um homem do Norte assumindo a Mão. O rei tem bebido demais e os jovens cavaleiros disputam a atenção de Cersei como abutres.»

Enquanto vocês conversam, uma movimentação ríspida irrompe perto dos salgueiros que margeiam as águas rápidas do Tridente. Gritos infantis e o uivo estridente de um lobo gigante quebram a harmonia do acampamento.`,
      blocos: [
        {
          funcao: 'abertura',
          texto: `Nos campos de treino do Tridente, as tensões entre cortesãos e soldados nortenhos contrastam com os galanteios de Joffrey e o entusiasmo de Sansa.`,
        },
        {
          funcao: 'corpo',
          quando: { flagsTodas: ['honra_stark_reafirmada'] },
          texto: `Ser Barristan Selmy aproxima-se com discrição, reconhecendo na sua postura austera a mesma dignidade inabalável que manteve o reino unido no passado.`,
        },
        {
          funcao: 'corpo',
          quando: { flagsTodas: ['desprezo_ao_regicida'] },
          texto: `Os cavaleiros mais jovens comentam em sussurros como a Mão do Rei humilhou o orgulho de Jaime Lannister com um simples silêncio desdenhoso.`,
        },
        {
          funcao: 'fecho',
          texto: `Um grito aterrorizado de socorro rompe a calmaria junto à orla dos salgueiros: o príncipe e as filhas de Winterfell envolveram-se em um conflito sangrento.`,
        },
      ],
      escolhas: [
        {
          id: 'j3_a1_c_correr_ao_clamor_tridente',
          tipo: 'simples',
          texto: 'Correr imediatamente em direção aos salgueiros com os homens da guarda de Winterfell',
          tom: 'honesto',
          desfecho: {
            ponte: 'Você dispara a cavalo através do pasto com Jory Cassel e Ser Barristan ao encalço, pronto para conter a crise antes que vidas nobres sejam ceifadas.',
            destino: 'j3_a1_peca_incidente_no_tridente',
            marcas: ['tensoes_da_guarda_real', 'respeito_de_barristan'],
            delta: { compostura: 1, honra: 1 },
          },
          nextNodeId: 'j3_a1_peca_incidente_no_tridente',
        },
        {
          id: 'j3_a1_c_mobilizar_patrulha_preventiva',
          tipo: 'teste_atributo',
          texto: 'Instruir Ser Barristan a cercar o perímetro com guardas reais imparciais',
          atributo: 'comando',
          dc: 8,
          tom: 'diplomatico',
          desfechos: {
            sucesso: {
              ponte: 'Barristan age com precisão militar, posicionando cavaleiros para conter os guardas Lannister armados que já corriam furiosos com espadas desembainhadas.',
              destino: 'j3_a1_peca_incidente_no_tridente',
              marcas: ['tensoes_da_guarda_real', 'controle_da_crise'],
              delta: { compostura: 2 },
            },
            parcial: {
              ponte: 'A movimentação é confusa e homens armados de ambas as Casas correm desenfreados em direção ao rio.',
              destino: 'j3_a1_peca_incidente_no_tridente',
              marcas: ['tensoes_da_guarda_real'],
              delta: { compostura: 1 },
            },
            falha: {
              ponte: 'O alvoroço espalha-se e o medo toma conta do acampamento enquanto os gritos de Joffrey ecoam na água.',
              destino: 'j3_a1_peca_incidente_no_tridente',
              marcas: ['tensoes_da_guarda_real'],
              delta: { sangue: -1 },
            },
          },
          onSuccessNodeId: 'j3_a1_peca_incidente_no_tridente',
          onPartialFailureNodeId: 'j3_a1_peca_incidente_no_tridente',
        },
      ],
    },

    // =========================================================================
    // ETAPA 4: PEÇA DE CENÁRIO CANÔNICA (3 CENAS)
    // =========================================================================

    // 10. O Incidente no Tridente
    j3_a1_peca_incidente_no_tridente: {
      id: 'j3_a1_peca_incidente_no_tridente',
      titulo: 'Sangue nas Águas do Tridente',
      anoHistorico: '298 d.C.',
      localizacao: 'Margem do Rio Tridente',
      regionId: 'terras_fluviais',
      tipo: 'narracao',
      rota: 'comum',
      pov: 'Eddard Stark',
      origem: 'canonica',
      loreContext: {
        fonte: {
          livro: 'A Guerra dos Tronos',
          capitulo: 'Arya I & Sansa I',
          arquivo_md: 'agot_arya_1.md',
        },
      },
      fallbackText: `A cena à margem do Tridente é um pesadelo descontrolado. O Príncipe Joffrey chora ajoelhado na lama, agarrando o braço ensanguentado onde os dentes de Nymeria rasgaram sua carne através do tecido fino da túnica. Ao seu lado, a espada afiada Dente de Leão jaz submersa nas águas correntes do rio, arremessada por Arya em um acesso de fúria e defesa.

Mycah, o garoto filho do carniceiro, foge desesperado pela floresta com cortes no rosto provocados pela lâmina do príncipe. Arya está de pé com um galho quebrado na mão, pálida de terror e ódio, enquanto Nymeria rosna baixo ao seu lado com o pelo eriçado.

Homens da guarda Lannister chegam com espadas nas mãos gritando por regicídio. Antes que o aço caia sobre sua filha, você intervém com autoridade absoluta: «Afastem-se! Quem tocar em um fio de cabelo da minha filha responderá à Mão do Rei!» Você ordena imediatamente que Jory leve Nymeria para o fundo das matas para que a fera escape da fúria implacável que certamente virá.`,
      blocos: [
        {
          funcao: 'abertura',
          texto: `Nas margens barrentas do Tridente, Nymeria mordeu o Príncipe Joffrey para proteger Arya, desencadeando um escândalo sangrento entre as Casas reais.`,
        },
        {
          funcao: 'corpo',
          quando: { flagsTodas: ['prudencia_no_gargalo'] },
          texto: `Os batedores que você posicionou nas redondezas fecham o acesso à margem com escudos firmes, impedindo que os homens do Cão de Caça executem Arya no calor do momento.`,
        },
        {
          funcao: 'corpo',
          quando: { flagsTodas: ['alianca_cranogumanos'] },
          texto: `A segurança das rotas dos pântanos garante que os cavaleiros sulistas não consigam emboscar os mensageiros que você envia para proteger a retaguarda.`,
        },
        {
          funcao: 'corpo',
          quando: { flagsTodas: ['pressa_de_pai'] },
          texto: `Sua chegada rápida ao local impediu que os soldados de Cersei agredissem Arya antes que qualquer testemunha pudesse depor.`,
        },
        {
          funcao: 'corpo',
          quando: { flagsTodas: ['tensoes_da_guarda_real'] },
          texto: `A presença de Ser Barristan Selmy garante que a ordem legal prevaleça sobre a matança desordenada exigida pelos cavaleiros de Cersei.`,
        },
        {
          funcao: 'corpo',
          quando: { flagsTodas: ['respeito_de_barristan'] },
          texto: `A confiança mútua entre você e o Senhor Comandante da Guarda Real evita um derramamento de sangue imediato entre os mantos brancos e a escolta do Norte.`,
        },
        {
          funcao: 'corpo',
          quando: { flagsTodas: ['controle_da_crise'] },
          texto: `O cordão de isolamento montado pelas patrulhas impede que a comitiva de Cersei altere as provas no barranco do rio.`,
        },
        {
          funcao: 'fecho',
          texto: `Nymeria foge uivando para a imensidão da floresta. O caso é levado imediatamente ao tribunal do Rei Robert no castelo mais próximo.`,
        },
      ],
      escolhas: [
        {
          id: 'j3_a1_c_garantir_fuga_nymeria',
          tipo: 'teste_atributo',
          texto: 'Comandar Jory Cassel para forçar a fuga definitiva de Nymeria e proteger Arya de interrogatórios sumários',
          atributo: 'comando',
          dc: 8,
          tom: 'diplomatico',
          circunstancias: [
            {
              tipo: 'vantagem',
              motivo: 'A autoridade legítima de lorde Eddard sobre a comitiva nortenha impõe respeito aos guardas.',
            },
          ],
          desfechos: {
            sucesso: {
              ponte: 'Jory atira pedras na loba e faz com que a fera fuja para as colinas distantes. Arya desaba em prantos no seu peito enquanto você a conduz em segurança para a carruagem.',
              destino: 'j3_a1_peca_o_julgamento_em_darry',
              marcas: ['nymeria_libertada', 'protecao_a_arya'],
              delta: { honra: 2, compostura: 1 },
            },
            parcial: {
              ponte: 'A loba escapa por pouco dos arqueiros de Cersei. Arya é escoltada sob custódia pesada até o grande salão de Castelo Darry.',
              destino: 'j3_a1_peca_o_julgamento_em_darry',
              marcas: ['nymeria_libertada'],
              delta: { compostura: 1 },
            },
            falha: {
              ponte: 'O alvoroço é tremendo e a confusão na margem deixa feridas profundas no orgulho da princesa Sansa.',
              destino: 'j3_a1_peca_o_julgamento_em_darry',
              marcas: ['nymeria_libertada'],
              delta: { sangue: -1 },
            },
          },
          onSuccessNodeId: 'j3_a1_peca_o_julgamento_em_darry',
          onPartialFailureNodeId: 'j3_a1_peca_o_julgamento_em_darry',
        },
        {
          id: 'j3_a1_c_exigir_julgamento_imparcial',
          tipo: 'simples',
          texto: 'Exigir que todas as partes sejam ouvidas na presença exclusiva do Rei Robert em tribunal',
          tom: 'honesto',
          desfecho: {
            ponte: 'Você assume a frente do cortejo e declara que a verdade será dita perante o rei, desafiando qualquer um que tente fazer justiça com as próprias mãos.',
            destino: 'j3_a1_peca_o_julgamento_em_darry',
            marcas: ['honra_em_darry', 'protecao_a_arya'],
            delta: { honra: 2 },
          },
          nextNodeId: 'j3_a1_peca_o_julgamento_em_darry',
        },
      ],
    },

    // 11. O Julgamento em Castelo Darry
    j3_a1_peca_o_julgamento_em_darry: {
      id: 'j3_a1_peca_o_julgamento_em_darry',
      titulo: 'O Tribunal do Medo em Castelo Darry',
      anoHistorico: '298 d.C.',
      localizacao: 'Grande Salão de Castelo Darry',
      regionId: 'terras_fluviais',
      tipo: 'dialogo',
      rota: 'comum',
      pov: 'Eddard Stark',
      origem: 'canonica',
      loreContext: {
        fonte: {
          livro: 'A Guerra dos Tronos',
          capitulo: 'Eddard III',
          arquivo_md: 'agot_eddard_3.md',
        },
      },
      fallbackText: `O Grande Salão de Castelo Darry está apinhado de cavaleiros, lordes das Terras Fluviais e cortesãos silenciosos. Robert Baratheon senta-se no trono de carvalho com a cabeça entre as mãos, visivelmente desgostoso por ter que julgar uma briga infantil. Ao seu lado, a Rainha Cersei exige aos berros a mutilação de Arya e a morte de todas as feras de Winterfell.

Joffrey mente com frieza teatral, acusando o garoto Mycah e Arya de emboscá-lo sem provocação. Arya grita, chamando o príncipe de mentiroso covarde: «Ele estava batendo em Mycah com ferro de verdade! Nymeria só me defendeu!»

Robert vira-se para Sansa, a única testemunha além dos envolvidos: «Diga a verdade, menina. O que você viu?»

Sansa olha para Joffrey com adoração aterrorizada e depois para a irmã. As lágrimas escorrem por seu rosto enquanto sua voz treme: «Eu não me lembro... Foi tudo rápido demais... Não vi nada...» O silêncio que se segue é mais condenatório do que qualquer confissão.`,
      blocos: [
        {
          funcao: 'abertura',
          texto: `No Salão de Castelo Darry, Cersei Lannister manipula o medo do rei para exigir a destruição da Casa Stark perante a corte reunida.`,
        },
        {
          funcao: 'corpo',
          quando: { flagsTodas: ['lealdade_a_robert'] },
          texto: `A proximidade que você manteve com Robert durante a viagem pesa na balança: o rei sabe que Ned Stark não mente, mas falta-lhe coragem para enfrentar a esposa.`,
        },
        {
          funcao: 'corpo',
          quando: { flagsTodas: ['confronto_com_cersei'] },
          texto: `Cersei aproveita o rancor acumulado no banquete anterior para inflamar os nobres vassalos contra a severidade da justiça nortenha.`,
        },
        {
          funcao: 'corpo',
          quando: { flagsTodas: ['protecao_a_arya'] },
          texto: `Sua defesa incondicional de Arya no barranco inspira a menina a manter a cabeça erguida, desafiando a insolência deslavada de Joffrey.`,
        },
        {
          funcao: 'fecho',
          texto: `Como a loba de Arya não foi encontrada pelos cavaleiros, Cersei exige uma sentença monstruosa: «Há outra loba gigante com a comitiva. Que ela pague a dívida.»`,
        },
      ],
      interlocutores: [
        {
          id: 'cersei_lannister',
          nome: 'Rainha Cersei Lannister',
          papel: 'Rainha Consorte',
        },
        {
          id: 'robert_baratheon',
          nome: 'Rei Robert Baratheon',
          papel: 'Rei dos Sete Reinos',
        },
      ],
      falas: [
        {
          quem: 'cersei_lannister',
          texto: 'Um animal selvagem atacou o herdeiro legítimo do trono! Se não temos a besta que mordeu, levaremos a que sobrou. Uma loba gigante é uma loba gigante.',
        },
        {
          quem: 'robert_baratheon',
          texto: 'Por todos os deuses, mulher, cale a boca! Ned, dome suas filhas. E você, Cersei, cuide do seu príncipe chorão. Não quero mais ouvir sobre isso.',
        },
      ],
      escolhas: [
        {
          id: 'j3_a1_c_confrontar_cobardia_robert',
          tipo: 'teste_atributo',
          texto: 'Interpelar o Rei Robert diante de todos sobre a injustiça de matar um animal inocente por vingança vil',
          atributo: 'comando',
          dc: 9,
          tom: 'honesto',
          desfechos: {
            sucesso: {
              ponte: 'Sua voz troveja pelo salão: «Lady nunca atacou ninguém, Robert! Isso não é justiça, é vingança mesquinha!» Robert empalidece e recusa olhar em seus olhos, murmurando com covardia: «Que seja feito como ela pede, Ned. Apenas acabe com essa loucura.»',
              destino: 'j3_a1_peca_o_sacrificio_de_lady',
              marcas: ['honra_em_darry', 'cobardia_de_robert_presenciada'],
              delta: { honra: 2, compostura: 1 },
            },
            parcial: {
              ponte: 'O rei levanta-se furioso e encerra o tribunal sem paciência, ordenando que os homens cumpram o desejo da rainha para que ele possa ter paz.',
              destino: 'j3_a1_peca_o_sacrificio_de_lady',
              marcas: ['cobardia_de_robert_presenciada'],
              delta: { compostura: 1 },
            },
            falha: {
              ponte: 'Cersei triunfa perante a corte enquanto Sansa desaba em prantos inconsoláveis nos braços das aias.',
              destino: 'j3_a1_peca_o_sacrificio_de_lady',
              marcas: ['cobardia_de_robert_presenciada'],
              delta: { sangue: -1 },
            },
          },
          onSuccessNodeId: 'j3_a1_peca_o_sacrificio_de_lady',
          onPartialFailureNodeId: 'j3_a1_peca_o_sacrificio_de_lady',
        },
        {
          id: 'j3_a1_c_reivindicar_direito_execucao',
          tipo: 'simples',
          texto: 'Rejeitar que Ser Ilyn Payne toque na loba e exigir o direito do Norte de cumprir a sentença',
          tom: 'honesto',
          desfecho: {
            ponte: 'Você encara Ser Ilyn Payne com frieza assassina: «A loba é do Norte e pertence à minha filha. Nenhum carniceiro do sul tocará nela.» Você vira as costas para a corte e caminha até o pátio.',
            destino: 'j3_a1_peca_o_sacrificio_de_lady',
            marcas: ['honra_em_darry', 'impediu_ilyn_payne'],
            delta: { honra: 2, compostura: 1 },
          },
          nextNodeId: 'j3_a1_peca_o_sacrificio_de_lady',
        },
      ],
    },

    // 12. O Sacrifício de Lady
    j3_a1_peca_o_sacrificio_de_lady: {
      id: 'j3_a1_peca_o_sacrificio_de_lady',
      titulo: 'A Sentença do Gelo no Pátio de Darry',
      anoHistorico: '298 d.C.',
      localizacao: 'Pátio dos Estábulos em Castelo Darry',
      regionId: 'terras_fluviais',
      tipo: 'narracao',
      rota: 'comum',
      pov: 'Eddard Stark',
      origem: 'canonica',
      loreContext: {
        fonte: {
          livro: 'A Guerra dos Tronos',
          capitulo: 'Eddard III',
          arquivo_md: 'agot_eddard_3.md',
        },
      },
      fallbackText: `A noite cai gélida sobre o pátio de pedra de Castelo Darry. Amarrada a uma viga de carvalho junto aos estábulos, a loba Lady ergue a cabeça com graça nobre, os grandes olhos dourados cheios de confiança inocente ao ver você se aproximar. Ela lambe seus dedos calosos sem rosnar, farejando o cheiro familiar de Winterfell.

Ao longe, Ser Ilyn Payne observa com seu sorriso mudo e repulsivo, a espada de carrasco embainhada nas costas. Cersei queria a pele do animal para forrar um casaco de viagem.

Você desembainha a adaga de aço valiriano que traz na cintura. O peso da primeira lição ensinada a Bran queima em sua mente: quem pronuncia a sentença deve brandir a espada. Acariciando o pescoço de pelagem cinzenta macia, você sussurra um último perdão do Norte e enfia a lâmina certeira no coração da besta. O corpo desaba sobre as pedras sem um único ganido.

«Jory», fala você com a voz sufocada pela amargura, «reúna quatro homens leais. Levem o corpo de Lady de volta para Winterfell. Enterrem-na nos bosques da nossa casa. A rainha não colocará as mãos imundas nesta pele.»`,
      blocos: [
        {
          funcao: 'abertura',
          texto: `No pátio escuro de Castelo Darry, você cumpre com o próprio punho o sacrifício injusto de Lady para poupar a criatura da lâmina covarde de Ilyn Payne.`,
        },
        {
          funcao: 'corpo',
          quando: { flagsTodas: ['justica_de_gelo'] },
          texto: `A mesma lâmina moral que decepou o desertor nas colinas de Winterfell agora cobra um tributo insuportável da inocência da sua própria Casa.`,
        },
        {
          funcao: 'corpo',
          quando: { flagsTodas: ['cobardia_de_robert_presenciada'] },
          texto: `A capitulação vergonhosa de Robert diante dos caprichos de Cersei destrói a última ilusão de que o rei ainda governa seu próprio reino com dignidade.`,
        },
        {
          funcao: 'corpo',
          quando: { flagsTodas: ['impediu_ilyn_payne'] },
          texto: `Ao impedir que o carrasco real tocasse no animal, você preservou a honra sagrada dos lobos gigantes, mesmo diante da derrota política mais amarga da marcha.`,
        },
        {
          funcao: 'fecho',
          texto: `Enquanto os ossos de Lady viajam para o Norte escoltados por homens leais, o Cão de Caça retorna da floresta trazendo nos ombros o pequeno corpo ensanguentado do menino Mycah. O mundo dos homens perdeu a honra.`,
        },
      ],
      escolhas: [
        {
          id: 'j3_a1_c_enviar_ossos_para_o_norte',
          tipo: 'simples',
          texto: 'Garantir que a escolta de Jory leve os ossos de Lady para o descanso sagrado em Winterfell',
          tom: 'honesto',
          desfecho: {
            ponte: 'Jory parte na escuridão com os restos da fera envoltos em veludo cinzento. Você observa a comitiva sumir na noite, jurando que nenhum outro sangue inocente do Norte será entregue aos leões sem cobrança.',
            destino: 'j3_a1_acerto_de_contas_porto_real',
            marcas: ['executor_de_lady', 'dor_do_norte_gravada'],
            delta: { honra: 2, compostura: 1 },
          },
          nextNodeId: 'j3_a1_acerto_de_contas_porto_real',
        },
        {
          id: 'j3_a1_c_confrontar_clegane_e_mycah',
          tipo: 'teste_atributo',
          texto: 'Confrontar Sandor Clegane no pátio pelo assassinato covarde do filho do carniceiro',
          atributo: 'comando',
          dc: 8,
          tom: 'violencia',
          desfechos: {
            sucesso: {
              ponte: 'Você encara o Cão de Caça com fúria cortante: «Ele correu. Mas não correu rápido o bastante», cospe Clegane. A brutalidade do homem abre seus olhos para a podridão sem limites que comanda as armas de Porto Real.',
              destino: 'j3_a1_acerto_de_contas_porto_real',
              marcas: ['executor_de_lady', 'confrontou_cao_de_caca', 'dor_do_norte_gravada'],
              delta: { honra: 2 },
            },
            parcial: {
              ponte: 'Clegane ri com escárnio sob o elmo de cachorro e afasta-se com seu cavalo de batalha. A podridão do sul escancara suas mandíbulas.',
              destino: 'j3_a1_acerto_de_contas_porto_real',
              marcas: ['executor_de_lady', 'dor_do_norte_gravada'],
              delta: { compostura: 1 },
            },
            falha: {
              ponte: 'O peso da injustiça queima em seu estômago enquanto a marcha para a capital recomeça ao amanhecer.',
              destino: 'j3_a1_acerto_de_contas_porto_real',
              marcas: ['executor_de_lady', 'dor_do_norte_gravada'],
              delta: { sangue: -1 },
            },
          },
          onSuccessNodeId: 'j3_a1_acerto_de_contas_porto_real',
          onPartialFailureNodeId: 'j3_a1_acerto_de_contas_porto_real',
        },
      ],
    },

    // =========================================================================
    // ETAPA 5: ACERTO DE CONTAS (1 CENA)
    // =========================================================================

    // 13. Acerto de Contas em Porto Real
    j3_a1_acerto_de_contas_porto_real: {
      id: 'j3_a1_acerto_de_contas_porto_real',
      titulo: 'A Torre da Mão & O Ninho de Serpentes',
      anoHistorico: '298 d.C.',
      localizacao: 'Torre da Mão na Fortaleza Vermelha',
      regionId: 'porto_real',
      tipo: 'acerto_de_contas',
      rota: 'comum',
      pov: 'Eddard Stark',
      origem: 'canonica',
      isEnding: true,
      loreContext: {
        fonte: {
          livro: 'A Guerra dos Tronos',
          capitulo: 'Eddard IV',
          arquivo_md: 'agot_eddard_4.md',
        },
      },
      fallbackText: `O calor sufocante e o cheiro nauseante de alcatrão, peixe podre e esgoto acolhem sua comitiva quando as muralhas vermelhas da capital emergem no horizonte. Porto Real é um monstro de tijolos e ferro que fervilha com meio milhão de almas.

Você sobe as escadarias em espiral da Torre da Mão com a capa negra pesada de poeira e o coração amargurado pelos sacrifícios deixados na Estrada do Rei. Os aposentos são vastos e silenciosos, mas cada cortina e fenda na pedra parecem abrigar ouvidos mercenários.

Lorde Petyr Baelish, o eunuco Varys e o Meistre Pycelle já aguardam na câmara do conselho com pergaminhos e sorrisos servis. A jornada até o sul terminou; a verdadeira guerra pelos Sete Reinos começa agora. O mundo registrou cada palavra e cada gota de sangue derramada no caminho.`,
      blocos: [
        {
          funcao: 'abertura',
          texto: `Instalado na imponente Torre da Mão da Fortaleza Vermelha, você contempla o Mar do Crepúsculo sob o sol escaldante do sul, ciente de que as intrigas da capital são mais letais do que as nevascas do Norte.`,
        },
        {
          funcao: 'corpo',
          quando: { flagsTodas: ['justica_de_gelo'] },
          texto: `A memória da execução solene nas colinas de Winterfell mantém sua consciência limpa: a retidão do Primeiro Homem não foi abandonada no caminho.`,
        },
        {
          funcao: 'corpo',
          quando: { flagsTodas: ['ninhada_de_lobos_acolhida'] },
          texto: `Os filhotes de lobo gigante permanecem como guardiões espirituais dos seus filhos, embora a perda precoce de Lady tenha deixado uma cicatriz indelével na inocência de Sansa.`,
        },
        {
          funcao: 'corpo',
          quando: { flagsTodas: ['investigou_ameaca_norte'] },
          texto: `As palavras do desertor sobre o frio além da Muralha continuam a assombrar seus pensamentos, mesmo sob o sol abrasador da capital.`,
        },
        {
          funcao: 'corpo',
          quando: { flagsTodas: ['suspeita_lannister'] },
          texto: `A desconfiança contra a Casa Lannister já não é uma suposição distante, mas uma certeza confirmada pelo sangue derramado no Tridente.`,
        },
        {
          funcao: 'corpo',
          quando: { flagsTodas: ['juramento_nas_criptas'] },
          texto: `A promessa feita diante do túmulo de Lyanna ecoa nos seus pensamentos: proteger Robert de suas próprias fraquezas e dos leões que o cercam.`,
        },
        {
          funcao: 'corpo',
          quando: { flagsTodas: ['noivado_joffrey_proposto'] },
          texto: `O noivado entre Sansa e Joffrey coloca a honra de sua família no coração da corte real, exigindo máxima vigilância a cada passo.`,
        },
        {
          funcao: 'corpo',
          quando: { flagsTodas: ['luto_por_lyanna'] },
          texto: `A lembrança da dor antiga da Rebelião fortalece sua determinação de não permitir que o reino desmorone novamente em chamas.`,
        },
        {
          funcao: 'corpo',
          quando: { flagsTodas: ['juramento_mao_do_rei'] },
          texto: `O broche de ferro e prata da Mão do Rei pesa no seu peito como o símbolo irrevogável do dever que assumiu perante a coroa.`,
        },
        {
          funcao: 'corpo',
          quando: { flagsTodas: ['estrategia_investigativa'] },
          texto: `A escolha de investigar discretamente as pistas do crime permitiu que a Casa Stark mantivesse suas vantagens longe dos olhos de Cersei.`,
        },
        {
          funcao: 'corpo',
          quando: { flagsTodas: ['pacto_com_catelyn'] },
          texto: `A aliança inquebrantável com Catelyn garante que a verdade sobre o atentado contra Bran chegue com segurança aos seus ouvidos.`,
        },
        {
          funcao: 'corpo',
          quando: { flagsTodas: ['postura_honra_publica'] },
          texto: `A presença imponente que manteve ao lado de Robert demonstrou a todos os vassalos que a Casa Stark não teme o poder de Rochedo Casterly.`,
        },
        {
          funcao: 'corpo',
          quando: { flagsTodas: ['confronto_com_cersei'] },
          texto: `O ódio declarado da Rainha Cersei torna cada corredor da Fortaleza Vermelha um campo de batalha invisível.`,
        },
        {
          funcao: 'corpo',
          quando: { flagsTodas: ['investigacao_adaga_valiriana'] },
          texto: `A pista da adaga de aço valiriano dá uma direção precisa à sua investigação secreta sobre a morte de Jon Arryn.`,
        },
        {
          funcao: 'corpo',
          quando: { flagsTodas: ['alerta_mindinho_dado'] },
          texto: `O aviso prudente dado a Catelyn sobre as intenções de Petyr Baelish protege sua esposa das armadilhas da moeda na capital.`,
        },
        {
          funcao: 'corpo',
          quando: { flagsTodas: ['winterfell_guarnecido'] },
          texto: `A segurança de saber que Robb mantém o Norte fortificado permite que você concentre todas as forças no Pequeno Conselho.`,
        },
        {
          funcao: 'corpo',
          quando: { flagsTodas: ['alerta_de_tyrion'] },
          texto: `As palavras irônicas de Tyrion na estalagem servem como um lembrete providencial: os homens honrados precisam aprender a enxergar as teias das serpentes.`,
        },
        {
          funcao: 'corpo',
          quando: { flagsTodas: ['mente_astuta_desafiada'] },
          texto: `A revelação sobre as dívidas que o rei contraiu com Tywin Lannister escancara a fraqueza financeira do Trono de Ferro.`,
        },
        {
          funcao: 'corpo',
          quando: { flagsTodas: ['honra_da_muralha_defendida'] },
          texto: `A dignidade com que defendeu o juramento dos patrulheiros inspira os poucos homens leais que ainda guardam a capital.`,
        },
        {
          funcao: 'corpo',
          quando: { flagsTodas: ['prudencia_no_gargalo'] },
          texto: `A cautela mantida na travessia dos pântanos garantiu que suas rotas de fuga e abastecimento permaneçam seguras.`,
        },
        {
          funcao: 'corpo',
          quando: { flagsTodas: ['alianca_cranogumanos'] },
          texto: `Os guerreiros de Howland Reed vigiam o Gargalo, impedindo que os leões cerquem o Norte por terra.`,
        },
        {
          funcao: 'corpo',
          quando: { flagsTodas: ['pressa_de_pai'] },
          texto: `A rapidez da sua marcha salvou Arya das garras imediatas da guarda real nas margens do Tridente.`,
        },
        {
          funcao: 'corpo',
          quando: { flagsTodas: ['lealdade_a_robert'] },
          texto: `A lealdade demonstrada no pavilhão de viagem provou que você é a única voz de verdade capaz de desafiar os desmandos de Robert.`,
        },
        {
          funcao: 'corpo',
          quando: { flagsTodas: ['honra_inflexivel'] },
          texto: `A sua recusa categórica em apoiar assassinos de crianças reafirmou a honra incorruptível do Primeiro Homem.`,
        },
        {
          funcao: 'corpo',
          quando: { flagsTodas: ['afrontou_rainha'] },
          texto: `O desafio direto lançado à arrogância de Cersei Lannister selou uma guerra surda entre o Norte e o Ocidente.`,
        },
        {
          funcao: 'corpo',
          quando: { flagsTodas: ['afrontou_regicida'] },
          texto: `O desprezo público com que tratou Jaime Lannister na estrada reafirmou que o Norte jamais se curvará aos assassinos de reis.`,
        },
        {
          funcao: 'corpo',
          quando: { flagsTodas: ['honra_stark_reafirmada'] },
          texto: `Sua lembrança dos votos dos mantos brancos calou a insolência do Regicida perante a guarda imperial.`,
        },
        {
          funcao: 'corpo',
          quando: { flagsTodas: ['desprezo_ao_regicida'] },
          texto: `A altivez silenciosa com que ignorou as bravatas de Jaime provou a superioridade moral da Casa Stark.`,
        },
        {
          funcao: 'corpo',
          quando: { flagsTodas: ['tensoes_da_guarda_real'] },
          texto: `O respeito conquistado perante Ser Barristan Selmy garante um aliado de honra inquestionável entre os membros do conselho.`,
        },
        {
          funcao: 'corpo',
          quando: { flagsTodas: ['respeito_de_barristan'] },
          texto: `A admiração do Senhor Comandante da Guarda Real será um escudo vital diante das conspirações da corte.`,
        },
        {
          funcao: 'corpo',
          quando: { flagsTodas: ['controle_da_crise'] },
          texto: `A liderança com que isolou o tumulto no Tridente evitou uma tragédia ainda maior entre os soldados das duas Casas.`,
        },
        {
          funcao: 'corpo',
          quando: { flagsTodas: ['nymeria_libertada'] },
          texto: `A loba de Arya vaga livre pelas florestas do Tridente, um símbolo indomável da resistência do Norte contra a tirania da corte.`,
        },
        {
          funcao: 'corpo',
          quando: { flagsTodas: ['protecao_a_arya'] },
          texto: `O amparo inabalável dado à sua filha mais nova manteve a coragem da menina intocada pelo medo de Joffrey.`,
        },
        {
          funcao: 'corpo',
          quando: { flagsTodas: ['honra_em_darry'] },
          texto: `Sua firmeza inquebrantável no tribunal de Castelo Darry desmascarou a covardia moral que corrói o coração dos Sete Reinos.`,
        },
        {
          funcao: 'corpo',
          quando: { flagsTodas: ['cobardia_de_robert_presenciada'] },
          texto: `A capitulação vergonhosa do rei ante Cersei revelou que o amigo de infância já não possui a têmpera para governar o reino.`,
        },
        {
          funcao: 'corpo',
          quando: { flagsTodas: ['impediu_ilyn_payne'] },
          texto: `A recusa em permitir que o carrasco tocasse em Lady preservou a dignidade sagrada dos animais de Winterfell.`,
        },
        {
          funcao: 'corpo',
          quando: { flagsTodas: ['executor_de_lady'] },
          texto: `O sangue de Lady em suas mãos é uma dívida que nunca será esquecida. Os ossos da loba repousam na terra de Winterfell como testemunho da perfídia dos Lannister.`,
        },
        {
          funcao: 'corpo',
          quando: { flagsTodas: ['dor_do_norte_gravada'] },
          texto: `A tristeza que pesa nos olhos de Sansa é um lembrete diário de que o sul cobra um tributo impiedoso de quem viaja com o coração limpo.`,
        },
        {
          funcao: 'corpo',
          quando: { flagsTodas: ['confrontou_cao_de_caca'] },
          texto: `O confronto com Sandor Clegane marcou a ferro que você não tolera a violência covarde dos mercenários da rainha.`,
        },
        {
          funcao: 'fecho',
          texto: `A Mão do Rei assume o seu gabinete. Os sinos do Grande Septo dobram na baía enquanto as intrigas do conselho convocam seu primeiro teste de ferro e sangue.`,
        },
      ],
      escolhas: [],
    },
  },
};
