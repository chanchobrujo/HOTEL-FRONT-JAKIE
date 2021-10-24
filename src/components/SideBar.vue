<!-- @format -->

<template>
  <div>
    <b-sidebar id="sidebar-footer" title="Menú de navegación" backdrop shadow>
      <template #default="{ hide }">
        <div class="p-3">
          <nav class="mb-3">
            <Profile />
            <b-nav vertical>
              <b-nav-item active @click="hide">Active</b-nav-item>
              <b-nav-item href="#link-1" @click="hide">Link</b-nav-item>
              <b-nav-item href="#link-2" @click="hide">Another Link</b-nav-item>
            </b-nav>
          </nav>
          <b-button variant="primary" @click="closeSession" class="btn btn-primary btn-block">
            Close Sidebar
          </b-button>
        </div>
      </template>
    </b-sidebar>
  </div>
</template>

<script>
import Profile from './Profile.vue';
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
  components: {
    Profile,
  },
};
</script>
