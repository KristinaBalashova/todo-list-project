<!-- src/components/AppNavigation.vue -->
<template>
  <nav class="nav">
    <router-link to="/" class="link">🏠 Home</router-link>
    <router-link to="/login" class="link">🔐 Авторизация</router-link>
    <router-link to="/admin" class="link">Панель администратора</router-link>
  </nav>
</template>

<style scoped>

.nav {
  display: flex;
  flex-wrap: wrap;
  justify-content: center; 
}
.link {
  text-decoration: none;
  color: #333;
  font-weight: 600;
  padding: 6px 12px;
  border-radius: 6px;
  transition: background-color 0.2s ease;
}

.link:hover {
  background-color: #eee;
}
.router-link-exact-active {
  background-color: #ddd;
  color: #000;
}
</style>
