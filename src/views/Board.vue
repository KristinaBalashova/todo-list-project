<script setup>
import Card from '../components/ui/Card.vue';
import { useRouter } from 'vue-router';
import { useProjects } from '../store/projects';
import { onMounted, computed } from 'vue';

const store = useProjects();
const router = useRouter();

const projects = computed(() => store.projects);

onMounted(() => {
  if (store.projects.length === 0 && store.projectsState !== 'LOADING') {
    store.fetchProjects();
  }
});

function goToProjectPage(id) {
  router.push(`/projects/${id}`);
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
        <template #action-button>
          <v-btn color="primary">Action</v-btn>
        </template>
      </Card>
    </template>
  </div>
</template>
