<script>
import { mapActions } from 'vuex';
import TodoList from './TodoList.vue';
import AddTodo from './AddTodo.vue';
import TodosManager from './TodosManager.vue';
import { TEXT_CONTENT } from '../constants/textContent';

export default {
  name: 'Main',
  data() {
    return {
      TEXT_CONTENT,
    };
  },
  components: {
    TodoList,
    AddTodo,
    TodosManager,
  },
  methods: {
    ...mapActions('todos', ['setTodos']),
    addTodo(newTodo) {
      this.setTodos(newTodo);
      this.$toast.success(TEXT_CONTENT.TASK_ADDED);
    },
  },
};
</script>

<template>
  <div class="container">
    <AddTodo @addTodo="addTodo" />
    <TodosManager />
    <TodoList />
  </div>
</template>

<style scoped>
.container {
  width: 100%;
}
</style>
