<!-- @format -->

<template>
  <b-card title="Huesped">
    <span v-show="false">
      {{ getGuest(dni) }}
    </span>
    <b-card-text><strong>Nombre: </strong>{{ guest.firtsname }} </b-card-text>
    <b-card-text><strong>Apellido: </strong> {{ guest.lastname }} </b-card-text>
    <b-card-text><strong>Correo electrónico: </strong> {{ guest.email }} </b-card-text>
    <b-card-text><strong>Teléfono: </strong> {{ guest.phone }} </b-card-text>
  </b-card>
</template>

<script>
export default {
  data() {
    return {
      guest: {},
    };
  },
  props: {
    dni: String,
  },
  methods: {
    async getGuest(dni) {
      this.guest = await this.$store.dispatch('findByGuestDni', {
        dni: dni,
      });
    },
  },
};
</script>
