import { vueUse } from './utils/plugins';

// import Autocomplete from './component/Autocomplete';
import Dropdown from './component/Dropdown';
import Avatar from './component/Avatar';
import DatePicker from './component/Datepicker';
import CodeInput from './component/CodeInput';
import TimeInput from './component/TimeInput';
import NumberInput from './component/NumberInput';
import Notifications from './component/Notifications';
import Modal from './component/Modal';
// import Affix from './component/Affix';
// import Sidebar from './component/Sidebar';

// export {default as Autocomplete} from './component/Autocomplete';
export {default as Dropdown} from './component/Dropdown';
export {default as Avatar} from './component/Avatar';
export {default as DatePicker} from './component/Datepicker';
export {default as CodeInput} from './component/CodeInput';
export {default as TimeInput} from './component/TimeInput';
export {default as NumberInput} from './component/NumberInput';
export {default as Notifications} from './component/Notifications';
export {default as Modal} from './component/Modal';
// export {default as Affix} from './component/Affix';
// export {default as Sidebar} from './component/Sidebar';

export const Slate = {
  install: function (Vue,opt) {
    if (Vue._slate_installed) {
      return;
    }
    Vue._slate_installed = true;
    
    // Vue.use(Autocomplete);
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
