import fs from 'fs';
import path from 'path';

const csvPath = path.resolve(process.cwd(), 'docs/auditoria-canone/planilha_auditoria_amostragem.csv');

if (!fs.existsSync(csvPath)) {
  console.error(`Erro: Planilha ${csvPath} não encontrada. Execute 'node scripts/preparar_auditoria_canone.mjs' primeiro.`);
  process.exit(1);
}

const lines = fs.readFileSync(csvPath, 'utf8').split('\n').filter(Boolean);
const headers = lines[0].split(',');

const estatisticas = {
  total: 0,
  confirmado: 0,
  divergente: 0,
  sem_fonte: 0,
  interpretacao: 0,
  pendente: 0,
  porJornada: {
    j1_: { total: 0, divergente: 0 },
    j2_: { total: 0, divergente: 0 },
    j3_: { total: 0, divergente: 0 },
  },
};

const divergencias = [];

for (let i = 1; i < lines.length; i++) {
  const line = lines[i];
  // Parse simples considerando aspas
  const cols = line.match(/(?:^|,)("(?:[^"]|"")*"|[^,]*)/g)?.map(c => c.replace(/^,?"?|"$/g, '').trim()) || [];
  if (cols.length < 8) continue;

  const [id, tipo, jornada, titulo, afirmacao, fonte, statusCorpus, veredito, observacoes] = cols;
  estatisticas.total++;

  const ver = (veredito || 'pendente').toLowerCase();
  if (ver === 'confirmado') estatisticas.confirmado++;
  else if (ver === 'divergente') {
    estatisticas.divergente++;
    divergencias.push({ id, tipo, jornada, titulo, fonte, observacoes });
  } else if (ver === 'sem fonte' || ver === 'sem_fonte') estatisticas.sem_fonte++;
  else if (ver.includes('interpretacao') || ver.includes('interpretação')) estatisticas.interpretacao++;
  else estatisticas.pendente++;

  if (jornada in estatisticas.porJornada) {
    estatisticas.porJornada[jornada].total++;
    if (ver === 'divergente') estatisticas.porJornada[jornada].divergente++;
  }
}

console.log('================================================================');
console.log('📊 RELATÓRIO DE AUDITORIA DE CANONICIDADE ("Fonte por Fato")');
console.log('================================================================');
console.log(`Total de Itens Amostrados: ${estatisticas.total}`);
console.log(`- Confirmados:     ${estatisticas.confirmado}`);
console.log(`- Interpretação:   ${estatisticas.interpretacao}`);
console.log(`- Divergentes:     ${estatisticas.divergente}`);
console.log(`- Sem Fonte:       ${estatisticas.sem_fonte}`);
console.log(`- Pendentes:       ${estatisticas.pendente}`);
console.log('----------------------------------------------------------------');

for (const [jornada, dados] of Object.entries(estatisticas.porJornada)) {
  const taxa = dados.total > 0 ? ((dados.divergente / dados.total) * 100).toFixed(1) : '0.0';
  const statusAlerta = parseFloat(taxa) > 5.0 ? '🔴 ALERTA (> 5% de divergência)' : '🟢 CONFORME (<= 5%)';
  console.log(`Jornada ${jornada.replace('_', '').toUpperCase()}: ${dados.divergente}/${dados.total} divergentes (${taxa}%) — ${statusAlerta}`);
}

console.log('================================================================');
if (divergencias.length > 0) {
  console.log('⚠️ DIVERGÊNCIAS PRIORITÁRIAS IDENTIFICADAS:');
  divergencias.forEach((d, idx) => {
    console.log(`${idx + 1}. [${d.jornada}] ${d.id} (${d.titulo}) — Fonte: ${d.fonte} | Obs: ${d.observacoes || 'Sem nota'}`);
  });
} else {
  console.log('Nenhuma divergência registrada até o momento.');
}
