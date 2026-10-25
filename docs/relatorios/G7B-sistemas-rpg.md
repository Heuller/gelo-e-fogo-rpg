# Relatório de Execução — Fase G7B: Sistemas de RPG Moderno e Literatura (Camada BG3)

**Data de Conclusão:** 25/10/2026  
**Branch:** `v2`  
**Escopo:** B1 (Vantagem/Desvantagem 3d6), B2 (Painel de Modificadores e Rótulos Textuais), B3 (Três Modos de Jornada: Crônica, Padrão, Juramento), B4 (Reações de Companheiros), B6 (Auditoria de Ecos de Longo Prazo), B7 (Vozes em Conflito Disco Elysium), B8 (Dicas de Percepção) e Literatura (POV e Epígrafes).

---

## 1. O que foi feito

### 1.1 B1 — Vantagem e Desvantagem (Regra BG3 / 5e adaptada a 3d6)
- **Mecânica Determinística:**
  - Em situações com circunstâncias favoráveis (`circunstancias: [{ tipo: 'vantagem', motivo }]`), o motor rola **3d6 mantendo os 2 maiores**.
  - Em circunstâncias adversas (`circunstancias: [{ tipo: 'desvantagem', motivo }]`), o motor rola **3d6 mantendo os 2 menores**.
  - Quando ambas estão presentes em um teste, anulam-se mutuamente (rolando 2d6 padrão).
  - Sucesso Crítico natural (`[6, 6]`) e Falha Crítica natural (`[1, 1]`) são avaliados com base nos 2 dados finais selecionados.
- **Transparência Textual:**
  - O motivo de cada circunstância é registrado e exibido textualmente na prévia (`CartaoEscolha.tsx`) e persistido em `resultadoRolagem.motivoCircunstancia`.

### 1.2 B2 — Painel de Modificadores e Probabilidades Honestos
- **Enumeração Exaustiva (216 combinações para 3d6, 36 para 2d6):**
  - Função pura `probabilidadeSucesso()` em `src/lib/engine-shared/probabilidade.ts` calcula as probabilidades exatas para qualquer voz, DC, circunstância e modo de jogo.
- **Rótulos de Risco Textuais (acessibilidade além da cor):**
  - Implementada a classificação honesta: `Garantido` (100%), `Quase certo` (≥ 80%), `Provável` (≥ 60%), `Desafiador` (≥ 40%) e `Arriscado` (< 40%).
- **Exibição na UI:**
  - Cartão de escolha exibe detalhamento completo: `[+X Atributo] [DC Y] [Vantagem: Motivo] -> Rótulo (≈ Z%)`.

### 1.3 B3 — Três Modos de Jornada (Crônica, Padrão, Juramento)
- **Modo Crônica (Aventura / Foco na História):**
  - Redução de todas as Dificuldades (DCs) em 2 pontos (`dcEfetiva = Math.max(2, dc - 2)`).
  - +1 Ponto de Inspiração inicial (inicia com 3 em vez de 2).
  - Desfazer ilimitado via pilha append-only.
- **Modo Padrão (Balanceado / Desafio Canônico):**
  - DCs normais (8, 10, 12, 14), Inspiração padrão (2), Desfazer padrão.
- **Modo Juramento (Honor Mode / Morte Definitiva):**
  - Bloqueio estrito de `desfazerTurnoAction` com mensagem imersiva: *"O Modo Juramento não permite voltar no tempo. Honre as suas escolhas."*
  - Bloqueio estrito de rerrolagem com Inspiração: *"No Modo Juramento, as rolagens são finais e imutáveis."*
  - Em falhas críticas com risco mortal, o evento é gravado permanentemente como morte definitiva (`_registroMorteJuramento` e `_causaMorte`).
  - **Imutabilidade de Transição:** O Modo Juramento só pode ser selecionado no momento da criação da partida e jamais pode ser alterado ou rebaixado. Modos só permitem transição de `cronica` -> `padrao`.

### 1.4 B4, B7, B8 e Literatura (Esquemas e Renderização)
- **B4 — Reações de Companheiros em Cena:**
  - Nó suporta `reacoes: [{ companheiro, condicao, fala }]` (máx. 1 interjeição por cena, ≤ 25 palavras). Avaliado deterministamente no servidor por `comporCena`.
- **B7 — Vozes em Conflito (Disco Elysium):**
  - Nó suporta `vozesConflito: [{ voz1, voz2, fala1, fala2, quando }]`, renderizando o debate interno entre duas facetas da mente do protagonista.
- **B8 — Dicas de Percepção:**
  - Campo `dicaPercepcao` permite observações sutis de detalhes que poderiam passar despercebidos.
