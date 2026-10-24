# Relatório de Execução — Fase G5: Auditoria de Fidelidade ao Cânone e Metadados de Origem

> **Data de Execução:** 24/10/2026  
> **Branch:** `v2`  
> **Status:** CONCLUÍDO (100% das 299 cenas auditadas, tipadas e aprovadas no DoD)

---

## 1. Objetivo da Fase

Resolver os achados de verificação histórica e integridade documental (**C-02 a C-06**):
- **C-02 (Fontes sobre resumos):** Auditar e distinguir com total transparência quais cenas são ancoradas em capítulos integrais dos livros de George R. R. Martin e quais se baseiam em arquivos de resumo (`*_resumo-completo.md`).
- **C-03 (Ausência de marcação de origem original):** Implementar e aplicar a regra de `origem: 'canonica' | 'original'` para 100% das cenas, acabando com a taxa de 0 marcas autorais identificada na auditoria inicial.
- **C-04 e C-06 (Portão P0 e amostragem humana):** Atualizar a planilha de auditoria cobrindo **100% da Jornada 4** (75 cenas), **100% da Jornada 5** (30 cenas) e **20% amostral** de J1, J2 e J3.
- **C-05 (Auditoria da J5):** Mapear detalhadamente a Rebelião de Robert, identificando dramatizações com licença poética autoral.

---

## 2. O Que Foi Feito

### 2.1 Ferramentas de Auditoria e Matriz de Fontes
- **Script Oficial de Auditoria (`scripts/auditoria-fontes.ts` + `scripts/auditoria-fontes.test.ts`):**  
  Analisa os grafos das 5 jornadas e gera `docs/auditoria-canone/matriz_fontes.csv` mapeando:
  `{ jornada, nodeId, titulo, livro, capitulo, arquivo_md, tipoDeFonte, origem, notaHistorica, nivelVerificacao }`.
- **Classificação Transparente do Acervo (299 Cenas):**
  - **J1 («A Conquista de Aegon» — 74 cenas):** 74 fontes de livro (*Fogo & Sangue*). 65 canônicas, 9 originais (divergências/what-if e mortes prematuras no RPG). Nível: *Verificado contra livro*.
  - **J2 («A Dança dos Dragões» — 66 cenas):** 66 fontes de livro (*Fogo & Sangue*). 57 canônicas, 9 originais (resgates alternativos e desfechos autorais). Nível: *Verificado contra livro*.
  - **J3 («A Guerra dos Tronos» — 54 cenas):** 54 fontes de resumo (`livro_1..3_*_resumo-completo.md`). 50 canônicas, 4 originais. Nível: *Verificado contra resumo*.
  - **J4 («Irmão Sem Nome» — 75 cenas):** 75 fontes de resumo (`livro_3_a-tormenta-de-espadas_resumo-completo.md`). 68 canônicas, 7 originais (Ramal do Oeste da Ponte das Caveiras e personagens autorais). Nível: *Verificado contra resumo*.
  - **J5 («A Rebelião de Robert» — 30 cenas):** 30 fontes de resumo. 29 canônicas, 1 original (dramatização da reação de Jon Arryn no Ninho da Águia). Nível: *Verificado contra resumo*.

### 2.2 Regras Estritas no Linter (`storyLinter.ts` e `storyLinterPlus.ts`)
- `OrigemCenaEnum = z.enum(['canonica', 'original'])` integrado a `LoreContextSchema` e `NodeJornadaSchema`.
- **Invariante de Origem:** Todo nó é obrigado a declarar `origem: 'canonica' | 'original'`.
- **Invariante de Justificativa Autoral:** Todo nó com `origem: 'original'` é estritamente obrigado a conter uma `notaHistorica` detalhando o que foi inventado (pontos de divergência "E se...", mortes alternativas do RPG ou subtramas originais). Nós sem nota reprovam os testes de integridade.

### 2.3 Proposta de Classificação e Planilha Humana
- Registrada a trilha completa de decisões de origem em `docs/propostas/marcacao_origem.csv`.
- Gerada a planilha de verificação humana `docs/auditoria-canone/planilha_auditoria_amostragem.csv` com **145 entradas**:
  - J4: 75 linhas (100% do acervo da Muralha)
  - J5: 30 linhas (100% da Rebelião de Robert)
  - J1: 15 linhas (20% amostral)
  - J2: 14 linhas (20% amostral)
  - J3: 11 linhas (20% amostral)

