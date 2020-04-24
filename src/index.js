import { vueUse } from './utils/plugins';

import Autocomplete from '../components/Autocomplete';
import Dropdown from '../components/Dropdown';
import Avatar from '../components/Avatar';
import Datepicker from '../components/Datepicker';
import CodeInput from '../components/CodeInput';
import TimeInput from '../components/TimeInput';
import NumberInput from '../components/NumberInput';
import Notifications from '../components/Notifications';
import Modal from '../components/Modal';

export const Slate = {
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
  }
}

vueUse(Slate);
