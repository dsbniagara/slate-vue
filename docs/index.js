import Vue from 'vue';
import VueRouter from 'vue-router';

import {Slate} from '../src/index.js';
import Demo from './Demo';
import Docs from './Docs';
import routes from './routes'

Vue.use(Slate);
Vue.use(VueRouter);

Vue.component('demo',Demo);

const router = new VueRouter(routes);

new Vue({
    el: '#docs',
    router,
    render: h => h(Docs)
});