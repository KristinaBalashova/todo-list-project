<script setup>
import { useTodos } from '../store/todos';
import { computed, ref } from 'vue';
import { FILTER_OPTIONS } from './../constants/contants';
import { TEXT_CONTENT } from '../constants/textContent';

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
    <p
      class="option"
      :class="{ active: filter === FILTER_OPTIONS.ALL }"
      @click="setFilter(FILTER_OPTIONS.ALL)"
    >
      {{ TEXT_CONTENT.ALL }}
    </p>
    <p
      class="option"
      :class="{ active: filter === FILTER_OPTIONS.ACTIVE }"
      @click="setFilter(FILTER_OPTIONS.ACTIVE)"
    >
      {{ TEXT_CONTENT.ACTIVE }}
    </p>
    <p
      class="option"
      :class="{ active: filter === FILTER_OPTIONS.COMPLETED }"
      @click="setFilter(FILTER_OPTIONS.COMPLETED)"
    >
      {{ TEXT_CONTENT.COMPLETED }}
    </p>
    <button
      class="buttonDelete"
      type="button"
      @click="clearCompleted"
      :disabled="completedTodos.legth === 0"
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
}

.option {
  cursor: pointer;
  padding: 5px 10px;
  font-weight: bold;
  border-radius: 4px;
  transition: background-color 0.3s;
  margin: 0;
}

.option.active {
  background-color: #ae76a6;
}

.option:hover {
  background-color: #e9ecf5;
}

.buttonDelete {
  cursor: pointer;
  padding: 5px 10px;
  background-color: #ba1b1d;
  color: white;
  border-radius: 4px;
  border-color: #ba1b1d;
}

.buttonDelete:hover {
  background-color: #a0171a;
}
</style>
