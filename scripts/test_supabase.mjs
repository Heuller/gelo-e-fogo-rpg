import { createClient } from '@supabase/supabase-js';

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const publishableKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
const secretKey = process.env.SUPABASE_SECRET_KEY;

if (!url || !publishableKey || !secretKey) {
  console.error('Erro: Configure NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY e SUPABASE_SECRET_KEY.');
  process.exit(1);
}

const supabaseAnon = createClient(url, publishableKey);
const supabaseAdmin = createClient(url, secretKey);

async function testConnection() {
  console.log('--- Testando Conexão Supabase ---');
  try {
    const { data: { session }, error: sessionError } = await supabaseAnon.auth.getSession();
    console.log('Cliente Anônimo:', sessionError ? `Erro: ${sessionError.message}` : 'Conexão OK (sem sessão)');
  } catch (e) {
    console.log('Erro ao testar anônimo:', e.message);
  }

  try {
    const { data: users, error: adminError } = await supabaseAdmin.auth.admin.listUsers({ page: 1, perPage: 1 });
    console.log('Cliente Admin:', adminError ? `Erro: ${adminError.message}` : `Conexão OK! Usuários encontrados: ${users?.users?.length || 0}`);
  } catch (e) {
    console.log('Erro ao testar admin:', e.message);
  }
}

testConnection();
