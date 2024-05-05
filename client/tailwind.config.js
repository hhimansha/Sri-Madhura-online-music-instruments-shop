/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
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
  variants: {},
  plugins: [],
});