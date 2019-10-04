import CodeInput from './CodeInput.vue'
import { registerComponents } from '../../utils/plugins'


const VuePlugin = {
  install (Vue) {
    registerComponents(Vue, {CodeInput})
  }
}

export default VuePlugin