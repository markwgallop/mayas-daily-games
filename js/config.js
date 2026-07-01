// Supabase configuration
// Replace these values with your Supabase project URL and anon key.
// On Netlify, set SUPABASE_URL and SUPABASE_ANON_KEY as environment variables
// and use the build plugin or inject them at build time (see README).
//
// For local testing, fill in directly here (do NOT commit real values):
window.SUPABASE_URL = 'YOUR_SUPABASE_URL';
window.SUPABASE_ANON_KEY = 'YOUR_SUPABASE_ANON_KEY';

// The child's name — written to every results row.
// Change this if adding a second child.
window.CHILD_NAME = 'maya';

// Global difficulty level (1–5) — applies to ALL games, each of which maps it
// to its own difficulty via a LEVEL_CONFIG. This is only the build-time default;
// the parent portal overrides it (stored in Supabase settings). The var name is
// kept as DAILY_FACTS_BAND for wire-compat with netlify.toml / the Netlify env var.
// 1=Foundations (to 10)  2=Bridging ten (11-20)  3=Fluency to 20
// 4=Add & subtract to 20  5=Within 100
window.DAILY_FACTS_BAND = 1;
