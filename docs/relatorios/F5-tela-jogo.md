# Relatório F5 — Tela de Jogo: Layout, Leitura, Escolhas, Vozes e Avisos

- **Data:** 2026-10-23
- **Branch:** `master`
- **Fase:** F5 (Layout, Leitura, Escolhas, Vozes e Avisos)

---

## Feito (tarefa → arquivos alterados)

1. **Ganhos de Probabilidade Compartilhados (`probabilidade.ts`):**
   - Criado `src/lib/engine-shared/probabilidade.ts`: calcula deterministicamente as 36 permutações de 2d6 sem acoplamento com o servidor, com testes unitários em `src/lib/engine-shared/__tests__/probabilidade.test.ts` (100% aprovados).
2. **Cartão de Escolha Acessível (`CartaoEscolha.tsx`):**
   - Criado `src/components/game/CartaoEscolha.tsx`: números de atalho `[1..4]`, nomes de atributos acentuados (*Comando, Fúria, Astúcia, Cortesia, Erudição, Presságio*), indicação de DC e probabilidade matemática calculada (ex.: `≈ 72%`), selos `[ORIGEM]` e `[RISCO MORTAL]`. Estado bloqueado sem `line-through` ou opacidade reduzida, exibindo claramente a linha `Falta: ...`. Alvos táteis com altura mínima de 48px.
3. **Vozes Internas v2 (`VozesInternasV2.tsx`):**
   - Criado `src/components/game/VozesInternasV2.tsx`: teste passivo real determinístico (`valorAtributo + 7 >= dcPassiva`), exibição em destaque da voz mais relevante e recolhimento das demais em `<details>` expansível com tipografia temática.
4. **Shell de Jogo e Layout de Três Colunas:**
   - Criados `src/components/game/shell/TopBar.tsx`, `ColunaFicha.tsx`, `ColunaMundo.tsx` e `BarraInferiorMobile.tsx`.
   - Layout desktop (≥1024px) com 280px para ficha, centro responsivo com `max-width: 66ch`, e 320px para o mundo. Colunas colapsáveis independentemente por atalhos de teclado `[` e `]`.
   - Layout mobile (<1024px) com `BarraInferiorMobile` e `Gaveta` deslizante acessível (`role="dialog"`, `aria-modal="true"`, foco preso e fecho por Esc).
5. **Coluna de Leitura e Tipografia Fluida:**
   - Criado `src/components/game/CenaTexto.tsx`: `max-width: 66ch`, tipografia fluida `clamp(1.125rem, 1.05rem + 0.4vw, 1.3125rem)`, entrelinha 1.75, alinhamento à esquerda por padrão com opção de justificado com `hyphens: auto`. Letra capitular gótica aplicada apenas em telas amplas (≥640px).
   - Criado `src/components/game/EcoDasEscolhas.tsx`: renderização dos parágrafos condicionais ativados por flags.
   - Refatorado `src/components/game/NarrativeScroll.tsx` integrando os subcomponentes.
6. **Acessibilidade, Foco e Região Viva:**
   - Criado `src/lib/hooks/useScrollNaCena.ts`: rolagem suave ao título ao trocar de nó (respeitando `prefers-reduced-motion`), foco programático no `<h2 tabIndex={-1}>` e anúncio imediato em região `aria-live="polite"`.
7. **Sistema de Avisos (Toasts):**
   - Reformulado `src/components/ui/Aviso.tsx` com `AvisoProvider` e hook `useAvisos()`: contêiner flutuante com fila máxima de 3 avisos, auto-dismiss em 5s com pausa em hover/foco, eliminando a barra estática do cabeçalho.
8. **Atalhos e Configurações:**
   - Criado `src/lib/hooks/useAtalhos.ts`: 1 a 4 para escolhas narrativas, J para Diário, M para Mapa, [ e ] para colunas laterais, ? para modal de ajuda.
   - Criado `src/components/game/PainelDeConfiguracoes.tsx` com persistência em `localStorage` e tratamento de erros.

---

## Critérios de Aceite (✔/✘ + Evidência)

| Critério | Status | Evidência |
|---|---|---|
| Coluna de leitura com limite de largura | ✔ | `max-w-[66ch]` em `NarrativeScroll.tsx` e `page.tsx` |
| Font floor ≥ 13px em toda a tela | ✔ | Textos em 11px substituídos por `text-xs` (13px no config) |
| Rolagem e foco ao mudar de cena | ✔ | `useScrollNaCena` foca `<h2 tabIndex={-1}>` e anuncia em `aria-live` |
| Probabilidade de sucesso nos testes | ✔ | `probabilidadeSucesso` com 36 permutações exatas |
| Vozes com teste passivo e relevância | ✔ | `valorAtributo + 7 >= dcPassiva` com voz líder em destaque |
| Toasts flutuantes com pausa em hover | ✔ | `AvisoProvider` no topo direito / mobile com pausa em hover/foco |
| Colunas laterais recolhíveis | ✔ | Alternância funcional por botões e teclas `[` e `]` |
| Modal de configurações com persistência | ✔ | Salva em `localStorage` com `try/catch` |
| 10/10 pares de contraste aprovados | ✔ | `node scripts/contraste.mjs` (10/10 OK) |

---

## Verificações (typecheck / lint / test / build)

- **`npm run typecheck`:** Código 0 (0 erros).
- **`npm run lint`:** Código 0 (`✔ No ESLint warnings or errors`).
- **`npm test` (`npx vitest run`):** 22 arquivos de teste aprovados, **113 testes passando**.
- **`npm run build`:** Código 0, todas as 10 rotas geradas estaticamente com sucesso (`/jogar` com 34.3 kB).
- **`node scripts/contraste.mjs`:** 10/10 pares WCAG 2.2 AA aprovados.

---

## Decisões Tomadas

1. **Arquitetura do Shell de Jogo:** Separar o cabeçalho, colunas e barra mobile em `src/components/game/shell/` para manter `src/app/jogar/page.tsx` limpo e declarativo.
2. **Eliminação de Modais Antigos de Notificação:** Substituir avisos fixos sobre o cabeçalho pelo `AvisoProvider` flutuante com fila máxima de 3 elementos e pausa ao passar o cursor ou focar.
3. **Capitular Responsiva:** Restringir o float gótico de capitular para telas `≥640px` (`@media (min-width: 640px)`), prevenindo quebras de linha em celulares estreitos.

---

## Pendências / Dívidas Novas

- Nenhuma pendência impeditiva.
- Próximo passo no roadmap: **Fase 6** (Cartão de Rolagem e Mesa de Dados 2d6).

---

## Riscos e Como Reverter

- Todas as alterações são reversíveis via Git (`git restore`). O build e suite de testes garantem integridade total de ponta a ponta.

---

## Notas para a Próxima Fase (F6)

- A Fase 6 focará na rolagem dramática de dados dentro da coluna central, transformando o resultado do servidor em animação com dados em SVG e selos de cera heráldicos.
