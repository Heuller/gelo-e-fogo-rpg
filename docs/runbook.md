# 🛡️ Runbook de Operação e Resposta a Incidentes: Crônicas de Sangue e Gelo

> **Data:** 19/10/2026 (v2.1)  
> **Sistema:** RPG Narrativo Determinístico de Westeros

---

## 1. Arquitetura de Produção

- **Frontend / Edge:** Vercel (Next.js 15 App Router, React 19).
- **Lógica e Motor:** Server Actions e Route Handlers (`server-only`) processados em Node.js Runtime.
- **Banco e Autenticação:** Supabase Cloud (PostgreSQL com Row Level Security e Auth).
- **Mestre IA:** Google Gemini API (`@google/genai` com timeout de 6s e contingência local).

---

## 2. Variáveis de Ambiente Críticas

| Variável | Obrigatoriedade | Função |
|:---|:---:|:---|
| `NEXT_PUBLIC_SUPABASE_URL` | Obrigatória | URL base do projeto Supabase |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | Obrigatória | Chave anônima para cliente |
| `SUPABASE_SECRET_KEY` | Obrigatória | Chave de serviço para operações administrativas |
| `ALLOWED_USER_EMAIL` | Obrigatória | E-mail único autorizado a jogar e gerenciar saves |
| `GEMINI_API_KEY` | Opcional | Chave do Google Gemini (se ausente, motor opera em Cânone Estrito) |
| `GEMINI_MODEL` | Opcional | Modelo utilizado (default: `gemini-2.5-flash`) |
| `MAX_AI_DAILY_CALLS` | Opcional | Limite diário de chamadas (default: `100`) |

---

## 3. Chave de Desligamento Emergencial da IA (Circuit Breaker Manual)

Se a API do Gemini estiver instável ou apresentar cobrança inesperada:
1. No painel da Vercel (ou no arquivo `.env.local`), configure:
   ```env
   MAX_AI_DAILY_CALLS=0
   ```
2. Salve e republique.
3. **Efeito Imediato:** O jogo desativa todas as chamadas de IA e opera 100% no modo **Cânone Estrito Determinístico**, utilizando a prosa original gravada em cada nó e o classificador local de palavras-chave. Nenhuma funcionalidade de jogo é interrompida.

---

## 4. Plano de Resposta a Incidentes (Vazamento de Chave)

Caso suspeite que qualquer chave tenha sido exposta:
1. **Revogar Imediatamente:**
   - **Gemini:** Acesse o [Google AI Studio](https://aistudio.google.com/), delete a chave comprometida e gere uma nova.
   - **Supabase:** Acesse `Settings` -> `API` no painel Supabase e resete a `service_role key`.
2. **Atualizar Variáveis:**
   - Atualize os valores na Vercel (`Settings` -> `Environment Variables`) e no seu `.env.local`.
   - Acione um *Redeploy* na Vercel para propagar as novas credenciais.
3. **Auditar Logs:**
   - No painel da Vercel, acesse a aba **Logs** filtrando por status 401 e 403 para verificar tentativas de abuso.

---

## 5. Rotina de Backup e Restauração

- Antes de qualquer atualização estrutural no banco, siga o procedimento em `docs/supabase-runbook.md`.
- Snapshots locais são guardados em `supabase/backups/`.
