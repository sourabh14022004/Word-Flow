/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        black1: "rgba(0,0,0,0.8)",
        banner: "rgb(255, 192, 23)",
      },
      fontFamily: {
        'embeded-code' : ["Handjet", 'sans-serif'],
        'Shadow-code' : ["Jacques Francois Shadow", 'serif'],
        'Baskerville-regular': ["Libre Baskerville", 'serif'],
        'Playfair': ["Playfair Display", 'serif']
      },
      gridTemplateColumns: {
        card: "repeat(auto-fit, minmax(280px, 1fr))",
      },
      animation: {
        'spin-slow': 'spin 3s linear infinite',
      },
    },
  },
  plugins: [],
}
