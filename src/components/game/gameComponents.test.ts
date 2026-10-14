import { describe, it, expect } from 'vitest';
import { rolar2d6, FichaPersonagem, aplicarDeltaEstado } from '@/server/engine/rpgEngine';

describe('Integração de Componentes do Jogo (Etapa 4B)', () => {
  const fichaMock: FichaPersonagem = {
    id: 'aegon-conquistador',
    nome: 'Aegon I Targaryen',
    origem: 'sangue_valiriano',
    atributos: {
      comando: 5,
      furia: 4,
      astucia: 3,
      cortesia: 3,
      erudicao: 3,
      pressagio: 4,
    },
    estado: {
      sangue: 10,
      compostura: 10,
      honra: 5,
    },
    cicatrizes: [],
    segredos: ['Segredo do Tridente'],
  };

  it('deve calcular corretamente a rolagem com atributos e limiares de DC', () => {
    // Comando 5 + dados [4, 4] = 13 vs DC 10 (Sucesso Crítico pois total >= dc + 3)
    const res = rolar2d6(fichaMock.atributos.comando, 10, { dadosFixos: [4, 4] });
    expect(res.resultado).toBe('CRITICO');
    expect(res.total).toBe(13);
    expect(res.morteCanonica).toBe(false);
  });

  it('deve atualizar os estados de sangue, compostura e honra com segurança', () => {
    const { fichaAtualizada } = aplicarDeltaEstado(fichaMock, { reputacaoCasas: {}, flagsBorboleta: {}, marcosConcluidos: [] }, {
      honra: 2,
      sangue: -1,
      novaCicatriz: 'Corte de adaga na coxa',
    });

    expect(fichaAtualizada.estado.honra).toBe(7);
    expect(fichaAtualizada.estado.sangue).toBe(9);
    expect(fichaAtualizada.cicatrizes).toContain('Corte de adaga na coxa');
  });
});
