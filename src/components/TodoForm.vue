<script setup>
import { reactive, watch, computed, onMounted } from 'vue';
import Input from './ui/Input.vue';
import Select from './ui/Select.vue';
import Button from './ui/Button.vue';
import { useToast } from 'vue-toastification';
import { useTodos, useProjects, useUsers } from '../store';
import { useDrawerRoute } from '../composables/useDrawerRoute';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const toast = useToast();
const store = useTodos();
const storeProjects = useProjects();
const usersStore = useUsers();
const { closeDrawer, drawerMode } = useDrawerRoute();

const props = defineProps({
  taskId: {
    type: String,
    required: true,
  },
});

const todoForEdit = store.todoById(props.taskId);

const projectsOptions = computed(() =>
  storeProjects.projects.map((project) => ({
    label: project.name,
    value: String(project.id),
  })),
);

const executorsOptions = computed(() =>
  usersStore.users.map((user) => ({
    label: user.name,
    value: String(user.id),
  })),
);

const isEdit = computed(() => drawerMode.value === 'edit');

const localTask = reactive({
  id: '',
  title: '',
  description: '',
  status: 'todo',
  priority: 'low',
  project_id: '',
  createdAt: '',
  updatedAt: '',
  executor: null,
});

watch(
  () => todoForEdit,
  (newTask) => {
    if (!newTask) return;

    Object.assign(localTask, {
      id: newTask.id ?? '',
      title: newTask.title ?? '',
      description: newTask.description ?? '',
      status: newTask.status ?? 'todo',
      priority: newTask.priority ?? 'low',
      project_id: newTask.project_id ?? '',
      createdAt: newTask.createdAt ?? '',
      updatedAt: newTask.updatedAt ?? '',
      executor: newTask.executor ?? null,
    });
  },
  { immediate: true },
);

async function submitTodo() {
  if (!localTask.title.trim()) {
    toast.error(t('emptyTask'));
    return;
  }

  const todo = {
    title: localTask.title,
    description: localTask.description,
    status: localTask.status,
    priority: localTask.priority,
    project_id: localTask.project_id,
    executor: localTask.executor,
  };

  try {
    if (isEdit.value) {
      const updatedTodo = { id: localTask.id, ...todo };
      store.updateTodo(updatedTodo);
    } else {
      store.createNewTodo(todo);
    }
    closeDrawer();
  } catch (error) {
    toast.error(t('errorOccurred') + ': ' + error.message);
  }
}

onMounted(() => {
  storeProjects.fetchProjects();
  usersStore.fetchUsers();
});
</script>

<template>
  <form class="form" @submit.prevent="submitTodo">
    <Input v-model="localTask.title" :placeholder="t('taskTitle')" class="form-input" />

    <Input v-model="localTask.description" :placeholder="t('taskDescription')" class="form-input" />

    <Select
      v-model="localTask.priority"
      :options="[
        { label: t('low'), value: 'low' },
        { label: t('medium'), value: 'medium' },
        { label: t('high'), value: 'high' },
      ]"
      :label="t('priority')"
      class="select"
    />

    <Select
      v-model="localTask.status"
      :options="[
        { label: t('todo'), value: 'todo' },
        { label: t('inProgress'), value: 'in_progress' },
        { label: t('done'), value: 'done' },
      ]"
      :label="t('status')"
      class="select"
    />

    <Select v-model="localTask.project_id" :options="projectsOptions" :label="t('selectProject')" />

    <Select v-model="localTask.executor" :options="executorsOptions" :label="t('selectExecutor')" />

    <div class="form-buttons">
      <Button type="submit" variant="elevated" color="primary">
        {{ isEdit.value ? $t('saveChanges') : $t('add') }}
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

.form-buttons {
  display: flex;
  justify-content: space-between;
  width: 100%;
}
</style>
