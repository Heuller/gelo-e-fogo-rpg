# Planta Narrativa do Ato III: A Batalha por Castelo Negro & O Portão de Gelo
**Jornada 4:** «Irmão Sem Nome» (Padrão-Ouro v2.2)  
**Ano Histórico:** 300 d.C.  
**Localização Principal:** Castelo Negro (Pátio Central, Torre de Hardin e Portão Norte)  
**POV:** Irmão Sem Nome  
**Epígrafe de Abertura:**  
> *«Um castelo sem muros é apenas uma armadilha de madeira, a menos que os homens que o guardam se tornem a própria pedra.»*  
> — Donal Noye, Ferreiro e Comandante Provisório de Castelo Negro

---

## Estrutura do Diamante com Rotas (§6C.1)

```
       [1. Abertura: As Barricadas de Noye & Hub da Forja]
                                    │
                  [2. Encruzilhada: O Grito dos Thenns]
                         /                      \
       [Rota A: A Parede de Escudos]   [Rota B: Os Arqueiros da Torre]
        - Choque de Bronze no Pátio     - Flechas na Escuridão
        - O Duelo contra o Magnar       - O Cerco às Escadarias
        - A Armadilha de Piche          - O Resgate de Aemon
                         \                      /
                [4. Peça de Cenário Canônica: O Preço da Vitória]
                     - A Queda de Styr & O Fim dos Thenns
                     - O Luto sob as Cinzas de Ygritte
                     - Os Gigantes no Portão Norte
                                    │
                [5. Acerto de Contas: A Vigília das Trombetas]
```

---

## 1. Abertura (2 cenas)

- **id**: `j4_a3_preparativos_barricadas`
  - tipo: `narracao`
  - rota: `comum`
  - objetivo_dramatico: Erguer barricadas desesperadas com carroças viradas, fardos de feno e barris de piche antes que a vanguarda Thenn alcance o pátio sul.
  - marcas_gravadas: [barricada_sul_reforcada, piche_preparado]
  - marcas_lidas: [alerta_de_jon_snow, alarme_sul_soado]
  - origem: `canonica`
  - fonte: A Tormenta de Espadas, Jon VII

- **id**: `j4_a3_hub_conselho_da_noite`
  - tipo: `hub`
  - rota: `comum`
  - objetivo_dramatico: Distribuir setores de combate e conselhos com Donal Noye, Jon Snow e Meistre Aemon antes que as flechas comecem a voar.
  - marcas_gravadas: [confianca_donal_noye, estrategia_jon_snow, bencao_de_aemon]
  - marcas_lidas: [veterano_do_motim, aliado_grenn]
  - origem: `canonica`
  - fonte: A Tormenta de Espadas, Jon VII

---

## 2. Encruzilhada (1 cena)

- **id**: `j4_a3_o_grito_dos_thenns`
  - tipo: `narracao`
  - rota: `comum`
  - objetivo_dramatico: Styr e cem guerreiros de bronze irrompem pela linha de pinheiros; escolher onde travar a linha de morte.
  - marcas_gravadas: [posto_patio_escudos, posto_torre_arqueiros]
  - marcas_lidas: [confianca_donal_noye, estrategia_jon_snow]
  - origem: `canonica`
  - fonte: A Tormenta de Espadas, Jon VII

---

## 3. Rotas (6 cenas: 3 por rota, ≥ 60% conteúdo exclusivo)

### Rota A: A Parede de Escudos do Pátio
- **id**: `j4_a3_patio_choque_de_bronze`
  - tipo: `narracao`
  - rota: `patio`
  - objetivo_dramatico: Conter a carga frontal dos guerreiros Thenn na lama congelada do pátio, travando escudos ao lado de Donal Noye.
  - marcas_gravadas: [parede_de_escudos_firme, lamina_quebrada]
  - marcas_lidas: [barricada_sul_reforcada]
  - origem: `original`
  - fonte: A Tormenta de Espadas, Jon VII (Combate de infantaria no pátio)

- **id**: `j4_a3_patio_duelo_do_magnar`
  - tipo: `dialogo`
  - rota: `patio`
  - objetivo_dramatico: Enfrentar os guardas de elite de Styr e criar uma abertura para Donal Noye derrubar os guerreiros de machado pesado.
  - marcas_gravadas: [sangue_do_magnar, coragem_sob_pressao]
  - marcas_lidas: [confianca_donal_noye]
  - origem: `original`
  - fonte: A Tormenta de Espadas, Jon VII (Duelo tático)

