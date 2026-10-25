import 'server-only';
import { GrafoJornada } from '@/server/engine/storyLinter';

export const grafoJ4Ato1V2: GrafoJornada = {
  id: 'jornada_4_muralha_ato1_v2',
  titulo: 'Ato I: As Cinzas do Punho & A Marcha na Neve',
  startNodeId: 'j4_a1_cinzas_do_punho',
  nodes: {
    // =========================================================================
    // ETAPA 1: ABERTURA (2 CENAS)
    // =========================================================================

    // 1. O Despertar nas Cinzas do Punho
    j4_a1_cinzas_do_punho: {
      id: 'j4_a1_cinzas_do_punho',
      titulo: 'Três Toques de Trombeta nas Pedras Antigas',
      anoHistorico: '299 d.C.',
      localizacao: 'O Punho dos Primeiros Homens',
      regionId: 'floresta_assombrada',
      tipo: 'narracao',
      rota: 'comum',
      pov: 'Irmão Sem Nome',
      origem: 'canonica',
      loreContext: {
        fonte: {
          livro: 'A Tormenta de Espadas',
          capitulo: 'Prólogo & Samwell I',
          arquivo_md: 'asos_samwell_1.md',
        },
      },
      epigrafe: {
        texto: 'A noite não pede licença para cair, e o gelo não pede desculpas pelo sangue que endurece na pedra.',
        autor: 'Canção Antiga dos Patrulheiros da Noite',
      },
      fallbackText: `O som das três trombetas ainda vibra nos seus ossos como um sino de ferro rachado. Um toque para os irmãos que retornam da patrulha; dois para os selvagens que descem dos desfiladeiros; três para os Outros. Três toques não soavam na Muralha havia oito mil anos, mas você os ouviu enquanto o vento da meia-noite uivava entre as pedras em anel erguidas pelos Primeiros Homens.

A batalha não foi um duelo; foi um abate nas sombras. Cavalos em pânico arrebentaram as amarras, precipitando-se pelas escarpas íngremes sob flechas de fogo que mal arranhavam as silhuetas pálidas que subiam a colina. Os mortos caminhavam com olhos de safira ardente, indiferentes às lanças que lhes perfuravam o peito. Você se lembra do impacto brutal de um machado lascando o seu escudo de carvalho, da queda sobre a terra congelada e do peso sufocante de um irmão tombado sobre as suas pernas antes que a escuridão cobrisse tudo.

Agora, o silêncio que sucede a tempestade é mais aterrorizante que o clamor do aço. Você empurra o cadáver empapado de sangue que o manteve oculto na vala e se ergue. A geada colou o ferro da sua cota de malha ao couro do gibão. Em volta, o acampamento arde em fogueiras moribundas. Corvos cinzentos esvoaçam sobre montes de cinza e carne partida. Mais abaixo, perto da paliçada sul, você enxerga o estandarte negro despedaçado da Patrulha da Noite e a silhueta maciça de Jeor Mormont, o Velho Urso, reunindo os poucos homens que ainda respiram.`,
      blocos: [
        {
          funcao: 'abertura',
          texto: `O som das três trombetas ainda vibra nos seus ossos como um sino de ferro rachado. Um toque para os irmãos que retornam da patrulha; dois para os selvagens que descem dos desfiladeiros; três para os Outros. Três toques não soavam na Muralha havia oito mil anos, mas você os ouviu enquanto o vento da meia-noite uivava entre as pedras em anel erguidas pelos Primeiros Homens.`,
        },
        {
          funcao: 'corpo',
          texto: `A batalha não foi um duelo; foi um abate nas sombras. Cavalos em pânico arrebentaram as amarras, precipitando-se pelas escarpas íngremes sob flechas de fogo que mal arranhavam as silhuetas pálidas que subiam a colina. Os mortos caminhavam com olhos de safira ardente, indiferentes às lanças que lhes perfuravam o peito. Você se lembra do impacto brutal de um machado lascando o seu escudo de carvalho, da queda sobre a terra congelada e do peso sufocante de um irmão tombado sobre as suas pernas antes que a escuridão cobrisse tudo.`,
        },
        {
          funcao: 'fecho',
          texto: `Agora, o silêncio que sucede a tempestade é mais aterrorizante que o clamor do aço. Você empurra o cadáver empapado de sangue que o manteve oculto na vala e se ergue. A geada colou o ferro da sua cota de malha ao couro do gibão. Em volta, o acampamento arde em fogueiras moribundas. Corvos cinzentos esvoaçam sobre montes de cinza e carne partida. Mais abaixo, perto da paliçada sul, você enxerga o estandarte negro despedaçado da Patrulha da Noite e a silhueta maciça de Jeor Mormont, o Velho Urso, reunindo os poucos homens que ainda respiram.`,
        },
      ],
      vozesConflito: [
        {
          voz1: 'furia',
          voz2: 'astucia',
          fala1: 'Apanhe a espada do chão! Se as criaturas voltarem, morreremos de pé com aço na garganta deles!',
          fala2: 'Silêncio! Se desembainhar a lâmina agora, o tinido ecoará pelas ravinas. Rasteje até a paliçada antes que notem você.',
        },
      ],
      internalVoices: [
        {
          atributo: 'pressagio',
          resultadoPassivo: 'SUCESSO',
          dcPassiva: 8,
          fala: 'O ar cheira a enxofre e carne queimada. Os mortos não correram; eles cercaram a montanha e esperam a noite cair outra vez.',
        },
      ],
      escolhas: [
        {
          id: 'j4_a1_c1_estancar_ferida',
          tipo: 'teste_atributo',
          texto: 'Apertar o torniquete na perna sangrando e correr até os sobreviventes',
          atributo: 'furia',
          dc: 8,
          tom: 'violencia',
          circunstancias: [
            {
              tipo: 'vantagem',
              motivo: 'A dor aguda da geada estanca momentaneamente a hemorragia.',
            },
          ],
          desfechos: {
            sucesso: {
              ponte: 'Você rasga uma tira do manto de lã esfarrapado e amarra com firmeza sobre o corte no joelho. A dor queima como ferro em brasa, mas o estancamento sustenta o seu peso enquanto você corre colina abaixo.',
              destino: 'j4_a1_reuniao_sobreviventes_hub',
              marcas: ['sobreviveu_ao_punho'],
              delta: { compostura: 1 },
            },
            parcial: {
              ponte: 'O nó escorrega nos dedos entorpecidos pelo gelo. Você consegue travar o sangue a tempo, mas a ferida pulsa a cada passo claudicante na neve alta.',
              destino: 'j4_a1_reuniao_sobreviventes_hub',
              marcas: ['sobreviveu_ao_punho', 'ferida_da_neve'],
              delta: { sangue: -1 },
            },
            falha: {
              ponte: 'A carne lacerada abre ainda mais na corrida desesperada. Você cai de joelhos diante da paliçada, cuspindo sangue e neve, salvo apenas pelas mãos fortes de Grenn que o puxam para dentro.',
              destino: 'j4_a1_reuniao_sobreviventes_hub',
              marcas: ['sobreviveu_ao_punho', 'ferida_da_neve'],
              delta: { sangue: -2, compostura: -1 },
            },
          },
          onSuccessNodeId: 'j4_a1_reuniao_sobreviventes_hub',
          onPartialFailureNodeId: 'j4_a1_reuniao_sobreviventes_hub',
        },
        {
          id: 'j4_a1_c1_vasculhar_armas',
          tipo: 'simples',
          texto: 'Recolher uma tocha acesa e uma adaga de obsidiana entre os caídos antes de avançar',
          tom: 'honesto',
          desfecho: {
            ponte: 'Com dedos ágeis, você arranca uma tocha fumegante de um braço decepado e guarda uma lâmina de vidro de dragão na bota. O fogo afasta as sombras enquanto você alcança a retaguarda.',
            destino: 'j4_a1_reuniao_sobreviventes_hub',
            marcas: ['sobreviveu_ao_punho', 'adaga_obsidiana_guardada'],
            delta: { honra: 1 },
          },
          nextNodeId: 'j4_a1_reuniao_sobreviventes_hub',
        },
      ],
    },

    // 2. A Reunião dos Sobreviventes (Hub de Diálogo)
    j4_a1_reuniao_sobreviventes_hub: {
      id: 'j4_a1_reuniao_sobreviventes_hub',
      titulo: 'Os Restos da Coluna sob a Nevasca',
      anoHistorico: '299 d.C.',
      localizacao: 'Base do Punho dos Primeiros Homens',
      regionId: 'floresta_assombrada',
      tipo: 'hub',
      rota: 'comum',
      pov: 'Irmão Sem Nome',
      origem: 'canonica',
      loreContext: {
        fonte: {
          livro: 'A Tormenta de Espadas',
          capitulo: 'Samwell I',
          arquivo_md: 'asos_samwell_1.md',
        },
      },
      fallbackText: `Atrás da frágil linha de estacas pontiagudas, restam pouco mais de cinquenta homens dos trezentos que cavalgaram para o norte. Rostos enegrecidos pela fumaça encaram o vazio com o olhar vidrado de quem viu os próprios mortos se erguerem. Cavalos feridos relincham de dor, enquanto Meistre Aemon não está aqui para salvar ninguém; apenas o jovem Samwell Tarly soluça baixinho perto das gaiolas vazias de corvos mensageiros.

Grenn limpa o sangue coagulado da lâmina com um punhado de neve, a mandíbula travada pela fúria e pelo medo. Chett, o mestre dos cães com o rosto marcado por pústulas, murmura maldições venenosas a cada lorde de Westeros, os olhos pequenos saltando entre os poucos mantimentos intactos. Mais afastado, o gigante Small Paul segura a rédea frouxa de um garanhão cego, acariciando o focinho do animal como se tentasse protegê-lo do vendaval que vem do norte.`,
      blocos: [
        {
          funcao: 'abertura',
          texto: `Atrás da frágil linha de estacas pontiagudas, restam pouco mais de cinquenta homens dos trezentos que cavalgaram para o norte. Rostos enegrecidos pela fumaça encaram o vazio com o olhar vidrado de quem viu os próprios mortos se erguerem.`,
        },
        {
          funcao: 'corpo',
          quando: { flagsTodas: ['ferida_da_neve'] },
          texto: `A sua perna lateja com violência. Grenn joga um trapo grosso para você amarrar sobre a cota de malha, sem desviar os olhos da borda da floresta. «Se não puder marchar quando o corno soar, você fica para trás», avisa ele com voz rouca, embora os olhos revelem compaixão.`,
        },
        {
          funcao: 'fecho',
          texto: `O Senhor Comandante Mormont cavalga de um lado a outro, o corvo pousado no ombro gritando «Grão! Grão! Morte!». Restam poucos minutos antes que a ordem de marcha seja dada. Você precisa entender o estado dos homens antes de pisar na neve aberta.`,
        },
      ],
      interlocutores: [
        { id: 'grenn', nome: 'Grenn', papel: 'Patrulheiro e Amigo de Jon Snow' },
        { id: 'chett', nome: 'Chett', papel: 'Cuidador dos Cães' },
        { id: 'small_paul', nome: 'Small Paul', papel: 'Irmão Construtor Gigante' },
      ],
      reacoes: [
        {
          companheiro: 'grenn',
          condicao: { flagsTodas: ['sobreviveu_ao_punho'] },
          fala: 'Pensei que você tivesse ficado nas pedras, irmão. Mantenha a espada firme; o pior ainda está por vir.',
        },
      ],
      escolhas: [
        {
          id: 'j4_a1_hub_falar_grenn',
          tipo: 'simples',
          texto: 'Perguntar a Grenn sobre a linha de defesa e a marcha',
          tom: 'honesto',
          unica: true,
          permanece: true,
          desfecho: {
            ponte: 'Grenn olha para a floresta sombria e cospe no gelo. «O Velho Urso quer marchar para a Fortaleza de Craster. Diz que lá há teto e comida, se o selvagem não nos fechar as portas. Se a nevasca apertar, metade de nós cai na trilha.»',
            marcas: ['aliado_grenn'],
          },
          nextNodeId: 'j4_a1_reuniao_sobreviventes_hub',
        },
        {
          id: 'j4_a1_hub_ouvir_chett',
          tipo: 'simples',
          texto: 'Confrontar Chett sobre os cães e os murmúrios de traição',
          tom: 'ameaca',
          unica: true,
          permanece: true,
          desfecho: {
            ponte: 'Chett cospe perto da sua bota, os olhos inflamados de rancor. «Os cães fugiram ou viraram comida deles! Mormont nos trouxe aqui para sermos estripados por lendas. Se pensa que vou morrer pelo orgulho de um velho lorde, está muito enganado.»',
            marcas: ['desconfianca_chett'],
          },
          nextNodeId: 'j4_a1_reuniao_sobreviventes_hub',
        },
        {
          id: 'j4_a1_hub_ajudar_paul',
          tipo: 'simples',
          texto: 'Ajudar Small Paul a prender os mantimentos no cavalo esgotado',
          tom: 'diplomatico',
          unica: true,
          permanece: true,
          desfecho: {
            ponte: 'Small Paul sorri com simplicidade infantil sob o capuz imundo. «O cavalinho está com frio, irmão. Eu carrego as sacolas de trigo se ele cansar, prometo. Mormont não vai deixar ele para trás, vai?»',
            marcas: ['protegeu_paul'],
            delta: { honra: 1 },
          },
          nextNodeId: 'j4_a1_reuniao_sobreviventes_hub',
        },
        {
          id: 'j4_a1_hub_seguir_mormont',
          tipo: 'simples',
          texto: 'Apresentar-se a Jeor Mormont para a ordem de retirada [Avançar]',
          tom: 'devocao',
          desfecho: {
            ponte: 'O Velho Urso ergue a mão enluvada de couro de urso. O toque único de trombeta ressoa na colina. É a retirada. Cinquenta irmãos negros iniciam a marcha desesperada pela garganta branca da floresta.',
            destino: 'j4_a1_encruzilhada_retirada',
          },
          nextNodeId: 'j4_a1_encruzilhada_retirada',
        },
      ],
    },

    // =========================================================================
    // ETAPA 2: ENCRUZILHADA (1 CENA)
    // =========================================================================

    j4_a1_encruzilhada_retirada: {
      id: 'j4_a1_encruzilhada_retirada',
      titulo: 'A Escolha do Posto de Sangue',
      anoHistorico: '299 d.C.',
      localizacao: 'Borda da Floresta Assombrada',
      regionId: 'floresta_assombrada',
      tipo: 'narracao',
      rota: 'comum',
      pov: 'Irmão Sem Nome',
      origem: 'canonica',
      loreContext: {
        fonte: {
          livro: 'A Tormenta de Espadas',
          capitulo: 'Samwell I',
          arquivo_md: 'asos_samwell_1.md',
        },
      },
      fallbackText: `A nevasca cai como cortinas de ferro cinzento, apagando os contornos da montanha atrás da coluna. A ordem do Senhor Comandante ecoa entre os pinheiros gelados: marchar em fila cerrada, tochas de resina à frente para espantar as feras, e lanças voltadas para fora em todos os flancos.

Mormont para o seu cavalo de guerra diante de você. O hálito do animal forma nuvens densas no ar gelado. Os olhos cinzentos do velho lorde medem a sua postura e o estado da sua lâmina. «Preciso de homens firmes onde o perigo for maior», troveja ele com a aspereza de quem já perdeu metade do coração nesta expedição. «A vanguarda precisa abrir caminho na neve profunda com machados e tochas, colidindo contra qualquer sombra antes que ela alcance os feridos. Nos flancos, os batedores precisam se embrenhar nos pinheiros e impedir que sejamos rodeados. Onde você vai sangrar pela Patrulha, irmão?»`,
      blocos: [
        {
          funcao: 'abertura',
          texto: `A nevasca cai como cortinas de ferro cinzento, apagando os contornos da montanha atrás da coluna. A ordem do Senhor Comandante ecoa entre os pinheiros gelados: marchar em fila cerrada, tochas de resina à frente para espantar as feras, e lanças voltadas para fora em todos os flancos.`,
        },
        {
          funcao: 'corpo',
          quando: { flagsTodas: ['ferida_da_neve'] },
          texto: `Sua perna treme sob o couro endurecido. Escolher a vanguarda exigirá força bruta para romper os montes de neve virgem; juntar-se aos batedores exigirá astúcia para se mover silenciosamente sem trair a posição da coluna.`,
        },
        {
          funcao: 'fecho',
          texto: `Dois caminhos se abrem diante da hoste despedaçada. Cada um cobrará o seu preço em suor, gelo e sangue.`,
        },
      ],
      escolhas: [
        {
          id: 'j4_a1_decisao_vanguarda',
          tipo: 'simples',
          texto: 'Marchar na Vanguarda com o Velho Urso e abrir a trilha à força de machado',
          tom: 'violencia',
          desfecho: {
            ponte: 'Você toma a dianteira da coluna ao lado dos homens mais rudes da Ilha dos Ursos. O vento corta o rosto como lâmina de barbear enquanto você ergue o machado para abrir a picada na neve alta.',
            destino: 'j4_a1_vanguarda_trilha_neve',
            marcas: ['posto_vanguarda'],
            delta: { honra: 1 },
          },
          nextNodeId: 'j4_a1_vanguarda_trilha_neve',
        },
        {
          id: 'j4_a1_decisao_batedores',
          tipo: 'simples',
          texto: 'Juntar-se ao Flanco dos Batedores com Grenn para vigiar as ravinas laterais',
          tom: 'silencio',
          desfecho: {
            ponte: 'Você engata o arco curto no ombro e se afasta da trilha batida, afundando na neve até as coxas ao lado de Grenn. O silêncio da floresta fecha-se sobre você como uma mortalha.',
            destino: 'j4_a1_batedores_rastros_floresta',
            marcas: ['posto_batedores'],
            delta: { compostura: 1 },
          },
          nextNodeId: 'j4_a1_batedores_rastros_floresta',
        },
      ],
    },

    // =========================================================================
    // ETAPA 3: ROTAS (6 CENAS: 3 POR ROTA, EXCLUSIVIDADE ≥ 60%)
    // =========================================================================

    // --- ROTA A: VANGUARDA COM O VELHO URSO ---

    // Rota A1: Trilha na Nevasca
    j4_a1_vanguarda_trilha_neve: {
      id: 'j4_a1_vanguarda_trilha_neve',
      titulo: 'Abrindo a Garganta Branca',
      anoHistorico: '299 d.C.',
      localizacao: 'Ravinas da Floresta Assombrada',
      regionId: 'floresta_assombrada',
      tipo: 'narracao',
      rota: 'vanguarda',
      pov: 'Irmão Sem Nome',
      origem: 'original',
      notaHistorica: 'Dramatização autoral do avanço físico da vanguarda de Jeor Mormont abrindo clareiras sob nevasca intensa após o massacre.',
      loreContext: {
        fonte: {
          livro: 'A Tormenta de Espadas',
          capitulo: 'Samwell I',
          arquivo_md: 'asos_samwell_1.md',
        },
      },
      fallbackText: `A neve atinge a altura do peito nas depressões entre os pinheiros. À frente da coluna, você e três homens de armas golpeiam os galhos caídos e abrem valas a passos pesados para que os cavalos feridos de Mormont não quebrem as patas. Cada respiração arde nos pulmões como vidro moído.

Um rochedo encoberto pelo gelo desaba à frente, bloqueando a garganta estreita por onde a hoste deve passar. Se pararem para contornar a colina, a tempestade soterrará os homens exaustos da retaguarda. Mormont desmonta com a espada Bastarda na mão enluvada. «Tirem essas pedras e esse tronco do caminho agora!», rosna o comandante. «O frio mata mais depressa que o ferro!»`,
      escolhas: [
        {
          id: 'j4_a1_va1_romper_obstaculo',
          tipo: 'teste_atributo',
          texto: 'Apoiar o ombro contra o tronco congelado e forçar a passagem à frente',
          atributo: 'furia',
          dc: 10,
          tom: 'violencia',
          circunstancias: [
            {
              tipo: 'vantagem',
              motivo: 'A adrenalina do desespero e o apoio dos homens de Mormont duplicam a força do impacto.',
            },
          ],
          desfechos: {
            sucesso: {
              ponte: 'Com um urro rouco, você finca as botas na pedra e empurra a tora desmoronada ravina abaixo. O caminho abre-se com um estrondo de neve, e a vanguarda rompe o bloqueio sem perder um único minuto.',
              destino: 'j4_a1_vanguarda_emboscada_criatura',
              marcas: ['abriu_trilha_neve', 'confianca_mormont'],
              delta: { honra: 1, compostura: 1 },
            },
            parcial: {
              ponte: 'A madeira estilhaça sob o peso conjunto. O tronco cede, mas a ponta de um galho rasga o seu gibão e a neve pesada cai sobre os seus ombros, roubando o fôlego da vanguarda.',
              destino: 'j4_a1_vanguarda_emboscada_criatura',
              marcas: ['abriu_trilha_neve'],
              delta: { sangue: -1 },
            },
            falha: {
              ponte: 'O peso da rocha esmaga o cabo do machado e você escorrega na laje de gelo, machucando o flanco. Dois homens precisam puxá-lo antes que a barreira seja contornada com atraso perigoso.',
              destino: 'j4_a1_vanguarda_emboscada_criatura',
              marcas: ['ferida_da_neve'],
              delta: { sangue: -2, compostura: -1 },
            },
          },
          onSuccessNodeId: 'j4_a1_vanguarda_emboscada_criatura',
          onPartialFailureNodeId: 'j4_a1_vanguarda_emboscada_criatura',
        },
        {
          id: 'j4_a1_va1_abrir_atalho_machado',
          tipo: 'teste_atributo',
          texto: 'Golpear os galhos congelados com o machado de lenhador para abrir passagem lateral protegida',
          atributo: 'astucia',
          dc: 9,
          tom: 'silencio',
          desfechos: {
            sucesso: {
              ponte: 'Com golpes cirúrgicos nos nós da madeira congelada, você corta os galhos e abre uma passagem segura sem acordar o eco da montanha.',
              destino: 'j4_a1_vanguarda_emboscada_criatura',
              marcas: ['abriu_trilha_neve'],
              delta: { compostura: 1 },
            },
            parcial: {
              ponte: 'O machado lasca no cerne petrificado da tora. O esforço dobra os seus pulsos dormentes, mas a brecha é aberta a tempo da passagem dos cavalos.',
              destino: 'j4_a1_vanguarda_emboscada_criatura',
              marcas: ['abriu_trilha_neve'],
              delta: { sangue: -1 },
            },
            falha: {
              ponte: 'A lâmina do machado resvala na camada de gelo e atinge a sua canela. Você cambaleia com dor aguda enquanto os homens forçam o tronco com as próprias mãos.',
              destino: 'j4_a1_vanguarda_emboscada_criatura',
              marcas: ['ferida_da_neve'],
              delta: { sangue: -2, compostura: -1 },
            },
          },
          onSuccessNodeId: 'j4_a1_vanguarda_emboscada_criatura',
          onPartialFailureNodeId: 'j4_a1_vanguarda_emboscada_criatura',
        },
      ],
    },

    // Rota A2: Emboscada da Criatura
    j4_a1_vanguarda_emboscada_criatura: {
      id: 'j4_a1_vanguarda_emboscada_criatura',
      titulo: 'Garras sob o Véu Noturno',
      anoHistorico: '299 d.C.',
      localizacao: 'Clareira Congelada na Floresta',
      regionId: 'floresta_assombrada',
      tipo: 'dialogo',
      rota: 'vanguarda',
      pov: 'Irmão Sem Nome',
      origem: 'original',
      notaHistorica: 'Combate tático e tenso entre a vanguarda e uma fera reanimada pelos Outros tentando derrubar a montaria de Mormont.',
      loreContext: {
        fonte: {
          livro: 'A Tormenta de Espadas',
          capitulo: 'Samwell I',
          arquivo_md: 'asos_samwell_1.md',
        },
      },
      fallbackText: `A clareira parece deserta, mas os cavalos empacam e relincham em histeria. Entre as copas dos pinheiros ancestrais, uma silhueta cai como chumbo sobre a neve: um urso das neves descomunal, com o pelo em farrapos podres e duas chamas azuis brilhando nas órbitas vazias.

O monstro arrebenta a formação inicial com um golpe de pata que arremessa um patrulheiro contra o tronco de uma faia. Mormont desembainha Garralonga, o aço valiriano brilhando cinzento e escuro na penumbra da nevasca. A fera reanimada avança em linha reta na direção do Velho Urso, ignorando flechas e gritos.`,
      interlocutores: [
        { id: 'jeor_mormont', nome: 'Jeor Mormont', papel: 'Senhor Comandante da Patrulha da Noite' },
      ],
      falas: [
        {
          quem: 'jeor_mormont',
          texto: 'Fogo! Enfiem as tochas nos olhos dessa abominação ou ela nos parte em dois!',
        },
      ],
      escolhas: [
        {
          id: 'j4_a1_va2_enfrentar_com_fogo',
          tipo: 'teste_atributo',
          texto: 'Mergulhar sob a pata do urso morto e cravar a tocha de resina acesa nas suas fauces',
          atributo: 'comando',
          dc: 10,
          tom: 'violencia',
          desfechos: {
            sucesso: {
              ponte: 'Você rola pela neve congelada e enterra o tição ardente na garganta escancarada do monstro. O fogo de resina explode na gordura podre; a fera urra sem voz e tomba em cinzas crepitantes aos pés de Mormont.',
              destino: 'j4_a1_vanguarda_acampamento_tochas',
              marcas: ['matou_criatura_punho', 'confianca_mormont'],
              delta: { honra: 2, inspiracao: 1 },
            },
            parcial: {
              ponte: 'A tocha atinge a bocarra do urso e incendeia a criatura, mas as garras congeladas raspam o seu ombro esquerdo, rasgando couro e carne antes que o fogo consuma o monstro.',
              destino: 'j4_a1_vanguarda_acampamento_tochas',
              marcas: ['matou_criatura_punho', 'cicatriz_gelo'],
              delta: { sangue: -2, novaCicatriz: 'Garras da Fera do Punho' },
            },
            falha: {
              ponte: 'O golpe do urso atinge o seu peito como o tronco de um aríete. O aço da armadura amassa e as costelas estalam. Apenas a lâmina de Garralonga, brandida com fúria por Mormont, degola o monstro a tempo de poupar a sua vida.',
              destino: 'j4_a1_vanguarda_acampamento_tochas',
              marcas: ['cicatriz_gelo', 'ferida_da_neve'],
              delta: { sangue: -4, compostura: -2 },
            },
          },
          onSuccessNodeId: 'j4_a1_vanguarda_acampamento_tochas',
          onPartialFailureNodeId: 'j4_a1_vanguarda_acampamento_tochas',
        },
        {
          id: 'j4_a1_va2_formar_parede_lancas',
          tipo: 'teste_atributo',
          texto: 'Fincar a ponta da lança na neve e sustentar o impacto do monstro com os irmãos',
          atributo: 'furia',
          dc: 9,
          tom: 'devocao',
          desfechos: {
            sucesso: {
              ponte: 'Você e dois patrulheiros cravam as coronhas das lanças nas lajes de pedra. O urso empala-se na madeira de freixo; antes que arrebente as hastes, o fogo dos homens consome o monstro.',
              destino: 'j4_a1_vanguarda_acampamento_tochas',
              marcas: ['matou_criatura_punho', 'confianca_mormont'],
              delta: { honra: 2, compostura: 1 },
            },
            parcial: {
              ponte: 'A haste da sua lança racha com o peso descomunal. A ponta quebra dentro da carcaça podre e o tranco joga você de costas na neve, mas a fera perde o ímpeto e tomba sob os machados de Mormont.',
              destino: 'j4_a1_vanguarda_acampamento_tochas',
              marcas: ['matou_criatura_punho'],
              delta: { sangue: -1, compostura: -1 },
            },
            falha: {
              ponte: 'O impacto brutal esmaga a lança como graveto. A pata do monstro varre a linha de frente, atirando você contra uma rocha antes que Garralonga decepe a criatura reanimada.',
              destino: 'j4_a1_vanguarda_acampamento_tochas',
              marcas: ['cicatriz_gelo', 'ferida_da_neve'],
              delta: { sangue: -3, compostura: -2 },
            },
          },
          onSuccessNodeId: 'j4_a1_vanguarda_acampamento_tochas',
          onPartialFailureNodeId: 'j4_a1_vanguarda_acampamento_tochas',
        },
      ],
    },

    // Rota A3: Acampamento das Tochas
    j4_a1_vanguarda_acampamento_tochas: {
      id: 'j4_a1_vanguarda_acampamento_tochas',
      titulo: 'O Círculo Fumegante',
      anoHistorico: '299 d.C.',
      localizacao: 'Acampamento Improvisado na Neve',
      regionId: 'floresta_assombrada',
      tipo: 'narracao',
      rota: 'vanguarda',
      pov: 'Irmão Sem Nome',
      origem: 'original',
      notaHistorica: 'Momento tenso de vigília onde a vanguarda precisa manter as tochas acesas e conter o princípio de motim entre os homens de Chett.',
      loreContext: {
        fonte: {
          livro: 'A Tormenta de Espadas',
          capitulo: 'Samwell I',
          arquivo_md: 'asos_samwell_1.md',
        },
      },
      fallbackText: `A coluna é forçada a parar por três horas no fundo de uma garganta protegida do vento direto. Os homens tremem incontrolavelmente; o gelo acumula-se nas barbas e cílios como máscaras de vidro. Manter o fogo aceso é a única linha divisória entre a vida e o sono da morte branca.

Perto das esteiras, Chett e dois patrulheiros de Vila Toupeira cercam um fardo de pão duro e queijo podre, murmurando com facas desembainhadas nas mangas. «O velho vai nos levar para a cova de Craster para morrer de fome!», sibila Chett. Se o motim estourar aqui, na escuridão da tempestade, a vanguarda se despedaçará antes do amanhecer.`,
      blocos: [
        {
          funcao: 'abertura',
          texto: `A coluna é forçada a parar por três horas no fundo de uma garganta protegida do vento direto. Os homens tremem incontrolavelmente; o gelo acumula-se nas barbas e cílios como máscaras de vidro. Manter o fogo aceso é a única linha divisória entre a vida e o sono da morte branca.`,
        },
        {
          funcao: 'corpo',
          quando: { flagsTodas: ['matou_criatura_punho'] },
          texto: `O cheiro de gordura queimada da carcaça do urso morto ainda empapuça o seu capuz. Os homens olham para você com respeito silencioso ao verem que o sangue das abominações pode ser contido com coragem e fogo.`,
        },
        {
          funcao: 'corpo',
          quando: { flagsTodas: ['abriu_trilha_neve'] },
          texto: `Os machadeiros descansam as mãos empoladas sobre as toras recém-cortadas, reconhecendo que o avanço só foi possível graças à passagem aberta na neve.`,
        },
        {
          funcao: 'fecho',
          texto: `Perto das esteiras, Chett e dois patrulheiros de Vila Toupeira cercam um fardo de pão duro e queijo podre, murmurando com facas desembainhadas nas mangas. Se o motim estourar aqui, na escuridão da tempestade, a vanguarda se despedaçará antes do amanhecer.`,
        },
      ],
      escolhas: [
        {
          id: 'j4_a1_va3_impor_disciplina',
          tipo: 'teste_atributo',
          texto: 'Pôr-se diante de Chett com a mão no punho da espada e exigir obediência ao juramento',
          atributo: 'comando',
          dc: 10,
          tom: 'honesto',
          desfechos: {
            sucesso: {
              ponte: 'A sua voz soa firme e cortante como o vento da Muralha. Chett recua, embainha a faca e cospe no chão, acovardado pelo peso da sua determinação. A disciplina se mantém e as tochas são racionadas com ordem.',
              destino: 'j4_a1_nevasca_pesadelo_marcha',
              marcas: ['fogo_preservado', 'conteve_panico'],
              delta: { honra: 1, compostura: 1 },
            },
            parcial: {
              ponte: 'Chett não ataca, mas rouba uma saca de queijo antes de se afastar para o fundo das sombras. O motim é evitado por pouco, mas a tensão continua envenenando a coluna.',
              destino: 'j4_a1_nevasca_pesadelo_marcha',
              marcas: ['fogo_preservado'],
              delta: { compostura: -1 },
            },
            falha: {
              ponte: 'Chett desfere um soco covarde no seu estômago e a confusão derruba duas tochas na neve fofa. O fogo apaga-se em fumaça negra antes que os homens se separem, deixando a vanguarda ainda mais frígida.',
              destino: 'j4_a1_nevasca_pesadelo_marcha',
              marcas: ['desconfianca_chett'],
              delta: { sangue: -1, compostura: -2 },
            },
          },
          onSuccessNodeId: 'j4_a1_nevasca_pesadelo_marcha',
          onPartialFailureNodeId: 'j4_a1_nevasca_pesadelo_marcha',
        },
        {
          id: 'j4_a1_va3_vigilia_fogueira',
          tipo: 'simples',
          texto: 'Alimentar as brasas com resina de pinheiro e reforçar os piquetes de vigia contra o vento',
          tom: 'silencio',
          desfecho: {
            ponte: 'Você vira as costas aos murmúrios covardes e foca no que mantém a coluna viva: proteger o círculo de fogo e posicionar sentinelas contra as sombras das ravinas. O calor compartilhado renova a vigília.',
            destino: 'j4_a1_nevasca_pesadelo_marcha',
            marcas: ['fogo_preservado'],
            delta: { compostura: 1, honra: 1 },
          },
          nextNodeId: 'j4_a1_nevasca_pesadelo_marcha',
        },
      ],
    },

    // --- ROTA B: FLANCO DOS BATEDORES COM GRENN ---

    // Rota B1: Rastros na Floresta
    j4_a1_batedores_rastros_floresta: {
      id: 'j4_a1_batedores_rastros_floresta',
      titulo: 'Passos Fantasmas na Penumbra',
      anoHistorico: '299 d.C.',
      localizacao: 'Flanco Leste da Floresta Assombrada',
      regionId: 'floresta_assombrada',
      tipo: 'narracao',
      rota: 'batedores',
      pov: 'Irmão Sem Nome',
      origem: 'original',
      notaHistorica: 'Patrulha discreta pelos flancos da floresta rastreando emboscadas de selvagens e criaturas.',
      loreContext: {
        fonte: {
          livro: 'A Tormenta de Espadas',
          capitulo: 'Samwell I',
          arquivo_md: 'asos_samwell_1.md',
        },
      },
      fallbackText: `Afastado cinquenta passos da trilha principal, o mundo torna-se um labirinto monocromático de troncos cinzentos e sombras pontiagudas. Você e Grenn avançam com passos calculados, pisando sobre as raízes expostas para não afundar nos lençóis de neve fofa.

Grenn subitamente segura o seu braço. Diante de vocês, na encosta suave de uma ravina, há rastros profundos que não pertencem a patrulheiros: pegadas descalças na neve pura, sem qualquer sinal de sangue ou hesitação de frio. Mais adiante, vultos encapuzados movem-se paralelamente à marcha de Mormont.`,
      escolhas: [
        {
          id: 'j4_a1_rb1_analisar_rastros',
          tipo: 'teste_atributo',
          texto: 'Examinar os rastros e antecipar o ponto exato da emboscada',
          atributo: 'astucia',
          dc: 8,
          tom: 'silencio',
          circunstancias: [
            {
              tipo: 'vantagem',
              motivo: 'O vento sopra contra o seu rosto, trazendo o cheiro gélido dos inimigos sem trair o seu odor.',
            },
          ],
          desfechos: {
            sucesso: {
              ponte: 'Você identifica a armadilha na ravina antes que ela se feche. Sinalizando para Grenn com gestos secos, vocês manobram pelas pedras altas e flanqueiam as silhuetas antes do ataque.',
              destino: 'j4_a1_batedores_ravina_confronto',
              marcas: ['rastreou_silhuetas', 'sentidos_apurados'],
              delta: { compostura: 1 },
            },
            parcial: {
              ponte: 'Você percebe o movimento, mas um galho congelado estala sob o seu joelho. Os vultos voltam-se imediatamente na sua direção com olhos brilhando na nevasca.',
              destino: 'j4_a1_batedores_ravina_confronto',
              marcas: ['rastreou_silhuetas'],
              delta: { sangue: -1 },
            },
            falha: {
              ponte: 'A nevasca trai os seus olhos. Uma flecha com ponta de osso zune no ar e perfura a ombreira do seu manto antes que você consiga erguer o escudo.',
              destino: 'j4_a1_batedores_ravina_confronto',
              marcas: ['ferida_da_neve'],
              delta: { sangue: -2, compostura: -1 },
            },
          },
          onSuccessNodeId: 'j4_a1_batedores_ravina_confronto',
          onPartialFailureNodeId: 'j4_a1_batedores_ravina_confronto',
        },
        {
          id: 'j4_a1_rb1_ocultar_coluna',
          tipo: 'simples',
          texto: 'Sinalizar para Grenn recuar e apagar os próprios rastros com galhos de pinheiro',
          tom: 'silencio',
          desfecho: {
            ponte: 'Com passos cuidadosos, você e Grenn cobrem as pegadas com neve solta e se embrenham nas raízes densas, vigiando as sombras passarem à distância sem localizar a retaguarda.',
            destino: 'j4_a1_batedores_ravina_confronto',
            marcas: ['sentidos_apurados'],
            delta: { compostura: 1 },
          },
          nextNodeId: 'j4_a1_batedores_ravina_confronto',
        },
      ],
    },

    // Rota B2: Confronto na Ravina
    j4_a1_batedores_ravina_confronto: {
      id: 'j4_a1_batedores_ravina_confronto',
      titulo: 'Sangue nas Pedras da Ravina',
      anoHistorico: '299 d.C.',
      localizacao: 'Fundo da Ravina dos Pinheiros',
      regionId: 'floresta_assombrada',
      tipo: 'dialogo',
      rota: 'batedores',
      pov: 'Irmão Sem Nome',
      origem: 'original',
      notaHistorica: 'Emboscada rápida de criaturas dispersas travada nas ravinas laterais por batedores.',
      loreContext: {
        fonte: {
          livro: 'A Tormenta de Espadas',
          capitulo: 'Samwell I',
          arquivo_md: 'asos_samwell_1.md',
        },
      },
      fallbackText: `Eles não gritam; apenas atacam. Três homens vestidos com peles podres, a carne cinzenta salpicada de geada, avançam com lanças toscas e facas de pederneira. São patrulheiros mortos no Punho que agora servem às sombras.

Grenn golpeia com o escudo de carvalho, arremessando um deles contra o paredão rochoso, mas o segundo se lança sobre as suas pernas, puxando-o para a neve funda. O terceiro fixa os olhos de safira ardente em você, erguendo uma machadinha manchada de sangue congelado.`,
      interlocutores: [
        { id: 'grenn', nome: 'Grenn', papel: 'Patrulheiro da Noite' },
      ],
      falas: [
        {
          quem: 'grenn',
          texto: 'Eles não sentem o ferro! Quebre as pernas deles ou enterre a adaga de obsidiana!',
        },
      ],
      escolhas: [
        {
          id: 'j4_a1_rb2_lutar_ombro_a_ombro',
          tipo: 'teste_atributo',
          texto: 'Aparar o machado com a espada e contra-atacar para salvar Grenn',
          atributo: 'furia',
          dc: 10,
          tom: 'violencia',
          desfechos: {
            sucesso: {
              ponte: 'A sua lâmina corta o ar e parte o pulso podre da criatura antes de decepar-lhe a cabeça congelada. Num movimento contínuo, você chuta o segundo monstro para longe de Grenn, permitindo que ele se erga vitorioso.',
              destino: 'j4_a1_batedores_resgate_neve',
              marcas: ['sangue_na_ravina', 'irmandade_grenn'],
              delta: { honra: 2, aprovacaoCompanheiros: { grenn: 15 } },
            },
            parcial: {
              ponte: 'Você derruba o atacante com um golpe seco na clavícula, mas a lâmina do morto ainda arranha a sua coxa antes de tombar imóvel. Grenn consegue quebrar o pescoço do outro com o escudo.',
              destino: 'j4_a1_batedores_resgate_neve',
              marcas: ['sangue_na_ravina'],
              delta: { sangue: -1, honra: 1 },
            },
            falha: {
              ponte: 'A força desumana do morto empurra você na ribanceira. Você e a criatura rolam na neve até que Grenn crava a lança nas costas do monstro, ajudando você a se levantar atordoado.',
              destino: 'j4_a1_batedores_resgate_neve',
              marcas: ['ferida_da_neve'],
              delta: { sangue: -3, compostura: -1 },
            },
          },
          onSuccessNodeId: 'j4_a1_batedores_resgate_neve',
          onPartialFailureNodeId: 'j4_a1_batedores_resgate_neve',
        },
        {
          id: 'j4_a1_rb2_disparar_arco',
          tipo: 'teste_atributo',
          texto: 'Puxar o arco curto e alvejar as articulações da criatura antes que ela alcance Grenn',
          atributo: 'astucia',
          dc: 9,
          tom: 'violencia',
          desfechos: {
            sucesso: {
              ponte: 'A flecha com ponta de ferro perfura o joelho podre da criatura, partindo a rótula ressecada. O morto desaba na neve funda e Grenn o estripa com o escudo afiado.',
              destino: 'j4_a1_batedores_resgate_neve',
              marcas: ['sangue_na_ravina', 'irmandade_grenn'],
              delta: { honra: 1, compostura: 1 },
            },
            parcial: {
              ponte: 'O disparo atinge o flanco do inimigo, retardando o avanço. Grenn consegue rolar para o lado e aparar o golpe, mas as roupas de ambos saem rasgadas na luta.',
              destino: 'j4_a1_batedores_resgate_neve',
              marcas: ['sangue_na_ravina'],
              delta: { compostura: -1 },
            },
            falha: {
              ponte: 'A corda do arco quebra sob a geada intensa. Você é forçado a sacar a adaga às pressas enquanto a criatura se choca contra você na neve funda.',
              destino: 'j4_a1_batedores_resgate_neve',
              marcas: ['ferida_da_neve'],
              delta: { sangue: -2, compostura: -1 },
            },
          },
          onSuccessNodeId: 'j4_a1_batedores_resgate_neve',
          onPartialFailureNodeId: 'j4_a1_batedores_resgate_neve',
        },
      ],
    },

    // Rota B3: Resgate na Neve
    j4_a1_batedores_resgate_neve: {
      id: 'j4_a1_batedores_resgate_neve',
      titulo: 'A Fenda dos Desamparados',
      anoHistorico: '299 d.C.',
      localizacao: 'Garganta Leste da Floresta',
      regionId: 'floresta_assombrada',
      tipo: 'narracao',
      rota: 'batedores',
      pov: 'Irmão Sem Nome',
      origem: 'original',
      notaHistorica: 'Localização de patrulheiro ferido preso sob a neve e recuperação de mantimentos cruciais.',
      loreContext: {
        fonte: {
          livro: 'A Tormenta de Espadas',
          capitulo: 'Samwell I',
          arquivo_md: 'asos_samwell_1.md',
        },
      },
      fallbackText: `O som de um gemido abafado atrai vocês até uma fenda sob raízes de represeiro caídas. Enterrado pela metade sob um monte de neve desmoronada está o irmão Bannen, um dos melhores rastreadores da Patrulha. Seu pé esquerdo está disforme, quebrado na fuga do Punho, mas sob os braços ele protege uma bolsa impermeável de lona com carne salgada e um odre de conhaque doce.

«Não me deixem aqui para virar bicho deles...», sussurra Bannen com os lábios roxos de hipotermia. Carregá-lo diminuirá o ritmo dos batedores, mas abandonar um irmão com comida e bebida é sentença de morte para a moral dos homens.`,
      blocos: [
        {
          funcao: 'abertura',
          texto: `O som de um gemido abafado atrai vocês até uma fenda sob raízes de represeiro caídas. Enterrado pela metade sob um monte de neve desmoronada está o irmão Bannen, um dos melhores rastreadores da Patrulha.`,
        },
        {
          funcao: 'corpo',
          quando: { flagsTodas: ['sangue_na_ravina'] },
          texto: `Com a espada ainda úmida do embate recente na ravina, você e Grenn aproximam-se com cautela redobrada, esperando outra emboscada até reconhecerem o manto negro esfarrapado de Bannen.`,
        },
        {
          funcao: 'corpo',
          quando: { flagsTodas: ['sentidos_apurados'] },
          texto: `Seus olhos atentos aos detalhes notam imediatamente que a neve ao redor da fenda não foi pisoteada por mortos; o irmão ferido permaneceu escondido pela ventania.`,
        },
        {
          funcao: 'fecho',
          texto: `«Não me deixem aqui para virar bicho deles...», sussurra Bannen com os lábios roxos de hipotermia. Sob os braços, ele protege uma bolsa impermeável com carne salgada e um odre de conhaque doce.`,
        },
      ],
      escolhas: [
        {
          id: 'j4_a1_rb3_carregar_bannen',
          tipo: 'simples',
          texto: 'Içar Bannen da fenda e dividir o peso dele com Grenn até a coluna principal',
          tom: 'honesto',
          desfecho: {
            ponte: 'Com esforço conjunto, vocês içam Bannen e o apoiam entre os ombros. Os goles de conhaque devolvem a cor ao rosto do rastreador, e os mantimentos salvos reforçarão a ração dos sobreviventes.',
            destino: 'j4_a1_nevasca_pesadelo_marcha',
            marcas: ['irmao_resgatado_neve', 'suprimentos_salvos'],
            delta: { honra: 2, compostura: 1 },
          },
          nextNodeId: 'j4_a1_nevasca_pesadelo_marcha',
        },
        {
          id: 'j4_a1_rb3_pegar_suprimentos',
          tipo: 'simples',
          texto: 'Pegar apenas os mantimentos e apressar o passo para alcançar a retaguarda de Mormont',
          tom: 'silencio',
          desfecho: {
            ponte: 'Você recolhe os mantimentos e a lâmina de Bannen, desviando o olhar enquanto o homem implora baixinho. A culpa pesa nos ombros tanto quanto a neve que cobre a trilha.',
            destino: 'j4_a1_nevasca_pesadelo_marcha',
            marcas: ['suprimentos_salvos', 'culpa_do_abandono'],
            delta: { honra: -2, compostura: -1 },
          },
          nextNodeId: 'j4_a1_nevasca_pesadelo_marcha',
        },
      ],
    },

    // =========================================================================
    // ETAPA 4: PEÇA DE CENÁRIO CANÔNICA (3 CENAS FIXAS)
    // =========================================================================

    // Peça 1: A Marcha do Pesadelo na Nevasca
    j4_a1_nevasca_pesadelo_marcha: {
      id: 'j4_a1_nevasca_pesadelo_marcha',
      titulo: 'A Noite Sem Estrelas nem Fim',
      anoHistorico: '299 d.C.',
      localizacao: 'Trilha do Norte para a Fortaleza de Craster',
      regionId: 'floresta_assombrada',
      tipo: 'peca_de_cenario',
      rota: 'comum',
      pov: 'Irmão Sem Nome',
      origem: 'canonica',
      loreContext: {
        fonte: {
          livro: 'A Tormenta de Espadas',
          capitulo: 'Samwell I',
          arquivo_md: 'asos_samwell_1.md',
        },
      },
      fallbackText: `O mundo resume-se ao barulho dos dentes batendo e ao rangido monótono da neve sob as botas. Homens marcham adormecidos em pé, tropeçando nos calcanhares dos companheiros à frente. Ninguém ousa sentar-se; quem senta na neve para descansar dois minutos jamais volta a se levantar.

O Velho Urso cavalga no centro da linha com o corvo empoleirado, o olhar sombrio varrendo a fila que se estica como um fio negro frágil em meio ao deserto branco. A temperatura desceu tanto que as pontas dos dedos e as orelhas perdem a sensibilidade, tornando-se moles e pretas sob os capuzes ensopados.`,
      blocos: [
        {
          funcao: 'abertura',
          texto: `O mundo resume-se ao barulho dos dentes batendo e ao rangido monótono da neve sob as botas. Homens marcham adormecidos em pé, tropeçando nos calcanhares dos companheiros à frente. Ninguém ousa sentar-se; quem senta na neve para descansar dois minutos jamais volta a se levantar.`,
        },
        {
          funcao: 'corpo',
          quando: { flagsTodas: ['fogo_preservado'] },
          texto: `As tochas de resina preservadas na vanguarda lançam círculos alaranjados sobre a trilha, espantando a escuridão absoluta e impedindo que a coluna se fragmente nas encruzilhadas da floresta.`,
        },
        {
          funcao: 'corpo',
          quando: { flagsTodas: ['suprimentos_salvos'] },
          texto: `As rações de carne salgada resgatadas nas ravinas são distribuídas de mão em mão, devolvendo um sopro de calor e força aos homens que cambaleavam à beira do desmaio.`,
        },
        {
          funcao: 'corpo',
          quando: { flagsTodas: ['posto_vanguarda'] },
          texto: `A sua experiência abrindo caminho na linha de frente permite guiar os mais fatigados pelos trechos onde a neve é menos traiçoeira.`,
        },
        {
          funcao: 'corpo',
          quando: { flagsTodas: ['posto_batedores'] },
          texto: `Os sentidos aguçados na patrulha lateral mantêm você atento a qualquer silhueta entre os pinheiros, protegendo o flanco da coluna.`,
        },
        {
          funcao: 'fecho',
          texto: `Mais adiante na linha de marcha, um tumulto súbito quebra o ritmo mecânico dos passos. Pequeno Paul caiu sobre os joelhos na neve funda, soluçando alto enquanto puxa o cabresto de um cavalo caído.`,
        },
      ],
      escolhas: [
        {
          id: 'j4_a1_pc1_resistir_marcha',
          tipo: 'teste_atributo',
          texto: 'Manter a cadência inabalável e puxar os homens cansados pelo braço',
          atributo: 'comando',
          dc: 8,
          tom: 'devocao',
          desfechos: {
            sucesso: {
              ponte: 'A sua voz firme empurra dois irmãos que quase desabavam na vala. A coluna cerra fileiras e atravessa o trecho mais exposto do desfiladeiro sem perder homens para o gelo.',
              destino: 'j4_a1_colapso_animais_paul',
              marcas: ['resistiu_ao_frio_extremo'],
              delta: { honra: 1 },
            },
            parcial: {
              ponte: 'Você tropeça numa raiz oculta e quase cai na encosta, mas o apoio mútuo entre os homens sustenta o avanço aos trancos e barrancos.',
              destino: 'j4_a1_colapso_animais_paul',
              marcas: ['resistiu_ao_frio_extremo'],
              delta: { sangue: -1 },
            },
            falha: {
              ponte: 'O cansaço dobra os seus joelhos. Você cai de cara na neve virgem e precisa ser arrastado por Grenn e Paul para não ser soterrado pela ventania.',
              destino: 'j4_a1_colapso_animais_paul',
              marcas: ['ferida_da_neve'],
              delta: { sangue: -2, compostura: -1 },
            },
          },
          onSuccessNodeId: 'j4_a1_colapso_animais_paul',
          onPartialFailureNodeId: 'j4_a1_colapso_animais_paul',
        },
        {
          id: 'j4_a1_pc1_cantar_antigo_juramento',
          tipo: 'simples',
          texto: 'Entoar em voz baixa os votos da Patrulha da Noite para manter a mente lúcida na tempestade',
          tom: 'devocao',
          desfecho: {
            ponte: '«A noite chega, e agora começa a minha vigília...» As palavras ancestrais passam de boca em boca sob o vento cortante. O calor não vem da lareira, mas da alma teimosa de homens que recusam morrer na escuridão.',
            destino: 'j4_a1_colapso_animais_paul',
            marcas: ['resistiu_ao_frio_extremo'],
            delta: { compostura: 2, honra: 1 },
          },
          nextNodeId: 'j4_a1_colapso_animais_paul',
        },
      ],
    },

    // Peça 2: O Colapso dos Cavalos & Small Paul
    j4_a1_colapso_animais_paul: {
      id: 'j4_a1_colapso_animais_paul',
      titulo: 'As Lágrimas do Gigante',
      anoHistorico: '299 d.C.',
      localizacao: 'Clareira das Faias Quebradas',
      regionId: 'floresta_assombrada',
      tipo: 'peca_de_cenario',
      rota: 'comum',
      pov: 'Irmão Sem Nome',
      origem: 'canonica',
      loreContext: {
        fonte: {
          livro: 'A Tormenta de Espadas',
          capitulo: 'Samwell I',
          arquivo_md: 'asos_samwell_1.md',
        },
      },
      fallbackText: `O cavalo de carga de Small Paul desabou na neve fofa e não consegue se levantar. O animal respira em estertores trêmulos, o vapor saindo das ventas sangrentas enquanto os olhos esbugalhados encaram a escuridão. O gigante está de joelhos ao lado da montaria, as mãos imensas acariciando as orelhas do bicho enquanto lágrimas grossas congelam nas suas bochechas sujas.

«Ele só precisa descansar um pouquinho, lorde...», implora Paul para Mormont, que observa tudo com o semblante de pedra. «Ele carregou o Sam e as sacolas de mantimento desde o sopé da colina. Não podemos matar ele!»

Mormont aponta a adaga de caça. «O animal quebrou a pata na pedra, Paul. Se não o abatermos agora, os lobos e as criaturas farão isso antes de nós dobrarmos a curva. E precisamos da carne para chegar a Craster.»`,
      blocos: [
        {
          funcao: 'abertura',
          texto: `O cavalo de carga de Small Paul desabou na neve fofa e não consegue se levantar. O animal respira em estertores trêmulos, o vapor saindo das ventas sangrentas enquanto os olhos esbugalhados encaram a escuridão.`,
        },
        {
          funcao: 'corpo',
          quando: { flagsTodas: ['protegeu_paul'] },
          texto: `Paul olha para você com olhos súplices, lembrando-se do apoio que você lhe deu no acampamento do Punho. «Diga para o Velho Urso, irmão... diga que eu carrego o fardo todo nas minhas costas se ele poupar o cavalinho!»`,
        },
        {
          funcao: 'corpo',
          quando: { flagsTodas: ['resistiu_ao_frio_extremo'] },
          texto: `Apesar da nevasca implacável que castiga a coluna, a sua resistência inspira os outros patrulheiros a cercarem o gigante sem violência desmedida.`,
        },
        {
          funcao: 'fecho',
          texto: `A coluna inteira parou. A tensão é palpável: o tempo corre, a nevasca aperta e cada segundo parado é um convite aos mortos.`,
        },
      ],
      escolhas: [
        {
          id: 'j4_a1_pc2_abater_cavalo_paul',
          tipo: 'teste_atributo',
          texto: 'Acalmar Small Paul com firmeza afetuosa e realizar o golpe de misericórdia no animal',
          atributo: 'cortesia',
          dc: 8,
          tom: 'honesto',
          desfechos: {
            sucesso: {
              ponte: 'Você pousa a mão no ombro do gigante e fala em voz baixa sobre a dignidade do animal. Paul soluça e desvia o olhar enquanto você passa a lâmina na garganta do cavalo com precisão compassiva. A carne é recolhida e a coluna retoma o passo sem brigas.',
              destino: 'j4_a1_avistando_fortaleza_craster',
              marcas: ['cavalo_abatido', 'fardo_compartilhado'],
              delta: { honra: 1, compostura: 1 },
            },
            parcial: {
              ponte: 'Paul tenta empurrar a sua lâmina, mas Grenn segura o gigante pelos braços. O animal é abatido com ruído e dor, e Paul marcha em silêncio amuado, carregando três sacos nos ombros maciços.',
              destino: 'j4_a1_avistando_fortaleza_craster',
              marcas: ['cavalo_abatido'],
              delta: { compostura: -1 },
            },
            falha: {
              ponte: 'Paul entra em pânico e empurra você contra a neve. Mormont precisa intervir pessoalmente com o chicote de couro para restabelecer a ordem, abatendo o animal com frieza enquanto o gigante chora aos berros.',
              destino: 'j4_a1_avistando_fortaleza_craster',
              marcas: ['cavalo_abatido'],
              delta: { compostura: -2, honra: -1 },
            },
          },
          onSuccessNodeId: 'j4_a1_avistando_fortaleza_craster',
          onPartialFailureNodeId: 'j4_a1_avistando_fortaleza_craster',
        },
        {
          id: 'j4_a1_pc2_dividir_carga_paul',
          tipo: 'teste_atributo',
          texto: 'Tomar as sacolas mais pesadas do cavalo e reparti-las entre você, Grenn e Paul',
          atributo: 'furia',
          dc: 9,
          tom: 'honesto',
          desfechos: {
            sucesso: {
              ponte: 'Você joga dois sacos de trigo sobre as costas e passa as cordas para Grenn. Paul vê o esforço e consente com o sacrifício do animal sem desespero, agradecido pelo fardo compartilhado.',
              destino: 'j4_a1_avistando_fortaleza_craster',
              marcas: ['fardo_compartilhado', 'cavalo_abatido'],
              delta: { honra: 2, aprovacaoCompanheiros: { grenn: 10 } },
            },
            parcial: {
              ponte: 'O peso dos arreios rasga o seu gibão e a marcha torna-se tortuosa, mas a carga é salva e Paul caminha ao seu lado com olhos marejados.',
              destino: 'j4_a1_avistando_fortaleza_craster',
              marcas: ['fardo_compartilhado', 'cavalo_abatido'],
              delta: { sangue: -1, honra: 1 },
            },
            falha: {
              ponte: 'O seu joelho cede sob o peso das sacolas na neve mole. Uma saca inteira de aveia perde-se ribanceira abaixo antes que Mormont ordene o avanço imediato.',
              destino: 'j4_a1_avistando_fortaleza_craster',
              marcas: ['cavalo_abatido', 'ferida_da_neve'],
              delta: { sangue: -2, compostura: -1 },
            },
          },
          onSuccessNodeId: 'j4_a1_avistando_fortaleza_craster',
          onPartialFailureNodeId: 'j4_a1_avistando_fortaleza_craster',
        },
      ],
    },

    // Peça 3: Avistando a Fortaleza de Craster
    j4_a1_avistando_fortaleza_craster: {
      id: 'j4_a1_avistando_fortaleza_craster',
      titulo: 'O Abrigo Sombrio no Fim do Mundo',
      anoHistorico: '299 d.C.',
      localizacao: 'Colina da Fortaleza de Craster',
      regionId: 'floresta_assombrada',
      tipo: 'peca_de_cenario',
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
      fallbackText: `No quarto dia de marcha através do inferno branco, a floresta finalmente recua diante de uma elevação de terra nua cercada por paliçadas toscas de troncos de pinheiro. Do telhado de turfa da longa cabana de madeira escura sobe uma coluna fina de fumaça acinzentada, carregando o fedor inconfundível de estrume de porco, fogueira verde e vida humana.

A Fortaleza de Craster. Nenhum irmão da Patrulha gosta daquele lugar nem do homem que o governa — um selvagem cruel que desposa as próprias filhas e sacrifica os filhos homens aos deuses da floresta fria —, mas depois de cem léguas de marcha fúnebre sob as garras dos Outros, aquele casebre fétido parece mais precioso que a Fortaleza Vermelha.

Mormont desmonta diante do portão trancado por barras de ferro batido. O corvo do comandante pia freneticamente: «Carne! Fogo! Craster!». Menos de quarenta e cinco irmãos negros permanecem de pé atrás do estandarte rasgado.`,
      blocos: [
        {
          funcao: 'abertura',
          texto: `No quarto dia de marcha através do inferno branco, a floresta finalmente recua diante de uma elevação de terra nua cercada por paliçadas toscas de troncos de pinheiro. Do telhado de turfa da longa cabana de madeira escura sobe uma coluna fina de fumaça acinzentada, carregando o fedor inconfundível de estrume de porco, fogueira verde e vida humana.`,
        },
        {
          funcao: 'corpo',
          quando: { flagsTodas: ['confianca_mormont'] },
          texto: `Mormont chama você até a frente do portão. «Você marchou firme na vanguarda, rapaz. Fique perto de mim quando entrarmos. Craster é um cão traiçoeiro e vai farejar fraqueza no primeiro olhar.»`,
        },
        {
          funcao: 'corpo',
          quando: { flagsTodas: ['irmandade_grenn'] },
          texto: `Grenn para ao seu lado e solta um longo suspiro aliviado que congela no ar. «Um teto... deuses antigos, um teto sobre a cabeça. Nem que seja o teto de um monstro como Craster.»`,
        },
        {
          funcao: 'corpo',
          quando: { flagsTodas: ['fardo_compartilhado'] },
          texto: `Small Paul segue logo atrás com passos pesados mas calmos, grato por não ter tido de carregar o fardo sozinho pela nevasca.`,
        },
        {
          funcao: 'corpo',
          quando: { flagsTodas: ['cavalo_abatido'] },
          texto: `A carne do cavalo abatido vem amarrada aos arreios dos poucos animais sobreviventes, garantindo que os irmãos tenham o que oferecer a Craster em troca do salão aquecido.`,
        },
        {
          funcao: 'fecho',
          texto: `A tranca pesada do portão range por dentro. O casebre abre suas portas fumegantes para os sobreviventes do Punho dos Primeiros Homens.`,
        },
      ],
      escolhas: [
        {
          id: 'j4_a1_pc3_entrar_fortaleza',
          tipo: 'simples',
          texto: 'Cruzar os portões de Craster ao lado do Senhor Comandante',
          tom: 'devocao',
          desfecho: {
            ponte: 'As portas abrem-se com um rangido fúnebre. O ar quente e azedo do interior bate no seu rosto enquanto os irmãos adentram o salão de Craster, arrastando as armas e o peso da tragédia do Punho.',
            destino: 'j4_a1_acerto_de_contas_craster',
            marcas: ['avistou_fortaleza_craster'],
          },
          nextNodeId: 'j4_a1_acerto_de_contas_craster',
        },
        {
          id: 'j4_a1_pc3_vigiar_retaguarda',
          tipo: 'simples',
          texto: 'Permanecer na retaguarda com Grenn até que o último irmão ferido atravesse os portões',
          tom: 'honesto',
          desfecho: {
            ponte: 'Você aguarda na neve batida com a mão no pomo da espada, observando a orla dos pinheiros negros até que a tranca de ferro se feche atrás dos cavalos. Nenhum irmão foi deixado para trás na última subida.',
            destino: 'j4_a1_acerto_de_contas_craster',
            marcas: ['avistou_fortaleza_craster'],
            delta: { honra: 2, compostura: 1 },
          },
          nextNodeId: 'j4_a1_acerto_de_contas_craster',
        },
      ],
    },

    // =========================================================================
    // ETAPA 5: ACERTO DE CONTAS (1 CENA QUE LÊ AS MARCAS DO ATO)
    // =========================================================================

    j4_a1_acerto_de_contas_craster: {
      id: 'j4_a1_acerto_de_contas_craster',
      titulo: 'O Balanço dos Vivos e as Sementes do Motim',
      anoHistorico: '299 d.C.',
      localizacao: 'Salão Comunal da Fortaleza de Craster',
      regionId: 'floresta_assombrada',
      tipo: 'acerto_de_contas',
      rota: 'comum',
      pov: 'Irmão Sem Nome',
      origem: 'canonica',
      isEnding: true,
      loreContext: {
        fonte: {
          livro: 'A Tormenta de Espadas',
          capitulo: 'Samwell II',
          arquivo_md: 'asos_samwell_2.md',
        },
      },
      fallbackText: `O calor sufocante do salão de Craster queima a pele dormente dos sobreviventes. Homens desabam sobre o chão batido de terra e esterco, desatando os laços das botas congeladas com dedos ensanguentados. Craster, sentado no seu banco tosco junto à lareira com duas de suas esposas curvadas aos seus pés, encara o Velho Urso com desprezo indisfarçado, os olhos gordos brilhando com a cupidez de quem sabe que tem os lordes de Westeros na palma da mão.

Mormont senta-se pesadamente diante do selvagem e desdobra o pergaminho da lista de chamada. Dos trezentos homens que partiram da Muralha com armaduras brilhantes e esperança no peito, menos de quarenta e cinco estão sentados neste salão. O mundo guardou cada passo, cada ferida e cada decisão tomada nas pedras antigas do Punho.`,
      blocos: [
        {
          funcao: 'abertura',
          texto: `O calor sufocante do salão de Craster queima a pele dormente dos sobreviventes. Homens desabam sobre o chão batido de terra e esterco, desatando os laços das botas congeladas com dedos ensanguentados. Craster encara o Velho Urso com desprezo indisfarçado, os olhos gordos brilhando com a cupidez de quem sabe que tem os lordes de Westeros na palma da mão.`,
        },
        {
          funcao: 'corpo',
          quando: { flagsTodas: ['sobreviveu_ao_punho'] },
          texto: `Você escapou com vida do maior massacre da história recente da Patrulha. O terror dos três toques de trombeta gravou-se permanentemente na sua alma.`,
        },
        {
          funcao: 'corpo',
          quando: { flagsTodas: ['ferida_da_neve'] },
          texto: `A ferida na sua perna arde sob o calor da fogueira, inchada e roxa de gelo. Você sobreviveu, mas o frio cobrou um tributo permanente da sua carne.`,
        },
        {
          funcao: 'corpo',
          quando: { flagsTodas: ['aliado_grenn'] },
          texto: `Grenn senta-se ao seu lado no banco de madeira, partilhando um pedaço de queijo ressecado. A lealdade forjada na nevasca faz dele um irmão de sangue pronto para morrer por você.`,
        },
        {
          funcao: 'corpo',
          quando: { flagsTodas: ['desconfianca_chett'] },
          texto: `Do outro lado da fogueira, Chett sussurra no ouvido de Ollo Mão Cortada e Lark das Irmãs. Os olhares furiosos que lançam contra Mormont prenunciam o sangue que há de jorrar neste salão.`,
        },
        {
          funcao: 'corpo',
          quando: { flagsTodas: ['protegeu_paul'] },
          texto: `Pequeno Paul observa você com gratidão silenciosa enquanto roe uma crosta dura de pão, lembrando-se de quem não o abandonou na hora do desespero.`,
        },
        {
          funcao: 'corpo',
          quando: { flagsTodas: ['confianca_mormont'] },
          texto: `O Senhor Comandante Mormont assente com a cabeça na sua direção antes de se voltar para Craster. O Velho Urso confia no seu braço para manter a ordem quando a comida escassear.`,
        },
        {
          funcao: 'corpo',
          quando: { flagsTodas: ['fogo_preservado'] },
          texto: `As tochas salvas na vanguarda permitiram que a coluna chegasse inteira até aqui, poupando vidas que de outro modo teriam ficado congeladas nos desfiladeiros.`,
        },
        {
          funcao: 'corpo',
          quando: { flagsTodas: ['irmao_resgatado_neve'] },
          texto: `O irmão Bannen respira com dificuldade na esteira dos fundos, mas está vivo, e os mantimentos que ele trazia compraram mais um dia de trégua com Craster.`,
        },
        {
          funcao: 'corpo',
          quando: { flagsTodas: ['adaga_obsidiana_guardada'] },
          texto: `A lâmina de obsidiana recolhida nas cinzas do Punho repousa oculta na sua bota, um segredo afiado contra a escuridão que se aproxima.`,
        },
        {
          funcao: 'corpo',
          quando: { flagsTodas: ['matou_criatura_punho'] },
          texto: `Os homens de armas comentam em sussurros reverentes como você encarou a fera reanimada dos Outros, provando que o terror pode sangrar e queimar.`,
        },
        {
          funcao: 'corpo',
          quando: { flagsTodas: ['cicatriz_gelo'] },
          texto: `O ombro marcado pelas garras congeladas lateja com o calor sufocante da fumaça, uma cicatriz eterna da fuga pelo inferno branco.`,
        },
        {
          funcao: 'corpo',
          quando: { flagsTodas: ['conteve_panico'] },
          texto: `A firmeza com que conteve a revolta no acampamento evitou que as lâminas da Patrulha se voltassem contra si mesmas na hora mais escura.`,
        },
        {
          funcao: 'corpo',
          quando: { flagsTodas: ['culpa_do_abandono'] },
          texto: `O olhar desesperado dos que foram deixados para trás na neve ainda assombra a sua mente como uma maldição gelada.`,
        },
        {
          funcao: 'corpo',
          quando: { flagsTodas: ['avistou_fortaleza_craster'] },
          texto: `A visão das paliçadas toscas marcou o fim da marcha da morte e o início de uma nova provação entre traidores e selvagens.`,
        },
        {
          funcao: 'fecho',
          texto: `Craster cospe na fogueira e exige o pagamento pelo abrigo: armas, machados e aço valiriano. O Ato I termina aqui, no limiar da floresta e da traição que se avizinha.`,
        },
      ],
      escolhas: [],
    },
  },
};
