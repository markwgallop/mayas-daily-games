/**
 * Cartoon character art + celebration animations.
 *
 * All art is inline SVG built here rather than loaded as image files, so the
 * app keeps its zero-asset / zero-extra-request property and renders the same
 * on every device (system emoji fonts do not).
 *
 * Two roles:
 *   - CELEBRATION_CHARACTERS — one pops up on every correct answer, in games.
 *   - DRAGON_TRIBES          — one dragon is assembled from four jigsaw
 *                              pieces on the landing page, one piece per
 *                              completed game.
 *
 * Depends on: seed.js (todayRNG, seededInt) for picking the day's build character.
 */

/* =========================================================
   Celebration characters — every one is a happy face.
   Each returns SVG inner markup against viewBox "0 0 100 100".
   ========================================================= */

const CELEBRATION_CHARACTERS = [
  // Cat
  () => `
    <path d="M26 34 L22 12 L42 24 Z" fill="#F5A623" stroke="#8a5a10" stroke-width="3" stroke-linejoin="round"/>
    <path d="M74 34 L78 12 L58 24 Z" fill="#F5A623" stroke="#8a5a10" stroke-width="3" stroke-linejoin="round"/>
    <circle cx="50" cy="54" r="32" fill="#F7B944" stroke="#8a5a10" stroke-width="3"/>
    <circle cx="39" cy="48" r="4.5" fill="#1a1a2e"/>
    <circle cx="61" cy="48" r="4.5" fill="#1a1a2e"/>
    <path d="M42 62 Q50 71 58 62" fill="none" stroke="#1a1a2e" stroke-width="3.5" stroke-linecap="round"/>
    <path d="M18 54 H32 M18 62 H32 M82 54 H68 M82 62 H68" stroke="#8a5a10" stroke-width="2.5" stroke-linecap="round"/>`,

  // Fox
  () => `
    <path d="M24 32 L20 10 L40 22 Z" fill="#E8703A" stroke="#8c3d12" stroke-width="3" stroke-linejoin="round"/>
    <path d="M76 32 L80 10 L60 22 Z" fill="#E8703A" stroke="#8c3d12" stroke-width="3" stroke-linejoin="round"/>
    <circle cx="50" cy="52" r="31" fill="#F0824A" stroke="#8c3d12" stroke-width="3"/>
    <ellipse cx="50" cy="68" rx="20" ry="14" fill="#FFF6EC"/>
    <circle cx="38" cy="46" r="4.5" fill="#1a1a2e"/>
    <circle cx="62" cy="46" r="4.5" fill="#1a1a2e"/>
    <circle cx="50" cy="62" r="4" fill="#1a1a2e"/>
    <path d="M42 70 Q50 78 58 70" fill="none" stroke="#1a1a2e" stroke-width="3" stroke-linecap="round"/>`,

  // Frog
  () => `
    <circle cx="32" cy="26" r="14" fill="#6FCF6F" stroke="#2f7a2f" stroke-width="3"/>
    <circle cx="68" cy="26" r="14" fill="#6FCF6F" stroke="#2f7a2f" stroke-width="3"/>
    <circle cx="32" cy="26" r="6" fill="#1a1a2e"/>
    <circle cx="68" cy="26" r="6" fill="#1a1a2e"/>
    <path d="M14 52 a36 30 0 0 0 72 0 Z" fill="#7ED97E" stroke="#2f7a2f" stroke-width="3" stroke-linejoin="round"/>
    <path d="M32 64 Q50 78 68 64" fill="none" stroke="#2f7a2f" stroke-width="3.5" stroke-linecap="round"/>
    <circle cx="26" cy="60" r="4" fill="#F2A0A0" opacity="0.8"/>
    <circle cx="74" cy="60" r="4" fill="#F2A0A0" opacity="0.8"/>`,

  // Robot
  () => `
    <path d="M50 8 V20" stroke="#5a5a7a" stroke-width="3.5" stroke-linecap="round"/>
    <circle cx="50" cy="8" r="6" fill="#E74C3C"/>
    <rect x="18" y="22" width="64" height="52" rx="12" fill="#9BB7D4" stroke="#3c5872" stroke-width="3"/>
    <rect x="30" y="36" width="14" height="14" rx="4" fill="#1a1a2e"/>
    <rect x="56" y="36" width="14" height="14" rx="4" fill="#1a1a2e"/>
    <circle cx="34" cy="40" r="3" fill="#fff"/>
    <circle cx="60" cy="40" r="3" fill="#fff"/>
    <path d="M34 60 Q50 70 66 60" fill="none" stroke="#3c5872" stroke-width="3.5" stroke-linecap="round"/>
    <rect x="26" y="78" width="48" height="10" rx="5" fill="#7B96B0" stroke="#3c5872" stroke-width="3"/>`,

  // Star
  () => `
    <path d="M50 6 L61 38 L95 38 L67 58 L78 90 L50 70 L22 90 L33 58 L5 38 L39 38 Z"
          fill="#FFD34E" stroke="#B8860B" stroke-width="3" stroke-linejoin="round"/>
    <circle cx="41" cy="48" r="4" fill="#1a1a2e"/>
    <circle cx="59" cy="48" r="4" fill="#1a1a2e"/>
    <path d="M42 58 Q50 66 58 58" fill="none" stroke="#1a1a2e" stroke-width="3" stroke-linecap="round"/>`,

  // Rocket
  () => `
    <path d="M32 74 L18 88 L34 86 Z" fill="#D64545" stroke="#7d2020" stroke-width="3" stroke-linejoin="round"/>
    <path d="M68 74 L82 88 L66 86 Z" fill="#D64545" stroke="#7d2020" stroke-width="3" stroke-linejoin="round"/>
    <path d="M50 4 C68 24 70 52 66 78 H34 C30 52 32 24 50 4 Z"
          fill="#EDF1F5" stroke="#3c5872" stroke-width="3" stroke-linejoin="round"/>
    <circle cx="50" cy="36" r="12" fill="#7FC4E8" stroke="#3c5872" stroke-width="3"/>
    <circle cx="46" cy="34" r="2.5" fill="#1a1a2e"/>
    <circle cx="55" cy="34" r="2.5" fill="#1a1a2e"/>
    <path d="M45 41 Q50 46 55 41" fill="none" stroke="#1a1a2e" stroke-width="2.5" stroke-linecap="round"/>
    <path d="M40 80 Q50 100 60 80 Q50 88 40 80 Z" fill="#F5A623" stroke="#c47a06" stroke-width="2.5" stroke-linejoin="round"/>`,

  // Owl
  () => `
    <path d="M22 28 L26 10 L40 20 Z" fill="#9B6B3F" stroke="#5c3d20" stroke-width="3" stroke-linejoin="round"/>
    <path d="M78 28 L74 10 L60 20 Z" fill="#9B6B3F" stroke="#5c3d20" stroke-width="3" stroke-linejoin="round"/>
    <ellipse cx="50" cy="54" rx="32" ry="34" fill="#B07D4B" stroke="#5c3d20" stroke-width="3"/>
    <circle cx="37" cy="44" r="13" fill="#FFF6EC" stroke="#5c3d20" stroke-width="2.5"/>
    <circle cx="63" cy="44" r="13" fill="#FFF6EC" stroke="#5c3d20" stroke-width="2.5"/>
    <circle cx="37" cy="45" r="5.5" fill="#1a1a2e"/>
    <circle cx="63" cy="45" r="5.5" fill="#1a1a2e"/>
    <path d="M50 56 L44 64 H56 Z" fill="#F5A623" stroke="#a86f06" stroke-width="2" stroke-linejoin="round"/>
    <path d="M38 74 Q50 82 62 74" fill="none" stroke="#5c3d20" stroke-width="3" stroke-linecap="round"/>`,

  // Dragon
  () => `
    <path d="M30 24 L26 6 L42 18 Z" fill="#7ED97E" stroke="#2f7a2f" stroke-width="3" stroke-linejoin="round"/>
    <path d="M70 24 L74 6 L58 18 Z" fill="#7ED97E" stroke="#2f7a2f" stroke-width="3" stroke-linejoin="round"/>
    <ellipse cx="50" cy="52" rx="33" ry="30" fill="#6FCF6F" stroke="#2f7a2f" stroke-width="3"/>
    <ellipse cx="50" cy="66" rx="19" ry="13" fill="#C8F0C8"/>
    <circle cx="38" cy="44" r="5" fill="#1a1a2e"/>
    <circle cx="62" cy="44" r="5" fill="#1a1a2e"/>
    <circle cx="44" cy="62" r="2.5" fill="#2f7a2f"/>
    <circle cx="56" cy="62" r="2.5" fill="#2f7a2f"/>
    <path d="M40 70 Q50 78 60 70" fill="none" stroke="#2f7a2f" stroke-width="3" stroke-linecap="round"/>`,
];

