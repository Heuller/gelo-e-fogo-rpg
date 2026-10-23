-- ====================================================================
-- ESQUEMA COMPLETO DE PRODUÇÃO: Crônicas de Sangue e Gelo (v2.0.0)
-- Tabelas Autoritativas, RLS, Concorrência Otimista e RPC Atômica
-- ====================================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Tabela de Slots de Save (3 slots por Jornada por Usuário)
CREATE TABLE IF NOT EXISTS public.save_slots (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    jornada_id TEXT NOT NULL,
    slot_number INTEGER NOT NULL CHECK (slot_number BETWEEN 1 AND 3),
    content_version TEXT NOT NULL DEFAULT '2.0.0',
    current_node_id TEXT NOT NULL,
    character_sheet JSONB NOT NULL DEFAULT '{}'::jsonb,
    world_state JSONB NOT NULL DEFAULT '{}'::jsonb,
    chapter_checkpoint JSONB NOT NULL DEFAULT '{}'::jsonb,
    versao INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    CONSTRAINT unique_user_jornada_slot UNIQUE (user_id, jornada_id, slot_number)
);

-- Índices de consulta rápida
CREATE INDEX IF NOT EXISTS idx_save_slots_user_id ON public.save_slots(user_id);
CREATE INDEX IF NOT EXISTS idx_save_slots_jornada ON public.save_slots(jornada_id);
CREATE INDEX IF NOT EXISTS idx_save_slots_updated_at ON public.save_slots(updated_at DESC);
CREATE INDEX IF NOT EXISTS idx_save_slots_user_jornada_slot ON public.save_slots(user_id, jornada_id, slot_number);

-- 2. Tabela de Eventos de Turno (Histórico Append-Only Imutável para Desfazer/Rerrolar)
CREATE TABLE IF NOT EXISTS public.turn_events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slot_id UUID NOT NULL REFERENCES public.save_slots(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    turn_number INTEGER NOT NULL,
    node_id TEXT NOT NULL,
    choice_made TEXT NOT NULL,
    state_delta JSONB NOT NULL DEFAULT '{}'::jsonb,
    snapshot_antes JSONB NOT NULL DEFAULT '{}'::jsonb,
    resultado JSONB NOT NULL DEFAULT '{}'::jsonb,
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Índices do histórico de turnos
CREATE INDEX IF NOT EXISTS idx_turn_events_slot_id ON public.turn_events(slot_id);
CREATE INDEX IF NOT EXISTS idx_turn_events_slot_turn ON public.turn_events(slot_id, turn_number DESC);

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

-- 3. Função RPC para aplicação atômica de turno com validação de versão otimista
CREATE OR REPLACE FUNCTION public.aplicar_turno_atomico(
    p_user_id UUID,
    p_slot_id UUID,
    p_versao_esperada INTEGER,
    p_proximo_node_id TEXT,
    p_character_sheet JSONB,
    p_world_state JSONB,
    p_choice_made TEXT,
    p_turn_number INTEGER,
    p_state_delta JSONB,
    p_snapshot_antes JSONB,
    p_resultado JSONB
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    v_versao_atual INTEGER;
    v_retorno JSONB;
BEGIN
    -- 1. Verifica versão atual do slot com bloqueio para escrita
    SELECT versao INTO v_versao_atual
    FROM public.save_slots
    WHERE id = p_slot_id AND user_id = p_user_id
    FOR UPDATE;

    IF NOT FOUND THEN
        RETURN jsonb_build_object('sucesso', false, 'erro', 'NAO_ENCONTRADO');
    END IF;

    IF v_versao_atual <> p_versao_esperada THEN
        RETURN jsonb_build_object(
            'sucesso', false, 
            'erro', 'CONFLITO_VERSAO', 
            'versao_atual', v_versao_atual, 
            'versao_esperada', p_versao_esperada
        );
    END IF;

    -- 2. Atualiza o slot com incremento de versão
    UPDATE public.save_slots
    SET current_node_id = p_proximo_node_id,
        character_sheet = p_character_sheet,
        world_state = p_world_state,
        versao = v_versao_atual + 1,
        updated_at = timezone('utc'::text, now())
    WHERE id = p_slot_id AND user_id = p_user_id;

    -- 3. Grava o evento na tabela append-only
    INSERT INTO public.turn_events (
        slot_id,
        user_id,
        turn_number,
        node_id,
        choice_made,
        state_delta,
        snapshot_antes,
        resultado,
        timestamp
    ) VALUES (
        p_slot_id,
        p_user_id,
        p_turn_number,
        p_proximo_node_id,
        p_choice_made,
        p_state_delta,
        p_snapshot_antes,
        p_resultado,
        timezone('utc'::text, now())
    );

    RETURN jsonb_build_object(
        'sucesso', true,
        'nova_versao', v_versao_atual + 1
    );
END;
$$;
