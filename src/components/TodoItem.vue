<script setup>
import { useTodos } from '../store/todos';
import { useToast } from 'vue-toastification';
import Chip from '../components/ui/Chip.vue';
import Card from './ui/Card.vue';
import {useRouter} from 'vue-router';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const store = useTodos();
const toast = useToast();
const router = useRouter();

const props = defineProps({
  todo: Object,
});


function saveTodo() {
  if (!editedTitle.value.trim()) {
    toast.error(t('emptyTask'));
    return;
  }
  editTodo.value({ id: props.todo.id, updates: { title: editedTitle.value } });
  isEditing.value = false;
}

function goToTaskDrawer(id) {
  router.push({ name: 'task-view', params: { id: id } });
}
</script>

<template>
  <li class="container" :class="{ disabled: todo.status === 'done' }">
    <Card :loading="false" @click="goToTaskDrawer(todo.id)">
      <template #content>
        <div class="item">
          <div class="title">
            <h4
              class="title"
              :style="{ textDecoration: todo.status === 'done' ? 'line-through' : 'none' }"
            >
              {{ todo.title }}
            </h4>
            <div class="task-info">
              <Chip :color="todo.priority === 'high' ? 'warning' : 'info'" variant="elevated">
                {{ todo.priority }}
              </Chip>
            </div>
          </div>
        </div>
      </template>
    </Card>
  </li>
</template>

<style scoped>
.container {
  list-style-type: none;
  color: black;
  border-radius: 4px;
}

.item {
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
  gap: 10px;
  
}

.input {
  background-color: transparent;
  border: none;
  padding: 5px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.title {
  display: flex;
  align-items: center;
  flex-direction: row;
  gap: 10px;
}

.button {
  margin-left: 10px;
  padding: 5px 10px;
  font-size: 14px;
  cursor: pointer;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
}

.title {
  margin: 0;
}

.container.disabled {
  opacity: 0.5;
}

.icon {
  cursor: pointer;
}

.task-info {
  display: flex;
  gap: 10px;
}
</style>
