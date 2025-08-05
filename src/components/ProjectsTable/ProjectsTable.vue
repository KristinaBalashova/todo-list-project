<script setup>
import Table from '../ui/Table/Table.vue';
import projectFormConfig from './config.js';
import NothingFound from '../NothingFound.vue';
import Loader from '../Loader.vue';
import { STATE } from '../../constants/contants';
import { computed, onMounted } from 'vue';
import { useProjects } from '../../store';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const store = useProjects();

const projectsState = computed(() => store.projectsState);

const projects = computed(() =>
  store.projects.map((project) => ({
    name: project.name,
    owner: project.owner,
    deadline: project.deadline,
    id: project.id,
  }))
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
  <div class="projects-table-container">
    <Loader v-if="isLoading" />

    <div v-if="isError" class="error-message">
      <p>{{ t('errorOccurred') }}</p>
    </div>

    <div v-if="isIdle" class="idle-message">
      <p>{{ t('idle') }}</p>
    </div>

    <div v-if="projects.length === 0 && isSuccess">
      <NothingFound />
    </div>

    <Table :data="projects" :config="projectFormConfig" />
  </div>
</template>

<style scoped>
.projects-table-container {
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
</style>
