# Regras do Agente: Crônicas de Sangue e Gelo (v2.1)

## 1. Projeto
- **Definição:** RPG textual grimdark de Westeros, jogável no navegador (Next.js 15, React 19, TypeScript estrito, Tailwind CSS, Supabase, @google/genai).
- **Divisão de Responsabilidades:** Motor determinístico em TypeScript puro. A Inteligência Artificial (Gemini) atua estritamente como Mestre literário: apenas expande a prosa e escreve vozes internas dentro do nó atual; a IA NUNCA calcula regras, dados ou transições.

## 2. Invioláveis de Arquitetura
1. **Motor Determinístico:** A rolagem 2d6, limiares de DC (8/10/12/14), barras vitais (sangue, compostura, honra), pontos de inspiração, status de aprovação de companheiros e transições de cena são calculados 100% em código TypeScript e validados por esquemas Zod. A IA nunca altera essas regras.
2. **Proteção Server-Only:** Todo o diretório `src/server/data/` é protegido por `import 'server-only'`. Nenhum grafo narrativo, bíblia ou dados brutos podem vazar para o bundle do cliente.
3. **Isolamento de Origem:** NUNCA versionar nem enviar para deploy as pastas `origem/`, `corpus_md/`, `piloto/`, arquivos `*.epub`, `*.pdf`, `*.mobi` ou arquivos de variáveis `.env*` (apenas `.env.example` é permitido).
4. **Fidelidade Canônica ("Fonte por Fato"):** Todo fato do cânone deve conter o registro de `{ livro, capitulo }` extraído dos livros originais. Bifurcações originais do jogo devem ser explicitamente marcadas com `origem: "original"`.

## 3. Segurança e Privacidade
- **Autorização em Camadas:** A verificação de identidade e do e-mail autorizado (`ALLOWED_USER_EMAIL`) deve ocorrer obrigatoriamente dentro de CADA route handler e Server Action (`requireOwner`), nunca dependendo exclusivamente de middleware.
- **Isolamento no Banco:** Row Level Security (RLS) obrigatório e ativo em todas as tabelas do Supabase. A tabela `turn_events` é estritamente append-only (bloqueio de UPDATE e DELETE).
- **Chave de Serviço:** `SUPABASE_SECRET_KEY` (service role) vive exclusivamente no servidor e jamais é enviada ao navegador.
- **Privacidade e Logs:** Proibido registrar PII (dados pessoais), senhas, chaves de API ou o texto livre digitado pelo jogador em logs estruturados (registrar apenas metadados como tamanho, latência e status).

## 4. Padrões de Engenharia
- **TypeScript Estrito:** Código fortemente tipado, proibido o uso de `any`.
- **Validação Zod nas Bordas:** Toda entrada e saída de API, saves, deltas de estado e saídas estruturadas da IA devem ser validadas com esquemas Zod estritos.
- **Qualidade de Testes:** Testes unitários e de integração mantidos junto do código (`*.test.ts`).
- **Padrão Git:** Commits convencionais em português (`feat:`, `fix:`, `docs:`, `test:`, `refactor:`, `chore:`).
- **Definição de Pronto (DoD):** Para considerar uma tarefa concluída, `npx tsc --noEmit`, `npm run lint`, `npx vitest run` e `npm run build` devem rodar com sucesso e sem erros.

## 5. Diretrizes de Operação e Comunicação
- **Comunicação:** Sempre em português brasileiro (pt-BR), claro e objetivo.
- **Proteção do Banco e Dados:** Fazer backup prévio (`pg_dump` ou snapshot) antes de qualquer migração estrutural.
- **Ambiente:** Chaves de API vivem apenas em `.env.local` e no painel da Vercel. Nunca solicitar nem expor credenciais em texto puro.
