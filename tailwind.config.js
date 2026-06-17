/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          DEFAULT: '#C9A84C',
          light: '#E8C97A',
          dark: '#8B6914',
          pale: '#F5E9C8',
          shine: '#FFE08A',
        },
        ivory: '#FFFDF7',
        cream: '#FAF6EE',
        'warm-gray': '#F0EBE1',
        text: {
          dark: '#1A1208',
          mid: '#4A3B1F',
          light: '#8A7A5A',
          pale: '#B8A88A',
        },
        border: '#E8DFC8',
      },
      fontFamily: {
        serif: ['Playfair Display', 'serif'],
        sans: ['Poppins', 'sans-serif'],
        cormorant: ['Cormorant Garamond', 'serif'],
      },
      transitionTimingFunction: {
        'luxury': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  }
}
