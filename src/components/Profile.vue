<!-- @format -->

<template>
  <div>
    <b-avatar :src="$store.state.userdto.photo" size="10rem"></b-avatar>
    <h4 id="sidebar-no-header-title" class="mt-4">
      {{ $store.state.userdto.firtsname + ' ' + $store.state.userdto.lastname }}
    </h4>
    <h5 id="sidebar-no-header-title" class="mt-4">
      {{ $store.state.userdto.dni }}
    </h5>
    <p>
      {{ $store.state.userdto.email }}
    </p>
  </div>
</template>

<script>
export default {
  created() {},
};
</script>
