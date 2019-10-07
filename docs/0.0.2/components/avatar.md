# Avatar

``import { Avatar } from {{$themeConfig.packageName}}``

Get your avatar on.

```html
<avatar v-bind="{name:'Kie Randell', email: 'Kie.Randell@dsbn.org'}"></avatar>
```

Pass either email, username, or uid (priority is in that order) for the avatar to use for photo lookup.

<div class="avatars">
    <avatar v-bind="{name:'Matt Froese', email: 'Matt.Froese@dsbn.org'}"></avatar>
    <avatar v-bind="{name:'Evan Verworn', email: 'Evan.Verworn@dsbn.org'}"></avatar>
    <avatar v-bind="{name:'Kie Randell', email: 'Kie.Randell@dsbn.org'}"></avatar>
    <avatar v-bind="{name:'Matt Cole', email: 'Matthew.Cole@dsbn.org'}"></avatar>
</div>
<div class="avatars">
    <avatar v-bind="{name:'Turd Ferguson', email: 'Turd.Furg@dsbn.org'}"></avatar>
    <avatar v-bind="{name:'Turd Ferguson', email: 'Turd.Furg@dsbn.org', fallback: 'https://placebeard.it/128x128'}"></avatar>
</div>

### Watchers

Avatar will watch for new user details to come in for delayed updates.

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
            <td class="property">email</td>
            <td>String</td>
            <td>null</td>
            <td>Provide email for avatar image lookup</td>
        </tr>
        <tr>
            <td class="property">username</td>
            <td>String</td>
            <td>null</td>
            <td>Provide username for avatar image lookup</td>
        </tr>
        <tr>
            <td class="property">uid</td>
            <td>String</td>
            <td>null</td>
            <td>Provide uid for avatar image lookup</td>
        </tr>
        <tr>
            <td class="property">name</td>
            <td>String</td>
            <td>null</td>
            <td>Provide name</td>
        </tr>
        <tr>
            <td class="property">round</td>
            <td>Boolean</td>
            <td>true</td>
            <td>Make the avatar round</td>
        </tr>
        <tr>
            <td class="property">fallback</td>
            <td>String</td>
            <td>acronym</td>
            <td>Provide a fallback if the avatar is not set. Can be either acronym (based on name) or a uri to an image.</td>
        </tr>
    </tbody>
</table>