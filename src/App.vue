<script setup>
import Main from './components/Main.vue';
import HeaderContainer from './components/HeaderContainer.vue';
</script>

<template>
  <div id="app">
    <HeaderContainer />
    <Main />
  </div>
</template>

<style scoped>
#app {
  max-width: 740px;
  margin: 0 auto;
  height: 100%;
}
</style>
