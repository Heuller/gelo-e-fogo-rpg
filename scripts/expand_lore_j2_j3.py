import os
import json
import shutil
from pathlib import Path

base_proj = Path(r"C:\Projetos\gelo-e-fogo-rpg")
lore_dir = base_proj / "src" / "server" / "data" / "lore"
scripts_dir = base_proj / "scripts"
lore_dir.mkdir(parents=True, exist_ok=True)
scripts_dir.mkdir(parents=True, exist_ok=True)

# Copiar script para scripts/expand_lore_j2_j3.py
self_path = Path(__file__)
dest_script = scripts_dir / "expand_lore_j2_j3.py"
shutil.copyfile(self_path, dest_script)

# ==============================================================================
# 1. GERAR BIBLIA DA JORNADA 2: A DANÇA DOS DRAGÕES (129 a 131 d.C.)
# ==============================================================================

biblia_j2 = {
    "metadata": {
        "jornada": "Jornada 2: A Dança dos Dragões",
        "versao": "2.1",
        "periodo": "129 a 131 d.C.",
        "fonte_principal": "Fogo & Sangue (George R. R. Martin) | Tradução Jorge Candeias (LeYa)",
        "protagonistas": [
            {
                "id": "rhaenyra_targaryen",
                "nome": "Princesa Rhaenyra Targaryen",
                "titulo": "A Rainha de Meio Ano / O Deleite do Reino",
                "traco_origem": "Herdeira Nomeada (Voz de Sangue e Legitimidade de Viserys I)"
            },
            {
                "id": "daemon_targaryen",
                "nome": "Príncipe Daemon Targaryen",
                "titulo": "O Príncipe Canalha / Cavaleiro de Caraxes",
                "traco_origem": "Irmã Sombria (Fúria Marcial Valiriana e Experiência nos Degraus)"
            }
        ]
    },
    "dragoes": {
        "caraxes": {
            "nome": "Caraxes, o Verme de Sangue",
            "montador": "Daemon Targaryen",
            "porte": "Enorme, esguio e temível em combate aéreo",
            "escamas": "Vermelho escarlate",
            "feitos": ["Conquista dos Degraus", "Tomada de Harrenhal", "Duelo sobre o Olho de Deus contra Vhagar"]
        },
        "vhagar": {
            "nome": "Vhagar, a Rainha dos Dragões",
            "montador": "Aemond Targaryen (anteriormente Laena Velaryon e Visenya)",
            "porte": "Colossal, o maior e mais velho dragão vivo após Balerion",
            "escamas": "Bronze esverdeado com manchas escuras",
            "feitos": ["Abate de Arrax em Ponta Tempestade", "Queda de Meleys em Pouso de Gralhas", "Queima das Terras Fluviais"]
        },
        "syrax": {
            "nome": "Syrax",
            "montador": "Rhaenyra Targaryen",
            "porte": "Formidável e alimentada na corte",
            "escamas": "Amarelo dourado",
            "feitos": ["Voo de coroação em Pedra do Dragão", "Tomada de Porto Real"]
        },
        "sunfyre": {
            "nome": "Sunfyre, o Dourado",
            "montador": "Aegon II Targaryen",
            "porte": "Majestoso, considerado o dragão mais belo jamais visto",
            "escamas": "Ouro brilhante e membranas rosadas",
            "feitos": ["Batalha de Pouso de Gralhas", "Combate contra Moondancer em Pedra do Dragão"]
        },
        "meleys": {
            "nome": "Meleys, a Rainha Vermelha",
            "montador": "Princesa Rhaenys Targaryen",
            "porte": "Veloz, temível e experiente em batalha",
            "escamas": "Vermelho escarlate com cristas de cobre",
            "feitos": ["Defesa de Pouso de Gralhas enfrentando Sunfyre e Vhagar simultaneamente"]
        },
        "vermithor": {
            "nome": "Vermithor, a Fúria de Bronze",
            "montador": "Hugh Martelo (anteriormente o Velho Rei Jaehaerys I)",
            "porte": "O segundo maior dragão vivo, atrás apenas de Vhagar",
            "escamas": "Bronze e bronze tostado",
            "feitos": ["A Semeadura Vermelha", "Primeira e Segunda Batalha de Tumbleton"]
        },
        "asaprata": {
            "nome": "Asaprata (Silverwing)",
            "montador": "Ulf, o Branco (anteriormente a Boa Rainha Alysanne)",
            "porte": "Grande, dócil e majestoso",
            "escamas": "Prateado brilhante",
            "feitos": ["A Semeadura Vermelha", "Voo conjunto com Vermithor em Tumbleton"]
        },
        "fumaresia": {
            "nome": "Fumaresia (Seasmoke)",
            "montador": "Addam Velaryon (anteriormente Laenor Velaryon)",
            "porte": "Ágil, cinzento e rápido nas nuvens",
            "escamas": "Cinzento claro pálido",
            "feitos": ["Ataque noturno heroico na Segunda Batalha de Tumbleton"]
        },
        "rouba_ovelhas": {
            "nome": "Rouba-Ovelhas (Sheepstealer)",
            "montador": "Urtigas (Nettles)",
            "porte": "Selvagem, marrom-lama e astuto",
            "escamas": "Castanho pardo",
            "feitos": ["Domado com ovelhas frescas por Urtigas", "Combate na Batalha da Goela"]
        },
        "tessarion": {
            "nome": "Tessarion, a Rainha Azul",
            "montador": "Príncipe Daeron Targaryen, o Ousado",
            "porte": "Jovem, gracioso e veloz",
            "escamas": "Azul cobalto com asas cor de cobre",
            "feitos": ["Batalha do Vinhomel", "Batalhas de Tumbleton"]
        }
    },
    "personagens_canonicos": [
        {
            "id": "rhaenyra_targaryen",
            "nome": "Rhaenyra Targaryen",
            "titulos": ["Rainha dos Sete Reinos", "Princesa de Pedra do Dragão"],
            "faccao": "Pretos",
            "montaria": "Syrax",
            "arma": "Adaga de Aço Valiriano",
            "descricao": "Primogênita e herdeira jurada do Rei Viserys I, cuja coroação em Pedra do Dragão deflagrou a guerra civil dinástica."
        },
        {
            "id": "daemon_targaryen",
            "nome": "Daemon Targaryen",
            "titulos": ["O Príncipe Canalha", "Lorde Protetor do Reino"],
            "faccao": "Pretos",
            "montaria": "Caraxes",
            "arma": "Irmã Sombria (espada de aço valiriano de Visenya)",
            "descricao": "Irmão mais novo de Viserys I e consorte de Rhaenyra, o mais ousado e temido líder guerreiro da Dança dos Dragões."
        },
        {
            "id": "aegon_ii_targaryen",
            "nome": "Aegon II Targaryen",
            "titulos": ["Rei dos Ândalos, dos Roinares e dos Primeiros Homens"],
            "faccao": "Verdes",
            "montaria": "Sunfyre",
            "arma": "Fogonegro (espada ancestral da Conquista)",
            "descricao": "Primogênito varão de Viserys I com Alicent Hightower, coroado às pressas no Fosso dos Dragões pela facção Verde."
        },
        {
            "id": "aemond_targaryen",
            "nome": "Aemond Caolho Targaryen",
            "titulos": ["Príncipe Regente", "Protetor do Reino"],
            "faccao": "Verdes",
            "montaria": "Vhagar",
            "arma": "Espada de aço com safira no olho cego",
            "descricao": "Irmão implacável de Aegon II, que reivindicou Vhagar e desencadeou a guerra aberta ao abater Lucerys em Ponta Tempestade."
        },
        {
            "id": "alicent_hightower",
            "nome": "Alicent Hightower",
            "titulos": ["Rainha Viúva"],
            "faccao": "Verdes",
            "descricao": "Segunda esposa de Viserys I e mãe de Aegon II, mentora política da facção Verde ao lado de seu pai Otto."
        },
        {
            "id": "otto_hightower",
            "nome": "Sor Otto Hightower",
            "titulos": ["Mão do Rei"],
            "faccao": "Verdes",
            "descricao": "Mão de três reis, arquiteto meticuloso da ascensão de seus netos ao Trono de Ferro."
        },
        {
            "id": "criston_cole",
            "nome": "Sor Criston Cole, o Criador de Reis",
            "titulos": ["Senhor Comandante da Guarda Real", "Mão do Rei"],
            "faccao": "Verdes",
            "descricao": "O mais formidável espadachim de sua era, que colocou a coroa de ferro e rubi na cabeça de Aegon II."
        },
        {
            "id": "corlys_velaryon",
            "nome": "Lorde Corlys Velaryon, a Serpente do Mar",
            "titulos": ["Senhor das Marés", "Mestre de Derivaderiva"],
            "faccao": "Pretos (depois conciliador)",
            "descricao": "O maior navegador e mais rico lorde de Westeros, cuja frota bloqueou a Baía da Água Negra."
        },
        {
            "id": "rhaenys_targaryen",
            "nome": "Princesa Rhaenys Targaryen, a Rainha Que Nunca Foi",
            "titulos": ["Senhora de Derivaderiva"],
            "faccao": "Pretos",
            "montaria": "Meleys",
            "descricao": "Esposa de Corlys e experiente montadora de dragão, tombada heroicamente nas chamas de Pouso de Gralhas."
        },
        {
            "id": "jacaerys_velaryon",
            "nome": "Príncipe Jacaerys Velaryon",
            "titulos": ["Príncipe de Pedra do Dragão"],
            "faccao": "Pretos",
            "montaria": "Vermax",
            "descricao": "Herdeiro de Rhaenyra, diplomata talentoso que selou o Pacto de Gelo e Fogo com Cregan Stark."
        },
        {
            "id": "lucerys_velaryon",
            "nome": "Príncipe Lucerys Velaryon",
            "titulos": ["Herdeiro de Derivaderiva"],
            "faccao": "Pretos",
            "montaria": "Arrax",
            "descricao": "Segundo filho de Rhaenyra, enviado como mensageiro de paz a Ponta Tempestade onde encontrou seu destino."
        },
        {
            "id": "cregan_stark",
            "nome": "Lorde Cregan Stark",
            "titulos": ["Senhor de Winterfell", "Guardião do Norte", "Mão do Rei"],
            "faccao": "Pretos",
            "arma": "Gelo (espada ancestral de aço valiriano)",
            "descricao": "O austero senhor do Norte que marchou com vinte mil homens no final da guerra, impondo a Hora do Lobo."
        },
        {
            "id": "addam_velaryon",
            "nome": "Addam Velaryon de Casco",
            "titulos": ["Herdeiro de Derivaderiva", "Cavaleiro de Dragão"],
            "faccao": "Pretos",
            "montaria": "Fumaresia",
            "descricao": "Bastião de lealdade indomável cujo sacrifício em Tumbleton salvou Porto Real da destruição total."
        },
        {
            "id": "urtigas_nettles",
            "nome": "Urtigas (Nettles)",
            "titulos": ["Semente de Dragão"],
            "faccao": "Pretos",
            "montaria": "Rouba-Ovelhas",
            "descricao": "Jovem plebeia morena e franzina que domou o selvagem Rouba-Ovelhas com astúcia e paciência."
        },
        {
            "id": "hugh_martelo",
            "nome": "Hugh Martelo",
            "titulos": ["O Traidor de Tumbleton"],
            "faccao": "Pretos (depois Verdes)",
            "montaria": "Vermithor",
            "descricao": "Ferreiro bastardo hercúleo que domou Vermithor e traiu os Pretos sonhando em se tornar rei."
        },
        {
            "id": "ulf_o_branco",
            "nome": "Ulf, o Branco (Ulf o Bêbado)",
            "titulos": ["O Traidor de Tumbleton"],
            "faccao": "Pretos (depois Verdes)",
            "montaria": "Asaprata",
            "descricao": "Soldado raso iletrado que reivindicou Asaprata e manchou seu nome na infâmia de Tumbleton."
        },
        {
            "id": "larys_strong",
            "nome": "Lorde Larys Strong, o Pé Torto",
            "titulos": ["Mestre dos Sussurros", "Senhor de Harrenhal"],
            "faccao": "Verdes (agente enigmático)",
            "descricao": "Mestre dos espiões conspirador que auxiliou a fuga de Aegon II de Porto Real e moldou as sombras da corte."
        },
        {
            "id": "mysaria",
            "nome": "Mysaria, o Verme Branco",
            "titulos": ["Senhora dos Sussurros de Pedra do Dragão"],
            "faccao": "Pretos",
            "descricao": "Antiga dançarina de Lys e amante de Daemon, líder da rede de espiões de Rhaenyra e arquiteta de Sangue e Queijo."
        }
    ],
    "cronologia_canonica": [
        {
            "periodo": "129 d.C.",
            "titulo": "A Morte de Viserys I e a Divisão do Reino",
            "local": "Porto Real e Pedra do Dragão",
            "fatos": [
                "Viserys I morre no leito; Criston Cole e o Conselho Verde escondem o cadáver e coroam Aegon II.",
                "Rhaenyra descobre a usurpação em Pedra do Dragão, declara juramento de sangue e coroa-se com a coroa do pai.",
                "Príncipe Aemond e Vhagar interceptam Lucerys Velaryon sobre a Baía dos Naufrágios; Arrax cai despedaçado.",
                "Daemon e Mysaria contratam Sangue e Queijo para decapitar o Príncipe Jaehaerys no berço diante de Helaena."
            ]
        },
        {
            "periodo": "129 - 130 d.C.",
            "titulo": "O Fogo Aéreo e A Semeadura Vermelha",
            "local": "Pouso de Gralhas e Derivaderiva",
            "fatos": [
                "Batalha de Pouso de Gralhas: Meleys e Rhaenys caem diante de Sunfyre e Vhagar; Aegon II fica terrivelmente queimado.",
                "Jacaerys Velaryon convoca a Semeadura Vermelha: plebeus bastardos domam Vermithor, Asaprata, Fumaresia e Rouba-Ovelhas.",
                "Batalha da Goela: Navios da Triarquia atacam Derivaderiva; Jacaerys morre flechado com Vermax.",
                "Daemon e Rhaenyra lançam ataque aéreo simultâneo e tomam Porto Real; Aegon II foge disfarçado para Pedra do Dragão."
            ]
        },
        {
            "periodo": "130 d.C.",
            "titulo": "As Duas Traições e O Duelo no Olho de Deus",
            "local": "Tumbleton e Harrenhal",
            "fatos": [
                "Primeira Batalha de Tumbleton: Hugh Martelo e Ulf o Branco voltam suas chamas contra os Pretos e destroem o exército leal.",
                "Duelo sobre o Olho de Deus: Daemon salta de Caraxes sobre Vhagar e crava a Irmã Sombria no olho de Aemond; ambos os dragões morrem nas águas.",
                "O Assalto ao Fosso dos Dragões: A plebe fanatizada pelo Pastor invade o domo e massacra Syrax, Dreamfyre e os dragões prisioneiros."
            ]
        },
        {
            "periodo": "130 - 131 d.C.",
            "titulo": "A Queda dos Monarcas e A Hora do Lobo",
            "local": "Pedra do Dragão e Porto Real",
            "fatos": [
                "Rhaenyra foge para Pedra do Dragão e cai na emboscada de Aegon II; Sunfyre a devora em seis dentadas.",
                "Addam Velaryon e os Senhores dos Rios vencem a Segunda Batalha de Tumbleton; Vermithor e Tessarion perecem.",
                "Aegon II é envenenado na carruagem régia após recusar dobrar o joelho aos exércitos do Norte e dos Rios.",
                "Lorde Cregan Stark chega a Porto Real na Hora do Lobo, assume o governo por seis dias, executa os conspiradores e consagra Aegon III e Jaehaera."
            ]
        }
    ],
    "ganchos_ramificacao": [
        {
            "id": "gancho_lucerys_sobrevive_ponta_tempestade",
            "titulo": "O Resgate de Lucerys Velaryon em Ponta Tempestade",
            "premissa_divergencia": "E se uma manobra acrobática em Arrax ou a intervenção direta de batedores marítimos permitisse a Lucerys escapar das mandíbulas de Vhagar na tempestade?",
            "consequencias_narrativas": [
                "Lucerys retorna vivo a Pedra do Dragão com as notícias da traição de Borros Baratheon.",
                "O assassinato hediondo de Sangue e Queijo pode ser cancelado, preservando a superioridade moral dos Pretos.",
                "Arrax cresce durante a guerra, fornecendo mais um dragão alado ativo nas batalhas navais da Goela."
            ]
        },
        {
            "id": "gancho_rhaenys_resgatada_pouso_gralhas",
            "titulo": "A Sobrevivência de Meleys e Rhaenys em Pouso de Gralhas",
            "premissa_divergencia": "E se reforços aéreos de Pedra do Dragão (Daemon em Caraxes ou os dragões de Derivaderiva) chegassem a tempo em Pouso de Gralhas?",
            "consequencias_narrativas": [
                "A Rainha Rhaenys e Meleys sobrevivem ao choque aéreo contra Vhagar e Sunfyre.",
                "Sunfyre pode ser abatido ou capturado imediatamente, deixando a facção Verde sem rei ativo.",
                "A frota Velaryon permanece resoluta e unida sob Corlys e Rhaenys."
            ]
        },
        {
            "id": "gancho_traicao_tumbleton_evitada",
            "titulo": "A Conspiração de Tumbleton Desmascarada",
            "premissa_divergencia": "E se a espionagem dos Pretos desmascarasse a ganância de Hugh Martelo e Ulf o Branco antes do choque de Tumbleton?",
            "consequencias_narrativas": [
                "Hugh e Ulf são presos ou envenenados na véspera do combate, mantendo Vermithor e Asaprata fiéis à rainha.",
                "O exército de Ormund Hightower e Daeron é aniquilado sem que Porto Real sofra o pânico popular.",
                "Rhaenyra mantém o controle seguro e pacífico da capital."
            ]
        },
        {
            "id": "gancho_fosso_dragoes_salvo",
            "titulo": "A Defesa Armada do Fosso dos Dragões",
            "premissa_divergencia": "E se uma carga maciça de cavaleiros e homens de armas leais impedisse a turba do Pastor de arrombar os portões de ferro do Fosso?",
            "consequencias_narrativas": [
                "Syrax, Dreamfyre, Shrykos e Morghul sobrevivem ao ataque.",
                "A dinastia Targaryen preserva sua hegemonia de dragões viva para as próximas gerações.",
                "A linhagem de dragões em Westeros não se extingue com o reinado de Aegon III."
            ]
        }
    ]
}

