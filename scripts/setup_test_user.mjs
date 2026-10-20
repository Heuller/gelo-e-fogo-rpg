import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

// Carregar variáveis do .env.local
const envPath = path.resolve(process.cwd(), '.env.local');
let env = {};
if (fs.existsSync(envPath)) {
  const content = fs.readFileSync(envPath, 'utf-8');
  content.split('\n').forEach(line => {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith('#')) {
      const idx = trimmed.indexOf('=');
      if (idx > -1) {
        const k = trimmed.substring(0, idx).trim();
        const v = trimmed.substring(idx + 1).trim();
        env[k] = v;
      }
    }
  });
}

const url = env.NEXT_PUBLIC_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
const secretKey = env.SUPABASE_SECRET_KEY || process.env.SUPABASE_SECRET_KEY;
const publishableKey = env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

const email = env.ALLOWED_USER_EMAIL || process.env.ALLOWED_USER_EMAIL || env.NEXT_PUBLIC_TEST_USER_EMAIL;
const password = env.NEXT_PUBLIC_TEST_USER_PASSWORD || process.env.NEXT_PUBLIC_TEST_USER_PASSWORD;

if (!url || !secretKey || !email || !password) {
  console.error('Erro: NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SECRET_KEY, ALLOWED_USER_EMAIL e NEXT_PUBLIC_TEST_USER_PASSWORD devem estar configurados em .env.local');
  process.exit(1);
}

async function setupTestUser() {
  console.log('--- Configuração do Usuário Único no Supabase ---');
  console.log('URL:', url);
  console.log('E-mail alvo:', email);

  const supabaseAdmin = createClient(url, secretKey, {
    auth: { autoRefreshToken: false, persistSession: false }
  });

  try {
    const { data: usersData, error: listError } = await supabaseAdmin.auth.admin.listUsers();
    if (listError) {
      console.error('Erro ao consultar lista de usuários:', listError.message);
      process.exit(1);
    }

    const existingUser = usersData.users.find(u => u.email?.toLowerCase() === email.toLowerCase());
    let userId;

    if (existingUser) {
      console.log(`[OK] O usuário '${email}' já existe no Supabase (ID: ${existingUser.id}).`);
      userId = existingUser.id;
    } else {
      console.log(`Criando usuário '${email}'...`);
      const { data: newUser, error: createError } = await supabaseAdmin.auth.admin.createUser({
        email,
        password,
        email_confirm: true,
        user_metadata: { role: 'meistre' }
      });

      if (createError) {
        console.error('Erro ao criar usuário:', createError.message);
        process.exit(1);
      }
      console.log(`[OK] Usuário criado com sucesso! ID: ${newUser.user.id}`);
      userId = newUser.user.id;
    }
    console.log('Configuração concluída com sucesso.');
  } catch (err) {
    console.error('Exceção inesperada:', err.message);
    process.exit(1);
  }
}

setupTestUser();
