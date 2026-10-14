import { createClient } from '@supabase/supabase-js';

const url = 'https://iqjntkrjwgnqvalgiatl.supabase.co';
const secretKey = 'sb_secret_6Bu7sgeu8mwUf94hfLxPrA_15CB1_tJ';

async function checkSavesTable() {
  const supabase = createClient(url, secretKey);
  const { data, error } = await supabase.from('saves').select('*').limit(1);
  if (error) {
    console.log('Status da tabela saves:', error.message);
  } else {
    console.log('Tabela saves encontrada! Registros:', data.length);
  }
}

checkSavesTable();
