const KT = 'https://www.keralatourism.org/destination/kuruvadweep-mananthavady/365';
const OM = 'https://www.onmanorama.com/news/kerala/2025/09/15/kuruva-islands-reopens-for-tourists.amp.html';

export default {
  slug: 'kuruva-island-wayanad-guide',
  publishDate: '2026-11-25',
  status: 'ready',
  hub: true,
  keyword: 'kuruva island',
  checked: '2026-11-18',
  ogImage: 'garden',
  cardLabel: 'River island',
  title: 'Kuruva Island, Wayanad: Season, Entry Limits and Tips',
  description: 'Kuruva Island near Mananthavady, Wayanad: when it is open, the daily visitor limit, bamboo rafts, rules and what to carry, checked against official sources.',
  h1: 'Kuruva Island, Wayanad: a visitor’s guide from Mananthavady',
  lead: 'A cluster of forest islands on the Kabini, reached by bamboo raft. Here is what to know before you go: the season, the daily limit and the rules.',
  excerpt: 'When Kuruva Island is open, how many visitors are let in each day, and what to carry for the raft crossing and forest walk.',
  crumb: 'Kuruva Island',
  body: (h) => `
<h2>What is Kuruva Island?</h2>
<p>Kuruva Island (Kuruvadweep) is a group of small forest islands on the Kabini river in north Wayanad, spread over about 950 acres. <a href="${KT}" rel="noopener">Kerala Tourism</a> describes it as uninhabited and protected, managed by the Kerala Forest Department.</p>
<p>People come for the raft crossing, quiet walks on forest and riverbank trails, birdwatching and photography. It is one of the bigger outings close to Mananthavady. See our other ${h.link('/places-near-mananthavady/', 'places to visit near Mananthavady')}.</p>

<h2>How far is Kuruva Island from Mananthavady?</h2>
<p>Kerala Tourism gives two figures on the same page: 14 km from Mananthavady in its summary, and about 17 km east of Mananthavady in the main text. Plan for something in that range, and check the gate you are using on Google Maps.</p>
<p>There are two entry points, at Pakkam and at Palvelicham, on opposite banks of the river. Nilara Hills is a further 2.5 km from Mananthavady town; see ${h.link('/how-to-reach/', 'how to reach Nilara Hills')}.</p>
<p class="todo">[ASHWIN-LINE] Which gate (Pakkam or Palvelicham) do you usually suggest to guests from Nilara, and how long does the drive take you?</p>

<h2>When is Kuruva Island open?</h2>
<p>Kerala Tourism lists Kuruva Island as open from October to May and closed in the monsoon, June to September, because of flooding risk. In practice the dates move with the weather.</p>
<p>In 2025, <a href="${OM}" rel="noopener">Onmanorama reported on 15 September</a> that the district administration had lifted a ban imposed during heavy rain, after the island had been closed for more than three months. Always check that it is open before you drive out, especially early and late in the season.</p>

<h2>How many visitors are allowed each day?</h2>
<p>Entry is limited. In the September 2025 reopening report, Onmanorama said up to 488 visitors a day would be allowed: 244 through Pakkam and 245 through Palvelicham (those two numbers add up to 489, so treat the total as approximate). Kerala Tourism only says that a limited number of tourists are allowed each day.</p>
<p>Because of the limit, go early in the day.</p>

<h2>What does entry cost?</h2>
<p>The same Onmanorama report gave the entry ticket as ₹247 per head in September 2025. It did not say whether the raft ride is included. Kerala Tourism does not list a fee. Carry cash in case, and check the current rate at the counter.</p>
<p>Opening and closing times were not stated in the sources we read.</p>

<h2>What are the rules on the island?</h2>
<p>Kerala Tourism says visitors need a permit from the Forest Department, swimming in the river is not allowed, and littering is not allowed. Raft rides only run when the current is safe: in 2025 they resumed only after strong currents subsided.</p>
<p>Wear shoes you can walk in on wet, uneven ground. Kerala Tourism suggests carrying water, snacks, insect repellent, a cap and binoculars or a camera.</p>

<h2>Is Kuruva Island good for families and groups?</h2>
<p>Yes, for families who can walk on uneven ground. Kerala Tourism describes it as a good place for family outings. Swimming is not allowed, so keep little ones close at the water’s edge, and arrive early with a large group because of the daily limit. If you are planning a family trip, see ${h.link('/group-stays/', 'group and family stays at Nilara Hills')}.</p>`,
  faq: [
    ['Is Kuruva Island open in the monsoon?', 'Kerala Tourism lists it as closed from June to September because of flooding risk. In 2025 it reopened in mid-September after being closed for more than three months.'],
    ['How many people can visit Kuruva Island in a day?', 'Onmanorama reported in September 2025 that up to 488 visitors a day would be allowed, split between the Pakkam and Palvelicham gates.'],
    ['Can you swim at Kuruva Island?', 'No. Kerala Tourism says swimming in the river is not allowed.'],
  ],
  sources: [
    ['Kerala Tourism — Kuruvadweep, Mananthavady', KT, '2026-11-18'],
    ['Onmanorama — Kuruva islands reopen for tourists (15 Sep 2025)', OM, '2026-11-18'],
  ],
};
