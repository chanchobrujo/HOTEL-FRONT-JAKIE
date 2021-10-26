<!-- @format -->
<template>
  <b-container>
    <b-row class="justify-content-md-center mt-4">
      <b-col col md="4">
        <b-card header="INICIO DE SESIÓN" header-bg-variant="primary" header-text-variant="white">
          <b-card-text>
            <b-form @submit="onSubmit">
              <b-form-group description="Ingrese su email." label="Email">
                <b-form-input v-model="username" required type="email"> </b-form-input>
              </b-form-group>

              <b-form-group description="Ingrese su contraseña." label="Password">
                <b-form-input v-model="password" required type="password"> </b-form-input>
              </b-form-group>
              <hr />

              <b-form-group>
                <b-button type="submit" variant="outline-primary">
                  <span v-if="loading">
                    <b-spinner small type="grow"></b-spinner>
                  </span>

                  <span class="sr-only">
                    {{ btnname }}
                  </span>
                </b-button>
              </b-form-group>
              <br />

              <b-form-group>
                <router-link to="/SignUp" style="text-decoration: none;">
                  Desea registrarse?
                </router-link>
              </b-form-group>
              <br />

              <b-form-group>
                <b-alert :variant="viewcolor" :show="viewalert" @dismissed="viewalert = false">
                  {{ message }}
                </b-alert>
              </b-form-group>
            </b-form>
          </b-card-text>
        </b-card>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import {isJwtExpired} from 'jwt-check-expiration';

export default {
  data() {
    return {
      username: '',
      password: '',

      loading: false,
      btnname: 'Entrar',

      viewalert: false,
      viewcolor: 'danger',
      message: '',
    };
  },
  methods: {
    async onSubmit(event) {
      event.preventDefault();
      this.btnname = 'Iniciando...';
      this.loading = true;

      try {
        const res = await this.axios.post('/auth/singin', {
          username: this.username,
          password: this.password,
        });

        localStorage.setItem('token', res.data.body.token);
        this.$store.commit('setToken', res.data.body.token);
        this.$store.commit('setExpired', isJwtExpired(res.data.body.token));

        const role = res.data.body.authorities;

        const isAdmin = this.findAuth('ROLE_ADMIN', role);
        const isRecep = this.findAuth('ROLE_RECEP', role);
        const isHuesp = this.findAuth('ROLE_HUESPED', role);

        localStorage.setItem('isAdmin', isAdmin);
        localStorage.setItem('isRecep', isRecep);
        localStorage.setItem('isHuesp', isHuesp);

        this.$store.commit('setIsAdmin', isAdmin);
        this.$store.commit('setIsRecep', isRecep);
        this.$store.commit('setIsHuesp', isHuesp);

        this.$router.replace({name: 'Menu'});
      } catch (error) {
        this.viewalert = true;
        this.message = error.response.data.message;
      } finally {
        this.loading = false;
      }
    },
    findAuth(rolename, array) {
      if (array.filter((role) => role.authority == rolename) == 0) {
        return false;
      }
      return true;
    },
  },
};
</script>
