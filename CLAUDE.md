@AGENTS.md

# Regras desta reforma

1. **Uma fase/etapa por vez**: Execução incremental com checkpoints verificáveis e relatórios em `docs/relatorios/F{N}-{slug}.md`.
2. **Ler antes de editar**: Nunca reescrever arquivos às cegas. Preservar a integridade do código e documentação.
3. **Verificação obrigatória após cada etapa**:
   - `npm run typecheck` (`tsc --noEmit`)
   - `npm run lint` (`next lint`)
   - `npm test` (`vitest run`)
   - `npm run build` (`next build`)
4. **Commits pequenos e semânticos**: Mensagem em português, imperativo, sem misturar refatoração e funcionalidade.
5. **Zero `any` e zero `@ts-ignore` novo**: TypeScript estrito em todo o código.
6. **Segurança de segredos**: Proibido qualquer segredo ou credencial em variáveis `NEXT_PUBLIC_*` ou no código cliente/repositório.
7. **Banco de dados**: Migrações exclusivamente em `supabase/migrations/`, idempotentes (`IF NOT EXISTS`), com RLS habilitado e políticas restritivas.
8. **Integridade narrativa**: Conteúdo narrativo em `src/server/data/journeys` só pode ser alterado nas fases F2, F10 e durante a geração canônica da Jornada 4.
9. **Acessibilidade e Redução de Movimento**: Critérios de aceite inegociáveis (WCAG 2.2 AA e `prefers-reduced-motion`).
10. **Servidor autoritativo**: O motor determinístico no servidor é a única fonte de verdade.
