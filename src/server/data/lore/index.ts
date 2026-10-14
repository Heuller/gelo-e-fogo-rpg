import 'server-only';
import glossarioJson from './glossario_cidadela.json';
import bibliaJson from './biblia_j1_conquista.json';

export interface FonteReferencia {
  arquivo_md: string;
  livro: string;
  capitulo: string;
}

export interface VerbeteGlossario {
  id: string;
  termo: string;
  aliases: string[];
  categoria: string;
  resumo_meistre: string;
  fonte: FonteReferencia;
}

export interface MarcoCronologico {
  id: string;
  periodo: string;
  local: string;
  titulo: string;
  fatos_canonicos: string[];
  personagens_presentes: string[];
  origem: 'canonico';
  fonte: FonteReferencia;
}

export interface PersonagemCanonico {
  id: string;
  nome: string;
  titulos: string[];
  origem_regional: string;
  tracos_personalidade: string[];
  objetivos_2ac: string[];
  atributos_sugeridos: Record<string, number>;
  origem: 'canonico';
  fonte: FonteReferencia;
}

export interface EstatisticasRPGDragao {
  combate: number;
  defesa: number;
  saude: number;
  modificador_ataque: string;
}

export interface DragaoCanonico {
  id: string;
  nome: string;
  montador_conquista: string;
  porte: string;
  cor_fogo: string;
  descricao_lore: string;
  estatisticas_rpg: EstatisticasRPGDragao;
  origem: 'canonico';
  fonte: FonteReferencia;
}

export interface GanchoRamificacao {
  id: string;
  titulo: string;
  premissa_alternativa: string;
  impacto_esperado: string;
  origem: 'original';
  referencia_canonica: FonteReferencia;
}

export interface BibliaJ1 {
  titulo_jornada: string;
  periodo_historico: string;
  cronologia_canonica: MarcoCronologico[];
  personagens_canonicos: PersonagemCanonico[];
  dragoes: DragaoCanonico[];
  ganchos_ramificacao: GanchoRamificacao[];
}

/**
 * Retorna todos os 106 verbetes do Glossário da Cidadela.
 */
export function obterGlossario(): VerbeteGlossario[] {
  return glossarioJson as VerbeteGlossario[];
}

/**
 * Busca um verbete por ID, termo exato ou apelido/alias.
 */
export function buscarTermoGlossario(termoOuId: string): VerbeteGlossario | undefined {
  if (!termoOuId) return undefined;
  const normalizado = termoOuId.toLowerCase().trim();
  const lista = obterGlossario();
  return lista.find(
    (item) =>
      item.id.toLowerCase() === normalizado ||
      item.termo.toLowerCase() === normalizado ||
      item.aliases.some((alias) => alias.toLowerCase() === normalizado)
  );
}

/**
 * Retorna todos os verbetes de uma categoria específica.
 */
export function buscarPorCategoria(categoria: string): VerbeteGlossario[] {
  if (!categoria) return [];
  const normalizado = categoria.toLowerCase().trim();
  return obterGlossario().filter((item) => item.categoria.toLowerCase() === normalizado);
}

/**
 * Retorna a Bíblia completa da Jornada 1 (A Conquista de Aegon).
 */
export function obterBibliaJ1(): BibliaJ1 {
  return bibliaJson as unknown as BibliaJ1;
}

/**
 * Retorna os 10 marcos da Cronologia Canônica da Conquista.
 */
export function obterCronologiaJ1(): MarcoCronologico[] {
  return (bibliaJson as unknown as BibliaJ1).cronologia_canonica;
}

/**
 * Retorna as 17 fichas completas de personagens canônicos da Conquista.
 */
export function obterPersonagensJ1(): PersonagemCanonico[] {
  return (bibliaJson as unknown as BibliaJ1).personagens_canonicos;
}

/**
 * Busca uma ficha de personagem por ID, nome ou título.
 */
export function obterPersonagemJ1(idOuNome: string): PersonagemCanonico | undefined {
  if (!idOuNome) return undefined;
  const normalizado = idOuNome.toLowerCase().trim();
  return obterPersonagensJ1().find(
    (p) =>
      p.id.toLowerCase() === normalizado ||
      p.nome.toLowerCase() === normalizado ||
      p.titulos.some((t) => t.toLowerCase().includes(normalizado))
  );
}

/**
 * Retorna os 3 dragões modelados da Conquista (Balerion, Vhagar e Meraxes).
 */
export function obterDragoesJ1(): DragaoCanonico[] {
  const dragoes = (bibliaJson as any).dragoes;
  if (Array.isArray(dragoes)) return dragoes;
  return Object.values(dragoes);
}

/**
 * Busca um dragão por ID ou nome.
 */
export function obterDragaoJ1(idOuNome: string): DragaoCanonico | undefined {
  if (!idOuNome) return undefined;
  const normalizado = idOuNome.toLowerCase().trim();
  return obterDragoesJ1().find(
    (d) => d.id.toLowerCase() === normalizado || d.nome.toLowerCase().includes(normalizado)
  );
}

/**
 * Retorna os 4 ganchos de ramificação narrativa ("E se...") marcados com origem: 'original'.
 */
export function obterGanchosJ1(): GanchoRamificacao[] {
  return (bibliaJson as unknown as BibliaJ1).ganchos_ramificacao;
}
