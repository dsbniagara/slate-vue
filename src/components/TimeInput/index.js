import TimeInput from './TimeInput.vue'
import { registerComponents } from '../../utils/plugins'


const VuePlugin = {
  install (Vue) {
    registerComponents(Vue, {TimeInput})
  }
}

export default VuePlugin