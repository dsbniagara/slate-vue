const path = require('path')

module.exports = (options, context) => ({
  name: 'register-slate',
  enhanceAppFiles() {
    var slate = path.resolve('../src/index.js' );
    return {
       name: 'dynamic-code',
       content: `export default ({ Vue }) => { var Slate = require(${JSON.stringify(slate)}); Vue.use(Slate.Slate); }`
     }
  }
})
