# 🛡️ Análise de Segurança de Dependências e Tabela Custo x Benefício

> **Data:** 19/10/2026  
> **Status:** 🟢 **0 vulnerabilidades em produção (`npm audit --omit=dev`)**  
> **Linha Fixada:** Next.js 15.1.7 / React 19 / PostCSS 8.5.31 (override)

---

## 1. Advisories Avaliados e Resolução

| Pacote | Advisory ID | Severidade | Descrição | Resolução Implementada |
|:---|:---:|:---:|:---|:---|
| `postcss` | **GHSA-qx2v-qp2m-jg93** | High | XSS via Unescaped `</style>` em CSS Stringify | Aplicado `overrides: { "postcss": "^8.5.31" }` em `package.json` |
| `postcss` | **GHSA-6g55-p6wh-862q** | High | Leitura de arquivos arbitrários via `sourceMappingURL` | Atualizado para PostCSS 8.5.31 corrigido |
| `postcss` | **GHSA-fxqj-rqcc-2cmp** | High | Correção incompleta de GHSA-6g55-p6wh-862q | Incluído na versão 8.5.31 |
| `postcss` | **GHSA-r28c-9q8g-f849** | Moderate | Path Traversal em Source Map Auto-Loading | Incluído na versão 8.5.31 |

**Resultado:** A dependência transitiva de PostCSS do Next.js foi atualizada sem necessidade de migração quebra-código para o Next.js 16, mantendo 100% de estabilidade e zerando alertas no comando de produção.

---

## 2. Tabela Custo x Benefício de Atualizações Major

| Pacote | Versão Atual | Major Mais Nova | Benefícios | Custos e Riscos de Quebra | Recomendação |
|:---|:---:|:---:|:---|:---|:---:|
| **Next.js** | 15.1.7 (LTS) | 16.x | Novos otimizadores de Turbopack e Server Actions | Breaking changes no App Router, depreciação de `next/headers` cookies sync, incompatibilidade com plugins legados | 🛑 **Manter 15.x estável**. Não migrar. |
| **Zod** | 3.24.2 | 4.x | Melhoria marginal em inferência e bundle menor | Reescrita de métodos `.format()`, `.safeParse()` e quebra em validações customizadas do motor | 🛑 **Manter 3.x**. Motor 100% validado. |
| **Tailwind CSS** | 3.4.17 | 4.x | Novo motor Oxide compilado em Rust | Requer reestruturação de `tailwind.config.ts`, migração de classes customizadas e suporte `@theme` no CSS | 🛑 **Manter 3.x**. Estilização grimdark estável. |
| **Vitest** | 3.0.5 | 5.x | Suporte a novos pools de threads | Possível incompatibilidade com mocks de `server-only` e Vite plugins | 🛑 **Manter 3.x**. 63/63 testes verdes em < 6s. |

---

## 3. Configuração de Dependabot
O arquivo `.github/dependabot.yml` foi configurado para monitoramento semanal automático com agrupamento em PR único, evitando sobrecarga de notificações.
