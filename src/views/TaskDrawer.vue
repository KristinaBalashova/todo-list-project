<script setup>
import Drawer from '../components/ui/Drawer.vue';
import { computed } from 'vue';
import TodoForm from '../components/TodoForm.vue';
import { useDrawerRoute } from '../composables/useDrawerRoute';
import TodoView from '../components/TodoView.vue';

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  taskId: String,
});

const {
  isDrawerVisible,
  drawerMode,
  closeDrawer,
} = useDrawerRoute();


const title = computed(() => {
  if (drawerMode === 'view') {
    return props.taskId ? `Задача #${props.taskId}` : 'Просмотр задачи';
  } else if (drawerMode === 'create') {
    return 'Создание задачи';
  }
  return 'Задача';
});

</script>

<template>
  <Drawer v-model="isDrawerVisible" :title="title">
    <TodoForm v-if="drawerMode === 'create'" />
    <TodoView v-else-if="drawerMode === 'view'" :taskId="props.taskId" />
  </Drawer>
</template>
