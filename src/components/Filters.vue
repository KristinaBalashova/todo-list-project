<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'Filters',
  computed: {
    ...mapGetters('filter', ['filter']),
  },
  methods: {
    ...mapActions('filter', ['setFilter']),
  },
};
</script>

<template>
  <div class="filters">
    <p class="option" :class="{ active: filter === 'all' }" @click="setFilter('all')">Все</p>
    <p class="option" :class="{ active: filter === 'active' }" @click="setFilter('active')">
      Активные
    </p>
    <p class="option" :class="{ active: filter === 'completed' }" @click="setFilter('completed')">
      Завершенные
    </p>
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
}

.option.active {
  background-color: #007bff;
  color: white;
}

.option:hover {
  background-color: #a3c3d9;
}
</style>