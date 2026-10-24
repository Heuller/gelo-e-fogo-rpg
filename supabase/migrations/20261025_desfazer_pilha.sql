-- Migration: 20261025_desfazer_pilha.sql
-- Descrição: Suporte à pilha de desfazer e rerrolagem atômica através de eventos compensatórios append-only

-- 1. Adiciona coluna 'tipo' para categorização estrita dos eventos de turno
ALTER TABLE turn_events 
ADD COLUMN IF NOT EXISTS tipo VARCHAR(32) NOT NULL DEFAULT 'escolha';

-- 2. Adiciona coluna 'referencia_turn_number' para apontar o turno anulado/compensado
ALTER TABLE turn_events 
ADD COLUMN IF NOT EXISTS referencia_turn_number INTEGER NULL;

-- 3. Índice para busca performática de histórico ativo
CREATE INDEX IF NOT EXISTS idx_turn_events_slot_tipo_turn 
ON turn_events (slot_id, tipo, turn_number DESC);

-- 4. Comentários explicativos para documentação no banco
COMMENT ON COLUMN turn_events.tipo IS 'Classificação do evento: escolha, desfazer, rerrolar, tentativa_livre';
COMMENT ON COLUMN turn_events.referencia_turn_number IS 'Número do turno histórico anulado por este evento compensatório';
