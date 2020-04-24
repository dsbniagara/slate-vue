import CodeInput from './CodeInput.vue'
import { registerComponents } from '../../src/utils/plugins'


const VuePlugin = {
  install (Vue) {
    registerComponents(Vue, {CodeInput})
  }
}

export default VuePlugin