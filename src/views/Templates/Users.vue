<!-- @format -->

<template>
  <b-container>
    <b-row class="justify-content-md-center mt-4">
      <b-col col md="4">
        <b-card
          header="Mantenimiento de usuarios"
          header-bg-variant="primary"
          header-text-variant="white"
        >
          <b-card-text>
            <!-- FORMULARIO DE REGISTRO DE USUARIOS -->
            <b-form @submit="onSubmit">
              <!-- -->
              <b-input-group class="mb-3">
                <b-form-input v-model="user.dni" placeholder="Dni" required> </b-form-input>
              </b-input-group>
              <!-- -->
              <b-input-group class="mb-3">
                <b-form-input v-model="user.firtsname" placeholder="Nombre" required>
                </b-form-input>
                <b-form-input v-model="user.lastname" placeholder="Apellido" required>
                </b-form-input>
              </b-input-group>
              <!-- -->
              <b-input-group class="mb-3">
                <b-form-input v-model="user.number" placeholder="Número" required> </b-form-input>
                <b-form-input v-model="user.email" placeholder="Email" required> </b-form-input>
              </b-input-group>
              <!-- -->
              <hr />
              <b-form-group>
                <b-button type="submit" class="mx-2" variant="outline-primary">
                  <span v-if="btn.loading">
                    <b-spinner small type="grow"></b-spinner>
                  </span>
                  <b-icon icon="cloud-upload" aria-hidden="true"></b-icon>
                </b-button>
                <b-button class="mx-2" @click="clear()" variant="outline-primary">
                  <b-icon icon="arrow90deg-left" aria-hidden="true"></b-icon>
                </b-button>
              </b-form-group>
              <!-- -->
              <br />
              <!-- -->
              <b-form-group>
                <b-alert
                  variant="warning"
                  :show="alert.viewalert"
                  @dismissed="alert.viewalert = false"
                >
                  {{ alert.message }}
                </b-alert>
              </b-form-group>
            </b-form>
          </b-card-text>
        </b-card>
      </b-col>
      <b-col col md="8">
        <!-- TABLA DE HABITACIONES -->
        <b-table
          sticky-header
          responsive
          hover
          :busy="table.isBusy"
          :items="users"
          caption-top
          :fields="table.fields"
          outlined
        >
          <template #table-busy>
            <div class="text-center text-primary my-2 mt-2">
              <b-spinner class="align-middle"></b-spinner>
            </div>
          </template>

          <template #cell(state)="data">
            <b-icon
              v-if="data.value"
              icon="exclamation-circle-fill"
              font-scale="2"
              variant="success"
            ></b-icon>
            <b-icon v-else icon="exclamation-circle-fill" font-scale="2" variant="danger"></b-icon>
          </template>

          <template #cell(roles)="data">
            {{ data.value[0] }}
          </template>
        </b-table>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  data() {
    return {
      alert: {
        viewalert: false,
        message: '',
      },
      user: {
        dni: '',
        firtsname: '',
        lastname: '',
        number: '',
        email: '',
      },
      btn: {
        loading: false,
      },
      table: {
        isBusy: true,
        fields: ['dni', 'firtsname', 'lastname', 'number', 'email', 'state', 'roles'],
      },
      users: [],
    };
  },
  async created() {
    this.getUsers();
  },
  methods: {
    noImage(name1, name2) {
      return name1.charAt(0) + name2.charAt(0);
    },
    async getUsers() {
      setTimeout(() => {
        this.table.isBusy = false;
      }, 2000);
      this.users = await this.$store.dispatch('getUsers');
    },

    clear() {
      this.user.firtsname = '';
      this.user.lastname = '';
      this.user.number = '';
      this.user.email = '';
    },
    async onSubmit(event) {
      event.preventDefault();
      this.btn.loading = true;

      this.alert.message = await this.$store.dispatch('addUser', {
        user: this.user,
      });

      this.btn.loading = false;

      this.alert.viewalert = true;
      this.getUsers();
      this.clear();
    },
  },
};
</script>
