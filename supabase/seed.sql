-- Seed Mínimo para Ambiente de Teste e Validação Local
-- Criação de um slot inicial de demonstração

-- Inserção de slot piloto para o usuário administrador
INSERT INTO public.save_slots (
    id,
    user_id,
    jornada_id,
    slot_number,
    content_version,
    current_node_id,
    character_sheet,
    world_state,
    chapter_checkpoint
)
SELECT 
    '00000000-0000-0000-0000-000000000001'::uuid,
    id,
    'conquista_aegon',
    1,
    '2.1.0',
    'j1_a1_mesa_pintada',
    '{"id": "aegon-conquistador", "nome": "Aegon I Targaryen", "origem": "sangue_valiriano", "inspiracao": 2, "atributos": {"comando": 5, "furia": 4, "astucia": 3, "cortesia": 3, "erudicao": 3, "pressagio": 4}, "estado": {"sangue": 10, "compostura": 10, "honra": 5}, "cicatrizes": [], "segredos": []}'::jsonb,
    '{"reputacaoCasas": {"Targaryen": 10}, "flagsBorboleta": {"jogo_iniciado": true}, "marcosConcluidos": ["2_ac_mesa_pintada"]}'::jsonb,
    '{"atoId": "ato_1", "capituloTitulo": "A Mesa Pintada", "timestamp": "2026-10-19T00:00:00Z"}'::jsonb
FROM auth.users
WHERE email = 'meistre@cidadela.westeros'
LIMIT 1
ON CONFLICT (user_id, jornada_id, slot_number) DO NOTHING;
