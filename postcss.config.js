module.exports = {
  modules: false,
  plugins: [
    require('@dsbn/slatecss'),
    require('postcss-nested'),
    require('postcss-color-function'),
  ]
}