# Autocomplete

``import { Autocomplete } from {{$themeConfig.packageName}}``

<autocomplete class="users" :items="[{name:'list',email:'aa'},{name:'list',email:'aa'}]">
    <template v-slot:default="r">
        <avatar v-bind="r.item"></avatar>
        <div class="user-details">
            <b>{{ r.item.name }}</b>
            <div class="text-faded">{{ r.item.email }}</div>
        </div>
    </template>
</autocomplete>

```html
<autocomplete class="users" :items="[{name:'list',email:'aa'},{name:'list',email:'aa'}]">
    <template v-slot:default="r">
        <avatar v-bind="r.item"></avatar>
        <div class="user-details">
            <b>{{ r.item.name }}</b>
            <div class="text-faded">{{ r.item.email }}</div>
        </div>
    </template>
</autocomplete>
```