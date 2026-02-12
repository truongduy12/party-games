/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'party-black': '#1A1A1A',
        'party-white': '#FAFAFA',
        'party-gray': {
          100: '#F5F5F5',
          200: '#E5E5E5',
          300: '#D4D4D4',
          400: '#A3A3A3',
          500: '#737373',
          600: '#525252',
          700: '#404040',
          800: '#262626',
          900: '#171717',
        },
      },
      fontFamily: {
        'google-sans': ['Google Sans', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        trackingExpand: {
          '0%': { letterSpacing: '-0.5em', opacity: '0' },
          '40%': { opacity: '0.6' },
          '100%': { opacity: '1' },
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'tracking-in-expand': 'trackingExpand 0.7s cubic-bezier(0.215, 0.610, 0.355, 1.000) both',
      },
    },
  },
  plugins: [],
}
