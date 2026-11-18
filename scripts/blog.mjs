// Blog schedule helper, used by scripts/publish-due.ps1 and handy by hand.
//   node scripts/blog.mjs status            the schedule: every post, its date and state
//   node scripts/blog.mjs due               JSON: the one post due today (if any), posts held and why
//   node scripts/blog.mjs publish <slug>    mark a post live (adds it to src/published.json with today's date)
//   node scripts/blog.mjs unpublish <slug>  take it out again (used for rollback)
import { allPosts, gate, hasAshwinLine, hasTodoConfirm, readPublished, todayIST, writePublished } from './blog-lib.mjs';

const [cmd, slug] = process.argv.slice(2);
const { posts } = readPublished();

if (cmd === 'due') {
  console.log(JSON.stringify(gate()));
} else if (cmd === 'publish' || cmd === 'unpublish') {
  const post = allPosts().find((p) => p.slug === slug);
  if (!post) { console.error(`No post with slug "${slug}"`); process.exit(1); }
  if (cmd === 'publish') {
    if (post.status !== 'ready') { console.error(`${slug} is not ready (status "${post.status}")`); process.exit(1); }
    if (hasTodoConfirm(post)) { console.error(`${slug} still has TODO-CONFIRM`); process.exit(1); }
    posts[slug] = posts[slug] || todayIST();
  } else delete posts[slug];
  writePublished(posts);
  console.log(`${cmd === 'publish' ? 'Published' : 'Unpublished'}: ${slug}`);
} else {
  const today = todayIST();
  console.log(`Blog schedule (today ${today}, India time)\n`);
  for (const p of allPosts()) {
    const state = posts[p.slug] ? `LIVE since ${posts[p.slug]}` : hasTodoConfirm(p) ? 'HELD: TODO-CONFIRM' : p.status !== 'ready' ? `HELD: ${p.status}` : p.publishDate <= today ? 'DUE' : 'scheduled';
    console.log(`${p.publishDate}  ${state.padEnd(22)} ${p.slug}${hasAshwinLine(p) ? '   (personal line missing)' : ''}`);
  }
}
