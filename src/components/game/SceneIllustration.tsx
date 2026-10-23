'use client';

import React from 'react';

export type SceneTheme =
  | 'mesa_pintada'
  | 'fogo_dragao'
  | 'corte_trono'
  | 'batalha_campal'
  | 'castelo_tempestade'
  | 'muralha_inverno'
  | 'as_gemeas'
  | 'cripta_winterfell'
  | 'floresta_assombrada';

export interface PropsSceneIllustration {
  nodeId?: string;
  regiaoId?: string;
  titulo?: string;
  localizacao?: string;
  temaOverride?: SceneTheme;
}

/**
 * Mapeamento determinístico e explícito de ilustrações por ID de nó narrativo.
 * Garante que momentos dramáticos cruciais recebam a estampa visual perfeita.
 */
export const MAPA_ILUSTRACOES_NOS: Record<string, SceneTheme> = {
  // --- Jornada 1: A Conquista de Aegon ---
  j1_a1_start: 'mesa_pintada',
  j1_a1_dragonstone: 'mesa_pintada',
  j1_a1_coroa: 'fogo_dragao',
  j1_a2_harrenhal: 'castelo_tempestade',
  j1_a2_tempestade: 'castelo_tempestade',
  j1_a2_campo_fogo: 'batalha_campal',
  j1_a3_norte: 'muralha_inverno',
  j1_a3_vale: 'castelo_tempestade',
  j1_a3_dorne: 'mesa_pintada',

  // --- Jornada 2: A Dança dos Dragões ---
  j2_a1_start: 'corte_trono',
  j2_a1_coroacao_verde: 'corte_trono',
  j2_a1_conselho_preto: 'mesa_pintada',
  j2_a2_tempestade_lucerys: 'castelo_tempestade',
  j2_a2_sangue_queijo: 'corte_trono',
  j2_a3_pouso_das_gralhas: 'fogo_dragao',
  j2_a3_batalha_goela: 'batalha_campal',
  j2_a3_olho_de_deus: 'fogo_dragao',
  j2_a4_fosso_dragoes: 'fogo_dragao',
  j2_a4_retorno_pedra_dragao: 'mesa_pintada',

  // --- Jornada 3: A Guerra dos Cinco Reis (Eddard Stark) ---
  j3_a1_start: 'cripta_winterfell',
  j3_a1_chegada_porto_real: 'corte_trono',
  j3_a1_pequeno_conselho: 'corte_trono',
  j3_a2_investigacao_armaria: 'corte_trono',
  j3_a2_bordel_chafaris: 'corte_trono',
  j3_a2_confronto_jaime: 'batalha_campal',
  j3_a3_trono_ferro_audiencia: 'corte_trono',
  j3_a3_confronto_cersei: 'corte_trono',
  j3_a3_morte_robert: 'corte_trono',
  j3_a3_golpe_salao: 'corte_trono',
  j3_a4_celas_negras: 'corte_trono',
  j3_a4_septo_baelor: 'corte_trono',
  j3_a4_destino_muralha: 'muralha_inverno',
  j3_a4_final_honra: 'corte_trono',

  // --- Jornada 4: Irmão Sem Nome (Patrulha da Noite) ---
  j4_a1_start: 'muralha_inverno',
  j4_a1_patrulha_muralha: 'muralha_inverno',
  j4_a1_castelo_negro: 'muralha_inverno',
  j4_a2_vila_toupeira: 'muralha_inverno',
  j4_a2_ponte_caveiras: 'batalha_campal',
  j4_a3_portao_gigantes: 'muralha_inverno',
  j4_a3_barril_piche: 'fogo_dragao',
  j4_a4_eleicao_corvos: 'muralha_inverno',
  j4_a4_floresta_assombrada: 'floresta_assombrada',
};

/**
 * Mapeamento determinístico de ilustrações por ID de região geográfica.
 */
