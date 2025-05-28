<script setup>
import HeaderContainer from './components/HeaderContainer.vue';
</script>

<template>
  <v-app >
    <v-main> 
      <v-container id="app">
        <HeaderContainer />
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<style scoped>

#app {
  max-width: 1200px;
  margin: 0 auto;
}

</style>
