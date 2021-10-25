<!-- @format -->

<template>
  <div>
    <b-sidebar id="sidebar-footer" title="Menú de navegación" backdrop shadow>
      <template>
        <div class="p-3">
          <nav class="mb-3">
            <Profile />
            <b-nav vertical>
              <router-link to="/Rooms" style="text-decoration: none; ">
                Mantenimiento de habitaciones
              </router-link>
            </b-nav>
          </nav>
          <b-button variant="primary" @click="closeSession" class="btn btn-primary btn-block">
            <span v-if="loading">
              <b-spinner small type="grow"></b-spinner>
            </span>

            <span class="sr-only">
              {{ btnname }}
            </span>
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
    return {
      loading: false,
      btnname: 'Cerrar sesión',
    };
  },
  props: {
    show: Boolean,
  },
  methods: {
    async closeSession() {
      this.btnname = 'Cerrando';
      this.loading = true;

      setTimeout(() => {
        localStorage.clear();
        this.$store.commit('setExpired', true);
        this.$router.replace({name: 'SignIn'});
        this.loading = false;
      }, 2000);
    },
  },
  components: {
    Profile,
  },
};
</script>
