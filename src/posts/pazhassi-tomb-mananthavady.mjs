const KT = 'https://keralatourism.org/destination/pazhassi-tomb-wayanad/212';
const KTN = 'https://keralatourism.org/kerala-article/2022/pazhassi-tomb/1149';
const DTPC = 'https://www.dtpcwayanad.com/destination/pazhassi-smarakam-wayanad';

export default {
  slug: 'pazhassi-tomb-mananthavady',
  publishDate: '2027-01-27',
  status: 'ready',
  hub: true,
  keyword: 'pazhassi tomb',
  checked: '2026-11-18',
  ogImage: 'dining',
  cardLabel: 'In town',
  title: 'Pazhassi Tomb and Museum, Mananthavady: Visitor Guide',
  description: 'Pazhassi Tomb and Museum in Mananthavady, Wayanad: who Pazhassi Raja was, what the galleries hold, opening hours and tickets, and how to fit it into your stay.',
  h1: 'Pazhassi Tomb and Museum, Mananthavady: a visitor’s guide',
  lead: 'The memorial to Kerala Varma Pazhassi Raja stands on the Kabani in Mananthavady town, with a museum beside it. An easy outing from Nilara Hills.',
  excerpt: 'Who Pazhassi Raja was, what the museum galleries hold, and the opening hours and tickets as officially listed.',
  crumb: 'Pazhassi Tomb',
  body: (h) => `
<h2>What is the Pazhassi Tomb?</h2>
<p>It is the memorial to Kerala Varma Pazhassi Raja, built on the spot where his body was cremated, on the banks of the Kabani river in Mananthavady. <a href="${KT}" rel="noopener">Kerala Tourism</a> describes a laterite building with a traditional tiled roof and a statue of the Raja inside.</p>
<p>A museum stands in the same compound. Kerala Tourism says the tomb was converted into a museum in March 1996, and it is managed by the Kerala State Archaeology Department.</p>

<h2>Who was Pazhassi Raja?</h2>
<p>He was a ruler of the former kingdom of Kottayam, known as the “Lion of Kerala”. The <a href="${DTPC}" rel="noopener">Wayanad District Tourism Promotion Council (DTPC)</a> says he resisted the East India Company from 1793 until his death in 1805, and was among the few rulers to win a military victory against the British.</p>
<p>Kerala Tourism notes that he used the forests of Wayanad as his base for guerrilla campaigns.</p>

<h2>What can you see in the Pazhassi museum?</h2>
<p>A <a href="${KTN}" rel="noopener">Kerala Tourism article from 2022</a> lists four galleries: the Pazhassi Gallery, a Tribal Gallery, a Heritage Gallery and a Numismatic (coins) Gallery. Exhibits include British orders and letters about putting down the Pazhassi revolt, old weapons, stone statues, utensils and furniture used by tribal communities, rare coins, and an art gallery with works by Raja Ravi Varma.</p>
<p>DTPC says the Raja’s sword is preserved here. There is also a garden near the memorial.</p>
<p class="todo">[ASHWIN-LINE] When during a stay do you suggest guests visit the Pazhassi Tomb, and how long do they usually spend there?</p>

<h2>What are the Pazhassi Tomb timings and ticket prices?</h2>
<p>DTPC Wayanad lists entry from 9:00 am to 5:30 pm, with tickets at ₹30 for adults and ₹20 for children, and ₹1,000 for a photo shoot. It says only offline booking is available.</p>
<p>Kerala Tourism’s destination page, however, says there is no entry fee and gives no hours. The two official sources disagree, so carry a little cash and check at the gate. DTPC lists the contact number +91 75938 92958.</p>

<h2>How do you get to the Pazhassi Tomb from Nilara Hills?</h2>
<p>The tomb is in Mananthavady town, and Nilara Hills is 2.5 km from town, so it is a short drive. It makes an easy outing for an arrival afternoon or a slow last morning, alongside other ${h.link('/places-near-mananthavady/', 'places near Mananthavady')}.</p>
<p>For longer days out, see our guides to ${h.post('kuruva-island-wayanad-guide', 'Kuruva Island')}, ${h.post('thirunelli-temple-guide', 'Thirunelli Temple')} and ${h.post('tholpetty-wildlife-sanctuary-safari', 'Tholpetty Wildlife Sanctuary')}.</p>

<h2>When is the best time to visit the Pazhassi Tomb?</h2>
<p>It is open through the year, and Kerala Tourism recommends October to March, the cooler months. Read more in ${h.post('best-time-to-visit-wayanad', 'our guide to the best time to visit Wayanad')}.</p>
<p>If you are travelling with family or a group, see ${h.link('/group-stays/', 'group stays at Nilara Hills')}.</p>`,
  faq: [
    ['Where is the Pazhassi Tomb?', 'In Mananthavady town, Wayanad, on the banks of the Kabani river, according to Kerala Tourism.'],
    ['What are the Pazhassi Tomb timings?', 'DTPC Wayanad lists entry from 9:00 am to 5:30 pm. Kerala Tourism’s page gives no hours, so check at the gate.'],
    ['Who manages the Pazhassi Tomb and museum?', 'The Kerala State Archaeology Department, according to Kerala Tourism and DTPC Wayanad.'],
  ],
  sources: [
    ['Kerala Tourism — Pazhassi Tomb, Wayanad', KT, '2026-11-18'],
    ['Kerala Tourism — Pazhassi Tomb (newsletter, 2022)', KTN, '2026-11-18'],
    ['DTPC Wayanad — Pazhassi Smarakam', DTPC, '2026-11-18'],
  ],
};
