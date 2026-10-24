import fs from 'fs';
import path from 'path';

function escanearDiretorio(dir: string, extensoes: string[]): string[] {
  const arquivos: string[] = [];
  const itens = fs.readdirSync(dir, { withFileTypes: true });

  for (const item of itens) {
    const cheio = path.join(dir, item.name);
    if (item.isDirectory()) {
      if (item.name !== 'node_modules' && item.name !== '.next') {
        arquivos.push(...escanearDiretorio(cheio, extensoes));
      }
    } else if (extensoes.some((ext) => item.name.endsWith(ext))) {
      arquivos.push(cheio);
    }
  }

  return arquivos;
}

const SUBSTITUICOES: Array<[RegExp, string]> = [
  // Título de Cavaleiro
  [/\bSor\b/g, 'Ser'],

  // Pronomes e Possessivos (Capitalizados)
  [/\bVós\b/g, 'Você'],
  [/\bVosso\b/g, 'Seu'],
  [/\bVossa\b/g, 'Sua'],
  [/\bVossos\b/g, 'Seus'],
  [/\bVossas\b/g, 'Suas'],

  // Pronomes e Possessivos (Minúsculos)
  [/\bvós\b/g, 'você'],
  [/\bvosso\b/g, 'seu'],
  [/\bvossa\b/g, 'sua'],
  [/\bvossos\b/g, 'seus'],
  [/\bvossas\b/g, 'suas'],

  // Formas Verbais da 2ª pessoa do plural (Capitalizadas)
  [/\bDesejais\b/g, 'Deseja'],
  [/\bQuereis\b/g, 'Quer'],
  [/\bSabeis\b/g, 'Sabe'],
  [/\bPossuís\b/g, 'Possui'],
  [/\bRecuais\b/g, 'Recua'],
  [/\bObtendes\b/g, 'Obtém'],
  [/\bConheceis\b/g, 'Conhece'],
  [/\bLutais\b/g, 'Luta'],
  [/\bAvançais\b/g, 'Avança'],
  [/\bEsperais\b/g, 'Espera'],
  [/\bTendes\b/g, 'Tem'],
  [/\bEstais\b/g, 'Está'],
  [/\bSois\b/g, 'É'],

  // Formas Verbais da 2ª pessoa do plural (Minúsculas)
  [/\bdesejais\b/g, 'deseja'],
  [/\bquereis\b/g, 'quer'],
  [/\bsabeis\b/g, 'sabe'],
  [/\bpossuís\b/g, 'possui'],
  [/\brecuais\b/g, 'recua'],
  [/\bobtendes\b/g, 'obtém'],
  [/\bentendestes\b/g, 'entendeu'],
  [/\bvistes\b/g, 'viu'],
  [/\bouvistes\b/g, 'ouviu'],
  [/\bdizeis\b/g, 'diz'],
  [/\bfazeis\b/g, 'faz'],
  [/\bides\b/g, 'vai'],
  [/\bvedes\b/g, 'vê'],
  [/\bestais\b/g, 'está'],
  [/\bsois\b/g, 'é'],
  [/\btendes\b/g, 'tem'],
  [/\btínheis\b/g, 'tinha'],
  [/\bfostes\b/g, 'foi'],
  [/\bpartistes\b/g, 'partiu'],
  [/\bchegastes\b/g, 'chegou'],
  [/\baceitais\b/g, 'aceita'],
  [/\brecusais\b/g, 'recusa'],
  [/\bconcordais\b/g, 'concorda'],
  [/\bjurais\b/g, 'jura'],
  [/\blutais\b/g, 'luta'],
  [/\bcaminhais\b/g, 'caminha'],
  [/\bavançais\b/g, 'avança'],
  [/\bolhais\b/g, 'olha'],
  [/\bescutais\b/g, 'escuta'],
  [/\bpermaneceis\b/g, 'permanece'],
  [/\besperais\b/g, 'espera'],
  [/\bguardais\b/g, 'guarda'],
  [/\bdeixais\b/g, 'deixa'],
  [/\bpegais\b/g, 'pega'],
  [/\btomais\b/g, 'toma'],
  [/\bpedis\b/g, 'pede'],
  [/\bouvis\b/g, 'ouve'],
  [/\bsuplicais\b/g, 'suplica'],
  [/\bproclamais\b/g, 'proclama'],
  [/\bconheceis\b/g, 'conhece'],
  [/\blembrais\b/g, 'lembra'],
  [/\besqueceis\b/g, 'esquece'],
  [/\bconfiais\b/g, 'confia'],
  [/\btemeis\b/g, 'teme'],
  [/\bduvidais\b/g, 'duvida'],
  [/\bagis\b/g, 'age'],
  [/\bsentis\b/g, 'sente'],
  [/\bdecidis\b/g, 'decide'],
  [/\bescolheis\b/g, 'escolhe'],
  [/\bdescreveis\b/g, 'descreve'],
  [/\bcompreendeis\b/g, 'compreende'],
  [/\bpreferis\b/g, 'prefere'],
];

function executarMigracao() {
  const pastaSrc = path.join(process.cwd(), 'src');
  const arquivos = escanearDiretorio(pastaSrc, ['.ts', '.tsx']);
  let totalModificados = 0;
  let totalSubstituicoes = 0;

  for (const arq of arquivos) {
    let conteudo = fs.readFileSync(arq, 'utf8');
    const conteudoOriginal = conteudo;

    for (const [padrao, subst] of SUBSTITUICOES) {
      const matches = conteudo.match(padrao);
      if (matches) {
        totalSubstituicoes += matches.length;
        conteudo = conteudo.replace(padrao, subst);
      }
    }

    if (conteudo !== conteudoOriginal) {
      fs.writeFileSync(arq, conteudo, 'utf8');
      totalModificados++;
      console.log(`✓ Modificado: ${path.relative(process.cwd(), arq)}`);
    }
  }

  console.log(`\n🎉 Migração concluída!`);
  console.log(`• Arquivos modificados: ${totalModificados}`);
  console.log(`• Total de termos substituídos: ${totalSubstituicoes}`);
}

executarMigracao();
