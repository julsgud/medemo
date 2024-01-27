/* eslint-disable canonical/filename-match-exported */
import { type Config } from 'tailwindcss';

const tailwindConfig: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  plugins: [],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      colors: {
        'section-three-text': 'rgb(var(--section-three-text-color-rgb))',
        'section-two-text': 'rgb(var(--section-two-text-color-rgb))',
      },
      fontFamily: {
        varela: ['varela', 'sans-serif'],
      },
    },
  },
};
export default tailwindConfig;
