<script setup>
import { TEXT_CONTENT } from '../constants/textContent';
import { useTodos } from '../store/todos';
import { computed, ref } from 'vue';
import { useToast } from 'vue-toastification';

const store = useTodos();
const toast = useToast();

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

function toggleStatus() {
  const statuses = ['todo', 'in_progress', 'done'];
  const currentIndex = statuses.indexOf(props.todo.status);
  const nextStatus = statuses[(currentIndex + 1) % statuses.length];
  editTodo.value({ id: props.todo.id, updates: { status: nextStatus } });
}
</script>

<template>
  <li class="container" :class="{ disabled: todo.status === 'done' }">
    <div v-if="isEditing" class="item">
      <input type="text" class="input" v-model="editedTitle" :disabled="todo.status === 'done'" />
      <button class="button" @click="saveTodo" :disabled="todo.status === 'done'">
        {{ TEXT_CONTENT.SAVE }}
      </button>
    </div>
    <div v-else class="item">
      <div class="title">
        <div class="task-status" @click="toggleStatus">
          <span class="icon" v-if="todo.status === 'done'">✅</span>
          <span class="icon" v-else-if="todo.status === 'in_progress'">🔄</span>
          <span class="icon" v-else>⭕</span>
        </div>
        <p
          class="title"
          :style="{ textDecoration: todo.status === 'done' ? 'line-through' : 'none' }"
        >
          {{ todo.title }}
        </p>
      </div>
      <button class="button" @click="toggleEditMode" :disabled="todo.status === 'done'">
        {{ TEXT_CONTENT.EDIT }}
      </button>
    </div>
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
</style>
