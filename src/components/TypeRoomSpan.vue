<!-- @format -->
<template>
  <b-button size="sm" pill disabled variant="outline-primary">{{ name }}</b-button>
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
  async created() {
    this.name = await this.$store.dispatch('getType', {
      id: this.id,
    });
  },
  methods: {},
};
</script>
