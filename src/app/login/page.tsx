'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { Shield, KeyRound, AlertCircle } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);

    const supabase = createClient();
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      if (error) {
        setErrorMsg('Credenciais incorretas ou acesso não autorizado pela Cidadela.');
        setLoading(false);
        return;
      }

      router.push('/painel');
    } catch {
      setErrorMsg('Não foi possível conectar ao serviço de autenticação. Verifique sua conexão.');
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#0D0B0A] text-[#E6DEC8] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-[#171412] border-2 border-[#2D2620] rounded-2xl p-8 shadow-2xl backdrop-blur-md">
        
        {/* Brasão / Cabeçalho */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#8B1E1E]/40 border-2 border-[#C5A059] mb-4 shadow-lg shadow-black/60">
            <Shield className="w-8 h-8 text-[#C5A059]" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-[#C5A059] font-serif">
            Crônicas de Sangue e Gelo
          </h1>
          <p className="text-xs uppercase tracking-widest text-[#A69E89] mt-2">
            Acesso Restrito aos Arquivos da Cidadela
          </p>
        </div>

        {errorMsg && (
          <div className="mb-6 p-3 bg-red-950/60 border border-red-700/60 rounded-lg text-red-200 text-sm flex items-center gap-2" role="alert">
            <AlertCircle className="w-5 h-5 flex-shrink-0 text-red-400" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Formulário de Acesso */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-xs uppercase tracking-wider text-[#A69E89] mb-1">
              E-mail do Proprietário
            </label>
            <input
              id="email"
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu-email@dominio.com"
              className="w-full px-3 py-2.5 bg-[#12100E] border border-[#2D2620] rounded-lg text-sm text-[#E6DEC8] placeholder-[#8F8774] focus:outline-none focus:border-[#C5A059] transition-colors"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-xs uppercase tracking-wider text-[#A69E89] mb-1">
              Senha Selada
            </label>
            <input
              id="password"
              type="password"
              required
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              className="w-full px-3 py-2.5 bg-[#12100E] border border-[#2D2620] rounded-lg text-sm text-[#E6DEC8] placeholder-[#8F8774] focus:outline-none focus:border-[#C5A059] transition-colors"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-4 py-3 px-4 rounded-lg bg-gradient-to-r from-amber-600 via-amber-500 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-black font-bold text-sm tracking-wide transition-all flex items-center justify-center gap-2 shadow-lg shadow-amber-950/40 disabled:opacity-50"
          >
            <KeyRound className="w-4 h-4 text-black" />
            <span>{loading ? 'Consultando os Registros...' : 'Entrar nos Aposentos'}</span>
          </button>
        </form>

      </div>
    </main>
  );
}
