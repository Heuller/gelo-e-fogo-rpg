# PLANO MESTRE — Frontend, Layout, UX e UI + Jornada 4 «Irmão Sem Nome»

**Projeto:** Crônicas de Sangue e Gelo — repositório `Heuller/gelo-e-fogo-rpg` (privado)
**Base auditada:** commit `2f70107` (clone raso feito em 21/10/2026)
**Para:** Richard · **Executor das fases:** Claude Code / Antigravity, na pasta do projeto
**Idioma:** pt-BR. Termos técnicos em inglês só aparecem quando inevitáveis e vêm explicados na primeira vez (veja o glossário da §0.3).

---

## Sumário

- §0 Como usar este arquivo · legenda · glossário
- §1 Resumo executivo (o que encontrei, sem rodeios)
- §2 Diagnóstico detalhado, com evidências (arquivo:linha)
- §3 Direção de design: «Códice Vivo» (tokens, tipografia, layout, componentes, movimento, acessibilidade, textos)
- §4 Roadmap em 15 fases (F0–F14) + **prompts de execução** prontos para colar no Claude Code
- §5 Mecânicas opcionais inspiradas em outros RPGs (fase 12)
- §6 Jornada 4 — «Irmão Sem Nome» (Patrulha da Noite na Batalha de Castelo Negro; bíblia canônica com quadro de fatos por capítulo)
- §7 Prompts de geração da Jornada 4, ato por ato
- §8 Apêndices: checklist de QA, matriz diagnóstico → fase, referências
- §9 Decisões confirmadas (§9.0) e perguntas originais

---

## §0 Como usar este arquivo

### 0.1 Em quatro passos

1. Leia a §1 e a §2. São 15 minutos e explicam *por que* a ordem das fases é a que é.
2. Responda (ou ignore, aceitando o padrão sugerido) as perguntas da §9.
3. Abra o executor na pasta do projeto e rode as fases **na ordem da §4**. Cada fase tem um bloco «Prompt de execução».
4. Ao fim de cada fase, o executor entrega um **Relatório da fase** (modelo na §4.1). Você só precisa conferir: (a) as capturas de tela, (b) a linha «Verificação: 5/5 comandos OK», (c) se o jogo ainda abre com `npm run dev` em <http://localhost:3000/jogar>.

> **Spoilers e fidelidade.** A Jornada 4 é **canônica** (livros de *As Crônicas de Gelo e Fogo*, sobretudo *A Tormenta de Espadas*): ela spoila o enredo dos livros, e **todo fato canônico traz fonte (livro·capítulo) e um grau de confiança** (§6.3). **Atenção:** a fonte consultada na auditoria inicial foi um verbete de fã (AWOIAF), não os seus EPUBs; por isso o primeiro prompt da J4 (P0) **manda conferir cada fato contra `corpus_md/`** antes de escrever cenas.

### 0.2 Legenda

| Marca | Significado |
|---|---|
| **[V]** | **Verificado** lendo o código-fonte. Vem com `arquivo:linha`. |
| **[I]** | **Inferido** a partir do esquema/arquitetura (alta confiança, mas não executei). |
| **[H]** | **Hipótese** que só a execução do app confirma. A Fase 0 existe para confirmá-las. |
| **P0** | Quebra o uso real do jogo ou viola uma regra invulnerável do seu `AGENTS.md`. |
| **P1** | Degrada muito a experiência ou a integridade, mas o jogo roda. |
| **P2** | Polimento. |
| **Esforço P / M / G** | Pequeno (1 sessão) · Médio (2–3 sessões) · Grande (4+ sessões). |

---

## §9.0 Decisões CONFIRMADAS pelo Richard (21/10/2026) — valem acima de qualquer texto em contrário neste arquivo

| # | Decisão | Efeito no plano |
|---|---|---|
| 1 | Servidor autoritativo: **sim** | F1 como desenhada (cliente envia só `slot + escolhaId`). |
| 2 | Modo offline: **não** | Sem fila local/reconciliação; PWA só para instalar. |
| 3 | Ordem: **plano completo** | F0 → F14 na sequência da §4.0; J4 após F3 e, de preferência, F10. |
| 4 | Dependências sem uso: **remover** | Remover `@google/generative-ai`, `howler` **e** `framer-motion` na F4; animações em CSS puro. |
| 5 | Áudio: **sintetizado** | F9 como escrita; `howler` removido. |
| 6 | Voz do texto: **tudo padrão** | UI em «você» (substitui «vós» da §3.10 e de textos como «Qual é o vosso desígnio?» → «Qual é a sua decisão?»); J4 em 2ª pessoa, presente. |
| 7 | Ambientação da J4: **canônica** | J4 passa a ser **canônica**: irmão sem nome da Patrulha da Noite na Batalha de Castelo Negro (§6). |
| 13 | Ramal do Oeste (§7.4) | Incluído com final fatal próprio (`j4_end_morte_ponte_de_caveiras`, totalizando 70 nós). |
| 14 | Conferência de cânone | **P0 obrigatório**: nenhuma cena é escrita antes da verificação dos fatos C1–C33 contra `corpus_md/`. |
| 8 | Relógios por contagem de flags: **sim, já na F3** | Função pura `contarFlags(prefixo)` + flags derivadas `cerco_cheio`/`fissura_cheia`, com testes. |
| 9 | Aprovação de conteúdo (F10 e J4): **sim** | Metadados de revisão mantidos em `docs/jornada4/status-revisao.json`. |
| 10 | Pontos de atributo: **22** | Padrão adotado: **22** (Aegon e Rhaenyra somam 22 no repositório [V]); na F8 o Claude Code confere o motor, unifica numa constante e registra o motivo. |
| 11 | Ação livre com IA: **ainda não** | §5.6 fica fora; F12 não a implementa. |
| 12 | Publicação | Projeto de uso pessoal privado e produção blindada. |
