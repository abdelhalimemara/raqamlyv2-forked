/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#B5FF81',
      },
      fontFamily: {
        sans: ['Eina03', 'sans-serif'],
      },
    },
  },
  plugins: [],
}