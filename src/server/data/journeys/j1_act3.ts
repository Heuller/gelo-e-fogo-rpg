import 'server-only';
import { GrafoJornada, NodeJornada } from '@/server/engine/storyLinter';

export const grafoAto3: GrafoJornada = {
  id: 'jornada_1_conquista_ato3',
  titulo: 'Ato 3: O Campo de Fogo e o Rei que se Ajoelhou',
  startNodeId: 'j1_a3_alianca_dois_reis',
  nodes: {
    // ==========================================
    // CENA 1: A ALIANÇA DOS DOIS REIS
    // ==========================================
    j1_a3_alianca_dois_reis: {
      id: 'j1_a3_alianca_dois_reis',
      titulo: 'O Banquete dos Dois Reis & O Exército Dourado',
      anoHistorico: '2 a.C.',
      localizacao: 'Planícies ao Sul da Água Negra',
      regionId: 'campina',
      fallbackText: `Nas planícies férteis ao sul da Baía da Água Negra, sob o calor sufocante do fim do verão, dois dos mais ricos e antigos soberanos de Westeros uniram suas forças em um espetáculo jamais visto. O Rei Mern IX da Casa Gardener, soberano da florescente Campina, cavalgou à frente de seus cavaleiros floridos; ao seu lado estava o Rei Loren I da Casa Lannister, Senhor do Rochedo Casterly, escoltado pela infantaria pesada ocidental reluzente em esmalte escarlate e leões dourados.

Ao todo, cinquenta e cinco mil homens cobriam os campos de trigo seco: cinco mil cavaleiros montados em corcéis de guerra blindados, centenas de lordes feudais e uma muralha infindável de lanças e bestas. Os Dois Reis riam durante o conselho de guerra, certos de que a pura superioridade numérica de cinco contra um esmagaria o exército de Aegon na terra aberta.

Do outro lado, as tropas combinadas dos Targaryen não passavam de dez mil combatentes, a maioria levas apressadas das Terras dos Rios e da Coroa cuja fidelidade ainda era frágil. Contudo, sobre o acampamento de Aegon, três sombras aladas cobriam o sol da tarde: Balerion, Vhagar e Meraxes estavam juntos pela primeira vez na história.`,
      internalVoices: [
        {
          atributo: 'comando',
          resultadoPassivo: 'SUCESSO',
          dcPassiva: 8,
          fala: 'Cinco para um. Na terra, eles nos cercariam e esmagariam em uma hora. Mas a guerra não será travada na terra.',
        },
        {
          atributo: 'astucia',
          resultadoPassivo: 'SUCESSO',
          dcPassiva: 9,
          fala: 'Olhem para os trigais secos e o vento soprando para o sul. A própria terra conspira em favor de um inferno.',
        },
      ],
      loreContext: {
        idVerbete: 'campo_de_fogo',
        fonte: {
          arquivo_md: 'fogo-e-sangue_01_a-conquista-de-aegon.md',
          livro: 'Fogo & Sangue - Volume 1',
          capitulo: 'A Conquista de Aegon',
        },
        notaHistorica: 'Mern IX e Loren Lannister unem 55.000 homens contra Aegon I.',
      },
      escolhas: [
        {
          id: 'esc_posicionamento_vento_fogo',
          texto: 'Aproveitar a direção do vento seco para queimar os trigais e empurrar as chamas contra as linhas Gardener.',
          tipo: 'teste_atributo',
          atributo: 'astucia',
          dc: 9,
          onSuccessNodeId: 'j1_a3_posicionamento_campo_fogo',
          onPartialFailureNodeId: 'j1_a3_posicionamento_campo_fogo',
        },
        {
          id: 'esc_formar_falange_comando',
          texto: 'Comandar a falange de lanças com firmeza para absorver a carga devastadora da cavalaria inimiga.',
          tipo: 'teste_atributo',
          atributo: 'comando',
          dc: 10,
          onSuccessNodeId: 'j1_a3_posicionamento_campo_fogo',
          onPartialFailureNodeId: 'j1_a3_posicionamento_campo_fogo',
        },
        {
          id: 'esc_pressagio_fogo_conselho',
          texto: 'Consultar o presságio das labaredas de Balerion para determinar o minuto exato da investida aérea.',
          tipo: 'teste_atributo',
          atributo: 'pressagio',
          dc: 9,
          onSuccessNodeId: 'j1_a3_posicionamento_campo_fogo',
          onPartialFailureNodeId: 'j1_a3_posicionamento_campo_fogo',
        },
      ],
    },

    // ==========================================
    // CENA 2: O POSICIONAMENTO NO CAMPO DE FOGO
    // ==========================================
    j1_a3_posicionamento_campo_fogo: {
      id: 'j1_a3_posicionamento_campo_fogo',
      titulo: 'O Som dos Clarins & O Vento do Meio-Dia',
      anoHistorico: '2 a.C.',
      localizacao: 'Planícies de Trigo da Campina',
      regionId: 'campina',
      fallbackText: `Os clarins de bronze dos Gardener e Lannister soaram ao mesmo tempo, um brado estrondoso que sacudiu as colinas. O sol do meio-dia fazia brilhar milhares de escudos e pontas de lança num mar reluzente.

Aegon I alinhou seus homens na encosta suave, instruindo os arqueiros e piqueiros a manterem as fileiras fechadas sob pena de morte. O vento sul começava a uivar através das hastes douradas de trigo e cevada, secas após semanas sem chuva.

Nas celas de couro trabalhado, Aegon ajustava as rédeas de Balerion, enquanto a sua direita a Rainha Visenya montava Vhagar e à esquerda a Rainha Rhaenys acariciava a fronte prateada de Meraxes. A ordem de ataque dos Dois Reis fora dada: uma carga colossal de cinco mil cavaleiros pesados galopava furiosamente na direção dos dragões.`,
      internalVoices: [
        {
          atributo: 'pressagio',
          resultadoPassivo: 'SUCESSO',
          dcPassiva: 7,
          fala: 'O solo treme sob vinte mil cascos ferrados. Em poucos minutos, a terra se tornará um túmulo incandescente.',
        },
        {
          atributo: 'comando',
          resultadoPassivo: 'SUCESSO',
          dcPassiva: 8,
          fala: 'Mantenham as pontas das lanças firmes até o dragão tocar os céus!',
        },
      ],
      loreContext: {
        idVerbete: 'campo_de_fogo',
        fonte: {
          arquivo_md: 'fogo-e-sangue_01_a-conquista-de-aegon.md',
          livro: 'Fogo & Sangue - Volume 1',
          capitulo: 'A Conquista de Aegon',
        },
      },
      escolhas: [
        {
          id: 'esc_resistir_carga_cavalaria',
          texto: 'Liderar a defesa na linha de frente e dar o sinal para o vôo simultâneo dos três dragões.',
          tipo: 'simples',
          nextNodeId: 'j1_a3_carga_cavalaria_gardener',
        },
        {
          id: 'esc_manobra_recuo_fingido_astucia',
          texto: 'Executar um recuo tático fingido para atrair a cavalaria inimiga para o centro do trigal mais seco.',
          tipo: 'teste_atributo',
          atributo: 'astucia',
          dc: 10,
          onSuccessNodeId: 'j1_a3_carga_cavalaria_gardener',
          onPartialFailureNodeId: 'j1_a3_carga_cavalaria_gardener',
        },
      ],
    },

    // ==========================================
    // CENA 3: A CARGA DA CAVALARIA GARDENER
    // ==========================================
    j1_a3_carga_cavalaria_gardener: {
      id: 'j1_a3_carga_cavalaria_gardener',
      titulo: 'A Carga de Aço & A Linha Partida',
      anoHistorico: '2 a.C.',
      localizacao: 'Planícies de Trigo da Campina',
      regionId: 'campina',
      fallbackText: `O impacto da cavalaria da Campina e do Ocidente foi devastador. Os corcéis blindados romperam as primeiras fileiras de piqueiros reais como se fossem gravetos secos; cavaleiros com as armaduras pintadas de esmeralda e ouro trespassavam homens com lanças pesadas de freixo.

O centro das linhas Targaryen começou a ceder sob o peso titânico de cinquenta mil homens marchando atrás da vanguarda. Gritos de pânico ecoavam entre as levas das Terras dos Rios, ameaçando transformar a retirada em debandada geral.

O próprio Aegon combateu a cavalo durante os primeiros minutos para conter o pânico de seus homens, usando Blackfyre para repelir os cavaleiros que avançavam. Mas o momento crítico exigia a arma definitiva de Valíria: com um brado solene, as trombetas dragônicas ecoaram, e três titãs alados subiram juntos aos céus.`,
      internalVoices: [
        {
          atributo: 'furia',
          resultadoPassivo: 'SUCESSO',
          dcPassiva: 8,
          fala: 'O aço não conterá esta maré humana. Subam aos céus e que a fúria dos três dragões se faça ouvir!',
        },
      ],
      loreContext: {
        fonte: {
          arquivo_md: 'fogo-e-sangue_01_a-conquista-de-aegon.md',
          livro: 'Fogo & Sangue - Volume 1',
          capitulo: 'A Conquista de Aegon',
        },
        notaHistorica: 'A carga Gardener quebra as linhas de infantaria antes da intervenção dos dragões.',
      },
      escolhas: [
        {
          id: 'esc_desencadear_campo_de_fogo',
          texto: 'Comandar Balerion, Vhagar e Meraxes para incendiar os trigais e criar o turbilhão de fogo mortal.',
          tipo: 'teste_atributo',
          atributo: 'comando',
          dc: 10,
          riscoMortal: true,
          onSuccessNodeId: 'j1_a3_tres_dragoes_campo_de_fogo',
          onPartialFailureNodeId: 'j1_a3_tres_dragoes_campo_de_fogo',
          onCriticalFailureNodeId: 'j1_a3_morte_campo_de_fogo',
        },
        {
          id: 'esc_furia_pessoal_combate_vanguarda',
          texto: 'Golpear com Blackfyre abrindo espaço na vanguarda antes de erguer Balerion em voo rasante.',
          tipo: 'teste_atributo',
          atributo: 'furia',
          dc: 11,
          riscoMortal: true,
          onSuccessNodeId: 'j1_a3_tres_dragoes_campo_de_fogo',
          onPartialFailureNodeId: 'j1_a3_tres_dragoes_campo_de_fogo',
          onCriticalFailureNodeId: 'j1_a3_morte_campo_de_fogo',
        },
      ],
    },

    // ==========================================
    // CENA 4: OS TRÊS DRAGÕES NO CAMPO DE FOGO
    // ==========================================
    j1_a3_tres_dragoes_campo_de_fogo: {
      id: 'j1_a3_tres_dragoes_campo_de_fogo',
      titulo: 'O Campo de Fogo & O Vôo dos Três Dragões',
      anoHistorico: '2 a.C.',
      localizacao: 'Planícies de Trigo da Campina',
      regionId: 'campina',
      fallbackText: `Esta foi a única vez em toda a Conquista em que Balerion, Vhagar e Meraxes voaram juntos no mesmo céu. Os três dragões mergulharam em formação triangular, cuspindo torrentes ininterruptas de fogo negro, rubro e prateado.

O vento seco da tarde soprou as labaredas diretamente contra os olhos do exército dos Dois Reis. Os campos de trigo e cevada explodiram em uma tempestade de fogo rugindo como fornalhas vivas; a fumaça espessa cegava cavaleiros e cavalos, enquanto as chamas cercavam as tropas inimigas em um anel abrasador sem saída.

Quatro mil homens arderam vivos na planície, incluindo o Rei Mern IX Gardener e todos os seus filhos, netos e sobrinhos. Mais de dez mil sofreram queimaduras graves nos olhos e membros, e outros incontáveis jogaram suas espadas e elmos incandescentes no chão, curvando-se aos prantos na cinza fumegante. O Campo de Fogo estava consumado.`,
      internalVoices: [
        {
          atributo: 'furia',
          resultadoPassivo: 'SUCESSO',
          dcPassiva: 8,
          fala: 'A terra tornou-se um lago de brasas. A maior tropa do continente foi aniquilada em um piscar de olhos.',
        },
        {
          atributo: 'erudicao',
          resultadoPassivo: 'SUCESSO',
          dcPassiva: 9,
          fala: 'A dinastia dos Reis Gardener, que governara desde Garth Mão-Verde por milhares de anos, extinguiu-se para sempre.',
        },
      ],
      loreContext: {
        idVerbete: 'campo_de_fogo',
        fonte: {
          arquivo_md: 'fogo-e-sangue_01_a-conquista-de-aegon.md',
          livro: 'Fogo & Sangue - Volume 1',
          capitulo: 'A Conquista de Aegon',
        },
        notaHistorica: 'Quatro mil homens morrem no Campo de Fogo e a Casa Gardener é extinta.',
      },
      escolhas: [
        {
          id: 'esc_procurar_mern_gardener',
          texto: 'Inspecionar as cinzas do campo de batalha e confirmar a extinção da linhagem dos Gardener.',
          tipo: 'simples',
          nextNodeId: 'j1_a3_fim_casa_gardener',
        },
        {
          id: 'esc_socorrer_feridos_cortesia',
          texto: 'Ordenar aos meistres que apliquem pomadas e socorram os cavaleiros sobreviventes em sinal de misericórdia imperial.',
          tipo: 'teste_atributo',
          atributo: 'cortesia',
          dc: 8,
          onSuccessNodeId: 'j1_a3_fim_casa_gardener',
          onPartialFailureNodeId: 'j1_a3_fim_casa_gardener',
        },
      ],
    },

    // ==========================================
    // CENA 5: MORTE CANÔNICA NO CAMPO DE FOGO
    // ==========================================
    j1_a3_morte_campo_de_fogo: {
      id: 'j1_a3_morte_campo_de_fogo',
      titulo: 'A Queda sob os Cascos do Ocidente',
      anoHistorico: '2 a.C.',
      localizacao: 'Planícies da Campina',
      regionId: 'campina',
      isEnding: true,
      fallbackText: `Durante a fúria inicial da investida da cavalaria inimiga, uma lança pesada de freixo atingiu o flanco desprotegido do rei antes da decolagem dos dragões. Desmontado violentamente, Aegon foi pisoteado pela maré imparável de cinco mil cavaleiros montados.

Apesar do fogo posterior lançado pelas rainhas irmãs, o líder da Conquista pereceu no solo ensanguentado de Westeros.

Sem o Conquistador para guiar os dragões e forjar as leis de um reino unificado, o continente mergulhou em décadas de guerras sangrentas e vingança sem fim.`,
      internalVoices: [
        {
          atributo: 'furia',
          resultadoPassivo: 'FALHA',
          dcPassiva: 12,
          fala: 'A cavalaria rompeu a linha... O sonho da dinastia morreu sob o ferro das espadas do ocidente.',
        },
      ],
      loreContext: {
        fonte: {
          arquivo_md: 'fogo-e-sangue_01_a-conquista-de-aegon.md',
          livro: 'Fogo & Sangue - Volume 1',
          capitulo: 'A Conquista de Aegon',
        },
        notaHistorica: 'Morte prematura no Campo de Fogo por falha crítica.',
      },
      escolhas: [],
    },

    // ==========================================
    // CENA 6: O FIM DA CASA GARDENER
    // ==========================================
    j1_a3_fim_casa_gardener: {
      id: 'j1_a3_fim_casa_gardener',
      titulo: 'As Cinzas dos Reis da Campina',
      anoHistorico: '2 a.C.',
      localizacao: 'Campo de Cinzas da Campina',
      regionId: 'campina',
      fallbackText: `O cheiro de carne queimada, trigo calcinado e couro tostado impregnava o ar a muitas léguas de distância. No centro do círculo de destruição, entre escudos derretidos e carcaças calcinadas de cavalos, os soldados encontraram o corpo carbonizado do Rei Mern IX Gardener.

Ao redor do velho monarca jaziam seus quatro filhos legítimos, seus netos, genros e todos os parentes masculinos com o sangue verde dos primeiros reis da Campina. Nenhuma semente restara da árvore genealógica dos Gardener para reclamar o trono de Jardim de Cima.

Enquanto isso, patrulheiros de Orys Baratheon capturavam nos bosques próximos o outro monarca que fugira das chamas: o Rei Loren I Lannister, coberto de fuligem e cinzas, com a espada quebrada na mão.`,
      internalVoices: [
        {
          atributo: 'erudicao',
          resultadoPassivo: 'SUCESSO',
          dcPassiva: 8,
          fala: 'A coroa de carvalho dourado ardeu junto com seu dono. Agora resta decidir o destino do Senhor do Rochedo.',
        },
      ],
      loreContext: {
        idVerbete: 'gardener',
        fonte: {
          arquivo_md: 'fogo-e-sangue_01_a-conquista-de-aegon.md',
          livro: 'Fogo & Sangue - Volume 1',
          capitulo: 'A Conquista de Aegon',
        },
        notaHistorica: 'A Casa Gardener é declarada extinta após a batalha.',
      },
      escolhas: [
        {
          id: 'esc_julgar_loren_lannister',
          texto: 'Receber a submissão formal de Loren Lannister e conceder-lhe a dignidade de Protetor do Oeste.',
          tipo: 'simples',
          nextNodeId: 'j1_a3_submissao_loren_lannister',
        },
        {
          id: 'esc_coletar_espadas_gardener_comando',
          texto: 'Comandar a coleta de todas as espadas intactas e curvadas no fogo para a forja da futura coroa e trono.',
          tipo: 'teste_atributo',
          atributo: 'comando',
          dc: 8,
          onSuccessNodeId: 'j1_a3_submissao_loren_lannister',
          onPartialFailureNodeId: 'j1_a3_submissao_loren_lannister',
        },
      ],
    },

    // ==========================================
    // CENA 7: A SUBMISSÃO DE LOREN LANNISTER
    // ==========================================
    j1_a3_submissao_loren_lannister: {
      id: 'j1_a3_submissao_loren_lannister',
      titulo: 'O Leão Ajoelhado & O Rochedo Casterly',
      anoHistorico: '2 a.C.',
      localizacao: 'Acampamento da Água Negra',
      regionId: 'ocidente',
      fallbackText: `O Rei Loren I Lannister foi conduzido à presença de Aegon I com as mãos amarradas com cordas de cânhamo. Reconhecendo a derrota total de seu exército e a loucura de qualquer desafio ulterior ao fogo dos três dragões, o soberano de Rochedo Casterly dobrou ambos os joelhos na poeira diante do conquistador.

Aegon desembainhou Blackfyre e cortou as cordas que prendiam os pulsos de Loren. Ergueu o senhor do ocidente pelos ombros e proferiu a sentença magnânima:

"Vós entrastes nesta batalha como rei soberano, mas sairás dela como vassalo juramentado. Em troca de vossa vida e do ouro do Rochedo Casterly para a coroa, eu vos mantenho como Lorde de Rochedo Casterly e vos nomeio Protetor do Oeste."

Loren beijou a mão de Aegon em gratidão por manter suas terras ancestrais e ordenou que todos os cavaleiros das Terras Ocidentais depusessem suas espadas aos pés do Trono de Ferro.`,
      internalVoices: [
        {
          atributo: 'cortesia',
          resultadoPassivo: 'SUCESSO',
          dcPassiva: 7,
          fala: 'Um leão humilhado, mas salvo da fornalha. Ouro e exércitos ocidentais agora enriquecerão vosso império.',
        },
        {
          atributo: 'astucia',
          resultadoPassivo: 'SUCESSO',
          dcPassiva: 8,
          fala: 'Poupá-lo foi o golpe de mestre: Rochedo Casterly é inexpugnável por armas comuns, mas entregou suas chaves sem cerco.',
        },
      ],
      loreContext: {
        idVerbete: 'lannister',
        fonte: {
          arquivo_md: 'fogo-e-sangue_01_a-conquista-de-aegon.md',
          livro: 'Fogo & Sangue - Volume 1',
          capitulo: 'A Conquista de Aegon',
        },
        notaHistorica: 'Loren I Lannister ajoelha-se e é confirmado Lorde de Rochedo Casterly.',
      },
      escolhas: [
        {
          id: 'esc_marchar_jardim_de_cima',
          texto: 'Marchar imediatamente com o exército vitorioso até Jardim de Cima para resolver a sucessão da Campina.',
          tipo: 'simples',
          nextNodeId: 'j1_a3_rendicao_jardim_de_cima',
        },
        {
          id: 'esc_exigir_refens_ocidente_comando',
          texto: 'Exigir filhos de lordes ocidentais como pajens em Pedra do Dragão para garantir a lealdade do Rochedo.',
          tipo: 'teste_atributo',
          atributo: 'comando',
          dc: 10,
          onSuccessNodeId: 'j1_a3_rendicao_jardim_de_cima',
          onPartialFailureNodeId: 'j1_a3_rendicao_jardim_de_cima',
        },
      ],
    },

    // ==========================================
    // CENA 8: A RENDIÇÃO DE JARDIM DE CIMA E TYRELL
    // ==========================================
    j1_a3_rendicao_jardim_de_cima: {
      id: 'j1_a3_rendicao_jardim_de_cima',
      titulo: 'As Chaves de Jardim de Cima & A Sucessão da Campina',
      anoHistorico: '2 a.C.',
      localizacao: 'Jardim de Cima',
      regionId: 'campina',
      fallbackText: `As muralhas brancas e os jardins perfumados de Jardim de Cima, capital da Campina às margens do idílico Rio Mander, aguardavam a chegada dos dragões com medo paralisante. Sem um único membro sobrevivente da Casa Gardener para liderar a defesa, o castelo caíra nas mãos do intendente-mor: Harlen Tyrell.

Ao ver a sombra imensa de Balerion surgir no horizonte, Harlen não hesitou. Ordenou que as portas colossais fossem abertas de par em par, instruiu seus guardas a deporem as armas e caminhou a pé até Aegon trazendo em almofadas de veludo as chaves de ouro de todas as torres da fortaleza.

Porém, nas antessalas do castelo, emissários da Casa Florent de Fortaleza de Águas Claras clamavam pelo sangue de Garth Mão-Verde, argumentando que a linhagem dos Gardener pertencia a eles por direito hereditário, e não a um simples intendente.`,
      internalVoices: [
        {
          atributo: 'cortesia',
          resultadoPassivo: 'SUCESSO',
          dcPassiva: 7,
          fala: 'Harlen Tyrell sabe quando curvar o pescoço. Jardim de Cima florescerá sob a lealdade inabalável dos novos lordes.',
        },
        {
          atributo: 'erudicao',
          resultadoPassivo: 'SUCESSO',
          dcPassiva: 8,
          fala: 'Os Florent reclamam sangue mais próximo de Garth Mão-Verde, mas os dragões recompensam a obediência, não a linhagem.',
        },
      ],
      loreContext: {
        idVerbete: 'tyrell',
        fonte: {
          arquivo_md: 'fogo-e-sangue_01_a-conquista-de-aegon.md',
          livro: 'Fogo & Sangue - Volume 1',
          capitulo: 'A Conquista de Aegon',
        },
        notaHistorica: 'Harlen Tyrell entrega Jardim de Cima e é nomeado Protetor do Sul.',
      },
      escolhas: [
        {
          id: 'esc_nomear_harlen_tyrell_canonico',
          texto: 'Nomear Harlen Tyrell Senhor Supremo do Mander e Protetor do Sul (Caminho Canônico).',
          tipo: 'simples',
          nextNodeId: 'j1_a3_lobo_no_tridente',
        },
        {
          id: 'esc_nomear_florent_campina_whatif',
          texto: 'Atender à reivindicação de sangue ancestral da Casa Florent, nomeando-os governantes da Campina.',
          tipo: 'teste_atributo',
          atributo: 'cortesia',
          dc: 11,
          onSuccessNodeId: 'j1_a3_lobo_no_tridente',
          onPartialFailureNodeId: 'j1_a3_lobo_no_tridente',
        },
        {
          id: 'esc_dividir_governo_campina_astucia',
          texto: 'Manter Jardim de Cima com Tyrell, mas conceder privilégios fiscais aos Florent para conter rebeliões futuras.',
          tipo: 'teste_atributo',
          atributo: 'astucia',
          dc: 10,
          onSuccessNodeId: 'j1_a3_lobo_no_tridente',
          onPartialFailureNodeId: 'j1_a3_lobo_no_tridente',
        },
      ],
    },

    // ==========================================
    // CENA 9: O LOBO NO TRIDENTE
    // ==========================================
    j1_a3_lobo_no_tridente: {
      id: 'j1_a3_lobo_no_tridente',
      titulo: 'O Lobo no Tridente & O Exército de Winterfell',
      anoHistorico: '2 a.C.',
      localizacao: 'Margens do Rio Tridente',
      regionId: 'norte',
      fallbackText: `Enquanto o sul ardia, o Rei do Norte, Torrhen Stark, completara a marcha titânica através do Gargalo. Trinta mil ferozes guerreiros nortenhos — barbudos, vestidos com pesadas peles de urso e armaduras de malha de ferro — acamparam na margem setentrional do Rio Tridente.

Ao longo do rio, centenas de estandartes cinzentos com o lobo gigante em campo de neve batiam com o vento gelado. Os homens do Norte sopravam seus chifres de guerra nas madrugadas nevoentas, ansiosos para banhar suas lâminas no sangue valiriano e lavar a desonra dos reis sulistas que haviam se ajoelhado.

Porém, quando os batedores nortenhos subiram as colinas, avistaram as forças de Aegon reunidas na margem sul: mais de cinquenta mil combatentes da Campina, do Ocidente e dos Rios, com os três dragões adultos rondando as nuvens. O rio era tudo o que separava os dois exércitos da carnificina final.`,
      internalVoices: [
        {
          atributo: 'comando',
          resultadoPassivo: 'SUCESSO',
          dcPassiva: 8,
          fala: 'Trinta mil nortenhos determinados a morrer. Se travar batalha, o Tridente correrá vermelho por meses.',
        },
        {
          atributo: 'pressagio',
          resultadoPassivo: 'SUCESSO',
          dcPassiva: 9,
          fala: 'O Inverno está chegando. O sangue do Norte não deve arder nas margens do Tridente se puder ser ganho com palavras.',
        },
      ],
      loreContext: {
        idVerbete: 'stark',
        fonte: {
          arquivo_md: 'fogo-e-sangue_01_a-conquista-de-aegon.md',
          livro: 'Fogo & Sangue - Volume 1',
          capitulo: 'A Conquista de Aegon',
        },
        notaHistorica: 'Torrhen Stark desce com 30.000 homens ao Tridente.',
      },
      escolhas: [
        {
          id: 'esc_vigilia_conspiracao_brandon',
          texto: 'Manter sentinelas alertas na névoa noturna do Tridente e investigar rumores de uma trama secreta dos nortenhos.',
          tipo: 'simples',
          nextNodeId: 'j1_a3_conspiracao_brandon_snow',
        },
        {
          id: 'esc_enviar_parlamentares_tridente',
          texto: 'Enviar meistres e arautos com mensagens de honra para convidar Torrhen Stark a um parlamento pacífico.',
          tipo: 'teste_atributo',
          atributo: 'cortesia',
          dc: 10,
          onSuccessNodeId: 'j1_a3_o_rei_que_se_ajoelhou',
          onPartialFailureNodeId: 'j1_a3_conspiracao_brandon_snow',
        },
        {
          id: 'esc_demonstrar_poder_aereo_furia',
          texto: 'Fazer Balerion sobrevoar o acampamento de Winterfell cuspindo fogo nas nuvens para abalar a moral dos soldados.',
          tipo: 'teste_atributo',
          atributo: 'furia',
          dc: 11,
          onSuccessNodeId: 'j1_a3_conspiracao_brandon_snow',
          onPartialFailureNodeId: 'j1_a3_conspiracao_brandon_snow',
        },
      ],
    },

    // ==========================================
    // CENA 10: A CONSPIRAÇÃO DE BRANDON SNOW
    // ==========================================
    j1_a3_conspiracao_brandon_snow: {
      id: 'j1_a3_conspiracao_brandon_snow',
      titulo: 'As Flechas de Represeiro & O Plano de Brandon Snow',
      anoHistorico: '2 a.C.',
      localizacao: 'Acampamento Nortenho & Névoa do Rio',
      regionId: 'norte',
      fallbackText: `Na calada da noite anterior à batalha decisiva, na tenda de campanha de Winterfell iluminada por archotes fumaçantes, o irmão bastardo de Torrhen Stark, Brandon Snow, reuniu três flechas artesanais esculpidas no cerne de madeira branca de represeiro com pontas de obsidiana.

"Senhor irmão", sussurrou o bastardo diante de Torrhen, "deixe-me atravessar o rio a nado na névoa antes da aurora. Conheço os hábitos dos répteis e o coração das feras. Três flechas de represeiro direto nos olhos dos três monstros adormecidos, e o dragão estará morto antes do raiar do sol."

Do outro lado do rio, as sentinelas reais sentiram o peso de um presságio tenebroso na brisa fria. Aegon precisava decidir: interceptar os emissários na névoa com diplomacia irrefutável ou preparar as lâminas para um choque noturno mortal contra os caçadores do Norte.`,
      internalVoices: [
        {
          atributo: 'pressagio',
          resultadoPassivo: 'SUCESSO',
          dcPassiva: 9,
          fala: 'A madeira dos deuses antigos guarda feitiçaria antiga. Uma flecha nos olhos de um dragão adormecido pode custar a vida de um deus.',
        },
        {
          atributo: 'astucia',
          resultadoPassivo: 'SUCESSO',
          dcPassiva: 9,
          fala: 'Interceptem o bastardo ou convençam Torrhen de que seu povo perecerá como os Gardener se o plano falhar.',
        },
      ],
      loreContext: {
        fonte: {
          arquivo_md: 'fogo-e-sangue_01_a-conquista-de-aegon.md',
          livro: 'Fogo & Sangue - Volume 1',
          capitulo: 'A Conquista de Aegon',
        },
        notaHistorica: 'Brandon Snow propõe matar os dragões durante a noite com flechas de represeiro.',
      },
      escolhas: [
        {
          id: 'esc_parlamentar_noite_tridente',
          texto: 'Enviar meistres pela névoa com relatos fidedignos de Harrenhal e do Campo de Fogo para demover Torrhen da loucura.',
          tipo: 'teste_atributo',
          atributo: 'cortesia',
          dc: 10,
          onSuccessNodeId: 'j1_a3_o_rei_que_se_ajoelhou',
          onPartialFailureNodeId: 'j1_a3_emboscada_noturna_brandon',
        },
        {
          id: 'esc_vigilancia_combate_brandon',
          texto: 'Montar emboscada pessoalmente nas margens enevoadas para capturar Brandon Snow com Blackfyre.',
          tipo: 'teste_atributo',
          atributo: 'astucia',
          dc: 11,
          riscoMortal: true,
          onSuccessNodeId: 'j1_a3_o_rei_que_se_ajoelhou',
          onPartialFailureNodeId: 'j1_a3_emboscada_noturna_brandon',
          onCriticalFailureNodeId: 'j1_a3_morte_flecha_represeiro',
        },
        {
          id: 'esc_desafiar_batalha_tridente_furia',
          texto: 'Rejeitar negociações noturnas e ordenar que as trombetas soem para a Batalha do Tridente ao amanhecer.',
          tipo: 'teste_atributo',
          atributo: 'furia',
          dc: 11,
          onSuccessNodeId: 'j1_a3_emboscada_noturna_brandon',
          onPartialFailureNodeId: 'j1_a3_emboscada_noturna_brandon',
        },
      ],
    },

    // ==========================================
    // CENA 11: EMBOSCADA NOTURNA DE BRANDON SNOW
    // ==========================================
    j1_a3_emboscada_noturna_brandon: {
      id: 'j1_a3_emboscada_noturna_brandon',
      titulo: 'O Choque na Névoa do Tridente',
      anoHistorico: '2 a.C.',
      localizacao: 'Águas Rasas do Rio Tridente',
      regionId: 'norte',
      fallbackText: `Entre os juncos altos e as águas geladas do Tridente, as sombras de Brandon Snow e seus três caçadores das montanhas foram descobertas pelos guardas valirianos. O som de aço contra ferro quebrou o silêncio da noite quando as espadas se chocaram no lodo.

Brandon lutou com a destreza selvagem dos lobos do Norte, cravando uma adaga de obsidiana no escudo do capitão real antes de ser cercado pelas lanças da corte. O próprio Aegon interveio antes do golpe fatal, desarmando o bastardo sem derramar seu sangue.

"Seu rei mandou você morrer nas águas, ou você veio por própria vontade?", indagou Aegon. Levado à presença de Torrhen Stark com vida e honra preservada, o episódio convenceu o Rei do Norte de que a magnanimidade dos Targaryen era tão real quanto a força de seus dragões.`,
      internalVoices: [
        {
          atributo: 'cortesia',
          resultadoPassivo: 'SUCESSO',
          dcPassiva: 8,
          fala: 'Poupou o sangue do irmão bastardo. Torrhen Stark reconhecerá a grandeza da vossa alma.',
        },
      ],
      loreContext: {
        fonte: {
          arquivo_md: 'fogo-e-sangue_01_a-conquista-de-aegon.md',
          livro: 'Fogo & Sangue - Volume 1',
          capitulo: 'A Conquista de Aegon',
        },
      },
      escolhas: [
        {
          id: 'esc_conduzir_parlamento_solene',
          texto: 'Conduzir Torrhen Stark ao centro da ponte de barcas para a cerimônia solene de submissão do Norte.',
          tipo: 'simples',
          nextNodeId: 'j1_a3_o_rei_que_se_ajoelhou',
        },
        {
          id: 'esc_exigir_flechas_represeiro_erudicao',
          texto: 'Guardar as três flechas de represeiro como relíquia sagrada na corte para estudar os mistérios do Norte.',
          tipo: 'teste_atributo',
          atributo: 'erudicao',
          dc: 8,
          onSuccessNodeId: 'j1_a3_o_rei_que_se_ajoelhou',
          onPartialFailureNodeId: 'j1_a3_o_rei_que_se_ajoelhou',
        },
      ],
    },

    // ==========================================
    // CENA 12: MORTE FATAL POR FLECHA DE REPRESEIRO
    // ==========================================
    j1_a3_morte_flecha_represeiro: {
      id: 'j1_a3_morte_flecha_represeiro',
      titulo: 'A Flecha Negra na Névoa do Norte',
      anoHistorico: '2 a.C.',
      localizacao: 'Margens do Rio Tridente',
      regionId: 'norte',
      isEnding: true,
      fallbackText: `A névoa fria escondeu com perfeição o arqueiro dos deuses antigos. Da escuridão dos juncos, o arco curvado de represeiro zuniu no silêncio da noite, e uma flecha afiada de obsidiana atravessou a garganta do rei antes que qualquer aviso pudesse ser gritado.

O Dragão caiu de joelhos na água rasa do Tridente, enquanto o pânico tomava conta do acampamento real. A magia antiga dos Primeiros Homens e dos Filhos da Floresta cobrou o tributo definitivo sobre a linhagem valiriana.

O Norte permaneceu livre e indomável atrás de suas neves eternas, mas a promessa de um império unificado foi engolida para sempre pelas águas do Tridente.`,
      internalVoices: [
        {
          atributo: 'pressagio',
          resultadoPassivo: 'FALHA',
          dcPassiva: 12,
          fala: 'Os velhos deuses vigiavam na névoa... A flecha de madeira branca selou o destino dos reis.',
        },
      ],
      loreContext: {
        fonte: {
          arquivo_md: 'fogo-e-sangue_01_a-conquista-de-aegon.md',
          livro: 'Fogo & Sangue - Volume 1',
          capitulo: 'A Conquista de Aegon',
        },
        notaHistorica: 'Morte trágica por emboscada noturna no Tridente.',
      },
      escolhas: [],
    },

    // ==========================================
    // CENA 13: O REI QUE SE AJOELHOU
    // ==========================================
    j1_a3_o_rei_que_se_ajoelhou: {
      id: 'j1_a3_o_rei_que_se_ajoelhou',
      titulo: 'O Rei que se Ajoelhou & A Paz no Tridente',
      anoHistorico: '2 a.C.',
      localizacao: 'Margens do Rio Tridente',
      regionId: 'norte',
      fallbackText: `Ao raiar do dia seguinte, sob uma névoa diáfana que se dissipava com a luz dourada do sol, o Rei Torrhen Stark cruzou o Rio Tridente escoltado por seus meistres e pelos lordes Umber, Karstark, Bolton e Glover.

Diante de seu exército e perante as hostes reunidas do Conquistador, Torrhen contemplou o tamanho titânico de Balerion pousado na relva, a fumaça de Harrenhal ainda fresca na memória do continente e a ruína da Casa Gardener. O senhor de Winterfell compreendeu que a bravura cega condenaria trinta mil jovens valorosos à fornalha dos dragões.

Com dignidade régia incomparável, Torrhen despiu a antiga coroa de bronze entalhada com as runas dos Primeiros Homens e cravada com espadas de ferro dos Reis do Inverno. Ele se ajoelhou sobre a lama verdejante, depositou a coroa aos pés de Aegon e jurou lealdade eterna. Aegon o ergueu com ambas as mãos, aclamando-o Lorde de Winterfell e primeiro Protetor do Norte. Naquele dia, nenhum homem morreu, e Torrhen Stark tornou-se para sempre *O Rei que se Ajoelhou*.`,
      internalVoices: [
        {
          atributo: 'cortesia',
          resultadoPassivo: 'SUCESSO',
          dcPassiva: 7,
          fala: 'Foi preciso mais coragem para ajoelhar e salvar trinta mil vidas do que para morrer em chamas inúteis.',
        },
        {
          atributo: 'cortesia',
          resultadoPassivo: 'SUCESSO',
          dcPassiva: 8,
          fala: 'O Norte foi conquistado sem uma única gota de sangue derramada. Esta foi a maior vitória de toda a campanha.',
        },
      ],
      loreContext: {
        idVerbete: 'torrhen_stark',
        fonte: {
          arquivo_md: 'fogo-e-sangue_01_a-conquista-de-aegon.md',
          livro: 'Fogo & Sangue - Volume 1',
          capitulo: 'A Conquista de Aegon',
        },
        notaHistorica: 'Torrhen Stark ajoelha-se no Tridente, poupando seu exército e tornando-se Protetor do Norte.',
      },
      escolhas: [
        {
          id: 'esc_voar_ninho_da_aguia_canonico',
          texto: 'Aceitar o joelho dobrado de Torrhen em paz e acompanhar a Rainha Visenya no vôo ao Ninho da Águia.',
          tipo: 'simples',
          nextNodeId: 'j1_a3_ninho_da_aguia_ronnel',
        },
        {
          id: 'esc_exigir_refens_stark_comando',
          texto: 'Exigir que Brandon Snow e filhos de lordes nortenhos venham à corte como protegidos de honra.',
          tipo: 'teste_atributo',
          atributo: 'comando',
          dc: 10,
          onSuccessNodeId: 'j1_a3_ninho_da_aguia_ronnel',
          onPartialFailureNodeId: 'j1_a3_ninho_da_aguia_ronnel',
        },
        {
          id: 'esc_pacto_norte_sangue_antigo',
          texto: 'Propor um juramento secreto sob o represeiro de Correrrio selando o respeito mútuo aos Deuses Antigos.',
          tipo: 'teste_atributo',
          atributo: 'erudicao',
          dc: 9,
          onSuccessNodeId: 'j1_a3_ninho_da_aguia_ronnel',
          onPartialFailureNodeId: 'j1_a3_ninho_da_aguia_ronnel',
        },
      ],
    },

    // ==========================================
    // CENA 14: AS ASAS NO NINHO DA ÁGUIA
    // ==========================================
    j1_a3_ninho_da_aguia_ronnel: {
      id: 'j1_a3_ninho_da_aguia_ronnel',
      titulo: 'As Asas no Ninho da Águia & O Vôo do Menino Rei',
      anoHistorico: '2 a.C.',
      localizacao: 'O Ninho da Águia & Montanhas da Lua',
      regionId: 'vale',
      fallbackText: `Enquanto os exércitos marchavam pelas planícies, a Rainha Regente Sharra Arryn fortalecera o formidável Portão Sangrento com arqueiros, besteiros e catapultas, convencida de que nenhuma hoste na terra jamais penetraria no Vale de Arryn. O Ninho da Águia, empoleirado no topo da Lança do Gigante, era considerado inexpugnável por deuses e homens.

Porém, as montanhas não são barreira para quem cavalga dragões. A Rainha Visenya montou Vhagar, sobrevoou o Portão Sangrento milhares de metros acima das flechas inimigas e pousou com suavidade no pátio interno empedrado do castelo das alturas.

Quando a Rainha Sharra e seus guardas correram ao pátio com espadas desembainhadas, paralisaram aterrorizados: o pequeno Rei Ronnel Arryn estava sentado no colo de Visenya, acariciando com fascínio infantil as escamas de bronze e verde de Vhagar. O menino olhou para sua mãe e perguntou: "Mãe, posso voar no dragão com a senhora?". Sharra mandou trazer as três coroas do Vale e as entregou sem resistência. Visenya cumpriu a promessa: deu três voltas triunfais com o pequeno lorde ao redor do pico da Lança do Gigante. O Vale rendeu-se pacificamente ao Dragão.`,
      internalVoices: [
        {
          atributo: 'cortesia',
          resultadoPassivo: 'SUCESSO',
          dcPassiva: 7,
          fala: 'Sem cerco, sem catapultas, sem uma gota de sangue derramada. O Ninho da Águia caiu com um vôo de dragão e o sorriso de uma criança.',
        },
        {
          atributo: 'astucia',
          resultadoPassivo: 'SUCESSO',
          dcPassiva: 8,
          fala: 'Visenya conquistou com ousadia o que exércitos de cem mil homens jamais conseguiriam escalar.',
        },
      ],
      loreContext: {
        idVerbete: 'arryn',
        fonte: {
          arquivo_md: 'fogo-e-sangue_01_a-conquista-de-aegon.md',
          livro: 'Fogo & Sangue - Volume 1',
          capitulo: 'A Conquista de Aegon',
        },
        notaHistorica: 'Visenya pousa no Ninho da Águia e Ronnel Arryn voa em Vhagar, selando a paz.',
      },
      escolhas: [
        {
          id: 'esc_forjar_trono_de_ferro_porto_real',
          texto: 'Transportar as mil espadas para o Forte de Aegon e fundar a capital em Porto Real com o Trono de Ferro.',
          tipo: 'simples',
          nextNodeId: 'j1_a3_epilogo_trono_ferro',
        },
        {
          id: 'esc_visenya_guarnecer_vale_comando',
          texto: 'Deixar Vhagar e uma corte de cavaleiros honrados instruindo o jovem Ronnel Arryn na falcoaria e na lealdade.',
          tipo: 'teste_atributo',
          atributo: 'comando',
          dc: 9,
          onSuccessNodeId: 'j1_a3_epilogo_trono_ferro',
          onPartialFailureNodeId: 'j1_a3_epilogo_trono_ferro',
        },
      ],
    },

    // ==========================================
    // CENA 15: O FORJAMENTO DO TRONO DE FERRO & A CAPITAL
    // ==========================================
    j1_a3_epilogo_trono_ferro: {
      id: 'j1_a3_epilogo_trono_ferro',
      titulo: 'O Sopro de Balerion & O Trono de Ferro',
      anoHistorico: '1 a.C. - 1 d.C.',
      localizacao: 'Forte de Aegon & Três Colinas',
      regionId: 'pedra_dragao',
      fallbackText: `Carroças sem fim abarrotadas de ferro, aço e bronze convergiam para a colina mais alta da foz da Água Negra: as espadas recolhidas dos cavaleiros caídos no Campo de Fogo, as lâminas dos homens de ferro de Harrenhal, as espadas do Vale, do Tridente e das Terras da Tempestade. Eram mais de mil espadas curvadas, quebradas, ensanguentadas e rendidas.

No grande pátio do Forte de Aegon, Balerion cuspiu suas labaredas negras dia e noite. Sob o calor vulcânico do Terror Negro, as lâminas se fundiram e retorceram em uma massa colossal de aço negro, arestas vivas e pontas denteadas.

Nenhum rei deveria sentar-se confortavelmente em seu posto, declarou Aegon. O Trono de Ferro nasceu como uma besta imensa de lâminas entrelaçadas, pronta para cortar qualquer soberano descuidado que se apoiasse na soberba. O símbolo de um continente unido estava forjado no fogo e no sangue. Restava agora a sagração final em Vilavelha diante dos deuses e dos meistres.`,
      internalVoices: [
        {
          atributo: 'comando',
          resultadoPassivo: 'SUCESSO',
          dcPassiva: 7,
          fala: 'O Trono não é para conforto, mas para dever e justiça. Quem sangrar no assento lembrará do custo do reino.',
        },
        {
          atributo: 'erudicao',
          resultadoPassivo: 'SUCESSO',
          dcPassiva: 8,
          fala: 'As mil lâminas dos inimigos subjugados sustentam agora a coluna vertebral de toda a civilização de Westeros.',
        },
      ],
      loreContext: {
        idVerbete: 'trono_de_ferro',
        fonte: {
          arquivo_md: 'fogo-e-sangue_01_a-conquista-de-aegon.md',
          livro: 'Fogo & Sangue - Volume 1',
          capitulo: 'A Conquista de Aegon',
        },
        notaHistorica: 'Balerion funde as espadas dos derrotados para forjar o Trono de Ferro.',
      },
      escolhas: [
        {
          id: 'esc_coroacao_vilavelha_canonico',
          texto: 'Marchar até Vilavelha para receber a unção sagrada do Alto Septão, mantendo Porto Real como sede da coroa.',
          tipo: 'simples',
          nextNodeId: 'j1_a3_vitoria_conquista',
        },
        {
          id: 'esc_estabelecer_capital_vilavelha_whatif',
          texto: 'Atender à petição dos Hightower e da Fé para transferir a capital imperial permanente para Vilavelha.',
          tipo: 'teste_atributo',
          atributo: 'cortesia',
          dc: 11,
          onSuccessNodeId: 'j1_a3_vitoria_conquista',
          onPartialFailureNodeId: 'j1_a3_vitoria_conquista',
        },
      ],
    },

    // ==========================================
    // CENA 16: A UNÇÃO EM VILAVELHA (TRANSIÇÃO PARA ATO 4)
    // ==========================================
    j1_a3_vitoria_conquista: {
      id: 'j1_a3_vitoria_conquista',
      isEnding: true,
      titulo: 'A Unção em Vilavelha & O Nascimento dos Sete Reinos',
      anoHistorico: '1 d.C.',
      localizacao: 'Septo Estrelado & Vilavelha',
      regionId: 'campina',
      fallbackText: `As portas monumentais de Vilavelha, a mais antiga e esplêndida cidade do mundo ocidental, abriram-se sem um único disparo de besta. Lorde Manfred Hightower, aconselhado pela visão dos Sete Deuses no Septo Estrelado de que a cidade arderia se resistisse, acolheu o Conquistador com cortejo e taças de vinho dourado.

No ápice do Septo Estrelado, sob a bênção sagrada dos Sete e perante centenas de meistres da Cidadela e lordes de todo o continente, o Alto Septão ungiu a fronte de Aegon I com os sete óleos sagrados e depositou sobre suas têmporas a coroa de ouro e rubis.

"Aegon da Casa Targaryen", entoou a voz venerável que ecoou pelos séculos, "Primeiro de Seu Nome, Rei de Toda a Westeros e Protetor do Reino."

A maior parte do continente estava unida, mas as sombras ainda persistiam: nas Ilhas de Ferro, pretendentes afogados guerreavam entre si, e ao sul das Montanhas Vermelhas, os dorneses recusavam-se a dobrar os joelhos. O Ato IV e o teste de fogo nas areias de Dorne começam agora!`,
      internalVoices: [
        {
          atributo: 'pressagio',
          resultadoPassivo: 'SUCESSO',
          dcPassiva: 7,
          fala: 'O sonho de Daenys a Sonhadora cumpriu-se. Mas enquanto as areias de Dorne e as ondas de Pyke não se curvarem, a coroa não terá descanso.',
        },
        {
          atributo: 'comando',
          resultadoPassivo: 'SUCESSO',
          dcPassiva: 8,
          fala: 'A unção foi feita. Agora é hora de pacificar os homens de ferro e enfrentar o Sol Insubmisso de Dorne.',
        },
      ],
      loreContext: {
        idVerbete: 'aegon_o_conquistador',
        fonte: {
          arquivo_md: 'fogo-e-sangue_01_a-conquista-de-aegon.md',
          livro: 'Fogo & Sangue - Volume 1',
          capitulo: 'A Conquista de Aegon',
        },
        notaHistorica: 'O Alto Septão unge Aegon em Vilavelha, marcando o Ano 1 d.C.',
      },
      escolhas: [],
    },
  },
};

export function obterNodeAto3(nodeId: string): NodeJornada | undefined {
  return grafoAto3.nodes[nodeId];
}