/* =========================================================
   Build-up dragons — one per tribe, cut into four jigsaw pieces.

   Original artwork, not traced from anything: a shared dragon
   silhouette recoloured and re-detailed per tribe. The whole dragon is
   drawn once into <defs>, then four clipped <use> elements cut it into
   interlocking quarters, so the pieces always fit together perfectly.
   ========================================================= */

/** Tribe palettes and the accent detail that makes each one recognisable. */
const DRAGON_TRIBES = [
  { name: 'SkyWing',   body: '#E8562F', belly: '#F7C08A', wing: '#F08A5D', line: '#8C2A10', horn: '#F7C08A', accent: 'none'    },
  { name: 'SeaWing',   body: '#2E9B8F', belly: '#9FE5DC', wing: '#4FBFB0', line: '#12564F', horn: '#9FE5DC', accent: 'glow'    },
  { name: 'RainWing',  body: 'url(#wof-rain)', belly: '#FFE9A8', wing: '#8AD9C0', line: '#7A3E8C', horn: '#FFE9A8', accent: 'none' },
  { name: 'NightWing', body: '#3B3355', belly: '#6E6390', wing: '#4C4470', line: '#1A1630', horn: '#8E85B5', accent: 'stars'   },
  { name: 'IceWing',   body: '#CFE6F5', belly: '#FFFFFF', wing: '#A9D3EC', line: '#4A7EA0', horn: '#FFFFFF', accent: 'spikes'  },
  { name: 'MudWing',   body: '#8C6239', belly: '#D9B683', wing: '#A67C4E', line: '#4E3417', horn: '#D9B683', accent: 'none'    },
  { name: 'SandWing',  body: '#E3C77E', belly: '#F7EBC4', wing: '#EAD69F', line: '#8A6B22', horn: '#F7EBC4', accent: 'barb'    },
];

