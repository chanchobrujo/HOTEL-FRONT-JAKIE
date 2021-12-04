<!-- @format -->
<template>
  <b-container>
    <b-row class="justify-content-md-center mt-4">
      <PanelLogo />
      <b-col col md="6">
        <img
          src="../../assets/logo2.jpeg"
          width="350rem"
          class="img-fluid mb-3 d-none d-md-block"
        />
        <h1>Si no tiene una cuenta puede registrarse.</h1>
        <p class="font-italic text-muted mb-0">
          Se le enviará una contraseña a su correo electrónico
        </p>

        <b-form-group>
          <router-link to="/SignUp" style="text-decoration: none;">
            Desea registrarse?
          </router-link>
        </b-form-group>
        <br />
      </b-col>
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
import PanelLogo from '../../components/PanelLogo.vue';
export default {
  components: { 
    PanelLogo,
  },
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
      console.log('d');

      try {
        const res = await this.axios.post('/auth/singin', {
          username: this.username,
          password: this.password,
        });

        this.$store.dispatch('addToken', {
          token: res.data.body.token,
        });

        this.$store.dispatch('findUserByEmail', {
          xy: res.data.body.token,
        });

        this.$store.dispatch('defineRoles', {
          roles: res.data.body.authorities,
        });

        this.$store.dispatch('defineRoutes');

        this.$router.replace({name: 'Reservations'});
      } catch (error) {
        this.viewalert = true;
        this.message = error.response.data.message;
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>
