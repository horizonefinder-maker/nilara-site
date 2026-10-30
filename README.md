# nilarahills.com — Nilara Hills Resort, Mananthavady, Wayanad

The website, rebuilt so Google can understand and rank it. It keeps the original design and photos, and adds:

- **Six pages** aimed at what people search for: Home, Cottages & tariff, Group stays, Corporate outings,
  Places near Mananthavady, How to reach.
- **Search basics on every page**: a title and description with *Wayanad* / *Mananthavady*, one main heading,
  a canonical address and link-preview images for WhatsApp and Facebook.
- **Google's structured data**: the resort's type, location, check-in/out times, pool and FAQ, plus breadcrumbs.
- **Photo SEO**: every photo gets a descriptive file name (for example `resort-with-swimming-pool-wayanad-nilara-hills`),
  a description (alt text) and a caption. Photos are resized and converted to WebP in three sizes so phones load them fast,
  and they are listed in an image sitemap.
- **sitemap.xml, robots.txt, a 404 page, a favicon**, and an enquiry form that opens WhatsApp (or email).

## One-time setup (on your PC)

You need Node.js (already installed for the PMS). In this folder, run:

```powershell
npm install
npm run photos
```

`npm run photos` copies the current photos from nilarahills.com into `photos/`.
**Run it before you deploy the new site**, because the old photo addresses stop working afterwards.

## Fill in your details

Open `site.config.json` and fill in:

| Field | Example |
|---|---|
| `phone` | `+91 98765 43210` |
| `whatsapp` | `+91 98765 43210` (enquiries then open in WhatsApp) |
| `geo.lat`, `geo.lng` | from Google Maps: right-click the resort, click the numbers to copy them |
| `mapsUrl` | the Share link of the resort in Google Maps |
| `rates` | the tariff shown on the site (now ₹7,500 / ₹7,000 / ₹6,500 with breakfast, and extra-person rates) |
| `showPrices` | `false` hides the tariff everywhere |

Use **exactly** the same name, address and phone as on your Google Business Profile.
Anything left empty is simply left off the site; the build lists what is still missing.

## Check, preview and publish

```powershell
npm test          # builds dist/ and runs the SEO checks
npm run preview   # opens the site at http://localhost:8787
npm run deploy    # builds, checks, and publishes to nilarahills.com
```

`npm run deploy` stops if the phone or address are still empty. It publishes to the same Cloudflare Worker
(`hf-nilara-hills`) that serves nilarahills.com now. If Wrangler asks you to sign in, use the Horizon Finder Cloudflare account.

## After publishing

1. **Google Search Console** (search.google.com/search-console): add `nilarahills.com` as a *Domain* property.
   Because the domain is on Cloudflare, choose the Cloudflare option and it verifies itself.
   Then open *Sitemaps* and submit `https://nilarahills.com/sitemap.xml`.
2. **Google Business Profile**: create or complete "Nilara Hills Resort", category *Resort hotel*, with the same
   address and phone, the website `https://nilarahills.com`, lots of photos, and ask guests for reviews.
   This is what puts Nilara Hills on the map results for "Wayanad stay".
3. Test the structured data at search.google.com/test/rich-results with `https://nilarahills.com/`.

## Changing the site later

- **Text**: `src/content.mjs`, one block per page. Titles should stay under 65 characters and mention Wayanad or
  Mananthavady; descriptions 110–165 characters. `npm test` checks this.
- **Photos**: put the file in `photos/`, add a line to `photos.json` (a short descriptive `slug`, a sentence of `alt`
  text that says what is in the photo and where), then use it in a page with `${h.img('key')}`.
- **Design**: `src/styles.css`.
