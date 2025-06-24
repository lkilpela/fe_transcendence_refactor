/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './index.html'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        customDark: '#0A0A0A',
        customPurple: '#25203B',
      },
      fontFamily: {
        turret: ["'Turret Road'", 'cursive'],
        sans: ["'Poppins'", 'sans-serif'],
      },
    },
  },
  plugins: [],
}