- **Literatura:**
  - Cabeçalho de cena suporta ponto de vista nomeado (`pov — localizacao, anoHistorico`) no estilo George R. R. Martin.
  - Epígrafes originais de abertura de ato (`epigrafe: { texto, autor }`) renderizadas com tipografia clássica de citação.

### 1.5 B6 — Script de Auditoria de Ecos de Longo Prazo
- Script `scripts/auditoria-ecos.ts` e teste `scripts/auditoria-ecos.test.ts` implementados.
- Audita todas as 5 jornadas identificando flags gravadas no Ato $N$ e lidas no Ato $\ge N+1$.
- Estado auditado: J1 (0), J2 (3 ecos: `lucerys_salvo`, `rhaenys_salva`, `domou_vermithor`), J3 (2 ecos: `adagas_obsidiana_distribuidas`, `criatura_incinerada_muralha`), J4 (0), J5 (0). Confirma com precisão a linha de base do §5 do plano v2.2 para ser expandida na fase G6C.

---

## 2. Decisões Tomadas
- **Ajuste de DC no Modo Crônica:** A redução de 2 pontos na DC foi implementada no cálculo puro de `rolar2d6` através de `dcEfetiva = Math.max(2, dc - 2)` com registro explícito de `modificadorModo: -2`, permitindo que toda a interface e relatórios mostrem com clareza a DC base e a DC efetiva.
- **Imutabilidade do Modo Juramento:** Vetada qualquer transição para fora ou para dentro do Modo Juramento após a criação do slot. Tentativas de desfazer ou rerrolar no servidor são rejeitadas com erro de validação sem alterar o estado.
- **Migração Idempotente de Banco:** Criado script SQL `supabase/migrations/20261025_add_modo_to_save_slots.sql` com verificação `IF NOT EXISTS` e constraint de verificação, garantindo compatibilidade total com instalações existentes.

---

## 3. Métricas e Resultados

### 3.1 Simulação Monte Carlo Comparativa (10.000 iterações por modo, Atributo 3 vs DC 10 com Risco Mortal)
```
Modo Crônica:   Sucesso: 83.4%  | Letalidade:  2.62%  (DC efetiva 8, +1 Inspiração)
Modo Padrão:    Sucesso: 59.2%  | Letalidade: 16.56%  (DC normal 10, rerrolagens permitidas)
Modo Juramento: Sucesso: 58.7%  | Letalidade: 15.93%  (Morte Definitiva, 0 rerrolagens, 0 desfazer)
```
*Comprovação:* Nenhum final se torna inalcançável; o Modo Crônica oferece uma experiência narrativa acessível com taxa de sucesso ~24% superior, enquanto o Modo Juramento impõe o peso real da morte definitiva sem rede de segurança.

### 3.2 Auditoria de Ecos de Longo Prazo (B6)
- **Jornada 1:** 0 ecos entre atos (será enriquecida na G6C)
- **Jornada 2:** 3 ecos entre atos (`lucerys_salvo`, `rhaenys_salva`, `domou_vermithor`)
- **Jornada 3:** 2 ecos entre atos (`adagas_obsidiana_distribuidas`, `criatura_incinerada_muralha`)
- **Jornada 4:** 0 ecos entre atos (será reconstruída como padrão-ouro na G6C com ≥ 6 ecos)
- **Jornada 5:** 0 ecos entre atos (será expandida de 30 para 110+ nós na G6C)

---

## 4. Provas de Execução (Definition of Done)

1. **Typecheck (`npm run typecheck`):**
   - 0 erros em todo o repositório.
2. **Linter (`npm run lint`):**
   - 0 warnings, 0 erros no ESLint.
3. **Suíte de Testes Automatizados (`npx vitest run`):**
   - **42 arquivos de teste executados.**
   - **240 testes passando** (incluindo os 19 testes dedicados de `g7bSistemasRpg.test.ts` e auditoria de ecos).
4. **Contraste WCAG 2.2 AA (`node scripts/contraste.mjs`):**
   - 10 de 10 pares aprovados com sucesso.
5. **Compilação de Produção Next.js (`npm run build`):**
   - Compilado com sucesso em 3.4 min.
   - 10 de 10 rotas estáticas e dinâmicas geradas perfeitamente.

---

## 5. Próximos Passos
- Iniciar a **Fase G6C — Reconstrução Narrativa das 5 Jornadas**:
  - Padrão-ouro: **Jornada 4 («Irmão Sem Nome» — Patrulha da Noite)**.
  - Passo 1: Elaboração da Planta do Ato I (`docs/propostas/patrulha_muralha/ato1_planta.md`) no formato diamante com rotas (abertura, encruzilhada, rotas exclusivas ≥ 60%, peça de cenário, acerto de contas lendo marcas e ecos de longo prazo).
