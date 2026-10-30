// Builds the website into dist/: one HTML page per entry in src/content.mjs, the photos as fast WebP files with
// search-friendly names, Google's structured data, sitemap.xml (with images) and robots.txt.
//   npm run build          build dist/
//   npm run build -- --check   build and fail if anything a release needs is missing
import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';
import { NAV, FAQ, PAGES, time12 } from '../src/content.mjs';

const ROOT = fileURLToPath(new URL('..', import.meta.url));
const DIST = join(ROOT, 'dist');
const cfg = JSON.parse(readFileSync(join(ROOT, 'site.config.json'), 'utf8'));
const { photos } = JSON.parse(readFileSync(join(ROOT, 'photos.json'), 'utf8'));
const strict = process.argv.includes('--check');
const BASE = cfg.siteUrl.replace(/\/$/, '');
const WIDTHS = [480, 960, 1600];

const esc = (s) => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const abs = (p) => BASE + p;

// ── What is missing from site.config.json ──────────────────────────────────────────────────────────────────────────
const missing = [];
if (!cfg.phone) missing.push('phone');
if (!cfg.address.street) missing.push('address.street');
if (!cfg.address.postalCode) missing.push('address.postalCode');
if (!cfg.geo.lat || !cfg.geo.lng) missing.push('geo.lat / geo.lng');
if (!cfg.mapsUrl) missing.push('mapsUrl');

// ── Photos: resize, convert to WebP, give them descriptive names ───────────────────────────────────────────────────
rmSync(DIST, { recursive: true, force: true });
mkdirSync(join(DIST, 'images'), { recursive: true });
const IMG = {};
const absent = photos.filter((p) => !existsSync(join(ROOT, 'photos', p.file)));
if (absent.length) {
  console.error(`\nMissing photos in photos/: ${absent.map((p) => p.file).join(', ')}\nRun "npm run photos" first (it copies them from the live site), or copy your originals into photos/.\n`);
  process.exit(1);
}
for (const p of photos) {
  const src = sharp(join(ROOT, 'photos', p.file), { failOn: 'none' }).rotate();
  const meta = await src.metadata();
  const w0 = meta.autoOrient?.width ?? meta.width, h0 = meta.autoOrient?.height ?? meta.height;
  const variants = [];
  if (p.logo) {
    const out = `${p.slug}.png`;
    await sharp(join(ROOT, 'photos', p.file)).resize({ width: Math.min(w0, 600), withoutEnlargement: true }).png({ compressionLevel: 9 }).toFile(join(DIST, 'images', out));
    const m = await sharp(join(DIST, 'images', out)).metadata();
    IMG[p.key] = { ...p, src: `/images/${out}`, width: m.width, height: m.height, variants: [] };
    continue;
  }
  for (const w of WIDTHS.filter((x) => x < w0).concat(w0 < WIDTHS.at(-1) ? [w0] : [])) {
    const out = `${p.slug}-${w}.webp`;
    await sharp(join(ROOT, 'photos', p.file), { failOn: 'none' }).rotate().resize({ width: w, withoutEnlargement: true }).webp({ quality: 78 }).toFile(join(DIST, 'images', out));
    variants.push({ w, src: `/images/${out}` });
  }
  const big = variants.at(-1);
  IMG[p.key] = { ...p, src: big.src, width: big.w, height: Math.round((big.w * h0) / w0), variants };
}
// A 1200×630 JPEG of each page's photo for link previews on WhatsApp, Facebook and Google.
async function ogImage(key) {
  const p = IMG[key];
  const out = `${p.slug}-share.jpg`;
  if (!existsSync(join(DIST, 'images', out))) {
    await sharp(join(ROOT, 'photos', p.file), { failOn: 'none' }).rotate().resize(1200, 630, { fit: 'cover', position: 'attention' }).jpeg({ quality: 82, mozjpeg: true }).toFile(join(DIST, 'images', out));
  }
  return `/images/${out}`;
}

