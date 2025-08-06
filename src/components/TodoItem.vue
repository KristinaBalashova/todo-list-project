<script setup>
import Chip from '../components/ui/Chip.vue';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const router = useRouter();

const props = defineProps({
  todo: Object,
});

function goToTaskDrawer(id) {
  router.push({ name: 'task-view', params: { id } });
}
</script>

<template>
  <li class="container" :class="{ disabled: todo.status === 'done' }">
    <div @click="goToTaskDrawer(todo.id)" class="card">
      <div class="item">
        <div class="left">
          <h4 class="title" :class="{ lineThrough: todo.status === 'done' }">
            {{ todo.title }}
          </h4>
        </div>
        <div class="right">
          <Chip :color="todo.priority === 'high' ? 'warning' : 'info'" variant="elevated">
            {{ todo.priority }}
          </Chip>
        </div>
      </div>
    </div>
  </li>
</template>

<style scoped>
.container {
  list-style-type: none;
  color: black;
  border-radius: 8px;
  transition: opacity 0.3s ease;
}

.container.disabled {
  opacity: 0.6;
  pointer-events: none;
}

.card {
  width: 100%;
  padding: 16px;
  border-radius: 16px;
  background-color: #ffffff;
  transition: box-shadow 0.3s ease, transform 0.2s ease;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
}

.card:hover {
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
  transform: translateY(-3px);
}

.item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  flex-wrap: wrap;
}

.title {
  margin: 0;
  font-size: 1.1rem;
  font-weight: 600;
  color: #333;
}

.lineThrough {
  text-decoration: line-through;
  color: #888;
}

.right {
  display: flex;
  align-items: center;
  gap: 8px;
}
</style>
