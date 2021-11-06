<!-- @format -->

<template>
  <div id="app">
    <Nav :show="!$store.state.expired" />
    <SideBar />
    <transition name="slide">
      <router-view></router-view>
    </transition>
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
};
</script>
