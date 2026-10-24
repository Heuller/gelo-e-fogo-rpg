'use client';

import React, { useState } from 'react';
import { notFound } from 'next/navigation';
import {
  Botao,
  Painel,
  Cartao,
  Chip,
  Selo,
  Medidor,
  Dialogo,
  Gaveta,
  Aviso,
  Esqueleto,
  Dica,
} from '@/components/ui';
import { Shield, Sparkles, AlertTriangle } from 'lucide-react';

export default function DevUiPage() {
  if (process.env.NODE_ENV === 'production') {
    notFound();
  }

  const [dialogoAberto, setDialogoAberto] = useState(false);
  const [gavetaAberta, setGavetaAberta] = useState(false);

  return (
    <div className="min-h-screen bg-[var(--pagina)] text-[var(--tinta)] p-8 space-y-10 max-w-5xl mx-auto font-garamond">
      <header className="border-b border-[var(--borda)] pb-4">
        <h1 className="text-3xl font-cinzel text-[var(--ouro)] font-bold">
          Catálogo de Componentes — Códice Vivo
        </h1>
        <p className="text-sm font-sans text-[var(--tinta-suave)] mt-1">
          Página de validação de acessibilidade, foco e contraste para o design system.
        </p>
      </header>

      {/* Botões */}
      <section className="space-y-4">
        <h2 className="text-xl font-cinzel text-[var(--ouro-claro)]">1. Botões (`Botao`)</h2>
        <div className="flex flex-wrap gap-4 items-center">
          <Botao variante="primario">Primário (Cera Dourada)</Botao>
          <Botao variante="secundario">Secundário (Pergaminho)</Botao>
          <Botao variante="perigo">Perigo (Carmim)</Botao>
          <Botao variante="fantasma">Fantasma</Botao>
          <Botao variante="primario" carregando>Carregando</Botao>
          <Botao variante="secundario" disabled>Desabilitado</Botao>
        </div>
      </section>

      {/* Painéis e Cartões */}
      <section className="space-y-4">
        <h2 className="text-xl font-cinzel text-[var(--ouro-claro)]">2. Superfícies (`Painel` & `Cartao`)</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Painel>
            <h3 className="font-cinzel text-[var(--ouro)] font-bold mb-2">Painel Padrão</h3>
            <p className="text-sm">Superfície sólida para seções principais da interface e fichas.</p>
          </Painel>
          <Painel destaque>
            <h3 className="font-cinzel text-[var(--ouro)] font-bold mb-2">Painel com Destaque</h3>
            <p className="text-sm">Borda em ouro para áreas ativas ou em foco narrativo.</p>
          </Painel>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <Cartao>Cartão Normal</Cartao>
          <Cartao selecionado>Cartão Selecionado</Cartao>
          <Cartao interativo>Cartão Interativo (Hover)</Cartao>
        </div>
      </section>

      {/* Chips & Badges */}
      <section className="space-y-4">
        <h2 className="text-xl font-cinzel text-[var(--ouro-claro)]">3. Badges (`Chip`)</h2>
        <div className="flex flex-wrap gap-3">
          <Chip variante="padrao">Padrão</Chip>
          <Chip variante="atributo">Comando &bull; DC 9</Chip>
          <Chip variante="origem">[SANGUE VALIRIANO]</Chip>
          <Chip variante="perigo">[RISCO MORTAL]</Chip>
          <Chip variante="sucesso">[ALIANÇA STARK]</Chip>
        </div>
      </section>

      {/* Selos de Resultado */}
      <section className="space-y-4">
        <h2 className="text-xl font-cinzel text-[var(--ouro-claro)]">4. Selos de Veredito (`Selo`)</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <Selo veredito="TRIUNFO" />
          <Selo veredito="SUCESSO" />
          <Selo veredito="FALHA_PARCIAL" />
          <Selo veredito="CALAMIDADE" />
        </div>
      </section>

      {/* Medidores de Estado */}
      <section className="space-y-4 max-w-md">
        <h2 className="text-xl font-cinzel text-[var(--ouro-claro)]">5. Medidores Vitais (`Medidor`)</h2>
        <Medidor
          rotulo="Sangue"
          valor={8}
          max={10}
          corBarra="bg-red-600"
          icone={<Shield className="w-4 h-4 text-red-400" />}
        />
        <Medidor
          rotulo="Compostura"
          valor={6}
          max={10}
          corBarra="bg-sky-500"
          icone={<Sparkles className="w-4 h-4 text-sky-400" />}
        />
        <Medidor
          rotulo="Honra"
          valor={5}
          min={-10}
          max={10}
          corBarra="bg-amber-500"
          icone={<Shield className="w-4 h-4 text-amber-400" />}
        />
      </section>

      {/* Avisos Flutuantes */}
      <section className="space-y-4">
        <h2 className="text-xl font-cinzel text-[var(--ouro-claro)]">6. Avisos (`Aviso`)</h2>
        <div className="space-y-2 max-w-lg">
          <Aviso tipo="info" mensagem="Visenya Targaryen aprova seu desígnio (+15)." />
          <Aviso tipo="sucesso" mensagem="Crônica gravada com sucesso nos pergaminhos da Cidadela." />
          <Aviso tipo="erro" mensagem="Falha de conexão com o banco de dados. Tentando novamente..." />
        </div>
      </section>

      {/* Dicas e Esqueletos */}
      <section className="space-y-4">
        <h2 className="text-xl font-cinzel text-[var(--ouro-claro)]">7. Dicas e Esqueletos (`Dica` & `Esqueleto`)</h2>
        <div className="flex items-center gap-6">
          <Dica texto="O dobro de 6 gera um Triunfo Crítico imediato.">
            <span className="underline cursor-help font-semibold text-[var(--ouro)]">
              Passe o mouse ou foque para ver a Dica
            </span>
          </Dica>
        </div>
        <div className="flex gap-4 items-center">
          <Esqueleto redondo largura={48} altura={48} />
          <div className="space-y-2 flex-1 max-w-sm">
            <Esqueleto altura={16} />
            <Esqueleto altura={12} largura="60%" />
          </div>
        </div>
      </section>

      {/* Modais e Gavetas */}
      <section className="space-y-4">
        <h2 className="text-xl font-cinzel text-[var(--ouro-claro)]">8. Modais e Gavetas</h2>
        <div className="flex gap-4">
          <Botao onClick={() => setDialogoAberto(true)}>Abrir Diálogo Nativo</Botao>
          <Botao onClick={() => setGavetaAberta(true)}>Abrir Gaveta Inferior</Botao>
        </div>

        <Dialogo aberto={dialogoAberto} onFechar={() => setDialogoAberto(false)} titulo="Conselho Secreto">
          <p className="text-sm">
            Janela modal com captura de foco, tecla Esc automática e fechamento com preservação do gatilho anterior.
          </p>
          <div className="flex justify-end pt-2">
            <Botao onClick={() => setDialogoAberto(false)}>Fechar Janela</Botao>
          </div>
        </Dialogo>

        <Gaveta aberta={gavetaAberta} onFechar={() => setGavetaAberta(false)} titulo="Mapa e Registros">
          <p className="text-sm mb-4">
            Gaveta deslizante para dispositivos móveis com suporte a arrasto e rolagem vertical contida.
          </p>
          <Botao onClick={() => setGavetaAberta(false)}>Fechar Gaveta</Botao>
        </Gaveta>
      </section>
    </div>
  );
}
