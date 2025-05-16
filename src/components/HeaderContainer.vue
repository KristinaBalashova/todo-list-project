<script setup>
import { TEXT_CONTENT } from '../constants/textContent';
import { useRouter } from 'vue-router';

const router = useRouter();

function goHome() {
  router.push('/');
}
</script>

<template>
  <div class="logo" @click="goHome">
    <span class="logo-text">{{ TEXT_CONTENT.TITLE }}</span>
  </div>
</template>

<style scoped>
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
</style>
