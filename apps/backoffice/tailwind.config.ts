import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          50: '#EEF1F8',
          100: '#D5DCF0',
          DEFAULT: '#1A2744',
          800: '#0F2052',
          900: '#0A1628',
          950: '#060D1A',
        },
        gold: {
          DEFAULT: '#C9A84C',
          500: '#D4A017',
        },
        sidebar: '#111827',
      },
    },
  },
  plugins: [],
}

export default config
