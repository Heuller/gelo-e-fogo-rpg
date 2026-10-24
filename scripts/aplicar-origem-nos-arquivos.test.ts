import { describe, it, expect } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';
import { REGISTRO_JORNADAS } from '../src/server/journeys/registry';

// Mapa de refinamentos manuais onde a regra heurística precisa de ajuste fino
const AJUSTES_FINOS: Record<string, { origem: 'canonica' | 'original'; nota?: string; razao?: string }> = {
  // J1
  j1_a2_duelo_orys_argilac: {
    origem: 'canonica',
    nota: 'Orys Baratheon mata Argilac Durrandon em combate singular durante a Batalha da Última Tempestade, conforme Fogo & Sangue.',
    razao: 'Combate histórico canônico documentado em Fogo & Sangue',
  },
  j1_a3_posicionamento_campo_fogo: {
    origem: 'canonica',
    nota: 'Posicionamento histórico das hostes reais e do exército dos Dois Reis antes do confronto no Campo de Fogo.',
    razao: 'Evento histórico canônico documentado em Fogo & Sangue',
  },
  j1_a3_conspiracao_brandon_snow: {
    origem: 'canonica',
    nota: 'Proposta histórica de Brandon Snow a Torrhen Stark para infiltrar-se e assassinar os dragões com flechas de represeiro.',
    razao: 'Proposta histórica registrada em Fogo & Sangue',
  },
  j1_a3_emboscada_noturna_brandon: {
    origem: 'original',
    nota: 'Ramificação alternativa do RPG: Brandon Snow executa a tentativa noturna de emboscada aos dragões.',
    razao: 'Ramificação alternativa especulativa ("E se...")',
  },

  // J2
  j2_a1_coroacao_aegon_ii_fosso: {
    origem: 'canonica',
    nota: 'Coroação pública de Aegon II no Fosso dos Dragões perante a plebe de Porto Real (Fogo & Sangue).',
    razao: 'Evento histórico canônico documentado em Fogo & Sangue',
  },
  j2_a1_bloqueio_honra_assassinato: {
    origem: 'original',
    nota: 'Criação autoral: dilema ético do protagonista diante do plano sangrento de Sangue e Queijo.',
    razao: 'Dilema de roleplay autoral do RPG',
  },

  // J3
  j3_final_canonico_norte_se_lembra: {
    origem: 'canonica',
    nota: 'Desfecho canônico do Ato IV: O Norte se lembra da traição nas Gêmeas e jura vingança pela Casa Stark.',
    razao: 'Desfecho canônico das Crônicas de Gelo e Fogo',
  },
  j3_a1_investigacao_morte_jon_arryn: {
    origem: 'canonica',
    nota: 'Investigação de Eddard Stark sobre a linhagem dos filhos bastardos de Robert Baratheon e a morte de Jon Arryn.',
    razao: 'Investigação histórica canônica de A Guerra dos Tronos',
  },

  // J4
  j4_a3b_marcha_para_o_oeste: {
    origem: 'original',
    nota: 'Ramal do Oeste (Criação autoral): dramatização da expedição de Bowen Marsh à Ponte das Caveiras contra o Chorão.',
    razao: 'Expansão narrativa autoral do Ramal do Oeste',
  },
  j4_a3b_estrada_da_dadiva: {
    origem: 'original',
    nota: 'Ramal do Oeste (Criação autoral): marcha dos patrulheiros pelas colinas da Dádiva enfrentando o inverno rigoroso.',
    razao: 'Expansão narrativa autoral do Ramal do Oeste',
  },
  j4_a3b_ponte_de_caveiras: {
    origem: 'original',
    nota: 'Ramal do Oeste (Criação autoral): o combate desesperado e sangrento nas falésias da Ponte das Caveiras.',
    razao: 'Expansão narrativa autoral do Ramal do Oeste',
  },
  j4_a3b_a_ferida_de_marsh: {
    origem: 'original',
    nota: 'Ramal do Oeste (Criação autoral): o resgate de Bowen Marsh gravemente ferido na Ponte das Caveiras.',
    razao: 'Expansão narrativa autoral do Ramal do Oeste',
  },
  j4_a3b_sor_denys: {
    origem: 'original',
    nota: 'Ramal do Oeste (Criação autoral): intervenção dos cavaleiros da Torre Sombria comandados por Ser Denys Mallister.',
    razao: 'Expansão narrativa autoral do Ramal do Oeste',
  },
  j4_a3b_sam_e_gilly: {
    origem: 'original',
    nota: 'Ramal do Oeste (Criação autoral): reencontro fortuito com os fugitivos de Fortenoite na retaguarda ocidental.',
    razao: 'Expansão narrativa autoral do Ramal do Oeste',
  },
  j4_a3b_volta_a_castelo_negro: {
    origem: 'original',
    nota: 'Ramal do Oeste (Criação autoral): o regresso dos veteranos da Ponte das Caveiras a Castelo Negro sob tensão política.',
    razao: 'Expansão narrativa autoral do Ramal do Oeste',
  },

  // J5
  j5_a1_o_chamado_do_ninho: {
    origem: 'original',
    nota: 'Criação autoral: dramatização da reação de Jon Arryn rasgando o pergaminho de Aerys II e convocando os vassalos do Vale.',
    razao: 'Dramatização literária com licença narrativa autoral',
  },
};

