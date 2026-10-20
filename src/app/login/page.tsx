'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { Shield, KeyRound, Sparkles, AlertCircle } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const testEmail = process.env.NEXT_PUBLIC_TEST_USER_EMAIL || '';
  const testPassword = process.env.NEXT_PUBLIC_TEST_USER_PASSWORD || '';

  async function handleLogin(e?: React.FormEvent) {
    if (e) e.preventDefault();
    setLoading(true);
    setErrorMsg(null);

    const supabase = createClient();
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email || testEmail,
        password: password || testPassword,
      });

      if (error) {
        setErrorMsg(error.message);
        setLoading(false);
        return;
      }

      router.push('/painel');
    } catch (err: any) {
      setErrorMsg(err.message || 'Erro ao conectar ao servidor.');
      setLoading(false);
    }
  }

  function handleAutoTestLogin() {
    setEmail(testEmail);
    setPassword(testPassword);
    setLoading(true);
    setErrorMsg(null);

    const supabase = createClient();
    supabase.auth
      .signInWithPassword({
        email: testEmail,
        password: testPassword,
      })
      .then(({ error }: { error: any }) => {
        if (error) {
          setErrorMsg(error.message);
          setLoading(false);
        } else {
          router.push('/painel');
        }
      })
      .catch((err: any) => {
        setErrorMsg(err.message || 'Erro inesperado.');
        setLoading(false);
      });
  }

  return (
    <main className="min-h-screen bg-[#0a0a0c] bg-radial from-[#1a1215] to-[#0a0a0c] text-slate-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-[#131318] border border-amber-900/40 rounded-xl p-8 shadow-2xl shadow-black/80 backdrop-blur-md">
        
        {/* Brasão / Cabeçalho */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-950/60 border border-amber-600/50 mb-4 shadow-lg shadow-red-950/50">
            <Shield className="w-8 h-8 text-amber-500" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-amber-400 font-serif">
            Crônicas de Sangue e Gelo
          </h1>
          <p className="text-xs uppercase tracking-widest text-slate-400 mt-2">
            Acesso Restrito aos Arquivos da Cidadela
          </p>
        </div>

        {errorMsg && (
          <div className="mb-6 p-3 bg-red-950/50 border border-red-700/60 rounded-lg text-red-200 text-sm flex items-center gap-2">
            <AlertCircle className="w-5 h-5 flex-shrink-0 text-red-400" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Botão Destaque: Auto Login de Teste */}
        <div className="mb-6">
          <button
            type="button"
            onClick={handleAutoTestLogin}
            disabled={loading}
            className="w-full py-3.5 px-4 rounded-lg bg-gradient-to-r from-amber-600 via-amber-500 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-black font-bold tracking-wide transition-all shadow-lg shadow-amber-900/30 flex items-center justify-center gap-2 group cursor-pointer disabled:opacity-50"
          >
            <Sparkles className="w-5 h-5 transition-transform group-hover:scale-110" />
            <span>Entrar com Conta de Teste (Meistre da Cidadela)</span>
          </button>
          <p className="text-[11px] text-center text-slate-400 mt-1.5">
            Preenchimento e autenticação automática para modo piloto.
          </p>
        </div>

        <div className="relative my-6 text-center">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-800"></div>
          </div>
          <span className="relative bg-[#131318] px-3 text-xs uppercase tracking-wider text-slate-400">
            Ou acesse manualmente
          </span>
        </div>

        {/* Formulário Tradicional */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs uppercase tracking-wider text-slate-300 mb-1">
              E-mail do Meistre
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="meistre@cidadela.westeros"
              className="w-full px-3 py-2.5 bg-[#0a0a0c] border border-slate-800 rounded-lg text-sm text-slate-200 focus:outline-none focus:border-amber-600"
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-slate-300 mb-1">
              Senha Selada
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              className="w-full px-3 py-2.5 bg-[#0a0a0c] border border-slate-800 rounded-lg text-sm text-slate-200 focus:outline-none focus:border-amber-600"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 py-3 px-4 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-100 font-semibold text-sm transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            <KeyRound className="w-4 h-4 text-slate-400" />
            <span>{loading ? 'Consultando os Registros...' : 'Entrar nos Aposentos'}</span>
          </button>
        </form>

      </div>
    </main>
  );
}
