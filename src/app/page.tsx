import Link from 'next/link';
import { Shield, Sparkles, BookOpen } from 'lucide-react';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#0a0a0c] bg-radial from-[#1e1215] to-[#0a0a0c] text-slate-100 flex flex-col items-center justify-center p-6 text-center">
      <div className="max-w-2xl mx-auto space-y-6">
        
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-red-950/70 border border-amber-600/60 shadow-2xl shadow-red-950/70 mb-2">
          <Shield className="w-10 h-10 text-amber-500" />
        </div>

        <h1 className="text-4xl sm:text-6xl font-bold font-serif tracking-tight text-amber-400 drop-shadow-md">
          Crônicas de Sangue e Gelo
        </h1>

        <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-xl mx-auto">
          Um RPG narrativo e determinístico baseado na obra monumental de George R. R. Martin. 
          Sistema de 6 Atributos-Vozes 2d6, decisões canônicas e ramificações que decidem o trono de Westeros.
        </p>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/login"
            className="w-full sm:w-auto px-8 py-3.5 rounded-lg bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-black font-bold tracking-wide shadow-lg shadow-amber-950/40 transition-all flex items-center justify-center gap-2"
          >
            <Sparkles className="w-5 h-5" />
            <span>Acessar o Jogo (/login)</span>
          </Link>

          <Link
            href="/painel"
            className="w-full sm:w-auto px-8 py-3.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 font-semibold text-sm transition-all flex items-center justify-center gap-2"
          >
            <BookOpen className="w-5 h-5 text-amber-500" />
            <span>Painel das Jornadas</span>
          </Link>
        </div>

        <footer className="pt-12 text-xs text-slate-400">
          Versão 2.1 • Cidadela de Vilavelha • Autenticação Supabase e Motor Determinístico 2d6
        </footer>

      </div>
    </main>
  );
}
