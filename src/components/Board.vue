<script setup>
import { useRouter } from 'vue-router';
import { useProjects } from '../store/projects';
import { onMounted, computed, ref, watch} from 'vue';
import Select from './ui/Select.vue';

const store = useProjects();
const router = useRouter();
const selectedProject = ref(null);

const projectsOptions = computed(() =>
  store.projects.map((project) => ({
    label: project.name,
    value: project.id,
  })),
);

onMounted(() => {
  if (store.projects.length === 0 && store.projectsState !== 'LOADING') {
    store.fetchProjects();
  }
});

function goToProjectPage(id) {
  router.push(`/project/${id}`);
}

watch(selectedProject, (newVal) => {
  if (newVal) {
    goToProjectPage(newVal);
  }
});


</script>

<template>
  <div class="container">
    <Select
      v-model="selectedProject"
      :options="projectsOptions"
      placeholder="Выберите проект"
    />
  </div>
</template>

<style scoped>
.container {
  display: flex;
  justify-content: start;
  padding: 20px;
}
</style>
