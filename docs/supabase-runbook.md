# 🛡️ Runbook do Banco de Dados Supabase: Migrações, Backup e RLS

> **Ambientes:** Desenvolvimento (Local / Supabase Dev) & Produção (Supabase Prod)  
> **Regra Suprema:** Backup antes de qualquer migração estrutural no banco.

---

## 1. Mapeamento de Tabelas, Políticas de RLS e Comandos Permitidos

| Tabela | RLS Ativo? | Política | Comandos Permitidos | Regra de Negócio |
|:---|:---:|:---|:---:|:---|
| `public.save_slots` | ✅ Sim | `Usuários gerenciam seus próprios slots` | `SELECT`, `INSERT`, `UPDATE`, `DELETE` | `auth.uid() = user_id`. Máximo 3 slots por jornada garantido por `CHECK (slot_number BETWEEN 1 AND 3)`. |
| `public.turn_events` | ✅ Sim | `Usuários visualizam/inserem turnos` | `SELECT`, `INSERT` | **Append-Only Imutável.** `UPDATE` e `DELETE` são terminantemente bloqueados para garantir rastreabilidade histórica. |
| `public.ai_usage` | ✅ Sim | `Usuários registram consumo de IA` | `SELECT`, `INSERT` | Registro de tokens, latência e status para circuit breaker e teto de gastos. |

---

## 2. Procedimento Obrigatório de Backup & Restore (`pg_dump`)

### 2.1. Executar Backup Prévio (Antes de Aplicar Migrações)
```bash
# Exportar schema e dados completos com pg_dump
pg_dump -h db.SEU_PROJETO.supabase.co -U postgres -d postgres -F c -b -v -f "supabase/backups/backup_$(date +%Y%m%d_%H%M%S).dump"
```

### 2.2. Restaurar Backup em Caso de Falha
```bash
# Restaurar snapshot com pg_restore
pg_restore -h db.SEU_PROJETO.supabase.co -U postgres -d postgres -v "supabase/backups/nome_do_arquivo.dump"
```

---

## 3. Fluxo de Aplicação de Migrações Versionadas

1. **Testar Localmente com Supabase CLI:**
   ```bash
   supabase db reset
   ```
2. **Aplicar em Ambiente de Produção:**
   ```bash
   supabase db push
   ```
   *(Ou execute o script `supabase/migrations/20261019_save_slots_and_turn_events.sql` no SQL Editor do painel web do Supabase).*

---

## 4. Separação de Ambientes Dev vs. Prod

- **Ambiente de Desenvolvimento (`.env.local`):**
  - Conecta ao projeto Dev do Supabase ou emulador local.
  - Utiliza `ALLOWED_USER_EMAIL` para testes locais.
- **Ambiente de Produção (Painel da Vercel):**
  - Conecta ao banco de Produção isolado.
  - Chaves `SUPABASE_SECRET_KEY` configuradas estritamente no servidor.
  - Cadastro aberto desativado no Supabase Auth.
