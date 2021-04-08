import Tooltip from './tooltip';

import './style.css';

// tooltip utils
export {
  tooltipCreate,
  tooltipRemove,
  tooltipUpdateTitle
} from './util';

// Vue.use()
Tooltip.install = (Vue) => {
  Vue.directive('tooltip', Tooltip);
};

// Vue.component()
export default Tooltip;