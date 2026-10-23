import fs from 'node:fs';
import path from 'node:path';

const isWrite = process.argv.includes('--write');

function walkDir(dir, callback) {
  if (!fs.existsSync(dir)) return;
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      walkDir(fullPath, callback);
    } else {
      callback(fullPath);
    }
  }
}

const hexToToken = {
  '#c5a059': '[var(--ouro)]',
  '#dfc27d': '[var(--ouro-claro)]',
  '#9b7a35': '[var(--ouro-escuro)]',
  '#171412': '[var(--pergaminho-2)]',
  '#1c1815': '[var(--pergaminho-3)]',
  '#12100e': '[var(--pergaminho-1)]',
  '#221d19': '[var(--pergaminho-4)]',
  '#2d2620': '[var(--borda)]',
  '#e6dec8': '[var(--tinta)]',
  '#a69e89': '[var(--tinta-suave)]',
  '#8f8774': '[var(--tinta-fraca)]',
  '#8b1e1e': '[var(--carmim)]',
  '#a82e2e': '[var(--carmim-brilho)]',
  '#0d0b0a': '[var(--pagina)]',
  '#0a0a0c': '[var(--pagina)]',
};

const targetDirs = ['src/components/ui', 'src/components/game', 'src/app'];
let totalSubstituicoes = 0;
let arquivosAlterados = 0;

for (const dir of targetDirs) {
  walkDir(dir, (file) => {
    // Não altera SceneIllustration (SVGs autorais) nem arquivos de estilos
    const norm = file.replace(/\\/g, '/');
    if (!/\.(tsx|jsx)$/.test(norm)) return;
    if (norm.includes('SceneIllustration.tsx')) return;

    let content = fs.readFileSync(file, 'utf8');
    let alterouArquivo = false;

    // 1. Substituição de cores hexadecimais
    for (const [hex, token] of Object.entries(hexToToken)) {
      const regex = new RegExp(hex, 'gi');
      const matches = content.match(regex);
      if (matches) {
        totalSubstituicoes += matches.length;
        content = content.replace(regex, token);
        alterouArquivo = true;
      }
    }

    // 2. Remoção de classes fantasmas
    if (content.includes('bg-radial from-')) {
      content = content.replace(/bg-radial from-[^ ]+ to-[^ ]+/g, 'fundo-radial');
      alterouArquivo = true;
    }

    // 3. Tipografias pequenas (9px, 10px, 11px) -> text-xs
    if (/text-\[(9|10|11)px\]/.test(content)) {
      content = content.replace(/text-\[(9|10|11)px\]/g, 'text-xs');
      alterouArquivo = true;
    }

    // 4. Cursor pointer redundante
    if (content.includes('cursor-pointer')) {
      content = content.replace(/\s*cursor-pointer/g, '');
      alterouArquivo = true;
    }

    if (alterouArquivo) {
      arquivosAlterados++;
      if (isWrite) {
        fs.writeFileSync(file, content, 'utf8');
      }
    }
  });
}

console.log(
  `Modo: ${isWrite ? 'ESCRITA (--write)' : 'DRY-RUN (Simulação)'}\nArquivos afetados: ${arquivosAlterados}\nTotal de substituições de hex: ${totalSubstituicoes}`
);
