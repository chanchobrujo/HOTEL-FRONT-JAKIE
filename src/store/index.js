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

    isAdmin: false,
    isRecep: false,
    isHuesp: false,

    products: [],
    product: {},

    types: [],
  },
  mutations: {
    setEmail(state, status) {
      state.email = status;
    },
    setToken(state, status) {
      state.token = status;
    },
    setExpired(state, status) {
      state.expired = status;
    },

    setIsAdmin(state, status) {
      state.isAdmin = status;
    },
    setIsRecep(state, status) {
      state.isRecep = status;
    },
    setIsHuesp(state, status) {
      state.isHuesp = status;
    },

    SET_PRODUCTS(state, status) {
      state.products = status;
    },
    SET_PRODUCT(state, status) {
      state.products.push(status);
    },

    SET_TYPES(state, status) {
      state.types = status;
    },
  },
  actions: {
    async isRole({commit}, {isAdmin, isRecep, isHuesp}) {
      commit('setIsAdmin', isAdmin);
      commit('setIsRecep', isRecep);
      commit('setIsHuesp', isHuesp);
    },

    async getType({commit}, {id}) {
      try {
        const response = await axios.get('/typeroom/' + id);
        return response.data;
      } catch (error) {
        console.error(error);
      }
    },
    async getTypes({commit}) {
      try {
        const response = await axios.get('/typeroom/');
        const array = response.data;

        commit('SET_TYPES', array);
      } catch (error) {
        console.error(error);
      }
    },

    async getProducts({commit}) {
      try {
        const response = await axios.get('/room/');
        const array = response.data;
        console.log(array);

        commit('SET_PRODUCTS', array);
      } catch (error) {
        console.error(error);
      }
    },
    async addProduct({commit}, {product}) {
      try {
        const res = await axios.post('/room/save', {
          idroom: product.id,
          name: product.name,
          description: product.description,
          price: product.price,
          idtype: product.type,
        });

        return res.data.message;
      } catch (error) {
        return error.response.data.message;
      }
    },
    async deleteProduct({commit}, {id}) {
      try {
        const res = await axios.delete('/room/deleteById/' + id);
        return res.data.message;
      } catch (error) {
        return error.response.data.message;
      }
    },
    async changeState({commit}, {id}) {
      try {
        const res = await axios.put('/room/changeState/' + id);
        return res.data.message;
      } catch (error) {
        return error.response.data.message;
      }
    },
  },
  modules: {},
});
