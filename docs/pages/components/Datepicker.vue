<template>
<div>

<pre class="code">import { Datepicker } from `@dsbn/slate-vue`</pre>

<demo title="Form input" code="<datepicker placeholder='Select date'></datepicker>">
    <datepicker placeholder='Select date'></datepicker>
</demo>

<demo title="Inline" code="<datepicker :inline='true' placeholder='Select date'></datepicker>">
    <datepicker :inline='true' placeholder='Select date'></datepicker>
</demo>
</template>

<script>
export default {
    name: 'DocDatepicker'
}
</script>