### 2.4 Declaração de Honestidade sobre o Corpus Local (`corpus_md/`)
Conforme a garantia de honestidade do §1.3 e §4 (G5):
- O diretório local `corpus_md/` possui capítulos completos apenas para as jornadas históricas adaptadas de *Fogo & Sangue* (J1 e J2).
- Para J3, J4 e J5, o diretório local dispõe unicamente de resumos completos de enredo (`livro_1_..._resumo-completo.md`, etc.).
- **Nenhuma cena de J3, J4 e J5 foi rotulada como "verificada contra livro".** Todas foram formalmente classificadas com nível `resumo`. Para a verificação integral futura P0 contra o texto canônico de Martin, faltam os capítulos integrais no corpus dos seguintes volumes:
  - *A Guerra dos Tronos* (capítulos não cobertos pelos arquivos parciais de POV)
  - *A Fúria dos Reis*
  - *A Tormenta de Espadas*
  - *O Mundo de Gelo e Fogo* (fonte de referência para a Rebelião de Robert)

---

## 3. Resumo Quantitativo (docs/metricas.json)

| Métrica | Antes (G4) | Depois (G5) | Variação |
| :--- | :---: | :---: | :--- |
| **Total de Cenas** | 299 | 299 | Estável |
| **Cenas com Origem Ausente** | **299 (100%)** | **0 (0%)** | −299 (Resolvido) |
| **Cenas Canônicas** | 0 | **269 (90.0%)** | +269 |
| **Cenas Originais Demarcadas** | 0 | **30 (10.0%)** | +30 |
| **Cenas Originais sem Nota** | 0 | **0 (100% documentadas)** | Conforme regra |
| **Verificadas contra Livro** | 0 | **140 (J1 + J2)** | Auditado |
| **Verificadas contra Resumo** | 0 | **159 (J3 + J4 + J5)** | Auditado e transparente |

---

## 4. Verificação de Engenharia e Definição de Pronto (DoD)

1. **Auditoria de Contraste W3C WCAG 2.2 AA:**
   - Comando: `node scripts/contraste.mjs`
   - Resultado: **10/10 pares aprovados**.
2. **Checagem de Tipos Estrita:**
   - Comando: `npm run typecheck` (`tsc --noEmit`)
   - Resultado: **0 erros**. Todos os 21 arquivos das jornadas respeitam o schema estrito de `FonteLore` e `LoreContext`.
3. **Linter Oficial:**
   - Comando: `npm run lint` (`next lint --dir src`)
   - Resultado: **✔ No ESLint warnings or errors**.
4. **Testes Automatizados (Vitest):**
   - Comando: `npx vitest run`
   - Resultado: **100% de aprovação (211+ testes em 26 suítes)**, incluindo:
     - `scripts/g5-fidelidade.test.ts` (4 testes de integridade de cânone)
     - `src/server/journeys/__tests__/registry.test.ts` (validação de grafos e linter avançado)
     - `scripts/ptbr-lint.test.ts` (linter linguístico pt-BR)
     - `scripts/auditoria-fontes.test.ts` (matriz de fontes)
     - `scripts/metricas.test.ts` (sincronização do metricas.json)
5. **Build de Produção:**
   - Comando: `npm run build` (`next build`)
   - Resultado: **Sucesso (Exit code 0)** — todas as 10 rotas estáticas e dinâmicas geradas com sucesso.

---

## 5. Dúvidas e Decisões para Revisão Final do Dono (Richard)

1. **Classificação do Ramal do Oeste (J4):** As 7 cenas do Ato III-B (`j4_act3b_oeste.ts`) foram marcadas como `origem: 'original'` com notas explicando que o confronto de Bowen Marsh na Ponte das Caveiras é uma expansão dramatizada para o RPG baseada em relatos retrospectivos de Jon Snow. Se preferir classificá-las como canônicas (já que o evento em si ocorreu nos livros, embora fora de cena), o ajuste pode ser feito no merge final.
2. **Rebelião de Robert (J5):** A cena `j5_a1_o_chamado_do_ninho` foi demarcada como `original` devido à dramatização poética de Jon Arryn rasgando o pergaminho real nos precipícios do Ninho da Águia.
