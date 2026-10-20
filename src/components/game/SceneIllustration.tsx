'use client';

import React from 'react';

export type SceneTheme =
  | 'mesa_pintada'
  | 'fogo_dragao'
  | 'corte_trono'
  | 'batalha_campal'
  | 'castelo_tempestade'
  | 'muralha_inverno'
  | 'as_gemeas';

interface PropsSceneIllustration {
  nodeId?: string;
  titulo?: string;
  localizacao?: string;
  temaOverride?: SceneTheme;
}

export function detectarTemaCena(
  nodeId?: string,
  titulo?: string,
  localizacao?: string
): SceneTheme {
  const texto = `${nodeId || ''} ${titulo || ''} ${localizacao || ''}`.toLowerCase();

  if (
    texto.includes('muralha') ||
    texto.includes('castelo negro') ||
    texto.includes('winterfell') ||
    texto.includes('inverno') ||
    texto.includes('lobo') ||
    texto.includes('neve')
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
  titulo,
  localizacao,
  temaOverride,
}: PropsSceneIllustration) {
  const tema = temaOverride || detectarTemaCena(nodeId, titulo, localizacao);

  return (
    <div className="w-full my-4 rounded-xl overflow-hidden border border-[#C5A059]/40 bg-[#0c0a09] shadow-2xl relative">
      {/* Moldura de Xilogravura Iluminada */}
      <div className="absolute inset-0 border-2 border-[#1A1412] pointer-events-none rounded-xl m-1" />
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
      </div>

      {/* Faixa Inferior de Legenda da Xilogravura */}
      <div className="relative px-4 py-2 border-t border-[#C5A059]/20 bg-[#14100E]/90 flex items-center justify-between text-[11px] font-cinzel">
        <span className="text-[#C5A059] uppercase tracking-widest font-semibold flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059]" />
          {getTituloTema(tema)}
        </span>
        <span className="text-[#8C827A] italic font-garamond">
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
  }
}

// ==========================================
// 1. A MESA PINTADA
// ==========================================
function MesaPintadaSVG() {
  return (
    <svg viewBox="0 0 600 220" className="w-full h-full max-h-52 text-[#C5A059]">
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
