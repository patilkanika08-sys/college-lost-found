import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://ydzpaokxjlhitokthllk.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlkenBhb2t4amxoaXRva3RobGxrIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4MzQzNzkzMCwiZXhwIjoyMDk5MDEzOTMwfQ._joCvRpxa4-B0VVOMsRMfigYpCBa5ksj1MPAwmPT0IY";

export const supabase = createClient(
  supabaseUrl,
  supabaseKey
);