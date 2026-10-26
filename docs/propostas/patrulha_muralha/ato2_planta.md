# Planta Narrativa do Ato II: O Motim em Craster & A Sentinela do Gelo
**Jornada 4:** «Irmão Sem Nome» (Padrão-Ouro v2.2)  
**Ano Histórico:** 299 d.C.  
**Localização Principal:** Fortaleza de Craster, Floresta Assombrada e Castelo Negro  
**POV:** Irmão Sem Nome  
**Epígrafe de Abertura:**  
> *«O corvo come o grão, o lobo caça a corça, mas é o irmão que crava a faca nas costas de quem veste a mesma capa.»*  
> — Dito de Patrulheiro, Arquivos da Torre de Hardin

---

## Estrutura do Diamante com Rotas (§6C.1)

```
       [1. Abertura: As Tensões em Craster & Hub de Conspiração]
                                    │
                  [2. Encruzilhada: O Estopim do Motim]
                         /                      \
       [Rota A: Os Leais de Mormont]   [Rota B: O Resgate de Sam & Goiva]
        - Sangue no Salão               - Fuga pelas Estrebarias
        - A Queda do Velho Urso         - Emboscada nos Pinheiros
        - Retirada sob as Chamas        - O Corvo e a Lâmina
                         \                      /
                [4. Peça de Cenário Canônica: O Retorno a Castelo Negro]
                     - A Marcha dos Esfarrapados
                     - A Visão da Muralha Colossal
                     - O Retorno de Jon Snow Ferido
                                    │
                [5. Acerto de Contas: O Conselho sob o Gelo]
```

---

## 1. Abertura (2 cenas)

- **id**: `j4_a2_fortaleza_craster_tensoes`
  - tipo: `narracao`
  - rota: `comum`
  - objetivo_dramatico: Sobreviver aos dias de fome sufocante na Fortaleza de Craster, onde o cheiro de gangrena e fumaça alimenta o ódio dos homens famintos.
  - marcas_gravadas: [testemunha_da_fome, divisao_entre_irmaos]
  - marcas_lidas: [divida_com_craster, ferida_da_neve]
  - origem: `canonica`
  - fonte: A Tormenta de Espadas, Samwell II

- **id**: `j4_a2_craster_hub_conspiracao`
  - tipo: `hub`
  - rota: `comum`
  - objetivo_dramatico: Conversar com irmãos leais e conspiradores para medir quem está prestes a quebrar o juramento antes que a violência exploda.
  - marcas_gravadas: [ouviu_karl_pe_rapado, lealdade_a_mormont, compaixao_por_sam]
  - marcas_lidas: [aliado_grenn, desconfianca_chett]
  - origem: `canonica`
  - fonte: A Tormenta de Espadas, Samwell II

---

## 2. Encruzilhada (1 cena)

- **id**: `j4_a2_estopim_do_motim`
  - tipo: `narracao`
  - rota: `comum`
  - objetivo_dramatico: Craster chama os homens da Patrulha de mendigos e saca o machado; Karl e Dirk avançam com facas e a rebelião explode no salão comunal.
  - marcas_gravadas: [posto_defesa_mormont, posto_fuga_sam]
  - marcas_lidas: [lealdade_a_mormont, ouviu_karl_pe_rapado]
  - origem: `canonica`
  - fonte: A Tormenta de Espadas, Samwell II

---

## 3. Rotas (6 cenas: 3 por rota, ≥ 60% conteúdo exclusivo)

### Rota A: Os Leais de Mormont
- **id**: `j4_a2_leais_sangue_no_salao`
  - tipo: `narracao`
  - rota: `leais`
  - objetivo_dramatico: Lutar ombro a ombro com Grenn e os homens fiéis para tentar conter os amotinados de punhal em punho no salão fétido.
  - marcas_gravadas: [luta_no_salao_craster, golpe_desferido]
  - marcas_lidas: [irmandade_grenn]
  - origem: `original`
  - fonte: A Tormenta de Espadas, Samwell II (Dramatização do combate no salão)

- **id**: `j4_a2_leais_queda_do_velho_urso`
  - tipo: `dialogo`
  - rota: `leais`
  - objetivo_dramatico: Testemunhar o golpe fatal de Ollo Mão Cortada contra Jeor Mormont e ouvir o último desejo do Senhor Comandante antes da morte.
  - marcas_gravadas: [testemunha_morte_mormont, juramento_ao_velho_urso]
  - marcas_lidas: [confianca_mormont]
  - origem: `canonica`
  - fonte: A Tormenta de Espadas, Samwell II

