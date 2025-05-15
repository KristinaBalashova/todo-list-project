<script setup>
import { TEXT_CONTENT } from '../constants/textContent';
</script>

<template>
  <div class="container">
    <p>{{ TEXT_CONTENT.NOTHING_FOUND }}</p>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  justify-content: center;
}

.container p {
  color: #808080;
  font-size: 18px;
  text-align: center;
}
</style>