- **id**: `j4_a3_patio_a_armadilha_de_piche`
  - tipo: `narracao`
  - rota: `patio`
  - objetivo_dramatico: Incendiar a vala de óleo e piche negro no momento em que a massa dos Thenns tenta transpor a forja de Noye.
  - marcas_gravadas: [inferno_de_piche_aceso, retaguarda_salva]
  - marcas_lidas: [piche_preparado]
  - origem: `original`
  - fonte: A Tormenta de Espadas, Jon VII (Uso tático de fogo grego/piche)

### Rota B: Os Arqueiros da Torre de Hardin
- **id**: `j4_a3_torre_flechas_na_escuridao`
  - tipo: `narracao`
  - rota: `torre`
  - objetivo_dramatico: Disparar saraivadas precisas do telhado alto do arsenal, alvejando os archotes e abrindo brechas no avanço dos invasores.
  - marcas_gravadas: [pontaria_no_escuro, archotes_apagados]
  - marcas_lidas: [estrategia_jon_snow]
  - origem: `original`
  - fonte: A Tormenta de Espadas, Jon VII (Tiroteio de flechas das torres)

- **id**: `j4_a3_torre_o_cerco_as_escadas`
  - tipo: `dialogo`
  - rota: `torre`
  - objetivo_dramatico: Defender a escadaria em caracol contra invasores que tentam queimar a torre com Jon Snow e os feridos dentro.
  - marcas_gravadas: [escadaria_defendida, companheiro_resgatado]
  - marcas_lidas: [recebeu_jon_ferido]
  - origem: `original`
  - fonte: A Tormenta de Espadas, Jon VII (Defesa das escadas)

- **id**: `j4_a3_torre_o_resgate_de_aemon`
  - tipo: `narracao`
  - rota: `torre`
  - objetivo_dramatico: Impedir que uma tocha atirada pela janela incendeie a câmara do Meistre e os pergaminhos ancestrais da Patrulha.
  - marcas_gravadas: [biblioteca_aemon_salva, pergaminhos_preservados]
  - marcas_lidas: [bencao_de_aemon]
  - origem: `original`
  - fonte: A Tormenta de Espadas, Jon VII (Proteção a Aemon)

---

## 4. Peça de Cenário Canônica (3 cenas fixas)

- **id**: `j4_a3_a_queda_do_magnar`
  - tipo: `peca_de_cenario`
  - rota: `comum`
  - objetivo_dramatico: O desfecho da batalha do sul: a escadaria de madeira desaba em chamas sobre Styr, esmagando o Magnar e encerrando a investida Thenn.
  - marcas_gravadas: [vitoria_em_castelo_negro]
  - marcas_lidas: [inferno_de_piche_aceso, escadaria_defendida, coragem_sob_pressao]
  - origem: `canonica`
  - fonte: A Tormenta de Espadas, Jon VII & VIII

- **id**: `j4_a3_o_luto_sob_as_cinzas`
  - tipo: `peca_de_cenario`
  - rota: `comum`
  - objetivo_dramatico: O amanhecer cinzento sobre as carcaças fumegantes; Jon Snow chora sobre o corpo de Ygritte, flechada no peito na neve do pátio.
  - marcas_gravadas: [testemunha_dor_de_jon, respeito_aos_caidos]
  - marcas_lidas: [pontaria_no_escuro, parede_de_escudos_firme]
  - origem: `canonica`
  - fonte: A Tormenta de Espadas, Jon VIII

- **id**: `j4_a3_o_gigante_no_portao_norte`
  - tipo: `peca_de_cenario`
  - rota: `comum`
  - objetivo_dramatico: Dois toques de trompa ecoam do topo da Muralha: Mance Rayder e os gigantes avançam contra o portão externo; Donal Noye decide descer ao túnel com espada e tocha.
  - marcas_gravadas: [despedida_de_donal_noye, juramento_do_portao_norte]
  - marcas_lidas: [confianca_donal_noye, vitoria_em_castelo_negro]
  - origem: `canonica`
  - fonte: A Tormenta de Espadas, Jon VIII

---

## 5. Acerto de Contas (1 cena)

- **id**: `j4_a3_acerto_de_contas_portao_norte`
  - tipo: `acerto_de_contas`
  - rota: `comum`
  - objetivo_dramatico: Jon Snow assume o comando no topo da Muralha enquanto as barras do túnel descem; o mundo afere 8 marcas da vitória contra os Thenns e prepara a defesa épica contra o exército de Mance no Ato IV.
  - marcas_gravadas: [ato3_concluido, guardia_do_portao]
  - marcas_lidas: [barricada_sul_reforcada, piche_preparado, confianca_donal_noye, estrategia_jon_snow, parede_de_escudos_firme, vitoria_em_castelo_negro, testemunha_dor_de_jon, despedida_de_donal_noye]
  - origem: `canonica`
  - fonte: A Tormenta de Espadas, Jon VIII
