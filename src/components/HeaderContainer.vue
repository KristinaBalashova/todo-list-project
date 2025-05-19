<script setup>
import { TEXT_CONTENT } from '../constants/textContent';
import { useRouter } from 'vue-router';
import Navigation from './Navigation.vue';

const router = useRouter();

function goHome() {
  router.push('/');
}
</script>

<template>
  <div class="container">
    <div class="logo" @click="goHome">
      <span class="logo-text">{{ TEXT_CONTENT.TITLE }}</span>
    </div>
    <Navigation /> 
  </div>
</template>

<style scoped>
.container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 24px;
  background-color: var(--header-bg-color, #fff);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  border-bottom: 1px solid var(--border-color, #e0e0e0);
  flex-wrap: wrap;
}

.logo {
  font-weight: 700;
  font-size: 1.5rem;
  cursor: pointer;
  user-select: none;
  color: var(--primary-color, #2c3e50);
  display: flex;
  align-items: center;
  gap: 8px;
  transition: opacity 0.2s ease;
}

.logo:hover {
  opacity: 0.8;
}

.logo-text {
  font-family: 'Inter', sans-serif;
  letter-spacing: -0.5px;
}

@media (max-width: 768px) {
  .container {
    flex-direction: column;
    align-items: center;
    gap: 8px;
    padding: 12px 16px;
  }
}
</style>
