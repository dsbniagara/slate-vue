import DatePicker from './DatePicker.vue';
import { registerComponents } from '../../utils/plugins';

const VuePlugin = {
  install (Vue) {
    registerComponents(Vue, {DatePicker})
  }
}
export default VuePlugin