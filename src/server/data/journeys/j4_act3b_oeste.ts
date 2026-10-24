import 'server-only';
import { GrafoJornada } from '@/server/engine/storyLinter';

/**
 * Ramal do Oeste da Jornada 4 (Ato III-B):
 * A Marcha de Bowen Marsh à Ponte das Caveiras contra o Chorão (The Weeper)
 * Fonte Canônica: A Tormenta de Espadas (Capítulos Jon VII, Jon VIII, Samwell IV)
 */
export const grafoJ4Ato3BOeste: GrafoJornada = {
  id: 'jornada_4_muralha_ato3b_oeste',
  titulo: 'Ato III-B: A Marcha do Oeste & A Ponte das Caveiras',
  startNodeId: 'j4_a3b_marcha_para_o_oeste',
  nodes: {
    // 1. Marcha para o Oeste
    j4_a3b_marcha_para_o_oeste: {
      id: 'j4_a3b_marcha_para_o_oeste',
      titulo: 'A Coluna do Lorde Intendente',
      anoHistorico: '300 d.C.',
      localizacao: 'Estrada da Dádiva, a Oeste de Castelo Negro',
      regionId: 'castelo_negro',
      fallbackText: `Enquanto Castelo Negro se prepara para o embate final contra o grosso do exército de Mance Rayder, corvos desesperados da Torre Sombria trazem notícias sangrentas da Garganta: o bando do Chorão reuniu trezentos selvagens ferozes e marcha para atravessar a Ponte das Caveiras, ameaçando contornar a Muralha e cair sobre as vilas indefesas da Dádiva.
      
Bowen Marsh, o Lorde Intendente, reúne sessenta homens — a maioria construtores idosos, intendentes e recrutas que mal sabem empunhar uma lança de freixo.
      
— Se a Ponte das Caveiras cair, todo o Oeste estará aberto ao saque — declara Marsh, apertando as correias de seu gibão de couro acolchoado sob a neve incessante. — Quem cavalgara comigo para manter a garganta fechada?`,
      internalVoices: [
        {
          atributo: 'comando',
          resultadoPassivo: 'SUCESSO',
          dcPassiva: 9,
          fala: 'Marsh é um administrador meticuloso com números de farinha e presuntos, mas jamais liderou homens em combate de campo.',
        },
        {
          atributo: 'pressagio',
          resultadoPassivo: 'SUCESSO',
          dcPassiva: 10,
          fala: 'O vento que desce das Montanhas de Gelo a oeste corta até os ossos. Uma nevasca nos pegará na estrada se não marcharmos a trote firme.',
        },
      ],
      loreContext: {
        origem: 'original',
        fonte: {
          arquivo_md: 'corpus_md/jornada_3_tronos/livro_3_a-tormenta-de-espadas_resumo-completo.md',
          livro: 'A Tormenta de Espadas',
          capitulo: 'Jon VII, Jon VIII',
      },
        notaHistorica: 'Ramal do Oeste (Criação autoral): dramatização da expedição de Bowen Marsh à Ponte das Caveiras contra o Chorão.',
      },
      escolhas: [
        {
          id: 'esc_j4_a3b_liderar_vanguarda_marsh',
          texto: 'Oferecer-se para cavalgar na vanguarda da coluna, guiando os cavalos de carga pelas ravinas congeladas.',
          tipo: 'teste_atributo',
          atributo: 'pressagio',
          dc: 9,
          onSuccessNodeId: 'j4_a3b_estrada_da_dadiva',
          onPartialFailureNodeId: 'j4_a3b_estrada_da_dadiva',
          delta: {
            flagsAdicionadas: ['vanguarda_oeste_conduzida'],
            aprovacaoCompanheiros: { jon_snow: 5 },
            compostura: 1,
          },
        },
        {
          id: 'esc_j4_a3b_aconselhar_marsh_cautela',
          texto: 'Aconselhar Bowen Marsh a enviar batedores à frente para evitar as emboscadas nos desfiladeiros de xisto.',
          tipo: 'teste_atributo',
          atributo: 'astucia',
          dc: 10,
          onSuccessNodeId: 'j4_a3b_estrada_da_dadiva',
          onPartialFailureNodeId: 'j4_a3b_estrada_da_dadiva',
          delta: {
            flagsAdicionadas: ['batedores_enviados_dadiva'],
            honra: 1,
          },
        },
      ],
    },

    // 2. Estrada da Dádiva
    j4_a3b_estrada_da_dadiva: {
      id: 'j4_a3b_estrada_da_dadiva',
      titulo: 'As Sombras da Dádiva de Brandon',
      anoHistorico: '300 d.C.',
      localizacao: 'A Dádiva de Brandon, a caminho da Garganta',
      regionId: 'muralha_oeste',
      fallbackText: `A marcha para oeste é uma procissão de gelo e silêncio. As aldeias da Dádiva jazem abandonadas há gerações: chaminés de pedra desmoronadas e macieiras selvagens cobertas de sincelo.
      
No segundo dia, ao passar por uma garganta estreita cercada de pinheiros cinzentos, o tropel de cascos para bruscamente. Três corvos empalhados pendem de galhos baixos e, entre os rochedos à frente, marcas de mocassins de pele de foca indicam que os batedores do Chorão já cruzaram para o lado sul da ravina.
      
— Eles estão nos vigiando das pedras — murmura o velho irmão Donnel, armando a corda da besta com as mãos trêmulas.`,
      internalVoices: [
        {
          atributo: 'astucia',
          resultadoPassivo: 'SUCESSO',
          dcPassiva: 10,
          fala: 'O Chorão cega seus prisioneiros antes de matá-los. Seus homens preferem atirar dardos envenenados de trás dos rochedos.',
        },
        {
          atributo: 'furia',
          resultadoPassivo: 'SUCESSO',
          dcPassiva: 9,
          fala: 'A passagem é estreita demais para cavalaria. Se desmontarmos e avançarmos em cunha de escudos, varreremos a garganta.',
        },
      ],
      loreContext: {
        origem: 'original',
        fonte: {
          arquivo_md: 'corpus_md/jornada_3_tronos/livro_3_a-tormenta-de-espadas_resumo-completo.md',
          livro: 'A Tormenta de Espadas',
          capitulo: 'Jon VII',
      },
        notaHistorica: 'Ramal do Oeste (Criação autoral): marcha dos patrulheiros pelas colinas da Dádiva enfrentando o inverno rigoroso.',
      },
      escolhas: [
        {
          id: 'esc_j4_a3b_avanco_cunha_escudos',
          texto: 'Desmontar imediatamente e organizar uma formação em cunha para desbaratar os franco-atiradores selvagens.',
          tipo: 'teste_atributo',
          atributo: 'furia',
          dc: 10,
          onSuccessNodeId: 'j4_a3b_ponte_de_caveiras',
          onPartialFailureNodeId: 'j4_a3b_ponte_de_caveiras',
          delta: {
            flagsAdicionadas: ['emboscada_dadiva_vencida'],
            compostura: 1,
            honra: 1,
          },
        },
        {
          id: 'esc_j4_a3b_flanquear_pela_colina',
          texto: 'Contornar pela elevação coberta de neve para apanhar os vigias selvagens pelas costas com arcos curtos.',
          tipo: 'teste_atributo',
          atributo: 'astucia',
          dc: 10,
          onSuccessNodeId: 'j4_a3b_ponte_de_caveiras',
          onPartialFailureNodeId: 'j4_a3b_ponte_de_caveiras',
          delta: {
            flagsAdicionadas: ['batedores_selvagens_capturados'],
            compostura: 1,
          },
        },
      ],
    },

    // 3. Ponte de Caveiras
    j4_a3b_ponte_de_caveiras: {
      id: 'j4_a3b_ponte_de_caveiras',
      titulo: 'O Matadouro da Ponte das Caveiras',
      anoHistorico: '300 d.C.',
      localizacao: 'A Garganta, Ponte das Caveiras',
      regionId: 'muralha_oeste',
      fallbackText: `A Ponte das Caveiras é um arco natural de pedra esguio e escorregadio, suspenso sobre um abismo vertiginoso onde o rio leitoso ruge centenas de metros abaixo.
      
Do lado além-da-Muralha, trezentos guerreiros do Povo Livre rugem e batem lanças de sílex contra escudos de vime. À frente deles caminha o Chorão: um homem enorme de olhos lacrimejantes vermelhos, vestindo peles de urso manchadas de sangue e empunhando uma foice comprida.
      
— Sangue de corvo para matar a sede do gelo! — uivam os selvagens enquanto iniciam a carga desesperada sobre a ponte estreita.
      
— Patrulha, comigo! Pelo amor das nossas vidas e pelas vilas do Sul! — grita Bowen Marsh, sacando a espada com desespero.`,
      internalVoices: [
        {
          atributo: 'furia',
          resultadoPassivo: 'SUCESSO',
          dcPassiva: 11,
          fala: 'Na ponte só cabem três homens lado a lado. Quem tiver o coração mais duro e a bota mais firme não cairá no abismo.',
        },
        {
          atributo: 'comando',
          resultadoPassivo: 'SUCESSO',
          dcPassiva: 10,
          fala: 'Mantenham as pontas das lanças abaixadas na altura do peito! O peso da carga deles os empurrará sobre os próprios companheiros.',
        },
      ],
      loreContext: {
        origem: 'original',
        fonte: {
          arquivo_md: 'corpus_md/jornada_3_tronos/livro_3_a-tormenta-de-espadas_resumo-completo.md',
          livro: 'A Tormenta de Espadas',
          capitulo: 'Jon VIII, Jon IX',
      },
        notaHistorica: 'Ramal do Oeste (Criação autoral): o combate desesperado e sangrento nas falésias da Ponte das Caveiras.',
      },
      escolhas: [
        {
          id: 'esc_j4_a3b_segurar_o_arco_de_pedra',
          texto: 'Plantar o escudo no meio da ponte de pedra e cravar a lança no peito dos primeiros selvagens que tentam a travessia.',
          tipo: 'teste_atributo',
          atributo: 'furia',
          dc: 11,
          onSuccessNodeId: 'j4_a3b_a_ferida_de_marsh',
          onPartialFailureNodeId: 'j4_a3b_a_ferida_de_marsh',
          delta: {
            flagsAdicionadas: ['baluarte_na_ponte_das_caveiras'],
            sangue: -1,
            honra: 2,
          },
        },
        {
          id: 'esc_j4_a3b_derramar_piche_queimando',
          texto: 'Lançar potes de piche e tochas acesas sobre o piso da ponte para criar uma barreira de fogo entre os dois lados.',
          tipo: 'teste_atributo',
          atributo: 'astucia',
          dc: 10,
          onSuccessNodeId: 'j4_a3b_a_ferida_de_marsh',
          onPartialFailureNodeId: 'j4_a3b_a_ferida_de_marsh',
          delta: {
            flagsAdicionadas: ['fogo_na_ponte_das_caveiras'],
            compostura: 1,
          },
        },
      ],
    },

    // 4. A Ferida de Marsh
    j4_a3b_a_ferida_de_marsh: {
      id: 'j4_a3b_a_ferida_de_marsh',
      titulo: 'O Machado no Rosto do Intendente',
      anoHistorico: '300 d.C.',
      localizacao: 'Cabeceira Sul da Ponte das Caveiras',
      regionId: 'muralha_oeste',
      fallbackText: `O combate torna-se uma carnificina de membros decepados e gritos sufocados pela névoa. No centro do choque, um guerreiro selvagem salta com um machado pesado de pedra lascada.
      
Bowen Marsh ergue a espada tarde demais. O gume do machado estilhaça a bochecha esquerda do Lorde Intendente, arrancando dentes, carne e pele em um repuxo escarlate. Marsh tomba de joelhos na lama gelada, afogando-se no próprio sangue enquanto outro selvagem se prepara para enfiar uma lança de osso em sua garganta exposta.`,
      internalVoices: [
        {
          atributo: 'furia',
          resultadoPassivo: 'SUCESSO',
          dcPassiva: 10,
          fala: 'Um golpe rápido por baixo das axilas derrubará o agressor antes que ele crave a ponta em Bowen.',
        },
        {
          atributo: 'erudicao',
          resultadoPassivo: 'SUCESSO',
          dcPassiva: 9,
          fala: 'A ferida na artéria facial de Marsh o matará por sangramento em dois minutos se não for estancada e cauterizada.',
        },
      ],
      loreContext: {
        origem: 'original',
        fonte: {
          arquivo_md: 'corpus_md/jornada_3_tronos/livro_3_a-tormenta-de-espadas_resumo-completo.md',
          livro: 'A Tormenta de Espadas',
          capitulo: 'Jon VIII, Jon IX',
      },
        notaHistorica: 'Ramal do Oeste (Criação autoral): o resgate de Bowen Marsh gravemente ferido na Ponte das Caveiras.',
      },
      escolhas: [
        {
          id: 'esc_j4_a3b_salvar_vida_bowen_marsh',
          texto: 'Interpor seu escudo sobre o corpo caído de Marsh, abater o carrasco e arrastar o intendente para trás da linha de defesa.',
          tipo: 'teste_atributo',
          atributo: 'furia',
          dc: 10,
          onSuccessNodeId: 'j4_a3b_sor_denys',
          onPartialFailureNodeId: 'j4_a3b_sor_denys',
          delta: {
            flagsAdicionadas: ['salvou_vida_de_bowen_marsh'],
            aprovacaoCompanheiros: { donal_noye: 10, alliser_thorne: 5 },
            honra: 2,
          },
        },
        {
          id: 'esc_j4_a3b_estancar_sangria_campo',
          texto: 'Pressionar neve e linho grosso na ferida pulsante de Marsh, improvisando um torniquete enquanto seus irmãos contêm a maré.',
          tipo: 'teste_atributo',
          atributo: 'astucia',
          dc: 9,
          onSuccessNodeId: 'j4_a3b_sor_denys',
          onPartialFailureNodeId: 'j4_a3b_sor_denys',
          delta: {
            flagsAdicionadas: ['estancou_sangria_de_marsh'],
            compostura: 1,
            honra: 1,
          },
        },
      ],
    },

    // 5. Ser Denys Mallister Chega
    j4_a3b_sor_denys: {
      id: 'j4_a3b_sor_denys',
      titulo: 'Os Cavaleiros da Torre Sombria',
      anoHistorico: '300 d.C.',
      localizacao: 'Garganta da Ponte das Caveiras',
      regionId: 'muralha_oeste',
      fallbackText: `Quando a munição esgota e os irmãos remanescentes já recuam passo a passo com a neve avermelhada até os tornozelos, um som límpido e ressoante corta a fúria da nevasca: o corno de bronze da Torre Sombria soa duas vezes!
      
Descendo pelas encostas íngremes a cavalo, quarenta cavaleiros e homens de armas veteranos irrompem com Ser Denys Mallister à frente. Cabelos grisalhos como neve, porte impecável de cavaleiro do Tridente e olhos de aço: a carga de Ser Denys atinge o flanco dos selvagens com a força de uma avalanche.
      
O Chorão berra de ódio ao ver sua travessia arruinada e recua para a escuridão da ravina, deixando para trás dezenas de mortos na ponte. A Dádiva está salva!`,
      internalVoices: [
        {
          atributo: 'cortesia',
          resultadoPassivo: 'SUCESSO',
          dcPassiva: 9,
          fala: 'Ser Denys é um nobre de nascimento fino da Casa Mallister de Salgadelas, veterano respeitado por toda a Patrulha há trinta anos.',
        },
        {
          atributo: 'comando',
          resultadoPassivo: 'SUCESSO',
          dcPassiva: 10,
          fala: 'Com Bowen Marsh incapacitado, Ser Denys é a figura de autoridade máxima em todo o flanco oeste da Muralha.',
        },
      ],
      loreContext: {
        origem: 'original',
        fonte: {
          arquivo_md: 'corpus_md/jornada_3_tronos/livro_3_a-tormenta-de-espadas_resumo-completo.md',
          livro: 'A Tormenta de Espadas',
          capitulo: 'Jon IX',
      },
        notaHistorica: 'Ramal do Oeste (Criação autoral): intervenção dos cavaleiros da Torre Sombria comandados por Ser Denys Mallister.',
      },
      escolhas: [
        {
          id: 'esc_j4_a3b_prestar_continencia_sor_denys',
          texto: 'Apresentar-se respeitosamente a Ser Denys Mallister, relatando o estado de Marsh e a situação desesperada em Castelo Negro.',
          tipo: 'teste_atributo',
          atributo: 'cortesia',
          dc: 9,
          onSuccessNodeId: 'j4_a3b_sam_e_gilly',
          onPartialFailureNodeId: 'j4_a3b_sam_e_gilly',
          delta: {
            flagsAdicionadas: ['aliado_sor_denys_mallister'],
            reputacaoCasas: { guarda_velha: 5 },
            honra: 1,
          },
        },
        {
          id: 'esc_j4_a3b_ajudar_no_resgate_feridos',
          texto: 'Recolher os irmãos feridos na ponte e organizar padiolas de madeira de pinheiro para o transporte até a Torre Sombria.',
          tipo: 'teste_atributo',
          atributo: 'pressagio',
          dc: 9,
          onSuccessNodeId: 'j4_a3b_sam_e_gilly',
          onPartialFailureNodeId: 'j4_a3b_sam_e_gilly',
          delta: {
            flagsAdicionadas: ['heroi_resgate_caveiras'],
            compostura: 1,
          },
        },
      ],
    },

    // 6. Encontro com Sam e Gilly
    j4_a3b_sam_e_gilly: {
      id: 'j4_a3b_sam_e_gilly',
      titulo: 'Os Passageiros da Porta Negra',
      anoHistorico: '300 d.C.',
      localizacao: 'Trilha do Forte Noite, Estrada do Rei',
      regionId: 'muralha_oeste',
      fallbackText: `No retorno pela estrada deserta rumo ao leste, a coluna transportando Bowen Marsh em uma liteira coberta avista duas figuras exaustas na orla da floresta, perto das ruínas colossais do Forte Noite.
      
Um irmão gordo cambaleia na neve profunda, apoiando uma garota selvagem que carrega um recém-nascido enrolado em peles de lontra.
      
— Samwell?! — gritam os patrulheiros em choque. — Sam, o Matador! O Punho... vocês sobreviveram ao Punho?!
      
Samwell Tarly ergue os olhos banhados em lágrimas e gratidão.
      
— A Porta Negra... — sussurra Sam com os lábios roxos de frio. — Nós viemos pela Porta Negra, embaixo do poço do Forte Noite... Brandon Stark... ele foi para o norte, e nós viemos para o sul...`,
      internalVoices: [
        {
          atributo: 'erudicao',
          resultadoPassivo: 'SUCESSO',
          dcPassiva: 10,
          fala: 'A Porta Negra é uma lenda dos Primeiros Homens: uma passagem sob a Muralha que só se abre para quem recita os votos da Patrulha.',
        },
        {
          atributo: 'erudicao',
          resultadoPassivo: 'SUCESSO',
          dcPassiva: 9,
          fala: 'Ver Sam vivo após o massacre do Punho é quase um milagre divino. A moral dos irmãos se eleva instantaneamente.',
        },
      ],
      loreContext: {
        origem: 'original',
        fonte: {
          arquivo_md: 'corpus_md/jornada_3_tronos/livro_3_a-tormenta-de-espadas_resumo-completo.md',
          livro: 'A Tormenta de Espadas',
          capitulo: 'Samwell IV, Jon IX',
      },
        notaHistorica: 'Ramal do Oeste (Criação autoral): reencontro fortuito com os fugitivos de Fortenoite na retaguarda ocidental.',
      },
      escolhas: [
        {
          id: 'esc_j4_a3b_acolher_sam_e_bebe',
          texto: 'Cobrir Goiva e o bebê com seu próprio manto de lã e oferecer água morna e carne seca a Samwell Tarly.',
          tipo: 'simples',
          delta: {
            flagsAdicionadas: ['protetor_de_samwell', 'segredo_porta_negra'],
            aprovacaoCompanheiros: { samwell: 15, jon_snow: 10 },
            compostura: 2,
            honra: 2,
          },
          nextNodeId: 'j4_a3b_volta_a_castelo_negro',
        },
        {
          id: 'esc_j4_a3b_questionar_sam_criatura',
          texto: 'Interrogar Sam com cautela sobre como mataram a criatura de olhos azuis com a lâmina de obsidiana.',
          tipo: 'teste_atributo',
          atributo: 'astucia',
          dc: 9,
          onSuccessNodeId: 'j4_a3b_volta_a_castelo_negro',
          onPartialFailureNodeId: 'j4_a3b_volta_a_castelo_negro',
          delta: {
            flagsAdicionadas: ['conhecimento_vidro_de_dragao'],
            aprovacaoCompanheiros: { aemon: 10 },
            compostura: 1,
          },
        },
      ],
    },

    // 7. Volta a Castelo Negro
    j4_a3b_volta_a_castelo_negro: {
      id: 'j4_a3b_volta_a_castelo_negro',
      titulo: 'O Retorno dos Defensores do Oeste',
      anoHistorico: '300 d.C.',
      localizacao: 'Portões de Castelo Negro',
      regionId: 'castelo_negro',
      fallbackText: `Castelo Negro surge no horizonte como uma sentinela cinzenta sob a muralha de gelo colossal. A madeira da armaria ainda fumega e os cadáveres dos gigantes e Thenns jazem enrijecidos sob montes de neve salpicada de fuligem.
      
Quando a coluna vinda do oeste adentra os portões trazendo Bowen Marsh enfaixado e Samwell Tarly a cavalo, os corvos nas gaiolas grasnam em frenesi.
      
Jon Snow desce da escadaria de madeira para recebê-los. Seu rosto está magro e sombrio, mas um alívio imenso brilha em seus olhos ao ver Samwell vivo e a bandeira da Patrulha ainda erguida no oeste.
      
— Ser Denys segurou a garganta — anuncia o mensageiro. — E o Chorão foi repelido com grandes perdas!
      
Contudo, ao fundo do pátio, estandartes dourados e carmesins chamam a atenção: Ser Alliser Thorne e Janos Slynt acabam de desembarcar de Atalaialeste com reforços e ordens de prisão contra os irmãos!`,
      internalVoices: [
        {
          atributo: 'comando',
          resultadoPassivo: 'SUCESSO',
          dcPassiva: 10,
          fala: 'A vitória na Ponte das Caveiras deu a você autoridade moral incontestável perante os irmãos veteranos da guarnição.',
        },
      ],
      loreContext: {
        origem: 'original',
        fonte: {
          arquivo_md: 'corpus_md/jornada_3_tronos/livro_3_a-tormenta-de-espadas_resumo-completo.md',
          livro: 'A Tormenta de Espadas',
          capitulo: 'Jon IX',
      },
        notaHistorica: 'Ramal do Oeste (Criação autoral): o regresso dos veteranos da Ponte das Caveiras a Castelo Negro sob tensão política.',
      },
      escolhas: [
        {
          id: 'esc_j4_a3b_concluir_ramal_ir_ato4',
          texto: 'Acompanhar Jon Snow e Samwell até os aposentos do Meistre Aemon para enfrentar as acusações de Janos Slynt (Avançar para o Ato IV).',
          tipo: 'simples',
          delta: {
            flagsAdicionadas: ['veterano_da_ponte_das_caveiras'],
            marcoConcluido: 'ato3b_oeste_concluido',
            honra: 2,
          },
          nextNodeId: 'j4_a4_thorne_e_slynt_chegam',
        },
        {
          id: 'esc_j4_a3b_permanecer_ao_lado_marsh',
          texto: 'Garantir que Bowen Marsh receba os melhores cuidados de Clydas na enfermaria antes de encarar o conselho.',
          tipo: 'simples',
          delta: {
            flagsAdicionadas: ['lealdade_intendente_confirmada'],
            aprovacaoCompanheiros: { alliser_thorne: 5 },
            marcoConcluido: 'ato3b_oeste_concluido',
            honra: 1,
          },
          nextNodeId: 'j4_a4_thorne_e_slynt_chegam',
        },
      ],
    },
  },
};
