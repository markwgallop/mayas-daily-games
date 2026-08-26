/**
 * Cartoon character art + celebration animations.
 *
 * All art is inline SVG built here rather than loaded as image files, so the
 * app keeps its zero-asset / zero-extra-request property and renders the same
 * on every device (system emoji fonts do not).
 *
 * Two roles:
 *   - CELEBRATION_CHARACTERS — one pops up on every correct answer, in games.
 *   - BUILD_CHARACTERS       — one is assembled a piece at a time on the
 *                              landing page, one piece per completed game.
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
   Build-up characters — assembled a piece at a time.
   Five parts each, ordered so a partial build still reads as
   a character under construction rather than floating bits.
   Shared viewBox "0 0 100 110".
   ========================================================= */

const BUILD_CHARACTERS = [
  {
    name: 'Robot',
    parts: [
      // 1. Legs
      `<g><rect x="34" y="80" width="12" height="20" rx="4" fill="#7B96B0" stroke="#3c5872" stroke-width="3"/>
          <rect x="54" y="80" width="12" height="20" rx="4" fill="#7B96B0" stroke="#3c5872" stroke-width="3"/>
          <rect x="28" y="98" width="20" height="8" rx="4" fill="#3c5872"/>
          <rect x="52" y="98" width="20" height="8" rx="4" fill="#3c5872"/></g>`,
      // 2. Body
      `<g><rect x="28" y="44" width="44" height="38" rx="10" fill="#9BB7D4" stroke="#3c5872" stroke-width="3"/>
          <circle cx="42" cy="60" r="4" fill="#F5A623"/>
          <circle cx="58" cy="60" r="4" fill="#5CB85C"/>
          <rect x="38" y="70" width="24" height="5" rx="2.5" fill="#3c5872"/></g>`,
      // 3. Arms
      `<g><rect x="10" y="48" width="12" height="28" rx="6" fill="#7B96B0" stroke="#3c5872" stroke-width="3"/>
          <rect x="78" y="48" width="12" height="28" rx="6" fill="#7B96B0" stroke="#3c5872" stroke-width="3"/></g>`,
      // 4. Head
      `<g><rect x="30" y="14" width="40" height="30" rx="9" fill="#B7CDE3" stroke="#3c5872" stroke-width="3"/>
          <rect x="38" y="24" width="9" height="9" rx="3" fill="#1a1a2e"/>
          <rect x="53" y="24" width="9" height="9" rx="3" fill="#1a1a2e"/>
          <path d="M40 37 Q50 44 60 37" fill="none" stroke="#3c5872" stroke-width="3" stroke-linecap="round"/></g>`,
      // 5. Antenna
      `<g><path d="M50 14 V4" stroke="#3c5872" stroke-width="3.5" stroke-linecap="round"/>
          <circle cx="50" cy="3" r="5" fill="#E74C3C" stroke="#8c2a20" stroke-width="2"/></g>`,
    ],
  },
  {
    name: 'Rocket',
    parts: [
      // 1. Body
      `<g><path d="M34 34 H66 V84 H34 Z" fill="#EDF1F5" stroke="#3c5872" stroke-width="3" stroke-linejoin="round"/></g>`,
      // 2. Fins
      `<g><path d="M34 62 L16 90 L34 84 Z" fill="#D64545" stroke="#7d2020" stroke-width="3" stroke-linejoin="round"/>
          <path d="M66 62 L84 90 L66 84 Z" fill="#D64545" stroke="#7d2020" stroke-width="3" stroke-linejoin="round"/></g>`,
      // 3. Window + face
      `<g><circle cx="50" cy="50" r="13" fill="#7FC4E8" stroke="#3c5872" stroke-width="3"/>
          <circle cx="45" cy="48" r="2.8" fill="#1a1a2e"/>
          <circle cx="55" cy="48" r="2.8" fill="#1a1a2e"/>
          <path d="M44 56 Q50 61 56 56" fill="none" stroke="#1a1a2e" stroke-width="2.5" stroke-linecap="round"/></g>`,
      // 4. Nose cone
      `<g><path d="M50 4 L68 34 H32 Z" fill="#D64545" stroke="#7d2020" stroke-width="3" stroke-linejoin="round"/></g>`,
      // 5. Flame
      `<g><path d="M38 84 Q50 108 62 84 Q50 92 38 84 Z" fill="#F5A623" stroke="#c47a06" stroke-width="2.5" stroke-linejoin="round"/>
          <path d="M45 86 Q50 98 55 86 Q50 90 45 86 Z" fill="#FFE08A"/></g>`,
    ],
  },
  {
    name: 'Cat',
    parts: [
      // 1. Paws
      `<g><ellipse cx="36" cy="98" rx="11" ry="7" fill="#F7B944" stroke="#8a5a10" stroke-width="3"/>
          <ellipse cx="64" cy="98" rx="11" ry="7" fill="#F7B944" stroke="#8a5a10" stroke-width="3"/></g>`,
      // 2. Body
      `<g><ellipse cx="50" cy="74" rx="26" ry="24" fill="#F5A623" stroke="#8a5a10" stroke-width="3"/>
          <ellipse cx="50" cy="80" rx="14" ry="15" fill="#FFF0D0"/></g>`,
      // 3. Tail
      `<g><path d="M76 84 Q94 78 88 58 Q86 50 79 52" fill="none" stroke="#8a5a10" stroke-width="9" stroke-linecap="round"/>
          <path d="M76 84 Q94 78 88 58 Q86 50 79 52" fill="none" stroke="#F5A623" stroke-width="5" stroke-linecap="round"/></g>`,
      // 4. Head
      `<g><path d="M30 32 L27 12 L44 23 Z" fill="#F5A623" stroke="#8a5a10" stroke-width="3" stroke-linejoin="round"/>
          <path d="M70 32 L73 12 L56 23 Z" fill="#F5A623" stroke="#8a5a10" stroke-width="3" stroke-linejoin="round"/>
          <circle cx="50" cy="40" r="23" fill="#F7B944" stroke="#8a5a10" stroke-width="3"/>
          <circle cx="42" cy="36" r="3.5" fill="#1a1a2e"/>
          <circle cx="58" cy="36" r="3.5" fill="#1a1a2e"/>
          <path d="M44 46 Q50 53 56 46" fill="none" stroke="#1a1a2e" stroke-width="3" stroke-linecap="round"/></g>`,
      // 5. Bow
      `<g><path d="M50 60 L36 53 V67 Z" fill="#D64545" stroke="#7d2020" stroke-width="2.5" stroke-linejoin="round"/>
          <path d="M50 60 L64 53 V67 Z" fill="#D64545" stroke="#7d2020" stroke-width="2.5" stroke-linejoin="round"/>
          <circle cx="50" cy="60" r="4.5" fill="#E8703A" stroke="#7d2020" stroke-width="2.5"/></g>`,
    ],
  },
  {
    name: 'Dragon',
    parts: [
      // 1. Tail
      `<g><path d="M62 88 Q90 92 88 68 Q87 60 80 60" fill="none" stroke="#2f7a2f" stroke-width="10" stroke-linecap="round"/>
          <path d="M62 88 Q90 92 88 68 Q87 60 80 60" fill="none" stroke="#6FCF6F" stroke-width="6" stroke-linecap="round"/></g>`,
      // 2. Body
      `<g><ellipse cx="48" cy="76" rx="26" ry="23" fill="#6FCF6F" stroke="#2f7a2f" stroke-width="3"/>
          <ellipse cx="48" cy="82" rx="14" ry="14" fill="#C8F0C8"/>
          <ellipse cx="32" cy="97" rx="9" ry="6" fill="#6FCF6F" stroke="#2f7a2f" stroke-width="3"/>
          <ellipse cx="62" cy="97" rx="9" ry="6" fill="#6FCF6F" stroke="#2f7a2f" stroke-width="3"/></g>`,
      // 3. Wings
      `<g><path d="M28 62 Q4 44 10 30 Q24 36 32 52 Z" fill="#9BE59B" stroke="#2f7a2f" stroke-width="3" stroke-linejoin="round"/>
          <path d="M68 62 Q92 44 86 30 Q72 36 64 52 Z" fill="#9BE59B" stroke="#2f7a2f" stroke-width="3" stroke-linejoin="round"/></g>`,
      // 4. Head
      `<g><path d="M34 26 L31 8 L46 19 Z" fill="#6FCF6F" stroke="#2f7a2f" stroke-width="3" stroke-linejoin="round"/>
          <path d="M64 26 L67 8 L52 19 Z" fill="#6FCF6F" stroke="#2f7a2f" stroke-width="3" stroke-linejoin="round"/>
          <ellipse cx="49" cy="36" rx="24" ry="21" fill="#7ED97E" stroke="#2f7a2f" stroke-width="3"/>
          <circle cx="41" cy="32" r="4" fill="#1a1a2e"/>
          <circle cx="57" cy="32" r="4" fill="#1a1a2e"/>
          <path d="M42 45 Q49 52 56 45" fill="none" stroke="#2f7a2f" stroke-width="3" stroke-linecap="round"/></g>`,
      // 5. Fire breath
      `<g><path d="M73 40 Q92 34 96 44 Q88 42 84 48 Q80 40 73 40 Z" fill="#F5A623" stroke="#c47a06" stroke-width="2.5" stroke-linejoin="round"/>
          <circle cx="90" cy="52" r="3.5" fill="#FFD34E"/></g>`,
    ],
  },
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
 * Render today's build-up character with `doneCount` of its 5 parts earned.
 * Un-earned parts show as faint ghosts so the goal is visible.
 *
 * The character is chosen with the daily seed, so every device shows the same
 * one on the same day — the same rule the puzzles follow.
 */
function renderBuildCharacter(el, doneCount) {
  const rng = todayRNG(7331);
  const character = BUILD_CHARACTERS[seededInt(0, BUILD_CHARACTERS.length - 1, rng)];
  const total = character.parts.length;
  const earned = Math.max(0, Math.min(doneCount, total));

  const parts = character.parts.map((part, i) => {
    const cls = i < earned ? 'build-part' : 'build-part ghost';
    // Stagger each earned piece so the build reads as an assembly, not a flash.
    const delay = i < earned ? ` style="animation-delay:${i * 90}ms"` : '';
    return `<g class="${cls}"${delay}>${part}</g>`;
  }).join('');

  const caption = earned >= total
    ? `${character.name} complete! All ${total} games done &#127881;`
    : `${earned} of ${total} pieces &mdash; play a game to add another!`;

  el.innerHTML =
    `<svg class="build-svg" viewBox="0 0 100 110" aria-label="${character.name}">${parts}</svg>` +
    `<p class="build-caption">${caption}</p>`;
}
