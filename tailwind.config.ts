import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // RepRise "Terracotta Vitality" Palette
        primary: {
          DEFAULT: '#E2725B',
          50: '#FBF3F1',
          100: '#F6E6E2',
          200: '#EDCDC5',
          300: '#E5B4A8',
          400: '#DC9B8B',
          500: '#E2725B',
          600: '#D65439',
          700: '#B0442E',
          800: '#843223',
          900: '#582118',
        },
        secondary: {
          DEFAULT: '#2D2D2D',
          50: '#F7F7F7',
          100: '#E8E8E8',
          200: '#D1D1D1',
          300: '#B0B0B0',
          400: '#888888',
          500: '#6B6B6B',
          600: '#4A4A4A',
          700: '#2D2D2D',
          800: '#1F1F1F',
          900: '#141414',
        },
        accent: {
          DEFAULT: '#D4A574',
          50: '#FAF7F3',
          100: '#F5EFE7',
          200: '#EBDFCF',
          300: '#E1CFB7',
          400: '#D7BF9F',
          500: '#D4A574',
          600: '#C18E52',
          700: '#A07442',
          800: '#7A5831',
          900: '#543C21',
        },
        background: '#FAF7F4',
        surface: '#FFFFFF',
        text: {
          primary: '#2D2D2D',
          secondary: '#8B8178',
        },
        border: '#E5E0DB',
      },
      fontFamily: {
        heading: ['var(--font-heading)', 'sans-serif'],
        body: ['var(--font-body)', 'serif'],
      },
      spacing: {
        'xs': '8px',
        'sm': '16px',
        'md': '24px',
        'lg': '32px',
        'xl': '48px',
        '2xl': '64px',
        '3xl': '96px',
      },
      borderRadius: {
        'sm': '8px',
        'md': '12px',
        'lg': '16px',
        'full': '9999px',
      },
      boxShadow: {
        'sm': '0 2px 4px rgba(0,0,0,0.06)',
        'md': '0 4px 12px rgba(0,0,0,0.08)',
        'lg': '0 8px 24px rgba(0,0,0,0.12)',
        'claymorphic': 'inset 2px 2px 4px rgba(255,255,255,0.8), inset -2px -2px 4px rgba(0,0,0,0.05), 4px 4px 12px rgba(0,0,0,0.1)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'scale-in': 'scaleIn 0.2s ease-out',
        'pulse-subtle': 'pulseSubtle 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' },
        },
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}
export default config
