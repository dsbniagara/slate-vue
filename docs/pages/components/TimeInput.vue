<template>
<div>

<pre class="code">import { TimeInput } from `@dsbn/slate-vue`</pre>

<demo title="Specialized time input" code='<time-input></time-input>'>
    <time-input v-model="time"></time-input>
</demo>
</template>

<script>
export default {
    name: 'DocTimeInput',
    data() { return { time: '' }}
}
</script>