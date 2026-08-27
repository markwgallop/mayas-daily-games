/**
 * Cartoon character art + celebration animations.
 *
 * Two roles:
 *   - CELEBRATION_CHARACTERS — inline SVG, one pops up on every correct answer
 *                              in the games. Drawn here rather than loaded so
 *                              the games stay asset-free.
 *   - WOF_CHARACTERS         — the Wings of Fire artwork in assets/dragons/.
 *                              One character per day: assembled from four
 *                              jigsaw pieces on the landing page, then kept in
 *                              the collection row.
 *
 * Depends on: seed.js (todayRNG, seededInt) for picking the day's character.
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

/**
 * The cast, and which tribe each one belongs to.
 *
 * Artwork lives in assets/dragons/, cut from the "Designs Available" sheet by
 * scripts/extract-dragons.py — rerun that if the sheet is ever replaced.
 *
 * The day picks a character rather than a tribe, deliberately. Six of these are
 * SandWings and only one is a MudWing, so picking by tribe repeats badly; picking
 * by character gives 24 to collect and repeats are rare.
 */
const WOF_CHARACTERS = [
  { file: 'Glory',       tribe: 'RainWing'  },
  { file: 'Tsunami',     tribe: 'SeaWing'   },
  { file: 'Clay',        tribe: 'MudWing'   },
  { file: 'Sunny',       tribe: 'SandWing'  },
  { file: 'Starflight',  tribe: 'NightWing' },
  { file: 'Turtle',      tribe: 'SeaWing'   },
  { file: 'Kinkajou',    tribe: 'RainWing'  },
  { file: 'Winter',      tribe: 'IceWing'   },
  { file: 'Peril',       tribe: 'SkyWing'   },
  { file: 'Qibli',       tribe: 'SandWing'  },
  { file: 'Moonwatcher', tribe: 'NightWing' },
  { file: 'Jambu',       tribe: 'RainWing'  },
  { file: 'Tamarin',     tribe: 'RainWing'  },
  { file: 'Blister',     tribe: 'SandWing'  },
  { file: 'Blaze',       tribe: 'SandWing'  },
  { file: 'Burn',        tribe: 'SandWing'  },
  { file: 'Darkstalker', tribe: 'NightWing' },
  { file: 'Gill',        tribe: 'SeaWing'   },
  { file: 'Coral',       tribe: 'SeaWing'   },
  { file: 'Thorn',       tribe: 'SandWing'  },
  { file: 'Hawthorn',    tribe: 'LeafWing'  },
  { file: 'Sundew',      tribe: 'LeafWing'  },
  { file: 'Cricket',     tribe: 'HiveWing'  },
  { file: 'Blue',        tribe: 'SilkWing'  },
  // WinterAlt.webp is a second drawing of Winter. Left out of the pool so the
  // same dragon can't appear twice in one collection; the file is still there.
];

const DRAGON_DIR = 'assets/dragons';

/** Which character belongs to a given day. Same seeded rule as the puzzles. */
function characterForDate(date) {
  return WOF_CHARACTERS[seededInt(0, WOF_CHARACTERS.length - 1, todayRNG(7331, date))];
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
 * Earned pieces fly in from their edge and lock into place; the rest stay empty.
 *
 * The character is chosen with the daily seed, so every device shows the same
 * dragon on the same day — the same rule the puzzles follow.
 */
function renderBuildCharacter(el, doneCount) {
  const ch = characterForDate(new Date());
  const total = JIGSAW_PIECES.length;
  const earned = Math.max(0, Math.min(doneCount, total));

  const clips = JIGSAW_PIECES
    .map((p, i) => `<clipPath id="wof-piece-${i}"><path d="${p.d}"/></clipPath>`)
    .join('');

  const pieces = JIGSAW_PIECES.map((p, i) => {
    if (i >= earned) return '';
    const style = `transform-box:view-box;transform-origin:${p.origin};` +
      `--fly-x:${p.fly.x}px;--fly-y:${p.fly.y}px;--fly-rot:${p.fly.rot}deg;` +
      `animation-delay:${i * 130}ms;`;
    return `<g class="build-part" clip-path="url(#wof-piece-${i})" style="${style}">` +
             `<use href="#wof-art"/></g>`;
  }).join('');

  // Faint outlines of the pieces still to come, so the shape of the puzzle reads.
  const pending = JIGSAW_PIECES.map((p, i) =>
    i < earned ? '' : `<path class="build-pending" d="${p.d}"/>`).join('');

  const caption = earned >= total
    ? `${ch.file} the ${ch.tribe} &mdash; complete! &#127881;`
    : `${earned} of ${total} pieces &mdash; play a game to add another!`;

  el.innerHTML =
    `<svg class="build-svg" viewBox="0 0 120 120" aria-label="${ch.file} the ${ch.tribe}">` +
      `<defs>` +
        // slice, not meet — letterboxing the art leaves whole jigsaw pieces empty.
        `<image id="wof-art" href="${DRAGON_DIR}/${ch.file}.webp" ` +
               `x="0" y="0" width="120" height="120" preserveAspectRatio="xMidYMid slice"/>` +
        clips +
      `</defs>` +
      pending + pieces +
    `</svg>` +
    `<p class="build-caption">${caption}</p>`;
}

/**
 * The collection row: one dragon per day she finished the daily goal, in the
 * order she earned them, with empty slots for the days still to come.
 *
 * Each dragon is the one she actually built that day — the character comes from
 * that date's seed — so the row is a record of her week rather than a gauge.
 *
 * @param {HTMLElement} el
 * @param {string[]} dates - ISO dates of full days, oldest first
 * @param {number} target  - how many days make a level
 */
function renderDragonRow(el, dates, target) {
  el.innerHTML = '';

  const row = document.createElement('div');
  row.className = 'dragon-row';

  for (let i = 0; i < target; i++) {
    const iso = dates[i];
    const slot = document.createElement('div');
    slot.className = 'dragon-slot' + (iso ? ' earned' : '');

    if (iso) {
      const ch = characterForDate(new Date(iso + 'T00:00:00'));
      const day = new Date(iso + 'T00:00:00');
      slot.innerHTML = `<img src="${DRAGON_DIR}/${ch.file}.webp" alt="${ch.file} the ${ch.tribe}">`;
      slot.title = `${ch.file} the ${ch.tribe} — ` +
        day.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' });
    }
    row.appendChild(slot);
  }

  const earned = Math.min(dates.length, target);
  const caption = document.createElement('p');
  caption.className = 'dragon-row-caption' + (earned >= target ? ' ready' : '');
  caption.textContent = earned >= target
    ? '⭐ Five dragons! Ready for the next level.'
    : `${earned} of ${target} dragons collected`;

  el.appendChild(row);
  el.appendChild(caption);
}
