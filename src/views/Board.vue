
<script setup>
import Card from '../components/ui/Card.vue';
import { useRouter } from 'vue-router';
import fetchProjects from '../api/projectsApi.ts';

const router = useRouter();

function goToProjectPage(id) {
  router.push(`/project/${id}`);
}

const projects = await fetchProjects();

</script>


<template>
  <div class="container">
    <template v-for="(project, index) in projects" :key="index">
      <Card
        :title="card.title"
        :subtitle="card.subtitle"
        :text="card.text"
        :loading="false" 
        @click="goToProjectPage(card.id)"       
      >
        <template #action-button>
          <v-btn color="primary">Action</v-btn>
        </template>
      </Card>
    </template>
  </div>
</template>

<style scoped>
.container {
  width: 100%;
  margin: 20px 0;
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
}

.container > * {
  flex: 1 1 calc(50% - 10px);
  box-sizing: border-box;
}

@media (max-width: 1200px) {
  .container > * {
    flex: 1 1 calc(50% - 20px);
  }
}

@media (max-width: 768px) {
  .container > * {
    flex: 1 1 100%;
  }
}
</style>
