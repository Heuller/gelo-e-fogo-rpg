# Registro de Decisões Autônomas — Crônicas de Sangue e Gelo (v2.2)

Documento mantido pelo executor autônomo contendo todas as decisões tomadas por delegação expressa do usuário (§1.3 e §9 do Plano v2.2).

| Data/Hora | Fase | Tema / Decisão | Motivação | Alternativa Descartada |
| :--- | :---: | :--- | :--- | :--- |
| 24/10/2026 | Inicial | Criação da branch `v2` a partir de `master` | Isolamento estrito de todo o plano para avaliação final unificada | Alterar diretamente a branch `master` |
| 24/10/2026 | Inicial | Adoção do nome oficial «Crônicas de Sangue e Gelo — Códice Vivo» | Consistência com README, AGENTS.md e rodapés | Manter nomes divergentes entre landing e jogo |
| 24/10/2026 | Inicial | Padrão pt-BR com "Ser" em vez de "Sor" | Fidelidade à edição brasileira de As Crônicas de Gelo e Fogo | Manter vocabulário com sabor arcaico/Portugal |
| 24/10/2026 | Inicial | Redesenho da Ação Livre como "Tentativa Livre" com prévia de chances | Eliminar frustração de mapear texto para a opção 1 | Desativar completamente a ação livre |
| 24/10/2026 | G0 | Execução de capturas Playwright e Axe Core em porta efêmera 3099 | Garantir medição real sem interferir em portas comuns de desenvolvimento | Utilizar simulação sintética de telas sem navegador real |
| 24/10/2026 | G1 | Bypass local/offline determinístico para login de teste (`meistre@cidadela.westeros`) | Permitir testes ponta-a-ponta e auditoria manual sem dependência de conectividade externa ao Supabase | Exigir conexão de rede obrigatória para testar o jogo |
| 24/10/2026 | G1 | Desfazer em pilha append-only via eventos compensatórios (`tipo: 'desfazer'`) | Preservar histórico imutável para auditoria sem mutação destrutiva no banco | Deletar fisicamente registros da tabela `turn_events` |
| 24/10/2026 | G1 | Remoção integral do fallback permissivo em `processarEscolhaAction` e validação estrita em `/api/game/turn` | Garantir o invariante nº 1 (cliente jamais envia estado ou ficha mutável) | Manter fallback permissivo com aviso em log |
| 24/10/2026 | G1B | Tentativa Livre estilo BG3 com prévia determinística de perícia, tabela fechada e limite de 2 tentativas por cena | Substituir classificação solta por transparência total de chances, sem alterar nó e sem risco mortal arbitrário | Mapear arbitrariamente para opções pré-existentes ou IA desregulada |
| 24/10/2026 | G11 (mínimo) | Suíte automatizada Playwright E2E em servidor de produção isolado (porta 3099) | Validar o ciclo completo do jogador (login, avanço autoritativo, desfazer e tentativa livre) no navegador real | Apenas testes unitários sintéticos sem navegador real |
