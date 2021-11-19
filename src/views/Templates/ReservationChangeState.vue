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

        <template #cell(Ver_detalle)="row">
          <b-button variant="warning" size="sm" @click="row.toggleDetails" class="m-1">
            <strong style="color:white;">
              {{ row.detailsShowing ? 'Ocultar' : 'Mostrar' }} Detalle
            </strong>
          </b-button>

          <b-button
            v-if="row.item.estado"
            variant="outline-dark"
            size="sm"
            class="m-1"
            v-b-tooltip.hover
            title="Dar de baja"
            @click="ChangeStateReservation(row.item.id)"
          >
            <b-icon icon="arrow-down" aria-hidden="true"></b-icon>
          </b-button>
          <b-button
            v-else
            variant="outline-success"
            size="sm"
            class="m-1"
            v-b-tooltip.hover
            title="Dar de alta"
            @click="ChangeStateReservation(row.item.id)"
          >
            <b-icon icon="arrow-up" aria-hidden="true"></b-icon>
          </b-button>
        </template>

        <template #row-details="row">
          <b-row class="justify-content-md-center mt-4">
            <b-col col md="3">
              <RoomCard :id="row.item.habitacion" />
            </b-col>
            <b-col col md="3">
              <RoomCard :id="row.item.habitacion" />
            </b-col>
            <b-col col md="3">
              <RoomCard :id="row.item.habitacion" />
            </b-col>
          </b-row>
        </template>

        <template #cell(estado)="data">
          <b-icon
            v-if="data.item.estado"
            icon="check-circle-fill"
            font-scale="2"
            variant="success"
          ></b-icon>
          <b-icon v-else icon="exclamation-circle-fill" font-scale="2" variant="danger"></b-icon>
        </template>
      </b-table>
    </b-col>
    {{ message }}
  </b-container>
</template>

<script>
import {dateFormat} from '../../Global';
import RoomCard from '../../components/Cards/RoomCard.vue';

export default {
  components: {
    RoomCard,
  },
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
          'Ver_detalle',
        ],
      },
      reservations: [],
      message: '',
    };
  },
  created() {
    this.getReservations();
  },
  methods: {
    _setTimeout(time) {
      setTimeout(() => {
        this.table.charge = false;
      }, time);
    },
    async ChangeStateReservation(id) {
      this.table.charge = true;
      this.message = '';

      this.message = await this.$store.dispatch('ChangeStateReservation', {
        id: id,
      });

      this.getReservations();
      this._setTimeout(1500);
    },
    async getReservations() {
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
          habitacion: val.idroom,
        };
      });
      this._setTimeout(1500);
    },
  },
};
</script>
