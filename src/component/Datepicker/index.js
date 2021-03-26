import Datepicker from './Datepicker.vue';
import { registerComponents } from '../../utils/plugins';

const VuePlugin = {
  install (Vue) {
    registerComponents(Vue, {Datepicker})
  }
}
export default VuePlugin