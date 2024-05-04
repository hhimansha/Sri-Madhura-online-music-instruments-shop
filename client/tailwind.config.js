/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      colors : {
        primary : '#FA8232',
        primaryDark : '#E86E2F',
        dark : '#050201',
      }
    },
  },
  plugins: [],
}