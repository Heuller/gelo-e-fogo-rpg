-- ====================================================================
-- MIGRAÇÃO IDEMPOTENTE G7B: Adição da coluna 'modo' em save_slots
-- Três Modos de Jornada: 'cronica', 'padrao', 'juramento'
-- ====================================================================

ALTER TABLE public.save_slots 
ADD COLUMN IF NOT EXISTS modo TEXT DEFAULT 'padrao';

DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint WHERE conname = 'chk_save_slots_modo'
    ) THEN
        ALTER TABLE public.save_slots 
        ADD CONSTRAINT chk_save_slots_modo CHECK (modo IN ('cronica', 'padrao', 'juramento'));
    END IF;
END $$;
