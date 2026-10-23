# Mecânicas Opcionais — Caderno de Achados, Livro dos Nomes e Relógios

Este documento descreve as três mecânicas narrativas adicionadas na Fase 12, inspiradas em *Disco Elysium*, *Pentiment* e *Blades in the Dark*, preservando a arquitetura determinística e sem alterar regras matemáticas do motor.

---

## 1. Caderno de Achados (Marginálias da Cidadela)

- **Inspiração:** Ovos de Páscoa e pensamentos de *Disco Elysium* e marginálias históricas de *Pentiment*.
- **Conceito:** O leitor atento é recompensado ao examinar pergaminhos ou obter sucessos em testes passivos de atributos.
- **Funcionamento Técnico:**
  - 22 flags de prefixo `ea_*` (ex.: `ea_trompas`, `ea_aco_ferro_cobre`, `ea_muralha_se_defende`).
  - Cada achado traz: Título, Âncora do cânone (C1..C33), Citação de livro/capítulo e uma nota de margem dos Meistres da Cidadela.
  - Componente: `src/components/game/CadernoDeAchados.tsx`.
  - Exibição: Aba «Notas» na coluna lateral do jogo e contador «X/22 Descobertos» na `TelaDeFinal.tsx`.
  - Não altera desfechos nem bloqueia progressão: puramente colecionável e educativo.

---

## 2. O Livro dos Nomes (Memorial da Patrulha)

- **Inspiração:** O tema de memória e anonimato em *Pentiment* e o papel dos escribas medievais.
- **Conceito:** Cada figura canônica que o jogador conhece, auxilia ou perde ao longo da campanha é imortalizada em um tomo memorial encadernado em couro negro.
- **Funcionamento Técnico:**
  - Registra personagens marcantes (`nome_noye`, `nome_selvagem_ygritte`, `juramento_ao_velho_urso`, `nome_goiva`, etc.).
  - Classifica a condição de cada nome: «Vivo & Juramentado», «Caído no Cumprimento do Dever», «Povo Livre» ou «Muralha Eterna».
  - Componente: `src/components/game/LivroDosNomes.tsx`.
  - Alimenta o clímax e o Final VI («O Guardião do Livro dos Nomes»).

---

## 3. Relógios de Consequência

- **Inspiração:** Os relógios de facção e perigo de *Blades in the Dark* (John Harper).
- **Conceito:** Relógios circulares de 4 ou 6 segmentos que avançam visualmente conforme falhas parciais ou eventos dramáticos se acumulam.
- **Funcionamento Técnico:**
  - Derivação pura por contagem de flags distintas: `contarFlags(worldState, prefixo)`.
  - **O Cerco de Castelo Negro (`tick_cerco_*`):** 6 segmentos. Quando cheio, dispara a flag derivada `cerco_cheio`.
  - **A Fissura da Patrulha (`tick_fissura_*`):** 4 segmentos. Quando cheio, dispara a flag derivada `fissura_cheia`.
  - Componente: `src/components/game/RelogioSegmentos.tsx` (renderização SVG pura com animação suave e alerta quando atinge o limite).
  - Regra de robustez: Número de fontes no grafo > número de segmentos.
