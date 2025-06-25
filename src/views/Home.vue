<script setup>
import Button from '../components/ui/Button.vue';
import { useRoute, useRouter } from 'vue-router';
import TaskDrawer from './TaskDrawer.vue';
import { useDrawerRoute } from '../composables/useDrawerRoute';
import Board from '../components/Board.vue';
import TodosBoard from '../components/TodosBoard.vue';

const router = useRouter();
const route = useRoute();

const { isDrawerVisible, closeDrawer } = useDrawerRoute();

function openTaskDrawer() {
  router.push({ name: 'task-create' });
}
</script>

<template>
  <div class="container">
    <div class="container-top">
      
      <div class="filters">
        <Board />
        <Button color="primary" @click="openTaskDrawer">Добавить задачу</Button>
      </div>
    </div>
    <TodosBoard />
    <TaskDrawer v-if="$route.meta.drawer && isDrawerVisible" :task-id="route.params.id" />
  </div>
</template>

<style scoped>
.container {
  width: 100%;
}

.filters {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}
</style>
