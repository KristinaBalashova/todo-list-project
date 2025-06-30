<script setup>
import { ref, computed } from 'vue';
import Projects from "../components/Projects.vue";

const tabs = [
  { key: 'projects', label: 'Проекты' },
  { key: 'users', label: 'Пользователи' },
  { key: 'stats', label: 'Статистика' },
  { key: 'settings', label: 'Настройки' },
];

const activeTab = ref('projects');

const UsersTab = {
  template: `<div><h2 class="text-xl font-medium mb-2">Пользователи</h2><p>Список пользователей (заглушка)</p></div>`
};

const StatsTab = {
  template: `<div><h2 class="text-xl font-medium mb-2">Статистика</h2><p>Здесь будет статистика (заглушка)</p></div>`
};

const SettingsTab = {
  template: `<div><h2 class="text-xl font-medium mb-2">Настройки</h2><p>Настройки системы (заглушка)</p></div>`
};

const activeComponent = computed(() => {
  switch (activeTab.value) {
    case 'projects':
      return Projects;
    case 'users':
      return UsersTab;
    case 'stats':
      return StatsTab;
    case 'settings':
      return SettingsTab;
    default:
      return Projects;
  }
});
</script>

<template>
  <div class="admin-container">
    <h1 class="admin-title">Админ-панель</h1>

    <div class="tabs">
      <button
        v-for="tab in tabs"
        :key="tab.key"
        :class="['tab-button', { active: activeTab === tab.key }]"
        @click="activeTab = tab.key"
      >
        {{ tab.label }}
      </button>
    </div>

    <div class="tab-content">
      <component :is="activeComponent" />
    </div>
  </div>
</template>


<style scoped>
.admin-container {
  padding: 24px;
  font-family: Arial, sans-serif;
  max-width: 1200px;
  margin: 0 auto;
  background-color: #fafafa;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

.admin-title {
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 24px;
  color: #333;
}

.tabs {
  display: flex;
  border-bottom: 2px solid #e0e0e0;
  margin-bottom: 24px;
  gap: 12px;
  flex-wrap: wrap;
}

.tab-button {
  padding: 10px 20px;
  background: none;
  border: none;
  font-size: 16px;
  color: #666;
  cursor: pointer;
  transition: all 0.3s ease;
  border-bottom: 2px solid transparent;
}

.tab-button:hover {
  color: #007bff;
}

.tab-button.active {
  color: #007bff;
  font-weight: bold;
  border-bottom: 2px solid #007bff;
}

.tab-content {
  background-color: #fff;
  padding: 20px;
  border-radius: 6px;
  border: 1px solid #e0e0e0;
}
</style>
