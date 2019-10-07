# Installation

## Install via npm

First install @dsbn/slate-css and @dsbn/slate-vue

```bash
npm i -s @dsbn/slate-css @dsbn/slate-vue
```

### Install dependancies

There are a few post css plugins required by slatecss to be in your project.

```bash
npm i -s postcss-nested postcss-color-function
```

## Install with Vue

Hook up @dsbn/slate-vue in your main javascript file you use for vue.

```js
import {Slate} from '@dsbn/slate-vue'
Vue.use(Slate);
```

## PostCSS Setup

Get the styles rocking with PostCSS by adding a postcss.config.js if you do not already have one. You will need to use postcss-nested and the postcss-color-function along with @dsbn/slate-css.

```js
module.exports = {
  plugins: [
    // ...
    require('@dsbn/slate-css'),
    require('postcss-nested'),
    require('postcss-color-function'),
    // ...
  ]
}
```

## Override slate config (optional)

If you would like to override any default slate variables simply add a ``slate.config.js`` to your project root and start replacing. You can view the list of overridable variables by looking at the default [slate.config.js](https://github.com/dsbniagara/slate-css/blob/master/src/postcss/slate.config.js).

```js
// slate.config.js
module.exports = {
  '--color-primary':'orange'
}
```

## Adding styles

Add the following line to your main css file and @dsbn/slate-css will insert in its place.

```css
@slate base;
```

Your all set!