const ARQUIVOS_JORNADAS: { [arquivo: string]: string[] } = {
  'src/server/data/journeys/j1_act1.ts': ['conquista_aegon'],
  'src/server/data/journeys/j1_act2.ts': ['conquista_aegon'],
  'src/server/data/journeys/j1_act3.ts': ['conquista_aegon'],
  'src/server/data/journeys/j1_act4.ts': ['conquista_aegon'],
  'src/server/data/journeys/j2_act1.ts': ['danca_dragoes'],
  'src/server/data/journeys/j2_act2.ts': ['danca_dragoes'],
  'src/server/data/journeys/j2_act3.ts': ['danca_dragoes'],
  'src/server/data/journeys/j2_act4.ts': ['danca_dragoes'],
  'src/server/data/journeys/j3_act1.ts': ['guerra_tronos'],
  'src/server/data/journeys/j3_act2.ts': ['guerra_tronos'],
  'src/server/data/journeys/j3_act3.ts': ['guerra_tronos'],
  'src/server/data/journeys/j3_act4.ts': ['guerra_tronos'],
  'src/server/data/journeys/j4_act1.ts': ['patrulha_muralha'],
  'src/server/data/journeys/j4_act2.ts': ['patrulha_muralha'],
  'src/server/data/journeys/j4_act3.ts': ['patrulha_muralha'],
  'src/server/data/journeys/j4_act3b_oeste.ts': ['patrulha_muralha'],
  'src/server/data/journeys/j4_act4.ts': ['patrulha_muralha'],
  'src/server/data/journeys/j5_act1.ts': ['rebeliao_robert'],
  'src/server/data/journeys/j5_act2.ts': ['rebeliao_robert'],
  'src/server/data/journeys/j5_act3.ts': ['rebeliao_robert'],
  'src/server/data/journeys/j5_act4.ts': ['rebeliao_robert'],
};

