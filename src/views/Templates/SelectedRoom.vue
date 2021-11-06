<!-- @format -->

<template>
  <b-container>
    <b-row class="justify-content-md-center mt-4">
      <b-col col md="5">
        <b-card
          header="Detalles de reserva"
          header-bg-variant="primary"
          header-text-variant="white"
        >
          <b-card-text>
            <b-form @submit="onSubmit">
              <b-form-group class="mb-3">
                <b-img width="120" center :src="productSelect.photo"></b-img>
              </b-form-group>
              <b-input-group class="mb-3">
                <b-form-group description="Feacha de incio.">
                  <b-form-input v-model="data.date1" disabled> </b-form-input>
                </b-form-group>

                <b-form-group description="Noches.">
                  <b-form-input v-model="data.days" disabled> </b-form-input>
                </b-form-group>
              </b-input-group>
              <b-input-group class="mb-3">
                <b-form-group description="Habitación.">
                  <b-form-input v-model="productSelect.name" disabled> </b-form-input>
                </b-form-group>

                <b-form-group description="Precio.">
                  <b-form-input v-model="productSelect.price" disabled> </b-form-input>
                </b-form-group>
              </b-input-group>

              <b-input-group class="mb-3">
                <b-form-group description="Subtotal.">
                  <b-form-input v-model="data.subtotal" disabled> </b-form-input>
                </b-form-group>

                <b-form-group description="Impuesto.">
                  <b-form-input v-model="data.tax" disabled> </b-form-input>
                </b-form-group>
              </b-input-group>

              <b-input-group class="mb-3">
                <b-form-group description="Total.">
                  <b-form-input v-model="data.total" disabled> </b-form-input>
                </b-form-group>
                <b-form-group>
                  <b-button @click="confirm()">confirmar</b-button>
                </b-form-group>
              </b-input-group>
              <hr />
              <b-form-group>
                <b-alert variant="warning" :show="alert.show" @dismissed="alert.show = false">
                  {{ alert.message }}
                </b-alert>
              </b-form-group>
            </b-form>
          </b-card-text>
        </b-card>
      </b-col>
      <b-col col md="5">
        <b-card
          header="Detalles de huesped"
          header-bg-variant="primary"
          header-text-variant="white"
        >
          <b-card-text>
            <span v-if="$store.state.isHuesp">
              <b-button @click="checked" class="my-4"> {{ namebtn }} </b-button>
            </span>
            <b-input-group class="mb-3">
              <b-form-group description="Dni del huesped.">
                <b-form-input v-model="guestdata.dni" :disabled="disable"> </b-form-input>
              </b-form-group>

              <b-form-group description="Nombre del cliente.">
                <b-form-input v-model="guestdata.firtsname" :disabled="disable"> </b-form-input>
              </b-form-group>
            </b-input-group>
            <b-input-group class="mb-3">
              <b-form-group description="Apellido del huesped.">
                <b-form-input v-model="guestdata.lastname" :disabled="disable"> </b-form-input>
              </b-form-group>

              <b-form-group description="Teléfono del cliente.">
                <b-form-input v-model="guestdata.phone" :disabled="disable"> </b-form-input>
              </b-form-group>
            </b-input-group>

            <b-form-group description="Requerimientos especiales.">
              <b-form-textarea v-model="requirements"> </b-form-textarea>
            </b-form-group>

            <b-form-group description="Email del cliente.">
              <b-form-input v-model="guestdata.email" type="email" :disabled="disable">
              </b-form-input>
            </b-form-group>
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
      alert: {
        message: '',
        show: false,
      },
      from: {
        idroom: this.$route.params.id,
        date1: this.$route.params.d1,
        date2: this.$route.params.d2,
      },
      data: {
        date1: '',
        days: '',
        subtotal: '',
        tax: '',
        total: '',
      },
      guestdata: {
        dni: '',
        firtsname: '',
        lastname: '',
        email: '',
        phone: '',
      },
      namebtn: 'Es para mi?',
      disable: true,
      me: false,
      requirements: '',
      productSelect: {},
    };
  },
  async mounted() {
    this.guestdata.dni = this.$store.state.userdto.dni;
    this.guestdata.firtsname = this.$store.state.userdto.firtsname;
    this.guestdata.lastname = this.$store.state.userdto.lastname;
    this.guestdata.email = this.$store.state.userdto.email;
    this.guestdata.phone = this.$store.state.userdto.number;

    this.namebtn = 'Es para alguien más?';
    this.disable = true;

    this.data = await this.$store.dispatch('CalculateSelectedRoom', {
      from: this.from,
    });
    this.productSelect = await this.$store.dispatch('getProductsById', {
      id: this.from.idroom,
    });
  },
  methods: {
    checked() {
      if (this.me) {
        this.guestdata.dni = this.$store.state.userdto.dni;
        this.guestdata.firtsname = this.$store.state.userdto.firtsname;
        this.guestdata.lastname = this.$store.state.userdto.lastname;
        this.guestdata.email = this.$store.state.userdto.email;
        this.guestdata.phone = this.$store.state.userdto.number;

        this.namebtn = 'Es para alguien más?';
        this.disable = true;
      } else {
        this.guestdata.dni = '';
        this.guestdata.firtsname = '';
        this.guestdata.lastname = '';
        this.guestdata.email = '';
        this.guestdata.phone = '';

        this.namebtn = 'Es para mi?';
        this.disable = false;
      }
      this.me = !this.me;
    },
    async confirm() {
      this.alert.show = true;

      const obj = await this.$store.dispatch('saveReservation', {
        guest: this.guestdata,
        date1: this.from.date1,
        date2: this.from.date2,
        idroom: this.from.idroom,
        iduser: this.$store.state.userdto.idaccount,
        data: this.data,
        requirements: this.requirements,
      });
      console.log(obj);

      this.alert.message = obj.message;

      setTimeout(() => {
        if (obj.body != null) this.$router.replace({name: 'Reservations'});
      }, 1000);
    },
    async onSubmit(event) {},
  },
};
</script>
