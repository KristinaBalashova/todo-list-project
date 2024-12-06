<script>
import { mapActions } from 'vuex';
import { TEXT_CONTENT } from '../constants/textContent';

export default {
  name: 'TodoItem',

  props: {
    todo: Object,
  },

  data() {
    return {
      isEditing: false,
      editedTitle: this.todo.title,
      TEXT_CONTENT,
    };
  },

  methods: {
    ...mapActions('todos', ['editTodo']),

    toggleEditMode() {
      if (!this.todo.completed) {
        this.isEditing = !this.isEditing;
      }
    },
    saveTodo() {
      if (!this.editedTitle.trim()) {
        this.$toast.error(TEXT_CONTENT.EMPTY_TASK);
        return;
      }
      this.editTodo({ id: this.todo.id, updates: { title: this.editedTitle } });
      this.isEditing = false;
    },

    toggleStatus() {
      const updatedStatus = !this.todo.completed;
      this.editTodo({ id: this.todo.id, updates: { completed: updatedStatus } });
    },
  },
};
</script>

<template>
  <li class="container" :class="{ disabled: todo.completed }">
    <div v-if="isEditing" class="item">
      <input type="text" class="input" v-model="editedTitle" :disabled="todo.completed" />
      <button class="button" @click="saveTodo" :disabled="todo.completed">
        {{ TEXT_CONTENT.SAVE }}
      </button>
    </div>
    <div v-else class="item">
      <div class="title">
        <div class="task-status">
          <span v-if="todo.completed" class="icon" @click="toggleStatus"> ✅ </span>
          <span v-else class="icon" @click="toggleStatus"> ⭕ </span>
        </div>
        <p class="title" :style="{ textDecoration: todo.completed ? 'line-through' : 'none' }">
          {{ todo.title }}
        </p>
      </div>
      <button class="button" @click="toggleEditMode" :disabled="todo.completed">
        {{ TEXT_CONTENT.EDIT }}
      </button>
    </div>
  </li>
</template>

<style scoped>
.container {
  color: black;
  background-color: #e9ecf5;
  border-radius: 4px;
  padding: 20px;
}

.item {
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
  gap: 10px;
}

.input {
  background-color: transparent;
  border: none;
  padding: 5px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.title {
  display: flex;
  align-items: center;
  flex-direction: row;
  gap: 10px;
}

.button {
  margin-left: 10px;
  padding: 5px 10px;
  font-size: 14px;
  cursor: pointer;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
}

.title {
  margin: 0;
}

.container.disabled {
  opacity: 0.5;
}

.icon {
  cursor: pointer;
}
</style>
