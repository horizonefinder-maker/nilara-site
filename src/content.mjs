// Every page of nilarahills.com: its address, the title and description Google shows, and the page itself.
// Write for guests first; the words people search for ("Wayanad", "Mananthavady", "cottage", "pool", "group stay",
// "corporate outing") appear where they naturally belong, never stuffed. Facts and prices come from site.config.json.
//
// Each body(h) receives helpers:  h.img(key, opts)  h.cfg  h.link(path, text)  h.cta()  h.aside()  h.enquiry()

export const NAV = [
  { path: '/cottages/', label: 'Cottages' },
  { path: '/group-stays/', label: 'Groups' },
  { path: '/corporate-outings/', label: 'Corporate' },
  { path: '/places-near-mananthavady/', label: 'Nearby' },
  { path: '/how-to-reach/', label: 'How to reach' },
];

export const inr = (n) => `₹${Number(n).toLocaleString('en-IN')}`;

// Shared FAQ: shown on the home page and given to Google as FAQ data.
export const FAQ = (cfg) => [
  ['Where is Nilara Hills Resort?', `Nilara Hills is at Kallumottamkunnu, ${cfg.distanceFromTown} from Mananthavady town in Wayanad, Kerala (PIN 670645). Thirunelli, Tholpetty and Kuruva Island are all within an easy drive.`],
  ['What kind of rooms do you have?', 'Eight two-bedroom cottages and two A-Frame cottages. Each two-bedroom cottage has one attached and one common bathroom; five have one AC and one non-AC bedroom, three are fully non-AC. Both A-Frames are fully air-conditioned.'],
  ['What is the tariff?', `Per night, with breakfast: two-bedroom cottage with one AC room ${inr(cfg.rates.cottageAc)}, non-AC two-bedroom cottage ${inr(cfg.rates.cottageNonAc)}, AC A-Frame ${inr(cfg.rates.aFrame)}. Extra persons are charged separately.`],
  ['How many people can stay in one cottage?', 'A two-bedroom cottage is for 4 adults and 2 children below 6, up to 7 guests in all. An A-Frame is for 2 adults and 2 children below 6, up to 4 guests.'],
  ['Is breakfast included?', 'Yes, breakfast is included in the tariff. Lunch and dinner can be arranged — tell us when you book.'],
  ['What facilities are there?', `A swimming pool, kids’ play area, BBQ facility, a DJ hall and a 150-seat conference hall. Drinking water and toiletries are provided, and a campfire can be arranged on request for ${inr(cfg.rates.campfire)}.`],
  ['What are the check-in and check-out times?', `Check-in is from ${time12(cfg.checkIn)} and check-out is by ${time12(cfg.checkOut)}.`],
  ['Is Nilara Hills good for corporate outings and big groups?', 'Yes. With ten cottages, a 150-seat conference hall, a DJ hall and a pool, it suits family get-togethers, team outings and company offsites — and the whole resort can be booked.'],
];

export function time12(hhmm) {
  const [h, m] = String(hhmm || '').split(':').map(Number);
  if (!Number.isFinite(h)) return hhmm;
  return `${((h + 11) % 12) + 1}${m ? `:${String(m).padStart(2, '0')}` : ''} ${h < 12 ? 'AM' : 'PM'}`;
}

// Places near Mananthavady. Distances are approximate road distances from Mananthavady town
// (Kerala Tourism and Wikivoyage); Nilara Hills is a further 2.5 km. Check against Google Maps before relying on them.
export const PLACES = [
  { name: 'Valliyoorkavu Bhagavathy Temple', km: '3', text: 'One of Wayanad’s best-known temples, just outside Mananthavady town. Its festival in March draws people from across the district.' },
  { name: 'Pazhassi Tomb and Museum', km: 'In town', text: 'The memorial to Pazhassi Raja, the Kerala Varma king who fought the British from the forests of Wayanad, with a small museum and garden.' },
  { name: 'Kuruva Island (Kuruva Dweep)', km: '17', text: 'A cluster of river islands on the Kabini with bamboo rafts, rope bridges and quiet forest walks. Entry is limited each day, so go early.' },
  { name: 'Tholpetty Wildlife Sanctuary', km: '20–24', text: 'Part of the Wayanad Wildlife Sanctuary on the Coorg road. Morning and evening jeep safaris often see elephants, gaur and deer.' },
  { name: 'Thirunelli Temple', km: '32–36', text: 'An ancient Vishnu temple in the Brahmagiri hills, reached through forest. The Papanasini stream is nearby, and treks to Pakshipathalam start in this area.' },
  { name: 'Panamaram and the Kabini backwaters', km: '10+', text: 'Green paddy fields, river views and village roads around Panamaram, a pleasant drive for an afternoon.' },
];

