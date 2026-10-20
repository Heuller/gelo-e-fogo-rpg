import { createClient } from '@supabase/supabase-js';

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const secretKey = process.env.SUPABASE_SECRET_KEY;

if (!url || !secretKey) {
  console.error('Erro: NEXT_PUBLIC_SUPABASE_URL e SUPABASE_SECRET_KEY devem ser configurados no ambiente.');
  process.exit(1);
}

async function checkSavesTable() {
  const supabase = createClient(url, secretKey);
  const { data, error } = await supabase.from('save_slots').select('*').limit(1);
  if (error) {
    console.log('Status da tabela save_slots:', error.message);
  } else {
    console.log('Tabela save_slots encontrada! Registros:', data.length);
  }
}

checkSavesTable();
