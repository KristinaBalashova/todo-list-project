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
    };
  },

  computed: {
    TEXT_CONTENT() {
      return TEXT_CONTENT;
    },
  },

  methods: {
    ...mapActions('todos', ['updateTodoStatus', 'updateTodoTitle']),

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
      this.updateTodoTitle({ id: this.todo.id, title: this.editedTitle });
      this.todo.title = this.editedTitle;
      this.isEditing = !this.isEditing;
    },

    toggleStatus() {
      const updatedStatus = !this.todo.completed;
      this.updateTodoStatus({ id: this.todo.id, completed: updatedStatus });
    },
  },
};
</script>

<template>
  <div class="container" :class="{ disabled: todo.completed }">
    <div v-if="isEditing" class="item">
      <input type="text" class="input" v-model="editedTitle" :disabled="todo.completed" />
      <button @click="saveTodo" :disabled="todo.completed">{{ TEXT_CONTENT.SAVE }}</button>
    </div>
    <div v-else class="item">
      <div class="title">
        <div class="task-status">
          <span v-if="todo.completed" class="icon completed" @click="toggleStatus"> ✅ </span>
          <span v-else class="icon active" @click="toggleStatus"> ⭕ </span>
        </div>
        <p class="title" :style="{ textDecoration: todo.completed ? 'line-through' : 'none' }">
          {{ todo.title }}
        </p>
      </div>
      <button @click="toggleEditMode" :disabled="todo.completed">{{ TEXT_CONTENT.EDIT }}</button>
    </div>
  </div>
</template>

<style scoped>
.container {
  color: black;
  background-color: #e9ecf5;
  border-radius: 4px;
  padding: 20px;
}

.input {
  background-color: transparent;
  border: none;
}

.title {
  display: flex;
  align-items: center;
  flex-direction: row;
  gap: 10px;
}

.container input[type='text'] {
  padding: 5px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.container button {
  margin-left: 10px;
  padding: 5px 10px;
  font-size: 14px;
  cursor: pointer;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
}

.container input[type='checkbox'] {
  margin-right: 10px;
}

.item {
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
  gap: 10px;
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
