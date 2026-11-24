import { cp, mkdir } from 'node:fs/promises';
await import('./check.mjs');
await mkdir('dist', { recursive: true });
for (const file of ['index.html', 'assets', 'robots.txt', 'sitemap.xml']) await cp(file, `dist/${file}`, { recursive: true });
console.log('Sitio estático listo en dist/. No se han modificado las referencias.');
