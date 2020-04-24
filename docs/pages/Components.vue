<template>
<div class="container-fluid">
    <div class="row">
        <div class="col">
            <button class="nav-toggle@s ml-auto" type="button" ><svg fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg></button>
            <nav class="page-nav nav@s nav--stacked">
                <ul class="nav-items">
                    <li class="nav-item">
                        <a class="nav-link">All</a>
                    </li>
                    <li class="nav-item" v-for="category in categories" :key="category.name">
                        <a class="nav-link">{{category.name}}</a>
                    </li>
                </ul>
            </nav>
        </div>
        <div class="col-10@m">
            <h1>Components</h1>

            <div class="row">
                <div class="col-4" v-for="component in components" :key="component.name">
                    <div class="component">
                        <router-link :to="{name:'component', params: component }">
                            <div class="icon"></div>
                            <div class="p">
                                <div class="title text-m">{{component.name}}</div>
                            </div>
                        </router-link>
                    </div>
                </div>
            </div>

        </div>
    </div>
</div> 
</template>
<script>
const components = require('../components.json');
export default {
    data() {
        return {
            components: components
        }
    },
    computed: {
        categories() {
            var categories = [];
            this.components.forEach(c=>{
                var category = categories.find(cat => cat.name == c.category);
                if( category === undefined ) {
                    categories.push({
                        name: c.category,
                        components: [c]
                    })
                } else {
                    category.components.push(c);
                }
            })
            return categories;
        }
    }
}
</script>