# Relatório de Conclusão — Fase G1B: Tentativa Livre Redesign

**Data:** 24/10/2026  
**Branch:** `v2`  
**Escopo:** Redesenho completo da "Ação Livre" para o modelo autoritativo "Tentativa Livre" estilo Baldur's Gate 3 com prévia determinística de perícia, tabela fechada de efeitos e ganchos narrativos (Disco Elysium).

---

## 1. O Problema Resolvido

No sistema legada, a ação livre sofria de três problemas estruturais:
1. **Frustração por IA não determinística**: O texto do jogador era interpretado por um classificador opaco que frequentemente o forçava para a Escolha 1 pré-existente ou avançava a cena para nós indesejados.
2. **Falta de transparência**: O jogador não tinha visão das probabilidades, CDs ou atributos avaliados antes de digitar e submeter.
3. **Quebra potencial de invariantes**: Havia risco de alterações arbitrárias de nós e estados de vida/morte.

---

## 2. A Solução Implementada (Fase G1B)

### 2.1 Léxico Fechado de 10 Intenções em Português do Brasil
Implementado em `src/server/engine/tentativaLivre.ts`:
- **10 Intenções Canônicas:** `observar`, `persuadir`, `intimidar`, `enganar`, `furtar`, `agir_fisico`, `recuar`, `ajudar`, `rezar_ou_jurar`, `esperar`.
- **Mapeamento Canônico de Atributos:**
  - `observar` → *Presságio* (CD Base 8)
  - `persuadir` → *Cortesia* (CD Base 9)
  - `intimidar` → *Comando* (CD Base 9)
  - `enganar` → *Astúcia* (CD Base 10)
  - `furtar` → *Astúcia* (CD Base 10)
  - `agir_fisico` → *Fúria* (CD Base 9)
  - `recuar` → *Astúcia* (CD Base 8)
  - `ajudar` → *Cortesia* (CD Base 8)
  - `rezar_ou_jurar` → *Presságio* (CD Base 8)
  - `esperar` → *Presságio* (CD Base 7)
- **Modulação por Dureza da Cena:** Nós da jornada possuem `durezaCena: 1 | 2 | 3`, ajustando a CD de 6 a 14.

### 2.2 Prévia Estilo Baldur's Gate 3 (Pré-rolagem)
A função `calcularPreviaTentativaLivre` calcula em tempo real enquanto o usuário digita:
- Intenção detectada e rótulo amigável;
- Atributo e valor correspondente da ficha;
- CD final ajustada;
- Probabilidade exata em 2d6 com barra de progresso visual;
- Indicador de tentativas restantes na cena (máximo 2);
- Motivo de bloqueio claro caso exceda o limite ou a cena seja um epílogo.

### 2.3 Execução Autoritativa e Tabela Fechada de Efeitos
Na função `executarTentativaLivre`:
- **Invariante 1 — Permanência de Cena:** O nó da cena **NUNCA** é alterado (`proximoNodeId: slot.currentNodeId`).
- **Invariante 2 — Limites Estritos de Delta:** Máximo de $\pm 1$ em Honra ou Compostura; zero risco de morte canônica em tentativas livres.
- **Invariante 3 — Anti-Farming:** Limite estrito de no máximo 2 tentativas livres por cena.
- **Ganchos de Caminhos Escondidos (`ganchosLivres`):** Se o nó contiver ganchos ocultos e o jogador obtiver sucesso na intenção exigida, um caminho secreto (escolha oculta) é desbloqueado no estado do mundo.

### 2.4 Interface do Usuário (`PainelTentativaLivre.tsx`)
- Componente rico e acessível (`aria-live="polite"`, conformidade WCAG AA);
- Efeitos sonoros temáticos sintetizados via Web Audio API (`audioManager.tocarSomDados`);
- Integração fluida em `NarrativeScroll.tsx` e `src/app/jogar/page.tsx`.

---

## 3. Validação e Testes Automatizados

O arquivo `src/server/engine/tentativaLivre.test.ts` cobriu integralmente os requisitos:
- **Corpus de 200 Frases em PT-BR (20 por intenção):** Atingiu acurácia determinística $\ge 90\%$.
- **25+ Ataques de Prompt Injection:** Ataques com comandos administrativos, injeções SQL, tags HTML, JSON e jailbreaks foram sanitizados com sucesso e neutralizados em limites fechados.
- **Testes de Invariantes:** Verificação estrita de que o nó nunca é alterado, deltas respeitam o teto de $\pm 1$ e a 3ª tentativa é bloqueada com exceção descritiva.
- **Ganchos de Escolhas Ocultas:** Desbloqueio confirmado via flags do estado do mundo.

---

## 4. Comandos e Saídas Verificadas

- `vitest run src/server/engine/tentativaLivre.test.ts`: **11/11 testes aprovados**.
- `tsc --noEmit`: **0 erros de compilação**.
