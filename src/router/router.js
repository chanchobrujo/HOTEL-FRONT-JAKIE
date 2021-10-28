/** @format */

import Vue from 'vue';
import VueRouter from 'vue-router';

import SignIn from '../views/Auth/SignIn.vue';
import SignUp from '../views/Auth/SignUp.vue';

import Reservations from '../views/Templates/Menu.vue';
import SelectedRoom from '../views/Templates/SelectedRoom.vue';

import Rooms from '../views/Templates/Rooms.vue';
import Users from '../views/Templates/Users.vue';

import store from '../store/index.js';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'SignIn',
    component: SignIn,
    beforeEnter: (to, from, next) => {
      if (store.state.expired == true) next();
      else next('/Reservations');
    },
  },
  {
    path: '/SignUp',
    name: 'SignUp',
    component: SignUp,
    beforeEnter: (to, from, next) => {
      if (store.state.expired == true) next();
      else next('/Reservations');
    },
  },
  {
    path: '/Reservations',
    name: 'Reservations',
    component: Reservations,
    beforeEnter: (to, from, next) => {
      if (store.state.expired == false) next();
      else next('/');
    },
  },
  {
    path: '/SelectedRoom/:id/:d1/:d2',
    name: 'SelectedRoom',
    component: SelectedRoom,
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
      if (store.state.expired == false && !store.state.isHuesp) next();
      else next('/');
    },
  },
  {
    path: '/Users',
    name: 'Users',
    component: Users,
    beforeEnter: (to, from, next) => {
      if (store.state.expired == false && store.state.isAdmin) next();
      else next('/');
    },
  },
  {
    path: '*',
    beforeEnter: (to, from, next) => {
      if (store.state.expired == false) next('/Reservations');
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
