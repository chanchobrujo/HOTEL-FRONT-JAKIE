<!-- @format -->

<template>
  <b-container>
    <b-row class="justify-content-md-center mt-4">
      <b-col col md="3">
        <v-card class="mt-4 mx-auto">
          <b-card header="Mejor empleado!" header-border-variant="secondary" align="center">
            <b-card-text>
              <b-form-group description="Nombre">
                <b-form-input v-model="fromUWMR.UWMR.firtsname" disabled> </b-form-input>
              </b-form-group>
              <b-form-group description="Apellido">
                <b-form-input v-model="fromUWMR.UWMR.lastname" disabled> </b-form-input>
              </b-form-group>
              <b-form-group description="Email">
                <b-form-input v-model="fromUWMR.UWMR.email" disabled> </b-form-input>
              </b-form-group>
              <b-form-group description="Fecha de ingreso">
                <b-form-input v-model="fromUWMR.UWMR.datecreated" disabled> </b-form-input>
              </b-form-group>
              <hr />
              <h6 class="text--primary">
                Cantidad de reservaciones realizadas: {{ fromUWMR.cant }}
              </h6>
            </b-card-text>
          </b-card>
        </v-card>
      </b-col>
      <b-col col md="5">
        <v-card class="mt-4 mx-auto">
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
      </b-col>
      <b-col col md="3">
        <v-card class="mt-4 mx-auto">
          <b-card header="Ganancias por fecha" header-border-variant="secondary" align="center">
            <b-input-group class="mb-3">
              <b-form-datepicker
                v-model="fromSEBD.date1"
                placeholder="Fecha inicial"
                class="mb-2"
                required
              ></b-form-datepicker>
            </b-input-group>
            <b-input-group class="mb-3">
              <b-form-datepicker
                v-model="fromSEBD.date2"
                placeholder="Fecha final"
                class="mb-2"
                required
              ></b-form-datepicker>
            </b-input-group>
            <hr />
            Ganacia: {{ amount }}
            <b-form-group>
              <b-button @click="filterDates()">
                <span v-if="button.loading">
                  <b-spinner small type="grow"></b-spinner>
                </span>

                <span class="sr-only">
                  {{ button.name }}
                </span>
              </b-button>
            </b-form-group>
          </b-card>
        </v-card>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  data() {
    return {
      array: {},
      prom: 0,
      all: 0,
      fromUWMR: {
        UWMR: {},
        cant: '',
      },
      fromSEBD: {
        date1: '',
        date2: '',
      },

      amount: 0,

      button: {
        loading: false,
        name: 'Buscar',
      },
    };
  },
  async created() {
    this.array = await this.$store.dispatch('mostUsedRoomTypes');
    this.prom = await this.$store.dispatch('promReservationsTime');
    this.all = await this.$store.dispatch('allReservations');

    const res = await this.$store.dispatch('UserWithMoreReservations');
    this.fromUWMR.cant = res.cant;

    this.fromUWMR.UWMR = await this.$store.dispatch('findById', {
      id: res.iduser,
    });
  },

  methods: {
    async filterDates() {
      this.amount = await this.$store.dispatch('SeeEarningsByDate', {
        date1: this.fromSEBD.date1,
        date2: this.fromSEBD.date2,
      });
    },
  },
};
</script>

<style>
.v-sheet--offset {
  top: -1rem;
  position: relative;
}
</style>
