# Notifications

``import { Notifications } from {{$themeConfig.packageName}}``

<p>First add your container to the page:</p>

<notifications></notifications>

```
<notifications></notifications>
```

Then fire your notification

```
this.$notify('Yup!');
```

<a class="btn" v-on:click="$notify('Yup!');">Fire Notification</a>

# States

Pass a type to display different notification states.</p>

<a class="btn" @click="$notify({
    type: 'success',
    text: 'Success!!',duration:0
});">Success</a>

<a class="btn btn--danger" @click="$notify({
    type: 'error',
    text: 'Error!!',duration:0
});">Error</a>

<a class="btn btn--warning" @click="$notify({
    type: 'warning',
    text: 'Warning!!',duration:0
});">Warning</a>

## Actions

Provide any number of actions to allow methods like Undoing after deletes. Pass an object called actions with each property and value being an action. The property name will be used for the action label and the value as a function when clicked.

<button class="btn" @click="$notify({
    text:'Multiple actions',
    duration: -1,
    actions: {
        'Undo': undoo,
        'Redo': redoo
    }
});">Multiple actions</button>

```
$notify({
    text:'Multiple actions',
    duration: -1,
    actions: {
        'Undo': undoo,
        'Redo': redoo
    }
});
```

<h2>Updating existing notifications</h2>

<p>Notifications can be dynamically replaced programmatically. Useful when you want to provide constant feedback without a huge amount of notifications. For example, a user clicks save and a notification starts with the Saving animation and gets replaced with its success or error message.</p>

<a class="btn" v-on:click="notifyButReplace()">Dynamic Replace</a>

```js
var n = this.$notify({'text':'This notification can be dynamically updated to show new content, just wait a few seconds.', duration: 0});
setTimeout(()=>{
    n.update({'text':'Chain these to avoid multiple notifications for one action.', duration: 0});
    setTimeout(()=>{
        n.update({'text':'Cool, eh?', duration: 0});
    },5000);
},5000);
```

## Reference
<table class="table reference-table">
    <thead>
        <tr>
            <th>Property</th>
            <th>Type</th>
            <th>Default</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td class="property">duration</td>
            <td>Number</td>
            <td>7000</td>
            <td>Time in <code>ms</code> to display notification. Use -1 for it to display forever until closed.</td>
        </tr>
        <tr>
            <td class="property">type</td>
            <td>String</td>
            <td>info</td>
            <td>Display different types of alerts. Possible values are info|success|warning|error</td>
        </tr>
        <tr>
            <td class="property">closeable</td>
            <td>Boolean</td>
            <td>true</td>
            <td>Allow notification to be closed. Shows an X if true.</td>
        </tr>
        <tr>
            <td class="property">text</td>
            <td>String</td>
            <td>""</td>
            <td>Text for notification.</td>
        </tr>
        <tr>
            <td class="property">title</td>
            <td>String</td>
            <td>""</td>
            <td>Display an optional title for the notification.</td>
        </tr>
        <tr>
            <td class="property">actions</td>
            <td>Object</td>
            <td>""</td>
            <td>Provide user interaction for the notification. Pass an object with keys as the action title and the function as the property. The notification is passed into each action to allow for future updates.
```
actions: {
'Undo': (notification) => { 
// Undo
},
'Redo': (notification) => { 
// Redo
}
}
```</td>
        </tr>
        <tr>
            <td class="property">id</td>
            <td>Any</td>
            <td></td>
            <td>Manually passing an id will add a new notification with the id, or replace an existing notification with the provided id.</td>
        </tr>
    </tbody>
</table>