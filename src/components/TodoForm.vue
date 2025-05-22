<script setup>
import { reactive, watch } from 'vue';
import Input from './ui/Input.vue';
import Select from './ui/Select.vue';
import Button from './ui/Button.vue';
import { TEXT_CONTENT } from '../constants/textContent';
import { useToast } from 'vue-toastification';
import { useTodos } from '../store/todos';

const toast = useToast();
const store = useTodos();

const props = defineProps({
  task: {
    type: Object,
    required: false,
    default: () => ({
      title: '',
      status: '',
      priority: '',
    }),
  },
});

const localTask = reactive({ ...props.task });

const emit = defineEmits('closeDialog');

function submitTodo() {
  if (!localTask.title.trim()) {
    toast.error(TEXT_CONTENT.EMPTY_TASK);
    return;
  }

  const todo = {
    status: localTask.status || 'todo',
    id: Date.now(),
    title: localTask.title,
    priority: localTask.priority || 'low',
  };

  store.addTodo(todo);
  toast.success(TEXT_CONTENT.TASK_ADDED);
  emit('close-dialog');
}
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
      :options="['todo', 'in-progress', 'done']"
      label="Status"
      class="select"
    />
    <Button type="submit" variant="elevated" color="primary">
      {{ TEXT_CONTENT.ADD }}
    </Button>
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
