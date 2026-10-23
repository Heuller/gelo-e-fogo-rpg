import Link from 'next/link';
import { Brasao } from '@/components/ui/Brasao';
import { Botao } from '@/components/ui/Botao';
import { BookOpen, Sparkles, Crown, Compass, Swords } from 'lucide-react';
import { getCatalogoPublico } from '@/server/journeys/registry';

export default function HomePage() {
  const catalogo = getCatalogoPublico();

  return (
    <main className="min-h-screen bg-[var(--pagina)] text-[var(--tinta)] flex flex-col items-center justify-center p-4 sm:p-8 font-garamond relative overflow-hidden">
      {/* Luz Radial de Fundo */}
      <div className="absolute inset-0 fundo-radial pointer-events-none opacity-80" />

      {/* Conteúdo Central do Frontispício */}
      <div className="max-w-3xl w-full mx-auto relative z-10 text-center space-y-8 entrada-fade">
        {/* Brasão Heráldico Original do Códice */}
        <div className="flex justify-center pb-2">
          <Brasao tamanho={110} />
        </div>

        {/* Título Monumental em Cinzel */}
        <div className="space-y-3">
          <span className="text-xs uppercase tracking-[0.3em] text-[var(--ouro)] font-cinzel font-bold">
            Crônicas de Sangue e Gelo
          </span>
          <h1 className="text-4xl sm:text-6xl font-bold font-cinzel tracking-wide text-[var(--ouro-claro)] uppercase drop-shadow-2xl">
            O Códice Vivo
          </h1>
          <div className="flex items-center justify-center gap-3 pt-1 text-[var(--ouro-escuro)]">
            <span className="h-px w-16 bg-[var(--ouro-escuro)]/50" />
            <Crown className="w-4 h-4" />
            <span className="h-px w-16 bg-[var(--ouro-escuro)]/50" />
          </div>
        </div>

        {/* Prosa de Abertura / Epígrafe */}
        <p className="text-lg sm:text-xl text-[var(--tinta-suave)] leading-relaxed italic max-w-2xl mx-auto">
          «Quando se joga o jogo dos tronos, ganha-se ou morre-se. Não há meio-termo.»
          <span className="block text-xs font-cinzel tracking-widest text-[var(--ouro)] uppercase not-italic pt-2">
            — George R. R. Martin
          </span>
        </p>

        {/* Ações Principais de Entrada */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
          <Link href="/painel" className="w-full sm:w-auto flex-1">
            <button
              type="button"
              className="w-full px-8 py-3.5 rounded-xl bg-gradient-to-r from-[var(--ouro-escuro)] via-[var(--ouro)] to-[var(--ouro-claro)] text-black font-cinzel font-bold text-xs uppercase tracking-wider shadow-2xl hover:brightness-110 transition-all flex items-center justify-center gap-2 cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--ouro-claro)]"
            >
              <BookOpen className="w-4 h-4 text-black" />
              <span>Abrir o Códice</span>
            </button>
          </Link>

          <Link href="/login" className="w-full sm:w-auto flex-1">
            <button
              type="button"
              className="w-full px-8 py-3.5 rounded-xl bg-[var(--pergaminho-2)] hover:bg-[var(--pergaminho-3)] border-2 border-[var(--borda)] hover:border-[var(--ouro)] text-[var(--tinta)] font-cinzel font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--ouro-claro)]"
            >
              <Crown className="w-4 h-4 text-[var(--ouro)]" />
              <span>Entrar / Acesso</span>
            </button>
          </Link>
        </div>

        {/* Vitrine das Eras Canônicas */}
        <div className="pt-8 border-t border-[var(--borda)]">
          <span className="text-xs uppercase tracking-widest text-[var(--tinta-fraca)] font-cinzel block pb-4">
            Grandes Eras Registradas na Cidadela
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-left">
            {catalogo.map((jornada) => (
              <div
                key={jornada.id}
                className="p-4 rounded-xl bg-[var(--pergaminho-1)] border border-[var(--borda)] hover:border-[var(--ouro-escuro)] transition-colors space-y-1.5"
              >
                <div className="flex items-center justify-between">
                  <span className="font-cinzel font-bold text-xs text-[var(--ouro)]">
                    Jornada {jornada.numero}
                  </span>
                  <span className="text-xs text-[var(--tinta-fraca)] font-mono">
                    {jornada.periodo}
                  </span>
                </div>
                <h2 className="font-cinzel font-bold text-sm text-[var(--tinta)] truncate">
                  {jornada.titulo}
                </h2>
                <p className="text-xs text-[var(--tinta-suave)] line-clamp-2 italic font-garamond">
                  {jornada.descricao}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Rodapé Heráldico Solene */}
        <footer className="pt-6 text-xs text-[var(--tinta-fraca)] font-sans">
          Cidadela de Vilavelha &bull; Motor 2d6 Autoritativo &bull; Licença de Uso Privado
        </footer>
      </div>
    </main>
  );
}
