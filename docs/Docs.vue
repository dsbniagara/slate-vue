<template>
<section>
    <header class="main-header container-fluid row">
        <router-link class="brand" :to="{name:'docs'}">slate-vue</router-link>
        
        <span class="badge badge--primary">0.1.0-alpha.8</span>
        <nav class="nav nav@xs">
            <ul class="nav-items">
                <li class="nav-item"><router-link :to="{name:'docs'}" class="nav-link">Docs</router-link></li>
                <li class="nav-item"><router-link :to="{name:'components'}" class="nav-link">Components</router-link></li>
            </ul>
        </nav>
        <button class="nav-toggle@xs ml-auto" type="button" @click="show = !show"><svg fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg></button>
    </header>
    <router-view></router-view>
</section>
</template>
