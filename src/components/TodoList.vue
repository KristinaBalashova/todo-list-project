<script>
import { mapActions, mapGetters } from 'vuex';
import TodoItem from './TodoItem.vue';
import NothingFound from './NothingFound.vue';

export default {
  name: 'TodoList',
  components: {
    TodoItem,
    NothingFound
  },
  computed: {
    ...mapGetters('todos', ['todos', 'filter', 'activeTodos', 'completedTodos']),
    
    filteredTodos() {
      
      if (this.filter === 'active') {
        console.log(this.filter, 'filter');
        return this.activeTodos.length > 0 ? this.activeTodos : [];
      }
      if (this.filter === 'completed') {
        return this.completedTodos.length > 0 ? this.completedTodos : [];
      }
      return this.todos;
    },
  },
  methods: {
    ...mapActions('todos', ['fetchTodos']),
  },
  mounted() {
    this.fetchTodos();
  },
};
</script>

<template>
  <div class="container">
    <div v-if="isLoading">Loading...</div>

    <div v-if="error" class="error">{{ error }}</div>

    <div v-if="filteredTodos.length === 0">
      <NothingFound />
    </div>
    <ul v-else>
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
}
</style>