describe('G5 — Aplicação de Origem e Notas nos Arquivos das Jornadas', () => {
  it('deve atualizar todos os 299 nós nos 21 arquivos com origem e notaHistorica', () => {
    // 1. Mapear todas as cenas a partir de REGISTRO_JORNADAS
    const mapaClassificacao: Map<
      string,
      { origem: 'canonica' | 'original'; notaHistorica: string; razao: string }
    > = new Map();

    for (const [jornadaId, def] of Object.entries(REGISTRO_JORNADAS)) {
      for (const node of Object.values(def.grafo.nodes)) {
        let origem: 'canonica' | 'original' = 'canonica';
        let nota = node.loreContext?.notaHistorica || (node as any).notaHistorica || '';
        let razao = 'Evento histórico canônico correspondente às crônicas de George R. R. Martin';

        // Checar ajustes finos
        if (AJUSTES_FINOS[node.id]) {
          origem = AJUSTES_FINOS[node.id].origem;
          if (AJUSTES_FINOS[node.id].nota) nota = AJUSTES_FINOS[node.id].nota!;
          if (AJUSTES_FINOS[node.id].razao) razao = AJUSTES_FINOS[node.id].razao!;
        } else {
          // Heurística conservadora
          const idLower = node.id.toLowerCase();
          const titLower = (node.titulo || '').toLowerCase();
          const notaLower = nota.toLowerCase();
          const txtLower = (node.fallbackText || '').toLowerCase();

          const ehDivergencia =
            idLower.includes('whatif') ||
            idLower.includes('divergencia') ||
            titLower.includes('what if') ||
            titLower.includes('divergência') ||
            notaLower.includes('ponto de divergência') ||
            notaLower.includes('ramificação alternativa') ||
            notaLower.includes('divergência canônica');

          const ehMorteNaoCanonica =
            (idLower.includes('morte') || titLower.includes('morte') || titLower.includes('queda')) &&
            (idLower.includes('darklyn') ||
              idLower.includes('emboscada') ||
              idLower.includes('campo_de_fogo') ||
              idLower.includes('represeiro') ||
              idLower.includes('linchamento') ||
              idLower.includes('assassinato') ||
              notaLower.includes('morte precoce') ||
              notaLower.includes('morte prematura') ||
              notaLower.includes('derrota fatal'));

          if (ehDivergencia) {
            origem = 'original';
            razao = 'Ramificação alternativa / ponto de divergência especulativo ("E se...")';
            if (!nota) nota = 'Criação autoral: ramificação alternativa especulativa afastando-se do cânone.';
          } else if (ehMorteNaoCanonica) {
            origem = 'original';
            razao = 'Morte ou derrota prematura não canônica do protagonista/facção';
            if (!nota) nota = 'Criação autoral: desfecho de morte prematura ou derrota não canônica para encerramento de narrativa no RPG.';
          } else {
            origem = 'canonica';
            if (!nota) {
              const cap = node.loreContext?.fonte?.capitulo || 'Registro Histórico';
              const liv = node.loreContext?.fonte?.livro || 'As Crônicas de Gelo e Fogo';
              nota = `Fato canônico adaptado de ${liv} (${cap}).`;
            }
          }
        }

        mapaClassificacao.set(node.id, { origem, notaHistorica: nota, razao });
      }
    }

    expect(mapaClassificacao.size).toBe(299);

    // 2. Iterar sobre cada arquivo e aplicar no código
    let totalModificados = 0;

    for (const relPath of Object.keys(ARQUIVOS_JORNADAS)) {
      const absPath = path.resolve(process.cwd(), relPath);
      let conteudo = fs.readFileSync(absPath, 'utf-8');

      // Normalizar line endings para \n
      conteudo = conteudo.replace(/\r\n/g, '\n');

      for (const [nodeId, info] of mapaClassificacao.entries()) {
        // Procurar o bloco do nó no arquivo
        // Exemplo: `j1_a1_mesa_pintada: {`
        const nodePattern = new RegExp(`(\\b${nodeId}:\\s*\\{[\\s\\S]*?loreContext:\\s*\\{)([\\s\\S]*?\\})`, 'g');

        conteudo = conteudo.replace(nodePattern, (match, prefix, loreBody) => {
          // Verificar se já tem origem
          let novoLoreBody = loreBody;
          if (!novoLoreBody.includes('origem:')) {
            novoLoreBody = `\n        origem: '${info.origem}',` + novoLoreBody;
          } else {
            novoLoreBody = novoLoreBody.replace(/origem:\s*['"][^'"]+['"],?/, `origem: '${info.origem}',`);
          }

          // Verificar se já tem notaHistorica
          if (!novoLoreBody.includes('notaHistorica:')) {
            const notaSanitizada = info.notaHistorica.replace(/'/g, "\\'");
            novoLoreBody = novoLoreBody.replace(
              /(\s*\}\s*)$/,
              `\n        notaHistorica: '${notaSanitizada}',\n      }`
            );
          }

          totalModificados++;
          return `${prefix}${novoLoreBody}`;
        });
      }

      fs.writeFileSync(absPath, conteudo, 'utf-8');
    }

    console.log(`\nAtualização concluída nos 21 arquivos! Nós processados: ${totalModificados}`);
  });
});