/** The full dragon, drawn once on a 0 0 120 120 canvas. */
function _dragonArt(t) {
  const L = t.line;

  // Wings sweep up and out from the shoulders to the top corners, with a
  // scalloped trailing edge and finger bones — the thing that makes a
  // silhouette read as "dragon" rather than "bat-eared animal".
  const wing = (flip) => {
    const g = flip ? 'transform="translate(120,0) scale(-1,1)"' : '';
    return `<g ${g}>
      <path d="M50 76 C 38 60, 20 34, 3 20
               C 7 35, 10 45, 13 53
               Q 23 53, 28 60
               Q 35 62, 39 67
               Q 45 72, 50 76 Z"
            fill="${t.wing}" stroke="${L}" stroke-width="2.4" stroke-linejoin="round"/>
      <path d="M50 76 L 3 20 M50 76 L 13 53 M50 76 L 28 60 M50 76 L 39 67"
            fill="none" stroke="${L}" stroke-width="1.5" opacity="0.55"/>
    </g>`;
  };

  const glow = t.accent === 'glow' ? `
    <circle cx="48" cy="80" r="2.4" fill="#BFFFF4"/><circle cx="48" cy="92" r="2.4" fill="#BFFFF4"/>
    <circle cx="72" cy="80" r="2.4" fill="#BFFFF4"/><circle cx="72" cy="92" r="2.4" fill="#BFFFF4"/>
    <circle cx="22" cy="38" r="2.2" fill="#BFFFF4"/><circle cx="98" cy="38" r="2.2" fill="#BFFFF4"/>
    <circle cx="32" cy="52" r="1.8" fill="#BFFFF4"/><circle cx="88" cy="52" r="1.8" fill="#BFFFF4"/>` : '';

  const stars = t.accent === 'stars' ? `
    <circle cx="20" cy="34" r="1.8" fill="#E8E2FF"/><circle cx="30" cy="50" r="1.4" fill="#E8E2FF"/>
    <circle cx="12" cy="26" r="1.3" fill="#E8E2FF"/><circle cx="100" cy="34" r="1.8" fill="#E8E2FF"/>
    <circle cx="90" cy="50" r="1.4" fill="#E8E2FF"/><circle cx="108" cy="26" r="1.3" fill="#E8E2FF"/>` : '';

  // IceWing: a spined crest down the neck and along the tail.
  const spikes = t.accent === 'spikes' ? `
    <path d="M60 20 L57 27 L63 27 Z" fill="${t.horn}" stroke="${L}" stroke-width="1.5" stroke-linejoin="round"/>
    <path d="M88 100 L94 96 L92 103 Z" fill="${t.horn}" stroke="${L}" stroke-width="1.5" stroke-linejoin="round"/>
    <path d="M100 110 L107 108 L103 114 Z" fill="${t.horn}" stroke="${L}" stroke-width="1.5" stroke-linejoin="round"/>` : '';

  // SandWing: the barbed tail tip.
  const barb = t.accent === 'barb' ? `
    <path d="M108 114 L119 108 L112 120 Z" fill="${t.horn}" stroke="${L}" stroke-width="1.8" stroke-linejoin="round"/>` : '';

  return `
    ${wing(false)}${wing(true)}
    ${stars}
    <!-- tail, sweeping out to the bottom-right -->
    <path d="M78 98 C 98 102, 109 109, 111 117" fill="none" stroke="${L}" stroke-width="9.5" stroke-linecap="round"/>
    <path d="M78 98 C 98 102, 109 109, 111 117" fill="none" stroke="${t.body}" stroke-width="6" stroke-linecap="round"/>
    ${barb}
    <!-- hind legs -->
    <ellipse cx="40" cy="105" rx="11" ry="8.5" fill="${t.body}" stroke="${L}" stroke-width="2.4"/>
    <ellipse cx="80" cy="105" rx="11" ry="8.5" fill="${t.body}" stroke="${L}" stroke-width="2.4"/>
    <path d="M33 110 h4 M40 111 h4 M47 110 h4" stroke="${L}" stroke-width="1.6" stroke-linecap="round"/>
    <path d="M73 110 h4 M80 111 h4 M87 110 h4" stroke="${L}" stroke-width="1.6" stroke-linecap="round"/>
    <!-- neck, drawn behind the body and head -->
    <path d="M53 44 L67 44 L72 76 L48 76 Z" fill="${t.body}" stroke="${L}" stroke-width="2.4" stroke-linejoin="round"/>
    <!-- body -->
    <ellipse cx="60" cy="84" rx="23" ry="22" fill="${t.body}" stroke="${L}" stroke-width="2.6"/>
    <ellipse cx="60" cy="89" rx="12.5" ry="14" fill="${t.belly}"/>
    <path d="M50 82 h20 M50 90 h20 M52 97 h16" stroke="${L}" stroke-width="1.2" opacity="0.3"/>
    ${glow}
    <!-- horns, swept back -->
    <path d="M50 30 C 43 21, 37 11, 35 3 C 44 10, 52 20, 56 27 Z"
          fill="${t.horn}" stroke="${L}" stroke-width="2.1" stroke-linejoin="round"/>
    <path d="M70 30 C 77 21, 83 11, 85 3 C 76 10, 68 20, 64 27 Z"
          fill="${t.horn}" stroke="${L}" stroke-width="2.1" stroke-linejoin="round"/>
    <!-- head -->
    <ellipse cx="60" cy="36" rx="16" ry="14" fill="${t.body}" stroke="${L}" stroke-width="2.6"/>
    <ellipse cx="60" cy="47" rx="10" ry="7.5" fill="${t.belly}" stroke="${L}" stroke-width="2.2"/>
    <circle cx="54" cy="34" r="3.4" fill="#1a1a2e"/>
    <circle cx="66" cy="34" r="3.4" fill="#1a1a2e"/>
    <circle cx="55.1" cy="32.9" r="1.2" fill="#fff"/>
    <circle cx="67.1" cy="32.9" r="1.2" fill="#fff"/>
    <circle cx="57" cy="45" r="1.4" fill="${L}"/>
    <circle cx="63" cy="45" r="1.4" fill="${L}"/>
    <path d="M55 50 Q60 54 65 50" fill="none" stroke="${L}" stroke-width="2" stroke-linecap="round"/>
    ${spikes}`;
}

