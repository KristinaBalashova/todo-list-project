<script>
import { TEXT_CONTENT } from '../constants/textContent';

export default {
  name: 'AddTodo',

  data() {
    return {
      newTask: '',
      TEXT_CONTENT,
    };
  },
  methods: {
    addNewTodo() {
      if (!this.newTask.trim()) {
        this.$toast.error(TEXT_CONTENT.EMPTY_TASK);
        return;
      }

      const newTodo = {
        completed: false,
        id: Date.now(),
        title: this.newTask,
        userId: 1,
      };

      this.$emit('addTodo', newTodo);
      this.newTask = '';
    },
  },
};
</script>

<template>
  <form class="form" @submit.prevent="addNewTodo">
    <input v-model="newTask" class="input" type="text" placeholder="Enter a new task" />
    <button type="submit" class="button">{{ TEXT_CONTENT.ADD }}</button>
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
