import Datepicker from './Datepicker.vue';
import { registerComponents } from '../../src/utils/plugins';

const VuePlugin = {
  install (Vue) {
    registerComponents(Vue, {Datepicker})
  }
}
export default VuePlugin