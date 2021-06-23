import Vue from 'vue';
import VueRouter from 'vue-router'
Vue.use(VueRouter);
export default new VueRouter({
    mode: 'history',
    base: '/site/',
    routes: [{
        path: '/',
        name: 'Home',
        redirect: '/home',
    }, {
        path: '/home',
        name: 'Home',
        meta: {
            keepAlive: true,
        },
        component: resolve => require(['@/pages/home.vue'], resolve),
    }, {
        path: '/register',
        name: 'Register',
        component: resolve => require(['@/pages/register.vue'], resolve),
    }, {
        path: '/login',
        name: 'Login',
        component: resolve => require(['@/pages/login.vue'], resolve),
    }, {
        path: '/novelList/:categoryId/:categoryName',
        name: 'NovelList',
        meta: {
            keepAlive: true,
        },
        component: resolve => require(['@/pages/novelList.vue'], resolve),
    }, {
        path: '/search',
        name: 'Search',
        component: resolve => require(['@/pages/search.vue'], resolve),
    }, {
        path: '/novel/:id',
        name: 'Novel',
        meta: {
            keepAlive: true,
        },
        component: resolve => require(['@/pages/novel.vue'], resolve),
    }, {
        path: '/novelChapter/:id',
        name: 'NovelChapter',
        meta: {
            keepAlive: true,
        },
        component: resolve => require(['@/pages/novelChapter.vue'], resolve),
    }, {
        path: '/read',
        name: 'Read',
        component: resolve => require(['@/pages/read.vue'], resolve),
    }]
})