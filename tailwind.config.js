/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cold: '#e81e80',
        warm: '#Ea7051',
        hot: '#73f181',
      },
    },
  },
  plugins: [],
}
