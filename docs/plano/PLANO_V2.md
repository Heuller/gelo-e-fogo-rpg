# PLANO v2.2 — O SALTO DE QUALIDADE (execução autônoma)
### «Crônicas de Sangue e Gelo» (repositório `Heuller/gelo-e-fogo-rpg`) — estado auditado em 23–24/10/2026

> **Para quem é:** Richard, como dono do projeto, e o executor autônomo.
> **Para rodar tudo sem intervenção, vá ao §7 (prompt único).**
> **O que é:** um plano **novo**, feito sobre o jogo **como ele está hoje** (v2.0.0 + J5 + Acampamento), não sobre o estado de 21/10 que o plano anterior descrevia.
> **Versão 2.2 (24/10/2026, depois do seu teste de jogo):** o seu relato sobre as jornadas — escolhas que não mudam o que vem depois, texto disperso, português que soa de Portugal, histórias rasas, vontade de sentir *Baldur's Gate 3* e um grande livro — **virou o centro do plano**. Eu medi cada queixa nos dados (§2.5) e **todas se confirmaram**. A fase de prosa antiga foi substituída por três fases novas, G6A, G6B e G6C.
> **Versão 2.1:** incorpora as suas instruções — execução **sem pedir permissão**, avaliação **só no final**, ação livre **quebrada na prática** (diagnosticada em S-05, S-09 a S-11), **sem preocupação com direitos autorais** e **todas as decisões em aberto tomadas por mim** (§9).
> **Regra do documento:** cada afirmação traz uma etiqueta de evidência. **[L]** = li o código ou o arquivo. **[M]** = medi com script, e o método está dito. **[W]** = veio da leitura da landing pelo WebFetch, que devolve um resumo feito por modelo e não o HTML cru. **[I]** = inferência minha, a confirmar. **[N]** = não verifiquei. Onde a evidência é fraca, eu digo.

---

## §0. Base de evidência — o que eu vi e o que NÃO consegui ver

| Item | Situação |
|---|---|
| Repositório | **[L]** Clonado e lido em `master`, commit de topo `f856b8c` (J5), 26 commits. |
| CI no GitHub | **[L]** Os 5 últimos runs de «CI – Integridade e Segurança» e o deploy de Pages aparecem como `success`. Isso é o único indício de que typecheck, lint, testes e build passam. |
| Rodar `tsc`, `lint`, `vitest`, `build` | **[N] Não consegui.** O npm deste ambiente é bloqueado pelo proxy (`registry.npmjs.org` recusado). Não confirmei nenhum número de teste. |
| App na Vercel (`gelo-e-fogo-rpg-fkoi.vercel.app`) | **[N] Não consegui abrir.** O acesso automatizado foi recusado por `robots` (o site pede para não ser lido por robôs). Não contornei, e o jogo exige login do proprietário de qualquer forma. **Eu nunca vi a tela de jogo renderizada.** Tudo o que digo sobre UI/UX vem do código e da landing. |
| Landing (GitHub Pages) | **[W]** Lida só como resumo de modelo. O HTML cru não ficou acessível ao shell. Os achados U-01 a U-03 precisam ser conferidos no HTML real. |
| Fatos do cânone | **[N]** Não reverifiquei nenhum fato de Martin nesta rodada. |
| Modelo do Gemini | **[N]** O código usa `gemini-2.5-flash` como padrão (`geminiMaster.ts:241,367`). Não verifiquei se é o modelo adequado hoje. Confira na documentação oficial do Google antes de decidir. |

---

## §1. Resumo executivo

### 1.1 Onde o projeto está de verdade
O plano anterior foi executado quase inteiro: servidor autoritativo com saves no Supabase, registro de jornadas, design system «Códice Vivo», mapa, cartão de rolagem, áudio sintético, Caderno de Achados, Livro dos Nomes, relógios, CSP com nonce, e a J4 «Irmão Sem Nome». Além disso foram feitas:
- a **Jornada 5** («A Rebelião de Robert»);
- o **Acampamento** (diálogos de fogueira, `dialogosAcampamento.ts`);
- o **Ramal do Oeste** da J4;
- a **ação livre com IA** (`classificarAcaoLivre`, `processarAcaoLivreAction`).

### 1.2 A tese deste plano
1. O servidor autoritativo tem furos (S-01 a S-03).
2. As jornadas são curtas, rasas e quase lineares.
2b. O português tem sabor de Portugal e de arcaísmo (228 ocorrências de vós/vosso).
3. A fidelidade ao cânone precisa de comprovação rigorosa.
4. A vitrine/landing contradiz o produto.
5. Desfazer, Rerrolar e Ação Livre estão desconectados do servidor na tela de jogo (S-09 a S-11).
6. Necessidade de testes E2E, acessibilidade e mobile.

### 1.3 Modo de execução e decisões delegadas
- Sem pedir permissão. O executor decide sozinho e registra em `docs/DECISOES_AUTONOMAS.md`.
- Direitos autorais: fora de escopo (jogo pessoal). Prosa original no estilo da obra.
- Únicas paradas permitidas: apagar dados de produção, force push na master, vazar segredos.

---

## §7. PROMPT ÚNICO DE EXECUÇÃO AUTÔNOMA

Trabalhar na branch `v2`. Executar na ordem:
`G0 → G1 → G1B → G11 (E2E mínimo) → G3 → G6B → G2 → G4 → G5 → G6A → G6C (J4 → J3 → J2 → J1 → J5; G7 e G7B intercaladas por ato) → G9 → G8 → G10 → G12 → G11 (completa) → G13`.
