# Workflow: Auditoria de Segurança (/auditar-seguranca)

Este workflow audita dependências, segredos e rotas expostas para prevenir vulnerabilidades e vazamentos de dados ou chaves.

## Comandos e Verificações:

1. **Auditoria de Dependências de Produção:**
   ```bash
   npm audit --omit=dev
   ```

2. **Varredura de Segredos e Padrões de Chaves:**
   Verifica se existem padrões de chaves sensíveis commitados ou em arquivos públicos:
   - Chaves Supabase (`sb_secret_`, `service_role`)
   - Chaves Google AI (`AIzaSy`)
   - Senhas ou tokens em texto plano

3. **Conferência de Headers de Segurança:**
   Verifica a presença de Content Security Policy (CSP), HSTS, X-Frame-Options, X-Content-Type-Options e X-Robots-Tag em `next.config.mjs`.

4. **Auditoria de Rotas Autenticadas:**
   Garante que todas as rotas sob `/api/*` e Server Actions executam a validação de sessão `requireOwner` com bloqueio contra usuários anônimos e não autorizados.
