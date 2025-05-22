<script setup>
import { ref } from 'vue';
import Dialog from './ui/Dialog.vue';
import TodoForm from './TodoForm.vue';
import Button from './ui/Button.vue';

const dialogVisible = ref(false);
</script>

<template>
  <div>
    <Button color="primary" @click="dialogVisible = true">Добавить задачу</Button>
    <Dialog v-model:visible="dialogVisible" title="Новая задача">
      <template #content>
        <TodoForm @close-dialog="dialogVisible = false"/>
      </template>
      <template #action-button>
      </template>
    </Dialog>
  </div>
</template>

<style scoped>
</style>
