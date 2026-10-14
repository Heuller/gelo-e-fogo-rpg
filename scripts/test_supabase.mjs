import { createClient } from '@supabase/supabase-js';

const url = 'https://iqjntkrjwgnqvalgiatl.supabase.co';
const secretKey = 'sb_secret_6Bu7sgeu8mwUf94hfLxPrA_15CB1_tJ';
const publishableKey = 'sb_publishable_4oQFUOoiNICF2Uc7BPUNcg__dzodvXJ';

const email = 'meistre@cidadela.westeros';
const password = 'ValarMorghulis2026!';

async function testSupabase() {
  console.log('Testando conexão com Supabase...');
  const supabaseAdmin = createClient(url, secretKey);

  // 1. Testar conexão listando usuários do Auth
  try {
    const { data: usersData, error: usersError } = await supabaseAdmin.auth.admin.listUsers();
    if (usersError) {
      console.log('Erro ao listar usuários (Auth Admin):', usersError.message);
    } else {
      console.log('Conexão Auth Admin OK! Usuários cadastrados:', usersData.users.length);
      const existe = usersData.users.find(u => u.email === email);
      if (existe) {
        console.log(`Usuário de teste ${email} já existe no Supabase (ID: ${existe.id}).`);
      } else {
        console.log(`Criando usuário de teste ${email}...`);
        const { data: newUser, error: createError } = await supabaseAdmin.auth.admin.createUser({
          email,
          password,
          email_confirm: true,
          user_metadata: { role: 'meistre', nome: 'Grande Meistre' }
        });
        if (createError) {
          console.log('Erro ao criar usuário:', createError.message);
        } else {
          console.log(`Usuário ${email} criado com sucesso! ID:`, newUser.user.id);
        }
      }
    }
  } catch (err) {
    console.log('Exceção no admin:', err);
  }

  // 2. Testar login com Publishable Key
  const supabaseClient = createClient(url, publishableKey);
  const { data: loginData, error: loginError } = await supabaseClient.auth.signInWithPassword({
    email,
    password
  });
  if (loginError) {
    console.log('Erro ao fazer login com publishable key:', loginError.message);
  } else {
    console.log('Login de teste automático realizado com sucesso! Token obtido:', loginData.session ? 'SIM' : 'NÃO');
  }
}

testSupabase();
