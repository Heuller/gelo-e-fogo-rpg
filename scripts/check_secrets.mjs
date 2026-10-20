import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const PATTERNS = [
  { name: 'Google API Key', regex: /AIzaSy[A-Za-z0-9_-]{33}/ },
  { name: 'Supabase Secret Key', regex: /sb_secret_[A-Za-z0-9_-]{20,}/ },
  { name: 'Private Key', regex: /-----BEGIN [A-Z ]*PRIVATE KEY-----/ },
  { name: 'GitHub Token', regex: /gh[pousr]_[A-Za-z0-9_]{36,}/ },
];

console.log('🔍 Executando varredura de segredos no repositório...');

let trackedFiles = [];
try {
  const output = execSync('git ls-files', { encoding: 'utf8' });
  trackedFiles = output.split('\n').map(f => f.trim()).filter(Boolean);
} catch (err) {
  console.error('Erro ao listar arquivos do git:', err.message);
  process.exit(1);
}

let violations = 0;

for (const file of trackedFiles) {
  if (file.endsWith('.png') || file.endsWith('.jpg') || file.endsWith('.ico') || file.includes('package-lock.json')) {
    continue;
  }
  if (!fs.existsSync(file)) continue;

  const content = fs.readFileSync(file, 'utf8');
  for (const { name, regex } of PATTERNS) {
    if (regex.test(content)) {
      console.error(`❌ ALERTA DE SEGURANÇA: ${name} detectado em '${file}'!`);
      violations++;
    }
  }
}

if (violations > 0) {
  console.error(`\n🚨 Falha na verificação: ${violations} segredo(s) encontrado(s) em arquivos rastreados!`);
  process.exit(1);
} else {
  console.log('✅ Nenhum segredo detectado nos arquivos rastreados pelo Git.');
  process.exit(0);
}
