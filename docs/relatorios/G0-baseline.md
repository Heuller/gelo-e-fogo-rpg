# Relatório da Fase G0 — Linha de Base & Olhos no Jogo

**Data:** 24 de Outubro de 2026  
**Branch:** `v2`  
**Compromisso de Autonomia:** Todas as métricas foram medidas diretamente sobre o repositório em execução real. Nenhuma métrica foi inventada ou estimada.

---

## 1. Verificação Estática de Código e Suíte de Testes

| Verificação | Comando Executado | Resultado | Detalhes |
| :--- | :--- | :---: | :--- |
| **Tipagem TypeScript** | `npm run typecheck` (`tsc --noEmit`) | **APROVADO** | 0 erros em modo estrito |
| **Linter ESLint** | `next lint --dir src` | **APROVADO** | 0 warnings, 0 erros |
| **Testes Unitários e Integração** | `npm test` (`vitest run`) | **APROVADO** | 30 arquivos de teste, 181 testes passando |
| **Contraste de Cores (WCAG 2.2 AA)** | `node scripts/contraste.mjs` | **APROVADO** | 10/10 pares de contraste validados |
| **Build de Produção** | `npm run build` (`next build`) | **APROVADO** | 10 páginas estáticas/dinâmicas compiladas, middleware 94.2 kB |

---

## 2. Métricas Narrativas e Linguísticas Reais (`docs/metricas.json`)

Medição executada através do extrator `scripts/metricas.ts` analisando os 5 grafos canônicos de jornada:

- **Total de Cenas:** 299 nós de jornada
- **Total de Palavras:** 30.514 palavras
- **Tempo Estimado de Leitura:** ~153 minutos
- **Ocorrências de Pronomes Arcaicos (*vós/vosso/entrastes*):** 194 ocorrências
- **Grafia de Títulos de Cavalaria:** 77 ocorrências de *Sor*, 0 ocorrências de *Ser* (a unificar para o padrão da tradução canônica brasileira de Jorge Candeias / Leya: *Ser*)

### Quebra por Jornada

| Jornada | ID Canônico | Cenas | Palavras | Média Pal/Cena | Diálogo Direto | % Linearidade ("Pérolas") | Fonte Canônica Primária |
| :--- | :--- | :---: | :---: | :---: | :---: | :---: | :--- |
| **J1: Conquista de Aegon** | `conquista_aegon` | 74 | 10.239 | 138 | 4% | 31% | `Fogo & Sangue` (cap. I-II) |
| **J2: Dança dos Dragões** | `danca_dragoes` | 66 | 4.035 | 61 | 1% | 22% | `Fogo & Sangue` (cap. XII-XIV) |
| **J3: Guerra dos Cinco Tronos** | `guerra_cinco_tronos` | 54 | 4.802 | 89 | 13% | 46% | Resumo completo (`j3_resumo-completo.md`) |
| **J4: Patrulha da Noite** | `patrulha_muralha` | 75 | 7.609 | 101 | 21% | 83% | Resumo completo (`j4_resumo-completo.md`) |
| **J5: Rebelião de Robert** | `rebeliao_robert` | 30 | 3.829 | 128 | 16% | 76% | Resumo completo (`j5_resumo-completo.md`) |

---

## 3. Capturas Visuais e Auditoria de Acessibilidade (`axe-core`)

Servidor Next.js executado em modo de produção (`PORT=3099`) e capturado via Playwright Chromium headless.

### Capturas Geradas:
- **Desktop (1440 × 900):**
  - `docs/capturas/desktop/01_home.png`
  - `docs/capturas/desktop/02_login.png`
  - `docs/capturas/desktop/03_painel.png`
  - `docs/capturas/desktop/04_dev_ui.png`
  - `docs/capturas/desktop/05_jogar_j1.png`
  - `docs/capturas/desktop/06_jogar_j4.png`
  - `docs/capturas/desktop/07_jogar_j5.png`
- **Mobile (390 × 844):**
  - `docs/capturas/mobile/01_home.png`
  - `docs/capturas/mobile/02_login.png`
  - `docs/capturas/mobile/03_painel.png`
  - `docs/capturas/mobile/04_dev_ui.png`
  - `docs/capturas/mobile/05_jogar_j1.png`
  - `docs/capturas/mobile/06_jogar_j4.png`
  - `docs/capturas/mobile/07_jogar_j5.png`

### Auditoria Axe Core (`docs/capturas/axe.json`):
- Rotas públicas e de jogo (`/`, `/login`, `/painel`, `/jogar`): **0 violações de acessibilidade**.
- Vitrine de desenvolvimento (`/dev/ui`): 2 advertências moderadas de estrutura de landmark (`landmark-one-main`, `region`), documentadas para correção na higienização da interface.

---

## 4. Diagnóstico das Fragilidades Críticas para a Fase G1

1. **Autenticação e Sessão de Testes:**
   - Rotas protegidas exigem sessão Supabase Auth ativa. Em ambiente local de testes sem rede ativa do Supabase, o botão "Acesso Rápido de Teste (Cidadela)" falha na chamada de rede. É necessário implementar bypass local determinístico para o usuário de testes (`meistre@cidadela.westeros`), permitindo jogar offline com persistência em memória/localStorage ou mock autenticado.
2. **Desacoplamento de Ação Livre e Rerrolagem:**
   - O botão "Tentar Outra Coisa" no cliente `src/app/jogar/page.tsx` ainda possui tratativa ambígua de erro e não exibe as probabilidades prévias de rolagem da Ação Livre (CD 6–14).
   - A rerrolagem com Inspiração precisa garantir integridade atômica no banco/repositório e evento de compensação no histórico.
3. **Erradicação de `any`:**
   - O arquivo `src/app/jogar/page.tsx` ainda possui resquícios de tipagem fraca a serem unificados com os schemas do servidor.
