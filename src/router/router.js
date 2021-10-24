/** @format */

import Vue from 'vue';
import VueRouter from 'vue-router';

import SignIn from '../views/Auth/SignIn.vue';
import Menu from '../views/Templates/Menu.vue';
import Rooms from '../views/Templates/Rooms.vue';

import store from '../store/index.js';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'SignIn',
    component: SignIn,
    beforeEnter: (to, from, next) => {
      if (store.state.expired == true) next();
      else next('/Menu');
    },
  },
  {
    path: '/Menu',
    name: 'Menu',
    component: Menu,
    beforeEnter: (to, from, next) => {
      if (store.state.expired == false) next();
      else next('/');
    },
  },
  {
    path: '/Rooms',
    name: 'Rooms',
    component: Rooms,
    beforeEnter: (to, from, next) => {
      if (store.state.expired == false) next();
      else next('/');
    },
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
