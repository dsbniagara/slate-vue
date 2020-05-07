import Tooltip from './tooltip';

require('./style.css');

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