
export default {    
    mode: 'history',
    activeClass: 'active',
    routes: [
        { path: '', redirect: '/home'},
        { path: '/home', name: 'home', component: () => import('./pages/Home.vue') },
        { path: '/components/:category?', name: 'components', component: () => import('./pages/Components.vue') },
        { path: '/component/:component', name: 'component', component: () => import('./pages/Component.vue') }
    ]
}