export const MAPA_ILUSTRACOES_REGIOES: Record<string, SceneTheme> = {
  pedra_dragao: 'mesa_pintada',
  terras_da_coroa: 'corte_trono',
  porto_real: 'corte_trono',
  muralha: 'muralha_inverno',
  castelo_negro: 'muralha_inverno',
  topo_da_muralha: 'muralha_inverno',
  portao_e_tunel: 'muralha_inverno',
  floresta_assombrada: 'floresta_assombrada',
  vila_toupeira: 'muralha_inverno',
  a_dadiva: 'muralha_inverno',
  norte: 'cripta_winterfell',
  winterfell: 'cripta_winterfell',
  tridente: 'as_gemeas',
  terras_fluviais: 'as_gemeas',
  gemeas: 'as_gemeas',
  tempestade: 'castelo_tempestade',
  terras_da_tempestade: 'castelo_tempestade',
  vale: 'castelo_tempestade',
  campina: 'batalha_campal',
  ocidente: 'corte_trono',
  dorne: 'mesa_pintada',
};

export function detectarTemaCena(
  nodeId?: string,
  titulo?: string,
  localizacao?: string,
  regiaoId?: string
): SceneTheme {
  // 1. Resolução determinística por ID de nó
  if (nodeId && MAPA_ILUSTRACOES_NOS[nodeId]) {
    return MAPA_ILUSTRACOES_NOS[nodeId];
  }

  // 2. Resolução determinística por ID de região
  if (regiaoId && MAPA_ILUSTRACOES_REGIOES[regiaoId]) {
    return MAPA_ILUSTRACOES_REGIOES[regiaoId];
  }

  // 3. Resolução por correspondência de chave de região na localização
  if (localizacao) {
    const locNorm = localizacao.toLowerCase();
    for (const [chaveRegiao, tema] of Object.entries(MAPA_ILUSTRACOES_REGIOES)) {
      if (locNorm.includes(chaveRegiao.replace(/_/g, ' '))) {
        return tema;
      }
    }
  }

  // 4. Heurística contextual refinada (fallback elegante)
  const texto = `${nodeId || ''} ${titulo || ''} ${localizacao || ''}`.toLowerCase();

  if (
    texto.includes('represeiro') ||
    texto.includes('floresta assombrada') ||
    texto.includes('deuses antigos') ||
    texto.includes('bosque sagrado')
  ) {
    return 'floresta_assombrada';
  }

  if (
    texto.includes('cripta') ||
    texto.includes('winterfell') ||
    texto.includes('tumba') ||
    texto.includes('sepulcro')
  ) {
    return 'cripta_winterfell';
  }

  if (
    texto.includes('muralha') ||
    texto.includes('castelo negro') ||
    texto.includes('inverno') ||
    texto.includes('neve') ||
    texto.includes('gelo')
  ) {
    return 'muralha_inverno';
  }

  if (
    texto.includes('gemeas') ||
    texto.includes('gêmeas') ||
    texto.includes('casamento vermelho') ||
    texto.includes('castamere') ||
    texto.includes('frey')
  ) {
    return 'as_gemeas';
  }

  if (
    texto.includes('tempestade') ||
    texto.includes('harrenhal') ||
    texto.includes('durrandon') ||
    texto.includes('argilac') ||
    texto.includes('rochedo')
  ) {
    return 'castelo_tempestade';
  }

  if (
    texto.includes('trono') ||
    texto.includes('porto real') ||
    texto.includes('septo') ||
    texto.includes('baelor') ||
    texto.includes('conselho') ||
    texto.includes('audiencia')
  ) {
    return 'corte_trono';
  }

  if (
    texto.includes('fogo') ||
    texto.includes('dragao') ||
    texto.includes('dragão') ||
    texto.includes('balerion') ||
    texto.includes('vhagar') ||
    texto.includes('caraxes') ||
    texto.includes('sunfyre') ||
    texto.includes('meleys') ||
    texto.includes('vermithor')
  ) {
    return 'fogo_dragao';
  }

  if (
    texto.includes('batalha') ||
    texto.includes('campo') ||
    texto.includes('goela') ||
    texto.includes('tumbleton') ||
    texto.includes('murmurios') ||
    texto.includes('murmúrios') ||
    texto.includes('agua negra') ||
    texto.includes('água negra')
  ) {
    return 'batalha_campal';
  }

  return 'mesa_pintada';
}

