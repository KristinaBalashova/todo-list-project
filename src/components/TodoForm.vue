<script setup>
import { reactive, watch, computed } from 'vue';
import Input from './ui/Input.vue';
import Select from './ui/Select.vue';
import Button from './ui/Button.vue';
import { TEXT_CONTENT } from '../constants/textContent';
import { useToast } from 'vue-toastification';
import { useTodos } from '../store/todos';
import { useProjects } from '../store/projects';
import { onMounted } from 'vue';
import { createNewTodo, updateTodo } from '../api/tasksApi';
import { useDrawerRoute } from '../composables/useDrawerRoute';
import { useStash } from '../store/stash';

const toast = useToast();
const store = useTodos();
const stash = useStash();

const storeProjects = useProjects();
const { isDrawerVisible, closeDrawer, drawerMode } = useDrawerRoute();

const props = defineProps({
  task: {
    type: Object,
    required: false,
    default: () => ({
      title: '',
      status: '',
      priority: '',
      projectId: null,
    }),
  },
});

const projectsOptions = computed(() =>
  storeProjects.projects.map((project) => ({
    label: project.name,
    value: project.id,
  })),
);

const localTask = reactive({ ...props.task });

const emit = defineEmits('closeDialog');

async function submitTodo() {
  if (!localTask.title.trim()) {
    toast.error(TEXT_CONTENT.EMPTY_TASK);
    return;
  }

  const todo = {
    status: localTask.status || 'todo',
    title: localTask.title,
    priority: localTask.priority || 'low',
    project_id: localTask.projectId || null,
  };

  try {
    if (drawerMode.value === 'edit') {
      const updatedTodo = { id: localTask.id, ...todo };
      await updateTodo(updatedTodo);
      store.updateTodoInStore(updatedTodo);
      toast.success('Задача обновлена');
      closeDrawer();
    }

    if (drawerMode.value === 'create') {
      const createdTodo = await createNewTodo(todo);
      store.addTodo(createdTodo);
      toast.success(TEXT_CONTENT.TASK_ADDED);
      closeDrawer();
    }
  } catch (error) {
    toast.error('Ошибка: ' + error.message);
  }
}

function saveForLater() {
  stash.setStash(localTask);
  closeDrawer();
}

onMounted(() => {
  storeProjects.fetchProjects();
});
</script>

<template>
  <form class="form" @submit.prevent="submitTodo">
    <Input v-model="localTask.title" placeholder="Enter a new task" class="form-input" />
    <Select
      v-model="localTask.priority"
      :options="['low', 'medium', 'high']"
      label="Priority"
      class="select"
    />
    <Select
      v-model="localTask.status"
      :options="['todo', 'in_progress', 'done']"
      label="Status"
      class="select"
    />
    <Select v-model="localTask.projectId" :options="projectsOptions" label="Выберите проект" />
    <div class="form-actions">
      <Button type="submit" variant="elevated" color="primary">
        {{ drawerMode.value === 'edit' ? 'Сохранить изменения' : TEXT_CONTENT.ADD }}
      </Button>
      <Button type="button" variant="text" @click="saveForLater">
        Сохранить задачу в черновик
      </Button>
    </div>
  </form>
</template>

<style scoped>
.form {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin: 20px;
  align-items: center;
}
</style>