// ── Page helpers given to src/content.mjs ──────────────────────────────────────────────────────────────────────────
const usedImages = new Map(); // page path -> Set of image keys (for the image sitemap)
function helpers(page) {
  const used = new Set();
  usedImages.set(page.path, used);
  const waText = encodeURIComponent('Hello, I would like to check availability at Nilara Hills Resort.');
  const enquireHref = cfg.whatsapp ? `https://wa.me/${cfg.whatsapp.replace(/\D/g, '')}?text=${waText}` : '/#book';
  return {
    cfg,
    img(key, { cls = '', eager = false, sizes = '100vw' } = {}) {
      const p = IMG[key];
      if (!p) throw new Error(`Unknown photo "${key}" on ${page.path}`);
      used.add(key);
      const srcset = p.variants.length > 1 ? ` srcset="${p.variants.map((v) => `${v.src} ${v.w}w`).join(', ')}" sizes="${sizes}"` : '';
      return `<img${cls ? ` class="${cls}"` : ''} src="${p.src}"${srcset} width="${p.width}" height="${p.height}" alt="${esc(p.alt)}"${eager ? ' fetchpriority="high"' : ' loading="lazy" decoding="async"'}>`;
    },
    caption: (key) => esc(IMG[key].caption),
    link: (path, text) => `<a href="${path}">${text}</a>`,
    cta: (cls = 'button', text = 'Check availability') => `<a class="${cls}" href="${enquireHref}"${cfg.whatsapp ? ' rel="noopener"' : ''}>${text} <span aria-hidden="true">→</span></a>`,
    addressLine,
    aside: (title, text) => `<aside class="aside"><h2>${title}</h2><p>${text}</p>${contactList()}<a class="button" href="#book">Send an enquiry <span aria-hidden="true">→</span></a></aside>`,
    enquiry,
  };
}
function addressLine() {
  const a = cfg.address;
  // Written the way it is on the Google Business Profile: "Kallumottamkunnu, Mananthavady P.O., Wayanad, Kerala – 670645".
  const town = a.street && a.street.includes(a.locality) ? null : a.locality;
  return esc([a.street, town, a.district, a.region].filter(Boolean).join(', ') + (a.postalCode ? ` – ${a.postalCode}` : ''));
}
function contactList() {
  const items = [];
  if (cfg.phone) items.push(`<li>Call <a href="tel:${cfg.phone.replace(/[^\d+]/g, '')}">${esc(cfg.phone)}</a></li>`);
  if (cfg.whatsapp) items.push(`<li>WhatsApp <a href="https://wa.me/${cfg.whatsapp.replace(/\D/g, '')}" rel="noopener">${esc(cfg.whatsapp)}</a></li>`);
  items.push(`<li>Email <a href="mailto:${cfg.email}">${esc(cfg.email)}</a></li>`);
  return `<ul class="contact-lines">${items.join('')}</ul>`;
}
function enquiry() {
  return `<section class="shell enquire" id="book"><div class="enquire-box">
      <div><p class="kicker">Start with a hello</p><h2>Plan your stay at Nilara Hills, Wayanad.</h2><p>Tell us your dates and how many are coming, and the Horizon Finder India team will confirm availability and help shape the stay.</p>${contactList()}</div>
      <form class="form-grid" id="enquiry-form" action="mailto:${cfg.email}" method="post" enctype="text/plain">
        <div class="field"><label for="f-name">Your name</label><input id="f-name" name="name" required autocomplete="name" placeholder="Your name"></div>
        <div class="field"><label for="f-phone">Phone or email</label><input id="f-phone" name="contact" required autocomplete="tel" placeholder="So we can reply"></div>
        <div class="field"><label for="f-arrival">Arrival date</label><input id="f-arrival" name="arrival" type="date"></div>
        <div class="field"><label for="f-nights">Nights</label><select id="f-nights" name="nights"><option>1 night</option><option selected>2 nights</option><option>3 nights</option><option>4+ nights</option></select></div>
        <div class="field"><label for="f-guests">Guests</label><select id="f-guests" name="guests"><option>2 guests</option><option>3–4 guests</option><option>5–8 guests</option><option>9–20 guests</option><option>20+ guests / whole resort</option><option>Corporate outing</option></select></div>
        <div class="field"><label for="f-stay">Stay</label><select id="f-stay" name="stay"><option>Two-bedroom cottage</option><option>A-Frame cottage</option><option>Several cottages</option><option>Not sure yet</option></select></div>
        <div class="form-submit"><button class="button" type="submit">Send your enquiry <span aria-hidden="true">→</span></button><p class="form-note">${cfg.whatsapp ? 'Your enquiry opens in WhatsApp, ready to send.' : 'Your email app opens with the enquiry, ready to send.'}</p></div>
      </form>
    </div></section>`;
}

