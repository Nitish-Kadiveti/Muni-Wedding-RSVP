/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        burgundy: {
          DEFAULT: '#5C0E1E',
          dark: '#3D0913',
          light: '#7A1B2D',
        },
        gold: {
          DEFAULT: '#B8923F',
          light: '#E4CD8F',
          dark: '#8C6D2C',
        },
        ivory: {
          DEFAULT: '#FBF5E9',
          dark: '#F2E8D5',
        },
        rose: {
          DEFAULT: '#C98F8A',
          light: '#E7C9C4',
        },
        ink: '#2B1810',
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'serif'],
        body: ['"Jost"', 'sans-serif'],
        script: ['"Pinyon Script"', 'cursive'],
        ornate: ['"Cinzel"', 'serif'],
      },
      backgroundImage: {
        'radial-gold': 'radial-gradient(circle at center, rgba(184,146,63,0.18) 0%, rgba(184,146,63,0) 70%)',
        'burgundy-gradient': 'linear-gradient(160deg, #3D0913 0%, #5C0E1E 55%, #7A1B2D 100%)',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        drift: {
          '0%': { transform: 'translateY(-5vh) translateX(0) rotate(0deg)', opacity: '0' },
          '10%': { opacity: '0.9' },
          '90%': { opacity: '0.7' },
          '100%': { transform: 'translateY(105vh) translateX(40px) rotate(240deg)', opacity: '0' },
        },
        shimmer: {
          '0%, 100%': { opacity: '0.55' },
          '50%': { opacity: '1' },
        },
      },
      animation: {
        fadeUp: 'fadeUp 0.9s cubic-bezier(0.22,1,0.36,1) both',
        fadeIn: 'fadeIn 1.2s ease both',
        drift: 'drift linear infinite',
        shimmer: 'shimmer 3s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
