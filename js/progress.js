/**
 * Days-at-this-level progress (landing page only).
 *
 * Counts the days the whole set of games was completed at the current level.
 * The count is cumulative and gaps are fine — a missed day costs nothing, it
 * just isn't counted. Moving up a level starts the count again, because the
 * day markers written by completion.js record the level they were played at.
 *
 * The row of days still being collected is drawn by renderDragonRow(), and each
 * finished set of five by renderDragonSets() — both in characters.js.
 *
 * Depends on: completion.js (FULLDAY_PREFIX_SUFFIX, CHILD_NAME)
 */

/** Full days at one level before moving up. */
const DAYS_PER_LEVEL = 5;

/**
 * Every day she completed in full, grouped by the level it was played at and
 * sorted oldest first: { level → [ISO date, ...] }.
 *
 * The dates themselves are needed, not just how many, because each day's dragon
 * is picked from that date's seed.
 */
function allFullDays() {
  const prefix = `${window.CHILD_NAME || 'maya'}${FULLDAY_PREFIX_SUFFIX}`;
  const byLevel = {};
  try {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (!key || !key.startsWith(prefix)) continue;
      const level = parseInt(localStorage.getItem(key), 10);
      if (!Number.isFinite(level)) continue;
      (byLevel[level] = byLevel[level] || []).push(key.slice(prefix.length));
    }
  } catch (e) {
    return {};
  }
  Object.values(byLevel).forEach(dates => dates.sort());
  return byLevel;
}

/**
 * Split one level's full days into finished sets of DAYS_PER_LEVEL, plus the
 * days banked towards the next set.
 *
 * A set closes the moment its fifth day lands, and the collection row starts
 * again from empty. Days beyond the fifth — she reached five but hasn't been
 * moved up yet — begin a fresh set rather than pushing the earlier dragons out
 * of the row, so nothing she has earned ever disappears.
 */
function levelSets(dates) {
  const complete = [];
  let i = 0;
  for (; i + DAYS_PER_LEVEL <= dates.length; i += DAYS_PER_LEVEL) {
    complete.push(dates.slice(i, i + DAYS_PER_LEVEL));
  }
  return { complete, inProgress: dates.slice(i) };
}

