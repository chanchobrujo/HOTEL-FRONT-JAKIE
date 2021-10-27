<!-- @format -->

<template>
  <b-container>
    <div>Menu</div>
    {{ ' - isHuesp: ' + $store.state.isHuesp + ' -- ' }}<br />
    {{ ' - isRecep: ' + $store.state.isRecep + ' -- ' }}<br />
    {{ ' - isAdmin: ' + $store.state.isAdmin + ' -- ' }}<br />
    {{ ' - expired: ' + $store.state.expired + ' -- ' }}<br />
    {{ ' - roles: ' + $store.state.userdto.roles + ' -- ' }}<br />
    {{ ' - token: ' + $store.state.token + ' -- ' }}<br />
  </b-container>
</template>

<script>
export default {
  created() {},
};
</script>
