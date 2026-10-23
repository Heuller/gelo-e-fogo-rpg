import 'server-only';
import { GrafoJornada, NodeJornada } from '@/server/engine/storyLinter';

export const grafoJ2Ato4: GrafoJornada = {
  id: 'jornada_2_danca_ato4',
  titulo: 'Ato 4: Segunda Batalha de Tumbleton, Pedra do Dragão, A Hora do Lobo e os 6 Finais',
  startNodeId: 'j2_a4_segunda_tumbleton_ataque_noturno',
  nodes: {
    // 1. Segunda Batalha de Tumbleton
    j2_a4_segunda_tumbleton_ataque_noturno: {
      id: 'j2_a4_segunda_tumbleton_ataque_noturno',
      titulo: 'A Redenção de Addam Velaryon na Segunda Batalha de Tumbleton',
      anoHistorico: '130 d.C.',
      localizacao: 'Tumbleton',
      regionId: 'campina',
      fallbackText: `Determinado a provar que nem todos os bastardos eram traidores, Sor Addam Velaryon voou em Fumaresia sob o manto da noite com quatro mil soldados dos Senhores dos Rios.
      
O ataque surpresa foi devastador: as tendas dos Verdes arderam enquanto dormiam embriagados. Hugh Martelo foi morto por Sor Jon Roxton com a espada valiriana Fazedora de Órfãos. Vermithor acordou em fúria cega, colidindo contra Fumaresia e Tessarion num combate terrestre brutal onde os três dragões morreram entre dentes e garras. No túmulo de Addam, Lorde Corlys mandou esculpir apenas uma palavra: LEAL.`,
      internalVoices: [
        {
          atributo: 'comando',
          resultadoPassivo: 'SUCESSO',
          dcPassiva: 11,
          fala: 'O exército dos Verdes que ameaçava marchar sobre Porto Real foi aniquilado. Mas onde estão Aegon II e Rhaenyra?',
        },
      ],      loreContext: {
        fonte: {
          arquivo_md: 'corpus_md/jornada_2_danca/fogo-e-sangue_07_morte-dos-dragoes-breve-triste-reinado-aegon-ii.md',
          livro: 'Fogo & Sangue - Volume 1',
          capitulo: 'A Morte dos Dragões - Breve e Triste Reinado de Aegon II',
        },
        notaHistorica: 'Fogo & Sangue (George R. R. Martin)',
      },

      escolhas: [
        {
          id: 'esc_j2_a4_rumar_pedra_dragao_imediato',
          texto: 'Navegar com a guarda de honra para Pedra do Dragão ao encontro da Rainha Rhaenyra.',
          tipo: 'simples',
          nextNodeId: 'j2_a4_emboscada_pedra_dragao_aegon_ii',
        },
        {
          id: 'esc_j2_a4_marchar_porto_real_ordem',
          texto: 'Avançar para Porto Real para restabelecer a ordem e libertar Lorde Corlys Velaryon.',
          tipo: 'simples',
          nextNodeId: 'j2_a4_batalha_estrada_do_rei',
        },

        {
          id: 'esc_tumbleton2_sacrificio_addam',
          texto: 'Reconhecer que Addam provou ser leal até a última gota de sangue valiriano ao lado de Fumarescente.',
          tipo: 'simples',
          aprovacaoCompanheiros: { corlys: 30 },
          delta: { flagsAdicionadas: ['lealdade_addam_imortalizada'], compostura: 2 },
          nextNodeId: 'j2_a4_batalha_estrada_do_rei',
        },
        {
          id: 'esc_tumbleton2_recuo_disciplinado',
          texto: 'Reagrupar a infantaria ribeirinha sobrevivente para marchar em socorro das vanguardas nortenhas.',
          tipo: 'simples',
          aprovacaoCompanheiros: { corlys: 20 },
          delta: { compostura: 1 },
          nextNodeId: 'j2_a4_batalha_estrada_do_rei',
        }
      ],
    },

    // 2. A Emboscada em Pedra do Dragão
    j2_a4_emboscada_pedra_dragao_aegon_ii: {
      id: 'j2_a4_emboscada_pedra_dragao_aegon_ii',
      titulo: 'A Traição de Broome & O Encontro dos Dois Monarcas',
      anoHistorico: '130 d.C.',
      localizacao: 'Portões de Pedra do Dragão',
      regionId: 'pedra_dragao',
      fallbackText: `Rhaenyra desembarcou exausta nas praias de sua ilha natal, esperando refúgio seguro. Mas Sor Alfred Broome traíra a guarnição: os homens de armas dos Pretos haviam sido degolados na noite anterior.
      
Nos pátios internos, o mutilado Rei Aegon II aguardava sentado com sua bengala, enquanto Sunfyre — sem uma das asas e coberto de crostas de queimadura — rastejava das sombras fumegantes.
— Querida irmã — zombou Aegon. — Pensei que estivésseis na capital.
— Caro irmão — respondeu Rhaenyra com altivez imperial. — Eu esperava que estivésseis morto.`,
      internalVoices: [
        {
          atributo: 'astucia',
          resultadoPassivo: 'SUCESSO',
          dcPassiva: 11,
          fala: 'Broome está com a guarda baixa. Se atacardes o flanco antes que Sunfyre respire fundo, podereis salvar a rainha!',
        },
        {
          atributo: 'pressagio',
          resultadoPassivo: 'SUCESSO',
          dcPassiva: 12,
          fala: 'O cheiro de carne queimada impregna a brisa. O destino histórico de Rhaenyra está suspenso por um fio de espada.',
        },
      ],      loreContext: {
        fonte: {
          arquivo_md: 'corpus_md/jornada_2_danca/fogo-e-sangue_07_morte-dos-dragoes-breve-triste-reinado-aegon-ii.md',
          livro: 'Fogo & Sangue - Volume 1',
          capitulo: 'A Morte dos Dragões - Breve e Triste Reinado de Aegon II',
        },
        notaHistorica: 'Fogo & Sangue (George R. R. Martin)',
      },

      escolhas: [
        {
          id: 'esc_j2_a4_desmascarar_e_salvar_rhaenyra',
          texto: 'Desembainhar a lâmina e decapitar Alfred Broome, dando fuga imediata à Rainha Rhaenyra!',
          tipo: 'teste_atributo',
          atributo: 'furia',
          dc: 13,
          onSuccessNodeId: 'j2_a4_whatif_rhaenyra_salva',
          onPartialFailureNodeId: 'j2_a4_morte_canonica_rhaenyra_sunfyre',
          onCriticalFailureNodeId: 'j2_a4_morte_devorado_sunfyre',
          riscoMortal: true,
        },
        {
          id: 'esc_j2_a4_deixar_canone_acontecer',
          texto: 'Permanecer impotente perante os besteiros enquanto Sunfyre executa a ordem régia (Cânone).',
          tipo: 'simples',
          nextNodeId: 'j2_a4_morte_canonica_rhaenyra_sunfyre',
        },
      
        {
          id: 'esc_j2_a4_atacar_sunfyre_ferido',
          texto: 'Lançar virotes de balista nos ferimentos abertos de Sunfyre para repelir o rei usurpador!',
          tipo: 'teste_atributo',
          atributo: 'comando',
          dc: 12,
          onSuccessNodeId: 'j2_a4_whatif_rhaenyra_salva',
          onPartialFailureNodeId: 'j2_a4_morte_canonica_rhaenyra_sunfyre',
          aprovacaoCompanheiros: { daemon: 20, corlys: 10 },
          delta: { mundo: { sunfyre_repelido_balistas: true } },
        },
        {
          id: 'esc_j2_a4_oferecer_troca_refens_aegon',
          texto: 'Negociar a abdicação e o exílio voluntário de Rhaenyra em Essos em troca de poupar a vida do jovem Aegon III.',
          tipo: 'teste_atributo',
          atributo: 'cortesia',
          dc: 12,
          onSuccessNodeId: 'j2_a4_morte_canonica_rhaenyra_sunfyre',
          onPartialFailureNodeId: 'j2_a4_morte_canonica_rhaenyra_sunfyre',
          aprovacaoCompanheiros: { corlys: 15, daemon: -15 },
          delta: { ficha: { honra: 1 } },
        },
      ],
    },

    // 3. Morte por Sunfyre
    j2_a4_morte_devorado_sunfyre: {
      id: 'j2_a4_morte_devorado_sunfyre',
      titulo: 'Consumido pelo Fogo Dourado de Sunfyre',
      anoHistorico: '130 d.C.',
      localizacao: 'Pátio de Pedra do Dragão',
      regionId: 'pedra_dragao',
      isEnding: true,
      fallbackText: `Vosso salto contra Sor Alfred Broome foi interceptado por um jato de chamas douradas incandescentes saídas das fauces de Sunfyre. Vossas vestes e carne foram incineradas antes de tocardes o chão de obsidiana.`,      loreContext: {
        fonte: {
          arquivo_md: 'corpus_md/jornada_2_danca/fogo-e-sangue_07_morte-dos-dragoes-breve-triste-reinado-aegon-ii.md',
          livro: 'Fogo & Sangue - Volume 1',
          capitulo: 'A Morte dos Dragões - Breve e Triste Reinado de Aegon II',
        },
        notaHistorica: 'Fogo & Sangue (George R. R. Martin)',
      },

      escolhas: [],
    },

    // 4. Morte Canônica de Rhaenyra
    j2_a4_morte_canonica_rhaenyra_sunfyre: {
      id: 'j2_a4_morte_canonica_rhaenyra_sunfyre',
      titulo: 'As Seis Dentadas de Sunfyre & O Fim da Rainha',
      anoHistorico: '130 d.C.',
      localizacao: 'Pátio de Pedra do Dragão',
      regionId: 'pedra_dragao',
      fallbackText: `Aegon II deu a ordem fria: 'Alimenta-o, Sunfyre.'
      
O dragão dourado lançou uma baforada de fogo sobre Rhaenyra e a devorou em seis dentadas sangrentas diante dos olhos aterrorizados de seu filho de dez anos, o Príncipe Aegon, o Jovem. Restou apenas sua perna esquerda abaixo do joelho. O dragão expirou semanas depois em decorrência de seus ferimentos incuráveis.`,      loreContext: {
        fonte: {
          arquivo_md: 'corpus_md/jornada_2_danca/fogo-e-sangue_07_morte-dos-dragoes-breve-triste-reinado-aegon-ii.md',
          livro: 'Fogo & Sangue - Volume 1',
          capitulo: 'A Morte dos Dragões - Breve e Triste Reinado de Aegon II',
        },
        notaHistorica: 'Fogo & Sangue (George R. R. Martin)',
      },

      escolhas: [
        {
          id: 'esc_j2_a4_avancar_retorno_aegon_ii',
          texto: 'Acompanhar o retorno amargo de Aegon II a Porto Real em sua liteira de enfermo.',
          tipo: 'simples',
          nextNodeId: 'j2_a4_batalha_estrada_do_rei',
        },

        {
          id: 'esc_morte_rhaenyra_sacrificio_aegon3',
          texto: 'O jovem Príncipe Aegon III assiste com horror ao destino de sua mãe, guardando no peito um silêncio sombrio.',
          tipo: 'simples',
          aprovacaoCompanheiros: { corlys: 25 },
          delta: { flagsAdicionadas: ['aegon_iii_trauma_dragoes'], compostura: 1 },
          nextNodeId: 'j2_a4_porto_real_tres_reis_e_ordem',
        },
        {
          id: 'esc_morte_rhaenyra_juramento_vinganca',
          texto: 'Os leais de Derivamarca juram que Sunfyre e Aegon II não escaparão ao julgamento final da história.',
          tipo: 'simples',
          aprovacaoCompanheiros: { corlys: 25 },
          delta: { compostura: 1 },
          nextNodeId: 'j2_a4_porto_real_tres_reis_e_ordem',
        }
      ],
    },

    // 5. What If: Rhaenyra Salva
    j2_a4_whatif_rhaenyra_salva: {
      id: 'j2_a4_whatif_rhaenyra_salva',
      titulo: 'A Fuga da Rainha & O Golpe em Pedra do Dragão',
      anoHistorico: '130 d.C.',
      localizacao: 'Pedra do Dragão',
      regionId: 'pedra_dragao',
      fallbackText: `Com fúria implacável, Sor Alfred Broome teve a garganta cortada e os leais a Aegon II foram encurralados! Rhaenyra e o Príncipe Aegon foram colocados a bordo de uma galé rápida da frota Velaryon, rumando com segurança para as forças do Norte que desciam a Estrada do Rei!`,      loreContext: {
        fonte: {
          arquivo_md: 'corpus_md/jornada_2_danca/fogo-e-sangue_07_morte-dos-dragoes-breve-triste-reinado-aegon-ii.md',
          livro: 'Fogo & Sangue - Volume 1',
          capitulo: 'A Morte dos Dragões - Breve e Triste Reinado de Aegon II',
        },
        notaHistorica: 'Fogo & Sangue (George R. R. Martin)',
      },

      escolhas: [
        {
          id: 'esc_j2_a4_unir_rhaenyra_com_cregan',
          texto: 'Unir a rainha sobrevivente aos vinte mil guerreiros do Norte de Lorde Cregan Stark.',
          tipo: 'simples',
          delta: { flagsAdicionadas: ['rhaenyra_salva'] },
          nextNodeId: 'j2_final_triunfo_negro_rhaenyra',
        },

        {
          id: 'esc_salva_rhaenyra_pedra_dragao',
          texto: 'Tomar o castelo de Pedra do Dragão de assalto e aprisionar Aegon II em sua própria liteira.',
          tipo: 'simples',
          aprovacaoCompanheiros: { daemon: 30, corlys: 25 },
          delta: { flagsAdicionadas: ['aegon_ii_capturado_pedra_dragao'], compostura: 2 },
          nextNodeId: 'j2_a4_julgamento_larys_corlys',
        },
        {
          id: 'esc_salva_rhaenyra_fuga_essos',
          texto: 'Embarcar Rhaenyra e o pequeno Aegon em uma galé rápida de Derivamarca com destino a Pentos.',
          tipo: 'simples',
          aprovacaoCompanheiros: { corlys: 25, mysaria: 20 },
          delta: { compostura: 2 },
          nextNodeId: 'j2_a4_julgamento_larys_corlys',
        }
      ],
    },

    // 6. Porto Real e a Queda de Aegon II
    j2_a4_porto_real_tres_reis_e_ordem: {
      id: 'j2_a4_porto_real_tres_reis_e_ordem',
      titulo: 'O Breve e Triste Reinado de Aegon II & O Veneno',
      anoHistorico: '131 d.C.',
      localizacao: 'Porto Real',
      regionId: 'terras_da_coroa',
      fallbackText: `Aegon II retornou a Porto Real incapaz de andar, com dores agonizantes e exigindo mutilar a orelha do pequeno príncipe Aegon. Porém, os exércitos dos Pretos não haviam morrido: os rapazes do Tridente venceram a Batalha da Estrada do Rei, e vinte mil lobos famintos de Lorde Cregan Stark cruzaram o Gargalo.
      
Lorde Corlys Velaryon e Larys Strong aconselharam o rei a render-se e vestir o negro. Aegon II recusou furiosamente. Meia hora depois, foi encontrado morto em sua carruagem real com sangue negro nos lábios, envenenado por seus próprios conselheiros.`,      loreContext: {
        fonte: {
          arquivo_md: 'corpus_md/jornada_2_danca/fogo-e-sangue_07_morte-dos-dragoes-breve-triste-reinado-aegon-ii.md',
          livro: 'Fogo & Sangue - Volume 1',
          capitulo: 'A Morte dos Dragões - Breve e Triste Reinado de Aegon II',
        },
        notaHistorica: 'Fogo & Sangue (George R. R. Martin)',
      },

      escolhas: [
        {
          id: 'esc_j2_a4_chegada_cregan_hora_do_lobo',
          texto: 'Presenciar a marcha de ferro de Cregan Stark entrando em Porto Real na Hora do Lobo.',
          tipo: 'simples',
          nextNodeId: 'j2_a4_julgamento_larys_corlys',
        },

        {
          id: 'esc_pr_ordem_corlys_regente',
          texto: 'Apoiar Lorde Corlys Velaryon na pacificação da capital e emissão de perdões gerais aos soldados de ambos os lados.',
          tipo: 'simples',
          aprovacaoCompanheiros: { corlys: 30, rhaenys_j2: 25 },
          delta: { flagsAdicionadas: ['aegon2_mantido_trono', 'acordo_partilha_reinos'], compostura: 2 },
          nextNodeId: 'j2_a4_julgamento_larys_corlys',
        },
        {
          id: 'esc_pr_ordem_guardas_lobos',
          texto: 'Aguardar as vanguardas dos Rapazes e dos Lobos de Cregan Stark para restaurar a ordem na espada.',
          tipo: 'simples',
          aprovacaoCompanheiros: { corlys: 15, daemon: 15 },
          delta: { flagsAdicionadas: ['cregan_stark_justica_plena'] },
          nextNodeId: 'j2_a4_julgamento_larys_corlys',
        }
      ],
    },

    // 7. A Hora do Lobo
    j2_a4_hora_do_lobo_cregan_stark: {
      id: 'j2_a4_hora_do_lobo_cregan_stark',
      titulo: 'A Hora do Lobo & A Justiça Austera de Winterfell',
      anoHistorico: '131 d.C.',
      localizacao: 'Sala do Trono, Porto Real',
      regionId: 'terras_da_coroa',
      fallbackText: `Lorde Cregan Stark desceu sobre a corte como o vento gélido de Winterfell. Desgostoso com os venenos e punhais das costas, prendeu vinte e dois nobres — incluindo Larys Strong e Corlys Velaryon.
      
Nomeado Mão do Rei por um dia, julgou e condenou traidores sem vacilar com sua imensa espada ancestral Gelo. Larys Pé Torto pediu que cortassem sua perna boa antes de decapitá-lo. Graças à intervenção de Alysanne Blackwood, Corlys Velaryon foi poupado para liderar a regência de paz.
      
O jovem Aegon III foi coroado ao lado de Jaehaera, unindo simbolicamente os Pretos e os Verdes após a extinção de quase todos os dragões.`,
      internalVoices: [
        {
          atributo: 'comando',
          resultadoPassivo: 'SUCESSO',
          dcPassiva: 10,
          fala: 'A justiça de Cregan Stark é a única rocha sólida num mar de traições. As escolhas do jogador decidirão o desfecho final.',
        },
      ],      loreContext: {
        fonte: {
          arquivo_md: 'corpus_md/jornada_2_danca/fogo-e-sangue_07_morte-dos-dragoes-breve-triste-reinado-aegon-ii.md',
          livro: 'Fogo & Sangue - Volume 1',
          capitulo: 'A Morte dos Dragões - Breve e Triste Reinado de Aegon II',
        },
        notaHistorica: 'Fogo & Sangue (George R. R. Martin)',
      },

      escolhas: [
        {
          id: 'esc_j2_a4_presenciar_casamento_dinastico',
          texto: 'Presenciar o casamento da reconciliação entre Aegon III e Jaehaera.',
          tipo: 'simples',
          nextNodeId: 'j2_a4_reconciliacao_casamento_aegon_jaehaera',
        },
        {
          id: 'esc_j2_a4_seguir_caminho_canonico_lobo',
          texto: 'Consagrar o desfecho canônico da Hora do Lobo (Final 1).',
          tipo: 'simples',
          nextNodeId: 'j2_final_canonico_hora_do_lobo',
        },
        {
          id: 'esc_j2_a4_reclamar_coroa_cregan_permanente',
          texto: 'Apoiar Cregan Stark para permanecer como Regente Imperial Permanente de Ferro (Final 6).',
          tipo: 'teste_atributo',
          atributo: 'comando',
          dc: 12,
          onSuccessNodeId: 'j2_final_justica_gelo_cregan',
          onPartialFailureNodeId: 'j2_final_canonico_hora_do_lobo',
        },
        {
          id: 'esc_j2_a4_pacto_grande_conselho_paz',
          texto: 'Convocar um Grande Conselho em Harrenhal para selar a reconciliação definitiva (Final 5).',
          tipo: 'teste_atributo',
          atributo: 'cortesia',
          dc: 11,
          onSuccessNodeId: 'j2_final_grande_paz_harrenhal',
          onPartialFailureNodeId: 'j2_final_canonico_hora_do_lobo',
        },
        {
          id: 'esc_j2_a4_proclamar_coroa_bronze_sementes',
          texto: 'Apoiar a revolta armada das sementes de dragão fundando a Coroa de Bronze (Final 4).',
          tipo: 'simples',
          nextNodeId: 'j2_final_imperio_sementes_vermithor',
        },
        {
          id: 'esc_j2_a4_hegemonia_verde_vilavelha',
          texto: 'Restabelecer a ordem sob a hegemonia de Vilavelha e dos Hightower (Final 3).',
          tipo: 'simples',
          nextNodeId: 'j2_final_hegemonia_verde_dourada',
        },
      ],
    },

    // ==========================================
    // OS 6 FINAIS DISTINTOS DA JORNADA 2
    // ==========================================


    // 8. Batalha da Estrada do Rei
    j2_a4_batalha_estrada_do_rei: {
      id: 'j2_a4_batalha_estrada_do_rei',
      titulo: 'A Batalha da Estrada do Rei & A Queda de Borros',
      anoHistorico: '131 d.C.',
      localizacao: 'Estrada do Rei, Terras da Coroa',
      regionId: 'terras_da_coroa',
      fallbackText: `Lorde Borros Baratheon marchou para o norte certo da vitória fácil contra os rapazes do Tridente liderados por Kermit Tully e Benjicot Blackwood.
      
No meio da lama, os arqueiros de Blackwood crivaram a cavalaria da Tempestade. Lorde Borros matou doze cavaleiros antes de tombar pelas mãos do jovem Tully. A última esperança armada dos Verdes estava aniquilada.`,
      internalVoices: [
        {
          atributo: 'comando',
          resultadoPassivo: 'SUCESSO',
          dcPassiva: 10,
          fala: 'A estrada para Porto Real está completamente aberta para os exércitos leais aos Pretos.',
        },
      ],
      loreContext: {
        fonte: {
          arquivo_md: 'corpus_md/jornada_2_danca/fogo-e-sangue_07_morte-dos-dragoes-breve-triste-reinado-aegon-ii.md',
          livro: 'Fogo & Sangue - Volume 1',
          capitulo: 'A Morte dos Dragões - Breve e Triste Reinado de Aegon II',
        },
        notaHistorica: 'A vitória dos Senhores dos Rios na Estrada do Rei.',
      },
      escolhas: [
        {
          id: 'esc_j2_a4_avancar_queda_aegon_estrada',
          texto: 'Avançar para a capital para exigir a rendição incondicional de Aegon II.',
          tipo: 'simples',
          nextNodeId: 'j2_a4_porto_real_tres_reis_e_ordem',
        },

        {
          id: 'esc_estrada_rei_cregan_marcha',
          texto: 'Abrir os portões da capital para a grande hoste de Winterfell liderada por Cregan Stark.',
          tipo: 'simples',
          aprovacaoCompanheiros: { corlys: 25 },
          delta: { flagsAdicionadas: ['hora_do_lobo_iniciada'], compostura: 2 },
          nextNodeId: 'j2_a4_hora_do_lobo_cregan_stark',
        },
        {
          id: 'esc_estrada_rei_apaziguar_lordes',
          texto: 'Enviar emissários com bandeira de trégua aos lordes da tempestade para evitar novo banho de sangue.',
          tipo: 'simples',
          aprovacaoCompanheiros: { corlys: 20 },
          delta: { compostura: 1 },
          nextNodeId: 'j2_a4_julgamento_larys_corlys',
        }
      ],
    },

    // 9. O Tribunal de Cregan Stark
    j2_a4_julgamento_larys_corlys: {
      id: 'j2_a4_julgamento_larys_corlys',
      titulo: 'O Tribunal de Sangue & A Lâmina de Gelo',
      anoHistorico: '131 d.C.',
      localizacao: 'Grande Salão da Fortaleza Vermelha',
      regionId: 'terras_da_coroa',
      fallbackText: `Sentado no Trono de Ferro com Gelo empunhada, Lorde Cregan Stark interrogou os lordes envolvidos no envenenamento de Aegon II. Larys Strong recusou-se a vestir o negro, escolhendo a morte pela espada para que seus ossos fossem enterrados em Harrenhal.`,
      internalVoices: [
        {
          atributo: 'comando',
          resultadoPassivo: 'SUCESSO',
          dcPassiva: 10,
          fala: 'A justiça é fria e precisa. Nenhum veneno pode macular a coroa sem punição exemplar.',
        },
      ],
      loreContext: {
        fonte: {
          arquivo_md: 'corpus_md/jornada_2_danca/fogo-e-sangue_08_momento-posterior-hora-do-lobo.md',
          livro: 'Fogo & Sangue - Volume 1',
          capitulo: 'O Momento Posterior - A Hora do Lobo',
        },
        notaHistorica: 'O julgamento implacável de Cregan Stark.',
      },
      escolhas: [
        {
          id: 'esc_j2_a4_conferenciar_com_cregan_hora_do_lobo',
          texto: 'Levar os condenados perante Lorde Cregan Stark na Sala do Trono para que a espada Gelo fale.',
          tipo: 'simples',
          nextNodeId: 'j2_a4_hora_do_lobo_cregan_stark',
          aprovacaoCompanheiros: { corlys: 15 },
        },
        {
          id: 'esc_j2_final_canonico_lobo',
          texto: 'Apoiar o julgamento implacável de Cregan Stark e o casamento unificador de Aegon III com Jaehaera (Final 1: Canônico - A Hora do Lobo).',
          tipo: 'simples',
          nextNodeId: 'j2_final_canonico_hora_do_lobo',
        },
        {
          id: 'esc_j2_final_rhaenyra_triunfante',
          texto: 'Coroar a Rainha Rhaenyra I restaurada em glória perante os dragões sobreviventes (Final 2: Triunfo Negro).',
          tipo: 'simples',
          requiredFlags: ['rhaenyra_salva'],
          motivoBloqueio: 'Exige que a Rainha Rhaenyra tenha sido resgatada ou impedido o ataque de Sunfyre.',
          nextNodeId: 'j2_final_triunfo_negro_rhaenyra',
        },
        {
          id: 'esc_j2_final_hegemonia_verde',
          texto: 'Consolidar a vitória dos Verdes com a dinastia de Aegon II preservada sob a bênção de Vilavelha (Final 3: Hegemonia Dourada).',
          tipo: 'simples',
          requiredFlags: ['aegon2_mantido_trono'],
          motivoBloqueio: 'Exige vitória dos partidários de Aegon II e envenenamento dos Pretos.',
          nextNodeId: 'j2_final_hegemonia_verde_dourada',
        },
        {
          id: 'esc_j2_final_sementes_vermithor',
          texto: 'Proclamar a nova ordem das Sementes de Dragão sob a Fúria de Bronze de Vermithor (Final 4: Coroa de Bronze).',
          tipo: 'simples',
          requiredFlags: ['domou_vermithor'],
          motivoBloqueio: 'Exige ter domado Vermithor com uma Semente de Dragão e conquistado lealdade popular.',
          nextNodeId: 'j2_final_imperio_sementes_vermithor',
        },
        {
          id: 'esc_j2_final_grande_paz',
          texto: 'Assinar o Grande Tratado de Harrenhal dividindo os Sete Reinos em paz permanente sob conselho de Corlys (Final 5: Partilha de Paz).',
          tipo: 'simples',
          requiredFlags: ['acordo_partilha_reinos'],
          motivoBloqueio: 'Exige ter negociado com Corlys Velaryon a partição pacífica dos Sete Reinos.',
          nextNodeId: 'j2_final_grande_paz_harrenhal',
        },
        {
          id: 'esc_j2_final_justica_cregan',
          texto: 'Executar a purga de sangue no Conselho e governar sob a austeridade do Norte com Cregan Stark (Final 6: A Lâmina de Gelo).',
          tipo: 'simples',
          requiredFlags: ['cregan_stark_justica_plena'],
          motivoBloqueio: 'Exige a purga completa do Conselho Negro e Verde pelo Protetor do Norte.',
          nextNodeId: 'j2_final_justica_gelo_cregan',
        }
      ],
    },

    // 10. A União de Aegon III e Jaehaera
    j2_a4_reconciliacao_casamento_aegon_jaehaera: {
      id: 'j2_a4_reconciliacao_casamento_aegon_jaehaera',
      titulo: 'O Casamento das Duas Facções & O Início da Regência',
      anoHistorico: '131 d.C.',
      localizacao: 'Septo da Fortaleza Vermelha',
      regionId: 'terras_da_coroa',
      fallbackText: `Diante dos lordes exaustos de toda Westeros, o jovem Rei Aegon III Targaryen tomou a mão da Princesa Jaehaera, unindo o sangue dos Pretos e dos Verdes sob um manto de veludo púrpura e rubis.`,
      internalVoices: [
        {
          atributo: 'cortesia',
          resultadoPassivo: 'SUCESSO',
          dcPassiva: 9,
          fala: 'A paz foi comprada com a extinção dos dragões, mas o reino volta a respirar sob a regência.',
        },
      ],
      loreContext: {
        fonte: {
          arquivo_md: 'corpus_md/jornada_2_danca/fogo-e-sangue_08_momento-posterior-hora-do-lobo.md',
          livro: 'Fogo & Sangue - Volume 1',
          capitulo: 'O Momento Posterior - A Hora do Lobo',
        },
        notaHistorica: 'O matrimônio dinástico selando o fim da guerra.',
      },
      escolhas: [
        {
          id: 'esc_j2_a4_seguir_final_canonico_lobo',
          texto: 'Presenciar o juramento de Cregan Stark e selar a Hora do Lobo (Final 1).',
          tipo: 'simples',
          nextNodeId: 'j2_final_canonico_hora_do_lobo',
        },
      
        {
          id: 'esc_j2_a4_exigir_julgamento_justo_cregan',
          texto: 'Apoiar Cregan Stark na decapitação implacável de todos os conspiradores do veneno.',
          tipo: 'teste_atributo',
          atributo: 'comando',
          dc: 12,
          onSuccessNodeId: 'j2_final_justica_gelo_cregan',
          onPartialFailureNodeId: 'j2_final_justica_gelo_cregan',
          aprovacaoCompanheiros: { daemon: 10, corlys: -5 },
          delta: { ficha: { honra: 1 } },
        },
        {
          id: 'esc_j2_a4_selar_pacto_grande_paz',
          texto: 'Mediar um tratado perpétuo de união entre Pretos e Verdes que conceda anistia geral em Harrenhal.',
          tipo: 'teste_atributo',
          atributo: 'cortesia',
          dc: 11,
          onSuccessNodeId: 'j2_final_grande_paz_harrenhal',
          onPartialFailureNodeId: 'j2_final_grande_paz_harrenhal',
          aprovacaoCompanheiros: { corlys: 20, rhaenys_j2: 15 },
          delta: { ficha: { compostura: 1 } },
        },
        {
          id: 'esc_j2_a4_assegurar_triunfo_negro_aegon_iii',
          texto: 'Garantir que apenas os partidários de Rhaenyra assumam os assentos do Pequeno Conselho de Regência.',
          tipo: 'teste_atributo',
          atributo: 'astucia',
          dc: 11,
          onSuccessNodeId: 'j2_final_triunfo_negro_rhaenyra',
          onPartialFailureNodeId: 'j2_final_triunfo_negro_rhaenyra',
          aprovacaoCompanheiros: { mysaria: 15, daemon: 15 },
          delta: { mundo: { regencia_preta_pura: true } },
        },
      ],
    },

    // FINAL 1: CANÔNICO
    j2_final_canonico_hora_do_lobo: {
      id: 'j2_final_canonico_hora_do_lobo',
      titulo: 'Final 1: A Hora do Lobo e o Rei Quebrado (Canônico)',
      anoHistorico: '131 d.C.',
      localizacao: 'Porto Real',
      regionId: 'terras_da_coroa',
      isEnding: true,
      fallbackText: `A guerra civil mais sangrenta da Casa Targaryen termina como dita o cânone sagrado da Cidadela. Lorde Cregan Stark renunciou ao cargo de Mão após seis dias de justiça austera e retornou aos ermos gelados de Winterfell com sua noiva Alysanne Blackwood.
      
O jovem Rei Aegon III, marcado para sempre pela visão de sua mãe sendo devorada viva diante de seus olhos, senta-se no Trono de Ferro com um olhar melancólico e distante. Os dragões, outrora soberanos dos céus, estão quase todos mortos; o último ovo rachará em uma criatura raquítica e disforme. A Dança dos Dragões ceifou o fogo do mundo, mas os Sete Reinos sobrevivem sob o governo prudente da regência de Corlys Velaryon.`,      loreContext: {
        fonte: {
          arquivo_md: 'corpus_md/jornada_2_danca/fogo-e-sangue_07_morte-dos-dragoes-breve-triste-reinado-aegon-ii.md',
          livro: 'Fogo & Sangue - Volume 1',
          capitulo: 'A Morte dos Dragões - Breve e Triste Reinado de Aegon II',
        },
        notaHistorica: 'Fogo & Sangue (George R. R. Martin)',
      },

      escolhas: [],
    },

    // FINAL 2: WHAT IF ÉPICO - TRIUNFO DE RHAENYRA
    j2_final_triunfo_negro_rhaenyra: {
      id: 'j2_final_triunfo_negro_rhaenyra',
      conditionalParagraphs: [
        {
          requiredFlag: 'pacto_gelo_e_fogo_selado',
          text: 'Os estandartes cinzentos de Cregan Stark tremulam lado a lado com os dragões vermelhos, selando o juramento solene feito perante os represeiros do Norte.',
        },
        {
          requiredFlag: 'urtigas_patrocinada_velaryon',
          text: 'Urtigas e Rouba-Ovelhas pousam nas muralhas de Derivamarca sob aplausos calorosos dos marinheiros e plebeus de toda a Baía.',
        },
      ],
      titulo: 'Final 2: O Reinado de Fogo e Rubi (Triunfo dos Pretos)',
      anoHistorico: '131 d.C.',
      localizacao: 'Porto Real',
      regionId: 'terras_da_coroa',
      isEnding: true,
      fallbackText: `Contra todas as conspirações dos Verdes, a Rainha Rhaenyra Targaryen sobreviveu e adentrou Porto Real à frente dos vinte mil combatentes do Norte e da frota Velaryon! O Fosso dos Dragões foi preservado e fortificado com guardiões de ferro.
      
Com Daemon e seus herdeiros ao seu lado, Rhaenyra governa incontestada sobre o Trono de Ferro com a coroa de Viserys I. O legado valiriano floresce com novas ninhadas de dragões nos pátios da Fortaleza Vermelha, e o nome da Primeira Rainha Soberana de Westeros é gravado em letras douradas em todos os anais da história.`,      loreContext: {
        fonte: {
          arquivo_md: 'corpus_md/jornada_2_danca/fogo-e-sangue_07_morte-dos-dragoes-breve-triste-reinado-aegon-ii.md',
          livro: 'Fogo & Sangue - Volume 1',
          capitulo: 'A Morte dos Dragões - Breve e Triste Reinado de Aegon II',
        },
        notaHistorica: 'Fogo & Sangue (George R. R. Martin)',
      },

      escolhas: [],
    },

    // FINAL 3: HEGEMONIA VERDE DOURADA
    j2_final_hegemonia_verde_dourada: {
      id: 'j2_final_hegemonia_verde_dourada',
      titulo: 'Final 3: O Sol Dourado de Sunfyre e da Torralta',
      anoHistorico: '131 d.C.',
      localizacao: 'Vilavelha e Porto Real',
      regionId: 'campina',
      isEnding: true,
      fallbackText: `A facção Verde consolidou sua supremacia absoluta. Com o apoio financeiro e diplomático de Vilavelha, da Cidadela e da Fé dos Sete, a linhagem de Alicent Hightower e Aegon II expurgou os partidários de Pedra do Dragão de todos os cargos da corte.
      
O Trono de Ferro governa sob as bênçãos do Alto Septão, subordinando o poder dos dragões às antigas tradições ândalas e às leis de sucessão patriarcal, inaugurando uma era de opulência e conservadorismo sacro em Westeros.`,      loreContext: {
        fonte: {
          arquivo_md: 'corpus_md/jornada_2_danca/fogo-e-sangue_07_morte-dos-dragoes-breve-triste-reinado-aegon-ii.md',
          livro: 'Fogo & Sangue - Volume 1',
          capitulo: 'A Morte dos Dragões - Breve e Triste Reinado de Aegon II',
        },
        notaHistorica: 'Fogo & Sangue (George R. R. Martin)',
      },

      escolhas: [],
    },

    // FINAL 4: A COROA DE BRONZE (SEMENTES DE DRAGÃO)
    j2_final_imperio_sementes_vermithor: {
      id: 'j2_final_imperio_sementes_vermithor',
      titulo: 'Final 4: A Coroa de Bronze das Sementes de Dragão',
      anoHistorico: '131 d.C.',
      localizacao: 'Tumbleton e Harrenhal',
      regionId: 'tridente',
      isEnding: true,
      fallbackText: `A ousadia das sementes de dragão mudou o curso do mundo. Ao domar Vermithor, o novo montador uniu os cavaleiros plebeus de Asaprata e Rouba-Ovelhas, recusando-se a dobrar o joelho tanto aos Pretos quanto aos Verdes.
      
Erguendo a 'Coroa de Bronze' nas muralhas colossais de Harrenhal, uma nova dinastia valiriana plebeia impõe-se pela força bruta de três dragões adultos. Os lordes de Westeros contemplam aterrorizados uma nova ordem onde o fogo do dragão pertence a quem tem a coragem de montá-lo, e não a quem herda pergaminhos de corte.`,      loreContext: {
        fonte: {
          arquivo_md: 'corpus_md/jornada_2_danca/fogo-e-sangue_07_morte-dos-dragoes-breve-triste-reinado-aegon-ii.md',
          livro: 'Fogo & Sangue - Volume 1',
          capitulo: 'A Morte dos Dragões - Breve e Triste Reinado de Aegon II',
        },
        notaHistorica: 'Fogo & Sangue (George R. R. Martin)',
      },

      escolhas: [],
    },

    // FINAL 5: O GRANDE CONSELHO DE SANGUE (PAZ NEGOCIADA)
    j2_final_grande_paz_harrenhal: {
      id: 'j2_final_grande_paz_harrenhal',
      titulo: 'Final 5: O Grande Conselho de Harrenhal e a Paz dos Dragões',
      anoHistorico: '131 d.C.',
      localizacao: 'Harrenhal',
      regionId: 'tridente',
      isEnding: true,
      fallbackText: `Com Lucerys e Rhaenys salvos das primeiras emboscadas, a carnificina cega foi interrompida antes do aniquilamento total. Convocado nas margens do Olho de Deus, o Grande Conselho de 131 d.C. reuniu quinhentos lordes para selar uma partilha de poder histórica.
      
Um casamento entre os ramos Pretos e Verdes unificou as pretensões, mantendo doze dragões vivos nos céus e salvaguardando a dinastia Targaryen em seu zênite militar para as provações sombrias do inverno vindouro.`,      loreContext: {
        fonte: {
          arquivo_md: 'corpus_md/jornada_2_danca/fogo-e-sangue_07_morte-dos-dragoes-breve-triste-reinado-aegon-ii.md',
          livro: 'Fogo & Sangue - Volume 1',
          capitulo: 'A Morte dos Dragões - Breve e Triste Reinado de Aegon II',
        },
        notaHistorica: 'Fogo & Sangue (George R. R. Martin)',
      },

      escolhas: [],
    },

    // FINAL 6: O INVERNO NO TRONO DE FERRO (CREGAN STARK)
    j2_final_justica_gelo_cregan: {
      id: 'j2_final_justica_gelo_cregan',
      titulo: 'Final 6: O Inverno no Trono de Ferro (A Ditadura do Lobo)',
      anoHistorico: '131 d.C.',
      localizacao: 'Porto Real',
      regionId: 'terras_da_coroa',
      isEnding: true,
      fallbackText: `Desgostoso com a fraqueza e venenos dos nobres sulistas, Lorde Cregan Stark recusou-se a soltar o selo de Mão do Rei. Declarando o Protetorado Militar Permanente dos Sete Reinos, o Senhor de Winterfell governou com a espada de aço valiriano Gelo no colo diante do Trono.
      
Durante duas décadas de mão de ferro, os vassalos sulistas foram subjugados à lei estrita e incorruptível do Norte. Os traidores foram executados ou mandados para a Muralha, e Westeros aprendeu com pavor e respeito que quando o lobo governa, a honra é paga em sangue.`,      loreContext: {
        fonte: {
          arquivo_md: 'corpus_md/jornada_2_danca/fogo-e-sangue_07_morte-dos-dragoes-breve-triste-reinado-aegon-ii.md',
          livro: 'Fogo & Sangue - Volume 1',
          capitulo: 'A Morte dos Dragões - Breve e Triste Reinado de Aegon II',
        },
        notaHistorica: 'Fogo & Sangue (George R. R. Martin)',
      },

      escolhas: [],
    },
  },
};
