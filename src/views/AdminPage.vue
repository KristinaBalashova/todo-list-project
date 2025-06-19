<template>
  <div class="p-6">
    <h1 class="text-2xl font-semibold mb-4">Админ-панель</h1>
    
    <div class="flex space-x-4 border-b mb-6">
      <button
        v-for="tab in tabs"
        :key="tab.key"
        :class="[
          'px-4 py-2 transition',
          activeTab === tab.key ? 'border-b-2 border-blue-600 font-semibold' : 'text-gray-500'
        ]"
        @click="activeTab = tab.key"
      >
        {{ tab.label }}
      </button>
    </div>

    <div>
      <component :is="activeComponent" />
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const tabs = [
  { key: 'projects', label: 'Проекты' },
  { key: 'users', label: 'Пользователи' },
  { key: 'stats', label: 'Статистика' },
  { key: 'settings', label: 'Настройки' },
];

const activeTab = ref('projects');

const activeComponent = computed(() => {
  switch (activeTab.value) {
    case 'projects':
      return ProjectsTab;
    case 'users':
      return UsersTab;
    case 'stats':
      return StatsTab;
    case 'settings':
      return SettingsTab;
    default:
      return ProjectsTab;
  }
});

const ProjectsTab = {
  template: `<div><h2 class="text-xl font-medium mb-2">Проекты</h2><p>Список проектов (заглушка)</p></div>`
};

const UsersTab = {
  template: `<div><h2 class="text-xl font-medium mb-2">Пользователи</h2><p>Список пользователей (заглушка)</p></div>`
};

const StatsTab = {
  template: `<div><h2 class="text-xl font-medium mb-2">Статистика</h2><p>Здесь будет статистика (заглушка)</p></div>`
};

const SettingsTab = {
  template: `<div><h2 class="text-xl font-medium mb-2">Настройки</h2><p>Настройки системы (заглушка)</p></div>`
};
</script>

<style scoped>
button {
  outline: none;
}
</style>
