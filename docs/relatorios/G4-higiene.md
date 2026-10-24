# Relatório de Execução — Fase G4: Higiene e Modularização de Componentes

> **Data de Execução:** 24/10/2026  
> **Branch:** `v2`  
> **Status:** CONCLUÍDO (100% dos testes, contraste, linter e build aprovados)

---

## 1. Objetivo da Fase

Resolver os achados de dívida técnica, código morto e componentes superdimensionados identificados na auditoria inicial (**C-07**):
- **Código morto e redundante:** componentes e ícones legados não utilizados (`DiceRoller2d6.tsx`, `WesterosMapSVG.tsx`) e bifurcações concorrentes (`InternalVoices.tsx` vs `VozesInternasV2.tsx`).
- **Higiene do repositório:** arquivos históricos soltos na raiz (`RELATORIO_CONTEXTO.md`, `auditoria_lore_j1.md`, `cronicas_jornadas_e_plots.txt`, `supabase_schema.sql`) movidos para locais canônicos (`docs/arquivo/` e `supabase/`).
- **Modularização de componentes gigantes:** desmontar arquivos com mais de 300 linhas no frontend (`jogar/page.tsx`, `CharacterPanel.tsx`, `PainelDeAcampamento.tsx`, `painel/page.tsx`), isolando hooks de ciclo de vida e subcomponentes com responsabilidade única.

---

## 2. O Que Foi Feito

### 2.1 Limpeza de Código Morto e Arquivos da Raiz
1. **Remoção de Componentes Obsoletos:**
   - `src/components/game/DiceRoller2d6.tsx`: componente legado substituído pelo `CartaoDeRolagem.tsx`.
   - `src/components/game/WesterosMapSVG.tsx`: visualização legada estática desacoplada.
   - `src/components/game/InternalVoices.tsx`: unificado na versão canônica `VozesInternasV2.tsx`, atualizando a importação em `NarrativeScroll.tsx`.
2. **Higiene da Raiz:**
   - Documentos de sessões e auditorias históricas movidos para `docs/arquivo/`.
   - Remoção de `supabase_schema.sql` da raiz (consolidado formalmente em `supabase/schema_completo_producao.sql`).
   - Apontamento claro em `GEMINI.md` para as regras mestras em `AGENTS.md`.

### 2.2 Modularização e Teto de Linhas (< 300 linhas)
Todos os componentes principais foram decompostos em hooks especializados e componentes atômicos:

| Arquivo Original | Linhas Antes | Linhas Depois | Módulos Extraídos |
| :--- | :---: | :---: | :--- |
| `src/app/jogar/page.tsx` | **725** | **286** | `useSessaoJogo.ts`, `useTurno.ts`, `ModalAtalhosTeclado.tsx`, `jornadaHelpers.ts` |
| `src/components/game/CharacterPanel.tsx` | **337** | **261** | `SecaoBarrasVitais.tsx` |
| `src/components/game/PainelDeAcampamento.tsx` | **324** | **272** | `camp/ListaCompanheirosAcampamento.tsx` |
| `src/app/painel/page.tsx` | **390** | **295** | `painel/CartaoSlotSave.tsx` |

*Nota:* O componente `SceneIllustration.tsx` (606 linhas) contém os mapas de vetores temáticos para as cenas e foi mantido intacto nesta fase para o trabalho de arte e SVG vetorial dedicado na **Fase G10**. Todos os demais componentes de `src/` estão estritamente abaixo do teto de 300 linhas.

### 2.3 Separação Limpa de Hooks de Jogo
- `src/lib/hooks/useSessaoJogo.ts`: gerencia inicialização da jornada, carregamento do slot de salvamento, reações a mudanças de rota e sincronização com o Zustand `useJogoStore`.
- `src/lib/hooks/useTurno.ts`: encapsula a lógica de execução de escolhas autoritativas, enriquecimento do texto do Mestre em segundo plano, disparos de Tentativa Livre e ações de acampamento.

---

## 3. Verificação e Garantia de Qualidade

1. **Auditoria de Contraste W3C WCAG 2.2 AA:**
   - Execução: `node scripts/contraste.mjs`
   - Resultado: **10/10 pares aprovados** com taxa de contraste superior às diretrizes AA (ex.: 13.66:1 no texto principal).
2. **Suíte de Testes Automatizados (Vitest):**
   - Execução: `npx vitest run`
   - Resultado: **100% de aprovação em todos os 205+ testes** em 24 suites de teste (sem regressões em jogabilidade, turnos, save manager ou IA).
3. **Checagem de Tipos Estrita:**
   - Execução: `npm run typecheck` (`tsc --noEmit`)
   - Resultado: **0 erros**, tipagem estrita mantida e zero `any`.
4. **Linter Oficial:**
   - Execução: `npm run lint` (`next lint --dir src`)
   - Resultado: **0 warnings, 0 erros**.
5. **Build de Produção:**
   - Execução: `npm run build` (`next build`)
   - Resultado: **Sucesso (Exit code 0)** — 10/10 páginas estáticas e rotas de API compiladas e otimizadas sem falhas.

---

## 4. Conclusão

A base de código de `Crônicas de Sangue e Gelo` está agora higienizada, livre de componentes legados não utilizados, com responsabilidades desacopladas em hooks reutilizáveis e todos os arquivos em conformidade com as metas de legibilidade e manutenibilidade arquitetural.