// ── Structured data for Google ─────────────────────────────────────────────────────────────────────────────────────
function resortData(pageImages) {
  const a = cfg.address;
  const d = {
    '@type': 'Resort', '@id': `${BASE}/#resort`, name: cfg.name, alternateName: cfg.shortName, url: `${BASE}/`,
    description: `Boutique resort ${cfg.distanceFromTown} from Mananthavady, Wayanad, Kerala: eight two-bedroom cottages and two AC A-Frames with a swimming pool, breakfast, kids' play area, BBQ, DJ hall and a 150-seat conference hall.`,
    image: pageImages, logo: abs(IMG.logo.src), email: cfg.email,
    address: { '@type': 'PostalAddress', ...(a.street && { streetAddress: a.street }), addressLocality: a.locality, addressRegion: a.region, ...(a.postalCode && { postalCode: a.postalCode }), addressCountry: a.country },
    checkinTime: cfg.checkIn, checkoutTime: cfg.checkOut, numberOfRooms: 10, priceRange: cfg.priceRange,
    amenityFeature: ['Swimming pool', 'Free breakfast', "Kids' play area", 'BBQ facility', 'DJ hall', 'Conference hall (150 seats)', 'Campfire on request', 'Toiletries', 'Drinking water', 'Air-conditioning'].map((n) => ({ '@type': 'LocationFeatureSpecification', name: n, value: true })),
    containsPlace: [
      { '@type': 'Accommodation', name: 'Two-bedroom cottage', numberOfRooms: 2, numberOfBathroomsTotal: 2, occupancy: { '@type': 'QuantitativeValue', maxValue: 7 } },
      { '@type': 'Accommodation', name: 'A-Frame cottage (AC)', occupancy: { '@type': 'QuantitativeValue', maxValue: 4 } },
    ],
    containedInPlace: { '@type': 'AdministrativeArea', name: 'Wayanad, Kerala, India' },
    brand: { '@type': 'Organization', name: cfg.operator, url: cfg.operatorUrl },
  };
  if (cfg.showPrices && cfg.rates) {
    d.makesOffer = [['Two-bedroom cottage, 1 AC room', cfg.rates.cottageAc], ['Two-bedroom cottage, non-AC', cfg.rates.cottageNonAc], ['A-Frame cottage, AC', cfg.rates.aFrame]]
      .map(([name, price]) => ({ '@type': 'Offer', name: `${name} — per night with breakfast`, price, priceCurrency: 'INR' }));
  }
  if (cfg.phone) d.telephone = cfg.phone;
  if (cfg.geo.lat && cfg.geo.lng) d.geo = { '@type': 'GeoCoordinates', latitude: Number(cfg.geo.lat), longitude: Number(cfg.geo.lng) };
  if (cfg.mapsUrl) d.hasMap = cfg.mapsUrl;
  const same = [cfg.instagram, cfg.facebook].filter(Boolean);
  if (same.length) d.sameAs = same;
  return d;
}

