# 🛡️ Relatório Completo de Contexto: Crônicas de Sangue e Gelo (v2.1)

> **Projeto:** Crônicas de Sangue e Gelo — RPG Narrativo Determinístico de Westeros  
> **Repositório GitHub:** [`Heuller/gelo-e-fogo-rpg`](https://github.com/Heuller/gelo-e-fogo-rpg) (Privado)  
> **Diretório Local:** `C:\Projetos\gelo-e-fogo-rpg\`  
> **Data de Auditoria:** 19 de Outubro de 2026  
> **Status Geral do Projeto:** 🟢 **Operacional, 100% Testado (63/63 testes aprovados) e Build de Produção Validado com Sucesso**

---

## 1. 📖 Visão Geral do Projeto

O **Crônicas de Sangue e Gelo** é um RPG textual narrativo grimdark jogável no navegador, ambientado no universo literário de *As Crônicas de Gelo e Fogo* e *Fogo & Sangue*, de **George R. R. Martin**.

O jogo funde três grandes pilares de design:
1. **Padrão de Reatividade de *Baldur's Gate 3*:** 
   - 3 a 4 escolhas por cena orientadas pelas 4 abordagens clássicas (Força, Lábia, Sombra, Saber);
   - Sistema de Aprovação de Companheiros (-100 a +100, variando de *Hostil* a *Devotado*) com notificações em tela (`[Visenya Targaryen aprova (+15)]`);
   - Mecânica de Pontos de Inspiração para rerrolagem de dados;
   - Acampamento e Conselho Noturno em checkpoints estratégicos recuperando Sangue e Compostura;
   - Parágrafos condicionais no estilo `[Eco das Suas Escolhas]` que reagem dinamicamente a decisões pregressas.
2. **Psicologia Narrativa de *Disco Elysium*:**
   - O protagonista dialoga constantemente com 6 Atributos-Vozes internas (*O Marechal*, *O Guerreiro*, *A Aranha*, *O Cortesão*, *O Meistre*, *O Corvo*), que opinam, debatem entre si e oferecem palpites contextuais em cada cena.
3. **Fidelidade Canônica Estrita ("Fonte por Fato"):**
   - Baseado na tradução oficial consagrada de **Jorge Candeias (LeYa)**;
   - Todos os dados históricos e verbetes possuem indicação precisa de livro e capítulo de origem. É proibida a invenção de fatos desconexos do cânone.

---

## 2. 🏗️ Arquitetura e Stack Tecnológica

O projeto foi construído sobre uma base moderna, rápida e orientada a tipagem estrita com total separação entre lógica determinística de regras e camada de inteligência artificial.

### Principais Componentes Técnicos:
* **Framework:** Next.js 15.1.7 (App Router, React 19, TypeScript estrito, Tailwind CSS).
* **Motor Determinístico:** Totalmente em TypeScript puro com validação Zod 3.24. A física e matemática do jogo (rolagem 2d6, limiares de dificuldade DC 8/10/12/14, barras vitais, aprovação e transições) **nunca dependem da IA para calcular resultados**.
* **Proteção Server-Only:** O diretório de dados `src/server/data/` usa `import 'server-only'` para garantir que o cânone e os grafos de spoiler nunca vazem no pacote público do navegador.
* **Camada de IA Resiliente:** `src/server/ai/geminiMaster.ts` conecta com o Gemini (`@google/genai`) com timeout de 6 segundos e fallback automático para regras locais caso a API demore ou a chave não esteja configurada. O jogo opera perfeitamente 100% offline se necessário.
* **Persistência de Progresso:** `src/server/engine/saveManager.ts` gerencia até 3 slots de gravação por usuário por jornada no Supabase com Row Level Security (RLS), aliado a cache em memória e `localStorage`.
* **Design de Áudio Sintético:** `src/lib/audio/audioManager.ts` dispensa arquivos de MP3 externos pesados; sintetiza lareira medieval, rajadas de vento, rolagens de dados e tinir de espadas usando a Web Audio API nativa.

---

## 3. ⚔️ As 3 Grandes Jornadas Implementadas

O jogo conta com as **3 principais eras de Westeros** totalmente roteirizadas, interconectadas e auditadas:

| Jornada | Período Histórico | Protagonistas | Dragões / Montarias | Companheiros BG3 | Volume Narrativo |
| :--- | :---: | :--- | :--- | :--- | :---: |
| **Jornada 1: A Conquista de Aegon** | 2 a.C. a 13 d.C. | Aegon I Targaryen | Balerion, Vhagar, Meraxes | Visenya, Rhaenys, Orys Baratheon, Daemon Velaryon | 4 Atos, 74 Cenas, 217 Escolhas, 6 Finais |
| **Jornada 2: A Dança dos Dragões** | 129 a 131 d.C. | Rhaenyra & Daemon Targaryen | Caraxes, Syrax, Vhagar | Príncipe Daemon, Corlys Velaryon, Rhaenys Targaryen, Mysaria | 4 Atos, 66 Cenas, 178 Escolhas, 6 Finais |
| **Jornada 3: A Guerra dos Cinco Reis** | 298 a 300 d.C. | Eddard Stark & Robb Stark | Vento Cinzento (Lobo Gigante) | Lady Catelyn, Grande-Jon Umber, Sor Brynden Peixe-Negro, Jon Snow | 4 Atos, 54 Cenas, 154 Escolhas, 6 Finais |

### Resumo Quantitativo do Conteúdo:
* **Total de Cenas Detalhadas:** 194 cenas
* **Total de Escolhas Mapeadas:** 549 ramificações (média de 2.8 opções por cena)
* **Desfechos Únicos:** 18 finais distintos com bloqueios e requisitos históricos (`requiredFlags`)
* **Glossário da Cidadela:** 226 verbetes integrados com hiperlinks vivos no texto da narrativa

---

## 4. ✅ O Que Já Foi Feito (Status Atual)

Abaixo estão os módulos concluídos e verificados no repositório:

### 1. Motor de Regras e Linter de Histórias (🟢 Concluído)
- Sistema 2d6 com cálculo de modificadores de atributo (1 a 5).
- 3 Barras vitais: Sangue (0-10), Compostura (0-10) e Honra (-10 a +10).
- Sistema de inspiração (0 a 4 pontos) permitindo rerrolar falhas críticas.
- Motor de aprovação de companheiros com 5 faixas de humor (Hostil, Frio, Neutro, Leal, Devotado).
- Validador estrutural de grafos `storyLinter.ts`, garantindo que não existam nós órfãos ou escolhas sem destino.

### 2. Infraestrutura de Roteiro e Cânone (🟢 Concluído)
- Todos os 12 arquivos de atos das 3 Jornadas compilados em `src/server/data/journeys/`.
- Bíblias de dados canônicos em JSON para cada era:
  - `biblia_j1_conquista.json`
  - `biblia_j2_danca.json`
  - `biblia_j3_tronos.json`
  - `glossario_cidadela.json` (226 verbetes catalogados)
- Compêndio de referência completo `cronicas_jornadas_e_plots.txt` (mais de 2.200 linhas de documentação).

### 3. Interface do Usuário e Experiência Grimdark (🟢 Concluído)
- **TopBar:** Seletor de jornadas, alternador Mestre IA / Cânone Estrito, botão de áudio sintetizado e indicador de save.
- **NarrativeScroll:** Exibição da prosa histórica com destaques automáticos para termos do glossário e caixa de ação livre.
- **InternalVoices:** Balões de debate psicológico das 6 vozes mentais.
- **DiceRoller2d6:** Bandeja de dados interativa com dados 2d6, limiares de DC, sucessos/falhas e botão de inspiração.
- **CharacterPanel:** Exibição completa de atributos, barras de vida/honra, lista de companheiros com suas porcentagens e status de aprovação.
- **WesterosMapSVG:** Mapa interativo em SVG dos Sete Reinos com iluminação regional tática baseada no local da cena.
- **MobileDrawerNav:** Suporte a dispositivos móveis com abas deslizantes.

### 4. Camada de Persistência e Segurança (🟢 Concluído)
- Roteiro SQL completo em `supabase_schema.sql` com RLS, índices e integridade referencial.
- Autenticação e rotas de API protegidas com verificação de proprietário em `requireOwner.ts`.

### 5. Testes Unitários e Build (🟢 100% Passando)
- **63 testes unitários** no Vitest passando sem falhas:
  - Testes do motor de RPG e rolagens 2d6
  - Testes dos sistemas de BG3 (inspiração, aprovação, deltas)
  - Validação estrutural de todos os grafos das Jornadas 1, 2 e 3
  - Testes do parser de lore e verbetes
  - Testes do gerenciador de saves e IA Gemini
- **Build de produção Next.js 15 (`npm run build`) validado com zero erros** em todas as rotas (`/`, `/jogar`, `/login`, `/painel`, `/api/game/turn`).

---

## 5. ⏳ O Que Ainda Falta Fazer (Próximos Passos)

Embora o jogo já esteja completamente jogável com todas as suas mecânicas centrais operando, existem oportunidades de expansão planejadas no projeto original:

### 1. Conversão em Lote do Restante do Corpus Literário
- **Situação Atual:** Foram convertidos no piloto 6 capítulos e os capítulos-chave com pontos de vista (POVs) dos livros da Jornada 3.
- **O que falta:** Os 10 EPUBs armazenados em `origem/` contêm cerca de **2,5 milhões de palavras**. Livros inteiros como *O Festim dos Corvos*, *A Dança dos Dragões* completa, *O Cavaleiro dos Sete Reinos* (Dunk & Egg) e o restante de *Fogo & Sangue* podem ter seus capítulos restantes convertidos em Markdown em `corpus_md/` utilizando os scripts de extração existentes.

### 2. Deploy em Produção (Vercel & Supabase Cloud)
- **Configuração do Banco no Supabase Cloud:**
  - O arquivo `supabase_schema.sql` precisa ser executado no SQL Editor do painel do Supabase online para instanciar as tabelas definitivas de `save_slots` e `turn_events`.
- **Hospedagem na Vercel:**
  - Vincular o repositório GitHub `Heuller/gelo-e-fogo-rpg` à Vercel.
  - Inserir as variáveis de ambiente de produção (`GEMINI_API_KEY`, `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, `ALLOWED_USER_EMAIL`).

