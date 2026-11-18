const KT = 'https://keralatourism.org/kerala-article/2021/tholpetty-wildlife-sanctuary/1113';
const KFE = 'https://keralaforestecotourism.com/app/booking/186/about.html';

export default {
  slug: 'tholpetty-wildlife-sanctuary-safari',
  publishDate: '2026-12-16',
  status: 'ready',
  hub: true,
  keyword: 'tholpetty wildlife sanctuary',
  checked: '2026-11-18',
  ogImage: 'night',
  cardLabel: 'Wildlife',
  title: 'Tholpetty Wildlife Sanctuary Safari, Wayanad: A Guide',
  description: 'Tholpetty Wildlife Sanctuary near Mananthavady, Wayanad: how the Forest Department jeep safari works, jeep charge, group size, contacts and what you may see.',
  h1: 'Tholpetty Wildlife Sanctuary, Wayanad: the jeep safari explained',
  lead: 'The northern part of the Wayanad Wildlife Sanctuary, 20 km from Mananthavady. Entry is by Forest Department jeep safari. Here is how it works.',
  excerpt: 'How the Forest Department jeep safari works, the jeep charge and group size, who to call, and what you may see.',
  crumb: 'Tholpetty safari',
  body: (h) => `
<h2>Where is Tholpetty Wildlife Sanctuary?</h2>
<p>Tholpetty is about 20 km northeast of Mananthavady on the Kodagu (Coorg) road, according to <a href="${KT}" rel="noopener">Kerala Tourism</a>. It is the northern of the two separate parts of the Wayanad Wildlife Sanctuary; the southern part is Muthanga.</p>
<p>Kerala Tourism gives the sanctuary’s area as about 345 sq km, established in 1973, and calls it the second-largest in Kerala after Periyar. The <a href="${KFE}" rel="noopener">Kerala Forest ecotourism booking page</a> gives 350 sq km. Nilara Hills is 2.5 km from Mananthavady town, so Tholpetty is one of the closer forest outings; see more ${h.link('/places-near-mananthavady/', 'places near Mananthavady')}.</p>

<h2>How does the Tholpetty jeep safari work?</h2>
<p>The safari is run by the Forest Department and, Kerala Tourism says, is organised twice a day. You need to hire a jeep for the ride.</p>
<p>The Forest Department’s booking page says the jeep charge of ₹900 is paid directly to the jeep driver, separate from the entry ticket, and a jeep takes a maximum of 7 people. The entry ticket price, the safari timings and the duration were not stated on the official pages we read.</p>
<p class="todo">[ASHWIN-LINE] Morning or evening safari: which do you suggest to guests from Nilara Hills, and why?</p>

<h2>What animals can you see at Tholpetty?</h2>
<p>Kerala Tourism lists elephants, tigers, panthers, jungle cats, civet cats, monkeys, wild dogs, bison (gaur), deer, bears and snakes. Birds include peacocks, babblers, cuckoos, owls, woodpeckers, jungle fowl and vultures.</p>
<p>Sightings are never guaranteed. Kerala Tourism mentions a lake where animals come to drink and a watchtower as highlights of the area.</p>

<h2>How many people fit in one safari jeep?</h2>
<p>Seven at most, according to the Forest Department booking page. A larger family or group will need more than one jeep, each with its own ₹900 charge paid to the driver.</p>
<p>For big groups staying together, see ${h.link('/group-stays/', 'group stays at Nilara Hills')}.</p>

<h2>Who do you contact for the Tholpetty safari?</h2>
<p>Kerala Tourism names the permitting authority as the Assistant Wildlife Warden, Tholpetty, Wayanad, phone +91 4935 250853. The Forest Department booking page gives the contact number 9946250853.</p>
<p>Call ahead to check timings and whether the safari is running, since the official pages we read do not say when it is closed.</p>

<h2>How do you reach Tholpetty?</h2>
<p>By road from Mananthavady on the Kodagu road. For trains, Kerala Tourism names Thalassery (about 60 km) as the nearest station; the nearest airports are Kannur International (about 90 km) and Calicut International (about 135 km). See ${h.link('/how-to-reach/', 'how to reach Nilara Hills')} for routes into Wayanad.</p>
<p>Thirunelli is reached by a turn at Kattikulam on the Mysore road from Mananthavady: see our ${h.post('thirunelli-temple-guide', 'Thirunelli Temple guide')}.</p>`,
  faq: [
    ['How far is Tholpetty from Mananthavady?', 'Kerala Tourism says Tholpetty is about 20 km northeast of Mananthavady on the Kodagu road.'],
    ['How much is the Tholpetty jeep safari?', 'The Forest Department booking page says ₹900 is paid directly to the jeep driver, apart from the entry ticket. A jeep takes up to 7 people.'],
    ['Who runs the Tholpetty safari?', 'The Forest Department. Kerala Tourism says it is organised twice a day.'],
  ],
  sources: [
    ['Kerala Tourism — Tholpetty Wildlife Sanctuary (newsletter, Sep 2021)', KT, '2026-11-18'],
    ['Kerala Forest Ecotourism — Tholpetty Wildlife Sanctuary jeep ride', KFE, '2026-11-18'],
    ['Kerala Tourism — Thirunelli Temple (route via Kattikulam)', 'https://www.keralatourism.org/wayanad/thirunelli-temple-mananthavady.php', '2026-11-18'],
  ],
};
