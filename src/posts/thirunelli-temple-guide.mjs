const KT = 'https://www.keralatourism.org/wayanad/thirunelli-temple-mananthavady.php';
const KT2 = 'https://www.keralatourism.org/thalassery/photo-gallery/papanasini-thirunelli-temple/251';

export default {
  slug: 'thirunelli-temple-guide',
  publishDate: '2026-12-09',
  status: 'ready',
  hub: true,
  keyword: 'thirunelli temple',
  checked: '2026-11-18',
  ogImage: 'terrace',
  cardLabel: 'Temple',
  title: 'Thirunelli Temple, Wayanad: How to Visit from Mananthavady',
  description: 'Visiting Thirunelli Temple in the Brahmagiri hills, Wayanad: the forest road from Mananthavady, Papanasini, what to see and how to plan a respectful visit.',
  h1: 'Thirunelli Temple, Wayanad: a visitor’s guide from Mananthavady',
  lead: 'An ancient Vishnu temple at the foot of the Brahmagiri hills, reached by a forest road from Mananthavady. Here is what to know before you go.',
  excerpt: 'The forest road from Mananthavady, Papanasini, the temple’s granite architecture, and how to plan a respectful visit.',
  crumb: 'Thirunelli Temple',
  body: (h) => `
<h2>Where is Thirunelli Temple?</h2>
<p>Thirunelli Temple is in Thirunelli village, at the base of the Brahmagiri hills on the Kerala–Karnataka border. <a href="${KT}" rel="noopener">Kerala Tourism</a> places it about 30 km from Mananthavady, in the forest region of Brahmagiri.</p>
<p>The temple is dedicated to Lord Vishnu and is known as the “Kashi of the South” because of its religious importance. Nilara Hills is 2.5 km from Mananthavady town. See more ${h.link('/places-near-mananthavady/', 'places near Mananthavady')}.</p>

<h2>How do you reach Thirunelli from Mananthavady?</h2>
<p>Kerala Tourism’s directions are to take the Mysore road from Mananthavady and turn off at Kattikulam for Thirunelli. The road passes dense forest, elephant country and bamboo forest. Thirunelli can also be reached from Kutta in Karnataka.</p>
<p>Because the road runs through forest, drive slowly and watch for animals on the road. Plan to travel in daylight.</p>
<p class="todo">[ASHWIN-LINE] What time do you suggest guests leave Nilara Hills for Thirunelli, and why?</p>

<h2>What is Papanasini?</h2>
<p>Papanasini is a mountain stream that flows down from the Brahmagiri hills, about a kilometre from the temple. Its name means the stream that washes away sins. <a href="${KT2}" rel="noopener">Kerala Tourism</a> notes that ancestral rites are performed here: pilgrims perform the rites standing in its water and then bathe.</p>
<p>If you are visiting as a traveller rather than for the rites, keep a respectful distance from people performing them, and ask before taking photographs.</p>

<h2>What should you see at Thirunelli Temple?</h2>
<p>Kerala Tourism describes classic Kerala temple architecture: a tile-roofed inner shrine, an open courtyard and a granite lamp post at the entrance. The shrine is supported by 30 granite pieces and the floor is paved with large granite blocks.</p>
<p>The temple has no well. Water reaches it through stone aqueducts from a stream in the Brahmagiri foothills. Look also for the Vilakkumaadam, a granite-pillared corridor left unfinished on its eastern side, and Panchatheertham, the temple pond, with a boulder bearing the Vishnupada (Vishnu’s footprint). The temple faces east, and Kerala Tourism notes the view of sunrise from here.</p>

<h2>How old is Thirunelli Temple?</h2>
<p>The temple is believed to be over 1,000 years old, though Kerala Tourism says there is no recorded origin and only limited historical information. Copper plate inscriptions from the reigns of Bhaskara Ravi Varma I and II (10th–11th century) were found here, and the place appears in the Malayalam work Unniyachi Champu.</p>
<p>Legend says Lord Brahma found an idol of Vishnu under an amla (gooseberry) tree here and installed it; “Thirunelli” is linked to the Malayalam for holy gooseberry.</p>

<h2>What should visitors know before going?</h2>
<p>Kerala Tourism does not list visiting hours or a dress code, so we have not given them here. Follow the customs shown at the temple and dress modestly, as you would at any Kerala temple, and check timings locally before you set out.</p>
<p>There is a temple-owned guest house and a few small lodges near the temple, according to Kerala Tourism. The <a href="https://www.keralatourism.org/ecotourism/trekking-programs/brahmagiri-trekking/19" rel="noopener">Brahmagiri trek</a> also starts from a Forest Department point at Thirunelli. For another day out, see our guide to ${h.post('kuruva-island-wayanad-guide', 'Kuruva Island')}. For travel to Wayanad, see ${h.link('/how-to-reach/', 'how to reach Nilara Hills')}.</p>`,
  faq: [
    ['How far is Thirunelli Temple from Mananthavady?', 'Kerala Tourism places Thirunelli about 30 km from Mananthavady, reached by the Mysore road and a turn at Kattikulam.'],
    ['Why is Thirunelli called the Kashi of the South?', 'Kerala Tourism says it is known as the Kashi of the South because of its religious significance, including ancestral rites performed at the Papanasini stream.'],
    ['How far is Papanasini from Thirunelli Temple?', 'Kerala Tourism says the Papanasini stream is about a kilometre from the temple.'],
  ],
  sources: [
    ['Kerala Tourism — Thirunelli Temple, Mananthavady', KT, '2026-11-18'],
    ['Kerala Tourism — Papanasini, Thirunelli Temple', KT2, '2026-11-18'],
    ['Kerala Tourism — Brahmagiri trekking programme', 'https://www.keralatourism.org/ecotourism/trekking-programs/brahmagiri-trekking/19', '2026-11-18'],
  ],
};
