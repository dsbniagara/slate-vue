import { vueUse } from './utils/plugins';

import Autocomplete from './components/Autocomplete';
// import Affix from './components/Affix';
import Dropdown from './components/Dropdown';
import Avatar from './components/Avatar';
import DatePicker from './components/DatePicker';
// import Sidebar from './components/Sidebar';
import CodeInput from './components/CodeInput';
import TimeInput from './components/TimeInput';
import NumberInput from './components/NumberInput';
import Notifications from './components/Notifications';
import Modal from './components/Modal';

export {default as Autocomplete} from './components/Autocomplete';
// export {default as Affix} from './components/Affix';
export {default as Dropdown} from './components/Dropdown';
export {default as Avatar} from './components/Avatar';
export {default as DatePicker} from './components/DatePicker';
// export {default as Sidebar} from './components/Sidebar';
export {default as CodeInput} from './components/CodeInput';
export {default as TimeInput} from './components/TimeInput';
export {default as NumberInput} from './components/NumberInput';
export {default as Notifications} from './components/Notifications';
export {default as Modal} from './components/Modal';

export const Slate = {
  install: function (Vue,opt) {
    if (Vue._slate_installed) {
      return;
    }
    Vue._slate_installed = true;
    
    Vue.use(Autocomplete);
    Vue.use(Avatar);
    Vue.use(Dropdown);
    Vue.use(DatePicker);
    Vue.use(CodeInput);
    Vue.use(TimeInput);
    Vue.use(NumberInput);
    Vue.use(Notifications);
    Vue.use(Modal);

    // Vue.use(Affix);
  }
}

vueUse(Slate);
