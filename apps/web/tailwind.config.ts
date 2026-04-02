import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          50: '#EEF1F8',
          100: '#D5DCF0',
          200: '#AABAE1',
          300: '#7A93CF',
          400: '#4D6BBC',
          500: '#2A4FA8',
          600: '#1E3D8A',
          700: '#162E6E',
          800: '#0F2052',
          900: '#0A1628',
          950: '#060D1A',
          DEFAULT: '#1A2744',
        },
        gold: {
          50: '#FDF9EC',
          100: '#FAF0C8',
          200: '#F5DF8E',
          300: '#F0CC56',
          400: '#EBB92A',
          500: '#D4A017',
          600: '#C9A84C',
          700: '#9C7510',
          800: '#7A5B0E',
          900: '#5C450B',
          DEFAULT: '#C9A84C',
        },
        steel: {
          50: '#F8FAFC',
          100: '#F1F5F9',
          200: '#E2E8F0',
          300: '#CBD5E1',
          400: '#94A3B8',
          500: '#64748B',
          600: '#475569',
          700: '#334155',
          800: '#1E293B',
          900: '#0F172A',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      backgroundImage: {
        'metal-gradient': 'linear-gradient(135deg, #0A1628 0%, #1A2744 50%, #0F2052 100%)',
        'gold-gradient': 'linear-gradient(135deg, #C9A84C 0%, #E8C96E 50%, #C9A84C 100%)',
        'hero-pattern':
          'radial-gradient(ellipse at 20% 50%, rgba(201,168,76,0.08) 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, rgba(26,39,68,0.5) 0%, transparent 60%)',
      },
      animation: {
        'fade-up': 'fadeUp 0.6s ease-out forwards',
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        shimmer: 'shimmer 2s linear infinite',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      boxShadow: {
        'card': '0 4px 24px rgba(10,22,40,0.08)',
        'card-hover': '0 8px 40px rgba(10,22,40,0.15)',
        'gold': '0 4px 20px rgba(201,168,76,0.3)',
      },
    },
  },
  plugins: [],
}

export default config
