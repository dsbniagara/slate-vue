# Time Input

``import { TimeInput } from {{$themeConfig.packageName}}``

<p>The time input will verify the inputted time and auto convert it to an acceptable format. If a user types 5pm, it will reformat as 5:00 PM on blur.</p>

<time-input placeholder="e.g. 5:00 PM"></time-input>


```html
<time-input></time-input>
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
            <td>v-model</td>
            <td><code>String</code></td>
            <td>''</td>
            <td>Time value</td>
        </tr>
        <tr>
            <td>interval</td>
            <td><code>Number</code></td>
            <td>30</td>
            <td>Intervals used for auto complete</td>
        </tr>
    </tbody>
</table>