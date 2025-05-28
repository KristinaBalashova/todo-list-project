<script setup>
import TodoList from '../components/TodoList.vue';
import Button from '../components/ui/Button.vue';
import Filters from '../components/Filters.vue';
import { useRoute, useRouter } from 'vue-router';
import TaskDrawer from './TaskDrawer.vue';
import { useDrawerRoute } from '../composables/useDrawerRoute';

const router = useRouter();
const route = useRoute();

const {
  isDrawerVisible,
  closeDrawer,
} = useDrawerRoute();

function openTaskDrawer() {
  router.push({ name: 'task-create'} );
}
</script>

<template>
 <div class="container">
    <div class="container-top">
      <Filters />
      <Button color="primary" @click="openTaskDrawer">Добавить задачу</Button>
    </div>
    <TodoList />
    <TaskDrawer 
      v-if="isDrawerVisible"
      :task-id="route.params.id"
      />
    
  </div>
</template>

<style scoped>
.container {
  width: 100%;
}

.container-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}
</style>
