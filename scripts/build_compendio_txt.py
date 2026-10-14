import os
import json
import re
from pathlib import Path

base_dir = Path(r"C:\Projetos\gelo-e-fogo-rpg")

# 1. Carrega as 3 Bíblias e o Glossário Expandido
biblia_j1_path = base_dir / "src" / "server" / "data" / "lore" / "biblia_j1_conquista.json"
biblia_j2_path = base_dir / "src" / "server" / "data" / "lore" / "biblia_j2_danca.json"
biblia_j3_path = base_dir / "src" / "server" / "data" / "lore" / "biblia_j3_tronos.json"
glossario_path = base_dir / "src" / "server" / "data" / "lore" / "glossario_cidadela.json"

with open(biblia_j1_path, "r", encoding="utf-8") as f:
    biblia_j1 = json.load(f)
with open(biblia_j2_path, "r", encoding="utf-8") as f:
    biblia_j2 = json.load(f)
with open(biblia_j3_path, "r", encoding="utf-8") as f:
    biblia_j3 = json.load(f)
with open(glossario_path, "r", encoding="utf-8") as f:
    glossario_raw = json.load(f)

glossario = glossario_raw if isinstance(glossario_raw, list) else glossario_raw.get("verbetes", [])

out_file = base_dir / "cronicas_jornadas_e_plots.txt"

def parse_act_file(rel_path):
    full_p = base_dir / rel_path
    with open(full_p, "r", encoding="utf-8") as f:
        content = f.read()

    # Find nodes
    nodes = []
    # Match node definitions: jX_...: {
    matches = re.finditer(r"([a-z0-9_]+):\s*\{\s*id:\s*'([a-z0-9_]+)',\s*titulo:\s*'([^']+)'", content)
    for m in matches:
        var_name, node_id, titulo = m.group(1), m.group(2), m.group(3)
        pos = m.start()
        # Extract block
        block = content[pos:pos+4000]
        
        loc_m = re.search(r"localizacao:\s*'([^']+)'", block)
        reg_m = re.search(r"regionId:\s*'([^']+)'", block)
        ano_m = re.search(r"anoHistorico:\s*'([^']+)'", block)
        fb_m = re.search(r"fallbackText:\s*`([^`]+)`", block)
        
        prosa = ""
        if fb_m:
            prosa = " ".join(fb_m.group(1).split())[:260] + "..."
            
        vozes_m = re.findall(r"atributo:\s*'([a-z]+)',\s*resultadoPassivo:\s*'([A-Z]+)',\s*dcPassiva:\s*([0-9]+),\s*fala:\s*'([^']+)'", block)
        
        # Escolhas
        escolhas_block = re.search(r"escolhas:\s*\[([\s\S]*?)\]\s*,\s*\}", block)
        escolhas = []
        if escolhas_block:
            sub = re.findall(r"\{\s*id:\s*'([a-z0-9_]+)'[\s\S]*?texto:\s*'([^']+)'[\s\S]*?tipo:\s*'([^']+)'", escolhas_block.group(1))
            for esc_id, esc_txt, esc_tipo in sub:
                c_chunk = escolhas_block.group(1)[escolhas_block.group(1).find(esc_id):escolhas_block.group(1).find(esc_id)+500]
                attr_m = re.search(r"atributo:\s*'([^']+)'", c_chunk)
                dc_m = re.search(r"dc:\s*([0-9]+)", c_chunk)
                mortal = "riscoMortal: true" in c_chunk
                escolhas.append({
                    "id": esc_id,
                    "texto": esc_txt,
                    "tipo": esc_tipo,
                    "atributo": attr_m.group(1) if attr_m else None,
                    "dc": dc_m.group(1) if dc_m else None,
                    "riscoMortal": mortal
                })
                
        is_ending = "isEnding: true" in block
        nodes.append({
            "id": node_id,
            "titulo": titulo,
            "localizacao": loc_m.group(1) if loc_m else "Westeros",
            "regionId": reg_m.group(1) if reg_m else "",
            "anoHistorico": ano_m.group(1) if ano_m else "",
            "prosa": prosa,
            "vozes": vozes_m,
            "escolhas": escolhas,
            "isEnding": is_ending
        })
    return nodes

