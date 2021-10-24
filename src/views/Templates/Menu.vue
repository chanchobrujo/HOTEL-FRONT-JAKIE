<!-- @format -->

<template>
  <b-container>
    <div>Menu</div>

    <b-button type="submit" variant="outline-primary" @click="closeSession">close</b-button>
  </b-container>
</template>

<script>
import jwt_decode from 'jwt-decode';

export default {
  data() {
    return {};
  },
  created() {},
  methods: {
    async closeSession() {
      localStorage.clear();
      this.$store.commit('setExpired', true);
      this.$router.replace({name: 'SignIn'});
    },
  },
};
</script>
