import { GrafoJornada } from '@/server/engine/storyLinter';

export const JORNADA_V2_FIXTURE: GrafoJornada = {
  id: 'jornada_teste_v2',
  titulo: 'A Provação do Conselho e do Portão',
  startNodeId: 'hub_conselho_pedra',
  nodes: {
    hub_conselho_pedra: {
      id: 'hub_conselho_pedra',
      titulo: 'O Conselho do Pico da Pedra',
      tipo: 'hub',
      regionId: 'regiao_norte',
      loreContext: {
        fonte: {
          arquivo_md: 'livro_as_tormenta_de_espadas.md',
          livro: 'A Tormenta de Espadas',
          capitulo: 'Jon I',
        },
        origem: 'canonica',
      },
      fallbackText: 'Os capitães e emissários aguardam reunidos ao redor da mesa de pedra sob a tempestade.',
      blocos: [
        {
          texto: 'A chuva fustiga as tendas cinzentas no sopé da colina.',
          funcao: 'abertura',
        },
        {
          texto: 'A mesa de pedra está cercada por guerreiros de rostos sombrios.',
          funcao: 'corpo',
        },
      ],
      escolhas: [
        {
          id: 'topico_estrategia',
          tipo: 'simples',
          texto: 'Perguntar sobre as patrulhas e a estratégia da colina.',
          nextNodeId: 'hub_conselho_pedra',
          permanece: true,
          unica: true,
          tom: 'honesto',
          desfecho: {
            ponte: 'O meistre aponta no mapa as passagens do desfiladeiro e alerta sobre batedores na névoa.',
            marcas: ['marca_ouviu_estrategia'],
          },
        },
        {
          id: 'topico_suprimentos',
          tipo: 'simples',
          texto: 'Investigar o estado das provisões e rações de trigo.',
          nextNodeId: 'hub_conselho_pedra',
          permanece: true,
          unica: true,
          tom: 'diplomatico',
          desfecho: {
            ponte: 'O intendente suspira e admite que as carretas estão presas na lama a três léguas.',
            marcas: ['marca_verificou_provisoes'],
          },
        },
        {
          id: 'topico_traidores',
          tipo: 'simples',
          texto: 'Questionar os boatos sobre espiões no acampamento.',
          nextNodeId: 'hub_conselho_pedra',
          permanece: true,
          unica: true,
          tom: 'silencio',
          desfecho: {
            ponte: 'Olhares tensos cruzam a mesa, confirmando que a desconfiança corrói os homens.',
            marcas: ['marca_alerta_espioes'],
          },
        },
        {
          id: 'saida_marchar_portao',
          tipo: 'simples',
          texto: 'Encerrar as deliberações e marchar rumo ao portão da fortaleza.',
          nextNodeId: 'dialogo_portao',
          permanece: false,
          tom: 'honesto',
          desfecho: {
            ponte: 'Você deixa a tenda do conselho e caminha sob a tempestade até o fosso do castelo.',
            destino: 'dialogo_portao',
          },
        },
      ],
    },
    dialogo_portao: {
      id: 'dialogo_portao',
      titulo: 'O Portão de Carvalho e Ferro',
      tipo: 'dialogo',
      regionId: 'regiao_norte',
      loreContext: {
        fonte: {
          arquivo_md: 'livro_as_tormenta_de_espadas.md',
          livro: 'A Tormenta de Espadas',
          capitulo: 'Jon II',
        },
        origem: 'canonica',
      },
      fallbackText: 'O capitão da guarda observa do topo do passadiço com a mão na empunhadura da espada.',
      interlocutores: [
        {
          id: 'guarda_portao',
          nome: 'Ser Willem',
          papel: 'Capitão da Guarda da Muralha',
        },
      ],
      falas: [
        {
          quem: 'guarda_portao',
          texto: 'Quem se aproxima sob o aguaceiro?',
        },
        {
          quem: 'protagonista',
          texto: 'Trago a palavra formal do Conselho e conheço a rota das patrulhas.',
          quando: {
            flagsTodas: ['marca_ouviu_estrategia'],
          },
        },
        {
          quem: 'protagonista',
          texto: 'Apenas alguém que deseja cruzar a soleira antes que a noite caia.',
          quando: {
            flagsNenhuma: ['marca_ouviu_estrategia'],
          },
        },
      ],
      escolhas: [
        {
          id: 'escolha_diplomatica',
          tipo: 'simples',
          texto: 'Apresentar as credenciais da Cidadela com reverência.',
          nextNodeId: 'cena_final_v2',
          tom: 'diplomatico',
          desfecho: {
            ponte: 'Ser Willem reconhece o selo escarlate e ordena aos vigias que ergam a grade de ferro.',
            destino: 'cena_final_v2',
            marcas: ['marca_diplomacia'],
          },
        },
        {
          id: 'escolha_ameaca',
          tipo: 'teste_atributo',
          texto: 'Rugir contra a muralha e exigir passagem imediata sob ameaça.',
          atributo: 'furia',
          dc: 10,
          onSuccessNodeId: 'cena_final_v2',
          onPartialFailureNodeId: 'cena_final_v2',
          tom: 'ameaca',
          desfechos: {
            sucesso: {
              ponte: 'O seu brado ecoa pelas pedras cinzentas e o capitão empalidece, cedendo à sua vontade.',
              destino: 'cena_final_v2',
              marcas: ['marca_intimidou'],
            },
            parcial: {
              ponte: 'Ser Willem cospe de lado e resmunga insultos velados, mas destranca a poterna para evitar derramamento de sangue.',
              destino: 'cena_final_v2',
              marcas: ['marca_hesitacao'],
            },
            falha: {
              ponte: 'Os besteiros apontam das seteiras; você é rechaçado pela lama e obrigado a contornar o fosso às escondidas.',
              destino: 'cena_final_v2',
              marcas: ['marca_rechacado'],
            },
          },
        },
      ],
    },
    cena_final_v2: {
      id: 'cena_final_v2',
      titulo: 'O Grande Salão de Pedra',
      tipo: 'peca_de_cenario',
      isEnding: true,
      regionId: 'regiao_norte',
      loreContext: {
        fonte: {
          arquivo_md: 'livro_as_tormenta_de_espadas.md',
          livro: 'A Tormenta de Espadas',
          capitulo: 'Jon III',
        },
        origem: 'canonica',
      },
      fallbackText: 'O salão de pedra acolhe os viajantes ao redor das lareiras acesas.',
      escolhas: [],
      blocos: [
        {
          texto: 'O fogo crepita nas lareiras de pedra bruta e o cheiro de pinho queima no ar.',
          funcao: 'abertura',
        },
        {
          texto: 'Os lordes o recebem como um nobre negociador cuja prudência preservou vidas.',
          quando: {
            flagsTodas: ['marca_diplomacia'],
          },
          funcao: 'corpo',
        },
        {
          texto: 'Um murmúrio receoso percorre os bancos: ninguém ousa encará-lo após a fúria no portão.',
          quando: {
            flagsTodas: ['marca_intimidou'],
          },
          funcao: 'corpo',
        },
        {
          texto: 'Os celeiros bem guarnecidos garantem que o castelo suportará o inverno.',
          quando: {
            flagsTodas: ['marca_verificou_provisoes'],
          },
          funcao: 'corpo',
        },
        {
          texto: 'Sentinelas extras vigiam as ameias após o alerta de traição.',
          quando: {
            flagsTodas: ['marca_alerta_espioes'],
          },
          funcao: 'corpo',
        },
        {
          texto: 'A hesitação de Ser Willem no portão abalou a confiança dos homens.',
          quando: {
            flagsTodas: ['marca_hesitacao'],
          },
          funcao: 'corpo',
        },
        {
          texto: 'As feridas da refrega no fosso ainda ardem sob a cota de malha.',
          quando: {
            flagsTodas: ['marca_rechacado'],
          },
          funcao: 'corpo',
        },
        {
          texto: 'Você se senta à cabeceira enquanto a tempestade ruge do lado de fora.',
          funcao: 'fecho',
        },
      ],
    },
  },
};
