/**
 * Supabase client + result persistence.
 *
 * The child side is INSERT-ONLY — this file never reads from the DB.
 * The portal reads separately after authentication (see portal.html).
 *
 * Depends on:
 *   - config.js  (window.SUPABASE_URL, window.SUPABASE_ANON_KEY, window.CHILD_NAME)
 *   - seed.js    (todayISO)
 *   - Supabase JS UMD bundle loaded before this script
 */

let _client = null;

function getClient() {
  if (!_client) {
    _client = supabase.createClient(window.SUPABASE_URL, window.SUPABASE_ANON_KEY);
  }
  return _client;
}

/**
 * Persist one completed game result.
 *
 * @param {Object} result
 * @param {string} result.game     - 'facts' | 'make_ten' | 'shut_box' | 'dice_flash'
 * @param {number} result.score    - number of correct answers
 * @param {number} result.total    - total problems in the set
 * @param {Object} result.details  - game-specific per-problem data (stored as jsonb)
 * @returns {Promise<void>}
 */
async function saveResult(result) {
  const db = getClient();
  const row = {
    play_date: todayISO(),
    child: window.CHILD_NAME || 'maya',
    game: result.game,
    score: result.score,
    total: result.total,
    details: result.details,
  };

  const { error } = await db.from('results').insert(row);
  if (error) {
    // Non-fatal — log only. The game still shows the completion screen.
    console.warn('saveResult error:', error.message);
  }
}
