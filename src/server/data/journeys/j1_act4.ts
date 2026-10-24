import 'server-only';
import { GrafoJornada, NodeJornada } from '@/server/engine/storyLinter';

export const grafoAto4: GrafoJornada = {
  id: 'jornada_1_conquista_ato4',
  titulo: 'Ato 4: O Sangue do Dragão: As Ilhas de Ferro e o Sol Insubmisso de Dorne',
  startNodeId: 'j1_a4_expedicao_ilhas_ferro',
  nodes: {
    // ==========================================
    // CENA 1: A EXPEDIÇÃO ÀS ILHAS DE FERRO (2 d.C.)
    // ==========================================
    j1_a4_expedicao_ilhas_ferro: {
      id: 'j1_a4_expedicao_ilhas_ferro',
      titulo: 'As Lulas de Ferro & A Chegada de Balerion em Grande Wyk',
      anoHistorico: '2 d.C.',
      localizacao: 'Grande Wyk & Velha Wyk',
      regionId: 'tridente',
      fallbackText: `Com a morte de Harren, o Negro, em Harrenhal, as Ilhas de Ferro mergulharam em um banho de sangue fratricida. Em Velha Wyk, sob os ossos esbranquiçados de Nagga, o Dragão Marinho, os sacerdotes coroaram com madeira à deriva o fanático Lodos, que afirmava ser o filho vivo do Deus Afogado.

Em 2 d.C., o Rei Aegon decidiu pôr fim à anarquia. Ele desceu sobre as ilhas no dorso de Balerion, escoltado pelas frotas de guerra da Árvore, de Jardim de Cima, de Lannisporto e por dracares enviados por Torrhen Stark da Ilha dos Ursos.

A visão do Terror Negro rasgando os céus salgados quebrou qualquer resistência. Lodos invocou as lulas-gigantes das profundezas para afundar os navios de Aegon. Como os monstros marinhos não responderam ao seu chamado, Lodos encheu as vestes com pedras pesadas e entrou no mar para "pedir conselhos ao pai", seguido por milhares de crentes afogados. Diante dos capitães e nobres de ferro reunidos, restava a Aegon decidir como governar as ilhas.`,
      internalVoices: [
        {
          atributo: 'comando',
          resultadoPassivo: 'SUCESSO',
          dcPassiva: 8,
          fala: 'Eles estão divididos e famintos após um ano de guerra civil. Imponha a ordem imperial ou deixe que escolham seu líder.',
        },
        {
          atributo: 'astucia',
          resultadoPassivo: 'SUCESSO',
          dcPassiva: 9,
          fala: 'Um governante continental seria assassinado em um mês. Deixe que eles mesmos elejam seu senhor.',
        },
      ],
      loreContext: {
        fonte: {
          arquivo_md: 'fogo-e-sangue_02_reinado-do-dragao-guerras.md',
          livro: 'Fogo & Sangue - Volume 1',
          capitulo: 'Reinado do Dragão: Guerras',
        },
        notaHistorica: 'Aegon desce em 2 d.C. sobre as Ilhas de Ferro e pacifica os rebeldes.',
      },
      escolhas: [
        {
          id: 'esc_permitir_eleicao_greyjoy_canonico',
          texto: 'Permitir que os homens de ferro elejam seu próprio senhor supremo segundo os costumes antigos (Vickon Greyjoy de Pyke).',
          tipo: 'simples',
          nextNodeId: 'j1_a4_eleicao_pyke_greyjoy',
        },
        {
          id: 'esc_impor_governador_continental_comando',
          texto: 'Subordinar as Ilhas de Ferro como feudo vassalo direto de Correrrio ou Rochedo Casterly.',
          tipo: 'teste_atributo',
          atributo: 'comando',
          dc: 11,
          onSuccessNodeId: 'j1_a4_eleicao_pyke_greyjoy',
          onPartialFailureNodeId: 'j1_a4_eleicao_pyke_greyjoy',
        },

        {
          id: 'esc_ilhas_astucia_dividir',
          texto: 'Alimentar as disputas entre os capitães de ferro para enfraquecer qualquer resistência unificada.',
          tipo: 'simples',
          aprovacaoCompanheiros: { visenya: 20, orys: 10 },
          delta: { flagsAdicionadas: ['disputa_ilhas_ferro_explorada'] },
          nextNodeId: 'j1_a4_eleicao_pyke_greyjoy',
        },
        {
          id: 'esc_ilhas_demonstracao_balerion',
          texto: 'Fazer Balerion sobrevoar o Trono de Pedra do Mar até que os sacerdotes do Deus Afogado dobrem os joelhos.',
          tipo: 'simples',
          aprovacaoCompanheiros: { visenya: 20, orys: 15, rhaenys: 10 },
          delta: { compostura: 1 },
          nextNodeId: 'j1_a4_eleicao_pyke_greyjoy',
        }
      ],
    },

    // ==========================================
    // CENA 2: A ELEIÇÃO DE VICKON GREYJOY
    // ==========================================
    j1_a4_eleicao_pyke_greyjoy: {
      id: 'j1_a4_eleicao_pyke_greyjoy',
      titulo: 'O Senhor Ceifeiro de Pyke & A Paz Salgada',
      anoHistorico: '2 d.C.',
      localizacao: 'Pyke',
      regionId: 'tridente',
      fallbackText: `Reunidos nos rochedos salgados de Pyke, os capitães de ferro escolheram Vickon Greyjoy, o respeitado Senhor Ceifeiro de Pyke, como seu novo suserano. Vickon dobrou os joelhos diante de Aegon I, jurando lealdade irrestrita à Coroa Real e renunciando para sempre a todas as terras conquistadas no continente.

Em troca, Aegon cedeu o domínio pacificado de Harrenhal a Ser Quenton Qoherys com a mão de uma filha de Lorde Tully, separando definitivamente o destino das Terras dos Rios do destino das Ilhas de Ferro.

Com o Norte ajoelhado, o Oeste domado, o Vale pacificado e as Ilhas de Ferro em ordem, todo o continente ao sul da Muralha curvava-se a Aegon Targaryen. Todo o continente, exceto um único reino meridional: o principado de Dorne.`,
      internalVoices: [
        {
          atributo: 'cortesia',
          resultadoPassivo: 'SUCESSO',
          dcPassiva: 7,
          fala: 'A paz reina de Ponta Tempestade a Pyke. Mas nos desertos do sul, o sol vermelho ainda se recusa a arder para o dragão.',
        },
      ],
      loreContext: {
        idVerbete: 'greyjoy',
        fonte: {
          arquivo_md: 'fogo-e-sangue_02_reinado-do-dragao-guerras.md',
          livro: 'Fogo & Sangue - Volume 1',
          capitulo: 'Reinado do Dragão: Guerras',
        },
        notaHistorica: 'Vickon Greyjoy é eleito Senhor das Ilhas de Ferro e jura vassalagem a Aegon.',
      },
      escolhas: [
        {
          id: 'esc_tentar_embaixada_dorne',
          texto: 'Enviar uma delegação de nobres, meistres e septões para negociar termos de união pacífica com Lançassolar.',
          tipo: 'simples',
          nextNodeId: 'j1_a4_primeira_embaixada_dorne',
        },
        {
          id: 'esc_preparar_invasao_militar_dorne',
          texto: 'Reunir os exércitos reais e convocar Orys Baratheon e Rhaenys para marchar pelo Passo do Príncipe.',
          tipo: 'simples',
          nextNodeId: 'j1_a4_invasao_passo_principe',
        },

        {
          id: 'esc_pyke_greyjoy_juramento',
          texto: 'Exigir que Vickon Greyjoy envie o filho mais velho como pajem na corte de Porto Real para assegurar a paz.',
          tipo: 'simples',
          aprovacaoCompanheiros: { visenya: 20, orys: 15 },
          delta: { flagsAdicionadas: ['refem_greyjoy_porto_real'], compostura: 1 },
          nextNodeId: 'j1_a4_primeira_embaixada_dorne',
        },
        {
          id: 'esc_pyke_greyjoy_autonomia',
          texto: 'Conceder aos homens de ferro a liberdade de manter sua Fé nas Ilhas, desde que cessem os saques na costa de Westeros.',
          tipo: 'simples',
          aprovacaoCompanheiros: { rhaenys: 20, visenya: -10 },
          delta: { compostura: 2 },
          nextNodeId: 'j1_a4_primeira_embaixada_dorne',
        }
      ],
    },

    // ==========================================
    // CENA 3: A PRIMEIRA EMBAIXADA A DORNE
    // ==========================================
    j1_a4_primeira_embaixada_dorne: {
      id: 'j1_a4_primeira_embaixada_dorne',
      titulo: 'As Palavras Doces & O Veneno das Areias',
      anoHistorico: '3 d.C. - 4 d.C.',
      localizacao: 'Lançassolar',
      regionId: 'dorne',
      fallbackText: `Durante quase um ano, embaixadores reais, septões e meistres da corte de Aegon conferenciaram em Lançassolar com a Princesa Meria Martell, a governante de Dorne conhecida por seus inimigos como a "Rã Amarela" devido à sua idade avançada, cegueira parcial e corpo pesado.

Aegon ofereceu casamentos de honra, isenção de tributos e respeito absoluto aos costumes dorneses se Meria aceitasse a soberania do Trono de Ferro. Mas a velha princesa ouvia as propostas com um sorriso desdenhoso.

"Nossos ancestrais cruzaram os mares fugindo dos dragões de Valíria", respondeu a princesa. "Westeros pode se queimar sob as suas asas, mas Dorne nunca terá um rei estrangeiro." As negociações falharam, e em 4 d.C. a Rainha Rhaenys montou Meraxes para cumprir a promessa de levar fogo e sangue.`,
      internalVoices: [
        {
          atributo: 'cortesia',
          resultadoPassivo: 'SUCESSO',
          dcPassiva: 8,
          fala: 'A diplomacia falhou contra a obstinação dornesa. Eles preferem as cinzas do deserto à paz sob o dragão.',
        },
      ],
      loreContext: {
        fonte: {
          arquivo_md: 'fogo-e-sangue_02_reinado-do-dragao-guerras.md',
          livro: 'Fogo & Sangue - Volume 1',
          capitulo: 'Reinado do Dragão: Guerras',
        },
        notaHistorica: 'Meria Martell rejeita todas as embaixadas diplomáticas de Aegon.',
      },
      escolhas: [
        {
          id: 'esc_iniciar_primeira_guerra_dornesa',
          texto: 'Declarar o início da Primeira Guerra Dornesa e lançar as tropas pelos passos das Montanhas Vermelhas.',
          tipo: 'simples',
          nextNodeId: 'j1_a4_invasao_passo_principe',
        },

        {
          id: 'esc_embaixada_cortesia_ouro',
          texto: 'Oferecer garantias solenes de respeito aos costumes dorneses e manutenção de suas leis se aceitarem a paz.',
          tipo: 'teste_atributo',
          atributo: 'cortesia',
          dc: 8,
          onSuccessNodeId: 'j1_a4_emboscada_wyl_de_wyl',
          onPartialFailureNodeId: 'j1_a4_emboscada_wyl_de_wyl',
          aprovacaoCompanheiros: { rhaenys: 15, visenya: -10 },
        },
        {
          id: 'esc_embaixada_astucia_mapas',
          texto: 'Subornar guias locais das fronteiras para traçar rotas secretas pelos Passos do Príncipe.',
          tipo: 'teste_atributo',
          atributo: 'astucia',
          dc: 9,
          onSuccessNodeId: 'j1_a4_emboscada_wyl_de_wyl',
          onPartialFailureNodeId: 'j1_a4_emboscada_wyl_de_wyl',
          tagOrigem: '[SUBORNO DE AREIA]',
          aprovacaoCompanheiros: { visenya: 15, orys: -5 },
        },
        {
          id: 'esc_embaixada_furia_dragao',
          texto: 'Exibir a majestade de Balerion nos céus da fronteira para que as montanhas tremam perante o fogo.',
          tipo: 'simples',
          aprovacaoCompanheiros: { visenya: 15, orys: 10, rhaenys: -10 },
          delta: { flagsAdicionadas: ['demonstracao_forca_fronteira'] },
          nextNodeId: 'j1_a4_emboscada_wyl_de_wyl',
        }
      ],
    },

    // ==========================================
    // CENA 4: A INVASÃO DO PASSO DO PRÍNCIPE (4 d.C.)
    // ==========================================
    j1_a4_invasao_passo_principe: {
      id: 'j1_a4_invasao_passo_principe',
      titulo: 'O Passo do Príncipe & As Montanhas da Morte',
      anoHistorico: '4 d.C.',
      localizacao: 'Passo do Príncipe & Rio Wyl',
      regionId: 'dorne',
      fallbackText: `O exército real adentrou os desfiladeiros estreitos e íngremes das Montanhas Vermelhas. Orys Baratheon liderava a vanguarda com milhares de cavaleiros e homens de armas da tempestade, enquanto lorde Tyrell descia com levas da Campina.

Mas os dorneses não ofereceram batalha aberta. Eles recuavam na escuridão, queimando plantações, soterrando poços e demolindo as torres de vigia. Nos passos mais apertados, a estrada estava bloqueada por pilhas de carcaças podres de ovelhas, e pedregulhos gigantescos rolavam sobre os cavaleiros a partir de ravinas invisíveis.

No ponto em que o Caminho do Espinhaço cruzava o traiçoeiro Rio Wyl, sobre uma ponte estreita de pedra, arqueiros dorneses emboscados surgiram dos rochedos. Quando Orys ordenou recuo tático, uma avalanche desabou atrás de suas linhas, cercando seus homens feito gado no curral. Era a armadilha de Wyl de Wyl, o brutal senhor das montanhas conhecido como o "Amante de Viúvas".`,
      internalVoices: [
        {
          atributo: 'pressagio',
          resultadoPassivo: 'SUCESSO',
          dcPassiva: 9,
          fala: 'A pedra estala nas alturas... Uma avalanche foi preparada para decepar a retaguarda!',
        },
        {
          atributo: 'astucia',
          resultadoPassivo: 'SUCESSO',
          dcPassiva: 10,
          fala: 'Wyl de Wyl caça nas sombras. Se não reagir no primeiro segundo, Orys cairá prisioneiro.',
        },
      ],
      loreContext: {
        idVerbete: 'orys_baratheon',
        fonte: {
          arquivo_md: 'fogo-e-sangue_02_reinado-do-dragao-guerras.md',
          livro: 'Fogo & Sangue - Volume 1',
          capitulo: 'Reinado do Dragão: Guerras',
        },
        notaHistorica: 'Orys Baratheon é emboscado por Wyl de Wyl no Caminho do Espinhaço.',
      },
      escolhas: [
        {
          id: 'esc_salvar_mao_orys_pressagio',
          texto: 'Gritar aviso e lançar fogo com Balerion para explodir a emboscada a tempo, salvando a vida e a mão de Orys Baratheon.',
          tipo: 'teste_atributo',
          atributo: 'pressagio',
          dc: 11,
          onSuccessNodeId: 'j1_a4_castelos_vazios_dorne',
          onPartialFailureNodeId: 'j1_a4_emboscada_wyl_de_wyl',
        },
        {
          id: 'esc_tentativa_rompimento_furia',
          texto: 'Cavar passagem com as espadas pesadas contra os homens das montanhas para furar o cerco.',
          tipo: 'teste_atributo',
          atributo: 'furia',
          dc: 11,
          onSuccessNodeId: 'j1_a4_castelos_vazios_dorne',
          onPartialFailureNodeId: 'j1_a4_emboscada_wyl_de_wyl',
        },

        {
          id: 'esc_passo_principe_batedores_fogo',
          texto: 'Enviar batedores montados nos dragões para iluminar as fendas das rochas e detectar emboscadas com antecedência.',
          tipo: 'simples',
          aprovacaoCompanheiros: { visenya: 20, rhaenys: 15, orys: 15 },
          delta: { flagsAdicionadas: ['fendas_rochas_iluminadas'] },
          nextNodeId: 'j1_a4_castelos_vazios_dorne',
        },
        {
          id: 'esc_passo_principe_colunas_lentas',
          texto: 'Marcha em colunas cerradas com carroças de água na retaguarda para resistir à sede implacável.',
          tipo: 'simples',
          aprovacaoCompanheiros: { orys: 20, rhaenys: 10 },
          delta: { sangue: 1 },
          nextNodeId: 'j1_a4_castelos_vazios_dorne',
        }
      ],
    },

    // ==========================================
    // CENA 5: A EMBOSCADA DE WYL DE WYL
    // ==========================================
    j1_a4_emboscada_wyl_de_wyl: {
      id: 'j1_a4_emboscada_wyl_de_wyl',
      titulo: 'A Mão Decepada & A Fúria de Orys',
      anoHistorico: '4 d.C. - 7 d.C.',
      localizacao: 'Castelo Wyl & Masmorras Dornesas',
      regionId: 'dorne',
      fallbackText: `A emboscada de Wyl de Wyl foi impiedosa. Milhares de soldados da tempestade pereceram esmagados por pedregulhos ou crivados de flechas envenenadas. Orys Baratheon e uma dúzia de altos senhores foram capturados com vida para resgate.

Mas o cruel Wyl não os devolveu ilesos. Antes de aceitar o resgate em ouro de Pedra do Dragão, ele decepou a mão direita de cada um dos prisioneiros, proclamando com zombaria: "Assim eles não empunharão mais espadas contra Dorne".

Quando Orys finalmente retornou à corte, com o coto curado e uma barra de ferro no lugar da mão de espadachim, sua alma fora consumida pela vingança. A Primeira Guerra Dornesa tornava-se uma espiral irremediável de ódio e crueldade.`,
      internalVoices: [
        {
          atributo: 'furia',
          resultadoPassivo: 'SUCESSO',
          dcPassiva: 8,
          fala: 'A mão do seu irmão de armas foi decepada no lodo dornês. Não haverá perdão nas areias.',
        },
      ],
      loreContext: {
        fonte: {
          arquivo_md: 'fogo-e-sangue_02_reinado-do-dragao-guerras.md',
          livro: 'Fogo & Sangue - Volume 1',
          capitulo: 'Reinado do Dragão: Guerras',
        },
        notaHistorica: 'Wyl de Wyl decepa a mão de Orys Baratheon.',
      },
      escolhas: [
        {
          id: 'esc_avancar_castelos_vazios',
          texto: 'Prosseguir a marcha punitiva através dos desertos calcinantes de Dorne.',
          tipo: 'simples',
          nextNodeId: 'j1_a4_castelos_vazios_dorne',
        },

        {
          id: 'esc_wyl_contra_ataque_aereo',
          texto: 'Mergulhar com Meraxes e queimar as encostas rochosas onde os homens de Wyl se escondem.',
          tipo: 'simples',
          aprovacaoCompanheiros: { visenya: 15, rhaenys: 10, orys: 15 },
          delta: { flagsAdicionadas: ['encostas_de_wyl_queimadas'] },
          nextNodeId: 'j1_a4_castelos_vazios_dorne',
        },
        {
          id: 'esc_wyl_socorro_feridos',
          texto: 'Liderar pessoalmente o resgate dos soldados caídos e estancar a hemorragia do braço decepado de Orys.',
          tipo: 'simples',
          aprovacaoCompanheiros: { orys: 25, rhaenys: 15, visenya: -5 },
          delta: { sangue: 1, compostura: 1 },
          nextNodeId: 'j1_a4_castelos_vazios_dorne',
        }
      ],
    },

    // ==========================================
    // CENA 6: OS CASTELOS VAZIOS DE DORNE
    // ==========================================
    j1_a4_castelos_vazios_dorne: {
      id: 'j1_a4_castelos_vazios_dorne',
      titulo: 'O Deserto Ardente & Os Castelos Fantasmas',
      anoHistorico: '5 d.C.',
      localizacao: 'Areias do Rio Sangueverde',
      regionId: 'dorne',
      fallbackText: `A marcha pelos desertos dorneses revelou-se um pesadelo de sede, calor e ilusão. O sol impiedoso cozinhava os homens dentro de suas armaduras; cavalos caíam mortos aos montes e guerreiros enlouquecidos bebiam urina e areia.

Rhaenys desceu com Meraxes sobre Vila Tabueira, a cidade flutuante na foz do Sangueverde, queimando os barcos vazios. Quando Aegon e seus dragões tomaram Yronwood, Alcanceleste e Colina Fantasma, encontraram os salões desertos: apenas velhas e crianças permaneciam para fitar os conquistadores com olhos mudos e hostis. Nenhum lorde dornês combateu.

Quando as forças reais finalmente convergiram para Lançassolar, a capital dos Martell erguia-se em silêncio fúnebre. A corte inteira havia sumido nas areias e nos rochedos do deserto, restando apenas uma figura solitária no pátio interno.`,
      internalVoices: [
        {
          atributo: 'astucia',
          resultadoPassivo: 'SUCESSO',
          dcPassiva: 8,
          fala: 'Eles não lutam onde somos fortes. Conquistamos pedras vazias, mas a terra continua nos dorneses.',
        },
      ],
      loreContext: {
        fonte: {
          arquivo_md: 'fogo-e-sangue_02_reinado-do-dragao-guerras.md',
          livro: 'Fogo & Sangue - Volume 1',
          capitulo: 'Reinado do Dragão: Guerras',
        },
        notaHistorica: 'Os dorneses abandonam seus castelos e travam guerra de guerrilha.',
      },
      escolhas: [
        {
          id: 'esc_entrar_lancassolar_parlamento',
          texto: 'Apear de Meraxes no pátio de Lançassolar para confrontar a Princesa Meria Martell.',
          tipo: 'simples',
          nextNodeId: 'j1_a4_confronto_lancassolar_meria',
        },

        {
          id: 'esc_castelos_astucia_pocos',
          texto: 'Ferver e purificar a água dos poços com fogo de dragão antes de permitir que os soldados bebam.',
          tipo: 'simples',
          aprovacaoCompanheiros: { visenya: 15, rhaenys: 10 },
          delta: { flagsAdicionadas: ['pocos_purificados'] },
          nextNodeId: 'j1_a4_confronto_lancassolar_meria',
        },
        {
          id: 'esc_castelos_vigilia_noite',
          texto: 'Dobrar as sentinelas e manter as montarias aladas vigilantes contra guerreiros rastejantes das dunas.',
          tipo: 'simples',
          aprovacaoCompanheiros: { visenya: 15, orys: 10 },
          delta: { compostura: 1 },
          nextNodeId: 'j1_a4_confronto_lancassolar_meria',
        }
      ],
    },

    // ==========================================
    // CENA 7: O CONFRONTO EM LANÇASSOLAR COM MERIA
    // ==========================================
    j1_a4_confronto_lancassolar_meria: {
      id: 'j1_a4_confronto_lancassolar_meria',
      titulo: 'A Rã Amarela & O Confronto em Lançassolar',
      anoHistorico: '5 d.C.',
      localizacao: 'Palácio de Lançassolar',
      regionId: 'dorne',
      fallbackText: `Sentada em seu trono de madeira esculpida no pátio escaldante de Lançassolar, cega, desdentada e gorda aos oitenta anos de idade, a Princesa Meria Martell encarou a Rainha Rhaenys Targaryen e as presas de Meraxes sem pestanejar.

"Renda-se, princesa", intimou Rhaenys com a mão no punho de sua adaga, "ou voltaremos com fogo e sangue para consumir suas areias."

A velha senhora soltou uma risada rouca e respondeu com o lema imortal de Nymeria:
"Eu não vou lutar com você, nem vou me ajoelhar diante de você. Dorne não tem rei. Diga isso ao seu irmão. Vocês podem queimar nossos castelos, mas nós somos Insubmissos, Não Curvados, Não Quebrados!"

Aegon e Rhaenys declararam Dorne conquistada, deixando Lorde Jon Rosby como castelão de Lançassolar e Lorde Harlen Tyrell com um exército na Campina. Mas mal os dragões haviam alçado voo de volta a Porto Real, a terra inteira explodiu em revolta.`,
      internalVoices: [
        {
          atributo: 'cortesia',
          resultadoPassivo: 'SUCESSO',
          dcPassiva: 8,
          fala: 'A coragem da velha soberana é inacreditável. Ela não teme o fogo porque sabe que a areia engolirá os dragões.',
        },
      ],
      loreContext: {
        idVerbete: 'martell',
        fonte: {
          arquivo_md: 'fogo-e-sangue_02_reinado-do-dragao-guerras.md',
          livro: 'Fogo & Sangue - Volume 1',
          capitulo: 'Reinado do Dragão: Guerras',
        },
        notaHistorica: 'O diálogo lendário entre Meria Martell e a Rainha Rhaenys.',
      },
      escolhas: [
        {
          id: 'esc_reagir_revolta_areias',
          texto: 'Receber os corvos desesperados com notícias da revolta dornesa e da queda de Rosby.',
          tipo: 'simples',
          nextNodeId: 'j1_a4_revolta_das_areias',
        },

        {
          id: 'esc_meria_cortesia_paciencia',
          texto: 'Ouvir as ameaças da Rã Amarela com serenidade régia e declarar que o tempo trará a sabedoria às areias.',
          tipo: 'simples',
          aprovacaoCompanheiros: { rhaenys: 20, visenya: -15 },
          delta: { compostura: 2 },
          nextNodeId: 'j1_a4_revolta_das_areias',
        },
        {
          id: 'esc_meria_intimidacao_fogo',
          texto: 'Fazer o chão aos pés de Meria estalar com uma labareda controlada de Meraxes para lembrá-la do destino de Harrenhal.',
          tipo: 'simples',
          aprovacaoCompanheiros: { visenya: 20, orys: 10, rhaenys: -15 },
          delta: { flagsAdicionadas: ['aviso_de_fogo_lancassolar'] },
          nextNodeId: 'j1_a4_revolta_das_areias',
        }
      ],
    },

    // ==========================================
    // CENA 8: A REVOLTA DAS AREIAS
    // ==========================================
    j1_a4_revolta_das_areias: {
      id: 'j1_a4_revolta_das_areias',
      titulo: 'A Revolta das Areias & A Queda de Rosby',
      anoHistorico: '6 d.C. - 9 d.C.',
      localizacao: 'Lançassolar & Deserto de Vaith',
      regionId: 'dorne',
      fallbackText: `A resposta dornesa à ocupação foi rápida como o bote da serpente. Homens armados emergiram de poços ocultos sob o assoalho das casas e das dunas do deserto.

Em Lançassolar, a guarnição real foi passada na espada. Lorde Jon Rosby, que fora deixado como castelão, foi capturado e levado ao topo da Torre da Lança pela própria Princesa Meria Martell, que o atirou para a morte sobre as lajes empedradas do pátio.

Pior destino coube a Lorde Harlen Tyrell. O governante de Jardim de Cima marchou com seu exército pelas areias ardentes entre Hellholt e Vaith para reprimir os rebeldes, mas o deserto inteiro engoliu sua tropa: homens, cavalos e estandartes desapareceram em tempestades de areia sem que um único sobrevivente jamais fosse encontrado. Em resposta, os dragões prepararam o ataque punitivo contra Toca do Inferno.`,
      internalVoices: [
        {
          atributo: 'furia',
          resultadoPassivo: 'SUCESSO',
          dcPassiva: 9,
          fala: 'Lorde Rosby morto, o exército Tyrell desvanecido na areia... Isto não é conquista, é um cemitério para nossos homens!',
        },
      ],
      loreContext: {
        fonte: {
          arquivo_md: 'fogo-e-sangue_02_reinado-do-dragao-guerras.md',
          livro: 'Fogo & Sangue - Volume 1',
          capitulo: 'Reinado do Dragão: Guerras',
        },
        notaHistorica: 'Meria joga Rosby da Torre da Lança e o exército Tyrell desaparece nas areias.',
      },
      escolhas: [
        {
          id: 'esc_atacar_hellholt_climax',
          texto: 'Comandar a investida aérea de Rhaenys e Meraxes contra o castelo de Toca do Inferno (Hellholt).',
          tipo: 'simples',
          nextNodeId: 'j1_a4_ataque_hellholt_climax',
        },

        {
          id: 'esc_revolta_socorro_rosby',
          texto: 'Enviar uma flotilha rápida de Derivamarca pelo Mar de Dorne para resgatar os nobres leais cercados.',
          tipo: 'simples',
          aprovacaoCompanheiros: { daemon_v: 20, orys: 10 },
          delta: { flagsAdicionadas: ['resgate_naval_rosby'] },
          nextNodeId: 'j1_a4_ataque_hellholt_climax',
        },
        {
          id: 'esc_revolta_retaliacao_total',
          texto: 'Declarar lei marcial nas cidades costeiras e queimar as enseadas contrabandistas que financiam a insurreição.',
          tipo: 'simples',
          aprovacaoCompanheiros: { visenya: 20, rhaenys: -10 },
          delta: { flagsAdicionadas: ['enseadas_dorne_queimadas'] },
          nextNodeId: 'j1_a4_ataque_hellholt_climax',
        }
      ],
    },

    // ==========================================
    // CENA 9: O CLÍMAX EM TOCA DO INFERNO (10 d.C.)
    // ==========================================
    j1_a4_ataque_hellholt_climax: {
      id: 'j1_a4_ataque_hellholt_climax',
      titulo: 'O Clímax de Hellholt & O Escorpião de Ferro',
      anoHistorico: '10 d.C.',
      localizacao: 'Toca do Inferno (Hellholt)',
      regionId: 'dorne',
      fallbackText: `No ano 10 d.C., o sol brilhava inclemente sobre o castelo de Toca do Inferno, o baluarte da Casa Uller cercado por desfiladeiros de arenito sulfuroso. A Rainha Rhaenys desceu dos céus no dorso de Meraxes para queimar as torres do castelo em represália às mortes dos cavaleiros reais.

Porém, os dorneses haviam estudado os hábitos dos dragões. No topo da torre mais alta, protegida por cortinas de couro cru molhado para resistir ao calor, estava montada uma máquina de cerco descomunal: um escorpião de ferro fundido com uma corda de tripa de boi retorcida e um virote pesado de ferro de dois metros de comprimento.

Meraxes descia em mergulho rasante para expelir suas chamas douradas sobre as ameias. Era o milésimo de segundo decisivo: um teste heróico de presságio e astúcia poderia salvar a rainha e seu dragão, ou selar o destino trágico da dinastia!`,
      internalVoices: [
        {
          atributo: 'pressagio',
          resultadoPassivo: 'SUCESSO',
          dcPassiva: 10,
          fala: 'O brilho do ferro na torre mais alta! Não é um escudo, é um virote de cerco apontado para o olho da fera!',
        },
        {
          atributo: 'astucia',
          resultadoPassivo: 'SUCESSO',
          dcPassiva: 11,
          fala: 'Manobre para a esquerda agora ou o aço perfurará o cérebro de Meraxes!',
        },
      ],
      loreContext: {
        idVerbete: 'meraxes',
        fonte: {
          arquivo_md: 'fogo-e-sangue_02_reinado-do-dragao-guerras.md',
          livro: 'Fogo & Sangue - Volume 1',
          capitulo: 'Reinado do Dragão: Guerras',
        },
        notaHistorica: 'Meraxes é abatida por um virote de escorpião no olho em Hellholt no ano 10 d.C.',
      },
      escolhas: [
        {
          id: 'esc_salvar_rhaenys_meraxes_heroico',
          texto: 'Manobrar Meraxes no ar com reflexos sobrenaturais para desviar do virote e carbonizar o escorpião dornês!',
          tipo: 'teste_atributo',
          atributo: 'pressagio',
          dc: 13,
          onSuccessNodeId: 'j1_a4_salvamento_rhaenys_whatif',
          onPartialFailureNodeId: 'j1_a4_ira_do_dragao',
        },
        {
          id: 'esc_sopro_antecipado_furia',
          texto: 'Lançar fogo contínuo antecipado sobre as ameias na esperança de fundir o virote antes do disparo.',
          tipo: 'teste_atributo',
          atributo: 'furia',
          dc: 13,
          onSuccessNodeId: 'j1_a4_salvamento_rhaenys_whatif',
          onPartialFailureNodeId: 'j1_a4_ira_do_dragao',
        },

        {
          id: 'esc_hellholt_astucia_fumaça',
          texto: 'Lançar troncos em chamas para criar uma densa cortina de fumaça negra antes da investida aérea de Meraxes.',
          tipo: 'simples',
          tagOrigem: '[ASTUCIA DE FOGO]',
          aprovacaoCompanheiros: { visenya: 20, rhaenys: 20 },
          delta: { flagsAdicionadas: ['cortina_fumaca_hellholt'], compostura: 1 },
          nextNodeId: 'j1_a4_salvamento_rhaenys_whatif',
        },
        {
          id: 'esc_hellholt_furia_cega',
          texto: 'Carregar sem hesitação contra a torre mais alta, desafiando os virotes de ferro dos escorpiões.',
          tipo: 'simples',
          aprovacaoCompanheiros: { visenya: 15, orys: 15, rhaenys: -10 },
          delta: { flagsAdicionadas: ['investida_cega_hellholt'] },
          nextNodeId: 'j1_a4_ira_do_dragao',
        }
      ],
    },

    // ==========================================
    // CENA 10: WHAT IF - SALVAMENTO DE RHAENYS E MERAXES
    // ==========================================
    j1_a4_salvamento_rhaenys_whatif: {
      id: 'j1_a4_salvamento_rhaenys_whatif',
      titulo: 'A Rainha Salva & As Três Cabeças Intactas',
      anoHistorico: '10 d.C.',
      localizacao: 'Céus de Hellholt',
      regionId: 'dorne',
      fallbackText: `Com uma torção acrobática inacreditável no ar, Meraxes bateu suas asas gigantescas e desviou da trajetória do projétil de ferro, que raspou suas escamas prateadas zunindo pelo vazio. No segundo seguinte, a torrente de chamas douradas do dragão engoliu a torre inteira de Toca do Inferno, derretendo o escorpião e incinerando seus artilheiros.

Rhaenys Targaryen sobreviveu! A notícia de que a Rainha e seu dragão escaparam ilesas ao maior embate dornês enviou uma onda de choque de desespero pelas hostes de Dorne.

Com as três montarias da Conquista intactas e os três soberanos reinando juntos com força inabalável, o equilíbrio de poder permaneceu absoluto. A guerra continuou feroz, mas a lenda da invulnerabilidade dos dragões foi mantida incólume perante os Sete Reinos.`,
      internalVoices: [
        {
          atributo: 'pressagio',
          resultadoPassivo: 'SUCESSO',
          dcPassiva: 8,
          fala: 'O virote passou a centímetros... As Três Cabeças do Dragão continuam coroadas nos céus de Westeros!',
        },
        {
          atributo: 'comando',
          resultadoPassivo: 'SUCESSO',
          dcPassiva: 9,
          fala: 'Com Rhaenys viva, a dignidade e a diplomacia da corte permanecerão intactas para a paz futura.',
        },
      ],
      loreContext: {
        fonte: {
          arquivo_md: 'fogo-e-sangue_02_reinado-do-dragao-guerras.md',
          livro: 'Fogo & Sangue - Volume 1',
          capitulo: 'Reinado do Dragão: Guerras',
        },
        notaHistorica: 'Grande Ponto de Divergência: Rhaenys e Meraxes sobrevivem à batalha de Hellholt.',
      },
      escolhas: [
        {
          id: 'esc_avancar_rumo_embaixada_deria',
          texto: 'Receber a embaixada de paz enviada por Lançassolar após a morte da velha princesa Meria.',
          tipo: 'simples',
          nextNodeId: 'j1_a4_embaixada_deria_martell',
        },

        {
          id: 'esc_rhaenys_recuo_estrategico',
          texto: 'Voar imediatamente para Pedra do Dragão com Rhaenys e Meraxes para tratar as asas feridas do dragão.',
          tipo: 'simples',
          aprovacaoCompanheiros: { rhaenys: 25, orys: 15, visenya: 10 },
          delta: { sangue: 2, compostura: 2 },
          nextNodeId: 'j1_a4_noite_dos_assassinos_guarda_real',
        },
        {
          id: 'esc_rhaenys_chamas_hellholt',
          texto: 'Exigir que as muralhas de Hellholt sejam reduzidas a cinzas fumegantes antes de qualquer retirada.',
          tipo: 'simples',
          aprovacaoCompanheiros: { visenya: 20, orys: 15, rhaenys: -10 },
          delta: { flagsAdicionadas: ['hellholt_arrasada'] },
          nextNodeId: 'j1_a4_noite_dos_assassinos_guarda_real',
        }
      ],
    },

    // ==========================================
    // CENA 11: A IRA DO DRAGÃO (10 d.C. - 12 d.C.)
    // ==========================================
    j1_a4_ira_do_dragao: {
      id: 'j1_a4_ira_do_dragao',
      titulo: 'A Queda de Meraxes & A Ira do Dragão',
      anoHistorico: '10 d.C. - 12 d.C.',
      localizacao: 'Hellholt & Cidades Dornesas',
      regionId: 'dorne',
      fallbackText: `O disparo foi fatal. O pesado virote de ferro penetrou diretamente no olho direito de Meraxes. O dragão colossal soltou um bramido estarrecedor de agonia que ensurdeceu os vales, debulhou-se no ar e despencou do céu como uma avalanche escarlate, esmagando a torre mais alta e metade das muralhas de Toca do Inferno.

A Rainha Rhaenys Targaryen e Meraxes pereceram nos escombros. A notícia de sua morte enlouqueceu o Rei Aegon e a Rainha Visenya de dor e fúria incontrolável.

Os dois anos seguintes ficaram conhecidos como "A Ira do Dragão". Balerion e Vhagar desceram sobre Dorne dia após dia, queimando cada fortaleza, cidade e oásis pelo menos três vezes. Apenas Lançassolar foi poupada das chamas — uma artimanha cruel de Aegon para semear a discórdia e a desconfiança entre os nobres dorneses, insinuando que a Casa Martell havia traído seus próprios vassalos.`,
      internalVoices: [
        {
          atributo: 'furia',
          resultadoPassivo: 'SUCESSO',
          dcPassiva: 8,
          fala: 'Rhaenys... a doce Rhaenys está morta nas pedras. Queime cada polegada desta terra amaldiçoada até virar cinzas!',
        },
      ],
      loreContext: {
        idVerbete: 'rhaenys_targaryen',
        fonte: {
          arquivo_md: 'fogo-e-sangue_02_reinado-do-dragao-guerras.md',
          livro: 'Fogo & Sangue - Volume 1',
          capitulo: 'Reinado do Dragão: Guerras',
        },
        notaHistorica: 'Morte canônica de Rhaenys e os dois anos da Ira do Dragão.',
      },
      escolhas: [
        {
          id: 'esc_noite_dos_assassinos',
          texto: 'Retornar a Porto Real após os anos de fogo para enfrentar ameaças de assassinos dorneses na corte.',
          tipo: 'simples',
          nextNodeId: 'j1_a4_noite_dos_assassinos_guarda_real',
        },

        {
          id: 'esc_ira_recompensa_ouro',
          texto: 'Oferecer recompensas de ouro e senhorios valirianos pela cabeça de qualquer nobre dornês que empunhar armas.',
          tipo: 'simples',
          aprovacaoCompanheiros: { visenya: 15, orys: 10 },
          delta: { flagsAdicionadas: ['recompensas_cabecas_dorne'] },
          nextNodeId: 'j1_a4_noite_dos_assassinos_guarda_real',
        },
        {
          id: 'esc_ira_retirada_tencao',
          texto: 'Reconhecer que o deserto não pode ser domado pelo fogo cego e concentrar a defesa na fronteira.',
          tipo: 'simples',
          aprovacaoCompanheiros: { orys: 15, visenya: -15 },
          delta: { compostura: 1 },
          nextNodeId: 'j1_a4_noite_dos_assassinos_guarda_real',
        }
      ],
    },

    // ==========================================
    // CENA 12: A NOITE DOS ASSASSINOS & A GUARDA REAL
    // ==========================================
    j1_a4_noite_dos_assassinos_guarda_real: {
      id: 'j1_a4_noite_dos_assassinos_guarda_real',
      titulo: 'A Irmã Sombria & A Criação da Guarda Real',
      anoHistorico: '10 d.C.',
      localizacao: 'Porto Real & Forte de Aegon',
      regionId: 'pedra_dragao',
      fallbackText: `A guerra suja transbordou para o coração da capital. Assassinos dorneses armados com venenos e adagas de aço negro infiltraram-se nos corredores do Forte de Aegon, tentando degolar o rei em suas próprias câmaras.

Quando os guardas reais hesitaram, a Rainha Visenya sacou a espada de aço valiriano Irmã Sombria com velocidade fulminante, retalhando os agressores no escuro. Para provar a Aegon que ele continuava vulnerável, ela deslizou a ponta da lâmina pela bochecha do rei antes que seus sentinelas pudessem piscar, derramando uma gota de sangue real.

"Seus guardas são lentos e preguiçosos", advertiu a rainha guerreira. Foi naquele dia que Visenya instituiu a lendária Guarda Real: sete cavaleiros de elite juramentados sob votos monásticos de castidade, obediência e lealdade até a morte, usando mantos imaculados de seda branca.`,
      internalVoices: [
        {
          atributo: 'comando',
          resultadoPassivo: 'SUCESSO',
          dcPassiva: 9,
          fala: 'Sete espadas juramentadas pelo resto da vida. Os sete mantos brancos protegerão a coroa por gerações.',
        },
        {
          atributo: 'astucia',
          resultadoPassivo: 'SUCESSO',
          dcPassiva: 8,
          fala: 'Visenya salvou a vida do rei mais uma vez. A espada dela é tão afiada quanto sua mente de estrategista.',
        },
      ],
      loreContext: {
        idVerbete: 'guarda_real',
        fonte: {
          arquivo_md: 'fogo-e-sangue_02_reinado-do-dragao-guerras.md',
          livro: 'Fogo & Sangue - Volume 1',
          capitulo: 'Reinado do Dragão: Guerras',
        },
        notaHistorica: 'Visenya funda a Guarda Real com sete cavaleiros de manto branco.',
      },
      escolhas: [
        {
          id: 'esc_morte_princesa_meria_noticia',
          texto: 'Receber corvos com a notícia da morte da Princesa Meria Martell e a subida de Nymor ao poder.',
          tipo: 'simples',
          nextNodeId: 'j1_a4_morte_princesa_meria',
        },

        {
          id: 'esc_guarda_visenya_irmandade',
          texto: 'Conceder à Rainha Visenya plenos poderes para selecionar os cavaleiros mais honrados dos Sete Reinos para os Mantos Brancos.',
          tipo: 'simples',
          aprovacaoCompanheiros: { visenya: 25, orys: 15, rhaenys: 10 },
          delta: { flagsAdicionadas: ['guarda_real_fundada_visenya'], compostura: 2 },
          nextNodeId: 'j1_a4_morte_princesa_meria',
        },
        {
          id: 'esc_guarda_espionagem_contra',
          texto: 'Criar uma rede de contra-espionagem nos cortiços de Porto Real com espiões de Essos para caçar assassinos dorneses.',
          tipo: 'teste_atributo',
          atributo: 'astucia',
          dc: 9,
          onSuccessNodeId: 'j1_a4_morte_princesa_meria',
          onPartialFailureNodeId: 'j1_a4_morte_princesa_meria',
          tagOrigem: '[CONTRA-ESPIONAGEM]',
          aprovacaoCompanheiros: { visenya: 20, orys: -5 },
        }
      ],
    },

    // ==========================================
    // CENA 13: A MORTE DE MERIA MARTELL (13 d.C.)
    // ==========================================
    j1_a4_morte_princesa_meria: {
      id: 'j1_a4_morte_princesa_meria',
      titulo: 'A Morte da Rã Amarela & A Embaixada de Nymor',
      anoHistorico: '13 d.C.',
      localizacao: 'Lançassolar & Porto Real',
      regionId: 'dorne',
      fallbackText: `No ano 13 d.C., a implacável Princesa Meria Martell finalmente deu seu último suspiro na cama de seu palácio aos oitenta e três anos de idade. Seu filho mais velho, o Príncipe Nymor Martell, um homem já idoso e cansado de ver seu povo queimar e morrer de fome, ascendeu ao Trono da Lança.

"Westeros sangrou demais e Dorne não pode suportar mais vinte anos de cinzas", declarou Nymor perante seus vassalos. Desejando pôr um fim definitivo à guerra sangrenta, ele enviou sua própria herdeira, a jovem Princesa Deria Martell, em uma embaixada de paz histórica a Porto Real.

A comitiva de Deria não vinha desarmada: traziam um cortejo solene escoltando uma caixa esculpida em cedro e ferro. Ao aportarem nas docas da Água Negra, a tensão era palpável em toda a cidade.`,
      internalVoices: [
        {
          atributo: 'cortesia',
          resultadoPassivo: 'SUCESSO',
          dcPassiva: 8,
          fala: 'Nymor não é Meria. Ele quer a paz e enviou a própria filha como penhor de boa-fé.',
        },
      ],
      loreContext: {
        fonte: {
          arquivo_md: 'fogo-e-sangue_02_reinado-do-dragao-guerras.md',
          livro: 'Fogo & Sangue - Volume 1',
          capitulo: 'Reinado do Dragão: Guerras',
        },
        notaHistorica: 'Nymor Martell sucede Meria e envia a Princesa Deria com proposta de paz.',
      },
      escolhas: [
        {
          id: 'esc_receber_deria_martell_trono',
          texto: 'Receber a Princesa Deria Martell na Grande Sala do Trono de Ferro com todo o conselho reunido.',
          tipo: 'simples',
          nextNodeId: 'j1_a4_embaixada_deria_martell',
        },

        {
          id: 'esc_morte_meria_oferta_ouro',
          texto: 'Enviar uma embaixada prévia com presentes nupciais para sondar as intenções do novo Príncipe Nymor.',
          tipo: 'teste_atributo',
          atributo: 'cortesia',
          dc: 8,
          onSuccessNodeId: 'j1_a4_embaixada_deria_martell',
          onPartialFailureNodeId: 'j1_a4_embaixada_deria_martell',
          aprovacaoCompanheiros: { rhaenys: 15, orys: 10, visenya: -10 },
        },
        {
          id: 'esc_morte_meria_bloqueio_costeiro',
          texto: 'Mandar as galés de Velaryon intensificarem o patrulhamento em torno dos Portões de Ferro do Mar de Dorne.',
          tipo: 'simples',
          aprovacaoCompanheiros: { daemon_v: 15, visenya: 10 },
          delta: { flagsAdicionadas: ['pressao_naval_dorne'] },
          nextNodeId: 'j1_a4_embaixada_deria_martell',
        }
      ],
    },

    // ==========================================
    // CENA 14: A EMBAIXADA DA PRINCESA DERIA MARTELL
    // ==========================================
    j1_a4_embaixada_deria_martell: {
      id: 'j1_a4_embaixada_deria_martell',
      titulo: 'O Crânio de Meraxes & A Embaixada de Deria',
      anoHistorico: '13 d.C.',
      localizacao: 'Sala do Trono de Ferro & Porto Real',
      regionId: 'pedra_dragao',
      fallbackText: `Na grande sala do trono cercada pelos cavaleiros de manto branco e pelos lordes dos Sete Reinos, a Princesa Deria Martell caminhou altiva pelo tapete vermelho. Seus guardas depositaram aos pés de Aegon o primeiro presente de seu pai: o crânio monumental de Meraxes, limpo e polido, com as órbitas vazias onde antes brilhava o fogo valiriano.

Gritos de indignação e sede de sangue ecoaram pelos bancos dos lordes. Orys Baratheon, com o braço de ferro apertado na cintura, bradou que Deria deveria ser queimada viva e enviada a Dorne em pedaços.

Mas a princesa permaneceu impassível. Com um passo à frente, ela retirou de suas vestes uma carta selada com o sinete pessoal do Príncipe Nymor Martell. "Isto é apenas para os olhos de Sua Graça", proclamou ela. "Uma mensagem pessoal do governante de Dorne para o Conquistador de Westeros."`,
      internalVoices: [
        {
          atributo: 'comando',
          resultadoPassivo: 'SUCESSO',
          dcPassiva: 9,
          fala: 'Silenciem a corte! O sangue de um rei exige dignidade mesmo diante do crânio de seu dragão.',
        },
        {
          atributo: 'pressagio',
          resultadoPassivo: 'SUCESSO',
          dcPassiva: 10,
          fala: 'Esta carta encerra um segredo capaz de abalar as fundações de todo o seu reinado.',
        },
      ],
      loreContext: {
        idVerbete: 'trono_de_ferro',
        fonte: {
          arquivo_md: 'fogo-e-sangue_02_reinado-do-dragao-guerras.md',
          livro: 'Fogo & Sangue - Volume 1',
          capitulo: 'Reinado do Dragão: Guerras',
        },
        notaHistorica: 'Deria Martell entrega o crânio de Meraxes e a carta secreta a Aegon.',
      },
      escolhas: [
        {
          id: 'esc_ler_carta_nymor_solidao',
          texto: 'Receber a carta em silêncio absoluto e lê-la sentado sobre as lâminas cortantes do Trono de Ferro.',
          tipo: 'simples',
          nextNodeId: 'j1_a4_a_carta_de_nymor',
        },

        {
          id: 'esc_deria_honra_solene',
          texto: 'Garantir que a Princesa Deria seja tratada com a sacrossanta lei da hospitalidade e segurança régia plena.',
          tipo: 'simples',
          aprovacaoCompanheiros: { orys: 20, rhaenys: 20, visenya: -10 },
          delta: { compostura: 2, flagsAdicionadas: ['hospitalidade_honrada_deria'] },
          nextNodeId: 'j1_a4_a_carta_de_nymor',
        },
        {
          id: 'esc_deria_intimidador_fogo',
          texto: 'Exigir que Deria entregue a carta perante Balerion acorrentado aos pés da colina para demonstrar o poder real.',
          tipo: 'simples',
          aprovacaoCompanheiros: { visenya: 20, orys: 10, rhaenys: -15 },
          delta: { flagsAdicionadas: ['intimidacao_a_deria'] },
          nextNodeId: 'j1_a4_a_carta_de_nymor',
        }
      ],
    },

    // ==========================================
    // CENA 15: A CARTA DE NYMOR & O VÔO A PEDRA DO DRAGÃO
    // ==========================================
    j1_a4_a_carta_de_nymor: {
      id: 'j1_a4_a_carta_de_nymor',
      titulo: 'A Carta Manchada de Sangue & O Vôo Silencioso',
      anoHistorico: '13 d.C.',
      localizacao: 'Trono de Ferro & Pedra do Dragão',
      regionId: 'pedra_dragao',
      fallbackText: `Aegon I quebrou o selo de cera vermelha e leu a carta de Nymor em silêncio sepulcral diante de toda a corte. Ninguém jamais soube as palavras exatas contidas naquele pergaminho: alguns sussurravam que falava de Rhaenys ainda viva e mutilada nas masmorras de Hellholt; outros que oferecia um preço de sangue e paz que nenhum monarca honrado poderia recusar; e alguns diziam que continha uma profecia terrível de Valíria sobre a destruição de Porto Real por Homens Sem Rosto de Essos.

Enquanto lia, a mão de Aegon apertou a lâmina afiada de uma das espadas do Trono de Ferro com tanta força que o sangue escorreu entre seus dedos sobre o papel.

Sem proferir uma única palavra aos lordes ou a Visenya, o rei levantou-se, caminhou até o pátio exterior, montou em Balerion e voou sozinho para o Mar Estreito em direção a Pedra do Dragão. Ele passou a noite inteira em vigília solitária na câmara da Mesa Pintada, diante do oceano escuro. Ao raiar da manhã seguinte, retornou a Porto Real com o olhar resoluto. O destino dos Sete Reinos seria selado agora.`,
      internalVoices: [
        {
          atributo: 'pressagio',
          resultadoPassivo: 'SUCESSO',
          dcPassiva: 10,
          fala: 'A verdade foi revelada na solidão de Pedra do Dragão. Sua decisão moldará os próximos trezentos anos de história.',
        },
        {
          atributo: 'erudicao',
          resultadoPassivo: 'SUCESSO',
          dcPassiva: 9,
          fala: 'Um rei sábio governa com a cabeça fria, não com a fúria cega das cinzas.',
        },
      ],
      loreContext: {
        fonte: {
          arquivo_md: 'fogo-e-sangue_02_reinado-do-dragao-guerras.md',
          livro: 'Fogo & Sangue - Volume 1',
          capitulo: 'Reinado do Dragão: Guerras',
        },
        notaHistorica: 'Aegon lê a carta secreta de Nymor, voa a Pedra do Dragão e decide a paz.',
      },
      escolhas: [
        {
          id: 'esc_encruzilhada_destinos_finais',
          texto: 'Sentar-se novamente no Trono de Ferro e pronunciar a sentença definitiva perante toda a corte de Westeros.',
          tipo: 'simples',
          nextNodeId: 'j1_a4_encruzilhada_destinos',
        },

        {
          id: 'esc_carta_vigilia_solitaria',
          texto: 'Voar a Pedra do Dragão em Balerion para meditar perante a Mesa Pintada e os rolos sagrados de Valíria.',
          tipo: 'simples',
          aprovacaoCompanheiros: { rhaenys: 15, visenya: 15 },
          delta: { compostura: 2, flagsAdicionadas: ['vigilia_pedra_dragao_concluida'] },
          nextNodeId: 'j1_a4_encruzilhada_destinos',
        },
        {
          id: 'esc_carta_conselho_visenya_orys',
          texto: 'Compartilhar o peso da decisão com a Rainha Visenya e Orys Baratheon nos aposentos reais.',
          tipo: 'simples',
          aprovacaoCompanheiros: { visenya: 20, orys: 20, rhaenys: -5 },
          delta: { compostura: 1, sangue: 1 },
          nextNodeId: 'j1_a4_encruzilhada_destinos',
        }
      ],
    },

    // ==========================================
    // CENA 16: A ENCRUZILHADA DOS 6 DESTINOS
    // ==========================================
    j1_a4_encruzilhada_destinos: {
      id: 'j1_a4_encruzilhada_destinos',
      titulo: 'A Encruzilhada do Destino & Os Seis Finais do Reinado',
      anoHistorico: '13 d.C.',
      localizacao: 'Trono de Ferro & Porto Real',
      regionId: 'pedra_dragao',
      fallbackText: `Perante os olhares estarrecidos dos nobres de Westeros, dos cavaleiros de manto branco e da Princesa Deria Martell, o Rei Aegon I sentou-se no Trono de Ferro. As decisões tomadas ao longo de toda a campanha da Conquista — as alianças forjadas em sangue, a escolha da capital, o destino dos Stark e dos Tyrell e o preço pago nas areias de Dorne — convergiam para este momento culminante.

Qual seria a face eterna do império fundado pelo Dragão? A paz honrosa e ensanguentada, o triunfo imortal das Três Cabeças, a tirania implacável do fogo, a sagração mística em Vilavelha, a ordem marcial de Visenya ou o pacto secreto dos deuses antigos?

Aegon ergueu sua mão enfaixada e proclamou seu desígnio imutável ao mundo.`,
      internalVoices: [
        {
          atributo: 'comando',
          resultadoPassivo: 'SUCESSO',
          dcPassiva: 8,
          fala: 'Diga sua palavra, e a história do mundo será gravada para sempre no bronze e no fogo.',
        },
      ],
      loreContext: {
        fonte: {
          arquivo_md: 'fogo-e-sangue_02_reinado-do-dragao-guerras.md',
          livro: 'Fogo & Sangue - Volume 1',
          capitulo: 'Reinado do Dragão: Guerras',
        },
        notaHistorica: 'O grande nó de convergência para os 6 Finais da Jornada 1.',
      },
      escolhas: [
        {
          id: 'esc_final_canonico_paz',
          texto: 'Assinar o Tratado de Paz com Dorne em honra à memória dos caídos e governar com sabedoria em Porto Real (Final 1: Canônico).',
          tipo: 'simples',
          nextNodeId: 'j1_final_canonico_paz_sangrenta',
        },
        {
          id: 'esc_final_tres_cabecas_whatif',
          texto: 'Celebrar a união de Dorne ao império ao lado de Rhaenys e Visenya vivas sob as Três Cabeças do Dragão (Final 2: Épico).',
          tipo: 'simples',
          requiredFlags: ['rhaenys_e_meraxes_vivas'],
          motivoBloqueio: 'Exige que a Rainha Rhaenys e Meraxes tenham sobrevivido ao ataque de Hellholt.',
          nextNodeId: 'j1_final_tres_cabecas_triunfantes',
        },
        {
          id: 'esc_final_furia_fogo_total',
          texto: 'Queimar a carta na frente de Deria e lançar Balerion para reduzir Lançassolar a vidro negro e governar pelo medo (Final 3: Fogo Total).',
          tipo: 'simples',
          requiredFlags: ['ira_do_dragao_total'],
          motivoBloqueio: 'Exige ter adotado a política de terra arrasada e chamas implacáveis contra Dorne.',
          nextNodeId: 'j1_final_furia_fogo_total',
        },
        {
          id: 'esc_final_vilavelha_estrelada',
          texto: 'Ratificar a capital imperial em Vilavelha governando em comunhão com o Alto Septão e a Cidadela (Final 4: Trono Estrelado).',
          tipo: 'simples',
          requiredFlags: ['alianca_cidadela_fe'],
          motivoBloqueio: 'Exige união sacra plena com a Fé dos Sete e a Cidadela em Vilavelha.',
          nextNodeId: 'j1_final_trono_estrelado_vilavelha',
        },
        {
          id: 'esc_final_visenya_marcial',
          texto: 'Entregar o comando militar e a regência à Rainha Visenya e à Ordem da Irmã Sombria (Final 5: Ordem Marcial).',
          tipo: 'simples',
          requiredFlags: ['regencia_visenya_aceita'],
          motivoBloqueio: 'Exige ter concedido a regência militar suprema à Rainha Visenya.',
          nextNodeId: 'j1_final_coroa_visenya_irma_sombria',
        },
        {
          id: 'esc_final_pacto_secreto_dornes',
          texto: 'Firmar o Pacto Secreto de Pedra do Dragão em nome da profecia da Longa Noite vindoura (Final 6: Místico).',
          tipo: 'simples',
          requiredFlags: ['pacto_profecia_valiriana'],
          motivoBloqueio: 'Exige ter descoberto os segredos da profecia da Longa Noite na carta de Nymor.',
          nextNodeId: 'j1_final_pacto_secreto_dornes',
        }
      ],
    },

    // ==========================================
    // FINAL 1: CANÔNICO - O TRONO DE FERRO E A PAZ DE SANGUE
    // ==========================================
    j1_final_canonico_paz_sangrenta: {
      id: 'j1_final_canonico_paz_sangrenta',
      titulo: 'Final I: O Trono de Ferro & A Paz de Sangue',
      anoHistorico: '13 d.C. - 37 d.C.',
      localizacao: 'Porto Real',
      regionId: 'pedra_dragao',
      isEnding: true,
      fallbackText: `Aegon I Targaryen firmou o tratado solene de paz perpétua com Dorne, reconhecendo a soberania dos Martell como príncipes independentes em suas areias e encerrando a sangrenta Primeira Guerra Dornesa. O crânio de Meraxes foi depositado com honra sob a abóbada do Forte de Aegon.

Ao longo das duas décadas seguintes, Aegon governou um reino em paz profunda. Todos os anos viajava em cortejo real pelas Sete Coroas acompanhado por Balerion, ouvindo as petições de lordes e camponeses, julgando contendas e forjando as leis fundamentais do continente. A Guarda Real tornou-se a lenda viva da cavalaria, e Porto Real floresceu como a metrópole mais vibrante do mundo ocidental.

No ano 37 d.C., com sessenta e quatro anos, o Conquistador faleceu serenamente na câmara da Mesa Pintada em Pedra do Dragão enquanto contava histórias de suas conquistas a seus dois netos. Seu legado estava gravado no ferro do Trono e no coração de milhões de homens: o homem que transformou sete reinos em guerra em uma única nação sob o Dragão.`,
      internalVoices: [
        {
          atributo: 'comando',
          resultadoPassivo: 'SUCESSO',
          dcPassiva: 8,
          fala: 'O reinado da espada terminou em justiça e paz. Seu nome será venerado por toda a posteridade.',
        },
      ],
      loreContext: {
        fonte: {
          arquivo_md: 'fogo-e-sangue_03_tres-cabecas-governo.md',
          livro: 'Fogo & Sangue - Volume 1',
          capitulo: 'Três Cabeças: Governo',
        },
        notaHistorica: 'Final Canônico: Paz com Dorne e consolidação do governo de Aegon até 37 d.C.',
      },
      escolhas: [],
    },

    // ==========================================
    // FINAL 2: ÉPICO - AS TRÊS CABEÇAS TRIUNFANTES (WHAT IF)
    // ==========================================
    j1_final_tres_cabecas_triunfantes: {
      id: 'j1_final_tres_cabecas_triunfantes',
      titulo: 'Final II: As Três Cabeças Triunfantes',
      anoHistorico: '13 d.C. em diante',
      localizacao: 'Porto Real & Lançassolar',
      regionId: 'pedra_dragao',
      isEnding: true,
      fallbackText: `Contra todas as probabilidades e os perigos mortais da guerra, a Rainha Rhaenys e Meraxes sobreviveram, Daemon Velaryon comandou os mares com astúcia lendária e a coroa valiriana preservou suas três cabeças unidas e invencíveis.

Em vez de cinzas e ódio, a embaixada da Princesa Deria Martell culminou em um casamento régio e em um pacto de honra mútua: Dorne uniu-se aos Sete Reinos como principado soberano associado, mantendo suas leis e costumes sem submissão militar humilhante. Pela primeira vez na história, os Oito Reinos estavam verdadeiramente unificados sob uma só bandeira!

Balerion, Vhagar e Meraxes sobrevoaram juntos a Baía da Água Negra sob os aplausos ensurdecedores de um milhão de cidadãos. Sob o governo triunvirato de Aegon, Visenya e Rhaenys, a dinastia Targaryen atingiu uma era de ouro dourada e poética, onde dragões e homens prosperaram em harmonia jamais vista no mundo conhecido.`,
      internalVoices: [
        {
          atributo: 'pressagio',
          resultadoPassivo: 'SUCESSO',
          dcPassiva: 8,
          fala: 'O Dragão tem três cabeças, e nenhuma foi cortada. A canção de Westeros ressoará como uma lenda imaculada.',
        },
      ],
      loreContext: {
        fonte: {
          arquivo_md: 'fogo-e-sangue_02_reinado-do-dragao-guerras.md',
          livro: 'Fogo & Sangue - Volume 1',
          capitulo: 'Reinado do Dragão: Guerras',
        },
        notaHistorica: 'Final Alternativo de Glória: Rhaenys viva e unificação de Dorne sem a tragédia de Hellholt.',
      },
      escolhas: [],
    },

    // ==========================================
    // FINAL 3: O IMPÉRIO DAS CINZAS (FOGO TOTAL)
    // ==========================================
    j1_final_furia_fogo_total: {
      id: 'j1_final_furia_fogo_total',
      titulo: 'Final III: O Império das Cinzas & O Fogo Absoluto',
      anoHistorico: '13 d.C. em diante',
      localizacao: 'Ruínas Vitrificadas de Lançassolar',
      regionId: 'dorne',
      isEnding: true,
      fallbackText: `Aegon I queimou a carta de Deria Martell no ar do Trono de Ferro, lançou a embaixadora nas masmorras e convocou Balerion e Vhagar para o holocausto final. Não haveria paz com quem ousara derrubar um dragão.

Durante quarenta dias e quarenta noites, as chamas negras de Balerion derreteram as muralhas de Lançassolar, a Torre do Sol e a Torre da Lança, vitrificando as areias do deserto em um mar cintilante de obsidiana negra e cinzas. A Casa Martell foi extinta até o último ramo de sangue, e a população remanescente fugiu em barcos para o exílio em Essos.

Westeros estava inteiramente subjugada, mas o preço foi aterrador. O Trono de Ferro passou a governar sobre uma terra de viúvas, cinzas e silêncio sepulcral. Ninguém ousava rebelar-se perante o Terror Negro, mas o amor pelo governante foi substituído por um pavor frio e paralisante que mancharia o nome dos Targaryen por séculos.`,
      internalVoices: [
        {
          atributo: 'furia',
          resultadoPassivo: 'SUCESSO',
          dcPassiva: 8,
          fala: 'Cinzas e vidro negro. Eles queriam queimar? Agora queimarão na memória dos séculos. O medo é a única lei.',
        },
      ],
      loreContext: {
        fonte: {
          arquivo_md: 'fogo-e-sangue_02_reinado-do-dragao-guerras.md',
          livro: 'Fogo & Sangue - Volume 1',
          capitulo: 'Reinado do Dragão: Guerras',
        },
        notaHistorica: 'Final Ruthless: Extinção de Dorne pelo fogo total e governo pelo terror absoluto.',
      },
      escolhas: [],
    },

    // ==========================================
    // FINAL 4: O REI UNGIDO DE VILAVELHA
    // ==========================================
    j1_final_trono_estrelado_vilavelha: {
      id: 'j1_final_trono_estrelado_vilavelha',
      titulo: 'Final IV: O Rei Ungido de Vilavelha',
      anoHistorico: '13 d.C. em diante',
      localizacao: 'Septo Estrelado & Vilavelha',
      regionId: 'campina',
      isEnding: true,
      fallbackText: `Ao contrário dos desígnios guerreiros das Três Colinas da foz da Água Negra, Aegon aceitou os conselhos dos sábios da Cidadela e as súplicas piedosas da Fé dos Sete, transferindo a capital definitiva de seu império para a cidade milenar de Vilavelha.

O Trono de Ferro foi erguido sob os arcos monumentais do Septo Estrelado, tendo a imponente Torre Alta como farol guia dos mares. A coroa valiriana fundiu-se intimamente com as tradições, a erudição dos meistres e as leis dos Sete Deuses de Westeros.

Sob a tutela da Fé e da Cidadela, o império tornou-se uma metrópole de conhecimento, hospitais, bibliotecas colossais e paz civilizada. Os dragões passaram a descansar no pátio dos Hightower, e o reino floresceu como o centro de luz e cultura de todo o mundo ocidental, protegido pela sabedoria e pelos óleos sagrados dos deuses.`,
      internalVoices: [
        {
          atributo: 'cortesia',
          resultadoPassivo: 'SUCESSO',
          dcPassiva: 8,
          fala: 'A espada cedeu lugar à pena e ao livro sagrado. A cidade mais bela do mundo é agora a cabeça do seu império.',
        },
      ],
      loreContext: {
        fonte: {
          arquivo_md: 'fogo-e-sangue_01_a-conquista-de-aegon.md',
          livro: 'Fogo & Sangue - Volume 1',
          capitulo: 'A Conquista de Aegon',
        },
        notaHistorica: 'Final Alternativo Político: Vilavelha como capital imperial permanente em aliança com a Fé e a Cidadela.',
      },
      escolhas: [],
    },

    // ==========================================
    // FINAL 5: A ORDEM DA IRMÃ SOMBRIA (VISENYA HEGEMÔNICA)
    // ==========================================
    j1_final_coroa_visenya_irma_sombria: {
      id: 'j1_final_coroa_visenya_irma_sombria',
      titulo: 'Final V: A Ordem da Irmã Sombria',
      anoHistorico: '13 d.C. em diante',
      localizacao: 'Fortaleza de Pedra do Forte de Aegon',
      regionId: 'pedra_dragao',
      isEnding: true,
      fallbackText: `A dor das perdas e as ameaças de traição levaram Aegon a entregar a liderança política e jurídica do império à sua irmã mais velha, a implacável Rainha Visenya Targaryen.

Empunhando a lendária espada Irmã Sombria e montada em Vhagar, Visenya transformou a corte em uma fortaleza marcial inexpugnável. Harrenhal foi mantida como cidadela de ferro e sangue sob guarda valiriana, a Guarda Real foi ampliada com inquisidores de aço e qualquer murmúrio de deslealdade era punido antes mesmo de se converter em palavra.

O reino dos dragões tornou-se uma máquina de guerra disciplinada, justa porém gélida como as muralhas de basalto. Nenhum senhor ousou rebelar-se, e as fronteiras de Westeros fecharam-se para invasores externos sob a vigilância das asas de bronze de Vhagar e da lâmina de aço valiriano de Visenya.`,
      internalVoices: [
        {
          atributo: 'comando',
          resultadoPassivo: 'SUCESSO',
          dcPassiva: 9,
          fala: 'A disciplina militar forjou um reino inquebrantável. A mão de ferro de Visenya é a verdadeira guardiã do império.',
        },
      ],
      loreContext: {
        idVerbete: 'visenya_targaryen',
        fonte: {
          arquivo_md: 'fogo-e-sangue_02_reinado-do-dragao-guerras.md',
          livro: 'Fogo & Sangue - Volume 1',
          capitulo: 'Reinado do Dragão: Guerras',
        },
        notaHistorica: 'Final Alternativo Marcial: Visenya assume a regência e impõe hegemonia militar valiriana absoluta.',
      },
      escolhas: [],
    },

    // ==========================================
    // FINAL 6: O SEGREDO DE PEDRA DO DRAGÃO (MÍSTICO / PROFÉTICO)
    // ==========================================
    j1_final_pacto_secreto_dornes: {
      id: 'j1_final_pacto_secreto_dornes',
      titulo: 'Final VI: O Segredo de Pedra do Dragão & A Canção de Gelo e Fogo',
      anoHistorico: '13 d.C. em diante',
      localizacao: 'Câmara da Mesa Pintada & A Muralha',
      regionId: 'pedra_dragao',
      isEnding: true,
      fallbackText: `A carta de Nymor Martell guardava o maior segredo do mundo: a revelação de que os povos livres do sul e os Primeiros Homens do Norte compartilhavam com os valirianos o mesmo presságio antigo — a profecia de que um inverno apocalíptico desceria além da Muralha para extinguir toda a humanidade na Longa Noite.

Compreendendo que a guerra entre homens era uma futilidade diante da escuridão iminente, Aegon firmou o Tratado Secreto da Mesa Pintada. O ouro da coroa e os dorneses aliaram-se sob sigilo sagrado para subsidiar a Patrulha da Noite e reforçar as fortificações do Norte.

Aegon gravou com fogo de dragão nas lâminas do Trono de Ferro o aviso profético: "Do meu sangue virá o Príncipe que foi Prometido, e sua será a Canção de Gelo e Fogo". O reino uniu-se não apenas sob uma coroa temporal, mas como o escudo espiritual e eterno de toda a humanidade contra o frio que um dia virá.`,
      internalVoices: [
        {
          atributo: 'pressagio',
          resultadoPassivo: 'SUCESSO',
          dcPassiva: 9,
          fala: 'A profecia foi compreendida. Não conquistamos para nós, mas para salvar o mundo dos vivos.',
        },
      ],
      loreContext: {
        fonte: {
          arquivo_md: 'fogo-e-sangue_01_a-conquista-de-aegon.md',
          livro: 'Fogo & Sangue - Volume 1',
          capitulo: 'A Conquista de Aegon',
        },
        notaHistorica: 'Final Místico: O pacto profético da Canção de Gelo e Fogo e preparação contra a Longa Noite.',
      },
      escolhas: [],
    },
  },
};

export function obterNodeAto4(nodeId: string): NodeJornada | undefined {
  return grafoAto4.nodes[nodeId];
}
