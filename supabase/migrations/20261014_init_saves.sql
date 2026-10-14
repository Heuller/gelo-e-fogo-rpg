-- ========================================================
-- Migração Inicial: Tabela de Saves e RLS (Crônicas de Sangue e Gelo)
-- ========================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS public.saves (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    nome_save TEXT NOT NULL,
    jornada_id TEXT NOT NULL,
    ato_id TEXT NOT NULL,
    node_id TEXT NOT NULL,
    estado_personagem JSONB NOT NULL DEFAULT '{}'::jsonb,
    estado_mundo JSONB NOT NULL DEFAULT '{}'::jsonb,
    historico_escolhas JSONB NOT NULL DEFAULT '[]'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Índices de performance
CREATE INDEX IF NOT EXISTS idx_saves_user_id ON public.saves(user_id);
CREATE INDEX IF NOT EXISTS idx_saves_jornada_id ON public.saves(jornada_id);
CREATE INDEX IF NOT EXISTS idx_saves_updated_at ON public.saves(updated_at DESC);

-- Habilitar Row Level Security (RLS)
ALTER TABLE public.saves ENABLE ROW LEVEL SECURITY;

-- Políticas de RLS
DROP POLICY IF EXISTS "Usuários podem visualizar apenas seus próprios saves" ON public.saves;
CREATE POLICY "Usuários podem visualizar apenas seus próprios saves"
    ON public.saves FOR SELECT
    USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Usuários podem criar seus próprios saves" ON public.saves;
CREATE POLICY "Usuários podem criar seus próprios saves"
    ON public.saves FOR INSERT
    WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Usuários podem atualizar seus próprios saves" ON public.saves;
CREATE POLICY "Usuários podem atualizar seus próprios saves"
    ON public.saves FOR UPDATE
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Usuários podem deletar seus próprios saves" ON public.saves;
CREATE POLICY "Usuários podem deletar seus próprios saves"
    ON public.saves FOR DELETE
    USING (auth.uid() = user_id);
