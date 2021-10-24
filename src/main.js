/** @format */

import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import {isJwtExpired} from 'jwt-check-expiration';

import {BootstrapVue, IconsPlugin} from 'bootstrap-vue';
import axios from 'axios';
import VueAxios from 'vue-axios';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue);
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin);
Vue.config.productionTip = false;

Vue.use(VueAxios, axios);
axios.defaults.baseURL = 'http://localhost:9095';
axios.interceptors.request.use(
  (config) => {
    config.headers.authorization = `Bearer ${localStorage.getItem('token')}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

try {
  var token = localStorage.getItem('token');
  store.commit('setExpired', isJwtExpired(token));
} catch (error) {
  store.commit('setExpired', true);
}

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
