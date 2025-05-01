<script setup>
import { useTodos } from '../store/todos';
import { computed } from 'vue';
import { FILTER_OPTIONS } from './../constants/contants';
import { TEXT_CONTENT } from '../constants/textContent';
import Chip from './ui/Chip.vue';

const store = useTodos();

const filter = computed(() => store.filter);
const completedTodos = computed(() => store.completedTodos);

const setFilter = (newFilter) => {
  store.setFilter(newFilter);
};

const clearCompleted = () => {
  store.clearCompleted();
};
</script>

<template>
  <div class="filters">
    <Chip
      v-for="option in Object.values(FILTER_OPTIONS)"
      :key="option"
      color="primary"
      :variant="filter === option ? 'elevated' : 'text'"
      @click="setFilter(option)"
    >
      {{ TEXT_CONTENT[option.toUpperCase()] }}
    </Chip>

    <button
      class="buttonDelete"
      type="button"
      @click="clearCompleted"
      :disabled="completedTodos.length === 0"
    >
      {{ TEXT_CONTENT.DELETE_COMPLETED }}
    </button>
  </div>
</template>

<style scoped>
.filters {
  display: flex;
  gap: 10px;
  align-items: center;
  flex-wrap: wrap;
}

.buttonDelete {
  cursor: pointer;
  padding: 5px 10px;
  background-color: #ba1b1d;
  color: white;
  border-radius: 4px;
  border: none;
  font-weight: bold;
  transition: background-color 0.3s ease;
}

.buttonDelete:hover {
  background-color: #a0171a;
}
</style>
