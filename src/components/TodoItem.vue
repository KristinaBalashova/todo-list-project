<script setup>
import { TEXT_CONTENT } from '../constants/textContent';
import { useTodos } from '../store/todos';
import { computed, ref } from 'vue';
import { useToast } from 'vue-toastification';
import Chip from '../components/ui/Chip.vue';
import Card from './ui/Card.vue';
import Button from './ui/Button.vue';
import {useRouter} from 'vue-router';

const store = useTodos();
const toast = useToast();
const router = useRouter();

const props = defineProps({
  todo: Object,
});

const isEditing = ref(false);
const editedTitle = ref(props.todo.title);

const editTodo = computed(() => store.editTodo);

function toggleEditMode() {
  if (!props.todo.status !== 'done') {
    isEditing.value = !isEditing.value;
  } else {
    //todo добавить текст ошибки в виде константы
    toast.error("You can't edit a completed task.");
  }
}

function saveTodo() {
  if (!editedTitle.value.trim()) {
    toast.error(TEXT_CONTENT.EMPTY_TASK);
    return;
  }
  editTodo.value({ id: props.todo.id, updates: { title: editedTitle.value } });
  isEditing.value = false;
}

function goToTaskDrawer(id) {
  router.push({ name: 'task-view', params: { id: id }, query: { drawerMode: 'view' } });
}
</script>

<template>
  <li class="container" :class="{ disabled: todo.status === 'done' }">
    <Card :loading="false" @click="goToTaskDrawer(todo.id)">
      <template #content>
        <div v-if="isEditing" class="item">
          <input
            type="text"
            class="input"
            v-model="editedTitle"
            :disabled="todo.status === 'done'"
          />
          <button class="button" @click.stop="saveTodo" :disabled="todo.status === 'done'">
            {{ TEXT_CONTENT.SAVE }}
          </button>
        </div>
        <div v-else class="item">
          <div class="title">
            <h4
              class="title"
              :style="{ textDecoration: todo.status === 'done' ? 'line-through' : 'none' }"
            >
              {{ todo.title }}
            </h4>
            <div class="task-info">
              <Chip color="primary" variant="elevated">
                {{ todo.status }}
              </Chip>
              <Chip :color="todo.priority === 'high' ? 'warning' : 'info'" variant="elevated">
                {{ todo.priority }}
              </Chip>
            </div>
          </div>
        </div>
      </template>
      <template #action-button>
        <Button color="secondary" @click.stop="toggleEditMode" :disabled="todo.status === 'done' || isEditing">
          {{ TEXT_CONTENT.EDIT }}
        </Button>
      </template>
    </Card>
  </li>
</template>

<style scoped>
.container {
  color: black;
  background-color: #e9ecf5;
  border-radius: 4px;
  padding: 20px;
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
