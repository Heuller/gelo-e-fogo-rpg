import 'server-only';
import { GrafoJornada } from '@/server/engine/storyLinter';

export const grafoJ4Ato3V2: GrafoJornada = {
  id: 'jornada_4_muralha_ato3_v2',
  titulo: 'Ato III: A Batalha por Castelo Negro & O Portão de Gelo',
  startNodeId: 'j4_a3_preparativos_barricadas',
  nodes: {
    // =========================================================================
    // ETAPA 1: ABERTURA (2 CENAS)
    // =========================================================================

    // 1. Os Preparativos das Barricadas
    j4_a3_preparativos_barricadas: {
      id: 'j4_a3_preparativos_barricadas',
      titulo: 'Carroças de Carvalho e Piche Fervente',
      anoHistorico: '300 d.C.',
      localizacao: 'Pátio Sul de Castelo Negro',
      regionId: 'castelo_negro',
      tipo: 'narracao',
      rota: 'comum',
      pov: 'Irmão Sem Nome',
      origem: 'canonica',
      loreContext: {
        fonte: {
          livro: 'A Tormenta de Espadas',
          capitulo: 'Jon VII',
          arquivo_md: 'asos_samwell_3.md',
        },
      },
      epigrafe: {
        texto: 'Um castelo sem muros é apenas uma armadilha de madeira, a menos que os homens que o guardam se tornem a própria pedra.',
        autor: 'Donal Noye, Ferreiro e Comandante Provisório de Castelo Negro',
      },
      fallbackText: `O som de martelos golpeando ferro e pregos ecoa freneticamente pela noite escura de Castelo Negro. Sem fossos nem muralhas de pedra voltadas para o sul, a guarnição transforma o pátio aberto em um labirinto mortal de barricadas improvisadas: carroças viradas de lado, esteiras entrelaçadas com estacas pontiagudas e fardos de feno empapados em óleo negro.

Donal Noye, o ferreiro veterano com a manga vazia amarrada ao peito, manca de um lado para o outro ladra ordens como um general de cerco. «Se esses selvagens romperem a linha das estrebarias, estarão na enfermaria e na armaria antes da meia-noite! Tragam mais dois barris de piche para a boca da trincheira!», brada Noye com a autoridade de quem forjou armas em Ponta Tempestade para reis de Westeros.`,
      blocos: [
        {
          funcao: 'abertura',
          texto: `O som de martelos golpeando ferro ecoa freneticamente pela noite escura de Castelo Negro. Sem fossos nem muralhas voltadas para o sul, a guarnição transforma o pátio em um labirinto mortal de barricadas de madeira e estacas.`,
        },
        {
          funcao: 'corpo',
          quando: { flagsTodas: ['alerta_de_jon_snow'] },
          texto: `Graças às marcações deixadas por Jon Snow no pergaminho, os patrulheiros conseguiram posicionar as trincheiras de piche exatamente nos pontos onde a Estrada do Rei afunila entre as árvores.`,
        },
        {
          funcao: 'corpo',
          quando: { flagsTodas: ['alarme_sul_soado'] },
          texto: `Os cozinheiros e intendentes já estão todos em seus postos com balestras e lanças de caça, despertos horas antes pela trompa de aviso.`,
        },
        {
          funcao: 'fecho',
          texto: `O cheiro acre de piche verde queima os olhos. Restam poucos minutos antes que as tochas dos Thenns iluminem a borda da mata.`,
        },
      ],
      vozesConflito: [
        {
          voz1: 'comando',
          voz2: 'astucia',
          fala1: 'Organize os homens de escudo na linha de frente! O impacto tem que ser contido nas carroças ou seremos esmagados!',
          fala2: 'Piche e flechas de fogo das janelas altas! Deixe os selvagens entrarem no pátio e incendeie a armadilha por trás deles!',
        },
      ],
      internalVoices: [
        {
          atributo: 'pressagio',
          resultadoPassivo: 'SUCESSO',
          dcPassiva: 8,
          fala: 'O vento vem do sul trazendo o cheiro de pinho queimado. O bronze dos Thenns é afiado, mas eles nunca enfrentaram um cerco armado por Donal Noye.',
        },
      ],
      escolhas: [
        {
          id: 'j4_a3_c1_reforcar_barricada_sul',
          tipo: 'teste_atributo',
          texto: 'Ajudar a calçar as rodas das carroças e fincar estacas de carvalho na trincheira central',
          atributo: 'furia',
          dc: 8,
          tom: 'violencia',
          circunstancias: [
            {
              tipo: 'vantagem',
              motivo: 'O trabalho conjunto com os homens da forja duplica a firmeza da armadilha.',
            },
          ],
          desfechos: {
            sucesso: {
              ponte: 'Com golpes pesados de marreta, você crava três estacas grossas na lama congelada e calça os eixos das carroças com pedras de amolar. A barreira fica sólida como uma muralha de campo.',
              destino: 'j4_a3_hub_conselho_da_noite',
              marcas: ['barricada_sul_reforcada', 'piche_preparado'],
              delta: { honra: 1, compostura: 1 },
            },
            parcial: {
              ponte: 'A madeira estilhaça ao entrar na laje congelada, mas você amarra cordas grossas aos eixos, garantindo que o obstáculo aguente o primeiro impacto da carga.',
              destino: 'j4_a3_hub_conselho_da_noite',
              marcas: ['barricada_sul_reforcada'],
              delta: { sangue: -1 },
            },
            falha: {
              ponte: 'Uma estaca solta machuca a sua mão dormente e o barro cede sob o peso da carroça. É preciso reforçar o calço às pressas antes da chegada dos inimigos.',
              destino: 'j4_a3_hub_conselho_da_noite',
              marcas: ['barricada_sul_reforcada'],
              delta: { sangue: -2, compostura: -1 },
            },
          },
          onSuccessNodeId: 'j4_a3_hub_conselho_da_noite',
          onPartialFailureNodeId: 'j4_a3_hub_conselho_da_noite',
        },
        {
          id: 'j4_a3_c1_preparar_piche_torres',
          tipo: 'teste_atributo',
          texto: 'Içar caldeirões de piche borbulhante e feixes de flechas incendiárias para o telhado do arsenal',
          atributo: 'astucia',
          dc: 8,
          tom: 'honesto',
          desfechos: {
            sucesso: {
              ponte: 'Com cabos e roldanas bem untadas, você sobe dois caldeirões de óleo fervente e dezenas de flechas emplumadas para as sacadas altas. Os arqueiros terão fogo pronto para iluminar a escuridão.',
              destino: 'j4_a3_hub_conselho_da_noite',
              marcas: ['piche_preparado'],
              delta: { compostura: 1, honra: 1 },
            },
            parcial: {
              ponte: 'O óleo quente espirra na sua manga de couro ao alcançar o parapeito. Você suporta a queimadura sem soltar a corda, garantindo a munição necessária.',
              destino: 'j4_a3_hub_conselho_da_noite',
              marcas: ['piche_preparado'],
              delta: { sangue: -1 },
            },
            falha: {
              ponte: 'Um dos baldes de resina derrama sobre o cascalho do pátio, perdendo parte do combustível antes que a linha de defesa seja armada.',
              destino: 'j4_a3_hub_conselho_da_noite',
              marcas: ['piche_preparado'],
              delta: { compostura: -2 },
            },
          },
          onSuccessNodeId: 'j4_a3_hub_conselho_da_noite',
          onPartialFailureNodeId: 'j4_a3_hub_conselho_da_noite',
        },
      ],
    },

    // 2. Hub de Diálogo: O Conselho da Forja
    j4_a3_hub_conselho_da_noite: {
      id: 'j4_a3_hub_conselho_da_noite',
      titulo: 'O Martelo e o Livro sob a Lareira',
      anoHistorico: '300 d.C.',
      localizacao: 'Forja Central de Castelo Negro',
      regionId: 'castelo_negro',
      tipo: 'hub',
      rota: 'comum',
      pov: 'Irmão Sem Nome',
      origem: 'canonica',
      loreContext: {
        fonte: {
          livro: 'A Tormenta de Espadas',
          capitulo: 'Jon VII',
          arquivo_md: 'asos_samwell_3.md',
        },
      },
      fallbackText: `A forja de Donal Noye é o coração ardente do castelo antes da batalha. Chamas vermelhas iluminam as paredes repletas de espadas longas afiadas, pontas de flecha de caça e alabardas restauradas. Jon Snow permanece sentado sobre uma caixa de ferramentas, a perna enfaixada estendida e a mão no punho de Garralonga, enquanto Meistre Aemon murmura palavras serenas de encorajamento para os intendentes mais jovens que tremem de frio e medo.`,
      blocos: [
        {
          funcao: 'abertura',
          texto: `A forja de Donal Noye é o coração ardente do castelo antes da batalha. Chamas vermelhas iluminam as espadas recém-afiadas e os rostos tensos dos defensores.`,
        },
        {
          funcao: 'corpo',
          quando: { flagsTodas: ['veterano_do_motim'] },
          texto: `Donal Noye olha para você com aceno firme de respeito: «Quem sobreviveu ao Punho dos Primeiros Homens e à loucura de Craster não vai se curvar para invasores de machado tosco.»`,
        },
        {
          funcao: 'fecho',
          texto: `Os líderes de setor estão a postos. Você precisa escolher onde seu braço fará a diferença quando o grito de guerra dos selvagens soar além das árvores.`,
        },
      ],
      interlocutores: [
        { id: 'donal_noye', nome: 'Donal Noye', papel: 'Ferreiro e Comandante Provisório' },
        { id: 'jon_snow', nome: 'Jon Snow', papel: 'Patrulheiro e Defensor da Torre' },
        { id: 'meistre_aemon', nome: 'Meistre Aemon', papel: 'Meistre Ancião de Castelo Negro' },
      ],
      reacoes: [
        {
          companheiro: 'grenn',
          condicao: { flagsTodas: ['aliado_grenn'] },
          fala: 'Onde você estiver, irmão, minha espada estará ao seu lado. Vamos mostrar a esses selvagens o preço da Muralha.',
        },
      ],
      escolhas: [
        {
          id: 'j4_a3_hub_conselho_donal_noye',
          tipo: 'simples',
          texto: 'Alinhar a tática de chão com Donal Noye e reforçar a parede de escudos do pátio',
          tom: 'honesto',
          unica: true,
          permanece: true,
          desfecho: {
            ponte: 'Donal Noye cospe no chão de terra batida: «No chão, rapaz, a luta é feia e sem glória. Vamos deixar os Thenns baterem na madeira das carroças até cansarem os braços; depois abrimos as gargantas deles com estocadas curtas.»',
            marcas: ['confianca_donal_noye'],
            delta: { honra: 1 },
          },
          nextNodeId: 'j4_a3_hub_conselho_da_noite',
        },
        {
          id: 'j4_a3_hub_conselho_jon_snow',
          tipo: 'simples',
          texto: 'Conversar com Jon Snow sobre os pontos cegos dos guerreiros Thenn e as escadas da torre',
          tom: 'diplomatico',
          unica: true,
          permanece: true,
          desfecho: {
            ponte: 'Jon aponta com a adaga no carvão da forja: «Eles são disciplinados como soldados de verdade, mas não conhecem a disposição dos nossos telhados. Das sacadas da Torre de Hardin, podemos cortar os líderes antes que alcancem o arsenal.»',
            marcas: ['estrategia_jon_snow'],
            delta: { compostura: 1 },
          },
          nextNodeId: 'j4_a3_hub_conselho_da_noite',
        },
        {
          id: 'j4_a3_hub_bencao_meistre_aemon',
          tipo: 'simples',
          texto: 'Receber a bênção e as palavras de coragem de Meistre Aemon para os feridos',
          tom: 'devocao',
          unica: true,
          permanece: true,
          desfecho: {
            ponte: 'A mão enrugada e fria de Aemon pousa na sua testa com afeto solene: «A noite é escura, meu jovem irmão, mas o fogo que queima no coração dos jurados jamais se apaga. Lembre-se de quem você é e lute pelo reino dos homens.»',
            marcas: ['bencao_de_aemon'],
            delta: { inspiracao: 1, compostura: 1 },
          },
          nextNodeId: 'j4_a3_hub_conselho_da_noite',
        },
        {
          id: 'j4_a3_hub_assumir_posto_combate',
          tipo: 'simples',
          texto: 'Empunhar as armas e marchar para o posto de combate com o primeiro clamor da vigília [Avançar]',
          tom: 'devocao',
          desfecho: {
            ponte: 'Um grito rouco corta o vento noturno. Entre as copas dos pinheiros ao sul, tochas vermelhas começam a descer a colina em linha cerrada. Os Thenns chegaram.',
            destino: 'j4_a3_o_grito_dos_thenns',
          },
          nextNodeId: 'j4_a3_o_grito_dos_thenns',
        },
      ],
    },

    // =========================================================================
    // ETAPA 2: ENCRUZILHADA (1 CENA)
    // =========================================================================

    j4_a3_o_grito_dos_thenns: {
      id: 'j4_a3_o_grito_dos_thenns',
      titulo: 'O Bronze de Thenn na Estrada do Rei',
      anoHistorico: '300 d.C.',
      localizacao: 'Orla das Árvores ao Sul de Castelo Negro',
      regionId: 'castelo_negro',
      tipo: 'narracao',
      rota: 'comum',
      pov: 'Irmão Sem Nome',
      origem: 'canonica',
      loreContext: {
        fonte: {
          livro: 'A Tormenta de Espadas',
          capitulo: 'Jon VII',
          arquivo_md: 'asos_samwell_3.md',
        },
      },
      fallbackText: `Eles não berram como selvagens desordenados; marcham em silêncio disciplinado sob o som ritmado de lanças de bronze batendo contra escudos redondos. Cem guerreiros de alta estatura, com crânios raspados e couraças de escamas reluzentes, irrompem pela clareira ao sul de Castelo Negro. À frente deles caminha Styr, o Magnar de Thenn, um gigante sem orelhas que empunha um machado de batalha de duas mãos pesado o suficiente para partir um touro em dois.

«Muralha de escudos!», ruge Donal Noye no meio do pátio, travando a linha com Grenn e os veteranos da intendência atrás das carroças tombadas. «Arqueiros, cobrir a linha! Não deixem eles alcançarem as escadarias!», grita Jon Snow do alto da Torre de Hardin, disparando a primeira flecha com ponta de ferro na escuridão. O destino do forte divide-se em dois setores vitais.`,
      blocos: [
        {
          funcao: 'abertura',
          texto: `Cem guerreiros Thenn de bronze reluzente irrompem pela orla do bosque. À frente da massa compacta, o Magnar Styr ergue seu machado descomunal, apontando para o coração desprotegido de Castelo Negro.`,
        },
        {
          funcao: 'corpo',
          quando: { flagsTodas: ['confianca_donal_noye'] },
          texto: `Donal Noye olha diretamente nos seus olhos no meio do pátio, sinalizando para você travar o ombro contra as carroças e segurar a carga com ele.`,
        },
        {
          funcao: 'corpo',
          quando: { flagsTodas: ['estrategia_jon_snow'] },
          texto: `Do parapeito superior, Jon Snow faz sinal com o arco curto: os atiradores precisam de homens firmes nas sacadas para impedir que as escadas da torre sejam incendiadas.`,
        },
        {
          funcao: 'fecho',
          texto: `O impacto da investida é iminente. Onde a sua lâmina e coragem serão postas à prova?`,
        },
      ],
      escolhas: [
        {
          id: 'j4_a3_decisao_patio',
          tipo: 'simples',
          texto: 'Correr para a barricada do pátio e formar a parede de escudos ao lado de Donal Noye',
          tom: 'violencia',
          desfecho: {
            ponte: 'Você finca os calcanhares na lama congelada e encosta o seu escudo de carvalho contra a carroça virada, pronto para receber o impacto das lanças de bronze.',
            destino: 'j4_a3_patio_choque_de_bronze',
            marcas: ['posto_patio_escudos'],
            delta: { honra: 1 },
          },
          nextNodeId: 'j4_a3_patio_choque_de_bronze',
        },
        {
          id: 'j4_a3_decisao_torre',
          tipo: 'simples',
          texto: 'Subir correndo para as sacadas da Torre de Hardin e reforçar a linha de flechas com Jon Snow',
          tom: 'silencio',
          desfecho: {
            ponte: 'Você sobe os degraus de madeira de três em três com o arco curto na mão, posicionando-se ao lado de Jon Snow para dominar o pátio com saraivadas precisas.',
            destino: 'j4_a3_torre_flechas_na_escuridao',
            marcas: ['posto_torre_arqueiros'],
            delta: { compostura: 1 },
          },
          nextNodeId: 'j4_a3_torre_flechas_na_escuridao',
        },
      ],
    },

    // =========================================================================
    // ETAPA 3: ROTAS (6 CENAS: 3 POR ROTA, EXCLUSIVIDADE ≥ 60%)
    // =========================================================================

    // --- ROTA A: A PAREDE DE ESCUDOS DO PÁTIO ---

    // Rota A1: Choque de Bronze no Pátio
    j4_a3_patio_choque_de_bronze: {
      id: 'j4_a3_patio_choque_de_bronze',
      titulo: 'O Trovão do Bronze contra o Carvalho',
      anoHistorico: '300 d.C.',
      localizacao: 'Barricada Central do Pátio Sul',
      regionId: 'castelo_negro',
      tipo: 'narracao',
      rota: 'patio',
      pov: 'Irmão Sem Nome',
      origem: 'original',
      notaHistorica: 'Choque violento de linhas de combate entre guerreiros Thenn e patrulheiros protegendo a entrada dos arsenais.',
      loreContext: {
        fonte: {
          livro: 'A Tormenta de Espadas',
          capitulo: 'Jon VII',
          arquivo_md: 'asos_samwell_3.md',
        },
      },
      fallbackText: `O impacto da carga Thenn atinge a barricada como o colapso de uma montanha. O bronze das lanças estilhaça as tábuas superiores das carroças em uma chuva de lascas pontiagudas. Donal Noye ruge como uma fera enjaulada, golpeando com a espada empunhada na única mão e quebrando o nariz de um invasor que tentava saltar por cima das rodas.

Um guerreiro Thenn musculoso, com tatuagens circulares nas bochechas e um escudo redondo de bronze batido, projeta todo o peso do corpo contra o seu peito. A ponta curta da lança dele busca uma brecha na sua garganta enquanto o barro escorrega sob suas botas.`,
      blocos: [
        {
          funcao: 'abertura',
          texto: `O impacto da carga atinge a barricada com estrépito ensurdecedor. Lanças de bronze estilhaçam a madeira das carroças enquanto os patrulheiros sustentam a pressão na lama congelada.`,
        },
        {
          funcao: 'corpo',
          quando: { flagsTodas: ['barricada_sul_reforcada'] },
          texto: `As estacas profundas cravadas na terra seguram o tranco inicial dos invasores, impedindo que a carroça seja empurrada sobre os defensores.`,
        },
        {
          funcao: 'fecho',
          texto: `Um guerreiro de crânio raspado salta sobre o parapeito e desfere um golpe de espada curta contra o seu ombro esquerdo.`,
        },
      ],
      escolhas: [
        {
          id: 'j4_a3_pa1_golpe_de_escudo_desarme',
          tipo: 'teste_atributo',
          texto: 'Aparar o golpe com a borda do escudo e estocar a espada na axila desprotegida do atacante',
          atributo: 'furia',
          dc: 9,
          tom: 'violencia',
          desfechos: {
            sucesso: {
              ponte: 'A borda de ferro do seu escudo colide contra a têmpora do guerreiro Thenn, quebrando o capacete de bronze. A sua espada entra firme na carne desprotegida e o invasor tomba sobre as estacas.',
              destino: 'j4_a3_patio_duelo_do_magnar',
              marcas: ['parede_de_escudos_firme', 'lamina_quebrada'],
              delta: { honra: 1, compostura: 1 },
            },
            parcial: {
              ponte: 'Você desvia o golpe principal, mas o bronze rasga a carne do seu antebraço antes que o homem seja puxado para trás pela lâmina de Grenn.',
              destino: 'j4_a3_patio_duelo_do_magnar',
              marcas: ['parede_de_escudos_firme'],
              delta: { sangue: -1 },
            },
            falha: {
              ponte: 'O impacto brutal racha a madeira do seu escudo e empurra você de costas na lama. Você é salvo pelo martelo de Donal Noye, que esmaga o atacante a tempo.',
              destino: 'j4_a3_patio_duelo_do_magnar',
              marcas: ['parede_de_escudos_firme'],
              delta: { sangue: -2, compostura: -1 },
            },
          },
          onSuccessNodeId: 'j4_a3_patio_duelo_do_magnar',
          onPartialFailureNodeId: 'j4_a3_patio_duelo_do_magnar',
        },
        {
          id: 'j4_a3_pa1_sustentar_formacao_coletiva',
          tipo: 'teste_atributo',
          texto: 'Cerrar fileiras com Grenn e usar pontas de lança longas para repelir a linha de choque',
          atributo: 'comando',
          dc: 8,
          tom: 'devocao',
          desfechos: {
            sucesso: {
              ponte: 'Sob o seu comando rítmico, os patrulheiros projetam as lanças em uníssono. A barreira de pontas de ferro perfura as couraças de bronze e faz a linha dianteira de Styr recuar atordoada.',
              destino: 'j4_a3_patio_duelo_do_magnar',
              marcas: ['parede_de_escudos_firme'],
              delta: { honra: 2, compostura: 1 },
            },
            parcial: {
              ponte: 'A formação resiste ao tranco, mas duas lanças de freixo partem-se com o peso dos inimigos, forçando o combate corpo a corpo nas brechas.',
              destino: 'j4_a3_patio_duelo_do_magnar',
              marcas: ['parede_de_escudos_firme'],
              delta: { compostura: -1 },
            },
            falha: {
              ponte: 'A pressão desordenada dos Thenns abre uma brecha perigosa entre duas carroças, obrigando a guarnição a recuar três passos sob pressão implacável.',
              destino: 'j4_a3_patio_duelo_do_magnar',
              marcas: ['parede_de_escudos_firme'],
              delta: { sangue: -1, compostura: -2 },
            },
          },
          onSuccessNodeId: 'j4_a3_patio_duelo_do_magnar',
          onPartialFailureNodeId: 'j4_a3_patio_duelo_do_magnar',
        },
      ],
    },

    // Rota A2: O Duelo contra a Vanguarda do Magnar
    j4_a3_patio_duelo_do_magnar: {
      id: 'j4_a3_patio_duelo_do_magnar',
      titulo: 'O Machado que Fende o Gelo',
      anoHistorico: '300 d.C.',
      localizacao: 'Centro do Pátio de Castelo Negro',
      regionId: 'castelo_negro',
      tipo: 'dialogo',
      rota: 'patio',
      pov: 'Irmão Sem Nome',
      origem: 'original',
      notaHistorica: 'Confronto direto na lama contra Styr e seus melhores guerreiros abrindo brechas para a armadilha de Noye.',
      loreContext: {
        fonte: {
          livro: 'A Tormenta de Espadas',
          capitulo: 'Jon VII',
          arquivo_md: 'asos_samwell_3.md',
        },
      },
      fallbackText: `Styr avança como uma foice na colheita. Seu machado de duas mãos corta o ar com um zunido assustador, lascando vigas de carvalho e partindo escudos em dois. Dois intendentes jovens tombam sem vida no cascalho antes que Donal Noye salte à frente do Magnar com uma espada longa forjada por suas próprias mãos.

O ferreiro de um braço só bloqueia o primeiro golpe, mas o impacto joga Noye de joelhos na lama. O Magnar ergue o machado para o golpe de misericórdia, enquanto o tenente de Styr se lança para impedir qualquer ajuda ao comandante. Você tem apenas uma fração de segundo para agir antes que o líder da defesa seja decapitado.`,
      blocos: [
        {
          funcao: 'abertura',
          texto: `Styr abre caminho à força de machado pelo centro da barricada. Donal Noye é arremessado de joelhos pelo impacto e o Magnar ergue o aço de bronze para o abate final.`,
        },
        {
          funcao: 'corpo',
          quando: { flagsTodas: ['confianca_donal_noye'] },
          texto: `A determinação de não permitir que outro comandante tombe diante de seus olhos queima no seu peito; você jurou fidelidade ao comando desta fortaleza.`,
        },
        {
          funcao: 'fecho',
          texto: `O braço do ferreiro treme na lama. O tenente de Styr bloqueia o flanco com um escudo redondo.`,
        },
      ],
      interlocutores: [
        { id: 'donal_noye', nome: 'Donal Noye', papel: 'Comandante da Defesa' },
      ],
      falas: [
        {
          quem: 'donal_noye',
          texto: 'Não parem! Puxem o Magnar para a vala do piche antes que ele quebre o pátio!',
        },
      ],
      escolhas: [
        {
          id: 'j4_a3_pa2_interpor_espada_salvar_noye',
          tipo: 'teste_atributo',
          texto: 'Mergulhar sob o machado e golpear a lâmina de Styr com a espada para desviar o corte fatal',
          atributo: 'furia',
          dc: 10,
          tom: 'violencia',
          desfechos: {
            sucesso: {
              ponte: 'A sua lâmina colide contra o cabo do machado de Styr com faíscas incandescentes. O golpe mortal erra Noye por polegadas, permitindo que o ferreiro role para a segurança enquanto você fere o flanco do Magnar.',
              destino: 'j4_a3_patio_a_armadilha_de_piche',
              marcas: ['sangue_do_magnar', 'coragem_sob_pressao'],
              delta: { honra: 2, compostura: 1 },
            },
            parcial: {
              ponte: 'Você consegue travar o machado de Styr a tempo, mas a força bruta do golpe quebra o seu pomo e atordoa o seu punho direito, salvando Noye ao preço da sua arma principal.',
              destino: 'j4_a3_patio_a_armadilha_de_piche',
              marcas: ['sangue_do_magnar'],
              delta: { sangue: -1, compostura: -1 },
            },
            falha: {
              ponte: 'O cabo do machado golpeia o seu peito no ricochete, partindo duas costelas. O golpe em Noye é apenas amortecido, deixando o ferreiro com um talho no ombro antes que Grenn afaste o monstro.',
              destino: 'j4_a3_patio_a_armadilha_de_piche',
              marcas: ['coragem_sob_pressao'],
              delta: { sangue: -3, compostura: -2 },
            },
          },
          onSuccessNodeId: 'j4_a3_patio_a_armadilha_de_piche',
          onPartialFailureNodeId: 'j4_a3_patio_a_armadilha_de_piche',
        },
        {
          id: 'j4_a3_pa2_abater_guarda_costas',
          tipo: 'teste_atributo',
          texto: 'Atacar o tenente de Styr pelas costas para desequilibrar a guarda do Magnar',
          atributo: 'astucia',
          dc: 9,
          tom: 'silencio',
          desfechos: {
            sucesso: {
              ponte: 'Num movimento cirúrgico, você passa por baixo do escudo do tenente e crava a adaga na coxa do guerreiro. O homem tomba sobre Styr, quebrando o equilíbrio do líder selvagem.',
              destino: 'j4_a3_patio_a_armadilha_de_piche',
              marcas: ['sangue_do_magnar', 'coragem_sob_pressao'],
              delta: { honra: 1, compostura: 1 },
            },
            parcial: {
              ponte: 'Você fere o guarda de Styr, mas a resposta é violenta: um soco de escudo atinge o seu queixo antes que o rebelde caia na vala.',
              destino: 'j4_a3_patio_a_armadilha_de_piche',
              marcas: ['sangue_do_magnar'],
              delta: { sangue: -1 },
            },
            falha: {
              ponte: 'O tenente percebe o ataque e desvia com facilidade, golpeando a sua clavícula com a coronha da lança e jogando você na lama suja.',
              destino: 'j4_a3_patio_a_armadilha_de_piche',
              marcas: ['coragem_sob_pressao'],
              delta: { sangue: -2, compostura: -1 },
            },
          },
          onSuccessNodeId: 'j4_a3_patio_a_armadilha_de_piche',
          onPartialFailureNodeId: 'j4_a3_patio_a_armadilha_de_piche',
        },
      ],
    },

    // Rota A3: A Armadilha de Piche
    j4_a3_patio_a_armadilha_de_piche: {
      id: 'j4_a3_patio_a_armadilha_de_piche',
      titulo: 'O Inferno Negro nas Trincheiras',
      anoHistorico: '300 d.C.',
      localizacao: 'Trincheira Sul, Pátio de Castelo Negro',
      regionId: 'castelo_negro',
      tipo: 'narracao',
      rota: 'patio',
      pov: 'Irmão Sem Nome',
      origem: 'original',
      notaHistorica: 'Momento decisivo da defesa onde a vala de óleo de piche é incendiada para encurralar a tropa de Styr.',
      loreContext: {
        fonte: {
          livro: 'A Tormenta de Espadas',
          capitulo: 'Jon VII',
          arquivo_md: 'asos_samwell_3.md',
        },
      },
      fallbackText: `Os Thenns avançam em massa pelo corredor afunilado entre a forja e as estrebarias, pisando na terra preta e encharcada sem desconfiarem do que repousa sob o cascalho. Três dezenas de guerreiros de bronze empurram os homens da Patrulha contra a base da escadaria de madeira da Muralha.

«Agora! O fogo! Pelo amor dos deuses, soltem o fogo!», berra Donal Noye com a respiração rouca. Você tem o archote aceso na mão esquerda e o pavio de estopa crua a três passos da vala. Se o piche for aceso no segundo exato, a massa de invasores será cortada em duas; se falhar, os homens de Styr subirão a escadaria da torre.`,
      blocos: [
        {
          funcao: 'abertura',
          texto: `Os guerreiros Thenn afunilam-se na vala encharcada de óleo negro entre as carroças. Donal Noye berra pela ordem de fogo.`,
        },
        {
          funcao: 'corpo',
          quando: { flagsTodas: ['piche_preparado'] },
          texto: `Os barris de piche preparados com resina na abertura do turno estão cheios até a borda, garantindo combustão instantânea e calor devastador.`,
        },
        {
          funcao: 'fecho',
          texto: `O archote queima na sua mão. É hora de transformar o pátio sul em uma fornalha para salvar Castelo Negro.`,
        },
      ],
      escolhas: [
        {
          id: 'j4_a3_pa3_lancar_archote_trincheira',
          tipo: 'teste_atributo',
          texto: 'Lançar o archote aceso no centro da vala de piche e recuar para a linha de cobertura',
          atributo: 'astucia',
          dc: 8,
          tom: 'violencia',
          desfechos: {
            sucesso: {
              ponte: 'A tocha atinge a estopa empapada e uma muralha de chamas alaranjadas explode aos céus com um rugido trovejante. O piche fervente consome os homens de vanguarda e corta as linhas de Styr, isolando o Magnar na armadilha.',
              destino: 'j4_a3_a_queda_do_magnar',
              marcas: ['inferno_de_piche_aceso', 'retaguarda_salva'],
              delta: { honra: 2, compostura: 1 },
            },
            parcial: {
              ponte: 'O fogo sobe com violência e a fumaça negra cobre o pátio. A explosão queima as sobrancelhas dos defensores, mas o piche fecha a passagem dos invasores com sucesso.',
              destino: 'j4_a3_a_queda_do_magnar',
              marcas: ['inferno_de_piche_aceso'],
              delta: { sangue: -1 },
            },
            falha: {
              ponte: 'A tocha cai na lama antes do contato direto e demora a pegar. Uma saraivada de flechas Thenn atinge o parapeito antes que as brasas finalmente alcancem o óleo.',
              destino: 'j4_a3_a_queda_do_magnar',
              marcas: ['inferno_de_piche_aceso'],
              delta: { sangue: -2, compostura: -1 },
            },
          },
          onSuccessNodeId: 'j4_a3_a_queda_do_magnar',
          onPartialFailureNodeId: 'j4_a3_a_queda_do_magnar',
        },
        {
          id: 'j4_a3_pa3_derramar_barril_chamas',
          tipo: 'teste_atributo',
          texto: 'Chutar o barril de óleo reserva diretamente na rampa de entrada antes de acender o tição',
          atributo: 'furia',
          dc: 9,
          tom: 'violencia',
          desfechos: {
            sucesso: {
              ponte: 'O tonel rompe-se com o impacto do seu pé e uma onda de óleo viscoso escorre pelas pernas dos guerreiros Thenn. O tição incendeia a rampa num segundo; gritos de horror ecoam na escuridão.',
              destino: 'j4_a3_a_queda_do_magnar',
              marcas: ['inferno_de_piche_aceso', 'retaguarda_salva'],
              delta: { honra: 2, compostura: 1 },
            },
            parcial: {
              ponte: 'O barril espalha o óleo por todo o setor, criando uma barreira de fogo incontornável, embora parte das chamas lamba as esteiras da armaria.',
              destino: 'j4_a3_a_queda_do_magnar',
              marcas: ['inferno_de_piche_aceso'],
              delta: { compostura: -1 },
            },
            falha: {
              ponte: 'O peso do barril desequilibra você na rampa em chamas. Você queima a mão ao atear o fogo e precisa rolar na neve fofa para não ser engolido pelo calor.',
              destino: 'j4_a3_a_queda_do_magnar',
              marcas: ['inferno_de_piche_aceso'],
              delta: { sangue: -2, compostura: -1 },
            },
          },
          onSuccessNodeId: 'j4_a3_a_queda_do_magnar',
          onPartialFailureNodeId: 'j4_a3_a_queda_do_magnar',
        },
      ],
    },

    // --- ROTA B: OS ARQUEIROS DA TORRE DE HARDIN ---

    // Rota B1: Flechas na Escuridão
    j4_a3_torre_flechas_na_escuridao: {
      id: 'j4_a3_torre_flechas_na_escuridao',
      titulo: 'As Asas de Penas e Ferro',
      anoHistorico: '300 d.C.',
      localizacao: 'Sacadas Altas da Torre de Hardin',
      regionId: 'castelo_negro',
      tipo: 'narracao',
      rota: 'torre',
      pov: 'Irmão Sem Nome',
      origem: 'original',
      notaHistorica: 'Fogo cerrado de flechas e pontaria tática das sacadas superiores contra os portadores de archotes dos Thenns.',
      loreContext: {
        fonte: {
          livro: 'A Tormenta de Espadas',
          capitulo: 'Jon VII',
          arquivo_md: 'asos_samwell_3.md',
        },
      },
      fallbackText: `Do parapeito de madeira da Torre de Hardin, o pátio parece um caldeirão de sombras em ebulição. O vento da Muralha puxa a corda do arco curto com força gélida. Ao seu lado, Jon Snow dispara flecha após flecha com cadência mecânica e olhos frios de lobo, a perna machucada apoiada em um fardo de lã.

Lá embaixo, os archotes dos Thenns iluminam os alvos prioritários: guerreiros que carregam machados de bronze e escadas de mão feitas de cordas de cânhamo para invadir o arsenal. Se os atiradores não silenciarem os archoteiros, a escuridão cobrirá o avanço dos invasores até as portas da enfermaria.`,
      blocos: [
        {
          funcao: 'abertura',
          texto: `Das sacadas da Torre de Hardin, o pátio reluz com fogueiras e archotes. Jon Snow dispara flechas com ritmo implacável contra os líderes que guiam a investida selvagem.`,
        },
        {
          funcao: 'corpo',
          quando: { flagsTodas: ['estrategia_jon_snow'] },
          texto: `A indicação precisa dada por Jon na forja permite focar o tiroteio nos portadores de archotes que guiam os grupos de assalto às escadarias.`,
        },
        {
          funcao: 'fecho',
          texto: `Três guerreiros de bronze aproximam-se com escadas de assalto na base da torre. Cada tiro precisa ser certeiro.`,
        },
      ],
      escolhas: [
        {
          id: 'j4_a3_tb1_alvejar_archoteiros',
          tipo: 'teste_atributo',
          texto: 'Puxar a corda até a têmpora e abater os portadores de archotes na entrada do pátio',
          atributo: 'astucia',
          dc: 8,
          tom: 'silencio',
          desfechos: {
            sucesso: {
              ponte: 'As suas flechas assobiam na noite e perfuram o peito de dois condutores de tochas. O fogo cai sobre o gelo e apaga-se em vapor cinzento, deixando os invasores cegos e desorientados sob o tiroteio da Patrulha.',
              destino: 'j4_a3_torre_o_cerco_as_escadas',
              marcas: ['pontaria_no_escuro', 'archotes_apagados'],
              delta: { honra: 1, compostura: 1 },
            },
            parcial: {
              ponte: 'O vento desvia a sua primeira flecha, mas a segunda derruba o líder do grupo de assalto. As tochas caem, embora um invasor ainda alcance o pé da escada com uma corda de gancho.',
              destino: 'j4_a3_torre_o_cerco_as_escadas',
              marcas: ['pontaria_no_escuro'],
              delta: { compostura: -1 },
            },
            falha: {
              ponte: 'O gelo na corda do arco faz o tiro sair curto. Uma flecha Thenn com ponta de osso zune de baixo e arranha o seu ombro esquerdo no parapeito.',
              destino: 'j4_a3_torre_o_cerco_as_escadas',
              marcas: ['pontaria_no_escuro'],
              delta: { sangue: -1, compostura: -1 },
            },
          },
          onSuccessNodeId: 'j4_a3_torre_o_cerco_as_escadas',
          onPartialFailureNodeId: 'j4_a3_torre_o_cerco_as_escadas',
        },
        {
          id: 'j4_a3_tb1_incendiar_escadas_assalto',
          tipo: 'teste_atributo',
          texto: 'Mergulhar as pontas das flechas no caldeirão de piche e atear fogo às escadas de mão de corda',
          atributo: 'astucia',
          dc: 9,
          tom: 'violencia',
          desfechos: {
            sucesso: {
              ponte: 'A flecha em chamas atinge a corda de cânhamo embebida em gordura. O fogo sobe em labaredas instantâneas pela escada, queimando as mãos dos escaladores e fazendo-os despencarem no pátio.',
              destino: 'j4_a3_torre_o_cerco_as_escadas',
              marcas: ['pontaria_no_escuro', 'archotes_apagados'],
              delta: { honra: 2, compostura: 1 },
            },
            parcial: {
              ponte: 'O fogo queima parte das cordas e retarda a escalada, embora dois guerreiros Thenn consigam saltar na plataforma inferior antes da destruição total.',
              destino: 'j4_a3_torre_o_cerco_as_escadas',
              marcas: ['pontaria_no_escuro'],
              delta: { compostura: -1 },
            },
            falha: {
              ponte: 'A flecha incendeia o parapeito de madeira da própria sacada. Você precisa abafar as chamas com o manto de lã antes que o fogo se alastre para as caixas de munição.',
              destino: 'j4_a3_torre_o_cerco_as_escadas',
              marcas: ['pontaria_no_escuro'],
              delta: { sangue: -1, compostura: -2 },
            },
          },
          onSuccessNodeId: 'j4_a3_torre_o_cerco_as_escadas',
          onPartialFailureNodeId: 'j4_a3_torre_o_cerco_as_escadas',
        },
      ],
    },

    // Rota B2: O Cerco às Escadarias
    j4_a3_torre_o_cerco_as_escadas: {
      id: 'j4_a3_torre_o_cerco_as_escadas',
      titulo: 'Sangue nos Degraus de Madeira',
      anoHistorico: '300 d.C.',
      localizacao: 'Escadaria em Caracol da Torre de Hardin',
      regionId: 'castelo_negro',
      tipo: 'dialogo',
      rota: 'torre',
      pov: 'Irmão Sem Nome',
      origem: 'original',
      notaHistorica: 'Defesa violenta das escadas internas contra guerreiros selvagens tentando queimar a enfermaria e atingir Jon Snow.',
      loreContext: {
        fonte: {
          livro: 'A Tormenta de Espadas',
          capitulo: 'Jon VII',
          arquivo_md: 'asos_samwell_3.md',
        },
      },
      fallbackText: `A porta de carvalho do patamar inferior cedeu com um estalo de machado. Três guerreiros Thenn subiram a escadaria em caracol berrando ameaças na língua antiga. No espaço estreito de três palmos, arcos são inúteis: é a vez da espada curta e da adaga de ferro.

Jon Snow apóia-se contra o corrimão e desembainha Garralonga, mas a perna ferida vacila sob o peso do corpo. Um selvagem com um machado tosco avança diretamente contra o bastardo desprotegido, enquanto o segundo tenta quebrar a tranca da enfermaria onde Meistre Aemon atende os feridos da vanguarda.`,
      blocos: [
        {
          funcao: 'abertura',
          texto: `Três guerreiros Thenn invadem a escadaria estreita de madeira com machados em punho. Jon Snow tenta conter o avanço, mas a perna flechada cede no degrau.`,
        },
        {
          funcao: 'corpo',
          quando: { flagsTodas: ['recebeu_jon_ferido'] },
          texto: `Você já socorreu Jon Snow uma vez na chegada ao pátio; você sabe exatamente o quanto a ferida na coxa limita os movimentos rápidos do jovem patrulheiro.`,
        },
        {
          funcao: 'fecho',
          texto: `O machado de bronze desce em arco contra a cabeça de Jon. Se você não bloquear o ataque agora, o bastardo morrerá nestes degraus.`,
        },
      ],
      interlocutores: [
        { id: 'jon_snow', nome: 'Jon Snow', papel: 'Patrulheiro Ferido' },
      ],
      falas: [
        {
          quem: 'jon_snow',
          texto: 'Segure a curva da escada! Eles não conseguem lutar dois a dois neste espaço estreito!',
        },
      ],
      escolhas: [
        {
          id: 'j4_a3_tb2_bloquear_machado_salvar_jon',
          tipo: 'teste_atributo',
          texto: 'Projetar-se à frente de Jon Snow com a espada curta e aparar o machado no degrau',
          atributo: 'furia',
          dc: 9,
          tom: 'violencia',
          desfechos: {
            sucesso: {
              ponte: 'A sua lâmina apara o ferro do machado e você chuta o peito do atacante com a bota cravada de ferro. O guerreiro rola escada abaixo, derrubando o companheiro que vinha logo atrás em uma pilha de ossos quebrados.',
              destino: 'j4_a3_torre_o_resgate_de_aemon',
              marcas: ['escadaria_defendida', 'companheiro_resgatado'],
              delta: { honra: 2, aprovacaoCompanheiros: { jon_snow: 15 } },
            },
            parcial: {
              ponte: 'Você bloqueia o machado a tempo de salvar Jon, mas o tranco da madeira racha o seu guarda-mão e lasca o corrimão de carvalho. Jon consegue estocar o invasor com Garralonga.',
              destino: 'j4_a3_torre_o_resgate_de_aemon',
              marcas: ['escadaria_defendida'],
              delta: { sangue: -1, honra: 1 },
            },
            falha: {
              ponte: 'O golpe empurra você contra a parede de pedra da torre. O ombro de Jon é arranhado de raspão antes que você consiga atravessar a garganta do selvagem com a adaga.',
              destino: 'j4_a3_torre_o_resgate_de_aemon',
              marcas: ['escadaria_defendida'],
              delta: { sangue: -2, compostura: -1 },
            },
          },
          onSuccessNodeId: 'j4_a3_torre_o_resgate_de_aemon',
          onPartialFailureNodeId: 'j4_a3_torre_o_resgate_de_aemon',
        },
        {
          id: 'j4_a3_tb2_rolar_barril_degraus',
          tipo: 'teste_atributo',
          texto: 'Trombar um fardo pesado de ferramentas de ferreiro escada abaixo contra os invasores',
          atributo: 'comando',
          dc: 8,
          tom: 'honesto',
          desfechos: {
            sucesso: {
              ponte: 'Você chuta o pesado caixote de ferro pelos degraus. O bloco de madeira e metal despenca com força de aríete, esmagando as pernas dos dois selvagens e limpando a escadaria em segundos.',
              destino: 'j4_a3_torre_o_resgate_de_aemon',
              marcas: ['escadaria_defendida', 'companheiro_resgatado'],
              delta: { compostura: 2, honra: 1 },
            },
            parcial: {
              ponte: 'O caixote atinge o primeiro homem em cheio, forçando o recuo da investida, embora a madeira da escada rache com o impacto pesado.',
              destino: 'j4_a3_torre_o_resgate_de_aemon',
              marcas: ['escadaria_defendida'],
              delta: { compostura: -1 },
            },
            falha: {
              ponte: 'O fardo emperra na curva dos degraus e os homens de Thenn saltam por cima dele, travando combate corpo a corpo na soleira da enfermaria.',
              destino: 'j4_a3_torre_o_resgate_de_aemon',
              marcas: ['escadaria_defendida'],
              delta: { sangue: -1, compostura: -1 },
            },
          },
          onSuccessNodeId: 'j4_a3_torre_o_resgate_de_aemon',
          onPartialFailureNodeId: 'j4_a3_torre_o_resgate_de_aemon',
        },
      ],
    },

    // Rota B3: O Resgate de Meistre Aemon
    j4_a3_torre_o_resgate_de_aemon: {
      id: 'j4_a3_torre_o_resgate_de_aemon',
      titulo: 'O Santuário das Velhas Memórias',
      anoHistorico: '300 d.C.',
      localizacao: 'Câmara e Biblioteca de Meistre Aemon',
      regionId: 'castelo_negro',
      tipo: 'narracao',
      rota: 'torre',
      pov: 'Irmão Sem Nome',
      origem: 'original',
      notaHistorica: 'Defesa dos aposentos do Meistre e contenção de fogo que ameaçava queimar os registros históricos de séculos da Patrulha.',
      loreContext: {
        fonte: {
          livro: 'A Tormenta de Espadas',
          capitulo: 'Jon VII',
          arquivo_md: 'asos_samwell_3.md',
        },
      },
      fallbackText: `O odor de pergaminho antigo e folhas de cânfora mistura-se à fumaça cinzenta que entra pelas janelas quebradas. Uma tocha lançada do pátio caiu sobre a esteira de junco perto da mesa onde Meistre Aemon protege as caixas de corvos mensageiros e os anais da Patrulha da Noite.

Clydas tenta abafar as chamas com um cobertor de lã, tossindo e chorando de medo, enquanto o centenário meistre cego permanece de pé junto à janela, ereto como um príncipe Targaryen, sem demonstrar o menor pavor diante do fogo que sobe pelas prateleiras. «Os livros não podem queimar...», murmura o velho sábio. «Sem a memória dos antigos, os homens da Muralha já estarão mortos antes de o inverno chegar.»`,
      blocos: [
        {
          funcao: 'abertura',
          texto: `Na biblioteca do Meistre, o fogo de uma tocha atirada pelas frestas sobe pela esteira de junco seco, ameaçando séculos de anais e pergaminhos da Patrulha da Noite.`,
        },
        {
          funcao: 'corpo',
          quando: { flagsTodas: ['bencao_de_aemon'] },
          texto: `A bênção que Aemon lhe deu na forja ainda ecoa no seu peito; proteger a vida do ancião é o seu dever mais nobre sob este teto.`,
        },
        {
          funcao: 'fecho',
          texto: `O fogo alcança a base do armário dos manuscritos enquanto um amotinado ferido tenta entrar pela janela que dá para o telhado.`,
        },
      ],
      escolhas: [
        {
          id: 'j4_a3_tb3_apagar_fogo_pergaminhos',
          tipo: 'teste_atributo',
          texto: 'Virar o balde de areia e água sobre a esteira em chamas para salvar os pergaminhos',
          atributo: 'astucia',
          dc: 8,
          tom: 'honesto',
          desfechos: {
            sucesso: {
              ponte: 'Com movimentos rápidos, você abafa o fogo com areia pesada e arrasta os manuscritos para a câmara interna. As chamas apagam-se em vapor espesso e a biblioteca ancestral de Castelo Negro é preservada.',
              destino: 'j4_a3_a_queda_do_magnar',
              marcas: ['biblioteca_aemon_salva', 'pergaminhos_preservados'],
              delta: { honra: 2, compostura: 1 },
            },
            parcial: {
              ponte: 'Você sufoca as labaredas a tempo, embora o couro de dois tomos antigos saia chamuscado pela brasa. Clydas segura a sua mão com gratidão chorosa.',
              destino: 'j4_a3_a_queda_do_magnar',
              marcas: ['biblioteca_aemon_salva'],
              delta: { compostura: -1 },
            },
            falha: {
              ponte: 'A fumaça cega os seus olhos e você queima as palmas das mãos ao puxar o baú de ferro. O fogo é contido por Clydas, mas a dor queima a sua pele.',
              destino: 'j4_a3_a_queda_do_magnar',
              marcas: ['biblioteca_aemon_salva'],
              delta: { sangue: -1, compostura: -1 },
            },
          },
          onSuccessNodeId: 'j4_a3_a_queda_do_magnar',
          onPartialFailureNodeId: 'j4_a3_a_queda_do_magnar',
        },
        {
          id: 'j4_a3_tb3_abater_invasor_janela',
          tipo: 'simples',
          texto: 'Desferir um golpe certeiro no selvagem que tenta entrar pela janela e empurrá-lo telhado abaixo',
          tom: 'violencia',
          desfecho: {
            ponte: 'A sua espada atravessa o gibão de peles do atacante antes que ele ponha os pés no aposento. O corpo cai do telhado com estrépito sobre a lama do pátio, garantindo a paz na câmara do meistre.',
            destino: 'j4_a3_a_queda_do_magnar',
            marcas: ['biblioteca_aemon_salva', 'pergaminhos_preservados'],
            delta: { honra: 1, compostura: 1 },
          },
          nextNodeId: 'j4_a3_a_queda_do_magnar',
        },
      ],
    },

    // =========================================================================
    // ETAPA 4: PEÇA DE CENÁRIO CANÔNICA (3 CENAS FIXAS)
    // =========================================================================

    // Peça 1: A Queda do Magnar
    j4_a3_a_queda_do_magnar: {
      id: 'j4_a3_a_queda_do_magnar',
      titulo: 'O Desmoronar da Fúria de Bronze',
      anoHistorico: '300 d.C.',
      localizacao: 'Pátio Central sob as Chamas da Escadaria',
      regionId: 'castelo_negro',
      tipo: 'peca_de_cenario',
      rota: 'comum',
      pov: 'Irmão Sem Nome',
      origem: 'canonica',
      loreContext: {
        fonte: {
          livro: 'A Tormenta de Espadas',
          capitulo: 'Jon VII & VIII',
          arquivo_md: 'asos_samwell_3.md',
        },
      },
      fallbackText: `O clímax da batalha é selado com o colapso ensurdecedor de toneladas de madeira e gelo. Encurralado entre as chamas da vala de piche e a base da escadaria em caracol, Styr avança em desespero cego para alcançar o topo da Muralha. Mas a armadilha de Donal Noye não perdoa: as vigas de sustentação, já calcinadas pelo fogo intencional, quebram-se como gravetos ressecados.

A escadaria colossal de madeira desaba com estrondo sobre o pátio sul. Uma tempestade de escombros em chamas, blocos de gelo puro e vigas de ferro desmorona sobre o Magnar de Thenn e os últimos guerreiros de sua comitiva. Quando a poeira e as faíscas finalmente assentam sobre a lama congelada, a vanguarda selvagem de cem homens está aniquilada. Castelo Negro sobreviveu à noite.`,
      blocos: [
        {
          funcao: 'abertura',
          texto: `A escadaria colossal de madeira desaba com estrondo ensurdecedor sobre o pátio. Toneladas de vigas em chamas esmagam Styr e os últimos guerreiros Thenn sob o gelo da Muralha.`,
        },
        {
          funcao: 'corpo',
          quando: { flagsTodas: ['inferno_de_piche_aceso'] },
          texto: `O piche ardente nas trincheiras completou o cerco, impedindo que qualquer invasor recuasse para a Estrada do Rei e garantindo a vitória absoluta no setor sul.`,
        },
        {
          funcao: 'corpo',
          quando: { flagsTodas: ['escadaria_defendida'] },
          texto: `A firmeza demonstrada na defesa dos degraus da torre permitiu que os arqueiros de Jon Snow disparassem sem interrupção até o momento do colapso fatal.`,
        },
        {
          funcao: 'fecho',
          texto: `O silêncio fúnebre sucede o clamor do aço. Os sobreviventes da Patrulha olham uns para os outros com rostos enegrecidos pela fuligem; a vitória custou caro, mas o castelo não caiu.`,
        },
      ],
      escolhas: [
        {
          id: 'j4_a3_pc1_reunir_sobreviventes_patio',
          tipo: 'simples',
          texto: 'Avançar com Donal Noye pelo pátio fumegante para conter os focos de incêndio e recolher os feridos',
          tom: 'honesto',
          desfecho: {
            ponte: 'Você joga neve sobre as vigas fumegantes e ajuda a resgatar os homens soterrados pelos escombros. A disciplina prevalece e o fogo é controlado antes de alcançar os estábulos.',
            destino: 'j4_a3_o_luto_sob_as_cinzas',
            marcas: ['vitoria_em_castelo_negro'],
            delta: { honra: 2, compostura: 1 },
          },
          nextNodeId: 'j4_a3_o_luto_sob_as_cinzas',
        },
        {
          id: 'j4_a3_pc1_conferir_corpos_thenns',
          tipo: 'simples',
          texto: 'Inspecionar os destroços sob a escadaria para certificar-se da morte de Styr',
          tom: 'silencio',
          desfecho: {
            ponte: 'Sob o peso de uma tora carbonizada, você encontra o corpo imóvel de Styr, o Magnar de Thenn, sepultado com o machado quebrado na mão. O líder do assalto do sul nunca mais se erguerá.',
            destino: 'j4_a3_o_luto_sob_as_cinzas',
            marcas: ['vitoria_em_castelo_negro'],
            delta: { compostura: 1 },
          },
          nextNodeId: 'j4_a3_o_luto_sob_as_cinzas',
        },
      ],
    },

    // Peça 2: O Luto sob as Cinzas de Ygritte
    j4_a3_o_luto_sob_as_cinzas: {
      id: 'j4_a3_o_luto_sob_as_cinzas',
      titulo: 'O Beijo do Fogo na Neve Fria',
      anoHistorico: '300 d.C.',
      localizacao: 'Orla das Estrebarias, Castelo Negro',
      regionId: 'castelo_negro',
      tipo: 'peca_de_cenario',
      rota: 'comum',
      pov: 'Irmão Sem Nome',
      origem: 'canonica',
      loreContext: {
        fonte: {
          livro: 'A Tormenta de Espadas',
          capitulo: 'Jon VIII',
          arquivo_md: 'asos_samwell_3.md',
        },
      },
      fallbackText: `A alvorada cinzenta sobe sobre a Muralha como uma lâmina de ferro polido, revelando a devastação do pátio. Trinta e dois irmãos da Patrulha e dezenas de selvagens jazem mortos na lama enegrecida. No canto mais silencioso das estrebarias caídas, Jon Snow está de joelhos na neve ensanguentada, segurando a cabeça de uma garota ruiva com cabelos desgrenhados e olhos vidrados de dor.

Ygritte. A garota selvagem beijada pelo fogo respira com dificuldade extrema, uma flecha com penas cinzentas de patrulheiro cravada no peito, bem abaixo da clavícula. Jon chora sem vergonha, as lágrimas abrindo caminhos claros na fuligem do seu rosto juvenil:
— Jon Snow... — sussurra a garota com lábios pálidos e um sorriso tênue e triste. — Você se lembra daquela caverna? Nós deveríamos ter ficado naquela caverna... Você não sabe de nada, Jon Snow... nada...
A cabeça dela tomba de lado e os olhos se apagam. O vento sopra da floresta e faz as folhas mortas dançarem sobre o cadáver.`,
      blocos: [
        {
          funcao: 'abertura',
          texto: `A alvorada cinzenta revela a tragédia humana no canto das estrebarias. Jon Snow chora de joelhos sobre o corpo de Ygritte, a garota ruiva que ele amou além da Muralha.`,
        },
        {
          funcao: 'corpo',
          quando: { flagsTodas: ['pontaria_no_escuro'] },
          texto: `Jon olha para a flecha cinzenta cravada no peito da jovem e murmura com alívio amargo que as penas não pertencem ao seu próprio carcás, embora a culpa da guerra o esmague por inteiro.`,
        },
        {
          funcao: 'corpo',
          quando: { flagsTodas: ['parede_de_escudos_firme'] },
          texto: `Os guerreiros veteranos da intendência passam e baixam as cabeças em respeito solene, compreendendo que o manto negro cobra o coração de quem o veste.`,
        },
        {
          funcao: 'fecho',
          texto: `«Você não sabe de nada, Jon Snow...», são as últimas palavras da garota antes do último suspiro na neve fria de Castelo Negro.`,
        },
      ],
      escolhas: [
        {
          id: 'j4_a3_pc2_pousar_mao_ombro_jon',
          tipo: 'simples',
          texto: 'Aproximar-se em silêncio e pousar a mão no ombro de Jon Snow para partilhar o luto sagrado',
          tom: 'honesto',
          desfecho: {
            ponte: 'Jon aperta a sua mão com dedos trêmulos e agradece pelo respeito silencioso. Juntos, vocês cobrem o corpo de Ygritte com uma capa limpa antes que os corvos comecem a descer.',
            destino: 'j4_a3_o_gigante_no_portao_norte',
            marcas: ['testemunha_dor_de_jon', 'respeito_aos_caidos'],
            delta: { honra: 2, compostura: 1 },
          },
          nextNodeId: 'j4_a3_o_gigante_no_portao_norte',
        },
        {
          id: 'j4_a3_pc2_manter_respeito_distancia',
          tipo: 'simples',
          texto: 'Permanecer a dez passos de vigia para dar a Jon o momento íntimo de despedida',
          tom: 'silencio',
          desfecho: {
            ponte: 'Você posta-se de costas para a cena com a espada na mão, guardando a privacidade da dor do jovem patrulheiro contra os olhares curiosos dos outros irmãos.',
            destino: 'j4_a3_o_gigante_no_portao_norte',
            marcas: ['testemunha_dor_de_jon'],
            delta: { compostura: 2 },
          },
          nextNodeId: 'j4_a3_o_gigante_no_portao_norte',
        },
      ],
    },

    // Peça 3: Os Gigantes no Portão Norte
    j4_a3_o_gigante_no_portao_norte: {
      id: 'j4_a3_o_gigante_no_portao_norte',
      titulo: 'Dois Toques de Trombeta no Topo do Mundo',
      anoHistorico: '300 d.C.',
      localizacao: 'Portão Norte e Túnel do Gelo de Castelo Negro',
      regionId: 'castelo_negro',
      tipo: 'peca_de_cenario',
      rota: 'comum',
      pov: 'Irmão Sem Nome',
      origem: 'canonica',
      loreContext: {
        fonte: {
          livro: 'A Tormenta de Espadas',
          capitulo: 'Jon VIII',
          arquivo_md: 'asos_samwell_3.md',
        },
      },
      fallbackText: `O alívio da vitória do sul dura menos de uma hora. Do topo da Muralha, a setecentos pés de altura, a trompa de sentinela soa duas vezes: um toque longo, seguido de outro ainda mais estridente. Dois toques: selvagens. Mas desta vez não é uma companhia de assalto de cem homens.

Ao olhar pelo mirante norte, o que se enxerga é o fim do mundo. Cem mil homens livres de Mance Rayder marcham pela orla da floresta, acompanhados por mastodontes peludos e gigantes montados em mamutes descomunais. À frente da vanguarda dos gigantes, Mag, o Poderoso — o rei da raça antiga —, golpeia o portão externo de ferro fundido com um tronco de pinheiro maciço, fazendo o gelo da Muralha estremecer até a base.

Donal Noye pega o escudo de ferro e desembainha uma espada larga: «O portão de fora cedeu! O túnel vai ser invadido por gigantes! Jon, você assume o comando no topo da Muralha com os arqueiros e os caldeirões! Eu vou descer para o túnel com seis homens e trancar as grades internas por dentro!»`,
      blocos: [
        {
          funcao: 'abertura',
          texto: `Dois toques de trompa ecoam da Muralha. O exército de cem mil de Mance Rayder avança pelo norte com mamutes e gigantes que martelam o portão externo de ferro fundido.`,
        },
        {
          funcao: 'corpo',
          quando: { flagsTodas: ['vitoria_em_castelo_negro'] },
          texto: `A guarnição exausta pelo combate do sul ergue as armas novamente, sabendo que a sobrevivência contra os Thenns foi apenas o prólogo da verdadeira tempestade.`,
        },
        {
          funcao: 'corpo',
          quando: { flagsTodas: ['posto_patio_escudos'] },
          texto: `As marcas do combate violento nas carroças do pátio ainda doem nos seus braços, mas a trompa não dá trégua para descanso.`,
        },
        {
          funcao: 'corpo',
          quando: { flagsTodas: ['posto_torre_arqueiros'] },
          texto: `Os olhos cansados de vigiar o pátio das sacadas voltam-se agora para a imensidão branca que se estende ao norte da Muralha.`,
        },
        {
          funcao: 'corpo',
          quando: { flagsTodas: ['retaguarda_salva'] },
          texto: `A contenção do avanço de Styr preservou a retaguarda, permitindo que a guarnição manobre homens para a defesa do túnel.`,
        },
        {
          funcao: 'fecho',
          texto: `Donal Noye ajusta a espada na única mão e olha para os veteranos que estão ao lado dele: descer ao túnel contra o gigante Mag é uma sentença de morte que comprará tempo para a Patrulha.`,
        },
      ],
      escolhas: [
        {
          id: 'j4_a3_pc3_despedir_donal_noye',
          tipo: 'simples',
          texto: 'Bater o punho contra o peito em saudação a Donal Noye antes que ele tranque o túnel de ferro',
          tom: 'devocao',
          desfecho: {
            ponte: 'Donal Noye sorri com orgulho ferrenho sob a barba grisalha: «Mantenham a Muralha, rapazes! A noite é nossa!» As pesadas barras de ferro descem com estrondo atrás do ferreiro, selando o destino do homem no túnel do gelo.',
            destino: 'j4_a3_acerto_de_contas_portao_norte',
            marcas: ['despedida_de_donal_noye', 'juramento_do_portao_norte'],
            delta: { honra: 2, compostura: 1 },
          },
          nextNodeId: 'j4_a3_acerto_de_contas_portao_norte',
        },
        {
          id: 'j4_a3_pc3_subir_elevador_topo_muralha',
          tipo: 'simples',
          texto: 'Correr para a gaiola do guincho com Jon Snow para assumir o comando dos arcos no topo da Muralha',
          tom: 'honesto',
          desfecho: {
            ponte: 'A gaiola de ferro sobe rangendo nas roldanas congeladas até o cume de setecentos pés. Lá em cima, o vento uiva sobre o mar de fogueiras de Mance Rayder enquanto Jon assume a liderança.',
            destino: 'j4_a3_acerto_de_contas_portao_norte',
            marcas: ['despedida_de_donal_noye'],
            delta: { compostura: 2 },
          },
          nextNodeId: 'j4_a3_acerto_de_contas_portao_norte',
        },
      ],
    },

    // =========================================================================
    // ETAPA 5: ACERTO DE CONTAS (1 CENA QUE LÊ AS MARCAS DO ATO)
    // =========================================================================

    j4_a3_acerto_de_contas_portao_norte: {
      id: 'j4_a3_acerto_de_contas_portao_norte',
      titulo: 'A Vigília dos Trinta sob as Estrelas',
      anoHistorico: '300 d.C.',
      localizacao: 'Plataforma Superior da Muralha sobre Castelo Negro',
      regionId: 'castelo_negro',
      tipo: 'acerto_de_contas',
      rota: 'comum',
      pov: 'Irmão Sem Nome',
      origem: 'canonica',
      isEnding: true,
      loreContext: {
        fonte: {
          livro: 'A Tormenta de Espadas',
          capitulo: 'Jon VIII & IX',
          arquivo_md: 'asos_samwell_3.md',
        },
      },
      fallbackText: `No topo da Muralha, o vento polar uiva com a fúria de mil deuses esquecidos. A setecentos pés de altura, o mundo parece uma pintura em preto e branco: ao sul, Castelo Negro fumega com as cinzas da vitória contra Styr; ao norte, o horizonte arde com dez mil fogueiras do exército de Mance Rayder, estendendo-se até onde a vista alcança na Floresta Assombrada.

Donal Noye morreu no fundo do túnel escavado no gelo, travando a passagem do monstro Mag em um abraço de ferro e sangue. O comando da Patrulha recaiu inteiramente sobre os ombros machucados de Jon Snow. Menos de trinta homens aptos permanecem no topo da barreira, com balestras armadas, caldeirões de pedras e barris de alcatrão prontos para a batalha que decidirá o destino de todos os reinos de Westeros.

O mundo avalia cada flecha disparada, cada vida salva na torre e cada gota de piche ardente derramada no pátio sul.`,
      blocos: [
        {
          funcao: 'abertura',
          texto: `No topo da barreira de setecentos pés de altura, trinta homens jurados contemplam o mar de fogueiras de Mance Rayder. Donal Noye tombou no túnel e Jon Snow lidera a vigília final.`,
        },
        {
          funcao: 'corpo',
          quando: { flagsTodas: ['barricada_sul_reforcada'] },
          texto: `A solidez com que calçou as carroças no pátio impediu que Castelo Negro fosse tomado pelo sul, preservando a base para este último confronto.`,
        },
        {
          funcao: 'corpo',
          quando: { flagsTodas: ['piche_preparado'] },
          texto: `A preparação metódica dos barris de óleo e resina garantiu o fogo que consumiu a vanguarda dos Thenns no momento mais desesperado.`,
        },
        {
          funcao: 'corpo',
          quando: { flagsTodas: ['confianca_donal_noye'] },
          texto: `A coragem demonstrada ao lado de Donal Noye no pátio fez de você o braço direito do ferreiro até a sua última e heroica descida ao túnel.`,
        },
        {
          funcao: 'corpo',
          quando: { flagsTodas: ['estrategia_jon_snow'] },
          texto: `A disciplina demonstrada no cumprimento das ordens de Jon Snow fortaleceu a liderança do jovem bastardo diante dos outros veteranos.`,
        },
        {
          funcao: 'corpo',
          quando: { flagsTodas: ['parede_de_escudos_firme'] },
          texto: `A firmeza com que travou a parede de escudos na lama congelada provou que o aço da Patrulha pode conter até a força descomunal dos invasores de bronze.`,
        },
        {
          funcao: 'corpo',
          quando: { flagsTodas: ['vitoria_em_castelo_negro'] },
          texto: `A aniquilação da tropa de Styr sob os escombros da escadaria foi a primeira vitória de Castelo Negro após meses de tragédias consecutivas.`,
        },
        {
          funcao: 'corpo',
          quando: { flagsTodas: ['testemunha_dor_de_jon'] },
          texto: `O respeito com que acompanhou a dor de Jon sobre o corpo de Ygritte criou um laço de fraternidade inquebrantável entre você e o futuro comandante.`,
        },
        {
          funcao: 'corpo',
          quando: { flagsTodas: ['despedida_de_donal_noye'] },
          texto: `O sacrifício supremo de Donal Noye trancando as grades contra os gigantes sela a determinação dos trinta homens no topo do paredão de gelo.`,
        },
        {
          funcao: 'corpo',
          quando: { flagsTodas: ['pontaria_no_escuro'] },
          texto: `A pontaria cirúrgica demonstrada nas sacadas altas impediu que as chamas dos selvagens devorassem os arsenais da fortaleza.`,
        },
        {
          funcao: 'corpo',
          quando: { flagsTodas: ['archotes_apagados'] },
          texto: `A escuridão imposta aos invasores no pátio transformou a carga de Styr em um abate desorientado sob as flechas da torre.`,
        },
        {
          funcao: 'corpo',
          quando: { flagsTodas: ['escadaria_defendida'] },
          texto: `A defesa heroica dos degraus de madeira garantiu a integridade da enfermaria e a segurança dos feridos que não podiam lutar.`,
        },
        {
          funcao: 'corpo',
          quando: { flagsTodas: ['biblioteca_aemon_salva'] },
          texto: `A salvação dos manuscritos e aposentos de Meistre Aemon preservou a sabedoria ancestral necessária para a sobrevivência do reino.`,
        },
        {
          funcao: 'corpo',
          quando: { flagsTodas: ['sangue_do_magnar'] },
          texto: `A audácia de ferir o Magnar no centro do pátio quebrou a aura de invencibilidade dos líderes de Além-da-Muralha.`,
        },
        {
          funcao: 'corpo',
          quando: { flagsTodas: ['lamina_quebrada'] },
          texto: `A sua lâmina embotada e lascada contra o bronze dos Thenns é a prova física do choque brutal suportado nas barricadas.`,
        },
        {
          funcao: 'corpo',
          quando: { flagsTodas: ['coragem_sob_pressao'] },
          texto: `A bravura demonstrada diante do próprio Styr evitou que a defesa do pátio colapsasse antes da explosão das vigas.`,
        },
        {
          funcao: 'corpo',
          quando: { flagsTodas: ['companheiro_resgatado'] },
          texto: `Jon Snow lembra-se com gratidão de quem se interpôs entre a sua carne e os machados nos degraus da torre.`,
        },
        {
          funcao: 'corpo',
          quando: { flagsTodas: ['pergaminhos_preservados'] },
          texto: `Os manuscritos e cartas salvos do fogo continuam em segurança nas arcas de carvalho de Meistre Aemon.`,
        },
        {
          funcao: 'corpo',
          quando: { flagsTodas: ['respeito_aos_caidos'] },
          texto: `A compaixão demonstrada na despedida de Ygritte uniu os homens ao redor de Jon em um luto compartilhado e respeitoso.`,
        },
        {
          funcao: 'corpo',
          quando: { flagsTodas: ['juramento_do_portao_norte'] },
          texto: `A saudação prestada a Donal Noye no limiar da descida ao túnel ecoa como um voto sagrado que guiará as flechas desta noite.`,
        },
        {
          funcao: 'fecho',
          texto: `Um berrante de guerra monstruoso soa na orla dos pinheiros do norte. O exército de Mance Rayder avança em massa. O Ato III conclui-se aqui; a Batalha de Stannis e a Eleição do 998º Senhor Comandante aguardam no Ato IV.`,
        },
      ],
      escolhas: [],
    },
  },
};
