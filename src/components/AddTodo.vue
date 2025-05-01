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
    completed: false,
    id: Date.now(),
    title: newTask.value,
    userId: 1,
  };

  emit('addTodo', newTodo);
  newTask.value = '';
}
</script>

<template>
  <form class="form" @submit.prevent="addNewTodo">
    <Input v-model="newTask" placeholder="Enter a new task" />
    <Button type="submit" variant="elevated" color="primary">{{ TEXT_CONTENT.ADD }}</Button>
  </form>
</template>

<style scoped>
.form {
  display: flex;
  flex-direction: row;
  gap: 10px;
  margin: 20px;
}

.input {
  font-family: 'Open Sans', sans-serif;
  width: 100%;
  padding: 5px;
  font-size: 14px;
  outline: none;
  border-radius: 4px;
  border-style: none;
  border: solid 1px #993955;
  box-sizing: border-box;
}

.button {
  padding: 8px 16px;
  background-color: #993955;
  border-color: #993955;
  color: white;
  border-radius: 4px;
  width: 160px;
  cursor: pointer;
}

.button:hover {
  background-color: #752d41;
}
</style>

