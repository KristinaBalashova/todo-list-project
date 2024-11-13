<script>
import { mapActions, mapGetters } from 'vuex';
import TodoItem from './TodoItem.vue';
import NothingFound from './NothingFound.vue';
import Loader from './Loader.vue';

export default {
  name: 'TodoList',
  components: {
    TodoItem,
    NothingFound,
    Loader
  },
  computed: {
    ...mapGetters('todos', ['todos', 'filter', 'todosState', 'activeTodos', 'completedTodos']),

    filteredTodos() {
      if (this.filter === 'active') {
        return this.activeTodos.length > 0 ? this.activeTodos : [];
      }
      if (this.filter === 'completed') {
        return this.completedTodos.length > 0 ? this.completedTodos : [];
      }
      return this.todos;
    },

    isLoading() {
      return this.todosState === 'loading';
    },

    isIdle() {
      return this.todosState === 'idle';
    },

    isError() {
      return this.todosState === 'error';
    },

    isSuccess() {
      return this.todosState === 'success';
    }
  },
  methods: {
    ...mapActions('todos', ['fetchTodos']),
  },
  mounted() {
    this.fetchTodos().catch((error) => {
      this.$toast.error(error.message);
      this.showError(error.message || 'Failed to fetch todos');
    });
  },
};
</script>

<template>
  <div class="container">
    <Loader v-if="isLoading" />

    <div v-if="isError" class="error">
      <p>An error occurred. Please try again.</p>
    </div>

    <div v-if="isIdle">
      <p>Waiting for data...</p>
    </div>

    <div v-if="filteredTodos.length === 0 && isSuccess">
      <NothingFound />
    </div>

    <ul v-else-if="isSuccess">
      <TodoItem v-for="(todo, index) in filteredTodos" :key="index" :todo="todo" />
    </ul>
  </div>
</template>

<style scoped>
.container {
  
}

ul {
  list-style-type: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

li {
  padding: 8px;
  background-color: #f0f0f0;
  margin-bottom: 4px;
  border-radius: 4px;
}

.error {
  color: red;
  font-weight: bold;
}
</style>