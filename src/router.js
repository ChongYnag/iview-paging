import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'table',
        component: () => import('./views/table.vue')
    },
    // {
    //     path: '/error',
    //     name: 'error',
    //     component: () => import('./views/error.vue')
    // }
];

const router = new VueRouter({
    routes: routes,
    linkActiveClass: "v-link-active"
});

router.beforeEach((to, from, next) => {
    next();
});

export default router
