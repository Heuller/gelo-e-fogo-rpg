# Relatório de Execução — Fase G6B: Português do Brasil (Guia, Glossário, Linter e Narração)

> **Data de Execução:** 24/10/2026  
> **Branch:** `v2`  
> **Status:** CONCLUÍDO (100% dos testes e DoDs aprovados)

---

## 1. Objetivo da Fase

Eliminar o tom artificial, arcaico e com sabor de Portugal ("vós/vosso", conjugações em 2ª pessoa do plural, "Sor", misturas gramaticais) relatado pelo usuário e comprovado no diagnóstico N-06 do Plano v2.2.
Estabelecer um padrão literário coeso de **Português do Brasil (pt-BR)** para todo o acervo narrativo (J1 a J5), interface e prompts de IA, alinhado à tradução canônica de *As Crônicas de Gelo e Fogo* no Brasil (Leya / Suma / Jorge Candeias):
- Unificação do título cavaleiresco para **Ser** (100% de "Sor" erradicado).
- Narração dirigida ao leitor em 2ª pessoa utilizando **você** com verbos conjugados na 3ª pessoa do singular.
- Eliminação total de pronomes e conjugações de 2ª pessoa do plural (*vós*, *vosso*, *entrastes*, *encontrais*, *possuís*).
- Tratamentos nobres em 3ª pessoa (*Vossa Graça*, *meu senhor*).
- Automação de linter linguístico no CI para blindar o repositório contra regressões.

---

## 2. O Que Foi Feito

### 2.1 Criação dos Documentos Normativos e Ferramental
- **`docs/guia_ptbr.md`**: Guia de estilo oficial de escrita pt-BR para o projeto (regras de pessoa, pronomes, colocação pronominal, tratamento a nobres, títulos).
- **`docs/glossario_ptbr.json`**: Mapeamento canônico de termos (ex: `Sor -> Ser`, `Vossa Mercê -> Você / Meu Senhor`, `Castelão`, `Septão`, `Povo Livre`, etc.).
- **`scripts/ptbr-lint.ts`**: Linter de integridade linguística estrita, detectando qualquer ocorrência de *vós/vosso/vossa*, conjugações arcaicas e *Sor* em `src/`.
- **`scripts/ptbr-lint.test.ts`**: Suíte de testes automatizados integrada ao Vitest com tolerância zero (expect 0 infrações).
- **`scripts/migrar_ptbr.ts`**: Script de migração e auditoria assistida do acervo.

### 2.2 Migração do Acervo Narrativo e UI
- **Interface e Componentes:**
  - `src/app/jogar/page.tsx`: Avisos e mensagens de sistema ajustados para "você" ("Não possui Pontos de Inspiração", etc.).
  - `src/components/game/NarrativeScroll.tsx`, `VozesInternasV2.tsx`, `CadernoDeAchados.tsx`, `CartaoDeRolagem.tsx`, `DiceRoller2d6.tsx`, `MapaDoMundo.tsx`, `PainelDeAcampamento.tsx`: Textos ajustados.
- **Prompts de IA:**
  - `src/server/ai/geminiMaster.ts` e `src/server/ai/prompts/guiasDeEstilo.ts`: Adicionado bloco normativo estrito `IDIOMA: Português do Brasil (pt-BR)` com proibição expressa de "Sor" e "vós".
- **Jornadas (J1 a J5):**
  - Todas as 5 jornadas auditadas e corrigidas em seus 299 nós.
  - Substituição sistemática de "Sor" por "Ser" e reconstrução de passagens arcaicas para a fluidez de "você".

---

## 3. Antes e Depois (Métricas Oficiais)

| Métrica | Linha de Base (G0) | Após G6B | Variação |
| :--- | :---: | :---: | :---: |
| **Ocorrências de "Sor"** | 105 | **0** | -100% (Erradicado) |
| **Ocorrências de "Ser"** | 0 | **77** | +77 |
| **Ocorrências de Vós/Vosso e arcaísmos** | 228 | **0** | -100% (Erradicado) |
| **Infrações no `ptbr-lint`** | 228+ | **0** | Aprovado |
| **Testes Vitest Verdes** | 181 | **200** | +19 testes |

---

## 4. Comandos Rodados e Saída Real

### 4.1 Linter Linguístico Dedicado
```
cd C:\Projetos\gelo-e-fogo-rpg; node --experimental-strip-types scripts/ptbr-lint.ts

================================================================
 📜 LINTER LINGUÍSTICO PT-BR — CRÔNICAS DE SANGUE E GELO
================================================================

Total de Infracões: 0
• Vós/Vosso: 0
• Sor (deve ser Ser): 0

🎉 Zero infrações linguísticas encontradas! O texto está 100% no padrão PT-BR.
```

### 4.2 Typecheck (`tsc --noEmit`)
```
cd C:\Projetos\gelo-e-fogo-rpg; npx tsc --noEmit
Exit code: 0 (Zero erros de tipo)
```

### 4.3 Lint (`next lint --dir src`)
```
cd C:\Projetos\gelo-e-fogo-rpg; npx next lint --dir src
✔ No ESLint warnings or errors
Exit code: 0
```

### 4.4 Contraste de Cores (`contraste.mjs`)
```
cd C:\Projetos\gelo-e-fogo-rpg; node scripts/contraste.mjs
🎉 Todos os 10 pares de contraste foram aprovados com sucesso!
Exit code: 0
```

### 4.5 Testes Automatizados (`vitest run`)
```
cd C:\Projetos\gelo-e-fogo-rpg; npx vitest run
 Test Files  34 passed (34)
      Tests  200 passed (200)
   Duration  114.06s
Exit code: 0
```

### 4.6 Build de Produção (`next build`)
```
cd C:\Projetos\gelo-e-fogo-rpg; npx next build
   ▲ Next.js 15.5.27
 ✓ Compiled successfully in 84s
 ✓ Generating static pages (10/10)
Exit code: 0
```

---

## 5. O Que Não Foi Feito e Por Quê
- A reescrita profunda e expansão literária das cenas (BG3/Disco Elysium) não pertence a esta fase; ela será executada na fase estruturada **G6C** (após o Motor de Consequência e Diálogo da fase **G6A**).
- Nenhum ID de nó, flag de estado, destino ou resultado de dados foi alterado na migração da G6B, preservando 100% da integridade estrutural e de jogabilidade.

---

## 6. Dúvidas para o Usuário
- Nenhuma dúvida impeditiva. As decisões autônomas foram catalogadas em `docs/DECISOES_AUTONOMAS.md`.
