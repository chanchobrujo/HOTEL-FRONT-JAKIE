<!-- @format -->

<template>
  <div>
    <b-sidebar id="sidebar-footer" title="Menú de navegación" backdrop shadow>
      <template>
        <div class="p-3">
          <nav class="mb-3">
            <Profile />

            <br />

            <b-nav vertical v-for="item in $store.state.routes" :key="item.name">
              <span class="my-3">
                <router-link :to="item.link" style="text-decoration: none;">
                  <b-button variant="outline-primary" block>
                    {{ item.name }}
                  </b-button>
                </router-link>
              </span>
            </b-nav>
          </nav>

          <hr />
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
        this.$store.dispatch('clear');
        this.$router.replace({name: 'SignIn'});

        this.loading = false;
        this.btnname = 'Cerrar sesión';
      }, 2000);
    },
  },
  components: {
    Profile,
  },
};
</script>
