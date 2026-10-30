// Copies the photos from the website that is live now (built with ChatGPT) into photos/, so the new site can be built
// from them. Run this once BEFORE you deploy the new site: afterwards the old file names are no longer served.
// Files you already have in photos/ are left alone, so you can also put your own original photos there instead.
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = fileURLToPath(new URL('..', import.meta.url));
const { photos } = JSON.parse(readFileSync(join(ROOT, 'photos.json'), 'utf8'));
const config = JSON.parse(readFileSync(join(ROOT, 'site.config.json'), 'utf8'));
const dir = join(ROOT, 'photos');
mkdirSync(dir, { recursive: true });

let got = 0, kept = 0, failed = 0;
for (const p of photos) {
  const dest = join(dir, p.file);
  if (existsSync(dest)) { kept++; continue; }
  const url = `${config.siteUrl}/images/${encodeURIComponent(p.file)}`;
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    writeFileSync(dest, Buffer.from(await res.arrayBuffer()));
    got++;
    console.log(`  ✓ ${p.file}`);
  } catch (e) {
    failed++;
    console.log(`  ✗ ${p.file} — ${e.message}. Copy this photo into photos/ yourself.`);
  }
}
console.log(`\nPhotos: ${got} downloaded, ${kept} already there, ${failed} missing.`);
if (failed) process.exitCode = 1;
