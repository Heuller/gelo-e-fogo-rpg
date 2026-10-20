// Script de Smoke Test Pós-Deploy (Pode rodar local ou contra a URL da Vercel)
const targetUrl = process.env.TARGET_URL || 'http://localhost:3000';

console.log(`🔥 Executando Smoke Test contra: ${targetUrl}...`);

async function runSmokeTests() {
  let passed = 0;
  let failed = 0;

  // 1. Testar Rota de Saúde (/api/health)
  try {
    const res = await fetch(`${targetUrl}/api/health`);
    if (res.status === 200) {
      const data = await res.json();
      if (data.status === 'healthy') {
        console.log('✅ 1. Rota /api/health retornou 200 OK e status healthy.');
        passed++;
      } else {
        console.error('❌ 1. Rota /api/health retornou payload inesperado:', data);
        failed++;
      }
    } else {
      console.error(`❌ 1. Rota /api/health retornou status HTTP ${res.status}`);
      failed++;
    }
  } catch (err) {
    console.error('❌ 1. Falha de conexão com /api/health:', err.message);
    failed++;
  }

  // 2. Testar Bloqueio de Acesso Anônimo em /api/game/turn (Deve retornar 401 ou 403)
  try {
    const res = await fetch(`${targetUrl}/api/game/turn`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        nodeId: 'j1_a1_mesa_pintada',
      }),
    });

    if (res.status === 401 || res.status === 403) {
      console.log(`✅ 2. Rota protegida /api/game/turn bloqueou acesso anônimo com status ${res.status}.`);
      passed++;
    } else {
      console.error(`❌ 2. FALHA DE SEGURANÇA: /api/game/turn permitiu anônimo com status ${res.status}!`);
      failed++;
    }
  } catch (err) {
    console.error('❌ 2. Falha ao testar segurança de /api/game/turn:', err.message);
    failed++;
  }

  console.log('--------------------------------------------------');
  console.log(`Resultado do Smoke Test: ${passed} passaram, ${failed} falharam.`);
  if (failed > 0) {
    process.exit(1);
  } else {
    process.exit(0);
  }
}

runSmokeTests();
