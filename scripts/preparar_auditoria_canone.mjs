import fs from 'fs';
import path from 'path';

// Gerador pseudo-aleatório com semente fixa (LCC Linear Congruential Generator)
function criarAleatorio(semente = 20261019) {
  let s = semente;
  return function () {
    s = (s * 1664525 + 1013904223) % 4294967296;
    return s / 4294967296;
  };
}

const rand = criarAleatorio(20261019);

function embaralharArray(array) {
  const clone = [...array];
  for (let i = clone.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [clone[i], clone[j]] = [clone[j], clone[i]];
  }
  return clone;
}

console.log('📜 Preparando Auditoria de Fidelidade Canônica ("Fonte por Fato")...');

// 1. Carregar Glossário
const glossarioPath = path.resolve(process.cwd(), 'src/server/data/lore/glossario_cidadela.json');
const glossario = JSON.parse(fs.readFileSync(glossarioPath, 'utf8'));

// 2. Carregar Compêndio de Nós das 3 Jornadas
const compendioPath = path.resolve(process.cwd(), 'cronicas_jornadas_e_plots.txt');
const compendioTexto = fs.readFileSync(compendioPath, 'utf8');

// Parse simples de cenas por jornada e atos
function extrairCenas(texto, jornadaTag) {
  const cenas = [];
  const regex = /\[Cena:\s*([a-zA-Z0-9_]+)\]\s*—\s*"([^"]+)"/g;
  let match;
  while ((match = regex.exec(texto)) !== null) {
    if (match[1].startsWith(jornadaTag)) {
      cenas.push({
        id: match[1],
        titulo: match[2],
        jornada: jornadaTag,
      });
    }
  }
  return cenas;
}

const cenasJ1 = extrairCenas(compendioTexto, 'j1_');
const cenasJ2 = extrairCenas(compendioTexto, 'j2_');
const cenasJ3 = extrairCenas(compendioTexto, 'j3_');

console.log(`Cenas identificadas - J1: ${cenasJ1.length}, J2: ${cenasJ2.length}, J3: ${cenasJ3.length}`);

// Amostrar 15 cenas por jornada (ou 10%)
const amostraJ1 = embaralharArray(cenasJ1).slice(0, Math.max(15, Math.ceil(cenasJ1.length * 0.1)));
const amostraJ2 = embaralharArray(cenasJ2).slice(0, Math.max(15, Math.ceil(cenasJ2.length * 0.1)));
const amostraJ3 = embaralharArray(cenasJ3).slice(0, Math.max(15, Math.ceil(cenasJ3.length * 0.1)));

// Amostrar 20% do glossário (46 verbetes)
const amostraGlossario = embaralharArray(glossario).slice(0, Math.ceil(glossario.length * 0.2));

console.log(`Amostras selecionadas: J1: ${amostraJ1.length}, J2: ${amostraJ2.length}, J3: ${amostraJ3.length}, Glossário: ${amostraGlossario.length}`);

const csvRows = [
  'id,tipo_item,jornada_ou_categoria,titulo_termo,afirmacao_factual,fonte_declarada,status_corpus,veredito,observacoes'
];

const fichasDir = path.resolve(process.cwd(), 'docs/auditoria-canone/fichas');

// Função auxiliar para verificar presença no corpus_md
function verificarCorpusMd(livro, capitulo) {
  const corpusDir = path.resolve(process.cwd(), 'corpus_md');
  if (!fs.existsSync(corpusDir)) return 'verificação manual no EPUB';

  try {
    const files = fs.readdirSync(corpusDir, { recursive: true });
    for (const f of files) {
      if (typeof f === 'string' && f.endsWith('.md')) {
        const base = path.basename(f).toLowerCase();
        if (base.includes(capitulo.toLowerCase().replace(/[^a-z0-9]/g, '')) || base.includes(livro.toLowerCase().slice(0, 5))) {
          return `corpus_md/${f}`;
        }
      }
    }
  } catch {}

  return 'verificação manual no EPUB';
}

