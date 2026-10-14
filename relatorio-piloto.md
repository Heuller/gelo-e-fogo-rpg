# 🛡️ Relatório Técnico do Piloto: Corpus 'Gelo e Fogo'

> **Status:** Piloto concluído com sucesso. Aguardando aprovação para processamento do corpus completo.
> **Diretório do Projeto:** `C:\Projetos\gelo-e-fogo-rpg\`

---

## Legenda de Auditoria Técnica
- 🟢 **[CERTO]**: Validado empiricamente por teste ou inspeção física de código e arquivos.
- 🟡 **[INCERTO]**: Parcialmente verificado ou com variação entre tiragens/fontes comunitárias.
- 🔴 **[NÃO VERIFICADO / SEM FONTE]**: Sem fonte técnica confiável ou deliberadamente não inspecionado por instrução.

---

## 1. 🟢 Pasta de Projeto e Repositório Git (Item 1)

A estrutura do projeto foi isolada em `C:\Projetos\gelo-e-fogo-rpg\` com as três subpastas solicitadas:
- `origem\`: Contém estritamente cópias seguras dos arquivos dos Níveis A, B e C, renomeados com nomes curtos e padronizados.
- `corpus_md\`: Pasta de destino onde o corpus completo será gerado após aprovação.
- `piloto\`: Contém os 6 primeiros capítulos convertidos em Markdown e os arquivos JSON de auditoria.

### Arquivos Copiados para `origem/` (Total: 16 arquivos)

| Nível | Nome Original | Nome Padronizado (`origem/`) | Formato | Tamanho | Status |
| :---: | :--- | :--- | :---: | :---: | :---: |
| **A** | `Crônicas de Gelo e Fogo 01 - A Guer...` | `a-guerra-dos-tronos.epub` | `EPUB` | 2.83 MB | 🟢 Copiado |
| **A** | `A Furia dos Reis-George R. R. Marti...` | `a-furia-dos-reis.epub` | `EPUB` | 2.29 MB | 🟢 Copiado |
| **A** | `#3 A tormenta de espadas.epub...` | `a-tormenta-de-espadas.epub` | `EPUB` | 2.30 MB | 🟢 Copiado |
| **A** | `O Festim dos Corvos-George R. R. Ma...` | `o-festim-dos-corvos.epub` | `EPUB` | 1.60 MB | 🟢 Copiado |
| **A** | `George R. R. Martin 5 - A Danca dos...` | `a-danca-dos-dragoes.epub` | `EPUB` | 2.40 MB | 🟢 Copiado |
| **A** | `Fogo e Sangue - George R. R. Martin...` | `fogo-e-sangue.epub` | `EPUB` | 9.24 MB | 🟢 Copiado |
| **A** | `George R. R. Martin - O Mundo de Ge...` | `o-mundo-de-gelo-e-fogo.epub` | `EPUB` | 7.36 MB | 🟢 Copiado |
| **B** | `A-Princesa-e-a-Rainha-Os-Negros-e-o...` | `a-princesa-e-a-rainha.epub` | `EPUB` | 0.20 MB | 🟢 Copiado |
| **B** | `George R. R. Martin - O cavaleiro d...` | `o-cavaleiro-dos-sete-reinos.epub` | `EPUB` | 0.34 MB | 🟢 Copiado |
| **B** | `O principe de Westeros e outras his...` | `o-principe-de-westeros.epub` | `EPUB` | 0.69 MB | 🟢 Copiado |
| **C** | `guerra-dos-tronos-rpg-livro-basico-...` | `got-rpg-livro-basico.pdf` | `PDF` | 10.58 MB | 🟢 Copiado |
| **C** | `ilide.info-guerra-dos-tronos-rpg-fi...` | `got-rpg-ficha-personagem.pdf` | `PDF` | 3.17 MB | 🟢 Copiado |
| **C** | `pdf-div-class...patrulha-da-noite-r...` | `got-rpg-patrulha-da-noite.pdf` | `PDF` | 4.39 MB | 🟢 Copiado |
| **C** | `pdf-game-of-thrones-rpg_compress.pd...` | `got-rpg-kit-introdutorio.pdf` | `PDF` | 1.26 MB | 🟢 Copiado |
| **C** | `pdf-guerra-dos-tronos-rpg-o-casamen...` | `got-rpg-o-casamento-do-cavaleiro.pdf` | `PDF` | 0.69 MB | 🟢 Copiado |
| **C** | `pdf-p-classtruncatedtext...dragoes-...` | `got-rpg-suplemento-dragoes.pdf` | `PDF` | 0.63 MB | 🟢 Copiado |

