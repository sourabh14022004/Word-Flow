/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'embeded-code' : ["Handjet", 'sans-serif'],
        'Shadow-code' : ["Jacques Francois Shadow", 'serif'],
        'Baskerville-regular': ["Libre Baskerville", 'serif'],
        'Playfair': ["Playfair Display", 'serif']
      },
    },
  },
  plugins: [],
}
