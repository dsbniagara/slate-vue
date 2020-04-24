<template>
<div class="container container-fluid">
    <div class="breadcrumb">
        <router-link :to="{name: 'components'}">Components</router-link>
    </div>
    <h1>{{component.name}}</h1>
    <component v-if="component" :is='componentDoc'></component>
</div> 
</template>
<script>
const components = require('../components.json');
var componentList = {
    DocDatepicker: () => import('./components/Datepicker.vue'),
    DocDropdown: () => import('./components/Dropdown.vue'),
    DocCodeInput: () => import('./components/CodeInput.vue'),
    DocNumberInput: () => import('./components/NumberInput.vue'),
    DocTimeInput: () => import('./components/TimeInput.vue'),
};

export default {
    name: 'ComponentDoc',
    components: componentList,
    data() {
        return {
            components: components
        }
    },
    computed: {
        component() {
            return this.components.find(c => c.component == this.$route.params.component);
        },
        componentDoc() {
            return 'Doc' + this.component.component;
        }
    }
}
</script>