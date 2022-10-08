const tailwindcss = require('tailwindcss')
const autoprefixer = require('autoprefixer')
const focusVisible = require('postcss-focus-visible')

module.exports = {
  plugins: [tailwindcss(), autoprefixer, focusVisible()]
}
