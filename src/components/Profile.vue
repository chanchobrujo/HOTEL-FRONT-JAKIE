<!-- @format -->

<template>
  <div>
    <span v-if="$store.state.userdto.photo == 'Sin foto.'">
      sin foto mi king
    </span>
    <b-avatar v-else :src="$store.state.userdto.photo" size="10rem"></b-avatar>
    <h4 id="sidebar-no-header-title" class="mt-4">
      {{ $store.state.userdto.firtsname + ' ' + $store.state.userdto.lastname }}
    </h4>
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
