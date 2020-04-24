import avatar from './avatar.vue'
import { registerComponents } from '../../src/utils/plugins'


const VuePlugin = {
  install (Vue) {
    registerComponents(Vue, {avatar})
  }
}

export default VuePlugin