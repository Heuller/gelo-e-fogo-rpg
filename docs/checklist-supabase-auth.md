# 🛡️ Checklist de Configuração do Supabase Auth (Acesso Pessoal Exclusivo)

> **Destinado a:** [VOCÊ] (Ações manuais no painel do Supabase)  
> **Objetivo:** Garantir que apenas o seu e-mail possa se autenticar e que ninguém consiga criar contas livremente.

---

## 1. Desativar Cadastro Aberto de Usuários
1. Acesse o painel do seu projeto no Supabase: [supabase.com/dashboard](https://supabase.com/dashboard).
2. Vá em **Authentication** -> **Providers** -> **Email**.
3. **Desmarque** a opção `Enable Sign Up` (ou `Allow new users to sign up`).
   - *Efeito:* Ninguém conseguirá criar novas contas na tela de login. Apenas usuários já cadastrados por você no painel conseguirão autenticar.
4. Salve as alterações.

---

## 2. Configurar Magic Link / OTP ou Senha
- Se preferir **Magic Link (Recomendado)**:
  - Ative `Enable Email Provider` e `Enable Email OTP / Magic Link`.
  - Ao entrar, você recebe um link seguro ou código de 6 dígitos direto no seu e-mail pessoal.
- Se preferir **Senha Forte**:
  - Em **Authentication** -> **Users**, clique em `Add User` -> `Create User`.
  - Digite o seu e-mail (`ALLOWED_USER_EMAIL`) e defina uma senha forte.
  - Marque `Auto Confirm Email` como `true`.

---

## 3. Configurar URL de Redirecionamento
1. Em **Authentication** -> **URL Configuration**:
   - **Site URL:** Configure a URL do seu domínio na Vercel (ex: `https://gelo-e-fogo-rpg.vercel.app`).
   - **Redirect URLs:** Adicione:
     - `http://localhost:3000/**` (para desenvolvimento local)
     - `https://*.vercel.app/**` (para deploys de preview)
     - `https://gelo-e-fogo-rpg.vercel.app/**` (para produção)
2. Salve as alterações.
