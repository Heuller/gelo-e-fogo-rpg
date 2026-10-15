# -*- coding: utf-8 -*-
"""
Gerador Robusto do Compêndio Unificado de Westeros (cronicas_jornadas_e_plots.txt)
Versão 3.0: Baldur's Gate 3 Evolution (Aprovação de Companheiros, Parágrafos Condicionais,
3-4 Escolhas por Cena e 18 Finais com Flags Reativas).
"""

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

def parse_act_file_robust(rel_path):
    full_p = base_dir / rel_path
    content = full_p.read_text(encoding="utf-8")
    
    node_matches = list(re.finditer(r"(j\d_[a-z0-9_]+):\s*\{", content))
    nodes = []
    
    for i, m in enumerate(node_matches):
        node_id = m.group(1)
        start = m.start()
        end = node_matches[i+1].start() if i+1 < len(node_matches) else len(content)
        block = content[start:end]
        
        # Titulo
        t_m = re.search(r"titulo:\s*['`]([^'`]+)['`]", block)
        titulo = t_m.group(1) if t_m else node_id
        
        loc_m = re.search(r"localizacao:\s*['`]([^'`]+)['`]", block)
        reg_m = re.search(r"regionId:\s*['`]([^'`]+)['`]", block)
        ano_m = re.search(r"anoHistorico:\s*['`]([^'`]+)['`]", block)
        fb_m = re.search(r"fallbackText:\s*`([^`]+)`", block)
        
        prosa = ""
        if fb_m:
            prosa = " ".join(fb_m.group(1).split())[:280] + "..."
            
        vozes_m = re.findall(r"atributo:\s*'([a-z]+)',\s*resultadoPassivo:\s*'([A-Z]+)',\s*dcPassiva:\s*([0-9]+),\s*fala:\s*'([^']+)'", block)
        
        # Conditional paragraphs
        cond_paragraphs = []
        pos_cond = block.find("conditionalParagraphs: [")
        if pos_cond != -1:
            for item_m in re.finditer(r"requiredFlag:\s*'([^']+)',\s*text:\s*['`]([^'`]+)['`]", block[pos_cond:]):
                cond_paragraphs.append({
                    "flag": item_m.group(1),
                    "text": " ".join(item_m.group(2).split())[:180] + "..."
                })
        
        # Escolhas usando bracket matching
        escolhas = []
        pos_esc = block.find("escolhas: [")
        if pos_esc != -1:
            depth = 0
            in_str = None
            pos_end = -1
            for idx in range(pos_esc + len("escolhas: [") - 1, len(block)):
                ch = block[idx]
                if in_str:
                    if ch == in_str and block[idx-1] != '\\':
                        in_str = None
                else:
                    if ch in ("'", '"', '`'):
                        in_str = ch
                    elif ch == '[':
                        depth += 1
                    elif ch == ']':
                        depth -= 1
                        if depth == 0:
                            pos_end = idx
                            break
            if pos_end != -1:
                esc_str = block[pos_esc:pos_end+1]
                choice_starts = list(re.finditer(r"\{\s*id:\s*'([^']+)'", esc_str))
                for c_idx, cm in enumerate(choice_starts):
                    cid = cm.group(1)
                    c_start = cm.start()
                    c_end = choice_starts[c_idx+1].start() if c_idx+1 < len(choice_starts) else len(esc_str)
                    c_chunk = esc_str[c_start:c_end]
                    
                    texto_m = re.search(r"texto:\s*['`]([^'`]+)['`]", c_chunk)
                    tipo_m = re.search(r"tipo:\s*['`]([^'`]+)['`]", c_chunk)
                    attr_m = re.search(r"atributo:\s*['`]([^'`]+)['`]", c_chunk)
                    dc_m = re.search(r"dificuldade:\s*([0-9]+)|dc:\s*([0-9]+)", c_chunk)
                    dc_val = dc_m.group(1) or dc_m.group(2) if dc_m else None
                    tag_m = re.search(r"tagOrigem:\s*['`]([^'`]+)['`]", c_chunk)
                    motivo_m = re.search(r"motivoBloqueio:\s*['`]([^'`]+)['`]", c_chunk)
                    flags_req_m = re.findall(r"requiredFlags:\s*\[([^\]]+)\]", c_chunk)
                    
                    # aprovacao companheiros
                    aprov_m = re.search(r"aprovacaoCompanheiros:\s*\{([^}]+)\}", c_chunk)
                    aprov_str = aprov_m.group(1).strip() if aprov_m else None
                    
                    escolhas.append({
                        "id": cid,
                        "texto": texto_m.group(1) if texto_m else "",
                        "tipo": tipo_m.group(1) if tipo_m else "simples",
                        "atributo": attr_m.group(1) if attr_m else None,
                        "dc": dc_val,
                        "tagOrigem": tag_m.group(1) if tag_m else None,
                        "motivoBloqueio": motivo_m.group(1) if motivo_m else None,
                        "requiredFlags": flags_req_m[0].replace("'", "").strip() if flags_req_m else None,
                        "aprovacao": aprov_str
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
            "cond_paragraphs": cond_paragraphs,
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

out = []
out.append("================================================================================")
out.append("AS CRÔNICAS DE GELO E FOGO RPG — COMPÊNDIO UNIFICADO DAS 3 JORNADAS E PLOTS")
out.append("ARQUITETURA DETERMINÍSTICA, SISTEMA DE REATIVIDADE BG3 E COMPANHEIROS")
out.append("================================================================================\n")
out.append("Este documento reúne a totalidade do conteúdo narrativo, mitológico e tático das 3")
out.append("Grandes Eras de Westeros, auditadas segundo o padrão de qualidade Baldur's Gate 3:")
out.append("- 3 a 4 escolhas por cena baseadas nas 4 abordagens de RPG (Força, Lábia, Sombra, Saber).")
out.append("- Sistema de Aprovação de Companheiros (-100 a +100, Hostil a Devotado).")
out.append("- Parágrafos Condicionais [Eco das Suas Escolhas] que reagem a decisões anteriores.")
out.append("- Cenas de Acampamento & Conselho Noturno nos checkpoints (+2 Sangue / Compostura).")
out.append("- 18 Finais Distintos com requiredFlags e motivos de bloqueio históricos.\n")

for j in jornadas_config:
    out.append("################################################################################")
    out.append(f"JORNADA {j['numero']}: {j['titulo'].upper()} ({j['periodo']})")
    out.append(f"Protagonista: {j['protagonista']}")
    out.append("################################################################################\n")
    
    b = j["biblia"]
    out.append("--- 1. CÂNONE HISTÓRICO & MITOLOGIA DA ERA ---")
    if "regioes" in b:
        out.append(f"Regiões Canônicas Mapeadas: {len(b['regioes'])} províncias")
    if "faccoes" in b:
        out.append(f"Facções Ativas: {len(b['faccoes'])} grandes casas e alianças")
    if "dragoes" in b:
        dragoes_raw = b["dragoes"]
        dragoes_list = list(dragoes_raw.values()) if isinstance(dragoes_raw, dict) else dragoes_raw
        out.append(f"Dragões da Era ({len(dragoes_list)} montarias aladas):")
        for d in dragoes_list:
            if isinstance(d, dict):
                nome = d.get('nome', 'Dragão')
                montador = d.get('montador_conquista') or d.get('montador_historico') or d.get('montador', 'Selvagem')
                status = d.get('status_inicio', '')
                esc = d.get('cor_escamas', 'desconhecida')
                chama = d.get('cor_chamas', 'desconhecida')
                out.append(f"  * {nome}: montado por {montador} | Status: {status} | Escamas: {esc} | Chamas: {chama}")
            else:
                out.append(f"  * {d}")
    out.append("")
    
    out.append("--- 2. OS 4 ATOS DA CAMPANHA & GRAFO NARRATIVO BG3 ---")
    total_j_nodes = 0
    total_j_choices = 0
    
    for ato_nome, rel_path in j["atos"]:
        nodes = parse_act_file_robust(rel_path)
        total_j_nodes += len(nodes)
        out.append(f"\n========================================================")
        out.append(f"{ato_nome} [{len(nodes)} CENAS DETALHADAS]")
        out.append(f"========================================================")
        
        for n in nodes:
            out.append(f"\n[Cena: {n['id']}] — \"{n['titulo']}\"")
            out.append(f"Local: {n['localizacao']} ({n['regionId']}) | Ano: {n['anoHistorico']}")
            out.append(f"Prosa Histórica: {n['prosa']}")
            
            if n["cond_paragraphs"]:
                out.append("  [Eco das Suas Escolhas - Parágrafos Condicionais]:")
                for cp in n["cond_paragraphs"]:
                    out.append(f"    * Se flag [{cp['flag']}]: \"{cp['text']}\"")
                    
            if n["vozes"]:
                out.append("  Vozes Internas do Conselho:")
                for voz, res, dc, fala in n["vozes"]:
                    out.append(f"    - [{voz.upper()} {res} DC {dc}]: \"{fala}\"")
                    
            if n["isEnding"]:
                out.append("  ==> [NÓ DE DESFECHO / FINAL]")
            else:
                out.append(f"  Decisões Disponíveis ({len(n['escolhas'])} opções estilo BG3):")
                total_j_choices += len(n['escolhas'])
                for esc in n["escolhas"]:
                    tipo_txt = f"Teste {esc['atributo']} DC {esc['dc']}" if esc["tipo"] == "teste" or esc["tipo"] == "teste_atributo" else "Decisão Direta"
                    tag_txt = f" {esc['tagOrigem']}" if esc.get("tagOrigem") else ""
                    bloq_txt = f" [EXIGE: {esc['requiredFlags']} - Bloqueio: '{esc['motivoBloqueio']}']" if esc.get("requiredFlags") else ""
                    aprov_txt = f" [Reações: {esc['aprovacao']}]" if esc.get("aprovacao") else ""
                    out.append(f"    * [{tipo_txt}]{tag_txt} \"{esc['texto']}\"{aprov_txt}{bloq_txt}")
    
    out.append(f"\n--- 3. OS 6 FINAIS DA JORNADA {j['numero']} ({len(j['finais'])} DESFECHOS DISPONÍVEIS) ---")
    for fid, fnome in j["finais"]:
        out.append(f"  * [{fid}] -> {fnome}")
        
    out.append(f"\nEstatísticas da Jornada {j['numero']}: {total_j_nodes} Cenas | {total_j_choices} Escolhas Mapeadas (Média: {total_j_choices/max(1, total_j_nodes):.1f} escolhas/cena)\n")

out.append("================================================================================")
out.append(f"GLOSSÁRIO VIVO DA CIDADELA ({len(glossario)} VERBETES HISTÓRICOS)")
out.append("================================================================================\n")
for item in glossario:
    nome = item.get("termo") or item.get("nome", "Verbete")
    categoria = item.get("categoria", "Geral")
    resumo = item.get("resumo_meistre") or item.get("definicao", "")
    out.append(f"* {nome.upper()} [{categoria}]: {resumo}")

out_text = "\n".join(out)
out_file.write_text(out_text, encoding="utf-8")
print(f"Compêndio cronicas_jornadas_e_plots.txt regerado com sucesso! Tamanho: {len(out_text)} caracteres.")
