<script setup>
import TodoItem from './TodoItem.vue';
import NothingFound from './NothingFound.vue';
import Loader from './Loader.vue';
import { FILTER_OPTIONS, TODOS_STATE } from './../constants/contants';
import { TEXT_CONTENT } from '../constants/textContent';
import { computed, onMounted } from 'vue';
import { useTodos } from '../store/todos';
import Filters
 from './Filters.vue';
const props = defineProps({
  todos: {
    type: Array,
    required: false,
    default: null,
  },
});

const store = useTodos();

const filter = computed(() => store.filter);
const todosState = computed(() => store.todosState);
const baseTodos = computed(() => props.todos ?? store.todos);

const filteredTodos = computed(() => {
  if (filter.value === FILTER_OPTIONS.ACTIVE) {
    return baseTodos.value.filter((t) => t.status !== 'done');
  }
  if (filter.value === FILTER_OPTIONS.COMPLETED) {
    return baseTodos.value.filter((t) => t.status === 'done');
  }
  return baseTodos.value;
});

const isLoading = computed(() => todosState.value === TODOS_STATE.LOADING);
const isIdle = computed(() => todosState.value === TODOS_STATE.IDLE);
const isError = computed(() => todosState.value === TODOS_STATE.ERROR);
const isSuccess = computed(() => todosState.value === TODOS_STATE.SUCCESS);

onMounted(() => {
  if (!props.todos && store.todos.length === 0 && todosState.value !== TODOS_STATE.LOADING) {
    store.fetchTodos();
  }
});
</script>

<template>
  <div class="container">
    <Filters />

    <Loader v-if="isLoading" />

    <div v-if="isError" class="error">
      <p>Произошла ошибка</p>
    </div>

    <div v-if="isIdle">
      <p>{{ TEXT_CONTENT.IDL }}</p>
    </div>

    <div v-if="filteredTodos.length === 0 && isSuccess">
      <NothingFound />
    </div>
    <ul v-if="isSuccess" class="list">
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

.error {
  color: red;
  font-size: 20px;
  text-align: center;
}
</style>
