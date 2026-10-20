# 🛡️ Plano de Limpeza de Histórico Git e Rotação de Credenciais

> **Status:** Elaborado para revisão e confirmação do proprietário.  
> **Objetivo:** Fornecer o roteiro seguro para rotação de credenciais e eventual reescrita de histórico caso o repositório seja tornado público no futuro.

---

## 1. Diagnóstico do Histórico Git Atual

Uma auditoria exaustiva em todos os commits e árvores do repositório (`git rev-list --objects --all`) revelou:
1. **Corpus e Binários Pesados:** 🟢 **100% Limpo.** Pastas `origem/`, `corpus_md/` e arquivos `*.epub`, `*.pdf` NUNCA foram commitados no Git.
2. **Segredos no Histórico Pregresso:** Nos commits iniciais (`a0a8e3a` a `8d5b787`), a string de chave de desenvolvimento do Supabase (`sb_secret_EXEMPLO_TESTE`) constava como valor de fallback em `src/lib/supabase/admin.ts` e scripts auxiliares.
3. **Estado Atual do Working Tree:** 🟢 **Removido.** Todas as chaves foram substituídas por leitura estrita via `process.env`. O script `scripts/check_secrets.mjs` agora passa com zero achados.

---

## 2. Ação Imediata Obrigatória: Rotação de Credenciais [VOCÊ]

Como o repositório é atualmente **privado**, a reescrita do histórico não é urgente para a máquina local, mas as credenciais de teste expostas no histórico prévio **devem ser rotacionadas** antes do deploy em produção:

1. **Acessar o Painel do Supabase:**
   - Acesse o painel do seu projeto no Supabase (`Settings` -> `API`).
   - Clique em **Reset** na `service_role key` (secret key).
   - Copie a nova chave gerada diretamente para as variáveis de ambiente (`.env.local` e no painel da Vercel).
2. **Senha do Usuário de Produção:**
   - Cadastre uma senha forte exclusiva para o seu e-mail (`ALLOWED_USER_EMAIL`) através do comando `scripts/setup_test_user.mjs` ou pelo painel Auth do Supabase.

---

## 3. Procedimento de Limpeza do Histórico (Caso Queira Reescrever)

Se você desejar expurgar qualquer vestígio do histórico anterior antes de tornar o repositório público ou compartilhar com terceiros:

### Passo 1: Backup Prévio e Absoluto
```bash
# Criar cópia completa do repositório em pasta separada antes de qualquer alteração
git clone --mirror C:\Projetos\gelo-e-fogo-rpg C:\Projetos\gelo-e-fogo-rpg-backup.bundle
```

### Passo 2: Executar git-filter-repo
Utilize a ferramenta oficial recomendada pelo Git (`git-filter-repo` via Python):
```bash
pip install git-filter-repo

# Substituir a chave antiga por uma string segura em todos os commits do histórico
git-filter-repo --replace-text <(echo "CHAVE_ANTIGA_A_SUBSTITUIR==>CHAVE_ROTACIONADA")
```

### Passo 3: Forçar Push para o GitHub
```bash
git push origin --force --all
```

> **Aviso de Risco:** A reescrita de histórico altera os hashes SHA-1 de todos os commits subsequentes. Realize apenas com backup verificado.
