# Installation

** Work in progress **

## Install via npm

```bash
npm i -s @dsbn/slatecss @dsbn/slate-vue
```

### Install dependancies

There are a few post css plugins required by slatecss to be in your project.

```bash
npm i -s postcss-nested postcss-color-function
```

## Install with Vue

```js
import {Slate} from '@dsbn/slate-vue'
Vue.use(Slate);
```

## Insert into your styles

Add the following line to your main css file and slatecss will insert in its place.

```css
@slate base;
```

## Create your config (optional)

If you would like to override any default slate variables simply add a ``slate.config.js`` to your project root and start replacing. You can view the list of overridable variables by looking at the default config.

```js
// slate.config.js
module.exports = {
  '--color-primary':'orange'
}
```

## Processing

Add slate to your postcss.config.js

```js
module.exports = {
  plugins: [
    // ...
    require('@dsbn/slatecss'),
    require('postcss-nested'),
    require('postcss-color-function'),
    // ...
  ]
}
```