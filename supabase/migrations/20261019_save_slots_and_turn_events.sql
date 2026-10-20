-- ====================================================================
-- MIGRAÇÃO 20261019: Slots de Save Blindados, Eventos Append-Only e IA
-- ====================================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. TABELA DE SLOTS DE SAVE (Máximo 3 slots por Usuário por Jornada)
CREATE TABLE IF NOT EXISTS public.save_slots (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    jornada_id TEXT NOT NULL,
    slot_number INTEGER NOT NULL CHECK (slot_number BETWEEN 1 AND 3),
    content_version TEXT NOT NULL DEFAULT '2.1.0',
    current_node_id TEXT NOT NULL,
    character_sheet JSONB NOT NULL DEFAULT '{}'::jsonb,
    world_state JSONB NOT NULL DEFAULT '{}'::jsonb,
    chapter_checkpoint JSONB NOT NULL DEFAULT '{}'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    CONSTRAINT unique_user_jornada_slot UNIQUE (user_id, jornada_id, slot_number)
);

-- Índices de consulta de slots
CREATE INDEX IF NOT EXISTS idx_save_slots_user_id ON public.save_slots(user_id);
CREATE INDEX IF NOT EXISTS idx_save_slots_jornada ON public.save_slots(jornada_id);
CREATE INDEX IF NOT EXISTS idx_save_slots_updated_at ON public.save_slots(updated_at DESC);

-- 2. TABELA DE EVENTOS DE TURNO (Append-Only Imutável para Histórico)
CREATE TABLE IF NOT EXISTS public.turn_events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slot_id UUID NOT NULL REFERENCES public.save_slots(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    turn_number INTEGER NOT NULL,
    node_id TEXT NOT NULL,
    choice_made TEXT NOT NULL,
    state_delta JSONB NOT NULL DEFAULT '{}'::jsonb,
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Índices de histórico
CREATE INDEX IF NOT EXISTS idx_turn_events_slot_id ON public.turn_events(slot_id);
CREATE INDEX IF NOT EXISTS idx_turn_events_turn_order ON public.turn_events(slot_id, turn_number DESC);

-- 3. TABELA DE CONTROLE DE USO E CUSTOS DE IA (Circuit Breaker)
CREATE TABLE IF NOT EXISTS public.ai_usage (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    model TEXT NOT NULL,
    prompt_tokens INTEGER NOT NULL DEFAULT 0,
    completion_tokens INTEGER NOT NULL DEFAULT 0,
    latency_ms INTEGER NOT NULL DEFAULT 0,
    status TEXT NOT NULL DEFAULT 'success',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_ai_usage_user_date ON public.ai_usage(user_id, created_at DESC);

-- ====================================================================
-- POLÍTICAS DE ROW LEVEL SECURITY (RLS)
-- ====================================================================

ALTER TABLE public.save_slots ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.turn_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_usage ENABLE ROW LEVEL SECURITY;

-- Regras para save_slots (CRUD completo pelo proprietário do registro)
DROP POLICY IF EXISTS "Usuários gerenciam seus próprios slots" ON public.save_slots;
CREATE POLICY "Usuários gerenciam seus próprios slots"
    ON public.save_slots FOR ALL
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

-- Regras para turn_events (ESTRITAMENTE APPEND-ONLY: apenas SELECT e INSERT permitidos)
DROP POLICY IF EXISTS "Usuários visualizam seus próprios turnos" ON public.turn_events;
CREATE POLICY "Usuários visualizam seus próprios turnos"
    ON public.turn_events FOR SELECT
    USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Usuários inserem novos turnos" ON public.turn_events;
CREATE POLICY "Usuários inserem novos turnos"
    ON public.turn_events FOR INSERT
    WITH CHECK (auth.uid() = user_id);

-- Bloqueio explícito contra mutação e exclusão manual de histórico
-- (UPDATE e DELETE não possuem política concedida, garantindo imutabilidade)

-- Regras para ai_usage
DROP POLICY IF EXISTS "Usuários visualizam seu próprio consumo de IA" ON public.ai_usage;
CREATE POLICY "Usuários visualizam seu próprio consumo de IA"
    ON public.ai_usage FOR SELECT
    USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Usuários registram eventos de consumo de IA" ON public.ai_usage;
CREATE POLICY "Usuários registram eventos de consumo de IA"
    ON public.ai_usage FOR INSERT
    WITH CHECK (auth.uid() = user_id);
