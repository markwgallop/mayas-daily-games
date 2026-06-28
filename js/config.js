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

// Daily Facts difficulty band (1–5).
// Bump this to advance Maya to harder facts. See docs for band descriptions.
// 1=Foundations (sum≤10)  2=Make-a-ten (sum 11-20)  3=All addition to 20
// 4=Add & subtract to 20  5=Within 100
window.DAILY_FACTS_BAND = 1;
// Parent portal can override this via localStorage
(function() { const s = localStorage.getItem('facts_band'); if (s) window.DAILY_FACTS_BAND = parseInt(s, 10); })();
