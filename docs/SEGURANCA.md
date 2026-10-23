# Modelo de Segurança e Blindagem — Crônicas de Sangue e Gelo

Este documento descreve o modelo de segurança da aplicação após a reforma de persistência autoritativa (Fase 1).

## 1. Modelo de Ameaça e Contexto Operacional

- **Tipo de Aplicação**: RPG narrativo determinístico de uso pessoal e privado.
- **Princípio Central**: Zero Confiança no Cliente (*Zero-Trust Frontend*). O navegador do jogador apenas renderiza a interface e despacha a intenção de escolha `(slotId, escolhaId, versaoEsperada)`. Todas as rolagens, cálculos de regras, deduções de saúde, honra, compostura e transições de nós ocorrem estritamente no servidor.
- **Defesa de Custos de IA**: Circuit breaker com cota diária (`MAX_AI_DAILY_CALLS = 100`) e sanitização estrita contra injeção de prompt (`<user_action>`).

## 2. Superfície de Autenticação e Autorização

- **`requireOwner` com Falha Fechada**: Em produção, se a variável `ALLOWED_USER_EMAIL` não estiver definida, o acesso é sumariamente bloqueado. Apenas o e-mail cadastrado como proprietário possui permissão para invocar Server Actions narrativas, consultar os arquivos da Cidadela ou manipular slots.
- **Middleware com `@supabase/ssr`**: As rotas `/painel` e `/jogar` exigem sessão ativa; requisições anônimas são redirecionadas para `/login`.
- **Eliminação de Segredos no Cliente**: Removidas todas as referências a credenciais em variáveis públicas (`NEXT_PUBLIC_*`). O bundle JavaScript servido ao navegador não contém chaves de serviço nem senhas.

## 3. Variáveis de Ambiente Necessárias

| Variável | Escopo | Descrição |
| :--- | :---: | :--- |
| `ALLOWED_USER_EMAIL` | Servidor | E-mail do único usuário autorizado a jogar e administrar. |
| `NEXT_PUBLIC_SUPABASE_URL` | Público | URL do projeto Supabase. |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | Público | Chave pública anônima do Supabase. |
| `SUPABASE_SERVICE_ROLE_KEY` | Servidor | Chave administrativa do Supabase (estritamente privada). |
| `GEMINI_API_KEY` | Servidor | Chave de API do Google Gemini para enriquecimento narrativo. |

## 4. Ações Manuais do Proprietário [VOCÊ]

1. **Executar a Migração no Supabase**:
   - Abra o **SQL Editor** do Supabase Cloud.
   - Execute a migração idempotente `supabase/migrations/20261023_save_autoritativo.sql`.
2. **Rotacionar a Senha da Conta de Teste**:
   - Como versões anteriores possuíam variáveis `NEXT_PUBLIC_TEST_USER_PASSWORD` no exemplo, altere a senha do usuário em *Authentication -> Users* no painel do Supabase.
3. **Desativar Novos Cadastros**:
   - Em *Authentication -> Settings*, garanta que *"Allow new users to sign up"* esteja **desmarcado**.
