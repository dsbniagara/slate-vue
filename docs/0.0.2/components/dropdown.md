# Dropdown

``import { Dropdown } from {{$themeConfig.packageName}}``

<dropdown text="Dropdown">
    <a class="dropdown-item" href="#">Item 1</a>
    <a class="dropdown-item" href="#">Item 2</a>
    <a class="dropdown-item" href="#">Item 3</a>
</dropdown>

```html
<dropdown text="Dropdown">
    <a class="dropdown-item" href="#">Item 1</a>
    <a class="dropdown-item" href="#">Item 2</a>
    <a class="dropdown-item" href="#">Item 3</a>
</dropdown>
```

<p>To override the text with a custom icon, use the slot called button.</p>


<dropdown>
    <template v-slot:button>🤘</template>
    <a class="dropdown-item" href="#">Item 1</a>
    <a class="dropdown-item" href="#">Item 2</a>
    <a class="dropdown-item" href="#">Item 3</a>
</dropdown>

```html
<dropdown>
    <template v-slot:button>🤘</template>
    <a class="dropdown-item" href="#">Item 1</a>
    <a class="dropdown-item" href="#">Item 2</a>
    <a class="dropdown-item" href="#">Item 3</a>
</dropdown>
```


<h3>Properties</h3>

<table class="table">
    <thead>
        <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Default</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>text</td>
            <td><code>String</code></td>
            <td>''</td>
            <td>Text for the dropdown button</td>
        </tr>
        <tr>
            <td>position</td>
            <td><code>String</code></td>
            <td>''</td>
            <td>Text for the dropdown button</td>
        </tr>
    </tbody>
</table>
