# 🛡️ Guia de Deploy de Produção Privada: Vercel & Supabase Cloud

> **Escopo:** Uso Pessoal Exclusivo (Apenas Você)  
> **Arquitetura:** Frontend & Server Actions na Vercel | Banco, Auth & RLS no Supabase Cloud

---

## 1. Limites do Plano Hobby da Vercel (Auditado para Uso Pessoal)

Conforme a documentação oficial da Vercel (*Vercel Pricing & Fair Use Guidelines*):
- **Custo:** Gratuito para projetos pessoais não-comerciais.
- **Serverless Function Execution Duration:** Padrão de até **10 segundos** no plano Hobby (mais que suficiente para o nosso timeout de 6 segundos da IA Gemini).
- **Largura de Banda (Bandwidth):** 100 GB / mês (o app consome < 1 GB para uso pessoal, graças às ilustrações procedurais em SVG leve e áudio sintetizado em Web Audio).
- **Deployment Protection:** No plano Hobby, o app é protegido pelas nossas próprias camadas de defesa:
  1. `requireOwner` com bloqueio 401/403 no servidor.
  2. `robots.txt` com Disallow total e headers `X-Robots-Tag: noindex, nofollow`.
  3. Desativação de cadastro público no painel do Supabase.

---

## 2. Passo a Passo de Configuração na Vercel [VOCÊ]

1. **Importar o Repositório:**
   - Acesse [vercel.com](https://vercel.com) e clique em **Add New Project**.
   - Selecione o repositório privado `Heuller/gelo-e-fogo-rpg`.
   - Framework Preset: `Next.js` (detectado automaticamente).
   - Root Directory: `./`.

2. **Configurar as Variáveis de Ambiente na Vercel:**
   Adicione as seguintes variáveis na aba **Environment Variables** (marcadas para *Production* e *Preview*):

   | Nome da Variável | Tipo | Onde Obter |
   |:---|:---:|:---|
   | `NEXT_PUBLIC_SUPABASE_URL` | Público | Painel Supabase -> Settings -> API -> Project URL |
   | `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | Público | Painel Supabase -> Settings -> API -> anon public key |
   | `SUPABASE_SECRET_KEY` | **Secreto** | Painel Supabase -> Settings -> API -> service_role key |
   | `ALLOWED_USER_EMAIL` | **Secreto** | O seu e-mail pessoal exclusivo |
   | `GEMINI_API_KEY` | **Secreto** | Google AI Studio -> Create API Key |
   | `GEMINI_MODEL` | Opcional | `gemini-2.5-flash` |
   | `MAX_AI_DAILY_CALLS` | Opcional | `100` |

3. **Deploy:**
   - Clique em **Deploy**. A compilação Next.js 15 gerará as rotas em menos de 2 minutos.

---

## 3. Aplicação do Banco no Supabase Cloud [VOCÊ]

1. Acesse o **SQL Editor** no painel do Supabase.
2. Copie e execute o conteúdo do arquivo:
   `supabase/migrations/20261019_save_slots_and_turn_events.sql`
3. O banco criará automaticamente as tabelas `save_slots`, `turn_events` e `ai_usage` com RLS ativa e restrição estrita de 3 slots por jornada.

---

## 4. Procedimento de Rollback Imediato

Se uma nova versão apresentar qualquer comportamento inesperado em produção:
1. **Rollback de Deploy na Vercel:**
   - No painel da Vercel, acesse a aba **Deployments**.
   - Localize o deploy anterior que estava 100% estável.
   - Clique nos três pontos (`...`) e selecione **Promote to Production**. O tráfego será redirecionado instantaneamente sem necessidade de rebuild.
2. **Reversão de Migração no Banco:**
   - Restaure o snapshot de backup conforme instruções em `docs/supabase-runbook.md`.