jornadas_config = [
    {
        "numero": 1,
        "titulo": "A Conquista de Aegon",
        "periodo": "2 a.C. a 13 d.C.",
        "protagonista": "Aegon I Targaryen (O Conquistador)",
        "biblia": biblia_j1,
        "atos": [
            ("ATO 1: A Mesa Pintada e o Desembarque (2 a.C.)", "src/server/data/journeys/j1_act1.ts"),
            ("ATO 2: Harrenhal e a Última Tempestade (2 a.C.)", "src/server/data/journeys/j1_act2.ts"),
            ("ATO 3: O Campo de Fogo e o Rei que se Ajoelhou (2 a.C. - 1 d.C.)", "src/server/data/journeys/j1_act3.ts"),
            ("ATO 4: As Ilhas de Ferro e o Sol Insubmisso de Dorne (2 d.C. - 13 d.C.)", "src/server/data/journeys/j1_act4.ts"),
        ],
        "finais": [
            ("j1_final_canonico_paz_sangrenta", "Final 1: O Trono de Ferro e a Paz de Sangue (Canônico)"),
            ("j1_final_tres_cabecas_triunfantes", "Final 2: As Três Cabeças Indomáveis (What If Épico - Rhaenys Viva)"),
            ("j1_final_furia_fogo_total", "Final 3: O Império das Cinzas (Caminho Implacável / Queima de Dorne)"),
            ("j1_final_trono_estrelado_vilavelha", "Final 4: O Rei Ungido de Vilavelha (Capital em Vilavelha)"),
            ("j1_final_coroa_visenya_irma_sombria", "Final 5: A Ordem da Irmã Sombria (Hegemonia de Visenya)"),
            ("j1_final_pacto_secreto_dornes", "Final 6: O Segredo de Pedra do Dragão (Pacto Místico de Daenys)"),
        ]
    },
    {
        "numero": 2,
        "titulo": "A Dança dos Dragões",
        "periodo": "129 d.C. a 131 d.C.",
        "protagonista": "Rhaenyra Targaryen & Daemon Targaryen",
        "biblia": biblia_j2,
        "atos": [
            ("ATO 1: Os Dois Conselhos, Ponta Tempestade e Sangue e Queijo (129 d.C.)", "src/server/data/journeys/j2_act1.ts"),
            ("ATO 2: Pouso de Gralhas, A Semeadura Vermelha e A Queda da Capital (129-130 d.C.)", "src/server/data/journeys/j2_act2.ts"),
            ("ATO 3: As Terras Fluviais, Tumbleton, O Olho de Deus e o Fosso dos Dragões (130 d.C.)", "src/server/data/journeys/j2_act3.ts"),
            ("ATO 4: Segunda Batalha de Tumbleton, Pedra do Dragão e A Hora do Lobo (130-131 d.C.)", "src/server/data/journeys/j2_act4.ts"),
        ],
        "finais": [
            ("j2_final_canonico_hora_do_lobo", "Final 1: A Hora do Lobo e o Rei Quebrado (Canônico)"),
            ("j2_final_triunfo_negro_rhaenyra", "Final 2: O Reinado de Fogo e Rubi (Triunfo Negro de Rhaenyra)"),
            ("j2_final_hegemonia_verde_dourada", "Final 3: O Sol Dourado de Sunfyre e da Torralta (Hegemonia Verde)"),
            ("j2_final_imperio_sementes_vermithor", "Final 4: A Coroa de Bronze (Império das Sementes de Dragão)"),
            ("j2_final_grande_paz_harrenhal", "Final 5: O Grande Conselho de Sangue (A Grande Paz de Harrenhal)"),
            ("j2_final_justica_gelo_cregan", "Final 6: O Inverno no Trono de Ferro (Justiça de Gelo de Cregan Stark)"),
        ]
    },
    {
        "numero": 3,
        "titulo": "A Guerra dos Cinco Reis",
        "periodo": "298 d.C. a 300 d.C.",
        "protagonista": "Eddard Stark & Robb Stark",
        "biblia": biblia_j3,
        "atos": [
            ("ATO 1: O Inverno Está Chegando — De Winterfell à Estrada do Rei (298 d.C.)", "src/server/data/journeys/j3_act1.ts"),
            ("ATO 2: O Ninho de Víboras em Porto Real e o Segredo de Jon Arryn (298 d.C.)", "src/server/data/journeys/j3_act2.ts"),
            ("ATO 3: A Fúria dos Reis — Bosque dos Murmúrios, Castelo Negro e Água Negra (298-299 d.C.)", "src/server/data/journeys/j3_act3.ts"),
            ("ATO 4: A Tormenta de Espadas — As Gêmeas, A Muralha e a Vigília (299-300 d.C.)", "src/server/data/journeys/j3_act4.ts"),
        ],
        "finais": [
            ("j3_final_rei_no_norte_invicto", "Final 1: A Coroa de Inverno e Bronze (Robb Stark Invicto)"),
            ("j3_final_regencia_honra_eddard", "Final 2: A Mão de Gelo no Trono de Ferro (Regência Honrada de Ned Stark)"),
            ("j3_final_lobos_na_muralha", "Final 3: As Duas Espadas na Noite (Ned e Jon Unidos na Muralha)"),
            ("j3_final_canonico_norte_se_lembra", "Final 4: O Norte se Lembra (Canônico após a Tormenta de Espadas)"),
            ("j3_final_hegemonia_leao_dourado", "Final 5: O Rugido de Rochedo Casterly (Hegemonia Lannister-Tyrell)"),
            ("j3_final_pacto_gelo_e_fogo", "Final 6: A Canção de Gelo e Fogo (A Grande Aliança Continental)"),
        ]
    }
]

