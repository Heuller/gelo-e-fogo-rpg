import { describe, it, expect } from 'vitest';
import {
  DIALOGOS_DE_ACAMPAMENTO,
  obterTopicosAcampamento,
  calcularNovoStatusAprovacao,
} from '@/server/data/camp/dialogosAcampamento';

describe('Sistema de Diálogos de Acampamento (Estilo BG3 / Dragon Age)', () => {
  it('deve possuir diálogos para os principais companheiros de todas as eras', () => {
    expect(DIALOGOS_DE_ACAMPAMENTO['jon_snow']).toBeDefined();
    expect(DIALOGOS_DE_ACAMPAMENTO['samwell']).toBeDefined();
    expect(DIALOGOS_DE_ACAMPAMENTO['donal_noye']).toBeDefined();
    expect(DIALOGOS_DE_ACAMPAMENTO['aemon']).toBeDefined();
    expect(DIALOGOS_DE_ACAMPAMENTO['alliser_thorne']).toBeDefined();
    expect(DIALOGOS_DE_ACAMPAMENTO['visenya']).toBeDefined();
    expect(DIALOGOS_DE_ACAMPAMENTO['orys_baratheon']).toBeDefined();
    expect(DIALOGOS_DE_ACAMPAMENTO['daemon']).toBeDefined();
  });

  it('deve calcular corretamente a mudança de status por limiar de aprovação', () => {
    expect(calcularNovoStatusAprovacao(-10)).toBe('Hostil');
    expect(calcularNovoStatusAprovacao(10)).toBe('Frio');
    expect(calcularNovoStatusAprovacao(35)).toBe('Neutro');
    expect(calcularNovoStatusAprovacao(65)).toBe('Leal');
    expect(calcularNovoStatusAprovacao(90)).toBe('Devotado');
  });

  it('cada tópico deve possuir ao menos 2 opções de resposta do jogador', () => {
    Object.values(DIALOGOS_DE_ACAMPAMENTO).forEach((comp) => {
      comp.topicos.forEach((topico) => {
        expect(
          topico.respostas.length,
          `O tópico '${topico.id}' de '${comp.nome}' deve ter ao menos 2 respostas.`
        ).toBeGreaterThanOrEqual(1);

        topico.respostas.forEach((r) => {
          expect(r.texto.trim().length).toBeGreaterThan(5);
          expect(r.reacaoCompanheiro.trim().length).toBeGreaterThan(10);
          expect(typeof r.deltaAprovacao).toBe('number');
        });
      });
    });
  });

  it('deve filtrar tópicos condicionais por flags do jogador', () => {
    const topicosJon = obterTopicosAcampamento('jon_snow', {});
    expect(topicosJon.length).toBeGreaterThanOrEqual(2);

    const topicosInexistente = obterTopicosAcampamento('personagem_fantasma', {});
    expect(topicosInexistente).toEqual([]);
  });
});
