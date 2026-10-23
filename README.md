# Crônicas de Sangue e Gelo — RPG Textual de Westeros

[![Release v2.0.0](https://img.shields.io/badge/Release-v2.0.0-c5a059.svg)](https://github.com/Heuller/gelo-e-fogo-rpg/releases/tag/v2.0.0)
[![Deploy on Vercel](https://img.shields.io/badge/Vercel-Produção%20Online-000000.svg?logo=vercel)](https://gelo-e-fogo-rpg.vercel.app)
[![Portal GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-Portal%20Códice%20Vivo-181717.svg?logo=github)](https://heuller.github.io/gelo-e-fogo-rpg/)
[![Tests Passing](https://img.shields.io/badge/Vitest-169%20Passing-22c55e.svg)](https://github.com/Heuller/gelo-e-fogo-rpg/actions)
[![Acessibilidade WCAG 2.2 AA](https://img.shields.io/badge/Acessibilidade-WCAG%202.2%20AA-3b82f6.svg)](#)

> *«Ninguém conta o nome de um corvo qualquer — até a noite em que a contagem dos mortos precisa de alguém que o saiba.»*

Um RPG textual grimdark de alta fidelidade literária ambientado no universo de *As Crônicas de Gelo e Fogo* de George R. R. Martin. Desenvolvido com **Next.js 15 (App Router)**, **React 19**, **TypeScript estrito**, **Tailwind CSS**, **Supabase (RLS)** e **Google Gemini** como Mestre de Jogo literário.

---

## 🚀 Publicação & Acesso Online

- **Jogo em Produção (Vercel):** [https://gelo-e-fogo-rpg.vercel.app](https://gelo-e-fogo-rpg.vercel.app)
- **Portal & Códice Interativo (GitHub Pages):** [https://heuller.github.io/gelo-e-fogo-rpg/](https://heuller.github.io/gelo-e-fogo-rpg/)
- **Repositório Oficial (GitHub):** [https://github.com/Heuller/gelo-e-fogo-rpg](https://github.com/Heuller/gelo-e-fogo-rpg)
- **Release Canônica:** [v2.0.0 — Códice Vivo e Jornada 4](https://github.com/Heuller/gelo-e-fogo-rpg/releases/tag/v2.0.0)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FHeuller%2Fgelo-e-fogo-rpg&project-name=gelo-e-fogo-rpg&repository-name=gelo-e-fogo-rpg&env=NEXT_PUBLIC_SUPABASE_URL,NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,SUPABASE_SECRET_KEY,ALLOWED_USER_EMAIL,GEMINI_API_KEY)

---

## 🗡️ Características Principais

- **Motor 2d6 Determinístico Puro:** Regras clássicas de RPG com rolagem de dados virtuais 2d6, limiares de dificuldade (DC 8, 10, 12, 14), barras vitais (*Sangue*, *Compostura*, *Honra/Voto*), Pontos de Inspiração e status de aprovação de companheiros (estilo Baldur's Gate 3).
- **Servidor 100% Autoritativo:** O cliente jamais calcula regras ou envia estados alterados. A UI apenas despacha intenções atômicas `(slotId, escolhaId, versaoEsperada)`. O servidor valida a posse do save, calcula rolagens e transições e persiste eventos imutáveis na tabela `turn_events`.
- **Design System «Códice Vivo»:** Tipografia inspirada em manuscritos medievais (Cinzel para títulos régios, EB Garamond para prosa de alta imersão, Inter para dados técnicos de UI). Paleta sóbria de pergaminho escuro, ouro envelhecido e carmim estelar com **100% de conformidade WCAG 2.2 AA**.
- **Quatro Campanhas Épicas Integradas:**
  1. **Jornada 1 — A Conquista de Aegon (2 a.C. a 1 d.C.):** A forja do Trono de Ferro com fogo e sangue ao lado de Visenya, Rhaenys e Orys Baratheon.
  2. **Jornada 2 — A Dança dos Dragões (129 a 131 d.C.):** A guerra civil dinástica entre Verdes e Negros pelo legado de Viserys I.
  3. **Jornada 3 — A Guerra dos Cinco Reis (298 a 300 d.C.):** A conspiração de Porto Real, o Torneio da Mão e a tragédia do Casamento Vermelho.
  4. **Jornada 4 — Irmão Sem Nome (299 a 300 d.C.):** A Batalha de Castelo Negro vista do chão da Patrulha da Noite, do motim de Craster ao cerco titânico de Mance Rayder e a eleição do 998º Senhor Comandante.
- **Mestre IA com Guardrails Temporais:** Integração com Gemini 2.5 via `@google/genai` com isolamento de contexto, circuit breaker de 6 segundos, verificação de anacronismos e modo «Crônica Pura» offline.
- **Áudio Sintético Procedural:** Paisagens sonoras sintetizadas em tempo real via Web Audio API (vento do norte, lareira crepitante, mar salgado, cripta ecoante), sem arquivos de áudio pesados.
- **Mecânicas de Narrativa Avançada:**
  - **Caderno de Achados:** Marginálias da Cidadela colecionáveis (22 ovos de Páscoa com citações canônicas).
  - **O Livro dos Nomes:** Memorial da Patrulha da Noite que registra irmãos e selvagens caídos.
  - **Relógios de Consequência:** Mostradores circulares em SVG que visualizam a pressão de facções e cercos.

---

## 🛠️ Tecnologias Utilizadas

- **Framework:** Next.js 15.1.7 (App Router & Server Actions)
- **UI:** React 19, Tailwind CSS 3.4, Lucide React
- **Linguagem:** TypeScript 5.7 (Modo Estrito)
- **Persistência:** Supabase PostgreSQL com Row Level Security (RLS) e fallback local
- **IA:** Google Gen AI SDK (`@google/genai`)
- **Qualidade & Testes:** Vitest 3.0 (29 suítes, 169 testes), ESLint, Scripts de Acessibilidade

---

## 🚀 Como Executar Localmente

### 1. Clonar e Instalar Dependências
```bash
git clone https://github.com/Heuller/gelo-e-fogo-rpg.git
cd gelo-e-fogo-rpg
npm install
```

### 2. Configurar Variáveis de Ambiente
Copie o arquivo de exemplo e preencha suas chaves:
```bash
cp .env.example .env.local
```
Variáveis principais:
```env
NEXT_PUBLIC_SUPABASE_URL=https://seu-projeto.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sua-chave-publica
SUPABASE_SECRET_KEY=sua-service-role-key-somente-servidor
ALLOWED_USER_EMAIL=seu-email@dominio.com
GEMINI_API_KEY=sua-chave-gemini-opcional
```

### 3. Rodar em Modo de Desenvolvimento
```bash
npm run dev
```
Abra [http://localhost:3000](http://localhost:3000) no seu navegador.

---

## 🧪 Comandos de Qualidade (DoD)

Para garantir que o projeto permaneça íntegro, todos os comandos abaixo devem passar com zero erros:

```bash
# 1. Checagem estrita de tipos TypeScript
npm run typecheck

# 2. Análise estática de código
npm run lint

# 3. Execução da suíte completa de testes (169 testes)
npm test

# 4. Auditoria de contraste WCAG 2.2 AA (10/10 pares aprovados)
node scripts/contraste.mjs

# 5. Build de produção
npm run build
```

---

## 📜 Licença e Direitos

Projeto pessoal desenvolvido para fins de estudo e entretenimento interativo. Todos os nomes, conceitos, personagens e cenários pertencem a George R. R. Martin e às editoras detentoras dos direitos de *As Crônicas de Gelo e Fogo*.
