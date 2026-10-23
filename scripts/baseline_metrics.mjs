import fs from 'node:fs';
import path from 'node:path';

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

const hexColors = new Set();
let hexCount = 0;
let textSmallCount = 0;
let anyCount = 0;
let cursorPointerCount = 0;
let focusVisibleCount = 0;

const targetDirs = ['src/app', 'src/components', 'src/server', 'src/lib'];

for (const dir of targetDirs) {
  walkDir(dir, (file) => {
    if (!/\.(tsx?|jsx?|css)$/.test(file)) return;
    const content = fs.readFileSync(file, 'utf8');

    const normalized = file.replace(/\\/g, '/');
    // Hex colors in app/components
    if (normalized.startsWith('src/app') || normalized.startsWith('src/components')) {
      const hexMatches = content.match(/#[0-9a-fA-F]{6}/g);
      if (hexMatches) {
        hexCount += hexMatches.length;
        hexMatches.forEach((h) => hexColors.add(h.toLowerCase()));
      }
    }

    // text-9/10/11px
    const smallMatches = content.match(/text-\[(9|10|11)px\]/g);
    if (smallMatches) textSmallCount += smallMatches.length;

    // any occurrences
    const anyMatches = content.match(/(:\s*any\b|<any>)/g);
    if (anyMatches) anyCount += anyMatches.length;

    // cursor-pointer
    const cpMatches = content.match(/cursor-pointer/g);
    if (cpMatches) cursorPointerCount += cpMatches.length;

    // focus-visible
    const fvMatches = content.match(/focus-visible/g);
    if (fvMatches) focusVisibleCount += fvMatches.length;
  });
}

// Check unused deps
const unusedDeps = ['framer-motion', 'zustand', 'howler', '@google/generative-ai'];
const depCounts = {};
for (const dep of unusedDeps) {
  let count = 0;
  walkDir('src', (file) => {
    if (!/\.(tsx?|jsx?)$/.test(file)) return;
    const content = fs.readFileSync(file, 'utf8');
    if (content.includes(`'${dep}'`) || content.includes(`"${dep}"`)) {
      count++;
    }
  });
  depCounts[dep] = count;
}

console.log(JSON.stringify({
  hexDistintos: hexColors.size,
  hexOcorrencias: hexCount,
  textPequenos: textSmallCount,
  anyCount,
  cursorPointerCount,
  focusVisibleCount,
  depCounts,
}, null, 2));
