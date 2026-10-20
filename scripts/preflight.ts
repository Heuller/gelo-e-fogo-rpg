import fs from 'fs';
import path from 'path';

console.log('🚀 Executando Verificação Pré-Voo (Preflight Check)...');

let falhas = 0;

function asserir(condicao: boolean, sucesso: string, erro: string) {
  if (condicao) {
    console.log(`✅ [OK] ${sucesso}`);
  } else {
    console.error(`❌ [FALHA] ${erro}`);
    falhas++;
  }
}

// 1. Verificar Anti-indexação (robots.txt)
const robotsPath = path.resolve(process.cwd(), 'public/robots.txt');
asserir(
  fs.existsSync(robotsPath) && fs.readFileSync(robotsPath, 'utf8').includes('Disallow: /'),
  'Anti-indexação: public/robots.txt com Disallow: / presente.',
  'public/robots.txt ausente ou não bloqueia robôs.'
);

// 2. Verificar Headers de Segurança em next.config.mjs
const nextConfigPath = path.resolve(process.cwd(), 'next.config.mjs');
const nextConfigContent = fs.readFileSync(nextConfigPath, 'utf8');
asserir(
  nextConfigContent.includes('X-Robots-Tag') &&
    nextConfigContent.includes('X-Frame-Options') &&
    nextConfigContent.includes('Content-Security-Policy'),
  'Headers de Segurança: CSP, X-Robots-Tag e X-Frame-Options configurados.',
  'next.config.mjs não possui os headers de segurança obrigatórios.'
);

// 3. Verificar Ausência de origem/ e corpus_md/ no build .next
const nextDir = path.resolve(process.cwd(), '.next');
if (fs.existsSync(nextDir)) {
  const containsCorpus = fs.readdirSync(nextDir, { recursive: true }).some((f) =>
    typeof f === 'string' && (f.includes('origem') || f.includes('corpus_md'))
  );
  asserir(
    !containsCorpus,
    'Higiene de Build: .next/ não contém arquivos pesados de origem/ ou corpus_md/.',
    '.next/ contém referências indesejadas a arquivos do corpus.'
  );
} else {
  console.log('ℹ️ Diretório .next ainda não gerado. Execute npm run build para auditar o bundle.');
}

// 4. Verificar Teto de Custo e Circuit Breaker de IA configurado
const geminiMasterPath = path.resolve(process.cwd(), 'src/server/ai/geminiMaster.ts');
const geminiMasterContent = fs.readFileSync(geminiMasterPath, 'utf8');
asserir(
  geminiMasterContent.includes('verificarCircuitoIA') && geminiMasterContent.includes('MAX_AI_DAILY_CALLS'),
  'Proteção de Custos: Circuit breaker de IA ativo com cota diária.',
  'src/server/ai/geminiMaster.ts não possui circuit breaker de IA.'
);

// 5. Verificar Migrações do Supabase com RLS
const migracaoPath = path.resolve(process.cwd(), 'supabase/migrations/20261019_save_slots_and_turn_events.sql');
const migracaoContent = fs.readFileSync(migracaoPath, 'utf8');
asserir(
  migracaoContent.includes('ENABLE ROW LEVEL SECURITY') &&
    migracaoContent.includes('slot_number BETWEEN 1 AND 3'),
  'Segurança de Banco: RLS ativo e restrição de no máximo 3 slots por jornada.',
  'Migração de banco não contém RLS ou constraint de 3 slots.'
);

// 6. Verificar Proteção de requireOwner
const requireOwnerPath = path.resolve(process.cwd(), 'src/server/auth/requireOwner.ts');
const requireOwnerContent = fs.readFileSync(requireOwnerPath, 'utf8');
asserir(
  !requireOwnerContent.includes('d5f86911-0f14-497d-9a9c-7258a2eb18cd') ||
    requireOwnerContent.includes('TEST_AUTH_SCENARIO'),
  'Autenticação Blindada: requireOwner não possui fallback permissivo incondicional.',
  'requireOwner.ts ainda concede acesso anônimo sem credenciais.'
);

console.log('------------------------------------------------------------');
if (falhas === 0) {
  console.log('🎉 PREFLIGHT APROVADO! Todos os critérios de segurança e higiene estão conformes.');
  process.exit(0);
} else {
  console.error(`🚨 PREFLIGHT REPROVADO com ${falhas} inconformidade(s).`);
  process.exit(1);
}
