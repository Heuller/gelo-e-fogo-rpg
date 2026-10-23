import { describe, it, expect, beforeEach } from 'vitest';
import { useJogoStore } from '../jogoStore';

describe('useJogoStore (Zustand Store do Cliente)', () => {
  beforeEach(() => {
    useJogoStore.setState({
      slot: null,
      node: null,
      ficha: null,
      worldState: null,
      historico: [],
      versao: 0,
      textoCena: '',
      textoMestre: null,
      statusMestre: 'idle',
      modoIA: true,
      resultadoRolagem: null,
      ultimoNodeId: null,
      ultimaEscolhaId: null,
      statusSave: 'salvo',
      avisos: [],
      carregando: false,
      abaLateral: 'mapa',
      colunaFichaAberta: true,
      colunaMundoAberta: true,
    });
  });

  it('deve inicializar com os estados padrão corretos', () => {
    const state = useJogoStore.getState();
    expect(state.statusSave).toBe('salvo');
    expect(state.modoIA).toBe(true);
    expect(state.abaLateral).toBe('mapa');
    expect(state.colunaFichaAberta).toBe(true);
    expect(state.colunaMundoAberta).toBe(true);
  });

  it('deve alternar abas e visibilidade de colunas corretamente', () => {
    const store = useJogoStore.getState();

    store.setAbaLateral('dados');
    expect(useJogoStore.getState().abaLateral).toBe('dados');

    store.toggleColunaFicha();
    expect(useJogoStore.getState().colunaFichaAberta).toBe(false);

    store.toggleColunaMundo();
    expect(useJogoStore.getState().colunaMundoAberta).toBe(false);

    store.toggleModoIA();
    expect(useJogoStore.getState().modoIA).toBe(false);
  });

  it('deve gerenciar avisos flutuantes (adicionar e descartar)', () => {
    const store = useJogoStore.getState();

    store.adicionarAviso('Visenya aprova (+15)');
    store.adicionarAviso('Aliança Stark desbloqueada');
    expect(useJogoStore.getState().avisos).toHaveLength(2);

    store.descartarAviso(0);
    const atualizados = useJogoStore.getState().avisos;
    expect(atualizados).toHaveLength(1);
    expect(atualizados[0]).toBe('Aliança Stark desbloqueada');
  });
});
