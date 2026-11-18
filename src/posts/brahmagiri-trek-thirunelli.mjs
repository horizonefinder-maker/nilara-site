const KT = 'https://www.keralatourism.org/ecotourism/trekking-programs/brahmagiri-trekking/19';
const KFE = 'https://keralaforestecotourism.com/brahmagiri';

export default {
  slug: 'brahmagiri-trek-thirunelli',
  publishDate: '2027-01-06',
  status: 'ready',
  hub: true,
  keyword: 'brahmagiri trek',
  checked: '2026-11-18',
  ogImage: 'terrace',
  cardLabel: 'Trek',
  title: 'Brahmagiri Trek from Thirunelli, Wayanad: Slots and Fees',
  description: 'The Brahmagiri trek from Thirunelli, Wayanad: start times, closed days, group fee, distance and how hard it is, from the Kerala Tourism ecotourism listing.',
  h1: 'Brahmagiri trek from Thirunelli, Wayanad: what to know',
  lead: 'A guided Forest Department trek from Thirunelli up to the Brahmagiri summit, about 34 km from Mananthavady. Here are the start slots, closed days and fees as officially listed.',
  excerpt: 'Start slots, closed days, the group fee and what the climb is like on the Forest Department trek from Thirunelli.',
  crumb: 'Brahmagiri trek',
  body: (h) => `
<h2>What is the Brahmagiri trek?</h2>
<p>It is a Forest Department trekking programme that starts from the department’s camp shed at Thirunelli and climbs to the Brahmagiri summit, about 1,608 m high. <a href="${KT}" rel="noopener">Kerala Tourism’s ecotourism listing</a> describes about 10 km of walking, with over three hours of climbing to the top.</p>
<p>Kerala Tourism calls it moderate and suitable for first-time trekkers, but says the steep climb is tiring. Go with a reasonable level of fitness.</p>

<h2>How far is Brahmagiri from Mananthavady?</h2>
<p>The <a href="${KFE}" rel="noopener">Kerala Forest ecotourism page</a> says Brahmagiri is 34 km from Mananthavady via Thirunelli. Roads are tarred up to Thirunelli; beyond the Thirunelli Forest Inspection Bungalow, the way to Brahmagiri is an old forest road.</p>
<p>Nilara Hills is 2.5 km from Mananthavady town, which makes it a convenient base for an early start. The drive is the same road you take to the temple: see our ${h.post('thirunelli-temple-guide', 'Thirunelli Temple guide')} and ${h.link('/places-near-mananthavady/', 'places near Mananthavady')}.</p>

<h2>What time does the Brahmagiri trek start?</h2>
<p>Kerala Tourism lists four departure slots: 7:30 am, 8:00 am, 8:30 am and 9:00 am. Entry closes at 10:00 am.</p>
<p>That means leaving Mananthavady very early. Carry enough water and snacks for the day.</p>
<p class="todo">[ASHWIN-LINE] What time do you suggest guests leave Nilara Hills to make the first Brahmagiri slot?</p>

<h2>On which days is the Brahmagiri trek closed?</h2>
<p>The programme is closed on Mondays and Fridays, according to Kerala Tourism. It also says availability depends on the weather and other conditions, and asks visitors to confirm before they go.</p>
<p>The listing does not give a phone number or a trekking season, so check with the Forest Department at Thirunelli before you set out.</p>

<h2>How much does the Brahmagiri trek cost?</h2>
<p>Kerala Tourism lists ₹2,400 for a group of 5 people, tax included, and ₹315 for each extra person. The listing mentions a guide but gives no separate guide fee.</p>
<p>Fees change; confirm the current amount when you check the day’s availability.</p>

<h2>Can you trek to Pakshipathalam from Brahmagiri?</h2>
<p>The Kerala Forest ecotourism page describes a 6 km trail from Brahmagiri into the interior and a further 4 km to Pakshipathalam. It does not say whether that section is open to visitors now or what permission it needs.</p>
<p>Do not attempt it on your own. Ask the Forest Department what is allowed when you book the Brahmagiri trek.</p>

<h2>How do you reach the Brahmagiri trek start?</h2>
<p>By road through Mananthavady and Thirunelli. Kerala Tourism lists Thalassery railway station about 108 km away, Kozhikode station about 130 km, and Calicut International Airport about 150 km. For the drive into Wayanad, see ${h.link('/how-to-reach/', 'how to reach Nilara Hills')}.</p>
<p>Groups trekking together can stay under one roof: see ${h.link('/group-stays/', 'group stays')}.</p>`,
  faq: [
    ['What time does the Brahmagiri trek start?', 'Kerala Tourism lists start slots at 7:30, 8:00, 8:30 and 9:00 am, with entry closing at 10:00 am.'],
    ['Is the Brahmagiri trek open every day?', 'No. Kerala Tourism says the programme is closed on Mondays and Fridays.'],
    ['How long is the Brahmagiri trek?', 'Kerala Tourism describes about 10 km of walking, with over three hours of climbing to the summit at about 1,608 m.'],
  ],
  sources: [
    ['Kerala Tourism — Brahmagiri trekking programme', KT, '2026-11-18'],
    ['Kerala Forest Ecotourism — Brahmagiri', KFE, '2026-11-18'],
  ],
};
