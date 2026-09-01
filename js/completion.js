/**
 * localStorage-based "played today" tracker.
 *
 * The DB is write-only from the child side, so we track today's completions
 * locally so the landing page can show checkmarks.
 *
 * Key format:  maya_done_YYYY-MM-DD_<game>
 * Value:       JSON stringified score object { score, total }
 *
 * We also record a marker for each day the whole set was completed:
 *
 * Key format:  maya_fullday_YYYY-MM-DD
 * Value:       the level that day was played at
 *
 * The marker is written here rather than on the landing page so the day still
 * counts if the tab is closed on a game's completion screen. The level is
 * stored alongside the date so the landing page can count only the days played
 * at the current level — moving up a level starts the count again.
 */

const GAME_IDS = ['facts', 'make_ten', 'shut_box', 'dice_flash'];

/**
 * Games needed to count the day as done — all four of them. The build-up
 * character has one jigsaw piece per game, so it completes exactly as the day
 * does.
 */
const GAMES_PER_DAY = 4;

/** How many of today's games are finished. */
function doneToday() {
  return GAME_IDS.filter(g => getDone(g) !== null).length;
}

function _child() {
  return window.CHILD_NAME || 'maya';
}

function _storageKey(game, dateStr) {
  const d = dateStr || todayISO();
  return `${_child()}_done_${d}_${game}`;
}

/** Prefix for the "whole set done" day markers. */
const FULLDAY_PREFIX_SUFFIX = '_fullday_';

function fullDayKey(dateStr) {
  return `${_child()}${FULLDAY_PREFIX_SUFFIX}${dateStr || todayISO()}`;
}

/** Remember the level last reported by Supabase, so pages can render offline. */
function cacheLevel(level) {
  try {
    localStorage.setItem(`${_child()}_level`, String(level));
  } catch (e) {
    // Storage quota — ignore silently
  }
}

/** The last known level, falling back to the build-time default. */
function cachedLevel() {
  try {
    const raw = localStorage.getItem(`${_child()}_level`);
    if (raw) return parseInt(raw, 10);
  } catch (e) {
    // Ignore and fall through to the default
  }
  return window.DAILY_FACTS_BAND || 1;
}

/**
 * Mark a game as completed for today.
 *
 * @param {string} game   - one of GAME_IDS
 * @param {number} score
 * @param {number} total
 * @param {number} [level] - the level it was played at; falls back to the
 *                           cached level for games that have no level of their own.
 */
function markDone(game, score, total, level) {
  try {
    localStorage.setItem(_storageKey(game), JSON.stringify({ score, total }));
    if (level) cacheLevel(level);

    // Hit the daily goal? Record the day at the level it was played at.
    // A fifth game re-writes the same marker, which is harmless.
    if (doneToday() >= GAMES_PER_DAY) {
      localStorage.setItem(fullDayKey(), String(level || cachedLevel()));
    }
  } catch (e) {
    // Storage quota — ignore silently
  }
}

/** Return the stored completion for today, or null if not done. */
function getDone(game, dateStr) {
  try {
    const raw = localStorage.getItem(_storageKey(game, dateStr));
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    return null;
  }
}

/** True if the game was completed today. */
function isDone(game) {
  return getDone(game) !== null;
}

/** Return a map of { game → { score, total } | null } for today. */
function getAllDone() {
  return Object.fromEntries(GAME_IDS.map(g => [g, getDone(g)]));
}
