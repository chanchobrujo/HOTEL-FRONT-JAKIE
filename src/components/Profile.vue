<!-- @format -->

<template>
  <div>
    <b-avatar :src="$store.state.userdto.photo" size="8rem"></b-avatar>
    <h4 id="sidebar-no-header-title" class="mt-4">
      {{ $store.state.userdto.firtsname + ' ' + $store.state.userdto.lastname }}
    </h4>
    <p></p>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  created() {},
  methods: {},
};
</script>
