import { chromium } from '/opt/node22/lib/node_modules/playwright/index.mjs';
import { mkdirSync } from 'fs';

mkdirSync('/tmp/screenshots', { recursive: true });

const browser = await chromium.launch({
  args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
});
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await ctx.newPage();

const shots = [
  { url: 'http://localhost:3000',            file: 'home.png' },
  { url: 'http://localhost:3000/products',   file: 'products.png' },
  { url: 'http://localhost:3000/contact',    file: 'contact.png' },
  { url: 'http://localhost:3001',            file: 'admin-dashboard.png' },
  { url: 'http://localhost:3001/products',   file: 'admin-products.png' },
  { url: 'http://localhost:3001/categories', file: 'admin-categories.png' },
];

for (const s of shots) {
  await page.goto(s.url, { waitUntil: 'networkidle', timeout: 20000 }).catch(() => page.goto(s.url, { timeout: 10000 }).catch(() => {}));
  await page.waitForTimeout(1500);
  await page.screenshot({ path: `/tmp/screenshots/${s.file}`, fullPage: false });
  console.log('✓', s.file);
}

await browser.close();
console.log('All done');
