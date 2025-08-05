<script setup>
import { reactive, watch, computed } from 'vue';
import Input from './ui/Input.vue';
import Select from './ui/Select.vue';
import Button from './ui/Button.vue';
import { useToast } from 'vue-toastification';
import { useTodos } from '../store/todos';
import { useProjects } from '../store/projects';
import { useUsers } from '../store/users';
import { onMounted } from 'vue';
import { createNewTodo, updateTodo } from '../api/tasksApi';
import { useDrawerRoute } from '../composables/useDrawerRoute';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const toast = useToast();
const store = useTodos();

const storeProjects = useProjects();
const usersStore = useUsers();
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
      executorId: null,
    }),
  },
});

const projectsOptions = computed(() =>
  storeProjects.projects.map((project) => ({
    label: project.name,
    value: project.id,
  })),
);

const executorsOptions = computed(() =>
  usersStore.users.map((user) => ({
    label: user.name,
    value: user.id,
  }))
);

const localTask = reactive({ ...props.task });

const emit = defineEmits('closeDialog');

async function submitTodo() {
  if (!localTask.title.trim()) {
    toast.error(t('emptyTask'));
    return;
  }

  const todo = {
    status: localTask.status || 'todo',
    title: localTask.title,
    priority: localTask.priority || 'low',
    project_id: localTask.projectId || null,
    executor: localTask.executorId || null,
  };

  try {
    if (drawerMode.value === 'edit') {
      const updatedTodo = { id: localTask.id, ...todo };
      await updateTodo(updatedTodo);
      store.updateTodoInStore(updatedTodo);
      toast.success(t('taskUpdated'));
      closeDrawer();
    }

    if (drawerMode.value === 'create') {
      const createdTodo = await createNewTodo(todo);
      store.addTodo(createdTodo);
      toast.success(t('taskAdded'));
      closeDrawer();
    }
  } catch (error) {
    toast.error(t('errorOccurred') + ': ' + error.message);
  }
}

function saveForLater() {
  stash.setStash(localTask);
  closeDrawer();
}

onMounted(() => {
  storeProjects.fetchProjects();
  usersStore.fetchUsers();
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
    <Select v-model="localTask.executorId" :options="executorsOptions" label="Выберите исполнителя" />
    <div class="form-buttons">
      <Button type="submit" variant="elevated" color="primary">
        {{ drawerMode.value === 'edit' ? $t('saveChanges') : $t('add') }}
      </Button>
      <!--
            <Button type="button" variant="text" @click="saveForLater">
        {{ $t('saveToStash') }}
      </Button>
      -->

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
