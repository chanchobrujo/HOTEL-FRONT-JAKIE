<!-- @format -->

<template>
  <b-container>
    <b-row class="justify-content-md-center mt-4">
      <b-col col md="4">
        <b-card header="REGISTRARSE" header-bg-variant="primary" header-text-variant="white">
          <b-card-text>
            <b-form @submit="onSubmit">
              <b-form-group description="Ingrese su nombre." label="Nombre">
                <b-form-input v-model="from.firtsname" required type="text"> </b-form-input>
              </b-form-group>
              <b-form-group description="Ingrese su apellido." label="Apellido">
                <b-form-input v-model="from.lastname" required type="text"> </b-form-input>
              </b-form-group>
              <b-form-group description="Ingrese su email." label="Email">
                <b-form-input v-model="from.emaill" required type="email"> </b-form-input>
              </b-form-group>
              <b-form-group description="Ingrese su número de teléfono." label="Número de teléfono">
                <b-form-input v-model="from.number" required type="text"> </b-form-input>
              </b-form-group>
              <hr />

              <b-form-group>
                <b-button type="submit" block variant="outline-primary">
                  <span v-if="btn.loading">
                    <b-spinner small type="grow"></b-spinner>
                  </span>

                  <span class="sr-only">
                    {{ btn.name }}
                  </span>
                </b-button>
              </b-form-group>
              <br />

              <b-form-group>
                <router-link to="/" style="text-decoration: none;">
                  Iniciar sesión
                </router-link>
              </b-form-group>
              <br />

              <b-form-group>
                <b-alert :variant="alert.color" :show="alert.show" @dismissed="alert.alert = false">
                  {{ alert.message }}
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
export default {
  data() {
    return {
      from: {
        firtsname: '',
        lastname: '',
        number: '',
        emaill: '',
      },
      btn: {
        loading: false,
        name: 'Registrarse',
      },

      alert: {
        show: false,
        color: 'success',
        message: '',
      },
    };
  },
  methods: {
    async onSubmit(event) {
      event.preventDefault();
      try {
        this.btn.name = 'Registrandose...';
        this.btn.loading = true;

        const res = await this.axios.post('/inscription/', {
          firtsname: this.from.firtsname,
          lastname: this.from.lastname,
          number: this.from.number,
          email: this.from.emaill,
        });

        this.alert.message = res.data.message;
      } catch (error) {
        this.alert.color = 'danger';
        this.alert.message = error.response.data.message;
      } finally {
        this.btn.name = 'Registrarse';
        this.alert.show = true;
        this.btn.loading = false;
      }
    },
  },
};
</script>
