import { vueUse } from './utils/plugins';

import Autocomplete from '../component/Autocomplete';
import Dropdown from '../component/Dropdown';
import Avatar from '../component/Avatar';
import Datepicker from '../component/Datepicker';
import CodeInput from '../component/CodeInput';
import TimeInput from '../component/TimeInput';
import NumberInput from '../component/NumberInput';
import Notifications from '../component/Notifications';
import Modal from '../component/Modal';
import Tooltip from '../component/Tooltip';

const Slate = {
  install: function (Vue,opt) {
    if (Vue._slate_installed) {
      return;
    }
    Vue._slate_installed = true;
    
    Vue.use(Autocomplete);
    Vue.use(Avatar);
    Vue.use(Dropdown);
    Vue.use(Datepicker);
    Vue.use(CodeInput);
    Vue.use(TimeInput);
    Vue.use(NumberInput);
    Vue.use(Notifications);
    Vue.use(Modal);
    Vue.use(Tooltip);
  }
}

export default Slate;

vueUse(Slate);