export function SceneIllustration({
  nodeId,
  regiaoId,
  titulo,
  localizacao,
  temaOverride,
}: PropsSceneIllustration) {
  const tema = temaOverride || detectarTemaCena(nodeId, titulo, localizacao, regiaoId);

  return (
    <div
      className="w-full my-4 rounded-xl overflow-hidden border border-[var(--ouro)]/40 bg-[var(--pergaminho-1)] shadow-2xl relative motion-reduce:transition-none"
      role="img"
      aria-label={`Ilustração histórica em xilogravura: ${getTituloTema(tema)}`}
    >
      {/* Moldura de Xilogravura Iluminada */}
      <div className="absolute inset-0 border-2 border-[var(--borda)] pointer-events-none rounded-xl m-1" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/80 pointer-events-none" />

      {/* SVG da Cena */}
      <div className="w-full h-44 sm:h-52 flex items-center justify-center p-2">
        {tema === 'mesa_pintada' && <MesaPintadaSVG />}
        {tema === 'fogo_dragao' && <FogoDragaoSVG />}
        {tema === 'corte_trono' && <CorteTronoSVG />}
        {tema === 'batalha_campal' && <BatalhaCampalSVG />}
        {tema === 'castelo_tempestade' && <CasteloTempestadeSVG />}
        {tema === 'muralha_inverno' && <MuralhaInvernoSVG />}
        {tema === 'as_gemeas' && <AsGemeasSVG />}
        {tema === 'cripta_winterfell' && <CriptaWinterfellSVG />}
        {tema === 'floresta_assombrada' && <FlorestaAssombradaSVG />}
      </div>

      {/* Faixa Inferior de Legenda da Xilogravura */}
      <div className="relative px-4 py-2 border-t border-[var(--ouro)]/20 bg-[var(--pergaminho-2)] flex items-center justify-between text-[11px] font-cinzel">
        <span className="text-[var(--ouro)] uppercase tracking-widest font-semibold flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--ouro)]" />
          {getTituloTema(tema)}
        </span>
        <span className="text-[var(--tinta-fraca)] italic font-garamond">
          Gravura da Cidadela &bull; {localizacao || 'Westeros'}
        </span>
      </div>
    </div>
  );
}

function getTituloTema(tema: SceneTheme): string {
  switch (tema) {
    case 'mesa_pintada':
      return 'A Mesa Pintada & O Conselho de Guerra';
    case 'fogo_dragao':
      return 'Fogo de Dragão & Asas Valirianas';
    case 'corte_trono':
      return 'O Trono de Ferro & A Corte Real';
    case 'batalha_campal':
      return 'O Confronto de Aço & Estandartes';
    case 'castelo_tempestade':
      return 'A Fortaleza sob a Tempestade';
    case 'muralha_inverno':
      return 'O Muro de Gelo & O Olho do Lobo';
    case 'as_gemeas':
      return 'A Travessia das Gêmeas & O Banquete Sangrento';
    case 'cripta_winterfell':
      return 'As Criptas Ancestrais & Os Reis do Inverno';
    case 'floresta_assombrada':
      return 'O Bosque Sagrado & O Represeiro Ancestral';
  }
}

// ==========================================
// 1. A MESA PINTADA
// ==========================================
function MesaPintadaSVG() {
  return (
    <svg viewBox="0 0 600 220" className="w-full h-full max-h-52 text-[var(--ouro)]">
      <defs>
        <linearGradient id="goldGlow" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#C5A059" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#854D0E" stopOpacity="0.3" />
        </linearGradient>
      </defs>
      {/* Fundo de Pedra Escura */}
      <rect width="600" height="220" fill="#0E0C0B" />
      {/* Contorno da Mesa Pintada de Westeros */}
      <path
        d="M 120 40 Q 200 20 300 40 T 480 50 Q 520 120 460 170 T 260 180 Q 140 160 120 40 Z"
        fill="none"
        stroke="#C5A059"
        strokeWidth="2"
        strokeDasharray="4,2"
      />
      {/* Relevo e Rios Entalhados na Madeira */}
      <path d="M 280 60 Q 300 100 260 130 T 320 170" fill="none" stroke="#78350F" strokeWidth="1.5" />
      <path d="M 220 80 Q 270 95 340 90" fill="none" stroke="#78350F" strokeWidth="1" />
      {/* Peças Esculpidas de Dragão e Castelos */}
      <polygon points="300,75 315,95 285,95" fill="#DC2626" stroke="#991B1B" />
      <circle cx="240" cy="110" r="6" fill="#C5A059" />
      <circle cx="340" cy="130" r="5" fill="#3B82F6" />
      <circle cx="210" cy="65" r="7" fill="#E2E8F0" />
      {/* Chamas de Tochas e Velas no Salão */}
      <path d="M 80 110 Q 70 80 85 70 Q 100 80 90 110 Z" fill="#F59E0B" opacity="0.7" />
      <path d="M 520 110 Q 510 80 525 70 Q 540 80 530 110 Z" fill="#F59E0B" opacity="0.7" />
      {/* Linhas de Gravura Medieval */}
      <line x1="50" y1="200" x2="550" y2="200" stroke="#451A03" strokeWidth="1" />
      <text x="300" y="25" textAnchor="middle" fill="#C5A059" fontSize="11" fontFamily="serif" letterSpacing="4">
        TABULA PICTA &bull; DRAGONSTONE
      </text>
    </svg>
  );
}

