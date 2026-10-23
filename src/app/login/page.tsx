'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { Brasao } from '@/components/ui/Brasao';
import { Botao } from '@/components/ui/Botao';
import { KeyRound, AlertCircle, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

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
    <main className="min-h-screen bg-[var(--pagina)] text-[var(--tinta)] flex items-center justify-center p-4 font-garamond relative overflow-hidden">
      {/* Luz Radial de Fundo */}
      <div className="absolute inset-0 fundo-radial pointer-events-none opacity-80" />

      <div className="w-full max-w-md bg-[var(--pergaminho-2)] border-2 border-[var(--borda)] rounded-2xl p-6 sm:p-8 shadow-2xl relative z-10 space-y-6 entrada-sobe">
        {/* Retorno à Home */}
        <div className="flex justify-start">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-cinzel text-[var(--tinta-suave)] hover:text-[var(--ouro)] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--ouro-claro)] rounded"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Retornar ao Frontispício</span>
          </Link>
        </div>

        {/* Brasão / Cabeçalho */}
        <div className="text-center space-y-3">
          <div className="flex justify-center">
            <Brasao tamanho={72} />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--ouro-claro)] font-cinzel uppercase drop-shadow">
            Crônicas de Sangue e Gelo
          </h1>
          <p className="text-xs uppercase tracking-widest text-[var(--ouro-escuro)] font-cinzel font-bold">
            Acesso Restrito aos Arquivos da Cidadela
          </p>
        </div>

        {errorMsg && (
          <div
            className="p-3.5 bg-red-950/80 border border-red-700/80 rounded-xl text-red-200 text-xs flex items-center gap-2.5 entrada-fade"
            role="alert"
          >
            <AlertCircle className="w-5 h-5 flex-shrink-0 text-red-400" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Formulário de Acesso */}
        <form onSubmit={handleLogin} className="space-y-4 text-xs font-sans">
          <div className="space-y-1.5">
            <label
              htmlFor="email"
              className="block font-cinzel uppercase tracking-wider text-[var(--tinta-suave)] font-bold text-xs"
            >
              E-mail do Proprietário
            </label>
            <input
              id="email"
              type="email"
              required
              autoFocus
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu-email@dominio.com"
              className="w-full px-3.5 py-2.5 bg-[var(--pergaminho-1)] border border-[var(--borda)] rounded-xl text-sm text-[var(--tinta)] placeholder-[var(--tinta-fraca)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--ouro-claro)] transition-colors"
            />
          </div>

          <div className="space-y-1.5">
            <label
              htmlFor="password"
              className="block font-cinzel uppercase tracking-wider text-[var(--tinta-suave)] font-bold text-xs"
            >
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
              className="w-full px-3.5 py-2.5 bg-[var(--pergaminho-1)] border border-[var(--borda)] rounded-xl text-sm text-[var(--tinta)] placeholder-[var(--tinta-fraca)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--ouro-claro)] transition-colors"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 rounded-xl font-cinzel font-bold text-xs uppercase tracking-wider bg-gradient-to-r from-[var(--ouro-escuro)] via-[var(--ouro)] to-[var(--ouro-claro)] text-black shadow-xl hover:brightness-110 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--ouro-claro)]"
            >
              <KeyRound className="w-4 h-4 text-black" />
              <span>{loading ? 'Consultando os Selos…' : 'Romper os Selos e Entrar'}</span>
            </button>
          </div>
        </form>

        <footer className="pt-3 text-center text-xs text-[var(--tinta-fraca)] font-sans border-t border-[var(--borda)]">
          Uso pessoal blindado &bull; Servidor autoritativo de jogo
        </footer>
      </div>
    </main>
  );
}
