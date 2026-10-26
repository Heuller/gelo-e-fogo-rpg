# Planta Narrativa do Ato IV: A Batalha de Stannis & A Eleição do 998º
**Jornada 4:** «Irmão Sem Nome» (Padrão-Ouro v2.2)  
**Ano Histórico:** 300 d.C.  
**Localização Principal:** Castelo Negro (Topo da Muralha, Tenda de Mance e Salão Comunal)  
**POV:** Irmão Sem Nome  
**Epígrafe de Abertura:**  
> *«Eu sou a espada na escuridão. Eu sou a sentinela nas muralhas. Eu sou o fogo que queima contra o frio, a luz que traz o amanhecer, o corno que acorda os que dormem.»*  
> — Juramento Sagrado da Patrulha da Noite

---

## Estrutura do Diamante com Rotas (§6C.1)

```
       [1. Abertura: O Cerco de Cem Mil & Hub de Slynt e Thorne]
                                    │
                  [2. Encruzilhada: O Dilema da Embaixada]
                         /                      \
       [Rota A: A Tenda de Mance Rayder] [Rota B: A Resistência a Slynt]
        - O Berrante do Inverno          - Confronto com Janos Slynt
        - As Trombetas de Stannis        - O Conselho com Pyke e Mallister
        - A Carga do Coração Flamejante  - A Chegada de Melisandre e Stannis
                         \                      /
                [4. Peça de Cenário Canônica: O Destino da Muralha]
                     - A Oferta de Winterfell a Jon Snow
                     - A Eleição do 998º no Conclave
                     - O Corvo que Salta da Chaleira
                                    │
                [5. Acerto de Contas: O Juramento Eterno da Patrulha]
```

---

## 1. Abertura (2 cenas)

- **id**: `j4_a4_o_cerco_massivo_do_norte`
  - tipo: `narracao`
  - rota: `comum`
  - objetivo_dramatico: Sustentar o bombardeio maciço de pedras e flechas incendiárias de Mance Rayder contra o topo da Muralha sob o comando de Jon Snow.
  - marcas_gravadas: [muralha_sustentada, pedras_arremessadas]
  - marcas_lidas: [guardia_do_portao, vitoria_em_castelo_negro]
  - origem: `canonica`
  - fonte: A Tormenta de Espadas, Jon VIII & IX

- **id**: `j4_a4_hub_chegada_slynt_thorne`
  - tipo: `hub`
  - rota: `comum`
  - objetivo_dramatico: Enfrentar a hoste de reforços de Atalaia do Mar liderada por Janos Slynt e Alliser Thorne, que pretendem tomar o comando e prender Jon Snow.
  - marcas_gravadas: [desafiou_janos_slynt, desmascarou_thorne, lealdade_ao_norte]
  - marcas_lidas: [testemunha_dor_de_jon, juramento_do_portao_norte]
  - origem: `canonica`
  - fonte: A Tormenta de Espadas, Jon IX

---

## 2. Encruzilhada (1 cena)

- **id**: `j4_a4_o_dilema_da_embaixada`
  - tipo: `narracao`
  - rota: `comum`
  - objetivo_dramatico: Janos Slynt ordena que Jon Snow vá à tenda de Mance para assassiná-lo sob bandeira de paz; decidir o posto de combate neste momento decisivo.
  - marcas_gravadas: [posto_embaixada_mance, posto_resistencia_slynt]
  - marcas_lidas: [desafiou_janos_slynt, lealdade_ao_norte]
  - origem: `canonica`
  - fonte: A Tormenta de Espadas, Jon IX & X

---

## 3. Rotas (6 cenas: 3 por rota, ≥ 60% conteúdo exclusivo)

### Rota A: A Tenda de Mance Rayder
- **id**: `j4_a4_mance_o_chifre_do_inverno`
  - tipo: `dialogo`
  - rota: `mance`
  - objetivo_dramatico: Acompanhar Jon Snow na tenda de peles de mamute de Mance Rayder e presenciar a revelação do Berrante de Joramun.
  - marcas_gravadas: [testemunha_do_berrante, diplomacia_do_povo_livre]
  - marcas_lidas: [posto_embaixada_mance]
  - origem: `canonica`
  - fonte: A Tormenta de Espadas, Jon X

- **id**: `j4_a4_mance_trombetas_do_sul`
  - tipo: `narracao`
  - rota: `mance`
  - objetivo_dramatico: Testemunhar o clangor súbito de trombetas e a irrupção das colunas de cavaleiros do Rei Stannis Baratheon atacando os selvagens.
  - marcas_gravadas: [trombetas_de_stannis_ouvidas, choque_na_floresta]
  - marcas_lidas: []
  - origem: `original`
  - fonte: A Tormenta de Espadas, Jon X (Dramatização da carga na floresta)

