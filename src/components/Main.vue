<script>
import TodoList from './TodoList.vue';
import AddTodo from './AddTodo.vue';
import TodosManager from './TodosManager.vue';

export default {
  name: 'Main',
  components: {
    TodoList,
    AddTodo,
    TodosManager,
  },
};
</script>

<template>
  <div class="container">
    <AddTodo />
    <TodosManager />
    <TodoList />
  </div>
</template>

<style scoped>
.container {
  width: 100%;
}
</style>
