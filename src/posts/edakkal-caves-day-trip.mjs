const KT = 'https://keralatourism.org/wayanad/edakkal-caves-ambukuthi-hills.php';
const KTM = 'https://www.keralatourism.org/malabar/edakkal-caves/195';
const KTN = 'https://keralatourism.org/kerala-article/2021/edakkal-caves/1087';
const OM = 'https://www.onmanorama.com/travel/kerala/2026/01/03/daily-limit-kerala-edakkal-caves-rules.html';

export default {
  slug: 'edakkal-caves-day-trip',
  publishDate: '2026-12-23',
  status: 'ready',
  hub: true,
  keyword: 'edakkal caves',
  checked: '2026-11-18',
  ogImage: 'arrival',
  cardLabel: 'History',
  title: 'Edakkal Caves, Wayanad: Timings, Tickets and Daily Limit',
  description: 'Edakkal Caves in Wayanad: entry hours, Monday closure, the daily visitor cap, ticket prices, the climb and the ancient carvings, for a day trip from Mananthavady.',
  h1: 'Edakkal Caves, Wayanad: a day trip from Mananthavady',
  lead: 'Rock carvings thousands of years old, at the top of a steep climb on Ambukuthi hill. Go early: entry is capped each day.',
  excerpt: 'Entry hours, the Monday closure, the daily visitor cap, tickets and the climb to Wayanad’s Stone Age carvings.',
  crumb: 'Edakkal Caves',
  body: (h) => `
<h2>What are the Edakkal Caves?</h2>
<p>Edakkal is not a true cave but a deep cleft in the rock, roofed by a fallen boulder, on Ambukuthi hill in the Sulthan Bathery area of Wayanad. <a href="${KT}" rel="noopener">Kerala Tourism</a> gives its size as about 22 ft wide, 96 ft long and over 30 ft deep. The name means “a stone in between”.</p>
<p>Inside are three distinct sets of petroglyphs (rock carvings). Kerala Tourism says some are as old as 7,000 years and calls Edakkal the only known place for Stone Age carvings in South India.</p>

<h2>Where are the Edakkal Caves, and how far are they from Mananthavady?</h2>
<p>The caves are near Sulthan Bathery. Kerala Tourism gives two distances on different pages: about 16 km from Sulthan Bathery on its Wayanad page, and <a href="${KTM}" rel="noopener">12 km on its Malabar page</a>. A distance from Mananthavady was not stated in the sources we read.</p>
<p>From Nilara Hills, 2.5 km from Mananthavady town, check the drive time on Google Maps the evening before and plan to arrive early because of the daily cap. Closer outings are on our ${h.link('/places-near-mananthavady/', 'places near Mananthavady')} page.</p>

<h2>What are the Edakkal Caves timings?</h2>
<p>Entry starts at 8:30 am, and visitors are not allowed up to the hilltop after 4 pm, according to an <a href="${OM}" rel="noopener">Onmanorama report of 3 January 2026</a>. The caves are closed on Mondays.</p>
<p>The same report says daily entry is capped at 1,920 people, a limit set by the Archaeology Department, and the cap is often reached by the afternoon. So start early, especially in winter.</p>
<p class="todo">[ASHWIN-LINE] What time should guests leave Nilara Hills to reach Edakkal before the queue builds?</p>

<h2>How much is the Edakkal Caves ticket?</h2>
<p>Onmanorama listed these charges in January 2026: ₹50 for Indian visitors and ₹60 for foreign visitors, ₹25 for a still camera, ₹100 for a video camera, and ₹70 for the jeep shuttle. Kerala Tourism’s pages do not list fees, so check at the counter.</p>
<p>The caves and their surroundings are a plastic-free zone, so leave plastic bottles and bags in the car.</p>

<h2>How hard is the climb to Edakkal?</h2>
<p>It is steep. Kerala Tourism describes a trek of almost 45 minutes up Ambukuthi hill, past coffee plantations, and a <a href="${KTN}" rel="noopener">Kerala Tourism article from 2021</a> places the caves at around 1,200 m above sea level. The ticket office is near the top.</p>
<p>Wear good shoes, carry water in a non-plastic bottle, and take it slowly with children and older family members.</p>

<h2>Why is there a daily limit at Edakkal?</h2>
<p>Onmanorama reports that after the 2018 floods, water and debris, including stones, entered the cave and threatened the ancient carvings. The visitor limits were meant to be temporary, but the report says they had not been relaxed as of January 2026.</p>
<p>Inside the cave, an iron railing keeps visitors back from the carvings, Kerala Tourism notes.</p>

<h2>What do the Edakkal carvings show?</h2>
<p>Kerala Tourism lists human figures (including a figure with headgear and one on a wheeled cart), animals such as a deer and an elephant, plant motifs, weapons, and signs like crosses, wheels, stars and spirals. It also mentions scripts including Tamil Brahmi. The caves were discovered in 1895 by Fred Fawcett, then Superintendent of Police of Malabar District.</p>
<p>For more days out, see ${h.post('banasura-sagar-dam-guide', 'Banasura Sagar Dam')} and ${h.post('tholpetty-wildlife-sanctuary-safari', 'Tholpetty Wildlife Sanctuary')}, and ${h.link('/how-to-reach/', 'how to reach Nilara Hills')}.</p>`,
  faq: [
    ['Are the Edakkal Caves open on Monday?', 'No. Onmanorama reported in January 2026 that the caves are closed on Mondays.'],
    ['What time do the Edakkal Caves close?', 'Entry starts at 8:30 am and visitors are not allowed to the hilltop after 4 pm, according to Onmanorama (January 2026).'],
    ['How old are the Edakkal cave carvings?', 'Kerala Tourism says some of the petroglyphs are as old as 7,000 years.'],
  ],
  sources: [
    ['Kerala Tourism — Edakkal Caves, Ambukuthi Hills', KT, '2026-11-18'],
    ['Kerala Tourism — Edakkal Caves (Malabar)', KTM, '2026-11-18'],
    ['Kerala Tourism — Edakkal Caves (newsletter, Jun 2021)', KTN, '2026-11-18'],
    ['Onmanorama — Edakkal Caves daily limit and rules (3 Jan 2026)', OM, '2026-11-18'],
  ],
};