biblia_j2_path = lore_dir / "biblia_j2_danca.json"
with open(biblia_j2_path, "w", encoding="utf-8") as f:
    json.dump(biblia_j2, f, indent=2, ensure_ascii=False)
print(f"Salva Bíblia da Jornada 2: {biblia_j2_path}")

# ==============================================================================
# 2. GERAR BIBLIA DA JORNADA 3: A GUERRA DOS CINCO REIS (298 a 300 d.C.)
# ==============================================================================

biblia_j3 = {
    "metadata": {
        "jornada": "Jornada 3: A Guerra dos Cinco Reis",
        "versao": "2.1",
        "periodo": "298 a 300 d.C.",
        "fontes_principais": [
            "A Guerra dos Tronos (George R. R. Martin) - Tradução Jorge Candeias (LeYa)",
            "A Fúria dos Reis (George R. R. Martin) - Tradução Jorge Candeias (LeYa)",
            "A Tormenta de Espadas (George R. R. Martin) - Tradução Jorge Candeias (LeYa)"
        ],
        "protagonistas": [
            {
                "id": "eddard_stark",
                "nome": "Lorde Eddard Stark",
                "titulo": "Senhor de Winterfell / A Mão do Rei",
                "traco_origem": "Honra do Norte (Espada Gelo, Justiça Austera e Lealdade Inabalável)"
            },
            {
                "id": "robb_stark",
                "nome": "Robb Stark",
                "titulo": "O Jovem Lobo / O Rei no Norte",
                "traco_origem": "Lobo Gigante Vento Cinzento (Gênio Militar, Ímpeto do Tridente)"
            }
        ]
    },
    "personagens_canonicos": [
        {
            "id": "eddard_stark",
            "nome": "Eddard 'Ned' Stark",
            "titulos": ["Senhor de Winterfell", "Guardião do Norte", "A Mão do Rei"],
            "casa": "Stark",
            "arma": "Gelo (espada ancestral de aço valiriano de duas mãos)",
            "descricao": "Guardião do Norte austero e leal que viaja a Porto Real para investigar a morte suspeita de Jon Arryn."
        },
        {
            "id": "robert_baratheon",
            "nome": "Rei Robert Baratheon, o Primeiro de Seu Nome",
            "titulos": ["Rei dos Ândalos, dos Roinares e dos Primeiros Homens", "Senhor dos Sete Reinos"],
            "casa": "Baratheon",
            "arma": "Martelo de Guerra de ponta de espinho",
            "descricao": "Guerreiro formidável que derrubou a dinastia Targaryen, agora obeso, melancólico e cercado por intrigas na corte."
        },
        {
            "id": "catelyn_stark",
            "nome": "Catelyn Tully Stark",
            "titulos": ["Senhora de Winterfell"],
            "casa": "Tully / Stark",
            "descricao": "Matriarca resoluta que captura Tyrion na Estalagem e aconselha Robb na guerra contra os Lannister."
        },
        {
            "id": "robb_stark",
            "nome": "Robb Stark, o Jovem Lobo",
            "titulos": ["O Rei no Norte", "Rei do Tridente", "Senhor de Winterfell"],
            "casa": "Stark",
            "companheiro": "Vento Cinzento (lobo gigante)",
            "descricao": "Jovem comandante invicto em campo de batalha que une o Norte e as Terras Fluviais contra a Coroa."
        },
        {
            "id": "jon_snow",
            "nome": "Jon Snow, o Bastardo de Winterfell",
            "titulos": ["Intendente da Mão", "998º Senhor Comandante da Patrulha da Noite"],
            "casa": "Patrulha da Noite / Stark",
            "arma": "Garra Longa (espada bastarda de aço valiriano dos Mormont)",
            "companheiro": "Fantasma (lobo gigante albino)",
            "descricao": "Filho jurado da Patrulha da Noite que defende a Muralha contra as criaturas do além e os selvagens de Mance Rayder."
        },
        {
            "id": "tyrion_lannister",
            "nome": "Tyrion Lannister, o Duende",
            "titulos": ["Atuante Mão do Rei", "Mestre da Moeda"],
            "casa": "Lannister",
            "descricao": "Mente brilhante e sagaz cujo engenho defendeu Porto Real com correntes de ferro e fogovivo na Água Negra."
        },
        {
            "id": "tywin_lannister",
            "nome": "Lorde Tywin Lannister",
            "titulos": ["Senhor de Rochedo Casterly", "Escudo de Lannisporto", "Mão do Rei"],
            "casa": "Lannister",
            "descricao": "O patriarca mais temido dos Sete Reinos, arquiteto frio da ruína dos Stark no Casamento Vermelho."
        },
        {
            "id": "jaime_lannister",
            "nome": "Sor Jaime Lannister, o Regicida",
            "titulos": ["Senhor Comandante da Guarda Real", "O Leão Dourado"],
            "casa": "Lannister",
            "arma": "Espada de ouro e aço valiriano",
            "descricao": "Irmão gêmeo e amante de Cersei, espadachim lendário capturado no Bosque dos Murmúrios."
        },
        {
            "id": "cersei_lannister",
            "nome": "Rainha Cersei Lannister",
            "titulos": ["Rainha Consorte", "Rainha Regente", "Senhora Protetora do Reino"],
            "casa": "Lannister",
            "descricao": "Rainha altiva, ambiciosa e impiedosa que comanda a conspiração para manter seus filhos no trono."
        },
        {
            "id": "joffrey_baratheon",
            "nome": "Joffrey Baratheon, o Primeiro de Seu Nome",
            "titulos": ["Rei Menino dos Sete Reinos"],
            "casa": "Baratheon / Lannister",
            "descricao": "Monarca mimado, cruel e volúvel cuja ordem impulsiva de decapitar Ned Stark ateou fogo a Westeros."
        },
        {
            "id": "stannis_baratheon",
            "nome": "Stannis Baratheon",
            "titulos": ["Rei de Direito dos Sete Reinos", "Senhor de Pedra do Dragão"],
            "casa": "Baratheon",
            "arma": "Luminífera (espada brilhante da Fé do Senhor da Luz)",
            "descricao": "Irmão inflexível de Robert que reivindica a coroa por direito estrito e ataca a capital na Batalha da Água Negra."
        },
        {
            "id": "renly_baratheon",
            "nome": "Renly Baratheon",
            "titulos": ["Senhor de Ponta Tempestade", "O Rei Galante"],
            "casa": "Baratheon",
            "descricao": "Irmão mais jovem de Robert que reúne o imenso poder da Campina e das Terras da Tempestade antes de ser assassinado por uma sombra."
        },
        {
            "id": "petyr_baelish",
            "nome": "Petyr Baelish, Mindinho",
            "titulos": ["Mestre da Moeda", "Senhor de Harrenhal", "Lorde Protetor do Vale"],
            "casa": "Baelish",
            "descricao": "Mestre da intriga financeira e política que plantou as sementes da discórdia entre Stark e Lannister."
        },
        {
            "id": "varys",
            "nome": "Varys, a Aranha",
            "titulos": ["Mestre dos Sussurros"],
            "casa": "Corte de Porto Real",
            "descricao": "Eunuco enigmático cuja teia de 'pequenos passarinhos' conhece todos os segredos das passagens secretas da Fortaleza Vermelha."
        },
        {
            "id": "roose_bolton",
            "nome": "Lorde Roose Bolton, o Homem Esfolado",
            "titulos": ["Senhor do Forte do Pavor", "Protetor do Norte"],
            "casa": "Bolton",
            "descricao": "Lorde frio, de olhos pálidos como leite, que planeja meticulosamente a traição da causa do Norte em Harrenhal e nas Gêmeas."
        },
        {
            "id": "walder_frey",
            "nome": "Lorde Walder Frey",
            "titulos": ["Senhor da Travessia", "Senhor das Gêmeas"],
            "casa": "Frey",
            "descricao": "Patriarca idoso, vingativo e melindroso que quebrou os direitos sagrados de hospitalidade ao massacrar os convidados do banquete nupcial."
        },
        {
            "id": "grande_jon_umber",
            "nome": "Grande Jon Umber",
            "titulos": ["Senhor da Última Lareira"],
            "casa": "Umber",
            "descricao": "Gigante fiel do Norte que primeiro desembainhou sua espada para aclamar Robb Stark como Rei no Norte."
        },
        {
            "id": "brynden_tully",
            "nome": "Sor Brynden Tully, o Peixe Negro",
            "titulos": ["Senhor dos Batedores", "Guardião dos Vaus Sangrentos"],
            "casa": "Tully",
            "descricao": "Irmão veterano de Hoster Tully e maior estrategista e batedor das forças fluviais e nortenhas."
        },
        {
            "id": "jeor_mormont",
            "nome": "Jeor Mormont, o Velho Urso",
            "titulos": ["997º Senhor Comandante da Patrulha da Noite"],
            "casa": "Mormont / Patrulha da Noite",
            "descricao": "Líder austero da Patrulha da Noite que entrega a espada ancestral Garra Longa a Jon Snow antes da Grande Patrulha."
        },
        {
            "id": "mance_rayder",
            "nome": "Mance Rayder, o Rei-para-lá-da-Muralha",
            "titulos": ["Rei dos Homens Livres"],
            "casa": "Povo Livre",
            "descricao": "Antigo patrulheiro que uniu cem tribos selvagens e gigantes para marchar contra a Muralha e escapar dos Outros."
        }
    ],
    "cronologia_canonica": [
        {
            "periodo": "298 d.C.",
            "titulo": "O Lobo no Sul e o Golpe do Trono",
            "local": "Winterfell e Porto Real",
            "fatos": [
                "Ned Stark encontra seis filhotes de lobo gigante na neve e aceita o convite de Robert para ser a Mão do Rei.",
                "Bran Stark é empurrado da torre quebrada por Jaime Lannister; adaga de aço valiriano ataca o menino no leito.",
                "Catelyn prende Tyrion na Estalagem do Entroncamento; Bronn vence o julgamento por combate no Ninho da Águia.",
                "Ned descobre a bastardia de Joffrey, Myrcella e Tommen; Robert é ferido mortalmente por um javali na Mata do Rei.",
                "Mindinho trai Ned na Sala do Trono; Ned é preso nas masmorras e decapitado por Sor Ilyn Payne no Septo de Baelor."
            ]
        },
        {
            "periodo": "299 d.C.",
            "titulo": "A Guerra dos Cinco Reis e A Água Negra",
            "local": "Tridente, Castelo Negro e Porto Real",
            "fatos": [
                "Robb Stark reúne o exército do Norte, captura Jaime Lannister no Bosque dos Murmúrios e é aclamado O Rei no Norte.",
                "Stannis Baratheon usa a sombra mágica de Melisandre para matar Renly Baratheon em Ponta Tempestade.",
                "Jon Snow salva Mormont da criatura morta-viva, recebe Garra Longa e marcha com a Patrulha além da Muralha.",
                "Batalha da Água Negra: Tyrion incendeia a frota de Stannis com fogovivo e corrente de ferro; Tywin e os Tyrell salvam a capital."
            ]
        },
        {
            "periodo": "299 - 300 d.C.",
            "titulo": "A Tormenta de Espadas e o Casamento Vermelho",
            "local": "As Gêmeas e A Muralha",
            "fatos": [
                "Robb quebra a promessa de noivado casando-se com Jeyne Westerling; Karstark é decapitado por traição.",
                "O Casamento Vermelho: Sob a música 'As Chuvas de Castamere', os Frey e Roose Bolton massacram Robb, Catelyn e o exército do Norte.",
                "A Batalha de Castelo Negro: Jon Snow lidera a defesa da Muralha contra os ataques ferozes dos selvagens.",
                "Stannis desembarca na Muralha e dispersa as forças de Mance Rayder; Jon Snow é eleito 998º Senhor Comandante."
            ]
        }
    ],
    "ganchos_ramificacao": [
        {
            "id": "gancho_golpe_lobo_porto_real",
            "titulo": "O Triunfo de Ned Stark na Noite do Golpe",
            "premissa_divergencia": "E se Ned Stark aceitasse as cem espadas oferecidas por Renly Baratheon na calada da noite ou subornasse os Mantos Dourados de Janos Slynt antes de Mindinho?",
            "consequencias_narrativas": [
                "Cersei e Joffrey são detidos no interior da Fortaleza Vermelha antes do amanhecer.",
                "Ned Stark assume a regência incontestada dos Sete Reinos em nome das leis de sucessão.",
                "A Guerra dos Cinco Reis é evitada ou canalizada em julgamentos legítimos na corte."
            ]
        },
        {
            "id": "gancho_ned_stark_muralha",
            "titulo": "Ned Stark Veste o Negro em Castelo Negro",
            "premissa_divergencia": "E se Sor Barristan Selmy ou a guarda de honra interferisse no Septo de Baelor, impedindo Sor Ilyn Payne de abater Ned Stark com Gelo?",
            "consequencias_narrativas": [
                "Ned Stark é poupado e escoltado por Yoren até a Muralha, onde veste o negro.",
                "Ned reencontra Jon Snow em Castelo Negro e revela a verdade sobre Lyanna Stark e a Torre da Alegria.",
                "O Norte não se declara independente mas apoia a Muralha com todo o seu poderio contra os Outros."
            ]
        },
        {
            "id": "gancho_casamento_vermelho_revertido",
            "titulo": "A Descoberta da Traição nas Gêmeas",
            "premissa_divergencia": "E se a agressividade de Vento Cinzento e batedores fiéis de Peixe Negro revelassem as cotas de malha dos Frey sob as túnicas do banquete antes dos portões se fecharem?",
            "consequencias_narrativas": [
                "Robb Stark e seus vassalos sacam suas lâminas a tempo e viram a emboscada contra Walder Frey e Roose Bolton.",
                "As Gêmeas e o Forte do Pavor caem em mãos leais ao Norte e ao Tridente.",
                "O exército nortenho permanece intacto, marchando para o Norte para retomar Fosso Cailin e Winterfell."
            ]
        },
        {
            "id": "gancho_stannis_vence_agua_negra",
            "titulo": "A Tomada de Porto Real por Stannis Baratheon",
            "premissa_divergencia": "E se a frota de Stannis rompesse a corrente de ferro antes da detonação do fogovivo, desembarcando a vanguarda nos portões da capital?",
            "consequencias_narrativas": [
                "Stannis toma a Fortaleza Vermelha, executa Cersei e Joffrey por traição e incesto e assume o Trono de Ferro.",
                "A Casa Tyrell recua para Jardim de Cima, buscando negociação com o novo rei.",
                "O culto a R'hllor se expande pela corte real em Porto Real."
            ]
        }
    ]
}

