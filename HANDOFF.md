# Maya's Daily Games — Session Handoff

## What exists

A complete static web app at `/home/markgallop/HomePi/claude-ws/maya-games/`:

```
maya-games/
├── index.html              # Landing page — 5 game tiles, build-up character, days pie
├── portal.html             # Parent portal — auth login + results views + level selector
├── css/main.css            # Shared styles (Nunito font, touch-first)
├── js/
│   ├── config.js           # Supabase URL + anon key (placeholders to fill)
│   ├── seed.js             # Mulberry32 PRNG, date→seed, seededShuffle/Pick/Int
│   ├── db.js               # Supabase client + saveResult() — INSERT only, fetchLevel()
│   ├── completion.js       # localStorage "played today" tracker + full-day markers
│   ├── characters.js       # Inline-SVG cartoon art: celebrate() + renderBuildCharacter()
│   └── progress.js         # countFullDays() + renderProgressPie() — landing page only
├── games/
│   ├── facts.html          # 10 seeded addition/subtraction facts, numpad input
│   ├── make-ten.html       # 8 seeded Make-a-Ten problems, 4-choice tap
│   ├── shut-box.html       # Full Shut the Box — SVG dice, seeded rolls, subset-sum checker
│   ├── dice-flash.html     # 8 dot-pattern flashes, tap-to-reveal, 4 choices
│   └── war.html            # Card Duel — add two cards, first to 7 round wins
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
- **Bounded daily set** — fixed small number of problems per game (10 facts, 8 Make-a-Ten, 1 Shut the Box run, 8 Dice Flash, first-to-7 Card Duel), seeded by date
- **Same puzzle on every device on the same day** — `dateSeed()` in `js/seed.js` guarantees this
- **Child side is INSERT-only** — `db.js` never calls `.select()`; RLS enforces this at the DB level too
- **Portal deduplicates** on `(game, play_date)` latest-wins — two submissions from two devices produce two rows; the portal filters them client-side in `portal.html`

---

## Engagement features (added Aug 2026)

### Cartoon characters — `js/characters.js`

All art is inline SVG built in JS. No image files, no extra requests, and it renders
identically everywhere (system emoji fonts do not). Two roles:

- `celebrate()` — pops a random happy character at one of six screen positions on every
  correct answer, then removes itself. Called from all five games. **The animation must
  finish inside 800ms** — `facts.html` advances to the next question 900ms after a correct
  answer, and the pop must be gone by then.
- `renderBuildCharacter(el, doneCount)` — the landing page dragon, assembled one jigsaw
  piece per completed game (4 pieces). Un-earned pieces show as faint ghosts. Which of the
  seven tribes is being built is chosen with `todayRNG()`, so it follows the same
  same-on-every-device rule the puzzles do.

  The dragons are the **Wings of Fire artwork in `assets/dragons/`**, one WebP per
  character, cut from a "Designs Available" sheet by `scripts/extract-dragons.py`.
  Rerun that script against the sheet if the art is ever replaced:

  ```
  python3 scripts/extract-dragons.py <sheet.jpg> assets/dragons
  ```

  The sheet itself is **not committed** — `publish = "."` means anything in the repo
  is publicly downloadable, and it isn't needed at runtime. It lives in the Google
  Drive photo folder (`Screensaver Photos`), so it arrives via `rclone-photo-sync`.

  Two things in that script are load-bearing and non-obvious: background removal
  floods in from the cell edges rather than keying on white, because Winter and
  Blaze are near-white dragons and colour-keying punches holes through them; and the
  header's letter "g" physically overlaps Tsunami's wing, so her cell has a hardcoded
  erase rectangle.

  **The day picks a character, not a tribe.** Six of the 24 are SandWings and only
  one is a MudWing, so picking by tribe repeats badly. `WinterAlt.webp` is a second
  drawing of Winter, deliberately left out of the pool so one dragon can't appear
  twice in a collection.

  The artwork is placed once into `<defs>` as an `<image>` and cut by four `<clipPath>`s.
  Each interior seam is generated by one helper (`_vSeamDown` / `_vSeamUp`, `_hSeamRight` /
  `_hSeamLeft`) and traversed in the opposite direction by the neighbouring piece, so the
  tabs interlock exactly with no gaps. If you change the tab size, change `_JIG_T` /
  `_JIG_B` only. The image uses `preserveAspectRatio="slice"` so it fills the puzzle —
  with `meet` the letterboxing leaves whole jigsaw pieces empty.

  Pieces fly in from their own edge and lock into place (`piece-fly-in` in main.css).
  `.build-svg` must keep `overflow: visible` or they get clipped before they arrive.

Shut the Box has no per-question right/wrong, so `celebrate()` fires when a valid set of
tiles is closed — the equivalent "you got it" event.

### Days-at-level progress — `js/progress.js` and the `maya_fullday_` keys

**The daily goal is any 4 of the 5 games** (`GAMES_PER_DAY` in `completion.js`). Maya can
skip whichever one she doesn't fancy; a fifth is a bonus that earns a different banner but
does not double-count.

`markDone()` writes `maya_fullday_YYYY-MM-DD → <level>` once the goal is met for the day.
It is written there, not on the landing page, so the day still counts if the tab is closed
on a completion screen. A fifth game rewrites the same marker, which is harmless. Card Duel
has no level of its own and inherits the cached one via `cachedLevel()`.

The landing page shows a row of dragons along the top — one per day she hit the goal, in
the order she earned them, with faint empty slots for the days still to come. Each dragon
is the one she actually built that day: `tribeForDate()` re-derives the tribe from that
date's seed, which is why `fullDayDates()` returns the dates rather than just a count.
Slots are cropped to a head-and-wings portrait (`viewBox="6 0 108 76"`) because a whole
dragon is unreadable at 48px.

At 5 the caption reads "Ready for the next level" — **the level is not advanced
automatically.** A parent still changes it in the portal, which keeps the child side
INSERT-only.

**This replaced a donut chart and a corner medallion.** Three copies of the same
unclosable number was pressure, not progress. A collection that grows reads better than a
gauge that is always short, and the daily dragon stays the loop she can actually close.

`portal.html` shows the same count derived from the `results` table rather than
localStorage, so it is accurate across devices.

**On the "no streaks" constraint above:** this counter is deliberately *not* a streak. It
is cumulative, gaps are allowed, and a missed day costs nothing — it just isn't counted.
It resets only when the level changes, because the day markers record the level they were
played at. Nothing anywhere shows a "current streak" that can be broken.

### Note: `index.html` now depends on Supabase

The landing page loads `db.js` to call `fetchLevel()`. It renders the pie immediately from
the localStorage-cached level and only re-renders if Supabase reports a different one, so
the page still works fully offline. If you change this, keep the cached-first ordering.
