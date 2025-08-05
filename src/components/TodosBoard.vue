<script setup>
import TodoItem from './TodoItem.vue';
import NothingFound from './NothingFound.vue';
import Loader from './Loader.vue';
import { STATE } from './../constants/contants';
import { computed, onMounted } from 'vue';
import { useTodos } from '../store/todos';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const props = defineProps({
  todos: {
    type: Array,
    required: false,
    default: null,
  },
});

const store = useTodos();

const todosState = computed(() => store.todosState);
const activeTodos = computed(() => store.activeTodos);
const completedTodos = computed(() => store.completedTodos);
const inProgressTodos = computed(() => store.todosInProgress);

const isLoading = computed(() => todosState.value === STATE.LOADING);
const isIdle = computed(() => todosState.value === STATE.IDLE);
const isError = computed(() => todosState.value === STATE.ERROR);
const isSuccess = computed(() => todosState.value === STATE.SUCCESS);

onMounted(() => {
  if (!props.todos && store.todos.length === 0 && todosState.value !== STATE.LOADING) {
    store.fetchTodos();
  }
});
</script>

<template>
  <div class="container">
    <Loader v-if="isLoading" />

    <div v-if="isError" class="error">
      <p>{{ $t('errorOccurred') }}</p>
    </div>

    <div v-if="isIdle">
      <p>{{ $t('idle') }}</p>
    </div>

    <div v-if="store.todos.length === 0 && isSuccess">
      <NothingFound />
    </div>

    <div class="todosBoard" v-if="isSuccess">
      <div>
        <h3>{{ $t('activeTasks') }}</h3>
        <ul class="list">
          <TodoItem v-for="todo in activeTodos" :key="todo.id" :todo="todo" />
        </ul>
      </div>

      <div>
        <h3>{{ $t('inProgressTasks') }}</h3>
        <ul class="list">
          <TodoItem v-for="todo in inProgressTodos" :key="todo.id" :todo="todo" />
        </ul>
      </div>

      <div>
        <h3>{{ $t('completedTasks') }}</h3>
        <ul  class="list">
          <TodoItem v-for="todo in completedTodos" :key="todo.id" :todo="todo" />
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
}

.list h3 {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 12px;
  color: #2e3a59;
  border-bottom: 1px solid #e0e4ee;
  padding-bottom: 4px;
}

.todosBoard {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 20px;
}

.list {
  background-color: #e9ecf5;
  list-style-type: none;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.error {
  color: red;
  font-size: 20px;
  text-align: center;
}
</style>