sep = "=" * 80
subsep = "-" * 80

with open(out_file, "w", encoding="utf-8") as out:
    out.write(sep + "\n")
    out.write("CRÔNICAS DE SANGUE E GELO (v2.1) - COMPÊNDIO GERAL DAS TRÊS JORNADAS DE WESTEROS\n")
    out.write(sep + "\n\n")
    out.write("DOCUMENTO MESTRE DE DESIGN NARRATIVO, GRAFOS DETERMINÍSTICOS E CANÔNICOS\n")
    out.write("Obras de Base: Fogo & Sangue | As Crônicas de Gelo e Fogo (Livros 1 a 3)\n")
    out.write("Tradução Oficial Brasileira: Jorge Candeias (LeYa)\n")
    out.write("Motor: 2d6 Determinístico + 6 Vozes de Atributo + Camada IA Controlada (Gemini 2.5 Flash)\n\n")
    out.write(f"Total de Verbetes no Glossário Vivo da Cidadela: {len(glossario)}\n")
    out.write("Total de Finais Distintos de Campanha: 18 Finais (6 por Jornada)\n\n")

    grand_total_nodes = 0

    for j in jornadas_config:
        out.write(sep + "\n")
        out.write(f"JORNADA {j['numero']}: {j['titulo'].upper()} ({j['periodo']})\n")
        out.write(sep + "\n\n")
        out.write(f"Protagonista(s): {j['protagonista']}\n")
        
        # Dragões ou Personagens Notáveis
        dragoes = j['biblia'].get('dragoes', {})
        if dragoes:
            out.write("DRAGÕES CENTRAIS DA ERA:\n")
            out.write(subsep + "\n")
            for drag_id, drag in dragoes.items():
                nome = drag.get('nome', drag_id.capitalize())
                montador = drag.get('montador_conquista') or drag.get('montador') or drag.get('montador_danca', 'Vários')
                out.write(f"  * {nome} (Montador: {montador}) | Escamas: {drag.get('cor_escamas', '')} | Chamas: {drag.get('cor_chamas', '')}\n")
            out.write("\n")

        # Personagens Centrais
        personagens = j['biblia'].get('personagens_canonicos', [])
        if personagens:
            out.write("FIGURAS HISTÓRICAS CENTRAIS:\n")
            out.write(subsep + "\n")
            for p in personagens[:12]:
                titulos = ", ".join(p.get("titulos", []))
                out.write(f"  * {p.get('nome')} [{titulos or 'Nobre'}]\n")
            out.write("\n")

        # Os 6 Finais da Jornada
        out.write("OS 6 FINAIS DISTINTOS DESTA JORNADA:\n")
        out.write(subsep + "\n")
        for fid, ftitle in j['finais']:
            out.write(f"  * [{fid}] {ftitle}\n")
        out.write("\n")

        # Atos e Nós
        out.write(f"DETALHAMENTO DOS 4 ATOS E NÓS DA JORNADA {j['numero']}:\n\n")
        j_node_count = 0
        for ato_titulo, ato_file in j['atos']:
            nodes = parse_act_file(ato_file)
            j_node_count += len(nodes)
            grand_total_nodes += len(nodes)
            out.write(subsep + "\n")
            out.write(f"{ato_titulo}\n")
            out.write(f"Arquivo: {ato_file} | Cenas no Grafo: {len(nodes)}\n")
            out.write(subsep + "\n\n")

            for idx, node in enumerate(nodes, 1):
                out.write(f"  [{idx:02d}] Nó ID: {node['id']}\n")
                out.write(f"       Título: {node['titulo']}\n")
                out.write(f"       Localização: {node['localizacao']} | Ano: {node['anoHistorico']}\n")
                if node['isEnding']:
                    out.write("       Status: [DESFECHO DE ATO OU FINAL DE CAMPANHA]\n")
                else:
                    out.write(f"       Status: [CENA DE NARRATIVA E DECISÃO INTERATIVA]\n")
                out.write(f"       Prosa/Sinopse: {node['prosa']}\n")

                if node['vozes']:
                    out.write("       Vozes Internas:\n")
                    for attr, res, dc, fala in node['vozes'][:2]:
                        out.write(f"         - {attr.upper()} (DC {dc}): \"{fala}\"\n")

                if node['escolhas']:
                    out.write(f"       Decisões Disponíveis ({len(node['escolhas'])} opções):\n")
                    for esc in node['escolhas']:
                        if esc['tipo'] == 'teste_atributo' and esc['atributo'] and esc['dc']:
                            mortal = " [RISCO MORTAL]" if esc['riscoMortal'] else ""
                            out.write(f"         * [Teste {esc['atributo'].upper()} DC {esc['dc']}{mortal}] {esc['texto']}\n")
                        else:
                            out.write(f"         * [Decisão Estratégica] {esc['texto']}\n")
                out.write("\n")
            out.write("\n")

        out.write(f"Total de Cenas na Jornada {j['numero']}: {j_node_count} nós narrativos.\n\n")

    # Glossário
    out.write(sep + "\n")
    out.write(f"GLOSSÁRIO VIVO DA CIDADELA ({len(glossario)} VERBETES CANÔNICOS DAS 3 ERAS)\n")
    out.write(sep + "\n\n")

    categorias = {}
    for v in glossario:
        cat = v.get("categoria", "geral")
        categorias.setdefault(cat, []).append(v)

    for cat, items in sorted(categorias.items()):
        out.write(f"CATEGORIA: {cat.upper()} ({len(items)} verbetes)\n")
        out.write(subsep + "\n")
        for item in items:
            out.write(f"  * {item.get('termo')} [ID: {item.get('id')}]\n")
            aliases = item.get("aliases", [])
            if aliases:
                out.write(f"    Outros Nomes / Alcunhas: {', '.join(aliases)}\n")
            resumo = item.get("resumo_meistre")
            if resumo:
                out.write(f"    Resumo do Meistre: {resumo}\n")
            fonte = item.get("fonte", {})
            if isinstance(fonte, dict) and fonte.get("capitulo"):
                out.write(f"    Fonte: {fonte.get('livro', 'Crônicas')} &bull; Capítulo: \"{fonte.get('capitulo')}\"\n")
            out.write("\n")
        out.write("\n")

    out.write(sep + "\n")
    out.write(f"TOTAL GERAL DA PLATAFORMA: {grand_total_nodes} NÓS NARRATIVOS | 18 FINAIS | {len(glossario)} VERBETES\n")
    out.write("FIM DO COMPÊNDIO - CRÔNICAS DE SANGUE E GELO (v2.1)\n")
    out.write(sep + "\n")

print(f"Compêndio mestre das 3 jornadas gerado com sucesso: {grand_total_nodes} nós.")
