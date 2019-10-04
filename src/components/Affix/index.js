import Affix from './Affix.vue'
import { registerComponents } from '../../utils/plugins'


const VuePlugin = {
  install (Vue) {
    registerComponents(Vue, {Affix})
  }
}

export default VuePlugin