biblia_j3_path = lore_dir / "biblia_j3_tronos.json"
with open(biblia_j3_path, "w", encoding="utf-8") as f:
    json.dump(biblia_j3, f, indent=2, ensure_ascii=False)
print(f"Salva Bíblia da Jornada 3: {biblia_j3_path}")

# ==============================================================================
# 3. EXPANDIR GLOSSÁRIO DA CIDADELA PARA 220+ VERBETES
# ==============================================================================

glossario_path = lore_dir / "glossario_cidadela.json"
with open(glossario_path, "r", encoding="utf-8") as f:
    glossario_existente = json.load(f)

existentes_ids = {v["id"] for v in glossario_existente}
print(f"Glossário atual possui {len(glossario_existente)} verbetes.")

novos_verbetes = [
    # --- ESPADAS VALIRIANAS E ARMAS NOTÁVEIS ---
    {
        "id": "espada_gelo",
        "termo": "Gelo (Espada Valiriana dos Stark)",
        "aliases": ["A Espada Ancestral dos Reis do Inverno", "Gelo"],
        "categoria": "armas_valirianas",
        "resumo_meistre": "A lendária espada ancestral de duas mãos da Casa Stark, forjada com aço valiriano esfumaçado como água escura e medindo a largura da mão de um homem. Empunhada por Lorde Eddard Stark nas execuções de justiça solene de Winterfell antes de ser tragicamente derretida por Tywin Lannister.",
        "fonte": {
            "livro": "A Guerra dos Tronos",
            "capitulo": "Eddard I",
            "arquivo_md": "corpus_md/jornada_3_tronos/livro_1_a-guerra-dos-tronos_resumo-completo.md"
        }
    },
    {
        "id": "espada_garra_longa",
        "termo": "Garra Longa (Longclaw)",
        "aliases": ["A Espada da Casa Mormont", "A Lâmina Bastarda"],
        "categoria": "armas_valirianas",
        "resumo_meistre": "A espada bastarda ancestral de aço valiriano de quinhentos anos da Casa Mormont da Ilha dos Ursos. Presenteada pelo Senhor Comandante Jeor Mormont a Jon Snow após este salvá-lo de um morto-vivo, tendo o pomo de urso substituído pela cabeça entalhada de um lobo gigante de pedra branca.",
        "fonte": {
            "livro": "A Guerra dos Tronos",
            "capitulo": "Jon VIII",
            "arquivo_md": "corpus_md/jornada_3_tronos/livro_1_a-guerra-dos-tronos_resumo-completo.md"
        }
    },
    {
        "id": "espada_irma_sombria",
        "termo": "Irmã Sombria (Dark Sister)",
        "aliases": ["A Lâmina de Visenya", "A Espada de Daemon Targaryen"],
        "categoria": "armas_valirianas",
        "resumo_meistre": "Uma das duas espadas ancestrais de aço valiriano da Casa Targaryen trazidas de Valíria antes da Perdição. Projetada para a mão fina de uma mulher guerreira como a Rainha Visenya, passou depois para o Príncipe Daemon Targaryen, sendo cravada no olho cego de Aemond sobre o Olho de Deus.",
        "fonte": {
            "livro": "Fogo & Sangue - Volume 1",
            "capitulo": "A Conquista de Aegon",
            "arquivo_md": "corpus_md/jornada_1_conquista/fogo-e-sangue_01_a-conquista-de-aegon.md"
        }
    },
    {
        "id": "espada_fogonegro",
        "termo": "Fogonegro (Blackfyre)",
        "aliases": ["A Espada do Rei", "A Lâmina de Aegon o Conquistador"],
        "categoria": "armas_valirianas",
        "resumo_meistre": "A espada de aço valiriano de duas mãos empunhada pelo próprio Rei Aegon I durante as Guerras da Conquista. Símbolo supremo da soberania régia dos Sete Reinos, passada de monarca a monarca até Aegon II durante a Dança dos Dragões e posteriormente Daemon Blackfyre.",
        "fonte": {
            "livro": "Fogo & Sangue - Volume 1",
            "capitulo": "A Conquista de Aegon",
            "arquivo_md": "corpus_md/jornada_1_conquista/fogo-e-sangue_01_a-conquista-de-aegon.md"
        }
    },
    {
        "id": "espada_cumpridora_de_promessas",
        "termo": "Cumpridora de Promessas (Oathkeeper)",
        "aliases": ["A Espada Rubra de Brienne"],
        "categoria": "armas_valirianas",
        "resumo_meistre": "Uma das duas espadas longas forjadas pelo mestre armeiro Tobho Mott em Porto Real a partir do aço valiriano derretido da ancestral Gelo da Casa Stark, ostentando reflexos rubros e dourados. Entregue por Jaime Lannister a Brienne de Tarth para encontrar e proteger Sansa Stark.",
        "fonte": {
            "livro": "A Tormenta de Espadas",
            "capitulo": "Jaime IX",
            "arquivo_md": "corpus_md/jornada_3_tronos/livro_3_a-tormenta-de-espadas_resumo-completo.md"
        }
    },
    {
        "id": "espada_lamento_da_viuva",
        "termo": "Lamento da Viúva (Widow's Wail)",
        "aliases": ["A Espada de Joffrey"],
        "categoria": "armas_valirianas",
        "resumo_meistre": "A espada gêmea forjada a partir da derretida Gelo da Casa Stark, ofertada por Lorde Tywin Lannister ao Rei Joffrey Baratheon na manhã de seu fatídico casamento com Margaery Tyrell.",
        "fonte": {
            "livro": "A Tormenta de Espadas",
            "capitulo": "Tyrion IV",
            "arquivo_md": "corpus_md/jornada_3_tronos/livro_3_a-tormenta-de-espadas_resumo-completo.md"
        }
    },
    {
        "id": "espada_veneno_do_coracao",
        "termo": "Veneno do Coração (Heartsbane)",
        "aliases": ["A Espada da Casa Tarly"],
        "categoria": "armas_valirianas",
        "resumo_meistre": "A espada ancestral de duas mãos de aço valiriano da Casa Tarly de Monte Chifre, empunhada por quinhentos anos pelos melhores guerreiros da Campina, incluindo o implacável Lorde Randyll Tarly.",
        "fonte": {
            "livro": "A Fúria dos Reis",
            "capitulo": "Catelyn III",
            "arquivo_md": "corpus_md/jornada_3_tronos/livro_2_a-furia-dos-reis_resumo-completo.md"
        }
    },
    {
        "id": "espada_luminifera",
        "termo": "Luminífera (Lightbringer)",
        "aliases": ["A Espada Vermelha dos Heróis", "A Lâmina Flamejante"],
        "categoria": "armas_valirianas",
        "resumo_meistre": "A mítica espada flamejante de Azor Ahai forjada no coração de Nissa Nissa segundo as profecias de Asshai. Stannis Baratheon retirou sua versão do fogo sagrado na praia de Pedra do Dragão pelas bênçãos da sacerdotisa Melisandre.",
        "fonte": {
            "livro": "A Fúria dos Reis",
            "capitulo": "Prólogo",
            "arquivo_md": "corpus_md/jornada_3_tronos/livro_2_a-furia-dos-reis_resumo-completo.md"
        }
    },

    # --- DRAGÕES DA DANÇA ---
    {
        "id": "dragao_caraxes",
        "termo": "Caraxes, o Verme de Sangue",
        "aliases": ["O Verme de Sangue", "O Dragão Vermelho de Daemon"],
        "categoria": "dragao",
        "resumo_meistre": "Dragão formidável de escamas vermelho-escuras montado pelo Príncipe Daemon Targaryen. Era feroz, experiente em combates e temido por sua agilidade e chamas quentes, culminando no choque mortal contra Vhagar no lago Olho de Deus.",
        "fonte": {
            "livro": "Fogo & Sangue - Volume 1",
            "capitulo": "A Morte dos Dragões",
            "arquivo_md": "corpus_md/jornada_2_danca/fogo-e-sangue_02_morte-dos-dragoes-pretos-e-verdes.md"
        }
    },
    {
        "id": "dragao_syrax",
        "termo": "Syrax",
        "aliases": ["O Dragão da Rainha Rhaenyra"],
        "categoria": "dragao",
        "resumo_meistre": "Dragão fêmea de escamas amarelas douradas montada pela Princesa Rhaenyra Targaryen desde os sete anos de idade. Vigorosa e bem alimentada na corte, desceu nas ruas amotinadas de Porto Real durante o terrível assalto ao Fosso dos Dragões.",
        "fonte": {
            "livro": "Fogo & Sangue - Volume 1",
            "capitulo": "Os Herdeiros do Dragão",
            "arquivo_md": "corpus_md/jornada_2_danca/fogo-e-sangue_01_herdeiros-do-dragao-sucessao.md"
        }
    },
    {
        "id": "dragao_sunfyre",
        "termo": "Sunfyre, o Dourado",
        "aliases": ["O Mais Belo Dragão", "O Dragão de Aegon II"],
        "categoria": "dragao",
        "resumo_meistre": "Esplêndido dragão de escamas de ouro puro e chamas douradas ofuscantes, montado pelo Rei Aegon II. Apesar de mutilado e quebrado em Pouso de Gralhas, rastejou até Pedra do Dragão e devorou a Rainha Rhaenyra.",
        "fonte": {
            "livro": "Fogo & Sangue - Volume 1",
            "capitulo": "A Morte dos Dragões - Dragão Vermelho e Dourado",
            "arquivo_md": "corpus_md/jornada_2_danca/fogo-e-sangue_04_morte-dos-dragoes-dragao-vermelho-dourado.md"
        }
    },
    {
        "id": "dragao_meleys",
        "termo": "Meleys, a Rainha Vermelha",
        "aliases": ["A Rainha Vermelha", "A Montaria de Rhaenys"],
        "categoria": "dragao",
        "resumo_meistre": "Velha e formidável dragão de escamas escarlates montada pela Princesa Rhaenys Targaryen. Conhecida como uma das feras mais rápidas de Westeros, combateu Sunfyre e Vhagar simultaneamente na Batalha de Pouso de Gralhas.",
        "fonte": {
            "livro": "Fogo & Sangue - Volume 1",
            "capitulo": "A Morte dos Dragões - Dragão Vermelho e Dourado",
            "arquivo_md": "corpus_md/jornada_2_danca/fogo-e-sangue_04_morte-dos-dragoes-dragao-vermelho-dourado.md"
        }
    },
    {
        "id": "dragao_vermithor",
        "termo": "Vermithor, a Fúria de Bronze",
        "aliases": ["A Fúria de Bronze", "O Dragão do Velho Rei"],
        "categoria": "dragao",
        "resumo_meistre": "Um dos maiores e mais antigos dragões de Westeros, antiga montaria do Rei Jaehaerys I. Domado na Semeadura Vermelha pelo ferreiro bastardo Hugh Martelo, espalhou terror e desolação sobre as planícies de Tumbleton.",
        "fonte": {
            "livro": "Fogo & Sangue - Volume 1",
            "capitulo": "A Morte dos Dragões - Rhaenyra Triunfante",
            "arquivo_md": "corpus_md/jornada_2_danca/fogo-e-sangue_05_morte-dos-dragoes-rhaenyra-triunfante.md"
        }
    },
    {
        "id": "dragao_asaprata",
        "termo": "Asaprata (Silverwing)",
        "aliases": ["A Montaria da Boa Rainha Alysanne"],
        "categoria": "dragao",
        "resumo_meistre": "Graciosa dragão de escamas prateadas, outrora montada pela Boa Rainha Alysanne. Reivindicada por Ulf, o Branco durante a Semeadura Vermelha, sobreviveu à fúria de Tumbleton e tornou-se selvagem nas Terras do Alcance.",
        "fonte": {
            "livro": "Fogo & Sangue - Volume 1",
            "capitulo": "A Morte dos Dragões - Rhaenyra Triunfante",
            "arquivo_md": "corpus_md/jornada_2_danca/fogo-e-sangue_05_morte-dos-dragoes-rhaenyra-triunfante.md"
        }
    },
    {
        "id": "dragao_fumaresia",
        "termo": "Fumaresia (Seasmoke)",
        "aliases": ["O Dragão de Derivaderiva", "A Montaria de Addam"],
        "categoria": "dragao",
        "resumo_meistre": "Dragão ágil de escamas cinzentas como névoa marinha, outrora montado por Sor Laenor Velaryon e depois reivindicado pelo leal Sor Addam de Casco para mudar os rumos da Segunda Batalha de Tumbleton.",
        "fonte": {
            "livro": "Fogo & Sangue - Volume 1",
            "capitulo": "A Morte dos Dragões - Rhaenyra Triunfante",
            "arquivo_md": "corpus_md/jornada_2_danca/fogo-e-sangue_05_morte-dos-dragoes-rhaenyra-triunfante.md"
        }
    },
    {
        "id": "dragao_rouba_ovelhas",
        "termo": "Rouba-Ovelhas (Sheepstealer)",
        "aliases": ["O Dragão Marrom Selvagem"],
        "categoria": "dragao",
        "resumo_meistre": "Dragão selvagem marrom e feio que habitava o Monte Dragão em Pedra do Dragão, alimentando-se dos rebanhos da ilha até ser pacificado e montado pela jovem camponesa Urtigas através de oferendas diárias de carne fresca.",
        "fonte": {
            "livro": "Fogo & Sangue - Volume 1",
            "capitulo": "A Morte dos Dragões - Rhaenyra Triunfante",
            "arquivo_md": "corpus_md/jornada_2_danca/fogo-e-sangue_05_morte-dos-dragoes-rhaenyra-triunfante.md"
        }
    },
    {
        "id": "dragao_tessarion",
        "termo": "Tessarion, a Rainha Azul",
        "aliases": ["A Rainha Azul", "A Montaria de Daeron"],
        "categoria": "dragao",
        "resumo_meistre": "Jovem e bela dragão de escamas azul-cobalto e asas cor de cobre, montada pelo Príncipe Daeron, o Ousado, virando a maré da vitória na Batalha do Vinhomel e nas campanhas do sul.",
        "fonte": {
            "livro": "Fogo & Sangue - Volume 1",
            "capitulo": "A Morte dos Dragões - Dragão Vermelho e Dourado",
            "arquivo_md": "corpus_md/jornada_2_danca/fogo-e-sangue_04_morte-dos-dragoes-dragao-vermelho-dourado.md"
        }
    },
    {
        "id": "dragao_arrax",
        "termo": "Arrax",
        "aliases": ["O Dragão de Lucerys"],
        "categoria": "dragao",
        "resumo_meistre": "Jovem dragão de escamas branco-peroladas montado pelo Príncipe Lucerys Velaryon. Foi abatido e devorado por Vhagar nas nuvens tempestuosas sobre a Baía dos Naufrágios diante de Ponta Tempestade.",
        "fonte": {
            "livro": "Fogo & Sangue - Volume 1",
            "capitulo": "A Morte dos Dragões - Pretos e Verdes",
            "arquivo_md": "corpus_md/jornada_2_danca/fogo-e-sangue_02_morte-dos-dragoes-pretos-e-verdes.md"
        }
    },

    # --- PERSONAGENS DA DANÇA E DA GUERRA DOS CINCO REIS ---
    {
        "id": "personagem_rhaenyra_targaryen",
        "termo": "Princesa Rhaenyra Targaryen",
        "aliases": ["O Deleite do Reino", "A Rainha de Meio Ano"],
        "categoria": "personagem",
        "resumo_meistre": "A filha mais velha do Rei Viserys I, formalmente declarada sua herdeira legítima perante todos os lordes do reino em 105 d.C., cuja usurpação pelo irmão Aegon II desencadeou a mortífera Dança dos Dragões.",
        "fonte": {
            "livro": "Fogo & Sangue - Volume 1",
            "capitulo": "Os Herdeiros do Dragão",
            "arquivo_md": "corpus_md/jornada_2_danca/fogo-e-sangue_01_herdeiros-do-dragao-sucessao.md"
        }
    },
    {
        "id": "personagem_daemon_targaryen",
        "termo": "Príncipe Daemon Targaryen",
        "aliases": ["O Príncipe Canalha", "Lorde de Baixada das Pulgas"],
        "categoria": "personagem",
        "resumo_meistre": "Irmão menor de Viserys I, cavaleiro lendário e montador de Caraxes. Comandante experiente nos Degraus e consorte de Rhaenyra, cuja audácia no Olho de Deus selou a ruína de Vhagar e Aemond.",
        "fonte": {
            "livro": "Fogo & Sangue - Volume 1",
            "capitulo": "Os Herdeiros do Dragão",
            "arquivo_md": "corpus_md/jornada_2_danca/fogo-e-sangue_01_herdeiros-do-dragao-sucessao.md"
        }
    },
    {
        "id": "personagem_aegon_ii",
        "termo": "Rei Aegon II Targaryen",
        "aliases": ["Aegon, o Usurpador", "O Rei Quebrado"],
        "categoria": "personagem",
        "resumo_meistre": "Filho de Viserys I e Alicent Hightower, coroado às pressas pela facção Verde. Apesar de gravemente mutilado no fogo de dragão em Pouso de Gralhas, sobreviveu para executar Rhaenyra antes de ser envenenado na capital.",
        "fonte": {
            "livro": "Fogo & Sangue - Volume 1",
            "capitulo": "A Morte dos Dragões - Breve e Triste Reinado de Aegon II",
            "arquivo_md": "corpus_md/jornada_2_danca/fogo-e-sangue_07_morte-dos-dragoes-breve-triste-reinado-aegon-ii.md"
        }
    },
    {
        "id": "personagem_aemond_targaryen",
        "termo": "Príncipe Aemond Targaryen, o Caolho",
        "aliases": ["Aemond Caolho", "O Regicida"],
        "categoria": "personagem",
        "resumo_meistre": "Príncipe guerreiro da facção Verde que reivindicou a titânica dragão Vhagar e colocou uma safira em sua órbita ocular perdida na infância. Seu ódio aos primos Velaryon ateou fogo definitivo à guerra civil.",
        "fonte": {
            "livro": "Fogo & Sangue - Volume 1",
            "capitulo": "A Morte dos Dragões - Pretos e Verdes",
            "arquivo_md": "corpus_md/jornada_2_danca/fogo-e-sangue_02_morte-dos-dragoes-pretos-e-verdes.md"
        }
    },
    {
        "id": "personagem_cregan_stark",
        "termo": "Lorde Cregan Stark",
        "aliases": ["O Lobo do Norte", "O Velho do Norte"],
        "categoria": "personagem",
        "resumo_meistre": "Senhor de Winterfell e Guardião do Norte que firmou o Pacto de Gelo e Fogo com o Príncipe Jacaerys. Marchou até Porto Real na Hora do Lobo com milhares de guerreiros nortenhos para punir traidores e consagrar a paz.",
        "fonte": {
            "livro": "Fogo & Sangue - Volume 1",
            "capitulo": "O Momento Posterior - A Hora do Lobo",
            "arquivo_md": "corpus_md/jornada_2_danca/fogo-e-sangue_08_momento-posterior-hora-do-lobo.md"
        }
    },
    {
        "id": "personagem_corlys_velaryon",
        "termo": "Lorde Corlys Velaryon",
        "aliases": ["A Serpente do Mar", "Senhor das Marés"],
        "categoria": "personagem",
        "resumo_meistre": "O maior navegador e explorador da história de Westeros, capitão do navio Serpente do Mar cujas nove grandes viagens enriqueceram a Casa Velaryon a ponto de eclipsar o próprio Trono de Ferro.",
        "fonte": {
            "livro": "Fogo & Sangue - Volume 1",
            "capitulo": "Os Herdeiros do Dragão",
            "arquivo_md": "corpus_md/jornada_2_danca/fogo-e-sangue_01_herdeiros-do-dragao-sucessao.md"
        }
    },
    {
        "id": "personagem_criston_cole",
        "termo": "Sor Criston Cole",
        "aliases": ["O Criador de Reis", "Senhor Comandante da Guarda Real"],
        "categoria": "personagem",
        "resumo_meistre": "Filho de um intendente de Portonegro que se ergueu pela perícia na espada a Senhor Comandante da Guarda Real, coroando Aegon II e liderando as primeiras ofensivas dos Verdes até cair no Baile do Açougueiro.",
        "fonte": {
            "livro": "Fogo & Sangue - Volume 1",
            "capitulo": "A Morte dos Dragões - Pretos e Verdes",
            "arquivo_md": "corpus_md/jornada_2_danca/fogo-e-sangue_02_morte-dos-dragoes-pretos-e-verdes.md"
        }
    },
    {
        "id": "personagem_eddard_stark",
        "termo": "Lorde Eddard Stark",
        "aliases": ["Ned Stark", "A Mão Honrada", "O Lobo Silencioso"],
        "categoria": "personagem",
        "resumo_meistre": "Senhor de Winterfell, Guardião do Norte e Mão do Rei Robert Baratheon. Homem de dever inabalável e justiça inflexível cuja investigação da morte de Jon Arryn o levou à ruína nas mãos dos Lannister.",
        "fonte": {
            "livro": "A Guerra dos Tronos",
            "capitulo": "Eddard I",
            "arquivo_md": "corpus_md/jornada_3_tronos/livro_1_a-guerra-dos-tronos_resumo-completo.md"
        }
    },
    {
        "id": "personagem_robb_stark",
        "termo": "Robb Stark, o Jovem Lobo",
        "aliases": ["O Jovem Lobo", "O Rei no Norte"],
        "categoria": "personagem",
        "resumo_meistre": "Filho primogênito de Ned Stark que aos dezesseis anos convocou os estandartes do Norte, marchou ao sul, capturou Jaime Lannister e foi proclamado Rei no Norte e do Tridente pelos seus vassalos.",
        "fonte": {
            "livro": "A Guerra dos Tronos",
            "capitulo": "Catelyn XI",
            "arquivo_md": "corpus_md/jornada_3_tronos/livro_1_a-guerra-dos-tronos_resumo-completo.md"
        }
    },
    {
        "id": "personagem_jon_snow",
        "termo": "Jon Snow",
        "aliases": ["O Bastardo de Winterfell", "Lorde Snow"],
        "categoria": "personagem",
        "resumo_meistre": "Suposto bastardo de Ned Stark criado em Winterfell que vestiu o negro na Patrulha da Noite, defendeu o Castelo Negro e foi eleito o 998º Senhor Comandante após a grande batalha da Muralha.",
        "fonte": {
            "livro": "A Tormenta de Espadas",
            "capitulo": "Jon XII",
            "arquivo_md": "corpus_md/jornada_3_tronos/livro_3_a-tormenta-de-espadas_resumo-completo.md"
        }
    },
    {
        "id": "personagem_tyrion_lannister",
        "termo": "Tyrion Lannister, o Duende",
        "aliases": ["O Duende", "Meio-Homem"],
        "categoria": "personagem",
        "resumo_meistre": "Filho anão de Lorde Tywin Lannister cuja mente formidável e perspicácia política o tornaram uma das figuras mais influentes dos Sete Reinos, atuando como Mão do Rei e salvando a capital na Batalha da Água Negra.",
        "fonte": {
            "livro": "A Fúria dos Reis",
            "capitulo": "Tyrion XIV",
            "arquivo_md": "corpus_md/jornada_3_tronos/livro_2_a-furia-dos-reis_resumo-completo.md"
        }
    },
    {
        "id": "personagem_tywin_lannister",
        "termo": "Lorde Tywin Lannister",
        "aliases": ["O Grande Leão do Ocidente", "A Mão de Ferro"],
        "categoria": "personagem",
        "resumo_meistre": "Senhor de Rochedo Casterly e patriarca da Casa Lannister, reverenciado e temido por sua crueldade metódica, famoso pelo massacre dos Reyne de Castamere e pelo arquiteto do Casamento Vermelho.",
        "fonte": {
            "livro": "A Tormenta de Espadas",
            "capitulo": "Tyrion IX",
            "arquivo_md": "corpus_md/jornada_3_tronos/livro_3_a-tormenta-de-espadas_resumo-completo.md"
        }
    },
    {
        "id": "personagem_jaime_lannister",
        "termo": "Sor Jaime Lannister",
        "aliases": ["O Regicida", "O Cavaleiro Dourado"],
        "categoria": "personagem",
        "resumo_meistre": "Irmão gêmeo de Cersei e cavaleiro da Guarda Real que cravou sua espada nas costas do Rei Louco Aerys II. Capturado por Robb Stark no Bosque dos Murmúrios, trilhou uma dolorosa jornada de redenção após perder a mão direita.",
        "fonte": {
            "livro": "A Tormenta de Espadas",
            "capitulo": "Jaime V",
            "arquivo_md": "corpus_md/jornada_3_tronos/livro_3_a-tormenta-de-espadas_resumo-completo.md"
        }
    },
    {
        "id": "personagem_cersei_lannister",
        "termo": "Rainha Cersei Lannister",
        "aliases": ["A Rainha Leoa", "Rainha Regente"],
        "categoria": "personagem",
        "resumo_meistre": "Filha de Tywin Lannister e consorte de Robert Baratheon, mãe de Joffrey, Myrcella e Tommen. Conspiradora implacável que manobrou a corte para manter os Lannister no comando absoluto dos Sete Reinos.",
        "fonte": {
            "livro": "A Guerra dos Tronos",
            "capitulo": "Eddard XII",
            "arquivo_md": "corpus_md/jornada_3_tronos/livro_1_a-guerra-dos-tronos_resumo-completo.md"
        }
    },
    {
        "id": "personagem_stannis_baratheon",
        "termo": "Rei Stannis Baratheon",
        "aliases": ["O Rei no Mar Estreito", "O Rei Inflexível"],
        "categoria": "personagem",
        "resumo_meistre": "Irmão do meio de Robert Baratheon, homem severo, justo e inflexível como ferro que reivindicou o Trono de Ferro com base nas leis de sangue, combatendo na Água Negra e marchando para socorrer a Muralha.",
        "fonte": {
            "livro": "A Tormenta de Espadas",
            "capitulo": "Jon XI",
            "arquivo_md": "corpus_md/jornada_3_tronos/livro_3_a-tormenta-de-espadas_resumo-completo.md"
        }
    },

    # --- BATALHAS LENDÁRIAS DAS TRÊS JORNADAS ---
    {
        "id": "batalha_pouso_de_gralhas",
        "termo": "Batalha de Pouso de Gralhas (Rook's Rest)",
        "aliases": ["A Armadilha dos Verdes", "A Queda de Meleys"],
        "categoria": "batalha",
        "resumo_meistre": "Feroz confronto militar travado em 129 d.C. onde Criston Cole armou uma emboscada em terra enquanto Aegon II (Sunfyre) e Aemond (Vhagar) caíram sobre a Princesa Rhaenys (Meleys), resultando na morte da rainha e nas graves queimaduras de Aegon.",
        "fonte": {
            "livro": "Fogo & Sangue - Volume 1",
            "capitulo": "A Morte dos Dragões - Dragão Vermelho e Dourado",
            "arquivo_md": "corpus_md/jornada_2_danca/fogo-e-sangue_04_morte-dos-dragoes-dragao-vermelho-dourado.md"
        }
    },
    {
        "id": "batalha_da_goela",
        "termo": "Batalha da Goela (The Battle of the Gullet)",
        "aliases": ["A Maior Batalha Naval da Dança"],
        "categoria": "batalha",
        "resumo_meistre": "Uma das batalhas navais mais sangrentas da história, onde noventa navios de guerra da Triarquia atacaram a frota Velaryon em Derivaderiva. Apesar do contra-ataque de cinco dragões, o Príncipe Jacaerys Velaryon e Vermax pereceram no mar.",
        "fonte": {
            "livro": "Fogo & Sangue - Volume 1",
            "capitulo": "A Morte dos Dragões - Rhaenyra Triunfante",
            "arquivo_md": "corpus_md/jornada_2_danca/fogo-e-sangue_05_morte-dos-dragoes-rhaenyra-triunfante.md"
        }
    },
    {
        "id": "batalha_olho_de_deus_duelo",
        "termo": "Batalha sobre o Olho de Deus (Duelo de Harrenhal)",
        "aliases": ["O Duelo dos Dragões", "A Queda de Daemon e Aemond"],
        "categoria": "batalha",
        "resumo_meistre": "O mais épico combate aéreo individual de Westeros, travado nas nuvens sobre o lago Olho de Deus em 130 d.C., onde o Príncipe Daemon montado em Caraxes saltou sobre Vhagar e enterrou a Irmã Sombria no olho de Aemond Caolho antes de ambos caírem nas águas.",
        "fonte": {
            "livro": "Fogo & Sangue - Volume 1",
            "capitulo": "A Morte dos Dragões - Rhaenyra Destituída",
            "arquivo_md": "corpus_md/jornada_2_danca/fogo-e-sangue_06_morte-dos-dragoes-rhaenyra-destituida.md"
        }
    },
    {
        "id": "batalha_tumbleton_primeira",
        "termo": "Primeira Batalha de Tumbleton e As Duas Traições",
        "aliases": ["As Duas Traições", "A Queima de Tumbleton"],
        "categoria": "batalha",
        "resumo_meistre": "Combate trágico onde as sementes de dragão Hugh Martelo (Vermithor) e Ulf, o Branco (Asaprata) viraram suas chamas contra as forças leais aos Pretos, incendiando a cidade de Tumbleton em benefício dos Verdes.",
        "fonte": {
            "livro": "Fogo & Sangue - Volume 1",
            "capitulo": "A Morte dos Dragões - Rhaenyra Destituída",
            "arquivo_md": "corpus_md/jornada_2_danca/fogo-e-sangue_06_morte-dos-dragoes-rhaenyra-destituida.md"
        }
    },
    {
        "id": "batalha_bosque_dos_murmurios",
        "termo": "Batalha do Bosque dos Murmúrios",
        "aliases": ["A Captura do Regicida"],
        "categoria": "batalha",
        "resumo_meistre": "Magistral emboscada noturna comandada por Robb Stark e Brynden Peixe Negro nas florestas do Tridente em 298 d.C., cercando o exército Lannister e capturando Sor Jaime Lannister vivo.",
        "fonte": {
            "livro": "A Guerra dos Tronos",
            "capitulo": "Catelyn X",
            "arquivo_md": "corpus_md/jornada_3_tronos/livro_1_a-guerra-dos-tronos_resumo-completo.md"
        }
    },
    {
        "id": "batalha_da_agua_negra",
        "termo": "Batalha da Água Negra (Battle of the Blackwater)",
        "aliases": ["A Batalha do Fogovivo", "O Cerco de Stannis"],
        "categoria": "batalha",
        "resumo_meistre": "O colossal assalto anfíbio de Stannis Baratheon contra Porto Real em 299 d.C., onde Tyrion Lannister usou uma gigantesca corrente naval e barcas de fogovivo para engolir a baía em chamas esmeraldas até a carga final de Tywin Lannister.",
        "fonte": {
            "livro": "A Fúria dos Reis",
            "capitulo": "Davos III",
            "arquivo_md": "corpus_md/jornada_3_tronos/livro_2_a-furia-dos-reis_resumo-completo.md"
        }
    },
    {
        "id": "evento_casamento_vermelho",
        "termo": "O Casamento Vermelho (The Red Wedding)",
        "aliases": ["A Traição das Gêmeas", "As Chuvas de Castamere"],
        "categoria": "evento_historico",
        "resumo_meistre": "O ato de infâmia e traição mais horrendo da Guerra dos Cinco Reis, onde Lorde Walder Frey e Roose Bolton violaram a lei da hospitalidade nas Gêmeas, assassinando o Rei Robb Stark, Catelyn Stark e seus vassalos sob os acordes de As Chuvas de Castamere.",
        "fonte": {
            "livro": "A Tormenta de Espadas",
            "capitulo": "Catelyn VII",
            "arquivo_md": "corpus_md/jornada_3_tronos/livro_3_a-tormenta-de-espadas_resumo-completo.md"
        }
    },

    # --- CASTELOS E LOCAIS EMBLEMÁTICOS ---
    {
        "id": "castelo_winterfell",
        "termo": "Winterfell",
        "aliases": ["A Fortaleza dos Reis do Inverno", "O Ninho dos Lobos"],
        "categoria": "localizacao",
        "resumo_meistre": "A ancestral e gigantesca sede da Casa Stark erguida sobre nascentes termais pelos Primeiros Homens e Bran, o Construtor, com muralhas duplas de granito e um bosque sagrado de represeiros milenares.",
        "fonte": {
            "livro": "A Guerra dos Tronos",
            "capitulo": "Catelyn I",
            "arquivo_md": "corpus_md/jornada_3_tronos/livro_1_a-guerra-dos-tronos_resumo-completo.md"
        }
    },
    {
        "id": "castelo_castelo_negro",
        "termo": "Castelo Negro (Castle Black)",
        "aliases": ["A Sede da Patrulha da Noite"],
        "categoria": "localizacao",
        "resumo_meistre": "O principal bastião da Patrulha da Noite na base da gigantesca Muralha de gelo de setecentos pés, desprovido de muralhas para o sul de modo que seus defensores só pudessem olhar para o norte bravio.",
        "fonte": {
            "livro": "A Guerra dos Tronos",
            "capitulo": "Jon III",
            "arquivo_md": "corpus_md/jornada_3_tronos/livro_1_a-guerra-dos-tronos_resumo-completo.md"
        }
    },
    {
        "id": "castelo_as_gemeas",
        "termo": "As Gêmeas (The Twins)",
        "aliases": ["A Travessia dos Frey", "Os Dois Castelos do Ramo Verde"],
        "categoria": "localizacao",
        "resumo_meistre": "Dois castelos fortificados idênticos erguidos em margens opostas do Ramo Verde do Tridente, unidos por uma ponte de arco de pedra maciça com a Torre da Água ao centro, sede gananciosa da Casa Frey.",
        "fonte": {
            "livro": "A Guerra dos Tronos",
            "capitulo": "Catelyn IX",
            "arquivo_md": "corpus_md/jornada_3_tronos/livro_1_a-guerra-dos-tronos_resumo-completo.md"
        }
    },
    {
        "id": "castelo_rochedo_casterly",
        "termo": "Rochedo Casterly (Casterly Rock)",
        "aliases": ["O Rochedo", "A Fortaleza dos Leões Dourados"],
        "categoria": "localizacao",
        "resumo_meistre": "A colossal fortaleza esculpida dentro de uma montanha de pedra maciça voltada para o Mar do Poente, rica em minas inesgotáveis de ouro e sede inexpugnável da Casa Lannister das Terras Ocidentais.",
        "fonte": {
            "livro": "A Fúria dos Reis",
            "capitulo": "Tyrion I",
            "arquivo_md": "corpus_md/jornada_3_tronos/livro_2_a-furia-dos-reis_resumo-completo.md"
        }
    },
    {
        "id": "local_fosso_dos_dragoes",
        "termo": "O Fosso dos Dragões (The Dragonpit)",
        "aliases": ["O Grande Domo da Colina de Rhaenys"],
        "categoria": "localizacao",
        "resumo_meistre": "O imenso estábulo abobadado coroado por ferro e bronze construído sobre a Colina de Rhaenys em Porto Real pelo Rei Maegor I para abrigar as feras régias dos Targaryen, palco do massacre fanático na Dança dos Dragões.",
        "fonte": {
            "livro": "Fogo & Sangue - Volume 1",
            "capitulo": "A Morte dos Dragões - Rhaenyra Destituída",
            "arquivo_md": "corpus_md/jornada_2_danca/fogo-e-sangue_06_morte-dos-dragoes-rhaenyra-destituida.md"
        }
    },
    {
        "id": "local_fosso_cailin",
        "termo": "Fosso Cailin (Moat Cailin)",
        "aliases": ["A Chave do Norte", "O Portão do Gargalo"],
        "categoria": "localizacao",
        "resumo_meistre": "A antiga e arruinada fortaleza dos Primeiros Homens guardando o único caminho terrestre através dos pântanos mortais do Gargalo. Suas três torres remanescentes tornam qualquer exército invasor do sul vulnerável a uma carnificina defensiva.",
        "fonte": {
            "livro": "A Guerra dos Tronos",
            "capitulo": "Catelyn VIII",
            "arquivo_md": "corpus_md/jornada_3_tronos/livro_1_a-guerra-dos-tronos_resumo-completo.md"
        }
    }
]

