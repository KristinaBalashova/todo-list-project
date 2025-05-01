<script setup>
import TodoItem from './TodoItem.vue';
import NothingFound from './NothingFound.vue';
import Loader from './Loader.vue';
import { FILTER_OPTIONS, TODOS_STATE } from './../constants/contants';
import { TEXT_CONTENT } from '../constants/textContent';
import { computed, onMounted } from 'vue';
import { useTodos } from '../store/todos';
import draggable from 'vuedraggable';

const store = useTodos();

const todos = computed(() => store.todos);
const filter = computed(() => store.filter);
const todosState = computed(() => store.todosState);
const activeTodos = computed(() => store.activeTodos);
const completedTodos = computed(() => store.completedTodos);

const filteredTodos = computed(() => {
  if (filter.value === FILTER_OPTIONS.ACTIVE) {
    return activeTodos.value;
  }
  if (filter.value === FILTER_OPTIONS.COMPLETED) {
    return completedTodos.value;
  }
  return todos.value;
});

const isLoading = computed(() => todosState.value === TODOS_STATE.LOADING);
const isIdle = computed(() => todosState.value === TODOS_STATE.IDLE);
const isError = computed(() => todosState.value === TODOS_STATE.ERROR);
const isSuccess = computed(() => todosState.value === TODOS_STATE.SUCCESS);

function loadTodos() {
  store.fetchTodos();
}

onMounted(() => {
  loadTodos();
});
</script>

<template>
  <div class="container">
    <Loader v-if="isLoading" />

    <div v-if="isError" class="error">
      <NothingFound />
    </div>

    <div v-if="isIdle">
      <p>{{ TEXT_CONTENT.IDL }}</p>
    </div>

    <div v-if="filteredTodos.length === 0 && isSuccess">
      <NothingFound />
    </div>
    <draggable
      v-if="isSuccess && filter === FILTER_OPTIONS.ALL"
      v-model="store.todos"
      tag="ul"
      class="list"
    >
      <template #item="{ element: todo }">
        <li><TodoItem :key="todo.id" :todo="todo" /></li>
      </template>
    </draggable>

    <ul v-else-if="isSuccess" class="list">
      <li v-for="todo in filteredTodos" :key="todo.id">
        <TodoItem :todo="todo" />
      </li>
    </ul>
  </div>
</template>

<style scoped>
.container {
}

.list {
  list-style-type: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>
