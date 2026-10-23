import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        pagina: 'var(--pagina)',
        pergaminho: {
          1: 'var(--pergaminho-1)',
          2: 'var(--pergaminho-2)',
          3: 'var(--pergaminho-3)',
          4: 'var(--pergaminho-4)',
        },
        borda: 'var(--borda)',
        tinta: {
          DEFAULT: 'var(--tinta)',
          suave: 'var(--tinta-suave)',
          fraca: 'var(--tinta-fraca)',
        },
        ouro: {
          DEFAULT: 'var(--ouro)',
          claro: 'var(--ouro-claro)',
          escuro: 'var(--ouro-escuro)',
        },
        carmim: {
          DEFAULT: 'var(--carmim)',
          brilho: 'var(--carmim-brilho)',
        },
        'perigo-texto': 'var(--perigo-texto)',

        // Aliases legados preservados temporariamente
        grimdark: {
          bg: 'var(--pergaminho-1)',
          panel: 'var(--pergaminho-3)',
          border: 'var(--borda)',
          gold: 'var(--ouro)',
          'gold-light': 'var(--ouro-claro)',
          'gold-dark': 'var(--ouro-escuro)',
          parchment: 'var(--tinta)',
          'parchment-muted': 'var(--tinta-suave)',
          crimson: 'var(--carmim)',
          'crimson-glow': 'var(--carmim-brilho)',
        },
        valyrian: {
          dark: '#0a0a0c',
          steel: '#2b2d42',
          gold: '#c59b27',
          blood: '#8b0000',
          flame: '#e63946',
        },
      },
      fontSize: {
        xs: ['0.8125rem', { lineHeight: '1.25rem' }], // Piso de 13px
        sm: ['0.875rem', { lineHeight: '1.35rem' }],   // 14px
        base: ['1rem', { lineHeight: '1.6rem' }],       // 16px
        lg: ['1.125rem', { lineHeight: '1.75rem' }],   // 18px
        xl: ['1.25rem', { lineHeight: '1.85rem' }],    // 20px
        '2xl': ['1.5rem', { lineHeight: '2rem' }],      // 24px
        '3xl': ['2rem', { lineHeight: '2.5rem' }],      // 32px
        '4xl': ['2.5rem', { lineHeight: '3rem' }],      // 40px
      },
      borderRadius: {
        sm: 'var(--r-sm)',
        md: 'var(--r-md)',
        lg: 'var(--r-lg)',
      },
      zIndex: {
        sticky: 'var(--z-sticky)',
        gaveta: 'var(--z-gaveta)',
        overlay: 'var(--z-overlay-dado)',
        toast: 'var(--z-toast)',
      },
      fontFamily: {
        cinzel: ['var(--font-cinzel)', 'serif'],
        garamond: ['var(--font-eb-garamond)', 'Georgia', 'serif'],
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        grimdark: '0 8px 32px 0 rgba(0, 0, 0, 0.8)',
        'gold-glow': '0 0 15px rgba(197, 160, 89, 0.25)',
        'crimson-glow': '0 0 20px rgba(139, 30, 30, 0.4)',
      },
    },
  },
  plugins: [],
};

export default config;
