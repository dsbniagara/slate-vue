import dropdown from './dropdown.vue'
import { registerComponents } from '../../src/utils/plugins'


const VuePlugin = {
  install (Vue) {
    registerComponents(Vue, {dropdown})
  }
}

// vueUse(VuePlugin)

export default VuePlugin