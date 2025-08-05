<script setup>
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

</script>

<template>
  <div class="container">
    <p>{{ t('nothingFound') }}</p>
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
