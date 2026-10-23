import { StatusAprovacao } from '@/server/engine/rpgEngine';

export interface RespostaAcampamento {
  id: string;
  texto: string;
  reacaoCompanheiro: string;
  deltaAprovacao: number;
  bonusCompostura?: number;
  bonusInspiracao?: number;
  flagConcedida?: string;
}

export interface TopicoDialogoAcampamento {
  id: string;
  titulo: string;
  resumo: string;
  falaInicial: string;
  respostas: RespostaAcampamento[];
  condicaoFlag?: string;
}

export interface CompanheiroAcampamento {
  id: string;
  nome: string;
  titulo: string;
  era: string;
  citacao: string;
  topicos: TopicoDialogoAcampamento[];
}

export function calcularNovoStatusAprovacao(aprovacao: number): StatusAprovacao {
  if (aprovacao < 0) return 'Hostil';
  if (aprovacao < 20) return 'Frio';
  if (aprovacao < 50) return 'Neutro';
  if (aprovacao < 80) return 'Leal';
  return 'Devotado';
}

export const DIALOGOS_DE_ACAMPAMENTO: Record<string, CompanheiroAcampamento> = {
  // =========================================================================
  // JORNADA 4: PATRULHA DA NOITE
  // =========================================================================
  jon_snow: {
    id: 'jon_snow',
    nome: 'Jon Snow',
    titulo: 'O Bastardo de Winterfell & Espada da Muralha',
    era: 'patrulha_muralha',
    citacao: '«Primeiro nos atacam com o frio, depois com os dentes dos mortos. Mas a Muralha não cairá esta noite.»',
    topicos: [
      {
        id: 'jon_garra_longa',
        titulo: 'Sobre a espada de aço valiriano Garra Longa',
        resumo: 'Jon contempla o pomo de lobo de pedra esculpido no cabo da lâmina ancestral dos Mormont.',
        falaInicial: `O fogo crepita entre nós e Jon afia a lâmina escura com uma pedra untada em óleo de baleia. O aço valiriano ondula à luz das brasas como água defumada.
        
— O Senhor Comandante Mormont me deu esta espada depois que queimei a criatura nos seus aposentos — diz Jon em voz baixa. — Ela pertenceu à Casa Mormont por cinco séculos. Às vezes sinto que o peso de honrar Jeor Mormont é mais pesado do que o próprio aço.`,
        respostas: [
          {
            id: 'resp_jon_honra_mormont',
            texto: '«Vós merecestes a lâmina, Jon. Se Jeor a confiou a vós, é porque enxergou o líder que a Patrulha precisava.»',
            reacaoCompanheiro: 'Jon abaixa a cabeça por um instante, um meio-sorriso tímido aflorando sob a barba rala. «Obrigado, irmão. Vossas palavras aquecem mais do que este braseiro.»',
            deltaAprovacao: 10,
            bonusInspiracao: 1,
            bonusCompostura: 1,
            flagConcedida: 'confidente_de_jon_snow',
          },
          {
            id: 'resp_jon_pragmatico',
            texto: '«Uma espada é uma ferramenta para matar homens e monstros. Não importa de quem foi, contanto que corte cabeças Thenn.»',
            reacaoCompanheiro: 'Jon passa o polegar suavemente no fio da espada. «Pragmático. Donal Noye diria o mesmo. Mas os homens não morrem por ferramentas; morrem por promessas.»',
            deltaAprovacao: 5,
            bonusCompostura: 1,
          },
          {
            id: 'resp_jon_lembrar_muralha',
            texto: '«Guardai vossos sentimentos para depois da batalha. Mance Rayder ainda tem cem mil selvagens do outro lado.»',
            reacaoCompanheiro: 'O olhar de Jon endurece como gelo de lago. «Tendes razão. A noite é curta e o dever nunca dorme.»',
            deltaAprovacao: -2,
            bonusCompostura: 1,
          },
        ],
      },
      {
        id: 'jon_fantasma',
        titulo: 'Sobre o lobo gigante Fantasma e o Norte',
        resumo: 'O silêncio do além-Muralha e a ausência do companheiro de pelos alvos.',
        falaInicial: `Jon olha para a escuridão da floresta que se estende ao norte de Castelo Negro.
        
— Quando cruzei para o lado de Mance, precisei mandar Fantasma embora para não ser morto. Às vezes, quando durmo na cela de gelo, sonho que estou correndo sob as copas dos pinheiros... sinto o gosto do sangue quente de uma corça e o cheiro do orvalho nas agulhas de pinho. Achais que um homem pode perder sua humanidade se sonhar demais com a fera?`,
        respostas: [
          {
            id: 'resp_jon_lobo_troca_peles',
            texto: '«Os antigos reis do Norte tinham lobos ao lado do trono. Vosso laço com Fantasma não vos enfraquece; é a vossa maior força.»',
            reacaoCompanheiro: 'Os olhos cinzentos de Jon brilham na penumbra. «Meu tio Benjen costumava dizer algo parecido antes de desaparecer na Floresta Assombrada. Jamais esquecerei isso.»',
            deltaAprovacao: 12,
            bonusInspiracao: 1,
            flagConcedida: 'compreensao_troca_peles',
          },
          {
            id: 'resp_jon_foco_votos',
            texto: '«Vós sois um irmão juramentado da Patrulha da Noite, Jon. Cuidado para não deixar que instintos selvagens vos afastem dos vossos votos.»',
            reacaoCompanheiro: 'Jon assente lentamente, compreendendo o alerta. «A Patrulha é minha vida agora. Não me esquecerei disso.»',
            deltaAprovacao: 4,
            bonusCompostura: 2,
          },
        ],
      },
    ],
  },

  samwell: {
    id: 'samwell',
    nome: 'Samwell Tarly',
    titulo: 'O Irmão Erudito & O Matador de Outros',
    era: 'patrulha_muralha',
    citacao: '«Eu tenho medo, sim... mas Meistre Aemon disse que a coragem só existe quando um homem tem medo.»',
    topicos: [
      {
        id: 'sam_vidro_de_dragao',
        titulo: 'Sobre a adaga de obsidiana e a morte do Outro',
        resumo: 'Sam treme ao recordar o terror nas neves da Floresta Assombrada.',
        falaInicial: `Samwell sopra as mãos rechonchudas perto das labaredas da fogueira, ajeitando os óculos tortos e o rolo de pergaminho amarelado no colo.
        
— Eles me chamam de 'Sam, o Matador' em tom de zombaria... mas não houve glória nenhuma naquilo. A criatura era feita de gelo que se movia como sombra. Quando enfiei a adaga de obsidiana nas costas dela, ela derreteu como fumaça azul. Encontrei nos manuscritos de Barth que os filhos da floresta chamavam essa pedra de 'vidro de dragão'.`,
        respostas: [
          {
            id: 'resp_sam_coragem_real',
            texto: '«Vós salvastes Goiva e o bebê, Sam. Enquanto os homens fortes fugiam e morriam no Punho, fostes vós quem descobriu a única fraqueza dos Outros.»',
            reacaoCompanheiro: 'Sam enxuga uma lágrima no canto dos olhos com a manga puída. «Nenhum homem jamais me disse palavras tão gentis, nem mesmo meu pai em Monte Chifre. Eu lutarei ao vosso lado sempre que precisardes de mim.»',
            deltaAprovacao: 15,
            bonusInspiracao: 1,
            bonusCompostura: 2,
            flagConcedida: 'lealdade_inabalavel_de_sam',
          },
          {
            id: 'resp_sam_pesquisa_livros',
            texto: '«Precisamos que continueis vasculhando os pergaminhos antigos da abóbada. Conhecimento pode salvar mais vidas do que dez espadas.»',
            reacaoCompanheiro: 'O rosto de Sam ilumina-se de entusiasmo intelectual. «Meistre Aemon me deu permissão para descer aos arquivos mais profundos. Não descansarei até encontrar tudo sobre as defesas mágicas da Muralha!»',
            deltaAprovacao: 10,
            bonusCompostura: 1,
            flagConcedida: 'segredos_da_abobada_de_aemon',
          },
        ],
      },
    ],
  },

  donal_noye: {
    id: 'donal_noye',
    nome: 'Donal Noye',
    titulo: 'O Ferreiro Caolho & Alma de Castelo Negro',
    era: 'patrulha_muralha',
    citacao: '«Um braço é o bastante para bater o martelo na bigorna e manter garotos covardes de pé na linha de defesa.»',
    topicos: [
      {
        id: 'donal_ferreiro_robert',
        titulo: 'Sobre a forja do martelo de guerra de Robert Baratheon',
        resumo: 'O velho ferreiro de Ponta da Tempestade rememora os três irmãos Baratheon.',
        falaInicial: `Donal Noye remexe as brasas da fogueira com a mão calejada enquanto descansa o coto do braço esquerdo no joelho.
        
— Eu forjei o martelo com que Robert esmagou o príncipe Rhaegar no Tridente. Conheci os três rapazes de Ponta da Tempestade desde que eram pirralhos: Robert era o aço verdadeiro, flexível e brilhante, que feria fundo mas quebrava com o tempo. Stannis é ferro puro, duro e inflexível, que prefere partir antes de dobrar. E Renly era cobre polido: brilhava muito, mas no fim não valia grande coisa.`,
        respostas: [
          {
            id: 'resp_donal_sabedoria_veterano',
            texto: '«E que metal vós sois, mestre Noye?»',
            reacaoCompanheiro: 'Noye dá uma gargalhada rouca que ecoa pelos quartéis. «Eu sou o fole velho e a pedra de carvão. Não brilho para canções de menestréis, mas mantenho o fogo aceso para que homens melhores forjem suas vidas.»',
            deltaAprovacao: 12,
            bonusInspiracao: 1,
            bonusCompostura: 1,
            flagConcedida: 'conselho_de_ouro_de_noye',
          },
          {
            id: 'resp_donal_foco_armas',
            texto: '«Stannis está vindo para a Muralha, Noye. Precisamos que o vosso ferro nos forneça flechas suficientes.»',
            reacaoCompanheiro: 'Noye cospe na fogueira, fazendo subir fagulhas. «As forjas não se apagarão enquanto eu respirar. Tendes minha palavra.»',
            deltaAprovacao: 6,
            bonusCompostura: 1,
          },
        ],
      },
    ],
  },

  aemon: {
    id: 'aemon',
    nome: 'Meistre Aemon',
    titulo: 'O Dragão Oculto da Cidadela (Aemon Targaryen)',
    era: 'patrulha_muralha',
    citacao: '«O amor é a ruína do dever. E o dever é o preço do sangue.»',
    topicos: [
      {
        id: 'aemon_o_dever_e_o_amor',
        titulo: 'Sobre o Trono de Ferro e o chamado de Aegon V (Egg)',
        resumo: 'O ancião cego de cem anos recorda a dinastia dos dragões.',
        falaInicial: `A tenda do Meistre cheira a ervas secas, vinho fervido com canela e cera de abelha. O velho cego sorri quando escuta vossos passos cuidadosos.
        
— Sei quem sois pelo peso das botas na madeira — diz Aemon suavemente. — O mundo esqueceu meu sobrenome, e é melhor assim. Mas quando vejo rapazes como Jon Snow dilacerados entre o amor por sua família e o dever de seus juramentos, lembro-me do meu irmão Egg... e de quando me ofereceram a coroa dos Sete Reinos três vezes. Eu recusei e vim para o gelo para que meu irmão reinasse sem a sombra de um irmão mais velho.`,
        respostas: [
          {
            id: 'resp_aemon_reverencia_solene',
            texto: '«Westeros perdeu um grande rei, mas a Patrulha da Noite ganhou a sua maior bússola moral, Meistre.»',
            reacaoCompanheiro: 'Aemon estende sua mão magra e trêmula, pousando-a sobre vosso braço. «Que os deuses antigos e novos guardem vosso discernimento na tempestade que se aproxima, meu jovem amigo.»',
            deltaAprovacao: 15,
            bonusInspiracao: 1,
            bonusCompostura: 2,
            flagConcedida: 'bencao_do_dragao_anciad',
          },
          {
            id: 'resp_aemon_conselho_mestre',
            texto: '«Como um homem pode suportar ver tudo o que ama queimar sem trair seus votos?»',
            reacaoCompanheiro: '«Com dor, meu filho. Com dor e lágrimas que congelam nas bochechas. Mas se a Patrulha falhar, não sobrará reino algum para que outros possam amar.»',
            deltaAprovacao: 10,
            bonusCompostura: 2,
          },
        ],
      },
    ],
  },

  alliser_thorne: {
    id: 'alliser_thorne',
    nome: 'Sor Alliser Thorne',
    titulo: 'Mestre de Armas de Castelo Negro',
    era: 'patrulha_muralha',
    citacao: '«Vocês acham que sou cruel? O inverno não se importa com seus choros, rapaz.»',
    topicos: [
      {
        id: 'thorne_porto_real_e_rebeldia',
        titulo: 'Sobre o Saque de Porto Real e o destino na Muralha',
        resumo: 'A amargura de um lealista Targaryen exilado pelo Usurpador.',
        falaInicial: `Sor Alliser examina uma espada embotada sob a luz da tocha com expressão azeda. Seu olhar de víbora pousa sobre vós.
        
— Vocês, rapazes do Norte, acham que a vida é feita de canções sobre os Starks — zomba ele com desprezo calculado. — Eu lutei nas muralhas de Porto Real sob o estandarte do dragão de três cabeças. Quando Tywin Lannister arrombou os portões e Robert tomou o trono, me deram duas opções: o machado do carrasco ou a capa negra. Eu escolhi viver. E há quinze anos transformo ladrões de ovelhas e estupradores de aldeia em soldados capazes de segurar este gelo.`,
        respostas: [
          {
            id: 'resp_thorne_reconhecer_disciplina',
            texto: '«Vossos métodos são duros, Sor Alliser, mas os recrutas que treinastes foram os que seguraram o portão contra os gigantes.»',
            reacaoCompanheiro: 'Thorne semicerra os olhos, surpreso com o reconhecimento onde esperava insolência. «Pelo menos alguém aqui tem olhos na cara e não mingau de aveia no crânio. Mantenha essa postura e talvez sobreviva à guerra.»',
            deltaAprovacao: 10,
            bonusCompostura: 1,
            flagConcedida: 'respeito_amargo_de_thorne',
          },
          {
            id: 'resp_thorne_desafio_direto',
            texto: '«Vossa amargura não vos dá o direito de conspirar contra vossos próprios irmãos juramentados.»',
            reacaoCompanheiro: 'A mão de Thorne vai ao punho da lâmina e sua voz soa como um chicote. «Cuidado com o que dizeis a um cavaleiro ungido, garoto. O inverno tem muitas covas rasas para tolos petulantes.»',
            deltaAprovacao: -8,
            bonusCompostura: 1,
          },
        ],
      },
    ],
  },

  // =========================================================================
  // JORNADA 1: A CONQUISTA DE AEGON
  // =========================================================================
  visenya: {
    id: 'visenya',
    nome: 'Visenya Targaryen',
    titulo: 'Rainha Conquistadora & Senhora de Vhagar',
    era: 'conquista_aegon',
    citacao: '«Um rei que não pode sangrar por seu povo não tem direito de empunhar a coroa.»',
    topicos: [
      {
        id: 'visenya_irma_sombria',
        titulo: 'Sobre a lâmina valiriana Irmã Sombria e a defesa do Rei',
        resumo: 'A têmpera implacável da mais temida das irmãs-esposas.',
        falaInicial: `Visenya limpa a cota de malha de elos finos com uma gaze embebida em vinagre. Vhagar ressona ao longe como um trovão soterrado, soltando baforadas de enxofre que aquecem a brisa da colina.
        
— Aegon é o coração da nossa linhagem, e Rhaenys é o sorriso que seduz os homens — afirma Visenya sem desviar os olhos lilases. — Mas sou eu quem desembainha a Irmã Sombria quando assassinos de Dorne se esgueiram na escuridão. O Trono de Ferro não será mantido com misericórdia; será forjado na dureza de quem não tem medo de ser temido.`,
        respostas: [
          {
            id: 'resp_visenya_lealdade_ferrea',
            texto: '«Minha lâmina também velará pelo sono do Dragão, Majestade. Nenhum traidor tocará a vossa família enquanto eu viver.»',
            reacaoCompanheiro: 'Visenya estuda vosso rosto e assente com aprovação régia. «Palavras firmes. Mostrai essa têmpera quando os machados voarem no Campo de Fogo.»',
            deltaAprovacao: 12,
            bonusInspiracao: 1,
            bonusCompostura: 1,
            flagConcedida: 'confianca_de_visenya',
          },
          {
            id: 'resp_visenya_cautela_crueldade',
            texto: '«O medo dobra os joelhos, minha Rainha, mas o ódio semeia conspirações que nenhum fogo apaga.»',
            reacaoCompanheiro: 'Visenya franze os lábios, um sorriso frio desenhando-se em seu rosto. «Uma mente filosófica... veremos se vossos pensamentos resistirão à queima de Harrenhal.»',
            deltaAprovacao: 5,
            bonusCompostura: 1,
          },
        ],
      },
    ],
  },

  orys_baratheon: {
    id: 'orys_baratheon',
    nome: 'Orys Baratheon',
    titulo: 'A Mão do Dragão & Senhor de Ponta da Tempestade',
    era: 'conquista_aegon',
    citacao: '«Nossa é a fúria dos que não pedem licença para abrir caminho entre os escudos.»',
    topicos: [
      {
        id: 'orys_lealdade_aegon',
        titulo: 'Sobre a irmandade secreta com Aegon e o lema dos Baratheon',
        resumo: 'O gigante leal que tomou para si o lema do Rei da Tempestade.',
        falaInicial: `Orys bebe um grande chifre de cerveja escura perto da fogueira de campanha, rindo com os homens de armas do acampamento.
        
— Os nobres sussurram nos corredores que sou meio-irmão bastardo de Aegon — diz Orys, dando um tapa vigoroso em vosso ombro. — Pouco me importa o que dizem os meistres! Aegon me chamou de sua mão direita e meu escudo protegeu suas costas desde a infância em Pedra do Dragão. Quando enfrentamos Argilac na Última Tempestade, tomei o elmo de veado dele e adotei suas palavras: 'Nossa é a Fúria'. E cumpriremos cada sílaba dela!`,
        respostas: [
          {
            id: 'resp_orys_brindar_furia',
            texto: '«Um brinde à Casa Baratheon e à Mão do Rei! Enquanto marchardes à frente, os exércitos tremerão.»',
            reacaoCompanheiro: 'Orys bate o chifre contra o vosso e solta um rugido de triunfo que anima todo o acampamento. «Bebi com verdadeiros guerreiros esta noite! Tendes minha lealdade de irmão!»',
            deltaAprovacao: 15,
            bonusInspiracao: 1,
            bonusCompostura: 2,
            flagConcedida: 'juramento_de_sangue_com_orys',
          },
        ],
      },
    ],
  },

  // =========================================================================
  // JORNADA 2: A DANÇA DOS DRAGÕES
  // =========================================================================
  daemon: {
    id: 'daemon',
    nome: 'Daemon Targaryen',
    titulo: 'O Príncipe Rebelde & Cavaleiro de Caraxes',
    era: 'danca_dragoes',
    citacao: '«Eles acham que coroas se ganham com palavras de papel na Cidadela. Coroas se ganham com dentes e fogo.»',
    topicos: [
      {
        id: 'daemon_caraxes_vinganca',
        titulo: 'Sobre a espada Irmã Sombria e o duelo inevitável contra Aemond',
        resumo: 'A sede de justiça feroz do maior guerreiro de sua era.',
        falaInicial: `Daemon afia o gume da Irmã Sombria com gestos precisos e ameaçadores. Caraxes solta um sibilo agudo no topo da torre de Harrenhal que arrepia a espinha de qualquer mortal.
        
— Otto Hightower empurrou um menino bastardo para o trono e chamou de lei — sibila Daemon, os olhos ardendo de um fervor perigoso. — Meu sobrinho Aemond matou o pequeno Lucerys em Ponta da Tempestade e achou que Vhagar o tornava invencível. Mas Vhagar é velha e pesada. Quando nos encontrarmos sobre as águas do Olho de Deus, ensinarei ao garoto de um olho só o verdadeiro significado do sangue do dragão.`,
        respostas: [
          {
            id: 'resp_daemon_justica_pretos',
            texto: '«Pela Rainha Rhaenyra e pela memória de Lucerys, Príncipe Daemon. Que o fogo caia sobre os usurpadores.»',
            reacaoCompanheiro: 'Daemon sorri com frieza satisfeita, guardando a lâmina valiriana na bainha de couro negro. «Gosto de homens que não hesitam em queimar o que precisa ser destruído.»',
            deltaAprovacao: 12,
            bonusInspiracao: 1,
            flagConcedida: 'confidente_do_principe_rebelde',
          },
        ],
      },
    ],
  },

  // =========================================================================
  // JORNADA 5: A REBELIÃO DE ROBERT
  // =========================================================================
  robert_baratheon: {
    id: 'robert_baratheon',
    nome: 'Robert Baratheon',
    titulo: 'Senhor de Ponta Tempestade & Líder da Rebelião',
    era: 'rebeliao_robert',
    citacao: '«Um dia acordei e descobri que o rei queria minha cabeça. Pois bem, que venha buscá-la com o próprio pescoço em jogo!»',
    topicos: [
      {
        id: 'robert_o_martelo_de_donoy',
        titulo: 'Sobre o martelo de guerra forjado por Donal Noye',
        resumo: 'A arma monumental que decidirá o destino dos Sete Reinos.',
        falaInicial: `Robert descansa a pesada cabeça de aço do seu martelo sobre um tronco cortado. Ele entorna um corno de cerveja escura e ri alto, com o vigor de um jovem gigante.
        
— Donal Noye fez este martelo nas forjas de Ponta Tempestade antes do cerco — diz Robert, passando a manopla pelo cabo cravado de rebites. — Espadas são boas para fidalgos que gostam de dançar na ponta dos pés. Mas quando bato isto no peito de um homem de armas lealista, a couraça se dobra como estanho e o coração para no mesmo instante. Rhaegar acha que seus versos tristes vão salvá-lo quando nos encontrarmos no Tridente?`,
        respostas: [
          {
            id: 'resp_robert_apoiar_ira',
            texto: '«O dragão queimou lordes justos e roubou vossa prometida. O martelo fará a justiça que a corte de Aerys negou.»',
            reacaoCompanheiro: 'Robert bate a mão pesada no vosso ombro com uma risada tonitruante. «Bem dito! Pelos sete infernos, vós falais como um verdadeiro homem de armas das Terras da Tempestade!»',
            deltaAprovacao: 12,
            bonusInspiracao: 1,
            bonusCompostura: 1,
            flagConcedida: 'parceiro_de_armas_de_robert',
          },
          {
            id: 'resp_robert_cautela_estrategica',
            texto: '«Rhaegar comanda quarenta mil homens, incluindo a Guarda Real. Precisamos de tática tanto quanto de fúria, meu senhor.»',
            reacaoCompanheiro: 'Robert bufa desdenhoso, mas assente lentamente. «Ned diz exatamente a mesma coisa. Tendes razão... mas na hora do choque, nada supera o peso do bom aço.»',
            deltaAprovacao: 5,
            bonusCompostura: 1,
          },
        ],
      },
      {
        id: 'robert_saudade_lyanna',
        titulo: 'Sobre a memória de Lyanna Stark',
        resumo: 'O motivo pessoal e apaixonado que incendeia a rebelião.',
        falaInicial: `Quando as fogueiras começam a apagar e os outros capitães dormem, o riso de Robert desaparece. O olhar do jovem lorde perde-se na noite em direção ao sul.
        
— Ela não era feita para gaiolas de ouro em Porto Real — murmura Robert com uma voz rouca e surpreendentemente vulnerável. — Lyanna tinha a fúria e a beleza selvagem do Norte no sangue. Rhaegar a sequestrou e a trancou em algum buraco no sul. Às vezes acordo no meio da noite com o som da risada dela... e tudo o que quero é queimar cada castelo Targaryen até encontrar o sorriso dela novamente.`,
        respostas: [
          {
            id: 'resp_robert_promessa_resgate',
            texto: '«Nós a resgataremos, Robert. E quando ela estiver a salvo, o reino inteiro celebrará vossa união.»',
            reacaoCompanheiro: 'Robert aperta a vossa mão com força silenciosa. «Obrigado, amigo. Sem vós e Ned, eu já teria perdido a razão neste mar de sangue.»',
            deltaAprovacao: 15,
            bonusInspiracao: 1,
            flagConcedida: 'juramento_de_resgate_lyanna',
          },
          {
            id: 'resp_robert_foco_dever',
            texto: '«Mantende vossa cabeça fria, lorde Baratheon. Um rei enfurecido comete erros que custam a vida de seus vassalos.»',
            reacaoCompanheiro: 'Robert cerra a mandíbula por um instante, sentindo a ferroada da repreensão. «Duro... mas verdadeiro. Um comandante não pode fraquejar.»',
            deltaAprovacao: 2,
            bonusCompostura: 2,
          },
        ],
      },
    ],
  },

  ned_stark: {
    id: 'ned_stark',
    nome: 'Eddard Stark',
    titulo: 'Senhor de Winterfell & Protetor do Norte',
    era: 'rebeliao_robert',
    citacao: '«O homem que profere a sentença deve manejar a espada. Não lutamos por coroas nem por glória; lutamos para que a honra volte a ter valor.»',
    topicos: [
      {
        id: 'ned_o_fardo_do_norte',
        titulo: 'Sobre a execução de Brandon e Lorde Rickard Stark',
        resumo: 'A tragédia familiar que obrigou Ned a assumir a liderança de Winterfell.',
        falaInicial: `Eddard Stark senta-se sozinho à margem do fogo com Gelo desembainhada sobre os joelhos. A lâmina de aço valiriano de duas mãos reflete o brilho tremeluzente das chamas como gelo banhado em sangue.
        
— Eu nunca deveria ser o Senhor de Winterfell — diz Ned em voz baixa, as feições austeras esculpidas em mágoa antiga. — Brandon nasceu para governar; ele era valente, orgulhoso e amado por todos. Meu pai Rickard viajou para a corte acreditando nas leis da cavalaria... e o Rei Louco o assou em sua armadura enquanto Brandon se enforcava tentando salvá-lo. Os Deuses Antigos exigem justiça, não vingança cega. Temo que a fúria de Robert destrua coisas que jamais poderemos reconstruir.`,
        respostas: [
          {
            id: 'resp_ned_honra_stark',
            texto: '«Vosso pai e vosso irmão vivem na vossa retidão, Ned. O Norte vos seguirá até o fim dos dias porque vós sois o sangue de Winterfell.»',
            reacaoCompanheiro: 'Ned ergue o olhar e vos fita com gratidão sincera e respeitosa. «Vossas palavras confortam o coração de um homem em luto. Enquanto houver lealdade como a vossa, o Norte resistirá.»',
            deltaAprovacao: 14,
            bonusInspiracao: 1,
            bonusCompostura: 1,
            flagConcedida: 'amizade_eterna_de_ned_stark',
          },
          {
            id: 'resp_ned_pragmatismo_guerra',
            texto: '«Robert pode ser impetuoso, mas é o martelo de que precisamos para quebrar os dragões. Depois da vitória cuidamos da paz.»',
            reacaoCompanheiro: 'Ned suspira pesadamente, embainhando Gelo com reverência. «Talvez tenhais razão. Mas a vitória comprada sem honra não passa de uma derrota disfarçada.»',
            deltaAprovacao: 6,
            bonusCompostura: 1,
          },
        ],
      },
    ],
  },

  jon_arryn: {
    id: 'jon_arryn',
    nome: 'Lorde Jon Arryn',
    titulo: 'Senhor do Ninho da Águia & Defensor do Vale',
    era: 'rebeliao_robert',
    citacao: '«Tão Alto Como a Honra não é apenas o lema da minha Casa; é o único alicerce sobre o qual um reino pode permanecer de pé.»',
    topicos: [
      {
        id: 'jon_arryn_desafio_ao_rei',
        titulo: 'Sobre a decisão de levantar os estandartes contra o Trono de Ferro',
        resumo: 'A recusa sagrada de um guardião em entregar os rapazes que jurou proteger.',
        falaInicial: `Lorde Jon Arryn examina mapas militares de Westeros à luz de uma lanterna de chifre. Apesar dos cabelos brancos e das rugas profundas de idade, seus olhos azuis retêm uma claridade inflexível.
        
— Quando o corvo chegou de Porto Real com a ordem do Rei Aerys para que eu enviasse as cabeças de Robert e Eddard — diz Lorde Arryn pausadamente —, os meistres do Ninho empalideceram de terror. Um homem menor teria obedecido para salvar seu próprio castelo. Mas a hospitalidade e a proteção aos protegidos são votos mais antigos do que a linhagem dos Targaryen. Preferi atear fogo a todo o reino a manchar a honra do Vale entregando dois jovens inocentes à sanha de um carrasco.`,
        respostas: [
          {
            id: 'resp_jon_arryn_louvar_virtude',
            texto: '«Vossa coragem salvou o reino, Lorde Arryn. Nenhum monarca legítimo pode exigir a traição de juramentos sagrados.»',
            reacaoCompanheiro: 'Jon Arryn coloca a mão trêmula, mas firme, sobre o vosso ombro. «Obrigado, meu nobre amigo. É o respeito de homens honrados como vós que me dá forças para cavalgar nesta idade avançada.»',
            deltaAprovacao: 15,
            bonusInspiracao: 1,
            bonusCompostura: 1,
            flagConcedida: 'bencao_de_jon_arryn',
          },
          {
            id: 'resp_jon_arryn_planejar_governo',
            texto: '«Quando Robert sentar no Trono de Ferro, vós tereis que governar por ele como Mão do Rei para manter os lordes sob rédeas firmes.»',
            reacaoCompanheiro: 'Jon sorri com brandura cansada. «Uma coisa de cada vez. Primeiro façamos a paz reinar; os fardos do governo virão com o tempo.»',
            deltaAprovacao: 8,
            bonusCompostura: 1,
          },
        ],
      },
    ],
  },
};

/**
 * Obtém os tópicos de acampamento disponíveis para um companheiro específico,
 * filtrando por flags ativas no WorldState do jogador.
 */
export function obterTopicosAcampamento(
  companionId: string,
  flagsAtivas: Record<string, boolean | string | number> = {}
): TopicoDialogoAcampamento[] {
  const comp = DIALOGOS_DE_ACAMPAMENTO[companionId];
  if (!comp) return [];

  return comp.topicos.filter((t) => {
    if (!t.condicaoFlag) return true;
    return Boolean(flagsAtivas[t.condicaoFlag]);
  });
}
