<script setup>
const props = defineProps({
  rows: {
    type: Array,
    required: false,
  },
  columns: {
    type: Array,
    required: false,
  },
});
</script>

<template>
  <div class="table-wrapper">
    <table class="projects-table">
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
.table-wrapper {
  border: 1px solid #ddd;
  border-radius: 6px;
  overflow: hidden;
}

.projects-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
}

.projects-table th,
.projects-table td {
  padding: 12px 16px;
  border-bottom: 1px solid #eee;
  text-align: left;
}

.projects-table thead {
  background-color: #f3f6f9;
  font-weight: bold;
}

.projects-table tbody tr:hover {
  background-color: #f9f9f9;
}
</style>
