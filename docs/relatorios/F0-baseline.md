# Relatório F0 — Baseline, Guarda-Corpos e Memória do Projeto
- Data: 2026-10-23
- Branch: `master`
- Commits: Inicialização da reforma F0–F14

## Feito (tarefa → arquivos alterados)
1. **Guarda-corpos e Memória**: Criação de `CLAUDE.md` com a importação `@AGENTS.md` e as 10 regras de ouro da reforma.
2. **Scripts no package.json**: Inclusão formal de `"typecheck": "tsc --noEmit"` ao lado de lint, test, build e preflight.
3. **Plano Mestre**: Cópia integral do plano mestre de reforma e da Jornada 4 em `docs/plano/PLANO_MELHORIAS.md`.
4. **Auditoria de Contraste W3C**: Criação de `scripts/contraste.mjs` e `scripts/contraste.pares.json` calculando luminância relativa e contraste de cores.
5. **Métricas de Linha de Base**: Criação e execução de `scripts/baseline_metrics.mjs`.
6. **Execução da Linha de Base**: Execução completa e registro dos 4 scripts fundamentais.

## Critérios de aceite (✔/✘ + evidência)
- [x] `CLAUDE.md` criado com `@AGENTS.md` na primeira linha.
- [x] `docs/plano/PLANO_MELHORIAS.md` presente e atualizado.
- [x] `scripts/contraste.mjs` validando os pares mínimos com saída 0:
  - 10/10 pares aprovados (prosa 13.66:1, texto suave 6.87:1, dourado 7.46:1, perigo 4.63:1, etc.).
- [x] Métricas de código auditadas:
  - Cores hexadecimais distintas em `src/app` e `src/components`: **99 cores** (353 ocorrências).
  - Tipografias pequenas (`text-[9px]`, `text-[10px]`, `text-[11px]`): **52 ocorrências**.
  - Ocorrências de `any`: **18 ocorrências**.
  - Ocorrências de `cursor-pointer`: **39 ocorrências**.
  - Ocorrências de `focus-visible`: **0 ocorrências**.
  - Dependências não importadas em `src/`: `framer-motion` (0), `zustand` (0), `howler` (0), `@google/generative-ai` (0).

## Verificações (typecheck / lint / test / build)
- **Typecheck**: `npm run typecheck` (`tsc --noEmit`) → ✅ Exit 0 (0 erros).
- **Lint**: `npm run lint` (`next lint`) → ✅ Exit 0 (0 erros, 0 avisos).
- **Testes**: `npm test` (`vitest run`) → ✅ Exit 0 (16/16 suítes, 88/88 testes passando).
- **Build**: `npm run build` (`next build`) → ✅ Exit 0 (9/9 rotas compiladas estática e dinamicamente).

## Decisões tomadas
- Mantida a estrutura de scripts sem alterar versões de pacotes em `package.json`.
- Registradas as métricas de linha de base para comparação quantitativa exata na F14.

## Pendências / dívidas mapeadas para as próximas fases
- F1: Servidor autoritativo, migração idempotente de saves com concorrência otimista (`versao`) e isolamento de RLS por `auth.uid()`.
- F4: Eliminação dos 99 hexadecimais para tokens unificados e remoção de dependências mortas.

## Notas para a próxima fase (F1)
- Iniciar a Fase 1: Arquitetura de Servidor Autoritativo, repositório de persistência seguro `src/server/saves/` com `server-only`, isolamento de `requireOwner`, eliminação de `player_default` e proteção transacional de turnos.
