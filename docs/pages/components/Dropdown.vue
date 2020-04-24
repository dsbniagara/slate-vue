<template>
<div>

<pre class="code">import { Dropdown } from `@dsbn/slate-vue`</pre>

<demo title="Button dropdown" code='
<dropdown text="Dropdown">
    <a class="dropdown-item" href="#">Item 1</a>
    <a class="dropdown-item" href="#">Item 2</a>
    <a class="dropdown-item" href="#">Item 3</a>
</dropdown>'>
    <dropdown text="Dropdown">
        <a class="dropdown-item" href="#">Item 1</a>
        <a class="dropdown-item" href="#">Item 2</a>
        <a class="dropdown-item" href="#">Item 3</a>
    </dropdown>
</demo>
</template>

<script>
export default {
    name: 'DocDropdown'
}
</script>