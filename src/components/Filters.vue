<script>
import { mapActions, mapGetters } from 'vuex';
import { FILTER_OPTIONS } from './../constants/contants';

export default {
  name: 'Filters',
  computed: {
    ...mapGetters('todos', ['filter']),
    FILTER_OPTIONS() {
      return FILTER_OPTIONS;
    },
  },
  methods: {
    ...mapActions('todos', ['setFilter', 'clearCompleted']),
  },
};
</script>

<template>
  <div class="filters">
    <p
      class="option"
      :class="{ active: filter === FILTER_OPTIONS.ALL }"
      @click="setFilter(FILTER_OPTIONS.ALL)"
    >
      Все
    </p>
    <p
      class="option"
      :class="{ active: filter === FILTER_OPTIONS.ACTIVE }"
      @click="setFilter(FILTER_OPTIONS.ACTIVE)"
    >
      Активные
    </p>
    <p
      class="option"
      :class="{ active: filter === FILTER_OPTIONS.COMPLETED }"
      @click="setFilter(FILTER_OPTIONS.COMPLETED)"
    >
      Завершенные
    </p>
    <button class="buttonDelete" type="button" @click="clearCompleted">Удалить завершенные</button>
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
