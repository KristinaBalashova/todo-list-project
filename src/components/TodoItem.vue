<script>
export default {
  name: 'TodoItem',

  props: {
    todo: Object,
  },

  data() {
    return {
      isEditing: false,
    };
  },

  methods: {
    toggleEditMode() {
      this.isEditing = !this.isEditing;
    },
    toggleComplete() {
      this.todo.isComplete = !this.todo.isComplete; // Toggle the complete state
    },
  },
};
</script>

<template>
  <div class="container">
    <div v-if="isEditing" class="item">
      <input type="text" v-model="todo.name" />
      <button @click="toggleEditMode">Save</button>
    </div>
    <div v-else class="item">
      <div class="title">
        <input
          type="checkbox"
          v-model="todo.isComplete"
          @change="toggleComplete"
          :checked="todo.isComplete"
        />
        <p :style="{ textDecoration: todo.isComplete ? 'line-through' : 'none' }">
          {{ todo.title }}
        </p>
      </div>
      <button @click="toggleEditMode">Edit</button>
    </div>
  </div>
</template>

<style scoped>
.container {
  color: black;
  background-color: #e9ecf5;
  border-radius: 4px;
  padding-left: 20px;
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
}
</style>
