<script setup>
import Drawer from '../components/ui/Drawer.vue';
import { computed } from 'vue';
import TodoForm from '../components/TodoForm.vue';
import { useDrawerRoute } from '../composables/useDrawerRoute';
import TodoView from '../components/TodoView.vue';
import SaveForLaterBubble from '../components/SaveForLaterBubble.vue';
import { useRoute } from 'vue-router';
import { useTodos } from '../store';

const route = useRoute();
const store = useTodos();

const taskId = route.params.id
const tasktoEdit = store.todoById(taskId);

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
  if (drawerMode.value === 'view') {
    return props.taskId ? `Задача #${props.taskId}` : 'Просмотр задачи';
  } else if (drawerMode.value === 'create') {
    return 'Создание задачи';
  }
  return 'Задача';
});

</script>

<template>
  <Drawer v-model="isDrawerVisible" :title="title">
    <TodoForm v-if="drawerMode === 'create'" />
    <TodoForm v-else-if="drawerMode === 'edit'" :task="tasktoEdit" />
    <TodoView v-else-if="drawerMode === 'view'" :taskId="props.taskId" />
  </Drawer>
</template>
