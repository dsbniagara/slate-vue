import Autocomplete from './Autocomplete.vue'
import { registerComponents } from '../../utils/plugins'


const VuePlugin = {
  install (Vue) {
    registerComponents(Vue, {Autocomplete})
  }
}

export default VuePlugin