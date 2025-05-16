<script setup>
import Card from '../components/ui/Card.vue';
import { useRouter } from 'vue-router';
import { useProjects } from '../store/projects';
import { onMounted, computed } from 'vue';
import Button from '../components/ui/Button.vue';

const store = useProjects();
const router = useRouter();

const projects = computed(() => store.projects);

onMounted(() => {
  if (store.projects.length === 0 && store.projectsState !== 'LOADING') {
    store.fetchProjects();
  }
});

function goToProjectPage(id) {
  router.push(`/project/${id}`);
}
</script>

<template>
  <div class="container">
    <template v-for="(project, index) in projects" :key="index">
      <Card
        :title="project.name"
        :subtitle="project.description"
        :loading="false"
        @click="goToProjectPage(project.id)"
      >
        <template #content>
          
        </template>
        <template #action-button>
          <Button color="primary">К проекту</Button>
        </template>
      </Card>
    </template>
  </div>
</template>

<style scoped>
.container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
  padding: 20px;
}
</style>
