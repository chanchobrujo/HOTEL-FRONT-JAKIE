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
            <b-input-group class="mb-3">
              <b-form-group description="Dni del huesped.">
                <b-form-input v-model="guestdata.dni"> </b-form-input>
              </b-form-group>

              <b-form-group description="Nombre del cliente.">
                <b-form-input v-model="guestdata.firtsname"> </b-form-input>
              </b-form-group>
            </b-input-group>
            <b-input-group class="mb-3">
              <b-form-group description="Apellido del huesped.">
                <b-form-input v-model="guestdata.lastname"> </b-form-input>
              </b-form-group>

              <b-form-group description="Número del cliente.">
                <b-form-input v-model="guestdata.phone"> </b-form-input>
              </b-form-group>
            </b-input-group>

            <b-form-group description="Email del cliente.">
              <b-form-input v-model="guestdata.email"> </b-form-input>
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
      requirements: 'No molestar xd.',
      productSelect: {},
    };
  },
  async created() {
    this.data = await this.$store.dispatch('CalculateSelectedRoom', {
      from: this.from,
    });
    this.productSelect = await this.$store.dispatch('getProductsById', {
      id: this.from.idroom,
    });
  },
  methods: {
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
  /**
   */
};
</script>
