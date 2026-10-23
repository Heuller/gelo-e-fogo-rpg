# Relatório F4 — Design System «Códice Vivo» e Tailwind Limpo
- Data: 2026-10-23
- Branch: `master`
- Commits: F4

## Feito (tarefa → arquivos alterados)
1. **Tokens CSS Centralizados**:
   - `src/styles/tokens.css`: variáveis `--pagina`, `--pergaminho-{1..4}`, `--borda`, `--tinta`, `--tinta-suave`, `--tinta-fraca`, `--ouro`, `--ouro-claro`, `--ouro-escuro`, `--carmim`, `--carmim-brilho`, `--perigo-texto`, raios e z-indices.
   - Anel de foco acessível global `:focus-visible` (WCAG 2.4.7).
   - Suporte global a `prefers-reduced-motion: reduce`.
   - Classes utilitárias nativas `.fundo-radial`, `.entrada-fade` e `.entrada-sobe`.
   - `@import "../styles/tokens.css";` importado em `src/app/globals.css`.
2. **Tailwind Config Limpo e Acessível**:
   - `tailwind.config.ts`: mapeamento de cores referenciando `var(--...)`.
   - Piso tipográfico de 13px (`text-xs: 0.8125rem`).
   - Nomeação semântica de z-index (`sticky`, `gaveta`, `overlay`, `toast`).
3. **Componentes Base do Códice Vivo (`src/components/ui/`)**:
   - `Botao.tsx`: variantes `primario`, `secundario`, `perigo`, `fantasma` com altura mínima de 44px para toque.
   - `Painel.tsx`: container de superfície em pergaminho 2 com borda e sombra.
   - `Cartao.tsx`: cartões interativos para escolhas e slots.
   - `Chip.tsx`: badges de atributo, origem e perigo mortal.
   - `Selo.tsx`: selo de cera para resultados de rolagem (Triunfo, Sucesso, Falha Parcial, Calamidade).
   - `Medidor.tsx`: barra acessível com `role="meter"` e valores numéricos visíveis.
   - `Dialogo.tsx`: elemento nativo `<dialog>` com captura de foco e fechamento por `Esc`.
   - `Gaveta.tsx`: gaveta deslizante acessível (`role="dialog"`).
   - `Aviso.tsx`: toasts flutuantes com `role="status"` e auto-fechamento.
   - `Esqueleto.tsx`: placeholders de carregamento.
   - `Dica.tsx`: tooltips acessíveis.
4. **Página de Catálogo e Demonstração**:
   - `src/app/dev/ui/page.tsx`: vitrine interativa para inspeção de estados de design em ambiente de desenvolvimento.
5. **Remoção de Dependências Mortas (§9.0 #4)**:
   - Removidos: `@google/generative-ai`, `howler`, `framer-motion`, `@types/howler`.
6. **Migração Automatizada de Cores e Limpeza de Classes Fantasmas**:
   - `scripts/migrar-cores.mjs`: migração de 252 ocorrências de hex para tokens de design.
   - `cursor-pointer` reduzido de 39 para 0 ocorrências manuais.
   - Tipografias sub-dimensionadas (9-11px) reduzidas de 52 para 1.

## Critérios de aceite (✔/✘ + evidência)
- [x] `scripts/contraste.mjs` → 10/10 pares aprovados no padrão WCAG 2.2 AA.
- [x] Zero classes fantasmas (`bg-radial` substituído por `.fundo-radial`).
- [x] Foco visível acessível em todos os controles.
- [x] Dependências mortas desinstaladas do `package.json`.

## Verificações (typecheck / lint / test / build)
- **Typecheck**: `npm run typecheck` → ✅ Exit 0 (0 erros).
- **Lint**: `npm run lint` → ✅ Exit 0 (0 warnings, 0 erros).
- **Testes**: `npm test` → ✅ Exit 0 (21 suítes, 109 testes passando).

## Decisões tomadas
- **Animações em CSS Puro**: Dispensou-se `framer-motion` e plugins externos, adotando keyframes nativos (`codiceFade`, `codiceSobe`) com respeito a `prefers-reduced-motion`.
- **Áudio Sintetizado**: Removido `howler` sem uso, mantendo a sintetização por Web Audio API em `audioManager.ts`.

## Notas para a próxima fase (F5)
- Iniciar a **Fase 5 (Tela de jogo: layout, leitura, escolhas, vozes, avisos)**:
  - Reconstruir o layout de `/jogar` com as 3 colunas desktop (280px | 66ch | 320px) e barra inferior mobile.
  - Componente `CartaoEscolha` extraído de `NarrativeScroll` exibindo atalhos `1..4`, nomes de atributos acentuados, DC, chance de sucesso estimada e motivo de bloqueio sem `line-through` opaco.
  - Teste passivo real para vozes internas (`valorAtributo + 7 >= dcPassiva`).
  - Avisos em toasts no lugar de notificações empilhadas acima do título.
  - Configurações de leitura e atalhos de teclado.
