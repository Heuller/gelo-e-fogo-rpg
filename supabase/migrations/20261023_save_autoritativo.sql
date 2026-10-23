-- ====================================================================
-- MIGRAÇÃO 20261023: Servidor Autoritativo, Concorrência Otimista e Snapshots
-- ====================================================================

-- 1. Adição de controle de concorrência otimista em save_slots
ALTER TABLE public.save_slots 
ADD COLUMN IF NOT EXISTS versao INTEGER NOT NULL DEFAULT 0;

-- 2. Adição de snapshots e resultados detalhados em turn_events para Desfazer/Rerrolar perfeitos
ALTER TABLE public.turn_events 
ADD COLUMN IF NOT EXISTS snapshot_antes JSONB NOT NULL DEFAULT '{}'::jsonb;

ALTER TABLE public.turn_events 
ADD COLUMN IF NOT EXISTS resultado JSONB NOT NULL DEFAULT '{}'::jsonb;

-- 3. Índices adicionais para ordenação e busca eficiente
CREATE INDEX IF NOT EXISTS idx_save_slots_user_jornada_slot 
ON public.save_slots(user_id, jornada_id, slot_number);

CREATE INDEX IF NOT EXISTS idx_turn_events_slot_turn 
ON public.turn_events(slot_id, turn_number DESC);

-- 4. Função RPC para aplicação atômica de turno com validação de versão otimista
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
