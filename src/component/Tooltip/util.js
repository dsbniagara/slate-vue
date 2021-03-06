import Tooltip from 'tooltip.js';


const zIndex = 4000; 
const refs = {};
let tooltipId = 0;

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
      template: `
        <div 
          class="tooltip el-tooltip__popper is-${effect}" 
          role="tooltip" 
          style="transition: opacity 200ms linear;opacity: 0;z-index: ${zIndex}">
          <div class="tooltip__arrow popper__arrow"></div>
          <div class="tooltip__inner"></div>
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