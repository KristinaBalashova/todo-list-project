<script setup>
import { ref } from 'vue';
import { TEXT_CONTENT } from '../constants/textContent';
import { useToast } from "vue-toastification";
import Input from './ui/Input.vue';
import Button from './ui/Button.vue'; 

const newTask = ref('');

const toast = useToast();

const emit = defineEmits(['addTodo']);

function addNewTodo() {
  if (!newTask.value.trim()) {
    toast.error(TEXT_CONTENT.EMPTY_TASK);
    return;
  }

  const newTodo = {
    status: 'todo',
    id: Date.now(),
    title: newTask.value,
  };

  emit('addTodo', newTodo);
  newTask.value = '';
}
</script>

<template>
  <form class="form" @submit.prevent="addNewTodo">
    <Input
      v-model="newTask"
      placeholder="Enter a new task"
      class="form-input"
    />
    <Button type="submit" variant="elevated" color="primary">
      {{ TEXT_CONTENT.ADD }}
    </Button>
  </form>
</template>

<style scoped>
.form {
  display: flex;
  flex-direction: row;
  gap: 10px;
  margin: 20px;
  align-items: center;
}

.form-input {
  flex: 1;
}
</style>
