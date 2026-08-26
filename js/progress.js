/**
 * Days-at-this-level progress (landing page only).
 *
 * Counts the days the whole set of games was completed at the current level.
 * The count is cumulative and gaps are fine — a missed day costs nothing, it
 * just isn't counted. Moving up a level starts the count again, because the
 * day markers written by completion.js record the level they were played at.
 *
 * The row itself is drawn by renderDragonRow() in characters.js.
 *
 * Depends on: completion.js (FULLDAY_PREFIX_SUFFIX, CHILD_NAME)
 */

/** Full days at one level before moving up. */
const DAYS_PER_LEVEL = 5;

/**
 * The dates she completed in full at `level`, oldest first.
 *
 * The row needs the dates themselves, not just how many, because each day's
 * dragon is picked from that date's seed.
 */
function fullDayDates(level) {
  const prefix = `${window.CHILD_NAME || 'maya'}${FULLDAY_PREFIX_SUFFIX}`;
  const dates = [];
  try {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (!key || !key.startsWith(prefix)) continue;
      if (parseInt(localStorage.getItem(key), 10) === level) dates.push(key.slice(prefix.length));
    }
  } catch (e) {
    return [];
  }
  return dates.sort();
}

