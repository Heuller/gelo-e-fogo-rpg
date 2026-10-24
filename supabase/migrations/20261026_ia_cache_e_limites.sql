-- Migration: 20261026_ia_cache_e_limites.sql
-- Descrição: Cache persistente de enriquecimento narrativo e controle diário de cota/custo de IA (Fase G2)

-- 1. Tabela de Cache Persistente de IA
CREATE TABLE IF NOT EXISTS ia_cache (
  chave VARCHAR(128) PRIMARY KEY,
  jornada_id VARCHAR(64) NOT NULL,
  node_id VARCHAR(64) NOT NULL,
  hash_contexto VARCHAR(64) NOT NULL,
  texto_enriquecido TEXT NOT NULL,
  vozes_extras JSONB NOT NULL DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  expires_at TIMESTAMPTZ NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_ia_cache_jornada_node ON ia_cache (jornada_id, node_id);
CREATE INDEX IF NOT EXISTS idx_ia_cache_expires_at ON ia_cache (expires_at);

COMMENT ON TABLE ia_cache IS 'Cache persistente para respostas de IA em cenas idênticas, evitando custos repetidos.';
COMMENT ON COLUMN ia_cache.chave IS 'Chave determinística composta por jornada_id:node_id:hash_contexto';

-- 2. Tabela de Registro de Cota e Uso Diário de IA
CREATE TABLE IF NOT EXISTS ia_uso (
  user_id UUID NOT NULL,
  data_uso DATE NOT NULL DEFAULT CURRENT_DATE,
  total_chamadas INTEGER NOT NULL DEFAULT 0,
  total_tokens INTEGER NOT NULL DEFAULT 0,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  PRIMARY KEY (user_id, data_uso)
);

CREATE INDEX IF NOT EXISTS idx_ia_uso_user_data ON ia_uso (user_id, data_uso);

COMMENT ON TABLE ia_uso IS 'Controle persistente de cota diária de chamadas e volume de tokens de IA por usuário.';

-- 3. Função RPC para Incremento Atômico com Validação de Limite
CREATE OR REPLACE FUNCTION incrementar_uso_ia(
  p_user_id UUID,
  p_data DATE,
  p_tokens INTEGER,
  p_limite_diario INTEGER
)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_chamadas_atuais INTEGER;
BEGIN
  -- Bloqueia a linha para atualização atômica ou insere novo registro para o dia
  INSERT INTO ia_uso (user_id, data_uso, total_chamadas, total_tokens, updated_at)
  VALUES (p_user_id, p_data, 1, GREATEST(p_tokens, 0), NOW())
  ON CONFLICT (user_id, data_uso) DO UPDATE
  SET
    total_chamadas = CASE 
      WHEN ia_uso.total_chamadas < p_limite_diario THEN ia_uso.total_chamadas + 1 
      ELSE ia_uso.total_chamadas 
    END,
    total_tokens = CASE 
      WHEN ia_uso.total_chamadas < p_limite_diario THEN ia_uso.total_tokens + GREATEST(p_tokens, 0)
      ELSE ia_uso.total_tokens 
    END,
    updated_at = NOW()
  RETURNING total_chamadas INTO v_chamadas_atuais;

  -- Se o número resultante ultrapassou o limite (não incrementou), retorna false
  IF v_chamadas_atuais > p_limite_diario THEN
    RETURN FALSE;
  END IF;

  RETURN TRUE;
END;
$$;

-- 4. Habilitar RLS nas novas tabelas
ALTER TABLE ia_cache ENABLE ROW LEVEL SECURITY;
ALTER TABLE ia_uso ENABLE ROW LEVEL SECURITY;

-- Políticas de RLS para ia_cache
CREATE POLICY "Permitir leitura de cache para usuários autenticados"
  ON ia_cache FOR SELECT
  TO authenticated
  USING (expires_at > NOW());

CREATE POLICY "Permitir inserção de cache para usuários autenticados"
  ON ia_cache FOR INSERT
  TO authenticated
  WITH CHECK (expires_at > NOW());

-- Políticas de RLS para ia_uso
CREATE POLICY "Usuário consulta seu próprio uso de IA"
  ON ia_uso FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Usuário insere/atualiza seu próprio uso de IA"
  ON ia_uso FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);
