import type { Config } from 'tailwindcss';

const config: Config = {
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-mplus-rounded)', 'sans-serif'],
        time: ['var(--font-share-tech-mono)', 'monospace'],
      },
    },
  },
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  plugins: [],
};

export default config;
