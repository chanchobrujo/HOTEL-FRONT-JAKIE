<!-- @format -->

<template>
  <div v-if="show">
    <b-navbar toggleable="lg" type="dark" variant="primary">
      <b-navbar-brand></b-navbar-brand>
      <b-button v-b-toggle.sidebar-footer variant="primary">
        <b-icon icon="list"></b-icon>
      </b-button>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <router-link to="/Menu" style="text-decoration: none;color: white">
            Sistema administrativo
          </router-link>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    show: Boolean,
  },
  methods: {
    async closeSession() {
      localStorage.clear();
      this.$store.commit('setExpired', true);
      this.$router.replace({name: 'SignIn'});
    },
  },
};
</script>
