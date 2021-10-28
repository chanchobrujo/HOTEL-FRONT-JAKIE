<!-- @format -->

<template>
  <b-container>
    <b-row class="justify-content-md-center mt-4">
      <b-col col md="5">
        <b-card
          header="Mantenimiento de habitaciones"
          header-bg-variant="primary"
          header-text-variant="white"
        >
          <b-card-text>
            <!-- FORMULARIO DE REGISTRO DE HABITACIONES -->
            <b-form @submit="onSubmit">
              <!-- -->
              <b-input-group class="mb-3">
                <b-form-input v-model="product.name" placeholder="Nombre" required type="text">
                </b-form-input>
                <b-form-input
                  v-model="product.description"
                  placeholder="Descripción"
                  required
                  type="text"
                >
                </b-form-input>
              </b-input-group>
              <!-- -->
              <b-input-group class="mb-3">
                <b-form-input v-model="product.price" required type="number"> </b-form-input>
                <b-form-select
                  v-model="product.type"
                  :options="$store.state.types"
                  value-field="idtyperoom"
                  text-field="name"
                  disabled-field="!state"
                  required
                >
                  <template #first>
                    <b-form-select-option value="" disabled>
                      -- Please select an option --
                    </b-form-select-option>
                  </template>
                </b-form-select>
              </b-input-group>
              <!-- -->
              <b-form-group class="mb-3">
                <b-form-file v-model="file" accept="image/*"></b-form-file>
                <b-button @click="EncriptImagenAbase64()" variant="link">
                  Ver imagen
                </b-button>
              </b-form-group>
              <!-- -->
              <b-form-group class="mb-3">
                <b-img v-bind="imageprops" center :src="product.photo"></b-img>
              </b-form-group>
              <!-- -->
              <hr />
              <!-- -->
              <b-form-group>
                <b-button type="submit" class="mx-2" variant="outline-primary">
                  <span v-if="loading">
                    <b-spinner small type="grow"></b-spinner>
                  </span>
                  <b-icon icon="cloud-upload" aria-hidden="true"></b-icon>
                </b-button>
                <b-button class="mx-2" @click="clear()" variant="outline-primary">
                  <b-icon icon="arrow90deg-left" aria-hidden="true"></b-icon>
                </b-button>
              </b-form-group>
              <!-- -->
              <br />
              <!-- -->
              <b-form-group>
                <b-alert variant="warning" :show="viewalert" @dismissed="viewalert = false">
                  {{ message }}
                </b-alert>
              </b-form-group>
            </b-form>
          </b-card-text>
        </b-card>
      </b-col>
      <b-col col md="7">
        <!-- TABLA DE HABITACIONES -->
        <b-table
          sticky-header
          responsive
          hover
          :busy="isBusy"
          :items="$store.state.products"
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

          <template #cell(state)="data">
            <b-icon
              v-if="data.value"
              icon="exclamation-circle-fill"
              font-scale="2"
              variant="success"
            ></b-icon>
            <b-icon v-else icon="exclamation-circle-fill" font-scale="2" variant="danger"></b-icon>
          </template>

          <template #cell(photo)="data">
            <b-img height="70" width="90" v-bind="imageprops" center :src="data.value"></b-img>
          </template>

          <template #cell(actions)="row">
            <b-button variant="outline-warning" size="sm" class="m-1" @click="update(row.item)">
              <b-icon icon="pencil-fill" aria-hidden="true"></b-icon>
            </b-button>
            <b-button
              variant="outline-danger"
              size="sm"
              class="m-1"
              @click="deleteProduct(row.item.idroomm)"
            >
              <b-icon icon="trash" aria-hidden="true"></b-icon>
            </b-button>
            <b-button
              v-if="row.item.state"
              variant="outline-dark"
              size="sm"
              class="m-1"
              v-b-tooltip.hover
              title="Dar de baja"
              @click="changeState(row.item.idroomm)"
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
              @click="changeState(row.item.idroomm)"
            >
              <b-icon icon="arrow-up" aria-hidden="true"></b-icon>
            </b-button>
          </template>
          <template #table-caption>Habitaciones.</template>
        </b-table>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import TypeRoomSpan from '../../components/TypeRoomSpan.vue';
import {getBase64} from '../../Global';

export default {
  components: {
    TypeRoomSpan,
  },
  data() {
    return {
      imageprops: {width: '150%', class: 'm1'},
      fields: ['name', 'description', 'idtype', 'price', 'state', 'photo', 'actions'],
      isBusy: true,
      product: {
        id: '',
        name: '',
        description: '',
        price: 50,
        type: {},
        photo: '',
      },
      file: null,

      loading: false,

      viewalert: false,
      message: '',
    };
  },

  created() {
    this.getRooms();
    this.getTypesRoom();
  },
  methods: {
    getRooms() {
      setTimeout(() => {
        this.isBusy = false;
      }, 2000);
      this.$store.dispatch('getProducts');
    },
    getTypesRoom() {
      this.$store.dispatch('getTypes');
    },
    clear() {
      this.product.id = '';
      this.product.name = '';
      this.product.description = '';
      this.product.price = 50;
      this.product.photo = '';
      this.file = null;
    },
    async deleteProduct(id) {
      this.isBusy = true;
      this.message = await this.$store.dispatch('deleteProduct', {
        id: id,
      });
      this.getRooms();
    },
    async changeState(id) {
      this.isBusy = true;
      this.message = await this.$store.dispatch('changeState', {
        id: id,
      });
      this.getRooms();
    },
    async onSubmit(event) {
      event.preventDefault();
      this.loading = true;
      this.isBusy = true;

      const mssg = await this.$store.dispatch('addProduct', {
        product: this.product,
      });

      this.loading = false;

      this.viewalert = true;
      this.message = mssg;

      this.clear();
      this.getRooms();
    },
    async update(item) {
      this.product.id = item.idroomm;
      this.product.name = item.name;
      this.product.description = item.description;
      this.product.price = item.price;
      this.product.type = item.idtype;
      this.product.photo = item.photo;
    },
    async EncriptImagenAbase64() {
      try {
        this.product.photo = await getBase64(this.file);
      } catch (error) {
        this.product.photo = '';
      }
    },
  },
};
</script>
