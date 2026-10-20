# Workflow: Verificar Qualidade do Código (/verificar)

Este workflow valida a integridade completa da aplicação: checagem estrita de tipos TypeScript, linter, testes unitários e build de produção Next.js.

## Comandos Executados:

1. **Checagem de Tipos TypeScript:**
   ```bash
   npx tsc --noEmit
   ```

2. **Linter de Código:**
   ```bash
   npm run lint
   ```

3. **Suíte de Testes Unitários:**
   ```bash
   npx vitest run
   ```

4. **Compilação de Produção:**
   ```bash
   npm run build
   ```

## Critério de Aceite:
Todos os 4 passos devem retornar código 0 (sucesso absoluto).
