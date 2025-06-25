<script setup>
import { useRoute } from 'vue-router';
import { ref, onMounted, computed } from 'vue';
import { useTodos } from '../store/todos';

const route = useRoute();
const store = useTodos();

const projectId = route.params.id;
const todos = computed(() => store.todosByProject(projectId));

</script>

<template>
  <div class="container">
    <div class="project-header">
      <div class="project-header-title">
        <h1>Страница проекта</h1>
        <p>ID проекта: {{ projectId }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.project-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 20px;
}

@media (max-width: 768px) {
  .project-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
    
  }
  .project-header-title {
    flex: 1;
  }
}
</style>