// ── Layout ─────────────────────────────────────────────────────────────────────────────────────────────────────────
const css = readFileSync(join(ROOT, 'src', 'styles.css'), 'utf8').replace(/\/\*[\s\S]*?\*\//g, '').replace(/\s*\n\s*/g, '').trim();
function nav(current) {
  return NAV.map((n) => `<a href="${n.path}"${n.path === current ? ' aria-current="page"' : ''}>${n.label}</a>`).join('') + `<a class="button" href="/#book">Book your stay</a>`;
}
async function render(page) {
  const h = helpers(page);
  let body = page.body(h);
  if (!page.home) {
    const head = `<section class="page-head"><div class="shell"><nav aria-label="Breadcrumb"><ol class="crumbs"><li><a href="/">Home</a></li><li aria-current="page">${esc(page.crumb)}</li></ol></nav><h1>${page.h1}</h1><p>${page.lead}</p></div></section>`;
    body = head + body + enquiry();
  }
  const og = await ogImage(page.ogImage);
  const pageImages = [...usedImages.get(page.path)].filter((k) => !IMG[k].logo).map((k) => abs(IMG[k].src));
  const graph = [{ '@type': 'WebSite', '@id': `${BASE}/#website`, url: `${BASE}/`, name: cfg.name, publisher: { '@id': `${BASE}/#resort` } }, resortData(pageImages.length ? pageImages : [abs(og)])];
  if (page.home) graph.push({ '@type': 'FAQPage', mainEntity: FAQ(cfg).map(([q, ans]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: ans } })) });
  else graph.push({ '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: `${BASE}/` }, { '@type': 'ListItem', position: 2, name: page.crumb, item: abs(page.path) }] });
  const hero = page.home ? IMG.hero : null;
  return `<!doctype html>
<html lang="en-IN">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(page.title)}</title>
<meta name="description" content="${esc(page.description)}">
<link rel="canonical" href="${abs(page.path)}">
<meta name="robots" content="index, follow, max-image-preview:large">
<meta name="theme-color" content="#17372c">
<meta name="geo.region" content="IN-KL"><meta name="geo.placename" content="Mananthavady, Wayanad">${cfg.geo.lat && cfg.geo.lng ? `<meta name="geo.position" content="${cfg.geo.lat};${cfg.geo.lng}">` : ''}
<meta property="og:type" content="website"><meta property="og:site_name" content="${esc(cfg.name)}"><meta property="og:locale" content="en_IN">
<meta property="og:title" content="${esc(page.title)}"><meta property="og:description" content="${esc(page.description)}">
<meta property="og:url" content="${abs(page.path)}"><meta property="og:image" content="${abs(og)}"><meta property="og:image:width" content="1200"><meta property="og:image:height" content="630"><meta property="og:image:alt" content="${esc(IMG[page.ogImage].alt)}">
<meta name="twitter:card" content="summary_large_image">
<link rel="icon" href="/favicon.svg" type="image/svg+xml"><link rel="apple-touch-icon" href="/apple-touch-icon.png">
${hero ? `<link rel="preload" as="image" href="${hero.src}" imagesrcset="${hero.variants.map((v) => `${v.src} ${v.w}w`).join(', ')}" imagesizes="100vw" fetchpriority="high">` : ''}
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Playfair+Display:ital,wght@0,500;0,600;0,700;1,500;1,600&display=swap" rel="stylesheet">
<style>${css}</style>
<script type="application/ld+json">${JSON.stringify({ '@context': 'https://schema.org', '@graph': graph })}</script>
</head>
<body>
<a class="skip" href="#main">Skip to content</a>
<header class="top${page.home ? '' : ' solid'}">
  <div class="shell top-inner">
    <a class="brand" href="/" aria-label="Nilara Hills Resort, home"><small>Nilara Hills Resort · Wayanad</small><strong>Nilara <em>Hills</em></strong></a>
    <button class="nav-toggle" aria-label="Open navigation" aria-expanded="false" aria-controls="site-nav">☰</button>
    <nav class="nav" id="site-nav" aria-label="Main navigation">${nav(page.path)}</nav>
  </div>
</header>
<main id="main">${body}</main>
<footer class="footer"><div class="shell">
  <div class="footer-top">
    <div><a class="brand" href="/"><small>Nilara Hills Resort</small><strong>Nilara <em>Hills</em></strong></a><p class="footer-copy">A cottage resort with a swimming pool in Mananthavady, Wayanad, brought to you by Horizon Finder India.</p>${h.img('logo', { cls: 'nilarahills-logo' })}${h.img('hfLogo', { cls: 'hf-logo' })}</div>
    <div class="footer-column"><b>Explore</b><a href="/">Home</a>${NAV.map((n) => `<a href="${n.path}">${({ Nearby: 'Places nearby', Groups: 'Group stays', Corporate: 'Corporate outings', Cottages: 'Cottages & tariff' })[n.label] || n.label}</a>`).join('')}<a href="/#faq">Questions</a></div>
    <div class="footer-column"><b>Reservations</b><a href="/#book">Send an enquiry</a>${cfg.phone ? `<a href="tel:${cfg.phone.replace(/[^\d+]/g, '')}">${esc(cfg.phone)}</a>` : ''}${cfg.whatsapp ? `<a href="https://wa.me/${cfg.whatsapp.replace(/\D/g, '')}" rel="noopener">WhatsApp ${esc(cfg.whatsapp)}</a>` : ''}<a href="mailto:${cfg.email}">${esc(cfg.email)}</a>${cfg.bookingUrl ? `<a href="${cfg.bookingUrl}" rel="noopener">Check availability</a>` : ''}</div>
    <div class="footer-column"><b>Find us</b><address><span>${addressLine()}</span>${cfg.mapsUrl ? `<a href="${cfg.mapsUrl}" rel="noopener">Google Maps →</a>` : ''}</address><span>Check-in ${time12(cfg.checkIn)} · Check-out ${time12(cfg.checkOut)}</span></div>
  </div>
  <div class="footer-bottom"><span>© <span id="year">${new Date().getFullYear()}</span> ${esc(cfg.name)}, Mananthavady, Wayanad. By ${esc(cfg.operator)}.</span><span>Made for unhurried days.</span></div>
</div></footer>
<script>
(function(){var t=document.querySelector('.nav-toggle'),n=document.getElementById('site-nav');t.addEventListener('click',function(){var o=n.classList.toggle('open');t.setAttribute('aria-expanded',String(o));t.textContent=o?'×':'☰'});n.querySelectorAll('a').forEach(function(a){a.addEventListener('click',function(){n.classList.remove('open');t.setAttribute('aria-expanded','false');t.textContent='☰'})});
var f=document.getElementById('enquiry-form');if(f){f.addEventListener('submit',function(e){e.preventDefault();var d=new FormData(f),l=[];d.forEach(function(v,k){if(v)l.push(k.charAt(0).toUpperCase()+k.slice(1)+': '+v)});var m='Enquiry for Nilara Hills Resort\\n'+l.join('\\n');${cfg.whatsapp ? `location.href='https://wa.me/${cfg.whatsapp.replace(/\D/g, '')}?text='+encodeURIComponent(m);` : `location.href='mailto:${cfg.email}?subject='+encodeURIComponent('Stay enquiry — Nilara Hills')+'&body='+encodeURIComponent(m);`}})}})();
</script>
</body>
</html>
`;
}

// ── Write pages, sitemap, robots, icons ────────────────────────────────────────────────────────────────────────────
for (const page of PAGES) {
  const html = await render(page);
  const dir = join(DIST, page.path);
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, 'index.html'), html);
}
const notFound = await render({ path: '/404', title: 'Page not found | Nilara Hills Resort, Wayanad', description: 'This page could not be found. Visit the Nilara Hills Resort home page.', ogImage: 'hero', crumb: 'Page not found', h1: 'This page could not be found', lead: 'The page may have moved. Start from the home page, or send us an enquiry below.', body: () => '' });
writeFileSync(join(DIST, '404.html'), notFound.replace('<meta name="robots" content="index, follow, max-image-preview:large">', '<meta name="robots" content="noindex">').replace(/<link rel="canonical"[^>]*>\n/, ''));

