# Relatório da Fase 12: Mecânicas Opcionais (Caderno de Achados, Livro dos Nomes e Relógios)

**Fase:** F12 — Mecânicas Opcionais Inspiradas em RPGs de Narrativa  
**Data:** 23/10/2026  
**Status de Execução:** Concluído com Sucesso

---

## 1. O que foi Implementado

1. **Feature Flags (`src/lib/flags.ts`):**
   - Configuração desacoplada com tolerância a ambientes e controle por variáveis de ambiente (`FEATURE_CADERNO_ACHADOS`, `FEATURE_LIVRO_NOMES`, `FEATURE_RELOGIOS`, `FEATURE_PERCEPCAO_PASSIVA`).
2. **Caderno de Achados (`src/components/game/CadernoDeAchados.tsx`):**
   - Mapeamento das marginálias colecionáveis da Cidadela (`ea_*`) com âncoras canônicas (C1..C33), citações de livro e capítulo LeYa.
   - Interface com busca em tempo real, barra de progresso e revelação de segredos.
   - Contador integrado na `TelaDeFinal.tsx` («X/22 Descobertos»).
3. **O Livro dos Nomes (`src/components/game/LivroDosNomes.tsx`):**
   - Memorial encadernado para a Patrulha da Noite registrando aliados caídos e sobreviventes com selos de condição («Caído no Cumprimento do Dever», «Povo Livre», «Vivo & Juramentado»).
4. **Relógios de Consequência (`src/components/game/RelogioSegmentos.tsx`):**
   - Mostrador circular SVG em fatias com feedback visual e numérico para «O Cerco» (6 fatias) e «A Fissura» (4 fatias).
5. **Integração na Coluna Lateral (`src/components/game/shell/ColunaMundo.tsx`):**
   - Expansão do seletor para 5 abas (`mapa`, `casas`, `diario`, `achados`, `nomes`) com relógio de cerco ativo no topo.

---

## 2. Verificação DoD

- `npm run typecheck` — 0 erros.
- `npm run lint` — 0 erros / 0 avisos.
- `npx vitest run` — 29/29 arquivos de teste passando, 169/169 testes verdes.
- `npm run build` — Compilação Next.js 15.5 gerada com sucesso.
- `node scripts/contraste.mjs` — 10/10 pares WCAG 2.2 AA aprovados.
