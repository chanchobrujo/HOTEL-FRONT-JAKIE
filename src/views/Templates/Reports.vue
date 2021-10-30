<!-- @format -->

<template>
  <v-card class="mt-4 mx-auto" max-width="700">
    <v-sheet
      class="v-sheet--offset mx-auto"
      color="cyan"
      elevation="12"
      max-width="calc(100% - 32px)"
    >
      <v-sparkline
        :labels="array.types"
        :value="array.count"
        color="white"
        line-width="2"
        padding="16"
      >
      </v-sparkline>
    </v-sheet>

    <v-card-text class="pt-0">
      <div class="text-h6 font-weight-light mb-2">
        Tipos de habitaciones mas usadas
      </div>
      <br />
      <v-divider class="my-2"></v-divider>
      <v-icon class="mr-2" small>
        mdi-clock
      </v-icon>
      <span class="text-caption grey--text font-weight-light">
        Registro actualizado recientemente
      </span>
      {{ prom }}
      {{ all }}

      <br />
      <br />
      <br />
      <v-card class="mx-auto" max-width="344">
        <v-card-text>
          <h2>Reporte actual</h2>
          <hr />
          <h6 class="text--primary">Promedio de dias por reserva: {{ prom }}</h6>
          <br />
          <h6 class="text--primary">Total de reservas hasta ahora: {{ all }}</h6>
        </v-card-text>
      </v-card>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      array: {},
      prom: 0,
      all: 0,
    };
  },
  async created() {
    this.array = await this.$store.dispatch('mostUsedRoomTypes');
    this.prom = await this.$store.dispatch('promReservationsTime');
    this.all = await this.$store.dispatch('allReservations');
  },
};
</script>

<style>
.v-sheet--offset {
  top: -1rem;
  position: relative;
}
</style>
