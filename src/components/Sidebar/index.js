import sidebar from './sidebar.vue'
import { registerComponents } from '../../utils/plugins'


const VuePlugin = {
  install (Vue) {
    registerComponents(Vue, {sidebar})
  }
}

export default VuePlugin