import Dropdown from './Dropdown.vue'
import { registerComponents } from '../../src/utils/plugins'


const VuePlugin = {
  install (Vue) {
    registerComponents(Vue, {Dropdown})
  }
}

// vueUse(VuePlugin)

export default VuePlugin