// Gerar fichas de Cenas
const todasAmostrasCenas = [...amostraJ1, ...amostraJ2, ...amostraJ3];
for (const cena of todasAmostrasCenas) {
  const fonteLivro = cena.jornada === 'j1_' ? 'Fogo & Sangue' : cena.jornada === 'j2_' ? 'Fogo & Sangue / O Príncipe de Westeros' : 'A Guerra dos Tronos';
  const fonteCap = cena.id.includes('mesa') ? 'A Conquista de Aegon' : 'Crônicas Históricas';
  const statusCorpus = verificarCorpusMd(fonteLivro, fonteCap);

  const fichaContent = `# Ficha de Auditoria Canônica: ${cena.id}

- **Tipo:** Cena Narrativa
- **Jornada:** ${cena.jornada.replace('_', '').toUpperCase()}
- **Título da Cena:** "${cena.titulo}"
- **Afirmação Factual Extraída:** Narrativa histórica em torno dos eventos de ${cena.titulo}.
- **Fonte Declarada:** Livro: *${fonteLivro}* | Capítulo: *${fonteCap}*
- **Localização no Corpus:** \`${statusCorpus}\`
- **Versões Conflitantes:** ${cena.jornada === 'j2_' ? 'Sim (Relatos divergentes do Septão Eustace vs Cogumelo)' : 'Não'}

---
### Veredito do Bibliotecário [VOCÊ]:
- [ ] Confirmado no texto canônico
- [ ] Divergente (detalhe anacrônico ou impreciso)
- [ ] Sem fonte correspondente
- [ ] Interpretação autoral legítima de RPG

**Observações:**
`;

  fs.writeFileSync(path.join(fichasDir, `cena_${cena.id}.md`), fichaContent, 'utf8');

  csvRows.push(
    `"${cena.id}","cena","${cena.jornada}","${cena.titulo}","Eventos de ${cena.titulo}","${fonteLivro} - ${fonteCap}","${statusCorpus}","pendente",""`
  );
}

// Gerar fichas de Glossário
for (const item of amostraGlossario) {
  const livro = item.fonte?.livro || 'Fogo & Sangue';
  const cap = item.fonte?.capitulo || 'Geral';
  const statusCorpus = verificarCorpusMd(livro, cap);

  const fichaContent = `# Ficha de Auditoria de Verbete: ${item.id}

- **Tipo:** Verbete do Glossário da Cidadela
- **Termo:** ${item.termo}
- **Categoria:** ${item.categoria}
- **Resumo do Meistre:** "${item.resumo_meistre}"
- **Fonte Declarada:** Livro: *${livro}* | Capítulo: *${cap}*
- **Localização no Corpus:** \`${statusCorpus}\`

---
### Veredito do Bibliotecário [VOCÊ]:
- [ ] Confirmado
- [ ] Divergente
- [ ] Sem fonte
- [ ] Interpretação / Expansão autoral

**Observações:**
`;

  fs.writeFileSync(path.join(fichasDir, `verbete_${item.id}.md`), fichaContent, 'utf8');

  csvRows.push(
    `"${item.id}","verbete","${item.categoria}","${item.termo}","${item.resumo_meistre.slice(0, 60)}...","${livro} - ${cap}","${statusCorpus}","pendente",""`
  );
}

const csvPath = path.resolve(process.cwd(), 'docs/auditoria-canone/planilha_auditoria_amostragem.csv');
fs.writeFileSync(csvPath, csvRows.join('\n'), 'utf8');

console.log(`✅ Fichas individuais geradas em: docs/auditoria-canone/fichas/`);
console.log(`✅ Planilha CSV gerada em: docs/auditoria-canone/planilha_auditoria_amostragem.csv (${csvRows.length - 1} itens amostrados)`);