// ==========================================
// 2. FOGO DE DRAGÃO
// ==========================================
function FogoDragaoSVG() {
  return (
    <svg viewBox="0 0 600 220" className="w-full h-full max-h-52">
      <rect width="600" height="220" fill="#0C0A09" />
      {/* Silhueta de Grande Dragão com Asas Abertas */}
      <path
        d="M 300 110 C 270 80 180 50 120 70 C 170 110 220 130 270 125 C 250 150 200 180 160 190 C 230 185 275 160 295 135 C 315 160 360 185 430 190 C 390 180 340 150 320 125 C 370 130 420 110 470 70 C 410 50 320 80 290 110 Z"
        fill="#1C1917"
        stroke="#EF4444"
        strokeWidth="1.5"
      />
      {/* Cabeça e Chifres */}
      <polygon points="295,95 305,95 300,70" fill="#991B1B" />
      <circle cx="297" cy="85" r="2" fill="#FDE047" />
      <circle cx="303" cy="85" r="2" fill="#FDE047" />
      {/* Erupção de Fogo Valiriano */}
      <path
        d="M 300 70 Q 250 30 180 25 Q 260 50 290 65 Q 350 40 430 20 Q 340 50 310 70 Z"
        fill="#F97316"
        opacity="0.85"
      />
      <circle cx="210" cy="35" r="3" fill="#FEF08A" />
      <circle cx="390" cy="30" r="4" fill="#FEF08A" />
      <text x="300" y="210" textAnchor="middle" fill="#EF4444" fontSize="10" fontFamily="serif" letterSpacing="4">
        IGNIS ET SANGUIS &bull; BALERION
      </text>
    </svg>
  );
}

// ==========================================
// 3. CORTE & TRONO DE FERRO
// ==========================================
function CorteTronoSVG() {
  return (
    <svg viewBox="0 0 600 220" className="w-full h-full max-h-52">
      <rect width="600" height="220" fill="#0B0B0E" />
      {/* Arcos Góticos do Grande Salão */}
      <path d="M 150 210 Q 150 80 230 40 Q 300 80 300 210" fill="none" stroke="#262626" strokeWidth="2" />
      <path d="M 300 210 Q 300 80 370 40 Q 450 80 450 210" fill="none" stroke="#262626" strokeWidth="2" />
      {/* O Trono de Ferro - Espadas Fundidas */}
      <path
        d="M 260 200 L 275 140 L 255 100 L 285 70 L 300 45 L 315 70 L 345 100 L 325 140 L 340 200 Z"
        fill="#171717"
        stroke="#737373"
        strokeWidth="1.5"
      />
      {/* Lâminas projetando-se do Trono */}
      <line x1="265" y1="90" x2="235" y2="60" stroke="#A3A3A3" strokeWidth="1.5" />
      <line x1="335" y1="90" x2="365" y2="60" stroke="#A3A3A3" strokeWidth="1.5" />
      <line x1="280" y1="65" x2="265" y2="35" stroke="#A3A3A3" strokeWidth="1.5" />
      <line x1="320" y1="65" x2="335" y2="35" stroke="#A3A3A3" strokeWidth="1.5" />
      {/* Estandarte Real */}
      <rect x="290" y="150" width="20" height="40" fill="#7F1D1D" stroke="#C5A059" />
      <text x="300" y="212" textAnchor="middle" fill="#C5A059" fontSize="10" fontFamily="serif" letterSpacing="4">
        THRONUS FERREUS &bull; REGIS CURIA
      </text>
    </svg>
  );
}

