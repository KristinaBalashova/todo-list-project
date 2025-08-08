<script setup>
import TodoItem from './TodoItem.vue';
import NothingFound from './NothingFound.vue';
import Loader from './Loader.vue';
import { STATE } from './../constants/contants';
import { computed, onMounted } from 'vue';
import { useTodos } from '../store/todos';
import { useI18n } from 'vue-i18n';
import draggable from 'vuedraggable';

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

const activeTodos = computed({
  get: () => store.activeTodos,
  set: (val) => store.setActiveTodos(val),
});

const inProgressTodos = computed({
  get: () => store.todosInProgress,
  set: (val) => store.setInProgressTodos(val),
});

const completedTodos = computed({
  get: () => store.completedTodos,
  set: (val) => store.setCompletedTodos(val),
});

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
    <div class="todosBoard">
      <h3>{{ $t('activeTasks') }}</h3>
      <draggable
        v-model="activeTodos"
        :group="{ name: 'tasks' }"
        item-key="id"
        class="list"
        :sort="false"
      >
        <template #item="{ element }">
          <TodoItem :key="element.id" :todo="element" />
        </template>
        <template #footer>
          <NothingFound
            v-if="activeTodos.length === 0"
            class="empty-state"
            :text="$t('noActiveTasks')"
          />
        </template>
      </draggable>
    </div>

    <div class="todosBoard">
      <h3>{{ $t('inProgressTasks') }}</h3>
      <draggable
        v-model="inProgressTodos"
        :group="{ name: 'tasks' }"
        item-key="id"
        class="list"
        :sort="false"
      >
        <template #item="{ element }">
          <TodoItem :key="element.id" :todo="element" />
        </template>
        <template #footer>
          <NothingFound
            v-if="inProgressTodos.length === 0"
            class="empty-state"
            :text="$t('noActiveTasks')"
          />
        </template>
      </draggable>
    </div>

    <div class="todosBoard">
      <h3>{{ $t('completedTasks') }}</h3>
      <draggable
        v-model="completedTodos"
        :group="{ name: 'tasks' }"
        item-key="id"
        class="list"
        :sort="false"
      >
        <template #item="{ element }">
          <TodoItem :key="element.id" :todo="element" />
        </template>
        <template #footer>
          <NothingFound
            v-if="completedTodos.length === 0"
            class="empty-state"
            :text="$t('noActiveTasks')"
          />
        </template>
      </draggable>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 20px;
  width: 100%;
}

.todosBoard {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}
.todosBoard > div {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
}

.todosBoard h3 {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 12px;
  color: #2e3a59;
  border-bottom: 1px solid #e0e4ee;
  padding-bottom: 4px;
}

.list {
  background-color: #e9ecf5;
  list-style-type: none;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  flex: 1;
  overflow-y: auto;
  border-radius: 4px;
}

.error {
  color: red;
  font-size: 20px;
  text-align: center;
}
</style>
