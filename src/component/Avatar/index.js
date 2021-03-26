import Avatar from './Avatar.vue'
import { registerComponents } from '../../utils/plugins'


const VuePlugin = {
  install (Vue) {
    registerComponents(Vue, {Avatar})
  }
}

export default VuePlugin