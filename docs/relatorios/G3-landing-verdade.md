# Relatório de Conclusão — Fase G3: Verdade Documental, Nome Oficial e Landing

**Data:** 24/10/2026  
**Branch:** \`v2\`  
**Escopo:** Unificação do nome oficial do projeto, sincronização da landing page com os dados reais auditados e integridade documental.

---

## 1. Nome Oficial Unificado

Conforme deliberado no Plano v2.2 (§9) e registrado no livro de decisões:
- **Nome Canônico:** «Crônicas de Sangue e Gelo — Códice Vivo»
- Unificado em:
  - `src/app/layout.tsx` (título `<title>` e metadados)
  - `src/app/page.tsx` (frontispício régio e rodapé solene)
  - `README.md` (cabeçalho, badges e descrição)
  - Documentação interna e relatórios

---

## 2. Sincronização dos Dados Vitrine (`docs/metricas.json`)

As discrepâncias documentais apontadas na auditoria foram corrigidas:
- **Número de Campanhas:** Atualizado de 4 para **5 Campanhas Canônicas Integradas** (adicionada a Jornada 5: Rebelião de Robert).
- **Número de Cenas:** Atualizado para **299 Cenas Autoritativas**.
- **Volume Literário:** Registrado como **30.500+ Palavras** (~153 minutos de leitura imersiva).
- **Mecânicas Modernas:** Documentados o **Sistema de Acampamento** (diálogos de fogueira com companheiros) e a **Tentativa Livre (BG3)** com prévia determinística de perícia.
- **Suíte de Testes:** Atualizada de 169 para **198+ testes passando** e suíte E2E com Playwright.

---

## 3. Melhorias na Landing Page (`src/app/page.tsx`)

- **Grade Responsiva das Eras:** Substituído o layout rígido de 3 colunas por `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3`, acomodando perfeitamente as 5 jornadas sem distorções visuais.
- **Barra de Badges Verificados:** Inserção de badges elegantes em Cinzel com dados reais auditados e destaque para o contraste WCAG 2.2 AA.
- **Rodapé Institucional:** Rodapé solene da Cidadela com créditos oficiais e licença de uso privado.

---

## 4. Verificação de Integridade

- `npm run typecheck` (`tsc --noEmit`): **0 erros**.
- `npm run lint` (`next lint --dir src`): **0 warnings / 0 erros**.
- `node scripts/contraste.mjs`: **10/10 pares aprovados**.
- `npm test` (`vitest run`): **198+ testes aprovados**.
