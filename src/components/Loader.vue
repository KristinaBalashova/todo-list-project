<script setup></script>

<template>
  <div class="loaderWrapper">
    <div class="loader"></div>
  </div>
</template>

<style scoped>
.loaderWrapper {
  display: flex;
  justify-content: center;
}

.loader {
  border: 8px solid #f3f3f3;
  border-top: 8px solid #ae76a6;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 2s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
