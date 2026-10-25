export type RotuloRisco =
  | 'Garantido'
  | 'Quase certo'
  | 'Provável'
  | 'Desafiador'
  | 'Arriscado';

export function obterRotuloRisco(porcentagem: number): RotuloRisco {
  if (porcentagem >= 100) return 'Garantido';
  if (porcentagem >= 80) return 'Quase certo';
  if (porcentagem >= 60) return 'Provável';
  if (porcentagem >= 40) return 'Desafiador';
  return 'Arriscado';
}

export interface OpcoesProbabilidade {
  riscoMortal?: boolean;
  circunstancia?: 'vantagem' | 'desvantagem' | 'neutro';
  modo?: 'cronica' | 'padrao' | 'juramento';
}

export interface ProbabilidadeResultado {
  totalCombinacoes: number;
  sucessoOuMelhor: number;
  critico: number;
  falhaCritica: number;
  porcentagemSucesso: number;
  porcentagemTexto: string;
  rotuloRisco: RotuloRisco;
}

/**
 * Enumera exaustivamente as combinações possíveis de 2d6 (36) ou 3d6 (216 para Vantagem/Desvantagem)
 * aplicando com exatidão as regras determinísticas de Crônicas de Sangue e Gelo (Camada BG3):
 * - Crítico: total >= dc + 3 OU duplo 6 natural [6, 6] dos 2 dados mantidos
 * - Sucesso Comum: total >= dc (ajustado por modo, ex.: Crônica = DC - 2)
 * - Falha Parcial: total < dc (avanço com custo)
 * - Falha Crítica: (total <= dc - 3 OU duplo 1 natural [1, 1]) E riscoMortal = true
 */
export function probabilidadeSucesso(
  valorAtributo: number,
  dc: number,
  riscoMortalOuOpcoes: boolean | OpcoesProbabilidade = false
): ProbabilidadeResultado {
  const opcoes: OpcoesProbabilidade =
    typeof riscoMortalOuOpcoes === 'boolean'
      ? { riscoMortal: riscoMortalOuOpcoes }
      : riscoMortalOuOpcoes;

  const riscoMortal = Boolean(opcoes.riscoMortal);
  const circunstancia = opcoes.circunstancia || 'neutro';
  const modo = opcoes.modo || 'padrao';
  const modificadorModo = modo === 'cronica' ? -2 : 0;
  const dcEfetiva = Math.max(2, dc + modificadorModo);

  let sucessos = 0;
  let criticos = 0;
  let falhasCriticas = 0;

  if (circunstancia === 'vantagem') {
    // 3d6 mantém os 2 melhores (216 combinações)
    for (let d1 = 1; d1 <= 6; d1++) {
      for (let d2 = 1; d2 <= 6; d2++) {
        for (let d3 = 1; d3 <= 6; d3++) {
          const ordenados = [d1, d2, d3].sort((a, b) => b - a);
          const top1 = ordenados[0];
          const top2 = ordenados[1];
          const soma = top1 + top2;
          const duplo6 = top1 === 6 && top2 === 6;
          const duplo1 = top1 === 1 && top2 === 1;
          const total = soma + valorAtributo;

          if (total >= dcEfetiva + 3 || duplo6) {
            criticos++;
            sucessos++;
          } else if (total >= dcEfetiva) {
            sucessos++;
          } else {
            const ehFalhaGrave = total <= dcEfetiva - 3 || duplo1;
            if (ehFalhaGrave && riscoMortal) {
              falhasCriticas++;
            }
          }
        }
      }
    }
    const porcentagem = Math.round((sucessos / 216) * 100);
    return {
      totalCombinacoes: 216,
      sucessoOuMelhor: sucessos,
      critico: criticos,
      falhaCritica: falhasCriticas,
      porcentagemSucesso: porcentagem,
      porcentagemTexto: `≈ ${porcentagem}%`,
      rotuloRisco: obterRotuloRisco(porcentagem),
    };
  }

  if (circunstancia === 'desvantagem') {
    // 3d6 mantém os 2 piores (216 combinações)
    for (let d1 = 1; d1 <= 6; d1++) {
      for (let d2 = 1; d2 <= 6; d2++) {
        for (let d3 = 1; d3 <= 6; d3++) {
          const ordenados = [d1, d2, d3].sort((a, b) => a - b);
          const low1 = ordenados[0];
          const low2 = ordenados[1];
          const soma = low1 + low2;
          const duplo6 = low1 === 6 && low2 === 6;
          const duplo1 = low1 === 1 && low2 === 1;
          const total = soma + valorAtributo;

          if (total >= dcEfetiva + 3 || duplo6) {
            criticos++;
            sucessos++;
          } else if (total >= dcEfetiva) {
            sucessos++;
          } else {
            const ehFalhaGrave = total <= dcEfetiva - 3 || duplo1;
            if (ehFalhaGrave && riscoMortal) {
              falhasCriticas++;
            }
          }
        }
      }
    }
    const porcentagem = Math.round((sucessos / 216) * 100);
    return {
      totalCombinacoes: 216,
      sucessoOuMelhor: sucessos,
      critico: criticos,
      falhaCritica: falhasCriticas,
      porcentagemSucesso: porcentagem,
      porcentagemTexto: `≈ ${porcentagem}%`,
      rotuloRisco: obterRotuloRisco(porcentagem),
    };
  }

  // Neutro: 2d6 padrão (36 combinações)
  for (let d1 = 1; d1 <= 6; d1++) {
    for (let d2 = 1; d2 <= 6; d2++) {
      const somaDados = d1 + d2;
      const duplo6 = d1 === 6 && d2 === 6;
      const duplo1 = d1 === 1 && d2 === 1;
      const total = somaDados + valorAtributo;

      // 1. Crítico
      if (total >= dcEfetiva + 3 || duplo6) {
        criticos++;
        sucessos++;
        continue;
      }

      // 2. Sucesso Comum
      if (total >= dcEfetiva) {
        sucessos++;
        continue;
      }

      // 3. Falha Grave / Crítica com Risco Mortal
      const ehFalhaGrave = total <= dcEfetiva - 3 || duplo1;
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
    rotuloRisco: obterRotuloRisco(porcentagem),
  };
}
