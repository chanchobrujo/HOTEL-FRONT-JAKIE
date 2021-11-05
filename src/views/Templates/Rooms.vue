<!-- @format -->

<template>
  <b-container>
    <b-row class="justify-content-md-center mt-4">
      <b-col col md="3">
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
                <b-form-input v-model="product.flat" placeholder="Piso" required type="number">
                </b-form-input>
                <b-form-input v-model="product.price" required type="text"> </b-form-input>
              </b-input-group>
              <!-- -->
              <b-input-group class="mb-3">
                <b-form-select
                  id="select"
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
              <b-input-group class="mb-3">
                <b-form-checkbox name="check-button" v-model="product.children" switch>
                  Se permiten niños?
                </b-form-checkbox>
              </b-input-group>
              <!-- -->

              <b-form-group class="mb-3">
                <label class="custom-file-upload">
                  <b-form-file class="file" v-model="file" accept="image/*"></b-form-file>
                </label>

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
      <b-col col md="9">
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

          <template #cell(children)="data">
            <b-icon
              v-if="data.value"
              icon="check-circle-fill"
              font-scale="2"
              variant="success"
            ></b-icon>
            <b-icon v-else icon="check-circle-fill" font-scale="2" variant="danger"></b-icon>
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
            <b-img height="90" width="120" v-bind="imageprops" center :src="data.value"></b-img>
          </template>

          <template #cell(Seleccionar)="row">
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

<style>
#select {
  padding: 0.25rem;
  border: 1px solid gray;
}
input[type='file'] {
  display: none;
}

.custom-file-upload {
  border: 1px solid #ccc;
  display: inline-block;
  padding: 6px 12px;
  cursor: pointer;
  width: 100%;
}
</style>

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
      fields: ['name', 'photo', 'flat', 'idtype', 'price', 'state', 'children', 'Seleccionar'],
      isBusy: true,
      product: {
        id: '',
        flat: '',
        description: '',
        price: 50,
        type: {},
        photo: '',
        children: true,
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
      this.product.flat = 1;
      this.product.description = '';
      this.product.price = 50;
      this.product.photo = '';
      this.product.children = true;
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
      this.product.flat = item.flat;
      this.product.description = item.description;
      this.product.price = item.price;
      this.product.type = item.idtype;
      this.product.photo = item.photo;
      this.product.children = item.children;
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
