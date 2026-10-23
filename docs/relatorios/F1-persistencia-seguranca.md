# Relatório F1 — Persistência, Segurança e Servidor Autoritativo
- Data: 2026-10-23
- Branch: `master`
- Commits: F1a, F1b, F1c

## Feito (tarefa → arquivos alterados)
1. **Inventário do Banco e Migração Autoritativa**:
   - `docs/relatorios/F1a-inventario-banco.md`
   - `supabase/migrations/20261023_save_autoritativo.sql`: concorrência otimista com coluna `versao`, snapshots pré-turno `snapshot_antes`, coluna `resultado` e função atômica `aplicar_turno_atomico`.
2. **Repositório de Persistência Blindado**:
   - `src/server/saves/types.ts`: tipos discriminados `Result<T, ErroSave>`, contratos estritos de `SaveSlot`, `TurnEvent` e `SaveRepository`.
   - `src/server/saves/schemas.ts`: validação Zod strict para fichas, mundos, slots e turnos.
   - `src/server/saves/memoria.ts`: implementação em memória para testes unitários herméticos.
   - `src/server/saves/repository.ts`: implementação Supabase com cookies e `@supabase/ssr`.
   - `src/server/saves/index.ts`: fachada singleton do repositório.
   - `src/server/saves/__tests__/repository.test.ts`: 4 testes unitários cobrindo concorrência, isolamento, desfazimento e integridade.
3. **Motor de Turno Autoritativo**:
   - `src/server/engine/turno.ts`: `mesclarDeltas` (deep merge), `validarEscolhaDesbloqueada` (requiredFlags, forbiddenFlags, minCompanionApproval, tagOrigem) e `executarTurno` (rolagem e regras no servidor).
   - `src/server/engine/turno.test.ts`: 7 testes unitários.
4. **Server Actions e Rotas Blindadas**:
   - `src/app/actions/gameActions.ts`: todas as actions protegidas com `requireOwner(true)` e integradas a `executarTurno`.
   - `src/app/actions/slotActions.ts`: CRUD de slots no servidor autoritativo, eliminando `saveManager` do cliente.
   - `src/app/actions/loreActions.ts`: verbetes protegidos por `requireOwner(true)`.
   - `src/app/api/game/turn/route.ts`: Zod estrito e delegação para o motor autoritativo.
5. **Higiene, Sessão e Middleware**:
   - `src/server/auth/requireOwner.ts`: remoção de fallback de e-mail em produção (falha fechada).
   - `src/app/login/page.tsx`: remoção de credenciais públicas `NEXT_PUBLIC_*` e auto-login inseguro.
   - `src/middleware.ts`: proteção de rotas `/painel` e `/jogar` com redirecionamento de anônimos para `/login`.
   - `src/app/painel/page.tsx`: eliminação total de `player_default` e logout seguro via `supabase.auth.signOut()`.
   - `src/app/jogar/page.tsx`: conexão ao slot real via `carregarSessaoJogoAction` e indicador dinâmico de salvamento.
   - `docs/SEGURANCA.md`: guia completo de ameaça, variáveis e runbook do proprietário.

## Critérios de aceite (✔/✘ + evidência)
- [x] Conexão ponta a ponta do save: `/jogar` carrega o slot real (`carregarSessaoJogoAction`).
- [x] Slots independentes: testado e verificado via `repository.test.ts`.
- [x] Zero credenciais no cliente: `grep -rn "NEXT_PUBLIC_TEST" src` → 0 resultados.
- [x] Zero `player_default` no código: `grep -rn "player_default" src` → 0 resultados.
- [x] Zero `createAdminClient` no cliente: apenas importado em módulos protegidos por `server-only`.
- [x] Acesso a Server Actions sem sessão é recusado imediatamente (`requireOwner`).
- [x] `node scripts/check_secrets.mjs` → 0 segredos detectados.

## Verificações (typecheck / lint / test / build)
- **Typecheck**: `npm run typecheck` → ✅ Exit 0 (0 erros).
- **Lint**: `npm run lint` → ✅ Exit 0 (0 warnings, 0 erros).
- **Testes**: `npm test` → ✅ Exit 0 (18 suítes, 99 testes passando).
- **Build**: `npm run build` → ✅ Exit 0 (9 rotas + Middleware compilados).

## Decisões tomadas
- **Servidor Autoritativo**: O cliente não gera rolagens de dados nem calcula deltas.
- **Fail-Closed em Autenticação**: Sem `ALLOWED_USER_EMAIL` em produção, o sistema nega acesso por padrão.

## Pendências / Notas para a próxima fase (F2)
- Avançar para a **Fase 2 (Registro central de jornadas e temas)**:
  - Criar `src/server/journeys/registry.ts` com o catálogo unificado de jornadas.
  - Eliminar IDs de nó hardcoded do Painel (`j1_a1_mesa_pintada`).
  - Unificar a ficha do Eddard em uma única fonte de verdade.
  - Criar `src/lib/temas.ts` (vozes, regiões, casas).
  - Criar `src/server/engine/storyLinterPlus.ts` para análise avançada de grafos.