// ==========================================
// 4. BATALHA CAMPAL
// ==========================================
function BatalhaCampalSVG() {
  return (
    <svg viewBox="0 0 600 220" className="w-full h-full max-h-52">
      <rect width="600" height="220" fill="#0C0A09" />
      {/* Céu de Fumaça de Batalha */}
      <path d="M 0 100 Q 150 40 300 80 T 600 60 L 600 220 L 0 220 Z" fill="#1C1412" opacity="0.6" />
      {/* Floresta de Lanças e Piques */}
      {[80, 110, 140, 170, 200, 230, 260, 290, 320, 350, 380, 410, 440, 470, 500, 530].map((x, i) => (
        <line
          key={i}
          x1={x}
          y1="210"
          x2={x + (i % 2 === 0 ? 15 : -15)}
          y2={50 + (i % 3) * 15}
          stroke="#78716C"
          strokeWidth="1.5"
        />
      ))}
      {/* Estandartes Tremulando ao Vento */}
      <polygon points="180,60 220,70 180,80" fill="#B91C1C" stroke="#7F1D1D" />
      <polygon points="330,55 370,65 330,75" fill="#C5A059" stroke="#854D0E" />
      <polygon points="450,65 490,75 450,85" fill="#1E3A8A" stroke="#1E40AF" />
      {/* Silhueta de Cavaleiros em Carga */}
      <circle cx="280" cy="160" r="12" fill="#292524" />
      <circle cx="340" cy="165" r="14" fill="#292524" />
      <text x="300" y="210" textAnchor="middle" fill="#E7E5E4" fontSize="10" fontFamily="serif" letterSpacing="4">
        ACIES BELLICA &bull; FERRO ET IGNI
      </text>
    </svg>
  );
}

// ==========================================
// 5. CASTELO SOB TEMPESTADE
// ==========================================
function CasteloTempestadeSVG() {
  return (
    <svg viewBox="0 0 600 220" className="w-full h-full max-h-52">
      <rect width="600" height="220" fill="#090B10" />
      {/* Relâmpago no Céu */}
      <polyline
        points="320,10 300,50 330,70 290,130"
        fill="none"
        stroke="#E0F2FE"
        strokeWidth="2.5"
        filter="drop-shadow(0px 0px 4px #38BDF8)"
      />
      {/* Muralhas Ciclópicas e Torres Fortificadas */}
      <polygon points="120,210 120,100 180,100 180,210" fill="#1E293B" stroke="#475569" strokeWidth="1.5" />
      <polygon points="170,210 170,120 430,120 430,210" fill="#0F172A" stroke="#334155" strokeWidth="2" />
      <polygon points="420,210 420,90 490,90 490,210" fill="#1E293B" stroke="#475569" strokeWidth="1.5" />
      {/* Ameias das Torres */}
      <rect x="125" y="90" width="12" height="10" fill="#475569" />
      <rect x="155" y="90" width="12" height="10" fill="#475569" />
      <rect x="430" y="80" width="15" height="10" fill="#475569" />
      <rect x="465" y="80" width="15" height="10" fill="#475569" />
      {/* Ondas Quebrando nos Penhascos */}
      <path d="M 0 200 Q 150 180 300 200 T 600 195 L 600 220 L 0 220 Z" fill="#0C4A6E" opacity="0.6" />
      <text x="300" y="212" textAnchor="middle" fill="#BAE6FD" fontSize="10" fontFamily="serif" letterSpacing="4">
        CASTELLUM TEMPESTATIS &bull; END&apos;S BASTION
      </text>
    </svg>
  );
}

