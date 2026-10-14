import { createClient as createSupabaseAdmin } from '@supabase/supabase-js';

export function createAdminClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://iqjntkrjwgnqvalgiatl.supabase.co';
  const secretKey = process.env.SUPABASE_SECRET_KEY || 'sb_secret_6Bu7sgeu8mwUf94hfLxPrA_15CB1_tJ';

  return createSupabaseAdmin(supabaseUrl, secretKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}