/* ---- Jigsaw geometry ----------------------------------------------------
   The four pieces share their seams: each interior edge is generated by the
   same helper and simply traversed in the opposite direction by the
   neighbouring piece, so the cuts interlock exactly with no gaps.        */

const _JIG_T = 9;    // tab half-height
const _JIG_B = 15;   // how far the tab bulges

/** Vertical seam at x=60, travelling down from y0. `dir` bulges the tab +x or -x. */
function _vSeamDown(y0, dir) {
  const m = y0 + 30, b = 60 + dir * _JIG_B;
  return `L 60 ${m - _JIG_T} C ${b} ${m - 13}, ${b} ${m + 13}, 60 ${m + _JIG_T} L 60 ${y0 + 60}`;
}
/** The same seam travelled upward, for the neighbouring piece. */
function _vSeamUp(y0, dir) {
  const m = y0 + 30, b = 60 + dir * _JIG_B;
  return `L 60 ${m + _JIG_T} C ${b} ${m + 13}, ${b} ${m - 13}, 60 ${m - _JIG_T} L 60 ${y0}`;
}
/** Horizontal seam at y=60, travelling right from x0. `dir` bulges the tab +y or -y. */
function _hSeamRight(x0, dir) {
  const m = x0 + 30, b = 60 + dir * _JIG_B;
  return `L ${m - _JIG_T} 60 C ${m - 13} ${b}, ${m + 13} ${b}, ${m + _JIG_T} 60 L ${x0 + 60} 60`;
}
/** The same seam travelled leftward, for the neighbouring piece. */
function _hSeamLeft(x0, dir) {
  const m = x0 + 30, b = 60 + dir * _JIG_B;
  return `L ${m + _JIG_T} 60 C ${m + 13} ${b}, ${m - 13} ${b}, ${m - _JIG_T} 60 L ${x0} 60`;
}

