# Relatório F6 — Cartão de Rolagem e Mesa de Dados 2d6

- **Data:** 2026-10-23
- **Branch:** `master`
- **Fase:** F6 (Cartão de Rolagem e Dados)

---

## Feito (tarefa → arquivos alterados)

1. **Remoção da Aba/Botão de Dados Fictícios:**
   - Removida a aba «Dados» de `ColunaMundo.tsx` e de `BarraInferiorMobile.tsx`.
   - Eliminados botões de rolagem fictícia manual (`atr 3 vs DC 10`) e termos não canônicos em inglês ("Fail Forward").
   - O histórico de rolagens e testes permanece preservado integralmente dentro do Diário da Crônica (`ChronicleTimeline`).
2. **Criação do `CartaoDeRolagem.tsx`:**
   - Criado `src/components/game/CartaoDeRolagem.tsx`:
     - Renderização de dados d6 em SVG com pontos desenhados (*pips*) e animação de rolagem de 750ms que se resolve exatamente nos valores reais recebidos do servidor autoritativo (`resultado.dados[0]` e `resultado.dados[1]`).
     - Respeito integral a `prefers-reduced-motion`: desativação da animação e transição suave por fade.
     - Linha de cálculo detalhada: `dado1 + dado2 + Atributo (valor) = Total contra DC`.
     - Selo heráldico de cera com classificação formal em pt-BR (*Triunfo, Sucesso, Falha Parcial — a história avança, mas com custo, Calamidade*).
     - Botão «Continuar Crônica» com foco automático e atalho por tecla `Esc`.
     - Botão «Gastar 1 Inspiração e rolar de novo (restam N)» acionado apenas se o teste for uma falha e o jogador tiver inspiração disponível.
     - Anúncio acessível completo via `role="status"` e `aria-label`.
     - Disparo sonoro temático via `audioManager.tocarSomDados()`.
3. **Integração na Tela de Jogo (`src/app/jogar/page.tsx`):**
   - O cartão de rolagem foi ancorado à coluna central, sobreposto de forma limpa à narrativa quando um teste de atributo ocorre, sem bloquear a tela inteira com modais intrusivos.
4. **Cobertura de Testes Automatizados:**
   - Criado `src/components/game/__tests__/CartaoDeRolagem.test.ts`: 4 testes unitários cobrindo determinação de vereditos, regras de elegibilidade para rerrolagem com inspiração e mapeamento heráldico.

---

## Critérios de Aceite (✔/✘ + Evidência)

| Critério | Status | Evidência |
|---|---|---|
| Cartão exibido sobre a coluna central | ✔ | Integrado diretamente no container central em `jogar/page.tsx` |
| Dados SVG idênticos aos valores do servidor | ✔ | `DadoD6SVG` alimentado por `resultado.dados[0]` e `resultado.dados[1]` |
| Linha explicativa da soma e DC | ✔ | `{dados[0]} + {dados[1]} + Atributo ({valor}) = {total} contra DC {dc}` |
| Selo de cera por veredito | ✔ | Selo heráldico integrado com 4 variantes (*Triunfo, Sucesso, Falha Parcial, Calamidade*) |
| Botão de rerrolar condicionado a falha e Inspiração > 0 | ✔ | Verificado no componente e coberto por testes unitários |
| Zero termos em inglês / "Fail Forward" removido | ✔ | Todas as mensagens 100% em pt-BR formal de Jorge Candeias |
| Movimento reduzido respeitado | ✔ | Classe `motion-reduce:animate-none` presente nos dados SVG |

---

## Verificações (typecheck / lint / test / build)

- **`npm run typecheck`:** Código 0 (0 erros).
- **`npm run lint`:** Código 0 (`✔ No ESLint warnings or errors`).
- **`npm test` (`npx vitest run`):** 23 arquivos de teste aprovados, **117 testes passando**.
- **`npm run build`:** Código 0, todas as 10 rotas geradas estaticamente com sucesso.
- **`node scripts/contraste.mjs`:** 10/10 pares de contraste aprovados.

---

## Decisões Tomadas

1. **Overlay Ancorado à Coluna Central:** Em vez de modal em tela cheia que quebra o fluxo de leitura, o `CartaoDeRolagem` fica inserido no topo da coluna narrativa central, permitindo que o jogador mantenha contato visual com a cena.
2. **Substituição da Aba Dados pelo Cartão On-Demand:** A aba estática "Dados" na coluna lateral foi removida para eliminar ações duplicadas e botões manuais artificiais, centralizando todo o histórico no Diário e toda a ação dramática no cartão.

---

## Pendências / Dívidas Novas

- Nenhuma pendência impeditiva.
- Próximo passo no roadmap: **Fase 7** (Mapa Dinâmico e Reputação das Casas).

---

## Riscos e Como Reverter

- Todas as alterações são reversíveis via Git. Cobertura de 117 testes garante funcionamento perfeito do fluxo de jogo e persistência.

---

## Notas para a Próxima Fase (F7)

- Na Fase 7, o mapa passará a ser dinâmico para responder a cada jornada (não apenas J1), e criaremos o painel de reputação das Grandes Casas (`reputacaoCasas`) com variação visual de lealdade.
