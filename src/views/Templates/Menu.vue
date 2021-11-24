<!-- @format -->

<template>
  <b-container>
    <b-row class="justify-content-md-center mt-4">
      <b-col col md="4">
        <b-card
          header="Buscar habitaciones disponibles"
          header-bg-variant="primary"
          header-text-variant="white"
        >
          <img src="../../assets/res.jpg" width="350rem" class="img-fluid mb-3 d-none d-md-block" />
          <b-card-text>
            <b-form @submit="onSubmit">
              <b-input-group class="mb-3">
                <b-form-datepicker
                  v-model="from.date1"
                  placeholder="Fecha de inicio"
                  class="mb-2"
                  required
                  :min="min"
                ></b-form-datepicker>
              </b-input-group>
              <b-input-group class="mb-3">
                <b-form-datepicker
                  v-model="from.date2"
                  placeholder="Fecha de fin"
                  class="mb-2"
                  required
                  :min="min"
                ></b-form-datepicker>
              </b-input-group>

              <b-input-group class="mb-3">
                <b-form-input v-model="from.nguest" placeholder="Número de huespedes" required>
                </b-form-input>
                <b-form-checkbox class="mx-4" name="check-button" v-model="from.ischildren">
                  Se permiten niños?
                </b-form-checkbox>
              </b-input-group>

              <b-input-group class="mb-3"> </b-input-group>

              <hr />
              <b-form-group>
                <b-button type="submit" class="mx-2" variant="outline-primary">
                  <span v-if="btn.loading">
                    <b-spinner small type="grow"></b-spinner>
                  </span>
                  Buscar habitaciones
                </b-button>
              </b-form-group>
            </b-form>
          </b-card-text>
        </b-card>
      </b-col>
      <b-col col md="8">
        <span v-if="rooms == null">
          <strong>
            No hay disponibilidad de habitaciones para la fecha ingresada
          </strong>
        </span>
        <b-table
          v-if="rooms.length > 0"
          sticky-header
          responsive
          hover
          :busy="tablepro.isBusy"
          :items="rooms"
          caption-top
          :fields="fields"
          outlined
        >
          <template #table-busy>
            <div class="text-center text-primary my-2 mt-2">
              <b-spinner class="align-middle"></b-spinner>
            </div>
          </template>

          <!-- Celda del id del tipo de habitación -->
          <template #cell(idtype)="data">
            <TypeRoomSpan :id="data.value" />
          </template>

          <template #cell(photo)="data">
            <b-img width="175%" :src="data.value"></b-img>
          </template>
          <template #cell(actions)="row">
            <b-button
              @click="update(row.item.idroomm)"
              block
              variant="outline-success"
              size="sm"
              class="m-1"
            >
              <b-icon icon="house-fill" aria-hidden="true"></b-icon>
            </b-button>
          </template>
          <template #table-caption>Habitaciones.</template>
        </b-table>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import TypeRoomSpan from '../../components/Span/TypeRoomSpan.vue';
export default {
  components: {
    TypeRoomSpan,
  },
  data() {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    // 15th two months prior
    const minDate = new Date(today);
    minDate.setMonth(minDate.getMonth() - 2);
    minDate.setDate(15);
    // 15th in two months
    const maxDate = new Date(today);
    maxDate.setMonth(maxDate.getMonth() + 2);
    maxDate.setDate(15);

    console.log(minDate);
    console.log(maxDate);
    return {
      tablepro: {
        isBusy: false,
      },
      fields: ['name', 'idtype', 'price', 'photo', 'actions'],
      from: {
        date1: new Date(),
        date2: new Date(),
        nguest: '',
        ischildren: true,
      },
      rooms: [],
      btn: {
        loading: false,
      },
      min: new Date(),
    };
  },
  created() {},
  methods: {
    async onSubmit(event) {
      event.preventDefault();
      this.btn.loading = true;
      this.tablepro.isBusy = true;
      const array = await this.$store.dispatch('findByAvaliable', {
        from: this.from,
      });

      setTimeout(() => {
        this.rooms = array;
        this.btn.loading = false;
        this.tablepro.isBusy = false;
      }, 2000);
    },
    async update(id) {
      this.$router.replace({
        name: 'SelectedRoom',
        params: {
          id: id,
          d1: this.from.date1,
          d2: this.from.date2,
        },
      });
    },
  },
};
</script>
