<!-- src/components/AppNavigation.vue -->
<template>
    <nav class="nav">
      <router-link to="/" class="link">🏠 Home</router-link>
      <router-link to="/auth" class="link">🔐 Авторизация</router-link>
      <router-link to="/board" class="link">📋 Доска</router-link>
      <router-link to="/project/1" class="link">📁 Проект</router-link>
      <router-link to="/task/1" class="link">✅ Задача</router-link>
      <router-link to="/reports" class="link">Отчет</router-link>
    </nav>
  </template>
  
  <style scoped>
  .nav {
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
    padding: 16px;
    background-color: #f5f5f5;
    border-bottom: 2px solid #ddd;
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
  