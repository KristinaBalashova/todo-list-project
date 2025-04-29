<script setup>
import Navigation from './components/Navigation.vue';
import HeaderContainer from './components/HeaderContainer.vue';
</script>

<template>
  <div id="app">
    <HeaderContainer />
    <Navigation />
    <router-view />
  </div>
</template>

<style scoped>
#app {
  max-width: 740px;
  margin: 0 auto;
  height: 100%;
}
</style>
