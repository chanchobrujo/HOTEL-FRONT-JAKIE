/** @format */

import Vue from 'vue';
import Vuex from 'vuex';

import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    email: '',
    token: null,
    expired: true,
    products: [],
    product: {},
  },
  mutations: {
    setToken(state, status) {
      state.token = status;
    },
    setEmail(state, status) {
      state.email = status;
    },
    setExpired(state, status) {
      state.expired = status;
    },

    SET_PRODUCTS(state, status) {
      state.products = status;
    },
    SET_PRODUCT(state, status) {
      state.products.push(status);
    },
  },
  actions: {
    async getType({commit}, {id}) {
      try {
        const response = await axios.get('/typeroom/' + id);
        return response.data.name;
      } catch (error) {
        console.error(error);
      }
    },

    async getProducts({commit}) {
      try {
        const response = await axios.get('/room/');
        commit('SET_PRODUCTS', response.data);
      } catch (error) {
        console.error(error);
      }
    },

    async addProduct({commit}, {product}) {
      try {
        const res = await axios.post('/room/save', {
          name: product.name,
          description: product.description,
          price: product.price,
          //ingresa este id tipo por defecto...por ahora.
          idtype: '61737d1c6055b508dc83975f',
        });

        commit('SET_PRODUCT', res.data.body);
        return res.data.message;
      } catch (error) {
        return error.response.data.message;
      }
    },
  },
  modules: {},
});
