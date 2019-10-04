import DateRangePicker from './DateRangePicker.vue';
import { registerComponents } from '../../utils/plugins';

const VuePlugin = {
  install (Vue) {
    registerComponents(Vue, {DateRangePicker})
  }
}
export default VuePlugin