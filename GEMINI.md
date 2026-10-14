# Regras do Workspace: Crônicas de Sangue e Gelo (v2.1)

## 1. Perfil do Usuário e Verificação de Leitura (OBRIGATÓRIO)
- O usuário NUNCA programou. Faça 100% do trabalho técnico: crie pastas, edite arquivos, execute comandos no terminal, rode testes (`npx vitest run` e `npm run build`) e corrija qualquer erro antes de responder.
- Sempre inicie sua primeira resposta com a tag `[REGRAS v2.1 ATIVAS]` para confirmar que carregou este arquivo.
- Explique tudo em português simples. Toda a interface e narrativa do jogo devem ser em Português (pt-BR), seguindo o padrão de tradução de Jorge Candeias (LeYa).
- NUNCA peça para o usuário colar chaves de API no chat. Chaves vivem apenas em `.env.local` e na Vercel.

## 2. Estrutura de Pastas do Corpus Local (`C:\Projetos\gelo-e-fogo-rpg\`)
- `origem/`: Contém os 10 EPUBs e 6 PDFs padronizados. NUNCA modifique nem suba `origem/` para o Git.
- `piloto/`: Contém os 6 capítulos já convertidos em Markdown com cabeçalho YAML (incluindo os 3 capítulos completos da Conquista de Aegon de `fogo-e-sangue.epub`).
- `corpus_md/`: Destino da conversão em lote (usando Python `BeautifulSoup4 + Markdownify`). Ao converter `o-principe-de-westeros.epub`, extraia APENAS o capítulo 22 ("O príncipe de Westeros ou O irmão do rei"), ignorando os outros 20 contos de outros autores.
- `.gitignore`: Deve ignorar `origem/`, `corpus_md/`, `piloto/`, `*.pdf`, `*.epub`, `*.mobi` e `.env.local` (mantendo `.env.local.example` permitido).

## 3. Arquitetura Determinística e Segurança Blindada
- Stack: Next.js (LTS estável mais recente, App Router, TypeScript), Tailwind CSS, Framer Motion, Zustand, Zod, Vitest, Howler.js, Supabase (`@supabase/supabase-js`, `@supabase/ssr`) e `@google/genai`.
- Servidor Protegido (`server-only`): Toda a Bíblia Canônica e grafos de história ficam em `src/server/data/` com `import 'server-only'` no topo, para jamais vazarem no bundle público do navegador.
- Motor Determinístico: A rolagem 2d6, cálculo de limiares (DC 8/10/12/14), barras (`sangue`, `compostura`, `honra`), flags e mudanças de cena são processados 100% pelo código TypeScript e validados com Zod. A IA (`process.env.GEMINI_MODEL`) apenas expande a prosa literária, escreve as Vozes Internas e classifica ações livres dentro das transições válidas do nó atual. Caso a API falhe, o motor usa imediatamente o `fallbackText` do nó.
- Segurança Supabase: Usar `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` no cliente e `SUPABASE_SECRET_KEY` apenas no servidor. Validar `supabase.auth.getUser()` e `user.email === process.env.ALLOWED_USER_EMAIL` em todas as rotas `/api/game/*`.

## 4. Fidelidade ao Corpus (Fonte por Fato)
- É proibido inventar fatos canônicos de memória. Todo registro em `src/server/data/lore/` deve conter `fonte: { arquivo, capitulo }` extraído de `piloto/`, `corpus_md/` ou `origem/`, ou `origem: "original"` quando for uma ramificação alternativa criada para o jogo.
