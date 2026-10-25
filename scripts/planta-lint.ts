import * as fs from 'fs';
import * as path from 'path';

export interface NoPlanta {
  id: string;
  tipo: 'narracao' | 'dialogo' | 'hub' | 'peca_de_cenario' | 'acerto_de_contas';
  rota: string;
  objetivoDramatico: string;
  marcasGravadas: string[];
  marcasLidas: string[];
  origem: 'canonica' | 'original';
  fonte: string;
}

export interface ResultadoPlantaLint {
  valido: boolean;
  erros: string[];
  avisos: string[];
  estatisticas: {
    totalNos: number;
    nosPorEtapa: {
      abertura: number;
      encruzilhada: number;
      rotas: Record<string, number>;
      pecaDeCenario: number;
      acertoDeContas: number;
    };
    totalMarcasGravadas: number;
    marcasLidasNoAcerto: number;
    proporcaoExclusivaPorRota: Record<string, number>;
  };
}

/**
 * Lê e analisa a especificação da planta do ato em Markdown.
 */
export function analisarPlantaMarkdown(conteudoMd: string): { nos: NoPlanta[]; etapas: Record<string, string[]> } {
  const nos: NoPlanta[] = [];
  const etapas: Record<string, string[]> = {
    abertura: [],
    encruzilhada: [],
    rotas: [],
    peca_de_cenario: [],
    acerto_de_contas: [],
  };

  let etapaAtual = 'abertura';
  const linhas = conteudoMd.split('\n');

  for (let i = 0; i < linhas.length; i++) {
    const linha = linhas[i].trim();

    if (/^#+\s*1\.\s*abertura/i.test(linha)) etapaAtual = 'abertura';
    else if (/^#+\s*2\.\s*encruzilhada/i.test(linha)) etapaAtual = 'encruzilhada';
    else if (/^#+\s*3\.\s*rotas/i.test(linha)) etapaAtual = 'rotas';
    else if (/^#+\s*4\.\s*pe[cç]a\s+de\s+cen[aá]rio/i.test(linha)) etapaAtual = 'peca_de_cenario';
    else if (/^#+\s*5\.\s*acerto\s+de\s+contas/i.test(linha)) etapaAtual = 'acerto_de_contas';

    // Procura bloco de nó: ```yaml ou tabela ou lista com id: ...
    const idMatch = linha.match(/^-\s*\*\*id\*\*:\s*`?([a-zA-Z0-9_]+)`?/i) || linha.match(/^\|\s*`?([a-zA-Z0-9_]+)`?\s*\|/);
    if (idMatch && !linha.includes('Exemplo') && !linha.includes('id_do_no') && idMatch[1] !== 'id') {
      const id = idMatch[1];
      etapas[etapaAtual]?.push(id);

      // Extrai propriedades das linhas seguintes
      let tipo: NoPlanta['tipo'] = 'narracao';
      let rota = etapaAtual === 'rotas' ? 'rota_indefinida' : 'comum';
      let objetivoDramatico = '';
      const marcasGravadas: string[] = [];
      const marcasLidas: string[] = [];
      let origem: 'canonica' | 'original' = 'canonica';
      let fonte = '';

      let j = i;
      while (j < linhas.length && (j === i || !linhas[j].trim().startsWith('- **id**:'))) {
        const sub = linhas[j].trim();
        const tipoM = sub.match(/tipo:\s*`?([a-z_]+)`?/i);
        if (tipoM && ['narracao', 'dialogo', 'hub', 'peca_de_cenario', 'acerto_de_contas'].includes(tipoM[1])) {
          tipo = tipoM[1] as NoPlanta['tipo'];
        }
        const rotaM = sub.match(/rota:\s*`?([a-zA-Z0-9_]+)`?/i);
        if (rotaM) rota = rotaM[1];

        const objM = sub.match(/objetivo(_dramatico)?:\s*(.+)$/i);
        if (objM) objetivoDramatico = objM[2].trim();

        const gravM = sub.match(/marcas_gravadas:\s*\[?(.*?)\]?$/i);
        if (gravM && gravM[1].trim()) {
          gravM[1].split(',').forEach((m) => {
            const limpa = m.replace(/[`"'\s]/g, '');
            if (limpa) marcasGravadas.push(limpa);
          });
        }

        const lidasM = sub.match(/marcas_lidas:\s*\[?(.*?)\]?$/i);
        if (lidasM && lidasM[1].trim()) {
          lidasM[1].split(',').forEach((m) => {
            const limpa = m.replace(/[`"'\s]/g, '');
            if (limpa) marcasLidas.push(limpa);
          });
        }

        const origM = sub.match(/origem:\s*`?(canonica|original)`?/i);
        if (origM) origem = origM[1] as 'canonica' | 'original';

        const fonteM = sub.match(/fonte:\s*(.+)$/i);
        if (fonteM) fonte = fonteM[1].trim();

        j++;
        if (linhas[j]?.trim().startsWith('- **id**:')) break;
        if (j - i > 15) break; // limite de busca por nó
      }

      nos.push({
        id,
        tipo,
        rota,
        objetivoDramatico,
        marcasGravadas,
        marcasLidas,
        origem,
        fonte,
      });
    }
  }

  return { nos, etapas };
}

/**
 * Valida os requisitos do diamante com rotas (§6C.1 do Plano v2.2)
 */
export function validarPlantaAto(conteudoMd: string): ResultadoPlantaLint {
  const erros: string[] = [];
  const avisos: string[] = [];

  const { nos, etapas } = analisarPlantaMarkdown(conteudoMd);

  if (nos.length === 0) {
    erros.push('Nenhum nó estruturado foi encontrado na planta.');
    return {
      valido: false,
      erros,
      avisos,
      estatisticas: {
        totalNos: 0,
        nosPorEtapa: { abertura: 0, encruzilhada: 0, rotas: {}, pecaDeCenario: 0, acertoDeContas: 0 },
        totalMarcasGravadas: 0,
        marcasLidasNoAcerto: 0,
        proporcaoExclusivaPorRota: {},
      },
    };
  }

  // 1. Abertura: 1–3 nós
  const nosAbertura = etapas.abertura.length;
  if (nosAbertura < 1 || nosAbertura > 3) {
    erros.push(`Etapa 1 (Abertura) deve ter entre 1 e 3 nós. Encontrados: ${nosAbertura}.`);
  }

  // 2. Encruzilhada: 1 nó (hub com rotas)
  const nosEncruzilhada = etapas.encruzilhada.length;
  if (nosEncruzilhada !== 1) {
    erros.push(`Etapa 2 (Encruzilhada) deve ter exatamente 1 nó decisor estrutural. Encontrados: ${nosEncruzilhada}.`);
  }

  // 3. Rotas: 2 ou 3 rotas distintas, com 3–6 nós por rota
  const nosPorRota: Record<string, number> = {};
  for (const no of nos) {
    if (no.rota !== 'comum' && no.rota !== 'indefinida') {
      nosPorRota[no.rota] = (nosPorRota[no.rota] || 0) + 1;
    }
  }

  const rotasNomes = Object.keys(nosPorRota);
  if (rotasNomes.length < 2 || rotasNomes.length > 3) {
    erros.push(`Etapa 3 (Rotas) deve ter 2 ou 3 rotas estruturais distintas. Encontradas: ${rotasNomes.length} (${rotasNomes.join(', ')}).`);
  }

  for (const [rota, qtd] of Object.entries(nosPorRota)) {
    if (qtd < 3 || qtd > 6) {
      erros.push(`Rota '${rota}' deve ter entre 3 e 6 nós exclusivos. Encontrados: ${qtd}.`);
    }
  }

  // 4. Peça de Cenário: 3–5 nós
  const nosPecaCenario = etapas.peca_de_cenario.length;
  if (nosPecaCenario < 3 || nosPecaCenario > 5) {
    erros.push(`Etapa 4 (Peça de Cenário) deve ter entre 3 e 5 nós canônicos fixos. Encontrados: ${nosPecaCenario}.`);
  }

  // 5. Acerto de Contas: 1–2 nós
  const nosAcerto = etapas.acerto_de_contas.length;
  if (nosAcerto < 1 || nosAcerto > 2) {
    erros.push(`Etapa 5 (Acerto de Contas) deve ter entre 1 e 2 nós. Encontrados: ${nosAcerto}.`);
  }

  // 6. Marcas Lidas no Acerto de Contas (deve ler pelo menos 8 marcas)
  const marcasLidasNoAcertoSet = new Set<string>();
  const nosAcertoObjs = nos.filter((n) => etapas.acerto_de_contas.includes(n.id));
  for (const no of nosAcertoObjs) {
    no.marcasLidas.forEach((m) => marcasLidasNoAcertoSet.add(m));
  }

  if (marcasLidasNoAcertoSet.size < 8) {
    avisos.push(
      `Acerto de Contas lê ${marcasLidasNoAcertoSet.size} marcas (meta do §6C.1 é ler ≥ 8 marcas acumuladas para mostrar as consequências do ato).`
    );
  }

  // 7. Checagem de nós individuais
  const totalMarcasGravadasSet = new Set<string>();
  for (const no of nos) {
    no.marcasGravadas.forEach((m) => totalMarcasGravadasSet.add(m));
    if (!no.objetivoDramatico) {
      avisos.push(`Nó '${no.id}' sem objetivo dramático explícito.`);
    }
    if (!no.fonte) {
      avisos.push(`Nó '${no.id}' sem fonte documental indicada.`);
    }
  }

  // 8. Proporção de conteúdo exclusivo (≥ 60% por rota)
  const proporcaoExclusivaPorRota: Record<string, number> = {};
  for (const rota of rotasNomes) {
    const nosExclusivos = nosPorRota[rota] || 0;
    const totalCaminho = nosAbertura + nosEncruzilhada + nosExclusivos + nosPecaCenario + nosAcerto;
    const prop = totalCaminho > 0 ? (nosExclusivos / totalCaminho) : 0;
    proporcaoExclusivaPorRota[rota] = Math.round(prop * 100);
  }

  return {
    valido: erros.length === 0,
    erros,
    avisos,
    estatisticas: {
      totalNos: nos.length,
      nosPorEtapa: {
        abertura: nosAbertura,
        encruzilhada: nosEncruzilhada,
        rotas: nosPorRota,
        pecaDeCenario: nosPecaCenario,
        acertoDeContas: nosAcerto,
      },
      totalMarcasGravadas: totalMarcasGravadasSet.size,
      marcasLidasNoAcerto: marcasLidasNoAcertoSet.size,
      proporcaoExclusivaPorRota,
    },
  };
}

// Execução CLI
const isDirectExecution =
  process.argv[1] &&
  (process.argv[1].endsWith('planta-lint.ts') || process.argv[1].endsWith('planta-lint.js')) &&
  !process.env.VITEST;

if (isDirectExecution) {
  const caminhoArquivo = process.argv[2];
  if (!caminhoArquivo) {
    console.error('Uso: npx tsx scripts/planta-lint.ts <caminho_da_planta.md>');
    process.exit(1);
  }

  const absPath = path.resolve(process.cwd(), caminhoArquivo);
  if (!fs.existsSync(absPath)) {
    console.error(`Arquivo não encontrado: ${absPath}`);
    process.exit(1);
  }

  const conteudo = fs.readFileSync(absPath, 'utf-8');
  const res = validarPlantaAto(conteudo);

  console.log(`\n=== PLANTA-LINT: ${path.basename(caminhoArquivo)} ===`);
  console.log(`Status: ${res.valido ? '✅ APROVADA' : '❌ REPROVADA'}`);
  console.log(`Total de nós planejados: ${res.estatisticas.totalNos}`);
  console.log('Distribuição por etapa:');
  console.log(`  1. Abertura: ${res.estatisticas.nosPorEtapa.abertura}`);
  console.log(`  2. Encruzilhada: ${res.estatisticas.nosPorEtapa.encruzilhada}`);
  console.log(`  3. Rotas: ${JSON.stringify(res.estatisticas.nosPorEtapa.rotas)}`);
  console.log(`  4. Peça de Cenário: ${res.estatisticas.nosPorEtapa.pecaDeCenario}`);
  console.log(`  5. Acerto de Contas: ${res.estatisticas.nosPorEtapa.acertoDeContas}`);
  console.log(`Marcas gravadas no ato: ${res.estatisticas.totalMarcasGravadas}`);
  console.log(`Marcas lidas no acerto de contas: ${res.estatisticas.marcasLidasNoAcerto}`);

  if (res.erros.length > 0) {
    console.log('\nErros encontrados:');
    res.erros.forEach((e) => console.log(`  ❌ ${e}`));
  }
  if (res.avisos.length > 0) {
    console.log('\nAvisos:');
    res.avisos.forEach((a) => console.log(`  ⚠️  ${a}`));
  }

  if (!res.valido) {
    process.exit(1);
  }
}
