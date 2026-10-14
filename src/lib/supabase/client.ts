import { createBrowserClient } from '@supabase/ssr';

export function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://iqjntkrjwgnqvalgiatl.supabase.co';
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || 'sb_publishable_4oQFUOoiNICF2Uc7BPUNcg__dzodvXJ';

  return createBrowserClient(supabaseUrl, supabaseKey);
}
