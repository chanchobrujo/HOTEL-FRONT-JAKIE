<!-- @format -->

<template>
  <b-navbar v-if="show" toggleable="lg" type="dark" variant="primary">
    <b-navbar-brand v-b-toggle.sidebar-footer>
      <b-avatar :src="$store.state.userdto.photo" size="3rem"></b-avatar>
    </b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <router-link to="/Menu" style="text-decoration: none;color: white">
          Sistema administrativo
        </router-link>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
import {noImage} from '../Global';
export default {
  data() {
    return {
      name: noImage(),
    };
  },
  props: {
    show: Boolean,
  },
  methods: {},
};
</script>
