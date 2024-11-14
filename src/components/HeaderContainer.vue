<script>
import { TEXT_CONTENT } from '../constants/textContent';

export default {
  name: 'HeaderContainer',
  data() {
    return {
      TEXT_CONTENT,
    };
  },
};
</script>

<template>
  <div class="header">
    <h1>{{ TEXT_CONTENT.TITLE }}</h1>
  </div>
</template>

<style scoped>
.header {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  background-color: var(--header-bg-color);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-bottom: 1px solid var(--border-color);
}
.h1 {
}
</style>
