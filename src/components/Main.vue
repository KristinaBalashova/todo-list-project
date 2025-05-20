<script setup>
import TodoList from './TodoList.vue';
import AddTodo from './AddTodo.vue';
import { useTodos } from '../store/todos';
import { useToast } from 'vue-toastification';
import { TEXT_CONTENT } from '../constants/textContent';

const store = useTodos();
const toast = useToast();


function addTodo(newTodo) {
  store.addTodo(newTodo);
  toast.success(TEXT_CONTENT.TASK_ADDED);
}
</script>

<template>
  <div class="container">
    <AddTodo @addTodo="addTodo" />
    <TodoList />
  </div>
</template>

<style scoped>
.container {
  width: 100%;
}
</style>
