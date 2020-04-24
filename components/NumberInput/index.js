import NumberInput from './NumberInput.vue'
import { registerComponents } from '../../src/utils/plugins'

const VuePlugin = {
  install (Vue) {
    registerComponents(Vue, {NumberInput})
  }
}

export default VuePlugin