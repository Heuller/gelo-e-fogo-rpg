# Backlog e Dívidas Remanescentes — Crônicas de Sangue e Gelo

Este documento reúne débitos técnicos menores, oportunidades de enriquecimento e potenciais expansões para versões futuras (v2.1+).

---

## 📌 Prioridade Alta (P1)

1. **Ramal do Oeste da Jornada 4 (Ato III-B):**
   - **Descrição:** Implementar os 7 nós adicionais da marcha de Bowen Marsh em direção à Ponte das Caveiras para combater o Chorão (*The Weeper*).
   - **Dependência:** Revisão minuciosa dos capítulos correspondentes de *A Tormenta de Espadas* em `corpus_md/` para assegurar fidelidade absoluta a Meistre Mullin e Sor Denys Mallister na estrada da Dádiva.
   - **Nós Planejados:** `a3b_marcha_para_o_oeste`, `a3b_estrada_da_dadiva`, `a3b_ponte_de_caveiras`, `a3b_a_ferida_de_marsh`, `a3b_sor_denys`, `a3b_sam_e_gilly`, `a3b_volta_a_castelo_negro`.

2. **Mitigação de Vulnerabilidade do Next.js:**
   - **Descrição:** Atualizar a versão do `next` quando uma versão estável e compatível do React 19 estiver consolidada, eliminando o alerta de criticidade registrado no `npm audit` (GHSA-2464-fhr4-w9xw).

---

## 📌 Prioridade Média (P2)

3. **Suíte Completa de Testes E2E com Playwright:**
   - **Descrição:** Configurar o Playwright para executar testes end-to-end de ponta a ponta simulando cliques no navegador em resoluções desktop (1440×900) e mobile (390×844), acompanhado de auditoria automatizada do axe-core para acessibilidade.
   - **Nota:** Hoje o projeto conta com 169 testes unitários e de integração (incluindo 150 simulações de Monte Carlo via Vitest) que garantem a integridade lógica.

4. **Acampamento e Diálogos de Fogueira:**
   - **Descrição:** Mecânica opcional inspirada em *Dragon Age* / *Baldur's Gate 3* permitindo conversar em profundidade com companheiros ativos (ex.: Visenya, Jon Snow, Samwell Tarly) entre nós de conclusão de Ato.

---

## 📌 Prioridade Baixa / Futuro (P3)

5. **Novas Campanhas Históricas:**
   - **A Rebelião de Robert (282 a 283 d.C.):** A Batalha do Sino, o Torneio de Harrenhal e o confronto no Tridente.
   - **A Primeira Rebelião Blackfyre (196 d.C.):** Daemon Blackfyre empunhando a espada dos reis contra Daeron II e Corvo de Sangue no Campo do Capim Vermelho.

6. **Livro da Dinastia (Exportação em PDF/EPUB):**
   - **Descrição:** Permitir ao jogador exportar o histórico completo de suas escolhas e prosas em um formato legível de e-book com capas estilizadas da sua Casa.
