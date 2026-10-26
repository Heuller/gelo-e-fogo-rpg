import fs from 'fs';
import path from 'path';

export interface InfracaoLinguistica {
  arquivo: string;
  linha: number;
  tipo: 'VOS_VOSSO' | 'SOR';
  trecho: string;
}

export interface ResultadoAuditoria {
  totalInfracoes: number;
  infracoesVos: number;
  infracoesSor: number;
  detalhes: InfracaoLinguistica[];
}

const PADRAO_VOS = /\b(v[oó]s|vosso|vossa|vossos|vossas|entrastes|encontrais|possu[íi]s|fostes|vistes|ouvistes)\b/i;
const PADRAO_SOR = /\bSor\b/;

function escanearDiretorio(dir: string, extensoes: string[]): string[] {
  const arquivos: string[] = [];
  const itens = fs.readdirSync(dir, { withFileTypes: true });

  for (const item of itens) {
    const cheio = path.join(dir, item.name);
    if (item.isDirectory()) {
      if (item.name !== 'node_modules' && item.name !== '.next' && item.name !== '__tests__') {
        arquivos.push(...escanearDiretorio(cheio, extensoes));
      }
    } else if (
      extensoes.some((ext) => item.name.endsWith(ext)) &&
      !item.name.includes('.test.') &&
      !item.name.includes('.spec.')
    ) {
      arquivos.push(cheio);
    }
  }

  return arquivos;
}

export function executarAuditoriaLinguistica(caminhoRaiz = process.cwd()): ResultadoAuditoria {
  const pastaSrc = path.join(caminhoRaiz, 'src');
  const arquivos = escanearDiretorio(pastaSrc, ['.ts', '.tsx']);
  const detalhes: InfracaoLinguistica[] = [];

  for (const arq of arquivos) {
    const conteudo = fs.readFileSync(arq, 'utf8');
    const linhas = conteudo.split('\n');

    linhas.forEach((linhaTexto, idx) => {
      if (PADRAO_VOS.test(linhaTexto)) {
        detalhes.push({
          arquivo: path.relative(caminhoRaiz, arq),
          linha: idx + 1,
          tipo: 'VOS_VOSSO',
          trecho: linhaTexto.trim(),
        });
      }

      if (PADRAO_SOR.test(linhaTexto)) {
        detalhes.push({
          arquivo: path.relative(caminhoRaiz, arq),
          linha: idx + 1,
          tipo: 'SOR',
          trecho: linhaTexto.trim(),
        });
      }
    });
  }

  const infracoesVos = detalhes.filter((d) => d.tipo === 'VOS_VOSSO').length;
  const infracoesSor = detalhes.filter((d) => d.tipo === 'SOR').length;

  return {
    totalInfracoes: detalhes.length,
    infracoesVos,
    infracoesSor,
    detalhes,
  };
}

if (process.argv[1] && process.argv[1].endsWith('ptbr-lint.ts')) {
  console.log('================================================================');
  console.log(' 📜 LINTER LINGUÍSTICO PT-BR — CRÔNICAS DE SANGUE E GELO');
  console.log('================================================================');

  const resultado = executarAuditoriaLinguistica();
  console.log(`\nTotal de Infracões: ${resultado.totalInfracoes}`);
  console.log(`• Vós/Vosso: ${resultado.infracoesVos}`);
  console.log(`• Sor (deve ser Ser): ${resultado.infracoesSor}`);

  if (resultado.totalInfracoes > 0) {
    console.log('\nPrimeiras infrações detectadas:');
    resultado.detalhes.slice(0, 15).forEach((inf) => {
      console.log(`  [${inf.tipo}] ${inf.arquivo}:${inf.linha} -> "${inf.trecho.slice(0, 80)}"`);
    });
    process.exit(1);
  } else {
    console.log('\n🎉 Zero infrações linguísticas encontradas! O texto está 100% no padrão PT-BR.');
    process.exit(0);
  }
}
