// Every blog post, in publishing order. Add a new post: create src/posts/<slug>.mjs (copy an existing one),
// then import it here. A post goes live only when the weekly publisher lists it in src/published.json.
import kuruva from './kuruva-island-wayanad-guide.mjs';
import banasura from './banasura-sagar-dam-guide.mjs';
import thirunelli from './thirunelli-temple-guide.mjs';
import tholpetty from './tholpetty-wildlife-sanctuary-safari.mjs';
import edakkal from './edakkal-caves-day-trip.mjs';
import bestTime from './best-time-to-visit-wayanad.mjs';
import brahmagiri from './brahmagiri-trek-thirunelli.mjs';
import irupu from './irupu-falls-from-wayanad.mjs';
import bengaluru from './bangalore-to-mananthavady-by-road.mjs';
import pazhassi from './pazhassi-tomb-mananthavady.mjs';

export const POSTS = [kuruva, banasura, thirunelli, tholpetty, edakkal, bestTime, brahmagiri, irupu, bengaluru, pazhassi];
