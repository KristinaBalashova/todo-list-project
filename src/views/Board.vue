
<script setup>
import Card from '../components/ui/Card.vue';
import { useRouter } from 'vue-router';

const router = useRouter();

function goToProjectPage(id) {
  router.push(`/project/${id}`);
}

const cardData = [
  {
    title: 'Project 1',
    subtitle: 'Subtitle 1',
    text: 'This is the text for the first card.',
    id: 1,
  },
  {
    title: 'Project 2',
    subtitle: 'Subtitle 2',
    text: 'This is the text for the second card.',
    id: 2,
  },
  {
    title: 'Project 3',
    subtitle: 'Subtitle 3',
    text: 'This is the text for the third card.',
    id: 3,
  },
  {
    title: 'Project 4',
    subtitle: 'Subtitle 4',
    text: 'This is the text for the fourth card.',
    id: 4,
  }
];
</script>


<template>
  <div class="container">
    <template v-for="(card, index) in cardData" :key="index">
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
