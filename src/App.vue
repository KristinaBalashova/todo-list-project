<script setup>
import HeaderContainer from './components/HeaderContainer.vue';
</script>

<template>
  <div id="app">
    <HeaderContainer />
    <router-view />
  </div>
</template>

<style scoped>


#app {
  max-width: 1200px;
  margin: 0 auto;
}


</style>