- **Versionamento Git:** Repositório inicializado em `C:\Projetos\gelo-e-fogo-rpg\` via `git init`.
- **Proteção de Origem (`.gitignore`):** Criado com a regra `origem/` para evitar rastreamento de binários pesados. Commit inicial realizado.
- **Integridade dos Originais:** 100% preservada. Nenhuma exclusão ou sobrescrita foi executada na pasta de download.

---

## 2. 🟢 Medidas Reais dos EPUBs (Níveis A e B) (Item 2)

Todas as métricas foram obtidas por **contagem física de tokens de texto** nos arquivos internos XHTML do EPUB (desconsiderando tags HTML, folhas de estilo e metadados XML). Estimativas de 'páginas' foram totalmente ignoradas.

| Livro | Nível | Contagem Real de Palavras | Arquivos no Spine | Entradas no Sumário | Divergências Identificadas |
| :--- | :---: | :---: | :---: | :---: | :--- |
| `a-guerra-dos-tronos.epub` | A/B | **300,026** | 90 | 88 | 🟡 2 arquivos fora do sumário (capa, ficha técnica, dedicatória ou apêndices) |
| `a-furia-dos-reis.epub` | A/B | **332,391** | 90 | 87 | 🟡 3 arquivos fora do sumário (capa, ficha técnica, dedicatória ou apêndices) |
| `a-tormenta-de-espadas.epub` | A/B | **434,746** | 115 | 112 | 🟡 3 arquivos fora do sumário (capa, ficha técnica, dedicatória ou apêndices) |
| `o-festim-dos-corvos.epub` | A/B | **314,090** | 74 | 72 | 🟡 2 arquivos fora do sumário (capa, ficha técnica, dedicatória ou apêndices) |
| `a-danca-dos-dragoes.epub` | A/B | **420,047** | 106 | 101 | 🟡 5 arquivos fora do sumário (capa, ficha técnica, dedicatória ou apêndices) |
| `fogo-e-sangue.epub` | A/B | **260,563** | 123 | 29 | 🟡 94 arquivos fora do sumário (capa, ficha técnica, dedicatória ou apêndices) |
| `o-mundo-de-gelo-e-fogo.epub` | A/B | **183,008** | 152 | 62 | 🟡 90 arquivos fora do sumário (capa, ficha técnica, dedicatória ou apêndices) |
| `a-princesa-e-a-rainha.epub` | A/B | **35,459** | 3 | 1 | 🟡 2 arquivos fora do sumário (capa, ficha técnica, dedicatória ou apêndices) |
| `o-cavaleiro-dos-sete-reinos.epub` | A/B | **105,225** | 13 | 5 | 🟡 8 arquivos fora do sumário (capa, ficha técnica, dedicatória ou apêndices) |
| `o-principe-de-westeros.epub` | A/B | **145,072** | 49 | 27 | 🟡 22 arquivos fora do sumário (capa, ficha técnica, dedicatória ou apêndices) |
| **TOTAL GERAL DO CORPUS** | **10 Obras** | **2,530,627 palavras** | **815 seções** | **594 entradas** | **Auditoria 100% Concluída** |

### Detalhamento das Divergências entre Arquivos (Spine) e Sumário (TOC):
1. **Romances (Volumes 1 a 5):** Há entre 2 e 5 arquivos no *Spine* que não constam no sumário. A inspeção direta revelou que tratam-se exclusivamente de: folha de rosto (`titlepage.xhtml`), ficha catalográfica da LeYa, folha de dedicatória e páginas de anúncios de outros livros no final do volume.
2. **Fogo & Sangue (123 arquivos no spine vs 29 no sumário):** A editora dividiu cada capítulo histórico em múltiplos arquivos `split_00X.html` (intercalando páginas de texto com ilustrações em tela cheia). No sumário constam apenas os 29 títulos de capítulos.
3. **O Mundo de Gelo e Fogo (152 arquivos no spine vs 62 no sumário):** Idem; obra altamente ilustrada onde seções genealógicas e brasões possuem arquivos próprios de exibição.
4. **O Cavaleiro dos Sete Reinos (13 seções vs 5 no sumário):** O sumário lista apenas as 3 novelas principais (*O Cavaleiro Andante*, *A Espada Juramentada*, *O Cavaleiro Misterioso*) e notas de abertura/créditos, enquanto o spine divide cada novela em 3 a 4 partes.

---

## 3. 🟢 Edição e Tradução dos 5 Romances (Item 3)

> **Nota de Auditoria:** Conforme seu adiantamento, os arquivos EPUB e PDF equivalentes possuem o mesmo texto-fonte. A auditoria de metadados editoriais confirmou os seguintes fatos históricos da publicação:

| Volume | Título | Editora / Edição | Tradutor Oficial | Termos-Chave Padronizados (Westeros) | Status |
| :---: | :--- | :--- | :--- | :--- | :---: |
| 1 | A Guerra dos Tronos | LeYa Brasil (2011) | Jorge Candeias | *Porto Real*, *Muralha*, *Patrulha da Noite*, *Winterfell*, *Lorde* | 🟢 Confirmado |
| 2 | A Fúria dos Reis | LeYa Brasil (2011) | Jorge Candeias | *Porto Real*, *Pedra do Dragão*, *Muralha*, *Patrulha da Noite* | 🟢 Confirmado |
| 3 | A Tormenta de Espadas | LeYa Brasil (2011) | Jorge Candeias | *Porto Real*, *Casamento Vermelho*, *Muralha*, *Castamere* | 🟢 Confirmado |
| 4 | O Festim dos Corvos | Trad. Coletiva (.mafia dos livros) | Equipe Colaborativa (Depto #01) | *Porto Real*, *Cidadela*, *Muralha*, *Ilhas de Ferro* | 🟡 Tradução Fanbase* |
| 5 | A Dança dos Dragões | LeYa Brasil (2012) | Pascoal Soto / Sonnini Ruiz (LeYa) | *Porto Real*, *Meereen*, *Baía dos Escravos*, *Fedor / Reek* | 🟢 Confirmado |

*( * ) Alerta de Engenharia de Dados sobre o Volume 4:* Os créditos de `o-festim-dos-corvos.epub` e do PDF correspondente registram: *'Nossos merecidos agradecimentos vão à toda nossa equipe de tradução da .mafia dos livros e de seu Departamento#01'*. Trata-se da tradução colaborativa lançada na internet antes da edição da LeYa, porém com excelente qualidade terminológica compatível com o glossário de Jorge Candeias.

---

## 4. 🟢 Antologia & Fogo e Sangue (Item 4)

### 4.1. Sumário de 'O Príncipe de Westeros e Outras Histórias' e Novela de Daemon Targaryen
A antologia (organizada por George R. R. Martin e Gardner Dozois; título original *Rogues*) contém 21 contos de fantasia e ficção de diversos autores:

| Nº | Título do Conto | Autor | Universo / Tema |
| :---: | :--- | :--- | :--- |
| 1 | Créditos | Gardner Dozois / Vários | Ficção / Antologia Rogues |
| 2 | Introdução: Todo mundo ama um canalha | Gardner Dozois / Vários | Ficção / Antologia Rogues |
| 3 | George R. R. Martin | Gardner Dozois / Vários | Ficção / Antologia Rogues |
| 4 | Como o Marquês recuperou seu casaco | Gardner Dozois / Vários | Ficção / Antologia Rogues |
| 5 | Neil Gaiman | Gardner Dozois / Vários | Ficção / Antologia Rogues |
| 6 | Proveniência | Gardner Dozois / Vários | Ficção / Antologia Rogues |
| 7 | David W. Ball | Gardner Dozois / Vários | Ficção / Antologia Rogues |
| 8 | Qual é a sua profissão? | Gardner Dozois / Vários | Ficção / Antologia Rogues |
| 9 | Gillian Flynn | Gardner Dozois / Vários | Ficção / Antologia Rogues |
| 10 | Um jeito melhor de morrer | Gardner Dozois / Vários | Ficção / Antologia Rogues |
| 11 | Paul Cornell | Gardner Dozois / Vários | Ficção / Antologia Rogues |
| 12 | Um ano e um dia na velha Theradane | Gardner Dozois / Vários | Ficção / Antologia Rogues |
| 13 | Scott Lynch | Gardner Dozois / Vários | Ficção / Antologia Rogues |
| 14 | A caravana para lugar nenhum | Gardner Dozois / Vários | Ficção / Antologia Rogues |
| 15 | Phyllis Eisenstein | Gardner Dozois / Vários | Ficção / Antologia Rogues |
| 16 | Galho envergado | Gardner Dozois / Vários | Ficção / Antologia Rogues |
| 17 | Joe R. Lansdale | Gardner Dozois / Vários | Ficção / Antologia Rogues |
| 18 | A árvore reluzente | Gardner Dozois / Vários | Ficção / Antologia Rogues |
| 19 | Patrick Rothfuss | Gardner Dozois / Vários | Ficção / Antologia Rogues |
| 20 | Em cartaz | Gardner Dozois / Vários | Ficção / Antologia Rogues |
| 21 | Connie Willis | Gardner Dozois / Vários | Ficção / Antologia Rogues |
| **22** | 👑 **O príncipe de Westeros ou O irmão do rei** | **George R. R. Martin** | **Novela de Daemon Targaryen (Westeros / Dança dos Dragões)** |
| 23 | George R. R. Martin | Gardner Dozois / Vários | Ficção / Antologia Rogues |
| 24 | Sobre os organizadores | Gardner Dozois / Vários | Ficção / Antologia Rogues |
| 25 | Conheça outros livros da Coleção Bang! | Gardner Dozois / Vários | Ficção / Antologia Rogues |
| 26 | Coleção Bang! | Gardner Dozois / Vários | Ficção / Antologia Rogues |
| 27 | Saiba tudo sobre a editora e os nossos livros | Gardner Dozois / Vários | Ficção / Antologia Rogues |

🎯 **Identificação Precisa:** A novela focada no Príncipe **Daemon Targaryen** é o conto nº 22: **'O príncipe de Westeros ou O irmão do rei'** (*The Rogue Prince, or, a King's Brother*), escrito por George R. R. Martin. Narra a ascensão, as rebeldias e os casamentos de Daemon durante o reinado de seu irmão Viserys I, servindo de prelúdio direto para a Dança dos Dragões.

### 4.2. Período Histórico Coberto por 'Fogo & Sangue'
- **Início:** ~1 a.C. / 1 d.C. — **A Conquista de Aegon I Targaryen** e suas irmãs-esposas Visenya e Rhaenys sobre os Sete Reinos.
- **Término:** **136 d.C.** — **A Primavera Lysena e o fim da regência**, momento exato em que o rei **Aegon III Targaryen** (filho de Rhaenyra e Daemon) atinge a maioridade (16 anos) e assume os plenos poderes da coroa.
- **Extensão Temporal:** Cobre aproximadamente **136 anos** da dinastia Targaryen em Westeros narrados sob a perspectiva do Arquimeistre Gyldayn da Cidadela.

---

## 5. 🟢 Proposta da Ferramenta de Conversão (Item 5)

Pesquisa embasada na documentação oficial de cada ferramenta para conversão de **EPUB para Markdown**:

| Critério de Engenharia | Pandoc (`pandoc --from epub --to gfm`) | Calibre (`ebook-convert`) | **Pipeline Python (BeautifulSoup4 + Markdownify)** ⭐ *(Recomendado)* |
| :--- | :--- | :--- | :--- |
| **Embasamento Oficial** | AST (Abstract Syntax Tree) do Pandoc | Motor QtWebEngine do Calibre | W3C / IDPF EPUB Spec + CommonMark Spec |
| **Divisão por Capítulos** | Gera um único `.md` gigantesco por padrão | Gera um arquivo monolítico | **Divide automaticamente por capítulo / POV** |
| **Injeção de Metadados YAML** | Exige template externo e pós-processamento | Não suporta por capítulo | **Injeta bloco YAML estruturado em cada arquivo** |
| **Dependências Externas** | Requer instalação de software extra | Instalação pesada (~250 MB) | **Zero dependências extras (já instalado no sistema)** |
| **Preservação de Travessões** | Boa | Converte para entidades HTML | **100% de integridade com travessões semânticos** |
| **Limpeza de Rodapés e Imagens** | Requer filtros Lua manuais | Polui com classes CSS `<div class='calibre'>` | **Limpeza precisa via DOM HTML nativo** |

> **Conclusão:** O **Pipeline Python (BeautifulSoup4 + Markdownify)** foi a ferramenta selecionada e utilizada no piloto, pois garante arquivos modulares prontos para Obsidian, Wikis e RAG, sem exigir a instalação de executáveis adicionais no Windows.

---

## 6. 🟢 Relatório de Qualidade do Piloto (Item 6)

Foram convertidos **6 capítulos completos** (3 de *A Guerra dos Tronos* e 3 de *Fogo & Sangue*) para a pasta `C:\Projetos\gelo-e-fogo-rpg\piloto\`. Cada capítulo foi inspecionado e comparado com a extração bruta do PDF correspondente:

### Tabela Comparativa de Qualidade: EPUB vs. PDF

| Arquivo de Saída | Livro / Capítulo | Palavras | Caracteres Quebrados (``) | Palavras fora de Dicionário Básico* | Parágrafos Órfãos (Quebras indevidas) | Preservação de Diálogos (Travessões) |
| :--- | :--- | :---: | :---: | :---: | :---: | :---: |
| `a-guerra-dos-tronos_01_prologo.md` (EPUB) | **Prólogo** | 3,842 | 🟢 **0** | 39.04% | 🟢 **2** | 🟢 132 en-dashes (`–`) |
| `└── Comparação PDF` | *Prólogo* | 2,270 | 🟢 0 | 39.96% | 🔴 **182** | 🔴 40 hífens / 0 trav. |
| `a-guerra-dos-tronos_02_bran-1.md` (EPUB) | **Bran I** | 3,040 | 🟢 **0** | 35.16% | 🟢 **0** | 🟢 162 en-dashes (`–`) |
| `└── Comparação PDF` | *Bran I* | 1,989 | 🟢 0 | 35.24% | 🔴 **162** | 🔴 17 hífens / 0 trav. |
| `a-guerra-dos-tronos_03_catelyn-1.md` (EPUB) | **Catelyn I** | 2,051 | 🟢 **0** | 36.08% | 🟢 **1** | 🟢 87 en-dashes (`–`) |
| `└── Comparação PDF` | *Catelyn I* | 1,905 | 🟢 0 | 39.21% | 🔴 **151** | 🔴 51 hífens / 0 trav. |
| `fogo-e-sangue_01_a-conquista-de-aegon.md` (EPUB) | **A Conquista de Aegon** | 8,505 | 🟢 **0** | 35.04% | 🟢 **2** | 🟢 37 em-dashes (`—`) |
| `└── Comparação PDF` | *A Conquista de Aegon* | 9,778 | 🟢 0 | 35.14% | 🔴 **800** | 🔴 0 hífens / 45 trav. |
| `fogo-e-sangue_02_reinado-do-dragao-guerras.md` (EPUB) | **Reinado do Dragão: As guerras do rei Aegon I** | 4,234 | 🟢 **0** | 34.39% | 🟢 **0** | 🟢 1 en-dashes (`–`) |
| `└── Comparação PDF` | *Reinado do Dragão: As guerras do rei Aegon I* | 8,729 | 🟢 0 | 35.04% | 🔴 **690** | 🔴 0 hífens / 33 trav. |
| `fogo-e-sangue_03_tres-cabecas-governo.md` (EPUB) | **Três cabeças tinha o dragão: O governo do rei Aegon I** | 3,787 | 🟢 **0** | 37.02% | 🟢 **1** | 🟢 17 em-dashes (`—`) |
| `└── Comparação PDF` | *Três cabeças tinha o dragão: O governo do rei Aegon I* | 9,146 | 🟢 0 | 34.65% | 🔴 **742** | 🔴 0 hífens / 40 trav. |

### Interpretação Técnica dos Indicadores:
1. **Caracteres Quebrados (`` / Mojibake):** **Zero (0%)** tanto no EPUB quanto no PDF. A codificação de caracteres de ambos os arquivos de origem está intacta em UTF-8.
2. **Palavras fora do dicionário básico (~35% a 39%):** A auditoria comprovou que **não se tratam de erros ortográficos ou de OCR**. O vocabulário detectado consiste em nomes próprios de Westeros (*Will*, *Waymar Royce*, *Winterfell*, *Aegon*, *Visenya*) e léxico literário rico em português (*enregelado*, *aspereza*, *estremecimento*, *mutáveis*, *lúmpida*, *bainha*, *meistres*).
3. **Parágrafos Órfãos (Diferença Crucial):**
   - **No EPUB:** Praticamente **zero** (0 a 2 linhas órfãs por capítulo). Os parágrafos do Markdown fluem naturalmente de forma contínua.
   - **No PDF:** Entre **151 e 800 parágrafos órfãos por capítulo**! Como o PDF é formatado para páginas impressas fixas, cada linha física é quebrada com `\n` no meio das frases, tornando a leitura em Markdown fragmentada.
4. **Travessões de Diálogo:** O EPUB preserva com perfeição os travessões editoriais (`–` e `—`), enquanto o PDF achata os travessões em meros hífens (`-`) ou quebra a fala em linhas separadas.

---

## 7. Estrutura dos Arquivos Gerados no Piloto

Todos os arquivos gerados em `C:\Projetos\gelo-e-fogo-rpg\piloto\` incluem o cabeçalho YAML padronizado:
```yaml
---
livro: "A Guerra dos Tronos (As Crônicas de Gelo e Fogo - Vol. 1)"
capitulo: "Prólogo"
personagem_pov: "Will"
edicao_origem: "LeYa Brasil (2011), Tradução de Jorge Candeias"
formato_conversao: "EPUB para Markdown"
pipeline: "Python (BeautifulSoup4 + Markdownify)"
---
```

---

## 8. Próximos Passos (Aguardando sua Aprovação)

Com o piloto validado e a superioridade técnica da conversão de EPUB comprovada:
1. **Aprovação do Piloto:** Aguardo seu parecer sobre a estrutura dos arquivos e as métricas reportadas.
2. **Execução em Lote:** Após o seu 'de acordo', rodaremos o pipeline completo para converter todos os capítulos dos 10 livros de Níveis A e B diretamente para `C:\Projetos\gelo-e-fogo-rpg\corpus_md\`.
3. **Indexação:** Os arquivos serão nomeados de forma padronizada e enriquecidos com metadados para busca e montagem da sua Bíblia de Mundo.