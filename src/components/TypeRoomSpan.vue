<!-- @format -->
<template>
  <div>
    <span v-show="false">
      {{ getname(id) }}
    </span>
    <b-button size="sm" pill variant="outline-primary">{{ name }}</b-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: '',
    };
  },
  props: {
    id: String,
  },
  mounted() {},
  methods: {
    async getname(id) {
      const type = await this.$store.dispatch('getType', {
        id: id,
      });
      this.name = type.name;
    },
  },
};
</script>