- **id**: `j4_a4_mance_o_abate_na_floresta`
  - tipo: `narracao`
  - rota: `mance`
  - objetivo_dramatico: Proteger Jon Snow em meio ao caos da debandada selvagem enquanto os cavaleiros do Coração Flamejante capturam Mance.
  - marcas_gravadas: [mance_capturado_vivo, honra_em_combate]
  - marcas_lidas: [testemunha_do_berrante]
  - origem: `original`
  - fonte: A Tormenta de Espadas, Jon X (Conclusão do combate externo)

### Rota B: A Resistência a Janos Slynt
- **id**: `j4_a4_resistencia_enfrentar_janos_slynt`
  - tipo: `dialogo`
  - rota: `resistencia`
  - objetivo_dramatico: Confrontar a tirania de Janos Slynt no pátio de Castelo Negro, recusando ordens injustas e mobilizando os veteranos.
  - marcas_gravadas: [confrontou_tirania_slynt, respeito_dos_veteranos]
  - marcas_lidas: [posto_resistencia_slynt]
  - origem: `original`
  - fonte: A Tormenta de Espadas, Jon X (Tensão política interna)

- **id**: `j4_a4_resistencia_o_conselho_das_celas`
  - tipo: `narracao`
  - rota: `resistencia`
  - objetivo_dramatico: Ganhar o apoio dos comandantes Cotter Pyke e Denys Mallister, impedindo uma execução sumária nas celas de gelo.
  - marcas_gravadas: [apoio_pyke_mallister, celas_de_gelo_evitadas]
  - marcas_lidas: [desmascarou_thorne]
  - origem: `original`
  - fonte: A Tormenta de Espadas, Jon X & XI (Articulação política)

- **id**: `j4_a4_resistencia_a_chegada_do_rei`
  - tipo: `narracao`
  - rota: `resistencia`
  - objetivo_dramatico: Receber o Rei Stannis Baratheon e Melisandre no portão sul após a vitória, desmantelando a conspiração de Slynt.
  - marcas_gravadas: [presenca_do_rei_stannis, justica_imposta_a_slynt]
  - marcas_lidas: []
  - origem: `original`
  - fonte: A Tormenta de Espadas, Jon XI (Entrada de Stannis em Castelo Negro)

---

## 4. Peça de Cenário Canônica (3 cenas fixas)

- **id**: `j4_a4_a_oferta_de_winterfell`
  - tipo: `dialogo`
  - rota: `comum`
  - objetivo_dramatico: Presenciar a tentação final de Jon Snow na câmara real: Stannis oferece legitimá-lo como Senhor de Winterfell se ele queimar o represeiro.
  - marcas_gravadas: [testemunha_recusa_de_jon, juramento_inquebrantavel]
  - marcas_lidas: [presenca_do_rei_stannis, mance_capturado_vivo]
  - origem: `canonica`
  - fonte: A Tormenta de Espadas, Jon XI & XII

- **id**: `j4_a4_a_eleicao_do_998_conclave`
  - tipo: `peca_de_cenario`
  - rota: `comum`
  - objetivo_dramatico: O conclave dos patrulheiros no refeitório; a contagem tensa das fichas de barro na urna e as maquinações de Samwell Tarly.
  - marcas_gravadas: [urna_do_conclave_votada]
  - marcas_lidas: [apoio_pyke_mallister, desafiou_janos_slynt]
  - origem: `canonica`
  - fonte: A Tormenta de Espadas, Samwell IV & V

- **id**: `j4_a4_o_corvo_da_urna`
  - tipo: `peca_de_cenario`
  - rota: `comum`
  - objetivo_dramatico: O corvo de Mormont salta de dentro da chaleira de ferro na contagem final e pousa no ombro de Jon Snow, aclamando o 998º Senhor Comandante.
  - marcas_gravadas: [aclamacao_de_jon_snow]
  - marcas_lidas: [juramento_inquebrantavel, urna_do_conclave_votada]
  - origem: `canonica`
  - fonte: A Tormenta de Espadas, Jon XII & Samwell V

---

## 5. Acerto de Contas (1 cena)

- **id**: `j4_a4_fecho_o_juramento_eterno`
  - tipo: `acerto_de_contas`
  - rota: `comum`
  - objetivo_dramatico: Renovar os votos no topo da Muralha ao lado do novo Senhor Comandante Jon Snow; o mundo avalia as 8 marcas do ato e consagra a vitória épica da jornada «Irmão Sem Nome».
  - marcas_gravadas: [jornada4_concluida, lenda_do_irmao_sem_nome]
  - marcas_lidas: [muralha_sustentada, desafiou_janos_slynt, lealdade_ao_norte, testemunha_do_berrante, mance_capturado_vivo, testemunha_recusa_de_jon, juramento_inquebrantavel, aclamacao_de_jon_snow]
  - origem: `canonica`
  - fonte: A Tormenta de Espadas, Jon XII
