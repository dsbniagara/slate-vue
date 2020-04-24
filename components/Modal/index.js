import Modal from './Modal.vue'
import { registerComponents } from '../../src/utils/plugins'


const VuePlugin = {
  install (Vue) {
    registerComponents(Vue, {Modal})
  }
}

export default VuePlugin