- **id**: `j4_a2_leais_retirada_chamas`
  - tipo: `narracao`
  - rota: `leais`
  - objetivo_dramatico: Romper as portas trancadas e escapar das paliçadas em chamas sob o ataque violento dos amotinados embriagados.
  - marcas_gravadas: [escapou_do_motim, vinganca_jurada]
  - marcas_lidas: []
  - origem: `original`
  - fonte: A Tormenta de Espadas, Samwell II (Fuga da fortaleza)

### Rota B: O Resgate de Sam & Goiva
- **id**: `j4_a2_resgate_fuga_estrebarias`
  - tipo: `narracao`
  - rota: `resgate`
  - objetivo_dramatico: Guiar Samwell Tarly e Goiva com o recém-nascido através das esteiras de esterco até os cavalos restantes nos fundos.
  - marcas_gravadas: [protegeu_goiva_e_sam, cavalo_de_fuga_selado]
  - marcas_lidas: [protegeu_paul]
  - origem: `canonica`
  - fonte: A Tormenta de Espadas, Samwell II & III

- **id**: `j4_a2_resgate_emboscada_pinheiros`
  - tipo: `dialogo`
  - rota: `resgate`
  - objetivo_dramatico: Conter dois amotinados desertores que tentam roubar o cavalo de Goiva e silenciar os fugitivos na orla da mata.
  - marcas_gravadas: [derrotou_desertores, sangue_de_traidor]
  - marcas_lidas: [adaga_obsidiana_guardada]
  - origem: `original`
  - fonte: A Tormenta de Espadas, Samwell III (Fuga pela floresta)

- **id**: `j4_a2_resgate_o_corvo_e_a_lamina`
  - tipo: `narracao`
  - rota: `resgate`
  - objetivo_dramatico: Atravessar o cemitério de pinheiros sob os gritos de corvos mensageiros e a presença latente dos mortos que rondam o casebre.
  - marcas_gravadas: [guiou_os_desamparados, pressagio_dos_corvos]
  - marcas_lidas: []
  - origem: `original`
  - fonte: A Tormenta de Espadas, Samwell III (Trilha da floresta)

---

## 4. Peça de Cenário Canônica (3 cenas fixas)

- **id**: `j4_a2_marcha_dos_esfarrapados`
  - tipo: `peca_de_cenario`
  - rota: `comum`
  - objetivo_dramatico: Conduzir os poucos leais extenuados pelas trilhas da Floresta Assombrada rumo ao sul, sem comandante e sem comida.
  - marcas_gravadas: [liderou_os_esfarrapados]
  - marcas_lidas: [escapou_do_motim, guiou_os_desamparados, juramento_ao_velho_urso]
  - origem: `canonica`
  - fonte: A Tormenta de Espadas, Samwell III & Jon VI

- **id**: `j4_a2_a_visao_da_muralha`
  - tipo: `peca_de_cenario`
  - rota: `comum`
  - objetivo_dramatico: Avistar o colosso de gelo e pedra de Castelo Negro erguendo-se contra o poente, prometendo segurança aos homens jurados.
  - marcas_gravadas: [avistou_muralha_salvacao]
  - marcas_lidas: [luta_no_salao_craster, protegeu_goiva_e_sam]
  - origem: `canonica`
  - fonte: A Tormenta de Espadas, Jon VI

- **id**: `j4_a2_retorno_jon_snow_ferido`
  - tipo: `peca_de_cenario`
  - rota: `comum`
  - objetivo_dramatico: Entrar no pátio de Castelo Negro no momento em que Jon Snow desmonta ensanguentado, anunciando que os Thenns descem pelo sul.
  - marcas_gravadas: [recebeu_jon_ferido, alarme_sul_soado]
  - marcas_lidas: [aliado_grenn, testemunha_morte_mormont]
  - origem: `canonica`
  - fonte: A Tormenta de Espadas, Jon VI

---

## 5. Acerto de Contas (1 cena)

- **id**: `j4_a2_acerto_de_contas_castelo_negro`
  - tipo: `acerto_de_contas`
  - rota: `comum`
  - objetivo_dramatico: Donal Noye e Meistre Aemon convocam os sobreviventes na armaria; o mundo afere 8 marcas do motim e define as defesas da Batalha de Castelo Negro.
  - marcas_gravadas: [ato2_concluido, veterano_do_motim]
  - marcas_lidas: [testemunha_da_fome, lealdade_a_mormont, testemunha_morte_mormont, juramento_ao_velho_urso, protegeu_goiva_e_sam, derrotou_desertores, liderou_os_esfarrapados, recebeu_jon_ferido]
  - origem: `canonica`
  - fonte: A Tormenta de Espadas, Jon VI & VII