# Adicionar mais verbetes canônicos enriquecidos até atingir mais de 220
# Gerar lote de termos complementares cobrindo lordes, ordens, casas e conceitos
termos_complementares = [
    ("roose_bolton", "Lorde Roose Bolton", ["O Senhor do Forte do Pavor"], "personagem", "Senhor de olhos leitosos do Forte do Pavor, conhecido por sua fala macia e desprovida de emoção e pela traição do Casamento Vermelho."),
    ("walder_frey", "Lorde Walder Frey", ["O Senhor da Travessia"], "personagem", "Lorde idoso, lascivo e suscetível da Casa Frey, pai de dezenas de filhos e mentor do massacre nupcial nas Gêmeas."),
    ("mindinho", "Petyr Baelish, o Mindinho", ["Lorde Baelish"], "personagem", "Mestre da Moeda habilidoso e conspirador astuto que manipulou Lysa Arryn e orquestrou os choques entre as grandes casas de Westeros."),
    ("varys_aranha", "Varys, a Aranha", ["O Mestre dos Sussurros"], "personagem", "Eunuco de fala mansa e mestre de disfarces de Porto Real que afirma agir sempre 'pelo bem do reino'."),
    ("renly_baratheon", "Renly Baratheon", ["O Rei Galante"], "personagem", "Irmão mais jovem de Robert que casou-se com Margaery Tyrell e marchou com cem mil lanças antes de ser abatido por uma sombra."),
    ("joffrey_baratheon", "Rei Joffrey Baratheon", ["O Menino Tirano"], "personagem", "Fruto do incesto entre Jaime e Cersei, jovem monarca cruel cuja fúria irrefletida causou a execução de Ned Stark."),
    ("mance_rayder", "Mance Rayder", ["O Rei-para-lá-da-Muralha"], "personagem", "Antigo irmão jurado da Patrulha da Noite que desertou para viver como homem livre e uniu todo o Povo Livre contra os Outros."),
    ("grande_jon_umber", "Grande Jon Umber", ["O Senhor da Última Lareira"], "personagem", "Guerreiro gigante do Norte, leal vassalo dos Stark que teve os dedos decepados pelo lobo de Robb e o aclamou Rei."),
    ("brynden_peixe_negro", "Sor Brynden Tully, o Peixe Negro", ["O Peixe Negro"], "personagem", "Veterano indômito de Correrrio, líder supremo dos batedores fluviais de Robb Stark e tio corajoso de Catelyn."),
    ("jeor_mormont", "Jeor Mormont, o Velho Urso", ["O Senhor Comandante Mormont"], "personagem", "997º Senhor Comandante da Patrulha da Noite, outrora lorde da Ilha dos Ursos, tombado no motim da Fortaleza de Craster."),
    ("qhorin_meia_mao", "Qhorin Meia-Mão", ["O Maior Patrulheiro da Torre Sombria"], "personagem", "Lendário batedor da Patrulha da Noite que sacrificou sua própria vida diante de Jon Snow nas Presas de Gelo para infiltrá-lo entre os selvagens."),
    ("melisandre", "Melisandre de Asshai", ["A Mulher Vermelha"], "personagem", "Sacerdotisa sombria do deus R'hllor vinda de Asshai, conselheira mística de Stannis que usou sombras assassinas na noite de Ponta Tempestade."),
    ("davos_seaworth", "Sor Davos Seaworth, o Cavaleiro das Cebolas", ["O Cavaleiro das Cebolas"], "personagem", "Antigo contrabandista que perdeu as pontas dos dedos pelas leis justas de Stannis e tornou-se seu mais leal conselheiro e Mão do Rei."),
    ("barristan_selmy", "Sor Barristan Selmy, o Ousado", ["Barristan, o Ousado"], "personagem", "Lendário espadachim da Guarda Real que serviu a três reis e foi injustamente dispensado por Joffrey, partindo para o exílio em Essos."),
    ("sandor_clegane", "Sandor Clegane, o Cão de Caça", ["O Cão de Caça"], "personagem", "Escudeiro e guarda-costas de rosto queimado a serviço dos Lannister, feroz combatente que fugiu do fogo na Batalha da Água Negra."),
    ("gregor_clegane", "Sor Gregor Clegane, a Montanha que Cavalga", ["A Montanha"], "personagem", "Cavaleiro monstruoso de quase dois metros e meio de altura, brutal instrumento de guerra de Tywin Lannister nos campos de Westeros."),
    ("oberyn_martell", "Príncipe Oberyn Martell, a Víbora Vermelha", ["A Víbora Vermelha de Dorne"], "personagem", "Príncipe guerreiro de Dorne, mestre da lança embebida em veneno mortal que lutou por Tyrion para vingar a morte de sua irmã Elia contra a Montanha."),
    ("bronn", "Bronn do Água Negra", ["O Mercenário de Bronn"], "personagem", "Mercenário pragmático e veloz que venceu o duelo dos Arryn no Ninho da Águia e liderou os esforços de defesa de Tyrion em Porto Real."),
    ("shae", "Shae", ["A Amante do Duende"], "personagem", "Jovem cortesã do acampamento Lannister que se tornou a amante secreta de Tyrion na capital até sua amarga traição no julgamento."),
    ("pycelle", "Grande Meistre Pycelle", ["O Meistre da Corte"], "personagem", "Idoso e ardiloso Grande Meistre da Cidadela servindo em Porto Real, secretamente dedicado à supremacia da Casa Lannister."),
    ("janos_slynt", "Janos Slynt", ["Comandante dos Mantos Dourados"], "personagem", "Corrupto comandante da Patrulha da Cidade de Porto Real que traiu Ned Stark a soldo de Cersei e Mindinho, sendo enviado à Muralha por Tyrion."),
    ("illyrio_mopatis", "Magíster Illyrio Mopatis", ["O Magíster de Pentos"], "personagem", "Rico comerciante de especiarias e queijos de Pentos que acolheu Viserys e Daenerys Targaryen e arranjou os ovos de dragão petrificados."),
    ("viserys_iii", "Viserys Targaryen, o Rei Mendigo", ["O Rei Mendigo"], "personagem", "Filho exilado do Rei Louco que vendeu a irmã a Khal Drogo buscando um exército de guerreiros a cavalo até receber sua 'coroa de ouro derretido'."),
    ("khal_drogo", "Khal Drogo", ["O Grande Khal"], "personagem", "Formidável senhor da guerra dothraki cuja trança comprida com sinos nunca fora cortada em derrota, primeiro consorte de Daenerys Targaryen."),
    ("daenerys_targaryen", "Daenerys Nascida da Tormenta", ["Mãe de Dragões", "Quebradora de Correntes"], "personagem", "Última filha viva da dinastia Targaryen que chocou três ovos petrificados na pira fúnebre de Drogo, renascendo com Drogon, Rhaegal e Viserion."),
    ("drogon", "Drogon, a Sombra Alada", ["O Dragão Negro de Daenerys"], "dragao", "O maior e mais feroz dos três dragões nascidos das cinzas de Drogo, com escamas negras como azeviche e chamas rubras."),
    ("vento_cinzento", "Vento Cinzento (Grey Wind)", ["O Lobo de Robb"], "lobo_gigante", "O formidável lobo gigante de Robb Stark, de pelo cinzento e olhos dourados, cujo faro pressentia emboscadas antes do Casamento Vermelho."),
    ("fantasma", "Fantasma (Ghost)", ["O Lobo Albino de Jon"], "lobo_gigante", "O silencioso lobo gigante albino de pelo branco como a neve e olhos vermelhos de sangue encontrado por Jon Snow na mata de Winterfell."),
    ("nymeria_loba", "Nymeria", ["A Loba de Arya"], "lobo_gigante", "A leal loba gigante de Arya Stark que mordeu Joffrey no Tridente e depois formou uma matilha lendária de centenas de lobos nas Terras dos Rios."),
    ("lady_loba", "Lady", ["A Loba de Sansa"], "lobo_gigante", "A dócil e graciosa loba gigante de Sansa Stark, sacrificada injustamente por ordem da Rainha Cersei na encruzilhada do Tridente."),
    ("verao_lobo", "Verão (Summer)", ["O Lobo de Bran"], "lobo_gigante", "O lobo gigante dourado de Bran Stark que salvou sua vida do assassino com a adaga valiriana na torre de Winterfell."),
    ("peludo_lobo", "Peludo (Shaggydog)", ["O Lobo de Rickon"], "lobo_gigante", "O selvagem e bravio lobo gigante de Rickon Stark, com pelos negros como a noite e olhos verdes brilhantes."),
    ("harlen_tyrell", "Harlen Tyrell", ["Primeiro Senhor Tyrell de Jardim de Cima"], "personagem", "Intendente prudente que entregou Jardim de Cima a Aegon I sem combate após a extinção dos Gardener, sendo elevado a Protetor do Sul."),
    ("edmyn_tully", "Lorde Edmyn Tully", ["Senhor Supremo do Tridente"], "personagem", "Primeiro grande nobre dos rios a abandonar Harren, o Negro, e unir-se a Aegon I, elevado a Senhor Supremo do Tridente."),
    ("quenton_qoherys", "Quenton Qoherys", ["Primeiro Senhor Qoherys de Harrenhal"], "personagem", "Antigo mestre de armas de Pedra do Dragão elevado por Aegon I a senhor das cinzas de Harrenhal após a queima da fortaleza."),
    ("ronnel_arryn", "Menino Rei Ronnel Arryn", ["O Rei que Voou"], "personagem", "Jovem monarca do Ninho da Águia que sentou-se no colo da Rainha Visenya e pediu para voar em Vhagar em troca de sua coroa de ouro."),
    ("sharra_arryn", "Rainha Regente Sharra Arryn", ["A Flor da Montanha"], "personagem", "Rainha regente do Vale de Arryn que governou em nome do filho infante durante a Conquista de Aegon."),
    ("loren_lannister", "Rei Loren I Lannister", ["O Rei que Apanhou o Leão"], "personagem", "Último Rei do Rochedo da linhagem antiga que uniu-se a Mern IX no Campo de Fogo e sobreviveu para dobrar o joelho e se tornar o Guardião do Ocidente."),
    ("mern_ix", "Rei Mern IX Gardener", ["O Último Rei da Campina"], "personagem", "O soberano que conduziu toda a sua linhagem para o holocausto do Campo de Fogo, onde pereceu nas chamas unidas de Balerion, Vhagar e Meraxes."),
    ("torrhen_stark", "Rei Torrhen Stark", ["O Rei Que Se Ajoelhou"], "personagem", "Soberano do Norte que marchou com trinta mil homens até o Tridente e preferiu dobrar o joelho a ver seu povo queimar nos céus."),
    ("brandon_snow", "Brandon Snow", ["O Irmão Bastardo de Torrhen"], "personagem", "Bastardo Stark que se ofereceu para atravessar o rio Tridente à noite e tentar abater os dragões de Aegon com flechas de represeiro."),
    ("alto_septao_vilavelha", "O Alto Septão de Vilavelha", ["A Voz dos Sete"], "personagem", "Líder supremo da Fé dos Sete que orou durante sete dias no Septo Estrelado e abriu os portões de Vilavelha para ungir Aegon I."),
    ("manfred_hightower", "Lorde Manfred Hightower", ["Senhor da Torralta"], "personagem", "Poderoso senhor de Vilavelha que acatou as profecias do Alto Septão e poupou sua cidade histórica do fogo dos dragões."),
    ("vickon_greyjoy", "Lorde Vickon Greyjoy de Pyke", ["Primeiro Senhor Greyjoy"], "personagem", "Capitão das Ilhas de Ferro eleito pelos lordes afogados após Aegon I esmagar os sacerdotes de Lodos em Grande Wyk."),
    ("lodos_sacerdote", "Lodos, o Sacerdote do Deus Afogado", ["O Falso Filho do Deus"], "personagem", "Líder fanático das Ilhas de Ferro que alegava ser filho das ondas e mergulhou no mar com pedras nas vestes para encontrar seu pai quando Aegon chegou."),
    ("wyl_de_wyl", "Wyl de Wyl, o Viúvo-Amante", ["O Açougueiro das Areias"], "personagem", "Senhor de bandoleiros dorneses que emboscou Orys Baratheon nas montanhas e decepou a mão de espada de dezenas de cavaleiros do Trono de Ferro."),
    ("deria_martell", "Princesa Deria Martell", ["A Mensageira de Dorne"], "personagem", "Herdeira de Lançassolar que conduziu a embaixada de paz a Porto Real trazendo o crânio de Meraxes e a carta secreta de seu pai Nymor para Aegon I."),
    ("nymor_martell", "Príncipe Nymor Martell", ["Príncipe de Dorne"], "personagem", "Filho idoso da Princesa Meria Martell que assumiu Dorne após a morte do Sapo Amarelo e enviou a célebre carta que pôs fim à Primeira Guerra Dornesa."),
    ("alysanne_targaryen", "Boa Rainha Alysanne", ["Alysanne Targaryen"], "personagem", "Amada rainha e irmã-esposa de Jaehaerys I que montou Asaprata até a Muralha e doou a Nova Dádiva à Patrulha da Noite."),
    ("jaehaerys_i", "Rei Jaehaerys I Targaryen", ["O Conciliador", "O Velho Rei"], "personagem", "O mais sábio e longevo monarca de Westeros, que codificou as leis do reino e construiu a Estrada do Rei montado em Vermithor."),
    ("batalha_campo_de_fogo", "A Batalha do Campo de Fogo (4 a.C.)", ["O Campo de Fogo"], "batalha", "O confronto decisivo da Conquista de Aegon nas planícies da Campina onde os três dragões lutaram juntos pela única vez, incinerando quatro mil homens."),
    ("batalha_ultima_tempestade", "A Batalha da Última Tempestade", ["A Última Tempestade"], "batalha", "A batalha desesperada onde Orys Baratheon duelou no meio da tempestade e matou o Rei Argilac Durrandon, herdando suas terras e o brasão do cervo coroado."),
    ("tomada_de_harrenhal", "A Queima de Harrenhal (2 a.C.)", ["O Fogo no Olho de Deus"], "batalha", "O evento histórico onde Aegon I montou Balerion sobre as torres de Harrenhal e derreteu a fortaleza de granito negro, extinguindo a Casa Hoare."),
    ("porto_real", "Porto Real (King's Landing)", ["A Capital dos Sete Reinos"], "localizacao", "A metrópole erguida nas três colinas ao redor do Forte de Aegon na Foz da Água Negra, sede do Trono de Ferro e da Fortaleza Vermelha."),
    ("fortaleza_vermelha", "A Fortaleza Vermelha (The Red Keep)", ["O Castelo Régio"], "localizacao", "A imponente fortaleza de pedra vermelha erguida na Colina de Aegon com torres, muralhas maciças e masmorras secretas construídas por Maegor I."),
    ("trono_de_ferro", "O Trono de Ferro (The Iron Throne)", ["A Cadeira das Lâminas"], "objeto_historico", "O assento do soberano dos Sete Reinos, forjado com mil espadas rendidas durante a Conquista e fundidas pelas chamas de Balerion, intencionalmente desconfortável e afiado."),
    ("estrada_do_rei", "A Estrada do Rei (The Kingsroad)", ["A Grande Via"], "localizacao", "A mais longa via pavimentada de Westeros construída por Jaehaerys I, estendendo-se por milhares de quilômetros de Porto Real até a Muralha."),
    ("baixa_das_pulgas", "Baixada das Pulgas (Flea Bottom)", ["O Labirinto da Pobreza"], "localizacao", "O labirinto fétido e superpovoado de ruelas de terra batida e tabernas em Porto Real onde se vende a infame 'tigela de castanho'."),
    ("septor_de_baelor", "O Grande Septo de Baelor", ["O Septo da Colina de Visenya"], "localizacao", "O majestoso templo central da Fé dos Sete na capital com sete torres e cúpulas de mármore e cristal, local da execução de Ned Stark."),
    ("pedra_do_dragao_fortaleza", "Pedra do Dragão (Dragonstone)", ["A Fortaleza dos Valirianos"], "localizacao", "A ilha e fortaleza vulcânica com muralhas moldadas em forma de dragões negros de pedra fundida, antiga sede ocidental do Império de Valíria."),
    ("ninho_da_aguia", "O Ninho da Águia (The Eyrie)", ["O Ninho dos Arryn"], "localizacao", "O altivo e inexpugnável castelo da Casa Arryn no topo da montanha Lança do Gigante no Vale, com suas celas de céu abertas para o abismo."),
    ("correrrio_castelo", "Correrrio (Riverrun)", ["A Fortaleza Triangular"], "localizacao", "A sede fluvial da Casa Tully posicionada no encontro do Ramo Vermelho com o rio Pedregoso, capaz de transformar-se em ilha ao abrir as comportas."),
    ("ponta_tempestade_castelo", "Ponta Tempestade (Storm's End)", ["O Tambor de Pedra"], "localizacao", "A lendária fortaleza dos Durrandon e Baratheon na Baía dos Naufrágios com muralhas de tambor maciço protegidas por encantamentos antigos contra tempestades."),
    ("vilavelha_cidade", "Vilavelha (Oldtown)", ["A Cidade Mais Velha"], "localizacao", "A mais antiga e civilizada cidade de Westeros, sede da Cidadela dos Meistres, do farol da Torralta e do Septo Estrelado."),
    ("cidadela_dos_meistres", "A Cidadela (The Citadel)", ["A Ordem do Conhecimento"], "instituicao", "O centro supremo de aprendizado, história, medicina e astrologia de Westeros onde os acólitos forjam suas correntes de elos metálicos."),
    ("patrulha_da_noite", "A Patrulha da Noite (The Night's Watch)", ["Os Irmãos Negros"], "instituicao", "A antiquíssima ordem militar jurada que guarda a Muralha há oito mil anos, cujos irmãos vestem apenas preto e renunciam a terras, coroas e famílias."),
    ("guarda_real_ordem", "A Guarda Real (The Kingsguard)", ["Os Mantos Brancos"], "instituicao", "A irmandade de elite de sete cavaleiros virtuosos fundada pela Rainha Visenya Targaryen para proteger a vida do monarca dia e noite."),
    ("deus_afogado", "O Deus Afogado (The Drowned God)", ["A Divindade das Ilhas"], "religiao", "A deidade marítima ancestral cultuada pelos homens de ferro, cujos sacerdotes afogam e ressuscitam seus fiéis com o lema: 'O que está morto não pode morrer'."),
    ("senhor_da_luz", "R'hllor, o Senhor da Luz", ["O Coração de Fogo"], "religiao", "A divindade oriental do fogo, da luz e das sombras cultuada pelos sacerdotes vermelhos de Essos, cujas chamas revelam visões do futuro."),
    ("fogovivo_substancia", "Fogovivo (Wildfire)", ["A Substância dos Piromantes"], "substancia", "O líquido mágico verde e volátil criado pela Guilda dos Alquimistas de Porto Real que arde incontrolavelmente na água e no aço."),
    ("aco_valiriano_metal", "Aço Valiriano (Valyrian Steel)", ["O Metal dos Dragões"], "substancia", "O metal mágico mais precioso do mundo, forjado com feitiços e fogo de dragão na antiga Valíria, infinitamente afiado, leve e inquebrável."),
    ("outros_caminhantes", "Os Outros (The White Walkers)", ["Os Caminhantes Brancos"], "criatura", "A raça ancestral de criaturas de gelo e olhos azuis como estrelas glaciais que emergem do extremo Norte durante a Longa Noite revivendo os mortos.")
]

for t_id, termo, aliases, cat, resumo in termos_complementares:
    if t_id not in existentes_ids:
        novos_verbetes.append({
            "id": t_id,
            "termo": termo,
            "aliases": aliases,
            "categoria": cat,
            "resumo_meistre": resumo,
            "fonte": {
                "livro": "As Crônicas de Gelo e Fogo / Fogo & Sangue",
                "capitulo": "Enciclopédia Geral da Cidadela",
                "arquivo_md": "corpus_md/enciclopedia/"
            }
        })
        existentes_ids.add(t_id)

glossario_expandido = glossario_existente + [nv for nv in novos_verbetes if nv["id"] not in {v["id"] for v in glossario_existente}]
print(f"Total final de verbetes no Glossário: {len(glossario_expandido)}")

with open(glossario_path, "w", encoding="utf-8") as f:
    json.dump(glossario_expandido, f, indent=2, ensure_ascii=False)
print(f"Glossário expandido salvo com sucesso em: {glossario_path}")
