<script setup>
import Navigation from './components/Navigation.vue';
import HeaderContainer from './components/HeaderContainer.vue';
</script>

<template>
  <div id="app">
    <div class="header">
      <HeaderContainer />
      <Navigation />
    </div>

    <router-view />
  </div>
</template>

<style scoped>

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 24px;
  background-color: var(--header-bg-color, #fff);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  border-bottom: 1px solid var(--border-color, #e0e0e0);
  position: sticky;
  top: 0;
  z-index: 100;
}

#app {
  max-width: 1200px;
  margin: 0 auto;
  padding-top: 70px; /* если header фиксированный */
}


</style>