/**
 * The four pieces, clockwise from top-left, each with the direction it flies
 * in from and the point it pivots around as it locks into place.
 */
const JIGSAW_PIECES = [
  { d: `M 0 0 L 60 0 ${_vSeamDown(0, 1)} ${_hSeamLeft(0, 1)} L 0 0 Z`,
    fly: { x: -95, y: -25, rot: -20 }, origin: '30px 30px' },
  { d: `M 60 0 L 120 0 L 120 60 ${_hSeamLeft(60, -1)} ${_vSeamUp(0, 1)} Z`,
    fly: { x:  25, y: -95, rot:  20 }, origin: '90px 30px' },
  { d: `M 60 60 ${_hSeamRight(60, -1)} L 120 120 L 60 120 ${_vSeamUp(60, -1)} Z`,
    fly: { x:  95, y:  25, rot:  20 }, origin: '90px 90px' },
  { d: `M 0 60 ${_hSeamRight(0, 1)} ${_vSeamDown(60, -1)} L 0 120 L 0 60 Z`,
    fly: { x: -25, y:  95, rot: -20 }, origin: '30px 90px' },
];

/* =========================================================
   Celebration pop
   ========================================================= */

// Screen positions well clear of the centre, where the question and answer live.
// Right-hand spots are anchored to the right edge rather than positioned by
// `left`, so the character can't be clipped on a narrow phone.
const _CELEBRATE_SPOTS = [
  { top: '10%', left:  '6%' },
  { top: '10%', right: '6%' },
  { top: '42%', left:  '3%' },
  { top: '42%', right: '3%' },
  { top: '70%', left:  '8%' },
  { top: '70%', right: '8%' },
];

let _lastCharacter = -1;
let _lastSpot = -1;

