# Guia de Estilo em Português do Brasil — «Crônicas de Sangue e Gelo»

**Versão:** 1.0 (Fase G6B — Códice Vivo)  
**Padrão Editorial:** Tradução Canônica Brasileira (Jorge Candeias / Editora Leya / Suma de Letras)

---

## 1. Princípio Fundamental: Imersão Grimdark sem Afetação Lusitana

A prosa de *Crônicas de Sangue e Gelo* deve soar sóbria, visceral e literária, sem recorrer a maneirismos arcaizantes artificiais ou construções características do português de Portugal que distanciam o jogador brasileiro da experiência.

### 1.1 Pronome de Tratamento e Ponto de Vista
- **Segunda Pessoa:** Utilizar sempre o pronome **«Você»** (com concordância verbal na 3ª pessoa: *você avança*, *você decide*, *sua espada*).
- **Proibição Estrita de «Vós» e «Vosso»:** Não utilizar *vós*, *vosso*, *vossa*, *vossos*, *vossas*, nem formas verbais de segunda pessoa do plural (*desejais*, *quereis*, *sabeis*, *vistes*).
- **Pronomes Possessivos:** Utilizar *seu*, *sua*, *seus*, *suas*, *dele*, *dela*.

| ❌ Proibido (Arcaizante/Lusitano) | ✅ Canônico Brasileiro (Códice Vivo) |
| :--- | :--- |
| «Qual é o vosso desígnio?» | «Qual é a sua decisão?» |
| «Desejais avançar pela neve?» | «Você deseja avançar pela neve?» |
| «Vossa espada treme na bainha.» | «Sua espada treme na bainha.» |
| «Recuais para o parapeito.» | «Você recua para o parapeito.» |
| «Não possuís ouro suficiente.» | «Você não possui ouro suficiente.» |
| «O vosso olhar atento capta...» | «Seu olhar atento capta...» |

---

## 2. Títulos de Cavalaria e Nobreza

### 2.1 «Ser» em vez de «Sor»
Na tradução brasileira oficial de *As Crônicas de Gelo e Fogo*, os cavaleiros ungidos de Westeros recebem o título de **Ser** (e não *Sor*, que permaneceu apenas em edições de Portugal ou no original em inglês).

- ✅ **Ser Jaime Lannister**, o Regicida
- ✅ **Ser Barristan Selmy**, o Ousado
- ✅ **Ser Arthur Dayne**, a Espada da Manhã
- ✅ **Ser Jorah Mormont**
- ❌ *Sor Jaime*, *Sor Barristan*, *Sor Arthur*

### 2.2 Termos de Tratamento Nobiliárquico
- **Lorde / Senhora:** Utilizar *Lorde Eddard Stark*, *Lorde Tywin*, *Senhora Catelyn*.
- **Meistre:** *Meistre Aemon*, *Arquimeistre Marwyn*.
- **Sua Graça:** Tratamento formal dirigido a Reis e Rainhas (*«Sua Graça, Rei Robert»*).
- **Meu Senhor / Minha Senhora:** Tratamento respeitoso em diálogos diretos (*«Meu senhor, os batedores regressaram»*).

---

## 3. Nomes Próprios e Geografia de Westeros

Manter estrita consistência com a tradução brasileira estabelecida:
- **Locais:**
  - *Porto Real* (King's Landing)
  - *Castelo Negro* (Castle Black)
  - *Ponta Tempestade* (Storm's End)
  - *Pedra do Dragão* (Dragonstone)
  - *Jardim de Cima* (Highgarden)
  - *Ninho da Águia* (Eyrie)
  - *Rochedo Casterly* (Casterly Rock)
  - *Atalaialeste do Mar* (Eastwatch-by-the-Sea)
  - *Torre Sombria* (Shadow Tower)
  - *Ponte de Caveiras* (Bridge of Skulls)
  - *Garganta* (Gorge)
- **Facções e Conceitos:**
  - *Patrulha da Noite* (Night's Watch)
  - *Povo Livre / Selvagens* (Free Folk / Wildlings)
  - *Caminhantes Brancos / Os Outros* (White Walkers / The Others)
  - *Mão do Rei* (Hand of the King)
  - *Guarda Real* (Kingsguard)
  - *Corvo de Três Olhos* (Three-Eyed Crow)
  - *Árvore-coração* (Heart tree)
  - *Bosque Sagrado* (Godswood)

---

## 4. Regras de Verificação Contínua
Qualquer novo texto de cena, diálogo ou interface deve passar no validador `scripts/ptbr_lint.ts` sem apontar ocorrências de pronomes ou grafias banidas.
