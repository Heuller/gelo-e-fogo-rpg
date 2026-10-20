import { createClient as createSupabaseAdmin } from '@supabase/supabase-js';

export function createAdminClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const secretKey = process.env.SUPABASE_SECRET_KEY;

  if (!supabaseUrl || !secretKey) {
    throw new Error('Supabase admin credentials ausentes em variáveis de ambiente (NEXT_PUBLIC_SUPABASE_URL ou SUPABASE_SECRET_KEY).');
  }

  return createSupabaseAdmin(supabaseUrl, secretKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}
