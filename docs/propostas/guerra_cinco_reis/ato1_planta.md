# Planta Narrativa do Ato I: O Lobo e o Trono &bull; De Winterfell ao Tridente
**Jornada 3:** «A Guerra dos Cinco Reis» (Padrão-Ouro v2.2)  
**Ano Histórico:** 298 d.C.  
**Localização Principal:** Winterfell, Criptas, Estrada do Rei e Castelo Darry  
**POV:** Lorde Eddard Stark  
**Epígrafe de Abertura:**  
> *«O homem que profere a sentença deve brandir a espada. Se vai tirar a vida de um homem, deve olhá-lo nos olhos e ouvir suas últimas palavras.»*  
> — Lorde Eddard Stark de Winterfell

---

## Estrutura do Diamante com Rotas (§6C.1)

```
        [1. Abertura: A Lâmina de Gelo & O Hub das Criptas com Robert]
                                     │
                   [2. Encruzilhada: O Dilema da Partida]
                          /                      \
        [Rota A: A Investigação Silenciosa] [Rota B: A Comitiva Real]
         - A Adaga de Aço Valiriano         - Banquete Tenso com Robert
         - Diálogo com Tyrion Lannister     - O Desafio a Jaime Lannister
         - A Marcha pelo Gargalo            - Intrigas do Acampamento Real
                          \                      /
                 [4. Peça de Cenário Canônica: O Sangue no Tridente]
                      - O Incidente nas Margens do Tridente
                      - O Julgamento Judicial em Castelo Darry
                      - O Sacrifício Silencioso de Lady
                                     │
                 [5. Acerto de Contas: A Chegada à Fortaleza Vermelha]
```

---

## 1. Abertura (2 cenas)

- **id**: `j3_a1_execucao_desertor_e_lobos`
  - tipo: `narracao`
  - rota: `comum`
  - objetivo_dramatico: Executar a justiça solene do Norte em Gared com a espada Gelo e acolher a ninhada de lobos gigantes com chifre de veado na garganta da mãe.
  - marcas_gravadas: [justica_de_gelo, ninhada_de_lobos_acolhida]
  - marcas_lidas: []
  - origem: `canonica`
  - fonte: A Guerra dos Tronos, Bran I

- **id**: `j3_a1_hub_criptas_de_winterfell`
  - tipo: `hub`
  - rota: `comum`
  - objetivo_dramatico: Conversar com o Rei Robert Baratheon diante da tumba de Lyanna Stark nas criptas, descobrindo a morte de Jon Arryn e a oferta para ser Mão do Rei.
  - marcas_gravadas: [juramento_nas_criptas, luto_por_lyanna, suspeita_lannister]
  - marcas_lidas: []
  - origem: `canonica`
  - fonte: A Guerra dos Tronos, Eddard I

---

## 2. Encruzilhada (1 cena)

- **id**: `j3_a1_dilema_a_partida_de_winterfell`
  - tipo: `hub`
  - rota: `comum`
  - objetivo_dramatico: A queda trágica de Bran precipita a partida para o sul; confrontar Catelyn e decidir a postura e o ritmo da escolta Stark.
  - marcas_gravadas: [estrategia_investigativa, postura_honra_publica]
  - marcas_lidas: [suspeita_lannister]
  - origem: `canonica`
  - fonte: A Guerra dos Tronos, Eddard II & Catelyn II

---

## 3. Rotas (6 cenas: 3 por rota, ≥ 60% conteúdo exclusivo)

### Rota A: A Investigação Silenciosa
- **id**: `j3_a1_investigacao_a_adaga_valiriana`
  - tipo: `dialogo`
  - rota: `investigacao`
  - objetivo_dramatico: Analisar com Catelyn e meistre Luwin a lâmina de aço valiriano do assassino de Bran e selar o juramento de descobrir o mandante.
  - marcas_gravadas: [investigacao_adaga_valiriana, pacto_com_catelyn]
  - marcas_lidas: [estrategia_investigativa]
  - origem: `canonica`
  - fonte: A Guerra dos Tronos, Catelyn III

- **id**: `j3_a1_investigacao_conversa_com_tyrion`
  - tipo: `dialogo`
  - rota: `investigacao`
  - objetivo_dramatico: Sondar Tyrion Lannister em uma estalagem da Estrada do Rei sobre as dívidas da coroa e os mistérios que rondam Porto Real.
  - marcas_gravadas: [alerta_de_tyrion, mente_astuta_desafiada]
  - marcas_lidas: []
  - origem: `original`
  - fonte: A Guerra dos Tronos, Tyrion II (Dramatização de diálogo filosófico e político na Estrada do Rei)

