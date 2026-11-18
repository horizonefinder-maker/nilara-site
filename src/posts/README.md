# Blog posts (nilarahills.com/blog/)

One file per post, `src/posts/<slug>.mjs`, listed in `index.mjs`. A post is live only when its slug is in
`src/published.json`. The weekly task "Nilara Blog Publisher" (Wednesday 13:45) adds at most one post a week.

## The publish gate

A post is published on or after its `publishDate` only if:

- `status` is `'ready'`, and
- it contains no `TODO-CONFIRM` (an unconfirmed fact always blocks).

A missing personal line does **not** block. `<p class="todo">[ASHWIN-LINE] …</p>` is removed from the live page,
and the post goes out with sourced facts only. Replace the whole `<p class="todo">…</p>` with Ashwin's own words
(as a normal `<p>`) whenever he sends them; the next deploy picks it up.

A post that cannot pass is skipped and logged; the next due post goes out instead.

## Writing rules (see the project's site-brief.md)

- Nilara Hills is a **boutique resort** (never "nature resort").
- No resort tariff, discounts or availability in posts — link to /cottages/ instead. Attraction fees only with the source and date.
- Every fact from a source read on the date given in `sources`; conflicts shown and attributed; "not stated" when a source is silent.
- Headings inside the post body are questions; the first paragraph answers.
- At least two links to site pages; link other posts with `h.post(slug, text)` so a link appears only once that post is live.
- No invented reviews, guest stories or personal experience. No festival dates. Places of worship written respectfully.

## Commands

```powershell
node scripts/blog.mjs status                 # schedule and state of every post
node scripts/build.mjs --drafts              # build all posts as noindex previews (do NOT deploy this build)
npm test                                     # normal build + all checks
.\scripts\publish-due.ps1 -DryRun            # what the weekly task would do today
```
