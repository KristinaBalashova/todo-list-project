<script>
import Filters from './Filters.vue';
import { mapGetters } from 'vuex';

export default {
  name: 'TodosManager',
  components: {
    Filters,
  },
  computed: {
    ...mapGetters('todos', ['activeTodos']),
  },
};
</script>

<template>
  <div class="container">
    <div class="actions">
      <button class="button">Активные: {{ activeTodos.length + 1}}</button>
      <button class="button">Удалить завершенные</button>
    </div>

    <Filters />
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin: 20px;
}

.actions {
  display: flex;
  gap: 10px;
}

.button {
  padding: 8px 16px;
  font-size: 14px;
  font-weight: bold;
  background-color: #ccd6eb;
  border: 2px solid #ccd6eb;
  border-radius: 4px;
  cursor: pointer;
  color: black;
  transition:
    background-color 0.3s ease,
    color 0.3s ease;
}

.button:hover {
  background-color: #a3c3d9;
}
</style>
