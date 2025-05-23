<script setup>
import { useTodos } from '../store/todos';
import { computed } from 'vue';
import { FILTER_OPTIONS } from './../constants/contants';
import { TEXT_CONTENT } from '../constants/textContent';
import Chip from './ui/Chip.vue';
import Button from './ui/Button.vue';

const store = useTodos();

const filter = computed(() => store.filter);
const completedTodos = computed(() => store.completedTodos);

const setFilter = (newFilter) => {
  store.setFilter(newFilter);
};

const clearCompleted = () => {
  store.clearCompleted();
};

const countActiveTodos = computed(() => {
  return store.activeTodos.length;
});

const countCompletedTodos = computed(() => {
  return store.completedTodos.length;
});
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
      {{  option === FILTER_OPTIONS.ACTIVE ? countActiveTodos : '' }}
      {{  option === FILTER_OPTIONS.COMPLETED ? countCompletedTodos : '' }}
    </Chip>

    <Button
      variant="elevated"
      color="error"
      @click="clearCompleted"
      :disabled="completedTodos.length === 0"
    >
      {{ TEXT_CONTENT.DELETE_COMPLETED }}
    </Button>
  </div>
</template>

<style scoped>
.filters {
  display: flex;
  gap: 10px;
  align-items: center;
  flex-wrap: wrap;
  margin: 20px;
}
</style>
