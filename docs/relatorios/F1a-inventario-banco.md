# Inventário do Banco de Dados — Fase F1a

**Data:** 2026-10-23  
**Status:** Mapeamento concluído das migrações existentes em `supabase/migrations/`.

## 1. Migrações Existentes

### `20261014_init_saves.sql`
- Criação inicial da tabela `saves`:
  - `id UUID PRIMARY KEY DEFAULT gen_random_uuid()`
  - `user_id UUID REFERENCES auth.users(id)`
  - `journey_id TEXT`
  - `node_id TEXT`
  - `character_sheet JSONB`
  - `world_state JSONB`
  - `history JSONB`
  - RLS simples por `auth.uid() = user_id`.

### `20261019_save_slots_and_turn_events.sql`
- Introduziu o conceito de slots restritos (1 a 3 por usuário por jornada) e histórico de turnos append-only:
  - **`public.save_slots`**:
    - `id UUID PRIMARY KEY DEFAULT uuid_generate_v4()`
    - `user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE`
    - `jornada_id TEXT NOT NULL`
    - `slot_number INTEGER NOT NULL CHECK (slot_number BETWEEN 1 AND 3)`
    - `content_version TEXT NOT NULL DEFAULT '2.1.0'`
    - `current_node_id TEXT NOT NULL`
    - `character_sheet JSONB NOT NULL DEFAULT '{}'::jsonb`
    - `world_state JSONB NOT NULL DEFAULT '{}'::jsonb`
    - `chapter_checkpoint JSONB NOT NULL DEFAULT '{}'::jsonb`
    - `created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL`
    - `updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL`
    - Restrição de unicidade: `UNIQUE (user_id, jornada_id, slot_number)`.
    - RLS: Total CRUD para `auth.uid() = user_id`.
  - **`public.turn_events`**:
    - `id UUID PRIMARY KEY DEFAULT uuid_generate_v4()`
    - `slot_id UUID NOT NULL REFERENCES public.save_slots(id) ON DELETE CASCADE`
    - `user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE`
    - `turn_number INTEGER NOT NULL`
    - `node_id TEXT NOT NULL`
    - `choice_made TEXT NOT NULL`
    - `state_delta JSONB NOT NULL DEFAULT '{}'::jsonb`
    - `timestamp TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL`
    - RLS: Estritamente **Append-Only** (SELECT e INSERT para `auth.uid() = user_id`; UPDATE e DELETE bloqueados).
  - **`public.ai_usage`**:
    - Telemetria de tokens, latência e custo com RLS.

## 2. Lacunas e Diagnóstico para a Arquitetura Autoritativa (F1)

1. **Ausência de Concorrência Otimista**: `save_slots` não possuía a coluna `versao INT DEFAULT 0`, permitindo que abas simultâneas sobrescrevessem turnos sem detectar conflitos.
2. **Snapshot de Estado nos Turnos**: `turn_events` armazenava apenas `state_delta`, sem guardar o `snapshot_antes` (`character_sheet`, `world_state`, `node_id` antes da decisão), o que tornava o «Desfazer» e o «Rerrolar» propensos a corrupção do estado.
3. **Desacoplamento do Cliente**: O cliente frontend enviava o estado completo (`ficha` e `worldState`), quando em uma arquitetura de servidor autoritativo ele deve enviar apenas `(slotId, escolhaId, versaoEsperada)`.
4. **Fallback Silencioso**: `saveManager.ts` retornava `{ sucesso: true, destino: 'local_fallback' }` quando a chamada ao Supabase falhava, mascarando erros reais de banco.

## 3. Plano da Migração `20261023_save_autoritativo.sql`
- Adicionar coluna `versao INT NOT NULL DEFAULT 0` em `save_slots`.
- Adicionar colunas `snapshot_antes JSONB DEFAULT '{}'::jsonb` e `resultado JSONB DEFAULT '{}'::jsonb` em `turn_events`.
- Garantir índices e integridade referencial com RLS intacto.
