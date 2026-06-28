# Maya's Daily Games — Session Handoff

## What exists

A complete static web app at `/home/markgallop/HomePi/claude-ws/maya-games/`:

```
maya-games/
├── index.html              # Landing page — 4 game tiles, completion checkmarks
├── portal.html             # Parent portal — auth login + results views
├── css/main.css            # Shared styles (Nunito font, touch-first)
├── js/
│   ├── config.js           # Supabase URL + anon key (placeholders to fill)
│   ├── seed.js             # Mulberry32 PRNG, date→seed, seededShuffle/Pick/Int
│   ├── db.js               # Supabase client + saveResult() — INSERT only
│   └── completion.js       # localStorage "played today" tracker
├── games/
│   ├── facts.html          # 10 seeded addition/subtraction facts, numpad input
│   ├── make-ten.html       # 8 seeded Make-a-Ten problems, 4-choice tap
│   ├── shut-box.html       # Full Shut the Box — SVG dice, seeded rolls, subset-sum checker
│   └── dice-flash.html     # 8 dot-pattern flashes, tap-to-reveal, 4 choices
├── netlify.toml            # sed build command injects env vars into config.js
├── README.md               # Full setup instructions + acceptance test
└── HANDOFF.md              # This file
```

All game logic is complete. No build step — pure vanilla HTML/JS/CSS.

---

## What remains: Supabase setup (do via MCP in the new session)

A Supabase MCP server has been connected. It should be available in the new session automatically.

### Step 1 — Create the `results` table

```sql
create table results (
  id         uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  play_date  date not null,
  child      text not null,
  game       text not null,
  score      int  not null,
  total      int  not null,
  details    jsonb
);
```

### Step 2 — Enable RLS and add policies

```sql
alter table results enable row level security;

-- Child side: anon can INSERT only (no SELECT)
create policy "anon insert"
  on results for insert
  to anon
  with check (true);

-- Parent portal: authenticated users can SELECT
create policy "authenticated select"
  on results for select
  to authenticated
  using (true);
```

### Step 3 — Create parent user accounts

Create two email/password accounts in Supabase Auth (one per parent). Then **disable public sign-ups** under Authentication → Settings.

### Step 4 — Get credentials and fill in config

From Supabase dashboard: Settings → API. You need:
- **Project URL** (`https://xxxx.supabase.co`)
- **anon / public key** (`eyJ...`)

For local testing, fill these into `js/config.js`:
```js
window.SUPABASE_URL = 'https://xxxx.supabase.co';
window.SUPABASE_ANON_KEY = 'eyJ...';
```

For Netlify deploy, set them as environment variables — the `sed` build command in `netlify.toml` substitutes them automatically.

### Step 5 — Verify the security boundary

With only the anon key, SELECT must return nothing:

```bash
# INSERT should succeed (201 Created):
curl -X POST 'https://YOUR_PROJECT.supabase.co/rest/v1/results' \
  -H "apikey: YOUR_ANON_KEY" \
  -H "Authorization: Bearer YOUR_ANON_KEY" \
  -H "Content-Type: application/json" \
  -d '{"play_date":"2026-01-01","child":"test","game":"facts","score":8,"total":10,"details":[]}'

# SELECT should return [] — RLS blocks anon reads:
curl 'https://YOUR_PROJECT.supabase.co/rest/v1/results?select=*' \
  -H "apikey: YOUR_ANON_KEY" \
  -H "Authorization: Bearer YOUR_ANON_KEY"
```

---

## What remains: Netlify deploy (human clicks)

Repo is live at: **https://github.com/markwgallop/mayas-daily-games**

1. Netlify → Add new site → Import from Git → pick `markwgallop/mayas-daily-games`
2. Build settings are already in `netlify.toml` — no changes needed
3. Set environment variables in the Netlify UI:
   - `SUPABASE_URL` = your project URL
   - `SUPABASE_ANON_KEY` = your anon key
4. Trigger a deploy and test

---

## Design constraints to preserve (non-negotiable per spec)

- **No timers or countdowns** anywhere in any game
- **No streaks, leaderboards, or score comparisons**
- **Bounded daily set** — fixed small number of problems per game (10 facts, 8 Make-a-Ten, 1 Shut the Box run, 8 Dice Flash), seeded by date
- **Same puzzle on every device on the same day** — `dateSeed()` in `js/seed.js` guarantees this
- **Child side is INSERT-only** — `db.js` never calls `.select()`; RLS enforces this at the DB level too
- **Portal deduplicates** on `(game, play_date)` latest-wins — two submissions from two devices produce two rows; the portal filters them client-side in `portal.html`
