<!-- @format -->

<template>
  <b-container>
    <b-col col md="12">
      <hr />
      <b-table
        sticky-header="80%"
        responsive
        hover
        :busy="table.charge"
        :items="reservations"
        :fields="table.fields"
        caption-top
        outlined
      >
        <template #table-busy>
          <div class="text-center text-primary my-2 mt-2">
            <b-spinner class="align-middle"></b-spinner>
          </div>
        </template>

        <template #cell(estado)="data">
          <b-icon
            v-if="data.value"
            icon="check-circle-fill"
            font-scale="2"
            variant="success"
          ></b-icon>
          <b-icon v-else icon="exclamation-circle-fill" font-scale="2" variant="danger"></b-icon>
        </template>
      </b-table>
    </b-col>
  </b-container>
</template>

<script>
import {dateFormat} from '../../Global';

export default {
  data() {
    return {
      table: {
        charge: true,
        fields: [
          'fechaDeCreacion',
          'fechaInicio',
          'fechaFin',
          'huesped',
          'requerimientos',
          'total',
          'estado',
        ],
      },
      reservations: [],
    };
  },
  created() {
    this.getReservations();
  },
  methods: {
    async getReservations() {
      setTimeout(() => {
        this.table.charge = false;
      }, 2000);
      const array = await this.$store.dispatch('findAllReservation');

      this.reservations = array.map(function(val) {
        return {
          id: val.idreservation,
          fechaDeCreacion: dateFormat(val.datecreated),
          fechaInicio: dateFormat(val.date_ini),
          fechaFin: dateFormat(val.date_end),
          requerimientos: val.requirements,
          total: val.total.toFixed(2),
          estado: val.state,

          huesped: val.dniguest,
          usuario: val.iduser,
          habitación: val.idroom,
        };
      });
    },
  },
};
</script>
