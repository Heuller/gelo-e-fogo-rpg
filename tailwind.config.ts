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
        grimdark: {
          bg: '#12100E',
          panel: '#1C1815',
          border: '#2D2620',
          gold: '#C5A059',
          'gold-light': '#DFC27D',
          'gold-dark': '#9B7A35',
          parchment: '#E6DEC8',
          'parchment-muted': '#A69E89',
          crimson: '#8B1E1E',
          'crimson-glow': '#A82E2E',
        },
        valyrian: {
          dark: '#0a0a0c',
          steel: '#2b2d42',
          gold: '#c59b27',
          blood: '#8b0000',
          flame: '#e63946',
        },
      },
      fontFamily: {
        cinzel: ['var(--font-cinzel)', 'serif'],
        garamond: ['var(--font-eb-garamond)', 'Georgia', 'serif'],
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'grimdark': '0 8px 32px 0 rgba(0, 0, 0, 0.8)',
        'gold-glow': '0 0 15px rgba(197, 160, 89, 0.25)',
        'crimson-glow': '0 0 20px rgba(139, 30, 30, 0.4)',
      },
    },
  },
  plugins: [],
};
export default config;
