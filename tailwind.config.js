/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        hubot: ['"Hubot Sans"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}