# Maya's Daily Games

A self-hosted, date-seeded daily games page for a 7-year-old. Four math games; one small challenge per day each. Results are stored in Supabase; a parent portal shows progress over time.

## Games

| Game | Description |
|------|-------------|
| Daily Facts | 10 seeded addition/subtraction facts — bonds of 10, doubles, near-doubles |
| Make a Ten | Show a number; tap the partner that makes 10 |
| Shut the Box | Roll two dice; tap tiles that sum to the roll |
| Dice Flash | Flash a dot pattern briefly; tap the count |

## Architecture

- **Frontend:** vanilla HTML/CSS/JS — no build step, no framework.
- **Database:** Supabase (hosted, free tier) — one `results` table.
- **Security:** RLS enforced. The child side can INSERT but never SELECT. The parent portal SELECTs only after email/password login.
- **Deploy:** Netlify free tier. A `sed` build command injects Supabase credentials from env vars.

---

## Setup (one-time)

### 1. Supabase — do this in the Supabase dashboard

**Create the table:**

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

**Enable RLS and add policies:**

```sql
-- Enable RLS
alter table results enable row level security;

-- Child side: anon role can INSERT only
create policy "anon insert"
  on results for insert
  to anon
  with check (true);

-- Parent portal: authenticated role can SELECT
create policy "authenticated select"
  on results for select
  to authenticated
  using (true);
```

**Verify the boundary** (run in the Supabase SQL editor or any REST client with only the `anon` key):

```sql
-- This should return 0 rows (RLS blocks it):
select * from results limit 1;
```

**Create parent accounts:**

Go to Authentication → Users → Add user. Create accounts for both parents. **Disable public sign-ups** under Authentication → Settings.

---

### 2. Netlify — do this in the Netlify dashboard

1. Push this repo to GitHub (or GitLab).
2. Connect it to Netlify: **Add new site → Import an existing project**.
3. Under **Site configuration → Environment variables**, add:
   - `SUPABASE_URL` — your Supabase project URL (`https://xxxx.supabase.co`)
   - `SUPABASE_ANON_KEY` — your Supabase `anon` public key
4. Trigger a deploy. The build command substitutes these values into `js/config.js` at build time.

---

### 3. Local testing (without deploying)

Edit `js/config.js` and replace the placeholder strings with your real Supabase URL and anon key. **Do not commit this file with real values** — add `js/config.js` to `.gitignore` while testing locally, or revert before pushing.

Open `index.html` via a local server (e.g., `npx serve .` or VS Code Live Server). Opening directly as `file://` will block Supabase CORS requests.

---

## Acceptance test (§5 of the spec)

With only the `anon` key (no login):

```bash
curl -X POST 'https://YOUR_PROJECT.supabase.co/rest/v1/results' \
  -H "apikey: YOUR_ANON_KEY" \
  -H "Authorization: Bearer YOUR_ANON_KEY" \
  -H "Content-Type: application/json" \
  -d '{"play_date":"2026-01-01","child":"test","game":"facts","score":8,"total":10,"details":[]}'
# → 201 Created  ✓

curl 'https://YOUR_PROJECT.supabase.co/rest/v1/results?select=*' \
  -H "apikey: YOUR_ANON_KEY" \
  -H "Authorization: Bearer YOUR_ANON_KEY"
# → [] (empty — RLS blocks anon SELECT)  ✓
```

The portal returns rows only after a successful email/password login.

---

## Adding a second child

1. Add a second Netlify site pointing at the same repo.
2. Set `SUPABASE_URL` and `SUPABASE_ANON_KEY` the same; change `CHILD_NAME` env var (add this to the build command in `netlify.toml` if needed, or update `js/config.js`).
3. No DB or policy changes needed — the `child` column separates their rows.
