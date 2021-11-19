<!-- @format -->

<template>
  <b-card title="Nombre de habitación" :img-src="room.photo" :sub-title="room.name">
    <span v-show="false">
      {{ getRoom(id) }}
    </span>
    <b-card-text><strong>Precio:</strong> {{ room.price }} </b-card-text>
    <b-card-text><strong>Piso:</strong> {{ room.flat }} </b-card-text>
  </b-card>
</template>

<script>
export default {
  data() {
    return {
      room: {},
    };
  },
  props: {
    id: String,
  },
  methods: {
    async getRoom(id) {
      this.room = await this.$store.dispatch('getProductsById', {
        id: id,
      });
    },
  },
};
</script>
