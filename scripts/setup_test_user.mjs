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

const url = env.NEXT_PUBLIC_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://iqjntkrjwgnqvalgiatl.supabase.co';
const secretKey = env.SUPABASE_SECRET_KEY || process.env.SUPABASE_SECRET_KEY || 'sb_secret_6Bu7sgeu8mwUf94hfLxPrA_15CB1_tJ';
const publishableKey = env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || 'sb_publishable_4oQFUOoiNICF2Uc7BPUNcg__dzodvXJ';

const email = env.NEXT_PUBLIC_TEST_USER_EMAIL || 'meistre@cidadela.westeros';
const password = env.NEXT_PUBLIC_TEST_USER_PASSWORD || 'ValarMorghulis2026!';

async function setupTestUser() {
  console.log('--- Configuração do Usuário de Teste Único no Supabase ---');
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
      // Garante que o email_confirm esteja true e senha atualizada
      await supabaseAdmin.auth.admin.updateUserById(existingUser.id, {
        password,
        email_confirm: true,
        user_metadata: { role: 'meistre', title: 'Arquimeistre da Cidadela' }
      });
      console.log('[OK] Confirmação de e-mail e credenciais revalidadas com sucesso.');
    } else {
      console.log(`Criando usuário '${email}' via API Admin...`);
      const { data: createdUser, error: createError } = await supabaseAdmin.auth.admin.createUser({
        email,
        password,
        email_confirm: true,
        user_metadata: { role: 'meistre', title: 'Arquimeistre da Cidadela' }
      });

      if (createError) {
        console.error('Erro ao criar usuário:', createError.message);
        process.exit(1);
      }
      userId = createdUser.user.id;
      console.log(`[SUCESSO] Usuário '${email}' criado com sucesso! (ID: ${userId})`);
    }

    // Testar login com Publishable Key
    const supabaseClient = createClient(url, publishableKey);
    const { data: loginData, error: loginError } = await supabaseClient.auth.signInWithPassword({
      email,
      password
    });

    if (loginError) {
      console.error('Falha no teste de autenticação com publishable key:', loginError.message);
      process.exit(1);
    }

    console.log('[SUCESSO] Autenticação de teste concluída com êxito! Token JWT gerado.');
    console.log('ID do Usuário Ativo:', loginData.user.id);
  } catch (err) {
    console.error('Erro inesperado no setup do usuário de teste:', err);
    process.exit(1);
  }
}

setupTestUser();
