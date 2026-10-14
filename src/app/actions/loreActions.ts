'use server';

import {
  obterGlossario,
  buscarTermoGlossario,
  buscarPorCategoria,
  VerbeteGlossario,
} from '@/server/data/lore';

/**
 * Server Action segura para retornar os 106 verbetes do Glossário da Cidadela
 * para componentes cliente sem quebrar a proteção 'server-only'.
 */
export async function getGlossaryEntriesAction(): Promise<VerbeteGlossario[]> {
  return obterGlossario();
}

/**
 * Server Action para buscar um termo por ID ou alias.
 */
export async function findGlossaryTermAction(termoOuId: string): Promise<VerbeteGlossario | undefined> {
  return buscarTermoGlossario(termoOuId);
}

/**
 * Server Action para filtrar verbetes por categoria.
 */
export async function getGlossaryByCategoryAction(categoria: string): Promise<VerbeteGlossario[]> {
  return buscarPorCategoria(categoria);
}
