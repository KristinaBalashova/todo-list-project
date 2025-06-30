<script setup>
import NothingFound from './NothingFound.vue';
import Loader from './Loader.vue';
import { STATE } from './../constants/contants';
import { TEXT_CONTENT } from '../constants/textContent';
import { computed, onMounted } from 'vue';
import { useProjects } from '../store';

const store = useProjects();

const projectsState = computed(() => store.projectsState);
const projects = computed(() =>
  store.projects.map((project) => ({
    name: project.name,
    id: project.id,
  })),
);

const isLoading = computed(() => projectsState.value === STATE.LOADING);
const isIdle = computed(() => projectsState.value === STATE.IDLE);
const isError = computed(() => projectsState.value === STATE.ERROR);
const isSuccess = computed(() => projectsState.value === STATE.SUCCESS);

onMounted(() => {
  if (projects.value.length === 0 && projectsState.value !== STATE.LOADING) {
    store.fetchProjects();
  }
});
</script>

<template>
  <div class="container">
    <Loader v-if="isLoading" />

    <div v-if="isError" class="error-message">
      <p>Произошла ошибка</p>
    </div>

    <div v-if="isIdle" class="idle-message">
      <p>{{ TEXT_CONTENT.IDL }}</p>
    </div>

    <div v-if="projects.length === 0 && isSuccess">
      <NothingFound />
    </div>

    <div v-if="isSuccess" class="table-wrapper">
      <table class="projects-table">
        <thead>
          <tr>
            <th>Название</th>
            <th>Описание</th>
            <th>Участники</th>
            <th>Главный</th>
            <th>Активные</th>
            <th>В процессе</th>
            <th>Завершённые</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="project in projects" :key="project.id">
            <td>{{ project.name }}</td>
            <td class="placeholder">–</td>
            <td class="placeholder">–</td>
            <td class="placeholder">–</td>
            <td class="placeholder">–</td>
            <td class="placeholder">–</td>
            <td class="placeholder">–</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<style scoped>
.container {
  padding: 20px;
  max-width: 100%;
  overflow-x: auto;
}

.error-message {
  color: red;
  text-align: center;
  font-weight: bold;
  margin-bottom: 10px;
}

.idle-message {
  text-align: center;
  color: gray;
  font-style: italic;
  margin-bottom: 10px;
}

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

.placeholder {
  color: #999;
  font-style: italic;
  text-align: center;
}
</style>
