// Checks the built site before it goes live. Fails (exit 1) on anything that hurts search or breaks a page:
// title and description length, one H1, canonical, structured data, image names / alt text / sizes, broken links,
// the sitemap and robots.txt. Run: npm test
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const DIST = fileURLToPath(new URL('../dist/', import.meta.url));
const cfg = JSON.parse(readFileSync(new URL('../site.config.json', import.meta.url), 'utf8'));
const BASE = cfg.siteUrl.replace(/\/$/, '');
const problems = [];
const warn = [];
const bad = (page, msg) => problems.push(`${page}: ${msg}`);

const pages = [];
(function walk(dir) {
  for (const f of readdirSync(dir)) {
    const p = join(dir, f);
    if (statSync(p).isDirectory()) walk(p);
    else if (f === 'index.html') pages.push(p);
  }
})(DIST);

const sitemap = readFileSync(join(DIST, 'sitemap.xml'), 'utf8');
const titles = new Map();
const descs = new Map();
const KEYWORDS = /wayanad|mananthavady/i;

for (const file of pages) {
  const html = readFileSync(file, 'utf8');
  const path = '/' + file.slice(DIST.length).replace(/\\/g, '/').replace(/index\.html$/, '');
  const one = (re) => (html.match(re) || [])[1];
  const title = (one(/<title>([^<]*)<\/title>/) || '').replace(/&amp;/g, '&');
  const desc = one(/<meta name="description" content="([^"]*)"/);
  if (!title) bad(path, 'no <title>'); else {
    if (title.length > 65) bad(path, `title is ${title.length} characters (keep it under 65 so Google shows it whole)`);
    if (!KEYWORDS.test(title)) bad(path, 'title does not mention Wayanad or Mananthavady');
    if (titles.has(title)) bad(path, `same title as ${titles.get(title)}`); titles.set(title, path);
  }
  if (!desc) bad(path, 'no meta description'); else {
    if (desc.length < 110 || desc.length > 165) bad(path, `description is ${desc.length} characters (aim for 110–165)`);
    if (descs.has(desc)) bad(path, `same description as ${descs.get(desc)}`); descs.set(desc, path);
  }
  const h1s = html.match(/<h1[\s>]/g) || [];
  if (h1s.length !== 1) bad(path, `${h1s.length} <h1> headings (should be exactly one)`);
  const h1 = one(/<h1[^>]*>([\s\S]*?)<\/h1>/);
  if (h1 && !KEYWORDS.test(h1.replace(/<[^>]+>/g, ''))) bad(path, 'the H1 does not mention Wayanad or Mananthavady');
  const canon = one(/<link rel="canonical" href="([^"]+)"/);
  if (canon !== BASE + path) bad(path, `canonical is ${canon}, expected ${BASE + path}`);
  if (!html.includes('lang="en-IN"')) bad(path, 'missing lang="en-IN"');
  if (!/<meta property="og:image" content="https:\/\/[^"]+\.jpg"/.test(html)) bad(path, 'missing share image (og:image)');
  // Structured data must be valid JSON with a Resort in it.
  const ld = one(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
  try {
    const data = JSON.parse(ld);
    const resort = data['@graph'].find((x) => x['@type'] === 'Resort');
    if (!resort) bad(path, 'structured data has no Resort');
    else if (!resort.address?.addressLocality) bad(path, 'Resort has no address locality');
  } catch (e) { bad(path, `structured data is not valid JSON (${e.message})`); }
  // Images: alt text, width/height (no layout jumps), descriptive file names, the file exists.
  for (const tag of html.match(/<img\b[^>]*>/g) || []) {
    const src = (tag.match(/\ssrc="([^"]+)"/) || [])[1];
    const alt = (tag.match(/\salt="([^"]*)"/) || [])[1];
    if (!alt || alt.length < 8) bad(path, `image ${src} has no useful alt text`);
    if (!/\swidth="\d+"/.test(tag) || !/\sheight="\d+"/.test(tag)) bad(path, `image ${src} has no width/height`);
    if (!src || !existsSync(join(DIST, src))) bad(path, `image ${src} is missing from dist/`);
    if (src && /[A-F0-9]{8}-[A-F0-9]{4}|IMG_\d+/i.test(src)) bad(path, `image ${src} still has a camera file name`);
    for (const s of (tag.match(/srcset="([^"]+)"/) || [, ''])[1].split(',').map((x) => x.trim().split(' ')[0]).filter(Boolean)) {
      if (!existsSync(join(DIST, s))) bad(path, `srcset image ${s} is missing`);
    }
  }
  // Internal links must lead somewhere.
  for (const [, href] of html.matchAll(/href="(\/[^"#?]*)/g)) {
    const target = href.endsWith('/') ? join(DIST, href, 'index.html') : join(DIST, href);
    if (!existsSync(target)) bad(path, `link to ${href} leads nowhere`);
  }
  if (!sitemap.includes(`<loc>${BASE}${path}</loc>`)) bad(path, 'not in sitemap.xml');
  // Wording: Nilara Hills is a boutique resort.
  if (/nature resort/i.test(html)) bad(path, 'says "nature resort" — Nilara Hills is a boutique resort');
  if (/<meta name="robots" content="noindex/.test(html)) bad(path, 'is a draft preview (noindex) — rebuild without --drafts before deploying');
  // Blog posts: the on-page checks for an informational page (on-page optimizer, blog branch).
  if (/^\/blog\/[^/]+\/$/.test(path)) {
    const body = one(/<div class="post-body">([\s\S]*?)<\/div>\s*(?:<section class="post-faq"|<section class="post-sources")/) || '';
    if (!body) bad(path, 'post body not found');
    if (/\[ASHWIN-LINE\]|TODO-CONFIRM|class="todo"/.test(html)) bad(path, 'a placeholder or TODO-CONFIRM is still on the live page');
    try {
      const g = JSON.parse(one(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/))['@graph'];
      const post = g.find((x) => x['@type'] === 'BlogPosting');
      if (!post?.datePublished || !post.headline) bad(path, 'no BlogPosting data with headline and datePublished');
      const faq = g.find((x) => x['@type'] === 'FAQPage');
      if (faq) for (const q of faq.mainEntity) if (!html.includes(`<h3>${q.name}</h3>`)) bad(path, `FAQ data question not visible on the page: ${q.name}`);
    } catch { /* reported above */ }
    for (const [, h2] of body.matchAll(/<h2[^>]*>([\s\S]*?)<\/h2>/g)) {
      if (!/\?\s*$/.test(h2.replace(/<[^>]+>/g, '').trim())) bad(path, `heading is not a question a traveller would search: "${h2}"`);
    }
    if (/<h2[^>]*>[^<]*<\/h2>\s*(?:<h[23][\s>]|$)/.test(body)) bad(path, 'a heading has no text under it');
    const internal = [...body.matchAll(/href="\/[^"]*"/g)].length;
    if (internal < 2) bad(path, `only ${internal} internal link(s) in the post (need 2 or more)`);
    if (!/href="https:\/\/(?!nilarahills\.com)[^"]+"/.test(body)) bad(path, 'no inline link to a source');
    for (const k of ['cottageAc', 'cottageNonAc', 'aFrame']) {
      const v = `₹${Number(cfg.rates[k]).toLocaleString('en-IN')}`;
      if (body.includes(v)) bad(path, `quotes the resort tariff (${v}) — keep tariffs on the Cottages page`);
    }
  }
  const words = html.replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>/g, ' ').replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length;
  if (words < 300) warn.push(`${path}: only ${words} words — more useful text helps it rank`);
}

const robots = readFileSync(join(DIST, 'robots.txt'), 'utf8');
if (!robots.includes(`Sitemap: ${BASE}/sitemap.xml`)) problems.push('robots.txt does not point to the sitemap');
if (/Disallow:\s*\/\s*$/m.test(robots.split('User-agent: *')[1] || '')) problems.push('robots.txt blocks every search engine');
if (!existsSync(join(DIST, '404.html'))) problems.push('no 404 page');

console.log(`Checked ${pages.length} pages.`);
for (const w of warn) console.log(`  note  ${w}`);
if (problems.length) {
  console.log(`\n${problems.length} problem(s):`);
  for (const p of problems) console.log(`  ✗ ${p}`);
  process.exit(1);
}
console.log('All SEO checks passed.');
