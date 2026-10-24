import 'server-only';
import { GrafoJornada } from '@/server/engine/storyLinter';

export const grafoJ4Ato1: GrafoJornada = {
  id: 'jornada_4_muralha_ato1',
  titulo: 'Ato I: As Cinzas do Punho & A Fuga na Neve',
  startNodeId: 'j4_a1_cinzas_do_punho',
  nodes: {
    // 1. O Despertar nas Cinzas do Punho
    j4_a1_cinzas_do_punho: {
      id: 'j4_a1_cinzas_do_punho',
      titulo: 'Três Toques de Trombeta no Punho',
      anoHistorico: '299 d.C.',
      localizacao: 'O Punho dos Primeiros Homens',
      regionId: 'floresta_assombrada',
      fallbackText: `Você acordais com o ar ardendo nos pulmões como vidro moído. A trombeta da sentinela soou uma vez para os irmãos que retornavam; soou duas para os selvagens; mas soou três vezes na escuridão gélida da madrugada. Três toques longos e trêmulos que não eram ouvidos há oito mil anos: os Outros.
      
Ao seu redor, o acampamento de trezentos irmãos jurados da Patrulha da Noite transformou-se em um matadouro de névoa e cavalos mortos reanimados. O Senhor Comandante Jeor Mormont desembainha a espada e berra ordens entre o vento cortante:
— Homens da Patrulha! Fechem a fila! Piche e tochas acesas, ou nenhum de nós verá a Muralha novamente!`,
      internalVoices: [
        {
          atributo: 'comando',
          resultadoPassivo: 'SUCESSO',
          dcPassiva: 10,
          fala: 'A muralha de escudos na encosta é a única chance de conter a primeira onda de mortos.',
        },
        {
          atributo: 'furia',
          resultadoPassivo: 'SUCESSO',
          dcPassiva: 11,
          fala: 'O frio quer congelar suas juntas. Mantende o aço em movimento ou morrereis onde está!',
        },
      ],
      loreContext: {
        fonte: {
          arquivo_md: 'corpus_md/jornada_3_tronos/livro_3_a-tormenta-de-espadas_resumo-completo.md',
          livro: 'A Tormenta de Espadas',
          capitulo: 'Prólogo / Samwell I',
        },
        notaHistorica: 'O ataque dos Outros no Punho dos Primeiros Homens.',
      },
      escolhas: [
        {
          id: 'esc_j4_a1_formar_parede_tochas',
          texto: 'Agrupar os irmãos ao redor do Velho Urso e erguer uma barreira de lanças e tochas acesas.',
          tipo: 'teste_atributo',
          atributo: 'comando',
          dc: 11,
          onSuccessNodeId: 'j4_a1_retirada_neve_profunda',
          onPartialFailureNodeId: 'j4_a1_retirada_neve_profunda',
          delta: { compostura: 1 },
        },
        {
          id: 'esc_j4_a1_resgatar_cavalos_carga',
          texto: 'Correr aos currais improvisados para salvar os cavalos de carga e os suprimentos de viagem.',
          tipo: 'simples',
          delta: { flagsAdicionadas: ['cavalos_punho_salvos'] },
          nextNodeId: 'j4_a1_retirada_neve_profunda',
        },
      ],
    },

    // 2. Retirada na Neve Profunda
    j4_a1_retirada_neve_profunda: {
      id: 'j4_a1_retirada_neve_profunda',
      titulo: 'A Marcha dos Espectros na Floresta Assombrada',
      anoHistorico: '299 d.C.',
      localizacao: 'Floresta Assombrada',
      regionId: 'floresta_assombrada',
      fallbackText: `Apenas cinquenta homens sobreviveram ao romper do cerco no Punho. Você arrastais as botas pela neve que bate na altura dos joelhos; o suor congela sob as cotas de malha e transforma as barbas em blocos de gelo.
      
Atrás de você, Samwell Tarly soluça em agonia, com os pés em carne viva e as mãos roxas de frio. Grenn e Pequeno Paul puxam o irmão gordo pelos braços, enquanto o Velho Urso cavalga na vanguarda, a barba branca fustigada pela nevasca inclemente.`,
      internalVoices: [
        {
          atributo: 'cortesia',
          resultadoPassivo: 'SUCESSO',
          dcPassiva: 9,
          fala: 'Se Sam tombar na neve, ninguém mais terá forças para erguê-lo. Uma palavra firme de encorajamento pode salvar sua vida.',
        },
      ],
      loreContext: {
        fonte: {
          arquivo_md: 'corpus_md/jornada_3_tronos/livro_3_a-tormenta-de-espadas_resumo-completo.md',
          livro: 'A Tormenta de Espadas',
          capitulo: 'Samwell I',
        },
        notaHistorica: 'A penosa retirada da Patrulha através da nevasca.',
      },
      escolhas: [
        {
          id: 'esc_j4_a1_ajudar_samwell_caminhar',
          texto: 'Ajudar Grenn e Paul a revezar no apoio a Samwell Tarly para mantê-lo marchando.',
          tipo: 'simples',
          aprovacaoCompanheiros: { samwell: 25, grenn: 20 },
          delta: { flagsAdicionadas: ['samwell_apoiado_marcha'], compostura: 1 },
          nextNodeId: 'j4_a1_fortaleza_craster_abrigo',
        },
        {
          id: 'esc_j4_a1_vigiar_retaguarda_batedor',
          texto: 'Assumir a retaguarda com arco e flecha de pez, vigiando as sombras entre os pinheiros.',
          tipo: 'teste_atributo',
          atributo: 'astucia',
          dc: 11,
          onSuccessNodeId: 'j4_a1_fortaleza_craster_abrigo',
          onPartialFailureNodeId: 'j4_a1_fortaleza_craster_abrigo',
          delta: { flagsAdicionadas: ['retaguarda_atenta_punho'] },
        },
      ],
    },

    // 3. Fortaleza de Craster
    j4_a1_fortaleza_craster_abrigo: {
      id: 'j4_a1_fortaleza_craster_abrigo',
      titulo: 'O Refúgio Sombrio na Fortaleza de Craster',
      anoHistorico: '299 d.C.',
      localizacao: 'Fortaleza de Craster',
      regionId: 'floresta_assombrada',
      fallbackText: `As paliçadas de madeira tosca da colina de Craster surgem na tempestade como uma miragem fedorenta de fumaça e esterco. Craster, o selvagem incestuoso que toma as próprias filhas como esposas, recebe os patrulheiros com insultos e desdém, exigindo presentes em troca de míseras tigelas de sopa rala e abrigo no celeiro úmido.
      
No canto escuro do celeiro, homens feridos delirantes gemem de dor. O ressentimento ferve entre os irmãos negros: alguns sussurram que Craster esconde presuntos e farinha nos subterrâneos enquanto a Patrulha morre de inanição.`,
      internalVoices: [
        {
          atributo: 'astucia',
          resultadoPassivo: 'SUCESSO',
          dcPassiva: 11,
          fala: 'Irmãos desesperados com adagas na mão são mais perigosos que o vento lá fora. O motim está no ar.',
        },
      ],
      loreContext: {
        fonte: {
          arquivo_md: 'corpus_md/jornada_3_tronos/livro_3_a-tormenta-de-espadas_resumo-completo.md',
          livro: 'A Tormenta de Espadas',
          capitulo: 'Samwell II',
        },
        notaHistorica: 'O descanso tenso na Fortaleza de Craster.',
      },
      escolhas: [
        {
          id: 'esc_j4_a1_alertar_mormont_conspiracao',
          texto: 'Procurar Jeor Mormont em sigilo e alertá-lo sobre a insubordinação crescente de Dirk e Karl Pé-de-Clava.',
          tipo: 'simples',
          aprovacaoCompanheiros: { donal_noye: 15 },
          delta: { flagsAdicionadas: ['mormont_alertado_motim'], compostura: 1 },
          nextNodeId: 'j4_a1_motim_craster_sangue',
        },
        {
          id: 'esc_j4_a1_cuidar_feridos_celeiro',
          texto: 'Ajudar Meistre e os intendentes a enfaixar queimaduras de gelo e preparar infusões quentes.',
          tipo: 'teste_atributo',
          atributo: 'erudicao',
          dc: 10,
          onSuccessNodeId: 'j4_a1_motim_craster_sangue',
          onPartialFailureNodeId: 'j4_a1_motim_craster_sangue',
          delta: { sangue: 1 },
        },
      ],
    },

    // 4. O Motim de Craster
    j4_a1_motim_craster_sangue: {
      id: 'j4_a1_motim_craster_sangue',
      titulo: 'Sangue no Salão & O Motim dos Malditos',
      anoHistorico: '299 d.C.',
      localizacao: 'Salão de Craster',
      regionId: 'floresta_assombrada',
      fallbackText: `A fome rompeu todas as correntes da disciplina e dos votos. Durante a ceia azeda, Dirk sacou uma adaga e cortou a garganta de Craster sobre a mesa de madeira! O caos explodiu: pratos voaram e o salão transformou-se em um turbilhão de lâminas desembainhadas.
      
Quando o Senhor Comandante Jeor Mormont berrou exigindo ordem em nome do rei, Karl Pé-de-Clava e outros traidores avançaram pelas costas do velho homem, cravando punhais no gibão de couro do Velho Urso. Mormont desaba sobre o chão enlameado, banhado em sangue fervente.`,
      internalVoices: [
        {
          atributo: 'furia',
          resultadoPassivo: 'SUCESSO',
          dcPassiva: 12,
          fala: 'Traidores desonrados! Eles assassinaram o Comandante sagrado da Patrulha!',
        },
      ],
      loreContext: {
        fonte: {
          arquivo_md: 'corpus_md/jornada_3_tronos/livro_3_a-tormenta-de-espadas_resumo-completo.md',
          livro: 'A Tormenta de Espadas',
          capitulo: 'Samwell II',
        },
        notaHistorica: 'O infame motim onde Jeor Mormont é assassinado.',
      },
      escolhas: [
        {
          id: 'esc_j4_a1_correr_socorrer_mormont',
          texto: 'Lançar-se através do combate para amparar o Velho Urso em seus últimos instantes de vida.',
          tipo: 'simples',
          nextNodeId: 'j4_a1_ultimo_suspiro_mormont',
        },
        {
          id: 'esc_j4_a1_combater_amotinados_furia',
          texto: 'Desembainhar a espada e abater dois amotinados para abrir caminho até as portas do salão.',
          tipo: 'teste_atributo',
          atributo: 'furia',
          dc: 12,
          onSuccessNodeId: 'j4_a1_ultimo_suspiro_mormont',
          onPartialFailureNodeId: 'j4_a1_ultimo_suspiro_mormont',
          delta: { sangue: -1, compostura: 1 },
        },
      ],
    },

    // 5. Último Suspiro de Jeor Mormont
    j4_a1_ultimo_suspiro_mormont: {
      id: 'j4_a1_ultimo_suspiro_mormont',
      titulo: 'A Última Vontade do Velho Urso',
      anoHistorico: '299 d.C.',
      localizacao: 'Salão de Craster',
      regionId: 'floresta_assombrada',
      fallbackText: `Você se ajoelha ao lado de Jeor Mormont no chão gélido. O sangue jorra rubro por entre seus dedos enluvados. Com olhos febris e a voz engasgada pelo estertor da morte, ele aperta sua mão e a de Samwell Tarly:
— Sam... e tu, irmão... fujam daqui... salvem as garotas... e meu filho... Jorah... digam a ele... que tome o negro... que seu pai... o perdoa...
      
Os olhos de granito cinzento do lorde da Ilha dos Ursos fixam-se no teto enfumaçado e perdem a luz. O 997º Senhor Comandante da Patrulha da Noite está morto.`,
      internalVoices: [
        {
          atributo: 'comando',
          resultadoPassivo: 'SUCESSO',
          dcPassiva: 11,
          fala: 'O comando agora recai sobre quem tiver a coragem de cruzar as neves e levar a verdade a Castelo Negro.',
        },
      ],
      loreContext: {
        fonte: {
          arquivo_md: 'corpus_md/jornada_3_tronos/livro_3_a-tormenta-de-espadas_resumo-completo.md',
          livro: 'A Tormenta de Espadas',
          capitulo: 'Samwell II',
        },
        notaHistorica: 'O perdão final de Jeor Mormont ao filho Jorah.',
      },
      escolhas: [
        {
          id: 'esc_j4_a1_jurar_lealdade_memoria_urso',
          texto: 'Fechar os olhos do Velho Urso e jurar honrar seu último desejo perante os deuses antigos.',
          tipo: 'simples',
          delta: { flagsAdicionadas: ['juramento_ao_velho_urso'], compostura: 2 },
          nextNodeId: 'j4_a1_fuga_samwell_goiva',
        },
        {
          id: 'esc_j4_a1_arrastar_sam_antes_amotinados',
          texto: 'Puxar Samwell pelo braço antes que Adaga e os amotinados venham degolar testemunhas.',
          tipo: 'teste_atributo',
          atributo: 'comando',
          dc: 10,
          onSuccessNodeId: 'j4_a1_fuga_samwell_goiva',
          onPartialFailureNodeId: 'j4_a1_fuga_samwell_goiva',
          delta: { compostura: 1 },
        },
      ],
    },

    // 6. Fuga com Samwell e Goiva
    j4_a1_fuga_samwell_goiva: {
      id: 'j4_a1_fuga_samwell_goiva',
      titulo: 'A Fuga nas Trevas & O Bebê de Goiva',
      anoHistorico: '299 d.C.',
      localizacao: 'Bosques ao redor de Craster',
      regionId: 'floresta_assombrada',
      fallbackText: `Em meio aos gritos dos amotinados que violavam as filhas de Craster e disputavam carnes salgadas, Goiva puxa seu braço chorando e carregando um recém-nascido envolto em peles de carneiro.
— Eles vão matar meu filho! — implora a garota selvagem. — Craster sempre dava os meninos aos deuses da floresta branca! Fujam comigo!
      
Você, Samwell Tarly e Goiva escapais na escuridão sob a nevasca torrencial, deixando para trás o salão em chamas.`,
      loreContext: {
        fonte: {
          arquivo_md: 'corpus_md/jornada_3_tronos/livro_3_a-tormenta-de-espadas_resumo-completo.md',
          livro: 'A Tormenta de Espadas',
          capitulo: 'Samwell II / III',
        },
        notaHistorica: 'A fuga desesperada com a jovem Goiva e seu bebê.',
      },
      escolhas: [
        {
          id: 'esc_j4_a1_guiar_fuga_astucia',
          texto: 'Conduzir a fuga pelos arroios congelados para apagar as pegadas na neve profunda.',
          tipo: 'teste_atributo',
          atributo: 'astucia',
          dc: 11,
          onSuccessNodeId: 'j4_a1_ataque_criatura_bosque',
          onPartialFailureNodeId: 'j4_a1_ataque_criatura_bosque',
          aprovacaoCompanheiros: { samwell: 25 },
        },
        {
          id: 'esc_j4_a1_carregar_fardo_bebe_goiva',
          texto: 'Ajudar Goiva a carregar a criança sob o seu manto e incentivar Samwell a não parar.',
          tipo: 'simples',
          aprovacaoCompanheiros: { samwell: 20 },
          delta: { flagsAdicionadas: ['amparou_goiva_fuga'], honra: 1 },
          nextNodeId: 'j4_a1_ataque_criatura_bosque',
        },
      ],
    },

    // 7. Ataque da Criatura no Bosque
    j4_a1_ataque_criatura_bosque: {
      id: 'j4_a1_ataque_criatura_bosque',
      titulo: 'Os Olhos Azuis na Aldeia Abandonada',
      anoHistorico: '299 d.C.',
      localizacao: 'Aldeia Selvagem Abandonada',
      regionId: 'floresta_assombrada',
      fallbackText: `Refugiados em uma cabana de barro e galhos, o frio torna-se insuportável. De repente, a respiração de Goiva engasga:
— Eles estão aqui... o frio veio com eles...
      
As tábuas podres da porta estalam e voam em pedaços. Um Outro surge no vão, com armadura que parece mudar de cor com o gelo e uma lâmina translúcida brilhando como cristal pálido sob a luz lunar. Seus olhos queimam com um azul elétrico que não pertence a este mundo.`,
      internalVoices: [
        {
          atributo: 'pressagio',
          resultadoPassivo: 'SUCESSO',
          dcPassiva: 12,
          fala: 'O aço comum estilhaçará contra aquela lâmina de cristal. Apenas o fogo ou o vidro de dragão podem ferir essa abominação!',
        },
      ],
      loreContext: {
        fonte: {
          arquivo_md: 'corpus_md/jornada_3_tronos/livro_3_a-tormenta-de-espadas_resumo-completo.md',
          livro: 'A Tormenta de Espadas',
          capitulo: 'Samwell III',
        },
        notaHistorica: 'O confronto aterrorizante com o Outro.',
      },
      escolhas: [
        {
          id: 'esc_j4_a1_confrontar_outro_tocha',
          texto: 'Brandir uma tocha acesa contra o rosto gélido do monstro para dar tempo a Samwell.',
          tipo: 'teste_atributo',
          atributo: 'furia',
          dc: 12,
          onSuccessNodeId: 'j4_a1_adaga_obsidiana_sam_matador',
          onPartialFailureNodeId: 'j4_a1_adaga_obsidiana_sam_matador',
          delta: { sangue: -1 },
        },
        {
          id: 'esc_j4_a1_lembrar_sam_obsidiana',
          texto: 'Gritar para Samwell sacar o punhal de vidro de dragão achado no Punho!',
          tipo: 'simples',
          nextNodeId: 'j4_a1_adaga_obsidiana_sam_matador',
        },
      ],
    },

    // 8. A Adaga de Obsidiana (Sam, o Matador)
    j4_a1_adaga_obsidiana_sam_matador: {
      id: 'j4_a1_adaga_obsidiana_sam_matador',
      titulo: 'Vidro de Dragão & A Dissolução do Monstro',
      anoHistorico: '299 d.C.',
      localizacao: 'Aldeia Selvagem Abandonada',
      regionId: 'floresta_assombrada',
      fallbackText: `Tropeçando na neve e soltando um berro agudo de pavor, Samwell Tarly ergueu o punhal negro de obsidiana e cravou-o com todo o peso do seu corpo no vão da armadura de gelo do Outro, logo abaixo da garganta!
      
O monstro soltou um uivo que pareceu rachar o próprio céu ártico. A lâmina fumegou; onde a pedra negra tocou a carne, o gelo começou a derreter em vapores brancos ferventes. Em segundos, os ossos derreteram como cera sob a lareira e a criatura desfez-se em uma poça fumegante de água límpida e cinzas frias.
— Vidro de dragão... — murmurou Sam, caindo de joelhos, boquiaberto. — O fogo dos deuses antigos...`,
      internalVoices: [
        {
          atributo: 'erudicao',
          resultadoPassivo: 'SUCESSO',
          dcPassiva: 10,
          fala: 'A lenda dos Primeiros Homens é verdadeira: a obsidiana é a ruína dos Caminhantes Brancos.',
        },
      ],
      loreContext: {
        fonte: {
          arquivo_md: 'corpus_md/jornada_3_tronos/livro_3_a-tormenta-de-espadas_resumo-completo.md',
          livro: 'A Tormenta de Espadas',
          capitulo: 'Samwell III',
        },
        notaHistorica: 'Samwell descobre que obsidiana mata os Outros.',
      },
      escolhas: [
        {
          id: 'esc_j4_a1_recolher_obsidiana_restante',
          texto: 'Recolher com reverência a adaga de obsidiana e encorajar Sam pela façanha lendária.',
          tipo: 'simples',
          aprovacaoCompanheiros: { samwell: 30 },
          delta: { flagsAdicionadas: ['segredo_obsidiana_descoberto'], compostura: 2 },
          nextNodeId: 'j4_a1_corvos_na_arvore_sagrada',
        },
        {
          id: 'esc_j4_a1_examinar_cinzas_criatura',
          texto: 'Examinar o vapor e as cinzas da criatura desfeita para confirmar a morte do Outro.',
          tipo: 'teste_atributo',
          atributo: 'erudicao',
          dc: 10,
          onSuccessNodeId: 'j4_a1_corvos_na_arvore_sagrada',
          onPartialFailureNodeId: 'j4_a1_corvos_na_arvore_sagrada',
          delta: { flagsAdicionadas: ['conhecimento_anatomic_outros'] },
        },
      ],
    },

    // 9. Os Corvos na Árvore Sagrada
    j4_a1_corvos_na_arvore_sagrada: {
      id: 'j4_a1_corvos_na_arvore_sagrada',
      titulo: 'Mil Corvos no Represeiro',
      anoHistorico: '299 d.C.',
      localizacao: 'Bosque Sagrado além da Muralha',
      regionId: 'floresta_assombrada',
      fallbackText: `Encurralados horas depois por dezenas de criaturas de olhos azuis (cadáveres de selvagens reanimados), a morte parecia certa. Mas quando o primeiro morto estendeu a mão podre contra o bebê de Goiva, o céu da floresta escureceu com o rufar de milhares de asas negras!
      
Mil corvos mergulharam da copa do grande represeiro, bicando os olhos dos mortos em um furacão ensurdecedor de grasnidos:
— Vão! Vão! — pareciam gritar as aves.
Por entre os pinheiros nevados, montado em um alce colossal, surge uma figura silenciosa envolta em farrapos negros da Patrulha.`,
      loreContext: {
        fonte: {
          arquivo_md: 'corpus_md/jornada_3_tronos/livro_3_a-tormenta-de-espadas_resumo-completo.md',
          livro: 'A Tormenta de Espadas',
          capitulo: 'Samwell III',
        },
        notaHistorica: 'A intervenção mística de Mãos-Frias e a revoada de corvos.',
      },
      escolhas: [
        {
          id: 'esc_j4_a1_seguir_cavaleiro_alce',
          texto: 'Acompanhar a figura misteriosa montada no grande alce através do bosque.',
          tipo: 'simples',
          nextNodeId: 'j4_a1_maos_frias_encontro',
        },
        {
          id: 'esc_j4_a1_manter_arco_em_punho',
          texto: 'Avançar com o arco engatilhado, protegendo a retaguarda de Samwell e Goiva.',
          tipo: 'teste_atributo',
          atributo: 'pressagio',
          dc: 10,
          onSuccessNodeId: 'j4_a1_maos_frias_encontro',
          onPartialFailureNodeId: 'j4_a1_maos_frias_encontro',
          delta: { flagsAdicionadas: ['vigilancia_sob_represeiro'] },
        },
      ],
    },

    // 10. Encontro com Mãos-Frias
    j4_a1_maos_frias_encontro: {
      id: 'j4_a1_maos_frias_encontro',
      titulo: 'O Irmão das Mãos Frias',
      anoHistorico: '299 d.C.',
      localizacao: 'Trilha Oculta para Fortenoite',
      regionId: 'floresta_assombrada',
      fallbackText: `O cavaleiro cobre o rosto com um lenço negro, mas quando ele estende as mãos enluvadas para partilhar carne seca com Samwell e Goiva, você reparais: a carne de suas mãos é preta e dura como pedra de ferro, fria como o próprio gelo eterno.
— Quem é você? — pergunta Sam tremendo.
— Um amigo. Um irmão da Patrulha... há muito tempo — sussurra a voz rouca. — Eu não posso cruzar a Muralha. Há feitiços antigos de sangue forjados em suas fundações que nenhum morto pode atravessar. Mas levarei vocês até o Portão Negro de Fortenoite.`,
      internalVoices: [
        {
          atributo: 'pressagio',
          resultadoPassivo: 'SUCESSO',
          dcPassiva: 12,
          fala: 'A magia dos Primeiros Homens e dos Filhos da Floresta protege a Muralha. Enquanto o gelo mantiver os feitiços, os mortos não passarão.',
        },
      ],
      loreContext: {
        fonte: {
          arquivo_md: 'corpus_md/jornada_3_tronos/livro_3_a-tormenta-de-espadas_resumo-completo.md',
          livro: 'A Tormenta de Espadas',
          capitulo: 'Samwell IV',
        },
        notaHistorica: 'Mãos-Frias guia os fugitivos até Fortenoite.',
      },
      escolhas: [
        {
          id: 'esc_j4_a1_confiar_em_maos_frias',
          texto: 'Seguir as instruções de Mãos-Frias rumo aos poços subterrâneos de Fortenoite.',
          tipo: 'simples',
          delta: { flagsAdicionadas: ['encontro_maos_frias'] },
          nextNodeId: 'j4_a1_fortenoite_portao_negro',
        },
        {
          id: 'esc_j4_a1_questionar_juramento_morto',
          texto: 'Indagar em voz baixa a Mãos-Frias sobre seu antigo juramento e as defesas mágicas da Muralha.',
          tipo: 'teste_atributo',
          atributo: 'erudicao',
          dc: 10,
          onSuccessNodeId: 'j4_a1_fortenoite_portao_negro',
          onPartialFailureNodeId: 'j4_a1_fortenoite_portao_negro',
          delta: { flagsAdicionadas: ['conhecimento_feiticos_muralha'] },
        },
      ],
    },

    // 11. Fortenoite e o Portão Negro
    j4_a1_fortenoite_portao_negro: {
      id: 'j4_a1_fortenoite_portao_negro',
      titulo: 'As Sombras de Fortenoite & O Portão de Represeiro',
      anoHistorico: '299 d.C.',
      localizacao: 'Subterrâneos de Fortenoite',
      regionId: 'portao_e_tunel',
      fallbackText: `Fortenoite, o castelo mais antigo e amaldiçoado da Muralha, jaz em ruínas colossais sob as neves. Nos poços mais profundos, descendo escadarias carcomidas onde outrora o Cozinheiro Rato serviu príncipes assados aos convivas, você chegais a uma porta viva talhada em madeira branca de represeiro.
      
Um rosto ancestral esculpido na madeira abre os olhos de seiva vermelha e fala com uma voz cavernosa que ecoa pela pedra:
— Quem vem lá?`,
      loreContext: {
        fonte: {
          arquivo_md: 'corpus_md/jornada_3_tronos/livro_3_a-tormenta-de-espadas_resumo-completo.md',
          livro: 'A Tormenta de Espadas',
          capitulo: 'Bran IV / Samwell IV',
        },
        notaHistorica: 'O lendário Portão Negro de Fortenoite.',
      },
      escolhas: [
        {
          id: 'esc_j4_a1_recitar_juramento_portao_negro',
          texto: 'Avançar com a mão sobre a pedra e recitar os votos sagrados da Patrulha da Noite.',
          tipo: 'simples',
          nextNodeId: 'j4_a1_o_juramento_do_portao',
        },
        {
          id: 'esc_j4_a1_tocar_face_represeiro',
          texto: 'Tocar a casca pálida do represeiro vivo e sentir a seiva quente antes de falar.',
          tipo: 'teste_atributo',
          atributo: 'pressagio',
          dc: 10,
          onSuccessNodeId: 'j4_a1_o_juramento_do_portao',
          onPartialFailureNodeId: 'j4_a1_o_juramento_do_portao',
          delta: { flagsAdicionadas: ['bencao_dos_antigos_deuses'], compostura: 1 },
        },
      ],
    },

    // 12. O Juramento do Portão
    j4_a1_o_juramento_do_portao: {
      id: 'j4_a1_o_juramento_do_portao',
      titulo: 'A Noite Chega, e Agora Começa a Minha Vigília',
      anoHistorico: '299 d.C.',
      localizacao: 'O Portão Negro, Fortenoite',
      regionId: 'portao_e_tunel',
      fallbackText: `Sua voz ressoa com reverência e autoridade na abóbada subterrânea:
— Eu sou a espada na escuridão. Eu sou o vigilante nas muralhas. Eu sou o fogo que queima contra o frio, a luz que traz o amanhecer, a trombeta que acorda os que dormem, o escudo que defende os reinos dos homens!
      
A enorme face de madeira branca de represeiro abre a boca em uma caverna luminosa e suave:
— Passai, irmãos juramentados da noite — sussurra a porta milenar.
As mandíbulas de madeira se abrem e você cruzais para o lado sul da Muralha, salvos e de volta a Westeros!`,
      internalVoices: [
        {
          atributo: 'cortesia',
          resultadoPassivo: 'SUCESSO',
          dcPassiva: 10,
          fala: 'As palavras antigas têm poder. Elas mantêm o mundo dos homens separado das trevas.',
        },
      ],
      loreContext: {
        fonte: {
          arquivo_md: 'corpus_md/jornada_3_tronos/livro_3_a-tormenta-de-espadas_resumo-completo.md',
          livro: 'A Tormenta de Espadas',
          capitulo: 'Bran IV',
        },
        notaHistorica: 'O juramento sagrado que abre o Portão Negro.',
      },
      escolhas: [
        {
          id: 'esc_j4_a1_marchar_para_castelo_negro',
          texto: 'Apressar a marcha pelo Caminho do Rei em direção a Castelo Negro.',
          tipo: 'simples',
          delta: { compostura: 2 },
          nextNodeId: 'j4_a1_chegada_castelo_negro_exaustao',
        },
        {
          id: 'esc_j4_a1_vigiar_sul_muralha',
          texto: 'Examinar as matas ao sul do Muro para certificar-se de que a comitiva não foi seguida.',
          tipo: 'teste_atributo',
          atributo: 'astucia',
          dc: 9,
          onSuccessNodeId: 'j4_a1_chegada_castelo_negro_exaustao',
          onPartialFailureNodeId: 'j4_a1_chegada_castelo_negro_exaustao',
          delta: { flagsAdicionadas: ['trilha_sul_assegurada'] },
        },
      ],
    },

    // 13. Chegada a Castelo Negro
    j4_a1_chegada_castelo_negro_exaustao: {
      id: 'j4_a1_chegada_castelo_negro_exaustao',
      titulo: 'O Pátio Enlameado de Castelo Negro',
      anoHistorico: '299 d.C.',
      localizacao: 'Castelo Negro',
      regionId: 'castelo_negro',
      fallbackText: `Após dias de marcha forçada pela Dádiva, as torres toscas de madeira e pedra de Castelo Negro surgem sob a sombra titanica de setecentos pés de gelo brilhante.
      
O pátio está enlameado, com poucos homens trabalhando nas forjas e nos estábulos. Quando você e Samwell cambaleais portão adentro com Goiva e a criança, irmãos negros correm boquiabertos:
— Pelos deuses... são os sobreviventes do Punho! O Velho Urso retornou?
— Não — respondeis com a garganta seca. — O Velho Urso foi assassinado em Craster. Estamos quase todos mortos.`,
      loreContext: {
        fonte: {
          arquivo_md: 'corpus_md/jornada_3_tronos/livro_3_a-tormenta-de-espadas_resumo-completo.md',
          livro: 'A Tormenta de Espadas',
          capitulo: 'Jon VII / Samwell V',
        },
        notaHistorica: 'A notícia do massacre do Punho e do motim chega a Castelo Negro.',
      },
      escolhas: [
        {
          id: 'esc_j4_a1_procurar_donal_noye_armaria',
          texto: 'Apresentar-se imediatamente na armaria perante Donal Noye para prestar relatório.',
          tipo: 'simples',
          nextNodeId: 'j4_a1_armaria_donal_noye',
        },
        {
          id: 'esc_j4_a1_conduzir_sam_goiva_enfermaria',
          texto: 'Ajudar Samwell a levar Goiva e a criança até a enfermaria antes de ir à forja.',
          tipo: 'simples',
          aprovacaoCompanheiros: { samwell: 20 },
          delta: { flagsAdicionadas: ['goiva_abrigada_enfermaria'], honra: 1 },
          nextNodeId: 'j4_a1_armaria_donal_noye',
        },
      ],
    },

    // 14. Armaria de Donal Noye
    j4_a1_armaria_donal_noye: {
      id: 'j4_a1_armaria_donal_noye',
      titulo: 'O Martelo de Donal Noye',
      anoHistorico: '299 d.C.',
      localizacao: 'Armaria de Castelo Negro',
      regionId: 'castelo_negro',
      fallbackText: `O calor da forja aquece seus ossos dormentes. Donal Noye, o ferreiro maneta que outrora forjou o martelo de guerra de Robert Baratheon em Ponta Tempestade, martela uma ponta de lança apoiando o ferro contra a bigorna com o toco do braço esquerdo.
      
Ao ouvir o relato da morte de Mormont e do massacre no Punho, Noye cospe na brasa:
— Malditos sejam os amotinados. Mas não temos tempo para lágrimas, rapaz. Jon Snow chegou ferido há três dias: os selvagens escalaram a Muralha a oeste e estão marchando para nos atacar pelo sul, enquanto Mance desce pelo norte com cem mil homens. Somos menos de quarenta irmãos aptos a lutar.`,
      internalVoices: [
        {
          atributo: 'comando',
          resultadoPassivo: 'SUCESSO',
          dcPassiva: 11,
          fala: 'Donal Noye é a espinha dorsal de Castelo Negro. Sem um Comandante oficial, todos os olhos se voltam para o ferreiro.',
        },
      ],
      loreContext: {
        fonte: {
          arquivo_md: 'corpus_md/jornada_3_tronos/livro_3_a-tormenta-de-espadas_resumo-completo.md',
          livro: 'A Tormenta de Espadas',
          capitulo: 'Jon VII',
        },
        notaHistorica: 'Donal Noye assume o comando prático de Castelo Negro.',
      },
      escolhas: [
        {
          id: 'esc_j4_a1_mostrar_adaga_obsidiana_noye',
          texto: 'Entregar a adaga de obsidiana a Noye e relatar que o vidro de dragão exterminou o Outro.',
          tipo: 'simples',
          aprovacaoCompanheiros: { donal_noye: 25 },
          delta: { flagsAdicionadas: ['obsidiana_entregue_noye'], compostura: 1 },
          nextNodeId: 'j4_a1_conselho_meistre_aemon',
        },
        {
          id: 'esc_j4_a1_oferecer_ajuda_forja_armaria',
          texto: 'Arregaçar as mangas e ajudar a bater ferro para produzir pontas de virote e lanças.',
          tipo: 'teste_atributo',
          atributo: 'furia',
          dc: 11,
          onSuccessNodeId: 'j4_a1_conselho_meistre_aemon',
          onPartialFailureNodeId: 'j4_a1_conselho_meistre_aemon',
          delta: { flagsAdicionadas: ['armaria_reforcada'] },
        },
      ],
    },

    // 15. Conselho de Meistre Aemon
    j4_a1_conselho_meistre_aemon: {
      id: 'j4_a1_conselho_meistre_aemon',
      titulo: 'A Sabedoria Centenária de Meistre Aemon',
      anoHistorico: '299 d.C.',
      localizacao: 'Câmaras do Meistre, Castelo Negro',
      regionId: 'castelo_negro',
      fallbackText: `Nas câmaras aquecidas por braseiros de turfa, Meistre Aemon Targaryen, cego e com cem anos de idade, acaricia a lâmina negra de obsidiana trazida por você. Seus dedos enrugados sentem o gume agudo:
— Vidro de dragão. Fogo congelado em pedra pelas entranhas da terra. Nos livros antigos da Cidadela está escrito que os Filhos da Floresta presenteavam a Patrulha com cem adagas de obsidiana todos os anos.
      
O velho meistre ergue o rosto cego na sua direção:
— A hora é escura, irmão. Mas enquanto um único homem permanecer de pé juramentado ao Muro, o reino dos homens não cairá.`,
      internalVoices: [
        {
          atributo: 'erudicao',
          resultadoPassivo: 'SUCESSO',
          dcPassiva: 10,
          fala: 'O sangue de dragão corre nas veias de Aemon. Ele recusou a coroa de Westeros para servir na Muralha.',
        },
      ],
      loreContext: {
        fonte: {
          arquivo_md: 'corpus_md/jornada_3_tronos/livro_3_a-tormenta-de-espadas_resumo-completo.md',
          livro: 'A Tormenta de Espadas',
          capitulo: 'Samwell V',
        },
        notaHistorica: 'Meistre Aemon reconhece o valor da obsidiana.',
      },
      escolhas: [
        {
          id: 'esc_j4_a1_concluir_ato1_preparar_defesa',
          texto: 'Agradecer a bênção de Meistre Aemon e assumir o posto de vigília nos parapeitos (Concluir Ato I).',
          tipo: 'simples',
          nextNodeId: 'j4_a1_checkpoint_conclusao',
        },
        {
          id: 'esc_j4_a1_pedir_conselho_estudo_pergaminhos',
          texto: 'Pedir conselho a Aemon sobre os relatos antigos da Longa Noite antes de subir aos muros.',
          tipo: 'teste_atributo',
          atributo: 'erudicao',
          dc: 10,
          onSuccessNodeId: 'j4_a1_checkpoint_conclusao',
          onPartialFailureNodeId: 'j4_a1_checkpoint_conclusao',
          delta: { flagsAdicionadas: ['sabedoria_antiga_aemon'], compostura: 1 },
        },
      ],
    },

    // 16. Checkpoint de Conclusão do Ato I
    j4_a1_checkpoint_conclusao: {
      id: 'j4_a1_checkpoint_conclusao',
      titulo: 'Conclusão do Ato I: O Retorno das Trevas',
      anoHistorico: '299 d.C.',
      localizacao: 'Castelo Negro',
      regionId: 'castelo_negro',
      fallbackText: `Você se posta no pátio de Castelo Negro sob o céu cinzento de chumbo. O Grande Alcance terminou em tragédia, o Velho Urso está sepultado nas neves da floresta, mas você trouxe a verdade de volta: os mortos caminham, a obsidiana é sua ruína e o cerco dos homens livres está prestes a desabar sobre o Muro.`,
      loreContext: {
        fonte: {
          arquivo_md: 'corpus_md/jornada_3_tronos/livro_3_a-tormenta-de-espadas_resumo-completo.md',
          livro: 'A Tormenta de Espadas',
          capitulo: 'Jon VII',
        },
        notaHistorica: 'Transição entre o retorno do Punho e a defesa contra os thenns.',
      },
      escolhas: [
        {
          id: 'esc_j4_a1_avancar_ato2_incursao_thenns',
          texto: 'Avançar para o Ato II: A Sentinela do Gelo e o combate contra os Thenns pelo sul.',
          tipo: 'simples',
          nextNodeId: 'j4_a2_retorno_jon_snow_ferido',
        },
      ],
    },
  },
};
