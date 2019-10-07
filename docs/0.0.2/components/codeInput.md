# Code Input

``import { CodeInput } from {{$themeConfig.packageName}}``

Code Input is a special group of inputs for receiving verification codes or reset codes. It splits into 6 inputs with a hyphen in the middle to break up entry. Code Input handles automatic focusing to the next input along with pasting.

<code-input></code-input>

```html
<code-input></code-input>
```

## Dark mode

Has ``.dark`` mode, because, why not.

<div class="bg-dark">
<code-input class="dark"></code-input>
</div>

```html
<code-input class="dark"></code-input>
```