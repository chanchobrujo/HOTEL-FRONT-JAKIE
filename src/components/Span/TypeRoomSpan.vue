<!-- @format -->
<template>
  <div>
    <span v-show="false">
      {{ getname(id) }}
    </span>
    <b-button size="sm" pill variant="outline-primary">{{
      name + ' - Huspedes: ' + numberGuest
    }}</b-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: '',
      numberGuest: 0,
    };
  },
  props: {
    id: String,
  },
  methods: {
    async getname(id) {
      const type = await this.$store.dispatch('getType', {
        id: id,
      });
      this.name = type.name;
      this.numberGuest = type.numberGuest;
    },
  },
};
</script>
