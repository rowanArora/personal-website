import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        sage: {
          50: '#f8faf7',
          100: '#f0f4ed',
          200: '#dfe8d7',
          300: '#c8d4bc',
          400: '#a8b895',
          500: '#8a9d73',
          600: '#6f8159',
          700: '#5a6649',
          800: '#4a523d',
          900: '#3f4635',
          950: '#2f3429',
        },
        cream: {
          50: '#fefcf9',
          100: '#fdf8f0',
          200: '#faf0df',
          300: '#f5e4c1',
          400: '#eed199',
          500: '#e6bc6a',
          600: '#d6a147',
          700: '#b4833a',
          800: '#926935',
          900: '#785730',
          950: '#4a3419',
        },
      },
      fontFamily: {
        sans: ['var(--font-geist-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-geist-mono)', 'monospace'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        }
      },
      backdropBlur: {
        xs: '2px',
      }
    },
  },
  plugins: [],
}

export default config 