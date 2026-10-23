import { describe, it, expect } from 'vitest';
import { identificarPerfilRegional, audioManager } from '../audioManager';

describe('audioManager - Paisagens Sonoras Sintéticas de Westeros', () => {
  it('deve identificar perfil "inverno" para regiões do Norte e Muralha', () => {
    expect(identificarPerfilRegional('muralha')).toBe('inverno');
    expect(identificarPerfilRegional('castelo_negro')).toBe('inverno');
    expect(identificarPerfilRegional('Castelo Negro - Pátio')).toBe('inverno');
    expect(identificarPerfilRegional('Winterfell - Bosque Sagrado')).toBe('inverno');
    expect(identificarPerfilRegional('floresta_assombrada')).toBe('inverno');
  });

  it('deve identificar perfil "fogo" para Pedra do Dragão e Valíria', () => {
    expect(identificarPerfilRegional('pedra_dragao')).toBe('fogo');
    expect(identificarPerfilRegional('Pedra do Dragão - Salão')).toBe('fogo');
    expect(identificarPerfilRegional('Fogo e Sangue')).toBe('fogo');
    expect(identificarPerfilRegional('Covil do Dragão')).toBe('fogo');
  });

  it('deve identificar perfil "corte" para Porto Real e o Trono de Ferro', () => {
    expect(identificarPerfilRegional('porto_real')).toBe('corte');
    expect(identificarPerfilRegional('Porto Real - Fortaleza Vermelha')).toBe('corte');
    expect(identificarPerfilRegional('O Grande Septo de Baelor')).toBe('corte');
    expect(identificarPerfilRegional('Sala do Trono')).toBe('corte');
  });

  it('deve identificar perfil "tempestade" para Ponta Tempestade e Batalhas', () => {
    expect(identificarPerfilRegional('tempestade')).toBe('tempestade');
    expect(identificarPerfilRegional('Ponta Tempestade')).toBe('tempestade');
    expect(identificarPerfilRegional('Harrenhal sob tempestade')).toBe('tempestade');
    expect(identificarPerfilRegional('Batalha da Goela')).toBe('tempestade');
  });

  it('deve adotar perfil "padrao" para regiões genéricas ou vazias', () => {
    expect(identificarPerfilRegional(undefined)).toBe('padrao');
    expect(identificarPerfilRegional('')).toBe('padrao');
    expect(identificarPerfilRegional('Estrada do Rei')).toBe('padrao');
  });

  it('deve operar em ambiente Node/SSR sem lançar exceções não tratadas', () => {
    expect(audioManager.isAmbienteAtivo()).toBe(false);
    expect(() => audioManager.tocarSomDados()).not.toThrow();
    expect(() => audioManager.tocarSomPagina()).not.toThrow();
    expect(() => audioManager.tocarSomEscolha()).not.toThrow();
    expect(() => audioManager.pararAmbiente()).not.toThrow();
    expect(() => audioManager.atualizarRegiao('muralha')).not.toThrow();
  });
});
