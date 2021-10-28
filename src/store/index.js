/** @format */

import Vue from 'vue';
import Vuex from 'vuex';

import axios from 'axios';
import jwt_decode from 'jwt-decode';
import {findAuth, routesByRole} from '../Global';
import {isJwtExpired} from 'jwt-check-expiration';

import VuexPersistence from 'vuex-persist';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: '',
    expired: true,

    isAdmin: false,
    isRecep: false,
    isHuesp: false,

    products: [],
    product: {},
    types: {},

    userdto: '',

    routes: [],
  },
  mutations: {
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
    setRoutes(state, status) {
      state.routes = status;
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

    SET_USERDTO(state, status) {
      state.userdto = status;
    },
  },
  actions: {
    async addToken({commit}, {token}) {
      commit('setToken', token);
      commit('setExpired', isJwtExpired(token));
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
          photo: product.photo,
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

    async findUserByEmail({commit}, {xy}) {
      try {
        let email = jwt_decode(xy).sub;

        const response = await axios.get('/profile/findByEmail/' + email);
        commit('SET_USERDTO', response.data);
      } catch (error) {}
    },

    async clear({commit}) {
      commit('setExpired', true);
      commit('SET_USERDTO', '');
      commit('setToken', '');
    },

    async defineRoles({commit}, {roles}) {
      commit('setIsAdmin', findAuth('ROLE_ADMIN', roles));
      commit('setIsRecep', findAuth('ROLE_RECEP', roles));
      commit('setIsHuesp', findAuth('ROLE_HUESPED', roles));
    },

    async defineRoutes({commit}) {
      commit('setRoutes', routesByRole());
    },
  },
  modules: {},
  plugins: [
    new VuexPersistence({
      storage: window.localStorage,
    }).plugin,
  ],
});
