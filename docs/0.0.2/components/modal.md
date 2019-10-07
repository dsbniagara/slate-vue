# Modal

``import { Modal } from {{$themeConfig.packageName}}``

First setup your modal in your template, with a ref. Then pipe in an event to call the ref show method in the modal.

<button class="btn" v-on:click="$refs.modal.show()">Show</button>

<modal ref="modal">
    I am a modal.
</modal>

```html
<button class="btn" @click="$refs.modal.show()">Show</button>

<modal ref="modal">
    <template slot="header">
        <div class="title">Modal</div>
    </template>
    I am a modal.
</modal>
```

<h2>Header &amp; Footer</h2>

A header and footer slot are provided for labeling your modal and showing action buttons.

<button class="btn" v-on:click="$refs.modalHandF.show()">Show</button>

<modal ref="modalHandF">
    <template slot="header">
        <div class="title">Header</div>
    </template>
    I am a modal.
    <template slot="footer">
        <button v-on:click="$refs.modalHandF.hide()" class="btn">Ok</button>
        <button v-on:click="$refs.modalHandF.hide()" class="btn btn--light">Cancel</button>
    </template>
</modal>

```html
<modal ref="modalHandF">
    <template slot="header">
        <div class="title">Header</div>
    </template>
    I am a modal.
    <template slot="footer">
        <button v-on:click="$refs.modalHandF.hide()" class="btn">Ok</button>
        <button v-on:click="$refs.modalHandF.hide()" class="btn btn--light">Cancel</button>
    </template>
</modal>
```