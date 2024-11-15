<script>
import { mapActions, mapGetters } from 'vuex';
import TodoItem from './TodoItem.vue';
import NothingFound from './NothingFound.vue';
import Loader from './Loader.vue';
import { FILTER_OPTIONS, TODOS_STATE } from './../constants/contants';
import { TEXT_CONTENT } from '../constants/textContent';

export default {
  name: 'TodoList',
  data() {
    return {
      TEXT_CONTENT,
    };
  },
  components: {
    TodoItem,
    NothingFound,
    Loader,
  },
  computed: {
    ...mapGetters('todos', ['todos', 'filter', 'todosState', 'activeTodos', 'completedTodos']),

    filteredTodos() {
      if (this.filter === FILTER_OPTIONS.ACTIVE) {
        return this.activeTodos;
      }
      if (this.filter === FILTER_OPTIONS.COMPLETED) {
        return this.completedTodos;
      }
      return this.todos;
    },

    isLoading() {
      return this.todosState === TODOS_STATE.LOADING;
    },

    isIdle() {
      return this.todosState === TODOS_STATE.IDLE;
    },

    isError() {
      return this.todosState === TODOS_STATE.ERROR;
    },

    isSuccess() {
      return this.todosState === TODOS_STATE.SUCCESS;
    },
  },

  methods: {
    ...mapActions('todos', ['fetchTodos']),
    async loadTodos() {
      await this.fetchTodos({ showToast: this.$toast });
    },
  },
  mounted() {
    this.loadTodos();
  },
};
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

    <ul class="list" v-else-if="isSuccess">
      <TodoItem class="item" v-for="todo in filteredTodos" :key="todo.id" :todo="todo" />
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

.item {
  padding: 8px;
  background-color: #f0f0f0;
  margin-bottom: 4px;
  border-radius: 4px;
}
</style>
