<script setup>
import TodoList from './TodoList.vue';
import AddTodoDialog from './AddTodoDialog.vue';
import Filters from './Filters.vue';
</script>

<template>
  <div class="container">
    <div class="container-top">
      <Filters />
      <AddTodoDialog />
    </div>
    

    <TodoList />
  </div>
</template>

<style scoped>
.container {
  width: 100%;
}
.container-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}
</style>
