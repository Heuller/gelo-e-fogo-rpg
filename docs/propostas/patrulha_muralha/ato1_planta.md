# Planta Narrativa do Ato I: As Cinzas do Punho e a Fuga na Neve
**Jornada 4:** «Irmão Sem Nome» (Padrão-Ouro v2.2)  
**Ano Histórico:** 299 d.C.  
**Localização Principal:** O Punho dos Primeiros Homens e a Floresta Assombrada além da Muralha  
**POV:** Irmão Sem Nome  
**Epígrafe de Abertura:**  
> *«A noite não pede licença para cair, e o gelo não pede desculpas pelo sangue que endurece na pedra.»*  
> — Canção Antiga dos Patrulheiros da Noite

---

## Estrutura do Diamante com Rotas (§6C.1)

```
       [1. Abertura: Cinzas do Punho & Reunião dos Sobreviventes (Hub)]
                                    │
                  [2. Encruzilhada: A Ordem de Retirada]
                         /                      \
      [Rota A: Vanguarda de Mormont]   [Rota B: Flanco dos Batedores]
       - Trilha na Nevasca              - Rastros na Floresta
       - Emboscada da Fera              - Confronto na Ravina
       - Acampamento das Tochas         - Resgate na Neve
                         \                      /
               [4. Peça de Cenário Canônica: A Marcha do Pesadelo]
                    - A Morte Branca na Floresta
                    - O Colapso dos Cavalos & Small Paul
                    - A Visão da Fortaleza de Craster
                                    │
               [5. Acerto de Contas: O Balanço dos Vivos]
```

---

## 1. Abertura (2 cenas)

- **id**: `j4_a1_cinzas_do_punho`
  - tipo: `narracao`
  - rota: `comum`
  - objetivo_dramatico: Despertar entre os cadáveres congelados do Punho dos Primeiros Homens após os três toques de trombeta, estancar o próprio sangue e alcançar a paliçada viva.
  - marcas_gravadas: [sobreviveu_ao_punho, ferida_da_neve]
  - marcas_lidas: []
  - origem: `canonica`
  - fonte: A Tormenta de Espadas, Prólogo & Samwell I

- **id**: `j4_a1_reuniao_sobreviventes_hub`
  - tipo: `hub`
  - rota: `comum`
  - objetivo_dramatico: Conversar com os irmãos sobreviventes (Grenn, Chett e Small Paul) para avaliar feridos, mantimentos e o terror dos olhos azuis antes que a coluna parta.
  - marcas_gravadas: [aliado_grenn, desconfianca_chett, protegeu_paul]
  - marcas_lidas: []
  - origem: `canonica`
  - fonte: A Tormenta de Espadas, Samwell I

---

## 2. Encruzilhada (1 cena)

- **id**: `j4_a1_encruzilhada_retirada`
  - tipo: `hub`
  - rota: `comum`
  - objetivo_dramatico: Jeor Mormont organiza a retirada sob tempestade; o protagonista deve escolher seu posto de combate e risco.
  - marcas_gravadas: [posto_vanguarda, posto_batedores]
  - marcas_lidas: [ferida_da_neve]
  - origem: `canonica`
  - fonte: A Tormenta de Espadas, Samwell I

---

## 3. Rotas (6 cenas: 3 por rota, ≥ 60% conteúdo exclusivo)

### Rota A: Vanguarda com o Velho Urso
- **id**: `j4_a1_vanguarda_trilha_neve`
  - tipo: `narracao`
  - rota: `vanguarda`
  - objetivo_dramatico: Abrir caminho pela neve virgem com machados e tochas, impedindo que a coluna congele e se perca nas ravinas.
  - marcas_gravadas: [abriu_trilha_neve, confianca_mormont]
  - marcas_lidas: []
  - origem: `original`
  - fonte: A Tormenta de Espadas, Samwell I (Dramatização de rota do RPG)

- **id**: `j4_a1_vanguarda_emboscada_criatura`
  - tipo: `dialogo`
  - rota: `vanguarda`
  - objetivo_dramatico: Confrontar uma fera reanimada que salta dos pinheiros congelados, arriscando a vida para proteger a montaria do Senhor Comandante.
  - marcas_gravadas: [matou_criatura_punho, cicatriz_gelo]
  - marcas_lidas: []
  - origem: `original`
  - fonte: A Tormenta de Espadas, Samwell I (Encontro tático)

