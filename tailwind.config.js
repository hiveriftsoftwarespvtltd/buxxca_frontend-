/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '#1A3DAA',   // Deep royal blue
          gold:    '#C9A84C',   // Metallic gold
          dark:    '#111827',   // Primary text
          muted:   '#6B7280',   // Secondary text, placeholders
          light:   '#F3F4F6',   // Light backgrounds, cards
          border:  '#E5E7EB',   // Dividers, borders
        },
      },
      fontFamily: {
        sans: ['"DM Sans"', 'sans-serif'],
      },
    },
  },
  corePlugins: {
    preflight: false,
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
}
