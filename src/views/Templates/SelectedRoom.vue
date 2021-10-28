<!-- @format -->

<template>
  <b-container>
    <div>
      {{ 'name: ' + productSelect.name }}<br />
      {{ 'price: ' + productSelect.price }}<br />
      <img :src="productSelect.photo" width="250rem" />
      <hr />
      {{ 'fecha ' + data.date1 }} <br />
      {{ 'dias ' + data.days }} <br />
      {{ 'subtotal ' + data.subtotal }} <br />
      {{ 'impuesto ' + data.tax }} <br />
      {{ 'total ' + data.total }}
      {{ message }}
      <b-button @click="confirm()">confirmar</b-button>
    </div>
  </b-container>
</template>

<script>
export default {
  data() {
    return {
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
        dni: '19963666',
        firtsname: 'Karen',
        lastname: 'Sanchez',
        email: 'Karen@gmail.com',
        phone: '951752053',
      },
      requirements: 'No molestar xd.',
      message: '',
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
      this.message = await this.$store.dispatch('saveReservation', {
        guest: this.guestdata,
        date1: this.from.date1,
        date2: this.from.date2,
        idroom: this.from.idroom,
        iduser: this.$store.state.userdto.idaccount,
        data: this.data,
        requirements: this.requirements,
      });

      setTimeout(() => {
        this.$router.replace({name: 'Reservations'});
      }, 2000);
    },
  },
  /**
   */
};
</script>
