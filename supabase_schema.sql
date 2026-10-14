-- ====================================================================
-- ESQUEMA SQL: Crônicas de Sangue e Gelo (Saves & Auditoria de Turnos)
-- ====================================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Tabela de Slots de Save (3 slots por Jornada por Usuário)
CREATE TABLE IF NOT EXISTS public.save_slots (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    jornada_id TEXT NOT NULL,
    slot_number INTEGER NOT NULL CHECK (slot_number BETWEEN 1 AND 3),
    content_version TEXT NOT NULL DEFAULT '1.0.0',
    current_node_id TEXT NOT NULL,
    character_sheet JSONB NOT NULL DEFAULT '{}'::jsonb,
    world_state JSONB NOT NULL DEFAULT '{}'::jsonb,
    chapter_checkpoint JSONB NOT NULL DEFAULT '{}'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    CONSTRAINT unique_user_jornada_slot UNIQUE (user_id, jornada_id, slot_number)
);

-- Índices de consulta rápida
CREATE INDEX IF NOT EXISTS idx_save_slots_user_id ON public.save_slots(user_id);
CREATE INDEX IF NOT EXISTS idx_save_slots_jornada ON public.save_slots(jornada_id);
CREATE INDEX IF NOT EXISTS idx_save_slots_updated_at ON public.save_slots(updated_at DESC);

-- 2. Tabela de Eventos de Turno (Histórico Append-Only Imutável para Desfazer Turnos)
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

-- Índices do histórico de turnos
CREATE INDEX IF NOT EXISTS idx_turn_events_slot_id ON public.turn_events(slot_id);
CREATE INDEX IF NOT EXISTS idx_turn_events_turn_order ON public.turn_events(slot_id, turn_number DESC);

-- Habilitar Row Level Security (RLS)
ALTER TABLE public.save_slots ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.turn_events ENABLE ROW LEVEL SECURITY;

-- Políticas de RLS para save_slots
DROP POLICY IF EXISTS "Usuários podem gerenciar seus próprios slots de save" ON public.save_slots;
CREATE POLICY "Usuários podem gerenciar seus próprios slots de save"
    ON public.save_slots FOR ALL
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

-- Políticas de RLS para turn_events
DROP POLICY IF EXISTS "Usuários podem gerenciar seus próprios turnos" ON public.turn_events;
CREATE POLICY "Usuários podem gerenciar seus próprios turnos"
    ON public.turn_events FOR ALL
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);