const placeCard = (p) => `<div class="card"><span class="dist">${p.km === 'In town' ? 'In Mananthavady' : `About ${p.km} km from town`}</span><h3>${p.name}</h3><p>${p.text}</p></div>`;

const FACILITIES = (cfg) => [
  ['Swimming pool', 'Cool water and green views, lit up in the evening.'],
  ['Breakfast included', 'Every stay includes breakfast; lunch and dinner on request.'],
  ['Kids’ play area', 'Space for children to run around while you relax.'],
  ['BBQ facility', 'Grill dinners in the open air with your group.'],
  ['DJ hall', 'For birthdays, reunions and celebrations that go on into the night.'],
  ['Conference hall · 150 seats', 'For corporate meetings, training sessions and events.'],
  ['Campfire on request', `An evening around the fire for ${inr(cfg.rates.campfire)}.`],
  ['Drinking water & toiletries', 'Soap, toothbrush, toothpaste and shampoo provided.'],
];

export const PAGES = [
  // ── Home ────────────────────────────────────────────────────────────────────────────────────────────────────────
  {
    path: '/',
    title: 'Nilara Hills Resort, Mananthavady | Wayanad Stay with Pool',
    description: 'Boutique resort 2.5 km from Mananthavady, Wayanad: 2BHK cottages and AC A-Frames with pool, breakfast, kids’ play area, DJ and conference hall.',
    ogImage: 'hero',
    home: true,
    body: (h) => `
    <section class="hero">
      ${h.img('hero', { cls: 'hero-bg', eager: true, sizes: '100vw' })}
      <div class="shell hero-content">
        <p class="kicker">Boutique resort · Mananthavady</p>
        <h1>Cottage stays with a pool in <em>Wayanad.</em></h1>
        <p>Unwind amid greenery and fresh hill air, just ${h.cfg.distanceFromTown} from Mananthavady town. A peaceful retreat for families, couples, groups and corporate outings.</p>
        <div class="hero-actions">${h.cta('button')}<a class="button button-outline" href="/cottages/">Cottages &amp; tariff <span aria-hidden="true">→</span></a></div>
      </div>
      <div class="hero-bottom" aria-hidden="true"><span class="scroll-line"></span><span>Discover Nilara Hills</span></div>
    </section>

    <section class="facts" aria-label="Nilara Hills at a glance">
      <ul class="shell facts-list">
        <li><b>${h.cfg.distanceFromTown} from town</b><span>Kallumottamkunnu, Mananthavady, Wayanad</span></li>
        <li><b>10 cottages</b><span>8 two-bedroom cottages and 2 AC A-Frames</span></li>
        <li><b>Pool &amp; play area</b><span>Plus BBQ, DJ hall and a 150-seat conference hall</span></li>
        <li><b>${h.cfg.showPrices ? `From ${inr(h.cfg.priceFrom)}` : 'Breakfast included'}</b><span>${h.cfg.showPrices ? 'per cottage, per night, with breakfast' : 'with every stay'}</span></li>
      </ul>
    </section>

    <section class="shell welcome" id="about">
      <div><p class="kicker">Welcome to Nilara Hills</p><h2>A boutique resort in Wayanad, close to Mananthavady town.</h2></div>
      <div class="welcome-copy">
        <p>Nilara Hills sits at Kallumottamkunnu, ${h.cfg.distanceFromTown} from Mananthavady in the green north of Wayanad. It is close enough to town for easy shopping and temple visits, and quiet enough for slow mornings, fresh hill air and evenings by the pool.</p>
        <p>Come for a family holiday, a weekend with someone special, a trip with friends, a celebration or a company outing. Thirunelli Temple, Tholpetty Wildlife Sanctuary and Kuruva Island are all within an easy drive — see ${h.link('/places-near-mananthavady/', 'places to visit near Mananthavady')}.</p>
        <div class="welcome-mark">Nilara Hills <span>Boutique resort by Horizon Finder India</span></div>
      </div>
    </section>

    <section class="arrival">
      <div class="arrival-photo">${h.img('arrival', { sizes: '(max-width:760px) 100vw, 62vw' })}</div>
      <div class="arrival-copy"><p class="kicker">The welcome begins here</p><h2>Best for family get-togethers and corporate outings.</h2><p>Ten cottages around one garden and pool, so the whole group stays together — with halls for the party and the meeting.</p></div>
    </section>

    <section class="shell stays" id="stays">
      <div class="heading"><div><p class="kicker">Stay options</p><h2>2BHK cottages and A-Frames in Mananthavady.</h2></div><p>Two-bedroom cottages for families and friends, and air-conditioned A-Frames for couples and small families. ${h.link('/cottages/', 'See tariff and occupancy')}.</p></div>
      <div class="stay-list">
        <article class="stay">${h.img('room1', { sizes: '(max-width:760px) 100vw, 50vw' })}<span class="stay-tag">8 cottages · up to 7 guests</span><div class="stay-copy"><h3>Two-bedroom cottages</h3><p>Two bedrooms, one attached and one common bathroom. Five have one AC bedroom; three are non-AC.${h.cfg.showPrices ? ` From ${inr(h.cfg.rates.cottageNonAc)} a night with breakfast.` : ''}</p><a href="/cottages/#two-bedroom">Cottage details →</a></div></article>
        <article class="stay">${h.img('room2', { sizes: '(max-width:760px) 100vw, 50vw' })}<span class="stay-tag">2 A-Frames · up to 4 guests</span><div class="stay-copy"><h3>A-Frame cottages (AC)</h3><p>Fully air-conditioned and cosy — a favourite with couples and small families.${h.cfg.showPrices ? ` ${inr(h.cfg.rates.aFrame)} a night with breakfast.` : ''}</p><a href="/cottages/#a-frame">A-Frame details →</a></div></article>
      </div>
    </section>

    <section class="amenities" id="experiences"><div class="shell amenity-grid">
      <figure class="amenity-image">${h.img('pool', { sizes: '(max-width:760px) 100vw, 45vw' })}<div class="image-note" aria-hidden="true">Breakfast<br>included.</div></figure>
      <div class="amenity-copy"><p class="kicker">Included facilities</p><h2>A resort with a pool, play area and halls for every occasion.</h2><p>Swim in the afternoon, grill dinner in the evening, and keep the children busy in between.</p>
        <ul class="amenity-items">${FACILITIES(h.cfg).slice(0, 6).map(([b, s]) => `<li class="amenity-item"><b>${b}</b><span>${s}</span></li>`).join('')}</ul></div>
    </div></section>

    <section class="pool-feature">
      <div class="photo">${h.img('poolNight', { sizes: '(max-width:760px) 100vw, 50vw' })}</div>
      <div class="copy"><div><p class="kicker">When daylight softens</p><h2>Evenings by the pool, or around the campfire.</h2><p>Let the lights come on, take one more dip, fire up the BBQ or ask for a campfire. This is your time in Wayanad.</p>${h.cta('button button-outline', 'Enquire about your stay')}</div></div>
    </section>

    <section class="shell gallery" id="gallery">
      <div class="gallery-header"><div><p class="kicker">A glimpse of Nilara Hills</p><h2>Photos of the resort.</h2></div>${h.cta('button', 'Start planning')}</div>
      <div class="gallery-grid">
        ${['terrace', 'pool2', 'dining', 'night', 'garden'].map((k) => `<figure>${h.img(k, { sizes: '(max-width:760px) 50vw, 33vw' })}<figcaption>${h.caption(k)}</figcaption></figure>`).join('\n        ')}
      </div>
    </section>

    <section class="faq" id="faq"><div class="shell">
      <p class="kicker">Good to know</p><h2>Questions about staying at Nilara Hills</h2>
      <div class="faq-list">${FAQ(h.cfg).map(([q, a]) => `<details><summary>${q}</summary><p>${a}</p></details>`).join('')}</div>
    </div></section>

    <section class="shell nearby" aria-labelledby="nearby-title">
      <div class="heading"><div><p class="kicker">Around the resort</p><h2 id="nearby-title">Places to visit near Mananthavady.</h2></div><p>North Wayanad’s temples, forests and river islands are close by. ${h.link('/places-near-mananthavady/', 'See the full list')}.</p></div>
      <div class="cards">${PLACES.slice(2, 5).map(placeCard).join('')}</div>
    </section>

    ${h.enquiry()}`,
  },

  // ── Cottages ────────────────────────────────────────────────────────────────────────────────────────────────────
  {
    path: '/cottages/',
    title: 'Cottages & Tariff in Wayanad | Nilara Hills, Mananthavady',
    description: '2BHK cottages (AC and non-AC) and AC A-Frames at Nilara Hills, Mananthavady, Wayanad. Tariff with breakfast, occupancy, extra person rates.',
    ogImage: 'room1',
    crumb: 'Cottages & tariff',
    h1: 'Cottages and A-Frames in Mananthavady, Wayanad',
    lead: 'Ten cottages around a garden and pool: eight two-bedroom cottages for families and friends, and two air-conditioned A-Frames for couples and small families. Breakfast is included.',
    body: (h) => {
      const r = h.cfg.rates;
      return `
    <div class="shell prose">
      <div>
        ${h.cfg.showPrices ? `<h2>Tariff per night</h2>
        <div class="table-wrap"><table class="info-table"><thead><tr><th>Stay</th><th>Per night</th><th>Includes</th></tr></thead><tbody>
          <tr><td>2BHK cottage, 1 AC room</td><td><strong>${inr(r.cottageAc)}</strong></td><td>Breakfast</td></tr>
          <tr><td>2BHK cottage, non-AC</td><td><strong>${inr(r.cottageNonAc)}</strong></td><td>Breakfast</td></tr>
          <tr><td>A-Frame cottage, AC</td><td><strong>${inr(r.aFrame)}</strong></td><td>Breakfast</td></tr>
        </tbody></table></div>
        <p>Extra person per night — 2BHK cottage: adult ${inr(r.extraAdultCottage)}, child ${inr(r.extraChildCottage)}. A-Frame: adult ${inr(r.extraAdultAFrame)}, child ${inr(r.extraChildAFrame)}. Campfire on request: ${inr(r.campfire)}. Rates can change for peak dates; we confirm the price when you book.</p>` : ''}
        <h2 id="two-bedroom">Two-bedroom (2BHK) cottages</h2>
        <p>Eight cottages, each with two bedrooms, one attached and one common bathroom, and warm timber interiors. They suit a family, or friends travelling together who want their own space.</p>
        <ul>
          <li><strong>5 cottages with one AC bedroom</strong> — one air-conditioned and one non-AC bedroom.</li>
          <li><strong>3 non-AC cottages</strong> — Wayanad’s hill air keeps evenings cool for much of the year.</li>
          <li><strong>Occupancy</strong> — 4 adults and 2 children below 6; maximum 7 guests.</li>
        </ul>
        <figure>${h.img('room1', { sizes: '(max-width:900px) 100vw, 760px' })}<figcaption>${h.caption('room1')}</figcaption></figure>
        <h2 id="a-frame">A-Frame cottages</h2>
        <p>Two fully air-conditioned A-Frame cottages with a cosy, sloping-roof design — a favourite with couples and small families.</p>
        <ul><li><strong>Occupancy</strong> — 2 adults and 2 children below 6; maximum 4 guests.</li></ul>
        <figure>${h.img('room2', { sizes: '(max-width:900px) 100vw, 760px' })}<figcaption>${h.caption('room2')}</figcaption></figure>
        <h2>Included with every stay</h2>
        <ul>${FACILITIES(h.cfg).map(([b, s]) => `<li><strong>${b}</strong> — ${s}</li>`).join('')}</ul>
        <h2>Good to know</h2>
        <ul>
          <li>Check-in from ${time12(h.cfg.checkIn)}, check-out by ${time12(h.cfg.checkOut)}.</li>
          <li>Lunch and dinner can be arranged on request.</li>
          <li>Booking several cottages, or the whole resort? See ${h.link('/group-stays/', 'group stays')} and ${h.link('/corporate-outings/', 'corporate outings')}.</li>
        </ul>
      </div>
      ${h.aside('Check availability', 'Send your check-in date and number of guests, and we will confirm availability right away.')}
    </div>`;
    },
  },

  // ── Group stays ─────────────────────────────────────────────────────────────────────────────────────────────────
  {
    path: '/group-stays/',
    title: 'Group & Family Stays in Wayanad | Nilara Hills, Mananthavady',
    description: 'Family get-togethers and group stays in Wayanad: ten cottages around one pool, DJ hall, BBQ and campfire, 2.5 km from Mananthavady. Book the whole resort.',
    ogImage: 'pool',
    crumb: 'Group stays',
    h1: 'Group and family stays in Wayanad',
    lead: 'Family reunions, birthdays and friends’ trips: Nilara Hills keeps your group together in one place, with a pool, DJ hall, BBQ and breakfast for everyone.',
    body: (h) => `
    <div class="shell prose">
      <div>
        <h2>Why groups choose Nilara Hills</h2>
        <ul>
          <li><strong>Everyone together</strong> — ten cottages around one garden and pool, instead of rooms spread across a hotel.</li>
          <li><strong>Room for families</strong> — each two-bedroom cottage takes up to 7 guests (4 adults and 2 children below 6).</li>
          <li><strong>A place to celebrate</strong> — a DJ hall for the party, BBQ for dinner, a campfire on request.</li>
          <li><strong>Children are looked after</strong> — a kids’ play area and the pool keep them busy.</li>
          <li><strong>Breakfast included</strong> — lunch and dinner for the whole group can be arranged.</li>
        </ul>
        <figure>${h.img('pool2', { sizes: '(max-width:900px) 100vw, 760px' })}<figcaption>${h.caption('pool2')}</figcaption></figure>
        <h2>Book the whole resort</h2>
        <p>For a private get-together you can book all of Nilara Hills — every cottage, the pool, the halls and the grounds — for your group alone. Tell us the dates and how many guests are coming, and we will send a whole-resort quote.</p>
        <h2>Planning a group trip to Wayanad</h2>
        <p>Nilara Hills is ${h.cfg.distanceFromTown} from Mananthavady, a good base for north Wayanad. Groups often combine a morning at ${h.link('/places-near-mananthavady/', 'Kuruva Island or Tholpetty')} with relaxed evenings by the pool. See ${h.link('/how-to-reach/', 'how to reach Nilara Hills')}.</p>
      </div>
      ${h.aside('Get a group quote', 'Share your dates and the number of adults and children, and we will confirm availability right away.')}
    </div>`,
  },

  // ── Corporate outings ───────────────────────────────────────────────────────────────────────────────────────────
  {
    path: '/corporate-outings/',
    title: 'Corporate Outings & Conference Hall in Wayanad | Nilara Hills',
    description: 'Team outings and offsites in Wayanad: 150-seat conference hall, DJ hall, pool, BBQ and ten cottages at Nilara Hills, 2.5 km from Mananthavady town.',
    ogImage: 'dining',
    crumb: 'Corporate outings',
    h1: 'Corporate outings and offsites in Wayanad',
    lead: 'A 150-seat conference hall for the day, a pool, BBQ and DJ hall for the evening, and ten cottages for the team — all at one resort near Mananthavady.',
    body: (h) => `
    <div class="shell prose">
      <div>
        <h2>Everything for a team outing in one place</h2>
        <ul>
          <li><strong>Conference hall, 150 seats</strong> — for meetings, training, launches and award nights.</li>
          <li><strong>DJ hall</strong> — for the team party after the work is done.</li>
          <li><strong>Swimming pool, BBQ and campfire</strong> — easy team-bonding evenings.</li>
          <li><strong>Ten cottages</strong> — 2BHK cottages and AC A-Frames keep the whole team on one property.</li>
          <li><strong>Breakfast included</strong> — lunch, dinner and tea breaks arranged for your schedule.</li>
        </ul>
        <figure>${h.img('dining', { sizes: '(max-width:900px) 100vw, 760px' })}<figcaption>${h.caption('dining')}</figcaption></figure>
        <h2>A simple one-night offsite</h2>
        <p>Arrive by lunch, hold sessions in the conference hall through the afternoon, then pool, BBQ and the DJ hall in the evening. After breakfast the next day, a short trip to Kuruva Island or the Tholpetty sanctuary before heading home.</p>
        <h2>Getting the team here</h2>
        <p>Nilara Hills is ${h.cfg.distanceFromTown} from Mananthavady town. Teams usually come by coach from Bengaluru via Mysuru, or from Kozhikode and Kannur. See ${h.link('/how-to-reach/', 'how to reach')}; we can help arrange transport.</p>
      </div>
      ${h.aside('Plan your outing', 'Share your dates, team size and what you need in the hall, and we will send a package quote.')}
    </div>`,
  },

  // ── Places nearby ───────────────────────────────────────────────────────────────────────────────────────────────
  {
    path: '/places-near-mananthavady/',
    title: 'Places to Visit near Mananthavady, Wayanad | Nilara Hills',
    description: 'Thirunelli Temple, Tholpetty Wildlife Sanctuary, Kuruva Island, Pazhassi Tomb and more — places to visit near Mananthavady, Wayanad, from Nilara Hills Resort.',
    ogImage: 'terrace',
    crumb: 'Places nearby',
    h1: 'Places to visit near Mananthavady, Wayanad',
    lead: `Staying at Nilara Hills, 2.5 km from Mananthavady town, puts north Wayanad’s temples, wildlife and river islands within an easy drive.`,
    body: (h) => `
    <div class="shell prose">
      <div>
        <p>Distances are approximate road distances from Mananthavady town; Nilara Hills is a further ${h.cfg.distanceFromTown}. Roads in Wayanad are narrow and winding, so allow extra time, and check opening days before you go — some sites close on certain days or limit visitors.</p>
        <div class="cards">${PLACES.map(placeCard).join('')}</div>
        <h2>A simple two-day plan</h2>
        <h3>Day 1</h3>
        <p>Early morning at Kuruva Island, lunch back at the resort, then the pool and an evening visit to Valliyoorkavu Temple or the Pazhassi Tomb in town.</p>
        <h3>Day 2</h3>
        <p>A morning safari at Tholpetty Wildlife Sanctuary, then on to Thirunelli Temple in the Brahmagiri hills before returning for a BBQ dinner at Nilara Hills.</p>
        <figure>${h.img('night', { sizes: '(max-width:900px) 100vw, 760px' })}<figcaption>${h.caption('night')}</figcaption></figure>
      </div>
      ${h.aside('Plan your stay', 'We can help you plan sightseeing around your stay at Nilara Hills.')}
    </div>`,
  },

  // ── How to reach ────────────────────────────────────────────────────────────────────────────────────────────────
  {
    path: '/how-to-reach/',
    title: 'How to Reach Nilara Hills, Mananthavady, Wayanad',
    description: 'Directions to Nilara Hills Resort, Kallumottamkunnu, 2.5 km from Mananthavady, Wayanad: by road from Bengaluru, Mysuru, Kozhikode, Kannur and Kalpetta.',
    ogImage: 'arrival',
    crumb: 'How to reach',
    h1: 'How to reach Nilara Hills, Mananthavady',
    lead: 'Nilara Hills is at Kallumottamkunnu, 2.5 km from Mananthavady town in north Wayanad. Most guests arrive by road.',
    body: (h) => `
    <div class="shell prose">
      <div>
        ${h.cfg.mapsUrl ? `<p><a class="button button-dark" href="${h.cfg.mapsUrl}" rel="noopener">Open Nilara Hills in Google Maps <span aria-hidden="true">→</span></a></p>` : ''}
        <h2>Address</h2><p>${h.addressLine()}</p>
        <h2>By road</h2>
        <div class="table-wrap"><table class="info-table"><thead><tr><th>From</th><th>Route (approx.)</th></tr></thead><tbody>
          <tr><td>Mananthavady town</td><td>${h.cfg.distanceFromTown} to the resort</td></tr>
          <tr><td>Bengaluru</td><td>Via Mysuru, H.D. Kote and Bavali into Mananthavady</td></tr>
          <tr><td>Mysuru</td><td>About 112 km to Mananthavady via H.D. Kote and Bavali</td></tr>
          <tr><td>Kalpetta</td><td>About 37 km to Mananthavady via Panamaram</td></tr>
          <tr><td>Kozhikode</td><td>Via the Kuttiady ghat road, or via Kalpetta and the Thamarassery ghat</td></tr>
          <tr><td>Kannur</td><td>Via Iritty and the Boys Town (Palchuram) ghat — steep, drive in daylight</td></tr>
        </tbody></table></div>
        <p>Distances are approximate; use Google Maps for the latest route, especially in the monsoon.</p>
        <h2>By air and rail</h2>
        <p>The nearest airports are <strong>Kannur International Airport</strong> and <strong>Calicut International Airport (Kozhikode)</strong>; guests driving via Mysuru often fly into <strong>Bengaluru</strong>. Mananthavady has no railway station — the nearest stations are on the coast at Kozhikode, Thalassery and Kannur, or at Mysuru. We can help arrange a taxi from the airport or station.</p>
        <h2>Arriving</h2>
        <p>Check-in is from ${time12(h.cfg.checkIn)}. If you are arriving late or early, let us know your expected time when you book.</p>
        <figure>${h.img('arrival', { sizes: '(max-width:900px) 100vw, 760px' })}<figcaption>${h.caption('arrival')}</figcaption></figure>
      </div>
      ${h.aside('Need directions?', 'Send us a message and we will share the exact location and help with transport.')}
    </div>`,
  },
];
