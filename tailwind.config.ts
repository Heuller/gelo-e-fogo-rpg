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
        valyrian: {
          dark: '#0a0a0c',
          steel: '#2b2d42',
          gold: '#c59b27',
          blood: '#8b0000',
          flame: '#e63946',
        },
      },
    },
  },
  plugins: [],
};
export default config;
