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
    // The child pages and the parent portal share an origin, so a logged-in
    // portal session sits in localStorage. Without this, the Supabase client
    // picks that session up automatically and inserts as `authenticated`
    // instead of `anon` — which has no INSERT policy, so RLS rejects it.
    _client = supabase.createClient(window.SUPABASE_URL, window.SUPABASE_ANON_KEY, {
      auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false },
    });
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
// The global difficulty level (1–5), set once by the parent in the portal and
// applied by every game via its own LEVEL_CONFIG. Stored under the legacy
// 'facts_band' settings key (kept for wire-compat; the value is the level).
async function fetchLevel() {
  try {
    const { data } = await getClient()
      .from('settings')
      .select('value')
      .eq('key', 'facts_band')
      .single();
    return data ? parseInt(data.value, 10) : (window.DAILY_FACTS_BAND || 1);
  } catch {
    return window.DAILY_FACTS_BAND || 1;
  }
}

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

  try {
    const { error } = await db.from('results').insert(row);
    if (error) {
      console.warn('saveResult error:', error.message);
      return { ok: false, message: error.message };
    }
    return { ok: true };
  } catch (e) {
    // Network failure etc. — insert() can reject rather than resolve with `error`.
    console.warn('saveResult exception:', e.message);
    return { ok: false, message: e.message };
  }
}

/**
 * Save a result and surface success/failure on the completion screen,
 * with a Retry button on failure. The game still shows its completion
 * screen either way — this only adds a visible save indicator.
 */
async function saveResultAndReport(result) {
  const { ok, message } = await saveResult(result);
  showSaveStatus(ok, message, () => saveResultAndReport(result));
}

function showSaveStatus(ok, message, retry) {
  const card = document.getElementById('completionCard');
  if (!card) return;

  let el = document.getElementById('saveStatus');
  if (!el) {
    el = document.createElement('div');
    el.id = 'saveStatus';
    el.className = 'save-status';
    card.insertBefore(el, card.querySelector('.btn-primary'));
  }

  if (ok) {
    el.classList.remove('show');
    el.innerHTML = '';
    return;
  }

  el.innerHTML = '';
  const msg = document.createElement('span');
  msg.textContent = `Not saved (${message}).`;
  const btn = document.createElement('button');
  btn.type = 'button';
  btn.className = 'btn btn-primary retry-btn';
  btn.textContent = 'Retry';
  btn.onclick = retry;
  el.appendChild(msg);
  el.appendChild(btn);
  el.classList.add('show');
}