### 3. Expansões Audiovisuais (Polimento Extra)
- **Ilustrações de Alta Resolução:**
  - Atualmente o jogo utiliza ilustrações vetoriais procedurais SVG em estilo xilogravura (`SceneIllustration.tsx`). É possível adicionar imagens conceituais personalizadas para cada uma das 194 cenas se desejado.
- **Trilha Sonora Orquestral Opcional:**
  - Complementar o sintetizador de áudio procedural com faixas instrumentais medievais em formato compactado.

### 4. Funcionalidades Futuras de Gameplay
- **Modo Crônica Exportável:**
  - Permitir ao jogador exportar o histórico de decisões e eventos de sua campanha como um pergaminho formatado em PDF ou Markdown ("O Livro da sua Dinastia").
- **Sub-sistema Tático de Guerra:**
  - Adicionar minijogos de cerco e batalhas táticas campais de grande porte (como a Batalha do Campo de Fogo ou a Batalha da Água Negra).

---

## 6. 🚀 Como Executar o Jogo Localmente

Para rodar e testar o projeto no computador local (`C:\Projetos\gelo-e-fogo-rpg`):

1. **Executar a suíte de testes:**
   ```bash
   npx vitest run
   ```
   *(Todos os 63 testes finalizam com 100% de sucesso).*

2. **Compilar a versão de produção:**
   ```bash
   npm run build
   ```

3. **Iniciar o servidor de desenvolvimento para jogar:**
   ```bash
   npm run dev
   ```
   Em seguida, abra o navegador em: [http://localhost:3000/jogar](http://localhost:3000/jogar).

---

## 7. 📌 Conclusão

O projeto **gelo-e-fogo-rpg** está em um estágio extremamente avançado de desenvolvimento técnico: possui arquitetura sólida, motor determinístico blindado contra falhas, as 3 eras históricas plenamente jogáveis com dezenas de ramificações, sistema de companheiros dinâmico e integração completa com IA e persistência. Ele está pronto para ser jogado localmente e preparado para publicação em produção.
