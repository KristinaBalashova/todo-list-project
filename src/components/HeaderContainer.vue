<script>
export default {
  name: 'HeaderContainer',

  methods: {},

  mounted() {},
};
</script>

<template>
  <div class="header">
    <h1>Todo List</h1>
  </div>
</template>

<style scoped>
.header {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 20px;
  background-color: var(--header-bg-color);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-bottom: 1px solid var(--border-color);
}
.h1 {
}
</style>
