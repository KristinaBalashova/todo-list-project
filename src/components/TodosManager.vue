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
      <p class="active">Активные: {{ activeTodos.length + 1 }}</p>
    </div>

    <Filters />
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: start;
  margin: 20px 0;
}

.actions {
  display: flex;
  gap: 10px;
}

.active {
  padding: 8px 16px;
  font-size: 14px;
  font-weight: bold;
  background-color: #e4e67a;
  border: 2px solid #e6d27a;
  border-radius: 4px;
  cursor: pointer;
  color: black;
  margin: 0;
  transition:
    background-color 0.3s ease,
    color 0.3s ease;
}
</style>
