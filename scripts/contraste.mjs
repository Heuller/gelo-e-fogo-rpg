import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function hexToRgb(hex) {
  const clean = hex.replace('#', '').trim();
  const num = parseInt(clean, 16);
  if (clean.length === 3) {
    const r = (num >> 8) & 0xf;
    const g = (num >> 4) & 0xf;
    const b = num & 0xf;
    return [(r << 4) | r, (g << 4) | g, (b << 4) | b];
  }
  return [(num >> 16) & 255, (num >> 8) & 255, num & 255];
}

function srgbToLinear(c) {
  const v = c / 255;
  return v <= 0.04045 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
}

function relativeLuminance([r, g, b]) {
  const R = srgbToLinear(r);
  const G = srgbToLinear(g);
  const B = srgbToLinear(b);
  return 0.2126 * R + 0.7152 * G + 0.0722 * B;
}

export function contrastRatio(hex1, hex2) {
  const l1 = relativeLuminance(hexToRgb(hex1));
  const l2 = relativeLuminance(hexToRgb(hex2));
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

const paresPath = path.join(__dirname, 'contraste.pares.json');
if (!fs.existsSync(paresPath)) {
  console.error(`Erro: Arquivo não encontrado: ${paresPath}`);
  process.exit(1);
}

const pares = JSON.parse(fs.readFileSync(paresPath, 'utf8'));

console.log('='.repeat(80));
console.log(' Auditoria de Contraste W3C WCAG 2.2 AA');
console.log('='.repeat(80));

let falhas = 0;
console.log(
  `| ${'Par'.padEnd(45)} | ${'Texto'.padEnd(7)} | ${'Fundo'.padEnd(7)} | ${'Razão'.padEnd(7)} | ${'Mínimo'.padEnd(6)} | Status |`
);
console.log(`|${'-'.repeat(47)}|${'-'.repeat(9)}|${'-'.repeat(9)}|${'-'.repeat(9)}|${'-'.repeat(8)}|${'-'.repeat(8)}|`);

for (const par of pares) {
  const ratio = contrastRatio(par.texto, par.fundo);
  const aprovado = ratio >= par.minimo;
  if (!aprovado) falhas++;

  const status = aprovado ? '✅ OK  ' : '❌ FALHA';
  console.log(
    `| ${par.nome.padEnd(45)} | ${par.texto.padEnd(7)} | ${par.fundo.padEnd(7)} | ${ratio
      .toFixed(2)
      .padEnd(7)} | ${par.minimo.toFixed(1).padEnd(6)} | ${status} |`
  );
}

console.log('='.repeat(80));

if (falhas > 0) {
  console.error(`❌ ${falhas} par(es) de contraste violam o padrão mínimo!`);
  process.exit(1);
} else {
  console.log(`🎉 Todos os ${pares.length} pares de contraste foram aprovados com sucesso!`);
  process.exit(0);
}
