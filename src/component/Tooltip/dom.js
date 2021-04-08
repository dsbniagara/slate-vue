import Vue from 'vue';
import Tooltip from 'tooltip.js';

// 依赖 element-ui 的 tooltip 样式，在 element-ui.js 中单独引入
// import 'element-ui/packages/theme-chalk/lib/tooltip.css';

const zIndex = 4000; // 默认的 z-index 值
const refs = {};
let tooltipId = 0;

const isServer = Vue.prototype.$isServer;
const ieVersion = isServer ? 0 : Number(document.documentMode);

/* istanbul ignore next */
const camelCase = function(name) {
  return name.replace(SPECIAL_CHARS_REGEXP, function(_, separator, letter, offset) {
    return offset ? letter.toUpperCase() : letter;
  }).replace(MOZ_HACK_REGEXP, 'Moz$1');
};

/**
 * create tooltip
 * @param {HTMLElement} el
 * @param {String} title
 * @param {String<'light'|'dark'>} effect
 * @param {String} placement
 * @return {Tooltip}
 */
export function tooltipCreate(el, title, { effect, placement }) {
  const id = (el.dataset.tooltipId =
    el.dataset.tooltipId || String(++tooltipId));
  let tooltip;

  if (!refs.hasOwnProperty(id)) {
    tooltip = new Tooltip(el, {
      placement,
      // @require 'element-ui/packages/theme-chalk/lib/tooltip.css'
      template: `
        <div 
          class="tooltip ${effect}" 
          role="tooltip" 
          style="transition: opacity 100ms linear;opacity: 0;z-index: ${zIndex}">
          <div class="tooltip-arrow"></div>
          <div class="tooltip-inner"></div>
        </div>
      `,
      title,
      trigger: 'manual',
      popperOptions: {
        modifiers: {
          preventOverflow: { enabled: false },
          hide: { enabled: false }
        },
        removeOnDestroy: true
      },
      container: document.body
    });
    tooltip.show();
    refs[id] = tooltip;
  } else {
    tooltip = refs[id];
    clearTimeout(tooltip._timeout);
  }

  // transition
  tooltip.popperInstance && (tooltip.popperInstance.popper.style.opacity = 1);

  return tooltip;
}

/**
 * remove tooltip
 * @param {HTMLElement} el
 * @param {Number} delayHide
 */
export function tooltipRemove(el, delayHide = 200) {
  const id = el.dataset.tooltipId;
  const tooltip = refs[id];
  if (tooltip) {
    if (tooltip._timeout) clearTimeout(tooltip._timeout);
    tooltip.popperInstance && (tooltip.popperInstance.popper.style.opacity = 0);
    tooltip._timeout = setTimeout(() => {
      tooltip.dispose();
      delete refs[id];
    }, delayHide);
  }
}

/**
 * update tooltip title
 * @param {HTMLElement} el
 * @param {String} title
 */
export function tooltipUpdateTitle(el, title) {
  const id = el.dataset.tooltipId;
  const tooltip = refs[id];
  if (tooltip) {
    tooltip.updateTitleContent(title);
  }
}


export function getStyleToInt(elem, attribute) {
  return parseInt(getStyle(elem, attribute), 10) || 0;
}

export const getStyle = ieVersion < 9 ? function(element, styleName) {
  if (isServer) return;
  if (!element || !styleName) return null;
  styleName = camelCase(styleName);
  if (styleName === 'float') {
    styleName = 'styleFloat';
  }
  try {
    switch (styleName) {
      case 'opacity':
        try {
          return element.filters.item('alpha').opacity / 100;
        } catch (e) {
          return 1.0;
        }
      default:
        return (element.style[styleName] || element.currentStyle ? element.currentStyle[styleName] : null);
    }
  } catch (e) {
    return element.style[styleName];
  }
} : function(element, styleName) {
  if (isServer) return;
  if (!element || !styleName) return null;
  styleName = camelCase(styleName);
  if (styleName === 'float') {
    styleName = 'cssFloat';
  }
  try {
    var computed = document.defaultView.getComputedStyle(element, '');
    return element.style[styleName] || computed ? computed[styleName] : null;
  } catch (e) {
    return element.style[styleName];
  }
};