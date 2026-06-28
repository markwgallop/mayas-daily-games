/**
 * Seeded RNG utilities.
 * All games derive their daily puzzle from today's date → a deterministic seed,
 * so the same puzzle appears on every device on the same calendar day.
 */

/**
 * Return an integer seed from a Date (or today if omitted).
 * Format: YYYYMMDD — unique per calendar day, no collisions across years.
 */
function dateSeed(date) {
  const d = date || new Date();
  const y = d.getFullYear();
  const m = d.getMonth() + 1;
  const day = d.getDate();
  return y * 10000 + m * 100 + day;
}

/**
 * Mulberry32 — fast, good-quality 32-bit PRNG.
 * Returns a function that yields floats in [0, 1).
 */
function createRNG(seed) {
  let s = seed >>> 0;
  return function () {
    s = (s + 0x6D2B79F5) >>> 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * Return a seeded RNG for today (or a given date).
 * Pass an optional game-specific salt integer to get independent streams
 * per game even on the same date.
 */
function todayRNG(salt, date) {
  const seed = dateSeed(date) + (salt || 0);
  return createRNG(seed);
}

/**
 * Fisher-Yates shuffle driven by a given RNG.
 * Returns a new shuffled array; does not mutate the input.
 */
function seededShuffle(arr, rng) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    const tmp = a[i];
    a[i] = a[j];
    a[j] = tmp;
  }
  return a;
}

/**
 * Pick `n` items from `arr` without replacement, using `rng`.
 */
function seededPick(arr, n, rng) {
  return seededShuffle(arr, rng).slice(0, n);
}

/**
 * Return a seeded integer in [min, max] inclusive.
 */
function seededInt(min, max, rng) {
  return min + Math.floor(rng() * (max - min + 1));
}

/**
 * Return today's date as "YYYY-MM-DD" (local time).
 */
function todayISO(date) {
  const d = date || new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}
