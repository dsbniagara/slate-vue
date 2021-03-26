import debounce from 'lodash/debounce';

import {
  tooltipRemove,
  tooltipCreate,
  tooltipUpdateTitle
} from './util';
import { getStyleToInt } from './dom';

const tooltipData = {
  // 1: {}
};
const tooltipIdName = 'tooltip-id';
const delayHide = 200;
let tooltipId = 0; 

export default {
  inserted(el, binding) {
    const id = ++tooltipId;
    el.setAttribute(tooltipIdName, id + '');
    const data = (tooltipData[id] = {
      id,
      activateTooltip: null,
      deactivateTooltip: null,
      text: binding.value
    });

    const effect = binding.modifiers.light ? 'light' : 'dark';
    const placement = el.getAttribute('tooltip-placement') || 'top';
    const overflow = !!binding.modifiers.overflow;
    const multiple = !!binding.modifiers.multiple;

    data.deactivateTooltip = debounce((event) => {
      deactivateTooltip(event.target);
    }, delayHide);
    data.activateTooltip = (event) => {
      data.deactivateTooltip.cancel();
      if (data.tooltipRemoveTimeout) clearTimeout(data.tooltipRemoveTimeout);
      activateTooltip(event.target, data.text, {
        effect,
        placement,
        overflow,
        multiple
      });
    };

    el.addEventListener('mouseenter', data.activateTooltip, false);
    el.addEventListener('mouseleave', data.deactivateTooltip, false);
    el.addEventListener('click', data.deactivateTooltip, false);
  },
  componentUpdated(el, binding) {
    const data = getTooltipData(el);
    if (data) {
      data.text = binding.value;
      tooltipUpdateTitle(el, binding.value);
    }
  },
  unbind(el) {
    const data = getTooltipData(el);
    if (data) {
      el.removeEventListener('mouseenter', data.activateTooltip, false);
      el.removeEventListener('mouseleave', data.deactivateTooltip, false);
      el.removeEventListener('click', data.deactivateTooltip, false);

      tooltipRemove(el, 0);
    }
  }
};

function activateTooltip(el, title, { effect, placement, overflow, multiple }) {
  if (!overflow || (overflow && checkOverflow(el, multiple))) {
    tooltipCreate(el, title, { effect, placement });
  }
}

function deactivateTooltip(el) {
  tooltipRemove(el, delayHide);
}

function checkOverflow(elem, multiple = false) {
  const elemRect = elem.getBoundingClientRect();
  const range = document.createRange();
  range.setStart(elem, 0);
  range.setEnd(elem, elem.childNodes.length);
  const rangeRect = range.getBoundingClientRect();

  if (multiple) {
    const height = rangeRect.height;
    const padding =
      getStyleToInt(elem, 'paddingTop') + getStyleToInt(elem, 'paddingBottom');
    const border =
      getStyleToInt(elem, 'borderTopWidth') +
      getStyleToInt(elem, 'borderBottomWidth');
    return height + padding + border > elemRect.height;
  } else {
    const width = rangeRect.width;
    const padding =
      getStyleToInt(elem, 'paddingLeft') + getStyleToInt(elem, 'paddingRight');
    const border =
      getStyleToInt(elem, 'borderLeftWidth') +
      getStyleToInt(elem, 'borderRightWidth');
    return width + padding + border > elemRect.width;
  }
}

function getTooltipData(el) {
  const id = el.getAttribute(tooltipIdName);
  if (tooltipData.hasOwnProperty(id)) {
    return tooltipData[id];
  } else {
    return null;
  }
}