/**
 * Days-at-this-level progress (landing page only).
 *
 * Counts the days the whole set of games was completed at the current level.
 * The count is cumulative and gaps are fine — a missed day costs nothing, it
 * just isn't counted. Moving up a level starts the count again, because the
 * day markers written by completion.js record the level they were played at.
 *
 * Depends on: completion.js (fullDayKey, FULLDAY_PREFIX_SUFFIX, CHILD_NAME)
 */

/** Full days at one level before moving up. */
const DAYS_PER_LEVEL = 5;

/** Count the distinct days completed in full at `level`. */
function countFullDays(level) {
  const prefix = `${window.CHILD_NAME || 'maya'}${FULLDAY_PREFIX_SUFFIX}`;
  let days = 0;
  try {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (!key || !key.startsWith(prefix)) continue;
      if (parseInt(localStorage.getItem(key), 10) === level) days++;
    }
  } catch (e) {
    return 0;
  }
  return days;
}

const SVG_NS = 'http://www.w3.org/2000/svg';

/** One donut segment: a dashed circle rotated into its slot. */
function _pieSegment(index, total, filled) {
  const r = 36;
  const circumference = 2 * Math.PI * r;
  const slot = circumference / total;
  const gap = 7;

  const seg = document.createElementNS(SVG_NS, 'circle');
  seg.setAttribute('cx', '50');
  seg.setAttribute('cy', '50');
  seg.setAttribute('r', String(r));
  seg.setAttribute('fill', 'none');
  seg.setAttribute('stroke-width', '15');
  // Butt caps, not round — round caps extend each dash by half the stroke width,
  // which swallows the gaps and makes the five slices read as one solid ring.
  seg.setAttribute('stroke-linecap', 'butt');
  seg.setAttribute('stroke', filled ? 'var(--success)' : 'var(--border)');
  seg.setAttribute('stroke-dasharray', `${slot - gap} ${circumference - slot + gap}`);
  // Circles start at 3 o'clock, so rotate back a quarter turn to start at the top.
  seg.setAttribute('transform', `rotate(${-90 + index * (360 / total)} 50 50)`);
  return seg;
}

/**
 * Render the days-at-level donut into `el`.
 *
 * @param {HTMLElement} el
 * @param {number} days      - full days completed at this level
 * @param {number} level     - the current level, for the caption
 * @param {boolean} [compact] - corner version: just the wheel and a tiny label.
 *                              The full version below carries the accessible
 *                              label, so compact copies are hidden from readers.
 */
function renderProgressPie(el, days, level, compact) {
  const filled = Math.min(days, DAYS_PER_LEVEL);
  const ready = filled >= DAYS_PER_LEVEL;

  el.innerHTML = '';

  const svg = document.createElementNS(SVG_NS, 'svg');
  svg.setAttribute('class', 'progress-pie-svg');
  svg.setAttribute('viewBox', '0 0 100 100');
  if (compact) svg.setAttribute('aria-hidden', 'true');
  else svg.setAttribute('aria-label', `${filled} of ${DAYS_PER_LEVEL} days complete`);
  for (let i = 0; i < DAYS_PER_LEVEL; i++) {
    svg.appendChild(_pieSegment(i, DAYS_PER_LEVEL, i < filled));
  }

  const count = document.createElementNS(SVG_NS, 'text');
  count.setAttribute('x', '50');
  count.setAttribute('y', '50');
  count.setAttribute('text-anchor', 'middle');
  count.setAttribute('dominant-baseline', 'central');
  count.setAttribute('font-size', '30');
  count.setAttribute('font-weight', '900');
  count.setAttribute('fill', ready ? 'var(--correct)' : 'var(--text-light)');
  count.textContent = String(filled);
  svg.appendChild(count);

  if (compact) {
    const mini = document.createElement('p');
    mini.className = 'progress-pie-mini' + (ready ? ' ready' : '');
    mini.textContent = ready ? 'Ready!' : `${filled}/${DAYS_PER_LEVEL} days`;
    el.appendChild(svg);
    el.appendChild(mini);
    return;
  }

  const caption = document.createElement('p');
  caption.className = 'progress-pie-caption' + (ready ? ' ready' : '');
  caption.textContent = ready
    ? '⭐ Ready for the next level!'
    : `${filled} of ${DAYS_PER_LEVEL} full days on Level ${level}`;

  const sub = document.createElement('p');
  sub.className = 'progress-pie-sub';
  sub.textContent = ready
    ? 'Ask a grown-up to move you up in the parent portal.'
    : `Finish any ${GAMES_PER_DAY} games in a day to fill a slice.`;

  el.appendChild(svg);
  el.appendChild(caption);
  el.appendChild(sub);
}
