/** @format */

import Vue from 'vue';
import App from './App.vue';
import router from './router/router.js';
import store from './store';
import {isJwtExpired} from 'jwt-check-expiration';

import {BootstrapVue, IconsPlugin} from 'bootstrap-vue';
import axios from 'axios';
import VueAxios from 'vue-axios';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import vuetify from './plugins/vuetify'

// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue);
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin);
Vue.config.productionTip = false;

Vue.use(VueAxios, axios);
axios.defaults.baseURL = 'http://localhost:9095';
axios.interceptors.request.use(
  (config) => {
    config.headers.authorization = `Bearer ${store.state.token}`;
    return config;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  }
);

try {
  store.commit('setExpired', isJwtExpired(store.state.token));
  console.log(store.state.expired);
} catch (error) {}

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App)
}).$mount('#app');