- **id**: `j3_a1_investigacao_a_marcha_pelo_gargalo`
  - tipo: `narracao`
  - rota: `investigacao`
  - objetivo_dramatico: Comandar a guarda de batedores através dos pântanos traiçoeiros do Gargalo, assegurando as rotas dos cranogumanos de Howland Reed.
  - marcas_gravadas: [prudencia_no_gargalo, alienca_cranogumanos]
  - marcas_lidas: [investigacao_adaga_valiriana]
  - origem: `original`
  - fonte: A Guerra dos Tronos, Catelyn III (Travessia tática pelo Fosso Cailin e pântanos do Gargalo)

### Rota B: A Comitiva Real
- **id**: `j3_a1_comitiva_banquete_com_robert`
  - tipo: `dialogo`
  - rota: `comitiva_real`
  - objetivo_dramatico: Beber e confrontar Robert Baratheon em sua carruagem de viagem, medindo a decadência do rei e o peso sufocante de Cersei Lannister.
  - marcas_gravadas: [lealdade_a_robert, confronto_com_cersei]
  - marcas_lidas: [postura_honra_publica]
  - origem: `canonica`
  - fonte: A Guerra dos Tronos, Eddard II

- **id**: `j3_a1_comitiva_desafio_a_jaime_lannister`
  - tipo: `dialogo`
  - rota: `comitiva_real`
  - objetivo_dramatico: Trocar olhares de ferro e palavras afiadas com o Regicida Jaime Lannister no acampamento da Estrada do Rei.
  - marcas_gravadas: [afrontou_regicida, rancor_valiriano]
  - marcas_lidas: []
  - origem: `original`
  - fonte: A Guerra dos Tronos, Eddard II (Confronto moral entre Ned e Jaime sobre o assassinato de Aerys II)

- **id**: `j3_a1_comitiva_intrigas_do_acampamento`
  - tipo: `narracao`
  - rota: `comitiva_real`
  - objetivo_dramatico: Administrar os conflitos crescentes entre cortesãos do sul e homens de armas do Norte durante os treinos ao lado de Ser Barristan Selmy.
  - marcas_gravadas: [tensoes_da_guarda_real, respeito_de_barristan]
  - marcas_lidas: [afrontou_regicida]
  - origem: `canonica`
  - fonte: A Guerra dos Tronos, Sansa I

---

## 4. Peça de Cenário Canônica (3 cenas)

- **id**: `j3_a1_peca_incidente_no_tridente`
  - tipo: `narracao`
  - rota: `comum`
  - objetivo_dramatico: Intervir no clímax do Tridente após o ataque de Nymeria contra o Príncipe Joffrey e organizar as buscas desesperadas por Arya.
  - marcas_gravadas: [nymeria_libertada, protecao_a_arya]
  - marcas_lidas: [tensoes_da_guarda_real, prudencia_no_gargalo]
  - origem: `canonica`
  - fonte: A Guerra dos Tronos, Arya I & Sansa I

- **id**: `j3_a1_peca_o_julgamento_em_darry`
  - tipo: `dialogo`
  - rota: `comum`
  - objetivo_dramatico: Defender as filhas perante a corte envenenada no Salão de Castelo Darry contra a histeria vingativa de Cersei Lannister.
  - marcas_gravadas: [honra_em_darry, cobardia_de_robert_presenciada]
  - marcas_lidas: [lealdade_a_robert, confronto_com_cersei]
  - origem: `canonica`
  - fonte: A Guerra dos Tronos, Eddard III

- **id**: `j3_a1_peca_o_sacrificio_de_lady`
  - tipo: `narracao`
  - rota: `comum`
  - objetivo_dramatico: Rejeitar a lâmina de Ilyn Payne e abater a inocente loba Lady com a própria lâmina de Winterfell, enviando os ossos para o Norte.
  - marcas_gravadas: [executor_de_lady, dor_do_norte_gravada]
  - marcas_lidas: [justica_de_gelo]
  - origem: `canonica`
  - fonte: A Guerra dos Tronos, Eddard III

---

## 5. Acerto de Contas (1 cena)

- **id**: `j3_a1_acerto_de_contas_porto_real`
  - tipo: `acerto_de_contas`
  - rota: `comum`
  - objetivo_dramatico: Entrar pelos portões de Porto Real e subir à Torre da Mão, avaliando o luto de Lady, as pistas da adaga e o ninho de víboras que o aguarda no Pequeno Conselho.
  - marcas_gravadas: [chegada_a_torre_da_mao]
  - marcas_lidas: [justica_de_gelo, ninhada_de_lobos_acolhida, juramento_nas_criptas, investigacao_adaga_valiriana, suspeita_lannister, alerta_de_tyrion, prudencia_no_gargalo, lealdade_a_robert, afrontou_regicida, tensoes_da_guarda_real, nymeria_libertada, honra_em_darry, executor_de_lady]
  - origem: `canonica`
  - fonte: A Guerra dos Tronos, Eddard IV
