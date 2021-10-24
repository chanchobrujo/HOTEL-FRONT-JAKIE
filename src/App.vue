<!-- @format -->

<template>
  <div id="app">
    <Nav :show="!$store.state.expired" />
    <SideBar />
    <router-view />
  </div>
</template>

<script>
//Jpicoyrosas@gmail.com
import Nav from './components/Nav.vue';
import SideBar from './components/SideBar.vue';

export default {
  components: {
    Nav,
    SideBar,
  },

  mounted() {
    console.log('HERE! ');
  },
  methods: {},
};
</script>