// ==========================================
// 6. A MURALHA & INVERNO
// ==========================================
function MuralhaInvernoSVG() {
  return (
    <svg viewBox="0 0 600 220" className="w-full h-full max-h-52">
      <rect width="600" height="220" fill="#07090E" />
      {/* Céu Ártico Pálido com Flocos */}
      <circle cx="150" cy="30" r="1.5" fill="#E0F2FE" />
      <circle cx="280" cy="20" r="2" fill="#E0F2FE" />
      <circle cx="430" cy="35" r="1.5" fill="#E0F2FE" />
      {/* O Grande Muro de Gelo (700 pés) */}
      <polygon
        points="0,60 600,45 600,180 0,195"
        fill="#1E293B"
        stroke="#93C5FD"
        strokeWidth="2"
      />
      {/* Fissuras e Relevo de Gelo Azul */}
      <line x1="180" y1="55" x2="195" y2="185" stroke="#60A5FA" strokeWidth="1" strokeDasharray="5,3" />
      <line x1="340" y1="50" x2="330" y2="180" stroke="#60A5FA" strokeWidth="1" strokeDasharray="8,4" />
      <line x1="470" y1="48" x2="490" y2="182" stroke="#60A5FA" strokeWidth="1" strokeDasharray="6,2" />
      {/* O Elevador de Madeira de Castelo Negro */}
      <line x1="240" y1="50" x2="240" y2="210" stroke="#78350F" strokeWidth="2" />
      <rect x="232" y="110" width="16" height="20" fill="#451A03" stroke="#92400E" />
      {/* Corvos Voando no Céu Frio */}
      <path d="M 120 30 Q 125 25 130 30 Q 135 25 140 30" fill="none" stroke="#F1F5F9" strokeWidth="1" />
      <path d="M 400 25 Q 405 20 410 25 Q 415 20 420 25" fill="none" stroke="#F1F5F9" strokeWidth="1" />
      <text x="300" y="210" textAnchor="middle" fill="#BFDBFE" fontSize="10" fontFamily="serif" letterSpacing="4">
        VALLUM GLACIALE &bull; CASTELUM NIGRUM
      </text>
    </svg>
  );
}

// ==========================================
// 7. AS GÊMEAS & O CASAMENTO VERMELHO
// ==========================================
function AsGemeasSVG() {
  return (
    <svg viewBox="0 0 600 220" className="w-full h-full max-h-52">
      <rect width="600" height="220" fill="#0C0A09" />
      {/* As Duas Torres Gêmeas */}
      <polygon points="100,210 100,60 170,60 170,210" fill="#1C1917" stroke="#78716C" strokeWidth="2" />
      <polygon points="430,210 430,60 500,60 500,210" fill="#1C1917" stroke="#78716C" strokeWidth="2" />
      {/* Ponte de Pedra Coberta sobre o Rio */}
      <rect x="170" y="110" width="260" height="30" fill="#292524" stroke="#78716C" strokeWidth="1.5" />
      {/* Arco Central da Ponte */}
      <path d="M 240 210 Q 300 140 360 210" fill="#0A0908" stroke="#78716C" strokeWidth="2" />
      {/* Águas Rápidas do Ramo Verde */}
      <path d="M 0 190 Q 300 170 600 190 L 600 220 L 0 220 Z" fill="#1E293B" opacity="0.7" />
      {/* Taça do Banquete e Adaga Envoltas em Sangue */}
      <path d="M 285 70 Q 300 100 315 70 Z" fill="#7F1D1D" stroke="#C5A059" strokeWidth="1" />
      <line x1="280" y1="80" x2="320" y2="80" stroke="#C5A059" strokeWidth="1.5" />
      <line x1="300" y1="60" x2="300" y2="105" stroke="#E2E8F0" strokeWidth="1.5" />
      <text x="300" y="210" textAnchor="middle" fill="#EF4444" fontSize="10" fontFamily="serif" letterSpacing="4">
        GEMINAE &bull; FLUVIUS SANGUINIS
      </text>
    </svg>
  );
}

