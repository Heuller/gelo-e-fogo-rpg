# 🛡️ Checklist de Go-Live Privado: Crônicas de Sangue e Gelo (v2.1)

> **Status:** Pronto para auditoria final antes do deploy.

---

### Fase 0 — Linha de Base e Regras
- [x] **Prompt 0.1:** Auditoria inicial concluída e documentada em `docs/auditoria-baseline.md`.
- [x] **Prompt 0.2:** `AGENTS.md` e workflows (`verificar.md`, `auditar-seguranca.md`) criados.

### Fase 1 — Segurança e Higiene
- [x] **Prompt 1.1:** `.gitignore` e `.vercelignore` protegendo `origem/`, `corpus_md/`, `*.epub` e `.env*`.
- [x] **Prompt 1.1:** `scripts/check_secrets.mjs` passando com zero segredos rastreados.
- [x] **Prompt 1.1:** `docs/plano-limpeza-historico.md` registrado.
- [x] **Prompt 1.2:** Vulnerabilidade PostCSS eliminada via `overrides` em `package.json` (0 vulnerabilidades).
- [x] **Prompt 1.2:** `dependabot.yml` configurado para monitoramento semanal.
- [x] **Prompt 1.3:** `requireOwner` blindado sem fallback permissivo em produção.
- [x] **Prompt 1.3:** `public/robots.txt`, meta tag noindex e header `X-Robots-Tag` ativos.
- [x] **Prompt 1.3:** Headers de segurança (CSP, HSTS, X-Frame-Options, Permissions-Policy) configurados.
- [x] **Prompt 1.3:** Rate limiting em `/api/game/turn` ativo (30 req/min).
- [x] **Prompt 1.4:** Migrações versionadas criadas em `supabase/migrations/` com RLS e constraint de 3 slots.
- [x] **Prompt 1.4:** Tabela `turn_events` estritamente append-only (sem mutação).
- [x] **Prompt 1.4:** `.env.example` criado.

### Fase 2 — Qualidade e IA Segura
- [x] **Prompt 2.1:** Testes de grafo BFS comprovando que todos os 18 finais são alcançáveis (`docs/relatorio-alcancabilidade.md`).
- [x] **Prompt 2.1:** Property-based tests validando invariantes de barras, inspiração, aprovação e 2d6.
- [x] **Prompt 2.2:** Sanitização de prompt injection (<user_action>, limite 500 chars).
- [x] **Prompt 2.2:** Suíte Red-Team com 8 casos de teste passando (`geminiGuardrails.test.ts`).
- [x] **Prompt 2.2:** Circuit breaker e controle diário de custos de IA configurados.
- [x] **Prompt 2.3:** Error boundaries (`error.tsx`, `global-error.tsx`) em português sem vazamento de stack.
- [x] **Prompt 2.3:** Endpoint `/api/health` operacional.
- [x] **Prompt 2.3:** Acessibilidade: `aria-live="polite"`, `motion-reduce:animate-none` e áudio mudo por padrão.
- [x] **Prompt 2.4:** 91 fichas de amostragem de cânone geradas em `docs/auditoria-canone/fichas/`.
- [x] **Prompt 2.4:** Script `scripts/calcular_taxa_divergencia.mjs` pronto para cálculo de canonicidade.

### Fase 3 — Deploy e CI/CD
- [x] **Prompt 3.1:** Guia de deploy Vercel + Supabase em `docs/deploy-vercel-supabase.md`.
- [x] **Prompt 3.1:** Script de smoke test pós-deploy em `scripts/smoke_test.mjs`.
- [x] **Prompt 3.2:** Pipeline de CI/CD automatizado em `.github/workflows/ci.yml`.
- [x] **Prompt 3.2:** `CONTRIBUTING.md` criado.
- [x] **Prompt 3.3:** Runbook de operações em `docs/runbook.md`.
- [x] **Prompt 3.3:** Script `scripts/preflight.ts` com comando `npm run preflight`.
