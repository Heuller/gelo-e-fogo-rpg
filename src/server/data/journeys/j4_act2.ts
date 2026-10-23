import 'server-only';
import { GrafoJornada } from '@/server/engine/storyLinter';

export const grafoJ4Ato2: GrafoJornada = {
  id: 'jornada_4_muralha_ato2',
  titulo: 'Ato II: Os Que Ficaram & A Sentinela do Gelo',
  startNodeId: 'j4_a2_retorno_jon_snow_ferido',
  nodes: {
    // 1. O Retorno de Jon Snow Ferido
    j4_a2_retorno_jon_snow_ferido: {
      id: 'j4_a2_retorno_jon_snow_ferido',
      titulo: 'Um Cavalo Espumante no Portão Sul',
      anoHistorico: '299 d.C.',
      localizacao: 'Portão Sul de Castelo Negro',
      regionId: 'castelo_negro',
      fallbackText: `O relincho agudo de um cavalo exausto corta o silêncio fúnebre do pátio ao entardecer. Vós correis para o portão sul e encontrais um animal banhado em suor cinzento e espuma sanguinolenta, desabando sobre os cascalhos. Preso aos estribos está Jon Snow.
      
Sua capa negra está em farrapos, o rosto queimado pelo vento gélido e uma flecha com penas cinzentas de ganso atravessa a carne de sua coxa direita. Ao vos ver, o bastardo de Winterfell tenta firmar-se com uma das mãos na neve ensanguentada:
— Fechem... fechem as portas. Não pelo norte... eles vêm pelo sul. Styr... o Magnar de Thenn escalou a Muralha perto da Atalaia da Água Cinzenta. Cem homens... estão cavalgando pela Estrada do Rei!`,
      internalVoices: [
        {
          atributo: 'cortesia',
          resultadoPassivo: 'SUCESSO',
          dcPassiva: 8,
          fala: 'Jon arriscou a vida para nos alertar. Cada segundo que ele sangra na neve aproxima a morte de todos.',
        },
        {
          atributo: 'comando',
          resultadoPassivo: 'SUCESSO',
          dcPassiva: 9,
          fala: 'Se os selvagens atacarem pelo sul, Castelo Negro não tem muralhas protetoras. Estamos de peito aberto.',
        },
      ],
      loreContext: {
        fonte: {
          arquivo_md: 'corpus_md/jornada_3_tronos/livro_3_a-tormenta-de-espadas_resumo-completo.md',
          livro: 'A Tormenta de Espadas',
          capitulo: 'Jon VI',
        },
        notaHistorica: 'Âncora: C10. Jon foge em Coroa da Rainha e retorna ferido a Castelo Negro alertando sobre os Thenns.',
      },
      escolhas: [
        {
          id: 'esc_j4_a2_carregar_jon_enfermaria',
          texto: 'Apoiar o ombro de Jon Snow e levá-lo às pressas para as câmaras aquecidas de Meistre Aemon.',
          tipo: 'simples',
          aprovacaoCompanheiros: { jon_snow: 15 },
          delta: { flagsAdicionadas: ['jon_socorrido_prontamente'], compostura: 1 },
          nextNodeId: 'j4_a2_castelo_vazio',
        },
        {
          id: 'esc_j4_a2_soar_alarme_patio',
          texto: 'Gritar aos sentinelas para tocarem a trompa de alarme e trancarem o celeiro e as estrebarias.',
          tipo: 'teste_atributo',
          atributo: 'comando',
          dc: 9,
          onSuccessNodeId: 'j4_a2_castelo_vazio',
          onPartialFailureNodeId: 'j4_a2_castelo_vazio',
          delta: { flagsAdicionadas: ['alarme_sul_soado'] },
        },
      ],
    },

    // 2. O Castelo Vazio
    j4_a2_castelo_vazio: {
      id: 'j4_a2_castelo_vazio',
      titulo: 'Os Ecos de um Forte Abandonado',
      anoHistorico: '299 d.C.',
      localizacao: 'Pátio Central, Castelo Negro',
      regionId: 'castelo_negro',
      fallbackText: `Quando a trompa soa no topo da Torre do Rei, apenas ecos respondem. Castelo Negro não é um verdadeiro castelo: não possui fossos, nem muralhas circundantes, nem seteiras voltadas para o sul. Suas costas estão abertas para os bosques e para a planície da Dádiva.
      
Com duzentos irmãos mortos ou dispersos no Grande Patrulhamento e Bowen Marsh marchando para o oeste com a melhor parte dos lanceiros, sobram menos de quarenta homens aptos em todo o forte: aprendizes de intendente de catorze anos, cocheiros coxos, cozinheiros com dedos a menos e velhos decrépitos.`,
      internalVoices: [
        {
          atributo: 'pressagio',
          resultadoPassivo: 'SUCESSO',
          dcPassiva: 9,
          fala: 'O vento uiva através das frestas da Torre de Hardin. Se não transformarmos este labirinto de madeira em fortaleza, seremos degolados antes da alvorada.',
        },
      ],
      loreContext: {
        fonte: {
          arquivo_md: 'corpus_md/jornada_3_tronos/livro_3_a-tormenta-de-espadas_resumo-completo.md',
          livro: 'A Tormenta de Espadas',
          capitulo: 'Jon VI',
        },
        notaHistorica: 'Âncora: C1, C5. A vulnerabilidade de Castelo Negro ao sul e a guarnição reduzida a quarenta irmãos.',
      },
      escolhas: [
        {
          id: 'esc_j4_a2_revisar_contagem_suprimentos',
          texto: 'Consultar os registros e inventários deixados por Bowen Marsh na intendência.',
          tipo: 'simples',
          delta: { flagsAdicionadas: ['inspecionou_intendencia'] },
          nextNodeId: 'j4_a2_a_contagem_de_marsh',
        },
        {
          id: 'esc_j4_a2_ir_direto_armaria_noye',
          texto: 'Seguir direto para a forja para averiguar as defesas e armas com Donal Noye.',
          tipo: 'simples',
          aprovacaoCompanheiros: { donal_noye: 10 },
          nextNodeId: 'j4_a2_o_castelo_dos_velhos',
        },
      ],
    },

    // 3. A Contagem de Marsh
    j4_a2_a_contagem_de_marsh: {
      id: 'j4_a2_a_contagem_de_marsh',
      titulo: 'Os Registros de Bowen Marsh',
      anoHistorico: '299 d.C.',
      localizacao: 'Câmaras da Intendência',
      regionId: 'castelo_negro',
      fallbackText: `Nas mesas de carvalho da intendência, rolos de pergaminho amarelado detalham a penúria extrema da fortaleza. O Intendente-Chefe Bowen Marsh é um homem de números exatos e coragem tímida; antes de partir com a força de choque, ele registrou cada saco de cevada e cada barril de banha salgada com meticulosidade fúnebre.
      
— Cem homens nas montanhas não comem menos que cem homens na planície — murmura o aprendiz que guarda a chave do cofre. — Marsh levou todos os cavalos de batalha. Só nos restaram mulas e pôneis velhos.`,
      internalVoices: [
        {
          atributo: 'astucia',
          resultadoPassivo: 'SUCESSO',
          dcPassiva: 8,
          fala: 'Bowen Marsh pensa como um guarda-livros, não como um general. Mas seus registros mostram onde estão escondidos quarenta barris de piche e breu mineral.',
        },
      ],
      loreContext: {
        fonte: {
          arquivo_md: 'corpus_md/jornada_3_tronos/livro_3_a-tormenta-de-espadas_resumo-completo.md',
          livro: 'A Tormenta de Espadas',
          capitulo: 'Jon II',
        },
        notaHistorica: 'Âncora: C8. Bowen Marsh e seus números na intendência.',
      },
      escolhas: [
        {
          id: 'esc_j4_a2_localizar_barris_breu',
          texto: 'Examinar as notas sobre os depósitos subterrâneos e marcar os barris de pez e óleo combustível.',
          tipo: 'teste_atributo',
          atributo: 'astucia',
          dc: 8,
          onSuccessNodeId: 'j4_a2_cartas_aos_cinco_reis',
          onPartialFailureNodeId: 'j4_a2_cartas_aos_cinco_reis',
          delta: { flagsAdicionadas: ['ea_numeros_de_marsh', 'deposito_breu_localizado'] },
        },
        {
          id: 'esc_j4_a2_recolher_cera_e_cordas',
          texto: 'Recrutar dois aprendizes para transportar cordas de cânhamo e tochas para o pátio.',
          tipo: 'simples',
          delta: { flagsAdicionadas: ['materiais_cordas_recolhidos'] },
          nextNodeId: 'j4_a2_cartas_aos_cinco_reis',
        },
      ],
    },

    // 4. Cartas aos Cinco Reis
    j4_a2_cartas_aos_cinco_reis: {
      id: 'j4_a2_cartas_aos_cinco_reis',
      titulo: 'Os Gritos Sem Resposta da Muralha',
      anoHistorico: '299 d.C.',
      localizacao: 'Torre do Meistre',
      regionId: 'castelo_negro',
      fallbackText: `No corvário sob o teto forrado de palha, os pássaros negros batem asas inquietos. Meistre Aemon e o tímido Clydas guardam as cópias das cartas de socorro seladas com cera negra que foram despachadas para todos os cantos de Westeros.
      
Cartas foram enviadas ao Rei Joffrey em Porto Real, ao Rei Stannis em Pedra do Dragão, a Robb Stark em Correrrio, a Balon Greyjoy em Pyke e a Renly em Ponta Tempestade antes de sua morte. A única resposta veio da capital, redigida pelo Grande Meistre Pycelle: palavras vazias prometendo orações da Fé e nenhum soldado.`,
      internalVoices: [
        {
          atributo: 'erudicao',
          resultadoPassivo: 'SUCESSO',
          dcPassiva: 9,
          fala: 'Os senhores do sul disputam uma cadeira de espadas de ferro enquanto a muralha que protege seus filhos sangra no abandono.',
        },
      ],
      loreContext: {
        fonte: {
          arquivo_md: 'corpus_md/jornada_3_tronos/livro_3_a-tormenta-de-espadas_resumo-completo.md',
          livro: 'A Tormenta de Espadas',
          capitulo: 'Tyrion IV',
        },
        notaHistorica: 'Âncora: C8. Os apelos da Patrulha aos reis de Westeros e a negligência do Trono de Ferro.',
      },
      escolhas: [
        {
          id: 'esc_j4_a2_auxiliar_clydas_corvos',
          texto: 'Ajudar Clydas a alimentar os corvos mensageiros e estocar grãos no aviário.',
          tipo: 'simples',
          aprovacaoCompanheiros: { aemon: 10 },
          delta: { flagsAdicionadas: ['clydas_auxiliado', 'ea_corvos_nos_caibros'] },
          nextNodeId: 'j4_a2_o_castelo_dos_velhos',
        },
        {
          id: 'esc_j4_a2_ler_respostas_reinos',
          texto: 'Ler com atenção os despachos reais e compreender a solidão militar da Patrulha.',
          tipo: 'teste_atributo',
          atributo: 'erudicao',
          dc: 9,
          onSuccessNodeId: 'j4_a2_o_castelo_dos_velhos',
          onPartialFailureNodeId: 'j4_a2_o_castelo_dos_velhos',
          delta: { flagsAdicionadas: ['compreensao_politica_trono'] },
        },
      ],
    },

    // 5. O Castelo dos Velhos
    j4_a2_o_castelo_dos_velhos: {
      id: 'j4_a2_o_castelo_dos_velhos',
      titulo: 'A Senilidade de Sor Wynton Stout',
      anoHistorico: '299 d.C.',
      localizacao: 'Salão Comum de Castelo Negro',
      regionId: 'castelo_negro',
      fallbackText: `No salão comum aquecido pela lareira esfumaçada, Sor Wynton Stout senta-se embrulhado em três mantos de lã puída. O velho cavaleiro, outrora um líder vigoroso, tem mais de oitenta anos e os olhos leitosos da catarata.
      
Quando vós lhe perguntais sobre as patrulhas e a ordem de batalha contra os Thenns, Sor Wynton sorri fracamente, confunde vosso nome com o de um primo morto há cinquenta anos e pergunta docemente se o Rei Aerys já mandou o vinho de verão da Campina. Ele não comanda mais nem o próprio tremor das mãos.`,
      internalVoices: [
        {
          atributo: 'furia',
          resultadoPassivo: 'SUCESSO',
          dcPassiva: 9,
          fala: 'Um comandante senil é uma sentença de morte. Alguém com ferro no sangue precisa puxar as rédeas imediatamente.',
        },
      ],
      loreContext: {
        fonte: {
          arquivo_md: 'corpus_md/jornada_3_tronos/livro_3_a-tormenta-de-espadas_resumo-completo.md',
          livro: 'A Tormenta de Espadas',
          capitulo: 'Jon VI',
        },
        notaHistorica: 'Âncora: C9. Sor Wynton Stout esquece seu posto e Donal Noye assume o comando.',
      },
      escolhas: [
        {
          id: 'esc_j4_a2_acompanhar_stout_aposentos',
          texto: 'Ajudar Sor Wynton a recolher-se em segurança aos seus aposentos com respeito à sua idade.',
          tipo: 'simples',
          delta: { honra: 1, compostura: 1 },
          nextNodeId: 'j4_a2_noye_assume',
        },
        {
          id: 'esc_j4_a2_convocar_noye_urgente',
          texto: 'Gritar no pátio por Donal Noye para declarar formalmente que a forja deve liderar o castelo.',
          tipo: 'simples',
          aprovacaoCompanheiros: { donal_noye: 15 },
          delta: { flagsAdicionadas: ['noye_aclamado_lider'] },
          nextNodeId: 'j4_a2_noye_assume',
        },
      ],
    },

    // 6. Noye Assume
    j4_a2_noye_assume: {
      id: 'j4_a2_noye_assume',
      titulo: 'O Martelo e o Punho de Donal Noye',
      anoHistorico: '299 d.C.',
      localizacao: 'A Armaria de Castelo Negro',
      regionId: 'castelo_negro',
      fallbackText: `Donal Noye entra no salão comum ainda vestindo seu avental de couro chamuscado, o toco do braço esquerdo bem amarrado no peito e um pesado martelo de ferreiro na mão direita. Seus olhos escuros e severos varrem os homens apavorados.
      
— Escutem todos vocês, bando de ladrões de galinhas e filhos de rameiras! — a voz de Noye retumba como ferro batido na bigorna. — Bowen Marsh está caçando sombras no oeste. Sor Wynton já está com um pé na cova. O Velho Urso está morto na floresta. Mas enquanto eu tiver um braço e vós tiverdes duas pernas, este castelo não será entregue a nenhum selvagem de dentes lascados! Vós sois os homens da Muralha!`,
      internalVoices: [
        {
          atributo: 'comando',
          resultadoPassivo: 'SUCESSO',
          dcPassiva: 9,
          fala: 'A autoridade de Noye não vem de títulos ou sangue nobre; vem do peso inquestionável de sua coragem.',
        },
      ],
      loreContext: {
        fonte: {
          arquivo_md: 'corpus_md/jornada_3_tronos/livro_3_a-tormenta-de-espadas_resumo-completo.md',
          livro: 'A Tormenta de Espadas',
          capitulo: 'Jon VI',
        },
        notaHistorica: 'Âncora: C9, C16, C25. Donal Noye assume o comando prático e prepara as barricadas.',
      },
      escolhas: [
        {
          id: 'esc_j4_a2_bater_peito_apoiar_noye',
          texto: 'Bater a lâmina no broquel e gritar em aprovação: «Pela Patrulha! Mandai, ferreiro!»',
          tipo: 'simples',
          aprovacaoCompanheiros: { donal_noye: 20 },
          delta: { flagsAdicionadas: ['lealdade_a_noye'], compostura: 1 },
          nextNodeId: 'j4_a2_tratamento_de_jon',
        },
        {
          id: 'esc_j4_a2_perguntar_plano_tatico',
          texto: 'Interrogar Noye com calma sobre como distribuir os quarenta irmãos entre as três torres.',
          tipo: 'teste_atributo',
          atributo: 'comando',
          dc: 9,
          onSuccessNodeId: 'j4_a2_tratamento_de_jon',
          onPartialFailureNodeId: 'j4_a2_tratamento_de_jon',
          delta: { flagsAdicionadas: ['compreensao_tatica_defesa'] },
        },
      ],
    },

    // 7. O Tratamento de Jon Snow
    j4_a2_tratamento_de_jon: {
      id: 'j4_a2_tratamento_de_jon',
      titulo: 'Vinho Fervente e Larvas na Enfermaria',
      anoHistorico: '299 d.C.',
      localizacao: 'A Enfermaria Sob a Torre do Meistre',
      regionId: 'castelo_negro',
      fallbackText: `O cheiro de vinagre azedo e carne chamuscada impregna a enfermaria. Jon Snow morde um pedaço de couro enquanto Meistre Aemon, com mãos enrugadas mas surpreendentemente firmes, derrama vinho fervente para limpar o rastro da flecha em sua coxa.
      
— O ferro e o calor doem agora, rapaz — diz o velho meistre suavemente —, mas impedem que a podridão roube vossa perna.
      
Jon abre os olhos cheios de dor e olha para vós:
— Styr é cruel. Ele corta as orelhas dos batedores. Eles marcharão pela Vila Toupeira antes de nos atacarem aqui. Se os aldeões não forem avisados, serão massacrados como ovelhas no curral.`,
      internalVoices: [
        {
          atributo: 'cortesia',
          resultadoPassivo: 'SUCESSO',
          dcPassiva: 9,
          fala: 'A dor não cega o senso de dever de Jon com os fracos. Ajudar a segurá-lo durante o curativo sela um laço de irmandade.',
        },
      ],
      loreContext: {
        fonte: {
          arquivo_md: 'corpus_md/jornada_3_tronos/livro_3_a-tormenta-de-espadas_resumo-completo.md',
          livro: 'A Tormenta de Espadas',
          capitulo: 'Jon VI',
        },
        notaHistorica: 'Âncora: C10, C12. O tratamento da perna flechada de Jon por Meistre Aemon e o aviso sobre a Vila Toupeira.',
      },
      escolhas: [
        {
          id: 'esc_j4_a2_ajudar_aemon_curativo',
          texto: 'Segurar os ombros de Jon firmemente e passar o linho com ungüento a Meistre Aemon.',
          tipo: 'simples',
          aprovacaoCompanheiros: { jon_snow: 15, aemon: 15 },
          delta: { flagsAdicionadas: ['cuidou_de_jon'], compostura: 1 },
          nextNodeId: 'j4_a2_os_soldados_de_palha',
        },
        {
          id: 'esc_j4_a2_cavalgar_vila_toupeira_aviso',
          texto: 'Oferecer-se para cavalgar imediatamente a Vila Toupeira para alertar os moradores.',
          tipo: 'teste_atributo',
          atributo: 'furia',
          dc: 9,
          onSuccessNodeId: 'j4_a2_refugiados_da_vila',
          onPartialFailureNodeId: 'j4_a2_refugiados_da_vila',
          delta: { flagsAdicionadas: ['batedor_da_vila_toupeira'] },
        },
      ],
    },

    // 8. Os Soldados de Palha
    j4_a2_os_soldados_de_palha: {
      id: 'j4_a2_os_soldados_de_palha',
      titulo: 'Os Sentinelas de Palha nos Parapeitos',
      anoHistorico: '299 d.C.',
      localizacao: 'Parapeitos de Castelo Negro',
      regionId: 'castelo_negro',
      fallbackText: `Nos parapeitos voltados para a floresta e para o sul, uma ideia engenhosa de Meistre Aemon toma forma sob vossas mãos. Quarenta homens não conseguem guarnecer um terço dos postos de observação; portanto, sacos velhos de estopa e feixes de palha seca são enfiados dentro de mantos negros rasgados e armaduras velhas de couro.
      
Pyp coloca um elmo de ferro torto sobre a cabeça de um dos bonecos de palha e desenha um bigode torto com carvão:
— Este aqui é Sor Eddison Tollett — ri Pyp com seu humor azedo. — Olhem a cara de desgosto dele com o vento! Pelo menos este Edd não reclama da sopa!`,
      internalVoices: [
        {
          atributo: 'astucia',
          resultadoPassivo: 'SUCESSO',
          dcPassiva: 8,
          fala: 'À distância e na penumbra da nevasca, cem lanças de palha parecerão uma guarnição inteira pronta para o combate.',
        },
      ],
      loreContext: {
        fonte: {
          arquivo_md: 'corpus_md/jornada_3_tronos/livro_3_a-tormenta-de-espadas_resumo-completo.md',
          livro: 'A Tormenta de Espadas',
          capitulo: 'Jon VI',
        },
        notaHistorica: 'Âncora: C11. Meistre Aemon propõe os bonecos de palha em mantos negros; Pyp batiza um de Edd.',
      },
      escolhas: [
        {
          id: 'esc_j4_a2_batizar_sentinela_edd',
          texto: 'Ajudar Pyp a fixar o elmo no boneco de palha «Edd» e rir da bravura dos desesperados.',
          tipo: 'simples',
          aprovacaoCompanheiros: { pyp: 20 },
          delta: { flagsAdicionadas: ['ea_sentinela_edd', 'moral_elevada_palha'], compostura: 1 },
          nextNodeId: 'j4_a2_refugiados_da_vila',
        },
        {
          id: 'esc_j4_a2_posicionar_arcos_palha',
          texto: 'Amarrar arcos velhos e lanças de treino nos bonecos para enganar os batedores inimigos.',
          tipo: 'teste_atributo',
          atributo: 'astucia',
          dc: 8,
          onSuccessNodeId: 'j4_a2_refugiados_da_vila',
          onPartialFailureNodeId: 'j4_a2_refugiados_da_vila',
          delta: { flagsAdicionadas: ['bonecos_bem_armados'] },
        },
      ],
    },

    // 9. Os Refugiados da Vila Toupeira
    j4_a2_refugiados_da_vila: {
      id: 'j4_a2_refugiados_da_vila',
      titulo: 'A Coluna de Refugiados da Vila Toupeira',
      anoHistorico: '299 d.C.',
      localizacao: 'Estrada do Rei ao Sul de Castelo Negro',
      regionId: 'vila_toupeira',
      fallbackText: `Pela estrada lamacenta que sobe da Vila Toupeira, três quartos da população subterrânea chegam correndo com o pavor estampado nas feições. Mineiros cobertos de fuligem, meretrizes do bordel da lanterna vermelha, lavradores velhos e crianças de colo carregam fardos e panelas de ferro.
      
— Os Thenns já queimaram a taverna de cima! — grita um homem com a barba arrancada. — Eles usam escamas de bronze e bebem o sangue dos prisioneiros!
      
No pátio, Donal Noye olha para a turba faminta. São mais bocas para alimentar, mas também são braços para puxar alavancas, apagar incêndios e carregar pedras.`,
      internalVoices: [
        {
          atributo: 'cortesia',
          resultadoPassivo: 'SUCESSO',
          dcPassiva: 9,
          fala: 'Acolher essa gente com dignidade dará a eles coragem para lutar lado a lado com a Patrulha.',
        },
        {
          atributo: 'comando',
          resultadoPassivo: 'SUCESSO',
          dcPassiva: 10,
          fala: 'O pânico é mais perigoso que flechas. Trancar os civis nas adegas e colocar os homens válidos na linha de trabalho.',
        },
      ],
      loreContext: {
        fonte: {
          arquivo_md: 'corpus_md/jornada_3_tronos/livro_3_a-tormenta-de-espadas_resumo-completo.md',
          livro: 'A Tormenta de Espadas',
          capitulo: 'Jon VI',
        },
        notaHistorica: 'Âncora: C10. A população da Vila Toupeira busca abrigo em Castelo Negro.',
      },
      escolhas: [
        {
          id: 'esc_j4_a2_organizar_trabalho_refugiados',
          texto: 'Organizar os mineradores e moradores em brigadas de transporte de pedras e água para o alto do Muro.',
          tipo: 'teste_atributo',
          atributo: 'comando',
          dc: 10,
          onSuccessNodeId: 'j4_a2_distribuicao_da_breu',
          onPartialFailureNodeId: 'j4_a2_distribuicao_da_breu',
          delta: { flagsAdicionadas: ['refugiados_organizados_trabalho'], honra: 1 },
        },
        {
          id: 'esc_j4_a2_abrigar_mulheres_criancas_adega',
          texto: 'Conduzir as mulheres e crianças para as adegas protegidas sob a Torre do Rei com caldos quentes.',
          tipo: 'simples',
          delta: { flagsAdicionadas: ['civis_protegidos_adega'], compostura: 1 },
          nextNodeId: 'j4_a2_distribuicao_da_breu',
        },
      ],
    },

    // 10. Distribuição de Pez e Pedras
    j4_a2_distribuicao_da_breu: {
      id: 'j4_a2_distribuicao_da_breu',
      titulo: 'Barris de Piche e Cascalho nos Guinchos',
      anoHistorico: '299 d.C.',
      localizacao: 'A Base do Guincho da Muralha',
      regionId: 'castelo_negro',
      fallbackText: `As correntes de ferro do guincho rangem dolorosamente sob o peso de cada carga. Vós trabalhais na plataforma da cesta, içando barris de pez, caldeirões de óleo de lamparina e caixotes abarrotados de pedregulhos e cascalho britado.
      
Lá em cima, a setecentos pés de altura, o vento da floresta ruge como uma fera enjaulada. Se os Thenns tentarem invadir os recintos ou incendiar os telhados de carvalho de Castelo Negro, a chuva de óleo ardente e pedras jogadas das alturas será nossa defesa mais mortífera.`,
      internalVoices: [
        {
          atributo: 'astucia',
          resultadoPassivo: 'SUCESSO',
          dcPassiva: 9,
          fala: 'Piche queima até sob chuva gelada. Deixar três tachos no parapeito sul e o restante guardado junto ao guincho.',
        },
      ],
      loreContext: {
        fonte: {
          arquivo_md: 'corpus_md/jornada_3_tronos/livro_3_a-tormenta-de-espadas_resumo-completo.md',
          livro: 'A Tormenta de Espadas',
          capitulo: 'Jon VII',
        },
        notaHistorica: 'Âncora: C13, C17. Preparação de barris de piche e pedra britada para a defesa contra os thenns.',
      },
      escolhas: [
        {
          id: 'esc_j4_a2_reforcar_polias_guincho',
          texto: 'Supervisionar as cordas e engrenagens do guincho para garantir que a cesta não despenque no gelo.',
          tipo: 'teste_atributo',
          atributo: 'astucia',
          dc: 9,
          onSuccessNodeId: 'j4_a2_armadilha_da_escada',
          onPartialFailureNodeId: 'j4_a2_armadilha_da_escada',
          delta: { flagsAdicionadas: ['guincho_reforcado'] },
        },
        {
          id: 'esc_j4_a2_subir_barris_braco',
          texto: 'Usar a própria força para carregar os caldeirões de piche aos degraus inferiores da escadaria.',
          tipo: 'simples',
          delta: { sangue: -1, compostura: 1 },
          nextNodeId: 'j4_a2_armadilha_da_escada',
        },
      ],
    },

    // 11. Armadilha da Escadaria
    j4_a2_armadilha_da_escada: {
      id: 'j4_a2_armadilha_da_escada',
      titulo: 'O Óleo na Escadaria de Madeira',
      anoHistorico: '299 d.C.',
      localizacao: 'A Grande Escadaria de Madeira',
      regionId: 'castelo_negro',
      fallbackText: `A imensa escadaria de madeira serpenteia em zigue-zague contra a parede colossal de gelo, sustentada por vigas brutas fincadas nas fendas da Muralha. Donal Noye sobe alguns lances e bate com o martelo em uma das traves mestras.
      
— Se eles romperem os muros do pátio e tentarem subir até o topo, estamos mortos — diz Noye entre dentes. — Vamos ensopar as vigas dos primeiros cinquenta pés com aguarrás, breu e óleo de baleia. Quando eu der a ordem, nós lançamos tochas sobre a escada e deixamos o fogo engolir tudo. Queimamos a nossa própria escada se for preciso!`,
      internalVoices: [
        {
          atributo: 'pressagio',
          resultadoPassivo: 'SUCESSO',
          dcPassiva: 10,
          fala: 'Sem a escada, quem estiver no topo ficará ilhado com a cesta; quem estiver no chão estará preso com os machados de bronze.',
        },
      ],
      loreContext: {
        fonte: {
          arquivo_md: 'corpus_md/jornada_3_tronos/livro_3_a-tormenta-de-espadas_resumo-completo.md',
          livro: 'A Tormenta de Espadas',
          capitulo: 'Jon VII',
        },
        notaHistorica: 'Âncora: C13. A queima deliberada da grande escadaria de madeira para barrar os Thenns.',
      },
      escolhas: [
        {
          id: 'esc_j4_a2_ensopar_degraus_piche',
          texto: 'Derramar os baldes de óleo e piche nas traves inferiores conforme as ordens de Noye.',
          tipo: 'simples',
          aprovacaoCompanheiros: { donal_noye: 15 },
          delta: { flagsAdicionadas: ['escadaria_preparada_queima'] },
          nextNodeId: 'j4_a2_os_postos_de_noye',
        },
        {
          id: 'esc_j4_a2_preparar_pavio_tochas',
          texto: 'Construir pavios de tecido empapado em terebintina para acendimento instantâneo sob o arco.',
          tipo: 'teste_atributo',
          atributo: 'astucia',
          dc: 9,
          onSuccessNodeId: 'j4_a2_os_postos_de_noye',
          onPartialFailureNodeId: 'j4_a2_os_postos_de_noye',
          delta: { flagsAdicionadas: ['pavios_incendio_preparados'] },
        },
      ],
    },

    // 12. Os Postos de Noye
    j4_a2_os_postos_de_noye: {
      id: 'j4_a2_os_postos_de_noye',
      titulo: 'A Escolha do Posto de Batalha',
      anoHistorico: '299 d.C.',
      localizacao: 'O Pátio dos Exercícios',
      regionId: 'castelo_negro',
      fallbackText: `A noite aproxima-se veloz, trazendo um céu cor de ferro fundido. Donal Noye finca uma espada bastarda na mesa do pátio e distribui as responsabilidades finais entre os poucos defensores.
      
— Chegou a hora de cada homem escolher onde vai derramar o sangue — diz Noye, encarando-vos nos olhos. — Preciso de arqueiros no topo da Muralha para ver o mundo queimar de cima; preciso de machados no pátio da escada para atrair a carga de Styr; e preciso de vigias no portão para impedir que o pânico tome o túnel. Onde vos colocais, irmão?`,
      internalVoices: [
        {
          atributo: 'comando',
          resultadoPassivo: 'SUCESSO',
          dcPassiva: 9,
          fala: 'O posto que escolherdes determinará vossa sobrevivência e o rumo do primeiro choque contra os Thenns.',
        },
      ],
      loreContext: {
        fonte: {
          arquivo_md: 'corpus_md/jornada_3_tronos/livro_3_a-tormenta-de-espadas_resumo-completo.md',
          livro: 'A Tormenta de Espadas',
          capitulo: 'Jon VII',
        },
        notaHistorica: 'Âncora: C12, C13, C16. Distribuição dos postos táticos de Castelo Negro.',
      },
      escolhas: [
        {
          id: 'esc_j4_a2_escolher_posto_topo',
          texto: 'Subir ao Topo da Muralha com Jon Snow e os arqueiros para disparar flechas de pez lá de cima.',
          tipo: 'simples',
          aprovacaoCompanheiros: { jon_snow: 20 },
          delta: { flagsAdicionadas: ['posto_topo'], compostura: 1 },
          nextNodeId: 'j4_a2_vigilia_da_meia_noite',
        },
        {
          id: 'esc_j4_a2_escolher_posto_escada',
          texto: 'Ficar no solo junto a Donal Noye e aos barris de piche para defender a base da escadaria.',
          tipo: 'simples',
          aprovacaoCompanheiros: { donal_noye: 25 },
          delta: { flagsAdicionadas: ['posto_escada'], sangue: 1 },
          nextNodeId: 'j4_a2_vigilia_da_meia_noite',
        },
        {
          id: 'esc_j4_a2_escolher_posto_portao',
          texto: 'Permanecer na boca do túnel e dos portões de ferro para proteger a entrada interna.',
          tipo: 'simples',
          delta: { flagsAdicionadas: ['posto_portao'], honra: 1 },
          nextNodeId: 'j4_a2_vigilia_da_meia_noite',
        },
      ],
    },

    // 13. Vigília da Meia-Noite
    j4_a2_vigilia_da_meia_noite: {
      id: 'j4_a2_vigilia_da_meia_noite',
      titulo: 'O Silêncio da Meia-Noite e o Uivo no Sul',
      anoHistorico: '299 d.C.',
      localizacao: 'Castelo Negro sob a Noite',
      regionId: 'castelo_negro',
      fallbackText: `Todas as tochas e lanternas foram abafadas. Na escuridão completa, apenas o vapor das respirações quentes ferve contra a lâmina gélida do ar. As sentinelas de palha balançam imóveis nos parapeitos; ao lado de vós, o ferro das flechas e das lanças parece grudado na carne dormente das mãos.
      
De repente, do labirinto escuro dos bosques da Dádiva ao sul, um grito gutural estilhaça a noite. Uivos humanos misturados a pancadas brutais de machados de bronze contra escudos de couro: os Thenns chegaram!`,
      internalVoices: [
        {
          atributo: 'pressagio',
          resultadoPassivo: 'SUCESSO',
          dcPassiva: 9,
          fala: 'O choque é iminente. O medo aperta o estômago, mas as chamas que preparamos serão nossa redenção.',
        },
      ],
      loreContext: {
        fonte: {
          arquivo_md: 'corpus_md/jornada_3_tronos/livro_3_a-tormenta-de-espadas_resumo-completo.md',
          livro: 'A Tormenta de Espadas',
          capitulo: 'Jon VII',
        },
        notaHistorica: 'Âncora: C12. O ataque noturno dos Thenns a Castelo Negro.',
      },
      escolhas: [
        {
          id: 'esc_j4_a2_avancar_ato3_combate',
          texto: 'Erguer o escudo, desembainhar a espada e encarar a tempestade de fogo e bronze (Avançar para o Ato III).',
          tipo: 'simples',
          delta: { marcoConcluido: 'ato2_concluido' },
          nextNodeId: 'j4_a3_a_noite_cai',
        },
      ],
    },
  },
};
