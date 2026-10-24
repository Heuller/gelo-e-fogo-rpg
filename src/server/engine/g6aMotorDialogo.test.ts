import { describe, it, expect } from 'vitest';
import { comporCena, avaliarCondicao } from './composicaoCena';
import { JORNADA_V2_FIXTURE } from '@/server/journeys/__tests__/fixtures/jornadaV2Fixture';
import { FichaPersonagem, WorldState } from './rpgEngine';
import { analisarGrafoAvancado } from './storyLinterPlus';
import { executarTurno } from './turno';
import { getSaveRepository } from '@/server/saves';

const FICHA_BASE: FichaPersonagem = {
  id: 'jogador_teste',
  nome: 'Brandon de Winterfell',
  origem: 'nobreza_westerosi',
  inspiracao: 2,
  atributos: {
    comando: 3,
    furia: 4,
    astucia: 2,
    cortesia: 2,
    erudicao: 2,
    pressagio: 2,
  },
  estado: { sangue: 10, compostura: 10, honra: 5 },
  cicatrizes: [],
  segredos: [],
  companheiros: {},
};

const WORLD_STATE_BASE: WorldState = {
  reputacaoCasas: {},
  flagsBorboleta: {},
  marcosConcluidos: [],
};

describe('G6A — Motor de Consequência e Diálogo (Esquema v2)', () => {
  describe('Composição Determinística no Servidor (comporCena)', () => {
    it('deve compor blocos narrativos respeitando funções e condições lógicas', () => {
      const nodeFinal = JORNADA_V2_FIXTURE.nodes['cena_final_v2'];

      // Estado 1: com marca_diplomacia
      const cenaDiplomatica = comporCena(nodeFinal, {
        ficha: FICHA_BASE,
        worldState: {
          ...WORLD_STATE_BASE,
          flagsBorboleta: { marca_diplomacia: true },
        },
      });

      expect(cenaDiplomatica.textoPrincipal).toContain('O fogo crepita nas lareiras de pedra bruta');
      expect(cenaDiplomatica.textoPrincipal).toContain('Os lordes o recebem como um nobre negociador');
      expect(cenaDiplomatica.textoPrincipal).not.toContain('Um murmúrio receoso percorre os bancos');

      // Estado 2: com marca_intimidou
      const cenaIntimidada = comporCena(nodeFinal, {
        ficha: FICHA_BASE,
        worldState: {
          ...WORLD_STATE_BASE,
          flagsBorboleta: { marca_intimidou: true },
        },
      });

      expect(cenaIntimidada.textoPrincipal).toContain('Um murmúrio receoso percorre os bancos');
      expect(cenaIntimidada.textoPrincipal).not.toContain('Os lordes o recebem como um nobre negociador');
    });

    it('deve compor diálogos com nomes resolvidos, papéis e falas condicionais', () => {
      const nodeDialogo = JORNADA_V2_FIXTURE.nodes['dialogo_portao'];

      // Caso A: Sem ter ouvido a estratégia no conselho
      const cenaA = comporCena(nodeDialogo, {
        ficha: FICHA_BASE,
        worldState: WORLD_STATE_BASE,
      });

      expect(cenaA.falas).toBeDefined();
      expect(cenaA.falas?.length).toBe(2);
      expect(cenaA.falas?.[0].nomeQuem).toBe('Ser Willem');
      expect(cenaA.falas?.[0].papel).toBe('Capitão da Guarda da Muralha');
      expect(cenaA.falas?.[1].nomeQuem).toBe('Brandon de Winterfell');
      expect(cenaA.falas?.[1].texto).toContain('Apenas alguém que deseja cruzar a soleira');

      // Caso B: Tendo ouvido a estratégia no conselho
      const cenaB = comporCena(nodeDialogo, {
        ficha: FICHA_BASE,
        worldState: {
          ...WORLD_STATE_BASE,
          flagsBorboleta: { marca_ouviu_estrategia: true },
        },
      });

      expect(cenaB.falas?.length).toBe(2);
      expect(cenaB.falas?.[1].texto).toContain('Trago a palavra formal do Conselho');
    });

    it('deve identificar tópicos já explorados em hubs de conversa', () => {
      const nodeHub = JORNADA_V2_FIXTURE.nodes['hub_conselho_pedra'];

      const cena = comporCena(nodeHub, {
        ficha: FICHA_BASE,
        worldState: {
          ...WORLD_STATE_BASE,
          flagsBorboleta: { escolha_feita_topico_estrategia: true },
        },
      });

      const topicoEstrategia = cena.escolhas.find((e) => (e as { id: string }).id === 'topico_estrategia');
      const topicoSuprimentos = cena.escolhas.find((e) => (e as { id: string }).id === 'topico_suprimentos');

      expect(topicoEstrategia?.jaExplorada).toBe(true);
      expect(topicoSuprimentos?.jaExplorada).toBe(false);
    });
  });

  describe('Validação no Linter v2 (analisarGrafoAvancado)', () => {
    it('deve validar a jornada fixture sem avisos críticos de v2', () => {
      const relatorio = analisarGrafoAvancado(JORNADA_V2_FIXTURE, undefined, true);
      const avisosV2 = relatorio.avisos.filter((a) => a.tipo.endsWith('_V2'));

      expect(avisosV2).toEqual([]);
      expect(relatorio.estatisticas.avisosV2).toBe(0);
    });

    it('deve alertar sobre hub sem opções de saída', () => {
      const grafoInvalido = JSON.parse(JSON.stringify(JORNADA_V2_FIXTURE));
      // Remove a escolha de saída do hub
      grafoInvalido.nodes['hub_conselho_pedra'].escolhas = grafoInvalido.nodes[
        'hub_conselho_pedra'
      ].escolhas.filter((e: { permanece?: boolean }) => e.permanece);

      const relatorio = analisarGrafoAvancado(grafoInvalido, undefined, true);
      const avisoHub = relatorio.avisos.find((a) => a.tipo === 'HUB_SEM_SAIDA_V2');

      expect(avisoHub).toBeDefined();
      expect(avisoHub?.mensagem).toContain('deve possuir pelo menos uma escolha de saída');
    });

    it('deve alertar sobre diálogo sem interlocutores estruturados', () => {
      const grafoInvalido = JSON.parse(JSON.stringify(JORNADA_V2_FIXTURE));
      delete grafoInvalido.nodes['dialogo_portao'].interlocutores;

      const relatorio = analisarGrafoAvancado(grafoInvalido, undefined, true);
      const avisoDialogo = relatorio.avisos.find(
        (a) => a.tipo === 'DIALOGO_SEM_INTERLOCUTORES_OU_FALAS_V2'
      );

      expect(avisoDialogo).toBeDefined();
    });
  });

  describe('Execução e Transição de Turno com Desfechos e Hubs', () => {
    it('deve permanecer no hub, aplicar marcas e persistir a ponte do tópico explorado', async () => {
      const repo = getSaveRepository();
      const userId = 'user_g6a_test';
      const slotRes = await repo.criarSlot({
        userId,
        jornadaId: 'jornada_teste_v2',
        slotNumber: 99,
        currentNodeId: 'hub_conselho_pedra',
        characterSheet: FICHA_BASE,
        worldState: WORLD_STATE_BASE,
      });

      expect(slotRes.ok).toBe(true);
      if (!slotRes.ok) return;

      // Executa o primeiro tópico do hub
      const resTurno = await executarTurno({
        userId,
        slotId: slotRes.valor.id,
        escolhaId: 'topico_estrategia',
        versaoEsperada: slotRes.valor.versao,
        nodeCustomizado: JORNADA_V2_FIXTURE.nodes['hub_conselho_pedra'],
        proximoNodeCustomizado: JORNADA_V2_FIXTURE.nodes['hub_conselho_pedra'],
      });

      // Permanece no mesmo nó (hub)
      expect(resTurno.proximoNode.id).toBe('hub_conselho_pedra');
      // Ponte da consequência devolvida
      expect(resTurno.ponte).toContain('O meistre aponta no mapa as passagens do desfiladeiro');
      // Marcas recebidas
      expect(resTurno.marcasRecebidas).toContain('marca_ouviu_estrategia');
      // Flag de tópico único registrada
      expect(resTurno.novoSlot.worldState.flagsBorboleta['escolha_feita_topico_estrategia']).toBe(true);
      expect(resTurno.novoSlot.worldState.flagsBorboleta['marca_ouviu_estrategia']).toBe(true);

      // Persistido no histórico do turn_event
      const ultimoTurno = resTurno.novoSlot.turnHistory[resTurno.novoSlot.turnHistory.length - 1];
      expect(ultimoTurno.resultado.ponte).toContain('O meistre aponta no mapa');
      expect((ultimoTurno.resultado.marcas as string[])).toContain('marca_ouviu_estrategia');
    });

    it('deve resolver teste com desfechos múltiplos por faixa de rolagem', async () => {
      const repo = getSaveRepository();
      const userId = 'user_g6a_test_2';
      const slotRes = await repo.criarSlot({
        userId,
        jornadaId: 'jornada_teste_v2',
        slotNumber: 98,
        currentNodeId: 'dialogo_portao',
        characterSheet: FICHA_BASE,
        worldState: WORLD_STATE_BASE,
      });

      if (!slotRes.ok) return;

      // Sucesso no teste de furia: dados [4, 3] + 4 = 11 vs DC 10 -> SUCESSO
      const resTurnoSuc = await executarTurno({
        userId,
        slotId: slotRes.valor.id,
        escolhaId: 'escolha_ameaca',
        versaoEsperada: slotRes.valor.versao,
        dadosFixos: [4, 3],
        nodeCustomizado: JORNADA_V2_FIXTURE.nodes['dialogo_portao'],
        proximoNodeCustomizado: JORNADA_V2_FIXTURE.nodes['cena_final_v2'],
      });

      expect(resTurnoSuc.resultadoRolagem?.resultado).toBe('SUCESSO');
      expect(resTurnoSuc.ponte).toContain('O seu brado ecoa pelas pedras cinzentas');
      expect(resTurnoSuc.marcasRecebidas).toContain('marca_intimidou');
      expect(resTurnoSuc.novoSlot.worldState.flagsBorboleta['marca_intimidou']).toBe(true);
    });
  });
});
