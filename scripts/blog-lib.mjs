// The blog's rules in one place, shared by build.mjs, check.mjs and blog.mjs.
//
// A post lives in src/posts/<slug>.mjs. It goes live only when its slug is listed in src/published.json.
// The weekly publisher (scripts/publish-due.ps1, via `node scripts/blog.mjs`) adds at most one post a week,
// and only one that passes the gate:
//   - status is 'ready' and its publishDate is today or earlier (India time)
//   - the post contains no TODO-CONFIRM marker (an unconfirmed fact always blocks)
// A missing personal line ([ASHWIN-LINE]) does not block: the placeholder is stripped from the live page.
import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { POSTS } from '../src/posts/index.mjs';

export const ROOT = fileURLToPath(new URL('..', import.meta.url));
const PUBLISHED_FILE = join(ROOT, 'src', 'published.json');

export const todayIST = () => new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Kolkata', year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date());

export function readPublished() {
  const j = JSON.parse(readFileSync(PUBLISHED_FILE, 'utf8'));
  return { file: j, posts: j.posts || {} };
}
export function writePublished(posts) {
  const { file } = readPublished();
  file.posts = Object.fromEntries(Object.entries(posts).sort((a, b) => a[1].localeCompare(b[1])));
  writeFileSync(PUBLISHED_FILE, JSON.stringify(file, null, 2) + '\n');
}

// Render a post's body with harmless helpers, to look for markers without building the site.
const stubHelpers = new Proxy({}, { get: (_, k) => (k === 'cfg' ? JSON.parse(readFileSync(join(ROOT, 'site.config.json'), 'utf8')) : (...a) => String(a[1] ?? a[0] ?? '')) });
export const rawText = (post) => [post.title, post.description, post.h1, post.lead, post.body(stubHelpers), ...(post.faq || []).flat()].join('\n');
export const hasTodoConfirm = (post) => /TODO-CONFIRM/.test(rawText(post));
export const hasAshwinLine = (post) => /\[ASHWIN-LINE\]/.test(rawText(post));

export function allPosts() {
  const seen = new Set();
  for (const p of POSTS) {
    if (seen.has(p.slug)) throw new Error(`Two posts use the slug ${p.slug}`);
    seen.add(p.slug);
  }
  return [...POSTS].sort((a, b) => a.publishDate.localeCompare(b.publishDate));
}

// Posts that are live in this build: listed in published.json. The date they went live comes from there.
export function livePosts() {
  const { posts } = readPublished();
  const out = [];
  for (const p of allPosts()) {
    if (!posts[p.slug]) continue;
    if (hasTodoConfirm(p)) throw new Error(`${p.slug} is listed in src/published.json but still has TODO-CONFIRM. Remove it from published.json or confirm the fact.`);
    out.push({ ...p, published: posts[p.slug] });
  }
  return out.sort((a, b) => b.published.localeCompare(a.published) || b.publishDate.localeCompare(a.publishDate));
}

// What the publisher should do today.
export function gate(today = todayIST()) {
  const { posts } = readPublished();
  const held = [];
  const notes = [];
  let due = null;
  for (const p of allPosts()) {
    if (posts[p.slug] || p.publishDate > today) continue;
    if (p.status !== 'ready') { held.push({ slug: p.slug, date: p.publishDate, reason: `status is "${p.status}", not "ready"` }); continue; }
    if (hasTodoConfirm(p)) { held.push({ slug: p.slug, date: p.publishDate, reason: 'TODO-CONFIRM marker: a fact is not confirmed yet' }); continue; }
    if (!due) {
      due = { slug: p.slug, date: p.publishDate, title: p.title, url: `/blog/${p.slug}/` };
      if (hasAshwinLine(p)) notes.push(`${p.slug}: no personal line from Ashwin yet; published with sourced facts only (placeholder removed).`);
    }
  }
  const next = allPosts().filter((p) => !posts[p.slug] && p.publishDate > today)[0];
  return { today, due, held, notes, next: next ? { slug: next.slug, date: next.publishDate } : null };
}