const today = new Date().toISOString().slice(0, 10);
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${PAGES.map((p) => `  <url><loc>${abs(p.path)}</loc><lastmod>${today}</lastmod>${[...usedImages.get(p.path)].filter((k) => !IMG[k].logo).map((k) => `<image:image><image:loc>${abs(IMG[k].src)}</image:loc></image:image>`).join('')}</url>`).join('\n')}
</urlset>
`;
writeFileSync(join(DIST, 'sitemap.xml'), sitemap);
writeFileSync(join(DIST, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${BASE}/sitemap.xml\n`);
writeFileSync(join(DIST, 'favicon.svg'), `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="14" fill="#17372c"/><circle cx="32" cy="32" r="22" fill="none" stroke="#c7963c" stroke-width="2.5"/><text x="32" y="42" text-anchor="middle" font-family="Georgia,serif" font-size="28" fill="#c7963c">N</text></svg>`);
await sharp(Buffer.from(readFileSync(join(DIST, 'favicon.svg')))).resize(180, 180).png().toFile(join(DIST, 'apple-touch-icon.png'));
writeFileSync(join(DIST, '_headers'), `/images/*\n  Cache-Control: public, max-age=2592000\n/*.svg\n  Cache-Control: public, max-age=2592000\n`);

console.log(`Built ${PAGES.length} pages, ${Object.keys(IMG).length} photos, sitemap.xml and robots.txt into dist/.`);
if (missing.length) {
  console.log(`\n⚠  Not filled in site.config.json yet (left off the site and out of Google's data): ${missing.join(', ')}.`);
  console.log('   Fill them so Google can match the website to your Google Business Profile, then build again.');
  if (strict) process.exit(2);
}
