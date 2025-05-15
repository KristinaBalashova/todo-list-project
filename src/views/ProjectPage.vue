<script setup>
import { useRoute } from 'vue-router';
import { ref, onMounted } from 'vue';
import CreateTaskForm from './CreateTaskForm/CreateTaskForm.vue';
import TodosManager from '../components/TodosManager.vue';
import TodoList from '../components/TodoList.vue';

const route = useRoute();
const projectId = ref(route.params.id);

onMounted(() => {
  //todo
  // fetchProjectById(projectId.value)
});
</script>

<template>
  <div class="container">
    <div class="project-header">
      <div>
        <h1>Страница проекта</h1>
        <p>ID проекта: {{ projectId }}</p>
      </div>

      <CreateTaskForm />
    </div>

    <div>
      <TodosManager />
      <TodoList />
    </div>
  </div>
</template>

<style scoped>
.project-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}
</style>
