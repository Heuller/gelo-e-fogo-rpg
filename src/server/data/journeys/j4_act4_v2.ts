import 'server-only';
import { GrafoJornada } from '@/server/engine/storyLinter';

export const grafoJ4Ato4V2: GrafoJornada = {
  id: 'jornada_4_muralha_ato4_v2',
  titulo: 'Ato IV: A Batalha de Stannis & A Eleição do 998º',
  startNodeId: 'j4_a4_o_cerco_massivo_do_norte',
  nodes: {
    // =========================================================================
    // ETAPA 1: ABERTURA (2 CENAS)
    // =========================================================================

    // 1. O Cerco Massivo do Norte
    j4_a4_o_cerco_massivo_do_norte: {
      id: 'j4_a4_o_cerco_massivo_do_norte',
      titulo: 'Cem Mil Tochas sob a Muralha de Gelo',
      anoHistorico: '300 d.C.',
      localizacao: 'Plataforma Superior da Muralha',
      regionId: 'castelo_negro',
      tipo: 'narracao',
      rota: 'comum',
      pov: 'Irmão Sem Nome',
      origem: 'canonica',
      loreContext: {
        fonte: {
          livro: 'A Tormenta de Espadas',
          capitulo: 'Jon VIII & IX',
          arquivo_md: 'asos_samwell_3.md',
        },
      },
      epigrafe: {
        texto: 'Eu sou a espada na escuridão. Eu sou a sentinela nas muralhas. Eu sou o fogo que queima contra o frio, a luz que traz o amanhecer, o corno que acorda os que dormem.',
        autor: 'Juramento Sagrado da Patrulha da Noite',
      },
      fallbackText: `A floresta inteira parece marchar. Ao norte da Muralha, a orla dos pinheiros ancestrais vomita uma maré viva de peles, chifres e estandartes rudes: cem mil homens, mulheres e crianças liderados por Mance Rayder, o Rei-Além-da-Muralha. Entre as fileiras dos clãs livres, tartarugas de cerco de madeira verde, mamutes colossais e catapultas improvisadas arremessam pedras do tamanho de bois contra a base de setecentos pés de gelo.

Jon Snow comanda a passarela superior com a calma de gelo herdada de Ned Stark. «Não deixem as tartarugas alcançarem o portão externo!», brada Jon através do vendaval. «Lancem os barris de gelo! Despejem o cascalho congelado sobre os aríetes!» Trinta homens cansados da Patrulha correm ao longo das amuradas, empurrando blocos de gelo puro que despencam em queda livre de setecentos pés, esmagando as máquinas de cerco em estrondos trovejantes.`,
      blocos: [
        {
          funcao: 'abertura',
          texto: `Ao norte da Muralha, cem mil selvagens de Mance Rayder cercam o horizonte. Tartarugas de cerco e catapultas pesadas avançam contra o portão externo enquanto Jon Snow lidera a defesa do cume.`,
        },
        {
          funcao: 'corpo',
          quando: { flagsTodas: ['guardia_do_portao'] },
          texto: `A memória da queda heroica de Donal Noye no túnel queima no seu peito: o sacrifício do ferreiro não será em vão enquanto houver um único homem de pé no topo do gelo.`,
        },
        {
          funcao: 'corpo',
          quando: { flagsTodas: ['vitoria_em_castelo_negro'] },
          texto: `Os veteranos que repeliram os Thenns no pátio sul operam os guinchos com precisão gélida, inabaláveis diante do mar de flechas que sobe da planície.`,
        },
        {
          funcao: 'fecho',
          texto: `Um aríete puxado por dois mamutes descomunais avança em linha reta para a fenda do portão externo. É preciso arremessar os blocos de pedra e gelo antes que o ferro seja quebrado.`,
        },
      ],
      vozesConflito: [
        {
          voz1: 'comando',
          voz2: 'furia',
          fala1: 'Ajuste a alavanca do guincho para o impacto central! Se o barril cair fora da rota, o aríete chega às grades!',
          fala2: 'Corte as cordas de amarração agora! Faça a montanha de pedra desabar sobre os mamutes e quebre o avanço deles!',
        },
      ],
      internalVoices: [
        {
          atributo: 'pressagio',
          resultadoPassivo: 'SUCESSO',
          dcPassiva: 8,
          fala: 'O ar do poente vibra com o choque das pedras. A Muralha resistirá ao peso da carne, mas a traição já sobe pela gaiola de ferro às suas costas.',
        },
      ],
      escolhas: [
        {
          id: 'j4_a4_c1_arremessar_barril_gelo',
          tipo: 'teste_atributo',
          texto: 'Alavancar o bloco de cinco toneladas de gelo e cascalho diretamente sobre o aríete dos mamutes',
          atributo: 'furia',
          dc: 8,
          tom: 'violencia',
          circunstancias: [
            {
              tipo: 'vantagem',
              motivo: 'A altura de setecentos pés multiplica a força devastadora da gravidade.',
            },
          ],
          desfechos: {
            sucesso: {
              ponte: 'O bloco colossal despenca em arco suave e esmaga o teto da tartaruga de cerco com força de meteoro. A madeira estilhaça, os mamutes entram em pânico e a vanguarda de Mance recua desordenada.',
              destino: 'j4_a4_hub_chegada_slynt_thorne',
              marcas: ['muralha_sustentada', 'pedras_arremessadas'],
              delta: { honra: 1, compostura: 1 },
            },
            parcial: {
              ponte: 'O bloco atinge a quina do aríete, quebrando as rodas laterais e travando o avanço das feras, embora o choque estremeça o parapeito onde você apoia os pés.',
              destino: 'j4_a4_hub_chegada_slynt_thorne',
              marcas: ['muralha_sustentada'],
              delta: { sangue: -1 },
            },
            falha: {
              ponte: 'A alavanca quebra sob o gelo e a pedra desliza torta, errando o alvo principal por poucos passos. Os homens precisam recorrer a baldes de piche fervente para conter a investida.',
              destino: 'j4_a4_hub_chegada_slynt_thorne',
              marcas: ['muralha_sustentada'],
              delta: { compostura: -2 },
            },
          },
          onSuccessNodeId: 'j4_a4_hub_chegada_slynt_thorne',
          onPartialFailureNodeId: 'j4_a4_hub_chegada_slynt_thorne',
        },
        {
          id: 'j4_a4_c1_organizar_bateria_balestras',
          tipo: 'teste_atributo',
          texto: 'Coordenar as balestras pesadas para alvejar os condutores dos mamutes na clareira norte',
          atributo: 'comando',
          dc: 8,
          tom: 'honesto',
          desfechos: {
            sucesso: {
              ponte: 'As virotadas de três pés assobiam no ar rarefeito e abatem os dois gigantes que guiavam as feras. Sem controle, os mamutes giram em fúria cega, atropelando a própria infantaria livre.',
              destino: 'j4_a4_hub_chegada_slynt_thorne',
              marcas: ['muralha_sustentada', 'pedras_arremessadas'],
              delta: { honra: 2, compostura: 1 },
            },
            parcial: {
              ponte: 'Os tiros abatem um dos condutores, atrasando o ataque do aríete tempo suficiente para os reforços trazerem mais pedras de arremesso.',
              destino: 'j4_a4_hub_chegada_slynt_thorne',
              marcas: ['muralha_sustentada'],
              delta: { compostura: -1 },
            },
            falha: {
              ponte: 'O vento polar desvia os virotes pesados. Uma pedra lançada por catapulta selvagem bate no parapeito superior, jogando gelo triturado nos olhos dos atiradores.',
              destino: 'j4_a4_hub_chegada_slynt_thorne',
              marcas: ['muralha_sustentada'],
              delta: { sangue: -2, compostura: -1 },
            },
          },
          onSuccessNodeId: 'j4_a4_hub_chegada_slynt_thorne',
          onPartialFailureNodeId: 'j4_a4_hub_chegada_slynt_thorne',
        },
      ],
    },

    // 2. Hub de Diálogo: A Chegada de Slynt e Thorne
    j4_a4_hub_chegada_slynt_thorne: {
      id: 'j4_a4_hub_chegada_slynt_thorne',
      titulo: 'Os Nobres de Atalaia do Mar e a Gaiola de Ferro',
      anoHistorico: '300 d.C.',
      localizacao: 'Gaiola do Guincho e Pátio Superior',
      regionId: 'castelo_negro',
      tipo: 'hub',
      rota: 'comum',
      pov: 'Irmão Sem Nome',
      origem: 'canonica',
      loreContext: {
        fonte: {
          livro: 'A Tormenta de Espadas',
          capitulo: 'Jon IX',
          arquivo_md: 'asos_samwell_3.md',
        },
      },
      fallbackText: `A gaiola de ferro sobe rangendo pelas roldanas congeladas. Quando as portas se abrem no topo da Muralha, não são reforços amigáveis que desembarcam, mas Ser Alliser Thorne e Janos Slynt — o ex-comandante dos Mantos Dourados de Porto Real, exilado para o Muro pelo Duende Tyrion Lannister.

Slynt veste veludo negro forrado de zibelina e tem a cara inchada de um sapo gordo. Seus guardas armados cercam Jon Snow imediatamente. «Aí está ele!», esbraveja Thorne, apontando um dedo ossudo. «O desertor que dormiu na tenda de selvagens, traiu o juramento com uma vadia ruiva e agora se proclama o senhor de Castelo Negro!» Slynt apoia as mãos nas ancas e exige que Jon seja acorrentado e atirado nas celas de gelo.`,
      blocos: [
        {
          funcao: 'abertura',
          texto: `Janos Slynt e Ser Alliser Thorne chegam com reforços de Atalaia do Mar, cercando Jon Snow no topo da Muralha com acusações de traição e deserção.`,
        },
        {
          funcao: 'corpo',
          quando: { flagsTodas: ['testemunha_dor_de_jon'] },
          texto: `A menção rasteira à garota ruiva faz o queixo de Jon tremer de ódio contido, mas você sabe que uma resposta precipitada dará a Slynt o pretexto que ele quer para a forca.`,
        },
        {
          funcao: 'fecho',
          texto: `Os homens de Atalaia do Mar observam a discussão com incerteza. Suas palavras diante da guarnição podem desmascarar a farsa dos bajuladores de Porto Real.`,
        },
      ],
      interlocutores: [
        { id: 'janos_slynt', nome: 'Janos Slynt', papel: 'Lorde Exilado e Comandante Intruso' },
        { id: 'alliser_thorne', nome: 'Ser Alliser Thorne', papel: 'Mestre de Armas Rancoroso' },
        { id: 'jon_snow', nome: 'Jon Snow', papel: 'Comandante da Muralha' },
      ],
      reacoes: [
        {
          companheiro: 'grenn',
          condicao: { flagsTodas: ['aliado_grenn'] },
          fala: 'Jon sangrou para defender este castelo enquanto esses covardes comiam peixe gordo no mar. Não deixaremos que toquem nele.',
        },
      ],
      escolhas: [
        {
          id: 'j4_a4_hub_desafiar_slynt_honra',
          tipo: 'simples',
          texto: 'Interpor-se diante de Janos Slynt e relatar a defesa heroica liderada por Jon no pátio sul',
          tom: 'honesto',
          unica: true,
          permanece: true,
          desfecho: {
            ponte: 'Você fixa o olhar no nobre e declara com voz firme: «Enquanto o senhor viajava de carruagem, Jon Snow derrotou o Magnar de Thenn com uma flecha na perna e salvou a guarnição de ser degolada.» Os patrulheiros ao redor assentem e Slynt recua um passo, furioso.',
            marcas: ['desafiou_janos_slynt', 'lealdade_ao_norte'],
            delta: { honra: 2 },
          },
          nextNodeId: 'j4_a4_hub_chegada_slynt_thorne',
        },
        {
          id: 'j4_a4_hub_desmascarar_thorne',
          tipo: 'simples',
          texto: 'Confrontar Ser Alliser Thorne sobre o abandono de dever durante a crise do Grande Patrulhamento',
          tom: 'ameaca',
          unica: true,
          permanece: true,
          desfecho: {
            ponte: 'Thorne range os dentes amarelos e sibila: «Cuidado com o que diz, irmão sem nome. A forca tem corda para muitos traidores.» Mas o golpe moral atinge os soldados de Atalaia, que baixam as pontas das alabardas.',
            marcas: ['desmascarou_thorne'],
            delta: { compostura: 1 },
          },
          nextNodeId: 'j4_a4_hub_chegada_slynt_thorne',
        },
        {
          id: 'j4_a4_hub_apoiar_jon_estrategia',
          tipo: 'simples',
          texto: 'Aconselhar Jon Snow a manter a calma militar e exigir a palavra diante do conselho de Meistre Aemon',
          tom: 'diplomatico',
          unica: true,
          permanece: true,
          desfecho: {
            ponte: 'Jon respira fundo, abaixa a mão do punho de Garralonga e fala com autoridade serena: «Eu respondo perante a Patrulha e perante Meistre Aemon, não perante covardes de tribunal de estalagem.»',
            marcas: ['lealdade_ao_norte'],
            delta: { compostura: 1, honra: 1 },
          },
          nextNodeId: 'j4_a4_hub_chegada_slynt_thorne',
        },
        {
          id: 'j4_a4_hub_avancar_conselho_guerra',
          tipo: 'simples',
          texto: 'Acompanhar a escolta até o salão de conselho sob o olhar tenso de Janos Slynt [Avançar]',
          tom: 'honesto',
          desfecho: {
            ponte: 'Slynt estala a língua e empurra a porta do conselho. Uma ordem traiçoeira está prestes a ser proferida para eliminar Jon Snow de uma vez por todas.',
            destino: 'j4_a4_o_dilema_da_embaixada',
          },
          nextNodeId: 'j4_a4_o_dilema_da_embaixada',
        },
      ],
    },

    // =========================================================================
    // ETAPA 2: ENCRUZILHADA (1 CENA)
    // =========================================================================

    j4_a4_o_dilema_da_embaixada: {
      id: 'j4_a4_o_dilema_da_embaixada',
      titulo: 'A Sentença do Embaixador sem Espada',
      anoHistorico: '300 d.C.',
      localizacao: 'Câmara do Conselho de Castelo Negro',
      regionId: 'castelo_negro',
      tipo: 'narracao',
      rota: 'comum',
      pov: 'Irmão Sem Nome',
      origem: 'canonica',
      loreContext: {
        fonte: {
          livro: 'A Tormenta de Espadas',
          capitulo: 'Jon IX & X',
          arquivo_md: 'asos_samwell_3.md',
        },
      },
      fallbackText: `A trama de Janos Slynt é tão transparente quanto covarde. Incapaz de executar Jon Snow legalmente diante dos protestos enérgicos de Meistre Aemon e dos homens do Norte, o lorde de Porto Real inventa uma «missão diplomática»:
— O Rei-Além-da-Muralha pediu trégua para parlamentar — mente Slynt com um sorriso seboso. — Você diz que conhece o homem, bastardo. Você vai cruzar o portão norte desarmado, sob bandeira de paz, e vai entrar na tenda de Mance Rayder. E se ele se recusar a recuar, você vai matá-lo.

É uma sentença de morte disfarçada. Se Jon recusar, será enforcado por quebra de ordem; se for, será esquartejado pelos homens livres ou abatido como espião. Jon levanta a cabeça e encara você: ele precisa de um homem de confiança ao seu lado na tenda de Mance, ou de alguém com voz firme no castelo para impedir que Slynt tome o poder absoluto pelas costas.`,
      blocos: [
        {
          funcao: 'abertura',
          texto: `Janos Slynt profere a sentença traiçoeira: Jon Snow deve cavalgar desarmado até a tenda de Mance Rayder para parlamentar ou assassiná-lo sob bandeira de paz.`,
        },
        {
          funcao: 'corpo',
          quando: { flagsTodas: ['desafiou_janos_slynt'] },
          texto: `Slynt olha com veneno na sua direção, avisando que se você não acompanhar o bastardo na missão suicida, passará o resto dos seus dias limpando as latrinas congeladas de Castelo Negro.`,
        },
        {
          funcao: 'fecho',
          texto: `O cavalo de Jon já está selado na boca do túnel. Duas escolhas de honra se abrem diante do seu destino na Patrulha.`,
        },
      ],
      escolhas: [
        {
          id: 'j4_a4_decisao_embaixada_mance',
          tipo: 'simples',
          texto: 'Montar a cavalo ao lado de Jon Snow e escoltá-lo até a tenda de Mance Rayder no acampamento selvagem',
          tom: 'devocao',
          desfecho: {
            ponte: 'Você pega as rédeas da montaria e emparelha com Jon Snow. O portão de gelo sobe com rangido fúnebre e vocês dois cavalgam desarmados rumo ao mar de cem mil selvagens.',
            destino: 'j4_a4_mance_o_chifre_do_inverno',
            marcas: ['posto_embaixada_mance'],
            delta: { honra: 2 },
          },
          nextNodeId: 'j4_a4_mance_o_chifre_do_inverno',
        },
        {
          id: 'j4_a4_decisao_resistencia_slynt',
          tipo: 'simples',
          texto: 'Permanecer em Castelo Negro para mobilizar Cotter Pyke, Denys Mallister e Meistre Aemon contra o golpe de Slynt',
          tom: 'honesto',
          desfecho: {
            ponte: 'Você aperta a mão de Jon com força solene: «Vá em paz, irmão. Garanto que este castelo não cairá nas garras de traidores enquanto você estiver fora.» Jon assente e parte para a neve.',
            destino: 'j4_a4_resistencia_enfrentar_janos_slynt',
            marcas: ['posto_resistencia_slynt'],
            delta: { compostura: 1, honra: 1 },
          },
          nextNodeId: 'j4_a4_resistencia_enfrentar_janos_slynt',
        },
      ],
    },

    // =========================================================================
    // ETAPA 3: ROTAS (6 CENAS: 3 POR ROTA, EXCLUSIVIDADE ≥ 60%)
    // =========================================================================

    // --- ROTA A: A TENDA DE MANCE RAYDER ---

    // Rota A1: O Berrante do Inverno
    j4_a4_mance_o_chifre_do_inverno: {
      id: 'j4_a4_mance_o_chifre_do_inverno',
      titulo: 'O Chifre Negro de Joramun',
      anoHistorico: '300 d.C.',
      localizacao: 'Tenda Real de Mance Rayder, Floresta Assombrada',
      regionId: 'floresta_assombrada',
      tipo: 'dialogo',
      rota: 'mance',
      pov: 'Irmão Sem Nome',
      origem: 'canonica',
      loreContext: {
        fonte: {
          livro: 'A Tormenta de Espadas',
          capitulo: 'Jon X',
          arquivo_md: 'asos_samwell_3.md',
        },
      },
      fallbackText: `A tenda de Mance Rayder é erguida com peles grossas de mamute e iluminada por um braseiro de turfa verde. Sobre uma mesa tosca de carvalho repousa um corno monstruoso de dois metros de comprimento, entalhado em chifre negro de auroque ancestral com runas douradas dos Primeiros Homens.

O Rei-Além-da-Muralha está sentado com o alaúde de lado e a capa de seda vermelha de Asshai remendada nos ombros. Mance olha para Jon Snow e para você com tristeza serena:
— Slynt enviou vocês para me matar, não foi? Mas vocês não entendem nada. Nós não queremos destruir a Muralha; nós queremos nos abrigar atrás dela. Os Outros acordaram, rapazes. Se eu tocar o Berrante de Joramun, a Muralha desaba em cinzas e o mundo inteiro congela. Abram os portões para o meu povo passar, ou serei forçado a soprar esta trombeta.`,
      blocos: [
        {
          funcao: 'abertura',
          texto: `Na tenda de Mance Rayder, repousa o lendário Berrante de Joramun com suas runas antigas. Mance oferece a paz em troca da passagem do povo livre para o sul da Muralha.`,
        },
        {
          funcao: 'corpo',
          quando: { flagsTodas: ['posto_embaixada_mance'] },
          texto: `Jon Snow encara o rei selvagem com os olhos fixos no corno ancestral: a verdade brutal é que os selvagens não fogem por conquista, mas pelo pavor cósmico dos Outros.`,
        },
        {
          funcao: 'fecho',
          texto: `A tensão na tenda é cortante. Se a negociação fracassar, as lâminas de guarda de Harma Cabeça de Cão degolarão os embaixadores antes que o sol se ponha.`,
        },
      ],
      interlocutores: [
        { id: 'mance_rayder', nome: 'Mance Rayder', papel: 'Rei-Além-da-Muralha' },
      ],
      falas: [
        {
          quem: 'mance_rayder',
          texto: 'Deixem meu povo passar. As mulheres, as crianças, os rebanhos. Se nos trancarem do lado de fora, viraremos o exército deles.',
        },
      ],
      escolhas: [
        {
          id: 'j4_a4_ra1_negociar_termos_rendicao',
          tipo: 'teste_atributo',
          texto: 'Propor que Mance entregue o Berrante como prova de boa-fé em troca da mediação com o conselho',
          atributo: 'cortesia',
          dc: 9,
          tom: 'diplomatico',
          desfechos: {
            sucesso: {
              ponte: 'Mance hesita, admirado pela sua coragem e moderação: «Você fala como um patrulheiro antigo, irmão. Se o Velho Urso ainda vivesse, teríamos acordo.» O rei pousa a mão sobre o corno sem soprá-lo.',
              destino: 'j4_a4_mance_trombetas_do_sul',
              marcas: ['testemunha_do_berrante', 'diplomacia_do_povo_livre'],
              delta: { honra: 2, compostura: 1 },
            },
            parcial: {
              ponte: 'Mance recusa entregar o berrante, mas concede mais duas horas de parlamento antes de tomar qualquer decisão definitiva.',
              destino: 'j4_a4_mance_trombetas_do_sul',
              marcas: ['testemunha_do_berrante'],
              delta: { compostura: -1 },
            },
            falha: {
              ponte: 'Harma saca a adaga com um rosnado furioso e o diálogo quase se rompe em sangue antes que Mance erga a mão para impor silêncio aos guardas.',
              destino: 'j4_a4_mance_trombetas_do_sul',
              marcas: ['testemunha_do_berrante'],
              delta: { compostura: -2 },
            },
          },
          onSuccessNodeId: 'j4_a4_mance_trombetas_do_sul',
          onPartialFailureNodeId: 'j4_a4_mance_trombetas_do_sul',
        },
        {
          id: 'j4_a4_ra1_ganhar_tempo_observacao',
          tipo: 'teste_atributo',
          texto: 'Manter a compostura e prolongar a conversa para avaliar a guarda pessoal de Mance',
          atributo: 'astucia',
          dc: 8,
          tom: 'silencio',
          desfechos: {
            sucesso: {
              ponte: 'Com perguntas calculadas sobre os movimentos além dos desfiladeiros, você ganha preciosos minutos enquanto mapeia as saídas da tenda e o estado das armas selvagens.',
              destino: 'j4_a4_mance_trombetas_do_sul',
              marcas: ['testemunha_do_berrante', 'diplomacia_do_povo_livre'],
              delta: { compostura: 2 },
            },
            parcial: {
              ponte: 'A conversa se arrasta sob desconfiança mútua, mantendo o impasse vivo enquanto o tempo passa na floresta.',
              destino: 'j4_a4_mance_trombetas_do_sul',
              marcas: ['testemunha_do_berrante'],
              delta: { compostura: -1 },
            },
            falha: {
              ponte: 'Mance nota a evasiva e franze o cenho: «Vocês não vieram para parlamentar, vieram para ganhar tempo.» A guarda cerra os machados ao redor de Jon.',
              destino: 'j4_a4_mance_trombetas_do_sul',
              marcas: ['testemunha_do_berrante'],
              delta: { sangue: -1, compostura: -1 },
            },
          },
          onSuccessNodeId: 'j4_a4_mance_trombetas_do_sul',
          onPartialFailureNodeId: 'j4_a4_mance_trombetas_do_sul',
        },
      ],
    },

    // Rota A2: As Trombetas do Sul
    j4_a4_mance_trombetas_do_sul: {
      id: 'j4_a4_mance_trombetas_do_sul',
      titulo: 'O Clamor dos Clarins na Floresta',
      anoHistorico: '300 d.C.',
      localizacao: 'Orla do Acampamento Selvagem',
      regionId: 'floresta_assombrada',
      tipo: 'narracao',
      rota: 'mance',
      pov: 'Irmão Sem Nome',
      origem: 'original',
      notaHistorica: 'O ataque surpresa de três colunas de cavalaria pesada do Rei Stannis Baratheon desbaratando as linhas selvagens.',
      loreContext: {
        fonte: {
          livro: 'A Tormenta de Espadas',
          capitulo: 'Jon X',
          arquivo_md: 'asos_samwell_3.md',
        },
      },
      fallbackText: `O som não vem da Muralha; vem do leste e do oeste, ecoando entre os pinheiros gelados como o trovão de uma tempestade súbita: trombetas de ferro e clarins de prata de cavalaria de Westeros!

Um grito de pavor irrompe pelas fileiras dos selvagens: «Cavaleiros! Cavaleiros de armadura!». Três colunas maciças de cavaleiros cobertos de malha prateada e montados em cavalos de guerra protegidos por bardas de couro irrompem pela floresta. À frente da cunha central tremula um estandarte descomunal: um coração em chamas com o veado negro dos Baratheon no centro. É o Rei Stannis Baratheon em pessoa, caindo sobre o flanco desprotegido do acampamento de cem mil!`,
      blocos: [
        {
          funcao: 'abertura',
          texto: `Clarins de prata rasgam o silêncio da floresta. Três colunas de cavalaria pesada com o estandarte do Coração Flamejante atacam o acampamento selvagem pelos flancos.`,
        },
        {
          funcao: 'corpo',
          quando: { flagsTodas: ['diplomacia_do_povo_livre'] },
          texto: `O ataque súbito desfaz o parlamento em um segundo; Mance corre para as amarras da tenda para tentar organizar os guerreiros, enquanto Jon Snow protege a retaguarda desarmada.`,
        },
        {
          funcao: 'fecho',
          texto: `Lanças de cavalaria partem as paliçadas selvagens. Cavalos de guerra atropelam tendas e o caos toma conta do acampamento de cem mil.`,
        },
      ],
      escolhas: [
        {
          id: 'j4_a4_ra2_proteger_jon_na_carga',
          tipo: 'teste_atributo',
          texto: 'Apanhar uma espada caída e abrir caminho entre a debandada para proteger Jon Snow',
          atributo: 'furia',
          dc: 8,
          tom: 'violencia',
          desfechos: {
            sucesso: {
              ponte: 'Com golpes ágeis, você apara o machado de um guerreiro em fuga e conduz Jon para trás de uma barreira de toras caídas, mantendo o bastardo a salvo da carga dos cavaleiros de Stannis.',
              destino: 'j4_a4_mance_o_abate_na_floresta',
              marcas: ['trombetas_de_stannis_ouvidas', 'choque_na_floresta'],
              delta: { honra: 2, compostura: 1 },
            },
            parcial: {
              ponte: 'Você resgata uma lâmina curta e apara os trancos da multidão em pânico, saindo com o manto rasgado mas com Jon em total segurança.',
              destino: 'j4_a4_mance_o_abate_na_floresta',
              marcas: ['trombetas_de_stannis_ouvidas'],
              delta: { sangue: -1 },
            },
            falha: {
              ponte: 'Um cavalo desgovernado atinge você de flanco na neve fofa. Você rola na vala com Jon, machucando o joelho antes de alcançar a clareira dos cavaleiros.',
              destino: 'j4_a4_mance_o_abate_na_floresta',
              marcas: ['trombetas_de_stannis_ouvidas'],
              delta: { sangue: -2, compostura: -1 },
            },
          },
          onSuccessNodeId: 'j4_a4_mance_o_abate_na_floresta',
          onPartialFailureNodeId: 'j4_a4_mance_o_abate_na_floresta',
        },
        {
          id: 'j4_a4_ra2_sinalizar_para_cavaleiros',
          tipo: 'teste_atributo',
          texto: 'Erguer o manto negro da Patrulha para evitar que os cavaleiros de Stannis os pisoteiem como selvagens',
          atributo: 'comando',
          dc: 8,
          tom: 'honesto',
          desfechos: {
            sucesso: {
              ponte: 'Você desfralda o manto negro e brada o lema da Patrulha. Os cavaleiros de ponta reconhecem os irmãos jurados e abrem a linha de choque, cercando a tenda de Mance com ordem militar.',
              destino: 'j4_a4_mance_o_abate_na_floresta',
              marcas: ['trombetas_de_stannis_ouvidas', 'choque_na_floresta'],
              delta: { honra: 2, compostura: 1 },
            },
            parcial: {
              ponte: 'O sinal é visto a tempo de desviar as lanças, embora a poeira e a neve levantadas pelos cascos sujem os olhos e atordoem o grupo.',
              destino: 'j4_a4_mance_o_abate_na_floresta',
              marcas: ['trombetas_de_stannis_ouvidas'],
              delta: { compostura: -1 },
            },
            falha: {
              ponte: 'A fumaça cobre o seu sinal e uma lança de montaria passa a centímetros do seu ombro antes que um sargento de Stannis ordene o freio dos corcéis.',
              destino: 'j4_a4_mance_o_abate_na_floresta',
              marcas: ['trombetas_de_stannis_ouvidas'],
              delta: { sangue: -1, compostura: -1 },
            },
          },
          onSuccessNodeId: 'j4_a4_mance_o_abate_na_floresta',
          onPartialFailureNodeId: 'j4_a4_mance_o_abate_na_floresta',
        },
      ],
    },

    // Rota A3: O Abate na Floresta & A Captura de Mance
    j4_a4_mance_o_abate_na_floresta: {
      id: 'j4_a4_mance_o_abate_na_floresta',
      titulo: 'A Espada que Ilumina a Tempestade',
      anoHistorico: '300 d.C.',
      localizacao: 'Clareira da Tenda Real de Mance',
      regionId: 'floresta_assombrada',
      tipo: 'narracao',
      rota: 'mance',
      pov: 'Irmão Sem Nome',
      origem: 'original',
      notaHistorica: 'Rendição de Mance Rayder e prisão dos chefes de clã pelos cavaleiros de Stannis Baratheon.',
      loreContext: {
        fonte: {
          livro: 'A Tormenta de Espadas',
          capitulo: 'Jon X & XI',
          arquivo_md: 'asos_samwell_3.md',
        },
      },
      fallbackText: `A batalha terminou antes do meio-dia. Contra a cavalaria pesada disciplinada de Stannis, a infantaria caótica dos clãs livres não teve chance de formar fileiras. Harma Cabeça de Cão tombou crivada de lanças; os mamutes debandaram desgovernados em direção aos desfiladeiros do oeste e milhares de cativos são reunidos sob a mira das espadas reais.

Diante da tenda real esmagada, Mance Rayder entrega a espada sem honra nem alarde, ajoelhando-se para proteger a mulher Dalla, que deu à luz no meio do combate. Ser Richard Horpe e os cavaleiros de Stannis prendem os grilhões de ferro nos pulsos do rei selvagem. A Muralha foi salva pelo exército do sul, mas um novo soberano dita as ordens nesta terra congelada.`,
      blocos: [
        {
          funcao: 'abertura',
          texto: `A infantaria selvagem foi desbaratada pela cavalaria pesada. Mance Rayder é acorrentado na neve diante da tenda real, rendendo-se para salvar sua mulher e o filho recém-nascido.`,
        },
        {
          funcao: 'corpo',
          quando: { flagsTodas: ['choque_na_floresta'] },
          texto: `A sua presença firme ao lado de Jon Snow durante a investida garantiu que os nobres de Stannis tratassem os embaixadores da Patrulha com o respeito devido à irmandade.`,
        },
        {
          funcao: 'fecho',
          texto: `Os clarins tocam a vitória de Stannis. É hora de retornar a Castelo Negro escoltando os prisioneiros e o Berrante de Joramun.`,
        },
      ],
      escolhas: [
        {
          id: 'j4_a4_ra3_assegurar_protecao_bebe_mance',
          tipo: 'simples',
          texto: 'Interceder junto aos cavaleiros de Stannis pela integridade de Dalla e do bebê recém-nascido',
          tom: 'honesto',
          desfecho: {
            ponte: 'A sua intervenção serena convence Ser Richard Horpe a colocar uma guarda de honra na tenda da mãe moribunda. Mance ergue os olhos agradecidos e Jon Snow testemunha a sua nobreza de espírito.',
            destino: 'j4_a4_a_oferta_de_winterfell',
            marcas: ['mance_capturado_vivo', 'honra_em_combate'],
            delta: { honra: 2, compostura: 1 },
          },
          nextNodeId: 'j4_a4_a_oferta_de_winterfell',
        },
        {
          id: 'j4_a4_ra3_recuperar_berrante_joramun',
          tipo: 'simples',
          texto: 'Tomar posse do Berrante de Joramun e entregá-lo sob custódia direta da Patrulha da Noite',
          tom: 'devocao',
          desfecho: {
            ponte: 'Você envolve o corno lendário em um manto de lã e o prende na sela de Jon Snow. A arma que poderia destruir a Muralha está agora sob a guarda fiel dos homens de preto.',
            destino: 'j4_a4_a_oferta_de_winterfell',
            marcas: ['mance_capturado_vivo'],
            delta: { honra: 1, compostura: 1 },
          },
          nextNodeId: 'j4_a4_a_oferta_de_winterfell',
        },
      ],
    },

    // --- ROTA B: A RESISTÊNCIA A JANOS SLYNT ---

    // Rota B1: Confronto com Janos Slynt
    j4_a4_resistencia_enfrentar_janos_slynt: {
      id: 'j4_a4_resistencia_enfrentar_janos_slynt',
      titulo: 'A Voz dos Veteranos contra o Bajulador',
      anoHistorico: '300 d.C.',
      localizacao: 'Pátio Central de Castelo Negro',
      regionId: 'castelo_negro',
      tipo: 'dialogo',
      rota: 'resistencia',
      pov: 'Irmão Sem Nome',
      origem: 'original',
      notaHistorica: 'Resistência política no pátio contra as tentativas de Janos Slynt de prender os partidários de Jon Snow.',
      loreContext: {
        fonte: {
          livro: 'A Tormenta de Espadas',
          capitulo: 'Jon X',
          arquivo_md: 'asos_samwell_3.md',
        },
      },
      fallbackText: `Com Jon Snow cavalgando desarmado rumo ao acampamento de Mance Rayder, Janos Slynt acredita que Castelo Negro está na palma da sua mão gorda. No meio do pátio, cercado por seis guardas com estandartes dourados de Porto Real, Slynt começa a decretar confiscos e ordens de prisão contra os homens mais próximos ao bastardo.

«Este forte agora está sob autoridade da Coroa e dos homens de nascimento decente!», ladra Slynt aos patrulheiros reunidos. «Quem murmurar contra as decisões do conselho vai direto para a forca por motim!» Você dá um passo à frente com Grenn e os veteranos que sangraram no pátio sul, as mãos pousadas nas empunhaduras de ferro.`,
      blocos: [
        {
          funcao: 'abertura',
          texto: `Janos Slynt tenta impor sua autoridade tirânica no pátio, ameaçando enforcar os patrulheiros fiéis a Jon Snow e Jeor Mormont.`,
        },
        {
          funcao: 'corpo',
          quando: { flagsTodas: ['posto_resistencia_slynt'] },
          texto: `Você permaneceu no forte exatamente para ser o escudo dos homens justos contra as arbitrariedades dos cortesãos corrompidos.`,
        },
        {
          funcao: 'fecho',
          texto: `Slynt gagueja de raiva ao ver que os veteranos da intendência não baixam os olhos diante de suas ameaças vazias.`,
        },
      ],
      interlocutores: [
        { id: 'janos_slynt', nome: 'Janos Slynt', papel: 'Comandante Autoproclamado' },
      ],
      falas: [
        {
          quem: 'janos_slynt',
          texto: 'Ajoelhe-se diante da nobreza, seu selvagem sem nome! Eu jantei com a rainha Cersei e não vou tolerar insolência de plebeus de capa rasgada!',
        },
      ],
      escolhas: [
        {
          id: 'j4_a4_rb1_lembrar_juramento_patrulha',
          tipo: 'teste_atributo',
          texto: 'Dar um passo firme à frente e recitar o juramento da Patrulha que proíbe submissão a lordes e rainhas',
          atributo: 'comando',
          dc: 8,
          tom: 'devocao',
          desfechos: {
            sucesso: {
              ponte: 'A sua voz troveja no pátio como um sino de guerra: «Não usamos coroas e não ganhamos glórias! No Muro, todo homem começa do mesmo barro e nenhum ouro de Porto Real compra a honra da Patrulha!» Os irmãos jurados fecham fileiras atrás de você e os homens de Slynt recuam desmoralizados.',
              destino: 'j4_a4_resistencia_o_conselho_das_celas',
              marcas: ['confrontou_tirania_slynt', 'respeito_dos_veteranos'],
              delta: { honra: 2, compostura: 1 },
            },
            parcial: {
              ponte: 'Você contesta a autoridade de Slynt e ganha o apoio murmuroso da guarnição, forçando o lorde a adiar as prisões arbitrárias.',
              destino: 'j4_a4_resistencia_o_conselho_das_celas',
              marcas: ['confrontou_tirania_slynt'],
              delta: { compostura: -1 },
            },
            falha: {
              ponte: 'Slynt manda seus guardas avançarem com alabardas, criando um impasse tenso que só é interrompido pelos gritos dos vigias da torre.',
              destino: 'j4_a4_resistencia_o_conselho_das_celas',
              marcas: ['confrontou_tirania_slynt'],
              delta: { sangue: -1, compostura: -1 },
            },
          },
          onSuccessNodeId: 'j4_a4_resistencia_o_conselho_das_celas',
          onPartialFailureNodeId: 'j4_a4_resistencia_o_conselho_das_celas',
        },
        {
          id: 'j4_a4_rb1_ironizar_porto_real',
          tipo: 'teste_atributo',
          texto: 'Ironizar a covardia de Slynt em combates reais e exigir a presença de Cotter Pyke e Denys Mallister',
          atributo: 'cortesia',
          dc: 9,
          tom: 'honesto',
          desfechos: {
            sucesso: {
              ponte: 'Com ironia afiada, você expõe que Janos Slynt escondeu-se na adega durante a Batalha da Água Negra. O riso dos veteranos ecoa no pátio, destruindo a autoridade do lorde e abrindo caminho para a mediação dos outros fortes.',
              destino: 'j4_a4_resistencia_o_conselho_das_celas',
              marcas: ['confrontou_tirania_slynt', 'respeito_dos_veteranos'],
              delta: { honra: 1, compostura: 2 },
            },
            parcial: {
              ponte: 'A chacota atinge em cheio o orgulho de Slynt, que fica roxo de cólera mas hesita em mandar atacar diante da maioria hostil.',
              destino: 'j4_a4_resistencia_o_conselho_das_celas',
              marcas: ['confrontou_tirania_slynt'],
              delta: { compostura: -1 },
            },
            falha: {
              ponte: 'Um sargento de Slynt empurra você contra uma viga antes que Grenn intervenha para evitar um massacre interno no pátio.',
              destino: 'j4_a4_resistencia_o_conselho_das_celas',
              marcas: ['confrontou_tirania_slynt'],
              delta: { sangue: -1, compostura: -1 },
            },
          },
          onSuccessNodeId: 'j4_a4_resistencia_o_conselho_das_celas',
          onPartialFailureNodeId: 'j4_a4_resistencia_o_conselho_das_celas',
        },
      ],
    },

    // Rota B2: O Conselho com Pyke e Mallister
    j4_a4_resistencia_o_conselho_das_celas: {
      id: 'j4_a4_resistencia_o_conselho_das_celas',
      titulo: 'O Equilíbrio dos Comandantes',
      anoHistorico: '300 d.C.',
      localizacao: 'Salão dos Escudos de Castelo Negro',
      regionId: 'castelo_negro',
      tipo: 'narracao',
      rota: 'resistencia',
      pov: 'Irmão Sem Nome',
      origem: 'original',
      notaHistorica: 'Articulação com Cotter Pyke de Atalaia do Mar e Ser Denys Mallister da Torre Sombria contra o golpe de Slynt.',
      loreContext: {
        fonte: {
          livro: 'A Tormenta de Espadas',
          capitulo: 'Jon X & XI',
          arquivo_md: 'asos_samwell_3.md',
        },
      },
      fallbackText: `No Salão dos Escudos, a presença de Ser Denys Mallister — o nobre venerável da Torre Sombria com barbas de prata — e de Cotter Pyke — o bastardo rude das Ilhas de Ferro que comanda Atalaia do Mar — quebra o monopólio de Slynt. Embora os dois veteranos se detestem com cordialidade militar, nenhum deles aceita que um bajulador exilado de Porto Real governe a Patrulha pela força.

Meistre Aemon senta-se entre eles com a face serena e cega. Você apresenta os relatórios da defesa sul, o heroísmo de Jon Snow e o sacrifício de Donal Noye no túnel dos gigantes. A verdade dos fatos desarma as acusações forjadas de Alliser Thorne e garante que qualquer julgamento seja adiado até a eleição formal do novo Senhor Comandante.`,
      blocos: [
        {
          funcao: 'abertura',
          texto: `No Salão dos Escudos, Denys Mallister e Cotter Pyke escutam o seu testemunho detalhado sobre a defesa de Castelo Negro e o sacrifício de Donal Noye.`,
        },
        {
          funcao: 'corpo',
          quando: { flagsTodas: ['desmascarou_thorne'] },
          texto: `As intrigas venenosas de Alliser Thorne são esvaziadas diante da firmeza com que os veteranos da intendência confirmam o comando exemplar de Jon Snow.`,
        },
        {
          funcao: 'fecho',
          texto: `Cotter Pyke bate com o punho na mesa e encerra as ameaças de Slynt: Jon Snow será tratado como irmão jurado e nenhum julgamento ocorrerá sem o conclave.`,
        },
      ],
      escolhas: [
        {
          id: 'j4_a4_rb2_unir_mallister_pyke',
          tipo: 'teste_atributo',
          texto: 'Apelar para a honra compartilhada de Mallister e Pyke para manter a Patrulha indivisa',
          atributo: 'cortesia',
          dc: 8,
          tom: 'diplomatico',
          desfechos: {
            sucesso: {
              ponte: 'As suas palavras sinceras comovem até o coração rude de Cotter Pyke. Os dois comandantes apertam as mãos diante de Meistre Aemon e selam um pacto de neutralidade armada, blindando o castelo contra qualquer golpe de Slynt.',
              destino: 'j4_a4_resistencia_a_chegada_do_rei',
              marcas: ['apoio_pyke_mallister', 'celas_de_gelo_evitadas'],
              delta: { honra: 2, compostura: 1 },
            },
            parcial: {
              ponte: 'Mallister e Pyke concordam em vetar as ordens de Slynt, embora continuem disputando entre si a sucessão do comando supremo.',
              destino: 'j4_a4_resistencia_a_chegada_do_rei',
              marcas: ['apoio_pyke_mallister'],
              delta: { compostura: -1 },
            },
            falha: {
              ponte: 'A discussão entre os comandantes sobe de tom e Meistre Aemon precisa intervir pessoalmente para evitar que a reunião termine em bate-boca.',
              destino: 'j4_a4_resistencia_a_chegada_do_rei',
              marcas: ['apoio_pyke_mallister'],
              delta: { compostura: -1 },
            },
          },
          onSuccessNodeId: 'j4_a4_resistencia_a_chegada_do_rei',
          onPartialFailureNodeId: 'j4_a4_resistencia_a_chegada_do_rei',
        },
        {
          id: 'j4_a4_rb2_apresentar_provas_escritas',
          tipo: 'simples',
          texto: 'Apresentar as ordens originais de Bowen Marsh e os registros da forja de Donal Noye',
          tom: 'honesto',
          desfecho: {
            ponte: 'Os documentos irrefutáveis provam que Jon Snow assumiu o comando por ordem direta de Donal Noye antes da descida ao túnel. Janos Slynt é desmascarado em público.',
            destino: 'j4_a4_resistencia_a_chegada_do_rei',
            marcas: ['apoio_pyke_mallister', 'celas_de_gelo_evitadas'],
            delta: { honra: 1, compostura: 1 },
          },
          nextNodeId: 'j4_a4_resistencia_a_chegada_do_rei',
        },
      ],
    },

    // Rota B3: A Chegada Triunfal de Stannis
    j4_a4_resistencia_a_chegada_do_rei: {
      id: 'j4_a4_resistencia_a_chegada_do_rei',
      titulo: 'O Rei que Veio ao Chamado do Norte',
      anoHistorico: '300 d.C.',
      localizacao: 'Pátio Central de Castelo Negro',
      regionId: 'castelo_negro',
      tipo: 'narracao',
      rota: 'resistencia',
      pov: 'Irmão Sem Nome',
      origem: 'original',
      notaHistorica: 'Entrada formal de Stannis Baratheon em Castelo Negro impondo a lei marcial e silenciando Janos Slynt.',
      loreContext: {
        fonte: {
          livro: 'A Tormenta de Espadas',
          capitulo: 'Jon XI',
          arquivo_md: 'asos_samwell_3.md',
        },
      },
      fallbackText: `O som de cem clarins ressoa pelo portão sul. Montado em um garanhão negro de batalha, com a espada Luminífera reluzindo com chamas avermelhadas na bainha, o Rei Stannis Baratheon adentra o pátio de Castelo Negro. Ao lado dele cavalga a sacerdotisa vermelha Melisandre de Asshai, envolta em sedas escarlates que parecem arder sob o vento gélido.

Janos Slynt cai de joelhos na lama ensanguentada com a bajulação servil que sempre praticou na corte. Mas o olhar de granito azul de Stannis corta o homem como uma lâmina fria: «Lorde Slynt... disseram-me que o senhor comandava os Mantos Dourados quando Eddard Stark foi traído. E disseram-me que o senhor se escondeu nas adegas durante o ataque a este castelo.» Stannis desmonta e assume o pavilhão do comandante, impondo a justiça real sobre a fortaleza.`,
      blocos: [
        {
          funcao: 'abertura',
          texto: `O Rei Stannis Baratheon e a sacerdotisa Melisandre adentram Castelo Negro com sua guarda de honra. A presença austera do soberano quebra as ambições mesquinhas de Janos Slynt.`,
        },
        {
          funcao: 'corpo',
          quando: { flagsTodas: ['apoio_pyke_mallister'] },
          texto: `Os comandantes Mallister e Pyke inclinam as cabeças em respeito solene ao rei que cavalgou para salvar a Muralha, enquanto Slynt permanece humilhado na lama.`,
        },
        {
          funcao: 'fecho',
          texto: `Stannis exige que a Patrulha eleja seu novo Senhor Comandante sem demora e convoca Jon Snow, recém-chegado da batalha externa, para uma audiência privada na câmara do topo da torre.`,
        },
      ],
      escolhas: [
        {
          id: 'j4_a4_rb3_saudar_o_rei_stannis',
          tipo: 'simples',
          texto: 'Bater o punho na couraça em respeito ao rei que atendeu ao chamado de socorro da Patrulha',
          tom: 'honesto',
          desfecho: {
            ponte: 'Stannis fixa os olhos duros em você e assente com um único movimento seco de cabeça: «A Patrulha fez o seu dever resistindo na escuridão; eu fiz o meu vindo em socorro do reino.» A ordem é restabelecida.',
            destino: 'j4_a4_a_oferta_de_winterfell',
            marcas: ['presenca_do_rei_stannis', 'justica_imposta_a_slynt'],
            delta: { honra: 1, compostura: 1 },
          },
          nextNodeId: 'j4_a4_a_oferta_de_winterfell',
        },
        {
          id: 'j4_a4_rb3_acompanhar_jon_audiencia',
          tipo: 'simples',
          texto: 'Acompanhar Jon Snow até os aposentos superiores para a reunião com Stannis',
          tom: 'devocao',
          desfecho: {
            ponte: 'Você sobe as escadas ao lado de Jon. O bastardo de Winterfell prepara-se para encarar a maior tentação de sua vida diante do претенdente ao Trono de Ferro.',
            destino: 'j4_a4_a_oferta_de_winterfell',
            marcas: ['presenca_do_rei_stannis'],
            delta: { compostura: 2 },
          },
          nextNodeId: 'j4_a4_a_oferta_de_winterfell',
        },
      ],
    },

    // =========================================================================
    // ETAPA 4: PEÇA DE CENÁRIO CANÔNICA (3 CENAS FIXAS)
    // =========================================================================

    // Peça 1: A Oferta de Winterfell a Jon Snow
    j4_a4_a_oferta_de_winterfell: {
      id: 'j4_a4_a_oferta_de_winterfell',
      titulo: 'O Preço de um Nome e de um Castelo',
      anoHistorico: '300 d.C.',
      localizacao: 'Aposentos do Rei, Torre do Rei',
      regionId: 'castelo_negro',
      tipo: 'dialogo',
      rota: 'comum',
      pov: 'Irmão Sem Nome',
      origem: 'canonica',
      loreContext: {
        fonte: {
          livro: 'A Tormenta de Espadas',
          capitulo: 'Jon XI & XII',
          arquivo_md: 'asos_samwell_3.md',
        },
      },
      fallbackText: `Na câmara aquecida da Torre do Rei, Stannis Baratheon observa o mapa de Westeros com dentes cerrados. Melisandre permanece junto à lareira, as chamas vermelhas refletindo-se nos seus olhos cor de rubi. Diante deles está Jon Snow, com a capa negra em farrapos e Fantasma, o lobo gigante branco como a neve, deitado aos seus pés.

— Eu posso legitimá-lo por decreto real — fala Stannis com voz áspera de pedra. — Você deixará de ser um bastardo sem herança. Você será Jon Stark, Senhor de Winterfell. Marchará ao meu lado, reunirá os senhores do Norte e tomará o castelo de seus ancestrais dos Bolton. Em troca, você deve dobrar o joelho ao Senhor da Luz e queimar o represeiro do bosque sagrado de Winterfell.

É o sonho de toda a infância de Jon: ser o senhor legítimo da casa de seu pai. Mas o preço é cuspir nos deuses antigos e quebrar o juramento sagrado da Patrulha da Noite. Jon olha para você, buscando nos seus olhos o conselho de quem compartilhou cada gota de sangue desta jornada.`,
      blocos: [
        {
          funcao: 'abertura',
          texto: `Stannis oferece a Jon Snow a realização do sonho de sua vida: a legitimação real como Jon Stark, Senhor de Winterfell, em troca de queimar o represeiro e jurar lealdade a R'hllor.`,
        },
        {
          funcao: 'corpo',
          quando: { flagsTodas: ['presenca_do_rei_stannis'] },
          texto: `A autoridade de Stannis preenche a câmara com o peso de uma coroa de ferro, mas Fantasma ergue a cabeça vermelha e branca, lembrando as raízes antigas dos primeiros reis do inverno.`,
        },
        {
          funcao: 'corpo',
          quando: { flagsTodas: ['mance_capturado_vivo'] },
          texto: `Jon sabe que aceitar Winterfell sob tais termos faria dele um traidor tanto perante a memória de Ned Stark quanto perante o juramento que fez sob as copas dos represeiros.`,
        },
        {
          funcao: 'fecho',
          texto: `Jon fecha os olhos e respira fundo. O juramento da Patrulha é eterno; ele não venderá a sua alma por um trono de pedra.`,
        },
      ],
      interlocutores: [
        { id: 'jon_snow', nome: 'Jon Snow', papel: 'Patrulheiro e Filho de Ned Stark' },
        { id: 'stannis', nome: 'Stannis Baratheon', papel: 'Rei no Muro' },
      ],
      falas: [
        {
          quem: 'jon_snow',
          texto: 'Winterfell pertence a Sansa... e os deuses do meu pai não serão queimados. Eu sou um irmão jurado da Patrulha da Noite. Meu lugar é aqui.',
        },
      ],
      escolhas: [
        {
          id: 'j4_a4_pc1_apoiar_recusa_de_jon',
          tipo: 'simples',
          texto: 'Bater a mão no peito e confirmar a Stannis que o dever da Patrulha está acima de terras e títulos',
          tom: 'devocao',
          desfecho: {
            ponte: 'Stannis franze o cenho e cerra a mandíbula com aspereza, mas nos olhos do rei há um respeito relutante: «Os Stark são teimosos como o granito do Norte. Que seja. Desçam para o conclave; a Patrulha precisa escolher seu líder esta noite.»',
            destino: 'j4_a4_a_eleicao_do_998_conclave',
            marcas: ['testemunha_recusa_de_jon', 'juramento_inquebrantavel'],
            delta: { honra: 2, compostura: 1 },
          },
          nextNodeId: 'j4_a4_a_eleicao_do_998_conclave',
        },
        {
          id: 'j4_a4_pc1_testemunhar_silencio_solene',
          tipo: 'simples',
          texto: 'Permanecer em silêncio reverente diante da grandeza moral demonstrada pelo bastardo',
          tom: 'silencio',
          desfecho: {
            ponte: 'O silêncio na câmara sela a recusa mais nobre da história recente do Norte. Fantasma esfrega o focinho nas mãos de Jon enquanto o rapaz desce com passos firmes para o refeitório.',
            destino: 'j4_a4_a_eleicao_do_998_conclave',
            marcas: ['testemunha_recusa_de_jon'],
            delta: { compostura: 2 },
          },
          nextNodeId: 'j4_a4_a_eleicao_do_998_conclave',
        },
      ],
    },

    // Peça 2: A Eleição do 998º no Conclave
    j4_a4_a_eleicao_do_998_conclave: {
      id: 'j4_a4_a_eleicao_do_998_conclave',
      titulo: 'As Fichas de Barro no Caldeirão',
      anoHistorico: '300 d.C.',
      localizacao: 'Refeitório Comunal de Castelo Negro',
      regionId: 'castelo_negro',
      tipo: 'peca_de_cenario',
      rota: 'comum',
      pov: 'Irmão Sem Nome',
      origem: 'canonica',
      loreContext: {
        fonte: {
          livro: 'A Tormenta de Espadas',
          capitulo: 'Samwell IV & V',
          arquivo_md: 'asos_samwell_3.md',
        },
      },
      fallbackText: `O refeitório comunal está lotado com mais de quinhentos irmãos da Patrulha da Noite vindos de Castelo Negro, Atalaia do Mar e da Torre Sombria. No centro da sala, sobre a mesa dos intendentes, repousa o vaso de barro onde cada homem deposita sua ficha: pontas de flecha para Mallister, conchas marinhas para Cotter Pyke, moedas de cobre para Janos Slynt.

Já foram realizadas dez votações ao longo de sete dias exaustivos, e nenhuma facção atinge os dois terços necessários para a vitória. Janos Slynt manobra nas sombras com Alliser Thorne para comprar votos com promessas de intendências ricas. Mas no canto mais discreto da sala, o gordo Samwell Tarly move suas próprias peças com audácia genial, conversando em sussurros com Mallister e Pyke para convencê-los de que um terceiro nome pode salvar a irmandade da divisão mortal.`,
      blocos: [
        {
          funcao: 'abertura',
          texto: `Quinhentos irmãos negros reúnem-se no refeitório para a votação decisiva do 998º Senhor Comandante. O vaso de barro aguarda as fichas de voto sob a vigília atenta de Meistre Aemon.`,
        },
        {
          funcao: 'corpo',
          quando: { flagsTodas: ['apoio_pyke_mallister'] },
          texto: `Cotter Pyke e Denys Mallister olham um para o outro com respeito relutante, lembrando-se do pacto de honra selado durante a crise e recusando-se a ceder votos para a facção corrupta de Slynt.`,
        },
        {
          funcao: 'corpo',
          quando: { flagsTodas: ['desafiou_janos_slynt'] },
          texto: `Os veteranos que testemunharam a coragem de Jon Snow no topo da Muralha espalham-se entre as mesas, convencendo os indecisos de que o bastardo de Winterfell é o único líder legítimo.`,
        },
        {
          funcao: 'fecho',
          texto: `Samwell Tarly ergue a mão trêmula diante de Meistre Aemon e profere o nome que mudará a história da Muralha: «Eu indico Jon Snow para Senhor Comandante!»`,
        },
      ],
      escolhas: [
        {
          id: 'j4_a4_pc2_depositar_ficha_jon_snow',
          tipo: 'simples',
          texto: 'Avançar até o vaso de barro e depositar publicamente o seu voto em Jon Snow',
          tom: 'devocao',
          desfecho: {
            ponte: 'A sua ficha de ferro cai com um estalo limpo no fundo da chaleira de votação. Dezenas de veteranos seguem o seu exemplo, erguendo-se dos bancos para apoiar o nome do bastardo.',
            destino: 'j4_a4_o_corvo_da_urna',
            marcas: ['urna_do_conclave_votada'],
            delta: { honra: 2, compostura: 1 },
          },
          nextNodeId: 'j4_a4_o_corvo_da_urna',
        },
        {
          id: 'j4_a4_pc2_chamar_aclamacao_refeitorio',
          tipo: 'simples',
          texto: 'Gritar o nome de Jon Snow e convocar os homens do Norte para a aclamação em voz alta',
          tom: 'honesto',
          desfecho: {
            ponte: '«Snow! Snow! O sangue de Winterfell e o aço de Mormont!», brada você com toda a força dos pulmões. O clamor contagia os recrutas e os intendentes, silenciando os protestos de Slynt.',
            destino: 'j4_a4_o_corvo_da_urna',
            marcas: ['urna_do_conclave_votada'],
            delta: { honra: 2, inspiracao: 1 },
          },
          nextNodeId: 'j4_a4_o_corvo_da_urna',
        },
      ],
    },

    // Peça 3: O Corvo da Urna
    j4_a4_o_corvo_da_urna: {
      id: 'j4_a4_o_corvo_da_urna',
      titulo: 'A Ave que Carrega a Memória do Velho Urso',
      anoHistorico: '300 d.C.',
      localizacao: 'Mesa Central do Conclave, Castelo Negro',
      regionId: 'castelo_negro',
      tipo: 'peca_de_cenario',
      rota: 'comum',
      pov: 'Irmão Sem Nome',
      origem: 'canonica',
      loreContext: {
        fonte: {
          livro: 'A Tormenta de Espadas',
          capitulo: 'Jon XII & Samwell V',
          arquivo_md: 'asos_samwell_3.md',
        },
      },
      fallbackText: `O escrutínio final atinge o ápice quando Clydas ergue a tampa da velha chaleira de ferro usada para recolher os votos dos ausentes. De dentro do recipiente escuro, com um bater estrondoso de asas lustrosas e um grito rouco que ecoa até o teto de vigas, salta uma ave colossal: o corvo mensageiro de Jeor Mormont!

A ave preta sobrevoa o salão em círculos velozes, grasnando freneticamente: «Snow! Snow! Corvo! Snow!». Diante de quinhentos irmãos estupefatos, o corvo desce em voo suave e pousa exatamente sobre o ombro direito de Jon Snow, bicando o colarinho de couro da capa do rapaz como costumava fazer com o Velho Urso.

Meistre Aemon abre um sorriso luminoso no rosto enrugado e cego: «Os deuses falaram. A Patrulha tem o seu senhor.» Janos Slynt desaba sobre o banco, derrotado e mudo, enquanto o salão explode em um brado uníssono de aclamação que faz a neve deslizar dos telhados de Castelo Negro.`,
      blocos: [
        {
          funcao: 'abertura',
          texto: `O corvo de Jeor Mormont salta de dentro da chaleira de votação com asas negras reluzentes, sobrevoando o refeitório e pousando no ombro de Jon Snow aos gritos de «Snow! Snow!».`,
        },
        {
          funcao: 'corpo',
          quando: { flagsTodas: ['juramento_inquebrantavel'] },
          texto: `A recusa nobre de Winterfell encontra aqui a sua recompensa sagrada: o bastardo rejeitou reinos e glórias no sul para ser coroado com o fardo mais honroso da Muralha.`,
        },
        {
          funcao: 'fecho',
          texto: `Quinhentos patrulheiros desembainham o aço e batem as lâminas nas mesas. Jon Snow é aclamado como o 998º Senhor Comandante da Patrulha da Noite.`,
        },
      ],
      escolhas: [
        {
          id: 'j4_a4_pc3_desembainhar_espada_aclamacao',
          tipo: 'simples',
          texto: 'Erguer a espada aos céus e saudar Jon Snow como o novo Senhor Comandante da Patrulha',
          tom: 'devocao',
          desfecho: {
            ponte: 'Você ergue o aço brilhante diante do salão e proclama lealdade ao novo líder. Jon Snow fixa os olhos cinzentos em você e acena com a cabeça, selando um pacto de confiança para as guerras que hão de vir.',
            destino: 'j4_a4_fecho_o_juramento_eterno',
            marcas: ['aclamacao_de_jon_snow'],
            delta: { honra: 2, compostura: 1 },
          },
          nextNodeId: 'j4_a4_fecho_o_juramento_eterno',
        },
        {
          id: 'j4_a4_pc3_abracar_samwell_vitoria',
          tipo: 'simples',
          texto: 'Comemorar a vitória ao lado de Samwell Tarly e Grenn na bancada dos veteranos',
          tom: 'honesto',
          desfecho: {
            ponte: 'Samwell chora de alívio e abraça você com toda a força de seus braços gordos. A honra da Patrulha foi resgatada e os bajuladores de Porto Real foram varridos do poder.',
            destino: 'j4_a4_fecho_o_juramento_eterno',
            marcas: ['aclamacao_de_jon_snow'],
            delta: { honra: 1, compostura: 2 },
          },
          nextNodeId: 'j4_a4_fecho_o_juramento_eterno',
        },
      ],
    },

    // =========================================================================
    // ETAPA 5: ACERTO DE CONTAS (1 CENA QUE LÊ AS MARCAS DO ATO)
    // =========================================================================

    j4_a4_fecho_o_juramento_eterno: {
      id: 'j4_a4_fecho_o_juramento_eterno',
      titulo: 'A Sentinela Eterna sob a Aurora Boreal',
      anoHistorico: '300 d.C.',
      localizacao: 'Cume da Muralha sobre Castelo Negro',
      regionId: 'castelo_negro',
      tipo: 'acerto_de_contas',
      rota: 'comum',
      pov: 'Irmão Sem Nome',
      origem: 'canonica',
      isEnding: true,
      loreContext: {
        fonte: {
          livro: 'A Tormenta de Espadas',
          capitulo: 'Jon XII',
          arquivo_md: 'asos_samwell_3.md',
        },
      },
      fallbackText: `A meia-noite traz a aurora boreal sobre o topo da Muralha. Faixas verde-esmeralda, violeta e douradas dançam no céu estrelado, refletindo-se na imensidão de setecentos pés de gelo translúcido. Ao seu lado, com a capa negra com capuz de lobo e Garralonga embainhada na cintura, está o Senhor Comandante Jon Snow.

Você olha para o norte, onde as sombras da Floresta Assombrada guardam os ossos de trezentos irmãos caídos no Punho dos Primeiros Homens e na cabana maldita de Craster. Cada passo daquela marcha fúnebre, cada gota de sangue derramada no pátio e cada escolha de lealdade o trouxeram até este cume.

Jon apoia a mão no seu ombro e ambos contemplam a escuridão que avança dos confins do mundo: «O inverno está chegando, irmão», fala Jon com a voz mansa e firme dos reis antigos. «Mas enquanto a Patrulha da Noite permanecer de pé nesta muralha, o reino dos homens não cairá.»

O mundo gravou para sempre os feitos do Irmão Sem Nome. A jornada está cumprida.`,
      blocos: [
        {
          funcao: 'abertura',
          texto: `Sob as luzes esmeralda da aurora boreal, você e o Senhor Comandante Jon Snow contemplam o horizonte infinito no topo da Muralha. A longa provação do Grande Patrulhamento encerra-se aqui.`,
        },
        {
          funcao: 'corpo',
          quando: { flagsTodas: ['muralha_sustentada'] },
          texto: `A sua bravura nas amuradas superiores garantiu que a barreira de gelo suportasse o bombardeio maciço de Mance Rayder, preservando o cume para a vitória final.`,
        },
        {
          funcao: 'corpo',
          quando: { flagsTodas: ['desafiou_janos_slynt'] },
          texto: `A firmeza com que desafiou a tirania covarde de Janos Slynt no pátio impediu que a honra da Patrulha fosse pisoteada por cortesãos corruptos de Porto Real.`,
        },
        {
          funcao: 'corpo',
          quando: { flagsTodas: ['lealdade_ao_norte'] },
          texto: `A sua lealdade inabalável aos homens do Norte forjou um elo indestrutível entre os sobreviventes e o sangue dos Stark de Winterfell.`,
        },
        {
          funcao: 'corpo',
          quando: { flagsTodas: ['testemunha_do_berrante'] },
          texto: `Você esteve na tenda de Mance e viu de perto o pavor cósmico que moveu cem mil selvagens a fugirem desesperados diante da Longa Noite.`,
        },
        {
          funcao: 'corpo',
          quando: { flagsTodas: ['mance_capturado_vivo'] },
          texto: `A captura de Mance Rayder e a disciplina demonstrada na carga dos cavaleiros de Stannis abriram caminho para uma nova era de alianças na fronteira.`,
        },
        {
          funcao: 'corpo',
          quando: { flagsTodas: ['testemunha_recusa_de_jon'] },
          texto: `Você testemunhou a maior prova moral de Jon Snow ao recusar o senhorio de Winterfell em respeito ao juramento sagrado que une todos os homens de preto.`,
        },
        {
          funcao: 'corpo',
          quando: { flagsTodas: ['juramento_inquebrantavel'] },
          texto: `O juramento prestado diante dos deuses antigos permaneceu puro e imaculado, erguendo-se como um farol de dignidade em tempos de ruína e traição.`,
        },
        {
          funcao: 'corpo',
          quando: { flagsTodas: ['aclamacao_de_jon_snow'] },
          texto: `A aclamação no conclave e o voo do corvo consagraram Jon Snow como o 998º Senhor Comandante, restaurando a esperança no coração da Patrulha da Noite.`,
        },
        {
          funcao: 'corpo',
          quando: { flagsTodas: ['pedras_arremessadas'] },
          texto: `As pedras arremessadas no momento crítico do cerco provaram aos homens livres que a altura da Muralha é a pior inimiga dos invasores.`,
        },
        {
          funcao: 'corpo',
          quando: { flagsTodas: ['desmascarou_thorne'] },
          texto: `O desmascaramento público da covardia de Alliser Thorne neutralizou as intrigas do mestre de armas perante os recrutas mais jovens.`,
        },
        {
          funcao: 'corpo',
          quando: { flagsTodas: ['posto_embaixada_mance'] },
          texto: `A coragem de cavalgar desarmado até o acampamento de cem mil homens fez do seu nome uma lenda de bravura entre os patrulheiros.`,
        },
        {
          funcao: 'corpo',
          quando: { flagsTodas: ['posto_resistencia_slynt'] },
          texto: `A resistência tenaz mantida no pátio durante a ausência de Jon garantiu que a base permanecesse firme contra qualquer tentativa de golpe.`,
        },
        {
          funcao: 'corpo',
          quando: { flagsTodas: ['trombetas_de_stannis_ouvidas'] },
          texto: `O eco estridente das trombetas de Stannis na floresta ficará gravado na sua memória como o clarim da salvação no limiar da destruição.`,
        },
        {
          funcao: 'corpo',
          quando: { flagsTodas: ['choque_na_floresta'] },
          texto: `A fúria da carga de cavalaria entre os pinheiros demonstrou que a disciplina e o ferro de Westeros podem prevalecer sobre a massa desordenada.`,
        },
        {
          funcao: 'corpo',
          quando: { flagsTodas: ['confrontou_tirania_slynt'] },
          texto: `A recusa em dobrar o joelho a mandos ilegais inspirou os veteranos a protegerem as leis milenares da irmandade.`,
        },
        {
          funcao: 'corpo',
          quando: { flagsTodas: ['respeito_dos_veteranos'] },
          texto: `O respeito conquistado entre veteranos e meistres faz de você um dos pilares de confiança do novo comando da Muralha.`,
        },
        {
          funcao: 'corpo',
          quando: { flagsTodas: ['apoio_pyke_mallister'] },
          texto: `A aliança costurada entre Atalaia do Mar e a Torre Sombria impediu que a Patrulha se dissolvesse em uma guerra civil fratricida.`,
        },
        {
          funcao: 'corpo',
          quando: { flagsTodas: ['celas_de_gelo_evitadas'] },
          texto: `As masmorras frias permaneceram vazias de irmãos inocentes graças à intervenção tempestiva do conselho de honra.`,
        },
        {
          funcao: 'corpo',
          quando: { flagsTodas: ['presenca_do_rei_stannis'] },
          texto: `A chegada do Rei Stannis transformou a Muralha no centro nevrálgico da guerra pelos Sete Reinos.`,
        },
        {
          funcao: 'corpo',
          quando: { flagsTodas: ['justica_imposta_a_slynt'] },
          texto: `A justiça implacável imposta sobre os corruptos devolveu a dignidade que havia sido roubada de Castelo Negro.`,
        },
        {
          funcao: 'corpo',
          quando: { flagsTodas: ['urna_do_conclave_votada'] },
          texto: `O voto depositado com consciência e coragem ajudou a selar o destino mais luminoso para o futuro da guarda do reino.`,
        },
        {
          funcao: 'fecho',
          texto: `A espada na escuridão permanece vigilante. A jornada de «Irmão Sem Nome» encerra-se com a lenda de um homem comum que sustentou a Muralha no inverno mais escuro da história.`,
        },
      ],
      escolhas: [],
    },
  },
};
