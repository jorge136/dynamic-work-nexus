// postcss.config.js (usando CommonJS)
module.exports = {
  plugins: [
    require('@tailwindcss/postcss'),
    require('autoprefixer'),
  ]
}
