<script setup>
import { useDrawerRoute } from '../../composables/useDrawerRoute';

const props = defineProps({
  title: {
    type: String,
    default: '',
  },
});

const { isDrawerVisible, closeDrawer } = useDrawerRoute();
</script>

<template>
  <v-navigation-drawer v-model="isDrawerVisible" temporary class="ui-drawer">
    <div class="drawer-header">
      <h3 class="drawer-title">{{ title }}</h3>
      <v-btn icon @click="closeDrawer"> X </v-btn>
    </div>
    <v-divider></v-divider>
    <slot />
  </v-navigation-drawer>
</template>

<style scoped>
.ui-drawer {
  width: 600px !important;
  background-color: #f5f5f5;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.drawer-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px;
}

.drawer-title {
  font-size: 18px;
  font-weight: 500;
  margin: 0;
}
</style>
