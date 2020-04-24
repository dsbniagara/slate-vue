import Avatar from './Avatar.vue'
import { registerComponents } from '../../src/utils/plugins'


const VuePlugin = {
  install (Vue) {
    registerComponents(Vue, {Avatar})
  }
}

export default VuePlugin