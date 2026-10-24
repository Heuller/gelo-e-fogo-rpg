import { chromium } from 'playwright';
import AxeBuilder from '@axe-core/playwright';
import fs from 'fs';
import path from 'path';

const PORT = 3099;
const BASE_URL = `http://localhost:${PORT}`;

const VIEWPORTS = [
  { name: 'desktop', width: 1440, height: 900 },
  { name: 'mobile', width: 390, height: 844 },
];

const ROTAS = [
  { nome: '01_home', path: '/' },
  { nome: '02_login', path: '/login' },
  { nome: '03_painel', path: '/painel' },
  { nome: '04_dev_ui', path: '/dev/ui' },
  { nome: '05_jogar_j1', path: '/jogar?jornada=conquista_aegon' },
  { nome: '06_jogar_j4', path: '/jogar?jornada=patrulha_muralha' },
  { nome: '07_jogar_j5', path: '/jogar?jornada=rebeliao_robert' },
];

async function main() {
  console.log('Iniciando captura de telas e auditoria de acessibilidade...');

  const browser = await chromium.launch({ headless: true });
  const todasViolacoesAxe: Record<
    string,
    {
      url: string;
      violacoesCount: number;
      violacoes: Array<{
        id: string;
        impact?: string | null;
        description: string;
        help: string;
        helpUrl: string;
        nodesCount: number;
      }>;
    }
  > = {};

  for (const vp of VIEWPORTS) {
    const dir = path.resolve(process.cwd(), `docs/capturas/${vp.name}`);
    fs.mkdirSync(dir, { recursive: true });

    const context = await browser.newContext({
      viewport: { width: vp.width, height: vp.height },
      deviceScaleFactor: 1,
    });

    const page = await context.newPage();

    for (const rota of ROTAS) {
      const url = `${BASE_URL}${rota.path}`;
      try {
        console.log(`[${vp.name}] Navegando para ${rota.nome} (${url})...`);
        await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 15000 });
        await page.waitForTimeout(1000); // estabilização visual

        const screenshotPath = path.join(dir, `${rota.nome}.png`);
        await page.screenshot({ path: screenshotPath, fullPage: false });
        console.log(`  ✓ Captura salva: ${screenshotPath}`);

        // Auditoria Axe apenas no desktop para evitar duplicatas de regras
        if (vp.name === 'desktop') {
          try {
            const axeResults = await new AxeBuilder({ page }).analyze();
            todasViolacoesAxe[rota.nome] = {
              url: rota.path,
              violacoesCount: axeResults.violations.length,
              violacoes: axeResults.violations.map((v) => ({
                id: v.id,
                impact: v.impact,
                description: v.description,
                help: v.help,
                helpUrl: v.helpUrl,
                nodesCount: v.nodes.length,
              })),
            };
            console.log(`  ✓ Axe audit: ${axeResults.violations.length} violações`);
          } catch (axeErr: unknown) {
            const msg = axeErr instanceof Error ? axeErr.message : String(axeErr);
            console.warn(`  ⚠️ Falha no Axe para ${rota.nome}:`, msg);
          }
        }
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : String(err);
        console.error(`  ❌ Erro ao capturar ${rota.nome}:`, msg);
      }
    }

    await context.close();
  }

  await browser.close();

  const axeOutPath = path.resolve(process.cwd(), 'docs/capturas/axe.json');
  fs.writeFileSync(axeOutPath, JSON.stringify(todasViolacoesAxe, null, 2), 'utf8');
  console.log(`✓ Relatório Axe salvo em: ${axeOutPath}`);
}

main().catch((err) => {
  console.error('Erro na execução de capturas:', err);
  process.exit(1);
});