/** Pick a random index in [0, n), avoiding `avoid` so it never repeats twice running. */
function _pickDifferent(n, avoid) {
  let i = Math.floor(Math.random() * n);
  if (i === avoid) i = (i + 1 + Math.floor(Math.random() * (n - 1))) % n;
  return i;
}

function _celebrateOverlay() {
  let overlay = document.getElementById('celebrateOverlay');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.id = 'celebrateOverlay';
    overlay.className = 'celebrate-overlay';
    document.body.appendChild(overlay);
  }
  return overlay;
}

/**
 * Pop a happy cartoon character somewhere on screen. Self-removing.
 * The animation must finish inside 800ms — the shortest gap before the next
 * question is the 900ms setTimeout in facts.html.
 */
function celebrate() {
  const overlay = _celebrateOverlay();

  const charIdx = _pickDifferent(CELEBRATION_CHARACTERS.length, _lastCharacter);
  const spotIdx = _pickDifferent(_CELEBRATE_SPOTS.length, _lastSpot);
  _lastCharacter = charIdx;
  _lastSpot = spotIdx;

  const spot = _CELEBRATE_SPOTS[spotIdx];
  const wrap = document.createElement('div');
  wrap.className = 'celebrate-character';
  wrap.style.top = spot.top;
  if (spot.left) wrap.style.left = spot.left;
  else wrap.style.right = spot.right;
  // Alternate the tilt direction so consecutive pops feel different.
  wrap.style.setProperty('--pop-tilt', (charIdx % 2 === 0 ? '-12deg' : '12deg'));
  wrap.innerHTML =
    `<svg viewBox="0 0 100 100" aria-hidden="true">${CELEBRATION_CHARACTERS[charIdx]()}</svg>`;

  wrap.addEventListener('animationend', () => wrap.remove());
  overlay.appendChild(wrap);
}

/* =========================================================
   Build-up character
   ========================================================= */

/**
 * Render today's dragon with `doneCount` of its four jigsaw pieces earned.
 * Earned pieces fly in from their edge and lock into place; the rest sit as
 * faint ghosts so the shape of what's coming is visible.
 *
 * The tribe is chosen with the daily seed, so every device shows the same
 * dragon on the same day — the same rule the puzzles follow.
 */
function renderBuildCharacter(el, doneCount) {
  const rng = todayRNG(7331);
  const tribe = DRAGON_TRIBES[seededInt(0, DRAGON_TRIBES.length - 1, rng)];
  const total = JIGSAW_PIECES.length;
  const earned = Math.max(0, Math.min(doneCount, total));

  const clips = JIGSAW_PIECES
    .map((p, i) => `<clipPath id="wof-piece-${i}"><path d="${p.d}"/></clipPath>`)
    .join('');

  const pieces = JIGSAW_PIECES.map((p, i) => {
    const on = i < earned;
    const style = `transform-box:view-box;transform-origin:${p.origin};` +
      (on ? `--fly-x:${p.fly.x}px;--fly-y:${p.fly.y}px;--fly-rot:${p.fly.rot}deg;` +
            `animation-delay:${i * 130}ms;` : '');
    return `<g class="build-part${on ? '' : ' ghost'}" clip-path="url(#wof-piece-${i})" ` +
           `style="${style}"><use href="#wof-art"/></g>`;
  }).join('');

  const caption = earned >= total
    ? `${tribe.name} complete! All ${total} games done &#127881;`
    : `${earned} of ${total} pieces &mdash; play a game to add another!`;

  el.innerHTML =
    `<svg class="build-svg" viewBox="0 0 120 120" aria-label="${tribe.name} dragon">` +
      `<defs>` +
        `<linearGradient id="wof-rain" x1="0" y1="0" x2="1" y2="1">` +
          `<stop offset="0%" stop-color="#F2A9C8"/><stop offset="45%" stop-color="#F7D36B"/>` +
          `<stop offset="100%" stop-color="#6FD3A8"/>` +
        `</linearGradient>` +
        `<g id="wof-art">${_dragonArt(tribe)}</g>` +
        clips +
      `</defs>` +
      pieces +
    `</svg>` +
    `<p class="build-caption">${caption}</p>`;
}
