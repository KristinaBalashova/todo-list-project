<script setup>
import { ref, computed } from 'vue';
import dayjs from 'dayjs';

// Моковые задачи
const mockTasks = [
  { id: 1, title: 'Fix bug #123', closedAt: '2025-04-20' },
  { id: 2, title: 'Implement auth', closedAt: '2025-04-25' },
  { id: 3, title: 'Update UI', closedAt: '2025-05-01' },
  { id: 4, title: 'Write tests', closedAt: '2025-05-02' },
];

// Дата диапазона
const startDate = ref(null);
const endDate = ref(null);

// Вычисление задач в пределах диапазона
const filteredTasks = computed(() => {
  if (!startDate.value || !endDate.value) return [];

  return mockTasks.filter((task) => {
    const closed = dayjs(task.closedAt);
    return closed.isAfter(dayjs(startDate.value).subtract(1, 'day')) &&
           closed.isBefore(dayjs(endDate.value).add(1, 'day'));
  });
});

const dateMenu = ref(false);
</script>

<template>
  <div class="pa-4">
    <h2 class="text-h5 mb-4">Отчёты по закрытым задачам</h2>

    <v-row class="mb-4" align="center" dense>
      <v-col cols="12" sm="5">
        <v-text-field
          v-model="startDate"
          label="Дата начала"
          prepend-icon="mdi-calendar"
          readonly
          @click="dateMenu = true"
        />
      </v-col>
      <v-col cols="12" sm="5">
        <v-text-field
          v-model="endDate"
          label="Дата окончания"
          prepend-icon="mdi-calendar"
          readonly
          @click="dateMenu = true"
        />
      </v-col>
      <v-col cols="12" sm="2">
        <v-btn color="primary" @click="dateMenu = true">Выбрать даты</v-btn>
      </v-col>
    </v-row>

    <v-menu v-model="dateMenu" close-on-content-click="false">
      <template #activator="{ props }"></template>
      <v-card>
        <v-date-picker
          v-model="startDate"
          title="Дата начала"
          show-adjacent-months
        />
        <v-divider />
        <v-date-picker
          v-model="endDate"
          title="Дата окончания"
          show-adjacent-months
        />
        <v-card-actions>
          <v-spacer />
          <v-btn text @click="dateMenu = false">Готово</v-btn>
        </v-card-actions>
      </v-card>
    </v-menu>

    <div v-if="filteredTasks.length" class="mt-6">
      <h3 class="text-subtitle-1 mb-3">Закрытые задачи:</h3>
      <v-list elevation="1">
        <v-list-item
          v-for="task in filteredTasks"
          :key="task.id"
          :title="task.title"
          :subtitle="`Закрыта: ${task.closedAt}`"
        />
      </v-list>
    </div>

    <div v-else class="mt-6">
      <v-alert type="info" border="start" text>
        Нет задач за выбранный период
      </v-alert>
    </div>
  </div>
</template>
