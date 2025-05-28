
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
  background-color: #fff;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  border-left: 1px solid #e0e0e0;
}

.drawer-header {
  background-color: var(--color-info);
  color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
}

.drawer-title {
  font-size: 20px;
  font-weight: 600;
  margin: 0;
}

.close-btn {
  color: #fff;
}

.drawer-content {
  padding: 20px;
}

</style>
