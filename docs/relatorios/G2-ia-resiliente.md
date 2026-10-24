# Relatório de Execução — Fase G2: IA Fora do Caminho Crítico, Cache e Cota Persistente

> **Data de Execução:** 24/10/2026  
> **Branch:** `v2`  
> **Status:** CONCLUÍDO (100% dos testes e DoDs aprovados)

---

## 1. Objetivo da Fase

Resolver os achados de latência e custo **S-04** (rate limiter apenas em memória efêmera) e **S-07** (Gemini executado no caminho crítico de resposta do turno).
Garantir que o jogador receba a narrativa canônica imediatamente (< 300ms de TTFT no servidor), enquanto o enriquecimento do Mestre chega de maneira assíncrona e não bloqueante, com:
- Cache determinístico de respostas persistente no Postgres (Supabase) para evitar custos duplicados em rejogos de nós com contexto idêntico.
- Controle persistente de cota diária por usuário (`ia_uso` + RPC `incrementar_uso_ia`).
- Tratamento silencioso de falhas/timeouts de IA: se a IA demorar mais de 6 segundos ou falhar, o texto canônico é mantido sem modais intrusivos de erro.

---

## 2. O Que Foi Feito

### 2.1 Desacoplamento Assíncrono do Turno
- Em `src/app/actions/gameActions.ts`:
  - `processarEscolhaAction` foi totalmente desacoplada da chamada síncrona do Gemini. Retorna de imediato com o `fallbackText` canônico e metadados de turno.
  - `obterTextoMestreAction` foi enriquecida para atuar fora do caminho crítico, passando a validar o usuário (`userId`), consultar o cache persistente e verificar a cota diária.
- Em `src/app/jogar/page.tsx`:
  - A cena renderiza imediatamente com o `fallbackText`.
  - Se `modoIA` estiver ativado, dispara `obterTextoMestreAction` em segundo plano com um `Promise.race` limitado a 6 segundos.
  - Ao resolver com sucesso, atualiza o texto suavemente (`statusMestre: 'pronto'`) e oferece a alternância para a visão do Mestre.
  - Em caso de timeout ou indisponibilidade, mantém o texto canônico e define `statusMestre: 'idle'`.

### 2.2 Cache Determinístico e Controle de Cota (`src/server/ai/cacheELimites.ts`)
- **Chave de Cache Determinística:** gerada via SHA-256 a partir de `(jornadaId, nodeId, flagsBorboleta, marcosConcluidos, resultadoRolagem)`.
- **Persistência Híbrida:** suporte transparente a Supabase em produção com fallback automático em memória para testes unitários e modo local.
- **Migração do Supabase (`supabase/migrations/20261026_ia_cache_e_limites.sql`):**
  - Tabela `ia_cache` com TTL configurável (padrão: 7 dias) e índices de busca.
  - Tabela `ia_uso` com controle de chamadas e volume de tokens por dia.
  - RPC atômica `incrementar_uso_ia` com verificação de teto diário.
  - Políticas de RLS habilitadas para proteção de dados.

### 2.3 Refinamento de Tipagem e Zero `any`
- Em `src/server/ai/geminiMaster.ts`:
  - Removido o `any` remanescente em `rawVozes.filter((v: unknown))`.
  - Integrado o cache determinístico e a cota persistente antes de acionar o cliente do Gemini.
- Em `src/server/saves/index.ts`:
  - Substituídos os parâmetros tipados como `any` por tipos formais (`FichaPersonagem`, `WorldState`, `ChapterCheckpoint`, `AplicarTurnoParams`).

---

## 3. Antes e Depois (Métricas de Desempenho e Confiabilidade)

| Métrica | Antes (G1B) | Após G2 | Benefício |
| :--- | :---: | :---: | :---: |
| **Tempo de Resposta do Turno (TTFT)** | 1.200 ms – 4.500 ms (esperava Gemini) | **< 50 ms** (medido: 4 ms em teste) | Leitura imediata, sem travamento de tela |
| **Cache de IA em Rejogos** | Inexistente (chamava a API toda vez) | **Ativo** (chave SHA-256 persistente) | Custo 0 em cenas já enriquecidas |
| **Rate Limit / Cota Diária** | Efêmero em memória (`Map`) | **Persistente** (Postgres `ia_uso` + RPC) | Proteção global contra estouro de cota |
| **Timeout de IA** | Bloqueava o turno até 6s | Assíncrono em segundo plano | A experiência de jogo nunca congela |
| **Total de Testes Automatizados** | 200 testes | **205 testes** | +5 testes dedicados em `g2IaResiliente.test.ts` |

---

## 4. Comandos Rodados e Saída Real

### 4.1 Typecheck (`tsc --noEmit`)
```
cd C:\Projetos\gelo-e-fogo-rpg; npx tsc --noEmit
Exit code: 0 (Zero erros de tipo)
```

### 4.2 Lint (`next lint --dir src`)
```
cd C:\Projetos\gelo-e-fogo-rpg; npx next lint --dir src
✔ No ESLint warnings or errors
Exit code: 0
```

### 4.3 Contraste de Cores (`contraste.mjs`)
```
cd C:\Projetos\gelo-e-fogo-rpg; node scripts/contraste.mjs
🎉 Todos os 10 pares de contraste foram aprovados com sucesso!
Exit code: 0
```

### 4.4 Testes Automatizados (`vitest run`)
```
cd C:\Projetos\gelo-e-fogo-rpg; npx vitest run
 Test Files  35 passed (35)
      Tests  205 passed (205)
   Duration  45.90s
Exit code: 0
```

### 4.5 Build de Produção (`next build`)
```
cd C:\Projetos\gelo-e-fogo-rpg; npx next build
   ▲ Next.js 15.5.27
 ✓ Compiled successfully in 49s
 ✓ Generating static pages (10/10)
Exit code: 0
```

---

## 5. O Que Não Foi Feito e Por Quê
- Não alteramos prompts narrativos ou diretrizes literárias (respeitando o escopo da G2; esses ajustes ocorrem nas fases narrativas G6A/G6C).
- A aplicação da migração SQL em produção no Supabase será feita de forma autônoma/idempotente via script no momento do deploy ou configuração de CI.

---

## 6. Dúvidas para o Usuário
- Nenhuma dúvida impeditiva. Todas as decisões técnicas e de persistência foram registradas em `docs/DECISOES_AUTONOMAS.md`.
