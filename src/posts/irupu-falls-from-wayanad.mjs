const OM = 'https://www.onmanorama.com/travel/outside-kerala/2018/07/07/iruppu-waterfalls-karnataka-wayanad-border.html';
const KTT = 'https://keralatourism.org/kerala-article/2021/tholpetty-wildlife-sanctuary/1113';
const KTH = 'https://www.keralatourism.org/wayanad/thirunelli-temple-mananthavady.php';
const OT = 'https://www.outlookindia.com/traveller/ot-getaway-guides/brahmagiri-wildlife-sanctuary/';

export default {
  slug: 'irupu-falls-from-wayanad',
  publishDate: '2027-01-13',
  status: 'ready',
  hub: true,
  keyword: 'irupu falls',
  checked: '2026-11-18',
  ogImage: 'pool',
  cardLabel: 'Waterfall',
  title: 'Irupu Falls from Wayanad: Route, Entry and Tips',
  description: 'Irupu (Iruppu) Falls near Kutta, Kodagu, as a day trip from Mananthavady, Wayanad: the route past Tholpetty, the walk to the falls, entry fee and safety tips.',
  h1: 'Irupu Falls: a day trip from Mananthavady, Wayanad',
  lead: 'A forest waterfall just across the border in Karnataka, fed by the Brahmagiri hills. Here is how to plan it from Mananthavady, and what we could and could not confirm.',
  excerpt: 'The route past Tholpetty, the short forest walk, the entry fee as last reported, and safety at the falls.',
  crumb: 'Irupu Falls',
  body: (h) => `
<h2>Where is Irupu Falls?</h2>
<p>Irupu (also spelt Iruppu) Falls is near Kutta, a village close to Gonikoppal in Kodagu (Coorg) district, Karnataka. It is in the Brahmagiri range on the border with Wayanad, according to <a href="${OM}" rel="noopener">Onmanorama</a>, and its water comes from the Brahmagiri hills. Onmanorama puts the falls 8 km from Kutta.</p>
<p>Irupu is also an entry point to the Brahmagiri Wildlife Sanctuary on the Karnataka side, as <a href="${OT}" rel="noopener">Outlook Traveller</a> notes.</p>

<h2>How do you get to Irupu Falls from Mananthavady?</h2>
<p>The way is through Kattikulam and the Kodagu road: <a href="${KTT}" rel="noopener">Kerala Tourism</a> places Tholpetty Wildlife Sanctuary on this road, about 20 km northeast of Mananthavady, and Onmanorama says travellers from Kerala can reach Irupu via Mananthavady. Kerala Tourism’s <a href="${KTH}" rel="noopener">Thirunelli page</a> also notes that Thirunelli can be reached from Kutta.</p>
<p>A <a href="https://mysore.ind.in/?p=1433" rel="noopener">Mysuru travel site</a> lists the road from Kutta as about 2 km to the Kerala border, then 17 km to Kattikulam and 10 km to Mananthavady. None of the sources we read gives a single distance from Mananthavady to the falls, so check the route on Google Maps. The road crosses forest and a state border, so carry ID for everyone in the car and drive in daylight. Nilara Hills is 2.5 km from Mananthavady town; see more ${h.link('/places-near-mananthavady/', 'places near Mananthavady')}.</p>
<p class="todo">[ASHWIN-LINE] Do you suggest combining Irupu with a Tholpetty safari on the same day, and in which order?</p>

<h2>How long is the walk to Irupu Falls?</h2>
<p>Short. Onmanorama describes a walk of about 700 m from the valley to the falls, on cemented paths and forest trails. Wear shoes with grip, as forest paths near waterfalls can be wet.</p>

<h2>What is the entry fee at Irupu Falls?</h2>
<p>Onmanorama reported an entry fee of ₹50 per head, in an article published in December 2020. We could not find a current official figure, so treat it as a guide and check at the gate.</p>
<p>The same report says the site is maintained by Karnataka’s tourism department and has changing rooms. Opening hours were not stated.</p>

<h2>Can you bathe at Irupu Falls?</h2>
<p>Onmanorama says visitors may bathe, but must stay within the safety railing. It also notes the falls swell during heavy rain. Keep children within reach at all times, and stay out of the water when the flow is strong.</p>

<h2>What else is near Irupu Falls?</h2>
<p>Onmanorama mentions that Kutta is an entry point to Nagarhole National Park, and that Tholpetty is not far. On the Kerala side, see our ${h.post('tholpetty-wildlife-sanctuary-safari', 'Tholpetty safari guide')} and ${h.post('brahmagiri-trek-thirunelli', 'Brahmagiri trek guide')}.</p>
<p>For the drive back into Wayanad and other routes, see ${h.link('/how-to-reach/', 'how to reach Nilara Hills')}.</p>`,
  faq: [
    ['Which state is Irupu Falls in?', 'Karnataka. It is near Kutta in Kodagu district, on the border with Wayanad, according to Onmanorama.'],
    ['How far do you walk to reach Irupu Falls?', 'Onmanorama describes a walk of about 700 m from the valley on cemented paths and forest trails.'],
    ['Can you get into the water at Irupu Falls?', 'Onmanorama says bathing is allowed within the safety railing.'],
  ],
  sources: [
    ['Onmanorama — Iruppu waterfalls on the Karnataka–Wayanad border (published Dec 2020)', OM, '2026-11-18'],
    ['Kerala Tourism — Tholpetty Wildlife Sanctuary (newsletter, Sep 2021)', KTT, '2026-11-18'],
    ['Kerala Tourism — Thirunelli Temple', KTH, '2026-11-18'],
    ['Outlook Traveller — Brahmagiri Wildlife Sanctuary', OT, '2026-11-18'],
    ['mysore.ind.in — Mysore to Mananthavady routes (road distances)', 'https://mysore.ind.in/?p=1433', '2026-11-18'],
  ],
};
