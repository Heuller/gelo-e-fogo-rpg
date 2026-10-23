export interface ProbabilidadeResultado {
  totalCombinacoes: number;
  sucessoOuMelhor: number;
  critico: number;
  falhaCritica: number;
  porcentagemSucesso: number;
  porcentagemTexto: string;
}

/**
 * Enumera exaustivamente as 36 combinações possíveis de 2d6 (1 a 6)
 * aplicando com exatidão as regras determinísticas de Crônicas de Sangue e Gelo:
 * - Crítico: total >= dc + 3 OU duplo 6 natural [6, 6]
 * - Sucesso Comum: total >= dc
 * - Falha Parcial: total < dc (avanço com custo)
 * - Falha Crítica: (total <= dc - 3 OU duplo 1 natural [1, 1]) E riscoMortal = true
 */
export function probabilidadeSucesso(
  valorAtributo: number,
  dc: number,
  riscoMortal = false
): ProbabilidadeResultado {
  let sucessos = 0;
  let criticos = 0;
  let falhasCriticas = 0;

  for (let d1 = 1; d1 <= 6; d1++) {
    for (let d2 = 1; d2 <= 6; d2++) {
      const somaDados = d1 + d2;
      const duplo6 = d1 === 6 && d2 === 6;
      const duplo1 = d1 === 1 && d2 === 1;
      const total = somaDados + valorAtributo;

      // 1. Crítico
      if (total >= dc + 3 || duplo6) {
        criticos++;
        sucessos++;
        continue;
      }

      // 2. Sucesso Comum
      if (total >= dc) {
        sucessos++;
        continue;
      }

      // 3. Falha Grave / Crítica com Risco Mortal
      const ehFalhaGrave = total <= dc - 3 || duplo1;
      if (ehFalhaGrave && riscoMortal) {
        falhasCriticas++;
      }
    }
  }

  const porcentagem = Math.round((sucessos / 36) * 100);

  return {
    totalCombinacoes: 36,
    sucessoOuMelhor: sucessos,
    critico: criticos,
    falhaCritica: falhasCriticas,
    porcentagemSucesso: porcentagem,
    porcentagemTexto: `≈ ${porcentagem}%`,
  };
}
