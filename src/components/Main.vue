<script setup>
import TodoList from './TodoList.vue';
import AddTodo from './AddTodo.vue';
import TodosManager from './TodosManager.vue';
import { useTodos } from '../store/todos';

const store = useTodos();


const setTodos = () => {
  store.setTodos();
};

function addTodo(newTodo) {
  setTodos(newTodo);
  //todo доделать тостер
  //this.$toast.success(TEXT_CONTENT.TASK_ADDED);
}
  

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
