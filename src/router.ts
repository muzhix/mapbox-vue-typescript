import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/views/Home.vue';
import MapHome from '@/views/MapHome.vue';
import Dynamic from '@/views/Dynamic.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'MapHome',
      component: MapHome,
    },
    {
      path: '/home',
      name: 'VueHome',
      component: Home,
    },
    {
      path: '/dynamic',
      name: 'Dynamic',
      component: Dynamic,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue'),
    },
  ],
});
