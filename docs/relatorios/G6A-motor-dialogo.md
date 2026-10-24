# Relatório de Conclusão — Fase G6A: Motor de Consequência e Diálogo (Esquema v2)
**Data de Execução:** 24 de outubro de 2026  
**Branch:** `v2`  
**Escopo:** Implementação do Esquema v2 do Grafo, Motor de Composição Autoritativa de Cenas no Servidor, Consequências de Longo Alcance (`marcas`), Hubs de Conversa e Interface Literária de Diálogo e Pontes Narrativas.

---

## 1. Resumo Executivo

A fase **G6A** dota o projeto «Crônicas de Sangue e Gelo — Códice Vivo» dos alicerces técnicos e estruturais necessários para superar a linearidade narrativa identificada nas auditorias iniciais (N-02, N-03, N-05, N-07, N-08). Antes desta fase, as escolhas do jogador convergiam frequentemente para o mesmo nó sem reflexo imediato ou duradouro. 

Com o Esquema v2, o jogo adota o padrão de **"diamante com rotas"** (inspirado em *Baldur's Gate 3* e *Disco Elysium*):
- **Pontes Narrativas (`ponte`):** Cada escolha (simples ou por faixa de rolagem de teste) produz uma consequência explícita que explica em prosa o que aconteceu **por causa** da decisão tomada, exibida com destaque tipográfico no início da cena seguinte.
- **Marcas de Memória (`marcas`):** Consequências duradouras gravadas nas flags do mundo e no histórico transacional (`turn_events.resultado`), que alteram falas de interlocutores, blocos de cena subsequentes e são registradas no Diário da Crônica.
- **Composição no Servidor (`comporCena`):** 100% determinística, sem IA no caminho crítico, combinando blocos narrativos por função (`abertura`, `corpo`, `fecho`), falas com interlocutores nomeados e prévias de escolhas.
- **Hubs de Conversa (`tipo: 'hub'`):** Suporte nativo a nós de diálogo com opções que permanecem na conversa (`permanece: true`), esgotamento de tópicos únicos (`unica: true`) e garantia de escolhas de saída sempre no rodapé.
- **Retrocompatibilidade Integral:** Todas as novidades são opcionais; as 5 jornadas existentes continuam ativas sem quebras, e jornadas migradas ativam a validação estrita via `schemaV2: true`.

---

## 2. Modificações Estruturais e de Código

### 2.1 Esquema v2 (Zod) — `src/server/engine/storyLinter.ts`
- `CondicaoSchema`: Avaliação lógica estrita de critérios (`flagsTodas`, `flagsNenhuma`, `aprovacao`, `ultimaEscolha`, `ultimoResultado`, `relogio`, `modo`).
- `BlocoTextoSchema`: Blocos dinâmicos com ordenação semântica (`abertura`, `corpo`, `fecho`) e ativação condicional (`quando`).
- `DesfechoSchema`: Estrutura com `ponte`, `destino` opcional, `delta` de estado e `marcas`.
- `DesfechosTesteSchema`: Mapeamento por faixas de rolagem (`criticoSucesso`, `sucesso`, `parcial`, `falha`, `criticoFalha`).
- `TomEscolhaEnum`: Rótulos textuais de tom (`diplomatico`, `honesto`, `ameaca`, `engano`, `humor`, `silencio`, `devocao`, `violencia`).
- `InterlocutorSchema` e `FalaCenaSchema`: Diálogos estruturados com identificação de personagens, papéis e falas condicionais.
- Extensões retrocompatíveis em `EscolhaSimplesSchema`, `EscolhaTesteAtributoSchema` e `NodeJornadaSchema`.

### 2.2 Motor de Composição — `src/server/engine/composicaoCena.ts`
- Novo módulo `server-only` determinístico.
- `avaliarCondicao`: Avaliação booleana rigorosa (AND) sobre o estado atual do save.
- `comporCena`: Monta a cena combinando ponte anterior, marcas recebidas, blocos ativos, falas de diálogo com nomes/papéis resolvidos e escolhas com status de desbloqueio e marcação de tópicos já explorados (`jaExplorada`).

### 2.3 Execução de Turno e Persistência — `src/server/engine/turno.ts` & `src/app/actions/gameActions.ts`
- Avaliação de desfechos simples e de testes com suporte a dados de teste e rolagem real 2d6.
- Hubs de conversa: quando `permanece: true`, mantém o jogador no mesmo nó e grava a flag `escolha_feita_<id>`.
- Armazenamento imutável de `ponte` e `marcas` no objeto `resultado` do `turn_events` no Postgres/Supabase.
- Composição autoritativa retornada em `RespostaTurnoAction` e `SessaoJogoCarregada`.

### 2.4 Validador Avançado v2 — `src/server/engine/storyLinterPlus.ts`
- Adicionadas regras estritas para jornadas com `schemaV2: true`:
  - `ESCOLHA_SEM_DESFECHO_V2`: Exige ≥ 90% das escolhas com desfecho(s).
  - `PONTES_IRMAS_SIMILARES_V2`: Medição de similaridade de Jaccard por palavras (< 0.6) para evitar textos repetitivos entre sucesso, parcial e falha.
  - `DIALOGO_SEM_INTERLOCUTORES_OU_FALAS_V2`: Obriga presença de interlocutores e falas estruturadas em cenas do tipo `dialogo`.
  - `HUB_SEM_SAIDA_V2` e `HUB_TOPICOS_INVALIDOS_V2`: Exige saída visível e entre 3 a 6 tópicos de conversa.
  - `MARCAS_ORFAS_EXCESSIVAS_V2`: Limita a taxa de marcas nunca lidas no grafo em ≤ 25%.

### 2.5 Interface do Usuário (UI)
- **`CenaTexto.tsx`:**
  - Banner estilizado da ponte no topo da cena com filete escarlate/dourado e rótulo claro: «O que a sua escolha causou».
  - Indicador discreto de marcas aprendidas: «Isto será lembrado: ...» com formatação legível.
  - Renderização tipográfica de diálogo de livro com nome do interlocutor em versalete/caixa-alta e travessão tradicional (`—`).
- **`CartaoEscolha.tsx`:**
  - Chips com rótulos de tom (`[Diplomático]`, `[Ameaça]`, `[Honesto]`, etc.).
  - Indicação explícita e acessível para tópicos já conversados em hubs (`✓ falado`), nunca sinalizados apenas por cor.
- **`NarrativeScroll.tsx`:**
  - Repasse das propriedades de cena composta e garantia de que opções de saída fiquem no final da lista de escolhas.
- **`ChronicleTimeline.tsx`:**
  - Exibição de pontes narrativas e marcas de memória no Diário da Crônica para cada turno.

---

## 3. Fixture de Teste e Validação da Suíte

- **Fixture Criada:** `src/server/journeys/__tests__/fixtures/jornadaV2Fixture.ts` (3 cenas: hub de conselho com 3 tópicos e 1 saída, diálogo no portão com teste de fúria e falas condicionais, e grande salão com blocos de consequência).
- **Suíte Criada:** `src/server/engine/g6aMotorDialogo.test.ts` (8 testes passando: composição de blocos, falas e papéis, verificação de hubs explorados, linter v2, e execução de turnos).
- **Auditoria pt-BR:** 100% aderente ao padrão com `Ser` e sem termos de Portugal.
- **Contraste WCAG 2.2 AA:** 10/10 pares aprovados.
- **Zero `any` e zero `@ts-ignore`** mantidos rigorosamente.
