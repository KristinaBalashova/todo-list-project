<script setup>
import { ref } from 'vue';
import Dialog from '../../components/ui/Dialog.vue';
import { useToast } from 'vue-toastification';

const taskName = ref('');
const taskDescription = ref('');
const taskPriority = ref('');
const taskDeadline = ref('');
const taskAssignee = ref('');
const taskProject = ref('');
const taskTags = ref([]);
const newTag = ref('');
const dialogVisible = ref(false);

const toast = useToast();

const priorities = ['Низкий', 'Средний', 'Высокий'];
const assignees = ['Алиса', 'Боб', 'Кристина'];
const projects = ['CRM', 'Маркетинг', 'Техподдержка'];

function toggleModalVisible() {
  dialogVisible.value = !dialogVisible.value;
}

function addTag() {
  if (newTag.value.trim() && !taskTags.value.includes(newTag.value)) {
    taskTags.value.push(newTag.value.trim());
    newTag.value = '';
  }
}

function removeTag(tag) {
  taskTags.value = taskTags.value.filter((t) => t !== tag);
}

function submitTask() {
  if (
    !taskName.value ||
    !taskDescription.value ||
    !taskPriority.value ||
    !taskDeadline.value ||
    !taskAssignee.value ||
    !taskProject.value
  ) {
    toast.error('Пожалуйста, заполните все обязательные поля.');
    return;
  }

  const newTask = {
    name: taskName.value,
    description: taskDescription.value,
    priority: taskPriority.value,
    deadline: taskDeadline.value,
    assignee: taskAssignee.value,
    project: taskProject.value,
    tags: taskTags.value,
  };

  console.log('📝 Новая задача:', newTask);
  toast.success('Задача успешно добавлена!');
  resetForm();
  dialogVisible.value = false;
}

function resetForm() {
  taskName.value = '';
  taskDescription.value = '';
  taskPriority.value = '';
  taskDeadline.value = '';
  taskAssignee.value = '';
  taskProject.value = '';
  taskTags.value = [];
  newTag.value = '';
}
</script>

<template>
  <div class="container">
    <v-btn color="primary" @click="toggleModalVisible">Добавить задачу</v-btn>
    <Dialog v-model:visible="dialogVisible" title="Добавить новую задачу">
      <template #content>
        <v-form @submit.prevent="submitTask">
          <v-text-field v-model="taskName" label="Название задачи" required />
          <v-textarea v-model="taskDescription" label="Описание" required />
          <v-select v-model="taskPriority" :items="priorities" label="Приоритет" required />
          <v-text-field v-model="taskDeadline" label="Дедлайн" type="date" required />
          <v-select v-model="taskAssignee" :items="assignees" label="Исполнитель" required />
          <v-select v-model="taskProject" :items="projects" label="Проект" required />

          <div class="tags-section">
            <v-text-field
              v-model="newTag"
              label="Добавить тег"
              @keyup.enter="addTag"
              append-inner-icon="mdi-plus"
              @click:append-inner="addTag"
            />
            <div class="tags-list">
              <v-chip
                v-for="tag in taskTags"
                :key="tag"
                closable
                @click:close="removeTag(tag)"
                color="primary"
                class="ma-1"
              >
                {{ tag }}
              </v-chip>
            </div>
          </div>
        </v-form>
      </template>

      <template #action-button>
        <v-btn color="primary" @click="submitTask">Добавить</v-btn>
      </template>
    </Dialog>
  </div>
</template>

<style scoped>
.container {
}
.tags-section {
  margin-top: 16px;
}
.tags-list {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 6px;
}
</style>
