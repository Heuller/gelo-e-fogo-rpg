# Relatório F2 — Registro Central de Jornadas e Temas
- Data: 2026-10-23
- Branch: `master`
- Commits: F2

## Feito (tarefa → arquivos alterados)
1. **Registro Central de Jornadas**:
   - `src/server/journeys/registry.ts`: interfaces `DefinicaoJornada`, `FichaPronta`, `CatalogoJornadaPublico`, mapa `REGISTRO_JORNADAS`, métodos `obterJornada`, `obterGrafoPorJornada`, `getCatalogoPublico`, `registrarJornada` e `removerJornada`.
2. **Pacote Central de Temas**:
   - `src/lib/temas.ts`: catálogo de temas para J1 (`conquista_aegon`), J2 (`danca_dragoes`), J3 (`guerra_tronos`) e stub de J4 (`patrulha_muralha`), com acentos de cores, vozes personalizadas, casas e mapeamento de regiões.
3. **Unificação da Ficha de Eddard Stark**:
   - `src/server/data/journeys/index.ts`: unificado para 22 pontos (`comando: 5, furia: 4, astucia: 3, cortesia: 3, erudicao: 3, pressagio: 4`) e origem canônica `honra_do_norte`.
   - `src/app/painel/page.tsx`: protagonista atualizado para coincidir exatamente com a fonte única do servidor.
4. **Linter Avançado de Grafos e Avisos de Reatividade**:
   - `src/server/engine/storyLinterPlus.ts`: implementada a função `analisarGrafoAvancado` mapeando nós sem região, regiões fora do tema, flags lidas sem escrita, flags escritas sem leitura, riscos mortais com DC baixa e testes sem consequência própria.
   - `docs/relatorios/F2-avisos-linter.md`: gerado com a tabela detalhada de todas as jornadas (insumo da F10).
5. **Eliminação de IDs Hardcoded no Painel**:
   - Removidos nós fixos (`j1_a1_mesa_pintada` e variantes) de `handleConfirmarCriacao` em `src/app/painel/page.tsx`, derivando `startNodeId` diretamente da definição da jornada.
   - Criada action `getCatalogoJornadasAction` em `src/app/actions/slotActions.ts`.
6. **Suíte de Testes Automatizada**:
   - `src/server/journeys/__tests__/registry.test.ts`: 4 testes cobrindo integridade dos grafos do registro, análise do linter avançado, catálogo público leve e injeção/remoção dinâmica de jornadas.

## Critérios de aceite (✔/✘ + evidência)
- [x] Adição de jornada sem mexer em 5 arquivos: demonstrado via teste unitário de registro dinâmico.
- [x] Todos os grafos do registro passam em `validarGrafoJornada` com `erros: []`.
- [x] Ficha do Eddard unificada e calibrada em 22 pontos.
- [x] `getCatalogoPublico()` serializado não vaza `fallbackText` nem `internalVoices`.
- [x] Tabela de avisos gerada em `docs/relatorios/F2-avisos-linter.md`.

## Verificações (typecheck / lint / test / build)
- **Typecheck**: `npm run typecheck` → ✅ Exit 0 (0 erros).
- **Testes**: `npm test` → ✅ Exit 0 (19 suítes, 103 testes passando).

## Decisões tomadas
- **Ficha do Eddard**: Fixada em 22 pontos (`5, 4, 3, 3, 3, 4`) e origem `honra_do_norte`, alinhando a mecânica com os requisitos de `[HONRA DO NORTE]` das cenas de Porto Real.
- **StoryLinterPlus**: Criado em módulo separado preservando a estabilidade do `storyLinter.ts` original.

## Notas para a próxima fase (F3)
- Iniciar a **Fase 3 (Estado do cliente, turno, desfazer/rerrolar e telas de final)**:
  - Criar a store Zustand unificada `src/lib/store/jogoStore.ts`.
  - Criar tela de final `TelaDeFinal.tsx` com `isEnding: true`.
  - Hooks `useTurno`, `useTextoMestre`, `useAtalhos`, `useScrollNaCena`.
  - Validar e refatorar `jogar/page.tsx` para orquestrador limpo (meta ≲ 150 linhas).
