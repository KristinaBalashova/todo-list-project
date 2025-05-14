<template>
  <div class="wip">
    <img src="/cat-coding.png" alt="Cat coding" class="wip__image" />
    <h1 class="wip__title">Страница в разработке</h1>
    <p class="wip__subtitle">Эта страница пока не готова, но я уже работаю над ней</p>
  </div>
</template>

<script setup>
</script>

<style scoped>
.wip {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  background-color: #fdfdfd;
  padding: 40px;
}

.wip__image {
  max-width: 280px;
  margin-bottom: 24px;
}

.wip__title {
  font-size: 32px;
  font-weight: 600;
  color: #2e2e2e;
  margin-bottom: 12px;
}

.wip__subtitle {
  font-size: 18px;
  color: #7a7a7a;
}
</style>
