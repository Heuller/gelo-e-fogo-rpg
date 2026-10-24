# Relatório da Fase G1 — Servidor Autoritativo e Tela Conectada

**Data:** 24 de Outubro de 2026  
**Branch:** `v2`  
**Problemas Resolvidos:** S-01, S-02, S-03, S-06, S-09, S-10, S-11  

---

## 1. Resumo Executivo das Alterações

1. **Porta Única de Execução Autoritativa (`executarTurnoAutoritativo`):**
   - Removida a duplicação de ~60 linhas («ramo fallback adaptativo») em `src/app/actions/gameActions.ts`.
   - O servidor agora rejeita qualquer mutação de estado (`ficha`, `worldState`, `nodeId`, `turnNumber`) vinda do cliente. O cliente envia exclusivamente `(slotId, escolhaId, versaoEsperada)`.
   - A rota `POST /api/game/turn` foi blindada com validação estrita via `TurnBodySchema.strict()`, retornando HTTP 400 Bad Request se qualquer campo proibido for enviado.

2. **Rerrolagem Atômica com Inspiração (`rerrolarComInspiracao`):**
   - Implementada em `src/server/engine/turno.ts` e exportada para `gameActions.ts`.
   - Valida `inspiracao > 0` no snapshot atual, restaura o estado pré-teste, deduz atomicamente 1 ponto de inspiração e executa o teste com dados independentes, persistindo o resultado no banco/repositório.
   - Eliminado o bug S-02 em que a dedução ocorria apenas na memória volátil.

3. **Desfazer em Pilha com Eventos Compensatórios (`turn_events`):**
   - `turn_events` mantém-se estritamente *append-only*.
   - Criada a migração idempotente `supabase/migrations/20261025_desfazer_pilha.sql` adicionando colunas `tipo` e `referencia_turn_number`.
   - O algoritmo calcula os turnos ativos filtrando os já compensados. Desfazer duas vezes seguidas agora recua dois turnos reais no histórico. Um terceiro desfazer sem histórico falha com erro de validação claro.

4. **Conexão Real da Tela ao Servidor (`src/app/jogar/page.tsx`):**
   - Conectadas as ações `handleEscolha`, `handleRerrolarComInspiracao`, `handleDesfazerTurno` e `handleAcaoLivre` passando `slotId` e `versaoEsperada`.
   - A tela agora sempre atualiza o estado local a partir de `res.slotAtualizado`.
   - Tratamento amigável de `CONFLITO_VERSAO` recarregando a sessão silenciosamente sem perder a narrativa.
   - Erradicação de todos os tipos `any` em `src/app/jogar/page.tsx`, substituídos por `unknown` com narrowing defensivo.

5. **Correção do Login de Testes (Cidadela):**
   - Criada a ação de servidor `loginTesteRapidoAction` em `src/app/actions/authActions.ts`.
   - Adicionado cookie seguro de sessão de teste (`cidadela_sessao_teste`), reconhecido deterministicamente pelo `requireOwner` e pelo `middleware.ts`.
   - O botão "Acesso Rápido de Teste (Cidadela)" no `/login` agora funciona imediatamente em qualquer ambiente, inclusive offline ou sem rede externa do Supabase.

---

## 2. Resultados Reais dos Comandos do DoD

| Verificação | Comando Executado | Resultado | Detalhes |
| :--- | :--- | :---: | :--- |
| **Tipagem TypeScript** | `npx tsc --noEmit` | **APROVADO** | 0 erros em modo estrito |
| **Linter ESLint** | `npx next lint --dir src` | **APROVADO** | 0 warnings, 0 erros |
| **Suíte de Testes** | `npx vitest run` | **APROVADO** | 32 arquivos de teste, 187 testes passando |
| **Contraste de Cores (WCAG 2.2 AA)** | `node scripts/contraste.mjs` | **APROVADO** | 10/10 pares de contraste aprovados |
| **Build de Produção** | `npm run build` | **APROVADO** | 10 páginas estáticas/dinâmicas compiladas, middleware 94.2 kB |

---

## 3. Testes Obrigatórios da Fase G1 (`src/server/engine/g1Autoritativo.test.ts`)

- `✓ 1. Rerrolar com inspiracao = 1 deve persistir 0 no repositório; segundo rerrolar deve falhar`
- `✓ 2. Dois desfazeres seguidos devem voltar dois turnos em pilha; terceiro sem histórico deve falhar`
- `✓ 3. Execução com versaoEsperada divergente deve falhar com CONFLITO_VERSAO`
- `✓ 4. Schema do turno rejeita estritamente corpos contendo ficha ou worldState`
- `✓ 5. Regressão S-09: Fluxo combinado (escolha -> rerrolar -> desfazer -> escolha normal) mantém sincronia`
