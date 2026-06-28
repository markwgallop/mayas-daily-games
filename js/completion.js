/**
 * localStorage-based "played today" tracker.
 *
 * The DB is write-only from the child side, so we track today's completions
 * locally so the landing page can show checkmarks.
 *
 * Key format:  maya_done_YYYY-MM-DD_<game>
 * Value:       JSON stringified score object { score, total }
 */

const GAME_IDS = ['facts', 'make_ten', 'shut_box', 'dice_flash', 'war'];

function _storageKey(game, dateStr) {
  const child = window.CHILD_NAME || 'maya';
  const d = dateStr || todayISO();
  return `${child}_done_${d}_${game}`;
}

/** Mark a game as completed for today. */
function markDone(game, score, total) {
  try {
    localStorage.setItem(_storageKey(game), JSON.stringify({ score, total }));
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
