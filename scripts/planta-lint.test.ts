import { describe, it, expect } from 'vitest';
import { validarPlantaAto } from './planta-lint';

describe('G6C — Validador de Plantas de Ato (planta-lint)', () => {
  it('deve validar com sucesso uma planta que cumpre o diamante com rotas (§6C.1)', () => {
    const plantaValida = `
# Planta do Ato I: O Punho dos Primeiros Homens e a Fuga na Neve

## 1. Abertura (1 a 3 cenas)
- **id**: j4_a1_cinzas_do_punho
  - tipo: narracao
  - rota: comum
  - objetivo_dramatico: Sobreviver ao massacre das criaturas no Punho e encontrar irmãos vivos
  - marcas_gravadas: [sobreviveu_ao_punho, ferida_da_neve]
  - marcas_lidas: []
  - origem: canonica
  - fonte: A Tormenta de Espadas, Prólogo & Samwell I

- **id**: j4_a1_reuniao_sobreviventes_hub
  - tipo: hub
  - rota: comum
  - objetivo_dramatico: Conversar com os irmãos sobreviventes (Grenn, Chett, Small Paul) e avaliar suprimentos
  - marcas_gravadas: [aliado_grenn, desconfianca_chett, protegeu_paul]
  - marcas_lidas: []
  - origem: canonica
  - fonte: A Tormenta de Espadas, Samwell I

## 2. Encruzilhada (1 cena decisora estrutural)
- **id**: j4_a1_encruzilhada_retirada
  - tipo: hub
  - rota: comum
  - objetivo_dramatico: O Senhor Comandante Mormont ordena a retirada; decidir o papel do protagonista
  - marcas_gravadas: [papel_vanguarda, papel_flanco_batedores, papel_retaguarda_cargas]
  - marcas_lidas: []
  - origem: canonica
  - fonte: A Tormenta de Espadas, Samwell I

## 3. Rotas (2 ou 3 rotas com 3 a 6 cenas cada)
### Rota A: Vanguarda com o Velho Urso
- **id**: j4_a1_rota_vanguarda_trilha
  - tipo: narracao
  - rota: vanguarda
  - objetivo_dramatico: Abrir caminho pela nevasca protegendo Jeor Mormont
  - marcas_gravadas: [abriu_trilha_neve, confianca_mormont]
  - marcas_lidas: []
  - origem: original
  - fonte: A Tormenta de Espadas, Samwell I (dramatização de rota)

- **id**: j4_a1_rota_vanguarda_emboscada
  - tipo: dialogo
  - rota: vanguarda
  - objetivo_dramatico: Enfrentar batedores selvagens e criaturas dispersas na floresta
  - marcas_gravadas: [salvou_batedor_patrulha]
  - marcas_lidas: []
  - origem: original
  - fonte: A Tormenta de Espadas, Samwell I

- **id**: j4_a1_rota_vanguarda_acampamento
  - tipo: narracao
  - rota: vanguarda
  - objetivo_dramatico: Manter as tochas acesas e a disciplina na longa noite
  - marcas_gravadas: [fogo_preservado]
  - marcas_lidas: []
  - origem: original
  - fonte: A Tormenta de Espadas, Samwell I

### Rota B: Flanco dos Batedores com Grenn
- **id**: j4_a1_rota_batedores_rastros
  - tipo: narracao
  - rota: batedores
  - objetivo_dramatico: Rastrear criaturas nos flancos da hoste
  - marcas_gravadas: [rastreou_criaturas]
  - marcas_lidas: []
  - origem: original
  - fonte: A Tormenta de Espadas, Samwell I

- **id**: j4_a1_rota_batedores_confronto
  - tipo: dialogo
  - rota: batedores
  - objetivo_dramatico: Emboscada rápida na ravina congelada
  - marcas_gravadas: [emboscada_ravina_vencida]
  - marcas_lidas: []
  - origem: original
  - fonte: A Tormenta de Espadas, Samwell I

- **id**: j4_a1_rota_batedores_resgate
  - tipo: narracao
  - rota: batedores
  - objetivo_dramatico: Resgatar um irmão caído na neve profunda
  - marcas_gravadas: [irmao_resgatado_neve]
  - marcas_lidas: []
  - origem: original
  - fonte: A Tormenta de Espadas, Samwell I

## 4. Peça de Cenário (3 a 5 cenas canônicas fixas)
- **id**: j4_a1_marcha_exaustao_nevasca
  - tipo: peca_de_cenario
  - rota: comum
  - objetivo_dramatico: A travessia desesperada pela nevasca em direção à Fortaleza de Craster
  - marcas_gravadas: [resistiu_ao_frio_extremo]
  - marcas_lidas: [ferida_da_neve, fogo_preservado]
  - origem: canonica
  - fonte: A Tormenta de Espadas, Samwell I & II

- **id**: j4_a1_morte_cavalo_paul
  - tipo: peca_de_cenario
  - rota: comum
  - objetivo_dramatico: Small Paul e o colapso dos animais de carga
  - marcas_gravadas: [carregou_peso_paul]
  - marcas_lidas: [protegeu_paul]
  - origem: canonica
  - fonte: A Tormenta de Espadas, Samwell I

- **id**: j4_a1_chegada_fortaleza_craster
  - tipo: peca_de_cenario
  - rota: comum
  - objetivo_dramatico: O alívio sombrio ao avistar as paliçadas e os chiqueiros de Craster
  - marcas_gravadas: [avistou_fortaleza_craster]
  - marcas_lidas: [sobreviveu_ao_punho, confianca_mormont]
  - origem: canonica
  - fonte: A Tormenta de Espadas, Samwell II

## 5. Acerto de Contas (1 ou 2 cenas)
- **id**: j4_a1_acerto_de_contas_craster
  - tipo: acerto_de_contas
  - rota: comum
  - objetivo_dramatico: O balanço do massacre: Mormont conta os vivos e avalia as feridas e alianças
  - marcas_gravadas: [ato1_concluido]
  - marcas_lidas: [sobreviveu_ao_punho, ferida_da_neve, aliado_grenn, desconfianca_chett, protegeu_paul, confianca_mormont, fogo_preservado, irmao_resgatado_neve]
  - origem: canonica
  - fonte: A Tormenta de Espadas, Samwell II
`;

    const resultado = validarPlantaAto(plantaValida);
    expect(resultado.valido).toBe(true);
    expect(resultado.erros.length).toBe(0);
    expect(resultado.estatisticas.totalNos).toBe(13);
    expect(resultado.estatisticas.nosPorEtapa.abertura).toBe(2);
    expect(resultado.estatisticas.nosPorEtapa.encruzilhada).toBe(1);
    expect(Object.keys(resultado.estatisticas.nosPorEtapa.rotas).length).toBe(2);
    expect(resultado.estatisticas.nosPorEtapa.pecaDeCenario).toBe(3);
    expect(resultado.estatisticas.nosPorEtapa.acertoDeContas).toBe(1);
    expect(resultado.estatisticas.marcasLidasNoAcerto).toBe(8);
  });

  it('deve validar com sucesso a planta oficial do Ato I da Jornada 4 (ato1_planta.md)', async () => {
    const fs = await import('fs');
    const path = await import('path');
    const caminhoPlanta = path.resolve(process.cwd(), 'docs/propostas/patrulha_muralha/ato1_planta.md');
    const conteudo = fs.readFileSync(caminhoPlanta, 'utf-8');

    const res = validarPlantaAto(conteudo);

    if (res.erros.length > 0) {
      console.error('Erros na planta oficial:', res.erros);
    }
    expect(res.valido).toBe(true);
    expect(res.erros.length).toBe(0);
    expect(res.estatisticas.totalNos).toBe(13);
    expect(res.estatisticas.marcasLidasNoAcerto).toBe(8);
  });
});
