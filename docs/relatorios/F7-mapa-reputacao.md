# Relatório F7 — Mapa Dinâmico e Reputação das Casas

- **Data:** 2026-10-23
- **Branch:** `master`
- **Fase:** F7 (Mapa Dinâmico e Reputação das Casas)

---

## Feito (tarefa → arquivos alterados)

1. **Auditoria e Validação de Integridade de Regiões:**
   - Criado `src/server/journeys/__tests__/mapaRegioes.test.ts`: teste automatizado estrito que inspeciona todos os nós de todas as jornadas registradas (`REGISTRO_JORNADAS`), garantindo que 100% dos `regionId` utilizados existam em `tema.regioes` e possuam coordenadas esquemáticas válidas (`0 <= x, y <= 100`).
2. **Componente de Mapa Dinâmico (`MapaDoMundo.tsx`):**
   - Criado `src/components/game/MapaDoMundo.tsx`:
     - Componente puro sem espelhamento de props em `useState`.
     - Contorno esquemático continental vetorial de Westeros com a Muralha.
     - Indicador da posição atual com anel de pulso temporário (estático quando `prefers-reduced-motion` ativo).
     - Lista textual alternativa acessível oculta para leitores de tela (`aria-current="location"`).
     - Rótulos e botões com alvos táteis e tamanhos de fonte acessíveis (≥ 13px).
3. **Painel de Reputação das Grandes Casas (`PainelDeCasas.tsx`):**
   - Criado `src/components/game/PainelDeCasas.tsx`:
     - Consome `worldState.reputacaoCasas` e resolve nomes amigáveis via `tema.casas`.
     - Ordenação automática por magnitude absoluta de lealdade (`|valor|` decrescente).
     - Escala heráldica: *Inimiga Declarada (≤ -6), Hostil (-5..-3), Relação Fria (-2..-1), Neutra (0), Amistosa (1..3), Aliada Leal (≥ 4)*.
     - Animação de delta temporário (±N por 2s) quando a reputação é alterada em tempo real.
4. **Integração no Shell da Interface:**
   - Atualizados `ColunaMundo.tsx` e `BarraInferiorMobile.tsx` para incluir as três abas temáticas: **Mapa**, **Casas** e **Diário**.
   - Atualizado `useAtalhos.ts` para permitir alternância rápida via teclas `M` (Mapa), `C` (Casas) e `J` (Diário).

---

## Critérios de Aceite (✔/✘ + Evidência)

| Critério | Status | Evidência |
|---|---|---|
| Todo `regionId` de toda cena existe em `tema.regioes` | ✔ | `src/server/journeys/__tests__/mapaRegioes.test.ts` (2/2 aprovados) |
| Marcador de posição atual dinâmico e derivado | ✔ | `MapaDoMundo` deriva a localização ativa diretamente das props |
| Lista textual acessível de regiões | ✔ | `<ul className="sr-only">` com `aria-current="location"` |
| Painel de Casas com escala heráldica | ✔ | 6 faixas de lealdade com cores W3C e nomes do tema |
| Ordenação de Casas por relevância | ✔ | Ordenadas por `Math.abs(valor)` decrescente |
| Atalhos de teclado [M, C, J] | ✔ | Implementado em `useAtalhos.ts` e anunciado no modal de ajuda |

---

## Verificações (typecheck / lint / test / build)

- **`npm run typecheck`:** Código 0 (0 erros).
- **`npm run lint`:** Código 0 (`✔ No ESLint warnings or errors`).
- **`npm test` (`npx vitest run`):** 24 arquivos de teste aprovados, **119 testes passando**.
- **`npm run build`:** Código 0, todas as 10 rotas estáticas geradas com sucesso.
- **`node scripts/contraste.mjs`:** 10/10 pares de contraste aprovados.

---

## Decisões Tomadas

1. **Mapa Esquemático Estilizado:** Em vez de tentar traçar curvas geográficas complexas e propensas a distorção em SVG, adotamos um mapa esquemático com a silhueta heráldica de Westeros e a demarcação da Muralha, focado na clareza dos nós territoriais.
2. **Abas da Coluna do Mundo:** A coluna direita agora oferece três pilares fundamentais da imersão: Cartografia (M), Diplomacia (C) e Crônica (J).

---

## Pendências / Dívidas Novas

- Nenhuma pendência impeditiva.
- Próximo passo no roadmap: **Fase 8** (Home, Login, Painel, Modal de Atributos e PWA).

---

## Riscos e Como Reverter

- Todas as alterações são rastreadas pelo Git. A suíte de 119 testes garante que nenhum grafo ou mecânica de estado foi corrompido.

---

## Notas para a Próxima Fase (F8)

- Na Fase 8, modernizaremos a página inicial (`/`), a tela de login (`/login`) e o painel de jornadas (`/painel`), unificando o modal de criação de personagem em 22 pontos (`PONTOS_DISTRIBUIVEIS = 22`) e configurando o manifesto PWA.
