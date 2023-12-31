/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      'jakarta-sans': 'Plus Jakarta Sans',
      'garamond': 'EB Garamond',
    },
    extend: {
      colors: {
        'primary': '#426FFF',
        'purple': '#583BAD',
        'primary-light': '#A5BCFF',
        'grey': '#616161',
        'red': '#CB3A31',
        'white': '#fff'
      },
    },
  },
  plugins: [],
}