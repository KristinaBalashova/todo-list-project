<script setup>
import Chip from '../components/ui/Chip.vue';
import Button from './ui/Button.vue';
import { useRouter } from 'vue-router';
import { useTodos } from '../store/todos';

const router = useRouter();
const store = useTodos();

const props = defineProps({
  taskId: {
    type: String,
    required: true,
  },
});

const todo = store.todoById(props.taskId);

function goToTaskDrawer(id) {
  router.push({ name: 'task-edit', params: { id: taskId }, query: { drawerMode: 'edit' } });
}
</script>

<template>
  <div class="task-card">
    <div class="header">
      <h2 class="title">{{ todo.title }}</h2>
      <div class="chips">
        <Chip color="primary" variant="elevated">{{ todo.status }}</Chip>
        <Chip :color="todo.priority === 'high' ? 'warning' : 'info'" variant="elevated">
          {{ todo.priority }}
        </Chip>
      </div>
    </div>

    <v-divider class="my-4" />

    <div class="section">
      <span class="label">Описание:</span>
      <p class="description">{{ todo.description || '—' }}</p>
    </div>

    <!--
    <Button
      color="secondary"
      @click="goToTaskDrawer(todo.id)"
    >
      Редактировать
    </Button>
    -->
  </div>
</template>

<style scoped>
.task-card {
  padding: 24px;
  max-width: 600px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 12px;
}

.title {
  font-size: 22px;
  font-weight: 600;
  margin: 0;
  color: #333;
}

.chips {
  display: flex;
  gap: 8px;
  align-items: center;
}

.section {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.label {
  font-weight: 500;
  color: #666;
  font-size: 14px;
}

.description {
  margin: 0;
  color: #444;
  line-height: 1.5;
  font-size: 15px;
}
</style>
