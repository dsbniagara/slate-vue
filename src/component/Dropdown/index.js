import Dropdown from './Dropdown.vue'
import { registerComponents } from '../../utils/plugins'


const VuePlugin = {
  install (Vue) {
    registerComponents(Vue, {Dropdown})
  }
}

// vueUse(VuePlugin)

export default VuePlugin