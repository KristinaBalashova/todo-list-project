<script setup>
import { ref, watchEffect } from 'vue';
import { generateTableColumns, generateTableRows } from './utils';

const props = defineProps({
  data: {
    type: Array,
    default: [],
  },
  config: {
    type: Object,
    required: true,
  },
});

const columns = ref(generateTableColumns(props.config));
const rows = ref([]);

watchEffect(() => {
  rows.value = generateTableRows(props.data || [], props.config);
});
</script>

<template>
  <div class="container">
    <table class="table">
      <thead>
        <tr>
          <th v-for="column in columns" :key="column.key">
            {{ column.label }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="row in rows" :key="row.id">
          <td v-for="column in columns" :key="column.key">
            {{ row[column.key] }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.container {
  border: 1px solid #ddd;
  border-radius: 6px;
  overflow: hidden;
}

.table {
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
}

.table th,
.table td {
  padding: 12px 16px;
  border-bottom: 1px solid #eee;
  text-align: left;
}

.table thead {
  background-color: #f3f6f9;
  font-weight: bold;
}

.table tbody tr:hover {
  background-color: #f9f9f9;
}
</style>
