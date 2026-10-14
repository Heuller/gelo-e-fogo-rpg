import os
import sys
import re
import zipfile
import shutil
from pathlib import Path
from bs4 import BeautifulSoup
import markdownify

base_proj = Path(r"C:\Projetos\gelo-e-fogo-rpg")
origem_dir = base_proj / "origem"
scripts_dir = base_proj / "scripts"
corpus_j3_dir = base_proj / "corpus_md" / "jornada_3_tronos"
corpus_j3_dir.mkdir(parents=True, exist_ok=True)
scripts_dir.mkdir(parents=True, exist_ok=True)

# Copiar este script para scripts/convert_j3_books.py
self_path = Path(__file__)
dest_script = scripts_dir / "convert_j3_books.py"
shutil.copyfile(self_path, dest_script)
print(f"Copiado script para {dest_script}")

books = [
    {
        "file": "a-guerra-dos-tronos.epub",
        "title": "A Guerra dos Tronos",
        "slug": "livro_1_a-guerra-dos-tronos",
        "ano": "298 d.C."
    },
    {
        "file": "a-furia-dos-reis.epub",
        "title": "A Fúria dos Reis",
        "slug": "livro_2_a-furia-dos-reis",
        "ano": "299 d.C."
    },
    {
        "file": "a-tormenta-de-espadas.epub",
        "title": "A Tormenta de Espadas",
        "slug": "livro_3_a-tormenta-de-espadas",
        "ano": "299-300 d.C."
    }
]

pov_characters_target = {
    "EDDARD", "CATELYN", "JON", "TYRION", "ARYA", "DAVOS", "BRAN", "SANSA", "DAENERYS", "JAIME", "SAMWELL"
}

def clean_html(html_bytes):
    soup = BeautifulSoup(html_bytes, "html.parser")
    for s in soup(["script", "style"]):
        s.extract()
    
    # Extrair título ou POV
    pov = None
    paras = []
    for el in soup.find_all(['h1', 'h2', 'h3', 'p']):
        txt = el.get_text().strip()
        if not txt:
            continue
        if pov is None:
            cleaned_upper = txt.upper()
            for cand in pov_characters_target:
                if cand in cleaned_upper or cleaned_upper.startswith(cand):
                    pov = cand.title()
                    break
            if "PRÓLOGO" in cleaned_upper or "PROLOGO" in cleaned_upper:
                pov = "Prólogo"
            elif "EPÍLOGO" in cleaned_upper or "EPILOGO" in cleaned_upper:
                pov = "Epílogo"
        paras.append(txt)
        
    md = markdownify.markdownify(str(soup), heading_style="ATX", strip=['img'], bullets='-')
    md = re.sub(r'\n{3,}', '\n\n', md).strip()
    return pov, paras, md

for b_info in books:
    epub_path = origem_dir / b_info["file"]
    print(f"Processando {b_info['title']} ({epub_path})...")
    
    if not epub_path.exists():
        print(f"AVISO: {epub_path} não encontrado!")
        continue
        
    z = zipfile.ZipFile(epub_path)
    opf_files = [n for n in z.namelist() if n.endswith('.opf')]
    if not opf_files:
        continue
    opf_path = opf_files[0]
    opf_soup = BeautifulSoup(z.read(opf_path), 'xml')
    
    manifest = {item['id']: item['href'] for item in opf_soup.find_all('item')}
    spine_ids = [item['idref'] for item in opf_soup.find_all('itemref')]
    
    opf_dir = Path(opf_path).parent
    
    capitulos_processados = []
    
    for idx, idref in enumerate(spine_ids, 1):
        href = manifest.get(idref)
        if not href:
            continue
            
        full_href = (opf_dir / href).as_posix() if str(opf_dir) != "." else href
        if full_href not in z.namelist():
            matches = [n for n in z.namelist() if n.endswith(href) or href in n]
            if matches:
                full_href = matches[0]
            else:
                continue
                
        raw_bytes = z.read(full_href)
        pov, paras, md_text = clean_html(raw_bytes)
        
        if len(paras) < 3:
            continue
            
        char_title = pov if pov else f"Seção {idx}"
        capitulos_processados.append({
            "idx": len(capitulos_processados) + 1,
            "pov": char_title,
            "primeiro_paragrafo": paras[1] if len(paras) > 1 else paras[0],
            "total_palavras": sum(len(p.split()) for p in paras),
            "md": md_text,
            "file": href
        })
        
    print(f"  {len(capitulos_processados)} capítulos identificados em {b_info['title']}.")
    
    # 1. Gerar arquivo de Resumo Estruturado do Livro
    resumo_path = corpus_j3_dir / f"{b_info['slug']}_resumo-completo.md"
    with open(resumo_path, "w", encoding="utf-8") as rf:
        rf.write(f"---\n")
        rf.write(f"livro: \"{b_info['title']}\"\n")
        rf.write(f"ano_narrativo: \"{b_info['ano']}\"\n")
        rf.write(f"total_capitulos: {len(capitulos_processados)}\n")
        rf.write(f"fonte:\n")
        rf.write(f"  arquivo_origem: \"origem/{b_info['file']}\"\n")
        rf.write(f"  autor: \"George R. R. Martin\"\n")
        rf.write(f"  traducao: \"Jorge Candeias (LeYa)\"\n")
        rf.write(f"---\n\n")
        rf.write(f"# {b_info['title']} &bull; Compêndio Estruturado de Capítulos\n\n")
        rf.write(f"Este documento reúne o índice analítico e a sinopse estruturada de todos os capítulos de *{b_info['title']}*.\n\n")
        
        for cap in capitulos_processados:
            rf.write(f"### Capítulo {cap['idx']:02d}: {cap['pov']}\n")
            rf.write(f"- **Extensão:** {cap['total_palavras']} palavras | Arquivo: `{cap['file']}`\n")
            rf.write(f"- **Incidente Inicial:** {cap['primeiro_paragrafo'][:220]}...\n\n")
            
    print(f"  Salvo: {resumo_path}")
    
    # 2. Salvar capítulos centrais dos POVs solicitados
    for target in ["Eddard", "Catelyn", "Jon", "Tyrion", "Arya", "Davos", "Jaime"]:
        pov_caps = [c for c in capitulos_processados if c['pov'].upper() == target.upper()]
        if pov_caps:
            pov_file = corpus_j3_dir / f"{b_info['slug']}_pov-{target.lower()}.md"
            with open(pov_file, "w", encoding="utf-8") as pf:
                pf.write(f"---\n")
                pf.write(f"livro: \"{b_info['title']}\"\n")
                pf.write(f"personagem_pov: \"{target}\"\n")
                pf.write(f"total_capitulos_pov: {len(pov_caps)}\n")
                pf.write(f"fonte:\n")
                pf.write(f"  arquivo_origem: \"origem/{b_info['file']}\"\n")
                pf.write(f"  livro: \"{b_info['title']}\"\n")
                pf.write(f"---\n\n")
                pf.write(f"# Capítulos de {target} em *{b_info['title']}*\n\n")
                for c in pov_caps:
                    pf.write(f"## Capítulo {c['idx']:02d} &bull; {c['pov']}\n\n")
                    pf.write(c['md'][:4000])
                    pf.write("\n\n---\n\n")
            print(f"  Salvo POV: {pov_file}")

print("Conversão dos Livros 1 a 3 concluída com sucesso!")
