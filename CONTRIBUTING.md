# ⚔️ Guia de Contribuição e Fluxo Git: Crônicas de Sangue e Gelo

> **Escopo:** Projeto de uso pessoal e desenvolvimento guiado por IA (Google Antigravity).

---

## 1. Fluxo de Trabalho por Branches

1. **Nunca commitar diretamente na branch principal (`master` / `main`):**
   - Crie uma branch de tópico para cada funcionalidade ou fase:
     ```bash
     git checkout -b feature/nome-da-funcionalidade
     ```
2. **Definição de Pronto (Gate Local Obrigatório):**
   Antes de abrir Pull Request ou fazer merge, execute o workflow de verificação:
   ```bash
   npx tsc --noEmit
   npm run lint
   npx vitest run
   npm run build
   node scripts/check_secrets.mjs
   ```
3. **Padrão de Mensagens de Commit:**
   Siga o padrão *Conventional Commits* em português:
   - `feat(...)`: nova funcionalidade
   - `fix(...)`: correção de bug
   - `test(...)`: adição ou refatoração de testes
   - `docs(...)`: documentação e relatórios
   - `chore(...)`: manutenção, configurações e dependências