- **id**: `j4_a1_vanguarda_acampamento_tochas`
  - tipo: `narracao`
  - rota: `vanguarda`
  - objetivo_dramatico: Manter as tochas acesas sob a ventania e conter o início de desespero e motim entre os homens de Chett.
  - marcas_gravadas: [fogo_preservado, conteve_panico]
  - marcas_lidas: [desconfianca_chett]
  - origem: `original`
  - fonte: A Tormenta de Espadas, Samwell I & II

### Rota B: Flanco dos Batedores com Grenn
- **id**: `j4_a1_batedores_rastros_floresta`
  - tipo: `narracao`
  - rota: `batedores`
  - objetivo_dramatico: Rastrear pegadas e silhuetas entre os pinheiros gelados para impedir que a coluna seja flanqueada por selvagens ou mortos.
  - marcas_gravadas: [rastreou_silhuetas, sentidos_apurados]
  - marcas_lidas: []
  - origem: `original`
  - fonte: A Tormenta de Espadas, Samwell I (Dramatização de batedores)

- **id**: `j4_a1_batedores_ravina_confronto`
  - tipo: `dialogo`
  - rota: `batedores`
  - objetivo_dramatico: Emboscada rápida contra sombras que cercavam a retaguarda, lutando ombro a ombro com Grenn na neve até os joelhos.
  - marcas_gravadas: [sangue_na_ravina, irmandade_grenn]
  - marcas_lidas: [aliado_grenn]
  - origem: `original`
  - fonte: A Tormenta de Espadas, Samwell I (Combate tático)

- **id**: `j4_a1_batedores_resgate_neve`
  - tipo: `narracao`
  - rota: `batedores`
  - objetivo_dramatico: Localizar e arrastar um irmão patrulheiro ferido preso em uma fenda congelada, recuperando seu manto e mantimentos.
  - marcas_gravadas: [irmao_resgatado_neve, suprimentos_salvos]
  - marcas_lidas: []
  - origem: `original`
  - fonte: A Tormenta de Espadas, Samwell I (Evento de exploração)

---

## 4. Peça de Cenário Canônica (3 cenas fixas)

- **id**: `j4_a1_nevasca_pesadelo_marcha`
  - tipo: `peca_de_cenario`
  - rota: `comum`
  - objetivo_dramatico: Enfrentar a noite mais fria da marcha; os blocos condicionais variam conforme o estado das tochas e feridas dos homens.
  - marcas_gravadas: [resistiu_ao_frio_extremo]
  - marcas_lidas: [fogo_preservado, ferida_da_neve, cicatriz_gelo]
  - origem: `canonica`
  - fonte: A Tormenta de Espadas, Samwell I

- **id**: `j4_a1_colapso_animais_paul`
  - tipo: `peca_de_cenario`
  - rota: `comum`
  - objetivo_dramatico: Small Paul chora pela morte do cavalo de carga; decidir se ajuda a carregar o fardo exaustivo ou força a marcha pela sobrevivência.
  - marcas_gravadas: [fardo_compartilhado, cavalo_abatido]
  - marcas_lidas: [protegeu_paul, suprimentos_salvos]
  - origem: `canonica`
  - fonte: A Tormenta de Espadas, Samwell I

- **id**: `j4_a1_avistando_fortaleza_craster`
  - tipo: `peca_de_cenario`
  - rota: `comum`
  - objetivo_dramatico: O alívio amargo ao avistar a cerca de estacas e o telhado fumegante de Craster, sabendo o que aquele abrigo exige.
  - marcas_gravadas: [avistou_fortaleza_craster]
  - marcas_lidas: [confianca_mormont, irmandade_grenn]
  - origem: `canonica`
  - fonte: A Tormenta de Espadas, Samwell II

---

## 5. Acerto de Contas (1 cena)

- **id**: `j4_a1_acerto_de_contas_craster`
  - tipo: `acerto_de_contas`
  - rota: `comum`
  - objetivo_dramatico: Mormont reúne os menos de cinquenta sobreviventes na cabana; o mundo avalia as 8 marcas acumuladas e define as tensões do motim do Ato II.
  - marcas_gravadas: [ato1_concluido, divida_com_craster]
  - marcas_lidas: [sobreviveu_ao_punho, ferida_da_neve, aliado_grenn, desconfianca_chett, protegeu_paul, confianca_mormont, fogo_preservado, irmao_resgatado_neve]
  - origem: `canonica`
  - fonte: A Tormenta de Espadas, Samwell II