// ==========================================
// 8. AS CRIPTAS ANCESTRAIS DE WINTERFELL
// ==========================================
function CriptaWinterfellSVG() {
  return (
    <svg viewBox="0 0 600 220" className="w-full h-full max-h-52">
      <rect width="600" height="220" fill="#0A0908" />
      {/* Arcos de Granito Gótico */}
      <path d="M 60 210 Q 60 50 160 50 Q 260 50 260 210" fill="none" stroke="#262220" strokeWidth="3" />
      <path d="M 340 210 Q 340 50 440 50 Q 540 50 540 210" fill="none" stroke="#262220" strokeWidth="3" />
      {/* Três Estátuas dos Reis do Inverno Sentados */}
      <g>
        {/* Estátua Central - Senhor de Winterfell */}
        <polygon points="275,190 285,120 315,120 325,190" fill="#1C1816" stroke="#4A423D" strokeWidth="1.5" />
        <circle cx="300" cy="105" r="12" fill="#2E2824" stroke="#4A423D" strokeWidth="1.5" />
        {/* Coroa de Ferro Pontiaguda com Bronze */}
        <polygon points="290,95 295,88 300,95 305,88 310,95" fill="#8B7355" />
        {/* Espada de Ferro Longa sobre os Joelhos */}
        <rect x="260" y="155" width="80" height="4" fill="#78716C" stroke="#292524" />
        {/* Lobo Gigante de Pedra Deitado aos Pés */}
        <path d="M 270 195 Q 300 180 330 195 L 335 205 L 265 205 Z" fill="#141210" stroke="#443E38" strokeWidth="1" />
        <circle cx="280" cy="190" r="2.5" fill="#E2E8F0" />
      </g>
      {/* Facho de Tocha de Parede */}
      <path d="M 120 120 Q 115 100 125 90 Q 135 100 130 120 Z" fill="#D97706" opacity="0.8" />
      <line x1="125" y1="120" x2="125" y2="140" stroke="#78350F" strokeWidth="2" />
      <text x="300" y="210" textAnchor="middle" fill="#C5A059" fontSize="10" fontFamily="serif" letterSpacing="4">
        CRYPTAE WINTERFELLENSES &bull; REGES HIEMIS
      </text>
    </svg>
  );
}

// ==========================================
// 9. O BOSQUE SAGRADO & O REPRESEIRO
// ==========================================
function FlorestaAssombradaSVG() {
  return (
    <svg viewBox="0 0 600 220" className="w-full h-full max-h-52">
      <rect width="600" height="220" fill="#06090D" />
      {/* Lua Pálida do Norte */}
      <circle cx="480" cy="40" r="22" fill="#E0F2FE" opacity="0.25" />
      {/* Silhueta de Pinheiros Nevados ao Fundo */}
      <polygon points="80,180 100,100 120,180" fill="#0C1520" />
      <polygon points="140,190 165,110 190,190" fill="#0A121C" />
      <polygon points="420,185 440,95 460,185" fill="#0A121C" />
      <polygon points="490,195 515,115 540,195" fill="#0C1520" />
      {/* Manto de Neve Suave */}
      <path d="M 0 190 Q 300 170 600 190 L 600 220 L 0 220 Z" fill="#132030" />
      {/* O Represeiro Ancestral (Tronco de Casca Branca) */}
      <path
        d="M 285 200 Q 275 140 250 80 Q 290 100 300 70 Q 310 100 350 80 Q 325 140 315 200 Z"
        fill="#CBD5E1"
        stroke="#94A3B8"
        strokeWidth="2"
      />
      {/* Rosto Talhado Chorando Seiva Vermelha */}
      <circle cx="294" cy="130" r="2.5" fill="#991B1B" />
      <circle cx="306" cy="130" r="2.5" fill="#991B1B" />
      <line x1="294" y1="133" x2="294" y2="150" stroke="#7F1D1D" strokeWidth="1.5" />
      <line x1="306" y1="133" x2="306" y2="150" stroke="#7F1D1D" strokeWidth="1.5" />
      <ellipse cx="300" cy="155" rx="3.5" ry="5" fill="#7F1D1D" />
      {/* Folhagem Carmesim em Forma de Mão */}
      <circle cx="250" cy="70" r="18" fill="#DC2626" opacity="0.85" />
      <circle cx="300" cy="55" r="22" fill="#B91C1C" opacity="0.9" />
      <circle cx="350" cy="70" r="18" fill="#DC2626" opacity="0.85" />
      {/* Folhas Rubras caindo na Neve */}
      <circle cx="230" cy="120" r="2" fill="#EF4444" />
      <circle cx="360" cy="135" r="2" fill="#EF4444" />
      <circle cx="280" cy="180" r="2.5" fill="#DC2626" />
      <circle cx="330" cy="175" r="2.5" fill="#DC2626" />
      <text x="300" y="210" textAnchor="middle" fill="#EF4444" fontSize="10" fontFamily="serif" letterSpacing="4">
        ARBOR COR REGNI &bull; SILVA INCANTATA
      </text>
    </svg>
  );
}
