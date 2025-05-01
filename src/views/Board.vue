<template>
  <div class="container">
    <template v-for="(card, index) in cardData" :key="index">
      <Card
        :title="card.title"
        :subtitle="card.subtitle"
        :text="card.text"
        :loading="false"            
      >
        <template #action-button>
          <v-btn color="primary">Action</v-btn>
        </template>
      </Card>
    </template>
  </div>
</template>

<script setup>
import Card from '../components/ui/Card.vue';

const cardData = [
  {
    title: 'Title 1',
    subtitle: 'Subtitle 1',
    text: 'This is the text for the first card.',
  },
  {
    title: 'Title 2',
    subtitle: 'Subtitle 2',
    text: 'This is the text for the second card.',
  },
  {
    title: 'Title 3',
    subtitle: 'Subtitle 3',
    text: 'This is the text for the third card.',
  },
  {
    title: 'Title 4',
    subtitle: 'Subtitle 4',
    text: 'This is the text for the fourth card.',
  }
];
</script>

<style scoped>
.container {
  width: 100%;
  margin: 20px;
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
}

.container > * {
  flex: 1 1 calc(50% - 10px); /* Каждая карточка занимает треть ширины с учетом отступа */
  box-sizing: border-box;
}

@media (max-width: 1200px) {
  .container > * {
    flex: 1 1 calc(50% - 20px); /* Для экранов меньшего размера каждая карточка занимает половину ширины */
  }
}

@media (max-width: 768px) {
  .container > * {
    flex: 1 1 100%; /* Для экранов мобильных устройств карточки занимают всю ширину */
  }
}
</style>
