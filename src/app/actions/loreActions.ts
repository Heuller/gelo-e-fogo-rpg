'use server';

import {
  obterGlossario,
  buscarTermoGlossario,
  buscarPorCategoria,
  VerbeteGlossario,
} from '@/server/data/lore';
import { requireOwner } from '@/server/auth/requireOwner';

/**
 * Server Action segura para retornar os verbetes do Glossário da Cidadela
 * para componentes cliente com verificação estrita de proprietário.
 */
export async function getGlossaryEntriesAction(): Promise<VerbeteGlossario[]> {
  const auth = await requireOwner(true);
  if (!auth.authorized) {
    throw new Error('Acesso negado: apenas o proprietário da crônica pode consultar o arquivo da Cidadela.');
  }
  return obterGlossario();
}

/**
 * Server Action para buscar um termo por ID ou alias.
 */
export async function findGlossaryTermAction(termoOuId: string): Promise<VerbeteGlossario | undefined> {
  const auth = await requireOwner(true);
  if (!auth.authorized) {
    throw new Error('Acesso negado: apenas o proprietário da crônica pode consultar o arquivo da Cidadela.');
  }
  return buscarTermoGlossario(termoOuId);
}

/**
 * Server Action para filtrar verbetes por categoria.
 */
export async function getGlossaryByCategoryAction(categoria: string): Promise<VerbeteGlossario[]> {
  const auth = await requireOwner(true);
  if (!auth.authorized) {
    throw new Error('Acesso negado: apenas o proprietário da crônica pode consultar o arquivo da Cidadela.');
  }
  return buscarPorCategoria(categoria);
}
