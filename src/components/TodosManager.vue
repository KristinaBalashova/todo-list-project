<script>
import Filters from './Filters.vue';
import { mapGetters } from 'vuex';
import { TEXT_CONTENT } from '../constants/textContent';

export default {
  name: 'TodosManager',
  components: {
    Filters,
  },
  computed: {
    ...mapGetters('todos', ['activeTodos']),
    TEXT_CONTENT() {
      return TEXT_CONTENT;
    },
  },
};
</script>

<template>
  <div class="container">
    <p class="active">{{ TEXT_CONTENT.ACTIVE }} {{ activeTodos.length }}</p>

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

.active {
  padding: 8px 16px;
  font-size: 14px;
  font-weight: bold;
  background-color: #e4e67a;
  border: 2px solid #e6d27a;
  border-radius: 4px;
  color: black;
  margin: 0;
  transition:
    background-color 0.3s ease,
    color 0.3s ease;
}
</style>
