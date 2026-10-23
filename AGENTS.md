# Regras do Agente: Crônicas de Sangue e Gelo (v2.2)

## 1. Projeto e Filosofia
- **Definição:** RPG textual grimdark de Westeros no navegador (Next.js 15, React 19, TypeScript estrito, Tailwind CSS, Supabase PostgreSQL, @google/genai).
- **Divisão de Responsabilidades:** Motor determinístico em TypeScript puro. A Inteligência Artificial (Gemini) atua estritamente como Mestre literário: apenas expande a prosa e escreve vozes internas dentro do nó atual; a IA NUNCA calcula regras, dados ou transições.

## 2. Invioláveis de Arquitetura
1. **Servidor Autoritativo:** O cliente jamais calcula regras ou envia estados alterados. A UI apenas despacha intenções atômicas `(slotId, escolhaId, versaoEsperada)`. O servidor valida a posse do save, calcula rolagens 2d6, deltas de estado e persiste eventos imutáveis na tabela `turn_events`.
2. **Motor Determinístico:** A rolagem 2d6, limiares de DC (8/10/12/14), barras vitais (sangue, compostura, honra), pontos de inspiração, status de aprovação de companheiros e transições de cena são calculados 100% em código TypeScript e validados por esquemas Zod. A IA nunca altera essas regras.
3. **Proteção Server-Only:** Todo o diretório `src/server/data/` e `src/server/journeys/` é protegido por `import 'server-only'`. Nenhum grafo narrativo, bíblia ou dados brutos podem vazar para o bundle do cliente.
4. **Isolamento de Origem:** NUNCA versionar nem enviar para deploy as pastas `origem/`, `corpus_md/`, `piloto/`, arquivos `*.epub`, `*.pdf`, `*.mobi` ou arquivos de variáveis `.env*` (apenas `.env.example` é permitido).
5. **Fidelidade Canônica ("Fonte por Fato"):** Todo fato do cânone deve conter o registro de `{ livro, capitulo }` extraído dos livros originais de George R. R. Martin (edição LeYa / tradução Jorge Candeias). Bifurcações originais do jogo devem ser explicitamente marcadas com `origem: "original"`.
6. **Design System Códice Vivo:** Uso exclusivo dos tokens semânticos de cor (`tokens.css`), fontes Cinzel, EB Garamond e Inter, e conformidade estrita com o padrão WCAG 2.2 AA (contraste mínimo de 4.5:1 verificado via script).

## 3. Segurança e Privacidade
- **Autorização em Camadas:** A verificação de identidade e do e-mail autorizado (`ALLOWED_USER_EMAIL`) deve ocorrer obrigatoriamente dentro de CADA route handler e Server Action (`requireOwner`), nunca dependendo exclusivamente de middleware.
- **CSP Estrito com Nonce:** O middleware gera um nonce criptográfico único por requisição e bloqueia `'unsafe-eval'` em ambiente de produção, com cabeçalhos `X-Content-Type-Options: nosniff` e `Permissions-Policy` restritivos.
- **Isolamento no Banco:** Row Level Security (RLS) obrigatório e ativo em todas as tabelas do Supabase. A tabela `turn_events` é estritamente append-only (bloqueio de UPDATE e DELETE).
- **Chave de Serviço:** `SUPABASE_SECRET_KEY` (service role) vive exclusivamente no servidor e jamais é enviada ao navegador.
- **Privacidade e Logs:** Proibido registrar PII (dados pessoais), e-mails, tokens ou senhas em logs estruturados.

## 4. Padrões de Engenharia
- **TypeScript Estrito:** Código fortemente tipado, proibido o uso de `any`.
- **Validação Zod nas Bordas:** Toda entrada e saída de API, saves, deltas de estado e saídas estruturadas da IA devem ser validadas com esquemas Zod estritos.
- **Registro Central de Jornadas:** Toda nova campanha deve ser registrada no `REGISTRO_JORNADAS` (`src/server/journeys/registry.ts`), fornecendo startNodeId, grafo validado, fichas prontas e tema regional.
- **Integridade de Grafos (StoryLinter):**
  - Cada nó não final deve ter pelo menos 2 escolhas distintas.
  - Nós finais devem possuir `isEnding: true` e `escolhas: []`.
  - Escolhas com `riscoMortal: true` devem obrigatoriamente especificar `onCriticalFailureNodeId`.
  - Simulações de Monte Carlo (`jogabilidade.test.ts`) devem provar que todos os finais são alcançáveis sem dead-ends.
- **Definição de Pronto (DoD):** Para considerar uma tarefa concluída, `npm run typecheck`, `npm run lint`, `npm test`, `node scripts/contraste.mjs` e `npm run build` devem rodar com sucesso e código de saída 0.
